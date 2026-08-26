"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/constants";
import { waGeneralLink } from "@/lib/whatsapp";

const EASE = [0.4, 0, 0.2, 1];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="flex min-h-[calc(100dvh-200px)] items-center px-5 pb-10 pt-24 sm:px-8 md:px-12 md:pt-28 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h1 className="mb-5 text-[clamp(32px,4.6vw,52px)] font-extrabold leading-[1.08] tracking-tight text-heading">
            rental mobil &amp; wisata nyaman buat kamu di{" "}
            <span className="text-accent">Mahessa</span>
          </h1>
          <p className="mb-7 max-w-xl text-sm leading-relaxed text-body-text md:text-base">
            Dari rental lepas kunci, mobil dengan driver, charter antar-jemput,
            hingga paket wisata dan perjalanan dinas dari{" "}
            {SERVICE_AREAS.join(", ")} — semua dibikin gampang.
          </p>
          <div className="flex flex-nowrap justify-start gap-2 sm:gap-3">
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-3.5 py-2.5 text-[13px] font-extrabold text-white transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98] sm:px-5 sm:text-sm"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Konsultasi Gratis
            </a>
            <Link
              href="/armada"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line px-3.5 py-2.5 text-[13px] font-extrabold text-heading transition-all hover:border-primary/60 hover:bg-primary/5 hover:text-primary sm:px-5 sm:text-sm"
            >
              Lihat Armada
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2.5">
            {["Lepas Kunci 12/24 Jam", "Mobil + Driver", "Paket Wisata All-In"].map(
              (t) => (
                <span
                  key={t}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-line bg-white/60 px-2 py-2.5 text-center transition-colors duration-300 hover:border-primary/40 sm:flex-row sm:items-center sm:gap-1.5 sm:rounded-full sm:border-transparent sm:bg-transparent sm:px-0 sm:py-0 sm:text-left"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Check
                      size={10}
                      strokeWidth={3.5}
                      className="text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-[10px] font-bold leading-tight text-body-text sm:text-[13px]">
                    {t}
                  </span>
                </span>
              ),
            )}
          </div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-[620px] lg:-translate-x-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="animate-float-slow"
          >
            <Image
              src="/images/vehicles/toyota-hiace-premio.svg"
              alt="Toyota Hiace Premio — armada Mahessa Trans Holiday"
              width={1024}
              height={683}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full rounded-[24px] object-cover shadow-[0_30px_70px_-20px_rgba(35,51,45,0.35)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
