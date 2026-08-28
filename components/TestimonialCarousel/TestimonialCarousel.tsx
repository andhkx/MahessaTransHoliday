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
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

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

  // Mobile: CSS marquee continuous scroll (no interval, no pause)
  // Desktop: interval-based with pause on hover
  useEffect(() => {
    if (reduce) return;

    if (isMobile) {
      // Mobile: continuous marquee - no interval, no pause
      // The animation is handled purely by CSS on the track element
      return;
    } else {
      // Desktop: interval-based with pause on hover
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        setPageIndex((p) => (p + 1) % totalPages);
      }, 5000);
      return () => {
        if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      };
    }
  }, [reduce, isMobile, totalPages]);

  const handlePrev = () => {
    setPageIndex((p) => (p - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setPageIndex((p) => (p + 1) % totalPages);
  };

  const handleDot = (i: number) => {
    setPageIndex(i);
  };

  // Touch/Swipe handlers - only for desktop
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) return;
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isMobile) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    setDragOffset(deltaX);
  };

  const handleTouchEnd = () => {
    if (!isDragging || isMobile) return;
    setIsDragging(false);
    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < 0) handleNext();
      else handlePrev();
    }
    setDragOffset(0);
    setDragStartX(0);
  };

  // Mouse drag for desktop only
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isMobile) return;
    const deltaX = e.clientX - dragStartX;
    setDragOffset(deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging || isMobile) return;
    setIsDragging(false);
    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < 0) handleNext();
      else handlePrev();
    }
    setDragOffset(0);
    setDragStartX(0);
  };

  // Calculate translateX for desktop (with drag offset)
  const baseTranslate = `calc(-${pageIndex * (100 / itemsPerPage)}% - ${pageIndex * (16 / itemsPerPage)}px)`;
  const finalTranslate = isMobile ? undefined : (isDragging ? `${baseTranslate} + ${dragOffset}px` : baseTranslate);

  // For mobile: we use CSS animation on a duplicated track for seamless infinite marquee
  // We need 2x the cards for seamless loop

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

        <div className="relative">
          {/* Desktop nav buttons */}
          {!isMobile && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Testimoni sebelumnya"
                className={cn(
                  "absolute top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-[0_4px_14px_rgba(15,76,117,0.35)] transition-all duration-300 hover:bg-accent-hover hover:scale-105 hover:shadow-[0_8px_24px_rgba(15,76,117,0.45)] hidden md:flex",
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
                  "absolute top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-[0_4px_14px_rgba(15,76,117,0.35)] transition-all duration-300 hover:bg-accent-hover hover:scale-105 hover:shadow-[0_8px_24px_rgba(15,76,117,0.45)] hidden md:flex",
                  isDragging && "opacity-50 pointer-events-none"
                )}
                style={{ right: itemsPerPage > 1 ? "-52px" : undefined }}
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </>
          )}

          <div
            ref={trackRef}
            className={cn("overflow-hidden", isMobile && "relative")}
            onTouchStart={isMobile ? undefined : handleTouchStart}
            onTouchMove={isMobile ? undefined : handleTouchMove}
            onTouchEnd={isMobile ? undefined : handleTouchEnd}
            onMouseDown={isMobile ? undefined : handleMouseDown}
            onMouseMove={isMobile ? undefined : handleMouseMove}
            onMouseUp={isMobile ? undefined : handleMouseUp}
            onMouseLeave={isMobile ? undefined : handleMouseUp}
          >
            {isMobile ? (
              // Mobile: CSS Marquee - duplicate cards for seamless infinite loop
              <div
                className="flex"
                style={{
                  animation: "marquee 40s linear infinite",
                  width: "max-content",
                }}
              >
                {/* First set */}
                {testimonials.map((t, i) => (
                  <div
                    key={`first-${t.id}`}
                    className="shrink-0 px-2"
                    style={{ width: "100%" }}
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
                {/* Second set (duplicate) for seamless loop */}
                {testimonials.map((t, i) => (
                  <div
                    key={`second-${t.id}`}
                    className="shrink-0 px-2"
                    style={{ width: "100%" }}
                  >
                    <TestimonialCard
                      name={t.name}
                      role={t.role}
                      quote={t.quote}
                      rating={t.rating}
                      index={i + testimonials.length}
                    />
                  </div>
                ))}
              </div>
            ) : (
              // Desktop: discrete sliding with interval
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
            )}
          </div>

          {/* Pagination dots - desktop only */}
          {!isMobile && (
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
          )}
        </div>

        {/* Mobile marquee keyframes injected */}
        {isMobile && (
          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        )}
      </div>
    </section>
  );
}