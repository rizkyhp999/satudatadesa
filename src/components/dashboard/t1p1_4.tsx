import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";

const tableMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function downloadTableExcel(tableData: any[], filename: string) {
  const worksheet = XLSX.utils.json_to_sheet(tableData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, filename);
}

export default function T1p1_4() {
  // Data untuk download tabel
  const perangkatDesa = [
    { Jabatan: "Kepala Desa", Nama: "Thomas" },
    { Jabatan: "Sekretaris Desa", Nama: "Danel" },
    { Jabatan: "Kaur Umum", Nama: "Maria Stefani Feragawati" },
    { Jabatan: "Kaur Keuangan", Nama: "Frankin Marhawan" },
    { Jabatan: "Kaur Perencanaan", Nama: "Rudy Setiawan" },
    { Jabatan: "Kasi Pelayanan", Nama: "Indra Agus Dermawan" },
    { Jabatan: "Kasi Kesra", Nama: "Ayu Novita" },
    { Jabatan: "Kasi Pemerintahan", Nama: "Yunus" },
  ];
  const ketuaSLS = [
    { SLS: "RT01", Nama: "Mochtar" },
    { SLS: "RT02", Nama: "Jeremias" },
  ];
  const pengurusOPD = [
    { Jabatan: "Ketua", Nama: "Marthen" },
    { Jabatan: "Wakil", Nama: "Titin Sumariati" },
    { Jabatan: "Sekretaris", Nama: "Supiyati" },
    { Jabatan: "Anggota", Nama: "Davit, Rustam" },
  ];
  const batasWilayah = [
    { Arah: "Utara", Desa: "Rian dan Sedulun", Kecamatan: "Sesayap" },
    {
      Arah: "Selatan",
      Desa: "Rian Rayo dan Seputuk",
      Kecamatan: "Malinau Barat",
    },
    { Arah: "Timur", Desa: "Rian Rayo", Kecamatan: "Betayau" },
    { Arah: "Barat", Desa: "Salap", Kecamatan: "Malinau Utara" },
  ];

  return (
    <motion.div
      initial={tableMotion.initial}
      animate={tableMotion.animate}
      transition={tableMotion.transition}
      className="space-y-10"
    >
      {/* Tabel 1.1 & 1.2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tabel 1.1 */}
        <Card className="border border-gray-200 bg-white rounded-xl px-4 py-4 h-full">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">
              Tabel 1.1 Jabatan dan Nama Perangkat Desa di Desa Kapuak, 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm rounded">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border px-4 py-2 text-left w-1/3 font-semibold text-gray-700">
                      Jabatan
                      <br />
                      (1)
                    </th>
                    <th className="border px-4 py-2 text-left w-2/3 font-semibold text-gray-700">
                      Nama Perangkat Desa
                      <br />
                      (2)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {perangkatDesa.map(({ Jabatan, Nama }) => (
                    <tr key={Jabatan} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{Jabatan}</td>
                      <td className="border px-4 py-2">{Nama}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Sumber: Kompilasi Data Administrasi Desa 2025
            </div>
            <div className="flex justify-end mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  downloadTableExcel(perangkatDesa, "perangkat_desa.xlsx")
                }
              >
                Download Tabel
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Tabel 1.2 */}
        <Card className="border border-gray-200 bg-white rounded-xl px-4 py-4 h-full">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">
              Tabel 1.2 Nama Ketua Satuan Lingkungan Setempat (SLS) di Desa
              Kapuak, 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm rounded">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border px-4 py-2 text-left w-1/2 font-semibold text-gray-700">
                      Satuan Lingkungan Setempat
                      <br />
                      (1)
                    </th>
                    <th className="border px-4 py-2 text-left w-1/2 font-semibold text-gray-700">
                      Nama Ketua SLS
                      <br />
                      (2)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ketuaSLS.map(({ SLS, Nama }) => (
                    <tr key={SLS} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{SLS}</td>
                      <td className="border px-4 py-2">{Nama}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Sumber: Kompilasi Data Administrasi Desa 2025
            </div>
            <div className="flex justify-end mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadTableExcel(ketuaSLS, "ketua_sls.xlsx")}
              >
                Download Tabel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabel 1.3 & 1.4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tabel 1.3 */}
        <Card className="border border-gray-200 bg-white rounded-xl px-4 py-4 h-full">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">
              Tabel 1.3 Nama Pengurus Organisasi Permusyawaratan di Desa Kapuak,
              2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm rounded">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border px-4 py-2 text-left w-1/3 font-semibold text-gray-700">
                      Jabatan
                      <br />
                      (1)
                    </th>
                    <th className="border px-4 py-2 text-left w-2/3 font-semibold text-gray-700">
                      Nama Pengurus
                      <br />
                      (2)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pengurusOPD.map(({ Jabatan, Nama }) => (
                    <tr key={Jabatan} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{Jabatan}</td>
                      <td className="border px-4 py-2">{Nama}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Sumber: Kompilasi Data Administrasi Desa 2025
            </div>
            <div className="flex justify-end mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  downloadTableExcel(pengurusOPD, "pengurus_opd.xlsx")
                }
              >
                Download Tabel
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Tabel 1.4 */}
        <Card className="border border-gray-200 bg-white rounded-xl px-4 py-4 h-full">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">
              Tabel 1.4 Batas Wilayah Administrasi Desa Kapuak, 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm rounded">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border px-4 py-2 text-left w-1/4 font-semibold text-gray-700">
                      Arah
                      <br />
                      (1)
                    </th>
                    <th className="border px-4 py-2 text-left w-1/4 font-semibold text-gray-700">
                      Desa
                      <br />
                      (2)
                    </th>
                    <th className="border px-4 py-2 text-left w-1/2 font-semibold text-gray-700">
                      Kecamatan
                      <br />
                      (3)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {batasWilayah.map(({ Arah, Desa, Kecamatan }) => (
                    <tr key={Arah} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{Arah}</td>
                      <td className="border px-4 py-2">{Desa}</td>
                      <td className="border px-4 py-2">{Kecamatan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Sumber: Kompilasi Data Administrasi Desa 2025
            </div>
            <div className="flex justify-end mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  downloadTableExcel(batasWilayah, "batas_wilayah.xlsx")
                }
              >
                Download Tabel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
