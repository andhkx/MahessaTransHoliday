import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: "rental-mobil",
    icon: "🚗",
    title: "Rental Mobil",
    text: "Lepas kunci 12 atau 24 jam. Pilih sendiri, berkendara sendiri.",
    ctaLabel: "Lihat Armada",
    ctaHref: "/armada",
  },
  {
    id: "mobil-driver",
    icon: "👨‍✈️",
    title: "Mobil + Driver",
    text: "Perjalanan lebih nyaman bersama driver berpengalaman Mahessa.",
    ctaLabel: "Tanya Driver",
    ctaHref: "/armada",
  },
  {
    id: "charter-transfer",
    icon: "📍",
    title: "Charter & Transfer",
    text: "Antar-jemput dan perjalanan sesuai kebutuhan & jadwalmu.",
    ctaLabel: "Hubungi",
    ctaHref: "/kontak",
  },
  {
    id: "paket-wisata",
    icon: "🌴",
    title: "Paket Wisata",
    text: "City tour, wisata, hingga perjalanan luar kota. All-in solution.",
    ctaLabel: "Lihat Paket",
    ctaHref: "/paket",
  },
];

export const valueProps = [
  {
    id: "unit-terawat",
    title: "Unit Terawat",
    text: "Mobil bersih, terawat, dan siap digunakan untuk perjalananmu.",
  },
  {
    id: "pilihan-fleksibel",
    title: "Pilihan Fleksibel",
    text: "Lepas kunci atau dengan driver, sesuai kebutuhan dan budget.",
  },
  {
    id: "berbagai-kebutuhan",
    title: "Berbagai Kebutuhan",
    text: "Wisata, city tour, airport transfer, charter, perjalanan dinas — semua kami layani.",
  },
  {
    id: "pengalaman-terbukti",
    title: "Pengalaman Terbukti",
    text: "Telah melayani ratusan penumpang untuk berbagai jenis perjalanan dan kebutuhan.",
  },
];
