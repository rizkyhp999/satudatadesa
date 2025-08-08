import { useState } from "react";
import { motion } from "framer-motion";

const INFOGRAFIS = [
  { src: "/infografis/1.jpg", alt: "Infografik 1" },
  { src: "/infografis/2.jpg", alt: "Infografik 2" },
  { src: "/infografis/3.jpg", alt: "Infografik 3" },
  { src: "/infografis/4.jpg", alt: "Infografik 4" },
];

export function Infografik() {
  const [index, setIndex] = useState(0);

  function handleClick(e: React.MouseEvent<HTMLImageElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) {
      // klik kiri
      setIndex((i) => (i === 0 ? INFOGRAFIS.length - 1 : i - 1));
    } else {
      // klik kanan
      setIndex((i) => (i === INFOGRAFIS.length - 1 ? 0 : i + 1));
    }
  }

  return (
    <div className="w-full flex flex-col items-center mb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col items-center"
      >
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Infografis
        </h2>
        <div className="w-full flex justify-center">
          <img
            src={INFOGRAFIS[index].src}
            alt={INFOGRAFIS[index].alt}
            className="rounded-md object-contain w-full max-w-2xl h-auto max-h-[400px] cursor-pointer select-none"
            onClick={handleClick}
            draggable={false}
          />
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {index + 1} / {INFOGRAFIS.length}
        </div>
      </motion.div>
    </div>
  );
}

export default Infografik;
