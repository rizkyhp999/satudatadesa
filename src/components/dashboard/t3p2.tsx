"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useMemo, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { toPng } from "html-to-image";

type Props = {
  data: any;
};

const partisipasiMap = {
  "1": "Tidak/Belum Pernah Sekolah",
  "2": "Masih Bersekolah",
  "3": "Tidak Bersekolah Lagi",
};

const jenjangMap: Record<string, string> = {
  "1": "SD Sederajat",
  "2": "SD Sederajat",
  "3": "SD Sederajat",
  "4": "SD Sederajat",
  "5": "SD Sederajat",
  "6": "SMP Sederajat",
  "7": "SMP Sederajat",
  "8": "SMP Sederajat",
  "9": "SMP Sederajat",
  "10": "SMP Sederajat",
  "11": "SMA Sederajat",
  "12": "SMA Sederajat",
  "13": "SMA Sederajat",
  "14": "SMA Sederajat",
  "15": "SMA Sederajat",
  "16": "SMA Sederajat",
  "17": "SMA Sederajat",
  "18": "Perguruan Tinggi",
  "19": "Perguruan Tinggi",
  "20": "Perguruan Tinggi",
  "21": "Perguruan Tinggi",
  "22": "Perguruan Tinggi",
};

const jenjangOrder = [
  "SD Sederajat",
  "SMP Sederajat",
  "SMA Sederajat",
  "Perguruan Tinggi",
];

const partisipasiOrder = [
  "Tidak/Belum Pernah Sekolah",
  "Masih Bersekolah",
  "Tidak Bersekolah Lagi",
];

const jenisKelaminOrder = [
  { key: "1", label: "Laki-Laki" },
  { key: "2", label: "Perempuan" },
];

