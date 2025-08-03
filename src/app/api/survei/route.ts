import { NextResponse } from "next/server";
import { google, sheets_v4 } from "googleapis";

// Fungsi utilitas tetap sama
function mapRowToObject(
  row: string[],
  headers: string[]
): { [key: string]: string } {
  return headers.reduce((obj, header, index) => {
    obj[header] = row[index] || "";
    return obj;
  }, {} as { [key: string]: string });
}

async function fetchSheetData(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string
) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:ZZ`,
  });

  const rows = response.data.values;

  if (!rows || rows.length < 2) {
    return []; // Kembalikan array kosong jika tidak ada data
  }

  const headers = rows[0];
  const dataRows = rows.slice(1);
  return dataRows.map((row) => mapRowToObject(row, headers));
}

export async function GET(req: Request) {
  try {
    // Ambil query parameter dari URL
    const { searchParams } = new URL(req.url);
    const kode_provinsi = searchParams.get("prov");
    const kode_kabupaten = searchParams.get("kab");
    const kode_kecamatan = searchParams.get("kec");
    const kode_desa = searchParams.get("desa");

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
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets: sheets_v4.Sheets = google.sheets({ version: "v4", auth });

    // Ambil data dari kedua sheet secara paralel
    const [keluargaData, anggotaData] = await Promise.all([
      fetchSheetData(sheets, spreadsheetId, "Keluarga"),
      fetchSheetData(sheets, spreadsheetId, "Anggota"),
    ]);

    // Jika ada parameter filter, lakukan filter
    let filteredKeluarga = keluargaData;
    // Anggota tidak difilter karena tidak ada kode wilayah di spreadsheet anggota
    if (kode_provinsi && kode_kabupaten && kode_kecamatan && kode_desa) {
      filteredKeluarga = keluargaData.filter(
        (k: any) =>
          k.kode_provinsi === kode_provinsi &&
          k.kode_kabupaten === kode_kabupaten &&
          k.kode_kecamatan === kode_kecamatan &&
          k.kode_desa === kode_desa
      );
      // filteredAnggota = anggotaData; // Tidak perlu filter anggota
    }

    // Kembalikan data dalam satu objek
    return NextResponse.json({
      keluarga: filteredKeluarga,
      anggota: anggotaData,
    });
  } catch (err: unknown) {
    console.error("API GET Error:", err);
    const message = err instanceof Error ? err.message : "Unknown Error";
    return NextResponse.json(
      { error: "Gagal mengambil data dari Google Sheets.", details: message },
      { status: 500 }
    );
  }
}
