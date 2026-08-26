"use client";

import { motion, useReducedMotion } from "motion/react";
import { CheckCheck } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";
import useSnapActive from "./useSnapActive";

const EASE = [0.4, 0, 0.2, 1] as const;

function initials(name: string) {
  const words = name.replace(/[.,]/g, "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  return ((words[0][0] ?? "") + (words[1]?.[0] ?? "")).toUpperCase();
}

type TestimonialsProps = {
  items: Testimonial[];
};

export default function Testimonials({ items }: TestimonialsProps) {
  const reduce = useReducedMotion();
  const [rowRef, activeIdx] = useSnapActive();

  return (
    <div
      ref={rowRef}
      className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scrollbar-none md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
    >
      {items.map((t, i) => (
        <motion.div
          key={t.id}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
          className={`w-[84vw] max-w-[360px] shrink-0 snap-start origin-left transition-transform duration-300 ease-out will-change-transform md:w-auto md:scale-100 ${
            i === activeIdx ? "scale-100" : "scale-[0.92]"
          }`}
        >
          <article className="flex h-full flex-col rounded-[24px] border border-line bg-white p-5">
            <div className="mb-4 flex items-center gap-3 border-b border-line pb-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-extrabold text-primary">
                {initials(t.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold text-heading">{t.name}</p>
                <p className="truncate text-[11px] font-bold text-success">
                  online â€¢ {t.role}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-[13px]">
              <div className="w-fit max-w-[92%] rounded-2xl rounded-tl-sm bg-wa-surface px-3.5 py-2.5 leading-relaxed text-body-text">
                {t.message}
                <span className="mt-1 flex items-center justify-end gap-1 text-[10px] font-bold text-muted">
                  {t.time} <CheckCheck size={12} aria-hidden="true" />
                </span>
              </div>
              <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-accent px-3.5 py-2.5 font-bold text-white">
                {t.reply}
                <span className="mt-1 flex items-center justify-end gap-1 text-[10px] font-bold text-white/60">
                  <CheckCheck size={12} aria-hidden="true" />
                </span>
              </div>
            </div>
          </article>
        </motion.div>
      ))}
    </div>
  );
}
