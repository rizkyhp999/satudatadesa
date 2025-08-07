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
    gas55: 47,
    gas12: 6,
    gas3: 26,
    minyakKayu: 1,
    lainnya: 3,
    jumlah: 83,
  },
  {
    sls: "RT01",
    gas55: 17,
    gas12: 3,
    gas3: 13,
    minyakKayu: 0,
    lainnya: 0,
    jumlah: 33,
  },
  {
    sls: "RT02",
    gas55: 30,
    gas12: 3,
    gas3: 13,
    minyakKayu: 1,
    lainnya: 3,
    jumlah: 50,
  },
  {
    sls: "Luar Desa Kapuak",
    gas55: 4,
    gas12: 1,
    gas3: 4,
    minyakKayu: 0,
    lainnya: 0,
    jumlah: 9,
  },
  {
    sls: "Total",
    gas55: 51,
    gas12: 7,
    gas3: 30,
    minyakKayu: 1,
    lainnya: 3,
    jumlah: 92,
  },
];

const persentaseData = [
  {
    sls: "Desa Kapuak",
    gas55: 51.09,
    gas12: 6.52,
    gas3: 28.26,
    minyakKayu: 1.09,
    lainnya: 3.26,
    jumlah: 90.22,
  },
  {
    sls: "RT01",
    gas55: 18.48,
    gas12: 3.26,
    gas3: 14.13,
    minyakKayu: 0.0,
    lainnya: 0.0,
    jumlah: 35.87,
  },
  {
    sls: "RT02",
    gas55: 32.61,
    gas12: 3.26,
    gas3: 14.13,
    minyakKayu: 1.09,
    lainnya: 3.26,
    jumlah: 54.35,
  },
  {
    sls: "Luar Desa Kapuak",
    gas55: 4.35,
    gas12: 1.09,
    gas3: 4.35,
    minyakKayu: 0.0,
    lainnya: 0.0,
    jumlah: 9.78,
  },
  {
    sls: "Total",
    gas55: 55.43,
    gas12: 7.61,
    gas3: 32.61,
    minyakKayu: 1.09,
    lainnya: 3.26,
    jumlah: 100.0,
  },
];

const pieColors = [
  "#2563eb", // Gas elpigi 5,5 kg
  "#fbbf24", // Gas elpigi 12 kg
  "#10b981", // Gas elpigi 3 kg
  "#a78bfa", // Minyak tanah/Briket/Arang/Kayu bakar
  "#f472b6", // Lainnya
];

export default function T3p9() {
  const chartRef = useRef<HTMLDivElement>(null);

  const desaData = persentaseData.find((row) => row.sls === "Desa Kapuak");
  const pieData = [
    { name: "Gas elpigi 5,5 kg", value: desaData?.gas55 ?? 0 },
    { name: "Gas elpigi 12 kg", value: desaData?.gas12 ?? 0 },
    { name: "Gas elpigi 3 kg", value: desaData?.gas3 ?? 0 },
    {
      name: "Minyak tanah/Briket/Arang/Kayu bakar",
      value: desaData?.minyakKayu ?? 0,
    },
    { name: "Lainnya", value: desaData?.lainnya ?? 0 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card className="mb-6 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Grafik Persentase Keluarga Menurut Bahan bakar/energi utama untuk
            Memasak di Desa Kapuak, 2025 (Pie)
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
            Tabel 3.9 Persentase Keluarga Menurut Satuan Lingkungan Setempat dan
            Bahan bakar/energi utama untuk memasak di Desa Kapuak, 2025 (%)
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
                  <th colSpan={6} className="border px-4 py-2">
                    Bahan bakar/energi utama untuk Memasak (%)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Gas elpigi 5,5 kg</th>
                  <th className="border px-4 py-2">Gas elpigi 12 kg</th>
                  <th className="border px-4 py-2">Gas elpigi 3 kg</th>
                  <th className="border px-4 py-2">
                    Minyak tanah/Briket/Arang/Kayu bakar
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
                      {row.gas55}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.gas12}
                    </td>
                    <td className="border px-4 py-2 text-center">{row.gas3}</td>
                    <td className="border px-4 py-2 text-center">
                      {row.minyakKayu}
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
            Tabel 3.9 Keluarga Menurut Satuan Lingkungan Setempat dan Bahan
            bakar/energi utama untuk memasak di Desa Kapuak, 2025 (Jumlah)
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
                  <th colSpan={6} className="border px-4 py-2">
                    Bahan bakar/energi utama untuk Memasak (Jumlah)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Gas elpigi 5,5 kg</th>
                  <th className="border px-4 py-2">Gas elpigi 12 kg</th>
                  <th className="border px-4 py-2">Gas elpigi 3 kg</th>
                  <th className="border px-4 py-2">
                    Minyak tanah/Briket/Arang/Kayu bakar
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
                      {row.gas55}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.gas12}
                    </td>
                    <td className="border px-4 py-2 text-center">{row.gas3}</td>
                    <td className="border px-4 py-2 text-center">
                      {row.minyakKayu}
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
