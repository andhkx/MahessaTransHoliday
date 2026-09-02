export const dynamic = 'force-dynamic';


import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getArticleBySlug, getLatestArticles } from "@/lib/data/supabase/articles";
import { SITE_URL } from "@/lib/constants";
import { MessageCircle, Calendar, Eye, FileText, ArrowLeft } from "lucide-react";
import { waGeneralLink } from "@/lib/whatsapp";

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.excerpt || undefined,
    alternates: { canonical: `/artikel/${article.slug}` },
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt || undefined,
      images: article.cover_image_url ? [article.cover_image_url] : [],
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const latest = await getLatestArticles(3);
  const related = latest.filter((a) => a.id !== article.id);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Artikel", item: `${SITE_URL}/artikel` },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/artikel/${article.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />

      <article className="mx-auto max-w-3xl px-5 py-28 sm:px-8 md:px-12 md:pt-32">
        <header className="mb-8">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
            <Link href="/" className="transition-colors hover:text-primary">Beranda</Link>
            <span className="mx-2 text-line">/</span>
            <Link href="/artikel" className="transition-colors hover:text-primary">Artikel</Link>
            <span className="mx-2 text-line">/</span>
            <span className="text-primary truncate max-w-[200px] inline-block">{article.title}</span>
          </nav>

          {article.category && (
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
              {article.category}
            </span>
          )}

          <h1 className="mb-4 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading md:text-[40px]">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-6">
            <span className="flex items-center gap-1">
              <Calendar size={14} />{" "}
              {article.published_at
                ? new Date(article.published_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "—"}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={14} />{" "}{article.view_count} views
            </span>
            <span className="flex items-center gap-1">
              <FileText size={14} />{" "}{article.category || "Artikel"}
            </span>
          </div>
        </header>

        {article.cover_image_url && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-card">
            <Image
              src={article.cover_image_url}
              alt={article.title}
              width={1200}
              height={675}
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="prose prose-sm prose-headings:font-extrabold prose-headings:text-heading prose-body:text-body-text prose-img:rounded-xl prose-a:text-accent prose-a:no-underline hover:prose-a:underline max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content || "" }} />
        </div>

        <footer className="mt-12 pt-8 border-t border-line">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted">
              <span>Dibagikan:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(article.title + " " + SITE_URL + "/artikel/" + article.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-primary hover:underline"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${SITE_URL}/artikel/${article.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-primary hover:underline"
              >
                X
              </a>
            </div>
            <Link
              href="/artikel"
              className="flex items-center gap-1.5 text-primary hover:underline text-sm font-bold"
            >
              <ArrowLeft size={14} /> Kembali ke Artikel
            </Link>
          </div>
        </footer>
      </article>

      {article.meta_description && (
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:px-12">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              Baca juga
            </p>
            <h3 className="mt-2 text-xl font-extrabold tracking-tight text-heading">{article.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-body-text">{article.meta_description}</p>
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.55)] transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]"
            >
              <MessageCircle size={13} /> Chat Admin
            </a>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-line bg-wa-surface/40 py-16 md:py-20">
          <div className="mx-auto max-w-[1300px] px-5 sm:px-8 md:px-12">
            <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-heading md:text-3xl">
              Artikel Terkait
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
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
          </div>
        </section>
      )}
    </>
  );
}