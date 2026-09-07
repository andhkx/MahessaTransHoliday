"use client";

import { motion, useReducedMotion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { waGeneralLink } from "@/lib/whatsapp";
import { useLocale, useT } from "@/lib/i18n/client";

const EASE = [0.4, 0, 0.2, 1] as const;

export default function ProcessSection() {
  const reduce = useReducedMotion();
  const t = useT();
  const locale = useLocale();
  const ctaLabel = locale === "id" ? "Mulai Chat dengan Admin" : "Start Chat with Admin";

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1300px] px-5 py-16 sm:px-8 md:px-12 md:py-24">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-8 text-center"
      >
        <span className="mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
          {t.process.eyebrow}
        </span>
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-heading sm:text-3xl md:text-4xl">
          {t.process.title}
        </h2>
        <p className="mx-auto max-w-xl px-2 text-sm leading-relaxed text-body-text md:text-base">
          {t.process.subtitle}
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {t.process.steps.map((p, i) => {
          const stepNum = String(i + 1).padStart(2, "0");
          return (
            <motion.article
              key={p.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              className="relative overflow-hidden rounded-[24px] border border-line bg-white p-6 shadow-card"
            >
              <span
                aria-hidden="true"
                className="absolute -right-2 -top-4 select-none text-[64px] font-extrabold leading-none text-accent/[0.07]"
              >
                {stepNum}
              </span>
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-mono text-[12px] font-extrabold text-primary">
                {stepNum}
              </span>
              <h3 className="mb-2 text-[18px] font-extrabold text-heading">{p.title}</h3>
              <p className="text-sm leading-relaxed text-body-text">{p.text}</p>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <a
          href={waGeneralLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-extrabold text-white shadow-card transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]"
        >
          <MessageCircle size={17} aria-hidden="true" />
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
