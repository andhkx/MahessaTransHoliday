import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FaqAccordion from "@/components/FaqAccordion";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import { faqExtra, faqMain } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering diajukan seputar rental mobil, syarat sewa, pembayaran, paket wisata, dan layanan Mahessa Trans Holiday.",
  alternates: { canonical: "/faq" },
};

const faqPageLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...faqMain, ...faqExtra].map((item) => ({
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
        title="Pertanyaan yang sering diajukan"
        subtitle="Semua yang perlu kamu tahu sebelum reservasi. Tidak menemukan jawabannya? Hubungi kami via WhatsApp."
      />
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FaqAccordion items={faqMain} />
          <h2 className="mb-6 mt-12 text-xl font-extrabold text-primary">
            Pertanyaan lainnya
          </h2>
          <FaqAccordion items={faqExtra} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
