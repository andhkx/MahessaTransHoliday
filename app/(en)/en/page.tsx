import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CarFront, MapPin, MessageCircle, ShieldCheck, Sparkles, Wallet, Phone, Mail, Clock, Users, Briefcase, Mountain, Plane, Building2 } from "lucide-react";
import type { Metadata } from "next";
import { getFeaturedVehicles } from "@/lib/data/supabase/vehicles";
import { getFeaturedPackages } from "@/lib/data/supabase/packages";
import { formatCompact } from "@/lib/format";
import { waGeneralLink, waPackageLink } from "@/lib/whatsapp";
import { WHATSAPP_DISPLAY, EMAIL_DISPLAY, OPERATING_HOURS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Car Rental & Tour Packages in Bandung | Mahessa Trans Holiday",
  description:
    "Book a car with driver, charter Hiace, or all-in tour packages from Cimahi, Bandung & Padalarang. English-speaking support, transparent pricing, 24/7 WhatsApp booking. Perfect for tourists visiting West Java.",
  alternates: { canonical: "/en" },
  openGraph: {
    title: "Car Rental & Tour Packages in Bandung | Mahessa Trans Holiday",
    description:
      "Car rental with driver, charter Hiace, and all-in tour packages from Cimahi, Bandung & Padalarang. Perfect for tourists visiting West Java.",
    url: "/en",
    locale: "en_US",
    type: "website",
  },
};

const SERVICES = [
  {
    Icon: CarFront,
    title: "Car Rental with Driver",
    text: "Daily or weekly rentals with professional drivers. From city car to premium SUV.",
  },
  {
    Icon: Users,
    title: "Hiace Charter",
    text: "14-16 seat Hiace for groups and family gatherings. All-in pricing.",
  },
  {
    Icon: MapPin,
    title: "Tour Packages",
    text: "Lembang, Ciwidey, Pangandaran, Garut, Bromo, Bali. All-in including tickets.",
  },
  {
    Icon: Plane,
    title: "Airport Transfer",
    text: "Kertajati International, Soekarno-Hatta, Husein Sastranegara, and KCIC Whoosh station.",
  },
  {
    Icon: Building2,
    title: "City Tour Bandung",
    text: "Half-day or full-day tours covering Braga, Asia Afrika, and culinary spots.",
  },
  {
    Icon: Briefcase,
    title: "Corporate Transport",
    text: "Employee shuttle, guest pickup, and meeting transport for businesses.",
  },
  {
    Icon: ShieldCheck,
    title: "Professional Drivers",
    text: "Licensed, English-speaking, and experienced with West Java and Trans Java routes.",
  },
  {
    Icon: Sparkles,
    title: "Well-Maintained Fleet",
    text: "All vehicles inspected and cleaned before departure. New units, AC working, comfortable.",
  },
];

const FLEET = [
  { name: "Toyota Calya", seats: 7, category: "Economy", useCase: "Family daily trips" },
  { name: "Toyota Avanza", seats: 7, category: "Family", useCase: "Family, airport transfer" },
  { name: "Daihatsu Terios", seats: 7, category: "SUV", useCase: "Wisata alam (Ciwidey, Lembang)" },
  { name: "Toyota Innova Reborn", seats: 7, category: "Premium", useCase: "Dinas, wedding, family" },
  { name: "Toyota Innova Zenix", seats: 7, category: "Hybrid", useCase: "Premium eco-friendly trips" },
  { name: "Toyota Fortuner", seats: 7, category: "SUV Premium", useCase: "VIP, family luxury" },
  { name: "Toyota Alphard", seats: 7, category: "Luxury", useCase: "Wedding, VIP, executive" },
  { name: "Toyota Hiace Premio", seats: 14, category: "Premium Van", useCase: "Rombongan premium" },
  { name: "Toyota Hiace Commuter", seats: 16, category: "Group", useCase: "Study tour, gathering" },
  { name: "Isuzu Elf Long", seats: 19, category: "Big Group", useCase: "Outing kantor besar" },
];

const HIGHLIGHTS = [
  { value: "10+", label: "Fleet units" },
  { value: "24/7", label: "WhatsApp booking" },
  { value: "EN", label: "English support" },
  { value: "5★", label: "Customer rating" },
];

