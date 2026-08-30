"use client";

import { Star } from "lucide-react";
import Avatar from "./AvatarInitials";

type TestimonialCardProps = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  index: number;
};

export default function TestimonialCard({
  name,
  role,
  quote,
  rating,
  index,
}: TestimonialCardProps) {
  return (
    <article
      className="flex h-full w-[320px] shrink-0 flex-col gap-5 rounded-[18px] border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="flex items-start gap-4">
        <Avatar name={name} index={index} size={56} />
        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-extrabold leading-tight text-heading">
            {name}
          </p>
          <p className="mt-1 text-[12px] font-medium text-muted">{role}</p>
        </div>
      </div>

      <p
        className="text-[14px] italic leading-[1.6] text-body-text"
        style={{ fontStyle: "italic" }}
      >
        &ldquo;{quote}&rdquo;
      </p>

      <div className="mt-auto flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-line"
            }
            aria-hidden="true"
          />
        ))}
      </div>
    </article>
  );
}