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
  { sls: "Desa Kapuak", leherAngsa: 77, lainnya: 6, jumlah: 83 },
  { sls: "RT01", leherAngsa: 30, lainnya: 3, jumlah: 33 },
  { sls: "RT02", leherAngsa: 47, lainnya: 3, jumlah: 50 },
  { sls: "Luar Desa Kapuak", leherAngsa: 9, lainnya: 0, jumlah: 9 },
  { sls: "Total", leherAngsa: 86, lainnya: 6, jumlah: 92 },
];

const persentaseData = [
  { sls: "Desa Kapuak", leherAngsa: 83.7, lainnya: 6.52, jumlah: 90.22 },
  { sls: "RT01", leherAngsa: 32.61, lainnya: 3.26, jumlah: 35.87 },
  { sls: "RT02", leherAngsa: 51.09, lainnya: 3.26, jumlah: 54.35 },
  { sls: "Luar Desa Kapuak", leherAngsa: 9.78, lainnya: 0.0, jumlah: 9.78 },
  { sls: "Total", leherAngsa: 93.48, lainnya: 6.52, jumlah: 100.0 },
];

const pieColors = [
  "#2563eb", // Leher Angsa
  "#f472b6", // Lainnya
];

export default function T3p10() {
  const chartRef = useRef<HTMLDivElement>(null);
  const tablePersenRef = useRef<HTMLDivElement>(null);
  const tableJumlahRef = useRef<HTMLDivElement>(null);

  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "grafik_t3p10.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  const handleDownloadTablePersen = () => {
    const worksheet = XLSX.utils.json_to_sheet(persentaseData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Persentase");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "tabel_t3p10_persentase.xlsx");
  };

  const handleDownloadTableJumlah = () => {
    const worksheet = XLSX.utils.json_to_sheet(jumlahData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jumlah");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "tabel_t3p10_jumlah.xlsx");
  };

  const desaData = persentaseData.find((row) => row.sls === "Desa Kapuak");
  const pieData = [
    { name: "Leher Angsa", value: desaData?.leherAngsa ?? 0 },
    { name: "Lainnya", value: desaData?.lainnya ?? 0 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card className="mb-6 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Grafik Persentase Keluarga Menurut Jenis Kloset yang Digunakan di
            Desa Kapuak, 2025 (Pie)
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
            Tabel 3.10 Persentase Keluarga Menurut Satuan Lingkungan Setempat
            dan Jenis Kloset yang Digunakan di Desa Kapuak, 2025 (%)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="overflow-x-auto"
            style={{ minHeight: 320 }}
            ref={tablePersenRef}
          >
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th rowSpan={2} className="border px-4 py-2">
                    Satuan Lingkungan Setempat
                  </th>
                  <th colSpan={3} className="border px-4 py-2">
                    Jenis Kloset yang Digunakan (%)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Leher Angsa</th>
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
                      {row.leherAngsa}
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
              onClick={handleDownloadTablePersen}
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
            Tabel 3.10 Keluarga Menurut Satuan Lingkungan Setempat dan Jenis
            Kloset yang Digunakan di Desa Kapuak, 2025 (Jumlah)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="overflow-x-auto"
            style={{ minHeight: 320 }}
            ref={tableJumlahRef}
          >
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th rowSpan={2} className="border px-4 py-2">
                    Satuan Lingkungan Setempat
                  </th>
                  <th colSpan={3} className="border px-4 py-2">
                    Jenis Kloset yang Digunakan (Jumlah)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Leher Angsa</th>
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
                      {row.leherAngsa}
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
              onClick={handleDownloadTableJumlah}
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
