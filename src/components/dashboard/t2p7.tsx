"use client";

import React from "react";
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

// Data Tabel 2.7
const tableData = [
  {
    sls: "Desa Kapuak",
    tidakMemiliki: 2.3,
    pbiJkn: 62.5,
    jknMandiri: 25.66,
    jknPemberiKerja: 0.33,
    jamkesLainnya: 0.66,
    total: 91.45,
    jumlah: [7, 190, 78, 1, 2, 278],
  },
  {
    sls: "RT01",
    tidakMemiliki: 0.0,
    pbiJkn: 18.42,
    jknMandiri: 17.11,
    jknPemberiKerja: 0.33,
    jamkesLainnya: 0.0,
    total: 35.86,
    jumlah: [0, 56, 52, 1, 0, 109],
  },
  {
    sls: "RT02",
    tidakMemiliki: 2.3,
    pbiJkn: 44.08,
    jknMandiri: 8.55,
    jknPemberiKerja: 0.0,
    jamkesLainnya: 0.66,
    total: 55.59,
    jumlah: [7, 134, 26, 0, 2, 169],
  },
  {
    sls: "Luar Desa Kapuak",
    tidakMemiliki: 0.66,
    pbiJkn: 2.3,
    jknMandiri: 4.61,
    jknPemberiKerja: 0.0,
    jamkesLainnya: 0.99,
    total: 8.55,
    jumlah: [2, 7, 14, 0, 3, 26],
  },
  {
    sls: "Total",
    tidakMemiliki: 2.96,
    pbiJkn: 64.8,
    jknMandiri: 30.26,
    jknPemberiKerja: 0.33,
    jamkesLainnya: 1.64,
    total: 100.0,
    jumlah: [9, 197, 92, 1, 5, 304],
  },
];

export default function T2p7() {
  const chartRef = React.useRef<HTMLDivElement>(null);

  // Download chart as PNG
  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "grafik_t2p7_jaminan_kesehatan.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  // Download table as Excel
  const handleDownloadTable = () => {
    const wsData = [
      [
        "Satuan Lingkungan Setempat",
        "Tidak Memiliki",
        "PBI JKN",
        "JKN Mandiri",
        "JKN Pemberi Kerja",
        "Jamkes lainnya",
        "Total",
      ],
      ...tableData.map((row) => [
        row.sls,
        row.tidakMemiliki,
        row.pbiJkn,
        row.jknMandiri,
        row.jknPemberiKerja,
        row.jamkesLainnya,
        row.total,
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekap");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "rekap_jaminan_kesehatan_2025.xlsx");
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      <Card className="mb-6 md:mb-0 md:w-1/2 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Tabel 2.7 Persentase Penduduk yang Memiliki Jaminan Kesehatan
            Menurut Satuan Lingkungan Setempat dan Jenis Jaminan, 2025 (Grafik)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4">
          <div className="w-full" style={{ minHeight: 420 }} ref={chartRef}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={tableData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sls" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="tidakMemiliki"
                  fill="#ef4444"
                  name="Tidak Memiliki"
                />
                <Bar dataKey="pbiJkn" fill="#6366f1" name="PBI JKN" />
                <Bar dataKey="jknMandiri" fill="#10b981" name="JKN Mandiri" />
                <Bar
                  dataKey="jknPemberiKerja"
                  fill="#f59e42"
                  name="JKN Pemberi Kerja"
                />
                <Bar
                  dataKey="jamkesLainnya"
                  fill="#a855f7"
                  name="Jamkes lainnya"
                />
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
      <Card className="md:w-1/2 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Tabel 2.7 Persentase Penduduk yang Memiliki Jaminan Kesehatan
            Menurut Satuan Lingkungan Setempat dan Jenis Jaminan, 2025 (Tabel)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4">
          <div className="overflow-x-auto" style={{ minHeight: 340 }}>
            <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="border px-4 py-2" rowSpan={2}>
                    Satuan Lingkungan Setempat
                  </th>
                  <th className="border px-4 py-2" colSpan={6}>
                    Jaminan Kesehatan (%)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Tidak Memiliki</th>
                  <th className="border px-4 py-2">PBI JKN</th>
                  <th className="border px-4 py-2">JKN Mandiri</th>
                  <th className="border px-4 py-2">JKN Pemberi Kerja</th>
                  <th className="border px-4 py-2">Jamkes lainnya</th>
                  <th className="border px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 font-semibold">
                      {row.sls}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.tidakMemiliki}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.pbiJkn}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.jknMandiri}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.jknPemberiKerja}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.jamkesLainnya}
                    </td>
                    <td className="border px-4 py-2 text-center font-bold">
                      {row.total}
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
