"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, FileText, Eye, Calendar } from "lucide-react";
import type { Article } from "@/lib/data/supabase/articles";
import { cn } from "@/lib/cn";
import useSnapActive from "./useSnapActive";

const EASE = [0.4, 0, 0.2, 1] as const;

type ArticleCardsProps = {
  articles: Article[];
  forceMode?: "grid" | "single";
};

export default function ArticleCards({ articles, forceMode = "single" }: ArticleCardsProps) {
  const reduce = useReducedMotion();
  const [rowRef, activeIdx] = useSnapActive();
  const useCarousel = forceMode === "single";

  if (articles.length === 0) return null;

  return (
    <div className="relative md:mx-0">
      <div
        ref={rowRef}
        className={cn(
          useCarousel
            ? "flex snap-x snap-mandatory snap-center gap-3 overflow-x-auto px-[calc(50vw-130px)] pb-4 scrollbar-none md:snap-align-none md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4"
            : "grid grid-cols-2 gap-3 px-0 sm:gap-4 md:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {articles.map((a, i) => (
          <motion.div
            key={a.id}
            initial={reduce || useCarousel ? false : { opacity: 0, y: 24 }}
            whileInView={reduce || useCarousel ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
            className={cn(
              "shrink-0 transition-all duration-300 ease-out will-change-transform",
              useCarousel
                ? "w-[260px] snap-center md:snap-align-start md:w-auto"
                : "w-auto",
              useCarousel && i !== activeIdx
                ? "scale-[0.88] opacity-60"
                : "scale-100 opacity-100",
            )}
          >
            <Link
              href={`/artikel/${a.slug}`}
              aria-label={`Baca artikel: ${a.title}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-elevated"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                {a.cover_image_url ? (
                  <Image
                    src={a.cover_image_url}
                    alt={a.title}
                    fill
                    sizes="(max-width: 640px) 65vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted">
                    <FileText size={32} />
                  </div>
                )}
                {a.category && (
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-card">
                    {a.category}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-bold leading-snug text-heading transition-colors duration-300 group-hover:text-accent md:text-lg line-clamp-2">
                  {a.title}
                </h3>
                {a.excerpt && (
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                    {a.excerpt}
                  </p>
                )}

                <div className="mt-auto flex items-end justify-between gap-2 border-t border-line pt-3">
                  <div className="flex flex-col gap-0.5 text-[10px] font-semibold text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} aria-hidden="true" />
                      {a.published_at
                        ? new Date(a.published_at).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={10} aria-hidden="true" />
                      {a.view_count} views
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                  >
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      {useCarousel && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:hidden"
        />
      )}
    </div>
  );
}
