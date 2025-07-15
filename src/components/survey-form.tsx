"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // <--- IMPORT useRouter
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Save, FileText } from "lucide-react";
import { Blok1Component } from "./survey-blocks/blok1";
import { Blok2Component } from "./survey-blocks/blok2";
import { Blok3to7Component } from "./survey-blocks/blok3to7";
import { Blok8Component } from "./survey-blocks/blok8";
import { Blok9Component } from "./survey-blocks/blok9";
import { Blok10Component } from "./survey-blocks/blok10";
import type { SurveyResponse } from "@/types/survey";

// Data awal tidak berubah, tetap di sini untuk reset form
const initialSurveyData: SurveyResponse = {
  blok1: {
    "101_namaKepalaKeluarga": "",
    "102_jumlahKK": " ",
    "103_jumlahAnggotaKeluarga": " ",
    "104_nomorKK": " ",
    "105_kodeKK": " ",
  },
  blok2: {
    "201_namaRT": "",
    "202_nomorUrutBangunan": 0,
    "203_nomorUrutKeluarga": 0,
    "204_alamatLengkap": "",
    "205_statusKependudukan": 0,
  },
  anggotaKeluarga: [],
  blok8: {
    "801_statusKepemilikanBangunan": 0,
    "802_luasLantai": 0,
    "803_jenisLantai": 0,
    "804_jenisDinding": 0,
    "805_jenisAtap": 0,
    "806_sumberAirMinum": 0,
    "807_sumberAirMandi": 0,
    "808a_sumberPenerangan": 0,
    "808b_dayaTerpasang1": 0,
    "808b_dayaTerpasang2": 0,
    "808b_dayaTerpasang3": 0,
    "809_bahanBakarMasak": 0,
    "810a_kepemilikanFasilitasBAB": 0,
    "810b_jenisKloset": 0,
    "811_tempatBuangTinja": 0,
  },
  blok9: {
    "901a_asetLahan": 0,
    "901b_asetRumahLain": 0,
    "902a_tabungGas": 0,
    "902b_kulkas": 0,
    "902c_ac": 0,
    "902d_tv": 0,
    "902e_emas": 0,
    "902f_komputer": 0,
    "902g_motor": 0,
    "902h_perahuMotor": 0,
    "902i_mobil": 0,
    "902j_sepeda": 0,
    "902k_perahu": 0,
    "902l_smartphone": 0,
    "903a_sapi": 0,
    "903b_kerbau": 0,
    "903c_kuda": 0,
    "903d_babi": 0,
    "903e_kambing": 0,
    "904a_BPNT": 0,
    "904b_PKH": 0,
    "904c_BLTDesa": 0,
    "904d_SubsidiListrik": 0,
    "904e_BantuanPemda": 0,
    "904f_SubsidiPupuk": 0,
    "904g_BantuanDesa": 0,
    "904g_catatan": "",
    "904h_BantuanLainnya": 0,
    "904h_catatan": "",
    "905a_jenisBantuanSawit": 0,
    "905b_jenisBantuanIkanLele": 0,
    "905c_jenisBantuanSayurBuah": 0,
    "906a_terimaBantuanSawit": 0,
    "906b_terimaBantuanIkanLele": 0,
    "906c_terimaBantuanSayurBuah": 0,
    "907a_lanjutanBantuanSawit": 0,
    "907b_lanjutanBantuanIkanLele": 0,
    "907c_lanjutanBantuanSayurBuah": 0,
    "908a_alasanTidakLanjutSawit": [],
    "908b_alasanTidakLanjutIkanLele": [],
    "908c_alasanTidakLanjutSayurBuah": [],
    "909a_programDukungSawit": [],
    "909a_lainnya": "",
    "909b_programDukungIkanLele": [],
    "909b_lainnya": "",
    "909c_programDukungSayurBuah": [],
    "909c_lainnya": "",
  },
  blok10: {
    "1001_catatan": "",
  },
};

