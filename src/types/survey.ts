// types/survey.ts

export interface Blok1 {
  "101_namaKepalaKeluarga": string;
  "102_jumlahKK": string;
  "103_jumlahAnggotaKeluarga": string;
  "104_nomorKK": string;
  "105_kodeKK": string;
}

export interface Blok2 {
  "201_namaRT": string;
  "202_nomorUrutBangunan": number;
  "203_nomorUrutKeluarga": number;
  "204_alamatLengkap": string;
  "205_statusKependudukan": number;
}

export interface AnggotaKeluarga {
  "301_nomorUrut": number;
  "302_nama": string;
  "303_nik": string;
  "304_keteranganKeberadaan": number;
  "305_kecDesaSaatIni": string;
  "306_provKabSaatIni": string;
  "307_negaraSaatIni": string;
  "308_jenisKelamin": number;
  "309_tanggalLahir": string;
  "310_umur": number;
  "311_statusPerkawinan": number;
  "312_hubunganDenganKK": number;
  "313_sedangHamil": number;
  "314_usiaKehamilan": number;
}

export interface Blok4 {
  "401_partisipasiSekolah": number;
  "402_jenjangPendidikan": number;
  "403_kelasTertinggi": number;
  "404_ijazahTertinggi": number;
}

export interface Blok5 {
  "501_bekerjaMingguLalu": number;
  "502_lapanganUsahaUtama": number;
  "503_statusPekerjaanUtama": number;
  "504_pendapatanSebulanTerakhir": string;
  "505_kepemilikanNPWP": number;
  "506_memilikiUsaha": number;
  "507_jumlahUsaha": number;
  "508_lapanganUsahaSendiri": number;
  "509_statusUsaha": number;
  "510_jumlahPekerjaTidakDibayar": number;
  "511_jumlahPekerjaDibayar": number;
  "512_kepemilikanIzinUsaha": number;
  "513_pendapatanUsahaSebulan": number;
}

export interface Blok6 {
  "601_statusDisabilitas": number;
  "602_kondisiGizi": number;
  "603_keluhanKesehatanKronis": number;
  "604_memilikiWali": number;
}

export interface Blok7 {
  "701_jaminanKesehatan": number;
  "702_jaminanKetenagakerjaan": number;
  "703_ikutProgramPIP": number;
}

export interface Blok8 {
  "801_statusKepemilikanBangunan": number;
  "802_luasLantai": number;
  "803_jenisLantai": number;
  "804_jenisDinding": number;
  "805_jenisAtap": number;
  "806_sumberAirMinum": number;
  "807_sumberAirMandi": number;
  "808a_sumberPenerangan": number;
  "808b_dayaTerpasang1": number;
  "808b_dayaTerpasang2": number;
  "808b_dayaTerpasang3": number;
  "809_bahanBakarMasak": number;
  "810a_kepemilikanFasilitasBAB": number;
  "810b_jenisKloset": number;
  "811_tempatBuangTinja": number;
}

// Di dalam file: types/survey.ts
export interface Blok9 {
  "901a_asetLahan": number;
  "901b_asetRumahLain": number;
  "902a_tabungGas": number;
  "902b_kulkas": number;
  "902c_ac": number;
  "902d_tv": number;
  "902e_emas": number;
  "902f_komputer": number;
  "902g_motor": number;
  "902h_perahuMotor": number;
  "902i_mobil": number;
  "902j_sepeda": number;
  "902k_perahu": number;
  "902l_smartphone": number;
  "903a_sapi": number;
  "903b_kerbau": number;
  "903c_kuda": number;
  "903d_babi": number;
  "903e_kambing": number;
  "904a_BPNT": number;
  "904b_PKH": number;
  "904c_BLTDesa": number;
  "904d_SubsidiListrik": number;
  "904e_BantuanPemda": number;
  "904f_SubsidiPupuk": number;
  "904g_BantuanDesa": number;
  "904g_catatan": string; // Field baru
  "904h_BantuanLainnya": number;
  "904h_catatan": string; // Field baru
  "905a_jenisBantuanSawit": number;
  "905b_jenisBantuanIkanLele": number;
  "905c_jenisBantuanSayurBuah": number;
  "906a_terimaBantuanSawit": number;
  "906b_terimaBantuanIkanLele": number;
  "906c_terimaBantuanSayurBuah": number;
  "907a_lanjutanBantuanSawit": number;
  "907b_lanjutanBantuanIkanLele": number;
  "907c_lanjutanBantuanSayurBuah": number;
  "908a_alasanTidakLanjutSawit": string[]; // Tipe array string
  "908b_alasanTidakLanjutIkanLele": string[]; // Tipe array string
  "908c_alasanTidakLanjutSayurBuah": string[]; // Tipe array string
  "909a_programDukungSawit": string[]; // Tipe array string
  "909a_lainnya": string; // Field baru
  "909b_programDukungIkanLele": string[]; // Tipe array string
  "909b_lainnya": string; // Field baru
  "909c_programDukungSayurBuah": string[]; // Tipe array string
  "909c_lainnya": string; // Field baru
}

export interface Blok10 {
  "1001_catatan": string;
}

export interface Wilayah {
  kode_provinsi: string; // 2 digit
  kode_kabupaten: string; // 2 digit
  kode_kecamatan: string; // 3 digit
  kode_desa: string; // 3 digit
}

export interface SurveyResponse {
  wilayah: Wilayah;
  blok1: Blok1;
  blok2: Blok2;

  // blok 3 sampai 7 berupa array untuk tiap anggota keluarga
  anggotaKeluarga: {
    blok3: AnggotaKeluarga;
    blok4: Blok4;
    blok5: Blok5;
    blok6: Blok6;
    blok7: Blok7;
  }[];

  blok8: Blok8;
  blok9: Blok9;
  blok10: Blok10;
}
