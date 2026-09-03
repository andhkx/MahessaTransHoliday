"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import VehicleCards from "@/components/VehicleCards";
import type { Vehicle } from "@/lib/types";

type Props = {
  vehicles: Vehicle[];
};

export default function ArmadaShowcaseClient({ vehicles }: Props) {
  return (
    <div>
      <VehicleCards vehicles={vehicles} forceMode="single" />

      <div className="mt-10 text-center">
        <Link
          href="/armada"
          className="inline-flex items-center gap-2 rounded-full border-2 border-line bg-white px-5 py-2.5 text-sm font-extrabold text-heading transition-all hover:border-accent hover:text-accent"
        >
          Lihat Semua {vehicles.length}+ Unit
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}