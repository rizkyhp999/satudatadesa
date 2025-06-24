"use client";

import { useState } from "react";
import Blok1 from "@/components/blok/blok1";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // opsional kalau pakai toast notification

export default function Page() {
  const [formData, setFormData] = useState({
    namaKepala: "",
    jumlahKK: "",
    jumlahAnggota: "",
    noKK: "",
    kodeKK: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Terjadi kesalahan");
      } else {
        toast.success("Data berhasil dikirim!");
        setFormData({
          namaKepala: "",
          jumlahKK: "",
          jumlahAnggota: "",
          noKK: "",
          kodeKK: "",
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
          data={formData}
          onChange={(field, value) =>
            setFormData((prev) => ({ ...prev, [field]: value }))
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
