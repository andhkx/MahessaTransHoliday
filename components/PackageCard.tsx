import Image from "next/image";
import Link from "next/link";
import type { TravelPackage } from "@/lib/types";
import { cn } from "@/lib/cn";
import { formatIDR } from "@/lib/format";

type PackageCardProps = {
  packageItem: TravelPackage;
  className?: string;
};

export default function PackageCard({
  packageItem,
  className,
}: PackageCardProps) {
  return (
    <article
      className={cn("card card-lift group relative overflow-hidden", className)}
    >
      <Link
        href={`/paket/${packageItem.slug}`}
        aria-label={`Lihat detail paket ${packageItem.destination}`}
        className="block relative h-[220px] bg-line md:h-[220px]"
      >
        <Image
          src={packageItem.image}
          alt={`Paket Hiace ${packageItem.destination}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        {packageItem.badge && (
          <span className="badge-pill">{packageItem.badge}</span>
        )}
      </Link>
      <div className="p-5 md:p-6">
        <h3 className="text-[22px] font-bold text-navy">
          Hiace {packageItem.destination}
        </h3>
        <p className="mt-2.5 mb-4 flex items-center gap-3 text-sm font-medium text-muted">
          <span>{packageItem.duration}</span>
          <span aria-hidden="true" className="text-line">·</span>
          <span>All-in</span>
        </p>
        <p className="mb-4 text-2xl font-bold text-primary md:text-[26px]">
          Mulai {formatIDR(packageItem.price)}
        </p>
        <Link
          href={`/paket/${packageItem.slug}`}
          className="btn btn-secondary btn-card w-full !border-2 !py-[12px]"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}
