import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import VehicleCard from "@/components/VehicleCard";
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
        title="Pilih kendaraan untuk perjalananmu"
        subtitle={`Kami punya berbagai pilihan mulai dari mobil compact hingga kendaraan premium untuk setiap kebutuhan perjalanan. Tersedia ${vehicles.length} unit siap berangkat.`}
      />
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
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
