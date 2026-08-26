import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PackageCards from "@/components/PackageCards";
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
        eyebrow="Harga Paket"
        title="Paket untuk perjalananmu."
        subtitle="All-in Hiace: mobil, driver, BBM, tol, parkir — harga jelas di awal, tanpa biaya siluman."
      />
      <section className="mx-auto w-full max-w-[1300px] px-5 py-16 sm:px-8 md:px-12">
        <PackageCards packages={packages} />
      </section>
      <CtaSection
        title="Tidak menemukan tujuanmu?"
        text="Kami bisa susun rute custom sesuai kebutuhan. Ceritakan destinasi impianmu via WhatsApp."
      />
    </>
  );
}
