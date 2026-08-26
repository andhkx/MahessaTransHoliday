import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PackageCards from "@/components/PackageCards";
import FaqAccordion from "@/components/FaqAccordion";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import SectionHeading from "@/components/SectionHeading";
import {
  getPackageBySlug,
  getRelatedPackages,
  packages,
} from "@/data/packages";
import { formatIDR } from "@/lib/format";
import { SITE_URL } from "@/lib/constants";
import { waPackageLink } from "@/lib/whatsapp";
import { Check, MessageCircle, X } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return packages.map((packageItem) => ({ slug: packageItem.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/paket/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const packageItem = getPackageBySlug(slug);
  if (!packageItem) return {};
  return {
    title: packageItem.seo.title,
    description: packageItem.seo.description,
    keywords: packageItem.seo.keywords,
    alternates: { canonical: `/paket/${packageItem.slug}` },
    openGraph: {
      title: packageItem.seo.title,
      description: packageItem.seo.description,
      images: [packageItem.image],
    },
  };
}

export default async function PackageDetailPage({
  params,
}: PageProps<"/paket/[slug]">) {
  const { slug } = await params;
  const packageItem = getPackageBySlug(slug);
  if (!packageItem) notFound();

  const related = getRelatedPackages(packageItem.slug);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Paket", item: `${SITE_URL}/paket` },
      {
        "@type": "ListItem",
        position: 3,
        name: `Sewa Hiace ${packageItem.destination}`,
        item: `${SITE_URL}/paket/${packageItem.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />

      <section className="mx-auto w-full max-w-[1300px] px-5 pb-10 pt-28 sm:px-8 md:px-12 md:pt-32">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted"
        >
          <Link href="/" className="transition-colors hover:text-primary">
            Beranda
          </Link>
          <span className="mx-2 text-line">/</span>
          <Link href="/paket" className="transition-colors hover:text-primary">
            Paket
          </Link>
          <span className="mx-2 text-line">/</span>
          <span className="text-primary">Hiace {packageItem.destination}</span>
        </nav>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h1 className="mb-4 text-[clamp(26px,4vw,40px)] font-extrabold leading-[1.1] tracking-tight text-heading">
              Sewa Hiace {packageItem.destination} {packageItem.duration}
            </h1>
            <p className="mb-5 max-w-xl text-sm leading-relaxed text-body-text md:text-base">
              Paket perjalanan all-in dari {packageItem.serviceAreas.join(", ")}.
              Mobil, driver, BBM, tol, parkir
              {packageItem.included.includes("Tiket Penyeberangan")
                ? ", dan tiket penyeberangan"
                : ""}{" "}
              sudah termasuk.
            </p>
            <p className="mb-6 text-xl font-extrabold tracking-tight text-primary">
              Mulai {formatIDR(packageItem.price)}
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
                Tanya via WhatsApp
              </a>
              <Link
                href="#detail-paket"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3.5 text-sm font-bold text-heading transition-all hover:border-primary/50 hover:text-primary"
              >
                Detail Paket
              </Link>
            </div>
          </div>
          <Image
            src={packageItem.image}
            alt={`Paket Hiace ${packageItem.destination}`}
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
        className="mx-auto w-full max-w-[1300px] px-5 py-10 sm:px-8 md:px-12"
      >
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="space-y-10 lg:col-span-3">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-[24px] border border-line bg-white p-6 shadow-card">
                <h2 className="text-h6 mb-4 uppercase tracking-wide text-success">
                  Sudah Termasuk
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
                  Belum Termasuk
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
              <h2 className="text-h5 mb-3 text-heading">Deskripsi Paket</h2>
              {packageItem.description.map((paragraph, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-body-text md:text-base">
                  {paragraph}
                </p>
              ))}
              <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                Durasi: {packageItem.duration} · {packageItem.durationHours} jam dari pickup
              </p>
            </div>

            <div>
              <h2 className="text-h5 mb-4 text-heading">Cocok Untuk</h2>
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
                <h2 className="text-h5 mb-4 text-heading">Rute &amp; Itinerary</h2>
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

            <div id="faq-paket">
              <h2 className="text-h5 mb-4 text-heading">Pertanyaan Umum Paket Ini</h2>
              <FaqAccordion
                items={packageItem.faq.map((f) => ({
                  id: f.q,
                  question: f.q,
                  answer: f.a,
                }))}
              />
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="card sticky top-24 p-6 shadow-card">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Tertarik dengan
              </p>
              <h2 className="mt-2 text-xl font-extrabold tracking-tight text-heading md:text-2xl">
                Paket Hiace {packageItem.destination}?
              </h2>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-primary">
                Mulai {formatIDR(packageItem.price)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-body-text">
                Sebutkan tanggal keberangkatan dan jumlah penumpang, tim kami cek
                ketersediaan.
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
                Tanya via WhatsApp
              </a>
              <ul className="mt-5 space-y-2 text-xs font-bold text-muted">
                <li>✓ Biaya jelas di awal</li>
                <li>✓ Driver berpengalaman rute ini</li>
                <li>✓ Bisa request itinerary custom</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-wa-surface/40 py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
          <SectionHeading eyebrow="Paket lain" title="Mungkin juga cocok buatmu." />
          <PackageCards packages={related} />
        </div>
      </section>

      <CtaSection
        title={`Pesan paket ${packageItem.destination} sekarang`}
        text="Kuota unit terbatas, terutama saat high season. Amankan jadwal perjalananmu lewat WhatsApp."
      />
    </>
  );
}
