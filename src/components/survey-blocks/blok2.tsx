"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Building, Hash } from "lucide-react";
import type { Blok2 } from "@/types/survey";

interface Blok2ComponentProps {
  data: Blok2;
  onChange: (data: Blok2) => void;
}

const statusKependudukanOptions = [
  { value: 1, label: "KTP Desa" },
  { value: 2, label: "KTP Luar Desa" },
  { value: 3, label: "KTP Luar Kabupaten Tana Tidung" },
];

export function Blok2Component({ data, onChange }: Blok2ComponentProps) {
  const handleChange = (field: keyof Blok2, value: string | number) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <MapPin className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-800">
            Lokasi dan Alamat
          </h3>
          <p className="text-slate-600">
            Informasi lokasi tempat tinggal keluarga
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* KARTU RT & BANGUNAN */}
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="w-5 h-5 text-slate-600" />
              Identitas RT dan Bangunan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label
                htmlFor="namaRT"
                className="text-sm font-medium text-slate-700"
              >
                201. Nama RT
              </Label>
              <Input
                id="namaRT"
                value={data["201_namaRT"]}
                onChange={(e) => handleChange("201_namaRT", e.target.value)}
                placeholder="Masukkan nama RT"
                className="mt-1"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="nomorUrutBangunan"
                  className="text-sm font-medium text-slate-700"
                >
                  202. Nomor Urut Bangunan
                </Label>
                <Input
                  id="nomorUrutBangunan"
                  type="number"
                  min={1}
                  max={99}
                  value={data["202_nomorUrutBangunan"] || ""}
                  onChange={(e) => {
                    const val = e.target.value.slice(0, 2);
                    handleChange("202_nomorUrutBangunan", parseInt(val) || 0);
                  }}
                  placeholder="01"
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="nomorUrutKeluarga"
                  className="text-sm font-medium text-slate-700"
                >
                  203. Nomor Urut Keluarga
                </Label>
                <Input
                  id="nomorUrutKeluarga"
                  type="number"
                  min={1}
                  max={99}
                  value={data["203_nomorUrutKeluarga"] || ""}
                  onChange={(e) => {
                    const val = e.target.value.slice(0, 2);
                    handleChange("203_nomorUrutKeluarga", parseInt(val) || 0);
                  }}
                  placeholder="01"
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KARTU ALAMAT & STATUS */}
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Hash className="w-5 h-5 text-slate-600" />
              Alamat dan Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label
                htmlFor="alamatLengkap"
                className="text-sm font-medium text-slate-700"
              >
                204. Alamat Lengkap
              </Label>
              <Textarea
                id="alamatLengkap"
                value={data["204_alamatLengkap"]}
                onChange={(e) =>
                  handleChange("204_alamatLengkap", e.target.value)
                }
                placeholder="Masukkan alamat lengkap (jalan, nomor rumah, RT/RW, kelurahan, kecamatan)"
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div>
              <Label
                htmlFor="statusKependudukan"
                className="text-sm font-medium text-slate-700"
              >
                205. Status Kependudukan
              </Label>
              <Select
                value={data["205_statusKependudukan"]?.toString()}
                onValueChange={(value) =>
                  handleChange("205_statusKependudukan", parseInt(value))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih status kependudukan" />
                </SelectTrigger>
                <SelectContent>
                  {statusKependudukanOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500 mt-1">
                Kode 205 : Kode Status Kependudukan
                <br />
                1. KTP Desa
                <br />
                2. KTP Luar Desa
                <br />
                3. KTP Luar Kabupaten Tana Tidung
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
