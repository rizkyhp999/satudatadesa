"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Download, Sun, Moon } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useSurveiData from "@/hooks/use-survei-data";
import { SummaryStats } from "@/components/dashboard/summary-stats";
import Diagram from "@/components/dashboard/diagram";
import Diagram2 from "@/components/dashboard/diagram2";
import T1p1_4 from "@/components/dashboard/t1p1_4";
import T1p5 from "@/components/dashboard/t1p5";
import T1p6 from "@/components/dashboard/t1p6";
import T1p7 from "@/components/dashboard/t1p7";
import T1p8 from "@/components/dashboard/t1p8";
import T1p9 from "@/components/dashboard/t1p9";
import T2p1 from "@/components/dashboard/t2p1";
import T2p2 from "@/components/dashboard/t2p2";
import T2p3 from "@/components/dashboard/t2p3";
import T2p4 from "@/components/dashboard/t2p4";
import T2p5 from "@/components/dashboard/t2p5";
import T2p6 from "@/components/dashboard/t2p6";
import T2p7 from "@/components/dashboard/t2p7";
import T3p1 from "@/components/dashboard/t3p1";
import T3p2 from "@/components/dashboard/t3p2";
import T3p3 from "@/components/dashboard/t3p3";
import T3p4 from "@/components/dashboard/t3p4";
import T3p5 from "@/components/dashboard/t3p5";
import T3p6 from "@/components/dashboard/t3p6";
import T3p7 from "@/components/dashboard/t3p7";
import T3p8 from "@/components/dashboard/t3p8";
import T3p9 from "@/components/dashboard/t3p9";
import T3p10 from "@/components/dashboard/t3p10";
import T3p11 from "@/components/dashboard/t3p11";
import T4p1 from "@/components/dashboard/t4p1";
import T4p2 from "@/components/dashboard/t4p2";
import T4p3 from "@/components/dashboard/t4p3";

// helper function untuk class merge
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// Data wilayah (copy dari halaman awal)
const PROVINSI = [{ kode: "65", nama: "Kalimantan Utara" }];
const KABUPATEN = [{ kode: "03", nama: "Kabupaten Tana Tidung" }];
const KECAMATAN_DESA = [
  {
    kecKode: "010",
    kecNama: "MURUK RIAN",
    desaKode: "001",
    desaNama: "BALAYAN ARI",
  },
  {
    kecKode: "010",
    kecNama: "MURUK RIAN",
    desaKode: "002",
    desaNama: "SEPUTUK",
  },
  { kecKode: "010", kecNama: "MURUK RIAN", desaKode: "003", desaNama: "RIAN" },
  {
    kecKode: "010",
    kecNama: "MURUK RIAN",
    desaKode: "004",
    desaNama: "KAPUAK",
  },
  {
    kecKode: "010",
    kecNama: "MURUK RIAN",
    desaKode: "005",
    desaNama: "RIAN RAYO",
  },
  {
    kecKode: "010",
    kecNama: "MURUK RIAN",
    desaKode: "006",
    desaNama: "SAPARI",
  },
  { kecKode: "020", kecNama: "SESAYAP", desaKode: "001", desaNama: "SEDULUN" },
  {
    kecKode: "020",
    kecNama: "SESAYAP",
    desaKode: "002",
    desaNama: "LIMBU SEDULUN",
  },
  { kecKode: "020", kecNama: "SESAYAP", desaKode: "003", desaNama: "GUNAWAN" },
  {
    kecKode: "020",
    kecNama: "SESAYAP",
    desaKode: "004",
    desaNama: "TIDENG PALE",
  },
  {
    kecKode: "020",
    kecNama: "SESAYAP",
    desaKode: "005",
    desaNama: "TIDENG PALE TIMUR",
  },
  { kecKode: "020", kecNama: "SESAYAP", desaKode: "006", desaNama: "SEBIDAI" },
  { kecKode: "020", kecNama: "SESAYAP", desaKode: "007", desaNama: "SEBAWANG" },
  { kecKode: "030", kecNama: "BETAYAU", desaKode: "001", desaNama: "MENDUPO" },
  { kecKode: "030", kecNama: "BETAYAU", desaKode: "002", desaNama: "PERIUK" },
  { kecKode: "030", kecNama: "BETAYAU", desaKode: "003", desaNama: "BEBAKUNG" },
  { kecKode: "030", kecNama: "BETAYAU", desaKode: "004", desaNama: "KUJAU" },
  { kecKode: "030", kecNama: "BETAYAU", desaKode: "005", desaNama: "MANING" },
  {
    kecKode: "030",
    kecNama: "BETAYAU",
    desaKode: "006",
    desaNama: "BUONG BARU",
  },
  {
    kecKode: "040",
    kecNama: "SESAYAP HILIR",
    desaKode: "001",
    desaNama: "SELUDAU",
  },
  {
    kecKode: "040",
    kecNama: "SESAYAP HILIR",
    desaKode: "002",
    desaNama: "SESAYAP",
  },
  {
    kecKode: "040",
    kecNama: "SESAYAP HILIR",
    desaKode: "003",
    desaNama: "SEPALA DALUNG",
  },
  {
    kecKode: "050",
    kecNama: "TANA LIA",
    desaKode: "001",
    desaNama: "TANAH MERAH",
  },
  {
    kecKode: "050",
    kecNama: "TANA LIA",
    desaKode: "002",
    desaNama: "SAMBUNGAN",
  },
  {
    kecKode: "050",
    kecNama: "TANA LIA",
    desaKode: "004",
    desaNama: "TANAH MERAH BARAT",
  },
  {
    kecKode: "050",
    kecNama: "TANA LIA",
    desaKode: "005",
    desaNama: "SAMBUNGAN SELATAN",
  },
];

