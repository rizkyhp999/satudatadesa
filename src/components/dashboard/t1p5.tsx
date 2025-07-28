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
  data: any; // ganti dengan tipe yang sesuai
};

export default function T1P5({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  // Hitung jumlah keluarga per SLS (201_namaRT)
  const keluargaPerSLS: Record<string, number> = {};
  data.keluarga.forEach((item: any) => {
    const sls = item["201_namaRT"]?.trim() || "Tidak diketahui";
    keluargaPerSLS[sls] = (keluargaPerSLS[sls] || 0) + 1;
  });

  const tableData = Object.entries(keluargaPerSLS).map(([sls, jumlah]) => ({
    sls,
    jumlah,
  }));

  const totalKeluarga = tableData.reduce((sum, row) => sum + row.jumlah, 0);

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "jumlah_keluarga_per_sls.xlsx");
  };

  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "chart_keluarga_per_sls.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh chart:", err);
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
          <CardTitle>Jumlah Keluarga per SLS (Grafik)</CardTitle>
          <Button variant="outline" size="sm" onClick={handleDownloadChart}>
            Download Grafik
          </Button>
        </CardHeader>
        <CardContent>
          <div ref={chartRef} className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tableData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sls" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jumlah" fill="#6366f1" name="Jumlah Keluarga" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Jumlah Keluarga per SLS (Tabel)</CardTitle>
          <Button variant="outline" size="sm" onClick={handleDownloadExcel}>
            Download Excel
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2">SLS</th>
                  <th className="border px-4 py-2 text-center">
                    Jumlah Keluarga
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{row.sls}</td>
                    <td className="border px-4 py-2 text-center font-semibold">
                      {row.jumlah}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-100">
                    Total
                  </td>
                  <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                    {totalKeluarga}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
