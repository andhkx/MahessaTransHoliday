import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  ADDRESS,
  SERVICE_AREAS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/constants";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Rental Mobil & Paket Perjalanan Cimahi, Bandung, Padalarang`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "rental mobil cimahi",
    "rental mobil bandung",
    "rental mobil padalarang",
    "sewa mobil dengan driver",
    "paket wisata bandung",
    "sewa hiace bandung",
    "charter mobil bandung",
    "mahessa trans holiday",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Rental Mobil & Paket Perjalanan`,
    description: SITE_TAGLINE,
    url: SITE_URL,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  description: SITE_TAGLINE,
  url: SITE_URL,
  telephone: "+6281234567890",
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS,
    addressLocality: "Cimahi",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  areaServed: SERVICE_AREAS.map((area) => ({ "@type": "Place", name: area })),
  priceRange: "Rp350.000 - Rp12.750.000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={localBusinessJsonLd} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
