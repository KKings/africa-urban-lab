"use server";

import { uploadFile } from "@/services/google-drive";
import { SUPPORTED_DOCUMENTS_TYPES } from "../constants";
import { Readable } from "stream";

export type UploadFileResponse = {
  id?: string;
  success: boolean;
}

export async function upload(data: FormData): Promise<UploadFileResponse> {
  try {
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      throw new Error("No file uploaded");
    }
    
    const mimeType = data.get(
      "mimeType"
    ) as string as SUPPORTED_DOCUMENTS_TYPES;
    const name = data.get("name") as string;

    const response = await uploadFile({
      name,
      mimeType,
      body: Readable.from(Buffer.from(await file.arrayBuffer())),
    });

    if (!response.success) {
      throw new Error(`Service returned an invalid success status for, ${name}:${mimeType}.`);
    }
    
    const { success, id } = response;

    return { success, id };
  } catch (error) {
    console.error('[upload.action] Error occurred uploading file.', error);
    return { success: false };
  }
}
