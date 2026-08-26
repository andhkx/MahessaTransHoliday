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
      className={cn("card card-lift group overflow-hidden", className)}
    >
      <Image
        src={packageItem.image}
        alt={`Paket Hiace ${packageItem.destination}`}
        width={640}
        height={420}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="h-[180px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <div className="p-4 md:p-5">
        <h3 className="text-h5 font-bold text-black">{packageItem.destination}</h3>
        <span className="mt-2 inline-block rounded-md bg-surface px-3 py-1 text-caption font-medium uppercase text-body-text">
          {packageItem.duration}
        </span>
        <p className="mb-3 mt-3 text-xl font-bold text-accent md:text-[22px]">
          Mulai {formatIDR(packageItem.price)}
        </p>
        <Link
          href={`/paket/${packageItem.slug}`}
          className="btn btn-secondary btn-sm w-full"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}
