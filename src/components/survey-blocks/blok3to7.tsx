"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
      <CardContent className="space-y-6">
        {/* Identitas Dasar */}
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
                  onChange("303_nik", Number.parseInt(value) || 0);
                }
              }}
              placeholder="1234567890123456"
              className="mt-1"
            />
          </div>
        </div>

        {/* Keterangan Keberadaan */}
        <div>
          <Label className="text-sm font-medium text-slate-700">
            304. Keterangan Keberadaan Keluarga (1 digit)
          </Label>
          <Select
            value={data["304_keteranganKeberadaan"]?.toString()}
            onValueChange={(value) =>
              onChange("304_keteranganKeberadaan", Number.parseInt(value))
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Pilih keterangan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Ada</SelectItem>
              <SelectItem value="2">Tidak Ada Sementara</SelectItem>
              <SelectItem value="3">Tidak Ada Permanen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tempat Tinggal */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              305. Kecamatan dan Desa Tempat Tinggal Saat Ini
            </Label>
            <Input
              value={data["305_kecDesaSaatIni"]}
              onChange={(e) => onChange("305_kecDesaSaatIni", e.target.value)}
              placeholder="Nama Kecamatan/Desa + Kode 3 digit (contoh: Bandung 001)"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              306. Provinsi dan Kabupaten/Kota Tempat Tinggal Saat Ini
            </Label>
            <Input
              value={data["306_provKabSaatIni"]}
              onChange={(e) => onChange("306_provKabSaatIni", e.target.value)}
              placeholder="Nama Provinsi/Kabupaten + Kode 2 digit (contoh: Jawa Barat 32)"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              307. Negara Tempat Tinggal Saat Ini
            </Label>
            <Input
              value={data["307_negaraSaatIni"]}
              onChange={(e) => onChange("307_negaraSaatIni", e.target.value)}
              placeholder="Nama Negara + Kode 2 digit (contoh: Indonesia 01)"
              className="mt-1"
            />
          </div>
        </div>

        {/* Data Demografis */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              308. Jenis Kelamin (1 digit)
            </Label>
            <Select
              value={data["308_jenisKelamin"]?.toString()}
              onValueChange={(value) =>
                onChange("308_jenisKelamin", Number.parseInt(value))
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
              309. Tanggal Lahir (dd/mm/yyyy)
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
              310. Umur (2 digit)
            </Label>
            <Input
              type="number"
              min="0"
              max="99"
              value={data["310_umur"] || ""}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value);
                if (value >= 0 && value <= 99) {
                  onChange("310_umur", value || 0);
                }
              }}
              placeholder="00"
              className="mt-1"
            />
          </div>
        </div>

        {/* Status dan Hubungan */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              311. Status Perkawinan (1 digit)
            </Label>
            <Select
              value={data["311_statusPerkawinan"]?.toString()}
              onValueChange={(value) =>
                onChange("311_statusPerkawinan", Number.parseInt(value))
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
              312. Hubungan dengan Kepala Keluarga (1 digit)
            </Label>
            <Select
              value={data["312_hubunganDenganKK"]?.toString()}
              onValueChange={(value) =>
                onChange("312_hubunganDenganKK", Number.parseInt(value))
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

        {/* Kehamilan (khusus perempuan) */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              313. Apakah Saat Ini Sedang Hamil (1 digit)
            </Label>
            <Select
              value={data["313_sedangHamil"]?.toString()}
              onValueChange={(value) =>
                onChange("313_sedangHamil", Number.parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Ya</SelectItem>
                <SelectItem value="2">Tidak</SelectItem>
                <SelectItem value="3">Tidak Berlaku</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              314. Usia Kehamilan dalam Bulan (1 digit)
            </Label>
            <Input
              type="number"
              min="0"
              max="9"
              value={data["314_usiaKehamilan"] || ""}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value);
                if (value >= 0 && value <= 9) {
                  onChange("314_usiaKehamilan", value || 0);
                }
              }}
              placeholder="0"
              className="mt-1"
            />
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
              401. Partisipasi Sekolah (1 digit)
            </Label>
            <Select
              value={data["401_partisipasiSekolah"]?.toString()}
              onValueChange={(value) =>
                onChange("401_partisipasiSekolah", Number.parseInt(value))
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
              402. Jenjang Pendidikan Tertinggi (2 digit)
            </Label>
            <Select
              value={data["402_jenjangPendidikan"]?.toString()}
              onValueChange={(value) =>
                onChange("402_jenjangPendidikan", Number.parseInt(value))
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
                <SelectItem value="5">Diploma I/II</SelectItem>
                <SelectItem value="6">Diploma III</SelectItem>
                <SelectItem value="7">Diploma IV/S1</SelectItem>
                <SelectItem value="8">S2</SelectItem>
                <SelectItem value="9">S3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              403. Kelas Tertinggi yang Sedang/Pernah Diduduki (1 digit)
            </Label>
            <Input
              type="number"
              min="0"
              max="9"
              value={data["403_kelasTertinggi"] || ""}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value);
                if (value >= 0 && value <= 9) {
                  onChange("403_kelasTertinggi", value || 0);
                }
              }}
              placeholder="0"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              404. Ijazah Tertinggi yang Dimiliki (2 digit)
            </Label>
            <Select
              value={data["404_ijazahTertinggi"]?.toString()}
              onValueChange={(value) =>
                onChange("404_ijazahTertinggi", Number.parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih ijazah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Tidak Punya Ijazah</SelectItem>
                <SelectItem value="2">SD/Sederajat</SelectItem>
                <SelectItem value="3">SMP/Sederajat</SelectItem>
                <SelectItem value="4">SMA/Sederajat</SelectItem>
                <SelectItem value="5">Diploma I/II</SelectItem>
                <SelectItem value="6">Diploma III</SelectItem>
                <SelectItem value="7">Diploma IV/S1</SelectItem>
                <SelectItem value="8">S2</SelectItem>
                <SelectItem value="9">S3</SelectItem>
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
      <CardContent className="space-y-6">
        {/* Pekerjaan Utama */}
        <div className="space-y-4">
          <h4 className="font-medium text-slate-700">Pekerjaan Utama</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">
                501. Bekerja/Membantu Bekerja Seminggu Lalu (1 digit)
              </Label>
              <Select
                value={data["501_bekerjaMingguLalu"]?.toString()}
                onValueChange={(value) =>
                  onChange("501_bekerjaMingguLalu", Number.parseInt(value))
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
                502. Lapangan Usaha Pekerjaan Utama (string + 2 digit)
              </Label>
              <Input
                value={data["502_lapanganUsahaUtama"]}
                onChange={(e) =>
                  onChange("502_lapanganUsahaUtama", e.target.value)
                }
                placeholder="Contoh: Pertanian 01, Perdagangan 47"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">
                503. Status dalam Pekerjaan Utama (1 digit)
              </Label>
              <Select
                value={data["503_statusPekerjaanUtama"]?.toString()}
                onValueChange={(value) =>
                  onChange("503_statusPekerjaanUtama", Number.parseInt(value))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Berusaha Sendiri</SelectItem>
                  <SelectItem value="2">
                    Berusaha Dibantu Buruh Tidak Tetap
                  </SelectItem>
                  <SelectItem value="3">
                    Berusaha Dibantu Buruh Tetap
                  </SelectItem>
                  <SelectItem value="4">Buruh/Karyawan/Pegawai</SelectItem>
                  <SelectItem value="5">Pekerja Bebas</SelectItem>
                  <SelectItem value="6">Pekerja Keluarga</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">
                504. Pendapatan Sebulan Terakhir (string)
              </Label>
              <Input
                value={data["504_pendapatanSebulanTerakhir"]}
                onChange={(e) =>
                  onChange("504_pendapatanSebulanTerakhir", e.target.value)
                }
                placeholder="Contoh: 2500000"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-700">
              505. Kepemilikan NPWP (1 digit)
            </Label>
            <Select
              value={data["505_kepemilikanNPWP"]?.toString()}
              onValueChange={(value) =>
                onChange("505_kepemilikanNPWP", Number.parseInt(value))
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

        {/* Usaha Sendiri */}
        <div className="space-y-4">
          <h4 className="font-medium text-slate-700">Usaha Sendiri/Bersama</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">
                506. Memiliki Usaha Sendiri/Bersama (1 digit)
              </Label>
              <Select
                value={data["506_memilikiUsaha"]?.toString()}
                onValueChange={(value) =>
                  onChange("506_memilikiUsaha", Number.parseInt(value))
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
                507. Jumlah Usaha Sendiri/Bersama (2 digit)
              </Label>
              <Input
                type="number"
                min="0"
                max="99"
                value={data["507_jumlahUsaha"] || ""}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value);
                  if (value >= 0 && value <= 99) {
                    onChange("507_jumlahUsaha", value || 0);
                  }
                }}
                placeholder="00"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">
                508. Lapangan Usaha Utama (string + 2 digit)
              </Label>
              <Input
                value={data["508_lapanganUsahaSendiri"]}
                onChange={(e) =>
                  onChange("508_lapanganUsahaSendiri", e.target.value)
                }
                placeholder="Contoh: Warung Makan 56"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">
                509. Status dalam Usaha Utama (1 digit)
              </Label>
              <Select
                value={data["509_statusUsaha"]?.toString()}
                onValueChange={(value) =>
                  onChange("509_statusUsaha", Number.parseInt(value))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Sendiri</SelectItem>
                  <SelectItem value="2">Bersama</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">
                510. Jumlah Pekerja Tidak Dibayar (2 digit)
              </Label>
              <Input
                type="number"
                min="0"
                max="99"
                value={data["510_jumlahPekerjaTidakDibayar"] || ""}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value);
                  if (value >= 0 && value <= 99) {
                    onChange("510_jumlahPekerjaTidakDibayar", value || 0);
                  }
                }}
                placeholder="00"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">
                511. Jumlah Pekerja Dibayar (2 digit)
              </Label>
              <Input
                type="number"
                min="0"
                max="99"
                value={data["511_jumlahPekerjaDibayar"] || ""}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value);
                  if (value >= 0 && value <= 99) {
                    onChange("511_jumlahPekerjaDibayar", value || 0);
                  }
                }}
                placeholder="00"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">
                512. Kepemilikan Izin Usaha (2 digit)
              </Label>
              <Select
                value={data["512_kepemilikanIzinUsaha"]?.toString()}
                onValueChange={(value) =>
                  onChange("512_kepemilikanIzinUsaha", Number.parseInt(value))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ada, Lengkap</SelectItem>
                  <SelectItem value="2">Ada, Tidak Lengkap</SelectItem>
                  <SelectItem value="3">Tidak Ada</SelectItem>
                  <SelectItem value="4">Tidak Tahu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">
                513. Pendapatan Usaha Sebulan Terakhir (1 digit)
              </Label>
              <Select
                value={data["513_pendapatanUsahaSebulan"]?.toString()}
                onValueChange={(value) =>
                  onChange("513_pendapatanUsahaSebulan", Number.parseInt(value))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">{"< 1 Juta"}</SelectItem>
                  <SelectItem value="2">1-2 Juta</SelectItem>
                  <SelectItem value="3">2-5 Juta</SelectItem>
                  <SelectItem value="4">5-10 Juta</SelectItem>
                  <SelectItem value="5">{"> 10 Juta"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              601. Status Disabilitas (1 digit)
            </Label>
            <Select
              value={data["601_statusDisabilitas"]?.toString()}
              onValueChange={(value) =>
                onChange("601_statusDisabilitas", Number.parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Tidak Ada Kesulitan</SelectItem>
                <SelectItem value="2">Ada Kesulitan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              602. Kondisi Gizi Anak (1 digit)
            </Label>
            <Select
              value={data["602_kondisiGizi"]?.toString()}
              onValueChange={(value) =>
                onChange("602_kondisiGizi", Number.parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih kondisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Baik</SelectItem>
                <SelectItem value="2">Kurang</SelectItem>
                <SelectItem value="3">Buruk</SelectItem>
                <SelectItem value="4">Tidak Berlaku</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              603. Keluhan Kesehatan Kronis/Menahun (2 digit)
            </Label>
            <Select
              value={data["603_keluhanKesehatanKronis"]?.toString()}
              onValueChange={(value) =>
                onChange("603_keluhanKesehatanKronis", Number.parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Tidak Ada</SelectItem>
                <SelectItem value="2">
                  Ada, Tidak Mengganggu Aktivitas
                </SelectItem>
                <SelectItem value="3">Ada, Mengganggu Aktivitas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              604. Memiliki Wali/Pengasuh (1 digit)
            </Label>
            <Select
              value={data["604_memilikiWali"]?.toString()}
              onValueChange={(value) =>
                onChange("604_memilikiWali", Number.parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Ya</SelectItem>
                <SelectItem value="2">Tidak</SelectItem>
                <SelectItem value="3">Tidak Berlaku</SelectItem>
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
              701. Jaminan Kesehatan dalam Setahun Terakhir (2 digit)
            </Label>
            <Select
              value={data["701_jaminanKesehatan"]?.toString()}
              onValueChange={(value) =>
                onChange("701_jaminanKesehatan", Number.parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Tidak Punya</SelectItem>
                <SelectItem value="2">BPJS Kesehatan PBI</SelectItem>
                <SelectItem value="3">BPJS Kesehatan Non-PBI</SelectItem>
                <SelectItem value="4">Asuransi Kesehatan Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              702. Jaminan Ketenagakerjaan dalam Setahun Terakhir (2 digit)
            </Label>
            <Select
              value={data["702_jaminanKetenagakerjaan"]?.toString()}
              onValueChange={(value) =>
                onChange("702_jaminanKetenagakerjaan", Number.parseInt(value))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Tidak Punya</SelectItem>
                <SelectItem value="2">BPJS Ketenagakerjaan</SelectItem>
                <SelectItem value="3">
                  Asuransi Ketenagakerjaan Lainnya
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-slate-700">
            703. Program Indonesia Pintar dalam Setahun Terakhir (1 digit)
          </Label>
          <Select
            value={data["703_ikutProgramPIP"]?.toString()}
            onValueChange={(value) =>
              onChange("703_ikutProgramPIP", Number.parseInt(value))
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Pilih" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Ya</SelectItem>
              <SelectItem value="2">Tidak</SelectItem>
              <SelectItem value="3">Tidak Berlaku</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
