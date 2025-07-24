"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import type { SurveiData } from "@/hooks/use-survei-data";

interface GenderDistributionProps {
  data: SurveiData;
}

const COLORS = ["#0088FE", "#FF8042"];

export function GenderDistribution({ data }: GenderDistributionProps) {
  const genderData = [
    {
      name: "Laki-laki",
      value: data.anggota.filter((a) => a["308_jenisKelamin"] === "1").length,
      color: "#0088FE",
    },
    {
      name: "Perempuan",
      value: data.anggota.filter((a) => a["308_jenisKelamin"] === "2").length,
      color: "#FF8042",
    },
  ];

  // Group by RT for detailed distribution
  const rtDistribution = data.keluarga.reduce((acc, keluarga) => {
    const rt = keluarga["201_namaRT"] || "RT Tidak Diketahui";
    const anggotaKeluarga = data.anggota.filter(
      (a) => a.nomorKK_FK === keluarga["104_nomorKK"]
    );

    if (!acc[rt]) {
      acc[rt] = { rt, lakiLaki: 0, perempuan: 0 };
    }

    anggotaKeluarga.forEach((anggota) => {
      if (anggota["308_jenisKelamin"] === "1") {
        acc[rt].lakiLaki++;
      } else if (anggota["308_jenisKelamin"] === "2") {
        acc[rt].perempuan++;
      }
    });

    return acc;
  }, {} as Record<string, { rt: string; lakiLaki: number; perempuan: number }>);

  const rtData = Object.values(rtDistribution);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Distribusi Penduduk Menurut Jenis Kelamin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Distribusi Keseluruhan
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(1)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart by RT */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Distribusi per RT</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={rtData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rt" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="lakiLaki" fill="#0088FE" name="Laki-laki" />
                  <Bar dataKey="perempuan" fill="#FF8042" name="Perempuan" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Table */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Ringkasan Data</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      RT
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Laki-laki
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Perempuan
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rtData.map((rt, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        {rt.rt}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {rt.lakiLaki}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {rt.perempuan}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                        {rt.lakiLaki + rt.perempuan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
