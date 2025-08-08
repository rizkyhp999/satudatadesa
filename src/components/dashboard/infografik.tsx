import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const INFOGRAFIS = [
  { src: "/infografis/1.jpg", alt: "Infografik 1" },
  { src: "/infografis/2.jpg", alt: "Infografik 2" },
  { src: "/infografis/3.jpg", alt: "Infografik 3" },
  { src: "/infografis/4.jpg", alt: "Infografik 4" },
];

export function Infografik() {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  function handleImgClick(e: React.MouseEvent<HTMLImageElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 3) {
      // klik kiri
      setIndex((i) => (i === 0 ? INFOGRAFIS.length - 1 : i - 1));
    } else if (x > (rect.width * 2) / 3) {
      // klik kanan
      setIndex((i) => (i === INFOGRAFIS.length - 1 ? 0 : i + 1));
    } else {
      // klik tengah
      setModalOpen(true);
    }
  }

  function handleDownload(idx: number) {
    const current = INFOGRAFIS[idx];
    const link = document.createElement("a");
    link.href = current.src;
    link.download = current.alt;
    link.click();
  }

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
            Infografis
          </CardTitle>
          <div className="text-sm text-gray-500 font-medium">
            Klik kiri/kanan untuk navigasi, klik tengah untuk perbesar
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="w-full flex justify-center">
            <img
              src={INFOGRAFIS[index].src}
              alt={INFOGRAFIS[index].alt}
              className="rounded-md object-contain w-full max-w-2xl h-[400px] md:h-[600px] cursor-pointer select-none border border-gray-200 bg-white"
              onClick={handleImgClick}
              draggable={false}
            />
          </div>
          <div className="mt-2 text-xs text-gray-500 font-medium">
            {index + 1} / {INFOGRAFIS.length}
          </div>
        </CardContent>
      </Card>
      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="relative bg-white rounded-lg border border-gray-200 p-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
              <img
                src={INFOGRAFIS[index].src}
                alt={INFOGRAFIS[index].alt}
                className="max-w-[80vw] max-h-[80vh] rounded-md object-contain h-auto"
              />
              <div className="flex justify-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(index)}
                  className="flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Infografik;
