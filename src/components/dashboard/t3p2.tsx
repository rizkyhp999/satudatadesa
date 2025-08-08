"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const jumlahData = [
  {
    sls: "Desa Kapuak",
    marmerGranit: 0,
    keramik: 33,
    parketVinilKarpet: 0,
    ubinTegelTeraso: 0,
    kayuPapan: 48,
    sememBataMerah: 2,
    lainnya: 0,
    jumlah: 83,
  },
  {
    sls: "RT01",
    marmerGranit: 0,
    keramik: 14,
    parketVinilKarpet: 0,
    ubinTegelTeraso: 0,
    kayuPapan: 18,
    sememBataMerah: 1,
    lainnya: 0,
    jumlah: 33,
  },
  {
    sls: "RT02",
    marmerGranit: 0,
    keramik: 19,
    parketVinilKarpet: 0,
    ubinTegelTeraso: 0,
    kayuPapan: 30,
    sememBataMerah: 1,
    lainnya: 0,
    jumlah: 50,
  },
  {
    sls: "Luar Desa Kapuak",
    marmerGranit: 0,
    keramik: 3,
    parketVinilKarpet: 0,
    ubinTegelTeraso: 0,
    kayuPapan: 6,
    sememBataMerah: 0,
    lainnya: 0,
    jumlah: 9,
  },
  {
    sls: "Total",
    marmerGranit: 0,
    keramik: 36,
    parketVinilKarpet: 0,
    ubinTegelTeraso: 0,
    kayuPapan: 54,
    sememBataMerah: 2,
    lainnya: 0,
    jumlah: 92,
  },
];

const persentaseData = [
  {
    sls: "Desa Kapuak",
    marmerGranit: 0.0,
    keramik: 35.87,
    parketVinilKarpet: 0.0,
    ubinTegelTeraso: 0.0,
    kayuPapan: 52.17,
    sememBataMerah: 2.17,
    lainnya: 0.0,
    jumlah: 90.22,
  },
  {
    sls: "RT01",
    marmerGranit: 0.0,
    keramik: 15.22,
    parketVinilKarpet: 0.0,
    ubinTegelTeraso: 0.0,
    kayuPapan: 19.57,
    sememBataMerah: 1.09,
    lainnya: 0.0,
    jumlah: 35.87,
  },
  {
    sls: "RT02",
    marmerGranit: 0.0,
    keramik: 20.65,
    parketVinilKarpet: 0.0,
    ubinTegelTeraso: 0.0,
    kayuPapan: 32.61,
    sememBataMerah: 1.09,
    lainnya: 0.0,
    jumlah: 54.35,
  },
  {
    sls: "Luar Desa Kapuak",
    marmerGranit: 0.0,
    keramik: 3.26,
    parketVinilKarpet: 0.0,
    ubinTegelTeraso: 0.0,
    kayuPapan: 6.52,
    sememBataMerah: 0.0,
    lainnya: 0.0,
    jumlah: 9.78,
  },
  {
    sls: "Total",
    marmerGranit: 0.0,
    keramik: 39.13,
    parketVinilKarpet: 0.0,
    ubinTegelTeraso: 0.0,
    kayuPapan: 58.7,
    sememBataMerah: 2.17,
    lainnya: 0.0,
    jumlah: 100.0,
  },
];

const pieColors = [
  "#2563eb", // Marmer/Granit
  "#fbbf24", // Keramik
  "#10b981", // Parket/Vinil/Karpet
  "#a78bfa", // Ubin/Tegel/Teraso
  "#f472b6", // Kayu/Papan
  "#fb7185", // Semen/Bata Merah
  "#94a3b8", // Lainnya
];

