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
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const jumlahData = [
  {
    sls: "Desa Kapuak",
    milikSendiri: 65,
    kontrakSewa: 0,
    bebasSewa: 16,
    rumahDinas: 2,
    lainnya: 0,
    jumlah: 83,
  },
  {
    sls: "RT01",
    milikSendiri: 28,
    kontrakSewa: 0,
    bebasSewa: 5,
    rumahDinas: 0,
    lainnya: 0,
    jumlah: 33,
  },
  {
    sls: "RT02",
    milikSendiri: 37,
    kontrakSewa: 0,
    bebasSewa: 11,
    rumahDinas: 2,
    lainnya: 0,
    jumlah: 50,
  },
  {
    sls: "Luar Desa Kapuak",
    milikSendiri: 3,
    kontrakSewa: 2,
    bebasSewa: 4,
    rumahDinas: 0,
    lainnya: 0,
    jumlah: 9,
  },
  {
    sls: "Total",
    milikSendiri: 68,
    kontrakSewa: 2,
    bebasSewa: 20,
    rumahDinas: 2,
    lainnya: 0,
    jumlah: 92,
  },
];

const persentaseData = [
  {
    sls: "Desa Kapuak",
    milikSendiri: 70.65,
    kontrakSewa: 0.0,
    bebasSewa: 17.39,
    rumahDinas: 2.17,
    lainnya: 0.0,
    jumlah: 90.22,
  },
  {
    sls: "RT01",
    milikSendiri: 30.43,
    kontrakSewa: 0.0,
    bebasSewa: 5.43,
    rumahDinas: 0.0,
    lainnya: 0.0,
    jumlah: 35.87,
  },
  {
    sls: "RT02",
    milikSendiri: 40.22,
    kontrakSewa: 0.0,
    bebasSewa: 11.96,
    rumahDinas: 2.17,
    lainnya: 0.0,
    jumlah: 54.35,
  },
  {
    sls: "Luar Desa Kapuak",
    milikSendiri: 3.26,
    kontrakSewa: 2.17,
    bebasSewa: 4.35,
    rumahDinas: 0.0,
    lainnya: 0.0,
    jumlah: 9.78,
  },
  {
    sls: "Total",
    milikSendiri: 73.91,
    kontrakSewa: 2.17,
    bebasSewa: 21.74,
    rumahDinas: 2.17,
    lainnya: 0.0,
    jumlah: 100.0,
  },
];

export default function T3p1() {
  const chartRef = useRef<HTMLDivElement>(null);

  // PieChart data: gunakan persentaseData untuk "Desa Kapuak"
  const desaData = persentaseData.find((row) => row.sls === "Desa Kapuak");
  const pieData = [
    { name: "Milik Sendiri", value: desaData?.milikSendiri ?? 0 },
    { name: "Kontrak/Sewa", value: desaData?.kontrakSewa ?? 0 },
    { name: "Bebas Sewa", value: desaData?.bebasSewa ?? 0 },
    { name: "Rumah Dinas", value: desaData?.rumahDinas ?? 0 },
    { name: "Lainnya", value: desaData?.lainnya ?? 0 },
  ];
  const pieColors = ["#2563eb", "#fbbf24", "#10b981", "#a78bfa", "#f472b6"];

  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "piechart_t3p1.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  // Refactor: Download table as Excel, menerima data dan nama file
  const handleDownloadExcel = (tableData: any[], filename: string) => {
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekap");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, filename);
  };

  // Data header dan body untuk tabel persentase
  const persentaseTableData = [
    [
      "Satuan Lingkungan Setempat",
      "Milik Sendiri",
      "Kontrak/Sewa",
      "Bebas Sewa",
      "Rumah Dinas",
      "Lainnya",
      "Jumlah",
    ],
    ...persentaseData.map((row) => [
      row.sls,
      row.milikSendiri,
      row.kontrakSewa,
      row.bebasSewa,
      row.rumahDinas,
      row.lainnya,
      row.jumlah,
    ]),
  ];

  // Data header dan body untuk tabel jumlah
  const jumlahTableData = [
    [
      "Satuan Lingkungan Setempat",
      "Milik Sendiri",
      "Kontrak/Sewa",
      "Bebas Sewa",
      "Rumah Dinas",
      "Lainnya",
      "Jumlah",
    ],
    ...jumlahData.map((row) => [
      row.sls,
      row.milikSendiri,
      row.kontrakSewa,
      row.bebasSewa,
      row.rumahDinas,
      row.lainnya,
      row.jumlah,
    ]),
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Grafik Pie persentase kepemilikan bangunan */}
      <Card className="mb-6 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Grafik Persentase Keluarga Menurut Status Kepemilikan Bangunan
            Tempat Tinggal di Desa Kapuak, 2025 (Pie)
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
          <div className="flex justify-end mt-2">
            <Button variant="outline" size="sm" onClick={handleDownloadChart}>
              <Download className="w-4 h-4 mr-2" />
              Download Grafik
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6 flex flex-col">
        <CardHeader>
          <CardTitle>
            Tabel 3.1 Persentase Keluarga Menurut Satuan Lingkungan Setempat dan
            Status Kepemilikan Bangunan Tempat Tinggal yang Ditempati di Desa
            Kapuak, 2025 (%)
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
                  <th className="border px-4 py-2" colSpan={6}>
                    Status Kepemilikan Bangunan (%)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Milik Sendiri</th>
                  <th className="border px-4 py-2">Kontrak/Sewa</th>
                  <th className="border px-4 py-2">Bebas Sewa</th>
                  <th className="border px-4 py-2">Rumah Dinas</th>
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
                      {row.milikSendiri}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.kontrakSewa}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.bebasSewa}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.rumahDinas}
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
          {/* Tambahkan tombol download Excel di tabel persentase */}
          <div className="flex justify-end mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleDownloadExcel(
                  persentaseTableData,
                  "rekap_persentase_kepemilikan_bangunan_2025.xlsx"
                )
              }
            >
              <Download className="w-4 h-4 mr-2" />
              Download Tabel
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>
            Tabel 3.1 Keluarga Menurut Satuan Lingkungan Setempat dan Status
            Kepemilikan Bangunan Tempat Tinggal yang Ditempati di Desa Kapuak,
            2025 (Jumlah)
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
                  <th className="border px-4 py-2" colSpan={6}>
                    Status Kepemilikan Bangunan (Jumlah)
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2">Milik Sendiri</th>
                  <th className="border px-4 py-2">Kontrak/Sewa</th>
                  <th className="border px-4 py-2">Bebas Sewa</th>
                  <th className="border px-4 py-2">Rumah Dinas</th>
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
                      {row.milikSendiri}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.kontrakSewa}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.bebasSewa}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.rumahDinas}
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
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleDownloadExcel(
                  jumlahTableData,
                  "rekap_kepemilikan_bangunan_2025.xlsx"
                )
              }
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
