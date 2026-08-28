export const BUDGET_MIN = 350000;
export const BUDGET_MAX = 12750000;
export const BUDGET_STEP = 50000;

export type BudgetTier = {
  id: "hemat" | "menengah" | "premium" | "grup";
  label: string;
  range: string;
  min: number;
  max: number;
  color: string;
  bgClass: string;
};

export const BUDGET_TIERS: BudgetTier[] = [
  {
    id: "hemat",
    label: "Hemat",
    range: "Rp350rb - 600rb",
    min: 350000,
    max: 600000,
    color: "#27AE60",
    bgClass: "bg-success",
  },
  {
    id: "menengah",
    label: "Menengah",
    range: "Rp700rb - 1.5jt",
    min: 700000,
    max: 1500000,
    color: "#F39C12",
    bgClass: "bg-warning",
  },
  {
    id: "premium",
    label: "Premium",
    range: "Rp1.8jt - 4.5jt",
    min: 1800000,
    max: 4500000,
    color: "#0F4C75",
    bgClass: "bg-accent",
  },
  {
    id: "grup",
    label: "Grup / Wisata",
    range: "Rp12.75jt+",
    min: 4500000,
    max: 12750000,
    color: "#7B2CBF",
    bgClass: "bg-[#7B2CBF]",
  },
];

export type PeopleBucket = {
  id: "small" | "medium" | "family" | "group";
  label: string;
  capacity: number;
  Icon: string;
};

export const PEOPLE_OPTIONS: PeopleBucket[] = [
  { id: "small", label: "1-2 orang", capacity: 2, Icon: "User" },
  { id: "medium", label: "3-4 orang", capacity: 4, Icon: "Users" },
  { id: "family", label: "5-7 orang (Keluarga)", capacity: 6, Icon: "Users2" },
  { id: "group", label: "7+ orang (Rombongan)", capacity: 14, Icon: "Bus" },
];

export type JourneyType = "city" | "dinas" | "outcity" | "transfer";

export const JOURNEY_TYPES: {
  id: JourneyType;
  label: string;
  description: string;
  Icon: string;
}[] = [
  {
    id: "city",
    label: "City tour / Wisata lokal",
    description: "Jelajahi kota, tempat menarik, destinasi lokal",
    Icon: "Building2",
  },
  {
    id: "dinas",
    label: "Perjalanan dinas",
    description: "Meeting, klien visit, perjalanan bisnis",
    Icon: "Briefcase",
  },
  {
    id: "outcity",
    label: "Perjalanan luar kota (Multi-hari)",
    description: "Wisata, camping, petualangan jauh",
    Icon: "Mountain",
  },
  {
    id: "transfer",
    label: "Transfer bandara",
    description: "Antar-jemput bandara, on-time, guaranteed",
    Icon: "Plane",
  },
];

export const journeyKeywords: Record<JourneyType, string[]> = {
  city: ["city tour", "perjalanan dalam kota", "airport", "kota"],
  dinas: ["perjalanan dinas", "office", "bisnis"],
  outcity: ["perjalanan luar kota", "wisata", "trip", "multi"],
  transfer: ["antar-jemput bandara", "airport", "transfer", "bandara"],
};
