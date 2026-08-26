"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Vehicle } from "@/lib/types";
import { cn } from "@/lib/cn";
import { formatIDR } from "@/lib/format";
import useSnapActive from "./useSnapActive";

const EASE = [0.4, 0, 0.2, 1] as const;

export function vehiclePriceLine(vehicle: Vehicle): string {
  const lease24 = vehicle.pricing.leaseKey["24h"];
  if (lease24) return `Mulai ${formatIDR(lease24)} / 24 jam`;
  const driver = vehicle.pricing.withDriver.startingPrice;
  if (driver) return `Charter mulai ${formatIDR(driver)}`;
  return "Hubungi untuk harga";
}

type VehicleCardProps = {
  vehicles: Vehicle[];
};

export default function VehicleCards({ vehicles }: VehicleCardProps) {
  const reduce = useReducedMotion();
  const [rowRef, activeIdx] = useSnapActive();

  return (
    <div
      ref={rowRef}
      className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scrollbar-none md:grid md:grid-cols-3 md:overflow-visible md:pb-0 xl:grid-cols-5"
    >
      {vehicles.map((vehicle, i) => (
        <motion.div
          key={vehicle.id}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
          className={cn(
            "w-[84vw] max-w-[360px] shrink-0 snap-start origin-left transition-transform duration-300 ease-out will-change-transform md:w-auto md:scale-100",
            i === activeIdx ? "scale-100" : "scale-[0.92]",
          )}
        >
          <Link
            href={`/armada/${vehicle.slug}`}
            aria-label={`Lihat detail ${vehicle.name}`}
            className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_44px_-14px_rgba(83,189,235,0.35)]"
          >
            <div className="relative aspect-video overflow-hidden bg-wa-surface">
              <Image
                src={vehicle.image}
                alt={`${vehicle.name} â€” rental Mahessa Trans Holiday`}
                fill
                sizes="(max-width: 767px) 84vw, (max-width: 1280px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
              {vehicle.badge && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-2.5 py-1 text-[10px] font-bold text-heading backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {vehicle.badge}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-extrabold leading-tight text-heading transition-colors duration-300 group-hover:text-accent-hover md:text-xl">
                  {vehicle.name}
                </h3>
                <span className="shrink-0 font-mono text-[11px] text-muted">
                  {vehicle.capacity} seat
                </span>
              </div>
              <p className="text-sm leading-relaxed text-body-text">
                {vehicle.transmission} Â· {vehicle.fuelType}
              </p>
              <p className="mt-auto text-base font-extrabold tracking-tight text-primary">
                {vehiclePriceLine(vehicle)}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
