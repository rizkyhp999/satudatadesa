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
  { sls: "Desa Kapuak", tangkiSeptik: 58, lainnya: 25, jumlah: 83 },
  { sls: "RT01", tangkiSeptik: 25, lainnya: 8, jumlah: 33 },
  { sls: "RT02", tangkiSeptik: 33, lainnya: 17, jumlah: 50 },
  { sls: "Luar Desa Kapuak", tangkiSeptik: 6, lainnya: 3, jumlah: 9 },
  { sls: "Total", tangkiSeptik: 64, lainnya: 28, jumlah: 92 },
];

const persentaseData = [
  { sls: "Desa Kapuak", tangkiSeptik: 63.04, lainnya: 27.17, jumlah: 90.22 },
  { sls: "RT01", tangkiSeptik: 27.17, lainnya: 8.7, jumlah: 35.87 },
  { sls: "RT02", tangkiSeptik: 35.87, lainnya: 18.48, jumlah: 54.35 },
  { sls: "Luar Desa Kapuak", tangkiSeptik: 6.52, lainnya: 3.26, jumlah: 9.78 },
  { sls: "Total", tangkiSeptik: 69.57, lainnya: 30.43, jumlah: 100.0 },
];

const pieColors = [
  "#2563eb", // Tangki septik/IPAL
  "#f472b6", // Lainnya
];

export default function T3p11() {
  const chartRef = useRef<HTMLDivElement>(null);
  const tablePersenRef = useRef<HTMLDivElement>(null);
  const tableJumlahRef = useRef<HTMLDivElement>(null);

  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "grafik_t3p11.png";
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
    saveAs(blob, "tabel_t3p11_persentase.xlsx");
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
    saveAs(blob, "tabel_t3p11_jumlah.xlsx");
  };

  const desaData = persentaseData.find((row) => row.sls === "Desa Kapuak");
  const pieData = [
    { name: "Tangki septik/IPAL", value: desaData?.tangkiSeptik ?? 0 },
    { name: "Lainnya", value: desaData?.lainnya ?? 0 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card className="mb-6 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Grafik Persentase Keluarga Menurut Tempat Pembuangan Akhir Tinja di
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
            Tabel 3.11 Persentase Keluarga Menurut Satuan Lingkungan Setempat
            dan Tempat Pembuangan Akhir Tinja di Desa Kapuak, 2025 (%)
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
                    Tempat Pembuangan Akhir Tinja (%)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Tangki septik/IPAL</th>
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
                      {row.tangkiSeptik}
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
            Tabel 3.11 Keluarga Menurut Satuan Lingkungan Setempat dan Tempat
            Pembuangan Akhir Tinja di Desa Kapuak, 2025 (Jumlah)
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
                    Tempat Pembuangan Akhir Tinja (Jumlah)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Tangki septik/IPAL</th>
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
                      {row.tangkiSeptik}
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
