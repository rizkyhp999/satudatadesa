"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserPlus,
  UserMinus,
  Users,
  GraduationCap,
  Briefcase,
  Heart,
  Shield,
} from "lucide-react";
import type {
  AnggotaKeluarga,
  Blok4,
  Blok5,
  Blok6,
  Blok7,
} from "@/types/survey";

interface FamilyMember {
  blok3: AnggotaKeluarga;
  blok4: Blok4;
  blok5: Blok5;
  blok6: Blok6;
  blok7: Blok7;
}

interface Blok3to7ComponentProps {
  data: FamilyMember[];
  onChange: (data: FamilyMember[]) => void;
}

const createEmptyMember = (nomorUrut: number): FamilyMember => ({
  blok3: {
    "301_nomorUrut": nomorUrut,
    "302_nama": "",
    "303_nik": 0,
    "304_keteranganKeberadaan": 0,
    "305_kecDesaSaatIni": "",
    "306_provKabSaatIni": "",
    "307_negaraSaatIni": "",
    "308_jenisKelamin": 0,
    "309_tanggalLahir": "",
    "310_umur": 0,
    "311_statusPerkawinan": 0,
    "312_hubunganDenganKK": 0,
    "313_sedangHamil": 0,
    "314_usiaKehamilan": 0,
  },
  blok4: {
    "401_partisipasiSekolah": 0,
    "402_jenjangPendidikan": 0,
    "403_kelasTertinggi": 0,
    "404_ijazahTertinggi": 0,
  },
  blok5: {
    "501_bekerjaMingguLalu": 0,
    "502_lapanganUsahaUtama": "",
    "503_statusPekerjaanUtama": 0,
    "504_pendapatanSebulanTerakhir": "",
    "505_kepemilikanNPWP": 0,
    "506_memilikiUsaha": 0,
    "507_jumlahUsaha": 0,
    "508_lapanganUsahaSendiri": "",
    "509_statusUsaha": 0,
    "510_jumlahPekerjaTidakDibayar": 0,
    "511_jumlahPekerjaDibayar": 0,
    "512_kepemilikanIzinUsaha": 0,
    "513_pendapatanUsahaSebulan": 0,
  },
  blok6: {
    "601_statusDisabilitas": 0,
    "602_kondisiGizi": 0,
    "603_keluhanKesehatanKronis": 0,
    "604_memilikiWali": 0,
  },
  blok7: {
    "701_jaminanKesehatan": 0,
    "702_jaminanKetenagakerjaan": 0,
    "703_ikutProgramPIP": 0,
  },
});

