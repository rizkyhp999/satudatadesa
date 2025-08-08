"use client";

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
import { useRef } from "react";

const data = [
  { jenis: "Bantuan Pangan Non Tunai (BPNT)", jumlah: 0 },
  { jenis: "Program Keluarga Harapan (PKH)", jumlah: 5 },
  { jenis: "Bantuan Langsung Tunai (BLT) Desa", jumlah: 16 },
  { jenis: "Subsidi Listrik", jumlah: 10 },
  { jenis: "Bantuan Pemerintah Daerah", jumlah: 1 },
  { jenis: "Bantuan Subsidi Pupuk", jumlah: 11 },
  { jenis: "Bantuan Pemerintah Desa", jumlah: 21 },
  { jenis: "Lainnya", jumlah: 0 },
];

// Fungsi download grafik PNG
function handleDownloadChart(
  ref: React.RefObject<HTMLDivElement>,
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

// Fungsi download tabel Excel
function handleDownloadExcel(tableData: any[], filename: string) {
  const ws = XLSX.utils.aoa_to_sheet(tableData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Rekap");
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, filename);
}

// Data header dan body untuk tabel
const tableData = [
  ["Jenis Bantuan", "2024"],
  ...data.map((row) => [row.jenis, row.jumlah]),
];

export default function T4p1() {
  const chartRef = useRef<HTMLDivElement>(null!);

  return (
    <div className="flex flex-col gap-6">
      {/* Card Grafik */}
      <Card>
        <CardHeader>
          <CardTitle>
            Grafik Jumlah Keluarga Penerima Bantuan Pemerintah di Desa Kapuak,
            2024
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownloadChart(chartRef, "grafik_t4p1.png")}
            >
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
            Tabel 4.1 Jumlah Keluarga Penerima Bantuan Pemerintah di Desa
            Kapuak, 2024
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownloadExcel(tableData, "tabel_t4p1.xlsx")}
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
