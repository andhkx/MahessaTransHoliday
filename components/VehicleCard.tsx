import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { cn } from "@/lib/cn";
import { formatIDR } from "@/lib/format";
import { waVehicleLink } from "@/lib/whatsapp";

type VehicleCardProps = {
  vehicle: Vehicle;
  className?: string;
};

export function vehiclePriceLine(vehicle: Vehicle): string {
  const lease24 = vehicle.pricing.leaseKey["24h"];
  if (lease24) return `Mulai ${formatIDR(lease24)} / 24 jam`;
  const driver = vehicle.pricing.withDriver.startingPrice;
  if (driver) return `Charter mulai ${formatIDR(driver)}`;
  return "Hubungi untuk harga";
}

export default function VehicleCard({ vehicle, className }: VehicleCardProps) {
  return (
    <article className={cn("card card-lift group relative overflow-hidden", className)}>
      <Link
        href={`/armada/${vehicle.slug}`}
        className="block"
        aria-label={`Lihat detail ${vehicle.name}`}
      >
        <div className="relative h-48 bg-wa-surface md:h-52">
          <Image
            src={vehicle.image}
            alt={`${vehicle.name} — rental Mahessa Trans Holiday`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        {vehicle.badge && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-accent px-3 py-1.5 text-[11px] font-extrabold text-white">
            {vehicle.badge}
          </span>
        )}
      </Link>
      <div className="p-5">
        <h3 className="text-base font-extrabold tracking-[-0.3px] text-accent">
          <Link
            href={`/armada/${vehicle.slug}`}
            className="transition-colors duration-150 hover:text-primary"
          >
            {vehicle.name}
          </Link>
        </h3>
        <p className="mt-1.5 mb-3 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-bold tracking-[-0.2px] text-body-text">
          <span>{vehicle.capacity} seats</span>
          <span aria-hidden="true" className="text-line">·</span>
          <span>{vehicle.transmission}</span>
          <span aria-hidden="true" className="text-line">·</span>
          <span>{vehicle.fuelType}</span>
        </p>
        <p className="mb-4 text-lg font-extrabold tracking-[-0.4px] text-primary">
          {vehiclePriceLine(vehicle)}
        </p>
        <a
          href={waVehicleLink(vehicle.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm w-full"
        >
          Tanya via WhatsApp
        </a>
      </div>
    </article>
  );
}
