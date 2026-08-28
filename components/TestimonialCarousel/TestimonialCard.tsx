"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import Avatar from "./AvatarInitials";

const EASE = [0.4, 0, 0.2, 1] as const;

type TestimonialCardProps = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  index: number;
};

export default function TestimonialCard({ name, role, quote, rating, index }: TestimonialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08, ease: EASE }}
      className="flex h-full flex-col gap-4 rounded-[16px] border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated"
    >
      <div className="flex items-start gap-3">
        <Avatar name={name} index={index} size={56} />
        <div className="min-w-0 flex-1">
          <p className="text-base font-extrabold text-heading">{name}</p>
          <p className="text-sm text-muted">{role}</p>
        </div>
      </div>

      <p className="text-[15px] leading-relaxed text-body-text">&ldquo;{quote}&rdquo;</p>

      <div className="mt-auto flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-line"}
            aria-hidden="true"
          />
        ))}
      </div>
    </motion.article>
  );
}
