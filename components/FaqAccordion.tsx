"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/types";
import { cn } from "@/lib/cn";

type FaqAccordionProps = {
  items: FaqItem[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-[16px] border transition-colors duration-150",
              isOpen ? "border-primary/40 bg-white" : "border-line bg-white",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-150 hover:bg-wa-surface/60 md:px-6"
            >
              <span className="text-sm font-extrabold tracking-[-0.2px] text-accent md:text-base">
                {item.question}
              </span>
              <svg
                className={cn(
                  "h-5 w-5 shrink-0 text-primary transition-transform duration-500 [transition-timing-function:var(--ease-standard)]",
                  isOpen && "rotate-180",
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className={cn("acc-panel", isOpen && "open")}>
              <div>
                <p className="px-5 pb-5 text-sm font-semibold leading-relaxed tracking-[-0.2px] text-body-text md:px-6">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
