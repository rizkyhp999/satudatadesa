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

const LAPANGAN_USAHA: Record<string, string> = {
  "1": "Pertanian tanaman padi & palawija",
  "2": "Hortikultura",
  "3": "Perkebunan",
  "4": "Perikanan",
  "5": "Peternakan",
  "6": "Kehutanan & pertanian lainnya",
  "7": "Pertambangan/penggalian",
  "8": "Industri pengolahan",
  "9": "Pengadaan listrik, gas, uap air panas dan air dingin",
  "10": "Pengelolaan air, pengelolaan air limbah, pengelolaan dan daur ulang sampah, dan aktivitas remediasi",
  "11": "Konstruksi",
  "12": "Perdagangan besar dan eceran, reparasi dan perawatan mobil dan sepeda motor",
  "13": "Pengangkutan dan pergudangan",
  "14": "Penyediaan akomodasi & makan minum",
  "15": "Informasi & komunikasi",
  "16": "Keuangan & asuransi",
  "17": "Real estate",
  "18": "Aktivitas profesional, ilmiah dan teknis",
  "19": "Aktivitas penyewaan dan sewa guna tanpa hak opsi, ketenagakerjaan, agen perjalanan dan penunjang usaha lainnya",
  "20": "Administrasi pemerintahan, pertahanan, dan jaminan sosial wajib",
  "21": "Pendidikan",
  "22": "Aktivitas kesehatan manusia dan aktivitas sosial",
  "23": "Kesenian, hiburan dan rekreasi",
  "24": "Aktivitas jasa lainnya",
  "25": "Aktivitas keluarga sebagai pemberi kerja",
  "26": "Aktivitas badan internasional dan badan ekstra internasional lainnya",
};

export default function T2P5({ data }: { data?: any }) {
  const anggota = data?.anggota || [];
  const chartRef = useRef<HTMLDivElement>(null);

  const rows = useMemo(() => {
    if (!anggota || anggota.length === 0) return [];
    // Filter hanya yang berusaha (memiliki usaha)
    const berusaha = anggota.filter(
      (a: any) =>
        a["506_memilikiUsaha"] === "1" && a["508_lapanganUsahaSendiri"]
    );
    // Group by lapangan usaha dan jenis kelamin
    const result: Record<string, { laki: number; perempuan: number }> = {};
    berusaha.forEach((a: any) => {
      const kodeUsaha = a["508_lapanganUsahaSendiri"];
      const jk = a["308_jenisKelamin"];
      if (!kodeUsaha || !jk) return;
      if (!result[kodeUsaha]) {
        result[kodeUsaha] = { laki: 0, perempuan: 0 };
      }
      if (jk === "1") result[kodeUsaha].laki++;
      else if (jk === "2") result[kodeUsaha].perempuan++;
    });
    // Convert to array
    return Object.entries(result).map(([kode, val]) => ({
      kode,
      nama: LAPANGAN_USAHA[kode] || kode,
      laki: val.laki,
      perempuan: val.perempuan,
      total: val.laki + val.perempuan,
    }));
  }, [anggota]);

  // Data untuk grafik
  const chartData = useMemo(() => {
    return {
      labels: rows.map((row) => row.nama),
      datasets: [
        {
          label: "Laki-Laki",
          data: rows.map((row) => row.laki),
          backgroundColor: "#3b82f6",
        },
        {
          label: "Perempuan",
          data: rows.map((row) => row.perempuan),
          backgroundColor: "#f472b6",
        },
      ],
    };
  }, [rows]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Grafik Jumlah Penduduk Berusaha per Lapangan Usaha",
      },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  };

  // Download chart as PNG
  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "grafik_t2p5_lapangan_usaha.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  // Download table as Excel
  const handleDownloadTable = () => {
    const wsData = [
      ["Lapangan Usaha", "Laki-Laki", "Perempuan", "Total"],
      ...rows.map((row) => [row.nama, row.laki, row.perempuan, row.total]),
      [
        "Total",
        rows.reduce((a, b) => a + b.laki, 0),
        rows.reduce((a, b) => a + b.perempuan, 0),
        rows.reduce((a, b) => a + b.total, 0),
      ],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekap");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "rekap_lapangan_usaha_berusaha_jenis_kelamin.xlsx");
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      <Card className="mb-6 md:mb-0 md:w-1/2 flex flex-col border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold">
            Tabel 2.5 Jumlah Penduduk yang Berusaha Menurut Lapangan Usaha dan
            Jenis Kelamin di Desa Kapuak, 2025 (Grafik)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4">
          <div ref={chartRef} className="w-full" style={{ minHeight: 420 }}>
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
            Tabel 2.5 Jumlah Penduduk yang Berusaha Menurut Lapangan Usaha dan
            Jenis Kelamin di Desa Kapuak, 2025 (Tabel)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4">
          <div className="overflow-x-auto" style={{ minHeight: 340 }}>
            <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr className="bg-gray-50">
                  <th className="border px-4 py-2">Lapangan Usaha</th>
                  <th className="border px-4 py-2">Laki-Laki</th>
                  <th className="border px-4 py-2">Perempuan</th>
                  <th className="border px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.kode} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{row.nama}</td>
                    <td className="border px-4 py-2 text-center">{row.laki}</td>
                    <td className="border px-4 py-2 text-center">
                      {row.perempuan}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {row.total}
                    </td>
                  </tr>
                ))}
                {/* Total row */}
                <tr className="font-bold bg-gray-100">
                  <td className="border px-4 py-2">Total</td>
                  <td className="border px-4 py-2 text-center">
                    {rows.reduce((a, b) => a + b.laki, 0)}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {rows.reduce((a, b) => a + b.perempuan, 0)}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {rows.reduce((a, b) => a + b.total, 0)}
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
