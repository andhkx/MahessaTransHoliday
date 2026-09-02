"use client";

import { useEffect, useRef, useState } from "react";
import TestimonialCard from "./TestimonialCard";

type Testimonial = {
  id: string | number;
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState(0);
  const [listWidth, setListWidth] = useState(0);

  useEffect(() => {
    if (listRef.current) {
      const width = listRef.current.getBoundingClientRect().width;
      setListWidth(width);
    }
  }, [testimonials]);

  useEffect(() => {
    if (listWidth === 0 || testimonials.length === 0) return;

    const targetVelocity = 40;
    const hoverSpeed = 0;
    let last = performance.now() / 1000;

    const animate = (timestamp: number) => {
      if (!trackRef.current) return;
      const now = timestamp / 1000;
      const delta = now - last;
      last = now;

      const velocity = isHovered ? hoverSpeed : targetVelocity;
      const newOffset = offset + velocity * delta;
      const wrappedOffset = newOffset % listWidth;

      setOffset(wrappedOffset);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isHovered, listWidth, offset, testimonials.length]);

  if (testimonials.length === 0) {
    return (
      <div className="border-y border-line bg-surface/60 py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12 text-center">
          <p className="text-sm text-muted">Belum ada testimoni.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden border-y border-line bg-surface/60 py-16 md:py-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            Testimoni
          </span>
          <h2 className="mb-3 text-2xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading sm:text-3xl md:text-4xl">
            Kata Mereka tentang{" "}
            <span className="text-accent">Mahessa</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-body-text md:text-base">
            Ribuan pelanggan telah mempercayai layanan kami untuk berbagai kebutuhan perjalanan.
          </p>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            className="flex"
            style={{
              transform: `translateX(-${offset}px)`,
              willChange: "transform"
            }}
          >
            <div ref={listRef} className="flex items-stretch gap-5 flex-shrink-0">
              {testimonials.map((t, i) => (
                <TestimonialCard
                  key={`a-${t.id}`}
                  name={t.name}
                  role={t.role}
                  quote={t.quote}
                  rating={t.rating}
                  index={i}
                />
              ))}
            </div>
            <div className="flex items-stretch gap-5 flex-shrink-0" aria-hidden="true">
              {testimonials.map((t, i) => (
                <TestimonialCard
                  key={`b-${t.id}`}
                  name={t.name}
                  role={t.role}
                  quote={t.quote}
                  rating={t.rating}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}