import type { Metadata } from "next";
import { seoMetadata } from "@/data/seo";
import PageHero from "@/components/PageHero";
import PaketListClient from "./PaketListClient";
import CtaSection from "@/components/CtaSection";
import { getAllPackages } from "@/lib/data/supabase/packages";
import { getLocale, getDict } from "@/lib/i18n/server";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {

  title: seoMetadata.paket.title,
  description: seoMetadata.paket.description,
  keywords: seoMetadata.paket.keywords,
  alternates: { canonical: "/paket" },
};

export default async function PaketPage() {
  const packages = await getAllPackages();
  const locale = await getLocale();
  const t = getDict(locale);

  return (
    <>
      <PageHero
        eyebrow={t.featuredPaket.eyebrow}
        title={locale === "id" ? "Paket untuk perjalananmu." : "Packages for your trip."}
        subtitle={
          locale === "id"
            ? "All-in Hiace: mobil, driver, BBM — harga jelas di awal, tanpa biaya siluman."
            : "All-in Hiace: vehicle, driver, fuel — clear pricing upfront, no hidden fees."
        }
      />
      <section className="mx-auto w-full max-w-[1300px] px-5 py-12 sm:px-8 md:px-12">
        <PaketListClient packages={packages} />
      </section>
      <CtaSection
        title={locale === "id" ? "Tidak menemukan tujuanmu?" : "Don't see your destination?"}
        text={
          locale === "id"
            ? "Kami bisa susun rute custom sesuai kebutuhan. Ceritakan destinasi impianmu via WhatsApp."
            : "We can plan a custom route to fit your needs. Share your dream destination via WhatsApp."
        }
      />
    </>
  );
}
