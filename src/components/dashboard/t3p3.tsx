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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const jumlahData = [
  {
    sls: "Desa Kapuak",
    tembok: 28,
    plesteranBambuKawat: 0,
    kayuPapanBatangKayu: 55,
    lainnya: 0,
    jumlah: 83,
  },
  {
    sls: "RT01",
    tembok: 13,
    plesteranBambuKawat: 0,
    kayuPapanBatangKayu: 20,
    lainnya: 0,
    jumlah: 33,
  },
  {
    sls: "RT02",
    tembok: 15,
    plesteranBambuKawat: 0,
    kayuPapanBatangKayu: 35,
    lainnya: 0,
    jumlah: 50,
  },
  {
    sls: "Luar Desa Kapuak",
    tembok: 1,
    plesteranBambuKawat: 0,
    kayuPapanBatangKayu: 8,
    lainnya: 0,
    jumlah: 9,
  },
  {
    sls: "Total",
    tembok: 29,
    plesteranBambuKawat: 0,
    kayuPapanBatangKayu: 63,
    lainnya: 0,
    jumlah: 92,
  },
];

const persentaseData = [
  {
    sls: "Desa Kapuak",
    tembok: 30.43,
    plesteranBambuKawat: 0.0,
    kayuPapanBatangKayu: 59.78,
    lainnya: 0.0,
    jumlah: 90.22,
  },
  {
    sls: "RT01",
    tembok: 14.13,
    plesteranBambuKawat: 0.0,
    kayuPapanBatangKayu: 21.74,
    lainnya: 0.0,
    jumlah: 35.87,
  },
  {
    sls: "RT02",
    tembok: 16.3,
    plesteranBambuKawat: 0.0,
    kayuPapanBatangKayu: 38.04,
    lainnya: 0.0,
    jumlah: 54.35,
  },
  {
    sls: "Luar Desa Kapuak",
    tembok: 1.09,
    plesteranBambuKawat: 0.0,
    kayuPapanBatangKayu: 8.7,
    lainnya: 0.0,
    jumlah: 9.78,
  },
  {
    sls: "Total",
    tembok: 31.52,
    plesteranBambuKawat: 0.0,
    kayuPapanBatangKayu: 68.48,
    lainnya: 0.0,
    jumlah: 100.0,
  },
];

const pieColors = [
  "#2563eb", // Tembok
  "#fbbf24", // Plesteran anyaman bambu/Kawat
  "#10b981", // Kayu/Papan/Batang kayu
  "#f472b6", // Lainnya
];

export default function T3p3() {
  const chartRef = useRef<HTMLDivElement>(null);

  const desaData = persentaseData.find((row) => row.sls === "Desa Kapuak");
  const pieData = [
    { name: "Tembok", value: desaData?.tembok ?? 0 },
    {
      name: "Plesteran anyaman bambu/Kawat",
      value: desaData?.plesteranBambuKawat ?? 0,
    },
    {
      name: "Kayu/Papan/Batang kayu",
      value: desaData?.kayuPapanBatangKayu ?? 0,
    },
    { name: "Lainnya", value: desaData?.lainnya ?? 0 },
  ];

  // Download table as Excel
  const handleDownloadTable = () => {
    const wsData = [
      [
        "Satuan Lingkungan Setempat",
        "Tembok",
        "Plesteran anyaman bambu/Kawat",
        "Kayu/Papan/Batang kayu",
        "Lainnya",
        "Jumlah",
      ],
      ...jumlahData.map((row) => [
        row.sls,
        row.tembok,
        row.plesteranBambuKawat,
        row.kayuPapanBatangKayu,
        row.lainnya,
        row.jumlah,
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekap");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "rekap_dinding_rumah_2025.xlsx");
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="mb-6 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Grafik Persentase Keluarga Menurut Bahan Bangunan Utama Dinding
            Rumah Terluas di Desa Kapuak, 2025 (Pie)
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
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>
            Tabel 3.3 Persentase Keluarga Menurut Satuan Lingkungan Setempat dan
            Bahan Bangunan Utama Dinding Rumah Terluas di Desa Kapuak, 2025 (%)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="overflow-x-auto" style={{ minHeight: 420 }}>
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2" rowSpan={2}>
                    Satuan Lingkungan Setempat
                  </th>
                  <th className="border px-4 py-2" colSpan={5}>
                    Bahan Bangunan Utama Dinding Rumah Terluas (%)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Tembok</th>
                  <th className="border px-4 py-2">
                    Plesteran anyaman bambu/Kawat
                  </th>
                  <th className="border px-4 py-2">Kayu/Papan/Batang kayu</th>
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
                      {row.tembok}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.plesteranBambuKawat}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.kayuPapanBatangKayu}
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
            Tabel 3.3 Keluarga Menurut Satuan Lingkungan Setempat dan Bahan
            Bangunan Utama Dinding Rumah Terluas di Desa Kapuak, 2025 (Jumlah)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="overflow-x-auto" style={{ minHeight: 420 }}>
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2" rowSpan={2}>
                    Satuan Lingkungan Setempat
                  </th>
                  <th className="border px-4 py-2" colSpan={5}>
                    Bahan Bangunan Utama Dinding Rumah Terluas (Jumlah)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Tembok</th>
                  <th className="border px-4 py-2">
                    Plesteran anyaman bambu/Kawat
                  </th>
                  <th className="border px-4 py-2">Kayu/Papan/Batang kayu</th>
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
                      {row.tembok}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.plesteranBambuKawat}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.kayuPapanBatangKayu}
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
          <div className="flex justify-end mt-2">
            <Button variant="outline" size="sm" onClick={handleDownloadTable}>
              <Download className="w-4 h-4 mr-2" />
              Download Tabel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
