'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Activity,
  Plus,
  Pencil,
  Trash2,
  ArrowRight,
  History,
  CarFront,
  MapPin,
  FileText,
  Star,
  MessageCircle,
  ImageIcon,
} from 'lucide-react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

type Stats = {
  vehicles: number;
  packages: number;
  articles: number;
  testimonials: number;
  faq: number;
  gallery: number;
};

type RecentVehicle = {
  id: string;
  name: string;
  category: string;
  price_per_day: number;
  created_at: string;
};

type RecentPackage = {
  id: string;
  name: string;
  destination: string;
  price: number;
  created_at: string;
};

type RecentTestimonial = {
  id: string;
  name: string;
  rating: number;
  created_at: string;
};

type ActivityLog = {
  id: string;
  user_email: string | null;
  action: string;
  entity_type: string;
  description: string | null;
  created_at: string;
};

const categoryLabel = (c: string) =>
  (
    {
      entry: 'City Car',
      midrange: 'MPV',
      premium: 'SUV & Premium',
      luxury: 'Luxury',
      group: 'Group',
    } as Record<string, string>
  )[c] || c;

const categoryStyle = (c: string) =>
  (
    {
      entry: 'bg-success/15 text-success',
      midrange: 'bg-accent/15 text-accent',
      premium: 'bg-primary/15 text-primary',
      luxury: 'bg-warning/15 text-warning',
      group: 'bg-error/15 text-error',
    } as Record<string, string>
  )[c] || 'bg-muted/15 text-muted';

const actionStyle = (a: string) =>
  (
    {
      create: 'bg-success/15 text-success',
      update: 'bg-accent/15 text-accent',
      delete: 'bg-error/15 text-error',
      login: 'bg-primary/15 text-primary',
    } as Record<string, string>
  )[a] || 'bg-muted/15 text-muted';

const actionIcon = (a: string) => {
  if (a === 'create') return Plus;
  if (a === 'delete') return Trash2;
  if (a === 'login') return History;
  return Pencil;
};

const entityLabel = (e: string) =>
  (
    {
      vehicle: 'Armada',
      package: 'Paket',
      article: 'Artikel',
      gallery: 'Galeri',
      testimonial: 'Testimoni',
      faq: 'FAQ',
    } as Record<string, string>
  )[e] || e;

const formatTime = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  if (diffMin < 1) return 'baru saja';
  if (diffMin < 60) return `${diffMin} menit lalu`;
  if (diffHour < 24) return `${diffHour} jam lalu`;
  if (diffDay < 7) return `${diffDay} hari lalu`;
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
};

