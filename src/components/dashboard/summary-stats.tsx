"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Home, UserCheck, Briefcase } from "lucide-react";
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
      color: "text-blue-600",
    },
    {
      title: "Laki-laki",
      value: pendudukLakiLaki,
      icon: UserCheck,
      color: "text-blue-600",
    },
    {
      title: "Perempuan",
      value: pendudukPerempuan,
      icon: UserCheck,
      color: "text-blue-600",
    },
    {
      title: "Penduduk Bekerja",
      value: pendudukBekerja,
      icon: Briefcase,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="w-full">
      <Card className="border border-gray-200 bg-white rounded-xl px-4 py-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-gray-900">
            Ringkasan Data Survei
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="flex flex-col items-center bg-white rounded-lg p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 mb-2">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {stat.title}
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {stat.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
