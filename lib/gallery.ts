export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  location: "Malaysia" | "Toli-Toli" | "Manado";
  badge?: string;
};

const placeholder = (label: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8F1F5"/><stop offset="1" stop-color="#D9E6EE"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><g fill="#005691" opacity="0.4"><circle cx="200" cy="300" r="40"/><rect x="280" y="240" width="240" height="120" rx="16"/><circle cx="600" cy="300" r="40"/></g><text x="400" y="480" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="700" fill="#42596B" text-anchor="middle">${label}</text></svg>`
  );

export const galleryImages: GalleryImage[] = [
  {
    src: placeholder("Malaysia Tour"),
    alt: "Perjalanan ke Malaysia bersama Mahessa Trans Holiday",
    title: "Malaysia Tour",
    location: "Malaysia",
  },
  {
    src: placeholder("Malaysia Family Trip"),
    alt: "Wisata Malaysia keluarga dengan Mahessa Trans Holiday",
    title: "Malaysia Family Trip",
    location: "Malaysia",
  },
  {
    src: placeholder("Toli-Toli Trip"),
    alt: "Perjalanan ke Toli-Toli Sulawesi Tengah",
    title: "Toli-Toli Trip",
    location: "Toli-Toli",
  },
  {
    src: placeholder("Toli-Toli Group Tour"),
    alt: "Wisata Toli-Toli dengan rombongan",
    title: "Toli-Toli Group Tour",
    location: "Toli-Toli",
  },
  {
    src: placeholder("Toli-Toli Business Trip"),
    alt: "Perjalanan dinas ke Toli-Toli",
    title: "Toli-Toli Business Trip",
    location: "Toli-Toli",
  },
  {
    src: placeholder("Manado Holiday"),
    alt: "Liburan ke Manado Sulawesi Utara",
    title: "Manado Holiday",
    location: "Manado",
    badge: "Wisata",
  },
  {
    src: placeholder("Manado Family Trip"),
    alt: "Perjalanan keluarga ke Manado",
    title: "Manado Family Trip",
    location: "Manado",
    badge: "Keluarga",
  },
  {
    src: placeholder("Manado Marine Tour"),
    alt: "Wisata bahari Manado bersama Mahessa",
    title: "Manado Marine Tour",
    location: "Manado",
    badge: "Bahari",
  },
];

export const galleryLocations: Array<"Semua" | GalleryImage["location"]> = [
  "Semua",
  "Malaysia",
  "Toli-Toli",
  "Manado",
];