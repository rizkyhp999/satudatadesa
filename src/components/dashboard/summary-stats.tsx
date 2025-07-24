"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Home, UserCheck, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import type { SurveiData } from "@/hooks/use-survei-data";

interface SummaryStatsProps {
  data: SurveiData;
}

export function SummaryStats({ data }: SummaryStatsProps) {
  const totalKeluarga = data.keluarga.length;
  const totalPenduduk = data.anggota.length;
  const pendudukLakiLaki = data.anggota.filter(
    (a) => a["308_jenisKelamin"] === "1"
  ).length;
  const pendudukPerempuan = data.anggota.filter(
    (a) => a["308_jenisKelamin"] === "2"
  ).length;
  const pendudukBekerja = data.anggota.filter(
    (a) => a["501_bekerjaMingguLalu"] === "1"
  ).length;

  const stats = [
    {
      title: "Total Keluarga",
      value: totalKeluarga,
      icon: Home,
      color: "text-blue-600",
    },
    {
      title: "Total Penduduk",
      value: totalPenduduk,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Laki-laki",
      value: pendudukLakiLaki,
      icon: UserCheck,
      color: "text-purple-600",
    },
    {
      title: "Perempuan",
      value: pendudukPerempuan,
      icon: UserCheck,
      color: "text-pink-600",
    },
    {
      title: "Penduduk Bekerja",
      value: pendudukBekerja,
      icon: Briefcase,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
