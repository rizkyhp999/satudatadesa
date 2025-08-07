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
    airKemasan: 50,
    leding: 1,
    sumur: 32,
    lainnya: 0,
    jumlah: 83,
  },
  { sls: "RT01", airKemasan: 23, leding: 0, sumur: 10, lainnya: 0, jumlah: 33 },
  { sls: "RT02", airKemasan: 27, leding: 1, sumur: 22, lainnya: 0, jumlah: 50 },
  {
    sls: "Luar Desa Kapuak",
    airKemasan: 4,
    leding: 0,
    sumur: 4,
    lainnya: 1,
    jumlah: 9,
  },
  {
    sls: "Total",
    airKemasan: 54,
    leding: 1,
    sumur: 36,
    lainnya: 1,
    jumlah: 92,
  },
];

const persentaseData = [
  {
    sls: "Desa Kapuak",
    airKemasan: 54.35,
    leding: 1.09,
    sumur: 34.78,
    lainnya: 0.0,
    jumlah: 90.22,
  },
  {
    sls: "RT01",
    airKemasan: 25.0,
    leding: 0.0,
    sumur: 10.87,
    lainnya: 0.0,
    jumlah: 35.87,
  },
  {
    sls: "RT02",
    airKemasan: 29.35,
    leding: 1.09,
    sumur: 23.91,
    lainnya: 0.0,
    jumlah: 54.35,
  },
  {
    sls: "Luar Desa Kapuak",
    airKemasan: 4.35,
    leding: 0.0,
    sumur: 4.35,
    lainnya: 1.09,
    jumlah: 9.78,
  },
  {
    sls: "Total",
    airKemasan: 58.7,
    leding: 1.09,
    sumur: 39.13,
    lainnya: 1.09,
    jumlah: 100.0,
  },
];

const pieColors = [
  "#2563eb", // Air Kemasan Bermerk/Air Isi Ulang
  "#fbbf24", // Leding
  "#10b981", // Sumur Bor/Pompa/Sumur Terlindung/Mata Air Terlindung
  "#f472b6", // Lainnya
];

function downloadChartAsPNG(
  ref: React.RefObject<HTMLDivElement | null>,
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

export default function T3p6() {
  const chartRef = useRef<HTMLDivElement>(null);

  const desaData = persentaseData.find((row) => row.sls === "Desa Kapuak");
  const pieData = [
    {
      name: "Air Kemasan Bermerk/Air Isi Ulang",
      value: desaData?.airKemasan ?? 0,
    },
    { name: "Leding", value: desaData?.leding ?? 0 },
    {
      name: "Sumur Bor/Pompa/Sumur Terlindung/Mata Air Terlindung",
      value: desaData?.sumur ?? 0,
    },
    { name: "Lainnya", value: desaData?.lainnya ?? 0 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card className="mb-6 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Grafik Persentase Keluarga Menurut Sumber Air Utama untuk Minum di
            Desa Kapuak, 2025 (Pie)
          </CardTitle>
          <div className="mt-2 flex gap-2">
            <button
              className="px-3 py-1 border rounded text-sm bg-blue-500 text-white"
              onClick={() => downloadChartAsPNG(chartRef, "grafik-t3p6.png")}
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
            Tabel 3.6 Persentase Keluarga Menurut Satuan Lingkungan Setempat dan
            Sumber Air Utama yang Digunakan Keluarga untuk Minum di Desa Kapuak,
            2025 (%)
          </CardTitle>
          <div className="mt-2 flex gap-2">
            <button
              className="px-3 py-1 border rounded text-sm bg-green-500 text-white"
              onClick={() =>
                downloadTableAsCSV(
                  persentaseData,
                  ["sls", "airKemasan", "leding", "sumur", "lainnya", "jumlah"],
                  "tabel-t3p6-persentase.csv"
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
                  <th colSpan={5} className="border px-4 py-2">
                    Sumber Air Utama untuk Minum (%)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">
                    Air Kemasan Bermerk/Air Isi Ulang
                  </th>
                  <th className="border px-4 py-2">Leding</th>
                  <th className="border px-4 py-2">
                    Sumur Bor/Pompa/Sumur Terlindung/Mata Air Terlindung
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
                      {row.airKemasan}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.leding}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.sumur}
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
            Tabel 3.6 Keluarga Menurut Satuan Lingkungan Setempat dan Sumber Air
            Utama yang Digunakan Keluarga untuk Minum di Desa Kapuak, 2025
            (Jumlah)
          </CardTitle>
          <div className="mt-2 flex gap-2">
            <button
              className="px-3 py-1 border rounded text-sm bg-green-500 text-white"
              onClick={() =>
                downloadTableAsCSV(
                  jumlahData,
                  ["sls", "airKemasan", "leding", "sumur", "lainnya", "jumlah"],
                  "tabel-t3p6-jumlah.csv"
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
                  <th colSpan={5} className="border px-4 py-2">
                    Sumber Air Utama untuk Minum (Jumlah)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">
                    Air Kemasan Bermerk/Air Isi Ulang
                  </th>
                  <th className="border px-4 py-2">Leding</th>
                  <th className="border px-4 py-2">
                    Sumur Bor/Pompa/Sumur Terlindung/Mata Air Terlindung
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
                      {row.airKemasan}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.leding}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.sumur}
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
