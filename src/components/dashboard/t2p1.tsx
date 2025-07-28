"use client";

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

type Props = {
  data: any;
};

export default function T2P1({ data }: Props) {
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

  const handleDownload = () => {
    const csv = [
      ["Satuan Lingkungan Setempat", "Laki-Laki", "Perempuan", "Total"],
      ...summary.map(({ rt, laki, perempuan, total }) => [
        rt,
        laki,
        perempuan,
        total,
      ]),
      ["TOTAL", totalLaki, totalPerempuan, totalSemua],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rekap_jenis_kelamin_per_rt.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">
          Rekap Jenis Kelamin per RT
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="w-4 h-4 mr-2" />
          Unduh
        </Button>
      </CardHeader>
      <CardContent>
        {/* Grafik */}
        <div className="w-full h-72 mb-8">
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
        {/* Tabel */}
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
  );
}