export default async function EnHomePage() {
  const [vehicles, packages] = await Promise.all([
    getFeaturedVehicles(),
    getFeaturedPackages(),
  ]);

  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden bg-background px-5 pb-12 pt-24 sm:px-8 md:px-12 md:pt-28">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-accent/[0.06] blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-primary/[0.05] blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-[1300px] items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary shadow-card">
              <span className="flex h-1.5 w-1.5 rounded-full bg-success" />
              Cimahi · Bandung · Padalarang — open 24/7
            </span>

            <h1 className="text-[clamp(38px,6vw,68px)] font-extrabold leading-[0.98] tracking-[-0.04em] text-heading">
              Car rental with driver,
              <br />
              in the heart of
              <br />
              <span className="text-accent">Bandung.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-body-text md:text-base">
              Book a clean, well-maintained car with an English-speaking driver.
              From daily city rides to multi-day Bromo and Bali tours &mdash; we
              handle the driving so you enjoy the trip.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={waGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.55)] transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]"
              >
                <MessageCircle size={15} aria-hidden="true" />
                Book via WhatsApp
              </a>
              <Link
                href="#fleet"
                className="inline-flex items-center gap-2 rounded-full border-2 border-accent bg-white px-5 py-3 text-sm font-extrabold text-accent transition-all hover:scale-[1.02] hover:bg-accent/5 active:scale-[0.98]"
              >
                See Our Fleet
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold text-muted">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-success" aria-hidden="true" />
                All-inclusive pricing
              </span>
              <span className="flex items-center gap-1.5">
                <Wallet size={13} className="text-success" aria-hidden="true" />
                No hidden fees
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles size={13} className="text-success" aria-hidden="true" />
                English support
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-line bg-white p-5 shadow-elevated">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {HIGHLIGHTS.map(({ value, label }) => (
                  <div key={label} className="rounded-2xl border border-line bg-wa-surface/50 p-4 text-center">
                    <p className="text-2xl font-extrabold text-accent md:text-3xl">{value}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center text-sm font-extrabold text-heading">
                Book via WhatsApp &mdash; respond in &lt; 10 min
              </p>
              <a
                href={waGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-extrabold text-white transition-all hover:bg-accent-hover"
              >
                <MessageCircle size={14} aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-y border-line bg-surface/60 py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
          <div className="mb-10 max-w-2xl md:mb-14">
            <span className="mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              What we offer
            </span>
            <h2 className="mb-3 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading md:text-[44px]">
              All the transport you need,
              <br />
              <span className="text-accent">in one place.</span>
            </h2>
            <p className="max-w-xl text-[15px] leading-relaxed text-body-text md:text-base">
              From a quick ride to Kawah Putih to a 4-day Bali tour &mdash; same
              driver team, same WhatsApp, same transparent pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ Icon, title, text }) => (
              <article
                key={title}
                className="group relative h-full overflow-hidden rounded-[20px] border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-elevated"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/[0.1] text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_10px_24px_-10px_rgba(0,86,145,0.6)]">
                  <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-[17px] font-extrabold tracking-tight text-heading">{title}</h3>
                <p className="text-[13px] leading-relaxed text-body-text">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section id="fleet" className="bg-background py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
          <div className="mb-10">
            <span className="mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              Our fleet
            </span>
            <h2 className="mb-2 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading md:text-[44px]">
              Choose the right vehicle
              <br />
              <span className="text-accent">for your trip.</span>
            </h2>
            <p className="max-w-xl text-[15px] leading-relaxed text-body-text">
              From 7-seater family cars to 19-seat Elf buses. Driver included,
              fuel included, toll included. See the full fleet on our
              Indonesian page.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {vehicles.length > 0
              ? vehicles.slice(0, 8).map((v) => (
                  <div
                    key={v.id}
                    className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                      <Image
                        src={v.gallery?.[0] || v.image || "/images/placeholder.svg"}
                        alt={v.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                      <span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-heading backdrop-blur-md">
                        {v.category}
                      </span>
                      <span className="absolute right-2.5 top-2.5 rounded-full bg-accent px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-card">
                        {v.capacity} seats
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-base font-bold leading-snug text-heading transition-colors group-hover:text-accent md:text-lg">
                        {v.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                        {v.transmission} &middot; {v.fuelType}
                      </p>
                      <div className="mt-auto flex items-end justify-between gap-2 border-t border-line pt-3">
                        <p className="text-sm font-extrabold text-accent">
                          From {formatCompact(v.pricing.startingPrice)}
                        </p>
                        <span className="text-[10px] font-semibold text-muted">/ 12 hours</span>
                      </div>
                    </div>
                  </div>
                ))
              : FLEET.map((v) => (
                  <div
                    key={v.name}
                    className="flex h-full flex-col rounded-[18px] border border-line bg-white p-5 shadow-card"
                  >
                    <span className="mb-2 inline-block w-fit rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent">
                      {v.category}
                    </span>
                    <h3 className="text-base font-bold leading-snug text-heading md:text-lg">{v.name}</h3>
                    <p className="mt-1 text-xs text-muted">{v.seats} seats</p>
                    <p className="mt-3 text-[12px] leading-relaxed text-body-text">{v.useCase}</p>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* TOUR PACKAGES */}
      <section id="tours" className="border-y border-line bg-surface/60 py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
          <div className="mb-10">
            <span className="mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              Popular tour packages
            </span>
            <h2 className="mb-2 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading md:text-[44px]">
              Multi-day tours,{" "}
              <span className="text-accent">all-inclusive.</span>
            </h2>
            <p className="max-w-xl text-[15px] leading-relaxed text-body-text">
              Hiace, driver, fuel, toll, parking, hotel &mdash; already included.
              Pick a destination, we handle the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {packages.length > 0 ? (
              packages.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <Image
                      src={p.image}
                      alt={`Hiace tour to ${p.destination}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-heading backdrop-blur-md">
                      {p.duration}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-primary">
                      Hiace package
                    </p>
                    <h3 className="mt-1 text-base font-bold leading-snug text-heading group-hover:text-accent">
                      {p.destination}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                      Hiace, driver, fuel, toll, parking included.
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-2 border-t border-line pt-3">
                      <p className="text-sm font-extrabold text-accent">
                        From {formatCompact(p.price)}
                      </p>
                      <a
                        href={waPackageLink(`Hiace ${p.destination} ${p.duration}`, p.price)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Book ${p.destination} via WhatsApp`}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                      >
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-sm text-muted">No packages available right now.</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1000px] px-5 sm:px-8 md:px-12">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-elevated md:p-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-wa-surface/60 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
              <Mountain size={12} aria-hidden="true" />
              For foreign tourists visiting Bandung
            </div>
            <h2 className="text-2xl font-extrabold leading-[1.1] tracking-[-0.03em] text-heading md:text-4xl">
              Book a car with driver in 3 minutes.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-body-text md:text-base">
              Send us your pickup location, destination, and date. We reply in
              under 10 minutes with transparent pricing. No deposit needed for
              most trips.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={waGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.55)] transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]"
              >
                <MessageCircle size={14} aria-hidden="true" />
                Chat on WhatsApp
              </a>
              <a
                href={`tel:+${"62895327077214".replace(/^620/, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-accent bg-white px-5 py-3.5 text-sm font-extrabold text-accent transition-all hover:scale-[1.02] hover:bg-accent/5 active:scale-[0.98]"
              >
                <Phone size={14} aria-hidden="true" />
                Call Hotline
              </a>
            </div>

            <div className="mt-6 flex flex-col gap-2 text-sm text-body-text sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              <span className="flex items-center gap-2">
                <Phone size={13} className="text-accent" aria-hidden="true" />
                <span className="font-bold text-heading">{WHATSAPP_DISPLAY}</span>
              </span>
              <span className="flex items-center gap-2">
                <Mail size={13} className="text-accent" aria-hidden="true" />
                <span className="font-bold text-heading">{EMAIL_DISPLAY}</span>
              </span>
              <span className="flex items-center gap-2">
                <Clock size={13} className="text-accent" aria-hidden="true" />
                <span className="font-bold text-heading">24/7 Hotline</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* EN FOOTER */}
      <footer className="bg-heading text-white">
        <div className="mx-auto w-full max-w-[1300px] px-5 py-12 sm:px-8 md:px-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Image
                src="/images/logo_mahessa.png"
                alt="Mahessa Trans Holiday"
                width={200}
                height={56}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
                Car rental with driver, charter Hiace, and tour packages from
                Cimahi, Bandung &amp; Padalarang. English-friendly support.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
                Services
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="#fleet" className="text-white/85 hover:text-white">Car Rental</Link></li>
                <li><Link href="#tours" className="text-white/85 hover:text-white">Tour Packages</Link></li>
                <li><a href={waGeneralLink()} target="_blank" rel="noopener noreferrer" className="text-white/85 hover:text-white">Airport Transfer</a></li>
                <li><a href={waGeneralLink()} target="_blank" rel="noopener noreferrer" className="text-white/85 hover:text-white">City Tour</a></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
                Contact
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href={`https://wa.me/62895327077214`} target="_blank" rel="noopener noreferrer" className="text-white/85 hover:text-white">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL_DISPLAY}`} className="text-white/85 hover:text-white">
                    {EMAIL_DISPLAY}
                  </a>
                </li>
                <li className="text-white/85">Cimahi, West Java, Indonesia</li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
                Hours
              </p>
              <p className="mt-3 text-sm text-white/85">{OPERATING_HOURS}</p>
              <p className="mt-1 text-sm text-white/85">WhatsApp 24/7</p>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Mahessa Trans Holiday. All rights reserved.</p>
            <Link href="/" className="text-white/85 hover:text-white">
              Bahasa Indonesia →
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
