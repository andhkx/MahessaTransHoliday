import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import CtaSection from "@/components/CtaSection";
import { galleryImages } from "@/lib/gallery";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Cerita perjalanan bersama Mahessa Trans Holiday. Dokumentasi nyata perjalanan para penumpang kami.",
  alternates: { canonical: "/galeri" },
};

const masonryAspects = ["aspect-square", "aspect-[3/4]", "aspect-[4/3]"];

export default function GaleriPage() {
  return (
    <>
      <PageHeader
        title="Cerita perjalanan bersama Mahessa"
        subtitle="Dokumentasi nyata perjalanan para penumpang kami — dari city tour singkat hingga perjalanan luar kota."
      />
      <section className="py-12 lg:py-16">
        <div className="container-site">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galleryImages.map((img, i) => (
              <div
                key={img.src}
                className={cn(
                  "gallery-zoom mb-4 break-inside-avoid overflow-hidden rounded-xl shadow-card hover:shadow-elevated",
                  i === 0 ? "aspect-[16/9]" : masonryAspects[i % 3],
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={640}
                  height={640}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaSection
        title="Mau jadi bagian dari cerita berikutnya?"
        text="Rencanakan perjalananmu bersama kami dan dapatkan pengalaman yang menyenangkan."
      />
    </>
  );
}
