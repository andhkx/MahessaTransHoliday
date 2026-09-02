import type { Metadata } from "next";
import { seoMetadata } from "@/data/seo";
import CtaSection from "@/components/CtaSection";
import KontakPageClient from "./KontakPageClient";
import { SERVICE_AREAS } from "@/lib/constants";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {

  title: seoMetadata.kontak.title,
  description: seoMetadata.kontak.description,
  keywords: seoMetadata.kontak.keywords,
  alternates: { canonical: "/kontak" },
};

export default function KontakPage() {
  return (
    <>
      <header className="relative overflow-hidden bg-gradient-to-b from-surface to-background pb-12 pt-32 md:pb-16 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-accent/[0.08] blur-3xl"
        />
        <div className="mx-auto w-full max-w-[1300px] relative px-5 sm:px-8 md:px-12">
          <span className="mb-3 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            Kontak
          </span>
          <h1 className="mb-3 max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading md:text-[44px]">
            Hubungi kami kapan saja.
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-body-text md:text-base">
            Kami melayani {SERVICE_AREAS.join(", ")}. Konsultasi gratis �
            ceritakan kebutuhan perjalananmu.
          </p>
        </div>
      </header>
      <KontakPageClient />
      <CtaSection
        title="Siap berangkat kapan pun kamu siap"
        text="Reservasi paling cepat lewat WhatsApp. Tim kami balas di jam operasional."
      />
    </>
  );
}
