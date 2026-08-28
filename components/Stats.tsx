"use client";

import { motion, useReducedMotion } from "motion/react";
import { CarFront, MapPin, Star, Wallet } from "lucide-react";

const EASE = [0.4, 0, 0.2, 1] as const;

const STATS = [
  { value: "Rp350rb", label: "Tarif Mulai", sub: "Dengan driver, 12 jam", Icon: Wallet },
  { value: "15+", label: "Armada Pilihan", sub: "Compact sampai Hiace", Icon: CarFront },
  { value: "10", label: "Paket Wisata", sub: "All-in tanpa ribet", Icon: MapPin },
  { value: "5★", label: "Rating Pelanggan", sub: "Layanan profesional", Icon: Star },
];

export default function Stats() {
  const reduce = useReducedMotion();

  return (
    <section className="relative z-10 mx-auto -mt-4 w-full max-w-[1100px] px-5 pb-6 sm:px-8 md:px-12">
      <div className="grid grid-cols-2 gap-3 rounded-[24px] border border-line bg-white px-4 py-5 shadow-card md:grid-cols-4 md:gap-4 md:px-6 md:py-6">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
            className="group flex items-center gap-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:shadow-card md:h-11 md:w-11">
              <s.Icon size={18} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-extrabold leading-tight tracking-tight text-accent sm:text-base md:text-lg">
                {s.value}
              </p>
              <p className="truncate text-[11px] font-bold text-heading">
                {s.label}
              </p>
              <p className="truncate text-[10px] font-semibold text-muted">
                {s.sub}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
