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

export default function T2P1({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  const summary = (
    Object.entries(
      data.keluarga.reduce((acc: any, keluarga: any) => {
        const rt = keluarga["201_namaRT"];
        const nomorKK = keluarga["104_nomorKK"];
        const anggotaKK = data.anggota.filter(
          (a: any) => a.nomorKK_FK === nomorKK
        );

        if (!acc[rt]) acc[rt] = { laki: 0, perempuan: 0 };

        anggotaKK.forEach((anggota: any) => {
          const jenis = anggota["308_jenisKelamin"]?.toLowerCase();
          if (jenis?.includes("1")) acc[rt].laki++;
          else if (jenis?.includes("2")) acc[rt].perempuan++;
        });

        return acc;
      }, {} as Record<string, { laki: number; perempuan: number }>)
    ) as [string, { laki: number; perempuan: number }][]
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
            <div style={{ minHeight: 340 }}>
              <Table className="border border-gray-200 dark:border-gray-700">
                <TableHeader>
                  <TableRow>
                    <TableHead className="border border-gray-200 dark:border-gray-700">
                      RT
                    </TableHead>
                    <TableHead className="border border-gray-200 dark:border-gray-700">
                      Laki-Laki
                    </TableHead>
                    <TableHead className="border border-gray-200 dark:border-gray-700">
                      Perempuan
                    </TableHead>
                    <TableHead className="border border-gray-200 dark:border-gray-700">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.map((item: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell className="border border-gray-200 dark:border-gray-700">
                        {item.rt}
                      </TableCell>
                      <TableCell className="border border-gray-200 dark:border-gray-700">
                        {item.laki}
                      </TableCell>
                      <TableCell className="border border-gray-200 dark:border-gray-700">
                        {item.perempuan}
                      </TableCell>
                      <TableCell className="border border-gray-200 dark:border-gray-700">
                        {item.total}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Baris total */}
                  <TableRow>
                    <TableCell className="font-bold border border-gray-200 dark:border-gray-700">
                      TOTAL
                    </TableCell>
                    <TableCell className="font-bold border border-gray-200 dark:border-gray-700">
                      {totalLaki}
                    </TableCell>
                    <TableCell className="font-bold border border-gray-200 dark:border-gray-700">
                      {totalPerempuan}
                    </TableCell>
                    <TableCell className="font-bold border border-gray-200 dark:border-gray-700">
                      {totalSemua}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
