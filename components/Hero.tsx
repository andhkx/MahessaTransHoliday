"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/constants";
import { waGeneralLink } from "@/lib/whatsapp";

const EASE = [0.4, 0, 0.2, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-surface via-background to-background px-5 pb-10 pt-24 sm:px-8 md:px-12 md:pt-28 lg:px-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-accent/[0.07] blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary shadow-card">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {SERVICE_AREAS.join(" · ")}
          </span>

          <h1 className="mt-4 mb-5 text-[clamp(30px,4.6vw,50px)] font-extrabold leading-[1.08] tracking-tight text-heading">
            rental mobil &amp; wisata nyaman buat kamu di{" "}
            <span className="text-accent">Mahessa</span>
          </h1>
          <p className="mb-7 max-w-xl text-sm leading-relaxed text-body-text md:text-base">
            Dari rental lepas kunci, mobil dengan driver, charter antar-jemput,
            hingga paket wisata dan perjalanan dinas — harga jelas di awal,
            tanpa biaya siluman.
          </p>
          <div className="flex flex-nowrap justify-start gap-2 sm:gap-3">
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center gap-2 whitespace-nowrap px-5 py-3 text-sm"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Konsultasi Gratis
            </a>
            <Link
              href="/armada"
              className="btn btn-secondary inline-flex items-center gap-2 whitespace-nowrap px-5 py-3 text-sm"
            >
              Lihat Armada
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5">
            {["Lepas Kunci 12/24 Jam", "Mobil + Driver", "Paket Wisata All-In"].map(
              (t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-bold text-body-text shadow-sm transition-colors duration-300 hover:border-primary/40 hover:text-primary"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Check
                      size={10}
                      strokeWidth={3.5}
                      className="text-white"
                      aria-hidden="true"
                    />
                  </span>
                  {t}
                </span>
              ),
            )}
          </div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-[600px]">
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
              className="h-auto w-full rounded-[24px] object-cover shadow-elevated ring-1 ring-line"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
