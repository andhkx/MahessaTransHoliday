"use client";

import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { useLocale, useT } from "@/lib/i18n/client";

type Testimonial = {
  id: string | number;
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const locale = useLocale();
  const t = useT();
  const isEn = locale === "en";

  useEffect(() => {
    if (testimonials.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    setActive((current) => Math.min(current, Math.max(0, testimonials.length - 1)));
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return (
      <section className="w-full overflow-hidden border-y border-line bg-surface/60 py-16 md:py-24">
        <p className="text-center text-sm text-muted">{isEn ? "No testimonials yet." : "Belum ada testimoni."}</p>
      </section>
    );
  }

  const testimonial = testimonials[active];

  return (
    <section className="w-full overflow-hidden border-y border-line bg-surface/60 py-16 md:py-24">
      <div className="mx-auto w-full max-w-[900px] px-5 sm:px-8 md:px-12">
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            {t.testimonial.eyebrow}
          </span>
          <h2 className="mb-3 text-2xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading sm:text-3xl md:text-4xl">
            {isEn ? "What they say about" : "Kata Mereka tentang"} <span className="text-accent">Mahessa</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-body-text md:text-base">
            {t.testimonial.subtitle}
          </p>
        </div>

        <div className="mx-auto w-full max-w-[620px] overflow-hidden">
          <div key={testimonial.id} className="animate-[fade-in_500ms_ease-out]">
            <TestimonialCard
              name={testimonial.name}
              role={testimonial.role}
              quote={testimonial.quote}
              rating={testimonial.rating}
              index={active}
            />
          </div>
        </div>

        {testimonials.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2" aria-label="Indikator testimoni">
            {testimonials.map((item, index) => (
              <span
                key={item.id}
                aria-current={index === active ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === active ? "w-8 bg-accent" : "w-1.5 bg-accent/25"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
