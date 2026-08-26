import Image from "next/image";
import Link from "next/link";
import {
  ADDRESS,
  MAPS_LINK_URL,
  OPERATING_HOURS,
  SERVICE_AREAS,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants";
import { waGeneralLink } from "@/lib/whatsapp";

const exploreLinks = [
  { href: "/armada", label: "Armada" },
  { href: "/paket", label: "Paket Perjalanan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="bg-heading text-white">
      <div className="mx-auto grid w-full max-w-[1300px] grid-cols-1 gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 md:px-12 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo_mahessa.png"
            alt={SITE_NAME}
            width={140}
            height={38}
            className="h-9 w-auto object-contain brightness-0 invert"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {SITE_TAGLINE}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SERVICE_AREAS.map((area) => (
              <span
                key={area}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold text-white/80"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
            Navigasi
          </h3>
          <ul className="space-y-2.5">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/75 transition-colors duration-300 hover:text-white hover:underline"
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
            className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 transition-colors duration-300 hover:border-primary/60"
          >
            <span className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-wide text-white/50">
                WhatsApp Admin
              </span>
              <span className="block truncate text-sm font-extrabold text-white">
                Respon cepat setiap hari
              </span>
            </span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{ADDRESS}</p>
          <p className="mt-1 text-sm text-white/70">{OPERATING_HOURS}</p>
          <a
            href={MAPS_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-bold text-primary transition-colors duration-300 hover:text-white hover:underline"
          >
            Lihat di Google Maps →
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1300px] flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-white/50 sm:flex-row sm:px-8 md:px-12">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. Hak cipta dilindungi.
          </p>
          <p>Rental mobil · Charter · Paket wisata</p>
        </div>
      </div>
    </footer>
  );
}
