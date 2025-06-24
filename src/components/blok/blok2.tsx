"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC } from "react";

interface Blok2Props {
  data: {
    namaRT: string;
    noUrutBangunan: string;
    noUrutKeluarga: string;
    alamat: string;
    statusKependudukan: string;
  };
  onChange: (field: string, value: string) => void;
}

const Blok2: FC<Blok2Props> = ({ data, onChange }) => {
  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">
          Blok 2 - Informasi Bangunan & Kependudukan
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
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

        <div className="space-y-2">
          <Label htmlFor="noUrutBangunan" className="text-gray-700">
            202. No Urut Bangunan (2 digit)
          </Label>
          <Input
            id="noUrutBangunan"
            type="number"
            value={data.noUrutBangunan}
            placeholder="Contoh: 01"
            onChange={(e) => {
              if (e.target.value.length <= 2)
                onChange("noUrutBangunan", e.target.value);
            }}
            className="border-gray-300 focus-visible:ring-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="noUrutKeluarga" className="text-gray-700">
            203. No Urut Keluarga (2 digit)
          </Label>
          <Input
            id="noUrutKeluarga"
            type="number"
            value={data.noUrutKeluarga}
            placeholder="Contoh: 05"
            onChange={(e) => {
              if (e.target.value.length <= 2)
                onChange("noUrutKeluarga", e.target.value);
            }}
            className="border-gray-300 focus-visible:ring-gray-500"
          />
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="statusKependudukan" className="text-gray-700">
            205. Status Kependudukan (1 digit)
          </Label>
          <Input
            id="statusKependudukan"
            type="text"
            value={data.statusKependudukan}
            placeholder="1 / 2 / 3"
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (["1", "2", "3"].includes(val) || val === "")
                onChange("statusKependudukan", val);
            }}
            className="border-gray-300 focus-visible:ring-gray-500"
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
