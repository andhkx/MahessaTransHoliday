"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Search } from "lucide-react";
import { galleryImages, galleryCategories, type GalleryImage } from "@/lib/gallery";
import { cn } from "@/lib/cn";

const EASE = [0.4, 0, 0.2, 1] as const;

function PageHeaderClient({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-surface to-background pb-12 pt-32 md:pb-16 md:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-accent/[0.08] blur-3xl"
      />
      <div className="container-site relative">
        <span className="mb-3 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
          Galeri
        </span>
        <h1 className="mb-3 max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading md:text-[44px]">
          {title}
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-body-text md:text-base">
          {subtitle}
        </p>
      </div>
    </header>
  );
}

function aspectFor(idx: number) {
  if (idx === 0) return "aspect-[16/10]";
  const set = ["aspect-square", "aspect-[3/4]", "aspect-[4/3]", "aspect-[4/5]"];
  return set[idx % set.length];
}

export default function GaleriPageClient() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<(typeof galleryCategories)[number]>("Semua");

  const visible = useMemo(
    () =>
      active === "Semua"
        ? galleryImages
        : galleryImages.filter((img) => img.category === active),
    [active],
  );

  return (
    <>
      <PageHeaderClient
        title="Cerita perjalanan bersama Mahessa"
        subtitle="Dokumentasi nyata perjalanan para penumpang kami — dari city tour singkat hingga perjalanan luar kota."
      />

      <section className="pb-16 md:pb-24">
        <div className="container-site">
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="mr-2 hidden items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-muted sm:flex">
              <Search size={13} aria-hidden="true" />
              Filter
            </span>
            {galleryCategories.map((cat) => {
              const isActive = cat === active;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-[12px] font-extrabold transition-all duration-300",
                    isActive
                      ? "border-accent bg-accent text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.55)]"
                      : "border-line bg-white text-body-text hover:border-accent/50 hover:text-accent",
                  )}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="columns-1 gap-4 sm:columns-2 lg:columns-3"
            >
              {visible.map((img, i) => (
                <motion.figure
                  key={img.src}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
                  className={cn(
                    "group relative mb-4 break-inside-avoid overflow-hidden rounded-[18px] border border-line bg-white shadow-card",
                    aspectFor(i),
                  )}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={800}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-heading/80 via-heading/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                      {img.category}
                    </p>
                    <p className="text-base font-extrabold tracking-tight">
                      {img.title}
                    </p>
                  </figcaption>
                  <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/30 bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-accent opacity-100 transition-opacity duration-500 group-hover:opacity-0">
                    {img.category}
                  </span>
                </motion.figure>
              ))}
            </motion.div>
          </AnimatePresence>

          {visible.length === 0 && (
            <p className="rounded-2xl border border-dashed border-line bg-white p-12 text-center text-sm text-muted">
              Belum ada dokumentasi untuk kategori ini.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
