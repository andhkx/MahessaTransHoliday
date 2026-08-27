export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  category: "Wisata" | "Rombongan" | "Keluarga" | "Dinas" | "City Tour";
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/galeri1.svg",
    alt: "Dokumentasi penumpang Mahessa Trans Holiday 1",
    title: "Trip Bromo",
    category: "Wisata",
  },
  {
    src: "/images/gallery/galeri2.svg",
    alt: "Dokumentasi penumpang Mahessa Trans Holiday 2",
    title: "City Tour Bandung",
    category: "City Tour",
  },
  {
    src: "/images/gallery/galeri3.svg",
    alt: "Dokumentasi penumpang Mahessa Trans Holiday 3",
    title: "Keluarga Besar",
    category: "Keluarga",
  },
  {
    src: "/images/gallery/galeri4.svg",
    alt: "Dokumentasi penumpang Mahessa Trans Holiday 4",
    title: "Studi Tour",
    category: "Dinas",
  },
  {
    src: "/images/gallery/galeri5.svg",
    alt: "Dokumentasi penumpang Mahessa Trans Holiday 5",
    title: "Paket Ciwidey",
    category: "Wisata",
  },
  {
    src: "/images/gallery/galeri6.svg",
    alt: "Dokumentasi penumpang Mahessa Trans Holiday 6",
    title: "Rombongan Kantor",
    category: "Rombongan",
  },
  {
    src: "/images/gallery/galeri7.svg",
    alt: "Dokumentasi penumpang Mahessa Trans Holiday 7",
    title: "Trip Yogyakarta",
    category: "Wisata",
  },
  {
    src: "/images/gallery/galeri8.svg",
    alt: "Dokumentasi penumpang Mahessa Trans Holiday 8",
    title: "Liburan Keluarga",
    category: "Keluarga",
  },
];

export const galleryCategories: Array<"Semua" | GalleryImage["category"]> = [
  "Semua",
  "Wisata",
  "Rombongan",
  "Keluarga",
  "Dinas",
  "City Tour",
];
