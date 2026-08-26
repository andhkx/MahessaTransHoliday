"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "mb-8 lg:mb-10",
        align === "center" ? "text-center" : "text-left",
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-heading sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-xl text-sm leading-relaxed text-body-text md:text-base",
            align === "center" && "mx-auto px-2",
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
