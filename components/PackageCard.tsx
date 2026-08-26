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
  const highlights = packageItem.included.slice(0, 4);
  return (
    <article
      className={cn(
        "card card-lift relative flex h-full flex-col overflow-hidden",
        className,
      )}
    >
      <div className="relative h-36 bg-wa-surface">
        <Image
          src={packageItem.image}
          alt={`Paket Hiace ${packageItem.destination}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      {packageItem.badge && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1.5 text-[11px] font-extrabold text-white shadow-card">
          {packageItem.badge}
        </span>
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">
          Hiace · {packageItem.duration}
        </p>
        <h3 className="mt-1 text-xl font-extrabold tracking-[-0.4px] text-accent">
          Paket {packageItem.destination}
        </h3>
        <p className="mt-2 text-[22px] font-extrabold tracking-[-0.5px] text-primary">
          {formatIDR(packageItem.price)}
        </p>
        <ul className="mt-4 flex-1 space-y-1.5">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs font-semibold leading-relaxed text-body-text"
            >
              <span className="mt-0.5 text-primary" aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <Link
          href={`/paket/${packageItem.slug}`}
          className="btn btn-secondary btn-sm mt-5 w-full"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}
