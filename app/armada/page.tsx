import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ArmadaListClient from "./ArmadaListClient";
import CtaSection from "@/components/CtaSection";
import { vehicles } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Armada",
  description:
    "Pilih kendaraan untuk perjalananmu. Kami punya berbagai pilihan mulai dari mobil compact hingga kendaraan premium dan rombongan di Cimahi, Bandung, dan Padalarang.",
  alternates: { canonical: "/armada" },
};

export default function ArmadaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Armada"
        title="Kendaraan untuk perjalananmu."
        subtitle={`Mulai dari mobil compact yang irit hingga kendaraan premium dan rombongan. Tersedia ${vehicles.length} unit siap berangkat.`}
      />
      <section className="mx-auto w-full max-w-[1300px] px-5 py-16 sm:px-8 md:px-12">
        <ArmadaListClient vehicles={vehicles} />
      </section>
      <CtaSection
        title="Bingung pilih kendaraan?"
        text="Ceritakan rencana perjalanannya, tim kami bantu rekomendasikan unit yang paling pas dengan budget dan jumlah penumpang."
      />
    </>
  );
}
