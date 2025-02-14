"use server";

import { z } from "zod";
import { append } from "@/services/google-sheets";
import {
  documentLinksSchema,
  experienceSchema,
  personalSchema,
  referralSchema,
} from "../schema";

export type SaveToSheetsResponse = {
  success?: boolean;
  message?: string;
  id?: string;
  error?: {
    type: "mailchimp" | "validation" | "unknown";
    detail: {
      title?: string;
      detail?: string;
      status?: string;
      message: string;
    };
    fields?: Record<string, string>;
    issues?: Record<string, string[]>;
  };
  fields?: Record<string, unknown>;
  issues?: Record<string, string[]>;
};

const RequestSchema = personalSchema
  .merge(experienceSchema)
  .merge(referralSchema)
  .merge(documentLinksSchema);

export type SheetValues = z.infer<typeof RequestSchema>;

export const saveToSheets = async (
  request: SheetValues
): Promise<SaveToSheetsResponse> => {
  try {
    const parsed = RequestSchema.safeParse(request);
    if (!parsed.success) {
      const fields: Record<string, unknown> = {};
      for (const key of Object.keys(request) as (keyof typeof request)[]) {
        fields[key] = request[key];
      }
      const error = parsed.error;
      const formattedErrors = error.flatten();

      console.log("fieldErrors", formattedErrors.fieldErrors);

      return {
        success: false,
        error: {
          type: "validation",
          detail: {
            message: "Invalid form data",
          },
        },
        fields,
        issues: formattedErrors.fieldErrors,
      };
    }

    const {
      firstName,
      lastName,
      email,
      dateOfBirth,
      nationality,
      countryOfResidence,
      yearlyIncome,
      totalYearsOfRelevantExperience,
      currentJob,
      jobResponsibilities,
      additionalExperience,
      referralName,
      referralTitle,
      referralEmail,
      referralOccupation,
      referralCompany,
      resume,
      transcriptsBachelor,
      transcriptsMasters,
      personalStatement,
      writingSample,
    } = request;

    const identifier = `${firstName}-${lastName}`.replace(/[^0-9a-z\-]/gi, "");
    const timestamp = new Date().toISOString();

    const result = await append({
      identifier,
      row: [
        firstName,
        lastName,
        email,
        dateOfBirth,
        nationality,
        countryOfResidence,
        String(yearlyIncome),
        String(totalYearsOfRelevantExperience),
        currentJob,
        jobResponsibilities,
        additionalExperience,
        resume,
        transcriptsBachelor,
        transcriptsMasters,
        personalStatement,
        writingSample,
        referralName,
        referralTitle,
        referralEmail,
        referralOccupation,
        referralCompany,
        timestamp,
      ],
    });

    return {
      success: result.success,
    };
  } catch (error) {
    console.error(
      `[saveToSheets.action] Error occurred saving row to Google Sheets.`, error
    );
    throw new Error('Failed to save data to Google Sheets');
  }
};
