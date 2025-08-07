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

const ageGroups = [
  { label: "0-4", min: 0, max: 4 },
  { label: "5-9", min: 5, max: 9 },
  { label: "10-14", min: 10, max: 14 },
  { label: "15-19", min: 15, max: 19 },
  { label: "20-24", min: 20, max: 24 },
  { label: "25-29", min: 25, max: 29 },
  { label: "30-34", min: 30, max: 34 },
  { label: "35-39", min: 35, max: 39 },
  { label: "40-44", min: 40, max: 44 },
  { label: "45-49", min: 45, max: 49 },
  { label: "50-54", min: 50, max: 54 },
  { label: "55-59", min: 55, max: 59 },
  { label: "60-64", min: 60, max: 64 },
  { label: "65+", min: 65, max: 200 },
];

export default function T1p8({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  // Mapping nomorKK_FK ke RT dari keluarga
  const keluargaMap = data.keluarga.reduce((acc: any, keluarga: any) => {
    acc[keluarga["104_nomorKK"]] = keluarga["201_namaRT"];
    return acc;
  }, {} as Record<string, string>);

  // Rekap dengan reduce mirip t1p7, tetap pakai umur
  const summaryObj = data.anggota.reduce((acc: any, anggota: any) => {
    const umur = parseInt(anggota["310_umur"], 10);
    if (isNaN(umur)) return acc;
    const jenis = anggota["308_jenisKelamin"]?.toLowerCase();
    // Cari kelompok umur yang cocok
    const group = ageGroups.find((g) =>
      g.label === "65+" ? umur >= 65 : umur >= g.min && umur <= g.max
    );
    if (!group) return acc;
    if (!acc[group.label]) acc[group.label] = { laki: 0, perempuan: 0 };
    if (jenis?.includes("1")) acc[group.label].laki++;
    else if (jenis?.includes("2")) acc[group.label].perempuan++;
    return acc;
  }, {} as Record<string, { laki: number; perempuan: number }>);

  const summary = ageGroups.map((group) => {
    const data = summaryObj[group.label] || { laki: 0, perempuan: 0 };
    return {
      kelompok: group.label,
      laki: data.laki,
      perempuan: data.perempuan,
      total: data.laki + data.perempuan,
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
      link.download = "grafik_kelompok_umur_jenis_kelamin.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  const handleDownloadTable = () => {
    const wsData = [
      ["Kelompok Umur", "Laki-Laki", "Perempuan", "Total"],
      ...summary.map(({ kelompok, laki, perempuan, total }) => [
        kelompok,
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
    saveAs(blob, "rekap_kelompok_umur_jenis_kelamin.xlsx");
  };

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Grafik di kiri */}
        <Card className="mb-6 md:mb-0 md:w-1/2 flex flex-col border border-gray-200">
          <CardHeader className="bg-white border-b border-gray-200">
            <CardTitle className="text-lg font-semibold">
              Tabel 1.8 Jumlah Penduduk Menurut Kelompok Umur dan Jenis Kelamin
              di Desa Kapuak, 2025 (Grafik)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-4">
            <div ref={chartRef} className="w-full" style={{ minHeight: 340 }}>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={summary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="kelompok" />
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
        {/* Tabel di kanan */}
        <Card className="md:w-1/2 flex flex-col border border-gray-200">
          <CardHeader className="bg-white border-b border-gray-200">
            <CardTitle className="text-lg font-semibold">
              Tabel 1.8 Jumlah Penduduk Menurut Kelompok Umur dan Jenis Kelamin
              di Desa Kapuak, 2025 (Tabel)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-4">
            <div className="overflow-x-auto" style={{ minHeight: 340 }}>
              <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      rowSpan={2}
                      className="border px-4 py-2 align-middle bg-gray-50 dark:bg-gray-800"
                    >
                      Kelompok Umur
                    </th>
                    <th
                      colSpan={3}
                      className="border px-4 py-2 text-center bg-gray-50 dark:bg-gray-800"
                    >
                      Jumlah Penduduk
                    </th>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2 text-center bg-gray-50 dark:bg-gray-800">
                      Laki-Laki
                    </th>
                    <th className="border px-4 py-2 text-center bg-gray-50 dark:bg-gray-800">
                      Perempuan
                    </th>
                    <th className="border px-4 py-2 text-center bg-gray-50 dark:bg-gray-800">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {summary.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td className="border px-4 py-2">{row.kelompok}</td>
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
                    <td className="border px-4 py-2 font-bold bg-gray-100 dark:bg-gray-800">
                      Total
                    </td>
                    <td className="border px-4 py-2 text-center font-bold bg-gray-100 dark:bg-gray-800">
                      {totalLaki}
                    </td>
                    <td className="border px-4 py-2 text-center font-bold bg-gray-100 dark:bg-gray-800">
                      {totalPerempuan}
                    </td>
                    <td className="border px-4 py-2 text-center font-bold bg-gray-100 dark:bg-gray-800">
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
