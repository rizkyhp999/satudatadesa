// src/app/page.tsx
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
import { DataAnggota } from "@/types/DataAnggota";

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

  const [blok3Data, setBlok3Data] = useState<DataAnggota[]>([
    {
      noUrut: "",
      nama: "",
      nik: "",
      keberadaan: "",
      jenisKelamin: "",
      tanggalLahir: "",
      umur: "",
      statusPerkawinan: "",
      hubunganKepala: "",
    },
  ]);

  const handleBlok3Change = (
    index: number,
    field: keyof DataAnggota,
    value: string
  ) => {
    setBlok3Data((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAddAnggota = () => {
    setBlok3Data((prev) => [
      ...prev,
      {
        noUrut: "",
        nama: "",
        nik: "",
        keberadaan: "",
        jenisKelamin: "",
        tanggalLahir: "",
        umur: "",
        statusPerkawinan: "",
        hubunganKepala: "",
      },
    ]);
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
      setBlok3Data([
        {
          noUrut: "",
          nama: "",
          nik: "",
          keberadaan: "",
          jenisKelamin: "",
          tanggalLahir: "",
          umur: "",
          statusPerkawinan: "",
          hubunganKepala: "",
        },
      ]);
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
            onChange={(field, value) =>
              setBlok1Data((prev) => ({ ...prev, [field]: value }))
            }
          />
          <Blok2
            data={blok2Data}
            onChange={(field, value) =>
              setBlok2Data((prev) => ({ ...prev, [field]: value }))
            }
          />
        </div>

        <Blok3
          data={blok3Data}
          onChange={handleBlok3Change}
          onAdd={handleAddAnggota}
          onRemove={handleRemoveAnggota}
        />
        <Blok4
          data={blok3Data}
          onChange={handleBlok3Change}
          onAdd={handleAddAnggota}
          onRemove={handleRemoveAnggota}
        />
        <Blok5
          data={blok3Data}
          onChange={handleBlok3Change}
          onAdd={handleAddAnggota}
          onRemove={handleRemoveAnggota}
        />
        <Blok6
          data={blok3Data}
          onChange={handleBlok3Change}
          onAdd={handleAddAnggota}
          onRemove={handleRemoveAnggota}
        />
        <Blok7
          data={blok3Data}
          onChange={handleBlok3Change}
          onAdd={handleAddAnggota}
          onRemove={handleRemoveAnggota}
        />

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
