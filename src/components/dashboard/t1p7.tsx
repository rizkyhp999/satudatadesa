"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { motion } from "framer-motion";

type Props = {
  data: any;
};

export default function T1p7({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  // Helper untuk format SLS/RT
  function formatSLS(rt: string) {
    if (rt === "99") return "Luar Desa";
    if (/^\d+$/.test(rt)) return `RT ${rt.padStart(3, "0")}`;
    if (!rt) return "Tidak diketahui";
    return rt;
  }

  // Rekap berdasarkan keluarga dan anggota, RT dari keluarga
  const keluargaMap = data.keluarga.reduce((acc: any, keluarga: any) => {
    acc[keluarga["104_nomorKK"]] = keluarga["201_namaRT"];
    return acc;
  }, {} as Record<string, string>);

  const summaryObj = data.anggota.reduce((acc: any, anggota: any) => {
    const nomorKK = anggota["nomorKK_FK"];
    const rt = keluargaMap[nomorKK] || "";
    if (!acc[rt]) acc[rt] = { laki: 0, perempuan: 0 };
    const jenis = anggota["308_jenisKelamin"]?.toLowerCase();
    if (jenis?.includes("1")) acc[rt].laki++;
    else if (jenis?.includes("2")) acc[rt].perempuan++;
    return acc;
  }, {} as Record<string, { laki: number; perempuan: number }>);

  const summary = (
    Object.entries(summaryObj) as [
      string,
      { laki: number; perempuan: number }
    ][]
  ).map(([rt, { laki, perempuan }]) => ({
    rt,
    laki,
    perempuan,
    total: laki + perempuan,
  }));

  // Hitung total keseluruhan
  const totalLaki = summary.reduce((sum, s) => sum + s.laki, 0);
  const totalPerempuan = summary.reduce((sum, s) => sum + s.perempuan, 0);
  const totalSemua = summary.reduce((sum, s) => sum + s.total, 0);

  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "grafik_jenis_kelamin_per_rt.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  const handleDownloadTable = () => {
    const wsData = [
      ["Satuan Lingkungan Setempat", "Laki-Laki", "Perempuan", "Total"],
      ...summary.map(({ rt, laki, perempuan, total }) => [
        rt,
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
    saveAs(blob, "rekap_jenis_kelamin_per_rt.xlsx");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border border-gray-200 bg-white rounded-xl px-4 py-4 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">
              Rekap Jenis Kelamin per RT (Grafik)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div ref={chartRef} className="w-full" style={{ minHeight: 340 }}>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={summary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rt" />
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
        <Card className="border border-gray-200 bg-white rounded-xl px-4 py-4 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">
              Rekap Jenis Kelamin per RT (Tabel)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="overflow-x-auto" style={{ minHeight: 340 }}>
              <table className="w-full text-sm border border-gray-200 rounded">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border px-4 py-2 font-semibold text-gray-700">
                      SLS
                    </th>
                    <th className="border px-4 py-2 text-center font-semibold text-gray-700">
                      Laki-Laki
                    </th>
                    <th className="border px-4 py-2 text-center font-semibold text-gray-700">
                      Perempuan
                    </th>
                    <th className="border px-4 py-2 text-center font-semibold text-gray-700">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 font-bold bg-gray-100">
                      Jumlah Dalam Desa
                    </td>
                    <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                      {summary
                        .filter((item: any) => item.rt !== "99")
                        .reduce((sum, item) => sum + item.laki, 0)}
                    </td>
                    <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                      {summary
                        .filter((item: any) => item.rt !== "99")
                        .reduce((sum, item) => sum + item.perempuan, 0)}
                    </td>
                    <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                      {summary
                        .filter((item: any) => item.rt !== "99")
                        .reduce((sum, item) => sum + item.total, 0)}
                    </td>
                  </tr>
                  {summary
                    .filter((item: any) => item.rt !== "99")
                    .map((item: any, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">
                          {formatSLS(item.rt)}
                        </td>
                        <td className="border px-4 py-2 text-center font-semibold">
                          {item.laki}
                        </td>
                        <td className="border px-4 py-2 text-center font-semibold">
                          {item.perempuan}
                        </td>
                        <td className="border px-4 py-2 text-center font-semibold">
                          {item.total}
                        </td>
                      </tr>
                    ))}
                  {summary.some((item: any) => item.rt === "99") && (
                    <tr>
                      <td className="border px-4 py-2 font-bold bg-gray-100">
                        Luar Desa
                      </td>
                      <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                        {summary.find((item: any) => item.rt === "99")?.laki ||
                          0}
                      </td>
                      <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                        {summary.find((item: any) => item.rt === "99")
                          ?.perempuan || 0}
                      </td>
                      <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                        {summary.find((item: any) => item.rt === "99")?.total ||
                          0}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="border px-4 py-2 font-bold bg-gray-100">
                      TOTAL
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
    </motion.div>
  );
}
