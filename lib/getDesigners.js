import { google } from "googleapis";

export async function getDesigners() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({
    auth,
    version: "v4",
  });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: "1jfgNr3QmLU4Gc5yAOpa0TP-vrs__ihOirNFqwgT-OFM",
    range: "Designers",
  });

  const rows = response.data.values ?? [];

  return rows
    .map((row) => ({
      name: row[0] ?? "",
      location: row[1] ?? "",
      expertise: row[2] ?? "",
      link: row[3] ?? "",
      approved: row[4] ?? "",
      featured: row[5] ?? "",
    }))
    .filter((item) => item.name && item.approved === "Yes");
}