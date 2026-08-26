import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import VehicleCard from "@/components/VehicleCard";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
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
        title="Pilih kendaraan untuk perjalananmu"
        subtitle={`Kami punya berbagai pilihan mulai dari mobil compact hingga kendaraan premium untuk setiap kebutuhan perjalanan. Tersedia ${vehicles.length} unit siap berangkat.`}
      />
      <section className="py-12 lg:py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
            {vehicles.map((vehicle, i) => (
              <Reveal key={vehicle.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <VehicleCard vehicle={vehicle} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaSection
        title="Bingung pilih kendaraan?"
        text="Ceritakan rencana perjalanannya, tim kami bantu rekomendasikan unit yang paling pas dengan budget dan jumlah penumpang."
      />
    </>
  );
}
