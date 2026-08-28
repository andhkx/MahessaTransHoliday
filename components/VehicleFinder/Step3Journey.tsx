"use client";

import { motion, useReducedMotion } from "motion/react";
import { Building2, Briefcase, Mountain, Plane, ArrowLeft } from "lucide-react";
import { JOURNEY_TYPES } from "@/data/finder";
import type { JourneyType } from "@/data/finder";
import { cn } from "@/lib/cn";

const EASE = [0.4, 0, 0.2, 1] as const;

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Building2: Building2,
  Briefcase: Briefcase,
  Mountain: Mountain,
  Plane: Plane,
};

type Step3JourneyProps = {
  journey: JourneyType | null;
  onJourneyChange: (j: JourneyType) => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Step3Journey({
  journey,
  onJourneyChange,
  onPrev,
  onNext,
}: Step3JourneyProps) {
  const reduce = useReducedMotion();
  const selected = journey ? JOURNEY_TYPES.find((j) => j.id === journey) : null;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="space-y-6"
    >
      <div>
        <h3 className="mb-1 text-xl font-extrabold text-heading">Untuk perjalanan apa?</h3>
        <p className="text-sm text-muted">Pilih jenis perjalanan yang sesuai</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {JOURNEY_TYPES.map((j) => {
          const Icon = ICON_MAP[j.Icon] ?? Plane;
          const isActive = j.id === journey;
          return (
            <button
              key={j.id}
              type="button"
              onClick={() => onJourneyChange(j.id)}
              className={cn(
                "flex items-start gap-4 rounded-[16px] border-2 p-5 text-left transition-all duration-300",
                isActive
                  ? "border-accent bg-accent/10 shadow-[0_8px_20px_-8px_rgba(15,76,117,0.35)] scale-[1.02]"
                  : "border-line bg-white hover:border-accent/60 hover:shadow-card",
              )}
            >
              <Icon size={48} className={isActive ? "text-accent shrink-0" : "text-primary shrink-0"} aria-hidden="true" />
              <div>
                <p className="text-[16px] font-extrabold leading-tight text-heading md:text-[17px]">
                  {j.label}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted md:text-[13px]">
                  {j.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="rounded-[12px] border border-accent/20 bg-accent/5 p-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Kamu pilih</p>
          <p className="mt-1 text-base font-extrabold text-heading">{selected.label}</p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-extrabold text-heading transition-all hover:bg-accent hover:text-white"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Kembali
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!journey}
          className={cn(
            "inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold text-white transition-all",
            journey
              ? "bg-accent hover:bg-accent-hover"
              : "bg-muted cursor-not-allowed opacity-50",
          )}
        >
          Lihat Rekomendasi
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
