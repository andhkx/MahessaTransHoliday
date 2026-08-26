"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { cn } from "@/lib/cn";
import { formatShort } from "@/lib/format";
import useSnapActive from "./useSnapActive";

const EASE = [0.4, 0, 0.2, 1] as const;

export function vehiclePrice(vehicle: Vehicle): {
  price: string | null;
  note: string;
} {
  const lease24 = vehicle.pricing.leaseKey["24h"];
  if (lease24) return { price: formatShort(lease24), note: "/ 24 jam lepas kunci" };
  const driver = vehicle.pricing.withDriver.startingPrice;
  if (driver) return { price: formatShort(driver), note: "charter + driver" };
  return { price: null, note: "Hubungi untuk harga" };
}

type VehicleCardsProps = {
  vehicles: Vehicle[];
};

export default function VehicleCards({ vehicles }: VehicleCardsProps) {
  const reduce = useReducedMotion();
  const [rowRef, activeIdx] = useSnapActive();

  return (
    <div
      ref={rowRef}
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-none sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3 xl:grid-cols-5"
    >
      {vehicles.map((vehicle, i) => {
        const { price, note } = vehiclePrice(vehicle);
        return (
          <motion.div
            key={vehicle.id}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
            className={cn(
              "w-[240px] shrink-0 snap-start transition-transform duration-300 ease-out will-change-transform sm:w-auto",
              i === activeIdx ? "scale-100" : "scale-[0.93]",
            )}
          >
            <Link
              href={`/armada/${vehicle.slug}`}
              aria-label={`Lihat detail ${vehicle.name}`}
              className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-elevated"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                <Image
                  src={vehicle.image}
                  alt={`${vehicle.name} — rental Mahessa Trans Holiday`}
                  fill
                  sizes="(max-width: 640px) 60vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                {vehicle.badge && (
                  <span className="absolute left-2.5 top-2.5 rounded-full border border-line bg-white/85 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-accent backdrop-blur-md">
                    {vehicle.badge}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-bold leading-snug text-heading transition-colors duration-300 group-hover:text-accent md:text-[15px]">
                  {vehicle.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                  {vehicle.transmission} · {vehicle.fuelType} · {vehicle.capacity} Seat
                </p>

                <div className="mt-3 flex items-end justify-between gap-2 border-t border-line pt-3">
                  <div>
                    {price ? (
                      <>
                        <p className="text-sm font-extrabold tracking-tight text-accent">
                          {price}
                        </p>
                        <p className="text-[10px] font-semibold text-muted">{note}</p>
                      </>
                    ) : (
                      <p className="text-xs font-bold text-muted">{note}</p>
                    )}
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                  >
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
