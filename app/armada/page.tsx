import type { Metadata } from "next";
import { seoMetadata } from "@/data/seo";
import PageHero from "@/components/PageHero";
import ArmadaListClient from "./ArmadaListClient";
import CtaSection from "@/components/CtaSection";
import { vehicles } from "@/data/vehicles";

export const metadata: Metadata = {
  title: seoMetadata.armada.title,
  description: seoMetadata.armada.description,
  keywords: seoMetadata.armada.keywords,
  alternates: { canonical: "/armada" },
};

export default function ArmadaPage() {
  return (
    <>
      <PageHero
        eyebrow="Armada"
        title="Kendaraan untuk perjalananmu."
        subtitle={`Mulai dari mobil compact yang irit hingga kendaraan premium dan rombongan. Tersedia ${vehicles.length} unit siap berangkat.`}
      />
      <section className="mx-auto w-full max-w-[1300px] px-5 py-12 sm:px-8 md:px-12 md:py-16">
        <ArmadaListClient vehicles={vehicles} />
      </section>
      <CtaSection
        title="Bingung pilih kendaraan?"
        text="Ceritakan rencana perjalanannya, tim kami bantu rekomendasikan unit yang paling pas dengan budget dan jumlah penumpang."
      />
    </>
  );
}
