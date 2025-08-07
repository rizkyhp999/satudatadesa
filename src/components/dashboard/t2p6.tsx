import { useMemo } from "react";
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
          backgroundColor: "#22c55e",
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

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      <Card className="mb-6 md:mb-0 md:w-1/2 flex flex-col">
        <CardHeader>
          <CardTitle>
            Grafik Jumlah Penduduk Menurut Mata Pencaharian Pertanian
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="w-full" style={{ minHeight: 420 }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      <Card className="md:w-1/2 flex flex-col">
        <CardHeader>
          <CardTitle>
            Tabel 2.6 Jumlah Penduduk Menurut Mata Pencaharian Pertanian di Desa
            Kapuak, 2025
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="overflow-x-auto" style={{ minHeight: 420 }}>
            <table className="w-full text-sm border border-gray-200">
              <thead>
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
        </CardContent>
      </Card>
    </div>
  );
}
