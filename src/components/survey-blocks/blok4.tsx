"use client";

import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataAnggota } from "@/types/DataAnggota";

interface Blok4Props {
  data: DataAnggota[];
  onChange: (index: number, field: keyof DataAnggota, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const Blok4: FC<Blok4Props> = ({ data, onChange, onAdd, onRemove }) => {
  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg text-gray-900">
          Blok 4 - Pendidikan
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
            className="w-[300px] border p-4 rounded-xl space-y-4 relative"
          >
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 text-red-500"
              onClick={() => onRemove(index)}
            >
              <Trash2 size={16} />
            </Button>

            <div className="space-y-1">
              <Label>301. Nomor Urut</Label>
              <Input
                type="number"
                value={anggota.noUrut}
                onChange={(e) =>
                  onChange(index, "noUrut", e.target.value.slice(0, 1))
                }
              />
            </div>

            <div className="space-y-1">
              <Label>401. Partisipasi Sekolah (1-3)</Label>
              <Input
                value={anggota.partisipasi || ""}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (["1", "2", "3"].includes(val) || val === "")
                    onChange(index, "partisipasi", val);
                }}
              />
              <p className="text-sm text-gray-500">
                1. Tidak/belum pernah sekolah <br />
                2. Masih sekolah <br />
                3. Tidak bersekolah lagi
              </p>
            </div>

            {anggota.partisipasi !== "1" && anggota.partisipasi !== "" && (
              <>
                <div className="space-y-1">
                  <Label>402. Jenjang Pendidikan (2 digit)</Label>
                  <Input
                    value={anggota.jenjang || ""}
                    onChange={(e) =>
                      onChange(index, "jenjang", e.target.value.slice(0, 2))
                    }
                  />
                  <p className="text-sm text-gray-500">
                    01 Paket A, 02 SD LB, 03 SD, ... dst
                  </p>
                </div>

                <div className="space-y-1">
                  <Label>403. Kelas Tertinggi (1-8)</Label>
                  <Input
                    value={anggota.kelas || ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (
                        ["1", "2", "3", "4", "5", "6", "7", "8"].includes(
                          val
                        ) ||
                        val === ""
                      )
                        onChange(index, "kelas", val);
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <Label>404. Ijazah/STTB (2 digit)</Label>
                  <Input
                    value={anggota.ijazah || ""}
                    onChange={(e) =>
                      onChange(index, "ijazah", e.target.value.slice(0, 2))
                    }
                  />
                  <p className="text-sm text-gray-500">
                    Kode sesuai daftar jenjang
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Blok4;
