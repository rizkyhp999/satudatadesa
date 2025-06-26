"use client";

import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

// Interfaces for each block
export interface AnggotaKeluarga {
  noUrut: string;
  nama: string;
  nik: string;
  keberadaan: string;
  kecDesa?: string;
  provKab?: string;
  negara?: string;
  jenisKelamin: string;
  tanggalLahir: string;
  umur: string;
  statusPerkawinan: string;
  hubunganKepala: string;
  sedangHamil?: string;
  usiaKehamilan?: string;
}

export interface PendidikanAnggota {
  noUrut: string;
  partisipasi: string;
  jenjang: string;
  kelas: string;
  ijazah: string;
}

export interface KetenagakerjaanAnggota {
  noUrut: string;
  bekerja: string;
  lapanganUsaha: string;
  statusPekerjaan: string;
  pendapatan: string;
  npwp: string;
  punyaUsaha: string;
  usahaLapangan: string;
  usahaStatus: string;
  izinUsaha: string;
}

export interface KesehatanAnggota {
  noUrut: string;
  disabilitas: string;
  gizi: string;
  penyakitKronis: string;
  wali: string;
}

export interface JaminanAnggota {
  noUrut: string;
  jaminanKesehatan: string;
  jaminanTenagaKerja: string;
  programPIP: string;
}

