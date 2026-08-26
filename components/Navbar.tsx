"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, MessageCircle, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { waGeneralLink } from "@/lib/whatsapp";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

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
        className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/80 backdrop-blur-xl transition-shadow duration-500 data-[scrolled=true]:shadow-[0_10px_30px_-12px_rgba(35,51,45,0.18)]"
      >
        <nav className="mx-auto flex h-16 max-w-[1300px] items-center justify-between px-5 sm:px-8 md:px-12">
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-90"
            aria-label="Mahessa Trans Holiday - Beranda"
          >
            <Image
              src="/images/logo_mahessa.png"
              alt="Mahessa Trans Holiday"
              width={150}
              height={40}
              priority
              className="h-9 w-auto object-contain md:h-10"
            />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm font-bold tracking-[-0.2px] transition-colors duration-300 ${
                    active ? "text-primary" : "text-body-text hover:text-accent-hover"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[13px] font-extrabold text-white shadow-card transition-all hover:scale-[1.03] hover:bg-accent-hover active:scale-[0.97]"
            >
              <MessageCircle size={14} aria-hidden="true" />
              Tanya Admin
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-wa-surface/60 text-heading md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {open && (
        <div className="fixed inset-x-4 top-20 z-40 rounded-[20px] border border-line bg-white/95 p-3 shadow-elevated backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-sm font-bold ${
                  active ? "bg-primary/10 text-primary" : "text-body-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={waGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-extrabold text-white"
          >
            <MessageCircle size={15} aria-hidden="true" />
            Tanya Admin
          </a>
        </div>
      )}
    </>
  );
}
