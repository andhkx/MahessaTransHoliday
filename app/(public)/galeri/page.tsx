import type { Metadata } from "next";
import { seoMetadata } from "@/data/seo";
import GaleriPageClient from "./GaleriPageClient";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: seoMetadata.galeri.title,
  description: seoMetadata.galeri.description,
  keywords: seoMetadata.galeri.keywords,
  alternates: { canonical: "/galeri" },
};

export default function GaleriPage() {
  return (
    <>
      <GaleriPageClient />
      <CtaSection
        title="Mau jadi bagian dari cerita berikutnya?"
        text="Rencanakan perjalananmu bersama kami dan dapatkan pengalaman yang menyenangkan."
      />
    </>
  );
}
