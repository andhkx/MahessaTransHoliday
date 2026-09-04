import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import PageHero from "@/components/PageHero";
import { getAllArticles } from "@/lib/data/supabase/articles";

export const metadata: Metadata = {
  title: "Artikel, Tips Rental & Panduan Wisata Bandung | Mahessa Trans Holiday",
  description:
    "Artikel, tips, itinerary, dan panduan lengkap seputar rental mobil, charter Hiace, paket wisata Bandung, Lembang, Ciwidey, Pangandaran, Garut, Bromo, Bali, dan antar jemput Bandara Kertajati, KCIC Padalarang. Dari Cimahi, Bandung & Padalarang.",
  keywords: [
    "artikel rental mobil bandung",
    "tips sewa mobil bandung",
    "panduan wisata bandung",
    "itinerary lembang",
    "itinerary ciwidey",
    "paket pangandaran",
    "paket garut",
    "paket bromo dari bandung",
    "sewa hiace bandung",
    "sewa innova reborn bandung",
    "antar jemput bandara kertajati",
    "kcic padalarang",
    "rental mobil cimahi",
    "rental mobil terpercaya",
    "paket city tour bandung",
    "liburan keluarga bandung",
    "study tour bandung",
    "family gathering bandung",
    "tips memilih rental mobil",
  ].join(", "),
  alternates: { canonical: "/artikel" },
  openGraph: {
    title: "Artikel, Tips Rental & Panduan Wisata Bandung | Mahessa Trans Holiday",
    description:
      "Artikel, tips, itinerary, dan panduan lengkap seputar rental mobil, charter Hiace, paket wisata Bandung, Lembang, Ciwidey, Pangandaran, Garut, Bromo, Bali, dan antar jemput Bandara Kertajati, KCIC Padalarang.",
    url: "/artikel",
    type: "website",
  },
};

export const dynamic = 'force-dynamic';

export default async function ArtikelPage() {
  const articles = await getAllArticles();

  return (
    <>
      <PageHero
        eyebrow="Blog & Artikel"
        title="Tips & panduan perjalanan."
        subtitle="Insight dari tim kami untuk perjalanan yang lebih lancar — dari rental harian sampai paket multi-kota."
      />

      <section className="mx-auto w-full max-w-[1300px] px-5 py-12 sm:px-8 md:px-12 md:py-16">
        {articles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center">
            <FileText size={32} className="mx-auto text-muted" />
            <p className="mt-3 text-base font-extrabold text-heading">
              Belum ada artikel.
            </p>
            <p className="mt-1 text-sm text-muted">
              Tim kami sedang menyiapkan konten terbaru. Cek lagi nanti.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Link
                key={a.id}
                href={`/artikel/${a.slug}`}
                className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="relative aspect-[16/10] bg-surface">
                  {a.cover_image_url ? (
                    <Image
                      src={a.cover_image_url}
                      alt={a.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted">
                      <FileText size={32} />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  {a.category && (
                    <span className="mb-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                      {a.category}
                    </span>
                  )}
                  <h3 className="text-base font-extrabold text-heading group-hover:text-accent transition">
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p className="mt-2 text-sm text-muted line-clamp-2">{a.excerpt}</p>
                  )}
                  <p className="mt-3 text-xs text-muted">
                    {a.published_at
                      ? new Date(a.published_at).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}{" "}
                    • {a.view_count} views
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}