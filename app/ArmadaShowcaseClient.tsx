"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import VehicleCards from "@/components/VehicleCards";
import { type Vehicle, type VehicleCategory } from "@/lib/types";
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

const FEATURED_SLUGS = [
  "toyota-avanza",
  "toyota-innova-reborn",
  "toyota-hiace-premio",
  "toyota-alphard",
];

type Props = {
  vehicles: Vehicle[];
};

export default function ArmadaShowcaseClient({ vehicles }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Filter>("Semua");

  const featured = useMemo(
    () => vehicles.filter((v) => FEATURED_SLUGS.includes(v.slug)),
    [vehicles],
  );

  const filtered = useMemo(() => {
    if (active === "Semua") return featured;
    return featured.filter((v) => v.category === active);
  }, [featured, active]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => {
          const isActive = c.id === active;
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
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={active}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <VehicleCards vehicles={filtered} />
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 text-center">
        <Link
          href="/armada"
          className="inline-flex items-center gap-2 rounded-full border-2 border-line bg-white px-5 py-2.5 text-sm font-extrabold text-heading transition-all hover:border-accent hover:text-accent"
        >
          Lihat Semua {vehicles.length} Unit
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
