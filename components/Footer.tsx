import Image from "next/image";
import Link from "next/link";
import {
  ADDRESS,
  MAPS_LINK_URL,
  OPERATING_HOURS,
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
    <footer className="bg-accent text-white">
      <div className="container-site py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/logo_mahessa.png"
              alt={`Logo ${SITE_NAME}`}
              width={150}
              height={40}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-sm font-semibold leading-relaxed text-white/70">
              {SITE_TAGLINE}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide">
              Layanan
            </h3>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((item, i) => (
                <li key={`${item.label}-${i}`}>
                  <Link
                    href={item.href}
                    className="text-sm font-semibold text-white/70 transition-colors duration-150 hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide">
              Jelajahi
            </h3>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm font-semibold text-white/70 transition-colors duration-150 hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide">
              Hubungi Kami
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm font-semibold text-white/70">
              <li>
                <a
                  href={waGeneralLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150 hover:text-white hover:underline"
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
                  className="text-primary transition-colors duration-150 hover:text-white hover:underline"
                >
                  Lihat di Google Maps →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs font-semibold text-white/50">
          © {new Date().getFullYear()} {SITE_NAME}. Hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
