"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/data/testimonials";

const EASE = [0.4, 0, 0.2, 1] as const;

function getItemsPerPage(width: number): number {
  if (width < 768) return 1;
  if (width < 1024) return 2;
  return 4;
}

export default function TestimonialCarousel() {
  const reduce = useReducedMotion();
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [pageIndex, setPageIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  // total page count (sliding windows of itemsPerPage)
  const totalPages = Math.max(1, testimonials.length - itemsPerPage + 1);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const next = getItemsPerPage(w);
      setItemsPerPage((prev) => {
        if (prev !== next) setPageIndex(0);
        return next;
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (reduce) return;
    if (paused) return;
    intervalRef.current = window.setInterval(() => {
      setPageIndex((p) => (p + 1) % totalPages);
    }, 5000);
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, [reduce, paused, totalPages]);

  const handlePrev = () => setPageIndex((p) => (p - 1 + totalPages) % totalPages);
  const handleNext = () => setPageIndex((p) => (p + 1) % totalPages);

  return (
    <section
      className="border-y border-line bg-surface/60 py-16 md:py-24"
      aria-label="Testimoni pelanggan"
    >
      <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-10 text-center md:mb-12"
        >
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
        </motion.header>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Desktop nav buttons */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Testimoni sebelumnya"
            className="absolute -left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-heading shadow-card transition-all hover:border-accent hover:text-accent md:flex"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Testimoni berikutnya"
            className="absolute -right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-heading shadow-card transition-all hover:border-accent hover:text-accent md:flex"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>

          <div
            ref={trackRef}
            className="overflow-hidden"
          >
            <motion.div
              className="flex"
              animate={{
                x: `calc(-${pageIndex * (100 / itemsPerPage)}% - ${pageIndex * (16 / itemsPerPage)}px)`,
              }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className="shrink-0 px-2"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <TestimonialCard
                    name={t.name}
                    role={t.role}
                    quote={t.quote}
                    rating={t.rating}
                    index={i}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Pagination dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const isActive = i === pageIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPageIndex(i)}
                  aria-label={`Halaman ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    isActive ? "w-8 bg-accent" : "w-2 bg-line",
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
