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
import Testimonials from "@/components/Testimonials";
import { getFeaturedVehicles } from "@/data/vehicles";
import { getFeaturedPackages } from "@/data/packages";
import { valueProps } from "@/data/services";
import { faqMain } from "@/data/faq";
import { galleryImages } from "@/lib/gallery";
import { testimonials } from "@/lib/testimonials";

function ValueProps() {
  return (
    <section className="border-y border-line bg-wa-surface/40 py-12 lg:py-16">
      <div className="container-site">
        <SectionHeading
          eyebrow="Kenapa Mahessa?"
          title="Alasan bisnis & keluarga pilih kami."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="h-full rounded-[20px] bg-white p-6 shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <h3 className="mt-4 text-base font-extrabold tracking-[-0.3px] text-accent">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed tracking-[-0.2px] text-body-text">
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

function FeaturedArmada() {
  const featured = getFeaturedVehicles();
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow="Armada"
            title="Kendaraan untuk perjalananmu."
          />
          <Link href="/armada" className="text-link hidden shrink-0 sm:inline-flex">
            Lihat Semua
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 lg:mx-0 lg:grid lg:grid-cols-5 lg:px-0">
          {featured.map((vehicle, i) => (
            <Reveal
              key={vehicle.id}
              delay={(i % 5) as 0 | 1 | 2 | 3}
              className="w-[260px] shrink-0 snap-start lg:w-auto"
            >
              <VehicleCard vehicle={vehicle} className="h-full" />
            </Reveal>
          ))}
        </div>
        <Link href="/armada" className="text-link mt-4 inline-flex sm:hidden">
          Lihat Semua Armada →
        </Link>
      </div>
    </section>
  );
}

function FeaturedPackages() {
  const featured = getFeaturedPackages();
  return (
    <section className="border-t border-line bg-wa-surface/40 py-12 lg:py-16">
      <div className="container-site">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow="Paket Wisata"
            title="Perjalanan tanpa ribet, harga jelas."
            subtitle="Mobil, driver, BBM, tol, parkir — semua sudah termasuk."
          />
          <Link href="/paket" className="text-link hidden shrink-0 sm:inline-flex">
            Lihat Semua Paket
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((packageItem, i) => (
            <Reveal key={packageItem.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <PackageCard packageItem={packageItem} className="group h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <SectionHeading
          eyebrow="Testimoni"
          title="Kata mereka setelah perjalanan."
          subtitle="Pesan asli dari penumpang yang sudah berangkat bersama kami."
        />
        <Reveal>
          <Testimonials items={testimonials.slice(0, 5)} />
        </Reveal>
      </div>
    </section>
  );
}

function GalleryShowcase() {
  const [first, ...rest] = galleryImages;
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <SectionHeading
          eyebrow="Galeri"
          title="Cerita perjalanan bersama Mahessa."
        />
        <Image
          src={first.src}
          alt={first.alt}
          width={1200}
          height={675}
          sizes="(max-width: 1024px) 100vw, 900px"
          className="mb-6 aspect-video w-full rounded-[24px] object-cover shadow-card"
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <ValueProps />
      <FeaturedArmada />
      <FeaturedPackages />
      <TestimonialsSection />
      <GalleryShowcase />
      <section className="border-t border-line bg-wa-surface/40 py-12 lg:py-16" id="faq">
        <div className="container-site max-w-[800px]">
          <SectionHeading
            eyebrow="FAQ"
            title="Pertanyaan yang sering ditanyakan."
          />
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
