'use client';

import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

type AdminFormProps = {
  title?: string;
  description?: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  loading?: boolean;
  submitText?: string;
  cancelText?: string;
  children: ReactNode;
};

export default function AdminForm({
  title,
  description,
  onSubmit,
  onCancel,
  loading = false,
  submitText = 'Simpan',
  cancelText = 'Batal',
  children,
}: AdminFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {(title || description) && (
        <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6">
          {title && <h1 className="text-xl sm:text-2xl font-extrabold text-heading">{title}</h1>}
          {description && <p className="text-sm text-muted mt-1">{description}</p>}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6">{children}</div>

      {/* Sticky action bar: floating on mobile, inline on desktop */}
      <div className="sticky bottom-4 z-10 sm:static sm:z-0">
        <div className="flex items-center justify-end gap-3 p-3 sm:p-4 bg-white rounded-2xl border border-line shadow-elevated sm:shadow-none">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 sm:px-5 py-2.5 border border-line rounded-xl text-sm font-medium text-heading hover:bg-surface/50 transition disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-accent text-white font-extrabold rounded-xl hover:bg-accent-hover transition disabled:opacity-50 shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)]"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? 'Menyimpan...' : submitText}
          </button>
        </div>
      </div>
    </form>
  );
}