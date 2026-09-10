

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import VehicleCards from "@/components/VehicleCards";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import SectionHeading from "@/components/SectionHeading";
import { getVehicleBySlug, getRelatedVehicles } from "@/lib/data/supabase/vehicles";
import { formatIDR } from "@/lib/format";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { waVehicleLink } from "@/lib/whatsapp";
import { Check, MessageCircle } from "lucide-react";
import { getLocale, getDict } from "@/lib/i18n/server";
import { hreflang } from "@/lib/i18n/seo";


export const dynamic = 'force-dynamic';
export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return {};
  const isEn = locale === "en";
  const title = isEn && vehicle.name ? `${vehicle.name} rental` : vehicle.seo.title;
  const description = isEn && vehicle.pricing.startingPrice
    ? `${vehicle.name} rental starting from ${formatIDR(vehicle.pricing.startingPrice)} / 12 hours in Cimahi, Bandung, and Padalarang.`
    : vehicle.seo.description;
  return {
    title,
    description,
    keywords: vehicle.seo.keywords,
    alternates: hreflang(`/armada/${vehicle.slug}`),
    openGraph: {
      title,
      description,
      images: [vehicle.image],
    },
  };
}

export default async function VehicleDetailPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const isEn = locale === "en";
  const t = getDict(locale);
  const tArmada = t.detail.armada;
  const orderSteps = tArmada.orderSteps;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) {
    console.error(`[armada/[slug]] ${tArmada.notFound}: "${slug}"`);
    notFound();
  }

  const related = await getRelatedVehicles(vehicle.slug);
  const startingPrice = vehicle.pricing.startingPrice;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: isEn ? tArmada.breadcrumbFleet : "Armada", item: `${SITE_URL}/armada` },
      {
        "@type": "ListItem",
        position: 3,
        name: vehicle.name,
        item: `${SITE_URL}/armada/${vehicle.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />

      <section className="detail-enter mx-auto w-full max-w-[1300px] px-5 pb-10 pt-28 sm:px-8 md:px-12 md:pt-32">
        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
          <Link href="/" className="transition-colors hover:text-primary">{isEn ? "Home" : "Beranda"}</Link>
          <span className="mx-2 text-line">/</span>
          <Link href="/armada" className="transition-colors hover:text-primary">{tArmada.breadcrumbFleet}</Link>
          <span className="mx-2 text-line">/</span>
          <span className="text-primary">{vehicle.name}</span>
        </nav>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h1 className="mb-4 text-[clamp(26px,4vw,40px)] font-extrabold leading-[1.1] tracking-tight text-heading">
              {isEn ? `Rental ${vehicle.name}` : `Rental ${vehicle.name}`}
            </h1>
            <p className="mb-5 max-w-xl text-sm leading-relaxed text-body-text md:text-base">
              {tArmada.heroSub}
            </p>
            <p className="mb-6 text-xl font-extrabold tracking-tight text-primary">
              {startingPrice
                ? isEn
                  ? `From ${formatIDR(startingPrice)} / 12 hours`
                  : `Mulai ${formatIDR(startingPrice)} / 12 jam`
                : tArmada.callForPrice}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={waVehicleLink(vehicle.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]"
              >
                <MessageCircle size={16} aria-hidden="true" />
                {tArmada.askWa}
              </a>
              <Link
                href="/armada"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3.5 text-sm font-bold text-heading transition-all hover:border-primary/50 hover:text-primary"
              >
                {tArmada.compare}
              </Link>
            </div>
          </div>
          <Image
            src={vehicle.image}
            alt={`${vehicle.name} - ${SITE_NAME}`}
            width={1200}
            height={800}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-video w-full rounded-[24px] object-cover shadow-card"
          />
        </div>
      </section>

      <section className="detail-enter-2 mx-auto w-full max-w-[1300px] px-5 py-10 sm:px-8 md:px-12">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="space-y-10 lg:col-span-3">
            <div className="rounded-[24px] border border-line bg-white p-6 shadow-card">
              <h2 className="text-h5 mb-4 text-heading">{tArmada.priceTableTitle}</h2>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-3 font-semibold text-body-text">{tArmada.withDriver}</td>
                    <td className="py-3 text-right font-extrabold text-heading">
                      {startingPrice
                        ? isEn
                          ? `From ${formatIDR(startingPrice)} / 12 hours`
                          : `Mulai ${formatIDR(startingPrice)} / 12 jam`
                        : tArmada.callForQuote}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="text-h5 mb-4 text-heading">{tArmada.specTitle}</h2>
              <dl className="overflow-hidden rounded-[18px] border border-line bg-white">
                {vehicle.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-4 border-b border-line px-5 py-3 last:border-b-0">
                    <dt className="text-sm font-semibold text-body-text">{spec.label}</dt>
                    <dd className="text-sm font-extrabold text-heading">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="text-h5 mb-3 text-heading">{tArmada.aboutTitle}</h2>
              {vehicle.description.map((paragraph, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-body-text md:text-base">{paragraph}</p>
              ))}
              <p className="mt-5 font-extrabold text-heading">{tArmada.suitableLead}</p>
              <ul className="mt-2 space-y-2">
                {vehicle.suitableFor.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-body-text">
                    <Check size={15} className="shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-h5 mb-4 text-heading">{tArmada.featuresTitle}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {vehicle.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 rounded-[14px] border border-line bg-white px-4 py-3 text-sm font-bold text-body-text transition-colors duration-300 hover:border-primary/40">
                    <Check size={15} className="shrink-0 text-primary" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {vehicle.gallery.length > 1 && (
              <div>
                <h2 className="text-h5 mb-4 text-heading">{tArmada.galleryTitle}</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {vehicle.gallery.map((img, i) => (
                    <Image
                      key={img}
                      src={img}
                      alt={i === 0 ? `${vehicle.name} - ${isEn ? "exterior view" : "tampilan luar"}` : `${vehicle.name} - ${isEn ? "interior view" : "tampilan dalam"}`}
                      width={640}
                      height={400}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="aspect-video w-full rounded-[16px] object-cover shadow-card"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-[24px] border border-line bg-white p-6 shadow-card">
              <h2 className="text-h5 mb-4 text-heading">{tArmada.orderTitle}</h2>
              <ol className="space-y-3">
                {orderSteps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[11px] font-extrabold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-sm leading-relaxed text-body-text">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="card sticky top-24 p-6 shadow-card">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                {tArmada.interestedLead}
              </p>
              <h2 className="mt-2 text-xl font-extrabold tracking-tight text-heading md:text-2xl">
                {vehicle.name}?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-body-text">
                {tArmada.interestedSub}
              </p>
              <a
                href={waVehicleLink(vehicle.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]"
              >
                <MessageCircle size={16} aria-hidden="true" />
                {tArmada.askWa}
              </a>
              <ul className="mt-5 space-y-2 text-xs font-bold text-muted">
                <li>✓ {tArmada.perkResp}</li>
                <li>✓ {tArmada.perkTransparent}</li>
                <li>✓ {tArmada.perkClean}</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-wa-surface/40 py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
          <SectionHeading eyebrow={tArmada.relatedEyebrow} title={tArmada.relatedTitle} />
          <VehicleCards vehicles={related} />
        </div>
      </section>

      <CtaSection
        title={isEn ? `Book ${vehicle.name} now` : `Pesan ${vehicle.name} sekarang`}
        text={tArmada.ctaText}
      />
    </>
  );
}