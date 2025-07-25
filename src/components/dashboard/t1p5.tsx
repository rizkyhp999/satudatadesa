"use client";

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
import useSurveiData from "@/hooks/use-survei-data";

export default function T1P5() {
  const { data, loading, error } = useSurveiData();

  if (loading) {
    return <div className="p-4">Memuat data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Terjadi kesalahan: {error}</div>;
  }

  if (!data) {
    return <div className="p-4 text-gray-500">Data tidak tersedia.</div>;
  }

  // Hitung jumlah keluarga per SLS
  const keluargaPerSLS: Record<string, number> = {};

  data.keluarga.forEach((item) => {
    const sls = item["201_namaRT"] || "Tidak diketahui";
    keluargaPerSLS[sls] = (keluargaPerSLS[sls] || 0) + 1;
  });

  const tableData = Object.entries(keluargaPerSLS).map(([sls, jumlah]) => ({
    sls,
    jumlah,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Jumlah Keluarga per SLS</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Grafik */}
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={tableData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sls" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jumlah" fill="#8884d8" name="Jumlah Keluarga" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tabel */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    SLS
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Jumlah Keluarga
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {row.sls}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
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