export default function T3p2() {
  const chartRef = useRef<HTMLDivElement>(null);

  const desaData = persentaseData.find((row) => row.sls === "Desa Kapuak");
  const pieData = [
    { name: "Marmer/Granit", value: desaData?.marmerGranit ?? 0 },
    { name: "Keramik", value: desaData?.keramik ?? 0 },
    { name: "Parket/Vinil/Karpet", value: desaData?.parketVinilKarpet ?? 0 },
    { name: "Ubin/Tegel/Teraso", value: desaData?.ubinTegelTeraso ?? 0 },
    { name: "Kayu/Papan", value: desaData?.kayuPapan ?? 0 },
    { name: "Semen/Bata Merah", value: desaData?.sememBataMerah ?? 0 },
    { name: "Lainnya", value: desaData?.lainnya ?? 0 },
  ];

  // Download grafik Pie
  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "piechart_t3p2.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  // Refactor: Download table as Excel, menerima data dan nama file
  const handleDownloadExcel = (tableData: any[], filename: string) => {
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekap");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, filename);
  };

  // Data header dan body untuk tabel persentase
  const persentaseTableData = [
    [
      "Satuan Lingkungan Setempat",
      "Marmer/Granit",
      "Keramik",
      "Parket/Vinil/Karpet",
      "Ubin/Tegel/Teraso",
      "Kayu/Papan",
      "Semen/Bata Merah",
      "Lainnya",
      "Jumlah",
    ],
    ...persentaseData.map((row) => [
      row.sls,
      row.marmerGranit,
      row.keramik,
      row.parketVinilKarpet,
      row.ubinTegelTeraso,
      row.kayuPapan,
      row.sememBataMerah,
      row.lainnya,
      row.jumlah,
    ]),
  ];

  // Data header dan body untuk tabel jumlah
  const jumlahTableData = [
    [
      "Satuan Lingkungan Setempat",
      "Marmer/Granit",
      "Keramik",
      "Parket/Vinil/Karpet",
      "Ubin/Tegel/Teraso",
      "Kayu/Papan",
      "Semen/Bata Merah",
      "Lainnya",
      "Jumlah",
    ],
    ...jumlahData.map((row) => [
      row.sls,
      row.marmerGranit,
      row.keramik,
      row.parketVinilKarpet,
      row.ubinTegelTeraso,
      row.kayuPapan,
      row.sememBataMerah,
      row.lainnya,
      row.jumlah,
    ]),
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card className="mb-6 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Grafik Persentase Keluarga Menurut Bahan Bangunan Utama Lantai Rumah
            Terluas di Desa Kapuak, 2025 (Pie)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4">
          <div
            className="flex justify-center items-center h-full w-full flex-1"
            style={{ minHeight: 420 }}
            ref={chartRef}
          >
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, percent }) =>
                    `${name}: ${((percent ?? 0) * 100).toFixed(1)}%`
                  }
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={pieColors[idx]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-end mt-2">
            <Button variant="outline" size="sm" onClick={handleDownloadChart}>
              <Download className="w-4 h-4 mr-2" />
              Download Grafik
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6 flex flex-col">
        <CardHeader>
          <CardTitle>
            Tabel 3.2 Persentase Keluarga Menurut Satuan Lingkungan Setempat dan
            Bahan Bangunan Utama Lantai Rumah Terluas di Desa Kapuak, 2025 (%)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="overflow-x-auto" style={{ minHeight: 420 }}>
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2" rowSpan={2}>
                    Satuan Lingkungan Setempat
                  </th>
                  <th className="border px-4 py-2" colSpan={8}>
                    Bahan Bangunan Utama Lantai Rumah Terluas (%)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Marmer/Granit</th>
                  <th className="border px-4 py-2">Keramik</th>
                  <th className="border px-4 py-2">Parket/Vinil/Karpet</th>
                  <th className="border px-4 py-2">Ubin/Tegel/Teraso</th>
                  <th className="border px-4 py-2">Kayu/Papan</th>
                  <th className="border px-4 py-2">Semen/Bata Merah</th>
                  <th className="border px-4 py-2">Lainnya</th>
                  <th className="border px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {persentaseData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 font-semibold">
                      {row.sls}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.marmerGranit}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.keramik}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.parketVinilKarpet}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.ubinTegelTeraso}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.kayuPapan}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.sememBataMerah}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.lainnya}
                    </td>
                    <td className="border px-4 py-2 text-center font-bold">
                      {row.jumlah}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleDownloadExcel(
                  persentaseTableData,
                  "rekap_persentase_lantai_rumah_2025.xlsx"
                )
              }
            >
              <Download className="w-4 h-4 mr-2" />
              Download Tabel
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>
            Tabel 3.2 Keluarga Menurut Satuan Lingkungan Setempat dan Bahan
            Bangunan Utama Lantai Rumah Terluas di Desa Kapuak, 2025 (Jumlah)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="overflow-x-auto" style={{ minHeight: 420 }}>
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2" rowSpan={2}>
                    Satuan Lingkungan Setempat
                  </th>
                  <th className="border px-4 py-2" colSpan={8}>
                    Bahan Bangunan Utama Lantai Rumah Terluas (Jumlah)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Marmer/Granit</th>
                  <th className="border px-4 py-2">Keramik</th>
                  <th className="border px-4 py-2">Parket/Vinil/Karpet</th>
                  <th className="border px-4 py-2">Ubin/Tegel/Teraso</th>
                  <th className="border px-4 py-2">Kayu/Papan</th>
                  <th className="border px-4 py-2">Semen/Bata Merah</th>
                  <th className="border px-4 py-2">Lainnya</th>
                  <th className="border px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {jumlahData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 font-semibold">
                      {row.sls}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.marmerGranit}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.keramik}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.parketVinilKarpet}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.ubinTegelTeraso}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.kayuPapan}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.sememBataMerah}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.lainnya}
                    </td>
                    <td className="border px-4 py-2 text-center font-bold">
                      {row.jumlah}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleDownloadExcel(
                  jumlahTableData,
                  "rekap_lantai_rumah_2025.xlsx"
                )
              }
            >
              <Download className="w-4 h-4 mr-2" />
              Download Tabel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
