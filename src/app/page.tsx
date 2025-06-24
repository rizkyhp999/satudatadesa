"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Blok1 from "@/components/blok/blok1";
import Blok2 from "@/components/blok/blok2";

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

  const handleSubmit = async () => {
    try {
      const payload = {
        ...blok1Data,
        ...blok2Data,
      };

      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Terjadi kesalahan");
      } else {
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
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengirim data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
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
