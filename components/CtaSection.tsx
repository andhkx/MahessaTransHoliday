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
  text = "Ceritakan kebutuhan perjalananmu — kami bantu pilihkan kendaraan dan layanan yang sesuai target dan anggaran.",
}: CtaSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:px-12 md:py-20">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative overflow-hidden rounded-[24px] bg-accent px-6 py-10 text-white shadow-elevated md:px-12 md:py-14"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/[0.08]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-white/[0.06]"
        />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="min-w-0">
            <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-sky-200">
              Konsultasi gratis
            </p>
            <h2 className="mb-4 max-w-xl text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
              {title}
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
              {text}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {["Gratis bertanya", "Tanpa komitmen", "Langsung dibalas admin"].map(
                (t) => (
                  <span key={t} className="text-[13px] font-bold text-white/70">
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
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-6 py-4 text-sm font-extrabold text-accent transition-all hover:scale-[1.02] hover:bg-surface active:scale-[0.98] md:self-center"
          >
            <MessageCircle size={18} aria-hidden="true" /> Mulai Konsultasi
          </a>
        </div>
      </motion.div>
    </section>
  );
}
