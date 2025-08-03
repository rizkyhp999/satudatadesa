"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { toPng } from "html-to-image";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type Props = {
  data: any;
};

const statusMap: Record<string, string> = {
  "1": "Belum Kawin",
  "2": "Kawin",
  "3": "Cerai Hidup",
  "4": "Cerai Mati",
};

const statusOrder = ["1", "2", "3", "4"];

export default function T2P3({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  // Rekap data per status perkawinan dan jenis kelamin
  const summary = statusOrder.map((kode) => {
    let laki = 0;
    let perempuan = 0;
    data.anggota.forEach((a: any) => {
      if (a["311_statusPerkawinan"] === kode) {
        if (a["308_jenisKelamin"] === "1") laki++;
        else if (a["308_jenisKelamin"] === "2") perempuan++;
      }
    });
    return {
      status: statusMap[kode],
      laki,
      perempuan,
      total: laki + perempuan,
    };
  });

  const totalLaki = summary.reduce((sum, s) => sum + s.laki, 0);
  const totalPerempuan = summary.reduce((sum, s) => sum + s.perempuan, 0);
  const totalSemua = summary.reduce((sum, s) => sum + s.total, 0);

  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "grafik_status_perkawinan_jenis_kelamin.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  const handleDownloadTable = () => {
    const wsData = [
      ["Status Perkawinan", "Laki-Laki", "Perempuan", "Total"],
      ...summary.map(({ status, laki, perempuan, total }) => [
        status,
        laki,
        perempuan,
        total,
      ]),
      ["TOTAL", totalLaki, totalPerempuan, totalSemua],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekap");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "rekap_status_perkawinan_jenis_kelamin.xlsx");
  };

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <Card className="mb-6 mt-8 md:mb-0 md:w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Jumlah Penduduk Menurut Status Perkawinan dan Jenis Kelamin di
              Desa Kapuak, 2025 (Grafik)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div ref={chartRef} className="w-full" style={{ minHeight: 340 }}>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={summary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="laki" name="Laki-Laki" fill="#2563eb" />
                  <Bar dataKey="perempuan" name="Perempuan" fill="#f472b6" />
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
        <Card className="md:w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle>
              Jumlah Penduduk Menurut Status Perkawinan dan Jenis Kelamin di
              Desa Kapuak, 2025 (Tabel)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="overflow-x-auto" style={{ minHeight: 340 }}>
              <table className="w-full text-sm border border-gray-200">
                <thead>
                  <tr>
                    <th
                      rowSpan={2}
                      className="border px-4 py-2 align-middle bg-gray-50"
                    >
                      Status Perkawinan
                    </th>
                    <th
                      colSpan={3}
                      className="border px-4 py-2 text-center bg-gray-50"
                    >
                      Jumlah Penduduk
                    </th>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2 text-center bg-gray-50">
                      Laki-Laki
                    </th>
                    <th className="border px-4 py-2 text-center bg-gray-50">
                      Perempuan
                    </th>
                    <th className="border px-4 py-2 text-center bg-gray-50">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {summary.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{row.status}</td>
                      <td className="border px-4 py-2 text-center">
                        {row.laki}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {row.perempuan}
                      </td>
                      <td className="border px-4 py-2 text-center font-semibold">
                        {row.total}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="border px-4 py-2 font-bold bg-gray-100">
                      Total
                    </td>
                    <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                      {totalLaki}
                    </td>
                    <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                      {totalPerempuan}
                    </td>
                    <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                      {totalSemua}
                    </td>
                  </tr>
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
    </div>
  );
}
