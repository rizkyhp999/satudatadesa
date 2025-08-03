"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { SurveiData } from "@/hooks/use-survei-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

ChartJS.register(ArcElement, Tooltip, Legend);

const programMap: Record<string, string> = {
  A: "Pelatihan/penyuluhan terkait proses penanaman/pembenihan",
  B: "Program Satu Anggota Keluarga Satu Petani",
  C: "Subsidi keperluan pertanian (pestisida, pupuk, dll)",
  D: "Tersedia penam",
  E: "Lainnya",
};

const colors = [
  "#2563eb", // blue
  "#16a34a", // green
  "#f59e42", // orange
  "#e11d48", // pink
  "#a21caf", // purple
];

interface Diagram2Props {
  data: SurveiData;
}

export default function Diagram2({ data }: Diagram2Props) {
  // Akumulasi kode program
  const programCounts: Record<string, number> = {};
  // Kumpulkan alasan lainnya
  const alasanLainnya: { alasan: string; keluargaIdx: number }[] = [];

  data.keluarga.forEach((kel, idx) => {
    [
      ["909a_programDukungSawit", "909a_lainnya"],
      ["909b_programDukungIkanLele", "909b_lainnya"],
      ["909c_programDukungSayurBuah", "909c_lainnya"],
    ].forEach(([kodeKey, lainKey]) => {
      const kode = (kel as any)[kodeKey]?.trim();
      if (kode && programMap[kode]) {
        programCounts[kode] = (programCounts[kode] || 0) + 1;
      }
      const alasan = (kel as any)[lainKey]?.trim();
      if (alasan) {
        alasanLainnya.push({ alasan, keluargaIdx: idx + 1 });
      }
    });
  });

  const labels = Object.keys(programMap);
  const dataChart = {
    labels: labels.map((k) => programMap[k]),
    datasets: [
      {
        data: labels.map((k) => programCounts[k] || 0),
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  // Search & Pagination untuk alasan lainnya
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const alasanFiltered = useMemo(
    () =>
      alasanLainnya.filter((a) =>
        a.alasan.toLowerCase().includes(search.toLowerCase())
      ),
    [alasanLainnya, search]
  );
  const perPage = 5;
  const totalPage = Math.ceil(alasanFiltered.length / perPage);
  const alasanPage = alasanFiltered.slice((page - 1) * perPage, page * perPage);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPage(1);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Program apa yang perlu dilaksanakan untuk mendukung pertanian di Desa?
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Baris pertama: Pie chart + legend */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-6">
          <div className="flex flex-row gap-6 items-center">
            <div className="w-56 h-56">
              <Pie
                data={dataChart}
                options={{ plugins: { legend: { display: false } } }}
              />
            </div>
            <ul className="space-y-2">
              {labels.map((k, i) => (
                <li key={k} className="flex items-center gap-2">
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ background: colors[i] }}
                  />
                  <span>{programMap[k]}</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({programCounts[k] || 0})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Baris kedua: Tabel alasan lainnya */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-semibold">Alasan Lainnya</span>
            <Input
              placeholder="Cari alasan..."
              value={search}
              onChange={handleSearch}
              className="w-48"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-2 py-1 border">No</th>
                  <th className="px-2 py-1 border">Alasan</th>
                </tr>
              </thead>
              <tbody>
                {alasanPage.length === 0 ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="text-center py-2 text-muted-foreground"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  alasanPage.map((a, i) => (
                    <tr key={i}>
                      <td className="px-2 py-1 border text-center">
                        {(page - 1) * perPage + i + 1}
                      </td>
                      <td className="px-2 py-1 border">{a.alasan}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">
              Menampilkan {alasanPage.length} dari {alasanFiltered.length}{" "}
              alasan
            </span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </Button>
              <span className="px-2 text-xs">
                {page} / {totalPage || 1}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
                disabled={page === totalPage || totalPage === 0}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
