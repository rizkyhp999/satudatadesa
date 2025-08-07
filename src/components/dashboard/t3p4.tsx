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
    betonGentengSengKayuSirap: 83,
    lainnya: 0,
    jumlah: 83,
  },
  {
    sls: "RT01",
    betonGentengSengKayuSirap: 33,
    lainnya: 0,
    jumlah: 33,
  },
  {
    sls: "RT02",
    betonGentengSengKayuSirap: 50,
    lainnya: 0,
    jumlah: 50,
  },
  {
    sls: "Luar Desa Kapuak",
    betonGentengSengKayuSirap: 9,
    lainnya: 0,
    jumlah: 9,
  },
  {
    sls: "Total",
    betonGentengSengKayuSirap: 92,
    lainnya: 0,
    jumlah: 92,
  },
];

const persentaseData = [
  {
    sls: "Desa Kapuak",
    betonGentengSengKayuSirap: 90.22,
    lainnya: 0.0,
    jumlah: 90.22,
  },
  {
    sls: "RT01",
    betonGentengSengKayuSirap: 35.87,
    lainnya: 0.0,
    jumlah: 35.87,
  },
  {
    sls: "RT02",
    betonGentengSengKayuSirap: 54.35,
    lainnya: 0.0,
    jumlah: 54.35,
  },
  {
    sls: "Luar Desa Kapuak",
    betonGentengSengKayuSirap: 9.78,
    lainnya: 0.0,
    jumlah: 9.78,
  },
  {
    sls: "Total",
    betonGentengSengKayuSirap: 100.0,
    lainnya: 0.0,
    jumlah: 100.0,
  },
];

const pieColors = [
  "#2563eb", // Beton/Genteng/Seng/Kayu/Sirap
  "#f472b6", // Lainnya
];

// Fungsi download PNG
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

// Fungsi download CSV
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

export default function T3p4() {
  const chartRef = useRef<HTMLDivElement>(null); // <-- Explicit type

  const desaData = persentaseData.find((row) => row.sls === "Desa Kapuak");
  const pieData = [
    {
      name: "Beton/Genteng/Seng/Kayu/Sirap",
      value: desaData?.betonGentengSengKayuSirap ?? 0,
    },
    { name: "Lainnya", value: desaData?.lainnya ?? 0 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card className="mb-6 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Grafik Persentase Keluarga Menurut Bahan Bangunan Utama Atap Rumah
            Terluas di Desa Kapuak, 2025 (Pie)
          </CardTitle>
          <div className="mt-2 flex gap-2">
            <button
              className="px-3 py-1 border rounded text-sm bg-blue-500 text-white"
              onClick={() => downloadChartAsPNG(chartRef, "grafik-t3p4.png")}
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
            Tabel 3.4 Persentase Keluarga Menurut Satuan Lingkungan Setempat dan
            Bahan Bangunan Utama Atap Rumah Terluas di Desa Kapuak, 2025 (%)
          </CardTitle>
          <div className="mt-2 flex gap-2">
            <button
              className="px-3 py-1 border rounded text-sm bg-green-500 text-white"
              onClick={() =>
                downloadTableAsCSV(
                  persentaseData,
                  ["sls", "betonGentengSengKayuSirap", "lainnya", "jumlah"],
                  "tabel-t3p4-persentase.csv"
                )
              }
            >
              Download Tabel
            </button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="overflow-x-auto" style={{ minHeight: 420 }}>
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2" rowSpan={2}>
                    Satuan Lingkungan Setempat
                  </th>
                  <th className="border px-4 py-2" colSpan={3}>
                    Bahan Bangunan Utama Atap Rumah Terluas (%)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">
                    Beton/Genteng/Seng/Kayu/Sirap
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
                      {row.betonGentengSengKayuSirap}
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
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>
            Tabel 3.4 Keluarga Menurut Satuan Lingkungan Setempat dan Bahan
            Bangunan Utama Atap Rumah Terluas di Desa Kapuak, 2025 (Jumlah)
          </CardTitle>
          <div className="mt-2 flex gap-2">
            <button
              className="px-3 py-1 border rounded text-sm bg-green-500 text-white"
              onClick={() =>
                downloadTableAsCSV(
                  jumlahData,
                  ["sls", "betonGentengSengKayuSirap", "lainnya", "jumlah"],
                  "tabel-t3p4-jumlah.csv"
                )
              }
            >
              Download Tabel
            </button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="overflow-x-auto" style={{ minHeight: 420 }}>
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2" rowSpan={2}>
                    Satuan Lingkungan Setempat
                  </th>
                  <th className="border px-4 py-2" colSpan={3}>
                    Bahan Bangunan Utama Atap Rumah Terluas (Jumlah)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">
                    Beton/Genteng/Seng/Kayu/Sirap
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
                      {row.betonGentengSengKayuSirap}
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
