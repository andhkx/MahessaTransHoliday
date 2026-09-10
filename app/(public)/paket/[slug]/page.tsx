

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PackageCards from "@/components/PackageCards";
import FaqAccordion from "@/components/FaqAccordion";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import SectionHeading from "@/components/SectionHeading";
import { getPackageBySlug, getRelatedPackages } from "@/lib/data/supabase/packages";
import { formatIDR } from "@/lib/format";
import { SITE_URL } from "@/lib/constants";
import { waPackageLink } from "@/lib/whatsapp";
import { Check, MessageCircle, X } from "lucide-react";
import { getLocale, getDict } from "@/lib/i18n/server";
import { hreflang } from "@/lib/i18n/seo";


export const dynamic = 'force-dynamic';
export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const isEn = locale === "en";
  const packageItem = await getPackageBySlug(slug);
  if (!packageItem) return {};
  const ogParams = new URLSearchParams({
    title: packageItem.destination,
    subtitle: isEn
      ? `Hiace Package ${packageItem.destination} · ${packageItem.duration}`
      : `Paket ${packageItem.destination} · ${packageItem.duration}`,
    price: packageItem.price > 0 ? (isEn ? `From ${formatIDR(packageItem.price)}` : `Mulai ${formatIDR(packageItem.price)}`) : '',
    badge: packageItem.badge || '',
  });
  const ogImage = `/api/og?${ogParams.toString()}`;
  return {
    title: packageItem.seo.title,
    description: packageItem.seo.description,
    keywords: packageItem.seo.keywords,
    alternates: hreflang(`/paket/${packageItem.slug}`),
    openGraph: {
      title: packageItem.seo.title,
      description: packageItem.seo.description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function PackageDetailPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const isEn = locale === "en";
  const t = getDict(locale);
  const tPaket = t.detail.paket;
  const packageItem = await getPackageBySlug(slug);
  if (!packageItem) {
    console.error(`[paket/[slug]] ${tPaket.notFound}: "${slug}"`);
    notFound();
  }

  const related = await getRelatedPackages(packageItem.slug);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: tPaket.breadcrumbPackage, item: `${SITE_URL}/paket` },
      {
        "@type": "ListItem",
        position: 3,
        name: isEn ? `Hiace Rental ${packageItem.destination}` : `Sewa Hiace ${packageItem.destination}`,
        item: `${SITE_URL}/paket/${packageItem.slug}`,
      },
    ],
  };

  return (
    <div key={packageItem.slug}>
      <JsonLd data={breadcrumbLd} />

      <section className="detail-enter mx-auto w-full max-w-[1300px] px-5 pb-10 pt-28 sm:px-8 md:px-12 md:pt-32">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted"
        >
          <Link href="/" className="transition-colors hover:text-primary">
            {isEn ? "Home" : "Beranda"}
          </Link>
          <span className="mx-2 text-line">/</span>
          <Link href="/paket" className="transition-colors hover:text-primary">
            {tPaket.breadcrumbPackage}
          </Link>
          <span className="mx-2 text-line">/</span>
          <span className="text-primary">Hiace {packageItem.destination}</span>
        </nav>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h1 className="mb-4 text-[clamp(26px,4vw,40px)] font-extrabold leading-[1.1] tracking-tight text-heading">
              {isEn
                ? `Hiace Rental ${packageItem.destination} ${packageItem.duration}`
                : `Sewa Hiace ${packageItem.destination} ${packageItem.duration}`}
            </h1>
            <p className="mb-5 max-w-xl text-sm leading-relaxed text-body-text md:text-base">
              {isEn
                ? `All-in travel package from ${packageItem.serviceAreas.join(", ")}. Vehicle, driver, fuel${packageItem.included.includes("Tiket Penyeberangan") ? ", and ferry tickets" : ""} included.`
                : `Paket perjalanan all-in dari ${packageItem.serviceAreas.join(", ")}. Mobil, driver, BBM${packageItem.included.includes("Tiket Penyeberangan") ? ", dan tiket penyeberangan" : ""} sudah termasuk.`}
            </p>
            <p className="mb-6 text-xl font-extrabold tracking-tight text-primary">
              {isEn ? `From ${formatIDR(packageItem.price)}` : `Mulai ${formatIDR(packageItem.price)}`}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={waPackageLink(
                  `Hiace ${packageItem.destination} ${packageItem.duration}`,
                  packageItem.price,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]"
              >
                <MessageCircle size={16} aria-hidden="true" />
                {tPaket.askWa}
              </a>
              <Link
                href="#detail-paket"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3.5 text-sm font-bold text-heading transition-all hover:border-primary/50 hover:text-primary"
              >
                {tPaket.seeDetails}
              </Link>
            </div>
          </div>
          <Image
            src={packageItem.image}
            alt={isEn ? `Hiace Package ${packageItem.destination}` : `Paket Hiace ${packageItem.destination}`}
            width={1200}
            height={800}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-video w-full rounded-[24px] object-cover shadow-card"
          />
        </div>
      </section>

      <section
        id="detail-paket"
        className="detail-enter-2 mx-auto w-full max-w-[1300px] px-5 py-10 sm:px-8 md:px-12"
      >
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="space-y-10 lg:col-span-3">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-[24px] border border-line bg-white p-6 shadow-card">
                <h2 className="text-h6 mb-4 uppercase tracking-wide text-success">
                  {tPaket.includedTitle}
                </h2>
                <ul className="space-y-2.5">
                  {packageItem.included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-body-text"
                    >
                      <Check size={15} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[24px] border border-line bg-white p-6 shadow-card">
                <h2 className="text-h6 mb-4 uppercase tracking-wide text-error">
                  {tPaket.excludedTitle}
                </h2>
                <ul className="space-y-2.5">
                  {packageItem.excluded.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-body-text"
                    >
                      <X size={15} className="mt-0.5 shrink-0 text-error" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-h5 mb-3 text-heading">{tPaket.descriptionTitle}</h2>
              {packageItem.description.map((paragraph, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-body-text md:text-base">
                  {paragraph}
                </p>
              ))}
              <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                {isEn
                  ? `Duration: ${packageItem.duration} · ${packageItem.durationHours} hours from pickup`
                  : `Durasi: ${packageItem.duration} · ${packageItem.durationHours} jam dari pickup`}
              </p>
            </div>

            <div>
              <h2 className="text-h5 mb-4 text-heading">{tPaket.suitableTitle}</h2>
              <ul className="flex flex-wrap gap-2">
                {packageItem.suitableFor.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-body-text transition-colors duration-300 hover:border-primary/50 hover:text-primary"
                  >
                    ✓ {item}
                  </li>
                ))}
              </ul>
            </div>

            {packageItem.itinerary && (
              <div>
                <h2 className="text-h5 mb-4 text-heading">{tPaket.itineraryTitle}</h2>
                <ol className="space-y-5 border-l-2 border-dashed border-primary/40 pl-6">
                  {packageItem.itinerary.map((day) => (
                    <li key={day.day} className="relative">
                      <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-white" />
                      <p className="font-extrabold text-heading">{day.day}</p>
                      <ul className="mt-2 space-y-1.5">
                        {day.activities.map((activity) => (
                          <li key={activity} className="text-sm leading-relaxed text-body-text">
                            – {activity}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {packageItem.faq.length > 0 && (
              <div id="faq-paket">
                <h2 className="text-h5 mb-4 text-heading">{tPaket.faqTitle}</h2>
                <FaqAccordion
                  items={packageItem.faq.map((f: { q: string; a: string }, i: number) => ({
                    id: `${packageItem.slug}-${i}`,
                    question: f.q,
                    answer: f.a,
                  }))}
                />
              </div>
            )}
          </div>

          <aside className="lg:col-span-2">
            <div className="card sticky top-24 p-6 shadow-card">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                {tPaket.interestedLead}
              </p>
              <h2 className="mt-2 text-xl font-extrabold tracking-tight text-heading md:text-2xl">
                {isEn ? `Hiace Package ${packageItem.destination}?` : `Paket Hiace ${packageItem.destination}?`}
              </h2>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-primary">
                {isEn ? `From ${formatIDR(packageItem.price)}` : `Mulai ${formatIDR(packageItem.price)}`}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-body-text">
                {tPaket.interestedSub}
              </p>
              <a
                href={waPackageLink(
                  `Hiace ${packageItem.destination} ${packageItem.duration}`,
                  packageItem.price,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]"
              >
                <MessageCircle size={16} aria-hidden="true" />
                {tPaket.askWa}
              </a>
              <ul className="mt-5 space-y-2 text-xs font-bold text-muted">
                <li>✓ {tPaket.perkClear}</li>
                <li>✓ {tPaket.perkDriver}</li>
                <li>✓ {tPaket.perkCustom}</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-wa-surface/40 py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
          <SectionHeading eyebrow={tPaket.relatedEyebrow} title={tPaket.relatedTitle} />
          <PackageCards packages={related} />
        </div>
      </section>

      <CtaSection
        title={isEn ? `Book ${packageItem.destination} package now` : `Pesan paket ${packageItem.destination} sekarang`}
        text={tPaket.ctaText}
      />
    </div>
  );
}