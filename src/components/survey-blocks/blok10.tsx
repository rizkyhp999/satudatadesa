"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, MessageSquare } from "lucide-react";
import type { Blok10 } from "@/types/survey";

interface Blok10ComponentProps {
  data: Blok10;
  onChange: (data: Blok10) => void;
}

export function Blok10Component({ data, onChange }: Blok10ComponentProps) {
  const handleChange = (field: keyof Blok10, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <FileText className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Catatan</h3>
          <p className="text-slate-600">
            Catatan tambahan dan informasi lainnya
          </p>
        </div>
      </div>

      <Card className="border-slate-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-slate-600" />
            Catatan Enumerator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label
              htmlFor="catatan"
              className="text-sm font-medium text-slate-700"
            >
              1001. Catatan
            </Label>
            <Textarea
              id="catatan"
              value={data["1001_catatan"]}
              onChange={(e) => handleChange("1001_catatan", e.target.value)}
              placeholder="Tuliskan catatan tambahan, kendala yang dihadapi, atau informasi penting lainnya yang perlu dicatat selama proses survei..."
              className="mt-1 min-h-[150px]"
              required
            />
            <p className="text-xs text-slate-500 mt-2">
              Catatan ini akan membantu dalam analisis data dan evaluasi proses
              survei
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-slate-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-slate-800 mb-2">
              Survei Hampir Selesai
            </h4>
            <p className="text-slate-600 text-sm">
              Pastikan semua data telah diisi dengan benar sebelum menyimpan
              survei. Periksa kembali informasi yang telah dimasukkan untuk
              memastikan akurasi data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
