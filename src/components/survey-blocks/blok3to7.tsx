"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
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
    "502_lapanganUsahaUtama": 0,
    "503_statusPekerjaanUtama": 0,
    "504_pendapatanSebulanTerakhir": "",
    "505_kepemilikanNPWP": 0,
    "506_memilikiUsaha": 0,
    "507_jumlahUsaha": 0,
    "508_lapanganUsahaSendiri": 0,
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
    setSelectedMember(data.length);
  };
  const removeMember = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    const updatedData = newData.map((member, i) => ({
      ...member,
      blok3: { ...member.blok3, "301_nomorUrut": i + 1 },
    }));
    onChange(updatedData);
    if (selectedMember >= updatedData.length && updatedData.length > 0) {
      setSelectedMember(updatedData.length - 1);
    } else if (updatedData.length === 0) {
      setSelectedMember(0);
    }
  };
  const updateMember = (
    index: number,
    block: keyof FamilyMember,
    field: string,
    value: any
  ) => {
    const newData = [...data];
    if (newData[index]) {
      newData[index] = {
        ...newData[index],
        [block]: { ...newData[index][block], [field]: value },
      };
      onChange(newData);
    }
  };
  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        {" "}
        <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />{" "}
        <h3 className="text-lg font-semibold text-slate-700 mb-2">
          Belum Ada Anggota Keluarga
        </h3>{" "}
        <p className="text-slate-500 mb-6">
          Tambahkan anggota keluarga untuk melanjutkan
        </p>{" "}
        <Button onClick={addMember} className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Tambah Anggota Keluarga
        </Button>{" "}
      </div>
    );
  }
  const currentMember = data[selectedMember];
  return (
    <div className="space-y-6">
      {" "}
      <div className="flex items-center justify-between">
        {" "}
        <div className="flex items-center gap-3">
          {" "}
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="w-6 h-6 text-purple-600" />
          </div>{" "}
          <div>
            {" "}
            <h3 className="text-xl font-semibold text-slate-800">
              Data Anggota Keluarga
            </h3>{" "}
            <p className="text-slate-600">
              Informasi detail setiap anggota keluarga
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex gap-2">
          {" "}
          <Button
            onClick={addMember}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Tambah
          </Button>{" "}
          {data.length > 0 && (
            <Button
              onClick={() => removeMember(selectedMember)}
              size="sm"
              variant="destructive"
            >
              <UserMinus className="w-4 h-4 mr-1" />
              Hapus
            </Button>
          )}{" "}
        </div>{" "}
      </div>{" "}
      <Card className="border-slate-200">
        {" "}
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-600">
            Pilih Anggota Keluarga
          </CardTitle>
        </CardHeader>{" "}
        <CardContent>
          {" "}
          <div className="flex flex-wrap gap-2">
            {" "}
            {data.map((member, index) => (
              <Button
                key={index}
                variant={selectedMember === index ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMember(index)}
                className="flex items-center gap-2"
              >
                {" "}
                <Badge variant="secondary" className="text-xs">
                  {index + 1}
                </Badge>{" "}
                {member.blok3["302_nama"] || `Anggota ${index + 1}`}{" "}
              </Button>
            ))}{" "}
          </div>{" "}
        </CardContent>{" "}
      </Card>{" "}
      {currentMember && (
        <Tabs defaultValue="blok3" className="w-full">
          {" "}
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5">
            {" "}
            <TabsTrigger value="blok3" className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Identitas</span>
              <span className="sm:hidden">ID</span>
            </TabsTrigger>{" "}
            <TabsTrigger value="blok4" className="flex items-center gap-1">
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Pendidikan</span>
              <span className="sm:hidden">Pdk</span>
            </TabsTrigger>{" "}
            <TabsTrigger value="blok5" className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Pekerjaan</span>
              <span className="sm:hidden">Kerja</span>
            </TabsTrigger>{" "}
            <TabsTrigger value="blok6" className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Kesehatan</span>
              <span className="sm:hidden">Sehat</span>
            </TabsTrigger>{" "}
            <TabsTrigger value="blok7" className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Jaminan</span>
              <span className="sm:hidden">Jamin</span>
            </TabsTrigger>{" "}
          </TabsList>{" "}
          <TabsContent value="blok3" className="mt-6">
            <Blok3Form
              data={currentMember.blok3}
              onChange={(field, value) =>
                updateMember(selectedMember, "blok3", field, value)
              }
            />
          </TabsContent>{" "}
          <TabsContent value="blok4" className="mt-6">
            <Blok4Form
              data={currentMember.blok4}
              onChange={(field, value) =>
                updateMember(selectedMember, "blok4", field, value)
              }
            />
          </TabsContent>{" "}
          <TabsContent value="blok5" className="mt-6">
            <Blok5Form
              data={currentMember.blok5}
              umur={currentMember.blok3["310_umur"]}
              onChange={(field, value) =>
                updateMember(selectedMember, "blok5", field, value)
              }
            />
          </TabsContent>{" "}
          <TabsContent value="blok6" className="mt-6">
            <Blok6Form
              data={currentMember.blok6}
              umur={currentMember.blok3["310_umur"]}
              onChange={(field, value) =>
                updateMember(selectedMember, "blok6", field, value)
              }
            />
          </TabsContent>{" "}
          <TabsContent value="blok7" className="mt-6">
            <Blok7Form
              data={currentMember.blok7}
              umur={currentMember.blok3["310_umur"]}
              onChange={(field, value) =>
                updateMember(selectedMember, "blok7", field, value)
              }
            />
          </TabsContent>{" "}
        </Tabs>
      )}{" "}
    </div>
  );
}

const getValidationClass = (
  value: string | number | undefined | null
): string => {
  if (value === "" || value === 0 || value === null || value === undefined) {
    return "border-rose-400 focus-visible:ring-rose-500";
  }
  return "";
};

