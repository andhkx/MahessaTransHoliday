import Link from "next/link";
import { services } from "@/data/services";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ServiceCards() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container-site">
        <SectionHeading title="Butuh perjalanan seperti apa?" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="card card-lift group h-full p-6">
                <span className="flex h-12 w-12 items-center justify-center text-[36px] leading-none">
                  {service.icon}
                </span>
                <h3 className="mb-3 mt-4 text-h5 font-semibold text-black">
                  {service.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-5 text-body-text">
                  {service.text}
                </p>
                <Link
                  href={service.ctaHref}
                  className="text-link text-sm"
                  aria-label={`${service.ctaLabel} - ${service.title}`}
                >
                  {service.ctaLabel}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
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
