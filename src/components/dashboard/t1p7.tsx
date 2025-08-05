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
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <Card className="mb-6 md:mb-0 md:w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
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
        <Card className="md:w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Rekap Jenis Kelamin per RT (Tabel)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="overflow-x-auto" style={{ minHeight: 340 }}>
              <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="border px-4 py-2">SLS</th>
                    <th className="border px-4 py-2 text-center">Laki-Laki</th>
                    <th className="border px-4 py-2 text-center">Perempuan</th>
                    <th className="border px-4 py-2 text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Baris jumlah dalam desa */}
                  <tr>
                    <td className="border px-4 py-2 font-bold bg-gray-100 dark:bg-gray-800">
                      Jumlah Dalam Desa
                    </td>
                    <td className="border px-4 py-2 text-center font-bold bg-gray-100 dark:bg-gray-800">
                      {summary
                        .filter((item: any) => item.rt !== "99")
                        .reduce((sum, item) => sum + item.laki, 0)}
                    </td>
                    <td className="border px-4 py-2 text-center font-bold bg-gray-100 dark:bg-gray-800">
                      {summary
                        .filter((item: any) => item.rt !== "99")
                        .reduce((sum, item) => sum + item.perempuan, 0)}
                    </td>
                    <td className="border px-4 py-2 text-center font-bold bg-gray-100 dark:bg-gray-800">
                      {summary
                        .filter((item: any) => item.rt !== "99")
                        .reduce((sum, item) => sum + item.total, 0)}
                    </td>
                  </tr>
                  {/* Data SLS per baris, hanya selain kode 99 */}
                  {summary
                    .filter((item: any) => item.rt !== "99")
                    .map((item: any, idx: number) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
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
                  {/* Baris luar desa (kode 99), jika ada */}
                  {summary.some((item: any) => item.rt === "99") && (
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="border px-4 py-2 font-bold bg-gray-100 dark:bg-gray-800">
                        Luar Desa
                      </td>
                      <td className="border px-4 py-2 text-center font-bold bg-gray-100 dark:bg-gray-800">
                        {summary.find((item: any) => item.rt === "99")?.laki ||
                          0}
                      </td>
                      <td className="border px-4 py-2 text-center font-bold bg-gray-100 dark:bg-gray-800">
                        {summary.find((item: any) => item.rt === "99")
                          ?.perempuan || 0}
                      </td>
                      <td className="border px-4 py-2 text-center font-bold bg-gray-100 dark:bg-gray-800">
                        {summary.find((item: any) => item.rt === "99")?.total ||
                          0}
                      </td>
                    </tr>
                  )}
                  {/* Baris total */}
                  <tr>
                    <td className="border px-4 py-2 font-bold bg-gray-100 dark:bg-gray-800">
                      TOTAL
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
