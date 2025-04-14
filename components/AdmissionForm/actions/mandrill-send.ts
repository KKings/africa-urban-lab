"use server";

import { z } from "zod";
import { sendEmail } from "@/services/mandrill";
import { personalSchema, referralSchema } from "../schema";

export type SendEmailResponse = {
  success?: boolean;
  message?: string;
};

const RequestSchema = personalSchema.and(referralSchema);

export type SendInitialEmailValues = z.infer<typeof RequestSchema>;

const DUE_DATE_DAYS = 14;

export const sendReferenceEmail = async (
  request: SendInitialEmailValues
): Promise<SendEmailResponse> => {
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

    /** 
     * Two emails sent:
     * 
     *    1. To the applicant to confirm submission
     *    2. To the referral to request a reference
     * 
     * A third email is sent to the reference to follow-up using a cron job.
     */
    await sendEmail({
      to: email,
      templateName: "applicant-received-submission",
      data: {
        FNAME: firstName,
        SNAME: `${firstName} ${lastName}`,
      },
      tags: ["Admission - Submission Received"],
    });

    await sendEmail({
      to: referralEmail,
      templateName: "request-for-reference-initial",
      data: {
        FNAME: referralName,
        SNAME: `${firstName} ${lastName}`,
        DUEDATE: dueDate.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        }),
      },
      tags: ["Admission - Request for Referral"],
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      `[mandrill.send] Error occurred sending initial email.`,
      error
    );
    throw new Error("Failed to send email");
  }
};
