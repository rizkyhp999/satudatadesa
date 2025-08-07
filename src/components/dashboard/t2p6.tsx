import { useMemo, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LAPANGAN_PERTANIAN: Record<string, string> = {
  "1": "Pertanian tanaman padi & palawija",
  "2": "Hortikultura",
  "3": "Perkebunan",
  "4": "Perikanan",
  "5": "Peternakan",
  "6": "Kehutanan & pertanian lainnya",
};

const KODE_PERTANIAN = ["1", "2", "3", "4", "5", "6"];

export default function T2P6({ data }: { data?: any }) {
  const anggota = data?.anggota || [];
  const chartRef = useRef<HTMLDivElement>(null);

  // Filter hanya yang berusaha di sektor pertanian (kode 1-6 pada lapangan usaha sendiri)
  const rows = useMemo(() => {
    if (!anggota || anggota.length === 0) return [];
    const berusaha = anggota.filter(
      (a: any) =>
        a["506_memilikiUsaha"] === "1" &&
        KODE_PERTANIAN.includes(a["508_lapanganUsahaSendiri"])
    );
    // Group by lapangan usaha
    const result: Record<string, number> = {};
    berusaha.forEach((a: any) => {
      const kodeUsaha = a["508_lapanganUsahaSendiri"];
      if (!kodeUsaha) return;
      if (!result[kodeUsaha]) result[kodeUsaha] = 0;
      result[kodeUsaha]++;
    });
    // Convert to array
    return KODE_PERTANIAN.map((kode) => ({
      kode,
      nama: LAPANGAN_PERTANIAN[kode],
      jumlah: result[kode] || 0,
    }));
  }, [anggota]);

  // Data untuk grafik
  const chartData = useMemo(() => {
    return {
      labels: rows.map((row) => row.nama),
      datasets: [
        {
          label: "Jumlah Penduduk",
          data: rows.map((row) => row.jumlah),
          backgroundColor: "#2563eb", // biru
        },
      ],
    };
  }, [rows]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Grafik Jumlah Penduduk Menurut Mata Pencaharian Pertanian",
      },
    },
    scales: {
      x: { stacked: false },
      y: { beginAtZero: true },
    },
  };

  const total = rows.reduce((a, b) => a + b.jumlah, 0);

  // Download chart as PNG
  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "grafik_t2p6_pertanian.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  // Download table as Excel
  const handleDownloadTable = () => {
    const wsData = [
      ["Lapangan Usaha", "2025"],
      ...rows.map((row) => [row.nama, row.jumlah]),
      ["Total", total],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekap");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "rekap_pertanian_2025.xlsx");
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      <Card className="mb-6 md:mb-0 md:w-1/2 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Tabel 2.6 Jumlah Penduduk Menurut Mata Pencaharian Pertanian di Desa
            Kapuak, 2025 (Grafik)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4">
          <div
            ref={chartRef}
            className="flex justify-center items-center h-full w-full"
            style={{ minHeight: 420 }}
          >
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="flex justify-end mt-2">
            <Button variant="outline" size="sm" onClick={handleDownloadChart}>
              <Download className="w-4 h-4 mr-2" />
              Download Grafik
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="md:w-1/2 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Tabel 2.6 Jumlah Penduduk Menurut Mata Pencaharian Pertanian di Desa
            Kapuak, 2025 (Tabel)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4">
          <div className="overflow-x-auto" style={{ minHeight: 340 }}>
            <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr className="bg-gray-50">
                  <th className="border px-4 py-2">Lapangan Usaha</th>
                  <th className="border px-4 py-2">2025</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.kode} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{row.nama}</td>
                    <td className="border px-4 py-2 text-center">
                      {row.jumlah}
                    </td>
                  </tr>
                ))}
                {/* Total row */}
                <tr className="font-bold bg-gray-100">
                  <td className="border px-4 py-2">Total</td>
                  <td className="border px-4 py-2 text-center">{total}</td>
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
