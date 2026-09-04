"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Wallet,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { EMAIL_DISPLAY, WHATSAPP_NUMBER } from "@/lib/constants";
import type { Vehicle, TravelPackage } from "@/lib/types";

const EASE = [0.4, 0, 0.2, 1] as const;

type Topic = "Sewa Mobil" | "Paket Wisata" | "Antar Jemput" | "Lainnya";

const TOPICS: { id: Topic; label: string; Icon: typeof CarFront }[] = [
  { id: "Sewa Mobil", label: "Sewa Mobil", Icon: CarFront },
  { id: "Paket Wisata", label: "Paket Wisata", Icon: MapPin },
  { id: "Antar Jemput", label: "Antar Jemput", Icon: Send },
  { id: "Lainnya", label: "Lainnya", Icon: Sparkles },
];

const TRUST = [
  "Respon di bawah 10 menit",
  "Tanpa komitmen",
  "Harga jelas di awal",
];

const CONTACT = [
  {
    Icon: MessageCircle,
    title: "WhatsApp",
    value: "+62 895-3270-77214",
    href: "https://wa.me/62895327077214",
    cta: "Chat Sekarang",
    accent: true,
  },
  {
    Icon: Phone,
    title: "Telepon",
    value: "+62 895-3270-77214",
    href: "tel:+62895327077214",
    cta: "Hubungi",
  },
  {
    Icon: Mail,
    title: "Email",
    value: EMAIL_DISPLAY,
    href: `mailto:${EMAIL_DISPLAY}`,
    cta: "Kirim Email",
  },
  {
    Icon: Clock,
    title: "Jam Operasional",
    value: "Setiap hari, 07.00 – 21.00 WIB",
    href: null,
    cta: null,
  },
];

type Errors = Partial<
  Record<
    | "nama"
    | "wa"
    | "tanggal"
    | "pickup"
    | "tujuan"
    | "pesan"
    | "selectedVehicle"
    | "selectedPackage",
    string
  >
>;

