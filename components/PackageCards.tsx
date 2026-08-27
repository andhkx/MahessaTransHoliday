"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { TravelPackage } from "@/lib/types";
import { cn } from "@/lib/cn";
import { formatShort } from "@/lib/format";
import useSnapActive from "./useSnapActive";

const EASE = [0.4, 0, 0.2, 1] as const;

type PackageCardsProps = {
  packages: TravelPackage[];
};

export default function PackageCards({ packages }: PackageCardsProps) {
  const reduce = useReducedMotion();
  const [rowRef, activeIdx] = useSnapActive();

  return (
    <div className="relative -mx-5 md:mx-0">
      <div
        ref={rowRef}
        className="flex snap-x snap-mandatory snap-center gap-3 overflow-x-auto px-[calc(50vw-130px)] pb-4 scrollbar-none md:snap-align-none md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4"
      >
      {packages.map((p, i) => (
        <motion.div
          key={p.id}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
          className={cn(
            "w-[260px] shrink-0 snap-center transition-all duration-300 ease-out will-change-transform md:snap-align-start md:w-auto",
            i === activeIdx
              ? "scale-100 opacity-100"
              : "scale-[0.88] opacity-60",
          )}
        >
          <Link
            href={`/paket/${p.slug}`}
            aria-label={`Lihat detail paket Hiace ${p.destination}`}
            className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-elevated"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-surface">
              <Image
                src={p.image}
                alt={`Paket Hiace ${p.destination}`}
                fill
                sizes="(max-width: 640px) 65vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full border border-line bg-white/85 px-2.5 py-1 text-[10px] font-bold text-heading backdrop-blur-md">
                <MapPin size={11} className="text-primary" aria-hidden="true" />
                {p.duration}
              </span>
              {p.badge && (
                <span className="absolute right-2.5 top-2.5 rounded-full bg-accent px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-card">
                  {p.badge}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-4">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-primary">
                Paket Hiace · All-In
              </p>
              <h3 className="mt-1 text-base font-bold leading-snug text-heading transition-colors duration-300 group-hover:text-accent md:text-lg">
                {p.destination}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                Mobil, driver, BBM, tol, dan parkir sudah termasuk.
              </p>

              <div className="mt-auto flex items-end justify-between gap-2 border-t border-line pt-3">
                <div>
                  <p className="text-sm font-extrabold tracking-tight text-accent">
                    Mulai {formatShort(p.price)}
                  </p>
                  <p className="text-[10px] font-semibold text-muted">
                    {p.durationHours} jam · {p.duration}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                >
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:hidden"
      />
    </div>
  );
}
