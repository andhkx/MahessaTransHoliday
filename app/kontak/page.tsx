import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CtaSection from "@/components/CtaSection";
import {
  ADDRESS,
  MAPS_EMBED_URL,
  MAPS_LINK_URL,
  OPERATING_HOURS,
  SERVICE_AREAS,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";
import { waGeneralLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Mahessa Trans Holiday via WhatsApp untuk reservasi rental mobil, charter, dan paket wisata di Cimahi, Bandung, dan Padalarang.",
  alternates: { canonical: "/kontak" },
};

export default function KontakPage() {
  const contactItems = [
    {
      title: "WhatsApp",
      value: WHATSAPP_DISPLAY,
      href: waGeneralLink(),
      cta: "Chat Sekarang",
      external: true,
    },
    {
      title: "Alamat Garasi",
      value: ADDRESS,
      href: MAPS_LINK_URL,
      cta: "Buka Google Maps",
      external: true,
    },
    {
      title: "Jam Operasional",
      value: OPERATING_HOURS,
      href: null,
      cta: null,
      external: false,
    },
  ];

  return (
    <>
      <PageHeader
        title="Hubungi Kami"
        subtitle={`Kami melayani ${SERVICE_AREAS.join(", ")}. Konsultasi gratis — ceritakan kebutuhan perjalananmu.`}
      />
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {contactItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-extrabold text-primary">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.value}
                </p>
                {item.href && item.cta && (
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent transition-colors hover:text-accent-dark"
                  >
                    {item.cta} <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-gray-100 shadow-md">
            <iframe
              src={MAPS_EMBED_URL}
              title="Lokasi Mahessa Trans Holiday"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[400px] w-full border-0"
            />
          </div>
        </div>
      </section>
      <CtaSection
        title="Siap berangkat kapan pun kamu siap"
        text="Reservasi paling cepat lewat WhatsApp. Tim kami balas di jam operasional."
      />
    </>
  );
}
