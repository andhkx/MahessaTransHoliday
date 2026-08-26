import Link from "next/link";
import { services } from "@/data/services";
import SectionHeading from "./SectionHeading";

export default function ServiceCards() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Butuh perjalanan seperti apa?" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <span className="text-4xl">{service.icon}</span>
              <h3 className="mt-4 text-lg font-bold text-primary">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                {service.text}
              </p>
              <Link
                href={service.ctaHref}
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent transition-colors hover:text-accent-dark"
              >
                {service.ctaLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
