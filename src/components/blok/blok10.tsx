"use client";
import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface Blok10Props {
  catatan: string;
  onChange: (value: string) => void;
}

export const Blok10: FC<Blok10Props> = ({ catatan, onChange }) => {
  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">
          Blok 10 - Catatan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          className="w-full h-40"
          value={catatan}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Catatan tambahan terkait keluarga..."
        />
      </CardContent>
    </Card>
  );
};
