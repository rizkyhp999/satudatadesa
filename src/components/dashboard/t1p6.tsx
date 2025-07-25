"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import useSurveiData from "@/hooks/use-survei-data";

export default function T1P6() {
  const { data, loading, error } = useSurveiData();

  if (loading) return <div className="p-4">Memuat data...</div>;
  if (error)
    return <div className="p-4 text-red-500">Terjadi kesalahan: {error}</div>;
  if (!data)
    return <div className="p-4 text-gray-500">Data tidak tersedia.</div>;

  const kategori: Record<string, number> = {
    "KTP Desa": 0,
    "KTP Luar Desa": 0,
    "KTP Luar Kabupaten Tana Tidung": 0,
  };

  data.keluarga.forEach((item) => {
    const status = item["205_statusKependudukan"];
    switch (status) {
      case "1":
        kategori["KTP Desa"]++;
        break;
      case "2":
        kategori["KTP Luar Desa"]++;
        break;
      case "3":
        kategori["KTP Luar Kabupaten Tana Tidung"]++;
        break;
      default:
        break;
    }
  });

  const total = Object.values(kategori).reduce((sum, val) => sum + val, 0);

  const tableData = [
    ...Object.entries(kategori).map(([status, jumlah]) => ({ status, jumlah })),
    { status: "Jumlah", jumlah: total },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Jumlah Keluarga Menurut Status Kependudukan, 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Grafik */}
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={tableData.slice(0, 3)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="jumlah" fill="#82ca9d" name="Jumlah Keluarga" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tabel */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Status Kependudukan
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Jumlah Keluarga
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      {row.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.jumlah}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
