import type { Metadata } from "next";
import { seoMetadata } from "@/data/seo";
import PageHero from "@/components/PageHero";
import ArmadaListClient from "./ArmadaListClient";
import CtaSection from "@/components/CtaSection";
import { getAllVehicles } from "@/lib/data/supabase/vehicles";
import { getLocale, getDict } from "@/lib/i18n/server";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: seoMetadata.armada.title,
  description: seoMetadata.armada.description,
  keywords: seoMetadata.armada.keywords,
  alternates: { canonical: "/armada" },
};

export default async function ArmadaPage() {
  const vehicles = await getAllVehicles();
  const locale = await getLocale();
  const t = getDict(locale);

  const eyebrow = t.nav.armada;
  const title =
    locale === "id"
      ? "Kendaraan untuk perjalananmu."
      : "Vehicles for your trip.";
  const subtitle =
    locale === "id"
      ? `Mulai dari mobil compact yang irit hingga kendaraan premium dan rombongan. Tersedia ${vehicles.length} unit siap berangkat.`
      : `From fuel-efficient compact cars to premium and group vehicles. ${vehicles.length} units ready to roll.`;
  const ctaTitle =
    locale === "id" ? "Bingung pilih kendaraan?" : "Not sure which vehicle?";
  const ctaText =
    locale === "id"
      ? "Ceritakan rencana perjalanannya, tim kami bantu rekomendasikan unit yang paling pas dengan budget dan jumlah penumpang."
      : "Tell us your trip plan, we'll recommend the best fit for your budget and number of passengers.";

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
      />
      <section className="mx-auto w-full max-w-[1300px] px-5 py-12 sm:px-8 md:px-12 md:py-16">
        <ArmadaListClient vehicles={vehicles} />
      </section>
      <CtaSection title={ctaTitle} text={ctaText} />
    </>
  );
}
