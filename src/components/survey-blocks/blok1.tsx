"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Users, Home, CreditCard } from "lucide-react";
import type { Blok1 } from "@/types/survey";

interface Blok1ComponentProps {
  data: Blok1;
  onChange: (data: Blok1) => void;
}

export function Blok1Component({ data, onChange }: Blok1ComponentProps) {
  const handleChange = (field: keyof Blok1, value: string | number) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-800">
            Identitas Keluarga
          </h3>
          <p className="text-slate-600">Informasi dasar tentang keluarga</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Home className="w-5 h-5 text-slate-600" />
              Informasi Kepala Keluarga
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label
                htmlFor="namaKepalaKeluarga"
                className="text-sm font-medium text-slate-700"
              >
                101. Nama Kepala Keluarga
              </Label>
              <Input
                id="namaKepalaKeluarga"
                value={data["101_namaKepalaKeluarga"]}
                onChange={(e) =>
                  handleChange("101_namaKepalaKeluarga", e.target.value)
                }
                placeholder="Masukkan nama kepala keluarga"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-600" />
              Komposisi Keluarga
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="jumlahKK"
                className="text-sm font-medium text-slate-700"
              >
                102. Jumlah KK dalam Rumah
              </Label>
              <Input
                id="jumlahKK"
                type="number"
                min="1"
                max="99"
                value={data["102_jumlahKK"] || ""}
                onChange={(e) =>
                  handleChange("102_jumlahKK", parseInt(e.target.value) || 0)
                }
                placeholder="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="jumlahAnggotaKeluarga"
                className="text-sm font-medium text-slate-700"
              >
                103. Jumlah Anggota Keluarga
              </Label>
              <Input
                id="jumlahAnggotaKeluarga"
                type="number"
                min="1"
                max="99"
                value={data["103_jumlahAnggotaKeluarga"] || ""}
                onChange={(e) =>
                  handleChange(
                    "103_jumlahAnggotaKeluarga",
                    parseInt(e.target.value) || 0
                  )
                }
                placeholder="0"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-slate-600" />
              Identitas Kartu Keluarga
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="nomorKK"
                className="text-sm font-medium text-slate-700"
              >
                104. Nomor Kartu Keluarga (16 digit)
              </Label>
              <Input
                id="nomorKK"
                type="number"
                value={data["104_nomorKK"] || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 16) {
                    handleChange("104_nomorKK", parseInt(value) || 0);
                  }
                }}
                placeholder="1234567890123456"
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="kodeKK"
                className="text-sm font-medium text-slate-700"
              >
                105. Kode Kartu Keluarga (1 digit)
              </Label>
              <Input
                id="kodeKK"
                type="number"
                min="0"
                max="9"
                value={data["105_kodeKK"] || ""}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 0 && value <= 9) {
                    handleChange("105_kodeKK", value || 0);
                  }
                }}
                placeholder="0"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
