"use client";

import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataAnggota } from "@/types/DataAnggota";

interface Blok5Props {
  data: DataAnggota[];
  onChange: (index: number, field: keyof DataAnggota, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const Blok5: FC<Blok5Props> = ({ data, onChange, onAdd, onRemove }) => {
  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg text-gray-900">
          Blok 5 - Ketenagakerjaan
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
              <Label>501. Apakah Bekerja? (1. Ya, 2. Tidak)</Label>
              <Input
                value={anggota.bekerja || ""}
                onChange={(e) =>
                  onChange(index, "bekerja", e.target.value.slice(0, 1))
                }
              />
            </div>

            {anggota.bekerja === "1" && (
              <>
                <div className="space-y-1">
                  <Label>502. Lapangan Usaha</Label>
                  <Input
                    value={anggota.lapanganUsaha || ""}
                    onChange={(e) =>
                      onChange(index, "lapanganUsaha", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-1">
                  <Label>503. Status Pekerjaan (1-8)</Label>
                  <Input
                    value={anggota.statusPekerjaan || ""}
                    onChange={(e) =>
                      onChange(
                        index,
                        "statusPekerjaan",
                        e.target.value.slice(0, 1)
                      )
                    }
                  />
                </div>

                <div className="space-y-1">
                  <Label>504. Pendapatan Bulan Lalu</Label>
                  <Input
                    value={anggota.pendapatan || ""}
                    onChange={(e) =>
                      onChange(index, "pendapatan", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-1">
                  <Label>505. Kepemilikan NPWP (1-3)</Label>
                  <Input
                    value={anggota.npwp || ""}
                    onChange={(e) =>
                      onChange(index, "npwp", e.target.value.slice(0, 1))
                    }
                  />
                </div>
              </>
            )}

            <div className="space-y-1">
              <Label>506. Apakah Memiliki Usaha? (1. Ya, 2. Tidak)</Label>
              <Input
                value={anggota.punyaUsaha || ""}
                onChange={(e) =>
                  onChange(index, "punyaUsaha", e.target.value.slice(0, 1))
                }
              />
            </div>

            {anggota.punyaUsaha === "1" && (
              <>
                <div className="space-y-1">
                  <Label>508. Lapangan Usaha</Label>
                  <Input
                    value={anggota.lapanganUsahaUtama || ""}
                    onChange={(e) =>
                      onChange(index, "lapanganUsahaUtama", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-1">
                  <Label>509. Status dalam Usaha</Label>
                  <Input
                    value={anggota.statusUsaha || ""}
                    onChange={(e) =>
                      onChange(index, "statusUsaha", e.target.value.slice(0, 1))
                    }
                  />
                </div>

                <div className="space-y-1">
                  <Label>512. Izin Usaha (Kode 01-12)</Label>
                  <Input
                    value={anggota.izinUsaha || ""}
                    onChange={(e) =>
                      onChange(index, "izinUsaha", e.target.value.slice(0, 2))
                    }
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Blok5;
