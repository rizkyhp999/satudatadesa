"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { jenis: "Bantuan Pangan Non Tunai (BPNT)", jumlah: 0 },
  { jenis: "Program Keluarga Harapan (PKH)", jumlah: 5 },
  { jenis: "Bantuan Langsung Tunai (BLT) Desa", jumlah: 16 },
  { jenis: "Subsidi Listrik", jumlah: 10 },
  { jenis: "Bantuan Pemerintah Daerah", jumlah: 1 },
  { jenis: "Bantuan Subsidi Pupuk", jumlah: 11 },
  { jenis: "Bantuan Pemerintah Desa", jumlah: 21 },
  { jenis: "Lainnya", jumlah: 0 },
];

export default function T4p1() {
  return (
    <div className="flex flex-col gap-6">
      {/* Card Grafik */}
      <Card>
        <CardHeader>
          <CardTitle>
            Grafik Jumlah Keluarga Penerima Bantuan Pemerintah di Desa Kapuak,
            2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ minHeight: 320 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jenis" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="jumlah" fill="#2563eb" name="Jumlah" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      {/* Card Tabel */}
      <Card>
        <CardHeader>
          <CardTitle>
            Tabel 4.1 Jumlah Keluarga Penerima Bantuan Pemerintah di Desa
            Kapuak, 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2">Jenis Bantuan</th>
                  <th className="border px-4 py-2">2024</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{row.jenis}</td>
                    <td className="border px-4 py-2 text-center">
                      {row.jumlah}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
