"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { LayoutGrid, Rows3, MapPin, Search } from "lucide-react";
import PackageCards from "@/components/PackageCards";
import type { TravelPackage } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useLocale, useT, format } from "@/lib/i18n/client";

const EASE = [0.4, 0, 0.2, 1] as const;

type Region = "Semua" | "Jawa" | "Luar Jawa";
type ViewMode = "grid" | "single";

const JAWA = ["Bandung", "Ciwidey", "Lembang", "Garut", "Jakarta", "Yogyakarta", "Semarang", "Bromo"];

type Props = {
  packages: TravelPackage[];
};

export default function PaketListClient({ packages }: Props) {
  const reduce = useReducedMotion();
  const locale = useLocale();
  const t = useT();
  const isEn = locale === "en";
  const [active, setActive] = useState<Region>("Semua");
  const [query, setQuery] = useState("");
  const [manualView, setManualView] = useState<ViewMode | null>(null);

  const viewMode: ViewMode = manualView ?? (active === "Semua" ? "grid" : "single");

  const REGIONS: Array<{ id: Region; label: string }> = [
    { id: "Semua", label: isEn ? "All" : "Semua" },
    { id: "Jawa", label: isEn ? "Java" : "Jawa" },
    { id: "Luar Jawa", label: isEn ? "Outside Java" : "Luar Jawa" },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return packages.filter((p) => {
      const matchRegion =
        active === "Semua" ||
        (active === "Jawa" && JAWA.includes(p.destination)) ||
        (active === "Luar Jawa" && !JAWA.includes(p.destination));
      const matchQuery =
        !q ||
        p.destination.toLowerCase().includes(q) ||
        p.duration.toLowerCase().includes(q);
      return matchRegion && matchQuery;
    });
  }, [packages, active, query]);

  return (
    <div>
      <div className="mb-8 rounded-[20px] border border-line bg-white p-4 shadow-card sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <span className="hidden items-center gap-1.5 pr-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted sm:flex">
              <MapPin size={13} aria-hidden="true" />
              {t.list.filterArea}
            </span>
            {REGIONS.map((r) => {
              const isActive = r.id === active;
              const count =
                r.id === "Semua"
                  ? packages.length
                  : r.id === "Jawa"
                    ? packages.filter((p) => JAWA.includes(p.destination)).length
                    : packages.filter((p) => !JAWA.includes(p.destination)).length;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setActive(r.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-[12px] font-extrabold transition-all duration-300",
                    isActive
                      ? "border-accent bg-accent text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.55)]"
                      : "border-line bg-white text-body-text hover:border-accent/50 hover:text-accent",
                  )}
                >
                  {r.label}
                  <span
                    className={cn(
                      "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                      isActive ? "bg-white/20 text-white" : "bg-surface text-muted",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex w-full items-center gap-2 lg:w-auto">
            <div className="flex items-center rounded-full border border-line bg-white p-0.5">
              <button
                type="button"
                onClick={() => setManualView("grid")}
                aria-pressed={viewMode === "grid"}
                title={t.list.viewMany}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                  viewMode === "grid"
                    ? "bg-accent text-white"
                    : "text-muted hover:text-accent",
                )}
              >
                <LayoutGrid size={14} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setManualView("single")}
                aria-pressed={viewMode === "single"}
                title={t.list.viewSingle}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                  viewMode === "single"
                    ? "bg-accent text-white"
                    : "text-muted hover:text-accent",
                )}
              >
                <Rows3 size={14} aria-hidden="true" />
              </button>
            </div>

            <label className="relative flex w-full items-center lg:w-72">
              <Search
                size={14}
                className="absolute left-3.5 text-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.list.searchPackagePlaceholder}
                className="w-full rounded-full border border-line bg-white py-2.5 pl-9 pr-3 text-[13px] font-bold text-body-text outline-none transition-all placeholder:font-normal placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </label>
          </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div
            key={`${active}-${viewMode}-${query}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <PackageCards packages={filtered} forceMode={viewMode} />
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="rounded-2xl border border-dashed border-line bg-white p-12 text-center"
          >
            <p className="text-base font-extrabold text-heading">
              {t.list.emptyPackageTitle}
            </p>
            <p className="mt-1 text-sm text-muted">
              {t.list.emptyPackageDesc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-6 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
        {format(t.list.showingPackage, { shown: String(filtered.length), total: String(packages.length) })}
      </p>
    </div>
  );
}
