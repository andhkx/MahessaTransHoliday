"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CarFront, MapPinned, Plane, UserRound } from "lucide-react";
import { services } from "@/data/services";
import SectionHeading from "./SectionHeading";
import useSnapActive from "./useSnapActive";

const EASE = [0.4, 0, 0.2, 1] as const;
const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  "rental-mobil": CarFront,
  "mobil-driver": UserRound,
  "charter-transfer": MapPinned,
  "paket-wisata": Plane,
};

const IMAGES: Record<string, string> = {
  "rental-mobil": "/images/vehicles/toyota-agya.svg",
  "mobil-driver": "/images/vehicles/toyota-innova-reborn.svg",
  "charter-transfer": "/images/vehicles/toyota-hiace-premio.svg",
  "paket-wisata": "/images/packages/hiace-bandung.svg",
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

      <div
        ref={rowRef}
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 scrollbar-none md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
      >
        {services.map((item, i) => {
          const Icon = ICONS[item.id] ?? CarFront;
          const isActive = i === activeIdx;
          return (
            <motion.div
              key={item.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className={`w-[84vw] max-w-[360px] shrink-0 snap-start origin-left transition-transform duration-300 ease-out will-change-transform md:w-auto md:scale-100 ${
                i === activeIdx ? "scale-100" : "scale-[0.96]"
              }`}
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

                <Link
                  href={item.ctaHref}
                  aria-label={`${item.ctaLabel} - ${item.title}`}
                  className="relative mx-4 mt-2 block"
                >
                  <div
                    className={`w-full origin-bottom transition-transform duration-300 ease-out ${
                      isActive ? "scale-100" : "scale-[0.95]"
                    }`}
                  >
                    <div className="relative mx-auto flex h-[190px] w-full max-w-[280px] items-end justify-center overflow-hidden rounded-t-[28px] shadow-[0_-8px_30px_-12px_rgba(35,51,45,0.25)] transition-transform duration-300 group-hover:-translate-y-2">
                      <Image
                        src={IMAGES[item.id]}
                        alt={item.title}
                        fill
                        sizes="(max-width: 767px) 84vw, 300px"
                        className="object-cover object-top"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                </Link>
              </article>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
