import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FaqAccordion from "@/components/FaqAccordion";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import { faqMain } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering diajukan seputar rental mobil, syarat sewa, pembayaran, paket wisata, dan layanan Mahessa Trans Holiday.",
  alternates: { canonical: "/faq" },
};

const faqPageLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqMain.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageLd} />
      <PageHeader
        eyebrow="FAQ"
        title="Pertanyaan yang sering ditanyakan."
        subtitle="Semua yang perlu kamu tahu sebelum reservasi. Tidak menemukan jawabannya? Hubungi kami via WhatsApp."
      />
      <section className="mx-auto w-full max-w-[860px] px-5 py-14 sm:px-8 md:px-12">
        <FaqAccordion items={faqMain} />
      </section>
      <CtaSection />
    </>
  );
}
