import { NextRequest, NextResponse } from "next/server";
import { google, sheets_v4 } from "googleapis";

interface SurveyRequest {
  blok1: any;
  blok2: any;
  anggotaKeluarga: any[];
  blok8: any;
  blok9: any;
  blok10: any;
}

// Fungsi tulis header jika belum ada
async function writeHeadersIfNeeded(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
  headers: string[]
) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:1`,
  });

  const existing = res.data.values?.[0] || [];

  if (existing.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [headers],
      },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      blok1,
      blok2,
      anggotaKeluarga,
      blok8,
      blok9,
      blok10,
    }: SurveyRequest = await req.json();

    const spreadsheetId = process.env.SPREADSHEET_ID;
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || "{}");

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

    // Header Sheet1
    const sheet1Headers = [
      "timestamp",
      "101_namaKepalaKeluarga",
      "102_jumlahKK",
      "103_jumlahAnggotaKeluarga",
      "104_nomorKK",
      "105_kodeKK",
      "201_namaRT",
      "202_nomorUrutBangunan",
      "203_nomorUrutKeluarga",
      "204_alamatLengkap",
      "205_statusKependudukan",
      ...Object.keys(blok8),
      ...Object.keys(blok9),
      "1001_catatan",
    ];

    await writeHeadersIfNeeded(sheets, spreadsheetId, "Sheet1", sheet1Headers);

    const dataSheet1 = [
      new Date().toISOString(),
      blok1["101_namaKepalaKeluarga"],
      blok1["102_jumlahKK"],
      blok1["103_jumlahAnggotaKeluarga"],
      blok1["104_nomorKK"],
      blok1["105_kodeKK"],
      blok2["201_namaRT"],
      blok2["202_nomorUrutBangunan"],
      blok2["203_nomorUrutKeluarga"],
      blok2["204_alamatLengkap"],
      blok2["205_statusKependudukan"],
      ...Object.values(blok8),
      ...Object.values(blok9),
      blok10["1001_catatan"],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [dataSheet1],
      },
    });

    // Sheet2: per anggota
    const sheet2Headers = [
      "104_nomorKK",
      ...Object.keys(anggotaKeluarga[0]?.blok3 || {}),
      ...Object.keys(anggotaKeluarga[0]?.blok4 || {}),
      ...Object.keys(anggotaKeluarga[0]?.blok5 || {}),
      ...Object.keys(anggotaKeluarga[0]?.blok6 || {}),
      ...Object.keys(anggotaKeluarga[0]?.blok7 || {}),
    ];

    await writeHeadersIfNeeded(sheets, spreadsheetId, "Sheet2", sheet2Headers);

    for (const anggota of anggotaKeluarga) {
      const row = [
        blok1["104_nomorKK"], // foreign key
        ...Object.values(anggota.blok3),
        ...Object.values(anggota.blok4),
        ...Object.values(anggota.blok5),
        ...Object.values(anggota.blok6),
        ...Object.values(anggota.blok7),
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Sheet2!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [row],
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
