import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BadgeDollarSign,
  Clock,
  Headphones,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import Hero from "@/components/Hero";
import { Metadata } from "next";
import { seoMetadata } from "@/data/seo";
import Stats from "@/components/Stats";
import ServiceCards from "@/components/ServiceCards";
import PackageCards from "@/components/PackageCards";
import ProcessSection from "@/components/ProcessSection";
import FaqAccordion from "@/components/FaqAccordion";
import CtaSection from "@/components/CtaSection";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { getFeaturedVehicles } from "@/lib/data/supabase/vehicles";
import { getFeaturedPackages, getAllPackages } from "@/lib/data/supabase/packages";
import { getFeaturedTestimonials } from "@/lib/data/supabase/testimonials";
import { getFeaturedGallery } from "@/lib/data/supabase/gallery";
import { galleryImages as staticGallery } from "@/lib/gallery";
import ArmadaShowcaseClient from "./ArmadaShowcaseClient";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {

  title: seoMetadata.homepage.title,
  description: seoMetadata.homepage.description,
  keywords: seoMetadata.homepage.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    title: seoMetadata.homepage.title,
    description: seoMetadata.homepage.description,
    url: "/",
    type: "website",
  },
};

const ADVANTAGES = [
  {
    Icon: ShieldCheck,
    title: "Driver Profesional",
    text: "Sopir berpengalaman, berlisensi, dan menguasai rute Bandung, Jakarta, dan Jawa Barat.",
  },
  {
    Icon: Sparkles,
    title: "Unit Terawat",
    text: "Semua kendaraan dicek dan dibersihkan sebelum berangkat. Performa prima, kabin nyaman.",
  },
  {
    Icon: Clock,
    title: "Booking 24/7",
    text: "Admin standby setiap hari lewat WhatsApp. Kirim detail perjalanan, langsung kami konfirmasi.",
  },
  {
    Icon: MapPinned,
    title: "Area Luas",
    text: "Melayani Cimahi, Bandung, Padalarang, hingga destinasi populer di Jawa dan Bali.",
  },
  {
    Icon: Award,
    title: "Berbagai Jenis Kendaraan",
    text: "City car hemat, MPV keluarga, SUV premium, hingga Hiace dan Elf untuk grup besar.",
  },
  {
    Icon: BadgeDollarSign,
    title: "Harga Terjangkau",
    text: "Tarif transparan tanpa biaya tersembunyi. Cocok untuk keluarga, komunitas, dan perusahaan.",
  },
  {
    Icon: Headphones,
    title: "Proses Mudah",
    text: "Konfirmasi cepat, komunikasi jelas, tanpa langkah rumit. Tinggal duduk dan berangkat.",
  },
  {
    Icon: Wallet,
    title: "Layanan Lengkap",
    text: "Antar jemput bandara, city tour, perjalanan dinas, hingga paket wisata multi-hari.",
  },
];

