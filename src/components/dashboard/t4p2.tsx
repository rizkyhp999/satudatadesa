"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const data = [
  { jenis: "Bibit Sawit", jumlah: 22 },
  { jenis: "Benih ikan lele", jumlah: 23 },
  { jenis: "Bibit sayuran dan buah-buahan", jumlah: 24 },
];

export default function T4p2() {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "grafik_t4p2.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  const handleDownloadTable = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tabel");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "tabel_t4p2.xlsx");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Card Grafik */}
      <Card>
        <CardHeader>
          <CardTitle>
            Grafik Jumlah Keluarga Penerima Bantuan Pertanian Pemerintah Desa di
            Desa Kapuak, 2022-2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={chartRef} style={{ minHeight: 320 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jenis" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="jumlah" fill="#2563eb" name="Jumlah" />
              </BarChart>
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
      {/* Card Tabel */}
      <Card>
        <CardHeader>
          <CardTitle>
            Tabel 4.2 Jumlah Keluarga Penerima Bantuan Pertanian Pemerintah Desa
            di Desa Kapuak, 2022-2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2">Jenis Bantuan</th>
                  <th className="border px-4 py-2">2024</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{row.jenis}</td>
                    <td className="border px-4 py-2 text-center">
                      {row.jumlah}
                    </td>
                  </tr>
                ))}
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
    </div>
  );
}
