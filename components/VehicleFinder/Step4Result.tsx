"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import {
  Check,
  MessageCircle,
  RefreshCcw,
  Users,
  Settings2,
  Fuel,
  Star,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { buildFinderResult, getJourneyLabel } from "./finder";
import type { JourneyType } from "@/data/finder";
import { waLink } from "@/lib/whatsapp";
import { formatIDR } from "@/lib/format";
import { cn } from "@/lib/cn";

const EASE = [0.4, 0, 0.2, 1] as const;

type Step4ResultProps = {
  budget: number;
  people: number;
  journey: JourneyType;
  onReset: () => void;
};

export default function Step4Result({
  budget,
  people,
  journey,
  onReset,
}: Step4ResultProps) {
  const reduce = useReducedMotion();
  const result = buildFinderResult(budget, people, journey);
  const { vehicle, alternatives, package: pkg, whatsappMessage } = result;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="mb-1 text-xl font-extrabold text-heading md:text-2xl">
          Ini mobil yang cocok buat kamu
        </h3>
        <p className="text-sm text-muted">
          Berdasarkan budget {formatIDR(budget)} · {people} orang · {getJourneyLabel(journey)}
        </p>
      </div>

      {vehicle ? (
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
          className="overflow-hidden rounded-[20px] border border-line bg-white shadow-card"
        >
          {/* Mobile visual */}
          <div className="relative aspect-[16/10] overflow-hidden bg-surface md:hidden">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-heading/40 via-transparent to-transparent" />
            {vehicle.badge && (
              <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-accent/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-card backdrop-blur">
                {vehicle.badge}
              </span>
            )}
          </div>

          {/* Desktop 2-column layout */}
          <div className="grid gap-0 md:grid-cols-2">
            {/* LEFT: Visual */}
            <div className="relative hidden aspect-square overflow-hidden bg-surface md:block">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-heading/40 via-transparent to-transparent" />
              {vehicle.badge && (
                <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-accent/95 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-card backdrop-blur">
                  {vehicle.badge}
                </span>
              )}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                <div className="rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-accent shadow-card backdrop-blur">
                  Rekomendasi
                </div>
                <div className="flex items-center gap-0.5 rounded-full border border-white/30 bg-white/90 px-2.5 py-1 shadow-card backdrop-blur">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-yellow-400 text-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Specs */}
            <div className="p-5 md:p-7">
              <h4 className="mb-1 text-xl font-extrabold text-heading md:text-[26px]">
                {vehicle.name}
              </h4>
              <p className="mb-4 text-base font-extrabold text-accent md:text-[20px]">
                Mulai {formatIDR(vehicle.pricing.startingPrice ?? 0)} / 12 jam
              </p>

              <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-1">
                <SpecRow Icon={Users} label="Kapasitas" value={`${vehicle.capacity} orang`} />
                <SpecRow Icon={Settings2} label="Transmisi" value={vehicle.transmission} />
                <SpecRow Icon={Fuel} label="Bahan Bakar" value={vehicle.fuelType} />
                <SpecRow Icon={Calendar} label="Tersedia" value="12 / 24 jam" />
              </div>

              <div className="mb-5">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                  Cocok untuk
                </p>
                <p className="text-[13px] text-body-text">
                  {getJourneyLabel(journey)} · {vehicle.suitableFor.slice(0, 3).join(", ")}
                </p>
              </div>

              {pkg && (
                <div className="mb-5 rounded-[14px] border border-accent/20 bg-accent/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Sparkles size={14} className="text-accent" aria-hidden="true" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
                      Paket Cocok
                    </p>
                  </div>
                  <p className="text-sm font-extrabold text-heading">
                    Paket {pkg.destination}
                  </p>
                  <p className="text-[12px] text-muted">
                    {pkg.duration} · {formatIDR(pkg.price)}
                  </p>
                  <p className="mt-1 text-[11px] text-body-text">
                    Include: {pkg.included.slice(0, 3).join(", ")}
                  </p>
                  <Link
                    href={`/paket/${pkg.slug}`}
                    className="mt-2 inline-flex items-center gap-1 text-[12px] font-extrabold text-accent hover:underline"
                  >
                    Lihat Detail Paket
                    <ArrowRight size={11} aria-hidden="true" />
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
          </div>
        </motion.div>
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

      {alternatives.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-muted">
            Pilihan lain
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {alternatives.map((alt) => (
              <Link
                key={alt.id}
                href={`/armada/${alt.slug}`}
                className="group rounded-[12px] border border-line bg-white p-3 transition-all hover:border-accent/40 hover:shadow-card"
              >
                <p className="text-[13px] font-extrabold text-heading line-clamp-1 group-hover:text-accent">
                  {alt.name}
                </p>
                <p className="text-[11px] font-bold text-accent">
                  {formatIDR(alt.pricing.startingPrice ?? 0)} / 12 jam
                </p>
              </Link>
            ))}
          </div>
        </div>
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

function SpecRow({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[10px] border border-line bg-wa-surface/40 px-3 py-2">
      <Icon size={16} className="text-accent shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
          {label}
        </p>
        <p className="text-[13px] font-extrabold text-heading">{value}</p>
      </div>
    </div>
  );
}
