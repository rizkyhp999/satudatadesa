"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

type Props = {
  data: any; // ganti dengan tipe data survei kamu
};

export default function T1P6({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  const kategori: Record<string, number> = {
    "KTP Desa": 0,
    "KTP Luar Desa": 0,
    "KTP Luar Kabupaten Tana Tidung": 0,
  };

  data.keluarga.forEach((item: any) => {
    const status = item["205_statusKependudukan"];
    switch (status) {
      case "1":
        kategori["KTP Desa"]++;
        break;
      case "2":
        kategori["KTP Luar Desa"]++;
        break;
      case "3":
        kategori["KTP Luar Kabupaten Tana Tidung"]++;
        break;
    }
  });

  const total = Object.values(kategori).reduce((sum, val) => sum + val, 0);

  const tableData = [
    ...Object.entries(kategori).map(([status, jumlah]) => ({ status, jumlah })),
    { status: "Jumlah", jumlah: total },
  ];

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Status Kependudukan");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "status_kependudukan.xlsx");
  };

  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "grafik_status_kependudukan.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="mb-6">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Status Kependudukan (Grafik)</CardTitle>
          <Button variant="outline" size="sm" onClick={handleDownloadChart}>
            Download Grafik
          </Button>
        </CardHeader>
        <CardContent>
          <div ref={chartRef} className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tableData.slice(0, 3)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jumlah" fill="#10b981" name="Jumlah Keluarga" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Status Kependudukan (Tabel)</CardTitle>
          <Button variant="outline" size="sm" onClick={handleDownloadExcel}>
            Download Excel
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2 text-center">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{row.status}</td>
                    <td className="border px-4 py-2 text-center font-semibold">
                      {row.jumlah}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
