"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import html2canvas from "html2canvas";

const jumlahData = [
  {
    sls: "Desa Kapuak",
    adaAnggota: 65,
    adaBersama: 18,
    lainnya: 0,
    jumlah: 83,
  },
  { sls: "RT01", adaAnggota: 29, adaBersama: 4, lainnya: 0, jumlah: 33 },
  { sls: "RT02", adaAnggota: 36, adaBersama: 14, lainnya: 0, jumlah: 50 },
  {
    sls: "Luar Desa Kapuak",
    adaAnggota: 3,
    adaBersama: 6,
    lainnya: 0,
    jumlah: 9,
  },
  { sls: "Total", adaAnggota: 68, adaBersama: 24, lainnya: 0, jumlah: 92 },
];

const persentaseData = [
  {
    sls: "Desa Kapuak",
    adaAnggota: 70.65,
    adaBersama: 19.57,
    lainnya: 0.0,
    jumlah: 90.22,
  },
  {
    sls: "RT01",
    adaAnggota: 31.52,
    adaBersama: 4.35,
    lainnya: 0.0,
    jumlah: 35.87,
  },
  {
    sls: "RT02",
    adaAnggota: 39.13,
    adaBersama: 15.22,
    lainnya: 0.0,
    jumlah: 54.35,
  },
  {
    sls: "Luar Desa Kapuak",
    adaAnggota: 3.26,
    adaBersama: 6.52,
    lainnya: 0.0,
    jumlah: 9.78,
  },
  {
    sls: "Total",
    adaAnggota: 73.91,
    adaBersama: 26.09,
    lainnya: 0.0,
    jumlah: 100.0,
  },
];

const pieColors = [
  "#2563eb", // Ada, digunakan anggota keluarga
  "#fbbf24", // Ada, digunakan bersama anggota keluarga tertentu
  "#f472b6", // Lainnya
];

function downloadChartAsPNG(
  ref: React.RefObject<HTMLDivElement>,
  filename: string
) {
  if (ref.current) {
    html2canvas(ref.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = filename;
      link.href = canvas.toDataURL();
      link.click();
    });
  }
}

function downloadTableAsCSV(data: any[], columns: string[], filename: string) {
  const csvRows = [
    columns.join(","),
    ...data.map((row) => columns.map((col) => row[col]).join(",")),
  ];
  const csv = csvRows.join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.download = filename;
  link.href = URL.createObjectURL(blob);
  link.click();
}

export default function T3p5() {
  const chartRef = useRef<HTMLDivElement>(null);

  const desaData = persentaseData.find((row) => row.sls === "Desa Kapuak");
  const pieData = [
    {
      name: "Ada, digunakan anggota keluarga",
      value: desaData?.adaAnggota ?? 0,
    },
    {
      name: "Ada, digunakan bersama anggota keluarga tertentu",
      value: desaData?.adaBersama ?? 0,
    },
    { name: "Lainnya", value: desaData?.lainnya ?? 0 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card className="mb-6 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Grafik Persentase Keluarga Menurut Kepemilikan dan Penggunaan
            Fasilitas Tempat Buang Air Besar di Desa Kapuak, 2025 (Pie)
          </CardTitle>
          <div className="mt-2 flex gap-2">
            <button
              className="px-3 py-1 border rounded text-sm bg-blue-500 text-white"
              onClick={() => downloadChartAsPNG(chartRef, "grafik-t3p5.png")}
            >
              Download Grafik
            </button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4">
          <div
            className="flex justify-center items-center h-full w-full flex-1"
            style={{ minHeight: 420 }}
            ref={chartRef}
          >
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, percent }) =>
                    `${name}: ${((percent ?? 0) * 100).toFixed(1)}%`
                  }
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={pieColors[idx]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6 flex flex-col">
        <CardHeader>
          <CardTitle>
            Tabel 3.5 Persentase Keluarga Menurut Satuan Lingkungan Setempat,
            Kepemilikan dan Penggunaan Fasilitas Tempat Buang Air Besar di Desa
            Kapuak, 2025 (%)
          </CardTitle>
          <div className="mt-2 flex gap-2">
            <button
              className="px-3 py-1 border rounded text-sm bg-green-500 text-white"
              onClick={() =>
                downloadTableAsCSV(
                  persentaseData,
                  ["sls", "adaAnggota", "adaBersama", "lainnya", "jumlah"],
                  "tabel-t3p5-persentase.csv"
                )
              }
            >
              Download Tabel
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto" style={{ minHeight: 320 }}>
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th rowSpan={2} className="border px-4 py-2">
                    Satuan Lingkungan Setempat
                  </th>
                  <th colSpan={4} className="border px-4 py-2">
                    Kepemilikan dan Penggunaan Fasilitas Tempat Buang Air Besar
                    (%)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">
                    Ada, digunakan anggota keluarga
                  </th>
                  <th className="border px-4 py-2">
                    Ada, digunakan bersama anggota keluarga tertentu
                  </th>
                  <th className="border px-4 py-2">Lainnya</th>
                  <th className="border px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {persentaseData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 font-semibold">
                      {row.sls}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.adaAnggota}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.adaBersama}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.lainnya}
                    </td>
                    <td className="border px-4 py-2 text-center font-bold">
                      {row.jumlah}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Tabel 3.5 Keluarga Menurut Satuan Lingkungan Setempat, Kepemilikan
            dan Penggunaan Fasilitas Tempat Buang Air Besar di Desa Kapuak, 2025
            (Jumlah)
          </CardTitle>
          <div className="mt-2 flex gap-2">
            <button
              className="px-3 py-1 border rounded text-sm bg-green-500 text-white"
              onClick={() =>
                downloadTableAsCSV(
                  jumlahData,
                  ["sls", "adaAnggota", "adaBersama", "lainnya", "jumlah"],
                  "tabel-t3p5-jumlah.csv"
                )
              }
            >
              Download Tabel
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto" style={{ minHeight: 320 }}>
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th rowSpan={2} className="border px-4 py-2">
                    Satuan Lingkungan Setempat
                  </th>
                  <th colSpan={4} className="border px-4 py-2">
                    Kepemilikan dan Penggunaan Fasilitas Tempat Buang Air Besar
                    (Jumlah)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">
                    Ada, digunakan anggota keluarga
                  </th>
                  <th className="border px-4 py-2">
                    Ada, digunakan bersama anggota keluarga tertentu
                  </th>
                  <th className="border px-4 py-2">Lainnya</th>
                  <th className="border px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {jumlahData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 font-semibold">
                      {row.sls}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.adaAnggota}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.adaBersama}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.lainnya}
                    </td>
                    <td className="border px-4 py-2 text-center font-bold">
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
