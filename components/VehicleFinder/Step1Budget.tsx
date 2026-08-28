"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { vehicles } from "@/data/vehicles";
import { formatIDR } from "@/lib/format";
import { cn } from "@/lib/cn";

const EASE = [0.4, 0, 0.2, 1] as const;

type Step1BudgetProps = {
  budget: number;
  onBudgetChange: (b: number) => void;
  onNext: () => void;
};

export default function Step1Budget({ budget, onBudgetChange, onNext }: Step1BudgetProps) {
  const reduce = useReducedMotion();
  const [previewVehicles, setPreviewVehicles] = useState<Vehicle[]>([]);
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const filtered = vehicles
      .filter((v) => v.pricing.startingPrice !== null && v.pricing.startingPrice <= budget)
      .sort((a, b) => (a.pricing.startingPrice ?? 0) - (b.pricing.startingPrice ?? 0))
      .slice(0, 4);
    setPreviewVehicles(filtered);
  }, [budget]);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.round(Number(e.target.value) / 50000) * 50000;
    onBudgetChange(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onNext();
    }
  };

  const displayBudget = budget >= 1000000
    ? `Rp ${(budget / 1000000).toFixed(1)} jt`
    : `Rp ${Math.round(budget / 1000)} rb`;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="space-y-6"
    >
      <div>
        <h3 className="mb-1 text-xl font-extrabold text-heading">Berapa budget kamu?</h3>
        <p className="text-sm text-muted">Geser untuk menyesuaikan budget</p>
      </div>

      <div className="relative">
        <input
          ref={sliderRef}
          type="range"
          min="350000"
          max="12750000"
          step="50000"
          value={budget}
          onChange={handleSlider}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full appearance-none h-2 rounded-full bg-line accent-accent cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-accent/20",
          )}
          aria-label="Budget slider"
        />
        <div className="mt-4 flex justify-between text-sm font-bold text-muted">
          <span>Rp 350 rb</span>
          <span>Rp 12.75 jt</span>
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="rounded-[16px] border border-accent/20 bg-accent/5 p-4 text-center"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Budget Terpilih</p>
        <p className="mt-1 text-2xl font-extrabold text-heading">{displayBudget}</p>
        <p className="mt-2 text-[11px] text-muted">per 24 jam dengan driver</p>
      </motion.div>

      {previewVehicles.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-bold text-muted">Mobil yang cocok di budget ini:</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {previewVehicles.map((v) => (
              <Link key={v.id} href={`/armada/${v.slug}`} className="group">
                <motion.article
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative overflow-hidden rounded-[16px] border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated"
                >
                  <div className="aspect-video relative overflow-hidden bg-surface">
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-heading/35 via-transparent to-transparent" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-extrabold text-heading line-clamp-1">{v.name}</p>
                    <p className="text-[11px] font-bold text-accent">
                      {formatIDR(v.pricing.startingPrice ?? 0)} / 24 jam
                    </p>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onNext}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_24px_-10px_rgba(0,86,145,0.6)] transition-all hover:scale-[1.01] hover:bg-accent-hover active:scale-[0.98]"
      >
        Lanjut
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </motion.div>
  );
}