export function Blok3to7Component({ data, onChange }: Blok3to7ComponentProps) {
  const [selectedMember, setSelectedMember] = useState(0);

  const addMember = () => {
    const newMember = createEmptyMember(data.length + 1);
    onChange([...data, newMember]);
  };

  const removeMember = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    // Update nomor urut
    const updatedData = newData.map((member, i) => ({
      ...member,
      blok3: { ...member.blok3, "301_nomorUrut": i + 1 },
    }));
    onChange(updatedData);
    if (selectedMember >= updatedData.length && updatedData.length > 0) {
      setSelectedMember(updatedData.length - 1);
    }
  };

  const updateMember = (
    index: number,
    block: keyof FamilyMember,
    field: string,
    value: any
  ) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [block]: {
        ...newData[index][block],
        [field]: value,
      },
    };
    onChange(newData);
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-700 mb-2">
          Belum Ada Anggota Keluarga
        </h3>
        <p className="text-slate-500 mb-6">
          Tambahkan anggota keluarga untuk melanjutkan
        </p>
        <Button onClick={addMember} className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Tambah Anggota Keluarga
        </Button>
      </div>
    );
  }

  const currentMember = data[selectedMember];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-800">
              Data Anggota Keluarga
            </h3>
            <p className="text-slate-600">
              Informasi detail setiap anggota keluarga
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={addMember}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Tambah
          </Button>
          {data.length > 0 && (
            <Button
              onClick={() => removeMember(selectedMember)}
              size="sm"
              variant="destructive"
            >
              <UserMinus className="w-4 h-4 mr-1" />
              Hapus
            </Button>
          )}
        </div>
      </div>

      {/* Member Selection */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-600">
            Pilih Anggota Keluarga
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data.map((member, index) => (
              <Button
                key={index}
                variant={selectedMember === index ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMember(index)}
                className="flex items-center gap-2"
              >
                <Badge variant="secondary" className="text-xs">
                  {index + 1}
                </Badge>
                {member.blok3["302_nama"] || `Anggota ${index + 1}`}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Member Details */}
      <Tabs defaultValue="blok3" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="blok3" className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Identitas</span>
          </TabsTrigger>
          <TabsTrigger value="blok4" className="flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">Pendidikan</span>
          </TabsTrigger>
          <TabsTrigger value="blok5" className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span className="hidden sm:inline">Pekerjaan</span>
          </TabsTrigger>
          <TabsTrigger value="blok6" className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Kesehatan</span>
          </TabsTrigger>
          <TabsTrigger value="blok7" className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Jaminan</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blok3" className="mt-6">
          <Blok3Form
            data={currentMember.blok3}
            onChange={(field, value) =>
              updateMember(selectedMember, "blok3", field, value)
            }
          />
        </TabsContent>

        <TabsContent value="blok4" className="mt-6">
          <Blok4Form
            data={currentMember.blok4}
            onChange={(field, value) =>
              updateMember(selectedMember, "blok4", field, value)
            }
          />
        </TabsContent>

        <TabsContent value="blok5" className="mt-6">
          <Blok5Form
            data={currentMember.blok5}
            onChange={(field, value) =>
              updateMember(selectedMember, "blok5", field, value)
            }
          />
        </TabsContent>

        <TabsContent value="blok6" className="mt-6">
          <Blok6Form
            data={currentMember.blok6}
            onChange={(field, value) =>
              updateMember(selectedMember, "blok6", field, value)
            }
          />
        </TabsContent>

        <TabsContent value="blok7" className="mt-6">
          <Blok7Form
            data={currentMember.blok7}
            onChange={(field, value) =>
              updateMember(selectedMember, "blok7", field, value)
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Blok 3 Form Component
function Blok3Form({
  data,
  onChange,
}: {
  data: AnggotaKeluarga;
  onChange: (field: string, value: any) => void;
}) {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-slate-600" />
          Blok 3: Identitas Anggota Keluarga
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              302. Nama Anggota Keluarga
            </Label>
            <Input
              value={data["302_nama"]}
              onChange={(e) => onChange("302_nama", e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              303. NIK (16 digit)
            </Label>
            <Input
              type="number"
              value={data["303_nik"] || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 16) {
                  onChange("303_nik", parseInt(value) || 0);
                }
              }}
              placeholder="1234567890123456"
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              308. Jenis Kelamin
            </Label>
            <Select
              value={data["308_jenisKelamin"]?.toString()}
              onValueChange={(value) =>
                onChange("308_jenisKelamin", parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Laki-laki</SelectItem>
                <SelectItem value="2">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              309. Tanggal Lahir
            </Label>
            <Input
              type="date"
              value={data["309_tanggalLahir"]}
              onChange={(e) => onChange("309_tanggalLahir", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              310. Umur
            </Label>
            <Input
              type="number"
              min="0"
              max="99"
              value={data["310_umur"] || ""}
              onChange={(e) =>
                onChange("310_umur", parseInt(e.target.value) || 0)
              }
              placeholder="0"
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              311. Status Perkawinan
            </Label>
            <Select
              value={data["311_statusPerkawinan"]?.toString()}
              onValueChange={(value) =>
                onChange("311_statusPerkawinan", parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Belum Kawin</SelectItem>
                <SelectItem value="2">Kawin</SelectItem>
                <SelectItem value="3">Cerai Hidup</SelectItem>
                <SelectItem value="4">Cerai Mati</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              312. Hubungan dengan KK
            </Label>
            <Select
              value={data["312_hubunganDenganKK"]?.toString()}
              onValueChange={(value) =>
                onChange("312_hubunganDenganKK", parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih hubungan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Kepala Keluarga</SelectItem>
                <SelectItem value="2">Istri/Suami</SelectItem>
                <SelectItem value="3">Anak</SelectItem>
                <SelectItem value="4">Menantu</SelectItem>
                <SelectItem value="5">Cucu</SelectItem>
                <SelectItem value="6">Orang Tua</SelectItem>
                <SelectItem value="7">Mertua</SelectItem>
                <SelectItem value="8">Famili Lain</SelectItem>
                <SelectItem value="9">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Blok 4 Form Component
function Blok4Form({
  data,
  onChange,
}: {
  data: Blok4;
  onChange: (field: string, value: any) => void;
}) {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-slate-600" />
          Blok 4: Pendidikan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              401. Partisipasi Sekolah
            </Label>
            <Select
              value={data["401_partisipasiSekolah"]?.toString()}
              onValueChange={(value) =>
                onChange("401_partisipasiSekolah", parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Tidak/Belum Pernah Sekolah</SelectItem>
                <SelectItem value="2">Masih Sekolah</SelectItem>
                <SelectItem value="3">Tidak Sekolah Lagi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              402. Jenjang Pendidikan Tertinggi
            </Label>
            <Select
              value={data["402_jenjangPendidikan"]?.toString()}
              onValueChange={(value) =>
                onChange("402_jenjangPendidikan", parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih jenjang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Tidak/Belum Sekolah</SelectItem>
                <SelectItem value="2">SD/Sederajat</SelectItem>
                <SelectItem value="3">SMP/Sederajat</SelectItem>
                <SelectItem value="4">SMA/Sederajat</SelectItem>
                <SelectItem value="5">Diploma</SelectItem>
                <SelectItem value="6">Sarjana</SelectItem>
                <SelectItem value="7">Pascasarjana</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Blok 5 Form Component
function Blok5Form({
  data,
  onChange,
}: {
  data: Blok5;
  onChange: (field: string, value: any) => void;
}) {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-slate-600" />
          Blok 5: Ketenagakerjaan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              501. Bekerja Minggu Lalu
            </Label>
            <Select
              value={data["501_bekerjaMingguLalu"]?.toString()}
              onValueChange={(value) =>
                onChange("501_bekerjaMingguLalu", parseInt(value))
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
              502. Lapangan Usaha Utama
            </Label>
            <Input
              value={data["502_lapanganUsahaUtama"]}
              onChange={(e) =>
                onChange("502_lapanganUsahaUtama", e.target.value)
              }
              placeholder="Contoh: Pertanian, Perdagangan, dll"
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Blok 6 Form Component
function Blok6Form({
  data,
  onChange,
}: {
  data: Blok6;
  onChange: (field: string, value: any) => void;
}) {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-slate-600" />
          Blok 6: Kesehatan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              601. Status Disabilitas
            </Label>
            <Select
              value={data["601_statusDisabilitas"]?.toString()}
              onValueChange={(value) =>
                onChange("601_statusDisabilitas", parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Tidak Ada</SelectItem>
                <SelectItem value="2">Ada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              602. Kondisi Gizi
            </Label>
            <Select
              value={data["602_kondisiGizi"]?.toString()}
              onValueChange={(value) =>
                onChange("602_kondisiGizi", parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih kondisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Baik</SelectItem>
                <SelectItem value="2">Kurang</SelectItem>
                <SelectItem value="3">Buruk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Blok 7 Form Component
function Blok7Form({
  data,
  onChange,
}: {
  data: Blok7;
  onChange: (field: string, value: any) => void;
}) {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-slate-600" />
          Blok 7: Jaminan Sosial
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              701. Jaminan Kesehatan
            </Label>
            <Select
              value={data["701_jaminanKesehatan"]?.toString()}
              onValueChange={(value) =>
                onChange("701_jaminanKesehatan", parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">BPJS Kesehatan</SelectItem>
                <SelectItem value="2">Asuransi Swasta</SelectItem>
                <SelectItem value="3">Tidak Ada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              703. Program Indonesia Pintar
            </Label>
            <Select
              value={data["703_ikutProgramPIP"]?.toString()}
              onValueChange={(value) =>
                onChange("703_ikutProgramPIP", parseInt(value))
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
  );
}
