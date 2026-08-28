import type { JourneyType } from "@/data/finder";
import { journeyKeywords } from "@/data/finder";
import { vehicles } from "@/data/vehicles";
import { packages } from "@/data/packages";
import type { Vehicle, TravelPackage } from "@/lib/types";

export type FinderResult = {
  vehicle: Vehicle | null;
  package: TravelPackage | null;
  whatsappMessage: string;
};

function vehicleMatchesJourney(v: Vehicle, jt: JourneyType): boolean {
  const kws = journeyKeywords[jt];
  return v.suitableFor.some((sf) =>
    kws.some((k) => sf.toLowerCase().includes(k)),
  );
}

function packageMatchesJourney(p: TravelPackage, jt: JourneyType): boolean {
  const kws = journeyKeywords[jt];
  return p.suitableFor.some((sf) =>
    kws.some((k) => sf.toLowerCase().includes(k)),
  );
}

function findBestVehicle(
  people: number,
  budget: number,
  jt: JourneyType,
): Vehicle | null {
  const candidates = vehicles.filter(
    (v) => v.capacity >= people && vehicleMatchesJourney(v, jt),
  );

  if (candidates.length === 0) {
    const fallback = vehicles.filter((v) => v.capacity >= people);
    if (fallback.length > 0) {
      return fallback.sort((a, b) => {
        const ap = a.pricing.startingPrice ?? Infinity;
        const bp = b.pricing.startingPrice ?? Infinity;
        const distA = Math.abs(ap - budget);
        const distB = Math.abs(bp - budget);
        return distA - distB;
      })[0];
    }
    return null;
  }

  return candidates.sort((a, b) => {
    const ap = a.pricing.startingPrice ?? Infinity;
    const bp = b.pricing.startingPrice ?? Infinity;
    const distA = Math.abs(ap - budget);
    const distB = Math.abs(bp - budget);
    return distA - distB;
  })[0];
}

function findBestPackage(
  people: number,
  budget: number,
  jt: JourneyType,
): TravelPackage | null {
  const candidates = packages.filter(
    (p) => p.price <= budget && packageMatchesJourney(p, jt),
  );

  if (candidates.length === 0) {
    return null;
  }

  return candidates.sort((a, b) => a.price - b.price)[0];
}

const JOURNEY_LABELS: Record<JourneyType, string> = {
  city: "City tour / Wisata lokal",
  dinas: "Perjalanan dinas",
  outcity: "Perjalanan luar kota (multi-hari)",
  transfer: "Transfer bandara",
};

export function getJourneyLabel(jt: JourneyType): string {
  return JOURNEY_LABELS[jt];
}

export function buildFinderResult(
  budget: number,
  people: number,
  journey: JourneyType,
): FinderResult {
  const vehicle = findBestVehicle(people, budget, journey);
  const pkg = findBestPackage(people, budget, journey);

  const budgetShort =
    budget >= 1000000
      ? `${(budget / 1000000).toFixed(1)}jt`
      : `${Math.round(budget / 1000)}rb`;

  const vehicleName = vehicle ? vehicle.name : "kendaraan rekomendasi";
  const message = `Halo Mahessa Trans Holiday! Saya ingin sewa ${vehicleName} untuk ${people} orang, budget Rp${budgetShort}, tujuan ${JOURNEY_LABELS[journey]}. Tersedia kapan? Berapa harganya?`;

  return {
    vehicle,
    package: pkg,
    whatsappMessage: message,
  };
}

export function getPreviewVehicles(budget: number): Vehicle[] {
  return vehicles
    .filter((v) => v.pricing.startingPrice !== null && v.pricing.startingPrice <= budget)
    .sort((a, b) => (a.pricing.startingPrice ?? 0) - (b.pricing.startingPrice ?? 0))
    .slice(0, 4);
}
