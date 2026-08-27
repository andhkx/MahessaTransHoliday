"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Search, SlidersHorizontal } from "lucide-react";
import VehicleCards from "@/components/VehicleCards";
import type { Vehicle, VehicleCategory } from "@/lib/types";
import { cn } from "@/lib/cn";

const EASE = [0.4, 0, 0.2, 1] as const;

type Filter = "Semua" | VehicleCategory;

const CATEGORIES: Array<{ id: Filter; label: string }> = [
  { id: "Semua", label: "Semua" },
  { id: "entry", label: "City Car" },
  { id: "midrange", label: "MPV" },
  { id: "premium", label: "SUV" },
  { id: "luxury", label: "Luxury" },
  { id: "group", label: "Group" },
];

type Props = {
  vehicles: Vehicle[];
};

export default function ArmadaListClient({ vehicles }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Filter>("Semua");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vehicles.filter((v) => {
      const matchCat = active === "Semua" || v.category === active;
      const matchQuery =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.transmission.toLowerCase().includes(q) ||
        v.fuelType.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [vehicles, active, query]);

  return (
    <div>
      <div className="mb-8 rounded-[20px] border border-line bg-white p-4 shadow-card sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <span className="hidden items-center gap-1.5 pr-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted sm:flex">
              <SlidersHorizontal size={13} aria-hidden="true" />
              Tipe
            </span>
            {CATEGORIES.map((c) => {
              const isActive = c.id === active;
              const count =
                c.id === "Semua"
                  ? vehicles.length
                  : vehicles.filter((v) => v.category === c.id).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(c.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-[12px] font-extrabold transition-all duration-300",
                    isActive
                      ? "border-accent bg-accent text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.55)]"
                      : "border-line bg-white text-body-text hover:border-accent/50 hover:text-accent",
                  )}
                >
                  {c.label}
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
              placeholder="Cari unit (Avanza, Innova...)"
              className="w-full rounded-full border border-line bg-white py-2.5 pl-9 pr-3 text-[13px] font-bold text-body-text outline-none transition-all placeholder:font-normal placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </label>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div
            key={`${active}-${query}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <VehicleCards vehicles={filtered} />
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
              Tidak ada unit yang cocok.
            </p>
            <p className="mt-1 text-sm text-muted">
              Coba ubah filter atau kata kunci pencarianmu.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-6 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
        Menampilkan {filtered.length} dari {vehicles.length} unit
      </p>
    </div>
  );
}
