"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { BUDGET_TIERS, BUDGET_MIN, BUDGET_MAX, BUDGET_STEP } from "@/data/finder";
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

export default function Step1Budget({
  budget,
  onBudgetChange,
  onNext,
}: Step1BudgetProps) {
  const reduce = useReducedMotion();
  const [previewVehicles, setPreviewVehicles] = useState<Vehicle[]>([]);
  const sliderRef = useRef<HTMLInputElement>(null);

  // Update preview vehicles based on budget
  useEffect(() => {
    const filtered = vehicles
      .filter((v) => v.pricing.startingPrice !== null && v.pricing.startingPrice <= budget)
      .sort((a, b) => (a.pricing.startingPrice ?? 0) - (b.pricing.startingPrice ?? 0))
      .slice(0, 4);
    setPreviewVehicles(filtered);
  }, [budget]);

  // Quick pick button handler
  const handleQuickPick = (tier: (typeof BUDGET_TIERS)[0]) => {
    const mid = Math.round((tier.min + tier.max) / 2 / BUDGET_STEP) * BUDGET_STEP;
    onBudgetChange(mid);
  };

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.round(Number(e.target.value) / BUDGET_STEP) * BUDGET_STEP;
    onBudgetChange(val);
  };

  // Find active tier
  const activeTier = BUDGET_TIERS.find((t) => budget >= t.min && budget <= t.max);

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
        <p className="text-sm text-muted">Geser slider atau pilih kategori cepat</p>
      </div>

      {/* Quick Pick Buttons */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {BUDGET_TIERS.map((tier) => {
          const isActive = activeTier?.id === tier.id;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => handleQuickPick(tier)}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1.5 rounded-[16px] p-4 text-center text-white font-extrabold transition-all duration-300",
                isActive ? "scale-102 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)]" : "hover:scale-102 hover:opacity-95",
              )}
              style={{ backgroundColor: tier.color }}
            >
              <span className="text-[11px] uppercase tracking-[0.18em]">{tier.label}</span>
              <span className="text-[18px]">{tier.range}</span>
              {isActive && (
                <motion.span
                  initial={false}
                  animate={{ scale: [1, 1.1, 1] }}
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-success"
                >
                  ✓
                </motion.span>
              )}
            </button>
          );
        })}
      </div>

      {/* Slider */}
      <div className="relative">
        <input
          ref={sliderRef}
          type="range"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={BUDGET_STEP}
          value={budget}
          onChange={handleSlider}
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

      {/* Budget Display */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="rounded-[16px] border border-accent/20 bg-accent/5 p-4 text-center"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Budget Terpilih</p>
        <p className="mt-1 text-2xl font-extrabold text-heading">{displayBudget}</p>
        <p className="mt-2 text-[11px] text-muted">per 12 jam dengan driver</p>
        {activeTier && (
          <span className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white rounded-full"
            style={{ backgroundColor: activeTier.color }}
          >
            Kategori: {activeTier.label}
          </span>
        )}
      </motion.div>

      {/* Preview Vehicles */}
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
                    <img
                      src={v.image}
                      alt={v.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-heading/35 via-transparent to-transparent" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-extrabold text-heading line-clamp-1">{v.name}</p>
                    <p className="text-[11px] font-bold text-accent">
                      {formatIDR(v.pricing.startingPrice ?? 0)} / 12 jam
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
        Lanjut ke Step 2
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </motion.div>
  );
}