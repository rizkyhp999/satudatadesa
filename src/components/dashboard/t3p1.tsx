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

  // Tinggi tetap untuk grafik & tabel agar proporsional
  const CARD_HEIGHT = 380;

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
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <Card className="mb-6 md:mb-0 md:w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle>
              Jumlah Sarana Pendidikan Menurut Jenjang Pendidikan di Desa, 2025
              (Grafik)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div
              ref={chartRef}
              className="w-full"
              style={{ minHeight: CARD_HEIGHT, height: CARD_HEIGHT }}
            >
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
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm" onClick={handleDownloadChart}>
                Download Grafik
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="md:w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle>
              Jumlah Sarana Pendidikan Menurut Jenjang Pendidikan di Desa, 2025
              (Tabel)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div
              className="overflow-x-auto"
              style={{ minHeight: CARD_HEIGHT, height: CARD_HEIGHT }}
            >
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
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm" onClick={handleDownloadExcel}>
                Download Excel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
