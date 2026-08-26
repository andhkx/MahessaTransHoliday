import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import VehicleCard from "@/components/VehicleCard";
import PackageCard from "@/components/PackageCard";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import { getFeaturedVehicles } from "@/data/vehicles";
import { getFeaturedPackages } from "@/data/packages";
import { valueProps } from "@/data/services";
import { faqMain } from "@/data/faq";
import { galleryImages } from "@/lib/gallery";

function FeaturedArmada() {
  const featured = getFeaturedVehicles();
  return (
    <section className="bg-surface py-12 lg:py-[60px]">
      <div className="container-site">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            align="left"
            title="Pilih kendaraan untuk perjalananmu"
            subtitle="Mulai dari mobil compact yang irit hingga kendaraan premium dan rombongan."
          />
          <Link href="/armada" className="text-link hidden shrink-0 sm:inline-flex">
            Lihat Semua
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0">
          {featured.map((vehicle, i) => (
            <Reveal
              key={vehicle.id}
              delay={(i % 5) as 0 | 1 | 2 | 3}
              className="min-w-[280px] snap-start lg:min-w-0"
            >
              <VehicleCard vehicle={vehicle} className="h-full" />
            </Reveal>
          ))}
        </div>
        <Link href="/armada" className="text-link mt-6 inline-flex sm:hidden">
          Lihat Semua Armada
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function FeaturedPackages() {
  const featured = getFeaturedPackages();
  return (
    <section className="bg-white py-12 lg:py-[60px]">
      <div className="container-site">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            align="left"
            title="Perjalanan tanpa ribet"
            subtitle="Paket all-in Hiace: mobil, driver, BBM, tol, parkir — semua sudah termasuk."
          />
          <Link href="/paket" className="text-link hidden shrink-0 sm:inline-flex">
            Lihat Semua Paket
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {featured.map((packageItem, i) => (
            <Reveal key={packageItem.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <PackageCard packageItem={packageItem} className="h-full" />
            </Reveal>
          ))}
        </div>
        <Link href="/paket" className="text-link mt-6 inline-flex sm:hidden">
          Lihat Semua Paket
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function ValueProps() {
  return (
    <section className="bg-sky py-12 lg:py-[60px]">
      <div className="container-site">
        <SectionHeading title="Kenapa pilih Mahessa?" tone="navy" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {valueProps.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="h-full rounded-xl bg-white p-7 text-center shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky/50 text-primary">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <h3 className="text-lg font-semibold text-navy lg:text-h5 lg:font-bold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body-text">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryShowcase() {
  const [first, ...rest] = galleryImages;
  return (
    <section className="bg-white py-12 lg:py-[60px]">
      <div className="container-site">
        <SectionHeading
          title="Cerita perjalanan bersama Mahessa"
          subtitle="Dokumentasi nyata perjalanan para penumpang kami."
        />
        <Image
          src={first.src}
          alt={first.alt}
          width={1200}
          height={675}
          sizes="(max-width: 1024px) 100vw, 900px"
          className="mb-8 aspect-video w-full rounded-2xl object-cover shadow-photo"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {rest.slice(0, 4).map((img) => (
            <div
              key={img.src}
              className="gallery-zoom cursor-pointer overflow-hidden rounded-xl shadow-card transition-shadow duration-300"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={480}
                height={480}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <FeaturedArmada />
      <FeaturedPackages />
      <ValueProps />
      <GalleryShowcase />
      <section className="bg-surface py-12 lg:py-[60px]" id="faq">
        <div className="container-site max-w-[800px]">
          <SectionHeading title="Pertanyaan yang sering diajukan" />
          <FaqAccordion items={faqMain} />
          <div className="mt-8 text-center">
            <Link href="/faq" className="text-link">
              Lihat Semua FAQ
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
