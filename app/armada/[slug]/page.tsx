import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import VehicleCards from "@/components/VehicleCards";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import SectionHeading from "@/components/SectionHeading";
import { getRelatedVehicles, getVehicleBySlug, vehicles } from "@/data/vehicles";
import { formatIDR } from "@/lib/format";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { waVehicleLink } from "@/lib/whatsapp";
import { Check, MessageCircle } from "lucide-react";

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

      <section className="mx-auto w-full max-w-[1300px] px-5 pb-10 pt-28 sm:px-8 md:px-12 md:pt-32">
        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
          <Link href="/" className="transition-colors hover:text-primary">Beranda</Link>
          <span className="mx-2 text-line">/</span>
          <Link href="/armada" className="transition-colors hover:text-primary">Armada</Link>
          <span className="mx-2 text-line">/</span>
          <span className="text-primary">{vehicle.name}</span>
        </nav>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h1 className="mb-4 text-[clamp(26px,4vw,40px)] font-extrabold leading-[1.1] tracking-tight text-heading">
              Rental {vehicle.name}
            </h1>
            <p className="mb-5 max-w-xl text-sm leading-relaxed text-body-text md:text-base">
              di Cimahi, Bandung, dan Padalarang untuk kebutuhan keluarga,
              wisata, perjalanan dinas, maupun transfer.
            </p>
            <p className="mb-6 text-xl font-extrabold tracking-tight text-primary">
              {lease24
                ? `Mulai ${formatIDR(lease24)} / 24 jam`
                : driverPrice
                  ? `Charter mulai ${formatIDR(driverPrice)}`
                  : "Hubungi untuk harga"}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={waVehicleLink(vehicle.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Tanya via WhatsApp
              </a>
              <Link
                href="/armada"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3.5 text-sm font-bold text-heading transition-all hover:border-primary/50 hover:text-primary"
              >
                Bandingkan Unit Lain
              </Link>
            </div>
          </div>
          <Image
            src={vehicle.image}
            alt={`${vehicle.name} — ${SITE_NAME}`}
            width={1200}
            height={800}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-video w-full rounded-[24px] object-cover shadow-card"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1300px] px-5 py-10 sm:px-8 md:px-12">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="space-y-10 lg:col-span-3">
            <div className="rounded-[24px] border border-line bg-white p-6 shadow-card">
              <h2 className="text-h5 mb-4 text-heading">Harga Sewa</h2>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-line">
                    <td className="py-3 font-semibold text-body-text">Lepas Kunci 12 Jam</td>
                    <td className="py-3 text-right font-extrabold text-heading">
                      {lease12 ? formatIDR(lease12) : "Hubungi untuk harga"}
                    </td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="py-3 font-semibold text-body-text">Lepas Kunci 24 Jam</td>
                    <td className="py-3 text-right font-extrabold text-heading">
                      {lease24 ? formatIDR(lease24) : "Hubungi untuk harga"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-body-text">Dengan Driver</td>
                    <td className="py-3 text-right font-extrabold text-heading">
                      {driverPrice ? `Mulai ${formatIDR(driverPrice)}` : "Hubungi untuk penawaran"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="text-h5 mb-4 text-heading">Spesifikasi Singkat</h2>
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
              <h2 className="text-h5 mb-3 text-heading">Tentang Unit Ini</h2>
              {vehicle.description.map((paragraph, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-body-text md:text-base">{paragraph}</p>
              ))}
              <p className="mt-5 font-extrabold text-heading">Sangat cocok untuk:</p>
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
              <h2 className="text-h5 mb-4 text-heading">Fasilitas & Features</h2>
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
                <h2 className="text-h5 mb-4 text-heading">Galeri Mobil</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {vehicle.gallery.map((img, i) => (
                    <Image
                      key={img}
                      src={img}
                      alt={i === 0 ? `${vehicle.name} - tampilan luar` : `${vehicle.name} - tampilan dalam`}
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
              <h2 className="text-h5 mb-4 text-heading">Bagaimana Memesan?</h2>
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
                Tertarik menggunakan
              </p>
              <h2 className="mt-2 text-xl font-extrabold tracking-tight text-heading md:text-2xl">
                {vehicle.name}?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-body-text">
                Sebutkan tanggal dan durasi sewamu, tim kami cek ketersediaan unit.
              </p>
              <a
                href={waVehicleLink(vehicle.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Tanya via WhatsApp
              </a>
              <ul className="mt-5 space-y-2 text-xs font-bold text-muted">
                <li>✓ Respon cepat di jam operasional</li>
                <li>✓ Harga transparan tanpa biaya siluman</li>
                <li>✓ Unit bersih dan terawat</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-wa-surface/40 py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
          <SectionHeading eyebrow="Armada lain" title="Mungkin juga cocok buatmu." />
          <VehicleCards vehicles={related} />
        </div>
      </section>

      <CtaSection
        title={`Pesan ${vehicle.name} sekarang`}
        text="Konsultasi gratis via WhatsApp. Ceritakan tanggal dan tujuanmu, kami cek ketersediaan unit."
      />
    </>
  );
}
