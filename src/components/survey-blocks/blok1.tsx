"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Home, CreditCard } from "lucide-react";
import type { Blok1 } from "@/types/survey";

interface Blok1ComponentProps {
  data: Blok1;
  onChange: (data: Blok1) => void;
}

function formatNomorKK(raw: string | number | undefined): string {
  return String(raw || "")
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1-")
    .replace(/-$/, "");
}

function unformatNomorKK(formatted: string) {
  return formatted.replace(/-/g, "");
}

export function Blok1Component({ data, onChange }: Blok1ComponentProps) {
  const handleChange = (field: keyof Blok1, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const isInvalid = {
    namaKepalaKeluarga: data["101_namaKepalaKeluarga"].trim() === "",
    jumlahKK: String(data["102_jumlahKK"]).trim() === "",
    jumlahAnggotaKeluarga:
      String(data["103_jumlahAnggotaKeluarga"]).trim() === "",
    nomorKK: unformatNomorKK(data["104_nomorKK"] || "").length !== 16,
    kodeKK:
      String(data["105_kodeKK"]).trim() === "" ||
      !/^[0-2]$/.test(String(data["105_kodeKK"])),
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
        {/* 101 */}
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
                className={`mt-1 ${
                  isInvalid.namaKepalaKeluarga
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </div>
          </CardContent>
        </Card>

        {/* 102, 103 */}
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
                value={data["102_jumlahKK"]}
                onChange={(e) =>
                  handleChange("102_jumlahKK", e.target.value.slice(0, 2))
                }
                placeholder="0"
                className={`mt-1 ${
                  isInvalid.jumlahKK
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
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
                value={data["103_jumlahAnggotaKeluarga"]}
                onChange={(e) =>
                  handleChange(
                    "103_jumlahAnggotaKeluarga",
                    e.target.value.slice(0, 2)
                  )
                }
                placeholder="0"
                className={`mt-1 ${
                  isInvalid.jumlahAnggotaKeluarga
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </div>
          </CardContent>
        </Card>

        {/* 104, 105 */}
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-slate-600" />
              Identitas Kartu Keluarga
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label
                htmlFor="nomorKK"
                className="text-sm font-medium text-slate-700"
              >
                104. Nomor Kartu Keluarga (16 digit)
              </Label>
              <Input
                id="nomorKK"
                inputMode="numeric"
                value={formatNomorKK(data["104_nomorKK"])}
                onChange={(e) =>
                  handleChange("104_nomorKK", unformatNomorKK(e.target.value))
                }
                placeholder="1234-5678-9012-3456"
                className={`mt-1 ${
                  isInvalid.nomorKK
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
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
                min={0}
                max={9}
                value={data["105_kodeKK"]}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^[0-9]$/.test(val)) {
                    handleChange("105_kodeKK", val);
                  }
                }}
                placeholder="0"
                className={`mt-1 ${
                  isInvalid.kodeKK
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              <p className="text-xs text-slate-500 mt-1">
                Kode 105 : Kode Kartu Keluarga
                <br />0 - Kode Sesuai, 1 - Keluarga Induk, 2 - Keluarga Pecahan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
