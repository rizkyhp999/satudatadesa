"use client";
import useSurveiData from "@/hooks/use-survei-data";
import { AgeDistribution } from "@/components/dashboard/age-distribution";
import { GenderDistribution } from "@/components/dashboard/gender-distribution";
import { HousingOwnership } from "@/components/dashboard/housing-ownership";
import { MaritalStatus } from "@/components/dashboard/matrial-status";
import { SummaryStats } from "@/components/dashboard/summary-stats";
import { GovernmentAssistance } from "@/components/dashboard/goverment-assistance";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { data, loading, error } = useSurveiData();

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

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Tidak ada data tersedia</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard Analisis Data Survei
          </h1>
          <p className="text-lg text-gray-600">
            Visualisasi Data Demografis dan Sosial Ekonomi
          </p>
        </motion.div>

        {/* Summary Statistics */}
        <SummaryStats data={data} />

        {/* Visualizations */}
        <div className="space-y-8">
          <GenderDistribution data={data} />
          <AgeDistribution data={data} />
          <MaritalStatus data={data} />
          <HousingOwnership data={data} />
          <GovernmentAssistance data={data} />
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-12 py-8 border-t border-gray-200"
        >
          <p className="text-gray-500">
            Dashboard ini menampilkan {data.keluarga.length} keluarga dan{" "}
            {data.anggota.length} penduduk
          </p>
        </motion.div>
      </div>
    </div>
  );
}
