"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/cn";
import { useLocale, useSetLocale, useT } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/dict";

type Props = { variant: "desktop" | "mobile" };

export default function LocaleSwitcher({ variant }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const setLocale = useSetLocale();
  const t = useT();
  const [pending, startTransition] = useTransition();
  const isEn = locale === "en";
  const next: Locale = isEn ? "id" : "en";

  const switchLocale = () => {
    setLocale(next);
    startTransition(() => router.refresh());
  };

  if (variant === "desktop") {
    return (
      <button
        type="button"
        onClick={switchLocale}
        disabled={pending}
        aria-label={isEn ? t.localeSwitcher.ariaId : t.localeSwitcher.ariaEn}
        className="flex h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3 text-xs font-extrabold uppercase tracking-[0.12em] text-body-text transition-all hover:border-accent hover:text-accent disabled:opacity-60"
      >
        <Globe size={13} aria-hidden="true" />
        <span className={cn("transition-colors", isEn && "text-accent")}>EN</span>
        <span className="text-muted">/</span>
        <span className={cn("transition-colors", !isEn && "text-accent")}>ID</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      disabled={pending}
      className="mt-2 flex items-center justify-center gap-2 rounded-full border border-line bg-white px-4 py-3 text-sm font-extrabold text-body-text hover:border-accent hover:text-accent disabled:opacity-60"
    >
      <Globe size={14} aria-hidden="true" />
      <span className={cn(isEn ? "text-accent" : "text-muted")}>English</span>
      <span className="text-muted">/</span>
      <span className={cn(!isEn ? "text-accent" : "text-muted")}>Bahasa Indonesia</span>
    </button>
  );
}
