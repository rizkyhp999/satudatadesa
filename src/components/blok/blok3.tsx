"use client";

import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { DataAnggota } from "@/types/DataAnggota";

interface Blok3Props {
  data: DataAnggota[];
  onChange: (index: number, field: keyof DataAnggota, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const Blok3: FC<Blok3Props> = ({ data, onChange, onAdd, onRemove }) => {
  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg text-gray-900">
          Blok 3 - Anggota Keluarga
        </CardTitle>
        <Button
          size="sm"
          variant="outline"
          onClick={onAdd}
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Tambah Anggota
        </Button>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-4">
        {data.map((anggota, index) => (
          <div
            key={index}
            className="w-[320px] border p-4 rounded-xl space-y-4 relative bg-white shadow"
          >
            <div className="absolute top-2 left-2 text-sm text-gray-700 font-semibold">
              Anggota {index + 1}
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 text-red-500"
              onClick={() => onRemove(index)}
            >
              <Trash2 size={16} />
            </Button>

            <div className="space-y-1 pt-6">
              <Label>301. No Urut (1 digit)</Label>
              <Input
                type="number"
                value={anggota.noUrut}
                onChange={(e) =>
                  onChange(index, "noUrut", e.target.value.slice(0, 1))
                }
              />
            </div>

            <div className="space-y-1">
              <Label>302. Nama Anggota Keluarga</Label>
              <Input
                value={anggota.nama}
                onChange={(e) => onChange(index, "nama", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label>303. Nomor Induk Kependudukan (16 digit)</Label>
              <Input
                value={anggota.nik}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 16) onChange(index, "nik", val);
                }}
              />
            </div>

            <div className="space-y-1">
              <Label>304. Keberadaan Anggota Keluarga (1 digit)</Label>
              <Input
                value={anggota.keberadaan}
                placeholder="1 - 7"
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (
                    ["1", "2", "3", "4", "5", "6", "7"].includes(val) ||
                    val === ""
                  )
                    onChange(index, "keberadaan", val);
                }}
              />
            </div>

            {anggota.keberadaan === "3" && (
              <div className="space-y-1">
                <Label>305. Kecamatan & Desa (String + 3 digit)</Label>
                <Input
                  value={anggota.kecDesa || ""}
                  onChange={(e) => onChange(index, "kecDesa", e.target.value)}
                />
              </div>
            )}

            {anggota.keberadaan === "4" && (
              <div className="space-y-1">
                <Label>306. Provinsi & Kabupaten (String + 2 digit)</Label>
                <Input
                  value={anggota.provKab || ""}
                  onChange={(e) => onChange(index, "provKab", e.target.value)}
                />
              </div>
            )}

            {anggota.keberadaan === "5" && (
              <div className="space-y-1">
                <Label>307. Negara (String + 2 digit)</Label>
                <Input
                  value={anggota.negara || ""}
                  onChange={(e) => onChange(index, "negara", e.target.value)}
                />
              </div>
            )}

            <div className="space-y-1">
              <Label>308. Jenis Kelamin (1 - Laki, 2 - Perempuan)</Label>
              <Input
                value={anggota.jenisKelamin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (["1", "2"].includes(val) || val === "")
                    onChange(index, "jenisKelamin", val);
                }}
              />
            </div>

            <div className="space-y-1">
              <Label>309. Tanggal Lahir (dd/mm/yyyy)</Label>
              <Input
                value={anggota.tanggalLahir}
                onChange={(e) =>
                  onChange(index, "tanggalLahir", e.target.value)
                }
              />
            </div>

            <div className="space-y-1">
              <Label>310. Umur (2 digit)</Label>
              <Input
                type="number"
                value={anggota.umur}
                onChange={(e) =>
                  onChange(index, "umur", e.target.value.slice(0, 2))
                }
              />
            </div>

            <div className="space-y-1">
              <Label>311. Status Perkawinan (1 - 4)</Label>
              <Input
                value={anggota.statusPerkawinan}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (["1", "2", "3", "4"].includes(val) || val === "")
                    onChange(index, "statusPerkawinan", val);
                }}
              />
            </div>

            <div className="space-y-1">
              <Label>312. Hubungan dengan Kepala Keluarga (1 - 8)</Label>
              <Input
                value={anggota.hubunganKepala}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (
                    ["1", "2", "3", "4", "5", "6", "7", "8"].includes(val) ||
                    val === ""
                  )
                    onChange(index, "hubunganKepala", val);
                }}
              />
            </div>

            {anggota.jenisKelamin === "2" &&
              parseInt(anggota.umur) >= 10 &&
              parseInt(anggota.umur) <= 54 &&
              ["2", "3", "4"].includes(anggota.statusPerkawinan) && (
                <div className="space-y-1">
                  <Label>313. Apakah sedang hamil? (1 - Ya, 2 - Tidak)</Label>
                  <Input
                    value={anggota.sedangHamil || ""}
                    onChange={(e) =>
                      onChange(index, "sedangHamil", e.target.value)
                    }
                  />
                </div>
              )}

            {anggota.sedangHamil === "1" && (
              <div className="space-y-1">
                <Label>314. Usia Kehamilan (bulan)</Label>
                <Input
                  type="number"
                  value={anggota.usiaKehamilan || ""}
                  onChange={(e) =>
                    onChange(index, "usiaKehamilan", e.target.value.slice(0, 1))
                  }
                />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Blok3;