export default function T3P2({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  // Rekap data
  const summary = useMemo(() => {
    // Struktur: [jenisKelamin][partisipasi][jenjang/total] = jumlah
    const result: Record<string, Record<string, Record<string, number>>> = {};

    for (const jk of ["1", "2"]) {
      result[jk] = {};
      // Tidak/Belum Pernah Sekolah
      result[jk]["Tidak/Belum Pernah Sekolah"] = { "SD Sederajat": 0 };
      // Masih Bersekolah
      result[jk]["Masih Bersekolah"] = {};
      for (const jenjang of jenjangOrder) {
        result[jk]["Masih Bersekolah"][jenjang] = 0;
      }
      // Tidak Bersekolah Lagi (hanya total)
      result[jk]["Tidak Bersekolah Lagi"] = { total: 0 };
    }

    data.anggota
      .filter((a: any) => {
        const umur = parseInt(a["310_umur"], 10);
        return !isNaN(umur) && umur >= 5;
      })
      .forEach((a: any) => {
        const jk = a["308_jenisKelamin"];
        const part =
          partisipasiMap[
            String(a["401_partisipasiSekolah"]) as "1" | "2" | "3"
          ];
        const kodeJenjang = a["402_jenjangPendidikan"];
        const jenjang = jenjangMap[kodeJenjang];

        if (!jk || !part) return;

        if (part === "Tidak/Belum Pernah Sekolah") {
          result[jk][part]["SD Sederajat"] += 1;
        } else if (
          part === "Masih Bersekolah" &&
          jenjang &&
          jenjangOrder.includes(jenjang)
        ) {
          result[jk][part][jenjang] += 1;
        } else if (part === "Tidak Bersekolah Lagi") {
          result[jk][part]["total"] += 1;
        }
      });

    // Hitung total per baris
    const total: Record<string, Record<string, number>> = {};
    total["Tidak/Belum Pernah Sekolah"] = {
      "SD Sederajat":
        result["1"]["Tidak/Belum Pernah Sekolah"]["SD Sederajat"] +
        result["2"]["Tidak/Belum Pernah Sekolah"]["SD Sederajat"],
    };
    total["Masih Bersekolah"] = {};
    for (const jenjang of jenjangOrder) {
      total["Masih Bersekolah"][jenjang] =
        result["1"]["Masih Bersekolah"][jenjang] +
        result["2"]["Masih Bersekolah"][jenjang];
    }
    total["Tidak Bersekolah Lagi"] = {
      total:
        result["1"]["Tidak Bersekolah Lagi"]["total"] +
        result["2"]["Tidak Bersekolah Lagi"]["total"],
    };

    // Data untuk grafik
    const chartData = [
      {
        kategori: "Tidak/Belum Pernah Sekolah",
        "Laki-Laki": result["1"]["Tidak/Belum Pernah Sekolah"]["SD Sederajat"],
        Perempuan: result["2"]["Tidak/Belum Pernah Sekolah"]["SD Sederajat"],
      },
      ...jenjangOrder.map((jenjang) => ({
        kategori: `Masih Bersekolah - ${jenjang}`,
        "Laki-Laki": result["1"]["Masih Bersekolah"][jenjang],
        Perempuan: result["2"]["Masih Bersekolah"][jenjang],
      })),
      {
        kategori: "Tidak Bersekolah Lagi",
        "Laki-Laki": result["1"]["Tidak Bersekolah Lagi"]["total"],
        Perempuan: result["2"]["Tidak Bersekolah Lagi"]["total"],
      },
    ];

    return { result, total, chartData };
  }, [data]);

  const handleDownloadExcel = () => {
    const wsData = [
      [
        "Jenis Kelamin",
        "Tidak/Belum Pernah Sekolah",
        "Masih Bersekolah - SD Sederajat",
        "Masih Bersekolah - SMP Sederajat",
        "Masih Bersekolah - SMA Sederajat",
        "Masih Bersekolah - Perguruan Tinggi",
        "Tidak Bersekolah Lagi",
      ],
      ...jenisKelaminOrder.map(({ key, label }) => [
        label,
        summary.result[key]["Tidak/Belum Pernah Sekolah"]["SD Sederajat"],
        summary.result[key]["Masih Bersekolah"]["SD Sederajat"],
        summary.result[key]["Masih Bersekolah"]["SMP Sederajat"],
        summary.result[key]["Masih Bersekolah"]["SMA Sederajat"],
        summary.result[key]["Masih Bersekolah"]["Perguruan Tinggi"],
        summary.result[key]["Tidak Bersekolah Lagi"]["total"],
      ]),
      [
        "Total",
        summary.total["Tidak/Belum Pernah Sekolah"]["SD Sederajat"],
        summary.total["Masih Bersekolah"]["SD Sederajat"],
        summary.total["Masih Bersekolah"]["SMP Sederajat"],
        summary.total["Masih Bersekolah"]["SMA Sederajat"],
        summary.total["Masih Bersekolah"]["Perguruan Tinggi"],
        summary.total["Tidak Bersekolah Lagi"]["total"],
      ],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Partisipasi Sekolah");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "partisipasi_sekolah_jenjang_pendidikan.xlsx");
  };

  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "grafik_pendidikan_umur5_keatas.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <Card className="mb-6 md:mb-0 md:w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle>
              Jumlah Penduduk Berumur 5 Tahun ke Atas Menurut Jenis Kelamin dan
              Status Pendidikan di Desa, 2025 (Grafik)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div ref={chartRef} className="w-full" style={{ minHeight: 420 }}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={summary.chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis
                    type="category"
                    dataKey="kategori"
                    width={200}
                    tick={{ fontSize: 13 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Laki-Laki" fill="#2563eb" />
                  <Bar dataKey="Perempuan" fill="#f472b6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm" onClick={handleDownloadChart}>
                Download Grafik
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="md:w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle>
              Jumlah Penduduk Berumur 5 Tahun ke Atas Menurut Jenis Kelamin dan
              Status Pendidikan di Desa, 2025 (Tabel)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="overflow-x-auto" style={{ minHeight: 420 }}>
              <table className="w-full text-sm border border-gray-200">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 bg-gray-50" rowSpan={2}>
                      Jenis Kelamin
                    </th>
                    <th className="border px-4 py-2 bg-gray-50" rowSpan={2}>
                      Tidak/Belum
                      <br />
                      Pernah Sekolah
                    </th>
                    <th className="border px-4 py-2 bg-gray-50" colSpan={4}>
                      Masih Bersekolah
                    </th>
                    <th className="border px-4 py-2 bg-gray-50" rowSpan={2}>
                      Tidak Bersekolah Lagi
                    </th>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2 bg-gray-50">
                      SD Sederajat
                    </th>
                    <th className="border px-4 py-2 bg-gray-50">
                      SMP Sederajat
                    </th>
                    <th className="border px-4 py-2 bg-gray-50">
                      SMA Sederajat
                    </th>
                    <th className="border px-4 py-2 bg-gray-50">
                      Perguruan Tinggi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jenisKelaminOrder.map(({ key, label }) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{label}</td>
                      <td className="border px-4 py-2 text-center">
                        {
                          summary.result[key]["Tidak/Belum Pernah Sekolah"][
                            "SD Sederajat"
                          ]
                        }
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {
                          summary.result[key]["Masih Bersekolah"][
                            "SD Sederajat"
                          ]
                        }
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {
                          summary.result[key]["Masih Bersekolah"][
                            "SMP Sederajat"
                          ]
                        }
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {
                          summary.result[key]["Masih Bersekolah"][
                            "SMA Sederajat"
                          ]
                        }
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {
                          summary.result[key]["Masih Bersekolah"][
                            "Perguruan Tinggi"
                          ]
                        }
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {summary.result[key]["Tidak Bersekolah Lagi"]["total"]}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-gray-100">
                    <td className="border px-4 py-2">Total</td>
                    <td className="border px-4 py-2 text-center">
                      {
                        summary.total["Tidak/Belum Pernah Sekolah"][
                          "SD Sederajat"
                        ]
                      }
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {summary.total["Masih Bersekolah"]["SD Sederajat"]}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {summary.total["Masih Bersekolah"]["SMP Sederajat"]}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {summary.total["Masih Bersekolah"]["SMA Sederajat"]}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {summary.total["Masih Bersekolah"]["Perguruan Tinggi"]}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {summary.total["Tidak Bersekolah Lagi"]["total"]}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm" onClick={handleDownloadExcel}>
                Download Excel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
