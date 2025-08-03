"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { SurveiData } from "@/hooks/use-survei-data";

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
  "#16a34a", // green
  "#f59e42", // orange
  "#e11d48", // pink
  "#a21caf", // purple
  "#facc15", // yellow
  "#64748b", // slate
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
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Alasan Tidak Lanjut Program (Akumulasi)</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-56 h-56">
          <Pie
            data={dataChart}
            options={{ plugins: { legend: { display: false } } }}
          />
        </div>
        <div>
          <ul className="space-y-2">
            {labels.map((k, i) => (
              <li key={k} className="flex items-center gap-2">
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{ background: colors[i] }}
                />
                <span>{alasanMap[k]}</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  ({alasanCounts[k] || 0})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default Diagram;
