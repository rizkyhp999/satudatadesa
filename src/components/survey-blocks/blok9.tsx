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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Coins, Home, Car, MilkIcon as Cow, Gift, Sprout } from "lucide-react";
import type { Blok9 } from "@/types/survey";

interface Blok9ComponentProps {
  data: Blok9;
  onChange: (data: Blok9) => void;
}

export function Blok9Component({ data, onChange }: Blok9ComponentProps) {
  const handleChange = (field: keyof Blok9, value: string | number) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <Coins className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-800">
            Aset dan Bantuan
          </h3>
          <p className="text-slate-600">
            Informasi kepemilikan aset dan bantuan yang diterima
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Aset Lahan dan Properti */}
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Home className="w-5 h-5 text-slate-600" />
              Aset Lahan dan Properti
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">
                901a. Kepemilikan Aset Lahan
              </Label>
              <Select
                value={data["901a_asetLahan"]?.toString()}
                onValueChange={(value) =>
                  handleChange("901a_asetLahan", parseInt(value))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ya</SelectItem>
                  <SelectItem value="2">Tidak</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">
                901b. Kepemilikan Rumah/Bangunan di Tempat Lain
              </Label>
              <Select
                value={data["901b_asetRumahLain"]?.toString()}
                onValueChange={(value) =>
                  handleChange("901b_asetRumahLain", parseInt(value))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ya</SelectItem>
                  <SelectItem value="2">Tidak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Kepemilikan Barang */}
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Car className="w-5 h-5 text-slate-600" />
              Kepemilikan Barang
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902a. Tabung Gas ≥5.5kg
                </Label>
                <Select
                  value={data["902a_tabungGas"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("902a_tabungGas", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902b. Lemari Es/Kulkas
                </Label>
                <Select
                  value={data["902b_kulkas"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("902b_kulkas", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902c. Air Conditioner (AC)
                </Label>
                <Select
                  value={data["902c_ac"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("902c_ac", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902d. Televisi (min 30 inci)
                </Label>
                <Select
                  value={data["902d_tv"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("902d_tv", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902e. Emas/Perhiasan
                </Label>
                <Select
                  value={data["902e_emas"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("902e_emas", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902f. Komputer/Laptop/Tablet
                </Label>
                <Select
                  value={data["902f_komputer"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("902f_komputer", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902g. Sepeda Motor
                </Label>
                <Select
                  value={data["902g_motor"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("902g_motor", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902h. Perahu Motor
                </Label>
                <Select
                  value={data["902h_perahuMotor"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("902h_perahuMotor", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902i. Mobil
                </Label>
                <Select
                  value={data["902i_mobil"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("902i_mobil", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902j. Sepeda
                </Label>
                <Select
                  value={data["902j_sepeda"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("902j_sepeda", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902k. Perahu
                </Label>
                <Select
                  value={data["902k_perahu"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("902k_perahu", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902l. Smartphone
                </Label>
                <Select
                  value={data["902l_smartphone"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("902l_smartphone", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kepemilikan Ternak */}
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Cow className="w-5 h-5 text-slate-600" />
              Kepemilikan Ternak
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">
                903a. Jumlah Sapi (ekor)
              </Label>
              <Input
                type="number"
                min="0"
                max="99"
                value={data["903a_sapi"] || ""}
                onChange={(e) =>
                  handleChange("903a_sapi", parseInt(e.target.value) || 0)
                }
                placeholder="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">
                903b. Jumlah Kerbau (ekor)
              </Label>
              <Input
                type="number"
                min="0"
                max="99"
                value={data["903b_kerbau"] || ""}
                onChange={(e) =>
                  handleChange("903b_kerbau", parseInt(e.target.value) || 0)
                }
                placeholder="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">
                903c. Jumlah Kuda (ekor)
              </Label>
              <Input
                type="number"
                min="0"
                max="99"
                value={data["903c_kuda"] || ""}
                onChange={(e) =>
                  handleChange("903c_kuda", parseInt(e.target.value) || 0)
                }
                placeholder="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">
                903d. Jumlah Babi (ekor)
              </Label>
              <Input
                type="number"
                min="0"
                max="99"
                value={data["903d_babi"] || ""}
                onChange={(e) =>
                  handleChange("903d_babi", parseInt(e.target.value) || 0)
                }
                placeholder="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">
                903e. Jumlah Kambing/Domba (ekor)
              </Label>
              <Input
                type="number"
                min="0"
                max="99"
                value={data["903e_kambing"] || ""}
                onChange={(e) =>
                  handleChange("903e_kambing", parseInt(e.target.value) || 0)
                }
                placeholder="0"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Bantuan Pemerintah */}
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Gift className="w-5 h-5 text-slate-600" />
              Bantuan Pemerintah (1 Tahun Terakhir)
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  904a. BPNT
                </Label>
                <Select
                  value={data["904a_BPNT"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("904a_BPNT", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  904b. PKH
                </Label>
                <Select
                  value={data["904b_PKH"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("904b_PKH", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  904c. BLT Desa
                </Label>
                <Select
                  value={data["904c_BLTDesa"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("904c_BLTDesa", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  904d. Subsidi Listrik
                </Label>
                <Select
                  value={data["904d_SubsidiListrik"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("904d_SubsidiListrik", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  904e. Bantuan Pemda
                </Label>
                <Select
                  value={data["904e_BantuanPemda"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("904e_BantuanPemda", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  904f. Subsidi Pupuk
                </Label>
                <Select
                  value={data["904f_SubsidiPupuk"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("904f_SubsidiPupuk", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  904g. Bantuan Desa
                </Label>
                <Select
                  value={data["904g_BantuanDesa"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("904g_BantuanDesa", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  904h. Bantuan Lainnya
                </Label>
                <Select
                  value={data["904h_BantuanLainnya"]?.toString()}
                  onValueChange={(value) =>
                    handleChange("904h_BantuanLainnya", parseInt(value))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ya</SelectItem>
                    <SelectItem value="2">Tidak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bantuan Khusus */}
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sprout className="w-5 h-5 text-slate-600" />
              Bantuan Khusus Pertanian
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Jenis Bantuan */}
            <div>
              <h4 className="font-medium text-slate-700 mb-3">
                Jenis Bantuan yang Diterima
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    905a. Bantuan Bibit Sawit
                  </Label>
                  <Select
                    value={data["905a_jenisBantuanSawit"]?.toString()}
                    onValueChange={(value) =>
                      handleChange("905a_jenisBantuanSawit", parseInt(value))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Bibit</SelectItem>
                      <SelectItem value="2">Pupuk</SelectItem>
                      <SelectItem value="3">Alat</SelectItem>
                      <SelectItem value="4">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    905b. Bantuan Benih Ikan Lele
                  </Label>
                  <Select
                    value={data["905b_jenisBantuanIkanLele"]?.toString()}
                    onValueChange={(value) =>
                      handleChange("905b_jenisBantuanIkanLele", parseInt(value))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Benih</SelectItem>
                      <SelectItem value="2">Pakan</SelectItem>
                      <SelectItem value="3">Kolam</SelectItem>
                      <SelectItem value="4">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    905c. Bantuan Bibit Sayur/Buah
                  </Label>
                  <Select
                    value={data["905c_jenisBantuanSayurBuah"]?.toString()}
                    onValueChange={(value) =>
                      handleChange(
                        "905c_jenisBantuanSayurBuah",
                        parseInt(value)
                      )
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Bibit</SelectItem>
                      <SelectItem value="2">Pupuk</SelectItem>
                      <SelectItem value="3">Alat</SelectItem>
                      <SelectItem value="4">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Status Penerimaan */}
            <div>
              <h4 className="font-medium text-slate-700 mb-3">
                Status Penerimaan Bantuan
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    906a. Terima Bantuan Sawit
                  </Label>
                  <Select
                    value={data["906a_terimaBantuanSawit"]?.toString()}
                    onValueChange={(value) =>
                      handleChange("906a_terimaBantuanSawit", parseInt(value))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Ya</SelectItem>
                      <SelectItem value="2">Tidak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    906b. Terima Bantuan Ikan Lele
                  </Label>
                  <Select
                    value={data["906b_terimaBantuanIkanLele"]?.toString()}
                    onValueChange={(value) =>
                      handleChange(
                        "906b_terimaBantuanIkanLele",
                        parseInt(value)
                      )
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Ya</SelectItem>
                      <SelectItem value="2">Tidak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    906c. Terima Bantuan Sayur/Buah
                  </Label>
                  <Select
                    value={data["906c_terimaBantuanSayurBuah"]?.toString()}
                    onValueChange={(value) =>
                      handleChange(
                        "906c_terimaBantuanSayurBuah",
                        parseInt(value)
                      )
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Ya</SelectItem>
                      <SelectItem value="2">Tidak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Keberlanjutan */}
            <div>
              <h4 className="font-medium text-slate-700 mb-3">
                Keberlanjutan Bantuan
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    907a. Lanjutan Bantuan Sawit
                  </Label>
                  <Select
                    value={data["907a_lanjutanBantuanSawit"]?.toString()}
                    onValueChange={(value) =>
                      handleChange("907a_lanjutanBantuanSawit", parseInt(value))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Ya</SelectItem>
                      <SelectItem value="2">Tidak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    907b. Lanjutan Bantuan Ikan Lele
                  </Label>
                  <Select
                    value={data["907b_lanjutanBantuanIkanLele"]?.toString()}
                    onValueChange={(value) =>
                      handleChange(
                        "907b_lanjutanBantuanIkanLele",
                        parseInt(value)
                      )
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Ya</SelectItem>
                      <SelectItem value="2">Tidak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    907c. Lanjutan Bantuan Sayur/Buah
                  </Label>
                  <Select
                    value={data["907c_lanjutanBantuanSayurBuah"]?.toString()}
                    onValueChange={(value) =>
                      handleChange(
                        "907c_lanjutanBantuanSayurBuah",
                        parseInt(value)
                      )
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Ya</SelectItem>
                      <SelectItem value="2">Tidak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Alasan Tidak Lanjut */}
            <div>
              <h4 className="font-medium text-slate-700 mb-3">
                Alasan Tidak Melanjutkan
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    908a. Alasan Tidak Lanjut Sawit
                  </Label>
                  <Input
                    value={data["908a_alasanTidakLanjutSawit"]}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      if (value.length <= 1) {
                        handleChange("908a_alasanTidakLanjutSawit", value);
                      }
                    }}
                    placeholder="A"
                    maxLength={1}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    908b. Alasan Tidak Lanjut Ikan Lele
                  </Label>
                  <Input
                    value={data["908b_alasanTidakLanjutIkanLele"]}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      if (value.length <= 1) {
                        handleChange("908b_alasanTidakLanjutIkanLele", value);
                      }
                    }}
                    placeholder="A"
                    maxLength={1}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    908c. Alasan Tidak Lanjut Sayur/Buah
                  </Label>
                  <Input
                    value={data["908c_alasanTidakLanjutSayurBuah"]}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      if (value.length <= 1) {
                        handleChange("908c_alasanTidakLanjutSayurBuah", value);
                      }
                    }}
                    placeholder="A"
                    maxLength={1}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Program Dukungan */}
            <div>
              <h4 className="font-medium text-slate-700 mb-3">
                Program Dukungan yang Diperlukan
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    909a. Program Dukung Sawit
                  </Label>
                  <Select
                    value={data["909a_programDukungSawit"]?.toString()}
                    onValueChange={(value) =>
                      handleChange("909a_programDukungSawit", parseInt(value))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Pelatihan</SelectItem>
                      <SelectItem value="2">Modal</SelectItem>
                      <SelectItem value="3">Pemasaran</SelectItem>
                      <SelectItem value="4">Teknologi</SelectItem>
                      <SelectItem value="5">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    909b. Program Dukung Ikan Lele
                  </Label>
                  <Select
                    value={data["909b_programDukungIkanLele"]?.toString()}
                    onValueChange={(value) =>
                      handleChange(
                        "909b_programDukungIkanLele",
                        parseInt(value)
                      )
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Pelatihan</SelectItem>
                      <SelectItem value="2">Modal</SelectItem>
                      <SelectItem value="3">Pemasaran</SelectItem>
                      <SelectItem value="4">Teknologi</SelectItem>
                      <SelectItem value="5">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    909c. Program Dukung Sayur/Buah
                  </Label>
                  <Select
                    value={data["909c_programDukungSayurBuah"]?.toString()}
                    onValueChange={(value) =>
                      handleChange(
                        "909c_programDukungSayurBuah",
                        parseInt(value)
                      )
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Pelatihan</SelectItem>
                      <SelectItem value="2">Modal</SelectItem>
                      <SelectItem value="3">Pemasaran</SelectItem>
                      <SelectItem value="4">Teknologi</SelectItem>
                      <SelectItem value="5">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
