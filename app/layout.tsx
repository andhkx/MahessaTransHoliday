import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahessaholiday.my.id"),
  title: {
    default: "Mahessa Trans Holiday | Rental Mobil & Paket Perjalanan",
    template: "%s | Mahessa Trans Holiday",
  },
  description: "Rental mobil dengan driver, charter, hingga perjalanan wisata dan perjalanan dinas dari Cimahi, Bandung & Padalarang.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${jakarta.variable} ${dmMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}