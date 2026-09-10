
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getArticleBySlug, getLatestArticles } from "@/lib/data/supabase/articles";
import { SITE_URL } from "@/lib/constants";
import { Calendar, Eye, FileText, ArrowLeft, Share2, MessageCircle, ArrowUpRight } from "lucide-react";
import { waGeneralLink } from "@/lib/whatsapp";
import { getLocale, getDict } from "@/lib/i18n/server";
import { hreflang } from "@/lib/i18n/seo";
import ArticleShare from "@/components/ArticleShare";
import { createClient } from "@supabase/supabase-js";
import { renderMarkdown } from "@/lib/markdown";


export const dynamic = 'force-dynamic';
export async function generateMetadata(
  params: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params.params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.excerpt || undefined,
    alternates: hreflang(`/artikel/${article.slug}`),
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
  const locale = await getLocale();
  const isEn = locale === "en";
  const t = getDict(locale);
  const tArt = t.detail.artikel;
  const article = await getArticleBySlug(slug);
  if (!article) {
    console.error(`[artikel/[slug]] ${tArt.notFound}: "${slug}"`);
    notFound();
  }

  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    await supabase.rpc("increment_article_view", { p_slug: article.slug });
    (article as any).view_count = (article.view_count ?? 0) + 1;
  } catch {}

  const latest = await getLatestArticles(5);
  const related = latest.filter((a) => a.id !== article.id).slice(0, 4);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: tArt.breadcrumbArticle, item: `${SITE_URL}/artikel` },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/artikel/${article.slug}`,
      },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt || article.meta_description || undefined,
    image: article.cover_image_url ? [article.cover_image_url] : undefined,
    datePublished: article.published_at || article.created_at,
    dateModified: article.updated_at,
    author: {
      "@type": "Organization",
      name: "Mahessa Trans Holiday",
    },
    publisher: {
      "@type": "Organization",
      name: "Mahessa Trans Holiday",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo_mahessa.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/artikel/${article.slug}`,
    },
  };

  const shareUrl = `${SITE_URL}/artikel/${article.slug}`;
  const shareText = isEn
    ? `${article.title}${tArt.shareTextSuffix}`
    : `${article.title} – baca selengkapnya di Mahessa Trans Holiday`;

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={articleLd} />

      <article className="detail-enter mx-auto max-w-5xl px-5 py-28 sm:px-8 md:px-12 md:pt-32">
        <header className="mb-8 md:mb-10">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
            <Link href="/" className="transition-colors hover:text-primary">{isEn ? "Home" : "Beranda"}</Link>
            <span className="mx-2 text-line">/</span>
            <Link href="/artikel" className="transition-colors hover:text-primary">{tArt.breadcrumbArticle}</Link>
            <span className="mx-2 text-line">/</span>
            <span className="text-primary truncate max-w-[300px] inline-block align-bottom">{article.category || tArt.breadcrumbArticle}</span>
          </nav>

          <h1 className="mb-5 text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-heading md:text-[44px] md:leading-[1.05]">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mb-6 max-w-3xl text-lg leading-relaxed text-body-text md:text-xl">
              {article.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-line py-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} aria-hidden="true" />
              {article.published_at
                ? new Date(article.published_at).toLocaleDateString(isEn ? "en-US" : "id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "—"}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye size={14} aria-hidden="true" />
              {article.view_count} {tArt.viewsSuffix}
            </span>
            {article.category && (
              <span className="flex items-center gap-1.5">
                <FileText size={14} aria-hidden="true" />
                {article.category}
              </span>
            )}
            <ArticleShare
              url={shareUrl}
              text={shareText}
              labels={{
                wa: tArt.shareWaLabel,
                x: tArt.shareXLabel,
                fb: isEn ? "Share to Facebook" : "Bagikan ke Facebook",
                ig: isEn ? "Copy for Instagram" : "Salin untuk Instagram",
                copy: isEn ? "Copy link" : "Salin tautan",
                copied: isEn ? "Copied!" : "Tersalin!",
                share: tArt.shareLabel,
              }}
            />
          </div>
        </header>

        {article.cover_image_url && (
          <figure className="mb-10 overflow-hidden rounded-2xl shadow-card">
            <Image
              src={article.cover_image_url}
              alt={article.title}
              width={1200}
              height={675}
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="w-full h-auto object-cover"
            />
            {article.category && (
              <figcaption className="mt-2 px-1 text-xs text-muted">
                {isEn
                  ? `Illustration: ${article.category} — ${article.title}`
                  : `Ilustrasi ${article.category} — ${article.title}`}
              </figcaption>
            )}
          </figure>
        )}

        <div className="article-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content || "") }} />

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <Link
            href="/artikel"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} aria-hidden="true" /> {tArt.backAll}
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-accent"
          >
            <Share2 size={14} aria-hidden="true" /> {tArt.consultWa}
          </Link>
        </footer>
      </article>

      <section className="border-y border-line bg-wa-surface/40 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 md:px-12">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card md:p-8">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              {tArt.ctaEyebrow}
            </p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-heading md:text-3xl">
              {tArt.ctaTitle}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body-text md:text-base">
              {isEn
                ? "Tour packages, Hiace charter, or daily rental — our team helps recommend the right unit and itinerary for your budget. See all fleet and packages on the site, or contact admin for a free consultation."
                : "Paket wisata, charter Hiace, atau rental harian — tim kami bantu rekomendasikan unit dan itinerary sesuai budget. Lihat semua armada dan paket di website, atau hubungi admin untuk konsultasi gratis."}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/armada"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.55)] transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]"
              >
                {tArt.ctaAllFleet} <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <Link
                href="/paket"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-accent bg-white px-5 py-3.5 text-sm font-extrabold text-accent transition-all hover:scale-[1.02] hover:bg-accent/5 active:scale-[0.98]"
              >
                {tArt.ctaAllPackages}
              </Link>
              <a
                href={waGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-primary transition-colors hover:text-accent"
              >
                <MessageCircle size={14} aria-hidden="true" /> {tArt.ctaChatAdmin}
              </a>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-background py-16 md:py-20">
          <div className="mx-auto max-w-[1300px] px-5 sm:px-8 md:px-12">
            <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                  {tArt.relatedEyebrow}
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-heading md:text-3xl">
                  {tArt.relatedTitle}
                </h2>
              </div>
              <Link href="/artikel" className="text-link">
                {tArt.relatedViewAll} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((a) => (
                <Link
                  key={a.id}
                  href={`/artikel/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    {a.cover_image_url ? (
                      <Image
                        src={a.cover_image_url}
                        alt={a.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted">
                        <FileText size={32} />
                      </div>
                    )}
                    {a.category && (
                      <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-card">
                        {a.category}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-base font-extrabold leading-snug text-heading transition-colors duration-300 group-hover:text-accent line-clamp-2">
                      {a.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-[10px] font-semibold text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} aria-hidden="true" />
                        {a.published_at
                          ? new Date(a.published_at).toLocaleDateString(isEn ? "en-US" : "id-ID", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={10} aria-hidden="true" />
                        {a.view_count} {tArt.viewsSuffix}
                      </span>
                    </div>
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
