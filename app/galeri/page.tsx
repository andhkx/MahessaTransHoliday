import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import CtaSection from "@/components/CtaSection";
import { galleryImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Cerita perjalanan bersama Mahessa Trans Holiday. Dokumentasi nyata perjalanan para penumpang kami.",
  alternates: { canonical: "/galeri" },
};

export default function GaleriPage() {
  const [first, ...rest] = galleryImages;
  return (
    <>
      <PageHeader
        title="Cerita perjalanan bersama Mahessa"
        subtitle="Dokumentasi nyata perjalanan para penumpang kami — dari city tour singkat hingga perjalanan luar kota."
      />
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Image
            src={first.src}
            alt={first.alt}
            width={1280}
            height={720}
            priority
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="aspect-[16/9] w-full rounded-3xl object-cover shadow-md"
          />
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((img) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={640}
                height={480}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm"
              />
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
