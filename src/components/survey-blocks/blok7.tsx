"use client";

import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataAnggota } from "@/types/DataAnggota";

interface Blok7Props {
  data: DataAnggota[];
  onChange: (index: number, field: keyof DataAnggota, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const Blok7: FC<Blok7Props> = ({ data, onChange, onAdd, onRemove }) => {
  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg text-gray-900">
          Blok 7 - Jaminan Sosial
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
              <Label>701. Jaminan Kesehatan</Label>
              <Input
                value={anggota.jaminanKesehatan || ""}
                onChange={(e) =>
                  onChange(
                    index,
                    "jaminanKesehatan",
                    e.target.value.slice(0, 2)
                  )
                }
              />
            </div>

            <div className="space-y-1">
              <Label>702. Jaminan Ketenagakerjaan</Label>
              <Input
                value={anggota.jaminanKetenagakerjaan || ""}
                onChange={(e) =>
                  onChange(
                    index,
                    "jaminanKetenagakerjaan",
                    e.target.value.slice(0, 2)
                  )
                }
              />
            </div>

            <div className="space-y-1">
              <Label>703. Program PIP (1 - Ya, 2 - Tidak)</Label>
              <Input
                value={anggota.ikutPIP || ""}
                onChange={(e) =>
                  onChange(index, "ikutPIP", e.target.value.slice(0, 1))
                }
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Blok7;
