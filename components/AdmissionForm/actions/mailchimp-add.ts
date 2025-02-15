"use server";

import { z } from "zod";
import { addOrUpdateContact } from "@/services/mailchimp";
import { personalSchema, referralSchema } from "../schema";

export type AddContactsResponse = {
  success?: boolean;
  message?: string;
};

const RequestSchema = personalSchema.merge(referralSchema);

export type AddContactsValues = z.infer<typeof RequestSchema>;

const DUE_DATE_DAYS = 14;

export const addContacts = async (
  request: AddContactsValues
): Promise<AddContactsResponse> => {
  try {
    const parsed = RequestSchema.safeParse(request);
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
      };
    }

    const { firstName, lastName, email, referralName, referralEmail } = request;

    const dueDate = new Date();
    dueDate.setDate(new Date().getDate() + DUE_DATE_DAYS);

    await addOrUpdateContact({
      audienceId: process.env.ADMISSIONS_MAILCHIMP_AUDIENCE_ID || "",
      email,
      fields: {
        FNAME: firstName,
        LNAME: lastName,
        DUEDATE: dueDate.toDateString() 
      },
      tags: ["Applicant"],
    });

    await addOrUpdateContact({
      audienceId: process.env.ADMISSIONS_MAILCHIMP_AUDIENCE_ID || "",
      email: referralEmail,
      fields: {
        FNAME: referralName,
        SNAME: `${firstName} ${lastName}`,
        DUEDATE: dueDate.toDateString() 
      },
      tags: ["Applicant Referral"],
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      `[addContacts.action] Error occurred adding contacts.`,
      error
    );
    throw new Error("Failed to add contacts");
  }
};
