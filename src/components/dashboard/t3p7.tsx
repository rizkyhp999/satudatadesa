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

const jumlahData = [
  {
    sls: "Desa Kapuak",
    airIsiUlang: 0,
    leding: 3,
    sumur: 75,
    lainnya: 5,
    jumlah: 83,
  },
  { sls: "RT01", airIsiUlang: 0, leding: 1, sumur: 29, lainnya: 3, jumlah: 33 },
  { sls: "RT02", airIsiUlang: 0, leding: 2, sumur: 46, lainnya: 2, jumlah: 50 },
  {
    sls: "Luar Desa Kapuak",
    airIsiUlang: 0,
    leding: 1,
    sumur: 7,
    lainnya: 1,
    jumlah: 9,
  },
  {
    sls: "Total",
    airIsiUlang: 0,
    leding: 4,
    sumur: 82,
    lainnya: 6,
    jumlah: 92,
  },
];

const persentaseData = [
  {
    sls: "Desa Kapuak",
    airIsiUlang: 0.0,
    leding: 3.26,
    sumur: 81.52,
    lainnya: 5.43,
    jumlah: 90.22,
  },
  {
    sls: "RT01",
    airIsiUlang: 0.0,
    leding: 1.09,
    sumur: 31.52,
    lainnya: 3.26,
    jumlah: 35.87,
  },
  {
    sls: "RT02",
    airIsiUlang: 0.0,
    leding: 2.17,
    sumur: 50.0,
    lainnya: 2.17,
    jumlah: 54.35,
  },
  {
    sls: "Luar Desa Kapuak",
    airIsiUlang: 0.0,
    leding: 1.09,
    sumur: 7.61,
    lainnya: 1.09,
    jumlah: 9.78,
  },
  {
    sls: "Total",
    airIsiUlang: 0.0,
    leding: 4.35,
    sumur: 89.13,
    lainnya: 6.52,
    jumlah: 100.0,
  },
];

const pieColors = [
  "#2563eb", // Air Isi Ulang
  "#fbbf24", // Leding
  "#10b981", // Sumur Bor/Pompa/Sumur Terlindung/Mata Air Terlindung
  "#f472b6", // Lainnya
];

export default function T3p7() {
  const chartRef = useRef<HTMLDivElement>(null);

  const desaData = persentaseData.find((row) => row.sls === "Desa Kapuak");
  const pieData = [
    { name: "Air Isi Ulang", value: desaData?.airIsiUlang ?? 0 },
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
            Grafik Persentase Keluarga Menurut Sumber Air Utama untuk
            Mandi/Cuci/dll di Desa Kapuak, 2025 (Pie)
          </CardTitle>
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
            Tabel 3.7 Persentase Keluarga Menurut Satuan Lingkungan Setempat dan
            Sumber Air Utama yang Digunakan Keluarga untuk Mandi/Cuci/dll di
            Desa Kapuak, 2025 (%)
          </CardTitle>
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
                    Sumber Air Utama untuk Mandi/Cuci/dll (%)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Air Isi Ulang</th>
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
                      {row.airIsiUlang}
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
            Tabel 3.7 Keluarga Menurut Satuan Lingkungan Setempat dan Sumber Air
            Utama yang Digunakan Keluarga untuk Mandi/Cuci/dll di Desa Kapuak,
            2025 (Jumlah)
          </CardTitle>
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
                    Sumber Air Utama untuk Mandi/Cuci/dll (Jumlah)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Air Isi Ulang</th>
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
                      {row.airIsiUlang}
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
