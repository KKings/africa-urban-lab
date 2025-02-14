import { google } from "googleapis";
import { AUTH_OPTIONS } from "./constants";

export type SheetsAppendRequest = {
  identifier: string;
  row: (string | undefined)[];
};

export type SheetsAppendResponse = {
  success: boolean;
};

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID ?? "";

/**
 * Appends a row of data to a Google Sheets spreadsheet.
 *
 * @param {SheetsAppendRequest} param0 - The request object containing the identifier and row data.
 * @param {string} param0.identifier - The identifier for the request.
 * @param {any[]} param0.row - The row data to append to the spreadsheet.
 * @returns {Promise<SheetsAppendResponse>} A promise that resolves to a response object indicating success or failure.
 *
 * @throws {Error} If there is an issue with appending the row to the spreadsheet.
 *
 * @example
 * const response = await append({ identifier: '12345', row: ['data1', 'data2', 'data3'] });
 * if (response.success) {
 *   console.log('Row appended successfully');
 * } else {
 *   console.log('Failed to append row');
 * }
 */
export const append = async ({
  identifier,
  row,
}: SheetsAppendRequest): Promise<SheetsAppendResponse> => {
  if (!row || row.length === 0) {
    console.warn("[Google Sheets] Append row values were empty or null.");
    return { success: false };
  }

  const auth = await google.auth.getClient(AUTH_OPTIONS);

  const sheets = google.sheets({ version: "v4", auth });

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Entries!A:B",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });
    return { success: true };
  } catch (error) {
    console.error(
      `[Google Sheets] Failed to append rows, ${identifier}`,
      error
    );
    throw error;
  }
};
