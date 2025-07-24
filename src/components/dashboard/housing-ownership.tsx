"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import type { SurveiData } from "@/hooks/use-survei-data";

interface HousingOwnershipProps {
  data: SurveiData;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function HousingOwnership({ data }: HousingOwnershipProps) {
  const statusKepemilikanMap: Record<string, string> = {
    "1": "Milik Sendiri",
    "2": "Kontrak/Sewa",
    "3": "Bebas Sewa",
    "4": "Dinas",
    "5": "Lainnya",
  };

  const ownershipData = Object.entries(statusKepemilikanMap)
    .map(([code, status]) => {
      const count = data.keluarga.filter(
        (k) => k["801_statusKepemilikanBangunan"] === code
      ).length;
      return {
        status,
        count,
        percentage: ((count / data.keluarga.length) * 100).toFixed(1),
      };
    })
    .filter((item) => item.count > 0);

  const pieData = ownershipData.map((item, index) => ({
    name: item.status,
    value: item.count,
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
            Persentase Keluarga Menurut Status Kepemilikan Bangunan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div>
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
                    outerRadius={100}
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

            {/* Summary Cards */}
            <div className="space-y-4">
              {ownershipData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{item.status}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{item.count}</div>
                    <div className="text-sm text-gray-500">
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              ))}
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
                      Status Kepemilikan
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Jumlah Keluarga
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Persentase
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ownershipData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-medium">
                        {row.status}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {row.count}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                        {row.percentage}%
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td className="border border-gray-300 px-4 py-2">Total</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {data.keluarga.length}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      100.0%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
