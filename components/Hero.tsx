"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { SERVICE_AREAS, SITE_NAME } from "@/lib/constants";
import { waGeneralLink } from "@/lib/whatsapp";

const EASE = [0.4, 0, 0.2, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-background px-5 pb-12 pt-24 sm:px-8 md:px-12 md:pt-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-accent/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-primary/[0.05] blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-[1300px] items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary shadow-card">
            <span className="flex h-1.5 w-1.5 rounded-full bg-success" />
            {SERVICE_AREAS.join(" · ")} &mdash; buka 24/7
          </span>

          <h1 className="text-[clamp(38px,6vw,68px)] font-extrabold leading-[0.98] tracking-[-0.04em] text-heading">
            Sewa Mobil
            <br />
            Jadi Lebih
            <br />
            <span className="text-accent">Mudah.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-body-text md:text-base">
            Temukan kendaraan ideal untuk setiap perjalanan Anda. Sopir
            profesional, harga transparan, dan unit terawat &mdash; dari city
            car harian hingga Hiace untuk rombongan. Cepat, aman, dan tanpa
            ribet.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#armada"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_-10px_rgba(0,86,145,0.55)] transition-all hover:scale-[1.03] hover:bg-accent-hover active:scale-[0.97]"
            >
              Lihat Armada
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-line bg-white px-5 py-3 text-sm font-extrabold text-heading transition-all hover:border-accent hover:text-accent"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Cek Lokasi
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              { Icon: ShieldCheck, t: "Driver Profesional" },
              { Icon: Sparkles, t: "Unit Bersih & Terawat" },
              { Icon: Check, t: "Booking 24/7" },
            ].map(({ Icon, t }) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 text-[13px] font-bold text-body-text"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon size={13} strokeWidth={2.5} aria-hidden="true" />
                </span>
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[600px]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="relative"
          >
            <div className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-br from-accent/15 via-primary/5 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-line bg-surface shadow-elevated">
              <Image
                src="/images/vehicles/toyota-hiace-premio.svg"
                alt={`${SITE_NAME} - Hiace Premio`}
                width={1200}
                height={800}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full object-cover"
              />
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              className="absolute -bottom-4 left-3 flex items-center gap-2.5 rounded-2xl border border-line bg-white/95 p-2.5 shadow-elevated backdrop-blur sm:-bottom-5 sm:-left-3 sm:gap-3 sm:p-3 sm:pr-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white sm:h-10 sm:w-10">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z" />
                </svg>
              </span>
              <div className="leading-tight">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted sm:text-[10px]">
                  Armada
                </p>
                <p className="text-[12px] font-extrabold tracking-tight text-heading sm:text-[14px]">
                  15+ Unit Tersedia
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              className="absolute right-3 top-4 block rounded-2xl border border-line bg-white/95 p-2.5 pr-4 shadow-elevated backdrop-blur sm:right-auto sm:-right-2 sm:top-6 sm:p-3 sm:pr-5"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted sm:text-[10px]">
                Mulai Dari
              </p>
              <p className="text-[14px] font-extrabold tracking-tight text-accent sm:text-[18px]">
                Rp 350rb
                <span className="ml-1 text-[10px] font-bold text-muted sm:text-[11px]">/ 24 jam</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
