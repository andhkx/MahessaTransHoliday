import Image from "next/image";
import Link from "next/link";
import { SERVICE_AREAS } from "@/lib/constants";
import { waGeneralLink } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section className="bg-surface pb-12 pt-[104px] lg:pb-20 lg:pt-[134px]">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="eyebrow">
            <span
              aria-hidden="true"
              className="inline-block w-8 border-t-2 border-dashed border-accent"
            />
            Rental & Wisata · {SERVICE_AREAS.join(" · ")}
          </span>
          <h1 className="mt-4 max-w-[500px] text-[32px] font-extrabold leading-[40px] tracking-tight text-black md:text-h1 md:leading-[56px] lg:text-h1">
            Perjalanan nyaman, kendaraan siap menemani.
          </h1>
          <p className="mt-4 max-w-[550px] text-base leading-relaxed text-body-text lg:text-lg lg:leading-7">
            Rental mobil lepas kunci, dengan driver, charter, hingga perjalanan
            wisata dan perjalanan dinas dari Cimahi, Bandung & Padalarang.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
              className="btn btn-secondary px-[30px] py-[14px] text-base font-semibold"
            >
              Lihat Armada
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <Image
            src="/images/vehicles/toyota-avanza.svg"
            alt="Toyota Avanza New TSS G — armada Mahessa Trans Holiday"
            width={1200}
            height={800}
            priority
            sizes="(max-width: 1024px) 90vw, 50vw"
            className="aspect-[4/3] w-full rounded-xl object-cover shadow-photo lg:aspect-[16/9]"
          />
        </div>
      </div>
    </section>
  );
}
