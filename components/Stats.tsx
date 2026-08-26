"use client";

import { motion, useReducedMotion } from "motion/react";
import { BadgeCheck, CarFront, MapPin, Wallet } from "lucide-react";

const EASE = [0.4, 0, 0.2, 1];

const STATS = [
  { value: "Rp350rb", label: "Rental Mulai", sub: "Lepas kunci 24 jam", Icon: Wallet },
  { value: "15+", label: "Unit Armada", sub: "Compact sampai Hiace", Icon: CarFront },
  { value: "10", label: "Paket Wisata", sub: "All-in tanpa ribet", Icon: MapPin },
  { value: "100%", label: "Harga Transparan", sub: "Tanpa biaya siluman", Icon: BadgeCheck },
];

export default function Stats() {
  const reduce = useReducedMotion();

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1300px] px-5 pb-4 sm:px-8 md:px-12">
      <div className="grid grid-cols-2 gap-x-5 gap-y-5 rounded-[20px] border border-line bg-wa-surface/50 px-5 py-6 shadow-[0_22px_44px_-22px_rgba(35,51,45,0.25)] md:grid-cols-4 md:px-7 md:py-7">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
            className="flex items-center gap-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/25 md:h-11 md:w-11">
              <s.Icon size={17} strokeWidth={1.8} aria-hidden="true" className="md:hidden" />
              <s.Icon size={19} strokeWidth={1.8} aria-hidden="true" className="hidden md:block" />
            </span>
            <div className="min-w-0">
              <p className="text-base font-extrabold leading-tight tracking-tight text-heading sm:text-lg md:text-xl">
                {s.value}
              </p>
              <p className="truncate text-[11px] font-bold text-body-text sm:text-[13px]">{s.label}</p>
              <p className="truncate text-[10px] font-bold text-muted sm:text-[11px]">{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
