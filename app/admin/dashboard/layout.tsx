'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { CarFront, MapPin, FileText, Star, LogOut, LayoutDashboard, Plus, MessageCircle } from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  desc: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Armada', href: '/admin/dashboard/armada', icon: CarFront, desc: 'Kelola data kendaraan' },
  { label: 'Paket', href: '/admin/dashboard/paket', icon: MapPin, desc: 'Kelola paket perjalanan' },
  { label: 'Artikel', href: '/admin/dashboard/artikel', icon: FileText, desc: 'Kelola blog/artikel' },
  { label: 'Testimoni', href: '/admin/dashboard/testimoni', icon: Star, desc: 'Kelola testimoni pelanggan' },
  { label: 'FAQ', href: '/admin/dashboard/faq', icon: MessageCircle, desc: 'Kelola pertanyaan jawab' },
];

export default function AdminDashboardLayout({
  children,
  stats,
  title,
}: {
  children: React.ReactNode;
  stats?: Array<{ icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>; label: string; value: number; }>;
  title?: string;
}) {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-line flex flex-col z-10 shadow-card">
        {/* Brand */}
        <div className="p-5 border-b border-line flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
            <LayoutDashboard size={18} className="text-accent" />
          </div>
          <h1 className="text-lg font-extrabold text-heading">Mahessa Admin</h1>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-heading hover:bg-accent/10 transition-all"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon size={16} />
                </div>
                <span className="flex-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick add links */}
        <div className="p-3 border-t border-line">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted mb-2 px-2">Menu Cepat</p>
          <div className="space-y-0.5">
            <Link href="/admin/dashboard/armada/new" className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted hover:text-accent hover:bg-accent/10 rounded-xl transition">
              <Plus size={12} /> Tambah Armada
            </Link>
            <Link href="/admin/dashboard/paket/new" className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted hover:text-accent hover:bg-accent/10 rounded-xl transition">
              <Plus size={12} /> Tambah Paket
            </Link>
            <Link href="/admin/dashboard/artikel/new" className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted hover:text-accent hover:bg-accent/10 rounded-xl transition">
              <Plus size={12} /> Tulis Artikel
            </Link>
            <Link href="/admin/dashboard/testimoni/new" className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted hover:text-accent hover:bg-accent/10 rounded-xl transition">
              <Plus size={12} /> Tambah Testimoni
            </Link>
            <Link href="/admin/dashboard/faq/new" className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted hover:text-accent hover:bg-accent/10 rounded-xl transition">
              <Plus size={12} /> Tambah FAQ
            </Link>
          </div>
        </div>

        {/* User menu */}
        <div className="p-3 border-t border-line">
          {user?.email ? (
            <>
              <p className="text-xs text-muted truncate px-2 mb-2" title={user.email}>{user.email}</p>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-error rounded-xl hover:bg-error/10 transition"
              >
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <Link href="/admin/login" className="block text-xs text-accent hover:underline px-2">Login</Link>
          )}
        </div>
      </aside>

      {/* Main content area */}
      <div className="ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-[5] bg-white/80 backdrop-blur-md border-b border-line px-8 py-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-heading">{title || 'Dashboard'}</h2>
          {user?.email && (
            <p className="text-sm text-muted">Selamat datang kembali</p>
          )}
        </header>

        {/* Stats row */}
        {stats && stats.length > 0 && (
          <section className="px-8 pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-[18px] border border-line shadow-card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Icon size={20} strokeWidth={1.8} />
                      </div>
                      <span className="text-2xl font-extrabold text-heading">{s.value}</span>
                    </div>
                    <p className="text-xs text-muted uppercase tracking-[0.16em] font-bold">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Page content */}
        <main className="flex-1 px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
