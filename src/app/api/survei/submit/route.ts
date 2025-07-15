import { NextRequest, NextResponse } from "next/server";
import { google, sheets_v4 } from "googleapis";
import type { SurveyResponse } from "@/types/survey";
/* eslint-disable @typescript-eslint/no-explicit-any */

/* Fungsi utilitas */
function formatArrayValue(value: any): string {
  if (Array.isArray(value)) return value.join(", ");
  return value;
}

function mapRowToObject(row: string[], headers: string[]) {
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
  if (!rows || rows.length < 2) return [];
  const headers = rows[0];
  return rows.slice(1).map((row) => mapRowToObject(row, headers));
}

async function writeHeadersIfNeeded(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
  headers: string[]
) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:1`,
    });

    if (!res.data.values || res.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: "RAW",
        requestBody: {
          values: [headers],
        },
      });
    }
  } catch (err: any) {
    if (err.code !== 400) throw err;
  }
}

export async function POST(req: NextRequest) {
  try {
    const surveyData: SurveyResponse = await req.json();
    const { blok1, blok2, anggotaKeluarga, blok8, blok9, blok10 } = surveyData;

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

    // ===================== CEK DUPLIKAT KK & NIK =====================
    const existingKeluarga = await fetchSheetData(
      sheets,
      spreadsheetId,
      "Keluarga"
    );
    const existingKKs = new Set(
      existingKeluarga.map((row) => row["104_nomorKK"])
    );

    const existingAnggota = await fetchSheetData(
      sheets,
      spreadsheetId,
      "Anggota"
    );
    const existingNIKs = new Set(existingAnggota.map((row) => row["303_nik"]));

    // Cek KK
    if (existingKKs.has(blok1["104_nomorKK"])) {
      return NextResponse.json(
        { error: `Nomor KK ${blok1["104_nomorKK"]} sudah ada.` },
        { status: 400 }
      );
    }

    // Cek NIK
    const duplikatNIK = anggotaKeluarga.find((anggota) =>
      existingNIKs.has(anggota.blok3["303_nik"])
    );

    if (duplikatNIK) {
      return NextResponse.json(
        { error: `NIK ${duplikatNIK.blok3["303_nik"]} sudah ada.` },
        { status: 400 }
      );
    }

    // ======================= SHEET 1: Keluarga =======================
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
      "801_statusKepemilikanBangunan",
      "802_luasLantai",
      "803_jenisLantai",
      "804_jenisDinding",
      "805_jenisAtap",
      "806_sumberAirMinum",
      "807_sumberAirMandi",
      "808a_sumberPenerangan",
      "808b_dayaTerpasang1",
      "808b_dayaTerpasang2",
      "808b_dayaTerpasang3",
      "809_bahanBakarMasak",
      "810a_kepemilikanFasilitasBAB",
      "810b_jenisKloset",
      "811_tempatBuangTinja",
      "901a_asetLahan",
      "901b_asetRumahLain",
      "902a_tabungGas",
      "902b_kulkas",
      "902c_ac",
      "902d_tv",
      "902e_emas",
      "902f_komputer",
      "902g_motor",
      "902h_perahuMotor",
      "902i_mobil",
      "902j_sepeda",
      "902k_perahu",
      "902l_smartphone",
      "903a_sapi",
      "903b_kerbau",
      "903c_kuda",
      "903d_babi",
      "903e_kambing",
      "904a_BPNT",
      "904b_PKH",
      "904c_BLTDesa",
      "904d_SubsidiListrik",
      "904e_BantuanPemda",
      "904f_SubsidiPupuk",
      "904g_BantuanDesa",
      "904g_catatan",
      "904h_BantuanLainnya",
      "904h_catatan",
      "905a_jenisBantuanSawit",
      "905b_jenisBantuanIkanLele",
      "905c_jenisBantuanSayurBuah",
      "906a_terimaBantuanSawit",
      "906b_terimaBantuanIkanLele",
      "906c_terimaBantuanSayurBuah",
      "907a_lanjutanBantuanSawit",
      "907b_lanjutanBantuanIkanLele",
      "907c_lanjutanBantuanSayurBuah",
      "908a_alasanTidakLanjutSawit",
      "908b_alasanTidakLanjutIkanLele",
      "908c_alasanTidakLanjutSayurBuah",
      "909a_programDukungSawit",
      "909a_lainnya",
      "909b_programDukungIkanLele",
      "909b_lainnya",
      "909c_programDukungSayurBuah",
      "909c_lainnya",
      "1001_catatan",
    ];

    await writeHeadersIfNeeded(
      sheets,
      spreadsheetId,
      "Keluarga",
      sheet1Headers
    );

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
      blok8["801_statusKepemilikanBangunan"],
      blok8["802_luasLantai"],
      blok8["803_jenisLantai"],
      blok8["804_jenisDinding"],
      blok8["805_jenisAtap"],
      blok8["806_sumberAirMinum"],
      blok8["807_sumberAirMandi"],
      blok8["808a_sumberPenerangan"],
      blok8["808b_dayaTerpasang1"],
      blok8["808b_dayaTerpasang2"],
      blok8["808b_dayaTerpasang3"],
      blok8["809_bahanBakarMasak"],
      blok8["810a_kepemilikanFasilitasBAB"],
      blok8["810b_jenisKloset"],
      blok8["811_tempatBuangTinja"],
      blok9["901a_asetLahan"],
      blok9["901b_asetRumahLain"],
      blok9["902a_tabungGas"],
      blok9["902b_kulkas"],
      blok9["902c_ac"],
      blok9["902d_tv"],
      blok9["902e_emas"],
      blok9["902f_komputer"],
      blok9["902g_motor"],
      blok9["902h_perahuMotor"],
      blok9["902i_mobil"],
      blok9["902j_sepeda"],
      blok9["902k_perahu"],
      blok9["902l_smartphone"],
      blok9["903a_sapi"],
      blok9["903b_kerbau"],
      blok9["903c_kuda"],
      blok9["903d_babi"],
      blok9["903e_kambing"],
      blok9["904a_BPNT"],
      blok9["904b_PKH"],
      blok9["904c_BLTDesa"],
      blok9["904d_SubsidiListrik"],
      blok9["904e_BantuanPemda"],
      "904f_SubsidiPupuk",
      blok9["904g_BantuanDesa"],
      blok9["904g_catatan"],
      blok9["904h_BantuanLainnya"],
      blok9["904h_catatan"],
      blok9["905a_jenisBantuanSawit"],
      blok9["905b_jenisBantuanIkanLele"],
      blok9["905c_jenisBantuanSayurBuah"],
      blok9["906a_terimaBantuanSawit"],
      blok9["906b_terimaBantuanIkanLele"],
      blok9["906c_terimaBantuanSayurBuah"],
      blok9["907a_lanjutanBantuanSawit"],
      blok9["907b_lanjutanBantuanIkanLele"],
      blok9["907c_lanjutanBantuanSayurBuah"],
      formatArrayValue(blok9["908a_alasanTidakLanjutSawit"]),
      formatArrayValue(blok9["908b_alasanTidakLanjutIkanLele"]),
      formatArrayValue(blok9["908c_alasanTidakLanjutSayurBuah"]),
      formatArrayValue(blok9["909a_programDukungSawit"]),
      blok9["909a_lainnya"],
      formatArrayValue(blok9["909b_programDukungIkanLele"]),
      blok9["909b_lainnya"],
      formatArrayValue(blok9["909c_programDukungSayurBuah"]),
      blok9["909c_lainnya"],
      blok10["1001_catatan"],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Keluarga!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [dataSheet1],
      },
    });

    // ======================= SHEET 2: Anggota =======================
    if (anggotaKeluarga && anggotaKeluarga.length > 0) {
      const sheet2Headers = [
        "nomorKK_FK",
        ...Object.keys(anggotaKeluarga[0].blok3),
        ...Object.keys(anggotaKeluarga[0].blok4),
        ...Object.keys(anggotaKeluarga[0].blok5),
        ...Object.keys(anggotaKeluarga[0].blok6),
        ...Object.keys(anggotaKeluarga[0].blok7),
      ];

      await writeHeadersIfNeeded(
        sheets,
        spreadsheetId,
        "Anggota",
        sheet2Headers
      );

      const rowsToAppend = anggotaKeluarga.map((anggota) => [
        blok1["104_nomorKK"],
        ...Object.values(anggota.blok3),
        ...Object.values(anggota.blok4),
        ...Object.values(anggota.blok5),
        ...Object.values(anggota.blok6),
        ...Object.values(anggota.blok7),
      ]);

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Anggota!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: rowsToAppend,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("API Error:", err);
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
