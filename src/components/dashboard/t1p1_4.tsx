import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";

const tableMotion = {
  initial: { opacity: 0, y: 30 },
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
    <div className="space-y-10">
      {/* Tabel 1.1 & 1.2 */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Tabel 1.1 */}
        <motion.div {...tableMotion} className="flex-1">
          <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">
                Tabel 1.1&nbsp; Jabatan dan Nama Perangkat Desa di Desa Kapuak,
                2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 text-sm rounded">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border px-4 py-2 text-left w-1/3">
                        Jabatan
                        <br />
                        (1)
                      </th>
                      <th className="border px-4 py-2 text-left w-2/3">
                        Nama Perangkat Desa
                        <br />
                        (2)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Kepala Desa", "Thomas"],
                      ["Sekretaris Desa", "Danel"],
                      ["Kaur Umum", "Maria Stefani Feragawati"],
                      ["Kaur Keuangan", "Frankin Marhawan"],
                      ["Kaur Perencanaan", "Rudy Setiawan"],
                      ["Kasi Pelayanan", "Indra Agus Dermawan"],
                      ["Kasi Kesra", "Ayu Novita"],
                      ["Kasi Pemerintahan", "Yunus"],
                    ].map(([jabatan, nama], i) => (
                      <tr key={jabatan} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{jabatan}</td>
                        <td className="border px-4 py-2">{nama}</td>
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
        </motion.div>
        {/* Tabel 1.2 */}
        <motion.div
          {...tableMotion}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1"
        >
          <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">
                Tabel 1.2&nbsp; Nama Ketua Satuan Lingkungan Setempat (SLS) di
                Desa Kapuak, 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 text-sm rounded">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border px-4 py-2 text-left w-1/2">
                        Satuan Lingkungan Setempat
                        <br />
                        (1)
                      </th>
                      <th className="border px-4 py-2 text-left w-1/2">
                        Nama Ketua SLS
                        <br />
                        (2)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["RT01", "Mochtar"],
                      ["RT02", "Jeremias"],
                    ].map(([rt, nama], i) => (
                      <tr key={rt} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{rt}</td>
                        <td className="border px-4 py-2">{nama}</td>
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
        </motion.div>
      </div>

      {/* Tabel 1.3 & 1.4 */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Tabel 1.3 */}
        <motion.div
          {...tableMotion}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1"
        >
          <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">
                Tabel 1.3&nbsp; Nama Pengurus Organisasi Permusyawaratan di Desa
                Kapuak, 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 text-sm rounded">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border px-4 py-2 text-left w-1/3">
                        Jabatan
                        <br />
                        (1)
                      </th>
                      <th className="border px-4 py-2 text-left w-2/3">
                        Nama Pengurus
                        <br />
                        (2)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border px-4 py-2">Ketua</td>
                      <td className="border px-4 py-2">Marthen</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border px-4 py-2">Wakil</td>
                      <td className="border px-4 py-2">Titin Sumariati</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border px-4 py-2">Sekretaris</td>
                      <td className="border px-4 py-2">Supiyati</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border px-4 py-2 align-top">Anggota</td>
                      <td className="border px-4 py-2">
                        <div>Davit</div>
                        <div>Rustam</div>
                      </td>
                    </tr>
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
        </motion.div>
        {/* Tabel 1.4 */}
        <motion.div
          {...tableMotion}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1"
        >
          <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">
                Tabel 1.4&nbsp; Batas Wilayah Administrasi Desa Kapuak, 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 text-sm rounded">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border px-4 py-2 text-left w-1/4">
                        Arah
                        <br />
                        (1)
                      </th>
                      <th className="border px-4 py-2 text-left w-1/4">
                        Desa
                        <br />
                        (2)
                      </th>
                      <th className="border px-4 py-2 text-left w-1/2">
                        Kecamatan
                        <br />
                        (3)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Utara", "Rian dan Sedulun", "Sesayap"],
                      ["Selatan", "Rian Rayo dan Seputuk", "Malinau Barat"],
                      ["Timur", "Rian Rayo", "Betayau"],
                      ["Barat", "Salap", "Malinau Utara"],
                    ].map(([arah, desa, kec], i) => (
                      <tr key={arah} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{arah}</td>
                        <td className="border px-4 py-2">{desa}</td>
                        <td className="border px-4 py-2">{kec}</td>
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
        </motion.div>
      </div>
    </div>
  );
}
