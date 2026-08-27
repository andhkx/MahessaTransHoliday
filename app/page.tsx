import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ServiceCards from "@/components/ServiceCards";
import VehicleCards from "@/components/VehicleCards";
import PackageCards from "@/components/PackageCards";
import ProcessSection from "@/components/ProcessSection";
import FaqAccordion from "@/components/FaqAccordion";
import CtaSection from "@/components/CtaSection";
import SectionHeading from "@/components/SectionHeading";
import { getFeaturedVehicles } from "@/data/vehicles";
import { getFeaturedPackages } from "@/data/packages";
import { faqMain } from "@/data/faq";
import { galleryImages } from "@/lib/gallery";

function ValueProps() {
  return (
    <section className="border-y border-line bg-surface/50 py-12 lg:py-16">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:px-8 md:grid-cols-4 md:px-12">
        {[
          ["Unit Terawat", "Mobil bersih, terawat, dan siap dipakai untuk perjalananmu."],
          ["Pilihan Fleksibel", "Dengan driver profesional, sesuai kebutuhan dan budget."],
          ["Berbagai Kebutuhan", "Wisata, city tour, airport transfer, charter, perjalanan dinas."],
          ["Terbukti", "Telah melayani ratusan penumpang untuk berbagai jenis perjalanan."],
        ].map(([title, desc]) => (
          <div
            key={title}
            className="rounded-[18px] border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card"
          >
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-primary">
              <svg
                className="h-4.5 w-4.5"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>
            <p className="text-sm font-extrabold text-heading">{title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedArmada() {
  const featured = getFeaturedVehicles();
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1300px] px-5 py-16 sm:px-8 md:px-12 md:py-20">
      <SectionHeading
        eyebrow="Armada"
        title="Kendaraan untuk perjalananmu."
        subtitle="Mulai dari mobil compact yang irit hingga kendaraan premium dan rombongan."
      />
      <VehicleCards vehicles={featured} />
      <div className="mt-8 text-center">
        <Link
          href="/armada"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-bold text-heading transition-all duration-300 hover:border-primary/50 hover:text-primary"
        >
          Lihat Semua Armada →
        </Link>
      </div>
    </section>
  );
}

function FeaturedPackages() {
  const featured = getFeaturedPackages();
  return (
    <section className="border-y border-line bg-surface/50 py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
        <SectionHeading
          eyebrow="Harga Paket"
          title="Perjalanan tanpa ribet."
          subtitle="Mobil, driver, BBM, tol, parkir — semua sudah termasuk. Pilih tujuannya, sisanya biar kami."
        />
        <PackageCards packages={featured} />
        <div className="mt-10 text-center">
          <Link
            href="/paket"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-bold text-heading transition-all duration-300 hover:border-primary/50 hover:text-primary"
          >
            Lihat Semua Paket →
          </Link>
        </div>
      </div>
    </section>
  );
}

function GalleryShowcase() {
  const [first, ...rest] = galleryImages;
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
        <SectionHeading
          eyebrow="Galeri"
          title="Cerita perjalanan bersama Mahessa."
          subtitle="Dokumentasi nyata perjalanan para penumpang kami."
        />
        <Image
          src={first.src}
          alt={first.alt}
          width={1200}
          height={675}
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="mb-5 aspect-video w-full rounded-[24px] object-cover shadow-card"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {rest.slice(0, 4).map((img) => (
            <div
              key={img.src}
              className="gallery-zoom cursor-pointer overflow-hidden rounded-[16px]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={480}
                height={480}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="aspect-square w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/galeri" className="text-link">
            Lihat Galeri Lengkap
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FaqHome() {
  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-[860px] px-5 py-16 sm:px-8 md:px-12 md:py-20"
    >
      <SectionHeading
        eyebrow="FAQ"
        title="Pertanyaan yang sering ditanyakan."
        subtitle="Ringkasan pertanyaan seputar rental dan paket."
      />
      <FaqAccordion items={faqMain} />
      <div className="mt-6 text-center">
        <Link
          href="/faq"
          className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
        >
          Lihat semua pertanyaan →
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServiceCards />
      <ValueProps />
      <FeaturedArmada />
      <FeaturedPackages />
      <ProcessSection />
      <GalleryShowcase />
      <FaqHome />
      <CtaSection />
    </>
  );
}
