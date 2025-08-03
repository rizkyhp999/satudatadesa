"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WilayahValue {
  kode_provinsi: string;
  kode_kabupaten: string;
  kode_kecamatan: string;
  kode_desa: string;
}

interface WilayahProps {
  value: WilayahValue;
  onChange: (val: WilayahValue) => void;
}

const PROVINSI = [{ kode: "65", nama: "Kalimantan Utara" }];

const KABUPATEN = [{ kode: "03", nama: "Kabupaten Tana Tidung" }];

const KECAMATAN_DESA = [
  {
    kecKode: "010",
    kecNama: "MURUK RIAN",
    desaKode: "001",
    desaNama: "BALAYAN ARI",
  },
  {
    kecKode: "010",
    kecNama: "MURUK RIAN",
    desaKode: "002",
    desaNama: "SEPUTUK",
  },
  { kecKode: "010", kecNama: "MURUK RIAN", desaKode: "003", desaNama: "RIAN" },
  {
    kecKode: "010",
    kecNama: "MURUK RIAN",
    desaKode: "004",
    desaNama: "KAPUAK",
  },
  {
    kecKode: "010",
    kecNama: "MURUK RIAN",
    desaKode: "005",
    desaNama: "RIAN RAYO",
  },
  {
    kecKode: "010",
    kecNama: "MURUK RIAN",
    desaKode: "006",
    desaNama: "SAPARI",
  },
  { kecKode: "020", kecNama: "SESAYAP", desaKode: "001", desaNama: "SEDULUN" },
  {
    kecKode: "020",
    kecNama: "SESAYAP",
    desaKode: "002",
    desaNama: "LIMBU SEDULUN",
  },
  { kecKode: "020", kecNama: "SESAYAP", desaKode: "003", desaNama: "GUNAWAN" },
  {
    kecKode: "020",
    kecNama: "SESAYAP",
    desaKode: "004",
    desaNama: "TIDENG PALE",
  },
  {
    kecKode: "020",
    kecNama: "SESAYAP",
    desaKode: "005",
    desaNama: "TIDENG PALE TIMUR",
  },
  { kecKode: "020", kecNama: "SESAYAP", desaKode: "006", desaNama: "SEBIDAI" },
  { kecKode: "020", kecNama: "SESAYAP", desaKode: "007", desaNama: "SEBAWANG" },
  { kecKode: "030", kecNama: "BETAYAU", desaKode: "001", desaNama: "MENDUPO" },
  { kecKode: "030", kecNama: "BETAYAU", desaKode: "002", desaNama: "PERIUK" },
  { kecKode: "030", kecNama: "BETAYAU", desaKode: "003", desaNama: "BEBAKUNG" },
  { kecKode: "030", kecNama: "BETAYAU", desaKode: "004", desaNama: "KUJAU" },
  { kecKode: "030", kecNama: "BETAYAU", desaKode: "005", desaNama: "MANING" },
  {
    kecKode: "030",
    kecNama: "BETAYAU",
    desaKode: "006",
    desaNama: "BUONG BARU",
  },
  {
    kecKode: "040",
    kecNama: "SESAYAP HILIR",
    desaKode: "001",
    desaNama: "SELUDAU",
  },
  {
    kecKode: "040",
    kecNama: "SESAYAP HILIR",
    desaKode: "002",
    desaNama: "SESAYAP",
  },
  {
    kecKode: "040",
    kecNama: "SESAYAP HILIR",
    desaKode: "003",
    desaNama: "SEPALA DALUNG",
  },
  {
    kecKode: "050",
    kecNama: "TANA LIA",
    desaKode: "001",
    desaNama: "TANAH MERAH",
  },
  {
    kecKode: "050",
    kecNama: "TANA LIA",
    desaKode: "002",
    desaNama: "SAMBUNGAN",
  },
  {
    kecKode: "050",
    kecNama: "TANA LIA",
    desaKode: "004",
    desaNama: "TANAH MERAH BARAT",
  },
  {
    kecKode: "050",
    kecNama: "TANA LIA",
    desaKode: "005",
    desaNama: "SAMBUNGAN SELATAN",
  },
];

// Ambil kecamatan unik
const KECAMATAN_LIST = Array.from(
  new Map(KECAMATAN_DESA.map((d) => [d.kecKode, d.kecNama])).entries()
).map(([kode, nama]) => ({ kode, nama }));

export function Wilayah({ value, onChange }: WilayahProps) {
  // Filter desa sesuai kecamatan terpilih
  const desaOptions = KECAMATAN_DESA.filter(
    (d) => d.kecKode === value.kode_kecamatan
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kode Wilayah</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-4 gap-4">
        {/* Provinsi */}
        <div className="min-w-0">
          <Label htmlFor="provinsi">Provinsi</Label>
          <Select
            value={value.kode_provinsi || "65"}
            onValueChange={(kode) =>
              onChange({
                ...value,
                kode_provinsi: kode,
                kode_kabupaten: "03",
              })
            }
            defaultValue="65"
          >
            <SelectTrigger id="provinsi" className="w-full">
              <SelectValue placeholder="Pilih Provinsi" />
            </SelectTrigger>
            <SelectContent>
              {PROVINSI.map((p) => (
                <SelectItem key={p.kode} value={p.kode}>
                  {p.kode} - {p.nama}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Kabupaten */}
        <div className="min-w-0">
          <Label htmlFor="kabupaten">Kabupaten</Label>
          <Select
            value={value.kode_kabupaten || "03"}
            onValueChange={(kode) =>
              onChange({ ...value, kode_kabupaten: kode })
            }
            defaultValue="03"
          >
            <SelectTrigger id="kabupaten" className="w-full">
              <SelectValue placeholder="Pilih Kabupaten" />
            </SelectTrigger>
            <SelectContent>
              {KABUPATEN.map((k) => (
                <SelectItem key={k.kode} value={k.kode}>
                  {k.kode} - {k.nama}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Kecamatan */}
        <div className="min-w-0">
          <Label htmlFor="kecamatan">Kecamatan</Label>
          <Select
            value={value.kode_kecamatan || ""}
            onValueChange={(kode) =>
              onChange({
                ...value,
                kode_kecamatan: kode,
                kode_desa: "",
              })
            }
          >
            <SelectTrigger id="kecamatan" className="w-full">
              <SelectValue placeholder="Pilih Kecamatan" />
            </SelectTrigger>
            <SelectContent>
              {KECAMATAN_LIST.map((k) => (
                <SelectItem key={k.kode} value={k.kode}>
                  [{k.kode}] {k.nama}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Desa */}
        <div className="min-w-0">
          <Label htmlFor="desa">Desa</Label>
          <Select
            value={value.kode_desa || ""}
            onValueChange={(kode) => onChange({ ...value, kode_desa: kode })}
            disabled={!value.kode_kecamatan}
          >
            <SelectTrigger id="desa" className="w-full">
              <SelectValue placeholder="Pilih Desa" />
            </SelectTrigger>
            <SelectContent>
              {desaOptions.map((d) => (
                <SelectItem key={d.desaKode} value={d.desaKode}>
                  [{d.desaKode}] {d.desaNama}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
