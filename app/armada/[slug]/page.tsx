import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import VehicleCard, {
  vehiclePriceLine,
} from "@/components/VehicleCard";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import { getRelatedVehicles, getVehicleBySlug, vehicles } from "@/data/vehicles";
import { formatIDR } from "@/lib/format";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { waVehicleLink } from "@/lib/whatsapp";

export const dynamicParams = false;

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/armada/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return {};
  return {
    title: vehicle.seo.title,
    description: vehicle.seo.description,
    keywords: vehicle.seo.keywords,
    alternates: { canonical: `/armada/${vehicle.slug}` },
    openGraph: {
      title: vehicle.seo.title,
      description: vehicle.seo.description,
      images: [vehicle.image],
    },
  };
}

const orderSteps = [
  "Hubungi via WhatsApp dengan detail perjalanan (tanggal, durasi, tujuan)",
  "Tim kami konfirmasi ketersediaan dan harga",
  "Serah terima kunci (atau berangkat dengan driver)",
  "Nikmati perjalanan!",
];

export default async function VehicleDetailPage({
  params,
}: PageProps<"/armada/[slug]">) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const related = getRelatedVehicles(vehicle.slug);
  const lease12 = vehicle.pricing.leaseKey["12h"];
  const lease24 = vehicle.pricing.leaseKey["24h"];
  const driverPrice = vehicle.pricing.withDriver.startingPrice;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Armada",
        item: `${SITE_URL}/armada`,
      },
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

      <section className="bg-surface pb-10 pt-[104px] lg:pb-14 lg:pt-[134px]">
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium text-body-text">
            <Link href="/" className="text-link">
              Beranda
            </Link>
            <span className="mx-2 text-line">/</span>
            <Link href="/armada" className="text-link">
              Armada
            </Link>
            <span className="mx-2 text-line">/</span>
            <span className="font-semibold text-primary">{vehicle.name}</span>
          </nav>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h1 className="text-[28px] font-bold leading-9 tracking-[-0.3px] text-primary md:text-h3 md:leading-9 lg:text-h4 lg:leading-8">
                {vehicle.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-body-text">
                Rental {vehicle.name} di Cimahi, Bandung, dan Padalarang untuk
                kebutuhan keluarga, wisata, perjalanan dinas, maupun transfer.
              </p>
              <p className="mt-5 text-h5 font-bold text-accent md:text-h4">
                {vehiclePriceLine(vehicle)}
              </p>
            </div>
            <Image
              src={vehicle.image}
              alt={`${vehicle.name} — ${SITE_NAME}`}
              width={1200}
              height={800}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-video w-full rounded-xl object-cover shadow-photo"
            />
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            <div className="space-y-10 lg:col-span-3">
              <div className="card p-6">
                <h2 className="text-h5 font-bold text-primary">Harga Sewa</h2>
                <table className="mt-4 w-full text-sm">
                  <tbody>
                    <tr className="border-b border-surface">
                      <td className="py-3 font-medium text-body-text">
                        Lepas Kunci 12 Jam
                      </td>
                      <td className="py-3 text-right font-bold text-black">
                        {lease12 ? formatIDR(lease12) : "Hubungi untuk harga"}
                      </td>
                    </tr>
                    <tr className="border-b border-surface">
                      <td className="py-3 font-medium text-body-text">
                        Lepas Kunci 24 Jam
                      </td>
                      <td className="py-3 text-right font-bold text-black">
                        {lease24 ? formatIDR(lease24) : "Hubungi untuk harga"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-body-text">
                        Dengan Driver
                      </td>
                      <td className="py-3 text-right font-bold text-black">
                        {driverPrice
                          ? `Mulai ${formatIDR(driverPrice)}`
                          : "Hubungi untuk penawaran"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h2 className="text-h5 font-bold text-primary">
                  Spesifikasi Singkat
                </h2>
                <dl className="card mt-4 overflow-hidden">
                  {vehicle.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between gap-4 border-b border-surface px-5 py-3 last:border-b-0"
                    >
                      <dt className="text-sm font-medium text-body-text">
                        {spec.label}
                      </dt>
                      <dd className="text-sm font-bold text-black">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h2 className="text-h5 font-bold text-primary">
                  Deskripsi & Kegunaan
                </h2>
                {vehicle.description.map((paragraph, i) => (
                  <p
                    key={i}
                    className="mt-4 text-base leading-relaxed text-body-text"
                  >
                    {paragraph}
                  </p>
                ))}
                <p className="mt-5 font-semibold text-black">
                  Sangat cocok untuk:
                </p>
                <ul className="mt-2 space-y-2">
                  {vehicle.suitableFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-body-text"
                    >
                      <span className="text-accent" aria-hidden="true">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-h5 font-bold text-primary">
                  Fasilitas & Features
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {vehicle.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 rounded-lg border border-surface bg-white px-4 py-3 text-sm font-medium text-ink-soft transition-shadow duration-200 hover:shadow-card"
                    >
                      <span className="text-accent" aria-hidden="true">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {vehicle.gallery.length > 1 && (
                <div>
                  <h2 className="text-h5 font-bold text-primary">Galeri Mobil</h2>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {vehicle.gallery.map((img, i) => (
                      <Image
                        key={img}
                        src={img}
                        alt={
                          i === 0
                            ? `${vehicle.name} - tampilan luar`
                            : `${vehicle.name} - tampilan dalam`
                        }
                        width={640}
                        height={400}
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="aspect-video w-full rounded-xl object-cover shadow-card"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="card p-6">
                <h2 className="text-h5 font-bold text-primary">
                  Bagaimana Memesan?
                </h2>
                <ol className="mt-4 space-y-3">
                  {orderSteps.map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 text-sm leading-relaxed text-body-text">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="lg:col-span-2">
              <div className="card sticky top-24 p-6 shadow-elevated">
                <p className="text-sm font-medium text-body-text">
                  Tertarik menggunakan
                </p>
                <h2 className="mt-1 text-h5 font-extrabold text-primary">
                  {vehicle.name}?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-body-text">
                  Tanyakan ketersediaan langsung ke tim kami. Sebutkan tanggal
                  dan durasi sewamu.
                </p>
                <a
                  href={waVehicleLink(vehicle.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-md mt-5 w-full"
                >
                  Tanya via WhatsApp
                </a>
                <ul className="mt-5 space-y-2 text-caption font-medium uppercase text-body-text">
                  <li>✓ Respon cepat di jam kerja</li>
                  <li>✓ Harga transparan</li>
                  <li>✓ Unit bersih dan terawat</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 lg:py-20">
        <div className="container-site">
          <h2 className="mb-8 text-center text-[26px] font-bold tracking-[-0.3px] text-primary md:mb-10 md:text-h2 md:leading-[44px]">
            Kendaraan lain yang mungkin cocok
          </h2>
          <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
            {related.map((item) => (
              <VehicleCard
                key={item.id}
                vehicle={item}
                className="min-w-[270px] snap-start lg:min-w-0"
              />
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={`Pesan ${vehicle.name} sekarang`}
        text="Konsultasi gratis via WhatsApp. Ceritakan tanggal dan tujuanmu, kami cek ketersediaan unit."
      />
    </>
  );
}
