"use client";
import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// ---------------- BLOK 9 ------------------

export interface Blok9Data {
  asetTidakBergerak: {
    lahan: string;
    bangunanLain: string;
  };
  asetBergerak: {
    tabungGas: string;
    lemariEs: string;
    ac: string;
    tv: string;
    emas: string;
    komputer: string;
    motor: string;
    mobil: string;
    perahu: string;
    perahuMotor: string;
    sepeda: string;
    smartphone: string;
  };
  programBantuan: {
    bpnt: string;
    pkh: string;
    bltDesa: string;
    subsidiListrik: string;
    bantuanPemda: string;
    subsidiPupuk: string;
    bantuanDesa: string;
    bantuanDesaLain: string;
  };
  bantuanPertanian: {
    bibitSawit: string;
    bibitIkan: string;
    bibitSayur: string;
    keberlanjutan: string;
    alasanTidakLanjut: string;
    programUsulan: string;
    programUsulanLain: string;
  };
}

interface Blok9Props {
  data: Blok9Data;
  onChange: (field: string, value: string) => void;
}

export const Blok9: FC<Blok9Props> = ({ data, onChange }) => {
  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">
          Blok 9 - Kepemilikan Aset & Program
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label className="font-bold">Aset Tidak Bergerak</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>a. Lahan</Label>
            <Input
              value={data.asetTidakBergerak.lahan}
              onChange={(e) =>
                onChange("asetTidakBergerak.lahan", e.target.value.slice(0, 1))
              }
            />
          </div>
          <div className="space-y-1">
            <Label>b. Bangunan Lain</Label>
            <Input
              value={data.asetTidakBergerak.bangunanLain}
              onChange={(e) =>
                onChange(
                  "asetTidakBergerak.bangunanLain",
                  e.target.value.slice(0, 1)
                )
              }
            />
          </div>
        </div>

        <Label className="font-bold">Aset Bergerak</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(data.asetBergerak).map(([key, val]) => (
            <div key={key} className="space-y-1">
              <Label>{key}</Label>
              <Input
                value={val}
                onChange={(e) =>
                  onChange(`asetBergerak.${key}`, e.target.value.slice(0, 1))
                }
              />
            </div>
          ))}
        </div>

        <Label className="font-bold">Program Bantuan</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(data.programBantuan).map(([key, val]) => (
            <div key={key} className="space-y-1">
              <Label>{key}</Label>
              <Input
                value={val}
                onChange={(e) =>
                  onChange(`programBantuan.${key}`, e.target.value.slice(0, 1))
                }
              />
            </div>
          ))}
        </div>

        <Label className="font-bold">Bantuan Pertanian Desa</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <Label>Bibit Sawit</Label>
            <Input
              value={data.bantuanPertanian.bibitSawit}
              onChange={(e) =>
                onChange(
                  "bantuanPertanian.bibitSawit",
                  e.target.value.slice(0, 1)
                )
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Bibit Ikan Lele</Label>
            <Input
              value={data.bantuanPertanian.bibitIkan}
              onChange={(e) =>
                onChange(
                  "bantuanPertanian.bibitIkan",
                  e.target.value.slice(0, 1)
                )
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Bibit Sayuran/Buah</Label>
            <Input
              value={data.bantuanPertanian.bibitSayur}
              onChange={(e) =>
                onChange(
                  "bantuanPertanian.bibitSayur",
                  e.target.value.slice(0, 1)
                )
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Keberlanjutan (1-4)</Label>
            <Input
              value={data.bantuanPertanian.keberlanjutan}
              onChange={(e) =>
                onChange(
                  "bantuanPertanian.keberlanjutan",
                  e.target.value.slice(0, 1)
                )
              }
            />
          </div>
          <div className="space-y-1 col-span-2">
            <Label>Alasan Tidak Lanjut</Label>
            <Input
              value={data.bantuanPertanian.alasanTidakLanjut}
              onChange={(e) =>
                onChange("bantuanPertanian.alasanTidakLanjut", e.target.value)
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Program Usulan</Label>
            <Input
              value={data.bantuanPertanian.programUsulan}
              onChange={(e) =>
                onChange("bantuanPertanian.programUsulan", e.target.value)
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Program Usulan Lain</Label>
            <Input
              value={data.bantuanPertanian.programUsulanLain}
              onChange={(e) =>
                onChange("bantuanPertanian.programUsulanLain", e.target.value)
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
