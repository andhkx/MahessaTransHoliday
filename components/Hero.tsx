import Image from "next/image";
import Link from "next/link";
import { SERVICE_AREAS } from "@/lib/constants";
import { waGeneralLink } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist to-white pt-28 pb-16 sm:pt-32 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              Rental & Wisata · {SERVICE_AREAS.join(" · ")}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl xl:text-6xl">
              Perjalanan nyaman,{" "}
              <span className="text-accent">kendaraan siap</span> menemani.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Rental mobil lepas kunci, dengan driver, charter, hingga
              perjalanan wisata dan perjalanan dinas dari Cimahi, Bandung &
              Padalarang.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/30 transition-colors hover:bg-accent-dark"
              >
                Konsultasi via WhatsApp
              </a>
              <Link
                href="/armada"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary px-7 py-3.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Lihat Armada
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/5 rotate-2" />
            <Image
              src="/images/vehicles/toyota-avanza.svg"
              alt="Toyota Avanza New TSS G — armada Mahessa Trans Holiday"
              width={1200}
              height={800}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full rounded-[2rem] object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
