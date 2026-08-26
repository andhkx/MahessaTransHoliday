"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Check, MessageCircle, Sparkles } from "lucide-react";
import type { TravelPackage } from "@/lib/types";
import { cn } from "@/lib/cn";
import { formatIDR } from "@/lib/format";
import useSnapActive from "./useSnapActive";

const EASE = [0.4, 0, 0.2, 1] as const;

type PackageCardsProps = {
  packages: TravelPackage[];
};

export default function PackageCards({ packages }: PackageCardsProps) {
  const reduce = useReducedMotion();
  const [rowRef, activeIdx] = useSnapActive();

  return (
    <div
      ref={rowRef}
      className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scrollbar-none md:grid md:grid-cols-3 md:overflow-visible md:pb-0 xl:grid-cols-4"
    >
      {packages.map((p, i) => {
        const featured = Boolean(p.badge);
        return (
          <motion.div
            key={p.id}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            className={cn(
              "w-[84vw] max-w-[360px] shrink-0 snap-start origin-left transition-transform duration-300 ease-out will-change-transform md:w-auto md:scale-100",
              i === activeIdx ? "scale-100" : "scale-[0.92]",
            )}
          >
            <article
              className={cn(
                "relative flex h-full min-h-[500px] flex-col rounded-[24px] border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1",
                featured
                  ? "border-primary/50 shadow-[0_18px_44px_-14px_rgba(83,189,235,0.4)]"
                  : "border-line hover:border-primary/40",
              )}
            >
              {featured && p.badge && (
                <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">
                  <Sparkles size={12} aria-hidden="true" />
                  {p.badge}
                </span>
              )}

              <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Hiace Â· {p.duration}
              </p>
              <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-heading md:text-3xl">
                {p.destination}
              </h3>
              {featured && (
                <span
                  className="mb-3 h-1 w-10 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
              <p className="text-base font-extrabold tracking-tight text-primary">
                Mulai {formatIDR(p.price)}
              </p>
              <p className="mt-1 mb-5 text-xs font-bold text-muted">
                All-in: mobil, driver, BBM, tol, parkir
              </p>

              <ul className="mb-6 flex-1 space-y-2.5">
                {p.included.slice(0, 4).map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[13px] text-body-text"
                  >
                    <Check
                      size={15}
                      className={`mt-0.5 shrink-0 ${
                        featured ? "text-primary" : "text-muted"
                      }`}
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/paket/${p.slug}`}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-extrabold transition-all hover:scale-[1.02] active:scale-[0.98]",
                  featured
                    ? "bg-accent text-white hover:bg-accent-hover"
                    : "border border-line bg-white text-heading hover:border-primary/60 hover:text-primary",
                )}
              >
                <MessageCircle size={16} aria-hidden="true" />
                Lihat Detail Paket
              </Link>
            </article>
          </motion.div>
        );
      })}
    </div>
  );
}
