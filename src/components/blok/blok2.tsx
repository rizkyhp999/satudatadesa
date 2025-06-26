"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC, useRef } from "react";

interface Blok2Props {
  data: {
    namaRT: string;
    noUrutBangunan: string;
    noUrutKeluarga: string;
    alamat: string;
    statusKependudukan: string;
  };
  onChange: (field: keyof Blok2Props["data"], value: string) => void;
}

const Blok2: FC<Blok2Props> = ({ data, onChange }) => {
  const noUrutBangunanRefs = useRef<(HTMLInputElement | null)[]>([]);
  const noUrutKeluargaRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleMultiInput = (
    index: number,
    value: string,
    length: number,
    refs: (HTMLInputElement | null)[],
    existingValue: string,
    field: keyof Blok2Props["data"]
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
          Blok 2 - Informasi Bangunan & Kependudukan
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* 201 Nama RT */}
        <div className="space-y-2">
          <Label htmlFor="namaRT" className="text-gray-700">
            201. Nama RT
          </Label>
          <Input
            id="namaRT"
            value={data.namaRT}
            placeholder="Masukkan nama RT"
            onChange={(e) => onChange("namaRT", e.target.value)}
            className="border-gray-300 focus-visible:ring-gray-500"
          />
        </div>

        {/* 202 No Urut Bangunan */}
        <div className="space-y-2">
          <Label className="text-gray-700">
            202. No Urut Bangunan (2 digit)
          </Label>
          <div className="flex space-x-2">
            {[0, 1].map((i) => (
              <Input
                key={i}
                maxLength={1}
                className="w-12 text-center border-gray-300 focus-visible:ring-gray-500"
                value={data.noUrutBangunan[i] || ""}
                onChange={(e) =>
                  handleMultiInput(
                    i,
                    e.target.value,
                    2,
                    noUrutBangunanRefs.current,
                    data.noUrutBangunan,
                    "noUrutBangunan"
                  )
                }
                ref={(el) => {
                  noUrutBangunanRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* 203 No Urut Keluarga */}
        <div className="space-y-2">
          <Label className="text-gray-700">
            203. No Urut Keluarga (2 digit)
          </Label>
          <div className="flex space-x-2">
            {[0, 1].map((i) => (
              <Input
                key={i}
                maxLength={1}
                className="w-12 text-center border-gray-300 focus-visible:ring-gray-500"
                value={data.noUrutKeluarga[i] || ""}
                onChange={(e) =>
                  handleMultiInput(
                    i,
                    e.target.value,
                    2,
                    noUrutKeluargaRefs.current,
                    data.noUrutKeluarga,
                    "noUrutKeluarga"
                  )
                }
                ref={(el) => {
                  noUrutKeluargaRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* 204 Alamat */}
        <div className="space-y-2">
          <Label htmlFor="alamat" className="text-gray-700">
            204. Alamat Lengkap
          </Label>
          <Input
            id="alamat"
            value={data.alamat}
            placeholder="Masukkan alamat lengkap"
            onChange={(e) => onChange("alamat", e.target.value)}
            className="border-gray-300 focus-visible:ring-gray-500"
          />
        </div>

        {/* 205 Status Kependudukan */}
        <div className="space-y-2">
          <Label className="text-gray-700">
            205. Status Kependudukan (1 digit)
          </Label>
          <Input
            maxLength={1}
            className="w-12 text-center border-gray-300 focus-visible:ring-gray-500"
            value={data.statusKependudukan}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (["1", "2", "3"].includes(val) || val === "")
                onChange("statusKependudukan", val);
            }}
          />
          <p className="text-sm text-gray-500 mt-1">
            Keterangan Kode:
            <br /> 1 - KTP Desa Kapuak
            <br /> 2 - KTP Luar Desa Kapuak
            <br /> 3 - KTP Luar Kabupaten Tana Tidung
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Blok2;
