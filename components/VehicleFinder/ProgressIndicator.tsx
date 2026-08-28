"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

const EASE = [0.4, 0, 0.2, 1] as const;

type ProgressIndicatorProps = {
  current: number;
  total: number;
  labels: string[];
};

export default function ProgressIndicator({
  current,
  total,
  labels,
}: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between gap-2">
        {Array.from({ length: total }).map((_, i) => {
          const step = i + 1;
          const isActive = step === current;
          const isDone = step < current;
          return (
            <div key={i} className="flex flex-1 items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  backgroundColor: isDone
                    ? "#005691"
                    : isActive
                      ? "#005691"
                      : "#d9e6ee",
                }}
                transition={{ duration: 0.3, ease: EASE }}
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold",
                  isActive || isDone ? "text-white" : "text-muted",
                )}
              >
                {step}
              </motion.div>
              {i < total - 1 && (
                <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-line">
                  <motion.div
                    initial={false}
                    animate={{
                      width: step < current ? "100%" : step === current ? "50%" : "0%",
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="absolute inset-y-0 left-0 bg-accent"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
        {labels.map((label, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 text-center transition-colors duration-300",
              i + 1 === current ? "text-accent" : "",
            )}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
