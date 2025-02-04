import { union, z } from "zod";
import { SUPPORTED_DOCUMENTS } from "./constants";

const fileSizeLimit = 2 * 1024 * 1024; // 1MB

const FILE =
  typeof window === "undefined"
    ? z.any()
    : z.instanceof(FileList, { message: 'A file is required'});

export const DOCUMENT_SCHEMA = FILE.refine(
  (file) => SUPPORTED_DOCUMENTS.includes(file?.[0]?.type),
  { message: "File type must be a .doc, .docx, or a .pdf" }
).refine((file) => file?.[0]?.size <= fileSizeLimit, {
  message: "File size must be smaller than 2MB",
});
export const DOCUMENT_SCHEMA_OPTIONAL = FILE
  .refine((file) => SUPPORTED_DOCUMENTS.includes(file?.[0]?.type), {
    message: "File type must be a .doc, .docx, or a .pdf",
  })
  .refine((file) => file?.[0]?.size <= fileSizeLimit, {
    message: "File size must be smaller than 2MB",
  });
export const RequestSchema = z.object({
  firstName: z
    .string({ message: "First name is required" })
    .min(1, "First name is required"),
  lastName: z
    .string({ message: "Last name is required" })
    .min(1, "Last name is required"),
  email: z
    .string({ message: "Invalid email address" })
    .email("Invalid email address"),
  dateOfBirth: z.date({
    required_error: "Date of Birth is required",
    invalid_type_error: "Date of Birth is required",
  }),
  nationality: z
    .string({ message: "Nationality is required" })
    .min(1, "Nationality is required"),
  countryOfResidence: z
    .string({ message: "Country of Residence is required" })
    .min(1, "Country of Residence is required"),
  yearlyIncome: z
    .number({ message: "Yearly Income is required" })
    .nonnegative("Yearly Income must be a positive number"),
  totalYearsOfRelevantExperience: z
    .number({ message: "Total Years of Relevant Experience is Required" })
    .nonnegative(
      "Total Years of Relevant Experience must be a positive number"
    ),
  currentJob: z
    .string()
    .min(1, "Current Job Title, Employer, and Sector is required"),
  jobResponsibilities: z.string().min(1, "Job Responsibilities is required"),
});

export type SignupSchema = z.infer<typeof RequestSchema>;

export const personalSchema = z.object({
  firstName: z
    .string({ message: "First name is required" })
    .min(1, "First name is required"),
  lastName: z
    .string({ message: "Last name is required" })
    .min(1, "Last name is required"),
  email: z
    .string({ message: "Invalid email address" })
    .email("Invalid email address"),
  dateOfBirth: z
    .string({ message: "Date of Birth is required" })
    .date("Date of Birth is required"),
  nationality: z
    .string({ message: "Nationality is required" })
    .min(1, "Nationality is required"),
  countryOfResidence: z
    .string({ message: "Country of Residence is required" })
    .min(1, "Country of Residence is required"),
  yearlyIncome: z
    .number({ message: "Yearly Income is required" })
    .nonnegative("Yearly Income must be a positive number"),
});

export const experienceSchema = z.object({
  totalYearsOfRelevantExperience: z
    .number({ message: "Total Years of Relevant Experience is Required" })
    .nonnegative(
      "Total Years of Relevant Experience must be a positive number"
    ),
  currentJob: z
    .string({ message: "Current Job Title, Employer, and Sector is required" })
    .min(1, "Current Job Title, Employer, and Sector is required"),
  jobResponsibilities: z.string().min(1, "Job Responsibilities is required"),
  additionalExperience: z.string().optional(),
});

export const referralSchema = z.object({
  referralName: z
    .string({ message: "Name of Referral is required" })
    .min(1, "Name of Referral is required"),
  referralTitle: z
    .string({ message: "Title of Referral is required" })
    .min(1, "Title of Referral is required"),
  referralEmail: z
    .string({ message: "Invalid email address" })
    .email("Invalid email address"),
  referralOccupation: z
    .string({ message: "Title of Referral is required" })
    .min(1, "Title of Referral is required"),
  referralCompany: z
    .string({ message: "Referral Componay/Institute is required" })
    .min(1, "Referral Componay/Institute is required"),
});

export const documentLinksSchema = z.object({
  resume: z
    .string({ message: "Resume is required" })
    .min(1, "Resume is required"),
  transcriptsBachelor: z
    .string({ message: "Transcripts for Bachelors is required" })
    .min(1, "Transcripts for Bachelors is required"),
  transcriptsMasters: z.string().optional(),
  personalStatement: z
    .string({ message: "Personal Statement is required" })
    .min(1, "Personal Statement is required"),
  writingSample: z
    .string({ message: "Writing Sample is required" })
    .min(1, "Writing Sample is required"),
});

export const documentsSchema = z.object({
  resume: DOCUMENT_SCHEMA,
  transcriptsBachelor: DOCUMENT_SCHEMA,
  transcriptsMasters: z.unknown().optional().or(DOCUMENT_SCHEMA),
  personalStatement: DOCUMENT_SCHEMA,
  writingSample: DOCUMENT_SCHEMA,
});

export type PersonalFormValues = z.infer<typeof personalSchema>;
export type ExperienceFormValues = z.infer<typeof experienceSchema>;
export type ReferralFormValues = z.infer<typeof referralSchema>;
export type DocumentsFormValues = z.infer<typeof documentsSchema>;
export type FormValues = PersonalFormValues &
  ExperienceFormValues &
  ReferralFormValues &
  DocumentsFormValues;
