"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  Eye,
  Inbox,
  Loader2,
  Search,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import ReceiptSheet from "./ReceiptSheet";
import ReceiptPdfButton from "./ReceiptPdfButton";
import {
  DEFAULT_BANK,
  EMPTY_RECEIPT,
  PAYMENT_STATUS_LABEL,
  formatTanggalPendek,
  receiptFileName,
  rupiah,
  type PaymentStatus,
  type ReceiptFormData,
} from "@/lib/receipt";

type ReceiptRow = {
  id: string;
  receipt_number: string;
  issue_date: string | null;
  customer_name: string;
  service_type: string;
  vehicle_name: string | null;
  start_date: string | null;
  end_date: string | null;
  start_time: string | null;
  end_time: string | null;
  pickup_location: string | null;
  destination: string | null;
  duration_days: number;
  price_per_day: number;
  total_amount: number;
  down_payment: number;
  remaining_amount: number;
  payment_status: PaymentStatus;
  note: string | null;
  bank_name: string | null;
  bank_account: string | null;
  bank_holder: string | null;
  created_at: string;
};

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

function toFormData(row: ReceiptRow): ReceiptFormData {
  return {
    ...EMPTY_RECEIPT,
    receiptNumber: row.receipt_number,
    issueDate: row.issue_date ?? row.created_at.slice(0, 10),
    customerName: row.customer_name,
    serviceType: row.service_type,
    vehicleName: row.vehicle_name ?? "",
    startDate: row.start_date ?? "",
    endDate: row.end_date ?? "",
    startTime: row.start_time ?? "",
    endTime: row.end_time ?? "",
    pickupLocation: row.pickup_location ?? "",
    destination: row.destination ?? "",
    durationDays: row.duration_days,
    pricePerDay: row.price_per_day,
    downPayment: row.down_payment,
    paymentStatus: row.payment_status,
    note: row.note ?? "",
    bankName: row.bank_name ?? DEFAULT_BANK.bankName,
    bankAccount: row.bank_account ?? DEFAULT_BANK.bankAccount,
    bankHolder: row.bank_holder ?? DEFAULT_BANK.bankHolder,
  };
}

export default function ReceiptHistoryClient() {
  const supabase = createClient();
  const [rows, setRows] = useState<ReceiptRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | PaymentStatus>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
        setRows((data ?? []) as ReceiptRow[]);
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

  const handleDelete = async (row: ReceiptRow) => {
    if (!window.confirm(`Hapus kwitansi ${row.receipt_number}? Tindakan ini tidak bisa dibatalkan.`)) {
      return;
    }
    setDeletingId(row.id);
    const { error: deleteError } = await supabase.from("receipts").delete().eq("id", row.id);
    if (deleteError) {
      setError(deleteError.message || "Gagal menghapus kwitansi.");
    } else {
      setRows((prev) => prev.filter((item) => item.id !== row.id));
      if (openId === row.id) setOpenId(null);
    }
    setDeletingId(null);
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
          {filtered.map((row) => {
            const isOpen = openId === row.id;
            return (
              <li
                key={row.id}
                className="overflow-hidden rounded-2xl border border-line bg-white shadow-card"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 p-4 sm:p-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-extrabold text-accent">
                        {row.receipt_number}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.08em] ${STATUS_TONE[row.payment_status]}`}
                      >
                        {PAYMENT_STATUS_LABEL[row.payment_status]}
                      </span>
                    </div>
                    <p className="mt-1.5 truncate text-sm font-extrabold text-heading">
                      {row.customer_name}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] font-semibold text-muted">
                      {row.service_type}
                      {row.vehicle_name ? ` · ${row.vehicle_name}` : ""} ·{" "}
                      {formatTanggalPendek(row.issue_date ?? row.created_at)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-base font-extrabold tabular-nums text-heading">
                      {rupiah(row.total_amount)}
                    </p>
                    {row.payment_status !== "paid" && (
                      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-warning">
                        Sisa {rupiah(row.remaining_amount)}
                      </p>
                    )}
                  </div>

                  <div className="receipt-no-print flex shrink-0 items-center gap-1.5">
                    <ReceiptPdfButton
                      data={toFormData(row)}
                      label="PDF"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-xs font-extrabold text-heading transition hover:border-accent hover:text-accent disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : row.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-xs font-extrabold text-heading transition hover:border-accent hover:text-accent"
                      title="Lihat detail"
                    >
                      <Eye size={13} />
                      <ChevronDown
                        size={13}
                        className={isOpen ? "rotate-180 transition" : "transition"}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(row)}
                      disabled={deletingId === row.id}
                      className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-xl border border-line bg-white text-error transition hover:bg-error/10 disabled:opacity-50"
                      title="Hapus kwitansi"
                    >
                      {deletingId === row.id ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : (
                        <Trash2 size={13} />
                      )}
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-line bg-surface/30 p-4 sm:p-5">
                    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
                      <div className="receipt-scroll overflow-x-auto rounded-xl border border-line bg-white p-3">
                        <ReceiptSheet data={toFormData(row)} />
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-xl border border-line bg-white p-4">
                          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
                            Berkas
                          </p>
                          <p className="mt-1 break-all font-mono text-[11px] font-bold text-heading">
                            {receiptFileName(toFormData(row))}
                          </p>
                        </div>
                        <ReceiptPdfButton
                          data={toFormData(row)}
                          label="Unduh PDF"
                          className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-accent-hover disabled:opacity-50"
                        />
                        <div className="rounded-xl border border-line bg-white p-4 text-[11px] font-semibold leading-relaxed text-muted">
                          Nomor kwitansi bersifat permanen. Menghapus baris ini tidak membatalkan
                          nomor yang sudah dipakai.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
