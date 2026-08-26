import Link from "next/link";
import { services } from "@/data/services";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const serviceIcons: Record<string, React.ReactNode> = {
  "rental-mobil": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-full w-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 17h14m-1.5 2.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-11 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3 13l1.6-4.7A2 2 0 016.5 7h11a2 2 0 011.9 1.3L21 13v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3z" />
    </svg>
  ),
  "mobil-driver": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-full w-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21c0-3.3 3.6-5 8-5s8 1.7 8 5" />
    </svg>
  ),
  "charter-transfer": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-full w-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-5.1-7-11a7 7 0 1114 0c0 5.9-7 11-7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    </svg>
  ),
  "paket-wisata": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-full w-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-9-9m9 9c-2 0-5-.5-7-2.5S11.5 4 12 3m-2.5 9.5L3 19m9.5-9.5L19 3M6 13l-2-1m5-4l-1-2" />
    </svg>
  ),
};

export default function ServiceCards() {
  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="container-site">
        <SectionHeading title="Butuh perjalanan seperti apa?" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="group h-full rounded-[14px] border-2 border-sky bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:bg-surface hover:shadow-card-hover lg:p-8">
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-sky/40 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  {serviceIcons[service.id]}
                </span>
                <h3 className="mb-3 text-xl font-semibold text-navy lg:text-h4 lg:font-bold">
                  {service.title}
                </h3>
                <p className="mb-5 text-[15px] font-normal leading-relaxed text-body-text">
                  {service.text}
                </p>
                <Link href={service.ctaHref} className="text-link text-[15px]">
                  {service.ctaLabel}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
