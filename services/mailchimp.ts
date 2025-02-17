import { createHash } from "crypto";

export type AddContactRequest = {
  audienceId: string;
  email: string;
  fields: Record<string, string>;
  tags?: string[];
};
export type TriggerJourneyRequest = {
  journeyId: string;
  stepId: string;
  email: string;
};

export interface MailchimpResponse {
  success: boolean;
}

const md5 = (key: string): string => {
  return createHash("md5").update(key).digest("hex");
};

/**
 * Adds a contact to a Mailchimp audience list.
 *
 * @param {Object} params - The parameters for adding a contact.
 * @param {string} params.audienceId - The ID of the Mailchimp audience list.
 * @param {string} params.email - The email address of the contact to add.
 * @param {Object} params.fields - The merge fields for the contact.
 * @param {string[]} [params.tags] - Optional tags to assign to the contact.
 * @returns {Promise<MailchimpResponse>} A promise that resolves to the response of the add contact operation.
 * @throws {Error} If the input data is invalid or if the Mailchimp API returns an error.
 */
export const addOrUpdateContact = async ({
  audienceId,
  email,
  fields,
  tags,
}: AddContactRequest): Promise<MailchimpResponse> => {
  if (!audienceId || !email || !fields || Object.keys(fields).length === 0) {
    console.error("[mailchimp addOrUpdateContact] Invalid parameters");
    throw new Error("Invalid parameters passed to handler.");
  }

  try {
    const response = await fetch(
      `https://us12.api.mailchimp.com/3.0/lists/${audienceId}/members/${md5(email)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
          merge_fields: {
            ...fields,
          },
          status: "subscribed",
          tags,
        }),
      }
    );

    const responseBody = await response.json();
    const { ok } = response;

    if (!ok) {
      throw new Error(`Mailchimp API error: ${JSON.stringify(responseBody)}`);
    }

    console.log(
      `Success: added "${email}" to ${audienceId} with ${tags || []} tags.`
    );
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Triggers a Mailchimp customer journey step for a given email address.
 *
 * @param {Object} params - The parameters for triggering the journey.
 * @param {string} params.email - The email address to add to the journey.
 * @param {string} params.journeyId - The ID of the journey to trigger.
 * @param {string} params.stepId - The ID of the journey step to trigger.
 * @returns {Promise<MailchimpResponse>} A promise that resolves to a MailchimpResponse object indicating success or failure.
 * @throws {Error} If any of the required parameters are missing or if the Mailchimp API returns an error.
 */
export const triggerJourney = async ({
  email,
  journeyId,
  stepId,
}: TriggerJourneyRequest): Promise<MailchimpResponse> => {
  if (!journeyId || !email || !stepId) {
    console.error("[mailchimp triggerJourney] Invalid parameters");
    throw new Error("Invalid parameters passed to handler.");
  }

  try {
    const response = await fetch(
      `https://us12.api.mailchimp.com/3.0/customer-journeys/journeys/${journeyId}/steps/${stepId}/actions/trigger`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
        }),
      }
    );
    const text = response.text();
    const { ok, status } = response;

    if (!ok || status !== 204) {
      throw new Error(`Mailchimp API error: ${text}`);
    }

    console.log(`Success: added "${email}" to Journey ${journeyId}-${stepId}.`);
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};
