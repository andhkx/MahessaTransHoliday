import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ArtikelListClient from "./ArtikelListClient";
import { getAllArticles } from "@/lib/data/supabase/articles";
import { getLocale } from "@/lib/i18n/server";
import { hreflang } from "@/lib/i18n/seo";

export const metadata: Metadata = {
  title: "Artikel, Tips Rental & Panduan Wisata Bandung | Mahessa Trans Holiday",
  description:
    "Artikel, tips, itinerary, dan panduan lengkap seputar rental mobil, charter Hiace, paket wisata Bandung, Lembang, Ciwidey, Pangandaran, Garut, Bromo, Bali, dan antar jemput Bandara Kertajati, KCIC Padalarang. Dari Cimahi, Bandung & Padalarang.",
  keywords: [
    "artikel rental mobil bandung",
    "tips sewa mobil bandung",
    "panduan wisata bandung",
    "itinerary lembang",
    "itinerary ciwidey",
    "paket pangandaran",
    "paket garut",
    "paket bromo dari bandung",
    "sewa hiace bandung",
    "sewa innova reborn bandung",
    "antar jemput bandara kertajati",
    "kcic padalarang",
    "rental mobil cimahi",
    "rental mobil terpercaya",
    "paket city tour bandung",
    "liburan keluarga bandung",
    "study tour bandung",
    "family gathering bandung",
    "tips memilih rental mobil",
  ].join(", "),
  alternates: hreflang("/artikel"),
  openGraph: {
    title: "Artikel, Tips Rental & Panduan Wisata Bandung | Mahessa Trans Holiday",
    description:
      "Artikel, tips, itinerary, dan panduan lengkap seputar rental mobil, charter Hiace, paket wisata Bandung, Lembang, Ciwidey, Pangandaran, Garut, Bromo, Bali, dan antar jemput Bandara Kertajati, KCIC Padalarang.",
    url: "/artikel",
    type: "website",
  },
};

export const dynamic = 'force-dynamic';

export default async function ArtikelPage() {
  const articles = await getAllArticles();
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <>
      <PageHero
        eyebrow={isEn ? "Blog & Articles" : "Blog & Artikel"}
        title={isEn ? "Tips & travel guides." : "Tips & panduan perjalanan."}
        subtitle={
          isEn
            ? "Insights from our team for smoother trips — from daily rentals to multi-city packages."
            : "Insight dari tim kami untuk perjalanan yang lebih lancar — dari rental harian sampai paket multi-kota."
        }
      />

      <section className="mx-auto w-full max-w-[1300px] px-5 py-12 sm:px-8 md:px-12 md:py-16">
        <ArtikelListClient articles={articles} />
      </section>
    </>
  );
}
