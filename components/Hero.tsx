import Image from "next/image";
import Link from "next/link";
import { SERVICE_AREAS } from "@/lib/constants";
import { vehicles } from "@/data/vehicles";
import { packages } from "@/data/packages";
import { waGeneralLink } from "@/lib/whatsapp";

const heroChips = [
  "Lepas Kunci 12/24 Jam",
  "Mobil + Driver",
  "Charter & Transfer",
  "Paket Wisata",
];

export default function Hero() {
  return (
    <section className="bg-white pb-10 pt-10 lg:pb-16 lg:pt-14">
      <div className="container-site">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1">
            <h1 className="h-display max-w-[520px] text-balance text-accent">
              rental mobil &amp; perjalanan wisata nyaman buat kamu di{" "}
              <span className="text-primary">{SERVICE_AREAS.join(", ")}</span>
            </h1>
            <p className="mt-4 max-w-[520px] text-sm font-bold leading-relaxed tracking-[-0.35px] text-body-text lg:text-base">
              Dari rental lepas kunci, mobil dengan driver, charter antar-jemput,
              hingga paket wisata dan perjalanan dinas — Mahessa Trans Holiday
              siap menemani perjalananmu.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={waGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-md"
              >
                Konsultasi Gratis
              </a>
              <Link href="/armada" className="btn btn-secondary btn-md">
                Lihat Armada
              </Link>
            </div>
            <div class-name="" />
          </div>

          <div className="order-1 lg:order-2">
            <Image
              src="/images/vehicles/toyota-hiace-premio.svg"
              alt="Toyota Hiace Premio — armada Mahessa Trans Holiday"
              width={1200}
              height={800}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full rounded-[24px] object-cover shadow-card"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {heroChips.map((chip) => (
            <span key={chip} className="chip">
              {chip}
            </span>
          ))}
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-primary">
              Unit Armada
            </dt>
            <dd className="mt-1 text-[32px] font-extrabold tracking-[-0.9px] text-accent">
              {vehicles.length}+
            </dd>
            <dd className="text-xs font-semibold text-muted">Siap sewa harian</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-primary">
              Paket Wisata
            </dt>
            <dd className="mt-1 text-[32px] font-extrabold tracking-[-0.9px] text-accent">
              {packages.length}
            </dd>
            <dd className="text-xs font-semibold text-muted">Destinasi all-in</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-primary">
              Area Layanan
            </dt>
            <dd className="mt-1 text-[32px] font-extrabold tracking-[-0.9px] text-accent">
              3 Kota
            </dd>
            <dd className="text-xs font-semibold text-muted">
              Cimahi, Bandung, Padalarang
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-primary">
              Respon Admin
            </dt>
            <dd className="mt-1 text-[32px] font-extrabold tracking-[-0.9px] text-accent">
              Cepat
            </dd>
            <dd className="text-xs font-semibold text-muted">via WhatsApp</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
