'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  Activity,
  Plus,
  Pencil,
  Trash2,
  History,
  ArrowRight,
} from 'lucide-react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

type ActivityLog = {
  id: string;
  user_email: string | null;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  description: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

type FilterAction = 'all' | 'create' | 'update' | 'delete' | 'login';
type FilterEntity = 'all' | 'vehicle' | 'package' | 'article' | 'gallery' | 'testimonial' | 'faq';

const actionStyle = (a: string) =>
  (
    {
      create: 'bg-success/15 text-success',
      update: 'bg-accent/15 text-accent',
      delete: 'bg-error/15 text-error',
      login: 'bg-primary/15 text-primary',
    } as Record<string, string>
  )[a] || 'bg-muted/15 text-muted';

const actionLabel = (a: string) =>
  ({ create: 'Buat', update: 'Update', delete: 'Hapus', login: 'Login' } as Record<string, string>)[a] || a;

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

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export default function ActivityLogPage() {
  const supabase = createClient();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState<FilterAction>('all');
  const [filterEntity, setFilterEntity] = useState<FilterEntity>('all');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);
      if (error) console.error(error);
      setLogs((data || []) as ActivityLog[]);
      setLoading(false);
    };
    load();
  }, [supabase]);

  const filtered = logs.filter((l) => {
    if (filterAction !== 'all' && l.action !== filterAction) return false;
    if (filterEntity !== 'all' && l.entity_type !== filterEntity) return false;
    return true;
  });

  const summary = {
    create: logs.filter((l) => l.action === 'create').length,
    update: logs.filter((l) => l.action === 'update').length,
    delete: logs.filter((l) => l.action === 'delete').length,
    login: logs.filter((l) => l.action === 'login').length,
  };

  const statsData = [
    { icon: Plus, label: 'Buat', value: summary.create },
    { icon: Pencil, label: 'Update', value: summary.update },
    { icon: Trash2, label: 'Hapus', value: summary.delete },
    { icon: History, label: 'Login', value: summary.login },
    { icon: Activity, label: 'Total', value: logs.length },
  ];

  const actionFilters: { value: FilterAction; label: string }[] = [
    { value: 'all', label: 'Semua' },
    { value: 'create', label: 'Buat' },
    { value: 'update', label: 'Update' },
    { value: 'delete', label: 'Hapus' },
    { value: 'login', label: 'Login' },
  ];

  const entityFilters: { value: FilterEntity; label: string }[] = [
    { value: 'all', label: 'Semua entitas' },
    { value: 'vehicle', label: 'Armada' },
    { value: 'package', label: 'Paket' },
    { value: 'article', label: 'Artikel' },
    { value: 'gallery', label: 'Galeri' },
    { value: 'testimonial', label: 'Testimoni' },
    { value: 'faq', label: 'FAQ' },
  ];

  return (
    <AdminDashboardLayout
      eyebrow="Audit Trail"
      title="Log Aktivitas"
      subtitle="Rekap otomatis setiap login dan perubahan data di website Mahessa."
      stats={statsData}
    >
      {/* Filters */}
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-1.5">
              Filter Aksi
            </p>
            <div className="flex flex-wrap gap-1.5">
              {actionFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilterAction(f.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                    filterAction === f.value
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white text-heading border-line hover:border-accent'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:w-56">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-1.5">
              Filter Entitas
            </p>
            <select
              value={filterEntity}
              onChange={(e) => setFilterEntity(e.target.value as FilterEntity)}
              className="w-full px-3 py-1.5 rounded-xl text-xs font-bold border border-line bg-white text-heading focus:outline-none focus:border-accent"
            >
              {entityFilters.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Log list */}
      <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-3 border-accent border-t-transparent mx-auto" />
            <p className="text-muted text-sm mt-3">Memuat log...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent mx-auto">
              <Activity size={22} />
            </div>
            <p className="text-heading font-bold mt-4">Belum ada aktivitas</p>
            <p className="text-muted text-sm mt-1">
              Aktivitas login & CRUD akan muncul di sini
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((log) => {
              const Icon = actionIcon(log.action);
              return (
                <li
                  key={log.id}
                  className="flex items-start gap-3 p-4 sm:p-5 hover:bg-surface/50 transition"
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0 ${actionStyle(log.action)}`}
                  >
                    <Icon size={16} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${actionStyle(log.action)}`}
                      >
                        {actionLabel(log.action)}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface text-heading">
                        {entityLabel(log.entity_type)}
                      </span>
                    </div>
                    <p className="font-bold text-heading text-sm">
                      {log.description || `${log.action} ${entityLabel(log.entity_type)}`}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-muted">
                      <span className="font-mono">{log.user_email || 'system'}</span>
                      <span className="text-line">·</span>
                      <span>{formatDate(log.created_at)}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="mt-4 text-xs text-muted text-center">
        Menampilkan {filtered.length} aktivitas terbaru
        <Link
          href="/admin/dashboard"
          className="ml-2 text-accent font-bold hover:underline"
        >
          Kembali ke Dashboard <ArrowRight size={10} className="inline" />
        </Link>
      </div>
    </AdminDashboardLayout>
  );
}