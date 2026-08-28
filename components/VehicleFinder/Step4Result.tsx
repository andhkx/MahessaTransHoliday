"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Check, MessageCircle, RefreshCcw } from "lucide-react";
import { buildFinderResult, getJourneyLabel } from "./finder";
import type { JourneyType } from "@/data/finder";
import { waLink } from "@/lib/whatsapp";
import { formatIDR } from "@/lib/format";

const EASE = [0.4, 0, 0.2, 1] as const;

type Step4ResultProps = {
  budget: number;
  people: number;
  journey: JourneyType;
  onReset: () => void;
};

export default function Step4Result({ budget, people, journey, onReset }: Step4ResultProps) {
  const reduce = useReducedMotion();
  const result = buildFinderResult(budget, people, journey);
  const { vehicle, package: pkg, whatsappMessage } = result;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="space-y-6"
    >
      <h3 className="text-xl font-extrabold text-heading">Rekomendasi untukmu</h3>

      {vehicle ? (
        <motion.article
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
          className="overflow-hidden rounded-[20px] border border-line bg-white shadow-card"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              sizes="(max-width: 700px) 100vw, 700px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-heading/40 via-transparent to-transparent" />
            {vehicle.badge && (
              <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-accent/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-card backdrop-blur">
                {vehicle.badge}
              </span>
            )}
          </div>

          <div className="p-5 md:p-6">
            <h4 className="mb-1 text-lg font-extrabold text-heading">{vehicle.name}</h4>
            <p className="mb-3 text-sm text-muted">
              {vehicle.capacity} seats · {vehicle.transmission} · {vehicle.fuelType}
            </p>

            <p className="mb-4 text-base font-extrabold text-accent">
              Mulai {formatIDR(vehicle.pricing.startingPrice ?? 0)} / 24 jam
            </p>

            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
              Cocok untuk: {getJourneyLabel(journey)}
            </p>
            <ul className="mb-5 space-y-1">
              {vehicle.suitableFor.slice(0, 3).map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-body-text">
                  <Check size={13} className="text-success" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>

            {pkg && (
              <div className="mb-5 rounded-[12px] border border-accent/20 bg-accent/5 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Paket Cocok</p>
                <p className="mt-1 text-sm font-extrabold text-heading">
                  Paket {pkg.destination} dari {formatIDR(pkg.price)}
                </p>
                <Link
                  href={`/paket/${pkg.slug}`}
                  className="mt-2 inline-flex items-center gap-1 text-[12px] font-extrabold text-accent hover:underline"
                >
                  Lihat paket ini
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <Link
                href={`/armada/${vehicle.slug}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-extrabold text-heading transition-all hover:border-accent/50 hover:text-accent"
              >
                Lihat Detail Mobil
              </Link>
              <a
                href={waLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_-10px_rgba(0,86,145,0.6)] transition-all hover:scale-[1.01] hover:bg-accent-hover active:scale-[0.98]"
              >
                <MessageCircle size={15} aria-hidden="true" />
                Chat WhatsApp
              </a>
            </div>
          </div>
        </motion.article>
      ) : (
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-[20px] border border-dashed border-line bg-white p-8 text-center"
        >
          <p className="text-sm font-bold text-heading">Tidak ada kendaraan yang cocok.</p>
          <p className="mt-1 text-[12px] text-muted">Coba sesuaikan budget atau jumlah orang.</p>
        </motion.div>
      )}

      <button
        type="button"
        onClick={onReset}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-extrabold text-heading transition-all hover:border-accent/50 hover:text-accent"
      >
        <RefreshCcw size={14} aria-hidden="true" />
        Coba Lagi
      </button>
    </motion.div>
  );
}
