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

const serviceLinks = [
  { href: "/armada", label: "Rental Mobil" },
  { href: "/armada", label: "Mobil + Driver" },
  { href: "/kontak", label: "Charter & Transfer" },
  { href: "/paket", label: "Paket Wisata" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-bold text-primary">
                M
              </span>
              <span className="text-lg font-extrabold">{SITE_NAME}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {SITE_TAGLINE}
            </p>
            <p className="mt-4 text-xs text-white/60">
              Melayani: {SERVICE_AREAS.join(", ")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
              Layanan
            </h3>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
              Kontak
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li>
                <a
                  href={waGeneralLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp: {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>{ADDRESS}</li>
              <li>Jam operasional: {OPERATING_HOURS}</li>
              <li>
                <a
                  href={MAPS_LINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent transition-colors hover:text-white"
                >
                  Lihat di Google Maps
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
              Jelajahi
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/armada"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Armada
                </Link>
              </li>
              <li>
                <Link
                  href="/paket"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Paket Perjalanan
                </Link>
              </li>
              <li>
                <Link
                  href="/galeri"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Galeri
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} {SITE_NAME}. Seluruh hak cipta
          dilindungi.
        </div>
      </div>
    </footer>
  );
}
