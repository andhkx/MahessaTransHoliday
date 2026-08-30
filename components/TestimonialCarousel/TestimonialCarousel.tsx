"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/data/testimonials";

const EASE = [0.4, 0, 0.2, 1] as const;
const MOBILE_INTERVAL = 1000; // 1 detik auto-advance di mobile
const DESKTOP_INTERVAL = 5000; // 5 detik di desktop

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
  const intervalRef = useRef<number | null>(null);

  const isMobile = itemsPerPage === 1;

  // total page count (sliding windows of itemsPerPage)
  const totalPages = Math.max(1, testimonials.length - itemsPerPage + 1);

  // Update itemsPerPage on resize
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

  // Auto-scroll for both mobile and desktop (paused on hover for desktop)
    useEffect(() => {
    if (reduce) return;
    if (paused) return;
    const interval = isMobile ? MOBILE_INTERVAL : DESKTOP_INTERVAL;
    intervalRef.current = window.setInterval(() => {
      setPageIndex((p) => (p + 1) % totalPages);
    }, interval);
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, [reduce, isMobile, paused, totalPages]);

  const handlePrev = useCallback(() => {
    setPageIndex((p) => (p - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const handleNext = useCallback(() => {
    setPageIndex((p) => (p + 1) % totalPages);
  }, [totalPages]);

  const handleDot = useCallback((i: number) => {
    setPageIndex(i);
  }, []);

  // Calculate translateX for discrete sliding
  const translateX = `calc(-${pageIndex * (100 / itemsPerPage)}% - ${pageIndex * (16 / itemsPerPage)}px)`;

  return (
    <section
      className="border-y border-line bg-surface/60 py-16 md:py-24"
      aria-label="Testimoni pelanggan"
      onMouseEnter={() => !isMobile && setPaused(true)}
      onMouseLeave={() => !isMobile && setPaused(false)}
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

        <div className="relative">
          {/* Desktop nav buttons (hidden on mobile — mobile is auto-slide only) */}
          {!isMobile && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Testimoni sebelumnya"
                className="absolute top-1/2 z-10 -translate-y-1/2 hidden h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-[0_4px_14px_rgba(15,76,117,0.35)] transition-all duration-300 hover:bg-accent-hover hover:scale-105 hover:shadow-[0_8px_24px_rgba(15,76,117,0.45)] md:flex"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Testimoni berikutnya"
                className="absolute top-1/2 z-10 -translate-y-1/2 hidden h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-[0_4px_14px_rgba(15,76,117,0.35)] transition-all duration-300 hover:bg-accent-hover hover:scale-105 hover:shadow-[0_8px_24px_rgba(15,76,117,0.45)] md:flex"
                style={{ right: itemsPerPage > 1 ? "-52px" : undefined }}
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </>
          )}

          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: translateX }}
              transition={{ duration: isMobile ? 0.4 : 0.5, ease: EASE }}
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
          <div className="mt-8 flex items-center justify-center gap-3">
            {Array.from({ length: totalPages }).map((_, i) => {
              const isActive = i === pageIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleDot(i)}
                  aria-label={`Testimoni ${i + 1}`}
                  className={cn(
                    "relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300",
                    isActive
                      ? "bg-accent"
                      : "bg-line hover:bg-accent/60",
                  )}
                >
                  <span
                    className={cn(
                      "rounded-full transition-all duration-300",
                      isActive
                        ? "h-2.5 w-2.5 bg-white"
                        : "h-1.5 w-1.5 bg-transparent",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
       </div>
     </section>
   );
}
