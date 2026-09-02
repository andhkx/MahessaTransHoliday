import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import { getAllArticles } from "@/lib/data/supabase/articles";

export const metadata: Metadata = {
  title: "Artikel & Tips Perjalanan | Mahessa Trans Holiday",
  description:
    "Artikel, tips, dan panduan seputar rental mobil, charter, dan paket wisata dari Cimahi, Bandung & Padalarang.",
  alternates: { canonical: "/artikel" },
};

export default async function ArtikelPage() {
  const articles = await getAllArticles();

  return (
    <div className="mx-auto max-w-[1300px] px-5 py-28 sm:px-8 md:px-12 md:pt-32">
      <header className="mb-10 text-center">
        <span className="mb-3 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
          Blog & Artikel
        </span>
        <h1 className="mb-3 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading md:text-[40px]">
          Tips & panduan perjalanan.
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-body-text md:text-base">
          Insight dari tim kami untuk perjalanan yang lebih lancar — dari rental harian sampai paket multi-kota.
        </p>
      </header>

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
    </div>
  );
}