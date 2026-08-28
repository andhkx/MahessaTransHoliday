export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  location: "Malaysia" | "Toli-Toli" | "Manado";
  badge?: string;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/galeri1.webp",
    alt: "Perjalanan ke Malaysia bersama Mahessa Trans Holiday",
    title: "Malaysia Tour",
    location: "Malaysia",
  },
  {
    src: "/images/gallery/galeri2.webp",
    alt: "Wisata Malaysia keluarga dengan Mahessa Trans Holiday",
    title: "Malaysia Family Trip",
    location: "Malaysia",
  },
  {
    src: "/images/gallery/galeri3.webp",
    alt: "Perjalanan ke Toli-Toli Sulawesi Tengah",
    title: "Toli-Toli Trip",
    location: "Toli-Toli",
  },
  {
    src: "/images/gallery/galeri4.webp",
    alt: "Wisata Toli-Toli dengan rombongan",
    title: "Toli-Toli Group Tour",
    location: "Toli-Toli",
  },
  {
    src: "/images/gallery/galeri5.webp",
    alt: "Perjalanan dinas ke Toli-Toli",
    title: "Toli-Toli Business Trip",
    location: "Toli-Toli",
  },
  {
    src: "/images/gallery/galeri6.webp",
    alt: "Liburan ke Manado Sulawesi Utara",
    title: "Manado Holiday",
    location: "Manado",
    badge: "Wisata",
  },
  {
    src: "/images/gallery/galeri7.webp",
    alt: "Perjalanan keluarga ke Manado",
    title: "Manado Family Trip",
    location: "Manado",
    badge: "Keluarga",
  },
  {
    src: "/images/gallery/galeri8.webp",
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