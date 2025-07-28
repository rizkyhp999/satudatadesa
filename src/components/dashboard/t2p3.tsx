"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  data: any;
};

const statusMap: Record<string, string> = {
  "1": "Belum Kawin",
  "2": "Kawin",
  "3": "Cerai Hidup",
  "4": "Cerai Mati",
};

const statusOrder = ["1", "2", "3", "4"];

export default function T2P3({ data }: Props) {
  // Rekap data per status perkawinan dan jenis kelamin
  const summary = statusOrder.map((kode) => {
    let laki = 0;
    let perempuan = 0;
    data.anggota.forEach((a: any) => {
      if (a["311_statusPerkawinan"] === kode) {
        if (a["308_jenisKelamin"] === "1") laki++;
        else if (a["308_jenisKelamin"] === "2") perempuan++;
      }
    });
    return {
      status: statusMap[kode],
      laki,
      perempuan,
      total: laki + perempuan,
    };
  });

  const totalLaki = summary.reduce((sum, s) => sum + s.laki, 0);
  const totalPerempuan = summary.reduce((sum, s) => sum + s.perempuan, 0);
  const totalSemua = summary.reduce((sum, s) => sum + s.total, 0);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>
          Jumlah Penduduk Menurut Status Perkawinan dan Jenis Kelamin di Desa
          Kapuak, 2025
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead>
              <tr>
                <th
                  rowSpan={2}
                  className="border px-4 py-2 align-middle bg-gray-50"
                >
                  Status Perkawinan
                </th>
                <th
                  colSpan={3}
                  className="border px-4 py-2 text-center bg-gray-50"
                >
                  Jumlah Penduduk
                </th>
              </tr>
              <tr>
                <th className="border px-4 py-2 text-center bg-gray-50">
                  Laki-Laki
                </th>
                <th className="border px-4 py-2 text-center bg-gray-50">
                  Perempuan
                </th>
                <th className="border px-4 py-2 text-center bg-gray-50">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {summary.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{row.status}</td>
                  <td className="border px-4 py-2 text-center">{row.laki}</td>
                  <td className="border px-4 py-2 text-center">
                    {row.perempuan}
                  </td>
                  <td className="border px-4 py-2 text-center font-semibold">
                    {row.total}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border px-4 py-2 font-bold bg-gray-100">
                  Total
                </td>
                <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                  {totalLaki}
                </td>
                <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                  {totalPerempuan}
                </td>
                <td className="border px-4 py-2 text-center font-bold bg-gray-100">
                  {totalSemua}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
