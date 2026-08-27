import type { Metadata } from "next";
import GaleriPageClient from "./GaleriPageClient";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Cerita perjalanan bersama Mahessa Trans Holiday. Dokumentasi nyata perjalanan para penumpang kami.",
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
