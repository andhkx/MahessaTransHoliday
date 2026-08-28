import type { JourneyType, BudgetTier } from "@/data/finder";
import { journeyKeywords, BUDGET_TIERS } from "@/data/finder";
import { vehicles } from "@/data/vehicles";
import { packages } from "@/data/packages";
import type { Vehicle, TravelPackage } from "@/lib/types";

export type FinderResult = {
  vehicle: Vehicle | null;
  alternatives: Vehicle[];
  package: TravelPackage | null;
  whatsappMessage: string;
  tier: BudgetTier | null;
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
  const candidates = vehicles
    .filter((v) => v.capacity >= people && vehicleMatchesJourney(v, jt))
    .filter((v) => v.pricing.startingPrice !== null && v.pricing.startingPrice <= budget)
    .sort((a, b) => (a.pricing.startingPrice ?? 0) - (b.pricing.startingPrice ?? 0));

  if (candidates.length > 0) return candidates[0];

  // Fallback: relax journey match but keep capacity+budget
  const fallback = vehicles
    .filter((v) => v.capacity >= people && v.pricing.startingPrice !== null && v.pricing.startingPrice <= budget)
    .sort((a, b) => (a.pricing.startingPrice ?? 0) - (b.pricing.startingPrice ?? 0));

  if (fallback.length > 0) return fallback[0];

  // Final fallback: cheapest vehicle that fits capacity
  const cheapest = vehicles
    .filter((v) => v.capacity >= people && v.pricing.startingPrice !== null)
    .sort((a, b) => (a.pricing.startingPrice ?? 0) - (b.pricing.startingPrice ?? 0));
  return cheapest[0] ?? null;
}

function findAlternatives(
  people: number,
  budget: number,
  jt: JourneyType,
  excludeSlug: string,
  limit = 3,
): Vehicle[] {
  return vehicles
    .filter((v) => v.slug !== excludeSlug)
    .filter(
      (v) =>
        v.capacity >= people &&
        v.pricing.startingPrice !== null &&
        v.pricing.startingPrice <= budget &&
        vehicleMatchesJourney(v, jt),
    )
    .sort((a, b) => (a.pricing.startingPrice ?? 0) - (b.pricing.startingPrice ?? 0))
    .slice(0, limit);
}

function findBestPackage(
  people: number,
  budget: number,
  jt: JourneyType,
): TravelPackage | null {
  const candidates = packages.filter(
    (p) => p.price <= budget && packageMatchesJourney(p, jt),
  );

  if (candidates.length === 0) return null;

  return candidates.sort((a, b) => a.price - b.price)[0];
}

const JOURNEY_LABELS: Record<JourneyType, string> = {
  city: "City tour / Wisata lokal",
  dinas: "Perjalanan dinas",
  outcity: "Perjalanan luar kota (Multi-hari)",
  transfer: "Transfer bandara",
};

export function getJourneyLabel(jt: JourneyType): string {
  return JOURNEY_LABELS[jt];
}

export function getBudgetTier(budget: number): BudgetTier | null {
  return BUDGET_TIERS.find((t) => budget >= t.min && budget <= t.max) ?? null;
}

export function buildFinderResult(
  budget: number,
  people: number,
  journey: JourneyType,
): FinderResult {
  const vehicle = findBestVehicle(people, budget, journey);
  const alternatives = vehicle
    ? findAlternatives(people, budget, journey, vehicle.slug)
    : [];
  const pkg = findBestPackage(people, budget, journey);

  const budgetShort =
    budget >= 1000000
      ? `${(budget / 1000000).toFixed(1)}jt`
      : `${Math.round(budget / 1000)}rb`;

  const vehicleName = vehicle ? vehicle.name : "kendaraan rekomendasi";
  const message = `Halo Mahessa Trans Holiday! Saya ingin sewa ${vehicleName} untuk ${people} orang, budget Rp${budgetShort}, tujuan ${JOURNEY_LABELS[journey]}. Tersedia kapan? Berapa harganya?`;

  return {
    vehicle,
    alternatives,
    package: pkg,
    whatsappMessage: message,
    tier: getBudgetTier(budget),
  };
}

export function getPreviewVehicles(budget: number): Vehicle[] {
  return vehicles
    .filter(
      (v) =>
        v.pricing.startingPrice !== null && v.pricing.startingPrice <= budget,
    )
    .sort((a, b) => (a.pricing.startingPrice ?? 0) - (b.pricing.startingPrice ?? 0))
    .slice(0, 4);
}
