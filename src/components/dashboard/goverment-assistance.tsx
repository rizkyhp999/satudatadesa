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

interface GovernmentAssistanceProps {
  data: SurveiData;
}

export function GovernmentAssistance({ data }: GovernmentAssistanceProps) {
  const assistancePrograms = [
    { key: "904a_BPNT", name: "BPNT" },
    { key: "904b_PKH", name: "PKH" },
    { key: "904c_BLTDesa", name: "BLT Desa" },
    { key: "904d_SubsidiListrik", name: "Subsidi Listrik" },
    { key: "904e_BantuanPemda", name: "Bantuan Pemda" },
    { key: "904f_SubsidiPupuk", name: "Subsidi Pupuk" },
    { key: "904g_BantuanDesa", name: "Bantuan Desa" },
    { key: "904h_BantuanLainnya", name: "Bantuan Lainnya" },
  ];

  const assistanceData = assistancePrograms
    .map((program) => {
      const recipients = data.keluarga.filter(
        (k) => k[program.key as keyof typeof k] === "1"
      ).length;
      const percentage = ((recipients / data.keluarga.length) * 100).toFixed(1);

      return {
        program: program.name,
        recipients,
        percentage: parseFloat(percentage),
      };
    })
    .filter((item) => item.recipients > 0);

  // Sort by number of recipients
  assistanceData.sort((a, b) => b.recipients - a.recipients);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Jumlah Keluarga Penerima Bantuan Pemerintah (2024)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={assistanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="program" type="category" width={120} />
                <Tooltip
                  formatter={(value, name) => [
                    name === "recipients" ? `${value} keluarga` : `${value}%`,
                    name === "recipients" ? "Penerima" : "Persentase",
                  ]}
                />
                <Legend />
                <Bar
                  dataKey="recipients"
                  fill="#0088FE"
                  name="Jumlah Penerima"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Program Bantuan
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Jumlah Penerima
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Persentase
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {assistanceData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      {row.program}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {row.recipients}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {row.percentage}%
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          row.percentage > 50
                            ? "bg-green-100 text-green-800"
                            : row.percentage > 25
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {row.percentage > 50
                          ? "Tinggi"
                          : row.percentage > 25
                          ? "Sedang"
                          : "Rendah"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Statistics */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">
                Total Program Aktif
              </h4>
              <p className="text-2xl font-bold text-blue-600">
                {assistanceData.length}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800">
                Keluarga Terbantu
              </h4>
              <p className="text-2xl font-bold text-green-600">
                {assistanceData.reduce((sum, item) => sum + item.recipients, 0)}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800">
                Cakupan Rata-rata
              </h4>
              <p className="text-2xl font-bold text-purple-600">
                {(
                  assistanceData.reduce(
                    (sum, item) => sum + item.percentage,
                    0
                  ) / assistanceData.length
                ).toFixed(1)}
                %
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
