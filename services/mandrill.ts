import { string } from "zod";

export type SendEmailRequest = {
  to: string;
  data?: Record<string, string>;
  tags?: string[];
  templateName: string;
};

export type BulkEmailRequest = {
  templateName: string;
  tags?: string[];
  emails: [string, Record<string, string>][];
};

export type SendEmailResponse = {
  success: boolean;
};

export type MandrillResponse = {
  email: string;
  status: "sent" | "queued" | "rejected" | "invalid";
  id?: string;
  reject_reason?:
    | "hard-bounce"
    | "soft-bounce"
    | "spam"
    | "unsub"
    | "custom"
    | "invalid-sender"
    | "invalid"
    | "test-mode-limit"
    | "unsigned"
    | "rule";
  queued_reason?:
    | "attachments"
    | "multiple-recipients"
    | "free-trial-sends-exhausted"
    | "hourly-quota-exhausted"
    | "monthly-limit-reached"
    | "sending-paused"
    | "sending-suspended"
    | "account-suspended"
    | "sending-backlogged";
}[];

export const sendBulkEmail = async ({
  templateName,
  emails,
  tags,
}: BulkEmailRequest): Promise<SendEmailResponse> => {
  if (!emails || emails.length === 0 || !templateName) {
    console.error("[mandrill sendEmail] Invalid parameters");
    throw new Error("Invalid parameters passed to handler.");
  }

  const to = emails.map(([email]) => ({ email }));
  const vars = emails.map(([email, data]) => ({
    rcpt: email,
    vars: Object.entries(data || {}).map(([name, content]) => ({
      name,
      content,
    })),
  }));

  try {
    const response = await fetch(
      `https://mandrillapp.com/api/1.0/messages/send-template`,
      {
        method: "POST",
        body: JSON.stringify({
          key: process.env.MAILCHIMP_MAILDRILL_API_KEY,
          template_name: templateName,
          template_content: null,
          message: {
            to,
            merge_vars: vars,
            tags,
          },
        }),
      }
    );

    const { ok, status } = response;
    const json = await response.json() as MandrillResponse;

    if (!ok) {
      throw new Error(`Maildrill API error: ${JSON.stringify(json)}`);
    }

    console.log(
      `Success: sent ${status} '${templateName}' to '${to}': ${JSON.stringify(json)}.`
    );
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Sends an email using the Mandrill API.
 *
 * @param {Object} params - The parameters for sending the email.
 * @param {string} params.text - The plain text content of the email.
 * @param {string} params.html - The HTML content of the email.
 * @param {string} params.subject - The subject of the email.
 * @param {string} params.from - The sender's email address.
 * @param {string} params.fromName - The sender's name.
 * @param {string} params.to - The recipient's email address.
 * @param {Object} [params.data] - Additional data to be merged into the email.
 * @param {string[]} [params.tags] - Tags to categorize the email.
 * @returns {Promise<SendEmailResponse>} A promise that resolves to the response of the email sending operation.
 * @throws {Error} If any required parameters are missing or if the Mandrill API returns an error.
 */
export const sendEmail = async ({
  to,
  data,
  tags,
  templateName,
}: SendEmailRequest): Promise<SendEmailResponse> => {
  if (!to || !templateName) {
    console.error("[mandrill sendEmail] Invalid parameters");
    throw new Error("Invalid parameters passed to handler.");
  }

  try {
    const response = await fetch(
      `https://mandrillapp.com/api/1.0/messages/send-template`,
      {
        method: "POST",
        body: JSON.stringify({
          key: process.env.MAILCHIMP_MAILDRILL_API_KEY,
          template_name: templateName,
          template_content: null,
          message: {
            to: [{ email: to }],
            merge_vars: [
              {
                rcpt: to,
                vars: Object.entries(data || {}).map(([name, content]) => ({
                  name,
                  content,
                })),
              },
            ],
            tags,
          },
        }),
      }
    );

    const { ok, status } = response;
    const json = await response.json();

    if (!ok) {
      throw new Error(`Maildrill API error: ${JSON.stringify(json)}`);
    }

    console.log(
      `Success: sent ${status} '${templateName}' to '${to}': ${JSON.stringify(json)}.`
    );
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};
