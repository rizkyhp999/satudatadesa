import { motion } from "framer-motion";

export function Publikasi() {
  return (
    <div className="w-full flex flex-col items-center mb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col items-center"
      >
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Publikasi
        </h2>
        <div className="w-full flex justify-center">
          <iframe
            src="/publikasi/DDA_BAB1.pdf"
            title="Publikasi DDA BAB 1"
            className="rounded-md w-full max-w-2xl h-[600px] border border-gray-200 dark:border-gray-700 bg-white"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Publikasi;
