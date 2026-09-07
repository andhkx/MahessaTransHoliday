import type { Metadata } from "next";
import { seoMetadata } from "@/data/seo";
import GaleriPageClient from "./GaleriPageClient";
import CtaSection from "@/components/CtaSection";
import { getAllGallery } from "@/lib/data/supabase/gallery";
import { galleryImages as staticGallery } from "@/lib/gallery";
import { getLocale } from "@/lib/i18n/server";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {

  title: seoMetadata.galeri.title,
  description: seoMetadata.galeri.description,
  keywords: seoMetadata.galeri.keywords,
  alternates: { canonical: "/galeri" },
};

export default async function GaleriPage() {
  const supabaseGallery = await getAllGallery();
  const locale = await getLocale();
  const isEn = locale === "en";

  const gallery = supabaseGallery.length > 0
    ? supabaseGallery.map((g) => ({
        src: g.image_url,
        alt: g.caption,
        title: g.caption,
        location: g.location || (isEn ? "General" : "Umum"),
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
        title={isEn ? "Want to be part of the next story?" : "Mau jadi bagian dari cerita berikutnya?"}
        text={isEn
          ? "Plan your trip with us and enjoy a delightful experience."
          : "Rencanakan perjalananmu bersama kami dan dapatkan pengalaman yang menyenangkan."}
      />
    </>
  );
}
