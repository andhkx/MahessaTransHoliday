"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  Inbox,
  Loader2,
  Pencil,
  Search,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import ConfirmDelete from "@/components/admin/ConfirmDelete";
import ReceiptPdfDownload from "./ReceiptPdfDownload";
import ReceiptPreviewModal from "./ReceiptPreviewModal";
import {
  PAYMENT_STATUS_LABEL,
  formatTanggalPendek,
  receiptRowToFormData,
  rupiah,
  type PaymentStatus,
  type ReceiptRecord,
} from "@/lib/receipt";

const STATUS_TONE: Record<PaymentStatus, string> = {
  unpaid: "bg-error/10 text-error border-error/25",
  partial: "bg-warning/12 text-warning border-warning/30",
  paid: "bg-success/10 text-success border-success/25",
};

const FILTERS: { key: "all" | PaymentStatus; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "unpaid", label: PAYMENT_STATUS_LABEL.unpaid },
  { key: "partial", label: PAYMENT_STATUS_LABEL.partial },
  { key: "paid", label: PAYMENT_STATUS_LABEL.paid },
];

export default function ReceiptHistoryClient() {
  const supabase = createClient();
  const [rows, setRows] = useState<ReceiptRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | PaymentStatus>("all");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ReceiptRecord | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      const { data, error: loadError } = await supabase
        .from("receipts")
        .select("*")
        .order("created_at", { ascending: false });
      if (!active) return;
      if (loadError) {
        setError(loadError.message || "Gagal memuat riwayat.");
        setRows([]);
      } else {
        setRows((data ?? []) as ReceiptRecord[]);
      }
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, [supabase]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (filter !== "all" && row.payment_status !== filter) return false;
      if (!q) return true;
      return (
        row.receipt_number.toLowerCase().includes(q) ||
        row.customer_name.toLowerCase().includes(q) ||
        (row.vehicle_name ?? "").toLowerCase().includes(q) ||
        (row.destination ?? "").toLowerCase().includes(q)
      );
    });
  }, [rows, query, filter]);

  const totals = useMemo(
    () => ({
      count: rows.length,
      omzet: rows.reduce((sum, row) => sum + (row.total_amount || 0), 0),
      unpaid: rows
        .filter((row) => row.payment_status !== "paid")
        .reduce((sum, row) => sum + (row.remaining_amount || 0), 0),
    }),
    [rows],
  );

  const previewRow = previewId ? rows.find((row) => row.id === previewId) ?? null : null;

  const handleDelete = async () => {
    const target = deleteTarget;
    if (!target) return;
    setDeleting(true);
    const { error: deleteError } = await supabase.from("receipts").delete().eq("id", target.id);
    if (deleteError) {
      setError(deleteError.message || "Gagal menghapus kwitansi.");
    } else {
      setRows((prev) => prev.filter((item) => item.id !== target.id));
      if (previewId === target.id) setPreviewId(null);
    }
    setDeleting(false);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-5">
      {/* Ringkasan */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
            Total Kwitansi
          </p>
          <p className="mt-1.5 text-2xl font-extrabold text-heading">{totals.count}</p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
            Total Nilai
          </p>
          <p className="mt-1.5 text-2xl font-extrabold tabular-nums text-heading">
            {rupiah(totals.omzet)}
          </p>
        </div>
        <div className="col-span-2 rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5 lg:col-span-1">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
            Belum Lunas
          </p>
          <p className="mt-1.5 text-2xl font-extrabold tabular-nums text-warning">
            {rupiah(totals.unpaid)}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="receipt-no-print space-y-3 rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
        <div className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nomor, nama pelanggan, kendaraan, atau tujuan..."
            className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-3.5 text-sm font-bold text-heading outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-extrabold transition ${
                filter === item.key
                  ? "bg-accent text-white shadow-[0_6px_14px_-6px_rgba(0,86,145,0.5)]"
                  : "border border-line bg-white text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-error/30 bg-error/10 p-4 text-xs font-bold leading-relaxed text-error">
          <TriangleAlert size={16} className="mt-0.5 shrink-0" />
          <span className="min-w-0 break-words">{error}</span>
        </div>
      )}

      {/* Daftar */}
      {loading ? (
        <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-line bg-white py-16 text-sm font-bold text-muted shadow-card">
          <Loader2 size={18} className="animate-spin" /> Memuat riwayat...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white py-16 text-center shadow-card">
          <Inbox size={28} className="mx-auto text-line" />
          <p className="mt-3 text-sm font-extrabold text-heading">
            {rows.length === 0 ? "Belum ada kwitansi" : "Tidak ada yang cocok"}
          </p>
          <p className="mt-1 text-xs font-semibold text-muted">
            {rows.length === 0
              ? "Semua kwitansi yang dibuat akan tersimpan dan muncul di sini."
              : "Coba ubah kata kunci atau filter status."}
          </p>
          {rows.length === 0 && (
            <Link
              href="/admin/dashboard/kwitansi"
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-accent-hover"
            >
              Buat Kwitansi Pertama
            </Link>
          )}
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((row) => (
            <li
              key={row.id}
              className="overflow-hidden rounded-2xl border border-line bg-white shadow-card"
            >
              <div className="grid gap-3 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                    <span className="rounded-lg bg-accent/10 px-2 py-1 font-mono text-[11px] font-extrabold leading-none text-accent sm:text-xs">
                      {row.receipt_number}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase leading-none tracking-[0.08em] ${STATUS_TONE[row.payment_status]}`}
                    >
                      {PAYMENT_STATUS_LABEL[row.payment_status]}
                    </span>
                  </div>

                  <p className="mt-2 break-words text-[15px] font-extrabold leading-snug text-heading sm:text-base">
                    {row.customer_name}
                  </p>

                  <p className="mt-1 break-words text-[11px] font-semibold leading-relaxed text-muted">
                    {row.service_type}
                    {row.vehicle_name ? ` · ${row.vehicle_name}` : ""}
                    {row.destination ? ` · ${row.destination}` : ""} ·{" "}
                    {formatTanggalPendek(row.issue_date ?? row.created_at)}
                  </p>
                </div>

                <div className="flex items-end justify-between gap-4 lg:flex-col lg:items-end lg:justify-center">
                  <div className="text-left lg:text-right">
                    <p className="text-lg font-extrabold leading-none tabular-nums text-heading">
                      {rupiah(row.total_amount)}
                    </p>
                    {row.payment_status !== "paid" && (
                      <p className="mt-1.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-warning">
                        Sisa {rupiah(row.remaining_amount)}
                      </p>
                    )}
                  </div>

                  <div className="receipt-no-print flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPreviewId(row.id)}
                      className="inline-flex h-[34px] items-center gap-1.5 rounded-xl border border-line bg-white px-3 text-xs font-extrabold text-heading transition hover:border-accent hover:text-accent"
                      title="Lihat pratinjau"
                    >
                      <Eye size={13} /> <span className="hidden sm:inline">Lihat</span>
                    </button>

                    <ReceiptPdfDownload
                      data={receiptRowToFormData(row)}
                      label="PDF"
                      className="inline-flex h-[34px] items-center gap-1.5 rounded-xl border border-line bg-white px-3 text-xs font-extrabold text-heading transition hover:border-accent hover:text-accent disabled:opacity-50"
                    />

                    <Link
                      href={`/admin/dashboard/kwitansi?edit=${row.id}`}
                      className="inline-flex h-[34px] items-center gap-1.5 rounded-xl border border-line bg-white px-3 text-xs font-extrabold text-heading transition hover:border-accent hover:text-accent"
                      title="Edit kwitansi"
                    >
                      <Pencil size={13} /> <span className="hidden sm:inline">Edit</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => setDeleteTarget(row)}
                      className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-xl border border-line bg-white text-error transition hover:bg-error/10"
                      title="Hapus kwitansi"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pratinjau popup */}
      <ReceiptPreviewModal data={previewRow ? receiptRowToFormData(previewRow) : null} onClose={() => setPreviewId(null)} />

      {/* Konfirmasi hapus */}
      <ConfirmDelete
        open={Boolean(deleteTarget)}
        icon={Trash2}
        title="Hapus Kwitansi"
        confirmText={deleting ? "Menghapus..." : "Ya, Hapus"}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        text={
          deleteTarget ? (
            <p>
              Apakah Anda yakin menghapus kwitansi{" "}
              <span className="font-extrabold text-heading">
                ({deleteTarget.receipt_number})
              </span>{" "}
              atas nama <span className="font-extrabold text-heading">{deleteTarget.customer_name}</span>
              ? Nomor ini tidak akan dipakai ulang untuk kwitansi baru.
            </p>
          ) : null
        }
      />
    </div>
  );
}