// Props interfaces for each block
interface Blok3Props {
  data: AnggotaKeluarga[];
  onChange: (index: number, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

interface Blok4Props {
  data: PendidikanAnggota[];
  onChange: (index: number, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

interface Blok5Props {
  data: KetenagakerjaanAnggota[];
  onChange: (index: number, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

interface Blok6Props {
  data: KesehatanAnggota[];
  onChange: (index: number, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

interface Blok7Props {
  data: JaminanAnggota[];
  onChange: (index: number, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

// Combined component
const Blok3: FC<Blok3Props> = ({ data, onChange, onAdd, onRemove }) => {
  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg text-gray-900">
          Blok 3 - Anggota Keluarga
        </CardTitle>
        <Button
          size="sm"
          variant="outline"
          onClick={onAdd}
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Tambah Anggota
        </Button>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-4">
        {data.map((anggota, index) => (
          <div
            key={index}
            className="w-[320px] border p-4 rounded-xl space-y-4 relative bg-white shadow"
          >
            <div className="absolute top-2 left-2 text-sm text-gray-700 font-semibold">
              Anggota {index + 1}
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 text-red-500"
              onClick={() => onRemove(index)}
            >
              <Trash2 size={16} />
            </Button>

            <div className="space-y-1 pt-6">
              <Label>301. No Urut (1 digit)</Label>
              <Input
                type="number"
                value={anggota.noUrut}
                onChange={(e) =>
                  onChange(index, "noUrut", e.target.value.slice(0, 1))
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>302. Nama Anggota Keluarga</Label>
              <Input
                value={anggota.nama}
                onChange={(e) => onChange(index, "nama", e.target.value)}
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>303. Nomor Induk Kependudukan (16 digit)</Label>
              <Input
                value={anggota.nik}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 16) onChange(index, "nik", val);
                }}
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>304. Keberadaan Anggota Keluarga (1 digit)</Label>
              <Input
                value={anggota.keberadaan}
                placeholder="1 - 7"
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (
                    ["1", "2", "3", "4", "5", "6", "7"].includes(val) ||
                    val === ""
                  )
                    onChange(index, "keberadaan", val);
                }}
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            {anggota.keberadaan === "3" && (
              <div className="space-y-1">
                <Label>305. Kecamatan & Desa (String + 3 digit)</Label>
                <Input
                  value={anggota.kecDesa || ""}
                  onChange={(e) => onChange(index, "kecDesa", e.target.value)}
                  className="border-gray-300 focus-visible:ring-gray-500"
                />
              </div>
            )}

            {anggota.keberadaan === "4" && (
              <div className="space-y-1">
                <Label>306. Provinsi & Kabupaten (String + 2 digit)</Label>
                <Input
                  value={anggota.provKab || ""}
                  onChange={(e) => onChange(index, "provKab", e.target.value)}
                  className="border-gray-300 focus-visible:ring-gray-500"
                />
              </div>
            )}

            {anggota.keberadaan === "5" && (
              <div className="space-y-1">
                <Label>307. Negara (String + 2 digit)</Label>
                <Input
                  value={anggota.negara || ""}
                  onChange={(e) => onChange(index, "negara", e.target.value)}
                  className="border-gray-300 focus-visible:ring-gray-500"
                />
              </div>
            )}

            <div className="space-y-1">
              <Label>308. Jenis Kelamin (1 - Laki, 2 - Perempuan)</Label>
              <Input
                value={anggota.jenisKelamin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (["1", "2"].includes(val) || val === "")
                    onChange(index, "jenisKelamin", val);
                }}
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>309. Tanggal Lahir (dd/mm/yyyy)</Label>
              <Input
                value={anggota.tanggalLahir}
                onChange={(e) =>
                  onChange(index, "tanggalLahir", e.target.value)
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>310. Umur (2 digit)</Label>
              <Input
                type="number"
                value={anggota.umur}
                onChange={(e) =>
                  onChange(index, "umur", e.target.value.slice(0, 2))
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>311. Status Perkawinan (1 - 4)</Label>
              <Input
                value={anggota.statusPerkawinan}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (["1", "2", "3", "4"].includes(val) || val === "")
                    onChange(index, "statusPerkawinan", val);
                }}
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>312. Hubungan dengan Kepala Keluarga (1 - 8)</Label>
              <Input
                value={anggota.hubunganKepala}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (
                    ["1", "2", "3", "4", "5", "6", "7", "8"].includes(val) ||
                    val === ""
                  )
                    onChange(index, "hubunganKepala", val);
                }}
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            {anggota.jenisKelamin === "2" &&
              parseInt(anggota.umur) >= 10 &&
              parseInt(anggota.umur) <= 54 &&
              ["2", "3", "4"].includes(anggota.statusPerkawinan) && (
                <div className="space-y-1">
                  <Label>313. Apakah sedang hamil? (1 - Ya, 2 - Tidak)</Label>
                  <Input
                    value={anggota.sedangHamil || ""}
                    onChange={(e) =>
                      onChange(index, "sedangHamil", e.target.value)
                    }
                    className="border-gray-300 focus-visible:ring-gray-500"
                  />
                </div>
              )}

            {anggota.sedangHamil === "1" && (
              <div className="space-y-1">
                <Label>314. Usia Kehamilan (bulan)</Label>
                <Input
                  type="number"
                  value={anggota.usiaKehamilan || ""}
                  onChange={(e) =>
                    onChange(index, "usiaKehamilan", e.target.value.slice(0, 1))
                  }
                  className="border-gray-300 focus-visible:ring-gray-500"
                />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const Blok4: FC<Blok4Props> = ({ data, onChange, onAdd, onRemove }) => {
  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg text-gray-900">
          Blok 4 - Pendidikan
        </CardTitle>
        <Button
          size="sm"
          variant="outline"
          onClick={onAdd}
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Tambah Anggota
        </Button>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-4">
        {data.map((anggota, index) => (
          <div
            key={index}
            className="w-[300px] border p-4 rounded-xl space-y-4 relative bg-white shadow"
          >
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 text-red-500"
              onClick={() => onRemove(index)}
            >
              <Trash2 size={16} />
            </Button>

            <div className="space-y-1">
              <Label>301. Nomor Urut</Label>
              <Input
                type="number"
                value={anggota.noUrut}
                onChange={(e) =>
                  onChange(index, "noUrut", e.target.value.slice(0, 1))
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>401. Partisipasi Sekolah (1-3)</Label>
              <Input
                value={anggota.partisipasi}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (["1", "2", "3"].includes(val) || val === "")
                    onChange(index, "partisipasi", val);
                }}
                className="border-gray-300 focus-visible:ring-gray-500"
              />
              <p className="text-sm text-gray-500">
                1. Tidak/belum pernah sekolah <br />
                2. Masih sekolah <br />
                3. Tidak bersekolah lagi
              </p>
            </div>

            {anggota.partisipasi !== "1" && (
              <>
                <div className="space-y-1">
                  <Label>402. Jenjang Pendidikan (2 digit)</Label>
                  <Input
                    value={anggota.jenjang}
                    onChange={(e) =>
                      onChange(index, "jenjang", e.target.value.slice(0, 2))
                    }
                    className="border-gray-300 focus-visible:ring-gray-500"
                  />
                  <p className="text-sm text-gray-500">
                    01 Paket A, 02 SD LB, 03 SD, ... dst
                  </p>
                </div>

                <div className="space-y-1">
                  <Label>403. Kelas Tertinggi (1-8)</Label>
                  <Input
                    value={anggota.kelas}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (
                        ["1", "2", "3", "4", "5", "6", "7", "8"].includes(
                          val
                        ) ||
                        val === ""
                      )
                        onChange(index, "kelas", val);
                    }}
                    className="border-gray-300 focus-visible:ring-gray-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label>404. Ijazah/STTB (2 digit)</Label>
                  <Input
                    value={anggota.ijazah}
                    onChange={(e) =>
                      onChange(index, "ijazah", e.target.value.slice(0, 2))
                    }
                    className="border-gray-300 focus-visible:ring-gray-500"
                  />
                  <p className="text-sm text-gray-500">
                    Kode sesuai daftar jenjang
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const Blok5: FC<Blok5Props> = ({ data, onChange, onAdd, onRemove }) => {
  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg text-gray-900">
          Blok 5 - Ketenagakerjaan
        </CardTitle>
        <Button
          size="sm"
          variant="outline"
          onClick={onAdd}
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Tambah Anggota
        </Button>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-4">
        {data.map((anggota, index) => (
          <div
            key={index}
            className="w-[300px] border p-4 rounded-xl space-y-4 relative bg-white shadow"
          >
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 text-red-500"
              onClick={() => onRemove(index)}
            >
              <Trash2 size={16} />
            </Button>

            <div className="space-y-1">
              <Label>301. Nomor Urut</Label>
              <Input
                type="number"
                value={anggota.noUrut}
                onChange={(e) =>
                  onChange(index, "noUrut", e.target.value.slice(0, 1))
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>501. Apakah Bekerja? (1. Ya, 2. Tidak)</Label>
              <Input
                value={anggota.bekerja}
                onChange={(e) =>
                  onChange(index, "bekerja", e.target.value.slice(0, 1))
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            {anggota.bekerja === "1" && (
              <>
                <div className="space-y-1">
                  <Label>502. Lapangan Usaha</Label>
                  <Input
                    value={anggota.lapanganUsaha}
                    onChange={(e) =>
                      onChange(index, "lapanganUsaha", e.target.value)
                    }
                    className="border-gray-300 focus-visible:ring-gray-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label>503. Status Pekerjaan (1-8)</Label>
                  <Input
                    value={anggota.statusPekerjaan}
                    onChange={(e) =>
                      onChange(
                        index,
                        "statusPekerjaan",
                        e.target.value.slice(0, 1)
                      )
                    }
                    className="border-gray-300 focus-visible:ring-gray-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label>504. Pendapatan Bulan Lalu</Label>
                  <Input
                    value={anggota.pendapatan}
                    onChange={(e) =>
                      onChange(index, "pendapatan", e.target.value)
                    }
                    className="border-gray-300 focus-visible:ring-gray-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label>505. Kepemilikan NPWP (1-3)</Label>
                  <Input
                    value={anggota.npwp}
                    onChange={(e) =>
                      onChange(index, "npwp", e.target.value.slice(0, 1))
                    }
                    className="border-gray-300 focus-visible:ring-gray-500"
                  />
                </div>
              </>
            )}

            <div className="space-y-1">
              <Label>506. Apakah Memiliki Usaha? (1. Ya, 2. Tidak)</Label>
              <Input
                value={anggota.punyaUsaha}
                onChange={(e) =>
                  onChange(index, "punyaUsaha", e.target.value.slice(0, 1))
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            {anggota.punyaUsaha === "1" && (
              <>
                <div className="space-y-1">
                  <Label>508. Lapangan Usaha</Label>
                  <Input
                    value={anggota.usahaLapangan}
                    onChange={(e) =>
                      onChange(index, "usahaLapangan", e.target.value)
                    }
                    className="border-gray-300 focus-visible:ring-gray-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label>509. Status dalam Usaha</Label>
                  <Input
                    value={anggota.usahaStatus}
                    onChange={(e) =>
                      onChange(index, "usahaStatus", e.target.value.slice(0, 1))
                    }
                    className="border-gray-300 focus-visible:ring-gray-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label>512. Izin Usaha (Kode 01-12)</Label>
                  <Input
                    value={anggota.izinUsaha}
                    onChange={(e) =>
                      onChange(index, "izinUsaha", e.target.value.slice(0, 2))
                    }
                    className="border-gray-300 focus-visible:ring-gray-500"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const Blok6: FC<Blok6Props> = ({ data, onChange, onAdd, onRemove }) => {
  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg text-gray-900">
          Blok 6 - Kesehatan
        </CardTitle>
        <Button
          size="sm"
          variant="outline"
          onClick={onAdd}
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Tambah Anggota
        </Button>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-4">
        {data.map((anggota, index) => (
          <div
            key={index}
            className="w-[300px] border p-4 rounded-xl space-y-4 relative bg-white shadow"
          >
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 text-red-500"
              onClick={() => onRemove(index)}
            >
              <Trash2 size={16} />
            </Button>

            <div className="space-y-1">
              <Label>301. Nomor Urut</Label>
              <Input
                type="number"
                value={anggota.noUrut}
                onChange={(e) =>
                  onChange(index, "noUrut", e.target.value.slice(0, 1))
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>601. Status Disabilitas (0-6)</Label>
              <Input
                value={anggota.disabilitas}
                onChange={(e) =>
                  onChange(index, "disabilitas", e.target.value.slice(0, 1))
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>602. Kondisi Gizi</Label>
              <Input
                value={anggota.gizi}
                onChange={(e) =>
                  onChange(index, "gizi", e.target.value.slice(0, 1))
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>603. Penyakit Kronis</Label>
              <Input
                value={anggota.penyakitKronis}
                onChange={(e) =>
                  onChange(index, "penyakitKronis", e.target.value)
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>604. Wali/Pengasuh (1-3)</Label>
              <Input
                value={anggota.wali}
                onChange={(e) =>
                  onChange(index, "wali", e.target.value.slice(0, 1))
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const Blok7: FC<Blok7Props> = ({ data, onChange, onAdd, onRemove }) => {
  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg text-gray-900">
          Blok 7 - Jaminan Sosial
        </CardTitle>
        <Button
          size="sm"
          variant="outline"
          onClick={onAdd}
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Tambah Anggota
        </Button>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-4">
        {data.map((anggota, index) => (
          <div
            key={index}
            className="w-[300px] border p-4 rounded-xl space-y-4 relative bg-white shadow"
          >
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 text-red-500"
              onClick={() => onRemove(index)}
            >
              <Trash2 size={16} />
            </Button>

            <div className="space-y-1">
              <Label>301. Nomor Urut</Label>
              <Input
                type="number"
                value={anggota.noUrut}
                onChange={(e) =>
                  onChange(index, "noUrut", e.target.value.slice(0, 1))
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>701. Jaminan Kesehatan</Label>
              <Input
                value={anggota.jaminanKesehatan}
                onChange={(e) =>
                  onChange(
                    index,
                    "jaminanKesehatan",
                    e.target.value.slice(0, 2)
                  )
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>702. Jaminan Ketenagakerjaan</Label>
              <Input
                value={anggota.jaminanTenagaKerja}
                onChange={(e) =>
                  onChange(
                    index,
                    "jaminanTenagaKerja",
                    e.target.value.slice(0, 2)
                  )
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>

            <div className="space-y-1">
              <Label>703. Program PIP (1 - Ya, 2 - Tidak)</Label>
              <Input
                value={anggota.programPIP}
                onChange={(e) =>
                  onChange(index, "programPIP", e.target.value.slice(0, 1))
                }
                className="border-gray-300 focus-visible:ring-gray-500"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Export all components
export { Blok3, Blok4, Blok5, Blok6, Blok7 };
