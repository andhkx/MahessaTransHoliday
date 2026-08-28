"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

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

  // Auto-scroll (paused on hover/drag). On mobile, does NOT pause on touch.
  useEffect(() => {
    if (reduce) return;
    if (paused || isDragging) return;
    intervalRef.current = window.setInterval(() => {
      setPageIndex((p) => (p + 1) % totalPages);
    }, 5000);
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, [reduce, paused, isDragging, totalPages]);

  const handlePrev = useCallback(() => {
    setPageIndex((p) => (p - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const handleNext = useCallback(() => {
    setPageIndex((p) => (p + 1) % totalPages);
  }, [totalPages]);

  const handleDot = useCallback((i: number) => {
    setPageIndex(i);
  }, []);

  // Touch/Swipe (works on mobile for manual slide)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    setDragOffset(deltaX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < 0) handleNext();
      else handlePrev();
    }
    setDragOffset(0);
    setDragStartX(0);
  };

  // Mouse drag (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    setDragOffset(deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < 0) handleNext();
      else handlePrev();
    }
    setDragOffset(0);
    setDragStartX(0);
  };

  // Calculate translateX with drag offset
  const baseTranslate = `calc(-${pageIndex * (100 / itemsPerPage)}% - ${pageIndex * (16 / itemsPerPage)}px)`;
  const finalTranslate = isDragging
    ? `${baseTranslate} + ${dragOffset}px`
    : baseTranslate;

  return (
    <section
      className="border-y border-line bg-surface/60 py-16 md:py-24"
      aria-label="Testimoni pelanggan"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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
          {/* Desktop nav buttons (44x44 circle, navy bg) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Testimoni sebelumnya"
            className={cn(
              "absolute top-1/2 z-10 -translate-y-1/2 hidden h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-[0_4px_14px_rgba(15,76,117,0.35)] transition-all duration-300 hover:bg-accent-hover hover:scale-105 hover:shadow-[0_8px_24px_rgba(15,76,117,0.45)] md:flex",
              isDragging && "opacity-50 pointer-events-none"
            )}
            style={{ left: itemsPerPage > 1 ? "-52px" : undefined }}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Testimoni berikutnya"
            className={cn(
              "absolute top-1/2 z-10 -translate-y-1/2 hidden h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-[0_4px_14px_rgba(15,76,117,0.35)] transition-all duration-300 hover:bg-accent-hover hover:scale-105 hover:shadow-[0_8px_24px_rgba(15,76,117,0.45)] md:flex",
              isDragging && "opacity-50 pointer-events-none"
            )}
            style={{ right: itemsPerPage > 1 ? "-52px" : undefined }}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>

          {/* Mobile prev/next buttons (below md) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Testimoni sebelumnya"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 border border-line text-heading shadow-card transition-all active:scale-95 md:hidden"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Testimoni berikutnya"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 border border-line text-heading shadow-card transition-all active:scale-95 md:hidden"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>

          <div
            ref={trackRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <motion.div
              className="flex"
              animate={{ x: finalTranslate }}
              transition={isDragging ? undefined : { duration: 0.5, ease: EASE }}
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
                  onClick={() => handleDot(i)}
                  aria-label={`Halaman ${i + 1}`}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    isActive
                      ? "w-8 bg-accent scale-110"
                      : "w-2 h-2 bg-line hover:bg-accent/60",
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