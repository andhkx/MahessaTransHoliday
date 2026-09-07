"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, MessageCircle, X } from "lucide-react";
import { waGeneralLink } from "@/lib/whatsapp";
import { useLocale, useT } from "@/lib/i18n/client";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  const navLinks = [
    { href: "/", key: "beranda" },
    { href: "/armada", key: "armada" },
    { href: "/paket", key: "paket" },
    { href: "/artikel", key: "artikel" },
    { href: "/temukan", key: "temukan" },
    { href: "/galeri", key: "galeri" },
    { href: "/faq", key: "faq" },
    { href: "/kontak", key: "kontak" },
  ] as const;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        data-scrolled={scrolled}
        className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/80 backdrop-blur-xl transition-shadow duration-500 data-[scrolled=true]:shadow-[0_10px_30px_-12px_rgba(0,74,124,0.18)]"
      >
        <nav className="relative mx-auto flex h-16 max-w-[1300px] items-center justify-between px-5 sm:px-8 md:px-12">
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-90"
            aria-label={`${t.site.name} - ${t.nav.beranda}`}
          >
            <Image
              src="/images/logo_mahessa.png"
              alt={t.site.name}
              width={200}
              height={56}
              priority
              className="h-9 w-auto object-contain md:h-10"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const label = t.nav[link.key];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-sm font-bold tracking-[-0.2px] transition-colors duration-300 ${
                    active
                      ? "text-accent after:absolute after:-bottom-1.5 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-accent"
                      : "text-body-text hover:text-accent"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <LocaleSwitcher variant="desktop" />
            <a
              href="tel:+62895327077214"
              className="hidden items-center gap-2 text-sm font-bold text-body-text transition-colors hover:text-accent lg:flex"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-accent">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </span>
              <span className="leading-none">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                  {t.navbar.hotline}
                </span>
                <span className="block text-[13px] font-extrabold tracking-tight text-heading">
                  +62 895-3270-77214
                </span>
              </span>
            </a>
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center gap-2 whitespace-nowrap px-4 py-2.5 text-[13px]"
            >
              <MessageCircle size={14} aria-hidden="true" />
              {t.navbar.askAdmin}
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LocaleSwitcher variant="desktop" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.navbar.closeMenu : t.navbar.openMenu}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-wa-surface/60 text-heading"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {open && (
        <div className="fixed inset-x-4 top-20 z-40 rounded-[20px] border border-line bg-white/95 p-3 shadow-elevated backdrop-blur-xl md:hidden">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const label = t.nav[link.key];
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-sm font-bold ${
                  active ? "bg-primary/10 text-primary" : "text-body-text"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <LocaleSwitcher variant="mobile" />
          <a
            href={waGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-extrabold text-white"
          >
            <MessageCircle size={15} aria-hidden="true" />
            {t.navbar.askAdmin}
          </a>
        </div>
      )}
    </>
  );
}
