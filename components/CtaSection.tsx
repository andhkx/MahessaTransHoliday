"use client";

import { motion, useReducedMotion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { waGeneralLink } from "@/lib/whatsapp";

const EASE = [0.4, 0, 0.2, 1] as const;

type CtaSectionProps = {
  title?: string;
  text?: string;
};

export default function CtaSection({
  title = "Siap berangkat bersama Mahessa?",
  text = "Ceritakan kebutuhan perjalananmu. Kami bantu siapkan kendaraan dan layanan yang sesuai target dan anggaran.",
}: CtaSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:px-12 md:py-24">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="rounded-[24px] border border-line bg-wa-surface/60 px-6 py-10 md:px-10 md:py-14"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="min-w-0">
            <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              Konsultasi gratis
            </p>
            <h2 className="mb-4 max-w-xl text-2xl font-extrabold leading-tight tracking-tight text-heading md:text-4xl">
              {title}
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-body-text md:text-base">
              {text}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {["Gratis bertanya", "Tanpa komitmen", "Langsung dibalas admin"].map(
                (t) => (
                  <span key={t} className="text-[13px] font-bold text-muted">
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          <a
            href={waGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-accent px-6 py-4 text-sm font-extrabold text-white transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98] md:self-center"
          >
            <MessageCircle size={18} aria-hidden="true" /> Mulai Konsultasi
          </a>
        </div>
      </motion.div>
    </section>
  );
}
