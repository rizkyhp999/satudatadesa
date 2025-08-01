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
      <Card className="mb-6">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Rekap Jenis Kelamin per RT (Grafik)
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleDownloadChart}>
            <Download className="w-4 h-4 mr-2" />
            Download Grafik
          </Button>
        </CardHeader>
        <CardContent>
          <div ref={chartRef} className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
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
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Rekap Jenis Kelamin per RT (Tabel)
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleDownloadTable}>
            <Download className="w-4 h-4 mr-2" />
            Download Tabel
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>RT</TableHead>
                <TableHead>Laki-Laki</TableHead>
                <TableHead>Perempuan</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.map((item: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{item.rt}</TableCell>
                  <TableCell>{item.laki}</TableCell>
                  <TableCell>{item.perempuan}</TableCell>
                  <TableCell>{item.total}</TableCell>
                </TableRow>
              ))}
              {/* Baris total */}
              <TableRow>
                <TableCell className="font-bold">TOTAL</TableCell>
                <TableCell className="font-bold">{totalLaki}</TableCell>
                <TableCell className="font-bold">{totalPerempuan}</TableCell>
                <TableCell className="font-bold">{totalSemua}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
