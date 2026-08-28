"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CarFront, MapPinned, Plane, UserRound } from "lucide-react";
import { services } from "@/data/services";
import SectionHeading from "./SectionHeading";
import useSnapActive from "./useSnapActive";

const EASE = [0.4, 0, 0.2, 1] as const;
const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  "transfer-bandara": Plane,
  "mobil-driver": UserRound,
  "charter-transfer": MapPinned,
  "paket-wisata": CarFront,
};

export default function ServiceCards() {
  const reduce = useReducedMotion();
  const [rowRef, activeIdx] = useSnapActive();

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1300px] px-5 py-16 sm:px-8 md:px-12 md:py-24">
      <SectionHeading
        eyebrow="Layanan Kami"
        title="Butuh perjalanan seperti apa?"
        subtitle="Pilih layanan yang sesuai dengan kebutuhan perjalanan kamu."
      />

      <div className="mb-5 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary md:hidden">
        <span>Geser untuk melihat layanan lainnya</span>
        <ArrowRight size={13} aria-hidden="true" />
      </div>

      <div className="relative -mx-5 md:mx-0">
        <div
          ref={rowRef}
          className="flex snap-x snap-mandatory snap-center gap-3 overflow-x-auto px-[calc(50vw-42vw)] pb-4 scrollbar-none md:snap-align-none md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
        >
        {services.map((item, i) => {
          const Icon = ICONS[item.id] ?? CarFront;
          const isActive = i === activeIdx;
          const isPaket = item.id === "paket-wisata";
          return (
            <motion.div
              key={item.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className={`w-[84vw] max-w-[360px] shrink-0 snap-center origin-left transition-all duration-300 ease-out will-change-transform md:snap-align-start md:w-auto md:scale-100 md:opacity-100 ${
                isActive
                  ? "scale-100 opacity-100"
                  : "scale-[0.9] opacity-60"
              }`}
            >
              {isPaket ? (
                <Link
                  href={item.ctaHref}
                  aria-label={`${item.ctaLabel} - ${item.title}`}
                  className="block h-full"
                >
                  <article className="group relative flex h-full min-h-[440px] flex-col justify-between overflow-hidden rounded-[24px] border border-line bg-white shadow-card transition-transform duration-300 hover:-translate-y-1">
                    <div className="p-6 pb-3">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <Icon size={20} strokeWidth={1.6} className="text-primary" aria-hidden="true" />
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
                          Layanan
                        </span>
                      </div>
                      <h3 className="mb-2 text-xl font-extrabold leading-tight text-heading md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-body-text md:text-sm">
                        {item.text}
                      </p>
                    </div>

                    <div className="relative mx-4 mt-2 block">
                      <div
                        className={`w-full origin-bottom transition-transform duration-300 ease-out ${
                          isActive ? "scale-100" : "scale-[0.95]"
                        }`}
                      >
                        <div className="relative mx-auto flex h-[190px] w-full max-w-[280px] items-end justify-center overflow-hidden rounded-t-[28px] bg-[url('/images/services/paket-wisata.webp')] bg-cover bg-center shadow-[0_-8px_30px_-12px_rgba(35,51,45,0.25)] transition-transform duration-300 group-hover:-translate-y-2" />
                      </div>
                    </div>
                  </article>
                </Link>
              ) : (
                <Link
                  href={item.ctaHref}
                  aria-label={`${item.ctaLabel} - ${item.title}`}
                  className="group block h-full"
                >
                  <article className="flex h-full min-h-[280px] flex-col justify-between rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1">
                    <div>
                      <div className="mb-4 flex items-center justify-between gap-2">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/[0.1] text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                          <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
                          Layanan
                        </span>
                      </div>
                      <h3 className="mb-2 text-xl font-extrabold leading-tight text-heading md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-body-text md:text-sm">
                        {item.text}
                      </p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-extrabold text-accent transition-transform duration-300 group-hover:translate-x-1">
                      {item.ctaLabel}
                      <ArrowRight size={13} aria-hidden="true" />
                    </span>
                  </article>
                </Link>
              )}
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
