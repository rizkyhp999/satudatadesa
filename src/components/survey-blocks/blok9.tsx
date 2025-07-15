"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Coins, Home, Car, MilkIcon as Cow, Gift, Sprout } from "lucide-react";
import type { Blok9 } from "@/types/survey";

interface Blok9ComponentProps {
  data: Blok9;
  onChange: (data: Blok9) => void;
}

const alasanTidakLanjutOptions = [
  { id: "A", label: "A. Kurangnya pemahaman" },
  { id: "B", label: "B. Kurangnya SDM" },
  { id: "C", label: "C. Kurangnya sarana" },
  { id: "D", label: "D. Kurangnya anggaran" },
  { id: "E", label: "E. Dimakan hama" },
  { id: "F", label: "F. Lahan yang kurang memadai" },
  { id: "G", label: "G. Cuaca yang tidak mendukung" },
];
const dukunganDiperlukanOptions = [
  { id: "A", label: "A. Pelatihan/penyuluhan" },
  { id: "B", label: "B. Program Satu Anggota Keluarga Satu Petani" },
  { id: "C", label: "C. Subsidi keperluan pertanian" },
  { id: "D", label: "D. Tersedia penampung hasil pertanian" },
  { id: "E", label: "E. Lainnya, tuliskan:" },
];
const lanjutanBantuanOptions = [
  { value: "1", label: "1. Lanjut, proses tanam/pembenihan" },
  { value: "2", label: "2. Lanjut, pernah panen" },
  { value: "3", label: "3. Tidak lanjut, pernah panen" },
  { value: "4", label: "4. Tidak lanjut, gagal panen" },
];

