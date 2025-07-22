"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Home,
  ArrowDownToLine,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  LabelProps, // Import LabelProps untuk tipe yang lebih baik
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toPng } from "html-to-image";

// Tipe data untuk survei (sesuaikan jika perlu)
interface Keluarga {
  "101_namaKepalaKeluarga": string;
  "103_jumlahAnggotaKeluarga": string;
  "104_nomorKK": string;
  "201_namaRT": string;
  "204_alamatLengkap": string;
  "801_statusKepemilikanBangunan": string;
  "803_jenisLantai": string;
  "806_sumberAirMinum": string;
  "904a_BPNT"?: string;
  "904b_PKH"?: string;
  "904c_BLTDesa"?: string;
  [key: string]: any;
}

interface Anggota {
  nomorKK_FK: string;
  "302_namaLengkap": string;
  "303_nik": string;
  "305_jenisKelamin": "Laki-laki" | "Perempuan";
  "307_hubunganDenganKepalaKeluarga": string;
  [key: string]: any;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// Tipe kustom untuk label PieChart untuk mengatasi 'undefined'
interface CustomLabelProps extends LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

export default function DashboardPage() {
  const [keluargaData, setKeluargaData] = useState<Keluarga[]>([]);
  const [anggotaData, setAnggotaData] = useState<Anggota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [keluargaSearch, setKeluargaSearch] = useState("");
  const [anggotaSearch, setAnggotaSearch] = useState("");
  const [keluargaPage, setKeluargaPage] = useState(1);
  const [anggotaPage, setAnggotaPage] = useState(1);
  const ROWS_PER_PAGE = 10;

  const chartRefs = {
    distribusiRT: useRef<HTMLDivElement | null>(null),
    jenisKelamin: useRef<HTMLDivElement | null>(null),
    bantuanSosial: useRef<HTMLDivElement | null>(null),
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("/api/survey"); // Ganti dengan endpoint API GET Anda
        if (!response.ok) {
          throw new Error(`Gagal mengambil data: ${response.statusText}`);
        }
        const data = await response.json();
        setKeluargaData(data.keluarga || []);
        setAnggotaData(data.anggota || []);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Memoized data untuk performa
  const memoizedStats = useMemo(() => {
    const totalKeluarga = keluargaData.length;
    const totalAnggota = anggotaData.length;
    const avgAnggotaPerKeluarga =
      totalKeluarga > 0 ? (totalAnggota / totalKeluarga).toFixed(1) : 0;
    return { totalKeluarga, totalAnggota, avgAnggotaPerKeluarga };
  }, [keluargaData, anggotaData]);

  const memoizedDistribusiRT = useMemo(() => {
    const counts: { [key: string]: number } = {};
    keluargaData.forEach((k) => {
      const rt = k["201_namaRT"] || "Tidak Diketahui";
      counts[rt] = (counts[rt] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name,
      jumlah: value,
    }));
  }, [keluargaData]);

  const memoizedJenisKelamin = useMemo(() => {
    const counts = { "Laki-laki": 0, Perempuan: 0 };
    anggotaData.forEach((a) => {
      if (a["305_jenisKelamin"] === "Laki-laki") {
        counts["Laki-laki"]++;
      } else if (a["305_jenisKelamin"] === "Perempuan") {
        counts["Perempuan"]++;
      }
    });
    return [
      { name: "Laki-laki", value: counts["Laki-laki"] },
      { name: "Perempuan", value: counts["Perempuan"] },
    ];
  }, [anggotaData]);

  const memoizedBantuanSosial = useMemo(() => {
    const bantuanKeys: { key: keyof Keluarga; label: string }[] = [
      { key: "904a_BPNT", label: "BPNT" },
      { key: "904b_PKH", label: "PKH" },
      { key: "904c_BLTDesa", label: "BLT Desa" },
    ];
    const counts = bantuanKeys.map((b) => ({
      name: b.label,
      jumlah: keluargaData.filter((k) => k[b.key] === "Ya").length,
    }));
    return counts;
  }, [keluargaData]);

  const filteredKeluarga = useMemo(() => {
    return keluargaData.filter(
      (k) =>
        k["101_namaKepalaKeluarga"]
          .toLowerCase()
          .includes(keluargaSearch.toLowerCase()) ||
        k["104_nomorKK"].includes(keluargaSearch)
    );
  }, [keluargaData, keluargaSearch]);

  const filteredAnggota = useMemo(() => {
    return anggotaData.filter(
      (a) =>
        a["302_namaLengkap"]
          .toLowerCase()
          .includes(anggotaSearch.toLowerCase()) ||
        a["303_nik"].includes(anggotaSearch)
    );
  }, [anggotaData, anggotaSearch]);

  // Fungsi Ekspor
  const exportToXLSX = (data: any[], fileName: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, `${fileName}.xlsx`);
  };

  // PERBAIKAN: Mengubah tipe parameter chartRef
  const exportChartToPNG = (
    chartRef: React.RefObject<HTMLDivElement | null>,
    fileName: string
  ) => {
    if (chartRef.current) {
      toPng(chartRef.current, { cacheBust: true })
        // PERBAIKAN: Memberikan tipe eksplisit pada parameter
        .then((dataUrl: string) => {
          saveAs(dataUrl, `${fileName}.png`);
        })
        .catch((err: any) => {
          console.error("Gagal mengekspor grafik:", err);
        });
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const renderPagination = (
    totalItems: number,
    currentPage: number,
    setPage: (page: number) => void
  ) => {
    const totalPages = Math.ceil(totalItems / ROWS_PER_PAGE);
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-end space-x-2 py-4">
        <span className="text-sm text-muted-foreground">
          Halaman {currentPage} dari {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  // PERBAIKAN: Fungsi label dengan guard clause untuk menangani nilai undefined
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } =
      props as CustomLabelProps;

    // Guard clause
    if (percent === undefined || midAngle === undefined) {
      return null;
    }

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dasbor Survei
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Analisis komprehensif dari data survei yang terkumpul.
            </p>
          </motion.div>

          {/* Statistik Utama */}
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={cardVariants}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Keluarga
                  </CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {memoizedStats.totalKeluarga}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Jumlah keluarga yang telah disurvei
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Anggota Keluarga
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {memoizedStats.totalAnggota}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Jumlah seluruh individu dalam survei
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Rata-rata Anggota/Keluarga
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {memoizedStats.avgAnggotaPerKeluarga}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Rata-rata jumlah anggota dalam satu keluarga
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Visualisasi Data */}
          <motion.div
            className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="lg:col-span-2" variants={cardVariants}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Distribusi Keluarga per RT</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        exportChartToPNG(
                          chartRefs.distribusiRT,
                          "distribusi-rt"
                        )
                      }
                    >
                      <ArrowDownToLine className="mr-2 h-4 w-4" />
                      PNG
                    </Button>
                  </div>
                </CardHeader>
                <CardContent
                  ref={chartRefs.distribusiRT}
                  className="bg-white p-4"
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={memoizedDistribusiRT}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="jumlah"
                        fill="#8884d8"
                        name="Jumlah Keluarga"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Distribusi Jenis Kelamin</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        exportChartToPNG(
                          chartRefs.jenisKelamin,
                          "distribusi-jenis-kelamin"
                        )
                      }
                    >
                      <ArrowDownToLine className="mr-2 h-4 w-4" />
                      PNG
                    </Button>
                  </div>
                </CardHeader>
                <CardContent
                  ref={chartRefs.jenisKelamin}
                  className="bg-white p-4"
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={memoizedJenisKelamin}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderCustomizedLabel} // PERBAIKAN: Menggunakan fungsi render yang aman
                      >
                        {memoizedJenisKelamin.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div className="lg:col-span-3" variants={cardVariants}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Penerima Bantuan Sosial</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        exportChartToPNG(
                          chartRefs.bantuanSosial,
                          "penerima-bantuan-sosial"
                        )
                      }
                    >
                      <ArrowDownToLine className="mr-2 h-4 w-4" />
                      PNG
                    </Button>
                  </div>
                </CardHeader>
                <CardContent
                  ref={chartRefs.bantuanSosial}
                  className="bg-white p-4"
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={memoizedBantuanSosial} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={80} />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="jumlah"
                        fill="#00C49F"
                        name="Jumlah Penerima"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Tabel Data */}
          <motion.div
            className="mt-8 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* Tabel Keluarga */}
            <Card>
              <CardHeader>
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Data Keluarga</CardTitle>
                    <p className="mt-1 text-sm text-gray-500">
                      Detail semua keluarga yang disurvei.
                    </p>
                  </div>
                  <div className="flex w-full items-center gap-2 sm:w-auto">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Cari KK atau Nama..."
                        className="w-full rounded-lg bg-background pl-8"
                        value={keluargaSearch}
                        onChange={(e) => {
                          setKeluargaSearch(e.target.value);
                          setKeluargaPage(1);
                        }}
                      />
                    </div>
                    <Button
                      onClick={() =>
                        exportToXLSX(filteredKeluarga, "data-keluarga")
                      }
                    >
                      <ArrowDownToLine className="mr-2 h-4 w-4" />
                      XLSX
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>No. KK</TableHead>
                        <TableHead>Kepala Keluarga</TableHead>
                        <TableHead>Alamat</TableHead>
                        <TableHead>RT</TableHead>
                        <TableHead className="text-center">
                          Jml Anggota
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredKeluarga
                        .slice(
                          (keluargaPage - 1) * ROWS_PER_PAGE,
                          keluargaPage * ROWS_PER_PAGE
                        )
                        .map((keluarga, i) => (
                          <TableRow key={`${keluarga["104_nomorKK"]}-${i}`}>
                            <TableCell className="font-medium">
                              {keluarga["104_nomorKK"]}
                            </TableCell>
                            <TableCell>
                              {keluarga["101_namaKepalaKeluarga"]}
                            </TableCell>
                            <TableCell>
                              {keluarga["204_alamatLengkap"]}
                            </TableCell>
                            <TableCell>{keluarga["201_namaRT"]}</TableCell>
                            <TableCell className="text-center">
                              {keluarga["103_jumlahAnggotaKeluarga"]}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
                {renderPagination(
                  filteredKeluarga.length,
                  keluargaPage,
                  setKeluargaPage
                )}
              </CardContent>
            </Card>

            {/* Tabel Anggota */}
            <Card>
              <CardHeader>
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Data Anggota Keluarga</CardTitle>
                    <p className="mt-1 text-sm text-gray-500">
                      Detail semua anggota keluarga yang disurvei.
                    </p>
                  </div>
                  <div className="flex w-full items-center gap-2 sm:w-auto">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Cari NIK atau Nama..."
                        className="w-full rounded-lg bg-background pl-8"
                        value={anggotaSearch}
                        onChange={(e) => {
                          setAnggotaSearch(e.target.value);
                          setAnggotaPage(1);
                        }}
                      />
                    </div>
                    <Button
                      onClick={() =>
                        exportToXLSX(filteredAnggota, "data-anggota")
                      }
                    >
                      <ArrowDownToLine className="mr-2 h-4 w-4" />
                      XLSX
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>NIK</TableHead>
                        <TableHead>Nama Lengkap</TableHead>
                        <TableHead>Jenis Kelamin</TableHead>
                        <TableHead>Hubungan</TableHead>
                        <TableHead>No. KK (Induk)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAnggota
                        .slice(
                          (anggotaPage - 1) * ROWS_PER_PAGE,
                          anggotaPage * ROWS_PER_PAGE
                        )
                        .map((anggota, i) => (
                          <TableRow key={`${anggota["303_nik"]}-${i}`}>
                            <TableCell className="font-medium">
                              {anggota["303_nik"]}
                            </TableCell>
                            <TableCell>{anggota["302_namaLengkap"]}</TableCell>
                            <TableCell>{anggota["305_jenisKelamin"]}</TableCell>
                            <TableCell>
                              {anggota["307_hubunganDenganKepalaKeluarga"]}
                            </TableCell>
                            <TableCell>{anggota.nomorKK_FK}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
                {renderPagination(
                  filteredAnggota.length,
                  anggotaPage,
                  setAnggotaPage
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
