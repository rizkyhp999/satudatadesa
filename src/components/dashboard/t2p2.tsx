"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { toPng } from "html-to-image";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Mapping kode ke label partisipasi sekolah (kategori baru)
const partisipasiLabels: Record<string, string> = {
  "1": "Tidak/belum pernah sekolah",
  "2a": "Masih SD/MI/sederajat",
  "2b": "Masih SMP/MTs/sederajat",
  "2c": "Masih SMA/SMK/MA/sederajat",
  "2d": "Masih Perguruan Tinggi",
  "3": "Tidak bersekolah lagi",
};

const jenisKelaminLabels: Record<string, string> = {
  "1": "Laki-laki",
  "2": "Perempuan",
};

// Mapping kode jenjang pendidikan ke kategori
function getJenjangKategori(kode: string) {
  // SD/MI/sederajat
  if (["1", "2", "3", "4", "5"].includes(kode)) return "2a";
  // SMP/MTs/sederajat
  if (["6", "7", "8", "9", "10"].includes(kode)) return "2b";
  // SMA/SMK/MA/sederajat
  if (["11", "12", "13", "14", "15", "16", "17"].includes(kode)) return "2c";
  // Perguruan Tinggi
  if (["18", "19", "20", "21", "22"].includes(kode)) return "2d";
  // Tidak punya ijazah atau lain-lain, fallback ke SD
  if (kode === "23") return "2a";
  return undefined;
}

type Props = {
  data: any;
};

export default function T2p2({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  if (!data) return <div>Data tidak ditemukan</div>;

  // Filter anggota umur 7-23 tahun
  const filtered = data.anggota.filter((a: any) => {
    const umur = parseInt(a["310_umur"] || "0", 10);
    return umur >= 7 && umur <= 23;
  });

  // Hitung jumlah per jenis kelamin dan partisipasi sekolah (kategori baru)
  const counts: Record<string, Record<string, number>> = {
    "1": { "1": 0, "2a": 0, "2b": 0, "2c": 0, "2d": 0, "3": 0 },
    "2": { "1": 0, "2a": 0, "2b": 0, "2c": 0, "2d": 0, "3": 0 },
  };

  filtered.forEach((a: any) => {
    const jk = a["308_jenisKelamin"];
    const ps = a["401_partisipasiSekolah"];
    if (jk !== "1" && jk !== "2") return;

    if (ps === "1") {
      counts[jk]["1"] += 1;
    } else if (ps === "2") {
      // Masih sekolah, cek jenjang
      const jenjang = getJenjangKategori(a["402_jenjangPendidikan"]);
      if (jenjang && counts[jk][jenjang] !== undefined) {
        counts[jk][jenjang] += 1;
      }
    } else if (ps === "3") {
      counts[jk]["3"] += 1;
    }
  });

  // Data untuk grafik bar: satu baris per kategori
  const chartOrder = ["1", "2a", "2b", "2c", "2d", "3"];
  const chartData = chartOrder.map((kode) => ({
    partisipasi: partisipasiLabels[kode],
    laki: counts["1"][kode],
    perempuan: counts["2"][kode],
    total: counts["1"][kode] + counts["2"][kode],
  }));

  // Hitung total per baris dan total per kolom
  const totalPerBaris = {
    "1": chartOrder.reduce((sum, kode) => sum + counts["1"][kode], 0),
    "2": chartOrder.reduce((sum, kode) => sum + counts["2"][kode], 0),
  };
  const totalPerKolom: Record<string, number> = {};
  chartOrder.forEach(
    (kode) => (totalPerKolom[kode] = counts["1"][kode] + counts["2"][kode])
  );
  const grandTotal = totalPerBaris["1"] + totalPerBaris["2"];

  // Download chart as PNG
  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "grafik_partisipasi_sekolah_jenis_kelamin.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  // Download table as Excel
  const handleDownloadTable = () => {
    const wsData = [
      [
        "Jenis Kelamin",
        ...chartOrder.map((k) => partisipasiLabels[k]),
        "Jumlah",
      ],
      ...(["1", "2"] as const).map((jk) => [
        jenisKelaminLabels[jk],
        ...chartOrder.map((k) => counts[jk][k]),
        totalPerBaris[jk],
      ]),
      ["Total", ...chartOrder.map((k) => totalPerKolom[k]), grandTotal],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekap");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "rekap_partisipasi_sekolah_jenis_kelamin.xlsx");
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      <Card className="mb-6 mt-8 md:mb-0 md:w-1/2 flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Jumlah Penduduk Umur 7-23 Tahun menurut Jenis Kelamin dan
            Partisipasi Sekolah (Grafik)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div ref={chartRef} className="w-full" style={{ minHeight: 340 }}>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="partisipasi" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="laki" name="Laki-Laki" fill="#2563eb" />
                <Bar dataKey="perempuan" name="Perempuan" fill="#f472b6" />
              </BarChart>
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
      <Card className="md:w-1/2 flex flex-col">
        <CardHeader>
          <CardTitle>
            Jumlah Penduduk Umur 7-23 Tahun menurut Jenis Kelamin dan
            Partisipasi Sekolah (Tabel)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="overflow-x-auto" style={{ minHeight: 340 }}>
            <table className="w-full text-sm border border-gray-200">
              <thead>
                <tr>
                  <th className="border px-4 py-2 align-middle bg-gray-50">
                    Jenis Kelamin
                  </th>
                  {chartOrder.map((kode) => (
                    <th
                      key={kode}
                      className="border px-4 py-2 text-center bg-gray-50"
                    >
                      {partisipasiLabels[kode]}
                    </th>
                  ))}
                  <th className="border px-4 py-2 text-center bg-gray-50">
                    Jumlah
                  </th>
                </tr>
              </thead>
              <tbody>
                {(["1", "2"] as const).map((jk) => (
                  <tr key={jk} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                      {jenisKelaminLabels[jk]}
                    </td>
                    {chartOrder.map((kode) => (
                      <td key={kode} className="border px-4 py-2 text-center">
                        {counts[jk][kode]}
                      </td>
                    ))}
                    <td className="border px-4 py-2 text-center font-semibold">
                      {totalPerBaris[jk]}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border px-4 py-2 font-bold bg-gray-100">
                    Total
                  </td>
                  {chartOrder.map((kode) => (
                    <td
                      key={kode}
                      className="border px-4 py-2 text-center font-bold bg-gray-100"
                    >
                      {totalPerKolom[kode]}
                    </td>
                  ))}
                  <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                    {grandTotal}
                  </td>
                </tr>
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
