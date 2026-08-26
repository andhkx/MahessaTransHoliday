import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PackageCard from "@/components/PackageCard";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
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
      <section className="py-12 lg:py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
            {packages.map((packageItem, i) => (
              <Reveal key={packageItem.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <PackageCard packageItem={packageItem} className="h-full" />
              </Reveal>
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
