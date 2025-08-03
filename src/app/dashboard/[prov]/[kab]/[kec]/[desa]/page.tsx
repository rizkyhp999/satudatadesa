"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Download, Sun, Moon } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";

import useSurveiData from "@/hooks/use-survei-data";
import { SummaryStats } from "@/components/dashboard/summary-stats";
import Diagram from "@/components/dashboard/diagram";
import Diagram2 from "@/components/dashboard/diagram2";
import T1p5 from "@/components/dashboard/t1p5";
import T1p6 from "@/components/dashboard/t1p6";
import T2p1 from "@/components/dashboard/t2p1";
import T2p2 from "@/components/dashboard/t2p2";
import T2p3 from "@/components/dashboard/t2p3";
import T3p1 from "@/components/dashboard/t3p1";
import T3p2 from "@/components/dashboard/t3p2";
import T3p3 from "@/components/dashboard/t3p3";

// helper function untuk class merge
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Page() {
  const params = useParams();
  const kode_provinsi = Array.isArray(params?.prov)
    ? params.prov[0]
    : params?.prov;
  const kode_kabupaten = Array.isArray(params?.kab)
    ? params.kab[0]
    : params?.kab;
  const kode_kecamatan = Array.isArray(params?.kec)
    ? params.kec[0]
    : params?.kec;
  const kode_desa = Array.isArray(params?.desa) ? params.desa[0] : params?.desa;

  // Kirim kode wilayah ke useSurveiData
  const { data, loading, error } = useSurveiData({
    kode_provinsi,
    kode_kabupaten,
    kode_kecamatan,
    kode_desa,
  });
  const [tab, setTab] = useState("t1p5");
  const [dark, setDark] = useState(false);

  // Toggle dark mode pada <html>
  function toggleDark() {
    setDark((d) => {
      const next = !d;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Memuat data survei...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-lg">Error: {error}</p>
          <p className="text-sm mt-2">
            Pastikan API server berjalan di http://localhost:3000/api/survei
          </p>
        </div>
      </div>
    );
  }

  // Data sudah terfilter dari API, tidak perlu filter manual
  const filteredData = data;

  if (!filteredData || filteredData.keluarga.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Tidak ada data tersedia untuk wilayah ini</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 relative"
        >
          {/* Tombol darkmode kanan atas */}
          <button
            onClick={toggleDark}
            className="absolute right-0 top-0 p-2 rounded-full bg-white dark:bg-gray-800 border shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
            type="button"
          >
            {dark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard Analisis Data Survei
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Visualisasi Data Demografis dan Sosial Ekonomi
          </p>
        </motion.div>

        {/* Summary Stats */}
        <SummaryStats data={filteredData} />

        {/* Diagram Pie Charts Side by Side */}
        <div className="mb-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <Diagram data={filteredData} />
          </div>
          <div className="flex-1">
            <Diagram2 data={filteredData} />
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs.Root value={tab} onValueChange={setTab} className="mt-10 w-full">
          <Tabs.List className="flex flex-wrap gap-2 border-b pb-2">
            <Tabs.Trigger
              value="t1p5"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t1p5"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              T1P5
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t1p6"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t1p6"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              T1P6
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t2p1"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t2p1"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              T2P1
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t2p2"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t2p2"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              T2P2
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t2p3"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t2p3"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              T2P3
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t3p1"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t3p1"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              T3P1
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t3p2"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t3p2"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              T3P2
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t3p3"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t3p3"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              T3P3
            </Tabs.Trigger>
            {/* Tambahkan trigger lain jika ada T1P7, T2P1, dst. */}
          </Tabs.List>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {tab.toUpperCase()}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Grafik
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Tabel
              </Button>
            </div>
          </div>

          <Tabs.Content value="t1p5" className="mt-4">
            <T1p5 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t1p6" className="mt-4">
            <T1p6 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t2p1" className="mt-4">
            <T2p1 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t2p2" className="mt-4">
            <T2p2 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t2p3" className="mt-4">
            <T2p3 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t3p1" className="mt-4">
            <T3p1 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t3p2" className="mt-4">
            <T3p2 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t3p3" className="mt-4">
            <T3p3 data={filteredData} />
          </Tabs.Content>
        </Tabs.Root>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12 py-8 border-t border-gray-200"
        >
          <p className="text-gray-500">
            Dashboard ini menampilkan {filteredData.keluarga.length} keluarga
            dan {filteredData.anggota.length} penduduk
          </p>
        </motion.div>
      </div>
    </div>
  );
}
