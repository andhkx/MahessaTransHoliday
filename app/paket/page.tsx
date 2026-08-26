import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PackageCard from "@/components/PackageCard";
import CtaSection from "@/components/CtaSection";
import { packages } from "@/data/packages";

export const metadata: Metadata = {
  title: "Paket Perjalanan",
  description:
    "Nikmati perjalanan tanpa ribet dengan paket all-in kami. Mobil, driver, BBM, tol, parkir — semua sudah termasuk. Berangkat dari Cimahi, Bandung & Padalarang.",
  alternates: { canonical: "/paket" },
};

export default function PaketPage() {
  return (
    <>
      <PageHeader
        title="Paket Perjalanan"
        subtitle="Nikmati perjalanan tanpa ribet dengan paket all-in kami. Mobil, driver, BBM, tol, parkir — semua sudah termasuk."
      />
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {packages.map((packageItem) => (
              <PackageCard key={packageItem.id} packageItem={packageItem} />
            ))}
          </div>
        </div>
      </section>
      <CtaSection
        title="Tidak menemukan tujuanmu?"
        text="Kami bisa susun rute custom sesuai kebutuhan. Ceritakan destinasi impianmu via WhatsApp."
      />
    </>
  );
}
