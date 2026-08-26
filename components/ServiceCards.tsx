import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const serviceImages: Record<string, string> = {
  "rental-mobil": "/images/vehicles/honda-brio.svg",
  "mobil-driver": "/images/vehicles/toyota-innova-reborn.svg",
  "charter-transfer": "/images/vehicles/toyota-hiace-premio.svg",
  "paket-wisata": "/images/packages/hiace-bandung.svg",
};

export default function ServiceCards() {
  return (
    <section className="border-t border-line bg-white py-12 lg:py-16">
      <div className="container-site">
        <SectionHeading
          align="left"
          eyebrow="Layanan Kami"
          title="Butuh perjalanan seperti apa?"
          subtitle="Pilih solusi yang sesuai dengan kebutuhan perjalanan kamu."
        />
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 lg:mx-0 lg:grid lg:grid-cols-4 lg:px-0">
          {services.map((service, i) => (
            <Reveal
              key={service.id}
              delay={(i % 4) as 0 | 1 | 2 | 3}
              className="w-[280px] shrink-0 snap-start sm:w-[300px] lg:w-auto"
            >
              <article className="card card-lift group flex h-full flex-col overflow-hidden">
                <Image
                  src={serviceImages[service.id]}
                  alt={service.title}
                  width={560}
                  height={320}
                  sizes="(max-width: 1024px) 80vw, 25vw"
                  className="aspect-video w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-extrabold tracking-[-0.4px] text-accent">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm font-semibold leading-relaxed tracking-[-0.2px] text-body-text">
                    {service.text}
                  </p>
                  <Link
                    href={service.ctaHref}
                    className="text-link mt-4 text-sm"
                    aria-label={`${service.ctaLabel} - ${service.title}`}
                  >
                    {service.ctaLabel}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-150 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-3 text-center text-xs font-bold text-muted lg:hidden">
          Geser untuk melihat layanan lainnya →
        </p>
      </div>
    </section>
  );
}
