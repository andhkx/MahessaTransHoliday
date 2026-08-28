"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PEOPLE_OPTIONS } from "@/data/finder";
import { cn } from "@/lib/cn";

type Step2PeopleProps = {
  people: number;
  onPeopleChange: (p: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Step2People({ people, onPeopleChange, onPrev, onNext }: Step2PeopleProps) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<number>(people);

  const handleSelect = (value: number) => {
    setSelected(value);
    onPeopleChange(value);
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-6"
    >
      <h3 className="text-xl font-extrabold text-heading" >Berapa orang yang bepergian?</h3>
      <div className="flex flex-wrap gap-3">
        {PEOPLE_OPTIONS.map((opt) => {
          const val = Number(opt.id);
          const isActive = val === selected;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(val)}
              className={cn(
                "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-extrabold transition-colors",
                isActive ? "bg-accent text-white" : "border border-line bg-white text-body-text hover:border-accent/50 hover:text-accent",
              )}
            >
              {opt.label}
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
          disabled={selected === 0}
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white transition-all",
            selected === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-accent-hover",
          )}
        >
          Lanjut
        </button>
      </div>
    </motion.div>
  );
}
