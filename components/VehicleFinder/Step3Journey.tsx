"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import type { JourneyType } from "@/data/finder";
import { JOURNEY_TYPES } from "@/data/finder";

type Step3JourneyProps = {
  journey: JourneyType | null;
  onJourneyChange: (j: JourneyType) => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Step3Journey({ journey, onJourneyChange, onPrev, onNext }: Step3JourneyProps) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<JourneyType | null>(journey);

  const handleSelect = (id: JourneyType) => {
    setSelected(id);
    onJourneyChange(id);
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-6"
    >
      <h3 className="text-xl font-extrabold text-heading">Untuk perjalanan apa?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {JOURNEY_TYPES.map((j) => {
          const isActive = j.id === selected;
          return (
            <button
              key={j.id}
              type="button"
              onClick={() => handleSelect(j.id)}
              className={cn(
                "text-left p-4 rounded-[16px] border transition-all",
                isActive
                  ? "border-accent bg-accent/10 text-heading"
                  : "border-line bg-white text-body-text hover:border-accent/50",
              )}
            >
              <p className="text-sm font-extrabold">{j.label}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-extrabold text-heading border border-line transition-all hover:bg-accent hover:text-white"
        >
          Kembali
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!selected}
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white transition-all",
            !selected ? "opacity-50 cursor-not-allowed" : "hover:bg-accent-hover",
          )}
        >
          Lihat Rekomendasi
        </button>
      </div>
    </motion.div>
  );
}
