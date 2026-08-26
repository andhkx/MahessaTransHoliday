"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { waGeneralLink } from "@/lib/whatsapp";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-white/75 shadow-sm backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-bold text-white">
            M
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight text-primary">
              Mahessa
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-widest text-accent">
              Trans Holiday
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-primary/5 hover:text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={waGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-accent/30 transition-colors hover:bg-accent-dark"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Buka menu navigasi"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-primary lg:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-gray-100 bg-white/95 px-4 pb-6 pt-2 backdrop-blur-lg lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-semibold",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-50",
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-xl bg-accent px-4 py-3 text-center text-sm font-bold text-white shadow-md shadow-accent/30"
            >
              Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