export function Blok9Component({ data, onChange }: Blok9ComponentProps) {
  const handleChange = useCallback(
    (field: keyof Blok9, value: any) => {
      onChange({ ...data, [field]: value });
    },
    [data, onChange]
  );

  const handleCheckboxChange = (
    field: keyof Blok9,
    optionId: string,
    checked: boolean
  ) => {
    const currentValues = (data[field] as string[]) || [];
    let newValues: string[];
    if (checked) {
      newValues = [...currentValues, optionId];
    } else {
      newValues = currentValues.filter((id) => id !== optionId);
    }
    handleChange(field, newValues);
  };

  // =====================================================================
  // KONDISI UNTUK LOGIKA DISABLE (TANPA useEffect)
  // =====================================================================

  const showCatatan904g = data["904g_BantuanDesa"] === 1;
  const showCatatan904h = data["904h_BantuanLainnya"] === 1;

  // Logika Bantuan Sawit
  const disableBantuanSawitLanjutan = data["905a_jenisBantuanSawit"] !== 1;
  const disableTerimaBantuanSawit =
    disableBantuanSawitLanjutan || data["906a_terimaBantuanSawit"] !== 1;
  const disableAlasanTidakLanjutSawit =
    disableTerimaBantuanSawit ||
    ![3, 4].includes(data["907a_lanjutanBantuanSawit"]);
  const showLainnyaDukungSawit =
    !disableTerimaBantuanSawit &&
    (data["909a_programDukungSawit"] || []).includes("E");

  // Logika Bantuan Ikan Lele
  const disableBantuanLeleLanjutan = data["905b_jenisBantuanIkanLele"] !== 1;
  const disableTerimaBantuanLele =
    disableBantuanLeleLanjutan || data["906b_terimaBantuanIkanLele"] !== 1;
  const disableAlasanTidakLanjutLele =
    disableTerimaBantuanLele ||
    ![3, 4].includes(data["907b_lanjutanBantuanIkanLele"]);
  const showLainnyaDukungLele =
    !disableTerimaBantuanLele &&
    (data["909b_programDukungIkanLele"] || []).includes("E");

  // Logika Bantuan Sayur/Buah
  const disableBantuanSayurLanjutan = data["905c_jenisBantuanSayurBuah"] !== 1;
  const disableTerimaBantuanSayur =
    disableBantuanSayurLanjutan || data["906c_terimaBantuanSayurBuah"] !== 1;
  const disableAlasanTidakLanjutSayur =
    disableTerimaBantuanSayur ||
    ![3, 4].includes(data["907c_lanjutanBantuanSayurBuah"]);
  const showLainnyaDukungSayur =
    !disableTerimaBantuanSayur &&
    (data["909c_programDukungSayurBuah"] || []).includes("E");

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
                901a. Jumlah Aset Lahan (jumlah)
              </Label>
              <Input
                type="number"
                min="0"
                value={data["901a_asetLahan"] || ""}
                onChange={(e) =>
                  handleChange("901a_asetLahan", Number(e.target.value) || 0)
                }
                placeholder="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">
                901b. Jumlah Aset Rumah Lain
              </Label>
              <Input
                type="number"
                min="0"
                value={data["901b_asetRumahLain"] || ""}
                onChange={(e) =>
                  handleChange(
                    "901b_asetRumahLain",
                    Number(e.target.value) || 0
                  )
                }
                placeholder="0"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
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
                  902a. Jumlah Tabung Gas ≥5.5kg
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={data["902a_tabungGas"] || ""}
                  onChange={(e) =>
                    handleChange("902a_tabungGas", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902b. Jumlah Kulkas
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={data["902b_kulkas"] || ""}
                  onChange={(e) =>
                    handleChange("902b_kulkas", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902c. Jumlah AC
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={data["902c_ac"] || ""}
                  onChange={(e) =>
                    handleChange("902c_ac", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902d. Jumlah TV (min 30 inci)
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={data["902d_tv"] || ""}
                  onChange={(e) =>
                    handleChange("902d_tv", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902e. Jumlah Emas (gram)
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={data["902e_emas"] || ""}
                  onChange={(e) =>
                    handleChange("902e_emas", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902f. Jumlah Komputer/Laptop
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={data["902f_komputer"] || ""}
                  onChange={(e) =>
                    handleChange("902f_komputer", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902g. Jumlah Sepeda Motor
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={data["902g_motor"] || ""}
                  onChange={(e) =>
                    handleChange("902g_motor", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902h. Jumlah Perahu Motor
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={data["902h_perahuMotor"] || ""}
                  onChange={(e) =>
                    handleChange(
                      "902h_perahuMotor",
                      Number(e.target.value) || 0
                    )
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902i. Jumlah Mobil
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={data["902i_mobil"] || ""}
                  onChange={(e) =>
                    handleChange("902i_mobil", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902j. Jumlah Sepeda
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={data["902j_sepeda"] || ""}
                  onChange={(e) =>
                    handleChange("902j_sepeda", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902k. Jumlah Perahu
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={data["902k_perahu"] || ""}
                  onChange={(e) =>
                    handleChange("902k_perahu", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  902l. Jumlah Smartphone
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={data["902l_smartphone"] || ""}
                  onChange={(e) =>
                    handleChange("902l_smartphone", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>
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
                  handleChange(
                    "903a_sapi",
                    Number.parseInt(e.target.value) || 0
                  )
                }
                placeholder="00"
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
                  handleChange(
                    "903b_kerbau",
                    Number.parseInt(e.target.value) || 0
                  )
                }
                placeholder="00"
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
                  handleChange(
                    "903c_kuda",
                    Number.parseInt(e.target.value) || 0
                  )
                }
                placeholder="00"
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
                  handleChange(
                    "903d_babi",
                    Number.parseInt(e.target.value) || 0
                  )
                }
                placeholder="00"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">
                903e. Jumlah Kambing/Domba
              </Label>
              <Input
                type="number"
                min="0"
                max="99"
                value={data["903e_kambing"] || ""}
                onChange={(e) =>
                  handleChange(
                    "903e_kambing",
                    Number.parseInt(e.target.value) || 0
                  )
                }
                placeholder="00"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Gift className="w-5 h-5 text-slate-600" />
              Bantuan Pemerintah (1 Tahun Terakhir)
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-y-4 gap-x-6">
            <div>
              <Label className="text-sm font-medium text-slate-700">
                904a. BPNT
              </Label>
              <Select
                value={data["904a_BPNT"]?.toString()}
                onValueChange={(value) =>
                  handleChange("904a_BPNT", Number.parseInt(value))
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
                  handleChange("904b_PKH", Number.parseInt(value))
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
                904c. BLT Desa
              </Label>
              <Select
                value={data["904c_BLTDesa"]?.toString()}
                onValueChange={(value) =>
                  handleChange("904c_BLTDesa", Number.parseInt(value))
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
                  handleChange("904d_SubsidiListrik", Number.parseInt(value))
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
                904e. Bantuan Pemda
              </Label>
              <Select
                value={data["904e_BantuanPemda"]?.toString()}
                onValueChange={(value) =>
                  handleChange("904e_BantuanPemda", Number.parseInt(value))
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
                  handleChange("904f_SubsidiPupuk", Number.parseInt(value))
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
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                904g. Bantuan Desa
              </Label>
              <Select
                value={data["904g_BantuanDesa"]?.toString()}
                onValueChange={(value) =>
                  handleChange("904g_BantuanDesa", Number.parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ya</SelectItem>
                  <SelectItem value="2">Tidak</SelectItem>
                </SelectContent>
              </Select>
              {showCatatan904g && (
                <Input
                  value={data["904g_catatan"] || ""}
                  onChange={(e) => handleChange("904g_catatan", e.target.value)}
                  placeholder="Sebutkan bantuan desa..."
                />
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                904h. Bantuan Lainnya
              </Label>
              <Select
                value={data["904h_BantuanLainnya"]?.toString()}
                onValueChange={(value) =>
                  handleChange("904h_BantuanLainnya", Number.parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ya</SelectItem>
                  <SelectItem value="2">Tidak</SelectItem>
                </SelectContent>
              </Select>
              {showCatatan904h && (
                <Input
                  value={data["904h_catatan"] || ""}
                  onChange={(e) => handleChange("904h_catatan", e.target.value)}
                  placeholder="Sebutkan bantuan lainnya..."
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sprout className="w-5 h-5 text-slate-600" />
              Bantuan Khusus Pertanian
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 border rounded-md space-y-4">
              <h4 className="font-semibold text-slate-800">Bantuan Sawit</h4>
              <div>
                <Label className="text-sm font-medium">
                  905a. Pernah terima bantuan sawit?
                </Label>
                <Select
                  value={data["905a_jenisBantuanSawit"]?.toString()}
                  onValueChange={(v) =>
                    handleChange("905a_jenisBantuanSawit", Number.parseInt(v))
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
              <div className={`${disableBantuanSawitLanjutan && "opacity-50"}`}>
                <Label
                  className={`text-sm font-medium ${
                    disableBantuanSawitLanjutan && "text-slate-400"
                  }`}
                >
                  906a. Terima bantuan sawit 1 tahun terakhir?
                </Label>
                <Select
                  disabled={disableBantuanSawitLanjutan}
                  value={data["906a_terimaBantuanSawit"]?.toString()}
                  onValueChange={(v) =>
                    handleChange("906a_terimaBantuanSawit", Number.parseInt(v))
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
              <div className={`${disableTerimaBantuanSawit && "opacity-50"}`}>
                <Label
                  className={`text-sm font-medium ${
                    disableTerimaBantuanSawit && "text-slate-400"
                  }`}
                >
                  907a. Keberlanjutan Bantuan Sawit
                </Label>
                <Select
                  disabled={disableTerimaBantuanSawit}
                  value={data["907a_lanjutanBantuanSawit"]?.toString()}
                  onValueChange={(v) =>
                    handleChange(
                      "907a_lanjutanBantuanSawit",
                      Number.parseInt(v)
                    )
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {lanjutanBantuanOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div
                className={`${disableAlasanTidakLanjutSawit && "opacity-50"}`}
              >
                <Label
                  className={`text-sm font-medium ${
                    disableAlasanTidakLanjutSawit && "text-slate-400"
                  }`}
                >
                  908a. Alasan Tidak Lanjut Sawit
                </Label>
                <div className="space-y-2 mt-2">
                  {alasanTidakLanjutOptions.map((opt) => (
                    <div key={opt.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`908a-${opt.id}`}
                        disabled={disableAlasanTidakLanjutSawit}
                        checked={(
                          data["908a_alasanTidakLanjutSawit"] || []
                        ).includes(opt.id)}
                        onCheckedChange={(c) =>
                          handleCheckboxChange(
                            "908a_alasanTidakLanjutSawit",
                            opt.id,
                            !!c
                          )
                        }
                      />
                      <label
                        htmlFor={`908a-${opt.id}`}
                        className="text-sm font-normal"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${disableTerimaBantuanSawit && "opacity-50"}`}>
                <Label
                  className={`text-sm font-medium ${
                    disableTerimaBantuanSawit && "text-slate-400"
                  }`}
                >
                  909a. Program Dukungan Sawit Diperlukan
                </Label>
                <div className="space-y-2 mt-2">
                  {dukunganDiperlukanOptions.map((opt) => (
                    <div key={opt.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`909a-${opt.id}`}
                        disabled={disableTerimaBantuanSawit}
                        checked={(
                          data["909a_programDukungSawit"] || []
                        ).includes(opt.id)}
                        onCheckedChange={(c) =>
                          handleCheckboxChange(
                            "909a_programDukungSawit",
                            opt.id,
                            !!c
                          )
                        }
                      />
                      <label
                        htmlFor={`909a-${opt.id}`}
                        className="text-sm font-normal"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))}
                  {showLainnyaDukungSawit && (
                    <Input
                      disabled={disableTerimaBantuanSawit}
                      value={data["909a_lainnya"] || ""}
                      onChange={(e) =>
                        handleChange("909a_lainnya", e.target.value)
                      }
                      placeholder="Sebutkan dukungan lainnya..."
                      className="mt-2"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-md space-y-4">
              <h4 className="font-semibold text-slate-800">
                Bantuan Ikan Lele
              </h4>
              <div>
                <Label className="text-sm font-medium">
                  905b. Pernah terima bantuan ikan lele?
                </Label>
                <Select
                  value={data["905b_jenisBantuanIkanLele"]?.toString()}
                  onValueChange={(v) =>
                    handleChange(
                      "905b_jenisBantuanIkanLele",
                      Number.parseInt(v)
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
              <div className={`${disableBantuanLeleLanjutan && "opacity-50"}`}>
                <Label
                  className={`text-sm font-medium ${
                    disableBantuanLeleLanjutan && "text-slate-400"
                  }`}
                >
                  906b. Terima bantuan lele 1 tahun terakhir?
                </Label>
                <Select
                  disabled={disableBantuanLeleLanjutan}
                  value={data["906b_terimaBantuanIkanLele"]?.toString()}
                  onValueChange={(v) =>
                    handleChange(
                      "906b_terimaBantuanIkanLele",
                      Number.parseInt(v)
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
              <div className={`${disableTerimaBantuanLele && "opacity-50"}`}>
                <Label
                  className={`text-sm font-medium ${
                    disableTerimaBantuanLele && "text-slate-400"
                  }`}
                >
                  907b. Keberlanjutan Bantuan Lele
                </Label>
                <Select
                  disabled={disableTerimaBantuanLele}
                  value={data["907b_lanjutanBantuanIkanLele"]?.toString()}
                  onValueChange={(v) =>
                    handleChange(
                      "907b_lanjutanBantuanIkanLele",
                      Number.parseInt(v)
                    )
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {lanjutanBantuanOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div
                className={`${disableAlasanTidakLanjutLele && "opacity-50"}`}
              >
                <Label
                  className={`text-sm font-medium ${
                    disableAlasanTidakLanjutLele && "text-slate-400"
                  }`}
                >
                  908b. Alasan Tidak Lanjut Lele
                </Label>
                <div className="space-y-2 mt-2">
                  {alasanTidakLanjutOptions.map((opt) => (
                    <div key={opt.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`908b-${opt.id}`}
                        disabled={disableAlasanTidakLanjutLele}
                        checked={(
                          data["908b_alasanTidakLanjutIkanLele"] || []
                        ).includes(opt.id)}
                        onCheckedChange={(c) =>
                          handleCheckboxChange(
                            "908b_alasanTidakLanjutIkanLele",
                            opt.id,
                            !!c
                          )
                        }
                      />
                      <label
                        htmlFor={`908b-${opt.id}`}
                        className="text-sm font-normal"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${disableTerimaBantuanLele && "opacity-50"}`}>
                <Label
                  className={`text-sm font-medium ${
                    disableTerimaBantuanLele && "text-slate-400"
                  }`}
                >
                  909b. Program Dukungan Lele Diperlukan
                </Label>
                <div className="space-y-2 mt-2">
                  {dukunganDiperlukanOptions.map((opt) => (
                    <div key={opt.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`909b-${opt.id}`}
                        disabled={disableTerimaBantuanLele}
                        checked={(
                          data["909b_programDukungIkanLele"] || []
                        ).includes(opt.id)}
                        onCheckedChange={(c) =>
                          handleCheckboxChange(
                            "909b_programDukungIkanLele",
                            opt.id,
                            !!c
                          )
                        }
                      />
                      <label
                        htmlFor={`909b-${opt.id}`}
                        className="text-sm font-normal"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))}
                  {showLainnyaDukungLele && (
                    <Input
                      disabled={disableTerimaBantuanLele}
                      value={data["909b_lainnya"] || ""}
                      onChange={(e) =>
                        handleChange("909b_lainnya", e.target.value)
                      }
                      placeholder="Sebutkan dukungan lainnya..."
                      className="mt-2"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-md space-y-4">
              <h4 className="font-semibold text-slate-800">
                Bantuan Sayur / Buah
              </h4>
              <div>
                <Label className="text-sm font-medium">
                  905c. Pernah terima bantuan sayur/buah?
                </Label>
                <Select
                  value={data["905c_jenisBantuanSayurBuah"]?.toString()}
                  onValueChange={(v) =>
                    handleChange(
                      "905c_jenisBantuanSayurBuah",
                      Number.parseInt(v)
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
              <div className={`${disableBantuanSayurLanjutan && "opacity-50"}`}>
                <Label
                  className={`text-sm font-medium ${
                    disableBantuanSayurLanjutan && "text-slate-400"
                  }`}
                >
                  906c. Terima bantuan sayur/buah 1 tahun terakhir?
                </Label>
                <Select
                  disabled={disableBantuanSayurLanjutan}
                  value={data["906c_terimaBantuanSayurBuah"]?.toString()}
                  onValueChange={(v) =>
                    handleChange(
                      "906c_terimaBantuanSayurBuah",
                      Number.parseInt(v)
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
              <div className={`${disableTerimaBantuanSayur && "opacity-50"}`}>
                <Label
                  className={`text-sm font-medium ${
                    disableTerimaBantuanSayur && "text-slate-400"
                  }`}
                >
                  907c. Keberlanjutan Bantuan Sayur/Buah
                </Label>
                <Select
                  disabled={disableTerimaBantuanSayur}
                  value={data["907c_lanjutanBantuanSayurBuah"]?.toString()}
                  onValueChange={(v) =>
                    handleChange(
                      "907c_lanjutanBantuanSayurBuah",
                      Number.parseInt(v)
                    )
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {lanjutanBantuanOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div
                className={`${disableAlasanTidakLanjutSayur && "opacity-50"}`}
              >
                <Label
                  className={`text-sm font-medium ${
                    disableAlasanTidakLanjutSayur && "text-slate-400"
                  }`}
                >
                  908c. Alasan Tidak Lanjut Sayur/Buah
                </Label>
                <div className="space-y-2 mt-2">
                  {alasanTidakLanjutOptions.map((opt) => (
                    <div key={opt.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`908c-${opt.id}`}
                        disabled={disableAlasanTidakLanjutSayur}
                        checked={(
                          data["908c_alasanTidakLanjutSayurBuah"] || []
                        ).includes(opt.id)}
                        onCheckedChange={(c) =>
                          handleCheckboxChange(
                            "908c_alasanTidakLanjutSayurBuah",
                            opt.id,
                            !!c
                          )
                        }
                      />
                      <label
                        htmlFor={`908c-${opt.id}`}
                        className="text-sm font-normal"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${disableTerimaBantuanSayur && "opacity-50"}`}>
                <Label
                  className={`text-sm font-medium ${
                    disableTerimaBantuanSayur && "text-slate-400"
                  }`}
                >
                  909c. Program Dukungan Sayur/Buah Diperlukan
                </Label>
                <div className="space-y-2 mt-2">
                  {dukunganDiperlukanOptions.map((opt) => (
                    <div key={opt.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`909c-${opt.id}`}
                        disabled={disableTerimaBantuanSayur}
                        checked={(
                          data["909c_programDukungSayurBuah"] || []
                        ).includes(opt.id)}
                        onCheckedChange={(c) =>
                          handleCheckboxChange(
                            "909c_programDukungSayurBuah",
                            opt.id,
                            !!c
                          )
                        }
                      />
                      <label
                        htmlFor={`909c-${opt.id}`}
                        className="text-sm font-normal"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))}
                  {showLainnyaDukungSayur && (
                    <Input
                      disabled={disableTerimaBantuanSayur}
                      value={data["909c_lainnya"] || ""}
                      onChange={(e) =>
                        handleChange("909c_lainnya", e.target.value)
                      }
                      placeholder="Sebutkan dukungan lainnya..."
                      className="mt-2"
                    />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