// =====================================================================
// PERUBAHAN UTAMA DI SINI - Blok3Form
// =====================================================================
function Blok3Form({
  data,
  onChange,
}: {
  data: AnggotaKeluarga;
  onChange: (field: string, value: any) => void;
}) {
  // useEffect untuk umur otomatis DIHAPUS

  // useEffect untuk mereset kehamilan tetap ada
  useEffect(() => {
    const isFemale = data["308_jenisKelamin"] === 2;
    const isOfMaritalAge = [2, 3, 4].includes(data["311_statusPerkawinan"]);
    const isPregnancyApplicable = isFemale && isOfMaritalAge;
    if (!isPregnancyApplicable) {
      if (data["313_sedangHamil"] !== 0) onChange("313_sedangHamil", 0);
      if (data["314_usiaKehamilan"] !== 0) onChange("314_usiaKehamilan", 0);
    }
  }, [
    data["308_jenisKelamin"],
    data["311_statusPerkawinan"],
    data["313_sedangHamil"],
    data["314_usiaKehamilan"],
    onChange,
  ]);

  const handleNikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 16) onChange("303_nik", Number(value) || 0);
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + "/" + value.slice(5, 9);
    onChange("309_tanggalLahir", value);
  };
  const handleUsiaKehamilanChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    onChange("314_usiaKehamilan", Number(value) || 0);
  };

  // Handler baru untuk input umur manual
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    onChange("310_umur", Number(value) || 0);
  };

  const formatNik = (nik: number) => {
    if (!nik || nik === 0) return "";
    const nikStr = nik.toString().padStart(16, "0");
    return nikStr.replace(/(\d{4})(?=\d)/g, "$1-").slice(0, 19);
  };
  const isFemale = data["308_jenisKelamin"] === 2;
  const isOfMaritalAge = [2, 3, 4].includes(data["311_statusPerkawinan"]);
  const isPregnancyApplicable = isFemale && isOfMaritalAge;

  return (
    <Card className="border-slate-200">
      {" "}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-slate-600" />
          Blok 3: Identitas Anggota Keluarga
        </CardTitle>
      </CardHeader>{" "}
      <CardContent className="space-y-6">
        {" "}
        <div className="grid md:grid-cols-2 gap-4">
          {" "}
          <div>
            <Label className="text-sm font-medium text-slate-700">
              302. Nama Anggota Keluarga
            </Label>
            <Input
              value={data["302_nama"]}
              onChange={(e) => onChange("302_nama", e.target.value)}
              placeholder="Masukkan nama lengkap"
              className={`mt-1 ${getValidationClass(data["302_nama"])}`}
            />
          </div>{" "}
          <div>
            <Label className="text-sm font-medium text-slate-700">
              303. NIK
            </Label>
            <Input
              value={formatNik(data["303_nik"])}
              onChange={handleNikChange}
              placeholder="1234-5678-9012-3456"
              className={`mt-1 ${getValidationClass(data["303_nik"])}`}
            />
          </div>{" "}
        </div>{" "}
        <div>
          {" "}
          <Label className="text-sm font-medium text-slate-700">
            304. Keterangan Keberadaan Keluarga
          </Label>{" "}
          <Select
            value={data["304_keteranganKeberadaan"]?.toString()}
            onValueChange={(value) =>
              onChange("304_keteranganKeberadaan", Number.parseInt(value))
            }
          >
            <SelectTrigger
              className={`mt-1 ${getValidationClass(
                data["304_keteranganKeberadaan"]
              )}`}
            >
              <SelectValue placeholder="Pilih keterangan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Tinggal bersama keluarga</SelectItem>
              <SelectItem value="2">Anggota keluarga baru</SelectItem>
              <SelectItem value="3">Pindah ke luar Desa</SelectItem>
              <SelectItem value="4">Pindah ke luar Kabupaten</SelectItem>
              <SelectItem value="5">Pindah ke luar Negeri</SelectItem>
              <SelectItem value="6">Meninggal</SelectItem>
              <SelectItem value="7">Tidak Ditemukan</SelectItem>
            </SelectContent>
          </Select>{" "}
        </div>{" "}
        <div className="grid md:grid-cols-3 gap-4">
          {" "}
          <div>
            <Label className="text-sm font-medium text-slate-700">
              308. Jenis Kelamin
            </Label>
            <Select
              value={data["308_jenisKelamin"]?.toString()}
              onValueChange={(value) =>
                onChange("308_jenisKelamin", Number.parseInt(value))
              }
            >
              <SelectTrigger
                className={`mt-1 ${getValidationClass(
                  data["308_jenisKelamin"]
                )}`}
              >
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Laki-laki</SelectItem>
                <SelectItem value="2">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>{" "}
          <div>
            <Label className="text-sm font-medium text-slate-700">
              309. Tanggal Lahir
            </Label>
            <Input
              type="text"
              value={data["309_tanggalLahir"]}
              onChange={handleDateChange}
              placeholder="dd/mm/yyyy"
              maxLength={10}
              className={`mt-1 ${getValidationClass(data["309_tanggalLahir"])}`}
            />
          </div>{" "}
          <div>
            <Label className="text-sm font-medium text-slate-700">
              310. Umur (Tahun)
            </Label>
            <Input
              type="text"
              value={data["310_umur"] || ""}
              onChange={handleAgeChange}
              placeholder="00"
              maxLength={3}
              className={`mt-1 ${getValidationClass(data["310_umur"])}`}
            />
          </div>{" "}
        </div>{" "}
        <div className="grid md:grid-cols-2 gap-4">
          {" "}
          <div>
            <Label className="text-sm font-medium text-slate-700">
              311. Status Perkawinan
            </Label>
            <Select
              value={data["311_statusPerkawinan"]?.toString()}
              onValueChange={(value) =>
                onChange("311_statusPerkawinan", Number.parseInt(value))
              }
            >
              <SelectTrigger
                className={`mt-1 ${getValidationClass(
                  data["311_statusPerkawinan"]
                )}`}
              >
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Belum Kawin</SelectItem>
                <SelectItem value="2">Kawin/nikah</SelectItem>
                <SelectItem value="3">Cerai Hidup</SelectItem>
                <SelectItem value="4">Cerai Mati</SelectItem>
              </SelectContent>
            </Select>
          </div>{" "}
          <div>
            <Label className="text-sm font-medium text-slate-700">
              312. Hubungan dengan Kepala Keluarga
            </Label>
            <Select
              value={data["312_hubunganDenganKK"]?.toString()}
              onValueChange={(value) =>
                onChange("312_hubunganDenganKK", Number.parseInt(value))
              }
            >
              <SelectTrigger
                className={`mt-1 ${getValidationClass(
                  data["312_hubunganDenganKK"]
                )}`}
              >
                <SelectValue placeholder="Pilih hubungan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Kepala Keluarga</SelectItem>
                <SelectItem value="2">Istri/Suami</SelectItem>
                <SelectItem value="3">Anak</SelectItem>
                <SelectItem value="4">Menantu</SelectItem>
                <SelectItem value="5">Cucu</SelectItem>
                <SelectItem value="6">Orang Tua/Mertua</SelectItem>
                <SelectItem value="7">Pembantu/Sopir</SelectItem>
                <SelectItem value="8">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>{" "}
        </div>{" "}
        <div className="grid md:grid-cols-2 gap-4">
          {" "}
          <div>
            <Label
              className={`text-sm font-medium text-slate-700 ${
                !isPregnancyApplicable && "text-slate-400"
              }`}
            >
              313. Apakah Saat Ini Sedang Hamil?
            </Label>
            <Select
              value={data["313_sedangHamil"]?.toString()}
              onValueChange={(value) =>
                onChange("313_sedangHamil", Number.parseInt(value))
              }
              disabled={!isPregnancyApplicable}
            >
              <SelectTrigger
                className={`mt-1 ${
                  isPregnancyApplicable
                    ? getValidationClass(data["313_sedangHamil"])
                    : ""
                }`}
              >
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Ya</SelectItem>
                <SelectItem value="2">Tidak</SelectItem>
              </SelectContent>
            </Select>
          </div>{" "}
          <div>
            <Label
              className={`text-sm font-medium text-slate-700 ${
                !isPregnancyApplicable && "text-slate-400"
              }`}
            >
              314. Usia Kehamilan (Bulan)
            </Label>
            <Input
              type="text"
              value={data["314_usiaKehamilan"] || ""}
              onChange={handleUsiaKehamilanChange}
              placeholder="1-9"
              maxLength={1}
              disabled={!isPregnancyApplicable}
              className={`mt-1 ${
                isPregnancyApplicable
                  ? getValidationClass(data["314_usiaKehamilan"])
                  : "bg-slate-100"
              }`}
            />
          </div>{" "}
        </div>{" "}
      </CardContent>{" "}
    </Card>
  );
}

