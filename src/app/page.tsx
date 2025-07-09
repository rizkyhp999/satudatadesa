"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Users, Home, Briefcase, Zap, Droplets } from "lucide-react";
// import {
//   ValueType,
//   NameType,
// } from "recharts/types/component/DefaultTooltipContent";

interface Keluarga {
  timestamp: string;
  "101_namaKepalaKeluarga": string;
  "102_jumlahKK": string;
  "103_jumlahAnggotaKeluarga": string;
  "104_nomorKK": string;
  "105_kodeKK": string;
  "201_namaRT": string;
  "202_nomorUrutBangunan": string;
  "203_nomorUrutKeluarga": string;
  "204_alamatLengkap": string;
  "205_statusKependudukan": string;
  "801_statusKepemilikanBangunan": string;
  "802_luasLantai": string;
  "803_jenisLantai": string;
  "804_jenisDinding": string;
  "805_jenisAtap": string;
  "806_sumberAirMinum": string;
  "807_sumberAirMandi": string;
  "808a_sumberPenerangan": string;
  "808b_dayaTerpasang1": string;
  "808b_dayaTerpasang2": string;
  "808b_dayaTerpasang3": string;
  "809_bahanBakarMasak": string;
  "810a_kepemilikanFasilitasBAB": string;
  "810b_jenisKloset": string;
  "811_tempatBuangTinja": string;
  "901a_asetLahan": string;
  "901b_asetRumahLain": string;
  "902a_tabungGas": string;
  "902b_kulkas": string;
  "902c_ac": string;
  "902d_tv": string;
  "902e_emas": string;
  "902f_komputer": string;
  "902g_motor": string;
  "902h_perahuMotor": string;
  "902i_mobil": string;
  "902j_sepeda": string;
  "902k_perahu": string;
  "902l_smartphone": string;
  "903a_sapi": string;
  "903b_kerbau": string;
  "903c_kuda": string;
  "903d_babi": string;
  "903e_kambing": string;
  "904a_BPNT": string;
  "904b_PKH": string;
  "904c_BLTDesa": string;
  "904d_SubsidiListrik": string;
  "904e_BantuanPemda": string;
  "904f_SubsidiPupuk": string;
  "904g_BantuanDesa": string;
  "904g_catatan": string;
  "904h_BantuanLainnya": string;
  "904h_catatan": string;
  "905a_jenisBantuanSawit": string;
  "905b_jenisBantuanIkanLele": string;
  "905c_jenisBantuanSayurBuah": string;
  "906a_terimaBantuanSawit": string;
  "906b_terimaBantuanIkanLele": string;
  "906c_terimaBantuanSayurBuah": string;
  "907a_lanjutanBantuanSawit": string;
  "907b_lanjutanBantuanIkanLele": string;
  "907c_lanjutanBantuanSayurBuah": string;
  "908a_alasanTidakLanjutSawit": string;
  "908b_alasanTidakLanjutIkanLele": string;
  "908c_alasanTidakLanjutSayurBuah": string;
  "909a_programDukungSawit": string;
  "909a_lainnya": string;
  "909b_programDukungIkanLele": string;
  "909b_lainnya": string;
  "909c_programDukungSayurBuah": string;
  "909c_lainnya": string;
  "1001_catatan": string;
}

interface Anggota {
  nomorKK_FK: string;
  "301_nomorUrut": string;
  "302_nama": string;
  "303_nik": string;
  "304_keteranganKeberadaan": string;
  "305_kecDesaSaatIni": string;
  "306_provKabSaatIni": string;
  "307_negaraSaatIni": string;
  "308_jenisKelamin": string;
  "309_tanggalLahir": string;
  "310_umur": string;
  "311_statusPerkawinan": string;
  "312_hubunganDenganKK": string;
  "313_sedangHamil": string;
  "314_usiaKehamilan": string;
  "401_partisipasiSekolah": string;
  "402_jenjangPendidikan": string;
  "403_kelasTertinggi": string;
  "404_ijazahTertinggi": string;
  "501_bekerjaMingguLalu": string;
  "502_lapanganUsahaUtama": string;
  "503_statusPekerjaanUtama": string;
  "504_pendapatanSebulanTerakhir": string;
  "505_kepemilikanNPWP": string;
  "506_memilikiUsaha": string;
  "507_jumlahUsaha": string;
  "508_lapanganUsahaSendiri": string;
  "509_statusUsaha": string;
  "510_jumlahPekerjaTidakDibayar": string;
  "511_jumlahPekerjaDibayar": string;
  "512_kepemilikanIzinUsaha": string;
  "513_pendapatanUsahaSebulan": string;
  "601_statusDisabilitas": string;
  "602_kondisiGizi": string;
  "603_keluhanKesehatanKronis": string;
  "604_memilikiWali": string;
  "701_jaminanKesehatan": string;
  "702_jaminanKetenagakerjaan": string;
  "703_ikutProgramPIP": string;
}

