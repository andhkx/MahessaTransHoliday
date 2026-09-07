import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getLocale, getDict } from "@/lib/i18n/server";
import { LocaleProvider } from "@/lib/i18n/client";
import "./globals.css";
import GoogleTranslate from "@/components/GoogleTranslate";

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
  metadataBase: new URL("https://mahessatransholiday.web.id"),
  title: {
    default: "Mahessa Trans Holiday | Rental Mobil & Paket Perjalanan",
    template: "%s | Mahessa Trans Holiday",
  },
  description: "Rental mobil dengan driver, charter, hingga perjalanan wisata dan perjalanan dinas dari Cimahi, Bandung & Padalarang.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const t = getDict(locale);
  const htmlLang = locale === "en" ? "en" : "id";

  return (
    <html lang={htmlLang} translate="no" className={`${jakarta.variable} ${dmMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <LocaleProvider locale={locale}>
          {children}
          <GoogleTranslate />
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
