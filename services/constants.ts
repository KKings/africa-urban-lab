export const AUTH_OPTIONS = {
  projectId: process.env.GOOGLE_AUTH_PROJECT_ID,
  credentials: {
    type: "service_account",
    project_id: process.env.GOOGLE_AUTH_PROJECT_ID,
    private_key_id: process.env.GOOGLE_AUTH_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_AUTH_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
    client_email: process.env.GOOGLE_AUTH_CLIENT_EMAIL,
    universe_domain: "googleapis.com",
  },
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
};