function validateWa(input: string): boolean {
  const digits = input.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

const formatRupiah = (n: number) =>
  n > 0 ? `Rp ${(n / 1000).toFixed(0)}rb` : "";

export default function KontakPageClient() {
  const reduce = useReducedMotion();
  const [topic, setTopic] = useState<Topic>("Sewa Mobil");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [pickup, setPickup] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const carRef = useRef<HTMLDivElement>(null);
  const pkgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/contact-options")
      .then((r) => r.json())
      .then((d) => {
        setVehicles(d.vehicles || []);
        setPackages(d.packages || []);
      })
      .catch(() => {});
  }, []);

  const selectedVehicleObj = useMemo(
    () => vehicles.find((v) => v.name === selectedVehicle),
    [vehicles, selectedVehicle]
  );
  const selectedPackageObj = useMemo(
    () => packages.find((p) => p.destination === selectedPackage),
    [packages, selectedPackage]
  );

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, dir: "left" | "right") => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const nama = String(fd.get("nama") || "").trim();
    const wa = String(fd.get("wa") || "").trim();
    const pesan = String(fd.get("pesan") || "").trim();

    const next: Errors = {};
    if (nama.length < 3) next.nama = "Nama minimal 3 karakter.";
    if (!wa) next.wa = "Nomor WhatsApp wajib diisi.";
    else if (!validateWa(wa)) next.wa = "Nomor WhatsApp tidak valid (10-15 digit).";
    if (pesan.length < 10) next.pesan = "Pesan minimal 10 karakter.";
    if (topic === "Antar Jemput") {
      if (!pickup) next.pickup = "Titik jemput wajib diisi.";
      if (!tujuan) next.tujuan = "Titik tujuan wajib diisi.";
    }
    if (topic === "Sewa Mobil" && vehicles.length > 0 && !selectedVehicle) {
      next.selectedVehicle = "Pilih armada yang diinginkan.";
    }
    if (topic === "Paket Wisata" && packages.length > 0 && !selectedPackage) {
      next.selectedPackage = "Pilih paket yang diinginkan.";
    }
    if (topic !== "Lainnya" && !tanggal) {
      next.tanggal = "Tanggal keberangkatan wajib diisi.";
    }

    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    setErrors({});
    const lines: string[] = [
      "Halo Mahessa Trans Holiday, saya ingin reservasi.",
      "",
      `Topik: ${topic}`,
      `Nama: ${nama}`,
      `No. WA: ${wa}`,
    ];
    if (tanggal) lines.push(`Tanggal: ${tanggal}`);
    if (topic === "Antar Jemput") {
      lines.push(`Titik Jemput: ${pickup}`);
      lines.push(`Titik Tujuan: ${tujuan}`);
    }
    if (topic === "Sewa Mobil" && selectedVehicle) {
      lines.push(`Armada: ${selectedVehicle}`);
      if (selectedVehicleObj) {
        lines.push(
          `Estimasi: ${formatRupiah(selectedVehicleObj.pricing.startingPrice || 0)} / 12 jam`
        );
      }
    }
    if (topic === "Paket Wisata" && selectedPackage) {
      lines.push(`Paket: ${selectedPackage}`);
      if (selectedPackageObj) {
        lines.push(
          `Estimasi: ${formatRupiah(selectedPackageObj.price || 0)} (${selectedPackageObj.duration})`
        );
      }
    }
    lines.push(`Pesan: ${pesan}`);
    lines.push("", "Terima kasih.");

    const msg = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="mx-auto w-full max-w-[1300px] px-5 py-12 sm:px-8 md:px-12 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <motion.form
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE }}
          onSubmit={handleSubmit}
          noValidate
          className="rounded-[24px] border border-line bg-white p-6 shadow-card md:p-8"
        >
          {submitted ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
                <Check size={26} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <h2 className="mb-2 text-xl font-extrabold text-heading">Terima kasih!</h2>
              <p className="mb-5 max-w-sm text-sm text-body-text">
                Chat akan terbuka di WhatsApp. Tim kami balas dalam beberapa menit.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSelectedVehicle(null);
                  setSelectedPackage(null);
                  setPickup("");
                  setTujuan("");
                  setTanggal("");
                }}
                className="text-sm font-extrabold text-accent hover:underline"
              >
                Kirim pesan lain →
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  Form Reservasi
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-heading md:text-2xl">
                  Ceritakan kebutuhan perjalananmu
                </h2>
              </div>

              <div className="mb-5">
                <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.16em] text-muted">
                  Topik
                </p>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map(({ id, label, Icon }) => {
                    const isActive = topic === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setTopic(id);
                          setErrors({});
                        }}
                        aria-pressed={isActive}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-extrabold transition-all",
                          isActive
                            ? "border-accent bg-accent text-white shadow-[0_8px_18px_-8px_rgba(0,86,145,0.55)]"
                            : "border-line bg-white text-body-text hover:border-accent/50 hover:text-accent"
                        )}
                      >
                        <Icon size={13} aria-hidden="true" />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  name="nama"
                  label="Nama Lengkap"
                  placeholder="Nama kamu"
                  required
                  error={errors.nama}
                />
                <Field
                  name="wa"
                  label="Nomor WhatsApp"
                  placeholder="08xxx"
                  type="tel"
                  required
                  error={errors.wa}
                />
              </div>

              {topic !== "Lainnya" && (
                <div className="mt-4">
                  <Field
                    name="tanggal"
                    label="Tanggal Keberangkatan"
                    type="date"
                    required
                    value={tanggal}
                    onChange={(v) => setTanggal(v)}
                    error={errors.tanggal}
                    icon={<Calendar size={14} />}
                  />
                </div>
              )}

              {topic === "Sewa Mobil" && null}
              {topic === "Paket Wisata" && null}

              {topic === "Antar Jemput" && (
                <div className="mt-4 space-y-3">
                  <Field
                    name="pickup"
                    label="Titik Jemput"
                    placeholder="Alamat lengkap atau tempat terkenal"
                    value={pickup}
                    onChange={setPickup}
                    error={errors.pickup}
                    icon={<MapPin size={14} />}
                  />
                  <Field
                    name="tujuan"
                    label="Titik Tujuan"
                    placeholder="Alamat lengkap atau tempat terkenal"
                    value={tujuan}
                    onChange={setTujuan}
                    error={errors.tujuan}
                    icon={<MapPin size={14} className="text-error" />}
                  />
                  {pickup && tujuan && (
                    <a
                      href={`https://www.google.com/maps/dir/${encodeURIComponent(pickup)}/${encodeURIComponent(tujuan)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-extrabold text-accent hover:underline"
                    >
                      Lihat rute di Google Maps <ArrowRight size={12} />
                    </a>
                  )}
                </div>
              )}

              <div className="mt-4">
                <Field
                  name="pesan"
                  label="Pesan Tambahan"
                  placeholder="Jumlah penumpang, detail lain, atau pertanyaan..."
                  multiline
                  required
                  error={errors.pesan}
                />
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_24px_-10px_rgba(0,86,145,0.6)] transition-all hover:scale-[1.01] hover:bg-accent-hover active:scale-[0.98]"
              >
                <Send size={15} aria-hidden="true" />
                Kirim via WhatsApp
              </button>

              <p className="mt-3 text-center text-[11px] text-muted">
                Atau lebih cepat via{" "}
                <a
                  href="https://wa.me/62895327077214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-extrabold text-accent hover:underline"
                >
                  WhatsApp
                </a>
                .
              </p>
            </>
          )}
        </motion.form>

        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {CONTACT.map((c, i) => {
              const inner = (
                <motion.article
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
                  className={cn(
                    "group relative h-full overflow-hidden rounded-[20px] border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated",
                    c.accent
                      ? "border-accent/30 bg-gradient-to-br from-accent/[0.04] to-transparent"
                      : "border-line"
                  )}
                >
                  <span
                    className={cn(
                      "mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                      c.accent
                        ? "bg-accent text-white"
                        : "bg-surface text-accent group-hover:bg-accent group-hover:text-white"
                    )}
                  >
                    <c.Icon size={18} aria-hidden="true" />
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                    {c.title}
                  </p>
                  <p className="mt-1 break-words text-[13px] font-extrabold text-heading">
                    {c.value}
                  </p>
                  {c.cta && (
                    <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-extrabold text-accent transition-transform group-hover:translate-x-1">
                      {c.cta}
                      <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  )}
                </motion.article>
              );
              if (!c.href) return <div key={c.title}>{inner}</div>;
              return (
                <a
                  key={c.title}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  {inner}
                </a>
              );
            })}
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="relative overflow-hidden rounded-[20px] border border-line bg-white p-5 shadow-card"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
                <Wallet size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                  Estimasi Harga
                </p>
                <p className="mt-1 text-[14px] font-extrabold text-heading">
                  Mulai Rp 350.000 / 12 jam
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-body-text">
                  Harga final tergantung armada, durasi, dan tujuan. Konfirmasi
                  di awal tanpa biaya siluman.
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
              {TRUST.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 text-[12px] font-bold text-body-text"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success/10 text-success">
                    <Check size={10} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function VehiclePicker({
  ref,
  vehicles,
  selected,
  onSelect,
  onScroll,
  error,
}: {
  ref?: React.RefObject<HTMLDivElement | null>;
  vehicles: Vehicle[];
  selected: string | null;
  onSelect: (name: string) => void;
  onScroll: (dir: "left" | "right") => void;
  error?: string;
}) {
  if (vehicles.length === 0) return null;
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-muted">
          Pilih Armada
        </p>
        <div className="hidden sm:flex items-center gap-1">
          <button
            type="button"
            onClick={() => onScroll("left")}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-line hover:bg-accent hover:text-white hover:border-accent transition"
            aria-label="Geser kiri"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => onScroll("right")}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-line hover:bg-accent hover:text-white hover:border-accent transition"
            aria-label="Geser kanan"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-2 scrollbar-none"
      >
        {vehicles.map((v) => {
          const isActive = selected === v.name;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(v.name)}
              className={cn(
                "flex-shrink-0 w-[160px] sm:w-[180px] snap-start rounded-2xl border-2 overflow-hidden text-left transition-all",
                isActive
                  ? "border-accent shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)]"
                  : "border-line hover:border-accent/50"
              )}
            >
              <div className="aspect-[16/10] relative bg-surface overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className={cn("p-2.5", isActive && "bg-accent/[0.04]")}>
                <p className="text-[12px] font-extrabold text-heading truncate">
                  {v.name}
                </p>
                <p className="text-[10px] text-muted">
                  {v.category} · {v.capacity} kursi
                </p>
                <p className="text-[11px] font-extrabold text-accent mt-1">
                  {formatRupiah(v.pricing.startingPrice || 0)} / 12 jam
                </p>
              </div>
            </button>
          );
        })}
      </div>
      {error && (
        <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-error">
          <AlertCircle size={11} aria-hidden="true" />
          {error}
        </span>
      )}
    </div>
  );
}

function PackagePicker({
  ref,
  packages,
  selected,
  onSelect,
  onScroll,
  error,
}: {
  ref?: React.RefObject<HTMLDivElement | null>;
  packages: TravelPackage[];
  selected: string | null;
  onSelect: (name: string) => void;
  onScroll: (dir: "left" | "right") => void;
  error?: string;
}) {
  if (packages.length === 0) return null;
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-muted">
          Pilih Paket
        </p>
        <div className="hidden sm:flex items-center gap-1">
          <button
            type="button"
            onClick={() => onScroll("left")}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-line hover:bg-accent hover:text-white hover:border-accent transition"
            aria-label="Geser kiri"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => onScroll("right")}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-line hover:bg-accent hover:text-white hover:border-accent transition"
            aria-label="Geser kanan"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-2 scrollbar-none"
      >
        {packages.map((p) => {
          const isActive = selected === p.destination;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p.destination)}
              className={cn(
                "flex-shrink-0 w-[160px] sm:w-[180px] snap-start rounded-2xl border-2 overflow-hidden text-left transition-all",
                isActive
                  ? "border-accent shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)]"
                  : "border-line hover:border-accent/50"
              )}
            >
              <div className="aspect-[16/10] relative bg-surface overflow-hidden">
                <img
                  src={p.image}
                  alt={p.destination}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className={cn("p-2.5", isActive && "bg-accent/[0.04]")}>
                <p className="text-[12px] font-extrabold text-heading truncate">
                  {p.destination}
                </p>
                <p className="text-[10px] text-muted truncate">
                  {p.destination} · {p.duration}
                </p>
                <p className="text-[11px] font-extrabold text-accent mt-1">
                  {formatRupiah(p.price || 0)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      {error && (
        <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-error">
          <AlertCircle size={11} aria-hidden="true" />
          {error}
        </span>
      )}
    </div>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required,
  multiline,
  error,
  value,
  onChange,
  icon,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  error?: string;
  value?: string;
  onChange?: (v: string) => void;
  icon?: React.ReactNode;
}) {
  const baseInput =
    "w-full rounded-xl border bg-white px-4 py-2.5 text-[13px] font-bold text-body-text outline-none transition-all placeholder:font-normal placeholder:text-muted focus:ring-2";
  const borderClass = error
    ? "border-error focus:border-error focus:ring-error/20"
    : "border-line focus:border-accent focus:ring-accent/15";
  const Tag = multiline ? "textarea" : "input";
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            {icon}
          </span>
        )}
        <Tag
          name={name}
          type={multiline ? undefined : type}
          required={required}
          rows={multiline ? 4 : undefined}
          placeholder={placeholder}
          aria-invalid={error ? "true" : undefined}
          value={value}
          onChange={(e: any) => onChange?.(e.target.value)}
          className={cn(baseInput, borderClass, icon ? "pl-9" : "", multiline && "resize-none")}
        />
      </div>
      {error && (
        <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-error">
          <AlertCircle size={11} aria-hidden="true" />
          {error}
        </span>
      )}
    </label>
  );
}