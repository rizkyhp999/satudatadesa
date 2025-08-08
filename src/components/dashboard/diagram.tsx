"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { SurveiData } from "@/hooks/use-survei-data";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend);

const alasanMap: Record<string, string> = {
  A: "Kurangnya pemahaman",
  B: "Kurangnya SDM",
  C: "Kurangnya sarana",
  D: "Kurangnya anggaran",
  E: "Dimakan hama",
  F: "Lahan yang kurang memadai",
  G: "Cuaca yang tidak mendukung",
};

const colors = [
  "#2563eb", // blue
  "#64748b", // slate
  "#16a34a", // green
  "#e11d48", // pink
  "#f59e42", // orange
  "#a21caf", // purple
  "#facc15", // yellow
];

interface DiagramProps {
  data: SurveiData;
}

function Diagram({ data }: DiagramProps) {
  // Akumulasi alasan dari 908a, 908b, 908c
  const alasanCounts: Record<string, number> = {};
  data.keluarga.forEach((kel) => {
    [
      "908a_alasanTidakLanjutSawit",
      "908b_alasanTidakLanjutIkanLele",
      "908c_alasanTidakLanjutSayurBuah",
    ].forEach((key) => {
      const val = (kel as any)[key]?.trim();
      if (val && alasanMap[val]) {
        alasanCounts[val] = (alasanCounts[val] || 0) + 1;
      }
    });
  });

  const labels = Object.keys(alasanMap);
  const dataChart = {
    labels: labels.map((k) => alasanMap[k]),
    datasets: [
      {
        data: labels.map((k) => alasanCounts[k] || 0),
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="border border-gray-200 bg-white rounded-xl px-4 py-4 h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-gray-900">
            Alasan Tidak Lanjut Program
          </CardTitle>
          <div className="text-sm text-gray-500 font-medium">
            Akumulasi seluruh keluarga
          </div>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-8 pt-2">
          <div className="w-48 h-48 flex items-center justify-center">
            <Pie
              data={dataChart}
              options={{
                plugins: { legend: { display: false } },
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
          <div className="w-full">
            <ul className="space-y-3">
              {labels.map((k, i) => (
                <li
                  key={k}
                  className="flex items-center gap-3 text-gray-700 font-medium"
                >
                  <span
                    className="inline-block w-4 h-4 rounded-full border border-gray-200"
                    style={{ background: colors[i] }}
                  />
                  <span>{alasanMap[k]}</span>
                  <span className="ml-2 text-xs text-gray-400">
                    ({alasanCounts[k] || 0})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Diagram;
