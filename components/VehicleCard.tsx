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
    <article
      className={cn(
        "card card-lift group relative overflow-hidden",
        className,
      )}
    >
      <Link
        href={`/armada/${vehicle.slug}`}
        className="block"
        aria-label={`Lihat detail ${vehicle.name}`}
      >
        <div className="relative h-[220px] bg-line md:h-[240px]">
          <Image
            src={vehicle.image}
            alt={`${vehicle.name} — rental Mahessa Trans Holiday`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </div>
        {vehicle.badge && <span className="badge-pill">{vehicle.badge}</span>}
      </Link>
      <div className="p-5 md:p-6">
        <h3 className="text-[22px] font-bold leading-snug text-navy">
          <Link
            href={`/armada/${vehicle.slug}`}
            className="transition-colors duration-300 hover:text-primary"
          >
            {vehicle.name}
          </Link>
        </h3>
        <p className="mt-2.5 mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-muted">
          <span>{vehicle.capacity} seats</span>
          <span aria-hidden="true" className="text-line">·</span>
          <span>{vehicle.transmission}</span>
          <span aria-hidden="true" className="text-line">·</span>
          <span>{vehicle.fuelType}</span>
        </p>
        <p className="mb-4 text-2xl font-bold text-primary md:text-[26px]">
          {vehiclePriceLine(vehicle)}
        </p>
        <a
          href={waVehicleLink(vehicle.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-card w-full transition-transform duration-200 hover:scale-[1.02]"
        >
          Tanya via WhatsApp
        </a>
      </div>
    </article>
  );
}
