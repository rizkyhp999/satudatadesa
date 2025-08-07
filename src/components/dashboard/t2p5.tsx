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

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      <Card className="mb-6 md:mb-0 md:w-1/2 flex flex-col">
        <CardHeader>
          <CardTitle>
            Grafik Jumlah Penduduk Berusaha per Lapangan Usaha
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
            Tabel 2.5 Jumlah Penduduk yang Berusaha Menurut Lapangan Usaha dan
            Jenis Kelamin di Desa Kapuak, 2025
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="overflow-x-auto" style={{ minHeight: 420 }}>
            <table className="w-full text-sm border border-gray-200">
              <thead>
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
        </CardContent>
      </Card>
    </div>
  );
}
