import type { Metadata } from "next";
import { seoMetadata } from "@/data/seo";
import GaleriPageClient from "./GaleriPageClient";
import CtaSection from "@/components/CtaSection";
import { getAllGallery } from "@/lib/data/supabase/gallery";
import { galleryImages as staticGallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: seoMetadata.galeri.title,
  description: seoMetadata.galeri.description,
  keywords: seoMetadata.galeri.keywords,
  alternates: { canonical: "/galeri" },
};

export default async function GaleriPage() {
  const supabaseGallery = await getAllGallery();

  // Use Supabase data if available, otherwise fall back to static
  const gallery = supabaseGallery.length > 0
    ? supabaseGallery.map((g) => ({
        src: g.image_url,
        alt: g.caption,
        title: g.caption,
        location: (g.location || "Umum") as any,
        category: g.category,
      }))
    : staticGallery.map((g) => ({
        src: g.src,
        alt: g.alt,
        title: g.title,
        location: g.location,
        category: "static",
      }));

  if (supabaseGallery.length === 0) {
    console.warn('[Galeri Page] Using static fallback data');
  }

  return (
    <>
      <GaleriPageClient items={gallery} />
      <CtaSection
        title="Mau jadi bagian dari cerita berikutnya?"
        text="Rencanakan perjalananmu bersama kami dan dapatkan pengalaman yang menyenangkan."
      />
    </>
  );
}