function Advantages() {
  return (
    <section
      id="keunggulan"
      className="relative overflow-hidden border-y border-line bg-surface/60 py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
        <div className="mb-10 max-w-2xl md:mb-14">
          <span className="mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            Keunggulan
          </span>
          <h2 className="mb-3 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading md:text-[44px]">
            Mitra terpercaya untuk{" "}
            <span className="text-accent">transportasi</span> aman dan nyaman.
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-body-text md:text-base">
            Setiap detail kami persiapkan agar kamu cukup duduk, santai, dan
            nikmati perjalanan tanpa khawatir.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map(({ Icon, title, text }) => (
            <article
              key={title}
              className="group relative h-full overflow-hidden rounded-[20px] border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-elevated"
            >
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/[0.1] text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_10px_24px_-10px_rgba(0,86,145,0.6)]">
                <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-[17px] font-extrabold tracking-tight text-heading">
                {title}
              </h3>
              <p className="text-[13px] leading-relaxed text-body-text">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [vehicles, packages, testimonials, allPackages, gallery] = await Promise.all([
    getFeaturedVehicles(),
    getFeaturedPackages(),
    getFeaturedTestimonials(8),
    getAllPackages(),
    getFeaturedGallery(5),
  ]);

  const galleryItems = gallery.length > 0
    ? gallery.map((g) => ({
        src: g.image_url,
        alt: g.caption,
        title: g.caption,
        location: g.location || "Umum",
      }))
    : staticGallery;

  return (
    <>
      <Hero />
      <Stats />
      <ServiceCards />
      <Advantages />
      <FeaturedArmada vehicles={vehicles} />
      <FeaturedPackages packages={packages} allPackages={allPackages} />
      <section className="py-8 bg-wa-surface/40 text-center">
        <p className="text-sm font-semibold text-heading mb-4">Tidak tahu mobil mana yang cocok?</p>
        <Link href="/temukan" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white transition-all hover:scale-[1.01] hover:bg-accent-hover active:scale-[0.98]">
          Temukan Mobil Cocok Untukmu ?
        </Link>
      </section>
      <ProcessSection />
      <GalleryShowcase items={galleryItems} />
      <FaqHome />
      <TestimonialCarousel testimonials={testimonials} />
      <CtaSection />
    </>
  );
}

function FeaturedArmada({ vehicles }: { vehicles: Awaited<ReturnType<typeof getFeaturedVehicles>> }) {
  return (
    <section
      id="armada"
      className="relative z-10 mx-auto w-full max-w-[1300px] px-5 py-16 sm:px-8 md:px-12 md:py-24"
    >
      <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-12">
        <div>
          <span className="mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            Armada Mobil Kami
          </span>
          <h2 className="mb-2 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading md:text-[44px]">
            Kendaraan untuk{" "}
            <span className="text-accent">perjalananmu.</span>
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-body-text">
            Pilih unit yang sesuai, dari city car harian hingga Hiace Premio
            untuk rombongan besar.
          </p>
        </div>
      </div>

      <ArmadaShowcaseClient vehicles={vehicles} />
    </section>
  );
}

function FeaturedPackages({ packages, allPackages }: { packages: Awaited<ReturnType<typeof getFeaturedPackages>>; allPackages: Awaited<ReturnType<typeof getAllPackages>> }) {
  return (
    <section className="border-y border-line bg-surface/60 py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
        <SectionHeading
          eyebrow="Harga Paket"
          title="Perjalanan tanpa ribet."
          subtitle="Mobil, driver, BBM, tol, parkir � semua sudah termasuk. Pilih tujuannya, sisanya biar kami."
        />
        <PackageCards packages={packages} forceMode="single" />
        <div className="mt-10 text-center">
          <Link href="/paket" className="text-link">
            Lihat Semua Paket ({allPackages.length})
            <span aria-hidden="true">?</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function GalleryShowcase({ items }: { items: Array<{ src: string; alt: string; title: string; location: string }> }) {
  if (items.length === 0) return null;
  const [first, ...rest] = items;
  const grid = rest.slice(0, 4);
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
        <SectionHeading
          eyebrow="Galeri"
          title="Cerita perjalanan bersama Mahessa."
          subtitle="Dokumentasi nyata perjalanan para pelanggan kami."
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <div className="gallery-zoom relative col-span-2 row-span-2 overflow-hidden rounded-[24px] shadow-card md:col-span-2 md:row-span-2">
            <Image
              src={first.src}
              alt={first.alt}
              width={1200}
              height={1200}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="aspect-square h-full w-full object-cover md:aspect-[4/4]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-heading/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 text-white md:bottom-5 md:left-5">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                  Galeri
                </p>
                <p className="text-base font-extrabold leading-tight md:text-lg">
                  {first.title}
                </p>
              </div>
              <Link
                href="/galeri"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-[12px] font-extrabold text-accent transition-transform hover:scale-105"
              >
                Lihat
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {grid.map((img) => (
            <div
              key={img.src}
              className="gallery-zoom relative aspect-square overflow-hidden rounded-[16px] shadow-sm"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={480}
                height={480}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/galeri" className="text-link">
            Lihat Galeri Lengkap
            <span aria-hidden="true">?</span>
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
      className="mx-auto w-full max-w-[860px] px-5 py-16 sm:px-8 md:px-12 md:py-24"
    >
      <SectionHeading
        eyebrow="FAQ"
        title="Pertanyaan yang sering ditanyakan."
        subtitle="Ringkasan pertanyaan seputar rental dan paket."
      />
      <FaqAccordion items={[
        { id: "1", question: "Apakah semua mobil bisa dengan driver?", answer: "Ya, semua unit di armada kami dapat disewa dengan driver profesional." },
        { id: "2", question: "Apakah bisa antar-jemput dari Stasiun KCIC Padalarang?", answer: "Ya, kami melayani charter dan transfer dari berbagai lokasi termasuk Stasiun KCIC Padalarang." },
        { id: "3", question: "Apakah harga paket sudah termasuk BBM?", answer: "Ya, paket All In Hiace sudah termasuk mobil, driver, BBM, tol, parkir, dan tiket penyeberangan." },
        { id: "4", question: "Apakah melayani perjalanan luar kota?", answer: "Ya, kami melayani perjalanan luar kota dalam maupun multi-hari. Lihat paket wisata untuk rute dan harga." },
        { id: "5", question: "Bagaimana cara reservasi?", answer: "Hubungi kami via WhatsApp dengan detail kebutuhan perjalananmu (tanggal, lokasi, jenis kendaraan). Tim kami akan membantu." },
        { id: "6", question: "Apakah ada biaya tambahan selain harga yang tertera?", answer: "Harga sudah fixed seperti tertera. Biaya tambahan (overtime, tujuan di luar coverage) akan dikonfirmasi sebelumnya." },
      ]} />
      <div className="mt-6 text-center">
        <Link
          href="/faq"
          className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
        >
          Lihat semua pertanyaan ?
        </Link>
      </div>
    </section>
  );
}