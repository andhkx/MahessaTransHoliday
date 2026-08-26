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
      { "@type": "ListItem", position: 2, name: "Armada", item: `${SITE_URL}/armada` },
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

      <section className="bg-gradient-to-b from-mist to-white pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <Link href="/armada" className="hover:text-primary">
              Armada
            </Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-primary">{vehicle.name}</span>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                {vehicle.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                Rental {vehicle.name} di Cimahi, Bandung, dan Padalarang untuk
                kebutuhan keluarga, wisata, perjalanan dinas, maupun transfer.
              </p>
              <p className="mt-5 text-xl font-extrabold text-accent">
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
              className="aspect-[16/10] w-full rounded-3xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="space-y-10 lg:col-span-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-extrabold text-primary">
                  Harga Sewa
                </h2>
                <table className="mt-4 w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 font-semibold text-gray-600">
                        Lepas Kunci 12 Jam
                      </td>
                      <td className="py-3 text-right font-bold text-ink">
                        {lease12 ? formatIDR(lease12) : "Hubungi untuk harga"}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 font-semibold text-gray-600">
                        Lepas Kunci 24 Jam
                      </td>
                      <td className="py-3 text-right font-bold text-ink">
                        {lease24 ? formatIDR(lease24) : "Hubungi untuk harga"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-600">
                        Dengan Driver
                      </td>
                      <td className="py-3 text-right font-bold text-ink">
                        {driverPrice
                          ? `Mulai ${formatIDR(driverPrice)}`
                          : "Hubungi untuk penawaran"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-primary">
                  Spesifikasi Singkat
                </h2>
                <dl className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                  {vehicle.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between gap-4 border-b border-gray-100 px-5 py-3 last:border-b-0"
                    >
                      <dt className="text-sm font-semibold text-gray-600">
                        {spec.label}
                      </dt>
                      <dd className="text-sm font-bold text-ink">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-primary">
                  Deskripsi & Kegunaan
                </h2>
                {vehicle.description.map((paragraph, i) => (
                  <p
                    key={i}
                    className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
                <p className="mt-5 font-bold text-ink">Sangat cocok untuk:</p>
                <ul className="mt-2 space-y-1.5">
                  {vehicle.suitableFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-gray-600"
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
                <h2 className="text-xl font-extrabold text-primary">
                  Fasilitas & Features
                </h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {vehicle.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 rounded-xl bg-mist px-4 py-3 text-sm font-semibold text-gray-700"
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
                  <h2 className="text-xl font-extrabold text-primary">
                    Galeri Mobil
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {vehicle.gallery.map((img) => (
                      <Image
                        key={img}
                        src={img}
                        alt={`${vehicle.name} - foto ${img.split("-").pop()?.replace(".svg", "") === "2" ? "interior" : "eksterior"}`}
                        width={640}
                        height={420}
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="aspect-[16/10] w-full rounded-2xl object-cover shadow-sm"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-extrabold text-primary">
                  Bagaimana Memesan?
                </h2>
                <ol className="mt-4 space-y-3">
                  {orderSteps.map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 text-sm leading-relaxed text-gray-600">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="lg:col-span-2">
              <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                <p className="text-sm font-semibold text-gray-500">
                  Tertarik menggunakan
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-primary">
                  {vehicle.name}?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Tanyakan ketersediaan langsung ke tim kami. Sebutkan tanggal
                  dan durasi sewamu.
                </p>
                <a
                  href={waVehicleLink(vehicle.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-accent/30 transition-colors hover:bg-accent-dark"
                >
                  Tanya via WhatsApp
                </a>
                <ul className="mt-5 space-y-2 text-xs text-gray-500">
                  <li>✓ Respon cepat di jam kerja</li>
                  <li>✓ Harga transparan, tanpa biaya tersembunyi</li>
                  <li>✓ Unit bersih dan terawat</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-extrabold text-primary sm:text-3xl">
            Kendaraan lain yang mungkin cocok
          </h2>
          <div className="-mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
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
