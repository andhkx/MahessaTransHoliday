"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/constants";
import { waGeneralLink } from "@/lib/whatsapp";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-[1000] bg-navy shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
        <nav className="container-site flex h-16 items-center justify-between lg:h-[72px] lg:px-8 xl:px-0">
          <Link
            href="/"
            aria-label="Mahessa Trans Holiday - Beranda"
            className="inline-flex items-center rounded-lg bg-white px-2.5 py-1.5"
          >
            <Image
              src="/images/logo_mahessa.png"
              alt="Logo Mahessa Trans Holiday"
              width={160}
              height={40}
              priority
              className="h-8 w-auto object-contain lg:h-9"
            />
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[15px] font-medium text-white transition-colors duration-300 hover:text-sky",
                  pathname === link.href && "font-semibold text-sky",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hidden rounded-lg !bg-primary px-6 py-3 text-[15px] shadow-btn hover:!bg-secondary sm:inline-flex"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label="Buka menu navigasi"
              className="relative flex h-11 w-11 items-center justify-center rounded-lg text-white transition-colors duration-300 hover:text-sky lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span
                aria-hidden="true"
                className="absolute h-0.5 w-6 -translate-y-[7px] rounded-full bg-current transition-transform duration-300"
              />
              <span
                aria-hidden="true"
                className="absolute h-0.5 w-6 rounded-full bg-current transition-opacity duration-200"
              />
              <span
                aria-hidden="true"
                className="absolute h-0.5 w-6 translate-y-[7px] rounded-full bg-current transition-transform duration-300"
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[1100] flex flex-col bg-black/95 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="container-site flex h-16 items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup menu navigasi"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-white transition-colors duration-300 hover:text-secondary"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="container-site mt-10 flex flex-col gap-3">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              className={cn(
                "min-h-[52px] rounded-xl px-5 py-4 text-3xl font-bold transition-all duration-500 [transition-timing-function:var(--ease-out-expo)]",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                pathname === link.href
                  ? "text-secondary"
                  : "text-white hover:text-secondary",
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={waGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            style={{ transitionDelay: open ? "320ms" : "0ms" }}
            className={cn(
              "btn btn-primary btn-md mt-8 w-full transition-all duration-500",
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            Konsultasi via WhatsApp
          </a>
        </nav>
      </div>
    </>
  );
}
