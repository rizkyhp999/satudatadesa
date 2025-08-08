import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Satu Data Desa BPS Kabupaten Tana Tidung",
  description: "Satu Data Desa BPS Kabupaten Tana Tidung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
