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
import ArticleCards from "@/components/ArticleCards";
import { getFeaturedVehicles } from "@/lib/data/supabase/vehicles";
import { getFeaturedPackages, getAllPackages } from "@/lib/data/supabase/packages";
import { getFeaturedTestimonials } from "@/lib/data/supabase/testimonials";
import { getFeaturedGallery } from "@/lib/data/supabase/gallery";
import { getFeaturedArticles, getLatestArticles } from "@/lib/data/supabase/articles";
import { galleryImages as staticGallery } from "@/lib/gallery";
import { getLocale, getDict } from "@/lib/i18n/server";
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

const ADVANTAGE_ICONS = [
  ShieldCheck,
  Sparkles,
  Clock,
  MapPinned,
  Award,
  BadgeDollarSign,
  Headphones,
  Wallet,
];

export default async function HomePage() {
  const locale = await getLocale();
  const t = getDict(locale);

  const [vehicles, packages, testimonials, allPackages, gallery, articles] = await Promise.all([
    getFeaturedVehicles(),
    getFeaturedPackages(),
    getFeaturedTestimonials(8),
    getAllPackages(),
    getFeaturedGallery(5),
    getFeaturedArticles(4),
  ]);

  const galleryItems = gallery.length > 0
    ? gallery.map((g) => ({
        src: g.image_url,
        alt: g.caption,
        title: g.caption,
        location: g.location || t.gallery.defaultLocation,
      }))
    : staticGallery;

  return (
    <>
      <Hero />
      <Stats />
      <ServiceCards />
      <Advantages eyebrow={t.advantages.eyebrow} titleLead={t.advantages.titleLead} titleAccent={t.advantages.titleAccent} titleEnd={t.advantages.titleEnd} subtitle={t.advantages.subtitle} items={[...t.advantages.items]} />
      <FeaturedArmada vehicles={vehicles} eyebrow={t.featuredArmada.eyebrow} titleLead={t.featuredArmada.titleLead} titleAccent={t.featuredArmada.titleAccent} subtitle={t.featuredArmada.subtitle} />
      <FeaturedPackages packages={packages} allPackages={allPackages} eyebrow={t.featuredPaket.eyebrow} title={t.featuredPaket.title} subtitle={t.featuredPaket.subtitle} viewAll={t.featuredPaket.viewAll} />
      <section className="py-8 bg-wa-surface/40 text-center">
        <p className="text-sm font-semibold text-heading mb-4">{t.findCta.text}</p>
        <Link href="/temukan" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white transition-all hover:scale-[1.01] hover:bg-accent-hover active:scale-[0.98]">
          {t.findCta.button}
        </Link>
      </section>
      <FeaturedArticles articles={articles} eyebrow={t.featuredArtikel.eyebrow} title={t.featuredArtikel.title} subtitle={t.featuredArtikel.subtitle} viewAll={t.featuredArtikel.viewAll} />
      <ProcessSection />
      <GalleryShowcase items={galleryItems} eyebrow={t.gallery.eyebrow} title={t.gallery.title} subtitle={t.gallery.subtitle} view={t.gallery.view} viewAll={t.gallery.viewAll} tag={t.gallery.tag} />
      <FaqHome items={[...t.faqHome.items]} eyebrow={t.faqHome.eyebrow} title={t.faqHome.title} subtitle={t.faqHome.subtitle} viewAll={t.faqHome.viewAll} />
      <TestimonialCarousel testimonials={testimonials} />
      <CtaSection />
    </>
  );
}

function Advantages({ eyebrow, titleLead, titleAccent, titleEnd, subtitle, items }: { eyebrow: string; titleLead: string; titleAccent: string; titleEnd: string; subtitle: string; items: { title: string; text: string }[] }) {
  return (
    <section
      id="keunggulan"
      className="relative overflow-hidden border-y border-line bg-surface/60 py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
        <div className="mb-10 max-w-2xl md:mb-14">
          <span className="mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            {eyebrow}
          </span>
          <h2 className="mb-3 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading md:text-[44px]">
            {titleLead}{" "}
            <span className="text-accent">{titleAccent}</span> {titleEnd}
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-body-text md:text-base">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ title, text }, i) => {
            const Icon = ADVANTAGE_ICONS[i] ?? ShieldCheck;
            return (
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedArmada({ vehicles, eyebrow, titleLead, titleAccent, subtitle }: { vehicles: Awaited<ReturnType<typeof getFeaturedVehicles>>; eyebrow: string; titleLead: string; titleAccent: string; subtitle: string }) {
  return (
    <section
      id="armada"
      className="relative z-10 mx-auto w-full max-w-[1300px] px-5 py-16 sm:px-8 md:px-12 md:py-24"
    >
      <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-12">
        <div>
          <span className="mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            {eyebrow}
          </span>
          <h2 className="mb-2 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading md:text-[44px]">
            {titleLead}{" "}
            <span className="text-accent">{titleAccent}</span>
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-body-text">
            {subtitle}
          </p>
        </div>
      </div>

      <ArmadaShowcaseClient vehicles={vehicles} />
    </section>
  );
}

function FeaturedPackages({ packages, allPackages, eyebrow, title, subtitle, viewAll }: { packages: Awaited<ReturnType<typeof getFeaturedPackages>>; allPackages: Awaited<ReturnType<typeof getAllPackages>>; eyebrow: string; title: string; subtitle: string; viewAll: string }) {
  return (
    <section className="border-y border-line bg-surface/60 py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />
        <PackageCards packages={packages} forceMode="single" />
        <div className="mt-10 text-center">
          <Link href="/paket" className="text-link">
            {viewAll} ({allPackages.length})
            <span aria-hidden="true">?</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedArticles({ articles, eyebrow, title, subtitle, viewAll }: { articles: Awaited<ReturnType<typeof getLatestArticles>>; eyebrow: string; title: string; subtitle: string; viewAll: string }) {
  if (articles.length === 0) return null;
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />
        <ArticleCards articles={articles} forceMode="single" />
        <div className="mt-10 text-center">
          <Link href="/artikel" className="text-link">
            {viewAll}
            <span aria-hidden="true">?</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function GalleryShowcase({ items, eyebrow, title, subtitle, view, viewAll, tag }: { items: Array<{ src: string; alt: string; title: string; location: string }>; eyebrow: string; title: string; subtitle: string; view: string; viewAll: string; tag: string }) {
  if (items.length === 0) return null;
  const [first, ...rest] = items;
  const grid = rest.slice(0, 4);
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
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
                  {tag}
                </p>
                <p className="text-base font-extrabold leading-tight md:text-lg">
                  {first.title}
                </p>
              </div>
              <Link
                href="/galeri"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-[12px] font-extrabold text-accent transition-transform hover:scale-105"
              >
                {view}
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
            {viewAll}
            <span aria-hidden="true">?</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FaqHome({ items, eyebrow, title, subtitle, viewAll }: { items: { q: string; a: string }[]; eyebrow: string; title: string; subtitle: string; viewAll: string }) {
  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-[860px] px-5 py-16 sm:px-8 md:px-12 md:py-24"
    >
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
      />
      <FaqAccordion items={items.map((it, i) => ({ id: String(i + 1), question: it.q, answer: it.a }))} />
      <div className="mt-6 text-center">
        <Link
          href="/faq"
          className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
        >
          {viewAll} ?
        </Link>
      </div>
    </section>
  );
}
