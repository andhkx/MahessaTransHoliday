import type { Metadata } from "next";
import { seoMetadata } from "@/data/seo";
import PageHero from "@/components/PageHero";
import ArmadaListClient from "./ArmadaListClient";
import CtaSection from "@/components/CtaSection";
import { getAllVehicles } from "@/lib/data/supabase/vehicles";
import { vehicles as staticVehicles } from "@/data/vehicles";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {

  title: seoMetadata.armada.title,
  description: seoMetadata.armada.description,
  keywords: seoMetadata.armada.keywords,
  alternates: { canonical: "/armada" },
};

export default async function ArmadaPage() {
  const supabaseVehicles = await getAllVehicles();
  const vehicles = supabaseVehicles.length > 0 ? supabaseVehicles : staticVehicles;

  if (supabaseVehicles.length === 0) {
    console.warn('[Armada Page] Using static fallback data');
  }

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