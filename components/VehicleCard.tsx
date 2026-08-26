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
        "flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg group",
        className,
      )}
    >
      <Link
        href={`/armada/${vehicle.slug}`}
        className="block"
        aria-label={`Lihat detail ${vehicle.name}`}
      >
        <Image
          src={vehicle.image}
          alt={`${vehicle.name} — rental Mahessa Trans Holiday`}
          width={640}
          height={420}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="aspect-[16/10] w-full object-cover"
        />
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold text-ink group-hover:text-primary">
            {vehicle.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {vehicle.transmission} | {vehicle.capacity} seats
          </p>
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="mt-1">
          <p className="text-base font-extrabold text-primary">
            {vehiclePriceLine(vehicle)}
          </p>
          <p className="mt-0.5 text-xs font-semibold text-gray-400">
            Lepas Kunci · + Driver
          </p>
        </div>
        <a
          href={waVehicleLink(vehicle.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-dark"
        >
          Tanya via WhatsApp
        </a>
      </div>
    </article>
  );
}
