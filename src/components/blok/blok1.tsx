"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC } from "react";

interface Blok1Props {
  data: {
    namaKepala: string;
    jumlahKK: string;
    jumlahAnggota: string;
    noKK: string;
    kodeKK: string;
  };
  onChange: (field: string, value: string) => void;
}

const Blok1: FC<Blok1Props> = ({ data, onChange }) => {
  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">
          Blok 1 - Informasi Keluarga
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="namaKepala" className="text-gray-700">
            101. Nama Kepala Keluarga
          </Label>
          <Input
            id="namaKepala"
            value={data.namaKepala}
            placeholder="Masukkan nama"
            onChange={(e) => onChange("namaKepala", e.target.value)}
            className="border-gray-300 focus-visible:ring-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jumlahKK" className="text-gray-700">
            102. Jumlah KK Dalam Rumah (2 digit)
          </Label>
          <Input
            id="jumlahKK"
            type="number"
            value={data.jumlahKK}
            placeholder="Contoh: 03"
            onChange={(e) => {
              if (e.target.value.length <= 2)
                onChange("jumlahKK", e.target.value);
            }}
            className="border-gray-300 focus-visible:ring-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jumlahAnggota" className="text-gray-700">
            103. Jumlah Anggota Keluarga (2 digit)
          </Label>
          <Input
            id="jumlahAnggota"
            type="number"
            value={data.jumlahAnggota}
            placeholder="Contoh: 05"
            onChange={(e) => {
              if (e.target.value.length <= 2)
                onChange("jumlahAnggota", e.target.value);
            }}
            className="border-gray-300 focus-visible:ring-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="noKK" className="text-gray-700">
            104. Nomor Kartu Keluarga (16 digit)
          </Label>
          <Input
            id="noKK"
            type="text"
            value={data.noKK}
            placeholder="Masukkan 16 digit Nomor KK"
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (val.length <= 16) onChange("noKK", val);
            }}
            className="border-gray-300 focus-visible:ring-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="kodeKK" className="text-gray-700">
            105. Kode Kartu Keluarga
          </Label>
          <Input
            id="kodeKK"
            type="text"
            value={data.kodeKK}
            placeholder="0 / 1 / 2"
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (["0", "1", "2"].includes(val) || val === "")
                onChange("kodeKK", val);
            }}
            className="border-gray-300 focus-visible:ring-gray-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Keterangan Kode:
            <br /> 0 - Kode Sesuai
            <br /> 1 - Keluarga Induk
            <br /> 2 - Keluarga Pecahan
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Blok1;
