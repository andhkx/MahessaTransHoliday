"use client";

import { motion, useReducedMotion } from "motion/react";
import { User, Users, Users2, Bus, ArrowLeft } from "lucide-react";
import { PEOPLE_OPTIONS } from "@/data/finder";
import { cn } from "@/lib/cn";

const EASE = [0.4, 0, 0.2, 1] as const;

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  User: User,
  Users: Users,
  Users2: Users2,
  Bus: Bus,
};

type Step2PeopleProps = {
  people: number;
  onPeopleChange: (p: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Step2People({
  people,
  onPeopleChange,
  onPrev,
  onNext,
}: Step2PeopleProps) {
  const reduce = useReducedMotion();
  const selectedBucket = PEOPLE_OPTIONS.find((opt) => opt.capacity === people) ?? PEOPLE_OPTIONS[2];

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="space-y-6"
    >
      <div>
        <h3 className="mb-1 text-xl font-extrabold text-heading">
          Berapa orang yang bepergian?
        </h3>
        <p className="text-sm text-muted">Pilih kategori yang sesuai dengan jumlah penumpang</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
        {PEOPLE_OPTIONS.map((opt) => {
          const Icon = ICON_MAP[opt.Icon] ?? User;
          const isActive = opt.id === selectedBucket.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onPeopleChange(opt.capacity)}
              className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-[16px] border-2 p-6 text-center transition-all duration-300",
                isActive
                  ? "border-accent bg-accent/10 text-heading shadow-[0_8px_20px_-8px_rgba(15,76,117,0.35)] scale-[1.02]"
                  : "border-line bg-white text-body-text hover:border-accent/60 hover:shadow-card",
              )}
            >
              <Icon size={48} className={isActive ? "text-accent" : "text-primary"} aria-hidden="true" />
              <span className="text-base font-extrabold">{opt.label}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-[12px] border border-accent/20 bg-accent/5 p-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Kamu pilih</p>
        <p className="mt-1 text-lg font-extrabold text-heading">{selectedBucket.label}</p>
      </div>

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
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-white transition-all hover:bg-accent-hover"
        >
          Lanjut ke Step 3
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
