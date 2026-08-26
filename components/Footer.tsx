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

const serviceLinks = [
  { href: "/armada", label: "Rental Mobil" },
  { href: "/armada", label: "Mobil + Driver" },
  { href: "/kontak", label: "Charter & Transfer" },
  { href: "/paket", label: "Paket Wisata" },
];

const exploreLinks = [
  { href: "/armada", label: "Armada" },
  { href: "/paket", label: "Paket Perjalanan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="container-site py-12 lg:py-16 lg:px-6 xl:px-0">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-flex items-center rounded-xl bg-white p-2">
              <Image
                src="/images/logo_mahessa.png"
                alt={`Logo ${SITE_NAME}`}
                width={150}
                height={38}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
              {SITE_TAGLINE}
            </p>
            <p className="mt-4 text-caption font-medium uppercase text-white/50">
              Melayani: {SERVICE_AREAS.join(" · ")}
            </p>
          </div>

          <div>
            <h3 className="text-h6 font-semibold uppercase tracking-wide text-accent">
              Layanan
            </h3>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-h6 font-semibold uppercase tracking-wide text-accent">
              Kontak
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/80">
              <li>
                <a
                  href={waGeneralLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-white"
                >
                  WhatsApp: {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>{ADDRESS}</li>
              <li>{OPERATING_HOURS}</li>
              <li>
                <a
                  href={MAPS_LINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-accent transition-colors duration-200 hover:text-white"
                >
                  Lihat di Google Maps
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-h6 font-semibold uppercase tracking-wide text-accent">
              Jelajahi
            </h3>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-center text-caption font-medium text-white/50">
          © {new Date().getFullYear()} {SITE_NAME}. Seluruh hak cipta
          dilindungi.
        </div>
      </div>
    </footer>
  );
}
