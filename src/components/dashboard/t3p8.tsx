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
  { sls: "Desa Kapuak", listrikPLN: 66, lainnya: 17, jumlah: 83 },
  { sls: "RT01", listrikPLN: 28, lainnya: 5, jumlah: 33 },
  { sls: "RT02", listrikPLN: 38, lainnya: 12, jumlah: 50 },
  { sls: "Luar Desa Kapuak", listrikPLN: 6, lainnya: 3, jumlah: 9 },
  { sls: "Total", listrikPLN: 72, lainnya: 20, jumlah: 92 },
];

const persentaseData = [
  { sls: "Desa Kapuak", listrikPLN: 71.74, lainnya: 18.48, jumlah: 90.22 },
  { sls: "RT01", listrikPLN: 30.43, lainnya: 5.43, jumlah: 35.87 },
  { sls: "RT02", listrikPLN: 41.3, lainnya: 13.04, jumlah: 54.35 },
  { sls: "Luar Desa Kapuak", listrikPLN: 6.52, lainnya: 3.26, jumlah: 9.78 },
  { sls: "Total", listrikPLN: 78.26, lainnya: 21.74, jumlah: 100.0 },
];

const pieColors = [
  "#2563eb", // Listrik PLN
  "#f472b6", // Lainnya
];

// Fungsi download PNG dengan html-to-image
function handleDownloadChart(
  ref: React.RefObject<HTMLDivElement | null>,
  filename: string
) {
  if (!ref.current) return;
  toPng(ref.current).then((dataUrl) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  });
}

// Fungsi download Excel
function handleDownloadExcel(tableData: any[], filename: string) {
  const ws = XLSX.utils.aoa_to_sheet(tableData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Rekap");
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, filename);
}

// Data header dan body untuk tabel persentase
const persentaseTableData = [
  ["Satuan Lingkungan Setempat", "Listrik PLN", "Lainnya", "Jumlah"],
  ...persentaseData.map((row) => [
    row.sls,
    row.listrikPLN,
    row.lainnya,
    row.jumlah,
  ]),
];

// Data header dan body untuk tabel jumlah
const jumlahTableData = [
  ["Satuan Lingkungan Setempat", "Listrik PLN", "Lainnya", "Jumlah"],
  ...jumlahData.map((row) => [
    row.sls,
    row.listrikPLN,
    row.lainnya,
    row.jumlah,
  ]),
];

export default function T3p8() {
  const chartRef = useRef<HTMLDivElement>(null);

  // PieChart data: gunakan baris "Total" dari persentaseData
  const totalPersentaseData = persentaseData.find((row) => row.sls === "Total");
  const pieData = [
    { name: "Listrik PLN", value: totalPersentaseData?.listrikPLN ?? 0 },
    { name: "Lainnya", value: totalPersentaseData?.lainnya ?? 0 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card className="mb-6 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Grafik Persentase Keluarga Menurut Sumber Penerangan Utama di Desa
            Kapuak, 2025 (Pie)
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
                  label={({ name, value }) =>
                    `${name}: ${Number(value).toFixed(2)}%`
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownloadChart(chartRef, "grafik_t3p8.png")}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Grafik
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6 flex flex-col">
        <CardHeader>
          <CardTitle>
            Tabel 3.8 Persentase Keluarga Menurut Satuan Lingkungan Setempat dan
            Sumber Penerangan Utama di Desa Kapuak, 2025 (%)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto" style={{ minHeight: 320 }}>
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th rowSpan={2} className="border px-4 py-2">
                    Satuan Lingkungan Setempat
                  </th>
                  <th colSpan={3} className="border px-4 py-2">
                    Sumber Penerangan Utama (%)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Listrik PLN</th>
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
                      {row.listrikPLN}
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
                  "rekap_persentase_penerangan_2025.xlsx"
                )
              }
            >
              <Download className="w-4 h-4 mr-2" />
              Download Tabel
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Tabel 3.8 Keluarga Menurut Satuan Lingkungan Setempat dan Sumber
            Penerangan Utama di Desa Kapuak, 2025 (Jumlah)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto" style={{ minHeight: 320 }}>
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th rowSpan={2} className="border px-4 py-2">
                    Satuan Lingkungan Setempat
                  </th>
                  <th colSpan={3} className="border px-4 py-2">
                    Sumber Penerangan Utama (Jumlah)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Listrik PLN</th>
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
                      {row.listrikPLN}
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
                  "rekap_penerangan_2025.xlsx"
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
