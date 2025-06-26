"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC, useRef } from "react";

interface Blok1Props {
  data: {
    namaKepala: string;
    jumlahKK: string;
    jumlahAnggota: string;
    noKK: string;
    kodeKK: string;
  };
  onChange: (field: keyof Blok1Props["data"], value: string) => void;
}

const Blok1: FC<Blok1Props> = ({ data, onChange }) => {
  const noKKRefs = useRef<(HTMLInputElement | null)[]>([]);
  const jumlahKKRefs = useRef<(HTMLInputElement | null)[]>([]);
  const jumlahAnggotaRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleMultiInput = (
    index: number,
    value: string,
    length: number,
    refs: (HTMLInputElement | null)[],
    existingValue: string,
    field: keyof Blok1Props["data"]
  ) => {
    if (!/^\d?$/.test(value)) return;

    const newValueArr = existingValue.split("");
    newValueArr[index] = value;
    const newValue = newValueArr.join("").padEnd(length, "");

    onChange(field, newValue);

    if (value && index < length - 1) {
      refs[index + 1]?.focus();
    }
  };

  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">
          Blok 1 - Informasi Keluarga
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* 101 - Nama Kepala */}
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

        {/* 102 - Jumlah KK */}
        <div className="space-y-2">
          <Label className="text-gray-700">
            102. Jumlah KK Dalam Rumah (2 digit)
          </Label>
          <div className="flex space-x-2">
            {[0, 1].map((i) => (
              <Input
                key={i}
                maxLength={1}
                className="w-12 text-center border-gray-300 focus-visible:ring-gray-500"
                value={data.jumlahKK[i] || ""}
                onChange={(e) =>
                  handleMultiInput(
                    i,
                    e.target.value,
                    2,
                    jumlahKKRefs.current,
                    data.jumlahKK,
                    "jumlahKK"
                  )
                }
                ref={(el) => {
                  jumlahKKRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* 103 - Jumlah Anggota */}
        <div className="space-y-2">
          <Label className="text-gray-700">
            103. Jumlah Anggota Keluarga (2 digit)
          </Label>
          <div className="flex space-x-2">
            {[0, 1].map((i) => (
              <Input
                key={i}
                maxLength={1}
                className="w-12 text-center border-gray-300 focus-visible:ring-gray-500"
                value={data.jumlahAnggota[i] || ""}
                onChange={(e) =>
                  handleMultiInput(
                    i,
                    e.target.value,
                    2,
                    jumlahAnggotaRefs.current,
                    data.jumlahAnggota,
                    "jumlahAnggota"
                  )
                }
                ref={(el) => {
                  jumlahAnggotaRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* 104 - Nomor KK */}
        <div className="space-y-2">
          <Label className="text-gray-700">
            104. Nomor Kartu Keluarga (16 digit)
          </Label>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <Input
                key={i}
                maxLength={1}
                className="w-10 text-center border-gray-300 focus-visible:ring-gray-500"
                value={data.noKK[i] || ""}
                onChange={(e) =>
                  handleMultiInput(
                    i,
                    e.target.value,
                    16,
                    noKKRefs.current,
                    data.noKK,
                    "noKK"
                  )
                }
                ref={(el) => {
                  noKKRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* 105 - Kode KK */}
        <div className="space-y-2">
          <Label className="text-gray-700">105. Kode Kartu Keluarga</Label>
          <Input
            maxLength={1}
            className="w-12 text-center border-gray-300 focus-visible:ring-gray-500"
            value={data.kodeKK}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (["0", "1", "2"].includes(val) || val === "")
                onChange("kodeKK", val);
            }}
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
