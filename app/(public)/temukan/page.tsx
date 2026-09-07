import type { Metadata } from "next";
import { seoMetadata } from "@/data/seo";
import PageHero from "@/components/PageHero";
import VehicleFinder from "@/components/VehicleFinder/VehicleFinder";
import { getLocale } from "@/lib/i18n/server";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: seoMetadata.temukan.title,
  description: seoMetadata.temukan.description,
  keywords: seoMetadata.temukan.keywords,
  alternates: { canonical: "/temukan" },
};

export default async function TemukanPage() {
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <>
      <PageHero
        eyebrow={isEn ? "Vehicle Finder" : "Vehicle Finder"}
        title={isEn ? "Find the right vehicle for you." : "Temukan mobil cocok untukmu."}
        subtitle={isEn
          ? "Answer 3 short questions, we'll recommend the vehicle that fits your trip."
          : "Jawab 3 pertanyaan singkat, kami rekomendasikan armada yang pas untuk perjalananmu."}
      />
      <section className="mx-auto w-full max-w-[800px] px-5 pb-16 sm:px-8 md:px-12 md:pb-20">
        <VehicleFinder />
      </section>
    </>
  );
}
