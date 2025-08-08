import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Publikasi() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border border-gray-200 bg-white rounded-xl px-4 py-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-gray-900">
            Publikasi
          </CardTitle>
          <div className="text-sm text-gray-500 font-medium">
            Dokumen PDF publikasi desa
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="w-full flex justify-center">
            <iframe
              src="/publikasi/Publikasi_Desa_Kapuak.pdf"
              title="Publikasi DDA BAB 1"
              className="rounded-md w-full max-w-2xl h-[400px] md:h-[600px] border border-gray-200 bg-white"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Publikasi;
