"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

// Data jumlah
const jumlahData = [
  {
    karakteristik: "Laki-Laki",
    tidakPunyaIjazahSD: 7,
    tamatSD: 13,
    tamatSMP: 9,
    tamatSMA: 29,
    tamatPT: 19,
    jumlah: 77,
  },
  {
    karakteristik: "Perempuan",
    tidakPunyaIjazahSD: 4,
    tamatSD: 21,
    tamatSMP: 12,
    tamatSMA: 20,
    tamatPT: 25,
    jumlah: 82,
  },
  {
    karakteristik: "Desa Kapuak",
    tidakPunyaIjazahSD: 11,
    tamatSD: 34,
    tamatSMP: 21,
    tamatSMA: 49,
    tamatPT: 44,
    jumlah: 159,
  },
];

// Data persentase
const persentaseData = [
  {
    karakteristik: "Laki-Laki",
    tidakPunyaIjazahSD: 4.4,
    tamatSD: 8.18,
    tamatSMP: 5.66,
    tamatSMA: 18.24,
    tamatPT: 11.95,
    jumlah: 48.43,
  },
  {
    karakteristik: "Perempuan",
    tidakPunyaIjazahSD: 2.52,
    tamatSD: 13.21,
    tamatSMP: 7.55,
    tamatSMA: 12.58,
    tamatPT: 15.72,
    jumlah: 51.57,
  },
  {
    karakteristik: "Desa Kapuak",
    tidakPunyaIjazahSD: 6.92,
    tamatSD: 21.38,
    tamatSMP: 13.21,
    tamatSMA: 30.82,
    tamatPT: 27.67,
    jumlah: 100.0,
  },
];

// Untuk grafik: per kategori pendidikan, bandingkan laki-laki dan perempuan
const chartData = [
  {
    kategori: "Tidak Punya Ijazah SD",
    LakiLaki: persentaseData[0].tidakPunyaIjazahSD,
    Perempuan: persentaseData[1].tidakPunyaIjazahSD,
  },
  {
    kategori: "Tamat SD Sederajat",
    LakiLaki: persentaseData[0].tamatSD,
    Perempuan: persentaseData[1].tamatSD,
  },
  {
    kategori: "Tamat SMP Sederajat",
    LakiLaki: persentaseData[0].tamatSMP,
    Perempuan: persentaseData[1].tamatSMP,
  },
  {
    kategori: "Tamat SMA/SMK Sederajat",
    LakiLaki: persentaseData[0].tamatSMA,
    Perempuan: persentaseData[1].tamatSMA,
  },
  {
    kategori: "Tamat Perguruan Tinggi",
    LakiLaki: persentaseData[0].tamatPT,
    Perempuan: persentaseData[1].tamatPT,
  },
];

export default function T2p3() {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleDownloadExcel = () => {
    // Gabungkan jumlah dan persentase
    const worksheet = XLSX.utils.json_to_sheet([
      { Tabel: "Jumlah" },
      ...jumlahData,
      {},
      { Tabel: "Persentase" },
      ...persentaseData,
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "T2p3");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "t2p3_pendidikan_ijazah.xlsx");
  };

  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "t2p3_grafik_pendidikan.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh chart:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <Card className="mb-6 md:mb-0 md:w-1/2 flex flex-col border border-gray-200">
          <CardHeader className="bg-white border-b border-gray-200">
            <CardTitle className="text-lg font-semibold">
              Tabel 2.3 Persentase Penduduk Berumur 15 Tahun ke Atas Menurut
              Jenis Kelamin dan Tingkat Pendidikan Tertinggi yang Ditamatkan
              (Ijazah/STTB Tertinggi yang Dimiliki) di Desa Kapuak, 2025
              (Grafik)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-4">
            <div ref={chartRef} className="w-full" style={{ minHeight: 420 }}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="kategori" />
                  <YAxis unit="%" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="LakiLaki" fill="#6366f1" name="Laki-Laki" />
                  <Bar dataKey="Perempuan" fill="#f472b6" name="Perempuan" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm" onClick={handleDownloadChart}>
                Download Grafik
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="md:w-1/2 flex flex-col border border-gray-200">
          <CardHeader className="bg-white border-b border-gray-200">
            <CardTitle className="text-lg font-semibold">
              Tabel 2.3 Persentase Penduduk Berumur 15 Tahun ke Atas Menurut
              Jenis Kelamin dan Tingkat Pendidikan Tertinggi yang Ditamatkan
              (Ijazah/STTB Tertinggi yang Dimiliki) di Desa Kapuak, 2025 (Tabel)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-4">
            <div className="overflow-x-auto" style={{ minHeight: 340 }}>
              {/* Tabel Jumlah */}
              <div className="font-semibold mb-2">Jumlah</div>
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border px-4 py-2">Karakteristik</th>
                    <th className="border px-4 py-2 text-center">
                      Tidak Punya Ijazah SD
                    </th>
                    <th className="border px-4 py-2 text-center">
                      Tamat SD Sederajat
                    </th>
                    <th className="border px-4 py-2 text-center">
                      Tamat SMP Sederajat
                    </th>
                    <th className="border px-4 py-2 text-center">
                      Tamat SMA/SMK Sederajat
                    </th>
                    <th className="border px-4 py-2 text-center">
                      Tamat Perguruan Tinggi
                    </th>
                    <th className="border px-4 py-2 text-center">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {jumlahData.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="border px-4 py-2 font-semibold">
                        {row.karakteristik}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {row.tidakPunyaIjazahSD}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {row.tamatSD}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {row.tamatSMP}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {row.tamatSMA}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {row.tamatPT}
                      </td>
                      <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                        {row.jumlah}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Tabel Persentase */}
            <div className="overflow-x-auto" style={{ minHeight: 180 }}>
              <div className="font-semibold mb-2">Persentase (%)</div>
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="border px-4 py-2">Karakteristik</th>
                    <th className="border px-4 py-2 text-center">
                      Tidak Punya Ijazah SD
                    </th>
                    <th className="border px-4 py-2 text-center">
                      Tamat SD Sederajat
                    </th>
                    <th className="border px-4 py-2 text-center">
                      Tamat SMP Sederajat
                    </th>
                    <th className="border px-4 py-2 text-center">
                      Tamat SMA/SMK Sederajat
                    </th>
                    <th className="border px-4 py-2 text-center">
                      Tamat Perguruan Tinggi
                    </th>
                    <th className="border px-4 py-2 text-center">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {persentaseData.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="border px-4 py-2 font-semibold">
                        {row.karakteristik}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {row.tidakPunyaIjazahSD.toFixed(2)}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {row.tamatSD.toFixed(2)}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {row.tamatSMP.toFixed(2)}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {row.tamatSMA.toFixed(2)}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {row.tamatPT.toFixed(2)}
                      </td>
                      <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                        {row.jumlah.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm" onClick={handleDownloadExcel}>
                Download Excel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
