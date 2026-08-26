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
      <header className="sticky top-0 z-[1000] border-b border-line bg-white/90 backdrop-blur-md">
        <nav className="container-site flex h-16 items-center justify-between lg:h-[72px]">
          <Link
            href="/"
            aria-label="Mahessa Trans Holiday - Beranda"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo_mahessa.png"
              alt="Logo Mahessa Trans Holiday"
              width={160}
              height={44}
              priority
              className="h-10 w-auto object-contain lg:h-11"
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-bold tracking-[-0.2px] text-body-text transition-colors duration-150 hover:text-primary",
                  pathname === link.href && "text-primary",
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
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              Tanya Admin
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label="Buka menu navigasi"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-accent transition-colors duration-150 hover:text-primary lg:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
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
          "fixed inset-0 z-[1100] flex flex-col bg-white transition-opacity duration-500 [transition-timing-function:var(--ease-standard)] lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="container-site flex h-16 items-center justify-between border-b border-line">
          <span className="text-xs font-extrabold uppercase tracking-wide text-primary">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup menu navigasi"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-accent transition-colors hover:text-primary"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="container-site mt-8 flex flex-col gap-1">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
              className={cn(
                "rounded-2xl px-4 py-4 text-2xl font-extrabold tracking-[-0.5px] transition-all duration-500 [transition-timing-function:var(--ease-standard)]",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                pathname === link.href ? "text-primary" : "text-accent",
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={waGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            style={{ transitionDelay: open ? "300ms" : "0ms" }}
            className={cn(
              "btn btn-primary btn-md mt-6 w-full transition-all duration-500",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            Tanya Admin
          </a>
        </nav>
      </div>
    </>
  );
}
