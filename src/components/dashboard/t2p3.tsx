"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const pendidikanLabels: Record<string, string> = {
  tidakPunyaIjazah: "Tidak Punya Ijazah SD",
  tamatSD: "Tamat SD Sederajat",
  tamatSMP: "Tamat SMP Sederajat",
  tamatSMA: "Tamat SMA/SMK Sederajat",
  tamatPT: "Tamat Perguruan Tinggi",
};

const jenisKelaminLabels: Record<string, string> = {
  "1": "Laki-Laki",
  "2": "Perempuan",
};

function getKategoriIjazah(kode: string) {
  if (["23"].includes(kode)) return "tidakPunyaIjazah";
  if (["1", "2", "3", "4", "5"].includes(kode)) return "tamatSD";
  if (["6", "7", "8", "9", "10"].includes(kode)) return "tamatSMP";
  if (["11", "12", "13", "14", "15", "16", "17"].includes(kode))
    return "tamatSMA";
  if (["18", "19", "20", "21", "22"].includes(kode)) return "tamatPT";
  return undefined;
}

type Props = {
  data: any;
};

export default function T2p3({ data }: Props) {
  if (!data) return <div>Data tidak ditemukan</div>;

  // Filter anggota umur >= 15
  const filtered = data.anggota.filter((a: any) => {
    const umur = parseInt(a["310_umur"] || "0", 10);
    return umur >= 15;
  });

  // Hitung jumlah per jenis kelamin dan kategori ijazah
  const counts: Record<string, Record<string, number>> = {
    "1": {
      tidakPunyaIjazah: 0,
      tamatSD: 0,
      tamatSMP: 0,
      tamatSMA: 0,
      tamatPT: 0,
    },
    "2": {
      tidakPunyaIjazah: 0,
      tamatSD: 0,
      tamatSMP: 0,
      tamatSMA: 0,
      tamatPT: 0,
    },
  };

  filtered.forEach((a: any) => {
    const jk = a["308_jenisKelamin"];
    const ijazah = a["404_ijazahTertinggi"];
    const kategori = getKategoriIjazah(ijazah);
    if ((jk === "1" || jk === "2") && kategori) {
      counts[jk][kategori] += 1;
    }
  });

  // Data untuk tabel
  const kategoriOrder = [
    "tidakPunyaIjazah",
    "tamatSD",
    "tamatSMP",
    "tamatSMA",
    "tamatPT",
  ];
  const totalPerBaris = {
    "1": kategoriOrder.reduce((sum, k) => sum + counts["1"][k], 0),
    "2": kategoriOrder.reduce((sum, k) => sum + counts["2"][k], 0),
  };
  const totalPerKolom: Record<string, number> = {};
  kategoriOrder.forEach((k) => {
    totalPerKolom[k] = counts["1"][k] + counts["2"][k];
  });
  const grandTotal = totalPerBaris["1"] + totalPerBaris["2"];

  // Persentase
  const persentase = {
    "1": kategoriOrder.map((k) =>
      totalPerBaris["1"] ? (counts["1"][k] / totalPerBaris["1"]) * 100 : 0
    ),
    "2": kategoriOrder.map((k) =>
      totalPerBaris["2"] ? (counts["2"][k] / totalPerBaris["2"]) * 100 : 0
    ),
    total: kategoriOrder.map((k) =>
      grandTotal ? (totalPerKolom[k] / grandTotal) * 100 : 0
    ),
  };

  // Download table as Excel
  const handleDownloadTable = () => {
    const wsData = [
      [
        "Jenis Kelamin",
        ...kategoriOrder.map((k) => pendidikanLabels[k]),
        "Jumlah",
      ],
      [
        jenisKelaminLabels["1"],
        ...kategoriOrder.map((k) => counts["1"][k]),
        totalPerBaris["1"],
      ],
      [
        jenisKelaminLabels["2"],
        ...kategoriOrder.map((k) => counts["2"][k]),
        totalPerBaris["2"],
      ],
      ["Total", ...kategoriOrder.map((k) => totalPerKolom[k]), grandTotal],
      ["%", ...persentase.total.map((p) => p.toFixed(2) + "%"), ""],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekap");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "rekap_pendidikan_ijazah_15plus.xlsx");
  };

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>
          Persentase Penduduk Berumur 15 Tahun ke Atas Menurut Jenis Kelamin dan
          Tingkat Pendidikan Tertinggi yang Ditamatkan (Ijazah/STTB Tertinggi
          yang Dimiliki) di Desa, 2025
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2 align-middle bg-gray-50">
                  Jenis Kelamin
                </th>
                {kategoriOrder.map((k) => (
                  <th
                    key={k}
                    className="border px-4 py-2 text-center bg-gray-50"
                  >
                    {pendidikanLabels[k]}
                  </th>
                ))}
                <th className="border px-4 py-2 text-center bg-gray-50">
                  Jumlah
                </th>
              </tr>
            </thead>
            <tbody>
              {(["1", "2"] as const).map((jk) => (
                <tr key={jk} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{jenisKelaminLabels[jk]}</td>
                  {kategoriOrder.map((k, i) => (
                    <td key={k} className="border px-4 py-2 text-center">
                      {counts[jk][k]}
                    </td>
                  ))}
                  <td className="border px-4 py-2 text-center font-semibold">
                    {totalPerBaris[jk]}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border px-4 py-2 font-bold bg-gray-100">
                  Total
                </td>
                {kategoriOrder.map((k) => (
                  <td
                    key={k}
                    className="border px-4 py-2 text-center font-bold bg-gray-100"
                  >
                    {totalPerKolom[k]}
                  </td>
                ))}
                <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                  {grandTotal}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold bg-gray-100">%</td>
                {persentase.total.map((p, i) => (
                  <td
                    key={i}
                    className="border px-4 py-2 text-center font-bold bg-gray-100"
                  >
                    {p.toFixed(2)}%
                  </td>
                ))}
                <td className="border px-4 py-2 bg-gray-100"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-2">
          <Button variant="outline" size="sm" onClick={handleDownloadTable}>
            <Download className="w-4 h-4 mr-2" />
            Download Tabel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
