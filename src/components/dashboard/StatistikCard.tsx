"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { toPng } from "html-to-image";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React, { useRef } from "react";

type ChartKey = { key: string; label: string; color?: string };
type TableColumn = { key: string; label: string };

type Props = {
  title: string;
  chartData: any[];
  chartKeys: ChartKey[];
  tableColumns: TableColumn[];
  tableData: any[];
  chartHeight?: number;
};

export default function StatistikCard({
  title,
  chartData,
  chartKeys,
  tableColumns,
  tableData,
  chartHeight = 320,
}: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleDownloadChart = async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement("a");
      link.download = "statistik_chart.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh grafik:", err);
    }
  };

  const handleDownloadTable = () => {
    const wsData = [
      tableColumns.map((col) => col.label),
      ...tableData.map((row) => tableColumns.map((col) => row[col.key])),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tabel");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "statistik_tabel.xlsx");
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-base md:text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-6">
        {/* Grafik */}
        <div
          className="w-full"
          style={{ minHeight: chartHeight }}
          ref={chartRef}
        >
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={tableColumns[0].key} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              {chartKeys.map((ck, idx) => (
                <Bar
                  key={ck.key}
                  dataKey={ck.key}
                  name={ck.label}
                  fill={
                    ck.color ||
                    [
                      "#2563eb",
                      "#f472b6",
                      "#22c55e",
                      "#ef4444",
                      "#6366f1",
                      "#10b981",
                      "#f59e42",
                      "#a855f7",
                    ][idx % 8]
                  }
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-end mt-2">
          <Button variant="outline" size="sm" onClick={handleDownloadChart}>
            <Download className="w-4 h-4 mr-2" />
            Download Grafik
          </Button>
        </div>
        {/* Tabel */}
        <div className="overflow-x-auto" style={{ minHeight: chartHeight }}>
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableColumns.map((col) => (
                  <th key={col.key} className="border px-4 py-2 text-left">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {tableColumns.map((col) => (
                    <td key={col.key} className="border px-4 py-2 text-center">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-2">
          <Button variant="outline" size="sm" onClick={handleDownloadTable}>
            <Download className="w-4 h-4 mr-2" />
            Download Tabel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
