"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { waGeneralLink } from "@/lib/whatsapp";
import { MAPS_EMBED_URL, MAPS_LINK_URL, WHATSAPP_DISPLAY } from "@/lib/constants";

const EASE = [0.4, 0, 0.2, 1] as const;

type CtaSectionProps = {
  title?: string;
  text?: string;
};

export default function CtaSection({
  title = "Siap berangkat bersama Mahessa?",
  text = "Ceritakan kebutuhan perjalananmu — kami bantu pilihkan kendaraan dan layanan yang sesuai target dan anggaran.",
}: CtaSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1300px] px-5 py-16 sm:px-8 md:px-12 md:py-24">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="overflow-hidden rounded-[28px] border border-line bg-white shadow-elevated"
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative bg-accent p-8 text-white md:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/[0.08]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/[0.05]"
            />

            <div className="relative">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-100">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Konsultasi Gratis
              </span>

              <h2 className="mb-4 max-w-md text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[40px]">
                {title}
              </h2>
              <p className="mb-8 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                {text}
              </p>

              <div className="mb-7 space-y-2.5">
                {[
                  "Tanpa komitmen — bebas tanya",
                  "Respon admin di bawah 10 menit",
                  "Harga jelas di awal, tanpa biaya siluman",
                ].map((t) => (
                  <p
                    key={t}
                    className="flex items-center gap-2 text-[13px] font-bold text-white/85"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {t}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={waGeneralLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-accent shadow-[0_10px_24px_-10px_rgba(0,86,145,0.6)] transition-all hover:scale-[1.03] active:scale-[0.97]"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  Chat Admin
                </a>
                <a
                  href="tel:+62895327077214"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-5 py-3 text-sm font-extrabold text-white transition-all hover:bg-white/20"
                >
                  <Phone size={15} aria-hidden="true" />
                  {WHATSAPP_DISPLAY}
                </a>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] bg-surface lg:min-h-0">
            <iframe
              src={MAPS_EMBED_URL}
              title="Lokasi Mahessa Trans Holiday"
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-line bg-white/95 p-4 shadow-elevated backdrop-blur md:bottom-6 md:left-6 md:right-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <MapPin size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                  Lokasi Kantor
                </p>
                <p className="truncate text-[14px] font-extrabold tracking-tight text-heading">
                  Cimahi, Jawa Barat
                </p>
              </div>
              <Link
                href={MAPS_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line bg-white px-3 py-2 text-[12px] font-extrabold text-accent transition-colors hover:border-accent"
              >
                Petunjuk Arah
                <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
