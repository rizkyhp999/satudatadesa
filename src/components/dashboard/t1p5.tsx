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

export default function T1p5({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  // Hitung jumlah keluarga per SLS (201_namaRT)
  const keluargaPerSLS: Record<string, number> = {};
  data.keluarga.forEach((item: any) => {
    const sls = item["201_namaRT"]?.trim() || "Tidak diketahui";
    keluargaPerSLS[sls] = (keluargaPerSLS[sls] || 0) + 1;
  });

  // Format nama SLS sesuai permintaan
  function formatSLS(sls: string) {
    if (sls === "99") return "Luar Desa";
    if (/^\d+$/.test(sls)) return `RT ${sls.padStart(3, "0")}`;
    if (sls === "Tidak diketahui") return "Tidak diketahui";
    return sls;
  }

  const tableData = Object.entries(keluargaPerSLS).map(([sls, jumlah]) => ({
    sls,
    jumlah,
  }));

  const totalKeluarga = tableData.reduce((sum, row) => sum + row.jumlah, 0);

  // Hitung jumlah keluarga dalam desa (kode selain 99 dan "Tidak diketahui")
  const jumlahDalamDesa = tableData
    .filter((row) => row.sls !== "99" && row.sls !== "Tidak diketahui")
    .reduce((sum, row) => sum + row.jumlah, 0);

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
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Grafik di kiri */}
        <Card className="mb-6 md:mb-0 md:w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle>
              Tabel 1.5 Jumlah Keluarga Menurut Satuan Lingkungan Setempat (SLS)
              di Desa Kapuak, 2025
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div
              className="flex justify-center items-center h-full w-full flex-1"
              style={{ minHeight: 420 }}
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={tableData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sls" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="jumlah" fill="#2563eb" name="Jumlah Keluarga" />
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
        {/* Tabel di kanan */}
        <Card className="md:w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle>
              Tabel 1.5 Jumlah Keluarga Menurut Satuan Lingkungan Setempat (SLS)
              di Desa Kapuak, 2025
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="overflow-x-auto" style={{ minHeight: 420 }}>
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
                  {/* Baris jumlah dalam desa */}
                  <tr>
                    <td className="border px-4 py-2 font-bold bg-gray-100">
                      Jumlah Dalam Desa
                    </td>
                    <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                      {jumlahDalamDesa}
                    </td>
                  </tr>
                  {/* Data SLS per baris, hanya selain kode 99 */}
                  {tableData
                    .filter((row) => row.sls !== "99")
                    .map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">
                          {formatSLS(row.sls)}
                        </td>
                        <td className="border px-4 py-2 text-center font-semibold">
                          {row.jumlah}
                        </td>
                      </tr>
                    ))}
                  {/* Baris jumlah luar desa, tampilkan sebelum total */}
                  <tr>
                    <td className="border px-4 py-2 font-bold bg-gray-100">
                      Jumlah Luar Desa
                    </td>
                    <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                      {tableData.find((row) => row.sls === "99")?.jumlah || 0}
                    </td>
                  </tr>
                  {/* Baris total */}
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
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm" onClick={handleDownloadExcel}>
                Download Excel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