const blockTitles = [
  "Blok 1: Identitas Keluarga",
  "Blok 2: Lokasi dan Alamat",
  "Blok 3-7: Data Anggota Keluarga",
  "Blok 8: Kondisi Perumahan",
  "Blok 9: Aset dan Bantuan",
  "Blok 10: Catatan",
];

export function SurveyForm() {
  const [currentBlock, setCurrentBlock] = useState(0);
  const [surveyData, setSurveyData] =
    useState<SurveyResponse>(initialSurveyData);
  const [isSubmitting, setIsSubmitting] = useState(false); // State untuk loading
  const router = useRouter(); // <--- Inisialisasi router

  const progress = ((currentBlock + 1) / blockTitles.length) * 100;

  const handleNext = () => {
    if (currentBlock < blockTitles.length - 1) {
      setCurrentBlock(currentBlock + 1);
    }
  };

  const handlePrevious = () => {
    if (currentBlock > 0) {
      setCurrentBlock(currentBlock - 1);
    }
  };

  const handleSave = async () => {
    // Validasi catatan wajib isi
    if (!surveyData.blok10["1001_catatan"].trim()) {
      alert(
        "Mohon isi catatan pada Blok 10 terlebih dahulu sebelum menyimpan survei."
      );
      return;
    }

    setIsSubmitting(true); // Mulai proses submit, disable tombol

    try {
      const res = await fetch("/api/survei/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan");

      alert("Data survei berhasil dikirim!");

      // =====================================================================
      // PERUBAHAN UTAMA DI SINI
      // =====================================================================
      // 1. Reset state form ke kondisi awal
      setSurveyData(initialSurveyData);
      // 2. Kembali ke blok pertama
      setCurrentBlock(0);
      // 3. Refresh halaman untuk memastikan semua state (termasuk di komponen anak) bersih
      router.refresh();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      alert(`Terjadi kesalahan: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsSubmitting(false); // Selesai proses submit, aktifkan kembali tombol
    }
  };

  const renderCurrentBlock = () => {
    switch (currentBlock) {
      case 0:
        return (
          <Blok1Component
            data={surveyData.blok1}
            onChange={(data) =>
              setSurveyData((prev) => ({ ...prev, blok1: data }))
            }
          />
        );
      case 1:
        return (
          <Blok2Component
            data={surveyData.blok2}
            onChange={(data) =>
              setSurveyData((prev) => ({ ...prev, blok2: data }))
            }
          />
        );
      case 2:
        return (
          <Blok3to7Component
            data={surveyData.anggotaKeluarga}
            onChange={(data) =>
              setSurveyData((prev) => ({ ...prev, anggotaKeluarga: data }))
            }
          />
        );
      case 3:
        return (
          <Blok8Component
            data={surveyData.blok8}
            onChange={(data) =>
              setSurveyData((prev) => ({ ...prev, blok8: data }))
            }
          />
        );
      case 4:
        return (
          <Blok9Component
            data={surveyData.blok9}
            onChange={(data) =>
              setSurveyData((prev) => ({ ...prev, blok9: data }))
            }
          />
        );
      case 5:
        return (
          <Blok10Component
            data={surveyData.blok10}
            onChange={(data) =>
              setSurveyData((prev) => ({ ...prev, blok10: data }))
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-slate-800">
                {blockTitles[currentBlock]}
              </CardTitle>
              <CardDescription className="text-slate-600 mt-1">
                Langkah {currentBlock + 1} dari {blockTitles.length}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <FileText className="w-4 h-4" />
              <span>{Math.round(progress)}% Selesai</span>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8">{renderCurrentBlock()}</CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentBlock === 0 || isSubmitting}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Sebelumnya
        </Button>

        <div className="flex gap-3">
          {currentBlock < blockTitles.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              Selanjutnya
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              disabled={isSubmitting} // <-- Disable tombol saat submitting
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? "Menyimpan..." : "Selesai"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
