"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import type { SurveiData } from "@/hooks/use-survei-data";

interface AgeDistributionProps {
  data: SurveiData;
}

export function AgeDistribution({ data }: AgeDistributionProps) {
  // Create age groups
  const ageGroups = [
    { label: "0-4", min: 0, max: 4 },
    { label: "5-9", min: 5, max: 9 },
    { label: "10-14", min: 10, max: 14 },
    { label: "15-19", min: 15, max: 19 },
    { label: "20-24", min: 20, max: 24 },
    { label: "25-29", min: 25, max: 29 },
    { label: "30-34", min: 30, max: 34 },
    { label: "35-39", min: 35, max: 39 },
    { label: "40-44", min: 40, max: 44 },
    { label: "45-49", min: 45, max: 49 },
    { label: "50-54", min: 50, max: 54 },
    { label: "55-59", min: 55, max: 59 },
    { label: "60-64", min: 60, max: 64 },
    { label: "65+", min: 65, max: 999 },
  ];

  const ageDistributionData = ageGroups.map((group) => {
    const lakiLaki = data.anggota.filter((a) => {
      const umur = parseInt(a["310_umur"]) || 0;
      return (
        a["308_jenisKelamin"] === "1" && umur >= group.min && umur <= group.max
      );
    }).length;

    const perempuan = data.anggota.filter((a) => {
      const umur = parseInt(a["310_umur"]) || 0;
      return (
        a["308_jenisKelamin"] === "2" && umur >= group.min && umur <= group.max
      );
    }).length;

    return {
      ageGroup: group.label,
      lakiLaki,
      perempuan,
      total: lakiLaki + perempuan,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Distribusi Penduduk Menurut Kelompok Umur dan Jenis Kelamin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={ageDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="lakiLaki" fill="#0088FE" name="Laki-laki" />
                <Bar dataKey="perempuan" fill="#FF8042" name="Perempuan" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Kelompok Umur
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
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Persentase
                  </th>
                </tr>
              </thead>
              <tbody>
                {ageDistributionData.map((row, index) => {
                  const percentage = (
                    (row.total / data.anggota.length) *
                    100
                  ).toFixed(1);
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-medium">
                        {row.ageGroup}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {row.lakiLaki}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {row.perempuan}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                        {row.total}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
