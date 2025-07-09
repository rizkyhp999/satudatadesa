"use client";

import { useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home, Droplets, Lightbulb } from "lucide-react";
import type { Blok8 } from "@/types/survey";

interface Blok8ComponentProps {
  data: Blok8;
  onChange: (data: Blok8) => void;
}

// Opsi Dropdown
const statusKepemilikanOptions = [
  { value: "1", label: "1 - Milik sendiri" },
  { value: "2", label: "2 - Kontrak/sewa" },
  { value: "3", label: "3 - Bebas sewa" },
  { value: "4", label: "4 - Dinas" },
  { value: "5", label: "5 - Lainnya" },
];
const jenisLantaiOptions = [
  { value: "1", label: "1 - Marmer/granit" },
  { value: "2", label: "2 - Keramik" },
  { value: "3", label: "3 - Parket/vinil/karpet" },
  { value: "4", label: "4 - Ubin/tegel/teraso" },
  { value: "5", label: "5 - Kayu/papan" },
  { value: "6", label: "6 - Semen/bata merah" },
  { value: "7", label: "7 - Bambu" },
  { value: "8", label: "8 - Tanah" },
  { value: "9", label: "9 - Lainnya" },
];
const jenisDindingOptions = [
  { value: "1", label: "1 - Tembok" },
  { value: "2", label: "2 - Plesteran ayaman bambu/kawat" },
  { value: "3", label: "3 - Kayu/papan kayu/batang kayu" },
  { value: "4", label: "4 - Anyaman bambu/bambu" },
  { value: "5", label: "5 - Lainnya" },
];
const jenisAtapOptions = [
  { value: "1", label: "1 - Beton" },
  { value: "2", label: "2 - Genteng" },
  { value: "3", label: "3 - Seng" },
  { value: "4", label: "4 - Asbes" },
  { value: "5", label: "5 - Bambu" },
  { value: "6", label: "6 - Kayu/sirap" },
  { value: "7", label: "7 - Jerami/ijuk/dedaunan/rumbia" },
  { value: "8", label: "8 - Lainnya" },
];
const sumberAirOptions = [
  { value: "1", label: "01 - Air kemasan bermerk" },
  { value: "2", label: "02 - Air isi ulang" },
  { value: "3", label: "03 - Leding" },
  { value: "4", label: "04 - Sumur bor/pompa" },
  { value: "5", label: "05 - Sumur terlindung" },
  { value: "6", label: "06 - Sumur tak terlindung" },
  { value: "7", label: "07 - Mata air terlindung" },
  { value: "8", label: "08 - Mata air tak terlindung" },
  { value: "9", label: "09 - Air permukaan (sungai/danau/dll)" },
  { value: "10", label: "10 - Air hujan" },
  { value: "11", label: "11 - Lainnya" },
];
const sumberPeneranganOptions = [
  { value: "1", label: "1 - Listrik PLN dengan meteran" },
  { value: "2", label: "2 - Listrik PLN tanpa meteran" },
  { value: "3", label: "3 - Listrik Non-PLN" },
  { value: "4", label: "4 - Bukan listrik" },
];
const dayaTerpasangOptions = [
  { value: "1", label: "1 - 450 watt / 2 ampere" },
  { value: "2", label: "2 - 900 watt / 4 ampere" },
  { value: "3", label: "3 - 1300 watt / 6 ampere" },
  { value: "4", label: "4 - 2200 watt / 10 ampere" },
  { value: "5", label: "5 - > 2200 watt" },
];
const bahanBakarMasakOptions = [
  { value: "1", label: "01 - Listrik" },
  { value: "2", label: "02 - Gas elpiji 5,5 kg" },
  { value: "3", label: "03 - Gas elpiji 12 kg" },
  { value: "4", label: "04 - Gas elpiji 3 kg" },
  { value: "5", label: "05 - Gas kota" },
  { value: "6", label: "06 - Biogas" },
  { value: "7", label: "07 - Minyak tanah" },
  { value: "8", label: "08 - Briket" },
  { value: "9", label: "09 - Arang" },
  { value: "10", label: "10 - Kayu bakar" },
  { value: "11", label: "11 - Lainnya" },
  { value: "0", label: "00 - Tidak memasak" },
];
const kepemilikanBABOptions = [
  { value: "1", label: "1 - Ada, digunakan anggota keluarga" },
  { value: "2", label: "2 - Ada, digunakan bersama anggota keluarga tertentu" },
  { value: "3", label: "3 - Ada, di MCK komunal" },
  { value: "4", label: "4 - Ada, di MCK Umum/siapapun bisa menggunakan" },
  { value: "5", label: "5 - Tidak ada fasilitas" },
];
const jenisKlosetOptions = [
  { value: "1", label: "1 - Leher angsa" },
  { value: "2", label: "2 - Plengsengan dengan tutup" },
  { value: "3", label: "3 - Plengsengan tanpa tutup" },
  { value: "4", label: "4 - Cemplung/cubluk" },
];
const tempatBuangTinjaOptions = [
  { value: "1", label: "1 - Tangki septik" },
  { value: "2", label: "2 - IPAL" },
  { value: "3", label: "3 - Kolam/sawah/sungai/danau/laut" },
  { value: "4", label: "4 - Lubang tanah" },
  { value: "5", label: "5 - Pantai/tanah lapang/kebun" },
  { value: "6", label: "6 - Lainnya" },
];

