"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/types";

const EASE = [0.4, 0, 0.2, 1] as const;
const VISIBLE = 5;

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<string>("");
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? items : items.slice(0, VISIBLE);

  return (
    <div>
      <div className="space-y-3">
        {visible.map((f, i) => {
          const k = f.id ?? String(i);
          const isOpen = open === k;
          return (
            <div
              key={k}
              className={`rounded-[18px] border bg-white transition-colors duration-300 ${
                isOpen ? "border-primary/50" : "border-line"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? "" : k)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-[15px] font-extrabold text-heading">
                  {f.question}
                </span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-muted transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-body-text">
                      {f.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      {items.length > VISIBLE && (
        <button
          type="button"
          onClick={() => setShowAll((p) => !p)}
          className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
        >
          {showAll ? "Tutup" : `Lihat ${items.length - VISIBLE} pertanyaan lainnya`}
        </button>
      )}
    </div>
  );
}

type FaqAccordionProps = {
  items: FaqItem[];
};
