import { NextRequest, NextResponse } from "next/server";
import { google, sheets_v4 } from "googleapis";

interface FormData {
  name: string;
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FormData;
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Field wajib diisi" }, { status: 400 });
    }

    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || "{}");
    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (!spreadsheetId) {
      return NextResponse.json(
        { error: "Spreadsheet ID belum di-set" },
        { status: 500 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets: sheets_v4.Sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A1", // Ganti sesuai nama sheet kamu
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[new Date().toISOString(), name, email]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
