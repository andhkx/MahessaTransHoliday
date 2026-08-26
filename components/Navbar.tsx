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
      <header className="glass-nav fixed inset-x-0 top-0 z-[1000]">
        <nav className="container-site flex h-[60px] items-center justify-between lg:h-[70px] lg:px-6 xl:px-0">
          <Link
            href="/"
            aria-label="Mahessa Trans Holiday - Beranda"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo_mahessa.png"
              alt="Logo Mahessa Trans Holiday"
              width={160}
              height={40}
              priority
              className="h-9 w-auto object-contain lg:h-10"
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-base font-medium text-black transition-colors duration-200 hover:text-primary",
                  pathname === link.href && "font-semibold text-primary",
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
              className="btn btn-primary btn-sm"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label="Buka menu navigasi"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-black transition-colors hover:text-primary lg:hidden"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
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
        <div className="container-site flex h-[60px] items-center justify-between">
          <span className="text-caption font-semibold uppercase text-white/60">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup menu navigasi"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:text-accent"
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
        <nav className="container-site mt-8 flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${i * 40}ms` }}
              className={cn(
                "rounded-xl px-4 py-4 text-2xl font-semibold transition-all duration-300",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                pathname === link.href
                  ? "bg-white/10 text-accent"
                  : "text-white hover:bg-white/5 hover:text-accent",
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={waGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-md mt-6 w-full"
          >
            Konsultasi via WhatsApp
          </a>
        </nav>
      </div>
    </>
  );
}