export default function DashboardPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    vehicles: 0,
    packages: 0,
    articles: 0,
    testimonials: 0,
    faq: 0,
    gallery: 0,
  });
  const [recentVehicles, setRecentVehicles] = useState<RecentVehicle[]>([]);
  const [recentPackages, setRecentPackages] = useState<RecentPackage[]>([]);
  const [recentTestimonials, setRecentTestimonials] = useState<RecentTestimonial[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        // middleware handles redirect
      } else {
        setUser(user);
        setLoading(false);
        loadAll();
      }
    };
    getUser();
  }, [supabase]);

  const loadAll = async () => {
    await Promise.all([loadStats(), loadRecentData(), loadActivity()]);
  };

  const loadStats = async () => {
    try {
      const [vehicles, packages, articles, testimonials, faq, gallery] =
        await Promise.all([
          supabase
            .from('vehicles')
            .select('id', { count: 'exact', head: true })
            .eq('is_active', true),
          supabase
            .from('packages')
            .select('id', { count: 'exact', head: true })
            .eq('is_active', true),
          supabase
            .from('articles')
            .select('id', { count: 'exact', head: true }),
          supabase
            .from('testimonials')
            .select('id', { count: 'exact', head: true })
            .eq('is_active', true),
          supabase
            .from('faq_items')
            .select('id', { count: 'exact', head: true })
            .eq('is_active', true),
          supabase
            .from('gallery_items')
            .select('id', { count: 'exact', head: true })
            .eq('is_active', true),
        ]);
      setStats({
        vehicles: vehicles.count || 0,
        packages: packages.count || 0,
        articles: articles.count || 0,
        testimonials: testimonials.count || 0,
        faq: faq.count || 0,
        gallery: gallery.count || 0,
      });
    } catch (e) {
      console.error('Failed to load stats:', e);
    }
  };

  const loadRecentData = async () => {
    try {
      const [vehiclesRes, packagesRes, testimonialsRes] = await Promise.all([
        supabase
          .from('vehicles')
          .select('id,name,category,price_per_day,created_at')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('packages')
          .select('id,name,destination,price,created_at')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('testimonials')
          .select('id,name,rating,created_at')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(5),
      ]);
      if (vehiclesRes.data) setRecentVehicles(vehiclesRes.data);
      if (packagesRes.data) setRecentPackages(packagesRes.data);
      if (testimonialsRes.data) setRecentTestimonials(testimonialsRes.data);
    } catch (e) {
      console.error('Failed to load recent data:', e);
    }
  };

  const loadActivity = async () => {
    try {
      const { data } = await supabase
        .from('activity_logs')
        .select('id,user_email,action,entity_type,description,created_at')
        .order('created_at', { ascending: false })
        .limit(8);
      if (data) setActivities(data);
    } catch (e) {
      console.error('Failed to load activity:', e);
    }
  };

  if (loading) {
    return (
      <AdminDashboardLayout title="Dashboard">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-3 border-accent border-t-transparent" />
            <p className="text-muted text-sm">Memuat dashboard...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  const statsData = [
    { icon: CarFront, label: 'Armada', value: stats.vehicles, tone: 'accent' },
    { icon: MapPin, label: 'Paket', value: stats.packages, tone: 'success' },
    { icon: FileText, label: 'Artikel', value: stats.articles, tone: 'primary' },
    { icon: ImageIcon, label: 'Galeri', value: stats.gallery, tone: 'warning' },
    { icon: Star, label: 'Testimoni', value: stats.testimonials, tone: 'warning' },
    { icon: MessageCircle, label: 'FAQ', value: stats.faq, tone: 'error' },
  ];

  const quickActions = [
    { icon: Plus, label: 'Tambah Armada', href: '/admin/dashboard/armada/new', tone: 'accent' },
    { icon: Plus, label: 'Tambah Paket', href: '/admin/dashboard/paket/new', tone: 'success' },
    { icon: Plus, label: 'Tulis Artikel', href: '/admin/dashboard/artikel/new', tone: 'primary' },
    { icon: Plus, label: 'Upload Galeri', href: '/admin/dashboard/galeri/new', tone: 'warning' },
    { icon: Plus, label: 'Tambah Testimoni', href: '/admin/dashboard/testimoni/new', tone: 'warning' },
    { icon: Plus, label: 'Tambah FAQ', href: '/admin/dashboard/faq/new', tone: 'error' },
  ];

  const toneToBg = (tone: string) =>
    (
      {
        accent: 'bg-accent/10 text-accent',
        success: 'bg-success/10 text-success',
        primary: 'bg-primary/10 text-primary',
        warning: 'bg-warning/10 text-warning',
        error: 'bg-error/10 text-error',
      } as Record<string, string>
    )[tone] || 'bg-accent/10 text-accent';

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 11) return 'Selamat pagi';
    if (h < 15) return 'Selamat siang';
    if (h < 18) return 'Selamat sore';
    return 'Selamat malam';
  })();

  const firstName = user?.email?.split('@')[0] || 'Admin';

  return (
    <AdminDashboardLayout title="Dashboard" stats={statsData}>
      {/* Welcome banner — matches public PageHero vibe */}
      <section className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-accent via-[#0069a8] to-[#004a7c] p-5 sm:p-7 mb-6 sm:mb-8 shadow-elevated">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -bottom-20 h-60 w-60 rounded-full bg-white/[0.06] blur-3xl"
        />
        <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-white/70 mb-2">
              {greeting}
            </p>
            <h2 className="text-2xl sm:text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
              Halo, {firstName} 👋
            </h2>
            <p className="text-sm sm:text-base text-white/80 mt-1.5 max-w-md">
              Kelola armada, paket perjalanan, dan konten website dari satu tempat.
            </p>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-[11px] font-mono uppercase tracking-[0.2em]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
            Live · Vercel Analytics aktif
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-1">
              Aksi Cepat
            </p>
            <h3 className="text-lg font-extrabold text-heading">
              Tambah konten baru
            </h3>
          </div>
          <Link
            href="/admin/dashboard/armada"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
          >
            Lihat semua <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.label}
                href={a.href}
                className="group relative flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl border border-line bg-white hover:border-accent hover:shadow-card transition-all text-center overflow-hidden"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneToBg(a.tone)} group-hover:scale-110 transition-transform`}
                >
                  <Icon size={18} strokeWidth={2} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-heading">
                  {a.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left col: recent entities */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Recent Vehicles */}
          <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-line flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-0.5">
                  Data Terbaru
                </p>
                <h3 className="text-base sm:text-lg font-extrabold text-heading">
                  Armada Terbaru
                </h3>
              </div>
              <Link
                href="/admin/dashboard/armada"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
              >
                Lihat semua <ArrowRight size={12} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface/50">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                      Armada
                    </th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-muted hidden sm:table-cell">
                      Kategori
                    </th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-muted hidden md:table-cell">
                      Harga
                    </th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                      Baru
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {recentVehicles.length === 0 ? (
                    <tr>
                      <td
                        className="px-4 py-8 text-center text-muted text-sm"
                        colSpan={4}
                      >
                        Belum ada armada
                      </td>
                    </tr>
                  ) : (
                    recentVehicles.map((v) => (
                      <tr key={v.id} className="hover:bg-surface/50 transition">
                        <td className="px-4 py-3">
                          <Link
                            href={`/admin/dashboard/armada/${v.id}`}
                            className="font-bold text-heading hover:text-accent"
                          >
                            {v.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${categoryStyle(v.category)}`}
                          >
                            {categoryLabel(v.category)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right hidden md:table-cell font-bold text-accent">
                          Rp{(v.price_per_day / 1000).toFixed(0)}rb
                        </td>
                        <td className="px-4 py-3 text-right text-xs text-muted">
                          {new Date(v.created_at).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Packages */}
          <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-line flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-0.5">
                  Data Terbaru
                </p>
                <h3 className="text-base sm:text-lg font-extrabold text-heading">
                  Paket Terbaru
                </h3>
              </div>
              <Link
                href="/admin/dashboard/paket"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
              >
                Lihat semua <ArrowRight size={12} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface/50">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                      Paket
                    </th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-muted hidden sm:table-cell">
                      Destinasi
                    </th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-muted hidden md:table-cell">
                      Harga
                    </th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                      Baru
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {recentPackages.length === 0 ? (
                    <tr>
                      <td
                        className="px-4 py-8 text-center text-muted text-sm"
                        colSpan={4}
                      >
                        Belum ada paket
                      </td>
                    </tr>
                  ) : (
                    recentPackages.map((p) => (
                      <tr key={p.id} className="hover:bg-surface/50 transition">
                        <td className="px-4 py-3">
                          <Link
                            href={`/admin/dashboard/paket/${p.id}`}
                            className="font-bold text-heading hover:text-accent"
                          >
                            {p.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell text-sm text-muted">
                          {p.destination}
                        </td>
                        <td className="px-4 py-3 text-right hidden md:table-cell font-bold text-accent">
                          Rp{(p.price / 1000).toFixed(0)}rb
                        </td>
                        <td className="px-4 py-3 text-right text-xs text-muted">
                          {new Date(p.created_at).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right col: activity log + testimonials */}
        <div className="space-y-4 sm:space-y-6">
          {/* Activity Log */}
          <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-line flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Activity size={16} strokeWidth={2} />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-0.5">
                    Realtime
                  </p>
                  <h3 className="text-base font-extrabold text-heading">
                    Log Aktivitas
                  </h3>
                </div>
              </div>
              <Link
                href="/admin/dashboard/log"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
              >
                Semua <ArrowRight size={12} />
              </Link>
            </div>
            <div className="p-2 sm:p-3 space-y-1 max-h-[420px] overflow-y-auto">
              {activities.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-muted text-sm">Belum ada aktivitas</p>
                  <p className="text-muted/70 text-xs mt-1">
                    Aktivitas login & CRUD akan muncul di sini
                  </p>
                </div>
              ) : (
                activities.map((a) => {
                  const Icon = actionIcon(a.action);
                  return (
                    <div
                      key={a.id}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-surface/50 transition group"
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${actionStyle(a.action)}`}
                      >
                        <Icon size={14} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-heading truncate">
                          {a.description || `${a.action} ${entityLabel(a.entity_type)}`}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-muted">
                          <span className="font-mono truncate max-w-[120px]">
                            {a.user_email?.split('@')[0] || 'system'}
                          </span>
                          <span className="text-line">·</span>
                          <span>{formatTime(a.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="p-3 sm:p-4 border-t border-line sm:hidden">
              <Link
                href="/admin/dashboard/log"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
              >
                Lihat semua log <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Recent Testimonials */}
          <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-line flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-extrabold text-heading">
                Testimoni Terbaru
              </h3>
              <Link
                href="/admin/dashboard/testimoni"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
              >
                Lihat semua <ArrowRight size={12} />
              </Link>
            </div>
            <div className="p-4 sm:p-5 space-y-3">
              {recentTestimonials.length === 0 ? (
                <p className="text-center text-muted py-4 text-sm">
                  Belum ada testimoni
                </p>
              ) : (
                recentTestimonials.map((t) => (
                  <Link
                    key={t.id}
                    href={`/admin/dashboard/testimoni/${t.id}`}
                    className="flex items-start gap-3 p-3 rounded-xl border border-line hover:bg-accent/5 hover:border-accent transition group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent flex-shrink-0">
                      <History size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-heading text-sm truncate group-hover:text-accent transition">
                        {t.name}
                      </p>
                      <p className="text-[10px] text-muted mt-1">
                        {new Date(t.created_at).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}