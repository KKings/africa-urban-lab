import { textVariants } from "../ui";

export const SUPPORTED_DOCUMENTS = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export type SUPPORTED_DOCUMENTS_TYPES = typeof SUPPORTED_DOCUMENTS[number];

export const MIME_TYPE_MAPPINGS = new Map([
  ['pdf', 'application/pdf'],
  ['doc', 'application/msword'],
  ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
]);