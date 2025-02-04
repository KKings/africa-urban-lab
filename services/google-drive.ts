import { google } from "googleapis";
import type { Readable } from "stream";
import { AUTH_OPTIONS } from "./constants";

export type UploadFileRequest = {
  name: string;
  mimeType:
    | "application/pdf"
    | "application/msword"
    | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  body: Readable;
};

export type CreateFileRequest = Omit<UploadFileRequest, "body">;

export type CreateFilesRequest = {
  files: CreateFileRequest[];
};

export type DeleteFileRequest = {
  fileId: string;
};

export type DeleteFileResponse = {
  success: boolean;
};

export type UploadFileResponse =
  | {
      success: true;
      id: string;
    }
  | { success: false; };

export type CreateFilesResponse = {
  success: boolean;
  links: string[];
};

export type CreateFileResponse = {
  id?: string;
  success: boolean;
  link?: string;
};

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID ?? "";

/**
 * Uploads a file to Google Drive.
 *
 * @param {UploadFileRequest} file - The file to be uploaded, containing its name, mimeType, and body.
 * @returns {Promise<UploadFileResponse>} A promise that resolves to an object containing the uploaded file's ID and success status.
 *
 * @throws {Error} If the upload is processed but no ID is returned.
 *
 * @example
 * const file = {
 *   name: 'example.txt',
 *   mimeType: 'text/plain',
 *   body: 'Hello, world!',
 * };
 * const result = await upload(file);
 * if (result.success) {
 *   console.log(`File uploaded successfully with ID: ${result.id}`);
 * } else {
 *   console.error('File upload failed');
 * }
 */
export const uploadFile = async (
  file: UploadFileRequest
): Promise<UploadFileResponse> => {
  const auth = await google.auth.getClient(AUTH_OPTIONS);
  google.options({ auth });
  const drive = google.drive("v3");

  try {
    const requestBody = {
      name: file.name,
      mimeType: file.mimeType,
      parents: [FOLDER_ID],
    };

    const media = {
      mimeType: file.mimeType,
      body: file.body,
    };
    const { data } = await drive.files.create({ requestBody, media });

    if (!data.id) {
      throw new Error(`Upload processed but no id returned.`);
    }

    return { id: data.id, success: true };
  } catch (error) {
    console.error(
      `[Google Drive] Failed to upload, ${file.name}:${file.mimeType}`,
      error
    );
    return { success: false };
  }
};

/**
 * Creates a file in Google Drive using Resumable
 *
 * @param {CreateFileRequest} file - The file information including name and mimeType.
 * @returns {Promise<CreateFileResponse>} - A promise that resolves to the response containing the file ID, success status, and link.
 *
 * @throws {Error} - Throws an error if the upload is processed but no ID is returned.
 *
 * @example
 * const fileRequest = {
 *   name: 'example.txt',
 *   mimeType: 'text/plain'
 * };
 * const response = await createFile(fileRequest);
 * if (response.success) {
 *   console.log(`File created with ID: ${response.id}`);
 * } else {
 *   console.error('Failed to create file');
 * }
 */
export const createUploadLink = async (
  file: CreateFileRequest
): Promise<CreateFileResponse> => {
  const auth = await google.auth.getClient(AUTH_OPTIONS);
  google.options({ auth });
  const drive = google.drive("v3");

  try {
    const requestBody = {
      name: file.name,
      mimeType: file.mimeType,
      parents: [FOLDER_ID],
      uploadType: "resumable",
    };

    const options = {
      rootUrl: "https://www.googleapis.com/upload",
    };

    const { headers } = await drive.files.create(requestBody, options);

    return { success: true, link: headers.location };
  } catch (error) {
    console.error(
      `[Google Drive] Failed to upload, ${file.name}:${file.mimeType}`,
      error
    );
    return { success: false };
  }
};

/**
 * Creates multiple files in Google Drive.
 *
 * @param {CreateFilesRequest} param0 - The request object containing an array of files to be created.
 * @returns {Promise<CreateFilesResponse>} - A promise that resolves to an object containing the success status and an array of links to the created files.
 *
 * The function performs the following steps:
 * 1. Maps the input files to an array of promises using the `createFile` function.
 * 2. Waits for all promises to settle using `Promise.allSettled`.
 * 3. Checks if all file creation operations were successful.
 * 4. If any file creation operation failed, returns an object with `success` set to `false` and an empty `links` array.
 * 5. If all file creation operations were successful, filters the results to extract the links of the created files and returns an object with `success` set to `true` and the `links` array.
 */
export const createUploadLinks = async ({
  files,
}: CreateFilesRequest): Promise<CreateFilesResponse> => {
  const requests = files.map((file: CreateFileRequest) =>
    createUploadLink(file)
  );
  const results = await Promise.allSettled(requests);
  const allSuccess = results.some((result) => result.status !== "rejected");

  if (!allSuccess) {
    return {
      success: false,
      links: [],
    };
  }

  const links = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value.link)
    .filter((result) => result !== undefined);

  return {
    success: true,
    links,
  };
};

/**
 * Deletes a file from Google Drive.
 *
 * @param {DeleteFileRequest} param0 - The request object containing the file ID to delete.
 * @returns {Promise<DeleteFileResponse>} - A promise that resolves to a response object indicating success or failure.
 *
 * @example
 * const response = await deleteFile({ fileId: 'your-file-id' });
 * if (response.success) {
 *   console.log('File deleted successfully');
 * } else {
 *   console.log('Failed to delete file');
 * }
 *
 * @throws {Error} If the Google Drive API request fails.
 */
export const deleteFile = async ({
  fileId,
}: DeleteFileRequest): Promise<DeleteFileResponse> => {
  const auth = await google.auth.getClient(AUTH_OPTIONS);
  google.options({ auth });
  const drive = google.drive("v3");

  try {
    await drive.files.delete({ fileId });
    return { success: true };
  } catch (error) {
    console.error(`[Google Drive] Failed to delete, ${fileId}`, error);
    return { success: false };
  }
};
