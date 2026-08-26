"use client";

import { motion, useReducedMotion } from "motion/react";
import { BadgeCheck, CarFront, MapPin, Wallet } from "lucide-react";

const EASE = [0.4, 0, 0.2, 1] as const;

const STATS = [
  { value: "Rp350rb", label: "Rental Mulai", sub: "Lepas kunci 24 jam", Icon: Wallet },
  { value: "15+", label: "Unit Armada", sub: "Compact sampai Hiace", Icon: CarFront },
  { value: "10", label: "Paket Wisata", sub: "All-in tanpa ribet", Icon: MapPin },
  { value: "100%", label: "Harga Transparan", sub: "Tanpa biaya siluman", Icon: BadgeCheck },
];

export default function Stats() {
  const reduce = useReducedMotion();

  return (
    <section className="relative z-10 mx-auto -mt-2 w-full max-w-[1300px] px-5 pb-4 sm:px-8 md:px-12">
      <div className="grid grid-cols-2 gap-x-5 gap-y-5 rounded-[20px] border border-line bg-white px-5 py-6 shadow-card md:grid-cols-4 md:px-7 md:py-7">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
            className="group flex items-center gap-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface text-primary transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:shadow-card md:h-11 md:w-11">
              <s.Icon size={17} strokeWidth={1.8} aria-hidden="true" className="md:hidden" />
              <s.Icon size={19} strokeWidth={1.8} aria-hidden="true" className="hidden md:block" />
            </span>
            <div className="min-w-0">
              <p className="text-base font-extrabold leading-tight tracking-tight text-accent sm:text-lg md:text-xl">
                {s.value}
              </p>
              <p className="truncate text-[11px] font-bold text-heading sm:text-[13px]">
                {s.label}
              </p>
              <p className="truncate text-[10px] font-semibold text-muted sm:text-[11px]">
                {s.sub}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
