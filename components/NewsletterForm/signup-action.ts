"use server";

import { revalidatePath } from "next/cache";
import { RequestSchema } from "./schema";

export type SignupFormState = {
  success?: boolean;
  message?: string;
  id?: string;
  error?: {
    type: 'mailchimp' | 'validation' | 'unknown';
    detail: {
      title?: string; 
      detail?: string; 
      status?: string; 
      message: string;
    };
    fields?: Record<string, string>;
    issues?: Record<string, string[]>;
  }
  fields?: Record<string, string>;
  issues?: Record<string, string[]>;
};

export const SignupAction = async (
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> => {
  const data = Object.fromEntries(formData);
  const parsed = RequestSchema.safeParse(data);

  // return validation error to the client
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = data[key].toString();
    }
    const error = parsed.error;
    const formattedErrors = error.flatten(); 
    
    console.log('fieldErrors', formattedErrors.fieldErrors);
    return {
      success: false,
      error: {
        type: 'validation',
        detail: {
          message: "Invalid form data",
        },
      },
      fields,
      issues: formattedErrors.fieldErrors,
    };
  }
  
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      reasonForInterest,
      educationalBackground,
      howDidYouHearAboutUs,
    } = parsed.data;

    const response = await fetch(
      `https://us12.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
            PHONE: phoneNumber,
            // non-standard fields using the field tags we've set in Mailchimp
            COUNTRY: country,
            REASON: reasonForInterest,
            EDUCATION: educationalBackground,
            HEARABOUT: howDidYouHearAboutUs,
          },
          status: "subscribed", // Or 'pending' if double opt-in
          tags: ["Mailing List Subscriber"],
        }),
      }
    );

    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error(`Mailchimp API error: ${JSON.stringify(responseBody)}`);
    }

    console.log(
      `Success: added "${email}" to the Mailchimp list.`,
      responseBody
    );

    revalidatePath("/");
    return {
      success: true,
      id: Date.now().toString(),
    };
  } catch (error: any) {
    console.error("Error signing up user to Mailchimp:", error);

    if (
      error instanceof Error &&
      error.message.startsWith("Mailchimp API error:")
    ) {
      try {
        const errorDetail = JSON.parse(
          error.message.replace("Mailchimp API error: ", "")
        );
        const { title, detail, status } = errorDetail;

        return {
          success: false,
          error: {
            type: 'mailchimp',
            detail: {
              title,
              message: `${title} — ${status}`,
              detail,
              status,
            },
          },
        };
      } catch (parseError) {
        console.error("Error parsing the error message:", parseError);
      }
    }

    // Fallback generic error handling if the error format is not as expected
    return {
      success: false,
      error: {
        type: 'unknown',
        detail: {
          message: "An unknown error occurred — 500",
        }
      }
    };
  }
};
