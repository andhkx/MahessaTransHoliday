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
    <footer className="bg-navy text-white">
      <div className="container-site py-10 lg:py-14 lg:px-8 xl:px-0">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <div className="inline-flex items-center rounded-lg bg-white p-2">
              <Image
                src="/images/logo_mahessa.png"
                alt={`Logo ${SITE_NAME}`}
                width={150}
                height={38}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {SITE_TAGLINE}
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted">
              Melayani: {SERVICE_AREAS.join(" · ")}
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Layanan</h3>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((item, i) => (
                <li key={`${item.label}-${i}`}>
                  <Link
                    href={item.href}
                    className="text-sm leading-relaxed text-sky transition-colors duration-300 hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Kontak</h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-sky">
              <li>
                <a
                  href={waGeneralLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-white hover:underline"
                >
                  WhatsApp: {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="text-white/70">{ADDRESS}</li>
              <li className="text-white/70">{OPERATING_HOURS}</li>
              <li>
                <a
                  href={MAPS_LINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium transition-colors duration-300 hover:text-white hover:underline"
                >
                  Lihat di Google Maps →
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Jelajahi</h3>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm leading-relaxed text-sky transition-colors duration-300 hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} {SITE_NAME}. Seluruh hak cipta
          dilindungi.
        </div>
      </div>
    </footer>
  );
}
