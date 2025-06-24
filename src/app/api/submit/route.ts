import { NextRequest, NextResponse } from "next/server";
import { google, sheets_v4 } from "googleapis";

interface FormData {
  namaKepala: string;
  jumlahKK: string;
  jumlahAnggota: string;
  noKK: string;
  kodeKK: string;
  namaRT: string;
  noUrutBangunan: string;
  noUrutKeluarga: string;
  alamat: string;
  statusKependudukan: string;
}

async function writeHeadersIfNeeded(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string
) {
  const readRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A1:A1",
  });

  if (!readRes.data.values || readRes.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A1:K1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            "Waktu Submit",
            "Nama Kepala Keluarga",
            "Jumlah KK",
            "Jumlah Anggota",
            "No KK",
            "Kode KK",
            "Nama RT",
            "No Urut Bangunan",
            "No Urut Keluarga",
            "Alamat",
            "Status Kependudukan",
          ],
        ],
      },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FormData;
    const {
      namaKepala,
      jumlahKK,
      jumlahAnggota,
      noKK,
      kodeKK,
      namaRT,
      noUrutBangunan,
      noUrutKeluarga,
      alamat,
      statusKependudukan,
    } = body;

    if (
      !namaKepala ||
      !jumlahKK ||
      !jumlahAnggota ||
      !noKK ||
      !kodeKK ||
      !namaRT ||
      !noUrutBangunan ||
      !noUrutKeluarga ||
      !alamat ||
      !statusKependudukan
    ) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
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

    // Pastikan header ada
    await writeHeadersIfNeeded(sheets, spreadsheetId);

    // Append data ke Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            namaKepala,
            jumlahKK,
            jumlahAnggota,
            noKK,
            kodeKK,
            namaRT,
            noUrutBangunan,
            noUrutKeluarga,
            alamat,
            statusKependudukan,
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
