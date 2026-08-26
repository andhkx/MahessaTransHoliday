import Image from "next/image";
import Link from "next/link";
import { waGeneralLink } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-sky/30 blur-3xl"
      />

      <div className="container-site relative flex min-h-[80dvh] items-center pb-12 pt-12 lg:min-h-[100dvh] lg:pb-20 lg:pt-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[55%_45%] lg:gap-12">
          <div>
            <h1 className="max-w-[550px] text-balance text-[36px] font-extrabold leading-[1.1] tracking-[-1px] text-primary lg:text-h1">
              Perjalanan nyaman, kendaraan siap menemani.
            </h1>
            <p className="mt-5 max-w-[600px] text-base font-normal leading-relaxed text-body-text lg:text-lg">
              Rental mobil lepas kunci, dengan driver, charter, hingga perjalanan
              wisata dan perjalanan dinas dari Cimahi, Bandung & Padalarang.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href={waGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Konsultasi via WhatsApp
              </a>
              <Link
                href="/armada"
                className="btn btn-secondary border-[2.5px] px-[34px] py-[14px] text-base font-semibold"
              >
                Lihat Armada
              </Link>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <Image
              src="/images/vehicles/toyota-avanza.svg"
              alt="Toyota Avanza New TSS G — armada Mahessa Trans Holiday"
              width={1200}
              height={800}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-photo lg:aspect-video"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
