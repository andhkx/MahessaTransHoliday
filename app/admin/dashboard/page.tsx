'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Activity,
  CarFront,
  MapPin,
  FileText,
  Star,
  MessageCircle,
  ImageIcon,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import ActivityChart from '@/components/admin/ActivityChart';

type EntityStats = {
  vehicles: { total: number; active: number };
  packages: { total: number; active: number };
  articles: { total: number; active: number };
  testimonials: { total: number; active: number };
  faq: { total: number; active: number };
  gallery: { total: number; active: number };
};

type ActivityLog = {
  id: string;
  user_email: string | null;
  action: string;
  entity_type: string;
  description: string | null;
  created_at: string;
};

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
  if (a === 'create') return Sparkles;
  if (a === 'delete') return ArrowUpRight;
  if (a === 'login') return Activity;
  return TrendingUp;
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
  if (diffMin < 60) return `${diffMin} menit`;
  if (diffHour < 24) return `${diffHour} jam`;
  if (diffDay < 7) return `${diffDay} hari`;
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
};

export default function DashboardPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [entityStats, setEntityStats] = useState<EntityStats>({
    vehicles: { total: 0, active: 0 },
    packages: { total: 0, active: 0 },
    articles: { total: 0, active: 0 },
    testimonials: { total: 0, active: 0 },
    faq: { total: 0, active: 0 },
    gallery: { total: 0, active: 0 },
  });
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [chartData, setChartData] = useState<{ day: string; count: number }[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setLoading(false);
        loadAll();
      }
    };
    getUser();
  }, [supabase]);

  const loadAll = async () => {
    await Promise.all([loadEntityStats(), loadActivity()]);
  };

  const loadEntityStats = async () => {
    const tally = async (
      table: 'vehicles' | 'packages' | 'articles' | 'testimonials' | 'faq_items' | 'gallery_items'
    ) => {
      const [totalRes, activeRes] = await Promise.all([
        supabase.from(table).select('id', { count: 'exact', head: true }),
        supabase.from(table).select('id', { count: 'exact', head: true }).eq('is_active', true),
      ]);
      return {
        total: totalRes.count || 0,
        active: activeRes.count || 0,
      };
    };
    const [vehicles, packages, articles, testimonials, faq, gallery] =
      await Promise.all([
        tally('vehicles'),
        tally('packages'),
        tally('articles'),
        tally('testimonials'),
        tally('faq_items'),
        tally('gallery_items'),
      ]);
    setEntityStats({ vehicles, packages, articles, testimonials, faq, gallery });
  };

  const loadActivity = async () => {
    const { data } = await supabase
      .from('activity_logs')
      .select('id,user_email,action,entity_type,description,created_at')
      .order('created_at', { ascending: false })
      .limit(8);
    if (data) setActivities(data);

    const since = new Date();
    since.setDate(since.getDate() - 6);
    since.setHours(0, 0, 0, 0);
    const { data: all } = await supabase
      .from('activity_logs')
      .select('created_at')
      .gte('created_at', since.toISOString());
    const buckets: Record<string, number> = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(since);
      d.setDate(since.getDate() + i);
      buckets[d.toISOString().slice(0, 10)] = 0;
    }
    (all || []).forEach((r: any) => {
      const k = r.created_at.slice(0, 10);
      if (k in buckets) buckets[k] += 1;
    });
    setChartData(
      Object.entries(buckets).map(([day, count]) => ({
        day: new Date(day).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
        }),
        count,
      }))
    );
  };

  if (loading) {
    return (
      <AdminDashboardLayout title="Dashboard" hideStats>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-3 border-accent border-t-transparent" />
            <p className="text-muted text-sm">Memuat dashboard...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  const totals = {
    active: entityStats.vehicles.active + entityStats.packages.active,
    total:
      entityStats.vehicles.total + entityStats.packages.total,
  };

  const statsData = [
    { icon: CarFront, label: 'Armada', value: entityStats.vehicles.active, total: entityStats.vehicles.total, tone: 'accent' },
    { icon: MapPin, label: 'Paket', value: entityStats.packages.active, total: entityStats.packages.total, tone: 'success' },
    { icon: FileText, label: 'Artikel', value: entityStats.articles.active, total: entityStats.articles.total, tone: 'primary' },
    { icon: ImageIcon, label: 'Galeri', value: entityStats.gallery.active, total: entityStats.gallery.total, tone: 'warning' },
    { icon: Star, label: 'Testimoni', value: entityStats.testimonials.active, total: entityStats.testimonials.total, tone: 'warning' },
    { icon: MessageCircle, label: 'FAQ', value: entityStats.faq.active, total: entityStats.faq.total, tone: 'error' },
  ];

  const quickActions = [
    { icon: CarFront, label: 'Tambah Armada', href: '/admin/dashboard/armada/new', tone: 'accent' },
    { icon: MapPin, label: 'Tambah Paket', href: '/admin/dashboard/paket/new', tone: 'success' },
    { icon: FileText, label: 'Tulis Artikel', href: '/admin/dashboard/artikel/new', tone: 'primary' },
    { icon: ImageIcon, label: 'Upload Galeri', href: '/admin/dashboard/galeri/new', tone: 'warning' },
    { icon: Star, label: 'Tambah Testimoni', href: '/admin/dashboard/testimoni/new', tone: 'warning' },
    { icon: MessageCircle, label: 'Tambah FAQ', href: '/admin/dashboard/faq/new', tone: 'error' },
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
    <AdminDashboardLayout
      eyebrow={greeting}
      subtitle={`Halo, ${firstName} 👋 Kelola armada, paket perjalanan, dan konten website dari satu tempat.`}
      title="Dashboard"
      stats={statsData}
    >
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

      {/* Activity chart */}
      <section className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-5 mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <TrendingUp size={16} strokeWidth={2} />
            </div>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-0.5">
                7 Hari Terakhir
              </p>
              <h3 className="text-base font-extrabold text-heading">
                Aktivitas Admin
              </h3>
            </div>
          </div>
        </div>
        <ActivityChart data={chartData} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Status Website */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-line shadow-card overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-line flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-0.5">
                Status Website
              </p>
              <h3 className="text-base sm:text-lg font-extrabold text-heading">
                Ringkasan Publikasi
              </h3>
            </div>
            <Link
              href="/admin/dashboard/armada"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
            >
              Kelola <ArrowRight size={12} />
            </Link>
          </div>
          <div className="p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl border border-line bg-gradient-to-br from-accent/[0.04] to-transparent">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                Ditampilkan
              </p>
              <p className="text-2xl font-extrabold text-heading mt-1">
                {totals.active}
              </p>
              <p className="text-[11px] text-muted mt-0.5">
                item aktif di website
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-line bg-gradient-to-br from-warning/[0.04] to-transparent">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                Disembunyikan
              </p>
              <p className="text-2xl font-extrabold text-heading mt-1">
                {totals.total - totals.active}
              </p>
              <p className="text-[11px] text-muted mt-0.5">
                item nonaktif
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-line bg-gradient-to-br from-success/[0.04] to-transparent">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                Total
              </p>
              <p className="text-2xl font-extrabold text-heading mt-1">
                {totals.total}
              </p>
              <p className="text-[11px] text-muted mt-0.5">
                armada + paket
              </p>
            </div>
          </div>
          <div className="p-4 sm:p-5 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/admin/dashboard/armada"
              className="flex items-center gap-3 p-3 rounded-xl border border-line hover:bg-accent/5 hover:border-accent transition"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent flex-shrink-0">
                <CarFront size={18} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-heading">Kelola Armada</p>
                <p className="text-[11px] text-muted">
                  {entityStats.vehicles.active}/{entityStats.vehicles.total} aktif
                </p>
              </div>
              <ArrowRight size={14} className="text-muted" />
            </Link>
            <Link
              href="/admin/dashboard/paket"
              className="flex items-center gap-3 p-3 rounded-xl border border-line hover:bg-success/5 hover:border-success transition"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success flex-shrink-0">
                <MapPin size={18} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-heading">Kelola Paket</p>
                <p className="text-[11px] text-muted">
                  {entityStats.packages.active}/{entityStats.packages.total} aktif
                </p>
              </div>
              <ArrowRight size={14} className="text-muted" />
            </Link>
          </div>
        </div>

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
                        <span>{formatTime(a.created_at)} lalu</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}