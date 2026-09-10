"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, Search, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { useLocale, useT } from "@/lib/i18n/client";
import type { Article } from "@/lib/data/supabase/articles";

type Props = { articles: Article[] };

export default function ArtikelListClient({ articles }: Props) {
  const locale = useLocale();
  const t = useT();
  const isEn = locale === "en";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"terbaru" | "populer" | "judul">("terbaru");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const categories = ["all", "tips", "destinasi", "panduan", "berita"] as const;
  const catLabel = (c: string) =>
    c === "all" ? (isEn ? "All" : "Semua") : c.charAt(0).toUpperCase() + c.slice(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = articles;
    if (category !== "all") list = list.filter((a) => (a.category || "").toLowerCase() === category);
    if (q) {
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.excerpt || "").toLowerCase().includes(q) ||
          a.slug.toLowerCase().includes(q)
      );
    }
    const sorted = [...list].sort((a, b) => {
      if (sortBy === "judul") return a.title.localeCompare(b.title);
      if (sortBy === "populer") return (a.view_count || 0) - (b.view_count || 0);
      const da = new Date(a.published_at || a.created_at).getTime();
      const db = new Date(b.published_at || b.created_at).getTime();
      return da - db;
    });
    return sortDir === "asc" ? sorted : sorted.reverse();
  }, [articles, query, category, sortBy, sortDir]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isEn ? "Search title, topic..." : "Cari judul, topik..."}
            className="w-full pl-9 pr-3 py-2.5 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold border transition",
                category === c ? "bg-accent text-white border-accent" : "bg-white text-heading border-line hover:border-accent"
              )}
            >
              {catLabel(c)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">{isEn ? "Sort" : "Urut"}</span>
          {(
            [
              { value: "terbaru", label: isEn ? "Latest" : "Terbaru" },
              { value: "populer", label: isEn ? "Popular" : "Populer" },
              { value: "judul", label: isEn ? "Title" : "Judul" },
            ] as const
          ).map((s) => (
            <button
              key={s.value}
              onClick={() => {
                if (sortBy === s.value) setSortDir(sortDir === "asc" ? "desc" : "asc");
                else {
                  setSortBy(s.value);
                  setSortDir(s.value === "judul" ? "asc" : "desc");
                }
              }}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition",
                sortBy === s.value ? "bg-accent text-white border-accent" : "bg-white text-heading border-line hover:border-accent"
              )}
            >
              {s.label}
              {sortBy === s.value && <ArrowUpDown size={10} />}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-xs font-bold text-muted">
        {isEn ? `Showing ${filtered.length} of ${articles.length} articles` : `Menampilkan ${filtered.length} dari ${articles.length} artikel`}
        {category !== "all" ? ` • ${catLabel(category)}` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center">
          <FileText size={32} className="mx-auto text-muted" />
          <p className="mt-3 text-sm font-bold text-heading">{isEn ? "No matching articles." : "Tidak ada artikel yang cocok."}</p>
          <p className="mt-1 text-xs text-muted">{isEn ? "Try another keyword or category." : "Coba kata kunci atau kategori lain."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <Link
              key={a.id}
              href={`/artikel/${a.slug}`}
              className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="relative aspect-[16/10] bg-surface">
                {a.cover_image_url ? (
                  <Image src={a.cover_image_url} alt={a.title} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
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
                <h3 className="text-base font-extrabold text-heading group-hover:text-accent transition line-clamp-2">{a.title}</h3>
                {a.excerpt && <p className="mt-2 text-sm text-muted line-clamp-2">{a.excerpt}</p>}
                <p className="mt-3 text-xs text-muted">
                  {a.published_at ? new Date(a.published_at).toLocaleDateString(isEn ? "en-US" : "id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "—"} • {a.view_count} views
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
