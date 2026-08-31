'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { CarFront, MapPin, FileText, Star, LogOut, LayoutDashboard, Calendar, TrendingUp } from 'lucide-react';
import AdminDashboardLayout from '@/app/admin/dashboard/layout';

type Stats = {
  vehicles: number;
  packages: number;
  articles: number;
  testimonials: number;
};

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ vehicles: 0, packages: 0, articles: 0, testimonials: 0 });
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        // middleware sudah handle redirect
      } else {
        setUser(user);
        setLoading(false);
        loadStats();
      }
    };

    const loadStats = async () => {
      try {
        const [vehicles, packages, articles, testimonials] = await Promise.all([
          supabase.from('vehicles').select('id', { count: 'exact', head: true }),
          supabase.from('packages').select('id', { count: 'exact', head: true }),
          supabase.from('articles').select('id', { count: 'exact', head: true }),
          supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        ]);
        setStats({
          vehicles: vehicles.count || 0,
          packages: packages.count || 0,
          articles: articles.count || 0,
          testimonials: testimonials.count || 0,
        });
      } catch (e) {
        console.error('Failed to load stats:', e);
      }
    };

    getUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-heading font-extrabold">Loading...</div>
      </div>
    );
  }

  // Stats for hero cards
  const statsData = [
    { icon: CarFront, label: 'Armada', value: stats.vehicles, color: 'bg-blue-500/10 text-blue-700' },
    { icon: MapPin, label: 'Paket', value: stats.packages, color: 'bg-green-500/10 text-green-700' },
    { icon: FileText, label: 'Artikel', value: stats.articles, color: 'bg-purple-500/10 text-purple-700' },
    { icon: Star, label: 'Testimoni', value: stats.testimonials, color: 'bg-yellow-500/10 text-yellow-700' },
  ];

  // Quick nav items
  const navItems = [
    { icon: CarFront, label: 'Armada', href: '/admin/dashboard/armada', desc: 'Kelola data kendaraan' },
    { icon: MapPin, label: 'Paket', href: '/admin/dashboard/paket', desc: 'Kelola paket perjalanan' },
    { icon: FileText, label: 'Artikel', href: '/admin/dashboard/artikel', desc: 'Kelola blog/artikel' },
    { icon: Star, label: 'Testimoni', href: '/admin/dashboard/testimoni', desc: 'Kelola testimoni pelanggan' },
  ];

  return (
    <AdminDashboardLayout title="Dashboard" stats={statsData}>
      {/* Quick actions grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="bg-white rounded-[18px] border border-line shadow-card p-5 transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-heading">{item.label}</h3>
                <p className="text-xs text-muted truncate">{item.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent activity placeholder */}
      <div className="bg-white rounded-[18px] border border-line shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-extrabold text-heading">Aktivitas Terbaru</h3>
          <Link href="/admin/dashboard/armada" className="text-xs text-accent hover:underline">Lihat semua</Link>
        </div>
        <p className="text-sm text-muted text-center py-8">Belum ada aktivitas terbaru. Mulai dengan menambahkan armada atau paket baru.</p>
      </div>
    </AdminDashboardLayout>
  );
}