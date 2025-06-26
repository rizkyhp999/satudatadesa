"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Blok1 from "@/components/blok/blok1";
import Blok2 from "@/components/blok/blok2";
import Blok3 from "@/components/blok/blok3";
import Blok4 from "@/components/blok/blok4";
import Blok5 from "@/components/blok/blok5";
import Blok6 from "@/components/blok/blok6";
import Blok7 from "@/components/blok/blok7";
import Blok8 from "@/components/blok/blok8";
import { Blok9 } from "@/components/blok/blok9";
import { Blok10 } from "@/components/blok/blok10";
import { DataAnggota } from "@/types/DataAnggota";
import { Blok8Data } from "@/components/blok/blok8";
import { Blok9Data } from "@/components/blok/blok9";

const defaultAnggota: DataAnggota = {
  noUrut: "",
  nama: "",
  nik: "",
  keberadaan: "",
  jenisKelamin: "",
  tanggalLahir: "",
  umur: "",
  statusPerkawinan: "",
  hubunganKepala: "",
};

export default function Page() {
  const [blok1Data, setBlok1Data] = useState({
    namaKepala: "",
    jumlahKK: "",
    jumlahAnggota: "",
    noKK: "",
    kodeKK: "",
  });

  const [blok2Data, setBlok2Data] = useState({
    namaRT: "",
    noUrutBangunan: "",
    noUrutKeluarga: "",
    alamat: "",
    statusKependudukan: "",
  });

  const [blok3Data, setBlok3Data] = useState<DataAnggota[]>([defaultAnggota]);

  const [blok8Data, setBlok8Data] = useState<Blok8Data>({
    kepemilikanRumah: "",
    luasLantai: "",
    jenisLantai: "",
    jenisDinding: "",
    jenisAtap: "",
    sumberAirMinum: "",
    sumberAirMandi: "",
    sumberPenerangan: "",
    dayaTerpasang: "",
    bahanBakarMasak: "",
    fasilitasBAB: "",
    jenisKloset: "",
    pembuanganTinja: "",
  });

  const [blok9Data, setBlok9Data] = useState<Blok9Data>({
    asetTidakBergerak: { lahan: "", bangunanLain: "" },
    asetBergerak: {
      tabungGas: "",
      lemariEs: "",
      ac: "",
      tv: "",
      emas: "",
      komputer: "",
      motor: "",
      mobil: "",
      perahu: "",
      perahuMotor: "",
      sepeda: "",
      smartphone: "",
    },
    programBantuan: {
      bpnt: "",
      pkh: "",
      bltDesa: "",
      subsidiListrik: "",
      bantuanPemda: "",
      subsidiPupuk: "",
      bantuanDesa: "",
      bantuanDesaLain: "",
    },
    bantuanPertanian: {
      bibitSawit: "",
      bibitIkan: "",
      bibitSayur: "",
      keberlanjutan: "",
      alasanTidakLanjut: "",
      programUsulan: "",
      programUsulanLain: "",
    },
  });

  const [blok10Data, setBlok10Data] = useState("");

  const handleAnggotaChange = (
    index: number,
    field: keyof DataAnggota,
    value: string
  ) => {
    setBlok3Data((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAddAnggota = () => {
    setBlok3Data((prev) => [...prev, defaultAnggota]);
  };

  const handleRemoveAnggota = (index: number) => {
    setBlok3Data((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        blok1: blok1Data,
        blok2: blok2Data,
        blok3: blok3Data,
        blok8: blok8Data,
        blok9: blok9Data,
        blok10: blok10Data,
      };

      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.error || "Terjadi kesalahan");

      toast.success("Data berhasil dikirim!");

      setBlok1Data({
        namaKepala: "",
        jumlahKK: "",
        jumlahAnggota: "",
        noKK: "",
        kodeKK: "",
      });
      setBlok2Data({
        namaRT: "",
        noUrutBangunan: "",
        noUrutKeluarga: "",
        alamat: "",
        statusKependudukan: "",
      });
      setBlok3Data([defaultAnggota]);
      setBlok8Data({
        kepemilikanRumah: "",
        luasLantai: "",
        jenisLantai: "",
        jenisDinding: "",
        jenisAtap: "",
        sumberAirMinum: "",
        sumberAirMandi: "",
        sumberPenerangan: "",
        dayaTerpasang: "",
        bahanBakarMasak: "",
        fasilitasBAB: "",
        jenisKloset: "",
        pembuanganTinja: "",
      });
      setBlok9Data({
        asetTidakBergerak: { lahan: "", bangunanLain: "" },
        asetBergerak: {
          tabungGas: "",
          lemariEs: "",
          ac: "",
          tv: "",
          emas: "",
          komputer: "",
          motor: "",
          mobil: "",
          perahu: "",
          perahuMotor: "",
          sepeda: "",
          smartphone: "",
        },
        programBantuan: {
          bpnt: "",
          pkh: "",
          bltDesa: "",
          subsidiListrik: "",
          bantuanPemda: "",
          subsidiPupuk: "",
          bantuanDesa: "",
          bantuanDesaLain: "",
        },
        bantuanPertanian: {
          bibitSawit: "",
          bibitIkan: "",
          bibitSayur: "",
          keberlanjutan: "",
          alasanTidakLanjut: "",
          programUsulan: "",
          programUsulanLain: "",
        },
      });
      setBlok10Data("");
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengirim data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-9xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Blok1
            data={blok1Data}
            onChange={(f, v) => setBlok1Data((p) => ({ ...p, [f]: v }))}
          />
          <Blok2
            data={blok2Data}
            onChange={(f, v) => setBlok2Data((p) => ({ ...p, [f]: v }))}
          />
        </div>

        <Blok3
          data={blok3Data}
          onChange={handleAnggotaChange}
          onAdd={handleAddAnggota}
          onRemove={handleRemoveAnggota}
        />
        <Blok4
          data={blok3Data}
          onChange={handleAnggotaChange}
          onAdd={handleAddAnggota}
          onRemove={handleRemoveAnggota}
        />
        <Blok5
          data={blok3Data}
          onChange={handleAnggotaChange}
          onAdd={handleAddAnggota}
          onRemove={handleRemoveAnggota}
        />
        <Blok6
          data={blok3Data}
          onChange={handleAnggotaChange}
          onAdd={handleAddAnggota}
          onRemove={handleRemoveAnggota}
        />
        <Blok7
          data={blok3Data}
          onChange={handleAnggotaChange}
          onAdd={handleAddAnggota}
          onRemove={handleRemoveAnggota}
        />
        <Blok8
          data={blok8Data}
          onChange={(f, v) => setBlok8Data((prev) => ({ ...prev, [f]: v }))}
        />
        <Blok9
          data={blok9Data}
          onChange={(path, value) => {
            const keys = path.split(".");
            setBlok9Data((prev) => {
              const updated = { ...prev };
              if (keys.length === 2) {
                (updated as any)[keys[0]][keys[1]] = value;
              } else if (keys.length === 3) {
                (updated as any)[keys[0]][keys[1]][keys[2]] = value;
              }
              return updated;
            });
          }}
        />
        <Blok10 catatan={blok10Data} onChange={setBlok10Data} />

        <Button
          className="w-full bg-black hover:bg-gray-800 text-white"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