const KECAMATAN_LIST = Array.from(
  new Map(KECAMATAN_DESA.map((d) => [d.kecKode, d.kecNama])).entries()
).map(([kode, nama]) => ({ kode, nama }));

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const kode_provinsi = Array.isArray(params?.prov)
    ? params.prov[0]
    : params?.prov;
  const kode_kabupaten = Array.isArray(params?.kab)
    ? params.kab[0]
    : params?.kab;
  const kode_kecamatan = Array.isArray(params?.kec)
    ? params.kec[0]
    : params?.kec;
  const kode_desa = Array.isArray(params?.desa) ? params.desa[0] : params?.desa;

  // State untuk select wilayah
  const [wilayah, setWilayah] = useState({
    kode_provinsi: kode_provinsi || "65",
    kode_kabupaten: kode_kabupaten || "03",
    kode_kecamatan: kode_kecamatan || "",
    kode_desa: kode_desa || "",
  });
  const [tab, setTab] = useState("t1p1_4");
  const [dark, setDark] = useState(false);

  // Toggle dark mode pada <html>
  function toggleDark() {
    setDark((d) => {
      const next = !d;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  }

  // Nama wilayah
  const provinsiNama =
    PROVINSI.find((p) => p.kode === wilayah.kode_provinsi)?.nama || "";
  const kabupatenNama =
    KABUPATEN.find((k) => k.kode === wilayah.kode_kabupaten)?.nama || "";
  const kecamatanNama =
    KECAMATAN_LIST.find((k) => k.kode === wilayah.kode_kecamatan)?.nama || "";
  const desaNama =
    KECAMATAN_DESA.find(
      (d) =>
        d.kecKode === wilayah.kode_kecamatan && d.desaKode === wilayah.kode_desa
    )?.desaNama || "";

  // Desa sesuai kecamatan terpilih
  const desaOptions = KECAMATAN_DESA.filter(
    (d) => d.kecKode === wilayah.kode_kecamatan
  );

  // Navigasi jika semua kode terisi
  function handlePilihWilayah() {
    if (
      wilayah.kode_provinsi &&
      wilayah.kode_kabupaten &&
      wilayah.kode_kecamatan &&
      wilayah.kode_desa
    ) {
      router.push(
        `/dashboard/${wilayah.kode_provinsi}/${wilayah.kode_kabupaten}/${wilayah.kode_kecamatan}/${wilayah.kode_desa}`
      );
    }
  }

  // Kirim kode wilayah ke useSurveiData
  const { data, loading, error } = useSurveiData({
    kode_provinsi,
    kode_kabupaten,
    kode_kecamatan,
    kode_desa,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Memuat data survei...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-lg">Error: {error}</p>
          <p className="text-sm mt-2">
            Pastikan API server berjalan di http://localhost:3000/api/survei
          </p>
        </div>
      </div>
    );
  }

  // Data sudah terfilter dari API, tidak perlu filter manual
  const filteredData = data;

  if (!filteredData || filteredData.keluarga.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl mb-4">
            Tidak ada data tersedia untuk wilayah ini
          </p>
          {/* Pilih Wilayah */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-end gap-4 mb-2 w-full max-w-2xl mx-auto">
            {/* Provinsi */}
            <div className="w-full sm:w-auto flex-1 min-w-[140px] max-w-xs">
              <Label
                htmlFor="provinsi"
                className="text-gray-700 dark:text-white"
              >
                Provinsi
              </Label>
              <Select
                value={wilayah.kode_provinsi}
                onValueChange={(kode) =>
                  setWilayah((w) => ({
                    ...w,
                    kode_provinsi: kode,
                    kode_kabupaten: "03",
                    kode_kecamatan: "",
                    kode_desa: "",
                  }))
                }
                defaultValue="65"
              >
                <SelectTrigger
                  id="provinsi"
                  className="w-40 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
                >
                  <SelectValue placeholder="Pilih Provinsi" />
                </SelectTrigger>
                <SelectContent>
                  {PROVINSI.map((p) => (
                    <SelectItem
                      key={p.kode}
                      value={p.kode}
                      className="text-black dark:text-white"
                    >
                      {p.kode} - {p.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Kabupaten */}
            <div className="w-full sm:w-auto flex-1 min-w-[180px] max-w-xs">
              <Label
                htmlFor="kabupaten"
                className="text-gray-700 dark:text-white"
              >
                Kabupaten
              </Label>
              <Select
                value={wilayah.kode_kabupaten}
                onValueChange={(kode) =>
                  setWilayah((w) => ({
                    ...w,
                    kode_kabupaten: kode,
                    kode_kecamatan: "",
                    kode_desa: "",
                  }))
                }
                defaultValue="03"
              >
                <SelectTrigger
                  id="kabupaten"
                  className="w-52 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
                >
                  <SelectValue placeholder="Pilih Kabupaten" />
                </SelectTrigger>
                <SelectContent>
                  {KABUPATEN.map((k) => (
                    <SelectItem
                      key={k.kode}
                      value={k.kode}
                      className="text-black dark:text-white"
                    >
                      {k.kode} - {k.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Kecamatan */}
            <div className="w-full sm:w-auto flex-1 min-w-[180px] max-w-xs">
              <Label
                htmlFor="kecamatan"
                className="text-gray-700 dark:text-white"
              >
                Kecamatan
              </Label>
              <Select
                value={wilayah.kode_kecamatan}
                onValueChange={(kode) =>
                  setWilayah((w) => ({
                    ...w,
                    kode_kecamatan: kode,
                    kode_desa: "",
                  }))
                }
              >
                <SelectTrigger
                  id="kecamatan"
                  className="w-52 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
                >
                  <SelectValue placeholder="Pilih Kecamatan" />
                </SelectTrigger>
                <SelectContent>
                  {KECAMATAN_LIST.map((k) => (
                    <SelectItem
                      key={k.kode}
                      value={k.kode}
                      className="text-black dark:text-white"
                    >
                      [{k.kode}] {k.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Desa */}
            <div className="w-full sm:w-auto flex-1 min-w-[180px] max-w-xs">
              <Label htmlFor="desa" className="text-gray-700 dark:text-white">
                Desa
              </Label>
              <Select
                value={wilayah.kode_desa}
                onValueChange={(kode) =>
                  setWilayah((w) => ({
                    ...w,
                    kode_desa: kode,
                  }))
                }
                disabled={!wilayah.kode_kecamatan}
              >
                <SelectTrigger
                  id="desa"
                  className="w-52 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
                >
                  <SelectValue placeholder="Pilih Desa" />
                </SelectTrigger>
                <SelectContent>
                  {KECAMATAN_DESA.filter(
                    (d) => d.kecKode === wilayah.kode_kecamatan
                  ).map((d) => (
                    <SelectItem
                      key={d.desaKode}
                      value={d.desaKode}
                      className="text-black dark:text-white"
                    >
                      [{d.desaKode}] {d.desaNama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Tombol navigasi */}
            <div className="w-full sm:w-auto flex items-end self-end sm:self-auto">
              <Button
                className="ml-0 sm:ml-2 mt-6 bg-black dark:bg-white text-white dark:text-black border border-neutral-300 dark:border-neutral-700 cursor-pointer w-full sm:w-auto"
                disabled={
                  !(
                    wilayah.kode_provinsi &&
                    wilayah.kode_kabupaten &&
                    wilayah.kode_kecamatan &&
                    wilayah.kode_desa
                  )
                }
                onClick={() => {
                  if (
                    wilayah.kode_provinsi &&
                    wilayah.kode_kabupaten &&
                    wilayah.kode_kecamatan &&
                    wilayah.kode_desa
                  ) {
                    // Navigasi ke dashboard wilayah baru
                    router.push(
                      `/dashboard/${wilayah.kode_provinsi}/${wilayah.kode_kabupaten}/${wilayah.kode_kecamatan}/${wilayah.kode_desa}`
                    );
                  }
                }}
                size="sm"
              >
                Pilih Wilayah Lain
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 relative"
        >
          {/* Tombol darkmode kanan atas */}
          <button
            onClick={toggleDark}
            className="absolute right-0 top-0 p-2 rounded-full bg-white dark:bg-gray-800 border shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
            type="button"
          >
            {dark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard Analisis Data Survei
            {desaNama && (
              <span className="block text-2xl font-semibold text-blue-700 dark:text-blue-400 mt-2">
                Desa {desaNama}
              </span>
            )}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Visualisasi Data Demografis dan Sosial Ekonomi
          </p>
          {/* Pilih Wilayah */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {/* Provinsi */}
            <div>
              <Label
                htmlFor="provinsi"
                className="text-gray-700 dark:text-white"
              >
                Provinsi
              </Label>
              <Select
                value={wilayah.kode_provinsi}
                onValueChange={(kode) =>
                  setWilayah((w) => ({
                    ...w,
                    kode_provinsi: kode,
                    kode_kabupaten: "03",
                    kode_kecamatan: "",
                    kode_desa: "",
                  }))
                }
                defaultValue="65"
              >
                <SelectTrigger
                  id="provinsi"
                  className="w-40 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
                >
                  <SelectValue placeholder="Pilih Provinsi" />
                </SelectTrigger>
                <SelectContent>
                  {PROVINSI.map((p) => (
                    <SelectItem
                      key={p.kode}
                      value={p.kode}
                      className="text-black dark:text-white"
                    >
                      {p.kode} - {p.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Kabupaten */}
            <div>
              <Label
                htmlFor="kabupaten"
                className="text-gray-700 dark:text-white"
              >
                Kabupaten
              </Label>
              <Select
                value={wilayah.kode_kabupaten}
                onValueChange={(kode) =>
                  setWilayah((w) => ({
                    ...w,
                    kode_kabupaten: kode,
                    kode_kecamatan: "",
                    kode_desa: "",
                  }))
                }
                defaultValue="03"
              >
                <SelectTrigger
                  id="kabupaten"
                  className="w-52 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
                >
                  <SelectValue placeholder="Pilih Kabupaten" />
                </SelectTrigger>
                <SelectContent>
                  {KABUPATEN.map((k) => (
                    <SelectItem
                      key={k.kode}
                      value={k.kode}
                      className="text-black dark:text-white"
                    >
                      {k.kode} - {k.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Kecamatan */}
            <div>
              <Label
                htmlFor="kecamatan"
                className="text-gray-700 dark:text-white"
              >
                Kecamatan
              </Label>
              <Select
                value={wilayah.kode_kecamatan}
                onValueChange={(kode) =>
                  setWilayah((w) => ({
                    ...w,
                    kode_kecamatan: kode,
                    kode_desa: "",
                  }))
                }
              >
                <SelectTrigger
                  id="kecamatan"
                  className="w-52 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
                >
                  <SelectValue placeholder="Pilih Kecamatan" />
                </SelectTrigger>
                <SelectContent>
                  {KECAMATAN_LIST.map((k) => (
                    <SelectItem
                      key={k.kode}
                      value={k.kode}
                      className="text-black dark:text-white"
                    >
                      [{k.kode}] {k.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Desa */}
            <div>
              <Label htmlFor="desa" className="text-gray-700 dark:text-white">
                Desa
              </Label>
              <Select
                value={wilayah.kode_desa}
                onValueChange={(kode) =>
                  setWilayah((w) => ({
                    ...w,
                    kode_desa: kode,
                  }))
                }
                disabled={!wilayah.kode_kecamatan}
              >
                <SelectTrigger
                  id="desa"
                  className="w-52 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
                >
                  <SelectValue placeholder="Pilih Desa" />
                </SelectTrigger>
                <SelectContent>
                  {desaOptions.map((d) => (
                    <SelectItem
                      key={d.desaKode}
                      value={d.desaKode}
                      className="text-black dark:text-white"
                    >
                      [{d.desaKode}] {d.desaNama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Tombol navigasi */}
            <div className="flex items-end">
              <Button
                className="ml-2 mt-6 bg-black dark:bg-white text-white dark:text-black border border-neutral-300 dark:border-neutral-700 cursor-pointer"
                disabled={
                  !(
                    wilayah.kode_provinsi &&
                    wilayah.kode_kabupaten &&
                    wilayah.kode_kecamatan &&
                    wilayah.kode_desa
                  )
                }
                onClick={handlePilihWilayah}
                size="sm"
              >
                Pilih Wilayah
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <SummaryStats data={filteredData} />

        {/* Diagram Pie Charts Side by Side */}
        <div className="mb-8 flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="flex-1">
            <Diagram data={filteredData} />
          </div>
          <div className="flex-1">
            <Diagram2 data={filteredData} />
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs.Root value={tab} onValueChange={setTab} className="mt-10 w-full">
          <Tabs.List className="flex flex-wrap gap-2 border-b pb-2">
            <Tabs.Trigger
              value="t1p1_4"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t1p1_4"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Perangkat
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t1p5"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t1p5"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Keluarga SLS
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t1p6"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t1p6"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Status Keluarga
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t1p7"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t1p7"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Penduduk SLS
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t1p8"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t1p8"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Umur & Gender
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t1p9"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t1p9"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Perkawinan
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t2p1"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t2p1"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Pendidikan 5+
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t2p2"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t2p2"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Pendidikan 7-23
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t2p3"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t2p3"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Ijazah
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t2p4"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t2p4"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Kerja
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t2p5"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t2p5"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Usaha
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t2p6"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t2p6"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Pertanian
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t2p7"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t2p7"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Jaminan Kesehatan
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t3p1"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t3p1"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Kepemilikan Rumah
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t3p2"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t3p2"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Lantai
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t3p3"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t3p3"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Dinding
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t3p4"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t3p4"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Atap
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t3p5"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t3p5"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Fasilitas BAB
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t3p6"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t3p6"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Air Minum
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t3p7"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t3p7"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Air Mandi
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t3p8"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t3p8"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Penerangan
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t3p9"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t3p9"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Energi Masak
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t3p10"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t3p10"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Kloset
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t3p11"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t3p11"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Pembuangan Tinja
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t4p1"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t4p1"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Bantuan
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t4p2"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t4p2"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Bantuan Tani
            </Tabs.Trigger>
            <Tabs.Trigger
              value="t4p3"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                tab === "t4p3"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              Keberlanjutan
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="t1p1_4" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 1.1-1.4: Perangkat, SLS, Organisasi, Batas Wilayah
            </div>
            <T1p1_4 />
          </Tabs.Content>

          <Tabs.Content value="t1p5" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 1.5: Keluarga SLS
            </div>
            <T1p5 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t1p6" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 1.6: Status Keluarga
            </div>
            <T1p6 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t1p7" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 1.7: Penduduk SLS & Gender
            </div>
            <T1p7 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t1p8" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 1.8: Umur & Gender
            </div>
            <T1p8 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t1p9" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 1.9: Perkawinan
            </div>
            <T1p9 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t2p1" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 2.1: Pendidikan 5+
            </div>
            <T2p1 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t2p2" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 2.2: Pendidikan 7-23
            </div>
            <T2p2 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t2p3" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 2.3: Ijazah Tertinggi
            </div>
            {/* <T2p3 data={filteredData} /> */}
            <T2p3 />
          </Tabs.Content>

          <Tabs.Content value="t2p4" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 2.4: Kerja
            </div>
            <T2p4 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t2p5" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 2.5: Usaha
            </div>
            <T2p5 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t2p6" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 2.6: Pertanian
            </div>
            <T2p6 data={filteredData} />
          </Tabs.Content>

          <Tabs.Content value="t2p7" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 2.7: Jaminan Kesehatan
            </div>
            <T2p7 />
          </Tabs.Content>

          <Tabs.Content value="t3p1" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 3.1: Kepemilikan Rumah
            </div>
            <T3p1 />
          </Tabs.Content>

          <Tabs.Content value="t3p2" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 3.2: Lantai Rumah
            </div>
            <T3p2 />
          </Tabs.Content>

          <Tabs.Content value="t3p3" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 3.3: Dinding Rumah
            </div>
            <T3p3 />
          </Tabs.Content>

          <Tabs.Content value="t3p4" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 3.4: Atap Rumah
            </div>
            <T3p4 />
          </Tabs.Content>

          <Tabs.Content value="t3p5" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 3.5: Fasilitas BAB
            </div>
            <T3p5 />
          </Tabs.Content>

          <Tabs.Content value="t3p6" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 3.6: Air Minum
            </div>
            <T3p6 />
          </Tabs.Content>

          <Tabs.Content value="t3p7" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 3.7: Air Mandi
            </div>
            <T3p7 />
          </Tabs.Content>

          <Tabs.Content value="t3p8" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 3.8: Penerangan
            </div>
            <T3p8 />
          </Tabs.Content>

          <Tabs.Content value="t3p9" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 3.9: Energi Masak
            </div>
            <T3p9 />
          </Tabs.Content>

          <Tabs.Content value="t3p10" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 3.10: Kloset
            </div>
            <T3p10 />
          </Tabs.Content>

          <Tabs.Content value="t3p11" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 3.11: Pembuangan Tinja
            </div>
            <T3p11 />
          </Tabs.Content>

          <Tabs.Content value="t4p1" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 4.1: Bantuan
            </div>
            <T4p1 />
          </Tabs.Content>

          <Tabs.Content value="t4p2" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 4.2: Bantuan Tani
            </div>
            <T4p2 />
          </Tabs.Content>

          <Tabs.Content value="t4p3" className="mt-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              Tabel 4.3: Keberlanjutan Bantuan
            </div>
            <T4p3 />
          </Tabs.Content>
        </Tabs.Root>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12 py-8 border-t border-gray-200"
        >
          <p className="text-gray-500">
            Dashboard ini menampilkan {filteredData.keluarga.length} keluarga
            dan {filteredData.anggota.length} penduduk
          </p>
        </motion.div>
      </div>
    </div>
  );
}
