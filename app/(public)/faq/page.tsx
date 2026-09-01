import type { Metadata } from "next";
import { seoMetadata } from "@/data/seo";
import JsonLd from "@/components/JsonLd";
import CtaSection from "@/components/CtaSection";
import FaqPageClient from "./FaqPageClient";
import { faqMain, faqExtra } from "@/data/faq";

export const metadata: Metadata = {
  title: seoMetadata.faq.title,
  description: seoMetadata.faq.description,
  keywords: seoMetadata.faq.keywords,
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
      <header className="relative overflow-hidden bg-gradient-to-b from-surface to-background pb-12 pt-32 md:pb-16 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-accent/[0.08] blur-3xl"
        />
        <div className="mx-auto w-full max-w-[1300px] relative px-5 sm:px-8 md:px-12">
          <span className="mb-3 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            FAQ
          </span>
          <h1 className="mb-3 max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading md:text-[44px]">
            Pertanyaan yang sering ditanyakan.
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-body-text md:text-base">
            Semua yang perlu kamu tahu sebelum reservasi. Tidak menemukan jawabannya?
            Hubungi kami via WhatsApp.
          </p>
        </div>
      </header>
      <FaqPageClient />
      <CtaSection />
    </>
  );
}
