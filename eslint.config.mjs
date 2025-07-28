import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Konfigurasi bawaan dari Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Tambahkan aturan untuk menonaktifkan no-unused-vars
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off", // tambahkan ini agar penggunaan any diperbolehkan
    },
  },
];

export default eslintConfig;
