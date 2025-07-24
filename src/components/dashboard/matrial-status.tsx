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

interface MaritalStatusProps {
  data: SurveiData;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function MaritalStatus({ data }: MaritalStatusProps) {
  const statusPerkawinanMap: Record<string, string> = {
    "1": "Belum Kawin",
    "2": "Kawin",
    "3": "Cerai Hidup",
    "4": "Cerai Mati",
  };

  // Calculate marital status distribution by gender
  const maritalData = Object.entries(statusPerkawinanMap)
    .map(([code, status]) => {
      const lakiLaki = data.anggota.filter(
        (a) =>
          a["311_statusPerkawinan"] === code && a["308_jenisKelamin"] === "1"
      ).length;

      const perempuan = data.anggota.filter(
        (a) =>
          a["311_statusPerkawinan"] === code && a["308_jenisKelamin"] === "2"
      ).length;

      return {
        status,
        lakiLaki,
        perempuan,
        total: lakiLaki + perempuan,
      };
    })
    .filter((item) => item.total > 0);

  // Data for pie chart (total distribution)
  const pieData = maritalData.map((item, index) => ({
    name: item.status,
    value: item.total,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Distribusi Penduduk Menurut Status Perkawinan dan Jenis Kelamin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Distribusi Status Perkawinan
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
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
                    {pieData.map((entry, index) => (
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

            {/* Bar Chart by Gender */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Distribusi per Jenis Kelamin
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={maritalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="status"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
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
                      Status Perkawinan
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
                  {maritalData.map((row, index) => {
                    const percentage = (
                      (row.total / data.anggota.length) *
                      100
                    ).toFixed(1);
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-medium">
                          {row.status}
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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
