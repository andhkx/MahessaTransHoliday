'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[admin/dashboard error]', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-line shadow-card p-6 sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-error/10 text-error mx-auto mb-4">
          <AlertTriangle size={26} strokeWidth={1.8} />
        </div>
        <h1 className="text-xl font-extrabold text-heading text-center mb-2">
          Halaman gagal dimuat
        </h1>
        <p className="text-sm text-muted text-center mb-4">
          Terjadi kesalahan saat membuka halaman ini. Coba lagi atau kembali ke daftar.
        </p>
        {error.message && (
          <div className="bg-error/5 border border-error/20 text-error text-xs p-3 rounded-xl mb-6 font-mono break-words">
            {error.message}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={reset}
            className="flex-1 px-4 py-2.5 bg-accent text-white font-extrabold rounded-xl hover:bg-accent-hover transition shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)]"
          >
            Coba Lagi
          </button>
          <Link
            href="/admin/dashboard"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-line rounded-xl text-sm font-bold text-heading hover:bg-surface/50 transition"
          >
            <ArrowLeft size={14} /> Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}