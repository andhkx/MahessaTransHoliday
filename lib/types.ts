export type VehicleCategory =
  | "entry"
  | "midrange"
  | "premium"
  | "luxury"
  | "group";

export type Spec = {
  label: string;
  value: string;
};

export type SeoInfo = {
  title: string;
  description: string;
  keywords: string[];
};

export type Vehicle = {
  id: string;
  slug: string;
  name: string;
  category: VehicleCategory;
  transmission: string;
  capacity: number;
  fuelType: string;
  image: string;
  gallery: string[];
  badge?: string;
  pricing: {
    leaseKey: {
      "12h": number | null;
      "24h": number | null;
    };
    withDriver: {
      startingPrice: number | null;
    };
  };
  description: string[];
  suitableFor: string[];
  features: string[];
  specs: Spec[];
  serviceAreas: string[];
  seo: SeoInfo;
};

export type PackageItineraryStep = {
  day: string;
  activities: string[];
};

export type TravelPackage = {
  id: string;
  slug: string;
  destination: string;
  duration: string;
  durationHours: number;
  price: number;
  image: string;
  badge?: string;
  description: string[];
  included: string[];
  excluded: string[];
  suitableFor: string[];
  itinerary: PackageItineraryStep[] | null;
  serviceAreas: string[];
  faq: { q: string; a: string }[];
  seo: SeoInfo;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type Service = {
  id: string;
  icon: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
};
