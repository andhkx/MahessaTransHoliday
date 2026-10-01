"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FilePlus2, History } from "lucide-react";
import { cn } from "@/lib/cn";

const TABS = [
  { href: "/admin/dashboard/kwitansi", label: "Buat Kwitansi", icon: FilePlus2 },
  { href: "/admin/dashboard/kwitansi/riwayat", label: "Riwayat", icon: History },
] as const;

export default function KwitansiTabs() {
  const pathname = usePathname();
  return (
    <div className="receipt-no-print mb-5 inline-flex items-center gap-1 rounded-2xl border border-line bg-white p-1.5 shadow-card">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold transition",
              active
                ? "bg-accent text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)]"
                : "text-muted hover:bg-accent/10 hover:text-accent",
            )}
          >
            <Icon size={14} />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
