"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const jumlahData = [
  { jenis: "Bibit Sawit", lanjut: 21, tidakLanjut: 1, jumlah: 22 },
  { jenis: "Benih ikan lele", lanjut: 0, tidakLanjut: 23, jumlah: 23 },
  {
    jenis: "Bibit sayuran dan buah-buahan",
    lanjut: 31,
    tidakLanjut: 13,
    jumlah: 44,
  },
];

const persentaseData = [
  { jenis: "Bibit Sawit", lanjut: 95.45, tidakLanjut: 4.55, jumlah: 100.0 },
  { jenis: "Benih ikan lele", lanjut: 0.0, tidakLanjut: 100.0, jumlah: 100.0 },
  {
    jenis: "Bibit sayuran dan buah-buahan",
    lanjut: 70.45,
    tidakLanjut: 29.55,
    jumlah: 100.0,
  },
];

export default function T4p3() {
  const chartRefJumlah = useRef<HTMLDivElement>(null);
  const chartRefPersen = useRef<HTMLDivElement>(null);

  const handleDownloadChartJumlah = async () => {
    if (!chartRefJumlah.current) return;
    try {
      const dataUrl = await toPng(chartRefJumlah.current);
      const link = document.createElement("a");
      link.download = "grafik_t4p3_jumlah.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik jumlah:", err);
    }
  };

  const handleDownloadChartPersen = async () => {
    if (!chartRefPersen.current) return;
    try {
      const dataUrl = await toPng(chartRefPersen.current);
      const link = document.createElement("a");
      link.download = "grafik_t4p3_persentase.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik persentase:", err);
    }
  };

  const handleDownloadTableJumlah = () => {
    const worksheet = XLSX.utils.json_to_sheet(jumlahData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jumlah");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "tabel_t4p3_jumlah.xlsx");
  };

  const handleDownloadTablePersen = () => {
    const worksheet = XLSX.utils.json_to_sheet(persentaseData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Persentase");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "tabel_t4p3_persentase.xlsx");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Grafik Jumlah */}
      <Card>
        <CardHeader>
          <CardTitle>
            Grafik Keberlanjutan Penerima Bantuan Pertanian Pemerintah Desa di
            Desa Kapuak, 2022-2024 (Jumlah)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={chartRefJumlah} style={{ minHeight: 320 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jumlahData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jenis" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="lanjut" fill="#2563eb" name="Lanjut" />
                <Bar dataKey="tidakLanjut" fill="#ef4444" name="Tidak Lanjut" />
                <Bar dataKey="jumlah" fill="#2563eb" name="Jumlah" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-end mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadChartJumlah}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Grafik
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Tabel Jumlah */}
      <Card>
        <CardHeader>
          <CardTitle>
            Tabel 4.3 Persentase Keberlanjutan Penerima Bantuan Pertanian
            Pemerintah Desa di Desa Kapuak, 2022-2024 (Jumlah)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2">Jenis Bantuan</th>
                  <th className="border px-4 py-2">Lanjut</th>
                  <th className="border px-4 py-2">Tidak Lanjut</th>
                  <th className="border px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {jumlahData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{row.jenis}</td>
                    <td className="border px-4 py-2 text-center">
                      {row.lanjut}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.tidakLanjut}
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
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadTableJumlah}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Tabel
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Grafik Persentase */}
      <Card>
        <CardHeader>
          <CardTitle>
            Grafik Keberlanjutan Penerima Bantuan Pertanian Pemerintah Desa di
            Desa Kapuak, 2022-2024 (%)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={chartRefPersen} style={{ minHeight: 320 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={persentaseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jenis" />
                <YAxis unit="%" />
                <Tooltip />
                <Legend />
                <Bar dataKey="lanjut" fill="#2563eb" name="Lanjut (%)" />
                <Bar
                  dataKey="tidakLanjut"
                  fill="#ef4444"
                  name="Tidak Lanjut (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-end mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadChartPersen}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Grafik
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Tabel Persentase */}
      <Card>
        <CardHeader>
          <CardTitle>
            Tabel 4.3 Persentase Keberlanjutan Penerima Bantuan Pertanian
            Pemerintah Desa di Desa Kapuak, 2022-2024 (%)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2">Jenis Bantuan</th>
                  <th className="border px-4 py-2">Lanjut (%)</th>
                  <th className="border px-4 py-2">Tidak Lanjut (%)</th>
                  <th className="border px-4 py-2">Jumlah (%)</th>
                </tr>
              </thead>
              <tbody>
                {persentaseData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{row.jenis}</td>
                    <td className="border px-4 py-2 text-center">
                      {row.lanjut}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.tidakLanjut}
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
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadTablePersen}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Tabel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
