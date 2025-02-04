"use server";

import { CreateFileRequest, createUploadLinks } from "@/services/google-drive";
import { z } from "zod";
import {
  SUPPORTED_DOCUMENTS,
  type SUPPORTED_DOCUMENTS_TYPES,
} from "../constants";

const FileSchema = z.object({
  mimeType: z
    .string()
    .refine(
      (file) => SUPPORTED_DOCUMENTS.includes(file as SUPPORTED_DOCUMENTS_TYPES),
      { message: "File type must be a .doc, .docx, or a .pdf" }
    ),
  name: z.string().min(1, "name is required"),
});

const RequestSchema = z.object({
  files: z.array(FileSchema),
});

export type DriveCreateResponse = {
  success?: boolean;
  links?: string[];
  message?: string;
  id?: string;
  error?: {
    type: "validation" | "unknown";
    message?: string;
  };
};

export type RequestValues = z.infer<typeof RequestSchema>;

export const createDriveLinks = async (
  request: Partial<RequestValues>
): Promise<DriveCreateResponse> => {
  const parsed = RequestSchema.safeParse(request);

  // return validation error to the client
  if (!parsed.success) {
    const fields: Record<string, unknown> = {};
    for (const key of Object.keys(request) as (keyof typeof request)[]) {
      fields[key] = request[key];
    }
    const error = parsed.error;
    const formattedErrors = error.flatten();

    console.error("fieldErrors", formattedErrors.fieldErrors);

    return {
      success: false,
      error: {
        type: "validation",
        message: "Invalid form data",
      },
    };
  }

  const files = (request.files ?? []).map(
    (file): CreateFileRequest => ({
      mimeType: file.mimeType as SUPPORTED_DOCUMENTS_TYPES,
      name: file.name,
    })
  );

  const response = await createUploadLinks({ files });

  return {
    success: response.success,
    links: response.links,
  };
};
