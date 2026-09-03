'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CarFront,
  MapPin,
  FileText,
  Star,
  MessageCircle,
  ImageIcon,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Activity,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/cn';

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Armada', href: '/admin/dashboard/armada', icon: CarFront },
  { label: 'Paket', href: '/admin/dashboard/paket', icon: MapPin },
  { label: 'Artikel', href: '/admin/dashboard/artikel', icon: FileText },
  { label: 'Galeri', href: '/admin/dashboard/galeri', icon: ImageIcon },
  { label: 'Testimoni', href: '/admin/dashboard/testimoni', icon: Star },
  { label: 'FAQ', href: '/admin/dashboard/faq', icon: MessageCircle },
  { label: 'Log', href: '/admin/dashboard/log', icon: Activity },
];

const VERCEL_ANALYTICS_URL =
  'https://vercel.com/andhkx-gmailcoms-projects/mahessa-trans-holiday/analytics';

function getBreadcrumb(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length <= 2) return [{ label: 'Dashboard', href: '/admin/dashboard' }];
  const crumbs: { label: string; href: string }[] = [
    { label: 'Dashboard', href: '/admin/dashboard' },
  ];
  let acc = '';
  for (const seg of segments.slice(2)) {
    acc += '/' + seg;
    const href = '/admin/dashboard' + acc;
    const knownLabel = NAV_ITEMS.find((n) => n.href === '/admin/dashboard/' + seg)?.label;
    crumbs.push({ label: knownLabel || (seg === 'new' ? 'Buat Baru' : seg), href });
  }
  return crumbs;
}

export default function AdminDashboardLayout({
  children,
  stats,
  title,
  eyebrow,
  subtitle,
  hideStats,
}: {
  children: React.ReactNode;
  stats?: Array<{
    icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
    label: string;
    value: number;
    tone?: string;
  }>;
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  hideStats?: boolean;
}) {
  const supabase = createClient();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumb(pathname);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  const userInitials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'AD';

  const currentSection = NAV_ITEMS.find((n) => pathname.startsWith(n.href));
  const showStats = !hideStats && stats && stats.length > 0;

  return (
    <div className="min-h-screen bg-surface">
      {/* Top Navbar (floating pill, glass) */}
      <header className="sticky top-0 z-50">
        <div className="mx-auto max-w-[1300px] px-3 sm:px-5 pt-3 sm:pt-4">
          <div className="flex items-center justify-between h-14 gap-3 px-2 sm:px-3 bg-white/85 backdrop-blur-xl border border-line rounded-2xl shadow-card">
            <div className="mx-auto max-w-[1280px] w-full flex items-center justify-between gap-3 px-1 sm:px-2">
              {/* Brand */}
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2.5 flex-shrink-0"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)]">
                  <LayoutDashboard size={18} />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-sm font-extrabold text-heading leading-tight">Mahessa Admin</h1>
                  <p className="text-[10px] text-muted leading-tight">Dashboard Panel</p>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const active = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors',
                        active
                          ? 'bg-accent text-white'
                          : 'text-body-text hover:bg-accent/10 hover:text-accent'
                      )}
                    >
                      <Icon size={14} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={VERCEL_ANALYTICS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line bg-white text-xs font-bold text-heading hover:bg-accent/10 hover:border-accent transition"
                  title="Buka Vercel Analytics"
                >
                  <BarChart3 size={12} />
                  Analytics
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line bg-white text-xs font-bold text-heading hover:bg-accent/10 hover:border-accent transition"
                  title="Lihat website"
                >
                  <ExternalLink size={12} />
                  <span className="hidden md:inline">Lihat Web</span>
                </Link>

                {/* User menu (desktop) */}
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 px-1.5 pr-2.5 py-1 rounded-xl border border-line bg-white hover:bg-accent/10 transition"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white font-extrabold text-[10px]">
                      {userInitials}
                    </div>
                    <span className="hidden md:block text-xs font-bold text-heading max-w-[100px] truncate">
                      {user?.email?.split('@')[0] || 'Admin'}
                    </span>
                    <ChevronDown size={12} className="text-muted hidden md:block" />
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-line shadow-elevated z-40 overflow-hidden">
                        <div className="p-3 border-b border-line">
                          <p className="text-xs font-bold text-heading truncate">
                            {user?.email || 'admin@mahessa.id'}
                          </p>
                          <p className="text-[10px] text-muted">Administrator</p>
                        </div>
                        <div className="p-1">
                          <Link
                            href={VERCEL_ANALYTICS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="md:hidden flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-heading hover:bg-accent/10 rounded-xl transition"
                          >
                            <BarChart3 size={14} /> Vercel Analytics
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-error hover:bg-error/10 rounded-xl transition"
                          >
                            <LogOut size={14} /> Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile menu trigger */}
                <button
                  onClick={() => setMenuOpen(true)}
                  className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-heading hover:bg-accent/10 transition"
                  aria-label="Buka menu"
                >
                  <Menu size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-elevated flex flex-col">
            <div className="p-4 border-b border-line flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-heading">Menu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-surface text-muted"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                      active
                        ? 'bg-accent text-white'
                        : 'text-heading hover:bg-accent/10'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg',
                        active ? 'bg-white/20' : 'bg-accent/10 text-accent'
                      )}
                    >
                      <Icon size={16} />
                    </div>
                    <span className="flex-1">{item.label}</span>
                  </Link>
                );
              })}
              <Link
                href={VERCEL_ANALYTICS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-heading hover:bg-accent/10"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <BarChart3 size={16} />
                </div>
                <span className="flex-1">Vercel Analytics</span>
              </Link>
            </nav>

            <div className="p-3 border-t border-line space-y-1">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-3 py-2 text-sm text-heading hover:bg-accent/10 rounded-xl transition"
              >
                <ExternalLink size={14} /> Lihat Website
              </Link>
              {user?.email && (
                <div className="px-3 py-2 border-t border-line mt-1 pt-3">
                  <p className="text-xs text-muted truncate" title={user.email}>{user.email}</p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-xl transition"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-hero (matches public PageHero style) */}
      <div className="relative overflow-hidden bg-gradient-to-b from-surface to-background pb-10 pt-8 md:pb-14 md:pt-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-accent/[0.08] blur-3xl"
        />
        <div className="mx-auto w-full max-w-[1300px] relative px-5 sm:px-8 md:px-12">
          <span className="mb-3 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            {eyebrow || currentSection?.label || 'Dashboard'}
          </span>
          <h1 className="mb-3 max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading md:text-[40px]">
            {title || 'Dashboard'}
          </h1>
          {subtitle && (
            <p className="max-w-2xl text-[15px] leading-relaxed text-body-text md:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Stats row */}
      {showStats && (
        <section className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12 -mt-4 sm:-mt-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {stats!.map((s) => {
              const Icon = s.icon;
              const toneBg =
                (
                  {
                    accent: 'bg-accent/10 text-accent',
                    success: 'bg-success/10 text-success',
                    primary: 'bg-primary/10 text-primary',
                    warning: 'bg-warning/10 text-warning',
                    error: 'bg-error/10 text-error',
                  } as Record<string, string>
                )[s.tone || 'accent'] || 'bg-accent/10 text-accent';
              return (
                <div
                  key={s.label}
                  className="relative bg-white rounded-2xl border border-line shadow-card p-4 sm:p-5 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div
                      className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl ${toneBg}`}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <span className="text-xl sm:text-2xl font-extrabold text-heading">
                      {s.value}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.16em] font-bold truncate">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Page content */}
      <main className="flex-1 mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12 pt-6 pb-12">
        {children}
      </main>
    </div>
  );
}