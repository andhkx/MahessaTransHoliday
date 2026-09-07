"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CarFront, Check, MessageCircle, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/constants";
import { waGeneralLink } from "@/lib/whatsapp";
import { useT, format } from "@/lib/i18n/client";

const EASE = [0.4, 0, 0.2, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const t = useT();

  const chips = [
    { Icon: ShieldCheck, label: t.hero.chips[0] },
    { Icon: Sparkles, label: t.hero.chips[1] },
    { Icon: Check, label: t.hero.chips[2] },
  ];

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
            {format(t.hero.statusBadge, { areas: SERVICE_AREAS.join(" · ") })}
          </span>

          <h1 className="text-[clamp(38px,6vw,68px)] font-extrabold leading-[0.98] tracking-[-0.04em] text-heading">
            {t.hero.headline1}
            <br />
            {t.hero.headline2}
            <br />
            <span className="text-accent">{t.hero.headlineAccent}</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-body-text md:text-base">
            {t.hero.sub}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#armada"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_-10px_rgba(0,86,145,0.55)] transition-all hover:scale-[1.03] hover:bg-accent-hover active:scale-[0.97]"
            >
              {t.hero.ctaPrimary}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-line bg-white px-5 py-3 text-sm font-extrabold text-heading transition-all hover:border-accent hover:text-accent"
            >
              <MessageCircle size={16} aria-hidden="true" />
              {t.hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
            {chips.map(({ Icon, label }) => (
              <span
                key={label}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-white px-2.5 py-3 text-center text-[11px] font-extrabold leading-tight text-body-text shadow-sm sm:inline-flex sm:flex-row sm:border-0 sm:bg-transparent sm:p-0 sm:text-left sm:text-[13px] sm:shadow-none"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent sm:h-6 sm:w-6">
                  <Icon size={13} strokeWidth={2.5} aria-hidden="true" />
                </span>
                {label}
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
                src="https://rxhibmwhkjpfwirzvojt.supabase.co/storage/v1/object/public/vehicles/toyota-hiace-premio/toyota-hiace-premio.webp"
                alt={`${t.site.name} - Hiace Premio`}
                width={1200}
                height={800}
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                className="h-auto w-full object-cover"
              />
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              className="absolute -bottom-6 left-3 flex items-center gap-2.5 rounded-2xl border border-line bg-white/95 p-2.5 shadow-elevated backdrop-blur sm:-bottom-5 sm:left-4 sm:gap-3 sm:p-3 sm:pr-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white sm:h-10 sm:w-10">
                <Wallet size={18} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted sm:text-[10px]">
                  {t.hero.priceLabel}
                </p>
                <p className="text-[14px] font-extrabold tracking-tight text-accent sm:text-[18px]">
                  {t.hero.priceValue}
                  <span className="ml-1 text-[10px] font-bold text-muted sm:text-[11px]">{t.hero.priceUnit}</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              className="absolute right-3 -top-6 flex items-center gap-2.5 rounded-2xl border border-line bg-white/95 p-2.5 pr-4 shadow-elevated backdrop-blur sm:right-4 sm:-top-7 sm:p-3 sm:pr-5 z-10"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white sm:h-10 sm:w-10">
                <CarFront size={18} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted sm:text-[10px]">
                  {t.hero.fleetLabel}
                </p>
                <p className="text-[12px] font-extrabold tracking-tight text-heading sm:text-[14px]">
                  {t.hero.fleetValue}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
