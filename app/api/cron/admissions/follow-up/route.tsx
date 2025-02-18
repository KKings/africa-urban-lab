import { get } from "@/services/google-sheets";
import { sendBulkEmail } from "@/services/mandrill";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

type EmailRequests = [string, Record<string, string>][];

const FOLLOW_UP_DAYS = 1;

const findFollowUps = (rows: string[][], index: number): string[][] => {
  const today = new Date(new Date().toDateString());

  const filteredRows = rows.filter((row) => {
    const rowData = row[index];
    const createdOn = rowData ? new Date(rowData) : null;

    console.log(createdOn);

    if (!createdOn) {
      return false;
    }

    const dueDate = new Date(createdOn.toDateString());
    dueDate.setDate(createdOn.getDate() + FOLLOW_UP_DAYS);

    const beginDate = new Date(today);
    beginDate.setDate(beginDate.getDate() - 1);

    const isDue = dueDate.getTime() == today.getTime();

    console.log(`due:${dueDate} == today:${today}`, isDue);
    return isDue;
  });

  return filteredRows;
};

function partitionDuplicates(emails: EmailRequests): EmailRequests[] {
  type Accumulator = {
    seen: Set<string>;
    requests: EmailRequests;
  }[];

  const accumulator: Accumulator = [{ 
      seen: new Set<string>(),
      requests: [],
  }];

  for (const request of emails) {
      const email = request[0];
      let added = false;
      for (const a of accumulator) {
          if (!a.seen.has(email)) {
              a.seen.add(email);
              a.requests.push(request);
              added = true;
              break;
          } 
      }

      if (!added) {
          const seen = new Set<string>();
          seen.add(email);
          accumulator.push({
              seen,
              requests: [request]
          })
      }
  }

  return accumulator.map((value) => value.requests);
}

const convertToBulkEmailRequests = (
  rows: string[][],
  referralEmailIndex: number,
  referralNameIndex: number,
  firstNameIndex: number,
  lastNameIndex: number
): EmailRequests[] => {

  // With possible duplicates
  const emails = (rows || []).reduce(
    (previous, row) => {
      const email = row[referralEmailIndex] || "";
      const data = {
        FNAME: row[referralNameIndex],
        SNAME: `${row[firstNameIndex]} ${row[lastNameIndex]}`.trim(),
      };
      previous.push([email, data]);
      return previous;
    },
    [] as [string, Record<string, string>][]
  );

  return partitionDuplicates(emails);
};

/**
 * Handles GET requests for the follow-up admissions cron job.
 * 
 * This function performs the following steps:
 * 1. Validates the authorization header against a secret token.
 * 2. Retrieves data using the `get` function.
 * 3. Identifies the relevant columns in the data.
 * 4. Finds follow-up data based on the "Created On" column.
 * 5. Converts the follow-up data into bulk email requests.
 * 6. Logs each bulk email request.
 * 7. Sends bulk emails using the `sendBulkEmail` function.
 * 8. Returns a response indicating the success or failure of the operation.
 * 
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to a response object.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const { rows, header } = await get();

  const createdOnIndex = header.findIndex((value) => value === "Created On");
  const referralEmailIndex = header.findIndex(
    (value) => value === "Email of Referee"
  );
  const referralNameIndex = header.findIndex(
    (value) => value === "Name of Referee"
  );
  const firstNameIndex = header.findIndex((value) => value === "First Name");
  const lastNameIndex = header.findIndex((value) => value === "Last Name");

  const followUpData = findFollowUps(rows, createdOnIndex);

  if (followUpData.length === 0) {
    return new Response("Ran successfully, no records processed.", {
      status: 200,
    });
  }

  const bulkRequests = convertToBulkEmailRequests(
    followUpData,
    referralEmailIndex,
    referralNameIndex,
    firstNameIndex,
    lastNameIndex
  );
  
  bulkRequests.forEach((value, index) => console.log(`Request ${index + 1}`, value));

  const template = {
    templateName: 'request-for-reference-follow-up',
    tags: ['Admission - Request for Referral - Follow-up'],
  };

  const results = await Promise.allSettled(bulkRequests.map((bulkRequest) => sendBulkEmail({
    ...template,
    emails: bulkRequest,
  })));
  
  const allSuccess = results.some((result) => result.status !== "rejected");

  return new Response(`Ran ${allSuccess ? 'successfully' : 'with error' }, ${bulkRequests.length} records processed.`, {
    status: 200,
  });
}
