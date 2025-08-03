"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles } from "lucide-react";

// Data wilayah (copy dari wilayah.tsx)
const PROVINSI = [{ kode: "65", nama: "Kalimantan Utara" }];
const KABUPATEN = [{ kode: "03", nama: "Kabupaten Tana Tidung" }];
const KECAMATAN_DESA = [
  // ...existing kecamatan-desa array from wilayah.tsx...
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

// Kecamatan unik
const KECAMATAN_LIST = Array.from(
  new Map(KECAMATAN_DESA.map((d) => [d.kecKode, d.kecNama])).entries()
).map(([kode, nama]) => ({ kode, nama }));

export default function Page() {
  const router = useRouter();
  const [wilayah, setWilayah] = useState({
    kode_provinsi: "65",
    kode_kabupaten: "03",
    kode_kecamatan: "",
    kode_desa: "",
  });

  // Desa sesuai kecamatan terpilih
  const desaOptions = KECAMATAN_DESA.filter(
    (d) => d.kecKode === wilayah.kode_kecamatan
  );

  // Tombol aktif jika semua kode terisi
  const canGo =
    wilayah.kode_provinsi &&
    wilayah.kode_kabupaten &&
    wilayah.kode_kecamatan &&
    wilayah.kode_desa;

  function handleEnter() {
    if (canGo) {
      router.push(
        `dashboard/${wilayah.kode_provinsi}/${wilayah.kode_kabupaten}/${wilayah.kode_kecamatan}/${wilayah.kode_desa}`
      );
    }
  }

  // Floating animation for icon
  const floatAnim = {
    animate: {
      y: [0, -10, 0, 10, 0],
      rotate: [0, 2, 0, -2, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-neutral-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="mb-8 flex flex-col items-center"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
      >
        <motion.div {...floatAnim}>
          <Sparkles className="w-12 h-12 text-black dark:text-white mb-2" />
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-black dark:text-white mb-2 tracking-tight"
          initial={{ letterSpacing: "-0.05em" }}
          animate={{ letterSpacing: "0.01em" }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          Selamat Datang di Dashboard Satu Data Desa
        </motion.h1>
        <motion.p
          className="text-lg text-neutral-600 dark:text-neutral-300 max-w-xl text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          Pilih wilayah desa yang ingin Anda analisis.
          <br />
          Data demografis dan sosial ekonomi tersedia untuk seluruh desa di
          Kabupaten Tana Tidung, Kalimantan Utara.
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="shadow-xl border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black">
          <CardHeader>
            <CardTitle className="text-black dark:text-white">
              Pilih Wilayah
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-4">
            {/* Provinsi */}
            <div>
              <Label htmlFor="provinsi" className="text-black dark:text-white">
                Provinsi
              </Label>
              <Select
                value={wilayah.kode_provinsi}
                onValueChange={(kode) =>
                  setWilayah((w) => ({
                    ...w,
                    kode_provinsi: kode,
                    kode_kabupaten: "03",
                  }))
                }
                defaultValue="65"
              >
                <SelectTrigger
                  id="provinsi"
                  className="w-full bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
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
              <Label htmlFor="kabupaten" className="text-black dark:text-white">
                Kabupaten
              </Label>
              <Select
                value={wilayah.kode_kabupaten}
                onValueChange={(kode) =>
                  setWilayah((w) => ({
                    ...w,
                    kode_kabupaten: kode,
                  }))
                }
                defaultValue="03"
              >
                <SelectTrigger
                  id="kabupaten"
                  className="w-full bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
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
              <Label htmlFor="kecamatan" className="text-black dark:text-white">
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
                  className="w-full bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
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
              <Label htmlFor="desa" className="text-black dark:text-white">
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
                  className="w-full bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
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
          </CardContent>
        </Card>
        <div className="flex justify-center mt-8">
          <motion.div
            whileHover={{
              scale: canGo ? 1.07 : 1,
              rotate: canGo ? [0, 2] : 0, // Only two keyframes allowed
            }}
            whileTap={{ scale: canGo ? 0.97 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              size="lg"
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-2 text-lg font-semibold shadow-lg border border-neutral-300 dark:border-neutral-700 cursor-pointer"
              disabled={!canGo}
              onClick={handleEnter}
            >
              Lihat Dashboard Desa
            </Button>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        className="mt-12 text-neutral-400 text-xs flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div>
          &copy; {new Date().getFullYear()} Satu Data Desa | Kabupaten Tana
          Tidung
        </div>
        <div className="mt-1 flex items-center gap-1">
          <span>Powered by</span>
          <span className="font-semibold text-blue-700 dark:text-blue-400">
            BPS Kabupaten Tana Tidung
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
