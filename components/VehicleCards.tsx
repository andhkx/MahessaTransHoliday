"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Fuel, Settings2, Users } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { cn } from "@/lib/cn";
import { formatCompact } from "@/lib/format";
import useSnapActive from "./useSnapActive";

const EASE = [0.4, 0, 0.2, 1] as const;

type VehicleCardsProps = {
  vehicles: Vehicle[];
  showYearPill?: boolean;
  forceMode?: "grid" | "single";
  selectedId?: string | null;
  onSelect?: (vehicle: Vehicle) => void;
};

export function vehiclePriceLabel(vehicle: Vehicle): string {
  return vehicle.pricing.startingPrice
    ? formatCompact(vehicle.pricing.startingPrice)
    : "Hubungi Kami";
}

export default function VehicleCards({
  vehicles,
  showYearPill = true,
  forceMode,
  selectedId,
  onSelect,
}: VehicleCardsProps) {
  const reduce = useReducedMotion();
  const [rowRef, activeIdx] = useSnapActive();

  // Default: grid 2-col on mobile (kayak desktop biar keliatan banyak kecil-kecil).
  // forceMode="single" → carousel 1-satu.
  const useCarousel = forceMode === "single";
  const selectable = !!onSelect;

  return (
    <div className="relative md:mx-0">
      <div
        ref={rowRef}
        className={cn(
          useCarousel
            ? "flex snap-x snap-mandatory snap-center gap-3 overflow-x-auto px-[calc(50vw-130px)] pb-4 scrollbar-none md:snap-align-none md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-3 xl:grid-cols-4"
            : "grid grid-cols-2 gap-3 px-0 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        )}
      >
      {vehicles.map((vehicle, i) => {
        const price = vehiclePriceLabel(vehicle);
        return (
          <motion.div
            key={vehicle.id}
            initial={reduce || selectable || useCarousel ? false : { opacity: 0, y: 24 }}
            whileInView={reduce || selectable || useCarousel ? undefined : { opacity: 1, y: 0 }}
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
            <Wrapper
              selectable={selectable}
              selected={selectable && selectedId === vehicle.id}
              vehicle={vehicle}
              onSelect={onSelect}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                <Image
                  src={vehicle.image}
                  alt={`${vehicle.name} — rental Mahessa Trans Holiday`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 60vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-heading/35 via-transparent to-transparent" />
                {showYearPill && (
                  <span className="absolute right-3 top-3 rounded-full border border-white/40 bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-accent shadow-card backdrop-blur">
                    {new Date().getFullYear()}
                  </span>
                )}
                {vehicle.badge && (
                  <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-accent/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-card backdrop-blur">
                    {vehicle.badge}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-extrabold leading-snug text-heading transition-colors duration-300 group-hover:text-accent">
                    {vehicle.name}
                  </h3>
                </div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  {categoryLabel(vehicle.category)}
                </p>

                <ul className="mb-5 grid grid-cols-3 gap-2 border-y border-line py-3">
                  <Spec Icon={Users} label={`${vehicle.capacity} Kursi`} />
                  <Spec Icon={Settings2} label={vehicle.transmission} />
                  <Spec Icon={Fuel} label={vehicle.fuelType} />
                </ul>

                <div className="mt-auto flex items-end justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                      Sewa Harian
                    </p>
                    <p className="text-[18px] font-extrabold tracking-tight text-accent">
                      {price}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_18px_-8px_rgba(0,86,145,0.6)] transition-transform duration-300 group-hover:scale-110"
                  >
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
            </Wrapper>
          </motion.div>
        );
      })}
      </div>
      {useCarousel && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:hidden"
        />
      )}
    </div>
  );
}

function categoryLabel(category: Vehicle["category"]): string {
  switch (category) {
    case "entry":
      return "City Car";
    case "midrange":
      return "MPV";
    case "premium":
      return "SUV & Premium";
    case "luxury":
      return "Luxury";
    case "group":
      return "Bus & Van";
  }
}

function Spec({ Icon, label }: { Icon: React.ComponentType<{ size?: number; className?: string }>; label: string }) {
  return (
    <li className="flex flex-col items-center gap-1 text-center">
      <Icon size={14} className="text-accent" aria-hidden="true" />
      <span className="text-[10px] font-bold uppercase tracking-wide text-body-text">
        {label}
      </span>
    </li>
  );
}

function Wrapper({
  selectable,
  selected,
  vehicle,
  onSelect,
  children,
}: {
  selectable: boolean;
  selected: boolean;
  vehicle: Vehicle;
  onSelect?: (v: Vehicle) => void;
  children: React.ReactNode;
}) {
  const baseCard =
    "group flex h-full flex-col overflow-hidden rounded-[20px] border bg-white shadow-card transition-all duration-300";
  if (selectable) {
    return (
      <button
        type="button"
        onClick={() => onSelect?.(vehicle)}
        aria-pressed={selected}
        aria-label={`Pilih ${vehicle.name}`}
        className={cn(
          baseCard,
          "text-left w-full",
          selected
            ? "border-accent ring-2 ring-accent/40 shadow-elevated"
            : "border-line hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-elevated"
        )}
      >
        {children}
        {selected && (
          <span className="absolute right-3 bottom-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white shadow-card">
            <Check size={14} strokeWidth={3} />
          </span>
        )}
      </button>
    );
  }
  return (
    <Link
      href={`/armada/${vehicle.slug}`}
      aria-label={`Lihat detail ${vehicle.name}`}
      className={cn(
        baseCard,
        "border-line hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-elevated"
      )}
    >
      {children}
    </Link>
  );
}
