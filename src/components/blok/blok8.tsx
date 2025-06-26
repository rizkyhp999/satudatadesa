"use client";
import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface Blok8Data {
  kepemilikanRumah: string;
  luasLantai: string;
  jenisLantai: string;
  jenisDinding: string;
  jenisAtap: string;
  sumberAirMinum: string;
  sumberAirMandi: string;
  sumberPenerangan: string;
  dayaTerpasang: string;
  bahanBakarMasak: string;
  fasilitasBAB: string;
  jenisKloset: string;
  pembuanganTinja: string;
}

interface Blok8Props {
  data: Blok8Data;
  onChange: (field: keyof Blok8Data, value: string) => void;
}

const Blok8: FC<Blok8Props> = ({ data, onChange }) => {
  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">
          Blok 8 - Tempat Tinggal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label>801. Kepemilikan Tempat Tinggal (1-5)</Label>
          <Input
            value={data.kepemilikanRumah}
            onChange={(e) =>
              onChange("kepemilikanRumah", e.target.value.slice(0, 1))
            }
          />
        </div>

        <div className="space-y-1">
          <Label>802. Luas Lantai (m²)</Label>
          <Input
            value={data.luasLantai}
            onChange={(e) => onChange("luasLantai", e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label>803. Jenis Lantai Terluas (1-9)</Label>
          <Input
            value={data.jenisLantai}
            onChange={(e) =>
              onChange("jenisLantai", e.target.value.slice(0, 1))
            }
          />
        </div>

        <div className="space-y-1">
          <Label>804. Jenis Dinding Terluas (1-5)</Label>
          <Input
            value={data.jenisDinding}
            onChange={(e) =>
              onChange("jenisDinding", e.target.value.slice(0, 1))
            }
          />
        </div>

        <div className="space-y-1">
          <Label>805. Jenis Atap Terluas (1-8)</Label>
          <Input
            value={data.jenisAtap}
            onChange={(e) => onChange("jenisAtap", e.target.value.slice(0, 1))}
          />
        </div>

        <div className="space-y-1">
          <Label>806. Sumber Air Minum Utama (01-11)</Label>
          <Input
            value={data.sumberAirMinum}
            onChange={(e) =>
              onChange("sumberAirMinum", e.target.value.slice(0, 2))
            }
          />
        </div>

        <div className="space-y-1">
          <Label>807. Sumber Air Mandi/Cuci (01-11)</Label>
          <Input
            value={data.sumberAirMandi}
            onChange={(e) =>
              onChange("sumberAirMandi", e.target.value.slice(0, 2))
            }
          />
        </div>

        <div className="space-y-1">
          <Label>808a. Sumber Penerangan (1-4)</Label>
          <Input
            value={data.sumberPenerangan}
            onChange={(e) =>
              onChange("sumberPenerangan", e.target.value.slice(0, 1))
            }
          />
        </div>

        <div className="space-y-1">
          <Label>808b. Daya Terpasang (1-5)</Label>
          <Input
            value={data.dayaTerpasang}
            onChange={(e) =>
              onChange("dayaTerpasang", e.target.value.slice(0, 1))
            }
          />
        </div>

        <div className="space-y-1">
          <Label>809. Bahan Bakar Memasak (00-11)</Label>
          <Input
            value={data.bahanBakarMasak}
            onChange={(e) =>
              onChange("bahanBakarMasak", e.target.value.slice(0, 2))
            }
          />
        </div>

        <div className="space-y-1">
          <Label>810a. Fasilitas BAB (1-5)</Label>
          <Input
            value={data.fasilitasBAB}
            onChange={(e) =>
              onChange("fasilitasBAB", e.target.value.slice(0, 1))
            }
          />
        </div>

        <div className="space-y-1">
          <Label>810b. Jenis Kloset (1-4)</Label>
          <Input
            value={data.jenisKloset}
            onChange={(e) =>
              onChange("jenisKloset", e.target.value.slice(0, 1))
            }
          />
        </div>

        <div className="space-y-1">
          <Label>811. Tempat Pembuangan Tinja (1-6)</Label>
          <Input
            value={data.pembuanganTinja}
            onChange={(e) =>
              onChange("pembuanganTinja", e.target.value.slice(0, 1))
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Blok8;