const pendidikanOptions = [
  { value: "1", label: "01 - Paket A" },
  { value: "2", label: "02 - SD LB" },
  { value: "3", label: "03 - SD" },
  { value: "4", label: "04 - MI" },
  { value: "5", label: "05 - SPM/PDF Ula" },
  { value: "6", label: "06 - Paket B" },
  { value: "7", label: "07 - SMP LB" },
  { value: "8", label: "08 - SMP" },
  { value: "9", label: "09 - MTs" },
  { value: "10", label: "10 - SPM/PDF Wustha" },
  { value: "11", label: "11 - Paket C" },
  { value: "12", label: "12 - SMLB" },
  { value: "13", label: "13 - SMA" },
  { value: "14", label: "14 - MA" },
  { value: "15", label: "15 - SMK" },
  { value: "16", label: "16 - MAK" },
  { value: "17", label: "17 - SPM/PDF Ulya" },
  { value: "18", label: "18 - D1/D2/D3" },
  { value: "19", label: "19 - D4/S1" },
  { value: "20", label: "20 - Profesi" },
  { value: "21", label: "21 - S2" },
  { value: "22", label: "22 - S3" },
];
const ijazahOptions = [
  ...pendidikanOptions,
  { value: "23", label: "23 - Tidak punya Ijazah" },
];
function Blok4Form({
  data,
  onChange,
}: {
  data: Blok4;
  onChange: (field: string, value: any) => void;
}) {
  const isNotSchooled = data["401_partisipasiSekolah"] === 1;
  useEffect(() => {
    if (isNotSchooled) {
      if (data["402_jenjangPendidikan"] !== 0)
        onChange("402_jenjangPendidikan", 0);
      if (data["403_kelasTertinggi"] !== 0) onChange("403_kelasTertinggi", 0);
      if (data["404_ijazahTertinggi"] !== 23)
        onChange("404_ijazahTertinggi", 23);
    }
  }, [isNotSchooled, data, onChange]);
  return (
    <Card className="border-slate-200">
      {" "}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-slate-600" />
          Blok 4: Pendidikan
        </CardTitle>
      </CardHeader>{" "}
      <CardContent className="space-y-4">
        {" "}
        <div className="grid md:grid-cols-2 gap-4">
          {" "}
          <div>
            {" "}
            <Label className="text-sm font-medium text-slate-700">
              401. Partisipasi Sekolah
            </Label>{" "}
            <Select
              value={data["401_partisipasiSekolah"]?.toString()}
              onValueChange={(value) =>
                onChange("401_partisipasiSekolah", Number.parseInt(value))
              }
            >
              {" "}
              <SelectTrigger
                className={`mt-1 ${getValidationClass(
                  data["401_partisipasiSekolah"]
                )}`}
              >
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
                <SelectItem value="1">
                  Tidak/Belum Pernah Sekolah
                </SelectItem>{" "}
                <SelectItem value="2">Masih Sekolah</SelectItem>{" "}
                <SelectItem value="3">Tidak Sekolah Lagi</SelectItem>{" "}
              </SelectContent>{" "}
            </Select>{" "}
          </div>{" "}
          <div>
            {" "}
            <Label
              className={`text-sm font-medium ${
                isNotSchooled ? "text-slate-400" : "text-slate-700"
              }`}
            >
              402. Jenjang Pendidikan Tertinggi
            </Label>{" "}
            <Select
              value={data["402_jenjangPendidikan"]?.toString()}
              onValueChange={(value) =>
                onChange("402_jenjangPendidikan", Number.parseInt(value))
              }
              disabled={isNotSchooled}
            >
              {" "}
              <SelectTrigger
                className={`mt-1 ${
                  !isNotSchooled &&
                  getValidationClass(data["402_jenjangPendidikan"])
                }`}
              >
                <SelectValue placeholder="Pilih jenjang" />
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
                {pendidikanOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}{" "}
              </SelectContent>{" "}
            </Select>{" "}
          </div>{" "}
        </div>{" "}
        <div className="grid md:grid-cols-2 gap-4">
          {" "}
          <div>
            {" "}
            <Label
              className={`text-sm font-medium ${
                isNotSchooled ? "text-slate-400" : "text-slate-700"
              }`}
            >
              403. Kelas Tertinggi
            </Label>{" "}
            <Input
              type="number"
              min="1"
              max="8"
              value={data["403_kelasTertinggi"] || ""}
              onChange={(e) =>
                onChange(
                  "403_kelasTertinggi",
                  Number.parseInt(e.target.value) || 0
                )
              }
              placeholder="1-8"
              disabled={isNotSchooled}
              className={`mt-1 ${
                !isNotSchooled && getValidationClass(data["403_kelasTertinggi"])
              }`}
            />{" "}
            <p className="text-xs text-slate-500 mt-1">
              Isi dengan: 1, 2, 3, 4, 5, 6, 7, 8 (Tamat dan Lulus)
            </p>{" "}
          </div>{" "}
          <div>
            {" "}
            <Label
              className={`text-sm font-medium ${
                isNotSchooled ? "text-slate-400" : "text-slate-700"
              }`}
            >
              404. Ijazah Tertinggi
            </Label>{" "}
            <Select
              value={data["404_ijazahTertinggi"]?.toString()}
              onValueChange={(value) =>
                onChange("404_ijazahTertinggi", Number.parseInt(value))
              }
              disabled={isNotSchooled}
            >
              {" "}
              <SelectTrigger
                className={`mt-1 ${
                  !isNotSchooled &&
                  getValidationClass(data["404_ijazahTertinggi"])
                }`}
              >
                <SelectValue placeholder="Pilih ijazah" />
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
                {ijazahOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}{" "}
              </SelectContent>{" "}
            </Select>{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
          {" "}
          <h4 className="font-semibold text-sm text-blue-800 mb-2">
            Catatan Kode Pendidikan & Ijazah
          </h4>{" "}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-slate-700">
            {" "}
            {ijazahOptions.map((opt) => (
              <div key={opt.value}>{opt.label}</div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </CardContent>{" "}
    </Card>
  );
}

const lapanganUsahaOptions = [
  { value: "1", label: "01 - Pertanian tanaman padi & palawija" },
  { value: "2", label: "02 - Hortikultura" },
  { value: "3", label: "03 - Perkebunan" },
  { value: "4", label: "04 - Perikanan" },
  { value: "5", label: "05 - Peternakan" },
  { value: "6", label: "06 - Kehutanan & pertanian lainnya" },
  { value: "7", label: "07 - Pertambangan/penggalian" },
  { value: "8", label: "08 - Industri pengolahan" },
  {
    value: "9",
    label: "09 - Pengadaan listrik, gas, uap/air panas dan dingin",
  },
  { value: "10", label: "10 - Pengelolaan air, limbah, dan daur ulang sampah" },
  { value: "11", label: "11 - Konstruksi" },
  {
    value: "12",
    label: "12 - Perdagangan besar & eceran; reparasi mobil & motor",
  },
  { value: "13", label: "13 - Pengangkutan dan pergudangan" },
  { value: "14", label: "14 - Penyediaan akomodasi & makan minum" },
  { value: "15", label: "15 - Informasi & komunikasi" },
  { value: "16", label: "16 - Keuangan & asuransi" },
  { value: "17", label: "17 - Real estate" },
  { value: "18", label: "18 - Aktivitas profesional, ilmiah dan teknis" },
  {
    value: "19",
    label: "19 - Aktivitas penyewaan, ketenagakerjaan, agen perjalanan",
  },
  {
    value: "20",
    label: "20 - Administrasi pemerintahan, pertahanan, & jaminan sosial",
  },
  { value: "21", label: "21 - Pendidikan" },
  { value: "22", label: "22 - Aktivitas kesehatan manusia dan sosial" },
  { value: "23", label: "23 - Kesenian, hiburan dan rekreasi" },
  { value: "24", label: "24 - Aktivitas jasa lainnya" },
  { value: "25", label: "25 - Aktivitas keluarga sebagai pemberi kerja" },
  {
    value: "26",
    label: "26 - Aktivitas badan internasional & badan ekstra internasional",
  },
];
const statusPekerjaanOptions = [
  { value: "1", label: "1 - Berusaha sendiri" },
  { value: "2", label: "2 - Berusaha dibantu buruh tidak tetap/tidak dibayar" },
  { value: "3", label: "3 - Berusaha dibantu buruh tetap/buruh dibayar" },
  { value: "4", label: "4 - Buruh/karyawan/pegawai swasta" },
  { value: "5", label: "5 - PNS/TNI/Polri/BUMN/BUMD/pejabat negara" },
  { value: "6", label: "6 - Pekerja bebas pertanian" },
  { value: "7", label: "7 - Pekerja bebas non pertanian" },
  { value: "8", label: "8 - Pekerja keluarga/tidak dibayar" },
];
const npwpOptions = [
  { value: "1", label: "1 - Ada, dapat menunjukkan" },
  { value: "2", label: "2 - Ada, tidak dapat menunjukkan" },
  { value: "3", label: "3 - Tidak ada" },
];
const izinUsahaOptions = [
  { value: "1", label: "01 - SITU" },
  { value: "2", label: "02 - SIUP" },
  { value: "3", label: "03 - NRP" },
  { value: "4", label: "04 - NIB" },
  { value: "5", label: "05 - SKDP" },
  { value: "6", label: "06 - Amdal" },
  { value: "7", label: "07 - SIMB" },
  { value: "8", label: "08 - SKBH" },
  { value: "9", label: "09 - APPT" },
  { value: "10", label: "10 - Surat izin lainnya" },
  { value: "11", label: "11 - Belum memiliki izin" },
  { value: "12", label: "12 - Surat Izin Gangguan" },
];
const pendapatanUsahaOptions = [
  { value: "1", label: "1 - < 1 juta per bulan" },
  { value: "2", label: "2 - > 1 juta s/d < UMK" },
  { value: "3", label: "3 - UMK" },
  { value: "4", label: "4 - > UMK s/d 10 juta" },
  { value: "5", label: "5 - > 10 juta per bulan" },
];
function Blok5Form({
  data,
  umur,
  onChange,
}: {
  data: Blok5;
  umur: number;
  onChange: (field: string, value: any) => void;
}) {
  const isEligibleByAge = umur > 5;
  const isNotWorking = data["501_bekerjaMingguLalu"] === 2;
  const hasNoBusiness = data["506_memilikiUsaha"] !== 1;
  const canHaveUnpaidWorkers = data["509_statusUsaha"] === 2;
  const canHavePaidWorkers = data["509_statusUsaha"] === 3;

  useEffect(() => {
    if (isNotWorking) {
      if (data["502_lapanganUsahaUtama"] !== 0)
        onChange("502_lapanganUsahaUtama", 0);
      if (data["503_statusPekerjaanUtama"] !== 0)
        onChange("503_statusPekerjaanUtama", 0);
      if (data["504_pendapatanSebulanTerakhir"] !== "")
        onChange("504_pendapatanSebulanTerakhir", "");
      if (data["505_kepemilikanNPWP"] !== 0) onChange("505_kepemilikanNPWP", 0);
    }
  }, [isNotWorking, data, onChange]);
  useEffect(() => {
    const resetBusinessFields = () => {
      if (data["506_memilikiUsaha"] !== 0) onChange("506_memilikiUsaha", 0);
      if (data["507_jumlahUsaha"] !== 0) onChange("507_jumlahUsaha", 0);
      if (data["508_lapanganUsahaSendiri"] !== 0)
        onChange("508_lapanganUsahaSendiri", 0);
      if (data["509_statusUsaha"] !== 0) onChange("509_statusUsaha", 0);
      if (data["510_jumlahPekerjaTidakDibayar"] !== 0)
        onChange("510_jumlahPekerjaTidakDibayar", 0);
      if (data["511_jumlahPekerjaDibayar"] !== 0)
        onChange("511_jumlahPekerjaDibayar", 0);
      if (data["512_kepemilikanIzinUsaha"] !== 0)
        onChange("512_kepemilikanIzinUsaha", 0);
      if (data["513_pendapatanUsahaSebulan"] !== 0)
        onChange("513_pendapatanUsahaSebulan", 0);
    };
    if (!isEligibleByAge) {
      resetBusinessFields();
    } else if (hasNoBusiness) {
      if (data["507_jumlahUsaha"] !== 0) onChange("507_jumlahUsaha", 0);
      if (data["508_lapanganUsahaSendiri"] !== 0)
        onChange("508_lapanganUsahaSendiri", 0);
      if (data["509_statusUsaha"] !== 0) onChange("509_statusUsaha", 0);
      if (data["510_jumlahPekerjaTidakDibayar"] !== 0)
        onChange("510_jumlahPekerjaTidakDibayar", 0);
      if (data["511_jumlahPekerjaDibayar"] !== 0)
        onChange("511_jumlahPekerjaDibayar", 0);
      if (data["512_kepemilikanIzinUsaha"] !== 0)
        onChange("512_kepemilikanIzinUsaha", 0);
      if (data["513_pendapatanUsahaSebulan"] !== 0)
        onChange("513_pendapatanUsahaSebulan", 0);
    } else {
      if (!canHaveUnpaidWorkers && data["510_jumlahPekerjaTidakDibayar"] !== 0)
        onChange("510_jumlahPekerjaTidakDibayar", 0);
      if (!canHavePaidWorkers && data["511_jumlahPekerjaDibayar"] !== 0)
        onChange("511_jumlahPekerjaDibayar", 0);
    }
  }, [
    isEligibleByAge,
    hasNoBusiness,
    canHaveUnpaidWorkers,
    canHavePaidWorkers,
    data,
    onChange,
  ]);
  const handle2DigitChange = (
    field:
      | "507_jumlahUsaha"
      | "510_jumlahPekerjaTidakDibayar"
      | "511_jumlahPekerjaDibayar",
    value: string
  ) => {
    const numValue = value.replace(/\D/g, "").slice(0, 2);
    onChange(field, Number(numValue) || 0);
  };
  return (
    <Card className="border-slate-200">
      {" "}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-slate-600" />
          Blok 5: Ketenagakerjaan
        </CardTitle>
      </CardHeader>{" "}
      <CardContent className="space-y-6">
        {" "}
        <div className="space-y-4 p-4 border rounded-md">
          {" "}
          <h4 className="font-medium text-slate-800">Pekerjaan Utama</h4>{" "}
          <div className="grid md:grid-cols-2 gap-4">
            {" "}
            <div>
              <Label className="text-sm font-medium text-slate-700">
                501. Bekerja Seminggu Lalu
              </Label>
              <Select
                value={data["501_bekerjaMingguLalu"]?.toString()}
                onValueChange={(value) =>
                  onChange("501_bekerjaMingguLalu", Number.parseInt(value))
                }
              >
                <SelectTrigger
                  className={`mt-1 ${getValidationClass(
                    data["501_bekerjaMingguLalu"]
                  )}`}
                >
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ya</SelectItem>
                  <SelectItem value="2">Tidak</SelectItem>
                </SelectContent>
              </Select>
            </div>{" "}
            <div>
              <Label
                className={`text-sm font-medium ${
                  isNotWorking ? "text-slate-400" : "text-slate-700"
                }`}
              >
                502. Lapangan Usaha
              </Label>
              <Select
                disabled={isNotWorking}
                value={data["502_lapanganUsahaUtama"]?.toString()}
                onValueChange={(value) =>
                  onChange("502_lapanganUsahaUtama", Number.parseInt(value))
                }
              >
                <SelectTrigger
                  className={`mt-1 ${
                    !isNotWorking &&
                    getValidationClass(data["502_lapanganUsahaUtama"])
                  }`}
                >
                  <SelectValue placeholder="Pilih lapangan usaha" />
                </SelectTrigger>
                <SelectContent>
                  {lapanganUsahaOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>{" "}
          </div>{" "}
          <div className="grid md:grid-cols-2 gap-4">
            {" "}
            <div>
              <Label
                className={`text-sm font-medium ${
                  isNotWorking ? "text-slate-400" : "text-slate-700"
                }`}
              >
                503. Status Pekerjaan
              </Label>
              <Select
                disabled={isNotWorking}
                value={data["503_statusPekerjaanUtama"]?.toString()}
                onValueChange={(value) =>
                  onChange("503_statusPekerjaanUtama", Number.parseInt(value))
                }
              >
                <SelectTrigger
                  className={`mt-1 ${
                    !isNotWorking &&
                    getValidationClass(data["503_statusPekerjaanUtama"])
                  }`}
                >
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  {statusPekerjaanOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>{" "}
            <div>
              <Label
                className={`text-sm font-medium ${
                  isNotWorking ? "text-slate-400" : "text-slate-700"
                }`}
              >
                504. Pendapatan (Rp)
              </Label>
              <Input
                disabled={isNotWorking}
                value={data["504_pendapatanSebulanTerakhir"]}
                onChange={(e) =>
                  onChange("504_pendapatanSebulanTerakhir", e.target.value)
                }
                placeholder="Contoh: 2500000"
                className={`mt-1 ${
                  !isNotWorking &&
                  getValidationClass(data["504_pendapatanSebulanTerakhir"])
                }`}
              />
            </div>{" "}
          </div>{" "}
          <div>
            <Label
              className={`text-sm font-medium ${
                isNotWorking ? "text-slate-400" : "text-slate-700"
              }`}
            >
              505. Kepemilikan NPWP
            </Label>
            <Select
              disabled={isNotWorking}
              value={data["505_kepemilikanNPWP"]?.toString()}
              onValueChange={(value) =>
                onChange("505_kepemilikanNPWP", Number.parseInt(value))
              }
            >
              <SelectTrigger
                className={`mt-1 ${
                  !isNotWorking &&
                  getValidationClass(data["505_kepemilikanNPWP"])
                }`}
              >
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                {npwpOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>{" "}
        </div>{" "}
        <div className="space-y-4 p-4 border rounded-md">
          {" "}
          <h4 className="font-medium text-slate-800">
            Usaha Sendiri / Bersama
          </h4>{" "}
          <div className="grid md:grid-cols-2 gap-4">
            {" "}
            <div>
              <Label
                className={`text-sm font-medium ${
                  !isEligibleByAge ? "text-slate-400" : "text-slate-700"
                }`}
              >
                506. Memiliki Usaha (Usia 5+)
              </Label>
              <Select
                disabled={!isEligibleByAge}
                value={data["506_memilikiUsaha"]?.toString()}
                onValueChange={(value) =>
                  onChange("506_memilikiUsaha", Number.parseInt(value))
                }
              >
                <SelectTrigger
                  className={`mt-1 ${
                    isEligibleByAge &&
                    getValidationClass(data["506_memilikiUsaha"])
                  }`}
                >
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ya</SelectItem>
                  <SelectItem value="2">Tidak</SelectItem>
                </SelectContent>
              </Select>
            </div>{" "}
            <div>
              <Label
                className={`text-sm font-medium ${
                  hasNoBusiness || !isEligibleByAge
                    ? "text-slate-400"
                    : "text-slate-700"
                }`}
              >
                507. Jumlah Usaha
              </Label>
              <Input
                type="text"
                value={data["507_jumlahUsaha"] || ""}
                onChange={(e) =>
                  handle2DigitChange("507_jumlahUsaha", e.target.value)
                }
                placeholder="00"
                maxLength={2}
                disabled={hasNoBusiness || !isEligibleByAge}
                className={`mt-1 ${
                  !hasNoBusiness &&
                  isEligibleByAge &&
                  getValidationClass(data["507_jumlahUsaha"])
                }`}
              />
            </div>{" "}
          </div>{" "}
          <div className="grid md:grid-cols-2 gap-4">
            {" "}
            <div>
              <Label
                className={`text-sm font-medium ${
                  hasNoBusiness || !isEligibleByAge
                    ? "text-slate-400"
                    : "text-slate-700"
                }`}
              >
                508. Lapangan Usaha
              </Label>
              <Select
                disabled={hasNoBusiness || !isEligibleByAge}
                value={data["508_lapanganUsahaSendiri"]?.toString()}
                onValueChange={(value) =>
                  onChange("508_lapanganUsahaSendiri", Number.parseInt(value))
                }
              >
                <SelectTrigger
                  className={`mt-1 ${
                    !hasNoBusiness &&
                    isEligibleByAge &&
                    getValidationClass(data["508_lapanganUsahaSendiri"])
                  }`}
                >
                  <SelectValue placeholder="Pilih lapangan usaha" />
                </SelectTrigger>
                <SelectContent>
                  {lapanganUsahaOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>{" "}
            <div>
              <Label
                className={`text-sm font-medium ${
                  hasNoBusiness || !isEligibleByAge
                    ? "text-slate-400"
                    : "text-slate-700"
                }`}
              >
                509. Status Usaha
              </Label>
              <Select
                disabled={hasNoBusiness || !isEligibleByAge}
                value={data["509_statusUsaha"]?.toString()}
                onValueChange={(value) =>
                  onChange("509_statusUsaha", Number.parseInt(value))
                }
              >
                <SelectTrigger
                  className={`mt-1 ${
                    !hasNoBusiness &&
                    isEligibleByAge &&
                    getValidationClass(data["509_statusUsaha"])
                  }`}
                >
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  {statusPekerjaanOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>{" "}
          </div>{" "}
          <div className="grid md:grid-cols-2 gap-4">
            {" "}
            <div>
              <Label
                className={`text-sm font-medium ${
                  !canHaveUnpaidWorkers || hasNoBusiness || !isEligibleByAge
                    ? "text-slate-400"
                    : "text-slate-700"
                }`}
              >
                510. Jumlah Pekerja Tidak Dibayar
              </Label>
              <Input
                type="text"
                value={data["510_jumlahPekerjaTidakDibayar"] || ""}
                onChange={(e) =>
                  handle2DigitChange(
                    "510_jumlahPekerjaTidakDibayar",
                    e.target.value
                  )
                }
                placeholder="00"
                maxLength={2}
                disabled={
                  !canHaveUnpaidWorkers || hasNoBusiness || !isEligibleByAge
                }
                className={`mt-1 ${
                  canHaveUnpaidWorkers &&
                  !hasNoBusiness &&
                  isEligibleByAge &&
                  getValidationClass(data["510_jumlahPekerjaTidakDibayar"])
                }`}
              />
            </div>{" "}
            <div>
              <Label
                className={`text-sm font-medium ${
                  !canHavePaidWorkers || hasNoBusiness || !isEligibleByAge
                    ? "text-slate-400"
                    : "text-slate-700"
                }`}
              >
                511. Jumlah Pekerja Dibayar
              </Label>
              <Input
                type="text"
                value={data["511_jumlahPekerjaDibayar"] || ""}
                onChange={(e) =>
                  handle2DigitChange("511_jumlahPekerjaDibayar", e.target.value)
                }
                placeholder="00"
                maxLength={2}
                disabled={
                  !canHavePaidWorkers || hasNoBusiness || !isEligibleByAge
                }
                className={`mt-1 ${
                  canHavePaidWorkers &&
                  !hasNoBusiness &&
                  isEligibleByAge &&
                  getValidationClass(data["511_jumlahPekerjaDibayar"])
                }`}
              />
            </div>{" "}
          </div>{" "}
          <div className="grid md:grid-cols-2 gap-4">
            {" "}
            <div>
              <Label
                className={`text-sm font-medium ${
                  hasNoBusiness || !isEligibleByAge
                    ? "text-slate-400"
                    : "text-slate-700"
                }`}
              >
                512. Kepemilikan Izin Usaha
              </Label>
              <Select
                disabled={hasNoBusiness || !isEligibleByAge}
                value={data["512_kepemilikanIzinUsaha"]?.toString()}
                onValueChange={(value) =>
                  onChange("512_kepemilikanIzinUsaha", Number.parseInt(value))
                }
              >
                <SelectTrigger
                  className={`mt-1 ${
                    !hasNoBusiness &&
                    isEligibleByAge &&
                    getValidationClass(data["512_kepemilikanIzinUsaha"])
                  }`}
                >
                  <SelectValue placeholder="Pilih izin usaha" />
                </SelectTrigger>
                <SelectContent>
                  {izinUsahaOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>{" "}
            <div>
              <Label
                className={`text-sm font-medium ${
                  hasNoBusiness || !isEligibleByAge
                    ? "text-slate-400"
                    : "text-slate-700"
                }`}
              >
                513. Pendapatan Usaha Sebulan
              </Label>
              <Select
                disabled={hasNoBusiness || !isEligibleByAge}
                value={data["513_pendapatanUsahaSebulan"]?.toString()}
                onValueChange={(value) =>
                  onChange("513_pendapatanUsahaSebulan", Number.parseInt(value))
                }
              >
                <SelectTrigger
                  className={`mt-1 ${
                    !hasNoBusiness &&
                    isEligibleByAge &&
                    getValidationClass(data["513_pendapatanUsahaSebulan"])
                  }`}
                >
                  <SelectValue placeholder="Pilih range" />
                </SelectTrigger>
                <SelectContent>
                  {pendapatanUsahaOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-md">
          {" "}
          <h4 className="font-semibold text-sm text-blue-800 mb-2">
            Catatan Kode Ketenagakerjaan
          </h4>{" "}
          <div className="space-y-4">
            {" "}
            <div>
              {" "}
              <h5 className="font-medium text-xs text-slate-600">
                Kode Lapangan Usaha (502 & 508)
              </h5>{" "}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 text-xs text-slate-700">
                {" "}
                {lapanganUsahaOptions.map((o) => (
                  <div key={o.value}>{o.label}</div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
            <div>
              {" "}
              <h5 className="font-medium text-xs text-slate-600">
                Kode Status Pekerjaan (503 & 509)
              </h5>{" "}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 text-xs text-slate-700">
                {" "}
                {statusPekerjaanOptions.map((o) => (
                  <div key={o.value}>{o.label}</div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
            <div>
              {" "}
              <h5 className="font-medium text-xs text-slate-600">
                Kode Kepemilikan Izin Usaha (512)
              </h5>{" "}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 text-xs text-slate-700">
                {" "}
                {izinUsahaOptions.map((o) => (
                  <div key={o.value}>{o.label}</div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </CardContent>{" "}
    </Card>
  );
}

const disabilitasOptions = [
  { value: "0", label: "0 - Tidak memiliki" },
  { value: "1", label: "1 - Disabilitas Fisik" },
  { value: "2", label: "2 - Disabilitas Mental" },
  { value: "3", label: "3 - Disabilitas Intelektual" },
  { value: "4", label: "4 - Disabilitas Sensorik Netra" },
  { value: "5", label: "5 - Disabilitas Sensorik Rungu" },
  { value: "6", label: "6 - Disabilitas Sensorik Wicara" },
];
const giziOptions = [
  { value: "1", label: "1 - Kurang gizi" },
  { value: "2", label: "2 - Kerdil" },
  { value: "3", label: "3 - Tidak ada catatan" },
  { value: "8", label: "8 - Tidak tau" },
];
const kesehatanKronisOptions = [
  { value: "1", label: "01 - Tidak ada" },
  { value: "2", label: "02 - Hipertensi" },
  { value: "3", label: "03 - Diabetes" },
  { value: "4", label: "04 - Kolesterol" },
  { value: "5", label: "05 - Masalah jantung" },
  { value: "6", label: "06 - Rematik" },
  { value: "7", label: "07 - TBC" },
  { value: "8", label: "08 - Stroke" },
  { value: "9", label: "09 - Kanker/tumor ganas" },
  { value: "10", label: "10 - Asma" },
  { value: "11", label: "11 - Haemophilia" },
  { value: "12", label: "12 - HIV/AIDS" },
  { value: "13", label: "13 - Gagal ginjal" },
  { value: "14", label: "14 - Sirosis hati" },
  { value: "15", label: "15 - Thalasemia" },
  { value: "16", label: "16 - Leukimia" },
  { value: "17", label: "17 - Alzheimer" },
  { value: "18", label: "18 - Asam urat" },
  { value: "19", label: "19 - Mag Kronis" },
  { value: "20", label: "20 - Anemia Kronis" },
  { value: "21", label: "21 - Osteoporosis" },
  { value: "22", label: "22 - Lainnya" },
];
const waliOptions = [
  { value: "1", label: "1 - Ya, Anggota keluarga" },
  { value: "2", label: "2 - Ya, Bukan anggota keluarga" },
  { value: "3", label: "3 - Tinggal sendiri" },
];
function Blok6Form({
  data,
  umur,
  onChange,
}: {
  data: Blok6;
  umur: number;
  onChange: (field: string, value: any) => void;
}) {
  const isEligibleForDisability = umur >= 2;
  const isEligibleForGizi = umur >= 0 && umur <= 4;
  const isEligibleForWali = umur >= 60 && data["601_statusDisabilitas"] !== 0;

  useEffect(() => {
    if (!isEligibleForDisability && data["601_statusDisabilitas"] !== 0)
      onChange("601_statusDisabilitas", 0);
  }, [isEligibleForDisability, data, onChange]);
  useEffect(() => {
    if (!isEligibleForGizi && data["602_kondisiGizi"] !== 0)
      onChange("602_kondisiGizi", 0);
  }, [isEligibleForGizi, data, onChange]);
  useEffect(() => {
    if (!isEligibleForWali && data["604_memilikiWali"] !== 0)
      onChange("604_memilikiWali", 0);
  }, [isEligibleForWali, data, onChange]);

  return (
    <Card className="border-slate-200">
      {" "}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-slate-600" />
          Blok 6: Kesehatan
        </CardTitle>
      </CardHeader>{" "}
      <CardContent className="space-y-4">
        {" "}
        <div className="grid md:grid-cols-2 gap-4">
          {" "}
          <div>
            <Label
              className={`text-sm font-medium ${
                !isEligibleForDisability ? "text-slate-400" : "text-slate-700"
              }`}
            >
              601. Status Disabilitas (Usia 2+)
            </Label>
            <Select
              disabled={!isEligibleForDisability}
              value={data["601_statusDisabilitas"]?.toString()}
              onValueChange={(value) =>
                onChange("601_statusDisabilitas", Number.parseInt(value))
              }
            >
              <SelectTrigger
                className={`mt-1 ${
                  isEligibleForDisability &&
                  getValidationClass(data["601_statusDisabilitas"])
                }`}
              >
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                {disabilitasOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>{" "}
          <div>
            <Label
              className={`text-sm font-medium ${
                !isEligibleForGizi ? "text-slate-400" : "text-slate-700"
              }`}
            >
              602. Kondisi Gizi (Usia 0-4)
            </Label>
            <Select
              disabled={!isEligibleForGizi}
              value={data["602_kondisiGizi"]?.toString()}
              onValueChange={(value) =>
                onChange("602_kondisiGizi", Number.parseInt(value))
              }
            >
              <SelectTrigger
                className={`mt-1 ${
                  isEligibleForGizi &&
                  getValidationClass(data["602_kondisiGizi"])
                }`}
              >
                <SelectValue placeholder="Pilih kondisi" />
              </SelectTrigger>
              <SelectContent>
                {giziOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>{" "}
        </div>{" "}
        <div className="grid md:grid-cols-2 gap-4">
          {" "}
          <div>
            <Label className="text-sm font-medium text-slate-700">
              603. Keluhan Kesehatan Kronis
            </Label>
            <Select
              value={data["603_keluhanKesehatanKronis"]?.toString()}
              onValueChange={(value) =>
                onChange("603_keluhanKesehatanKronis", Number.parseInt(value))
              }
            >
              <SelectTrigger
                className={`mt-1 ${getValidationClass(
                  data["603_keluhanKesehatanKronis"]
                )}`}
              >
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                {kesehatanKronisOptions
                  .sort((a, b) => parseInt(a.value) - parseInt(b.value))
                  .map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>{" "}
          <div>
            <Label
              className={`text-sm font-medium ${
                !isEligibleForWali ? "text-slate-400" : "text-slate-700"
              }`}
            >
              604. Memiliki Wali (Usia 60+ & Disabilitas)
            </Label>
            <Select
              disabled={!isEligibleForWali}
              value={data["604_memilikiWali"]?.toString()}
              onValueChange={(value) =>
                onChange("604_memilikiWali", Number.parseInt(value))
              }
            >
              <SelectTrigger
                className={`mt-1 ${
                  isEligibleForWali &&
                  getValidationClass(data["604_memilikiWali"])
                }`}
              >
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                {waliOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>{" "}
        </div>{" "}
      </CardContent>{" "}
    </Card>
  );
}

const jaminanKesehatanOptions = [
  { value: "0", label: "0 - Tidak memiliki" },
  { value: "1", label: "1 - PBI JKN" },
  { value: "2", label: "2 - JKN Mandiri" },
  { value: "4", label: "4 - JKN Pemberi kerja" },
  { value: "8", label: "8 - Jamkes lainnya" },
  { value: "99", label: "99 - Tidak tau" },
];
const jaminanKetenagakerjaanOptions = [
  { value: "0", label: "0 - Tidak memiliki" },
  { value: "1", label: "1 - BPJS Jaminan Kecelakaan Kerja" },
  { value: "2", label: "2 - BPJS Jaminan Kematian" },
  { value: "4", label: "4 - BPJS Jaminan Hari Tua" },
  { value: "8", label: "8 - BPJS Jaminan Pensiun" },
  { value: "16", label: "16 - Lainnya (Taspen/pensiunan swasta)" },
];
const pipOptions = [
  { value: "1", label: "1 - Ya, aktif" },
  { value: "2", label: "2 - Ya, tidak aktif" },
  { value: "3", label: "3 - Tidak ada" },
  { value: "8", label: "8 - Tidak tau" },
];
function Blok7Form({
  data,
  umur,
  onChange,
}: {
  data: Blok7;
  umur: number;
  onChange: (field: string, value: any) => void;
}) {
  const isEligibleForKerja = umur >= 15;
  const isEligibleForPip = umur >= 5 && umur <= 30;

  useEffect(() => {
    if (!isEligibleForKerja && data["702_jaminanKetenagakerjaan"] !== 0)
      onChange("702_jaminanKetenagakerjaan", 0);
  }, [isEligibleForKerja, data, onChange]);
  useEffect(() => {
    if (!isEligibleForPip && data["703_ikutProgramPIP"] !== 0)
      onChange("703_ikutProgramPIP", 0);
  }, [isEligibleForPip, data, onChange]);

  return (
    <Card className="border-slate-200">
      {" "}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-slate-600" />
          Blok 7: Jaminan Sosial
        </CardTitle>
      </CardHeader>{" "}
      <CardContent className="space-y-4">
        {" "}
        <div className="grid md:grid-cols-2 gap-4">
          {" "}
          <div>
            <Label className="text-sm font-medium text-slate-700">
              701. Jaminan Kesehatan
            </Label>
            <Select
              value={data["701_jaminanKesehatan"]?.toString()}
              onValueChange={(value) =>
                onChange("701_jaminanKesehatan", Number.parseInt(value))
              }
            >
              <SelectTrigger
                className={`mt-1 ${getValidationClass(
                  data["701_jaminanKesehatan"]
                )}`}
              >
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                {jaminanKesehatanOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>{" "}
          <div>
            <Label
              className={`text-sm font-medium ${
                !isEligibleForKerja ? "text-slate-400" : "text-slate-700"
              }`}
            >
              702. Jaminan Ketenagakerjaan (Usia 15+)
            </Label>
            <Select
              disabled={!isEligibleForKerja}
              value={data["702_jaminanKetenagakerjaan"]?.toString()}
              onValueChange={(value) =>
                onChange("702_jaminanKetenagakerjaan", Number.parseInt(value))
              }
            >
              <SelectTrigger
                className={`mt-1 ${
                  isEligibleForKerja &&
                  getValidationClass(data["702_jaminanKetenagakerjaan"])
                }`}
              >
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                {jaminanKetenagakerjaanOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>{" "}
        </div>{" "}
        <div>
          {" "}
          <Label
            className={`text-sm font-medium ${
              !isEligibleForPip ? "text-slate-400" : "text-slate-700"
            }`}
          >
            703. Program Indonesia Pintar (Usia 5-30)
          </Label>{" "}
          <Select
            disabled={!isEligibleForPip}
            value={data["703_ikutProgramPIP"]?.toString()}
            onValueChange={(value) =>
              onChange("703_ikutProgramPIP", Number.parseInt(value))
            }
          >
            <SelectTrigger
              className={`mt-1 ${
                isEligibleForPip &&
                getValidationClass(data["703_ikutProgramPIP"])
              }`}
            >
              <SelectValue placeholder="Pilih" />
            </SelectTrigger>
            <SelectContent>
              {pipOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>{" "}
        </div>{" "}
      </CardContent>{" "}
    </Card>
  );
}
