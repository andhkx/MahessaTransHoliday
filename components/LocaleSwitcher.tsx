"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  isEn: boolean;
  switchHref: string;
  variant: "desktop" | "mobile";
};

export default function LocaleSwitcher({ isEn, switchHref, variant }: Props) {
  if (variant === "desktop") {
    return (
      <Link
        href={switchHref}
        aria-label={isEn ? "Switch to Indonesian" : "Switch to English"}
        className="flex h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3 text-xs font-extrabold uppercase tracking-[0.12em] text-body-text transition-all hover:border-accent hover:text-accent"
      >
        <Globe size={13} aria-hidden="true" />
        <span className={cn("transition-colors", isEn && "text-accent")}>EN</span>
        <span className="text-muted">/</span>
        <span className={cn("transition-colors", !isEn && "text-accent")}>ID</span>
      </Link>
    );
  }

  return (
    <Link
      href={switchHref}
      className="mt-2 flex items-center justify-center gap-2 rounded-full border border-line bg-white px-4 py-3 text-sm font-extrabold text-body-text hover:border-accent hover:text-accent"
    >
      <Globe size={14} aria-hidden="true" />
      <span className={cn(isEn ? "text-accent" : "text-muted")}>English</span>
      <span className="text-muted">/</span>
      <span className={cn(!isEn ? "text-accent" : "text-muted")}>Bahasa Indonesia</span>
    </Link>
  );
}
