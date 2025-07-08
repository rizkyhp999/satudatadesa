"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home, Droplets, Lightbulb } from "lucide-react";
import type { Blok8 } from "@/types/survey";

interface Blok8ComponentProps {
  data: Blok8;
  onChange: (data: Blok8) => void;
}

export function Blok8Component({ data, onChange }: Blok8ComponentProps) {
  const handleChange = (field: keyof Blok8, value: string | number) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Home className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-800">
            Kondisi Perumahan
          </h3>
          <p className="text-slate-600">
            Informasi tentang kondisi tempat tinggal
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Kepemilikan dan Struktur Bangunan */}
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Home className="w-5 h-5 text-slate-600" />
              Kepemilikan dan Struktur Bangunan
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  801. Status Kepemilikan Bangunan
                </Label>
                <Select
                  value={data["801_statusKepemilikanBangunan"]?.toString()}
                  onValueChange={(value) =>
                    handleChange(
                      "801_statusKepemilikanBangunan",
                      parseInt(value)
                    )
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Milik Sendiri</SelectItem>
                    <SelectItem value="2">Kontrak/Sewa</SelectItem>
                    <SelectItem value="3">Bebas Sewa</SelectItem>
                    <SelectItem value="4">Dinas</SelectItem>
                    <SelectItem value="5">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  802. Luas Lantai (m²)
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="999"
                  value={data["802_luasLantai"] || ""}
                  onChange={(e) =>
                    handleChange(
                      "802_luasLantai",
                      parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  803. Jenis Lantai Terluas
                </Label>
                <Select
                  value={data["803_jenisLantai"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("803_jenisLantai", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Marmer/Granit</SelectItem>
                    <SelectItem value="2">Keramik</SelectItem>
                    <SelectItem value="3">Parket/Vinil</SelectItem>
                    <SelectItem value="4">Ubin/Tegel</SelectItem>
                    <SelectItem value="5">Kayu</SelectItem>
                    <SelectItem value="6">Semen</SelectItem>
                    <SelectItem value="7">Tanah</SelectItem>
                    <SelectItem value="8">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  804. Jenis Dinding Terluas
                </Label>
                <Select
                  value={data["804_jenisDinding"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("804_jenisDinding", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Tembok</SelectItem>
                    <SelectItem value="2">Kayu</SelectItem>
                    <SelectItem value="3">Anyaman Bambu</SelectItem>
                    <SelectItem value="4">Batang Kayu</SelectItem>
                    <SelectItem value="5">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  805. Jenis Atap Terluas
                </Label>
                <Select
                  value={data["805_jenisAtap"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("805_jenisAtap", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Beton</SelectItem>
                    <SelectItem value="2">Genteng</SelectItem>
                    <SelectItem value="3">Seng</SelectItem>
                    <SelectItem value="4">Asbes</SelectItem>
                    <SelectItem value="5">Bambu</SelectItem>
                    <SelectItem value="6">Jerami/Ijuk</SelectItem>
                    <SelectItem value="7">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fasilitas Air dan Listrik */}
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Droplets className="w-5 h-5 text-slate-600" />
              Fasilitas Air dan Listrik
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  806. Sumber Air Minum Utama
                </Label>
                <Select
                  value={data["806_sumberAirMinum"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("806_sumberAirMinum", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih sumber" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Air Kemasan</SelectItem>
                    <SelectItem value="2">Air Isi Ulang</SelectItem>
                    <SelectItem value="3">Leding Meteran</SelectItem>
                    <SelectItem value="4">Leding Eceran</SelectItem>
                    <SelectItem value="5">Sumur Bor/Pompa</SelectItem>
                    <SelectItem value="6">Sumur Terlindung</SelectItem>
                    <SelectItem value="7">Sumur Tak Terlindung</SelectItem>
                    <SelectItem value="8">Mata Air Terlindung</SelectItem>
                    <SelectItem value="9">Mata Air Tak Terlindung</SelectItem>
                    <SelectItem value="10">Air Sungai/Danau/Waduk</SelectItem>
                    <SelectItem value="11">Air Hujan</SelectItem>
                    <SelectItem value="12">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  807. Sumber Air Mandi/Mencuci
                </Label>
                <Select
                  value={data["807_sumberAirMandi"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("807_sumberAirMandi", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih sumber" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Leding Meteran</SelectItem>
                    <SelectItem value="2">Leding Eceran</SelectItem>
                    <SelectItem value="3">Sumur Bor/Pompa</SelectItem>
                    <SelectItem value="4">Sumur Terlindung</SelectItem>
                    <SelectItem value="5">Sumur Tak Terlindung</SelectItem>
                    <SelectItem value="6">Mata Air Terlindung</SelectItem>
                    <SelectItem value="7">Mata Air Tak Terlindung</SelectItem>
                    <SelectItem value="8">Air Sungai/Danau/Waduk</SelectItem>
                    <SelectItem value="9">Air Hujan</SelectItem>
                    <SelectItem value="10">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  808a. Sumber Penerangan Utama
                </Label>
                <Select
                  value={data["808a_sumberPenerangan"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("808a_sumberPenerangan", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih sumber" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Listrik PLN</SelectItem>
                    <SelectItem value="2">Listrik Non-PLN</SelectItem>
                    <SelectItem value="3">Bukan Listrik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  809. Bahan Bakar Memasak
                </Label>
                <Select
                  value={data["809_bahanBakarMasak"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("809_bahanBakarMasak", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih bahan bakar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Listrik</SelectItem>
                    <SelectItem value="2">Gas Elpiji</SelectItem>
                    <SelectItem value="3">Gas Kota</SelectItem>
                    <SelectItem value="4">Minyak Tanah</SelectItem>
                    <SelectItem value="5">Briket</SelectItem>
                    <SelectItem value="6">Arang</SelectItem>
                    <SelectItem value="7">Kayu Bakar</SelectItem>
                    <SelectItem value="8">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  808b. Daya Terpasang 1 (VA)
                </Label>
                <Input
                  type="number"
                  min="0"
                  max="9"
                  value={data["808b_dayaTerpasang1"] || ""}
                  onChange={(e) =>
                    handleChange(
                      "808b_dayaTerpasang1",
                      parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  808b. Daya Terpasang 2 (VA)
                </Label>
                <Input
                  type="number"
                  min="0"
                  max="9"
                  value={data["808b_dayaTerpasang2"] || ""}
                  onChange={(e) =>
                    handleChange(
                      "808b_dayaTerpasang2",
                      parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  808b. Daya Terpasang 3 (VA)
                </Label>
                <Input
                  type="number"
                  min="0"
                  max="9"
                  value={data["808b_dayaTerpasang3"] || ""}
                  onChange={(e) =>
                    handleChange(
                      "808b_dayaTerpasang3",
                      parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fasilitas Sanitasi */}
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-slate-600" />
              Fasilitas Sanitasi
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  810a. Kepemilikan Fasilitas BAB
                </Label>
                <Select
                  value={data["810a_kepemilikanFasilitasBAB"]?.toString()}
                  onValueChange={(value) =>
                    handleChange(
                      "810a_kepemilikanFasilitasBAB",
                      parseInt(value)
                    )
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ada, Digunakan Sendiri</SelectItem>
                    <SelectItem value="2">Ada, Digunakan Bersama</SelectItem>
                    <SelectItem value="3">Tidak Ada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  810b. Jenis Kloset
                </Label>
                <Select
                  value={data["810b_jenisKloset"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("810b_jenisKloset", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Leher Angsa</SelectItem>
                    <SelectItem value="2">Plengsengan</SelectItem>
                    <SelectItem value="3">Cemplung/Cubluk</SelectItem>
                    <SelectItem value="4">Tidak Pakai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  811. Tempat Buang Tinja
                </Label>
                <Select
                  value={data["811_tempatBuangTinja"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("811_tempatBuangTinja", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih tempat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Tangki Septik</SelectItem>
                    <SelectItem value="2">IPAL</SelectItem>
                    <SelectItem value="3">
                      Kolam/Sawah/Sungai/Danau/Laut
                    </SelectItem>
                    <SelectItem value="4">Lubang Tanah</SelectItem>
                    <SelectItem value="5">Pantai/Tanah Lapang/Kebun</SelectItem>
                    <SelectItem value="6">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
