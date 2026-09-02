'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import {
  CarFront,
  MapPin,
  FileText,
  Star,
  MessageCircle,
  ImageIcon,
  Clock,
  TrendingUp,
  ArrowRight,
  MoreHorizontal,
  Calendar,
} from 'lucide-react';
import { formatIDR } from '@/lib/format';
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

const categoryLabel = (c: string) =>
  ({ entry: 'City Car', midrange: 'MPV', premium: 'SUV & Premium', luxury: 'Luxury', group: 'Group' })[c] || c;

const categoryStyle = (c: string) =>
  ({ entry: 'bg-success/20 text-success', midrange: 'bg-accent/20 text-accent', premium: 'bg-primary/20 text-primary', luxury: 'bg-warning/20 text-warning', group: 'bg-error/20 text-error' })[c] || 'bg-muted/20 text-muted';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ vehicles: 0, packages: 0, articles: 0, testimonials: 0, faq: 0, gallery: 0 });
  const [recentVehicles, setRecentVehicles] = useState<RecentVehicle[]>([]);
  const [recentPackages, setRecentPackages] = useState<RecentPackage[]>([]);
  const [recentTestimonials, setRecentTestimonials] = useState<RecentTestimonial[]>([]);
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
        loadStats();
        loadRecentData();
      }
    };
    getUser();
  }, [supabase]);

  const loadStats = async () => {
    try {
      const [vehicles, packages, articles, testimonials, faq, gallery] = await Promise.all([
        supabase.from('vehicles').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('packages').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('faq_items').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('gallery_items').select('id', { count: 'exact', head: true }).eq('is_active', true),
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
    { icon: CarFront, label: 'Armada', value: stats.vehicles },
    { icon: MapPin, label: 'Paket', value: stats.packages },
    { icon: FileText, label: 'Artikel', value: stats.articles },
    { icon: ImageIcon, label: 'Galeri', value: stats.gallery },
    { icon: Star, label: 'Testimoni', value: stats.testimonials },
    { icon: MessageCircle, label: 'FAQ', value: stats.faq },
  ];

  const quickActions = [
    { icon: CarFront, label: 'Tambah Armada', href: '/admin/dashboard/armada/new', color: 'bg-accent/10 text-accent' },
    { icon: MapPin, label: 'Tambah Paket', href: '/admin/dashboard/paket/new', color: 'bg-success/10 text-success' },
    { icon: FileText, label: 'Tulis Artikel', href: '/admin/dashboard/artikel/new', color: 'bg-primary/10 text-primary' },
    { icon: ImageIcon, label: 'Upload Galeri', href: '/admin/dashboard/galeri/new', color: 'bg-warning/10 text-warning' },
    { icon: Star, label: 'Tambah Testimoni', href: '/admin/dashboard/testimoni/new', color: 'bg-warning/10 text-warning' },
    { icon: MessageCircle, label: 'Tambah FAQ', href: '/admin/dashboard/faq/new', color: 'bg-error/10 text-error' },
  ];

  return (
    <AdminDashboardLayout title="Dashboard" stats={statsData}>
      {/* Quick Actions */}
      <section className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-extrabold text-heading">Aksi Cepat</h3>
          <Link
            href="/admin/dashboard/armada"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
          >
            Lihat semua <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.label}
                href={a.href}
                className={`flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl border border-line bg-white hover:bg-accent/5 hover:border-accent transition-all text-center ${a.color}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-heading">{a.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left: Recent Vehicles + Packages */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Recent Vehicles */}
          <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-line flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-extrabold text-heading">Armada Terbaru</h3>
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
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Armada</th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-muted hidden sm:table-cell">Kategori</th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-muted hidden md:table-cell">Harga</th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Baru</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {recentVehicles.length === 0 ? (
                    <tr>
                      <td className="px-4 py-8 text-center text-muted text-sm" colSpan={4}>
                        Belum ada armada
                      </td>
                    </tr>
                  ) : (
                    recentVehicles.map((v) => (
                      <tr key={v.id} className="hover:bg-surface/50 transition">
                        <td className="px-4 py-3">
                          <Link href={`/admin/dashboard/armada/${v.id}`} className="font-bold text-heading hover:text-accent">
                            {v.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${categoryStyle(v.category)}`}>
                            {categoryLabel(v.category)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right hidden md:table-cell font-bold text-accent">
                          {formatIDR(v.price_per_day)}
                        </td>
                        <td className="px-4 py-3 text-right text-xs text-muted">
                          {new Date(v.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-3 sm:p-4 border-t border-line sm:hidden">
              <Link
                href="/admin/dashboard/armada"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
              >
                Lihat semua <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Recent Packages */}
          <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-line flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-extrabold text-heading">Paket Terbaru</h3>
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
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Paket</th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-muted hidden sm:table-cell">Destinasi</th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-muted hidden md:table-cell">Harga</th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Baru</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {recentPackages.length === 0 ? (
                    <tr>
                      <td className="px-4 py-8 text-center text-muted text-sm" colSpan={4}>
                        Belum ada paket
                      </td>
                    </tr>
                  ) : (
                    recentPackages.map((p) => (
                      <tr key={p.id} className="hover:bg-surface/50 transition">
                        <td className="px-4 py-3">
                          <Link href={`/admin/dashboard/paket/${p.id}`} className="font-bold text-heading hover:text-accent">
                            {p.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell text-sm text-muted">{p.destination}</td>
                        <td className="px-4 py-3 text-right hidden md:table-cell font-bold text-accent">
                          {formatIDR(p.price)}
                        </td>
                        <td className="px-4 py-3 text-right text-xs text-muted">
                          {new Date(p.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-3 sm:p-4 border-t border-line sm:hidden">
              <Link
                href="/admin/dashboard/paket"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
              >
                Lihat semua <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Recent Testimonials + Quick Stats */}
        <div className="space-y-4 sm:space-y-6">
          {/* Recent Testimonials */}
          <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-line flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-extrabold text-heading">Testimoni Terbaru</h3>
              <Link
                href="/admin/dashboard/testimoni"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
              >
                Lihat semua <ArrowRight size={12} />
              </Link>
            </div>
            <div className="p-4 sm:p-5 space-y-3">
              {recentTestimonials.length === 0 ? (
                <p className="text-center text-muted py-4 text-sm">Belum ada testimoni</p>
              ) : (
                recentTestimonials.map((t) => (
                  <Link
                    key={t.id}
                    href={`/admin/dashboard/testimoni/${t.id}`}
                    className="flex items-start gap-3 p-3 rounded-xl border border-line hover:bg-accent/5 hover:border-accent transition group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent flex-shrink-0">
                      <Star size={16} fill="currentColor" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-heading text-sm truncate group-hover:text-accent transition">
                        {t.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={10}
                              className={s <= t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-line'}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted">
                          {new Date(t.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
            <div className="p-3 sm:p-4 border-t border-line sm:hidden">
              <Link
                href="/admin/dashboard/testimoni"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
              >
                Lihat semua <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/dashboard/armada"
              className="bg-white rounded-2xl border border-line shadow-card p-4 flex items-center gap-3 hover:bg-accent/5 hover:border-accent transition"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <CarFront size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase tracking-[0.16em] font-bold">Total Armada</p>
                <p className="text-lg font-extrabold text-heading">{stats.vehicles}</p>
              </div>
            </Link>
            <Link
              href="/admin/dashboard/paket"
              className="bg-white rounded-2xl border border-line shadow-card p-4 flex items-center gap-3 hover:bg-accent/5 hover:border-accent transition"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
                <MapPin size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase tracking-[0.16em] font-bold">Total Paket</p>
                <p className="text-lg font-extrabold text-heading">{stats.packages}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile quick actions stack */}
      <div className="lg:hidden mt-4">
        <h3 className="text-lg font-extrabold text-heading mb-3">Aksi Cepat</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.label}
                href={a.href}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border border-line bg-white text-center ${a.color}`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <span className="text-xs font-bold text-heading">{a.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}