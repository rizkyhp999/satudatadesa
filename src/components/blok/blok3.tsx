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
            className="w-[340px] border p-4 rounded-xl space-y-4 relative bg-white shadow"
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
              <div className="flex gap-1">
                <Input
                  className="w-10 text-center placeholder:text-xs"
                  maxLength={1}
                  value={anggota.noUrut}
                  placeholder="1-9"
                  onChange={(e) =>
                    onChange(
                      index,
                      "noUrut",
                      e.target.value.replace(/\D/g, "").slice(0, 1)
                    )
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>302. Nama Anggota Keluarga</Label>
              <Input
                value={anggota.nama}
                placeholder="Masukkan nama lengkap"
                onChange={(e) => onChange(index, "nama", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label>303. Nomor Induk Kependudukan (16 digit)</Label>
              <div className="flex gap-1 flex-wrap">
                {Array.from({ length: 16 }).map((_, i) => (
                  <Input
                    key={i}
                    className={`w-8 text-center placeholder:text-xs ${
                      i === 6 ? "bg-gray-200" : ""
                    }`}
                    maxLength={1}
                    placeholder={i === 6 ? "x" : "0"}
                    value={anggota.nik[i] || ""}
                    onChange={(e) => {
                      const updated = anggota.nik.split("");
                      updated[i] = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 1);
                      onChange(index, "nik", updated.join(""));
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <Label>304. Keberadaan Anggota (1 digit)</Label>
              <div className="flex gap-1">
                <Input
                  className="w-10 text-center placeholder:text-xs"
                  maxLength={1}
                  value={anggota.keberadaan}
                  placeholder="1-5"
                  onChange={(e) =>
                    onChange(
                      index,
                      "keberadaan",
                      e.target.value.replace(/\D/g, "").slice(0, 1)
                    )
                  }
                />
              </div>
            </div>

            {anggota.keberadaan === "3" && (
              <div className="space-y-1">
                <Label>305. Kecamatan & Desa</Label>
                <div className="flex flex-wrap gap-1">
                  <Input
                    className="flex-1 placeholder:text-sm"
                    placeholder="Nama Kecamatan/Desa"
                    value={anggota.kecDesa?.split("#")[0] || ""}
                    onChange={(e) =>
                      onChange(
                        index,
                        "kecDesa",
                        `${e.target.value}#${
                          anggota.kecDesa?.split("#")[1] || ""
                        }`
                      )
                    }
                  />
                  <Input
                    className="w-10 text-center placeholder:text-xs"
                    maxLength={3}
                    placeholder="Kode"
                    value={anggota.kecDesa?.split("#")[1]?.slice(0, 3) || ""}
                    onChange={(e) =>
                      onChange(
                        index,
                        "kecDesa",
                        `${
                          anggota.kecDesa?.split("#")[0] || ""
                        }#${e.target.value.replace(/\D/g, "").slice(0, 3)}`
                      )
                    }
                  />
                </div>
              </div>
            )}

            {anggota.keberadaan === "4" && (
              <div className="space-y-1">
                <Label>306. Provinsi & Kabupaten</Label>
                <div className="flex flex-wrap gap-1">
                  <Input
                    className="flex-1 placeholder:text-sm"
                    placeholder="Nama Provinsi/Kabupaten"
                    value={anggota.provKab?.split("#")[0] || ""}
                    onChange={(e) =>
                      onChange(
                        index,
                        "provKab",
                        `${e.target.value}#${
                          anggota.provKab?.split("#")[1] || ""
                        }`
                      )
                    }
                  />
                  <Input
                    className="w-10 text-center placeholder:text-xs"
                    maxLength={2}
                    placeholder="Kode"
                    value={anggota.provKab?.split("#")[1]?.slice(0, 2) || ""}
                    onChange={(e) =>
                      onChange(
                        index,
                        "provKab",
                        `${
                          anggota.provKab?.split("#")[0] || ""
                        }#${e.target.value.replace(/\D/g, "").slice(0, 2)}`
                      )
                    }
                  />
                </div>
              </div>
            )}

            {anggota.keberadaan === "5" && (
              <div className="space-y-1">
                <Label>307. Negara</Label>
                <Input
                  value={anggota.negara || ""}
                  placeholder="Nama negara"
                  className="placeholder:text-sm"
                  onChange={(e) => onChange(index, "negara", e.target.value)}
                />
              </div>
            )}

            <div className="space-y-1">
              <Label>308. Jenis Kelamin (1-L, 2-P)</Label>
              <div className="flex gap-1">
                <Input
                  className="w-10 text-center placeholder:text-xs"
                  maxLength={1}
                  value={anggota.jenisKelamin}
                  placeholder="1/2"
                  onChange={(e) =>
                    onChange(
                      index,
                      "jenisKelamin",
                      e.target.value.replace(/\D/g, "").slice(0, 1)
                    )
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>309. Tanggal Lahir (dd/mm/yyyy)</Label>
              <div className="flex gap-1 items-center">
                {/* Day */}
                <Input
                  className="w-8 text-center"
                  maxLength={2}
                  value={anggota.tanggalLahir.slice(0, 2)}
                  onChange={(e) => {
                    const day = e.target.value.replace(/\D/g, "").slice(0, 2);
                    const rest = anggota.tanggalLahir.slice(2);
                    onChange(index, "tanggalLahir", day + rest);
                  }}
                />
                <span>/</span>
                {/* Month */}
                <Input
                  className="w-8 text-center"
                  maxLength={2}
                  value={anggota.tanggalLahir.slice(2, 4)}
                  onChange={(e) => {
                    const month = e.target.value.replace(/\D/g, "").slice(0, 2);
                    const before = anggota.tanggalLahir.slice(0, 2);
                    const after = anggota.tanggalLahir.slice(4);
                    onChange(index, "tanggalLahir", before + month + after);
                  }}
                />
                <span>/</span>
                {/* Year */}
                <Input
                  className="w-12 text-center"
                  maxLength={4}
                  value={anggota.tanggalLahir.slice(4, 8)}
                  onChange={(e) => {
                    const year = e.target.value.replace(/\D/g, "").slice(0, 4);
                    const before = anggota.tanggalLahir.slice(0, 4);
                    onChange(index, "tanggalLahir", before + year);
                  }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>310. Umur (2 digit)</Label>
              <div className="flex gap-1">
                <Input
                  className="w-10 text-center placeholder:text-xs"
                  maxLength={1}
                  placeholder="0-9"
                  value={anggota.umur[0] || ""}
                  onChange={(e) =>
                    onChange(
                      index,
                      "umur",
                      `${e.target.value.replace(/\D/g, "").slice(0, 1)}${
                        anggota.umur[1] || ""
                      }`
                    )
                  }
                />
                <Input
                  className="w-10 text-center placeholder:text-xs"
                  maxLength={1}
                  placeholder="0-9"
                  value={anggota.umur[1] || ""}
                  onChange={(e) =>
                    onChange(
                      index,
                      "umur",
                      `${anggota.umur[0] || ""}${e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 1)}`
                    )
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>311. Status Perkawinan (1-4)</Label>
              <div className="flex gap-1">
                <Input
                  className="w-10 text-center"
                  maxLength={1}
                  value={anggota.statusPerkawinan}
                  onChange={(e) =>
                    onChange(
                      index,
                      "statusPerkawinan",
                      e.target.value.replace(/\D/g, "").slice(0, 1)
                    )
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>312. Hubungan dengan Kepala Keluarga (1-8)</Label>
              <div className="flex gap-1">
                <Input
                  className="w-10 text-center"
                  maxLength={1}
                  value={anggota.hubunganKepala}
                  onChange={(e) =>
                    onChange(
                      index,
                      "hubunganKepala",
                      e.target.value.replace(/\D/g, "").slice(0, 1)
                    )
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>313. Apakah sedang hamil? (1-Ya, 2-Tidak)</Label>
              <div className="flex gap-1">
                <Input
                  className="w-10 text-center"
                  maxLength={1}
                  disabled={
                    !(
                      anggota.jenisKelamin === "2" &&
                      parseInt(anggota.umur) >= 10 &&
                      parseInt(anggota.umur) <= 54 &&
                      ["2", "3", "4"].includes(anggota.statusPerkawinan)
                    )
                  }
                  value={anggota.sedangHamil || ""}
                  onChange={(e) =>
                    onChange(
                      index,
                      "sedangHamil",
                      e.target.value.replace(/\D/g, "").slice(0, 1)
                    )
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>314. Usia Kehamilan (bulan)</Label>
              <div className="flex gap-1">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Input
                    key={i}
                    className="w-10 text-center"
                    maxLength={1}
                    disabled={anggota.sedangHamil !== "1"}
                    value={anggota.usiaKehamilan?.[i] || ""}
                    onChange={(e) => {
                      const updated = (anggota.usiaKehamilan || "").split("");
                      updated[i] = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 1);
                      onChange(index, "usiaKehamilan", updated.join(""));
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Blok3;
