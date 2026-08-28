const WHEELCHAIR = 350000; // min budget shown
const MAX_BUDGET = 12750000;

export const BUDGET_MIN = 350000;
export const BUDGET_MAX = 12750000;
export const BUDGET_STEP = 50000;

export const PEOPLE_OPTIONS = [
  { id: "2", label: "2 - 3" },
  { id: "5", label: "5 - 7" },
  { id: "15", label: "15 - 20" },
] as const;

export type JourneyType = "city" | "dinas" | "outcity" | "transfer";

export const JOURNEY_TYPES: { id: JourneyType; label: string }[] = [
  { id: "city", label: "City tour / Wisata lokal" },
  { id: "dinas", label: "Perjalanan dinas" },
  { id: "outcity", label: "Perjalanan luar kota (multi-hari)" },
  { id: "transfer", label: "Transfer bandara" },
];

export const journeyKeywords: Record<JourneyType, string[]> = {
  city: ["city tour", "perjalanan dalam kota", "airport"],
  dinas: ["perjalanan dinas", "office"],
  outcity: ["perjalanan luar kota", "wisata", "trip"],
  transfer: ["antar-jemput bandara", "airport", "transfer"],
};
