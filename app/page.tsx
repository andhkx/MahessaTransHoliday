import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import VehicleCard from "@/components/VehicleCard";
import PackageCard from "@/components/PackageCard";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import CtaSection from "@/components/CtaSection";
import { getFeaturedVehicles } from "@/data/vehicles";
import { getFeaturedPackages } from "@/data/packages";
import { valueProps } from "@/data/services";
import { faqMain } from "@/data/faq";
import { galleryImages } from "@/lib/gallery";
import Image from "next/image";

function FeaturedArmada() {
  const featured = getFeaturedVehicles();
  return (
    <section className="bg-mist py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            align="left"
            title="Pilih kendaraan untuk perjalananmu"
            subtitle="Mulai dari mobil compact yang irit hingga kendaraan premium dan rombongan."
          />
          <Link
            href="/armada"
            className="hidden shrink-0 items-center gap-1 text-sm font-bold text-primary hover:text-secondary sm:inline-flex"
          >
            Lihat Semua <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="-mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {featured.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              className="min-w-[270px] snap-start lg:min-w-0"
            />
          ))}
        </div>
        <Link
          href="/armada"
          className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary sm:hidden"
        >
          Lihat Semua Armada <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function FeaturedPackages() {
  const featured = getFeaturedPackages();
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            align="left"
            title="Perjalanan tanpa ribet"
            subtitle="Paket all-in Hiace: mobil, driver, BBM, tol, parkir — semua sudah termasuk."
          />
          <Link
            href="/paket"
            className="hidden shrink-0 items-center gap-1 text-sm font-bold text-primary hover:text-secondary sm:inline-flex"
          >
            Lihat Semua Paket <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((packageItem) => (
            <PackageCard key={packageItem.id} packageItem={packageItem} />
          ))}
        </div>
        <Link
          href="/paket"
          className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary sm:hidden"
        >
          Lihat Semua Paket <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function ValueProps() {
  return (
    <section className="bg-mist py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Kenapa pilih Mahessa?" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-bold text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryShowcase() {
  const [first, ...rest] = galleryImages;
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Cerita perjalanan bersama Mahessa"
          subtitle="Dokumentasi nyata perjalanan para penumpang kami."
        />
        <Image
          src={first.src}
          alt={first.alt}
          width={1280}
          height={720}
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="aspect-[16/9] w-full rounded-3xl object-cover shadow-md"
        />
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {rest.slice(0, 4).map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={480}
              height={360}
              sizes="(max-width: 640px) 50vw, 25vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm"
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-secondary"
          >
            Lihat Galeri Lengkap <span aria-hidden="true">→</span>
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
      <section className="bg-mist py-16 sm:py-20" id="faq">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Pertanyaan yang sering diajukan" />
          <FaqAccordion items={faqMain} />
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-secondary"
            >
              Lihat Semua FAQ <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
