"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/data/testimonials";

export default function TestimonialCarousel() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState(0);
  const [listWidth, setListWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  // Update viewport width on resize
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Measure the width of the first list (horizontal width of all cards)
  useEffect(() => {
    if (listRef.current) {
      const width = listRef.current.getBoundingClientRect().width;
      setListWidth(width);
    }
  }, [testimonials]);

  // Animation loop for horizontal marquee
  useEffect(() => {
    if (listWidth === 0) return;

    const targetVelocity = 40; // pixels per second
    const hoverSpeed = 0; // pause on hover

    const animate = (timestamp: number) => {
      if (!trackRef.current) return;

      const velocity = isHovered ? hoverSpeed : targetVelocity;
      const now = timestamp / 1000;
      const last = animationFrameRef.current || now;
      const delta = now - last;

      const newOffset = offset + velocity * delta;
      // Loop seamlessly: when offset reaches listWidth, reset to 0
      // Because we have duplicate content, the jump is invisible
      const wrappedOffset = newOffset % listWidth;

      setOffset(wrappedOffset);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isHovered, listWidth, offset]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden border-y border-line bg-surface/60 py-16 md:py-24"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
            {/* First group */}
            <div
              ref={listRef}
              className="flex items-stretch gap-5"
            >
              {testimonials.map((t, i) => (
                <TestimonialCard
                  key={t.id}
                  name={t.name}
                  role={t.role}
                  quote={t.quote}
                  rating={t.rating}
                  index={i}
                />
              ))}
            </div>
            {/* Second group (duplicate) for seamless loop */}
            <div
              className="flex items-stretch gap-5"
              aria-hidden="true"
            >
              {testimonials.map((t, i) => (
                <TestimonialCard
                  key={t.id + "-duplicate"}
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