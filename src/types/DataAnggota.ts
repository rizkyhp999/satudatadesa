export interface DataAnggota {
  noUrut: string;
  nama: string;
  nik: string;
  keberadaan: string;
  jenisKelamin: string;
  tanggalLahir: string; // format dd/mm/yyyy (bisa disimpan utuh, input dibagi kotak)
  umur: string;
  statusPerkawinan: string;
  hubunganKepala: string;
  sedangHamil?: string;
  usiaKehamilan?: string;

  // Blok tambahan lokasi jika keberadaan 3-5
  kecDesa?: string; // Format: Nama + 3 digit kode (bisa dipisah saat input, disatukan saat simpan)
  provKab?: string; // Format: Nama + 2 digit kode
  negara?: string; // Format: Nama + 2 digit kode

  // Blok IV - Pendidikan
  partisipasi?: string;
  jenjang?: string;
  kelas?: string;
  ijazah?: string;

  // Blok V - Ketenagakerjaan
  bekerja?: string;
  lapanganUsaha?: string;
  statusPekerjaan?: string;
  pendapatan?: string;
  npwp?: string;
  punyaUsaha?: string;
  lapanganUsahaUtama?: string;
  statusUsaha?: string;
  jumlahPekerjaTidakDibayar?: string;
  jumlahPekerjaDibayar?: string;
  izinUsaha?: string;
  pendapatanUsaha?: string;

  // Blok VI - Kesehatan
  disabilitas?: string;
  gizi?: string;
  penyakitKronis?: string;
  wali?: string;

  // Blok VII - Jaminan Sosial
  jaminanKesehatan?: string;
  jaminanKetenagakerjaan?: string;
  ikutPIP?: string;
}
