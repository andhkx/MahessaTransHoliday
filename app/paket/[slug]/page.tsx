import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PackageCard from "@/components/PackageCard";
import FaqAccordion from "@/components/FaqAccordion";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import {
  getPackageBySlug,
  getRelatedPackages,
  packages,
} from "@/data/packages";
import { formatIDR } from "@/lib/format";
import { SITE_URL } from "@/lib/constants";
import { waPackageLink } from "@/lib/whatsapp";

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
      {
        "@type": "ListItem",
        position: 2,
        name: "Paket",
        item: `${SITE_URL}/paket`,
      },
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

      <section className="bg-wa-surface/50 pb-10 pt-[104px] lg:pb-14 lg:pt-[134px]">
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium text-body-text">
            <Link href="/" className="text-link">
              Beranda
            </Link>
            <span className="mx-2 text-line">/</span>
            <Link href="/paket" className="text-link">
              Paket
            </Link>
            <span className="mx-2 text-line">/</span>
            <span className="font-semibold text-primary">
              Hiace {packageItem.destination}
            </span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-[28px] font-bold leading-9 tracking-[-0.3px] text-primary md:text-h3 md:leading-9 lg:text-h4 lg:leading-8">
              Sewa Hiace {packageItem.destination} {packageItem.duration}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-body-text">
              Paket perjalanan all-in dengan Toyota Hiace untuk perjalanan dari{" "}
              {packageItem.serviceAreas.join(", ")}. Mobil, driver, BBM, tol,
              parkir
              {packageItem.included.includes("Tiket Penyeberangan")
                ? ", dan tiket penyeberangan"
                : ""}{" "}
              sudah termasuk dalam paket.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            <div className="space-y-10 lg:col-span-3">
              <div className="card flex flex-wrap items-center justify-between gap-4 p-6">
                <div>
                  <p className="text-sm font-medium text-body-text">Mulai dari</p>
                  <p className="text-h4 font-extrabold text-primary">
                    {formatIDR(packageItem.price)}
                  </p>
                  <span className="mt-2 inline-block rounded-md bg-wa-surface/50 px-3 py-1 text-caption font-medium uppercase text-body-text">
                    {packageItem.duration}
                  </span>
                </div>
                <a
                  href={waPackageLink(
                    `Hiace ${packageItem.destination} ${packageItem.duration}`,
                    packageItem.price,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-md"
                >
                  Tanya via WhatsApp
                </a>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="card p-6">
                  <h2 className="text-h6 font-bold text-primary">
                    Sudah Termasuk
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {packageItem.included.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-relaxed text-body-text"
                      >
                        <span
                          className="mt-0.5 shrink-0 font-bold text-success"
                          aria-hidden="true"
                        >
                          âœ“
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card p-6">
                  <h2 className="text-h6 font-bold text-primary">
                    Belum Termasuk
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {packageItem.excluded.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-relaxed text-body-text"
                      >
                        <span
                          className="mt-0.5 shrink-0 font-bold text-error"
                          aria-hidden="true"
                        >
                          âœ—
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-h5 font-bold text-primary">Deskripsi Paket</h2>
                {packageItem.description.map((paragraph, i) => (
                  <p
                    key={i}
                    className="mt-4 text-base leading-relaxed text-body-text"
                  >
                    {paragraph}
                  </p>
                ))}
                <p className="mt-4 text-sm text-body-text">
                  Durasi: {packageItem.duration} ({packageItem.durationHours} jam
                  mulai dari pickup).
                </p>
              </div>

              <div>
                <h2 className="text-h5 font-bold text-primary">Cocok Untuk</h2>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {packageItem.suitableFor.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg bg-primary/[0.06] px-4 py-2 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary/10"
                    >
                      âœ“ {item}
                    </li>
                  ))}
                </ul>
              </div>

              {packageItem.itinerary && (
                <div>
                  <h2 className="text-h5 font-bold text-primary">
                    Rute & Itinerary
                  </h2>
                  <ol className="mt-4 space-y-5 border-l-2 border-dashed border-secondary/50 pl-6">
                    {packageItem.itinerary.map((day) => (
                      <li key={day.day} className="relative">
                        <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-secondary bg-white" />
                        <p className="font-bold text-black">{day.day}</p>
                        <ul className="mt-2 space-y-1.5">
                          {day.activities.map((activity) => (
                            <li
                              key={activity}
                              className="text-sm leading-relaxed text-body-text"
                            >
                              â€“ {activity}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div id="faq-paket">
                <h2 className="text-h5 font-bold text-primary">
                  Pertanyaan Umum Paket Ini
                </h2>
                <div className="mt-4">
                  <FaqAccordion
                    items={packageItem.faq.map((f) => ({
                      id: f.q,
                      question: f.q,
                      answer: f.a,
                    }))}
                  />
                </div>
              </div>
            </div>

            <aside className="lg:col-span-2">
              <div className="card sticky top-24 p-6 shadow-elevated">
                <p className="text-sm font-medium text-body-text">Tertarik dengan</p>
                <h2 className="mt-1 text-h5 font-extrabold text-primary">
                  Paket Hiace {packageItem.destination}?
                </h2>
                <p className="mt-2 text-h4 font-extrabold text-primary">
                  {formatIDR(packageItem.price)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-body-text">
                  Sebutkan tanggal keberangkatan dan jumlah penumpang, tim kami
                  akan cek ketersediaan.
                </p>
                <a
                  href={waPackageLink(
                    `Hiace ${packageItem.destination} ${packageItem.duration}`,
                    packageItem.price,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-md mt-5 w-full"
                >
                  Tanya via WhatsApp
                </a>
                <ul className="mt-5 space-y-2 text-caption font-medium uppercase text-body-text">
                  <li>âœ“ Biaya jelas di awal</li>
                  <li>âœ“ Driver berpengalaman rute ini</li>
                  <li>âœ“ Bisa request itinerary custom</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-wa-surface/50 py-12 lg:py-20">
        <div className="container-site">
          <h2 className="mb-8 text-center text-[26px] font-bold tracking-[-0.3px] text-primary md:mb-10 md:text-h2 md:leading-[44px]">
            Paket lain yang mungkin cocok
          </h2>
          <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
            {related.map((item) => (
              <PackageCard
                key={item.id}
                packageItem={item}
                className="min-w-[270px] snap-start lg:min-w-0"
              />
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={`Pesan paket ${packageItem.destination} sekarang`}
        text="Kuota unit terbatas, terutama saat high season. Amankan jadwal perjalananmu lewat WhatsApp."
      />
    </>
  );
}
