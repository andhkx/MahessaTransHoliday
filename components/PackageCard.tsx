import Image from "next/image";
import Link from "next/link";
import type { TravelPackage } from "@/lib/types";
import { cn } from "@/lib/cn";
import { formatIDR } from "@/lib/format";

type PackageCardProps = {
  packageItem: TravelPackage;
  className?: string;
};

export default function PackageCard({ packageItem, className }: PackageCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg",
        className,
      )}
    >
      <Image
        src={packageItem.image}
        alt={`Paket Hiace ${packageItem.destination}`}
        width={640}
        height={420}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="aspect-[16/10] w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-extrabold text-primary">
          {packageItem.destination}
        </h3>
        <span className="mt-2 w-fit rounded-full bg-mist px-3 py-1 text-xs font-bold text-gray-600">
          {packageItem.duration}
        </span>
        <p className="mt-3 text-base font-extrabold text-ink">
          Mulai{" "}
          <span className="text-accent">{formatIDR(packageItem.price)}</span>
        </p>
        <Link
          href={`/paket/${packageItem.slug}`}
          className="mt-4 inline-flex items-center justify-center rounded-full border-2 border-primary px-5 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}