interface SurveyData {
  keluarga: Keluarga[];
  anggota: Anggota[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF7C7C",
];

export default function SurveyDashboard() {
  const [data, setData] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/survei");
        const surveyData = await response.json();
        setData(surveyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Memuat data survei...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-500">Gagal memuat data survei</p>
        </div>
      </div>
    );
  }

  // Data processing functions
  const getGenderDistribution = () => {
    const genderCount = data.anggota.reduce((acc, member) => {
      const gender =
        member["308_jenisKelamin"] === "1" ? "Laki-laki" : "Perempuan";
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(genderCount).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const getAgeDistribution = () => {
    const ageGroups = {
      "0-17": 0,
      "18-30": 0,
      "31-50": 0,
      "51-65": 0,
      "65+": 0,
    };

    data.anggota.forEach((member) => {
      const age = Number.parseInt(member["310_umur"]);
      if (age <= 17) ageGroups["0-17"]++;
      else if (age <= 30) ageGroups["18-30"]++;
      else if (age <= 50) ageGroups["31-50"]++;
      else if (age <= 65) ageGroups["51-65"]++;
      else ageGroups["65+"]++;
    });

    return Object.entries(ageGroups).map(([name, value]) => ({ name, value }));
  };

  const getEducationDistribution = () => {
    const educationMap: Record<string, string> = {
      "1": "Tidak Sekolah",
      "2": "SD/Sederajat",
      "3": "SMP/Sederajat",
      "4": "SMA/Sederajat",
      "5": "Diploma",
      "6": "S1",
      "7": "S2",
      "8": "S3",
      "19": "Lainnya",
    };

    const educationCount = data.anggota.reduce((acc, member) => {
      const education =
        educationMap[member["404_ijazahTertinggi"]] || "Tidak Diketahui";
      acc[education] = (acc[education] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(educationCount).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const getEmploymentStatus = () => {
    const employmentCount = data.anggota.reduce((acc, member) => {
      const status =
        member["501_bekerjaMingguLalu"] === "1" ? "Bekerja" : "Tidak Bekerja";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(employmentCount).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const getHousingConditions = () => {
    const housingData = data.keluarga.map((family) => {
      const floorArea = Number.parseInt(family["802_luasLantai"]) || 0;
      const ownership =
        family["801_statusKepemilikanBangunan"] === "1"
          ? "Milik Sendiri"
          : "Sewa/Lainnya";
      return { floorArea, ownership, name: family["101_namaKepalaKeluarga"] };
    });

    return housingData;
  };

  const getAssetOwnership = () => {
    const assets = [
      { key: "902a_tabungGas", name: "Tabung Gas" },
      { key: "902b_kulkas", name: "Kulkas" },
      { key: "902c_ac", name: "AC" },
      { key: "902d_tv", name: "TV" },
      { key: "902f_komputer", name: "Komputer" },
      { key: "902g_motor", name: "Motor" },
      { key: "902i_mobil", name: "Mobil" },
      { key: "902l_smartphone", name: "Smartphone" },
    ];

    return assets.map((asset) => {
      const count = data.keluarga.reduce((acc, family) => {
        return acc + (family[asset.key as keyof Keluarga] === "1" ? 1 : 0);
      }, 0);
      return {
        name: asset.name,
        value: count,
        percentage: (count / data.keluarga.length) * 100,
      };
    });
  };

  const getSocialAssistance = () => {
    const assistance = [
      { key: "904a_BPNT", name: "BPNT" },
      { key: "904b_PKH", name: "PKH" },
      { key: "904c_BLTDesa", name: "BLT Desa" },
      { key: "904d_SubsidiListrik", name: "Subsidi Listrik" },
      { key: "904e_BantuanPemda", name: "Bantuan Pemda" },
    ];

    return assistance.map((item) => {
      const count = data.keluarga.reduce((acc, family) => {
        return acc + (family[item.key as keyof Keluarga] === "1" ? 1 : 0);
      }, 0);
      return {
        name: item.name,
        value: count,
        percentage: (count / data.keluarga.length) * 100,
      };
    });
  };

  const getIncomeDistribution = () => {
    const incomes = data.anggota
      .filter(
        (member) =>
          member["504_pendapatanSebulanTerakhir"] &&
          member["504_pendapatanSebulanTerakhir"] !== ""
      )
      .map((member) => ({
        name: member["302_nama"],
        income: Number.parseInt(member["504_pendapatanSebulanTerakhir"]) || 0,
      }))
      .sort((a, b) => b.income - a.income);

    return incomes;
  };

  // const percentageFormatter = (value: ValueType, name: NameType) => {
  //   if (typeof value === "number") {
  //     return [`${value.toFixed(1)}%`, name];
  //   }
  //   return [value, name];
  // };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            Dashboard Survei Keluarga
          </h1>
          <p className="text-lg text-gray-600">
            Analisis Komprehensif Data Survei Sosial Ekonomi
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Keluarga
              </CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.keluarga.length}</div>
              <p className="text-xs text-muted-foreground">
                Kepala keluarga terdaftar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Anggota
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.anggota.length}</div>
              <p className="text-xs text-muted-foreground">
                Anggota keluarga terdaftar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rata-rata Anggota
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(data.anggota.length / data.keluarga.length).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Per keluarga</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Yang Bekerja
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  data.anggota.filter((m) => m["501_bekerjaMingguLalu"] === "1")
                    .length
                }
              </div>
              <p className="text-xs text-muted-foreground">
                {(
                  (data.anggota.filter(
                    (m) => m["501_bekerjaMingguLalu"] === "1"
                  ).length /
                    data.anggota.length) *
                  100
                ).toFixed(1)}
                % dari total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="demographics" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="demographics">Demografi</TabsTrigger>
            <TabsTrigger value="education">Pendidikan</TabsTrigger>
            <TabsTrigger value="employment">Pekerjaan</TabsTrigger>
            <TabsTrigger value="housing">Perumahan</TabsTrigger>
            <TabsTrigger value="assets">Aset</TabsTrigger>
            <TabsTrigger value="assistance">Bantuan</TabsTrigger>
          </TabsList>

          {/* Demographics Tab */}
          <TabsContent value="demographics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Distribusi Jenis Kelamin</CardTitle>
                  <CardDescription>
                    Perbandingan jumlah laki-laki dan perempuan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getGenderDistribution()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          // FIX: Handle possible undefined 'percent'
                          `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getGenderDistribution().map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribusi Usia</CardTitle>
                  <CardDescription>
                    Kelompok usia anggota keluarga
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getAgeDistribution()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Member Table */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Anggota Keluarga</CardTitle>
                <CardDescription>
                  Informasi lengkap setiap anggota keluarga
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Nama
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Umur
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Jenis Kelamin
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Status Perkawinan
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Hubungan dengan KK
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Pekerjaan
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.anggota.map((member, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="border border-gray-300 px-4 py-2">
                            {member["302_nama"]}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {member["310_umur"]} tahun
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {member["308_jenisKelamin"] === "1"
                              ? "Laki-laki"
                              : "Perempuan"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {member["311_statusPerkawinan"] === "1"
                              ? "Belum Kawin"
                              : member["311_statusPerkawinan"] === "2"
                              ? "Kawin"
                              : "Cerai"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {member["312_hubunganDenganKK"] === "1"
                              ? "Kepala Keluarga"
                              : "Anggota Keluarga"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Badge
                              variant={
                                member["501_bekerjaMingguLalu"] === "1"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {member["501_bekerjaMingguLalu"] === "1"
                                ? "Bekerja"
                                : "Tidak Bekerja"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tingkat Pendidikan</CardTitle>
                  <CardDescription>
                    Distribusi ijazah tertinggi yang dimiliki
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={getEducationDistribution()}
                      layout="horizontal"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Partisipasi Sekolah</CardTitle>
                  <CardDescription>
                    Status partisipasi dalam pendidikan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.anggota.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{member["302_nama"]}</p>
                          <p className="text-sm text-gray-600">
                            Umur: {member["310_umur"]} tahun
                          </p>
                        </div>
                        <Badge
                          variant={
                            member["401_partisipasiSekolah"] === "1"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {member["401_partisipasiSekolah"] === "1"
                            ? "Masih Sekolah"
                            : member["401_partisipasiSekolah"] === "2"
                            ? "Tidak Sekolah Lagi"
                            : "Tidak Pernah Sekolah"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Employment Tab */}
          <TabsContent value="employment" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Status Pekerjaan</CardTitle>
                  <CardDescription>
                    Perbandingan yang bekerja dan tidak bekerja
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getEmploymentStatus()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          // FIX: Handle possible undefined 'percent'
                          `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getEmploymentStatus().map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribusi Pendapatan</CardTitle>
                  <CardDescription>
                    Pendapatan bulanan anggota yang bekerja
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getIncomeDistribution().slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [
                          `Rp ${Number(value).toLocaleString()}`,
                          "Pendapatan",
                        ]}
                      />
                      <Bar dataKey="income" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Employment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Pekerjaan</CardTitle>
                <CardDescription>
                  Informasi pekerjaan dan pendapatan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Nama
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Status Kerja
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Pendapatan/Bulan
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Memiliki Usaha
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          NPWP
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.anggota.map((member, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="border border-gray-300 px-4 py-2">
                            {member["302_nama"]}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Badge
                              variant={
                                member["501_bekerjaMingguLalu"] === "1"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {member["501_bekerjaMingguLalu"] === "1"
                                ? "Bekerja"
                                : "Tidak Bekerja"}
                            </Badge>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {member["504_pendapatanSebulanTerakhir"]
                              ? `Rp ${Number.parseInt(
                                  member["504_pendapatanSebulanTerakhir"]
                                ).toLocaleString()}`
                              : "-"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Badge
                              variant={
                                member["506_memilikiUsaha"] === "1"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {member["506_memilikiUsaha"] === "1"
                                ? "Ya"
                                : "Tidak"}
                            </Badge>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Badge
                              variant={
                                member["505_kepemilikanNPWP"] === "1"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {member["505_kepemilikanNPWP"] === "1"
                                ? "Ya"
                                : "Tidak"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Housing Tab */}
          <TabsContent value="housing" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Luas Lantai Rumah</CardTitle>
                  <CardDescription>
                    Distribusi luas lantai per keluarga
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getHousingConditions()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} m²`, "Luas Lantai"]}
                      />
                      <Bar dataKey="floorArea" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status Kepemilikan</CardTitle>
                  <CardDescription>
                    Status kepemilikan bangunan tempat tinggal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Milik Sendiri",
                            value: data.keluarga.filter(
                              (k) => k["801_statusKepemilikanBangunan"] === "1"
                            ).length,
                          },
                          {
                            name: "Sewa/Lainnya",
                            value: data.keluarga.filter(
                              (k) => k["801_statusKepemilikanBangunan"] !== "1"
                            ).length,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          // FIX: Handle possible undefined 'percent'
                          `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[0, 1].map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Housing Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Kondisi Rumah</CardTitle>
                <CardDescription>
                  Informasi lengkap kondisi perumahan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Kepala Keluarga
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Alamat
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Luas Lantai
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Status Kepemilikan
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Sumber Air
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Listrik
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.keluarga.map((family, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="border border-gray-300 px-4 py-2">
                            {family["101_namaKepalaKeluarga"]}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {family["204_alamatLengkap"]}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {family["802_luasLantai"]} m²
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Badge
                              variant={
                                family["801_statusKepemilikanBangunan"] === "1"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {family["801_statusKepemilikanBangunan"] === "1"
                                ? "Milik Sendiri"
                                : "Sewa/Lainnya"}
                            </Badge>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Droplets className="inline w-4 h-4 mr-1" />
                            {family["806_sumberAirMinum"] === "3"
                              ? "Air Kemasan"
                              : "Lainnya"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Zap className="inline w-4 h-4 mr-1" />
                            {family["808a_sumberPenerangan"] === "1"
                              ? "PLN"
                              : "Non-PLN"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assets Tab */}
          <TabsContent value="assets" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Kepemilikan Aset Elektronik</CardTitle>
                  <CardDescription>
                    Persentase kepemilikan berbagai aset elektronik
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getAssetOwnership()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis />
                      <Tooltip
                        // FIX: Check if value is a number before using toFixed
                        formatter={(value) => {
                          if (typeof value === "number") {
                            return [`${value.toFixed(1)}%`, "Persentase"];
                          }
                          return [value, "Persentase"];
                        }}
                      />
                      <Bar dataKey="percentage" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kepemilikan Ternak</CardTitle>
                  <CardDescription>
                    Jumlah keluarga yang memiliki ternak
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { key: "903a_sapi", name: "Sapi", icon: "🐄" },
                      { key: "903b_kerbau", name: "Kerbau", icon: "🐃" },
                      { key: "903c_kuda", name: "Kuda", icon: "🐎" },
                      { key: "903e_kambing", name: "Kambing", icon: "🐐" },
                    ].map((animal) => {
                      const count = data.keluarga.reduce((acc, family) => {
                        return (
                          acc +
                          (family[animal.key as keyof Keluarga] === "1" ? 1 : 0)
                        );
                      }, 0);
                      const percentage = (count / data.keluarga.length) * 100;

                      return (
                        <div
                          key={animal.key}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{animal.icon}</span>
                            <span className="font-medium">{animal.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{count} keluarga</div>
                            <div className="text-sm text-gray-600">
                              {percentage.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Asset Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Kepemilikan Aset</CardTitle>
                <CardDescription>
                  Rincian aset yang dimiliki setiap keluarga
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Kepala Keluarga
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center">
                          Motor
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center">
                          Mobil
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center">
                          TV
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center">
                          Kulkas
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center">
                          AC
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center">
                          Smartphone
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.keluarga.map((family, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="border border-gray-300 px-4 py-2">
                            {family["101_namaKepalaKeluarga"]}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {family["902g_motor"] === "1" ? "✅" : "❌"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {family["902i_mobil"] === "1" ? "✅" : "❌"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {family["902d_tv"] === "1" ? "✅" : "❌"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {family["902b_kulkas"] === "1" ? "✅" : "❌"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {family["902c_ac"] === "1" ? "✅" : "❌"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {family["902l_smartphone"] === "1" ? "✅" : "❌"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Assistance Tab */}
          <TabsContent value="assistance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Program Bantuan Sosial</CardTitle>
                  <CardDescription>
                    Persentase penerima berbagai program bantuan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getSocialAssistance()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        // FIX: Check if value is a number before using toFixed
                        formatter={(value) => {
                          if (typeof value === "number") {
                            return [`${value.toFixed(1)}%`, "Persentase"];
                          }
                          return [value, "Persentase"];
                        }}
                      />
                      <Bar dataKey="percentage" fill="#ff7c7c" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Program Bantuan Khusus</CardTitle>
                  <CardDescription>
                    Status penerimaan bantuan program khusus
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        key: "906a_terimaBantuanSawit",
                        name: "Bantuan Sawit",
                        icon: "🌴",
                      },
                      {
                        key: "906b_terimaBantuanIkanLele",
                        name: "Bantuan Ikan Lele",
                        icon: "🐟",
                      },
                      {
                        key: "906c_terimaBantuanSayurBuah",
                        name: "Bantuan Sayur Buah",
                        icon: "🥬",
                      },
                    ].map((program) => {
                      const count = data.keluarga.reduce((acc, family) => {
                        return (
                          acc +
                          (family[program.key as keyof Keluarga] === "1"
                            ? 1
                            : 0)
                        );
                      }, 0);
                      const percentage = (count / data.keluarga.length) * 100;

                      return (
                        <div
                          key={program.key}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{program.icon}</span>
                            <span className="font-medium">{program.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{count} keluarga</div>
                            <div className="text-sm text-gray-600">
                              {percentage.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assistance Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Penerima Bantuan</CardTitle>
                <CardDescription>
                  Status penerimaan bantuan per keluarga
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Kepala Keluarga
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center">
                          BPNT
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center">
                          PKH
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center">
                          BLT Desa
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center">
                          Subsidi Listrik
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center">
                          Bantuan Pemda
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.keluarga.map((family, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="border border-gray-300 px-4 py-2">
                            {family["101_namaKepalaKeluarga"]}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {family["904a_BPNT"] === "1" ? "✅" : "❌"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {family["904b_PKH"] === "1" ? "✅" : "❌"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {family["904c_BLTDesa"] === "1"
                              ? "✅"
                              : family["904c_BLTDesa"] === "2"
                              ? "⚠️"
                              : "❌"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {family["904d_SubsidiListrik"] === "1"
                              ? "✅"
                              : "❌"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {family["904e_BantuanPemda"] === "1" ? "✅" : "❌"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