export function Blok8Component({ data, onChange }: Blok8ComponentProps) {
  const handleChange = useCallback(
    (field: keyof Blok8, value: string | number) => {
      onChange({ ...data, [field]: value });
    },
    [data, onChange]
  );

  const hasMeteran = data["808a_sumberPenerangan"] === 1;
  const hasOwnToilet = [1, 2, 3].includes(data["810a_kepemilikanFasilitasBAB"]);

  useEffect(() => {
    if (!hasMeteran) {
      if (data["808b_dayaTerpasang1"] !== 0)
        handleChange("808b_dayaTerpasang1", 0);
      if (data["808b_dayaTerpasang2"] !== 0)
        handleChange("808b_dayaTerpasang2", 0);
      if (data["808b_dayaTerpasang3"] !== 0)
        handleChange("808b_dayaTerpasang3", 0);
    }
  }, [hasMeteran, data, handleChange]);

  useEffect(() => {
    if (!hasOwnToilet && data["810b_jenisKloset"] !== 0) {
      handleChange("810b_jenisKloset", 0);
    }
  }, [hasOwnToilet, data, handleChange]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Home className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-800">
            Kondisi Perumahan
          </h3>
          <p className="text-slate-600">
            Informasi tentang kondisi tempat tinggal
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Home className="w-5 h-5 text-slate-600" />
              Kepemilikan dan Struktur Bangunan
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  801. Status Kepemilikan Bangunan
                </Label>
                <Select
                  value={data["801_statusKepemilikanBangunan"]?.toString()}
                  onValueChange={(value) =>
                    handleChange(
                      "801_statusKepemilikanBangunan",
                      parseInt(value)
                    )
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusKepemilikanOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  802. Luas Lantai (m²)
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="999"
                  value={data["802_luasLantai"] || ""}
                  onChange={(e) =>
                    handleChange(
                      "802_luasLantai",
                      parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  803. Jenis Lantai Terluas
                </Label>
                <Select
                  value={data["803_jenisLantai"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("803_jenisLantai", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {jenisLantaiOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  804. Jenis Dinding Terluas
                </Label>
                <Select
                  value={data["804_jenisDinding"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("804_jenisDinding", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {jenisDindingOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  805. Jenis Atap Terluas
                </Label>
                <Select
                  value={data["805_jenisAtap"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("805_jenisAtap", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {jenisAtapOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Droplets className="w-5 h-5 text-slate-600" />
              Fasilitas Air dan Listrik
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  806. Sumber Air Minum Utama
                </Label>
                <Select
                  value={data["806_sumberAirMinum"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("806_sumberAirMinum", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih sumber" />
                  </SelectTrigger>
                  <SelectContent>
                    {sumberAirOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  807. Sumber Air Mandi/Mencuci
                </Label>
                <Select
                  value={data["807_sumberAirMandi"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("807_sumberAirMandi", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih sumber" />
                  </SelectTrigger>
                  <SelectContent>
                    {sumberAirOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  808a. Sumber Penerangan Utama
                </Label>
                <Select
                  value={data["808a_sumberPenerangan"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("808a_sumberPenerangan", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih sumber" />
                  </SelectTrigger>
                  <SelectContent>
                    {sumberPeneranganOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bagian Daya Listrik untuk 3 Meteran */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label
                  className={`text-sm font-medium ${
                    !hasMeteran ? "text-slate-400" : "text-slate-700"
                  }`}
                >
                  808b. Daya Meteran 1 (VA)
                </Label>
                <Select
                  disabled={!hasMeteran}
                  value={data["808b_dayaTerpasang1"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("808b_dayaTerpasang1", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih daya" />
                  </SelectTrigger>
                  <SelectContent>
                    {dayaTerpasangOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  className={`text-sm font-medium ${
                    !hasMeteran ? "text-slate-400" : "text-slate-700"
                  }`}
                >
                  808b. Daya Meteran 2 (VA)
                </Label>
                <Select
                  disabled={!hasMeteran}
                  value={data["808b_dayaTerpasang2"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("808b_dayaTerpasang2", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih daya" />
                  </SelectTrigger>
                  <SelectContent>
                    {dayaTerpasangOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  className={`text-sm font-medium ${
                    !hasMeteran ? "text-slate-400" : "text-slate-700"
                  }`}
                >
                  808b. Daya Meteran 3 (VA)
                </Label>
                <Select
                  disabled={!hasMeteran}
                  value={data["808b_dayaTerpasang3"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("808b_dayaTerpasang3", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih daya" />
                  </SelectTrigger>
                  <SelectContent>
                    {dayaTerpasangOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-slate-700">
                809. Bahan Bakar Memasak
              </Label>
              <Select
                value={data["809_bahanBakarMasak"]?.toString()}
                onValueChange={(value) =>
                  handleChange("809_bahanBakarMasak", parseInt(value))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih bahan bakar" />
                </SelectTrigger>
                <SelectContent>
                  {bahanBakarMasakOptions
                    .sort((a, b) => parseInt(a.value) - parseInt(b.value))
                    .map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-slate-600" />
              Fasilitas Sanitasi
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  810a. Kepemilikan Fasilitas BAB
                </Label>
                <Select
                  value={data["810a_kepemilikanFasilitasBAB"]?.toString()}
                  onValueChange={(value) =>
                    handleChange(
                      "810a_kepemilikanFasilitasBAB",
                      parseInt(value)
                    )
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {kepemilikanBABOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  className={`text-sm font-medium ${
                    !hasOwnToilet ? "text-slate-400" : "text-slate-700"
                  }`}
                >
                  810b. Jenis Kloset
                </Label>
                <Select
                  disabled={!hasOwnToilet}
                  value={data["810b_jenisKloset"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("810b_jenisKloset", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    {jenisKlosetOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  811. Tempat Buang Tinja
                </Label>
                <Select
                  value={data["811_tempatBuangTinja"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("811_tempatBuangTinja", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih tempat" />
                  </SelectTrigger>
                  <SelectContent>
                    {tempatBuangTinjaOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
