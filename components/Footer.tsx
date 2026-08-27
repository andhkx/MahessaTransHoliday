import Image from "next/image";
import Link from "next/link";
import {
  ADDRESS,
  MAPS_LINK_URL,
  OPERATING_HOURS,
  SERVICE_AREAS,
  SITE_NAME,
  SITE_TAGLINE,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";
import { waGeneralLink } from "@/lib/whatsapp";

const NAV = [
  { href: "/armada", label: "Armada" },
  { href: "/paket", label: "Paket Perjalanan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontak", label: "Kontak" },
];

const LAYANAN = [
  { href: "/armada", label: "Sewa Mobil + Sopir" },
  { href: "/paket", label: "Paket Wisata" },
  { href: "/kontak", label: "Antar Jemput Bandara" },
  { href: "/kontak", label: "City Tour Bandung" },
  { href: "/kontak", label: "Transportasi Korporat" },
];

const ARMADA = [
  { href: "/armada/toyota-avanza", label: "Toyota Avanza" },
  { href: "/armada/toyota-innova-reborn", label: "Innova Reborn" },
  { href: "/armada/toyota-hiace-premio", label: "Hiace Premio" },
  { href: "/armada/toyota-alphard", label: "Toyota Alphard" },
  { href: "/armada", label: "Lihat Semua →" },
];

export default function Footer() {
  return (
    <footer className="bg-heading text-white">
      <div className="mx-auto w-full max-w-[1300px] px-5 py-14 sm:px-8 md:px-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo_mahessa.png"
                alt={SITE_NAME}
                width={200}
                height={56}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {SITE_TAGLINE}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {SERVICE_AREAS.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold text-white/80"
                >
                  {area}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-primary hover:text-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-primary hover:text-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a
                href="https://wa.me/62895327077214"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-primary hover:text-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-primary hover:text-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Halaman
            </h3>
            <ul className="space-y-2.5">
              {NAV.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Layanan
            </h3>
            <ul className="space-y-2.5">
              {LAYANAN.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Pilihan Armada
            </h3>
            <ul className="space-y-2.5">
              {ARMADA.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Hubungi Kami
            </h3>
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 transition-colors hover:border-primary"
            >
              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                  WhatsApp Admin
                </span>
                <span className="mt-0.5 block truncate text-[14px] font-extrabold text-white">
                  {WHATSAPP_DISPLAY}
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] font-bold text-primary group-hover:underline">
                Chat
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </a>

            <div className="mt-4 space-y-1.5 text-sm text-white/70">
              <p>{ADDRESS}</p>
              <p>{OPERATING_HOURS}</p>
            </div>
            <a
              href={MAPS_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-bold text-primary transition-colors hover:text-white hover:underline"
            >
              Lihat di Google Maps →
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1300px] flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-white/50 sm:flex-row sm:px-8 md:px-12">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. Hak cipta dilindungi.
          </p>
          <p className="flex items-center gap-3">
            <span>Rental mobil</span>
            <span className="text-white/30">·</span>
            <span>Charter</span>
            <span className="text-white/30">·</span>
            <span>Paket wisata</span>
          </p>
        </div>
        <div className="mx-auto flex w-full max-w-[1300px] items-center justify-center gap-1.5 px-5 pb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/30 sm:px-8 md:px-12">
          <span>Created by</span>
          <a
            href="https://hitou.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 transition-colors hover:text-white"
          >
            hitou.my.id
          </a>
        </div>
      </div>
    </footer>
  );
}
