"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useMemo, useRef } from "react";
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
import { toPng } from "html-to-image";

type Props = {
  data: any;
};

const pendidikanGroups = [
  {
    label: "PAUD/TK/RA/BA",
    codes: ["1", "2"], // Paket A, SD LB
  },
  {
    label: "SD/MI",
    codes: ["3", "4", "5"], // SD, MI, SPM/PDF Ula
  },
  {
    label: "SMP/MTS",
    codes: ["6", "7", "8", "9", "10"], // Paket B, SMP LB, SMP, MTs, SPM/PDF Wustha
  },
  {
    label: "SMA/MA/SMK",
    codes: ["11", "12", "13", "14", "15", "16", "17"], // Paket C, SMLB, SMA, MA, SMK, MAK, SPM/PDF Ulya
  },
];

export default function T3P1({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  // Hitung jumlah anggota pada setiap kelompok pendidikan
  const summary = useMemo(() => {
    return pendidikanGroups.map((group) => {
      const jumlah = data.anggota.filter((a: any) =>
        group.codes.includes(a["402_jenjangPendidikan"])
      ).length;
      return { jenjang: group.label, jumlah };
    });
  }, [data]);

  const handleDownloadExcel = () => {
    const wsData = [
      ["Jenjang Pendidikan", "2025"],
      ...summary.map((row) => [row.jenjang, row.jumlah]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sarana Pendidikan");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "jumlah_sarana_pendidikan_2025.xlsx");
  };

  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "grafik_sarana_pendidikan_2025.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  return (
    <div>
      <Card className="mb-6 mt-8">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            Jumlah Sarana Pendidikan Menurut Jenjang Pendidikan di Desa, 2025
            (Grafik)
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleDownloadChart}>
            Download Grafik
          </Button>
        </CardHeader>
        <CardContent>
          <div ref={chartRef} className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jenjang" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="jumlah" name="Jumlah" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            Jumlah Sarana Pendidikan Menurut Jenjang Pendidikan di Desa, 2025
            (Tabel)
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleDownloadExcel}>
            Download Excel
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead>
                <tr>
                  <th className="border px-4 py-2 bg-gray-50">
                    Jenjang Pendidikan
                  </th>
                  <th className="border px-4 py-2 bg-gray-50">2025</th>
                </tr>
              </thead>
              <tbody>
                {summary.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{row.jenjang}</td>
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
    </div>
  );
}
