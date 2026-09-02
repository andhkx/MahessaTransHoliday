import type { Metadata } from "next";
import { seoMetadata } from "@/data/seo";
import PageHero from "@/components/PageHero";
import PaketListClient from "./PaketListClient";
import CtaSection from "@/components/CtaSection";
import { getAllPackages } from "@/lib/data/supabase/packages";

export const metadata: Metadata = {
  title: seoMetadata.paket.title,
  description: seoMetadata.paket.description,
  keywords: seoMetadata.paket.keywords,
  alternates: { canonical: "/paket" },
};

export default async function PaketPage() {
  const packages = await getAllPackages();

  return (
    <>
      <PageHero
        eyebrow="Harga Paket"
        title="Paket untuk perjalananmu."
        subtitle="All-in Hiace: mobil, driver, BBM — harga jelas di awal, tanpa biaya siluman."
      />
      <section className="mx-auto w-full max-w-[1300px] px-5 py-12 sm:px-8 md:px-12">
        <PaketListClient packages={packages} />
      </section>
      <CtaSection
        title="Tidak menemukan tujuanmu?"
        text="Kami bisa susun rute custom sesuai kebutuhan. Ceritakan destinasi impianmu via WhatsApp."
      />
    </>
  );
}