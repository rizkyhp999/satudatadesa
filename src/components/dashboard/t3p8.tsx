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
  { sls: "Desa Kapuak", listrikPLN: 66, lainnya: 17, jumlah: 83 },
  { sls: "RT01", listrikPLN: 28, lainnya: 5, jumlah: 33 },
  { sls: "RT02", listrikPLN: 38, lainnya: 12, jumlah: 50 },
  { sls: "Luar Desa Kapuak", listrikPLN: 6, lainnya: 3, jumlah: 9 },
  { sls: "Total", listrikPLN: 72, lainnya: 20, jumlah: 92 },
];

const persentaseData = [
  { sls: "Desa Kapuak", listrikPLN: 71.74, lainnya: 18.48, jumlah: 90.22 },
  { sls: "RT01", listrikPLN: 30.43, lainnya: 5.43, jumlah: 35.87 },
  { sls: "RT02", listrikPLN: 41.3, lainnya: 13.04, jumlah: 54.35 },
  { sls: "Luar Desa Kapuak", listrikPLN: 6.52, lainnya: 3.26, jumlah: 9.78 },
  { sls: "Total", listrikPLN: 78.26, lainnya: 21.74, jumlah: 100.0 },
];

const pieColors = [
  "#2563eb", // Listrik PLN
  "#f472b6", // Lainnya
];

export default function T3p8() {
  const chartRef = useRef<HTMLDivElement>(null);

  const desaData = persentaseData.find((row) => row.sls === "Desa Kapuak");
  const pieData = [
    { name: "Listrik PLN", value: desaData?.listrikPLN ?? 0 },
    { name: "Lainnya", value: desaData?.lainnya ?? 0 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card className="mb-6 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Grafik Persentase Keluarga Menurut Sumber Penerangan Utama di Desa
            Kapuak, 2025 (Pie)
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
            Tabel 3.8 Persentase Keluarga Menurut Satuan Lingkungan Setempat dan
            Sumber Penerangan Utama di Desa Kapuak, 2025 (%)
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
                  <th colSpan={3} className="border px-4 py-2">
                    Sumber Penerangan Utama (%)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Listrik PLN</th>
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
                      {row.listrikPLN}
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
            Tabel 3.8 Keluarga Menurut Satuan Lingkungan Setempat dan Sumber
            Penerangan Utama di Desa Kapuak, 2025 (Jumlah)
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
                  <th colSpan={3} className="border px-4 py-2">
                    Sumber Penerangan Utama (Jumlah)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Listrik PLN</th>
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
                      {row.listrikPLN}
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
