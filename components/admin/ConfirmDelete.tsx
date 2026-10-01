'use client';

import { X, XCircle, CheckCircle, Shield } from 'lucide-react';
type ConfirmDeleteProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  text?: React.ReactNode;
  confirmText?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  confirmTone?: 'error' | 'accent';
};

export default function ConfirmDelete({
  open,
  onConfirm,
  onCancel,
  title = 'Hapus Data',
  text = 'Apakah Anda yakin ingin menghapus data ini?',
  confirmText = 'Hapus Permanen',
  icon: Icon = Shield,
  confirmTone = 'error',
}: ConfirmDeleteProps) {
  if (!open) return null;

  const confirmClass =
    confirmTone === 'error'
      ? 'bg-error text-white hover:bg-error/90 shadow-[0_8px_20px_-8px_rgba(220,38,38,0.5)]'
      : 'bg-accent text-white hover:bg-accent-hover shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)]';

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm sm:px-8"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={onCancel} aria-hidden="true" />

      <div className="relative w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-elevated">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-error/10 text-error">
              <Icon size={20} />
            </span>
            <h3 className="text-lg font-extrabold leading-snug text-heading">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="shrink-0 text-muted transition hover:text-heading"
            aria-label="Batal"
          >
            <XCircle size={18} />
          </button>
        </div>

        <div className="mb-6 text-sm leading-relaxed text-body-text">{text}</div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-surface hover:text-heading"
          >
            <X size={14} /> Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${confirmClass}`}
          >
            <CheckCircle size={14} /> {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
