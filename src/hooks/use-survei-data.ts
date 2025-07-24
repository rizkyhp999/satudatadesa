"use client";

import { useState, useEffect } from "react";

export interface KeluargaData {
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

export interface AnggotaData {
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

export interface SurveiData {
  keluarga: KeluargaData[];
  anggota: AnggotaData[];
}

export default function useSurveiData() {
  const [data, setData] = useState<SurveiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/survei");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
