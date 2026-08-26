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
      <section className="py-12 lg:py-16">
        <div className="container-site max-w-3xl">
          <FaqAccordion items={faqMain} />
          <h2 className="mb-6 mt-12 text-h5 font-bold text-primary">
            Pertanyaan lainnya
          </h2>
          <FaqAccordion items={faqExtra} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
