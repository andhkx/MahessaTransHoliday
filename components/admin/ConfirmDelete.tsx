'use client';

import { useState } from 'react';
import { X, XCircle, CheckCircle, Shield } from 'lucide-react';
import { cn } from '@/lib/cn';

type ConfirmDeleteProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  text?: string;
  confirmText?: string;
};

export default function ConfirmDelete({ open, onConfirm, onCancel, title = 'Hapus Data', text = 'Apakah Anda yakin ingin menghapus data ini?', confirmText = 'Hapus Permanen' }: ConfirmDeleteProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm items-center justify-center px-4 sm:px-8 md:px-12">
      <div className="bg-white rounded-[24px] border border-line shadow-card w-full max-w-md p-6 sm:px-8 md:px-12 transform scale-100 opacity-100 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Shield size={24} className="text-error mb-2" />
            <h3 className="text-lg font-extrabold text-heading">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-muted hover:text-heading transition"
            aria-label="Batal"
          >
            <XCircle size={18} />
          </button>
        </div>
        <p className="text-muted text-sm mb-6">{text}</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-heading transition"
          >
            <X size={14} /> Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition"
          >
            <CheckCircle size={14} /> {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}