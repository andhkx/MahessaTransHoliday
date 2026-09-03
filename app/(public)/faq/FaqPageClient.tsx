"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Search,
  Wallet,
  Calendar,
  CarFront,
  Users,
} from "lucide-react";
import type { FaqItem } from "@/lib/types";
import { cn } from "@/lib/cn";
import { waGeneralLink } from "@/lib/whatsapp";

const EASE = [0.4, 0, 0.2, 1] as const;

type Category = {
  id: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  items: FaqItem[];
};

type Props = {
  faqMain: FaqItem[];
  faqExtra: FaqItem[];
};

// Since Supabase FAQ items use UUID as id, we distribute by index across categories
function getCategories(faqMain: FaqItem[], faqExtra: FaqItem[]): Category[] {
  // Split faqMain into 3 chunks: layanan (3), harga (2), pemesanan (1)
  // Split faqExtra into 4 chunks: harga (3), pemesanan (2), armada (2)
  // Total 6 main + 7 extra = 13
  return [
    {
      id: "layanan",
      label: "Layanan",
      Icon: CarFront,
      items: faqMain.slice(0, 3),
    },
    {
      id: "harga",
      label: "Harga & Pembayaran",
      Icon: Wallet,
      items: [
        ...faqMain.slice(3, 5),
        ...faqExtra.slice(0, 3),
      ],
    },
    {
      id: "pemesanan",
      label: "Pemesanan",
      Icon: Calendar,
      items: [
        ...faqMain.slice(5, 6),
        ...faqExtra.slice(3, 5),
      ],
    },
    {
      id: "armada",
      label: "Armada & Driver",
      Icon: Users,
      items: faqExtra.slice(5, 7),
    },
  ];
}

export default function FaqPageClient({ faqMain, faqExtra }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("layanan");
  const [open, setOpen] = useState<string>("");
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => getCategories(faqMain, faqExtra),
    [faqMain, faqExtra]
  );
  const ALL_FAQS: FaqItem[] = useMemo(
    () => [...faqMain, ...faqExtra],
    [faqMain, faqExtra]
  );

  const items = useMemo(() => {
    const cat = categories.find((c) => c.id === active);
    const base = cat?.items ?? ALL_FAQS;
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    );
  }, [active, query, categories, ALL_FAQS]);

  if (ALL_FAQS.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1300px] px-5 py-12 sm:px-8 md:px-12 md:py-16 text-center">
        <p className="text-sm text-muted">Belum ada FAQ.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1300px] px-5 py-12 sm:px-8 md:px-12 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[20px] border border-line bg-white p-2 shadow-card">
            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
              Kategori
            </p>
            <div className="space-y-0.5">
              {categories.map((c) => {
                const isActive = c.id === active;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActive(c.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-extrabold transition-all duration-300",
                      isActive
                        ? "bg-accent text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.55)]"
                        : "text-body-text hover:bg-surface"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                        isActive ? "bg-white/20" : "bg-surface text-accent"
                      )}
                    >
                      <c.Icon size={14} aria-hidden="true" />
                    </span>
                    <span className="flex-1">{c.label}</span>
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                        isActive ? "bg-white/20 text-white" : "bg-surface text-muted"
                      )}
                    >
                      {c.items.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="relative overflow-hidden rounded-[20px] border border-line bg-white p-5 shadow-card"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10"
            />
            <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
              <MessageCircle size={18} aria-hidden="true" />
            </span>
            <p className="mb-1 text-[14px] font-extrabold text-heading">
              Masih ada pertanyaan?
            </p>
            <p className="mb-4 text-[12px] leading-relaxed text-muted">
              Tim kami siap bantu jawab via WhatsApp, respon di bawah 10 menit.
            </p>
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[12px] font-extrabold text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.55)] transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]"
            >
              <MessageCircle size={13} aria-hidden="true" />
              Chat Admin
            </a>
          </motion.div>
        </aside>

        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative mb-5"
          >
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari pertanyaan..."
              className="w-full rounded-full border border-line bg-white py-3 pl-10 pr-4 text-[13px] font-bold text-body-text outline-none transition-all placeholder:font-normal placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="space-y-3"
            >
              {items.length > 0 ? (
                items.map((f, i) => {
                  const k = `${f.id}-${i}`;
                  const isOpen = open === k;
                  return (
                    <motion.div
                      key={k}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
                      className={cn(
                        "rounded-[18px] border bg-white transition-all duration-300",
                        isOpen
                          ? "border-accent/40 shadow-elevated"
                          : "border-line hover:border-primary/30 shadow-card"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? "" : k)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-300 hover:bg-surface/40"
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                              isOpen ? "bg-accent text-white" : "bg-surface text-accent"
                            )}
                          >
                            <HelpCircle size={14} aria-hidden="true" />
                          </span>
                          <span className="text-[14px] font-extrabold text-heading md:text-[15px]">
                            {f.question}
                          </span>
                        </span>
                        <ChevronDown
                          size={16}
                          className={cn(
                            "shrink-0 text-muted transition-transform duration-300",
                            isOpen && "rotate-180 text-accent"
                          )}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 pl-[60px] text-[14px] leading-relaxed text-body-text">
                              {f.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <div className="rounded-[18px] border border-dashed border-line bg-white p-10 text-center">
                  <p className="text-sm font-extrabold text-heading">
                    Tidak ada pertanyaan yang cocok.
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Coba ubah kata kunci atau hubungi kami via WhatsApp.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}