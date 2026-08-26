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
    <article className={cn("card card-lift group overflow-hidden", className)}>
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
          className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] md:h-[220px]"
        />
        <div className="p-4 md:p-5">
          <h3 className="mb-2 text-lg font-semibold text-black transition-colors duration-200 group-hover:text-primary">
            {vehicle.name}
          </h3>
          <p className="mb-3 flex items-center gap-2 text-[13px] text-body-text">
            <span>{vehicle.transmission}</span>
            <span aria-hidden="true" className="text-line">
              |
            </span>
            <span>{vehicle.capacity} seats</span>
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4 md:px-5 md:pb-5">
        <p className="mb-3 text-xl font-bold text-accent md:text-[22px]">
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
