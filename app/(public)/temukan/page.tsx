import type { Metadata } from "next";
import { seoMetadata } from "@/data/seo";
import PageHero from "@/components/PageHero";
import VehicleFinder from "@/components/VehicleFinder/VehicleFinder";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: seoMetadata.temukan.title,
  description: seoMetadata.temukan.description,
  keywords: seoMetadata.temukan.keywords,
  alternates: { canonical: "/temukan" },
};

export default function TemukanPage() {
  return (
    <>
      <PageHero
        eyebrow="Vehicle Finder"
        title="Temukan mobil cocok untukmu."
        subtitle="Jawab 3 pertanyaan singkat, kami rekomendasikan armada yang pas untuk perjalananmu."
      />
      <section className="mx-auto w-full max-w-[800px] px-5 pb-16 sm:px-8 md:px-12 md:pb-20">
        <VehicleFinder />
      </section>
    </>
  );
}