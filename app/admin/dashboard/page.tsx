'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  CarFront, 
  MapPin, 
  FileText, 
  Star, 
  LogOut,
  Calendar,
  TrendingUp
} from 'lucide-react';

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
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/admin/login');
      } else {
        setUser(user);
        setLoading(false);
        loadStats();
      }
    };

    getUser();
  }, [router, supabase]);

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-heading font-extrabold">Loading...</div>
      </div>
    );
  }

  const menuItems = [
    { 
      href: '/admin/dashboard/armada', 
      label: 'Armada', 
      Icon: CarFront, 
      desc: 'Kelola data kendaraan',
      count: stats.vehicles,
      color: 'bg-blue-500/10 text-blue-700'
    },
    { 
      href: '/admin/dashboard/paket', 
      label: 'Paket', 
      Icon: MapPin, 
      desc: 'Kelola paket perjalanan',
      count: stats.packages,
      color: 'bg-green-500/10 text-green-700'
    },
    { 
      href: '/admin/dashboard/artikel', 
      label: 'Artikel', 
      Icon: FileText, 
      desc: 'Kelola blog/artikel',
      count: stats.articles,
      color: 'bg-purple-500/10 text-purple-700'
    },
    { 
      href: '/admin/dashboard/testimoni', 
      label: 'Testimoni', 
      Icon: Star, 
      desc: 'Kelola testimoni pelanggan',
      count: stats.testimonials,
      color: 'bg-yellow-500/10 text-yellow-700'
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={20} className="text-accent" />
            <h1 className="text-xl font-extrabold text-heading">Mahessa Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted hidden sm:inline">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-error/10 text-error px-4 py-2 rounded-lg text-sm font-bold hover:bg-error hover:text-white transition"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-[24px] border border-line shadow-card p-6 md:p-8 mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-heading mb-2">
                Selamat Datang!
              </h2>
              <p className="text-muted text-sm md:text-base">
                Kelola data armada, paket, artikel, dan testimoni dari dashboard ini.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted bg-surface px-3 py-1.5 rounded-full">
              <Calendar size={12} />
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white rounded-[18px] border border-line shadow-card p-5 transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                  <item.Icon size={20} strokeWidth={1.8} />
                </div>
                <span className="text-2xl font-extrabold text-heading">{item.count}</span>
              </div>
              <h3 className="text-sm font-extrabold text-heading">{item.label}</h3>
              <p className="text-xs text-muted mt-0.5">{item.desc}</p>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-[24px] border border-line shadow-card p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} className="text-accent" />
            <h3 className="text-lg font-extrabold text-heading">Menu Cepat</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 p-4 rounded-[16px] border border-line hover:border-accent/40 hover:bg-surface transition-all"
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                  <item.Icon size={18} strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-extrabold text-heading">{item.label}</p>
                  <p className="text-xs text-muted truncate">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}