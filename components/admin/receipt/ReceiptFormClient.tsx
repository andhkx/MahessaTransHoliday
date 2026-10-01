"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  BadgeCheck,
  CalendarRange,
  Eye,
  FileText,
  Loader2,
  MapPin,
  RotateCcw,
  Save,
  User,
  Wallet,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import ReceiptPdfDownload from "./ReceiptPdfDownload";
import ReceiptPreviewModal from "./ReceiptPreviewModal";
import {
  DEFAULT_BANK,
  DEFAULT_RECEIPT_NOTE,
  EMPTY_RECEIPT,
  PAYMENT_STATUS_LABEL,
  RECEIPT_PREFIX,
  daysBetween,
  describeReceiptError,
  parseRupiah,
  receiptErrorHint,
  receiptFileName,
  receiptFormToPayload,
  receiptRemaining,
  receiptRowToFormData,
  receiptTotal,
  rupiah,
  rupiahInput,
  type PaymentStatus,
  type ReceiptFormData,
  type ReceiptRecord,
} from "@/lib/receipt";

const SERVICE_OPTIONS = [
  "Sewa Mobil Tanpa Driver",
  "Charter Mobil Dengan Driver",
] as const;

function todayIso() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);
}

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-bold text-heading outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15";

const readOnlyClass =
  "w-full rounded-xl border border-dashed border-accent/40 bg-accent/[0.06] px-3.5 py-2.5 text-sm font-extrabold tabular-nums text-primary";

function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] leading-snug text-muted">{hint}</p>}
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  step,
  children,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  step: number;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-white shadow-card">
      <header className="flex items-center gap-3 border-b border-line px-4 py-3.5 sm:px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon size={17} strokeWidth={1.9} />
        </span>
        <div className="flex-1">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary">
            Langkah {step}
          </p>
          <h2 className="text-sm font-extrabold text-heading">{title}</h2>
        </div>
      </header>
      <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">{children}</div>
    </section>
  );
}

export default function ReceiptFormClient() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [form, setForm] = useState<ReceiptFormData>(() => ({
    ...EMPTY_RECEIPT,
    issueDate: todayIso(),
  }));
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const isEdit = Boolean(editId);

  const total = useMemo(() => receiptTotal(form), [form]);
  const remaining = useMemo(() => receiptRemaining(form), [form]);

  // Muat data lama saat mode edit
  useEffect(() => {
    if (!editId) return;
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      const { data, error: loadError } = await supabase
        .from("receipts")
        .select("*")
        .eq("id", editId)
        .single();
      if (!active) return;
      if (loadError) {
        setError(loadError.message || "Kwitansi tidak ditemukan.");
        setHint(receiptErrorHint(loadError.message ?? ""));
      } else if (data) {
        setForm(receiptRowToFormData(data as ReceiptRecord));
        setSaved(true);
      }
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, [editId, supabase]);

  const set = useCallback(
    <K extends keyof ReceiptFormData>(key: K, value: ReceiptFormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setSaved(false);
      setError(null);
      setHint(null);
    },
    [],
  );

  const setMoney = (key: "pricePerDay" | "downPayment", raw: string) => {
    setForm((prev) => ({ ...prev, [key]: parseRupiah(raw) }));
    setSaved(false);
  };

  const applyDates = (startDate: string, endDate: string) => {
    setForm((prev) => ({
      ...prev,
      startDate,
      endDate,
      durationDays: startDate && endDate ? daysBetween(startDate, endDate) : prev.durationDays,
    }));
    setSaved(false);
  };

  const reset = () => {
    setForm({ ...EMPTY_RECEIPT, issueDate: todayIso() });
    setSaved(false);
    setError(null);
    setHint(null);
  };

  const exitEdit = () => router.push("/admin/dashboard/kwitansi");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName.trim()) {
      setError("Nama pelanggan wajib diisi.");
      setHint(null);
      return;
    }
    if (form.durationDays < 1) {
      setError("Durasi minimal 1 hari.");
      setHint(null);
      return;
    }

    setSaving(true);
    setError(null);
    setHint(null);
    const payload = receiptFormToPayload(form, { total, remaining });

    try {
      if (editId) {
        const { error: updateError } = await supabase
          .from("receipts")
          .update(payload)
          .eq("id", editId);
        if (updateError) throw updateError;
      } else {
        const { data: number, error: numberError } = await supabase.rpc(
          "next_document_number",
          { p_prefix: RECEIPT_PREFIX },
        );
        if (numberError) throw numberError;
        const receiptNumber = String(number ?? "").trim();
        if (!receiptNumber) throw new Error("Nomor kwitansi gagal dibuat.");

        const { error: insertError } = await supabase
          .from("receipts")
          .insert({ ...payload, receipt_number: receiptNumber });
        if (insertError) throw insertError;

        setForm((prev) => ({ ...prev, receiptNumber }));
      }
      setSaved(true);
    } catch (err: unknown) {
      // Supabase/PostgREST error = object; String(err) jadi "[object Object]"
      const message = describeReceiptError(err);
      setError(message);
      setHint(receiptErrorHint(message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-line bg-white py-20 text-sm font-bold text-muted shadow-card">
        <Loader2 size={18} className="animate-spin" /> Memuat kwitansi...
      </div>
    );
  }

  return (
    <>
      {/* Banner mode edit */}
      {isEdit && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-accent/25 bg-accent/[0.06] p-4">
          <FileText size={16} className="shrink-0 text-accent" />
          <p className="min-w-0 flex-1 text-xs font-bold leading-relaxed text-accent">
            Mode edit — kwitansi{" "}
            <span className="font-mono font-extrabold">{form.receiptNumber}</span>. Nomor tidak
            berubah saat disimpan.
          </p>
          <button
            type="button"
            onClick={exitEdit}
            className="inline-flex items-center gap-1.5 rounded-xl border border-accent/30 bg-white px-3 py-1.5 text-[11px] font-extrabold text-accent transition hover:bg-accent/10"
          >
            <X size={13} /> Batal Edit
          </button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:items-start">
        {/* ================= FORM ================= */}
        <form onSubmit={handleSave} className="space-y-4">
          {error && (
            <div className="space-y-2 rounded-2xl border border-error/30 bg-error/10 p-4">
              <div className="flex items-start gap-2.5 text-xs font-bold leading-relaxed text-error">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span className="min-w-0 break-words">{error}</span>
              </div>
              {hint && (
                <p className="pl-[26px] text-[11px] font-semibold leading-relaxed text-error/85">
                  {hint}
                </p>
              )}
            </div>
          )}

          {saved && (
            <div className="flex items-start gap-2.5 rounded-2xl border border-success/30 bg-success/10 p-4 text-xs font-semibold leading-relaxed text-success">
              <BadgeCheck size={16} className="mt-0.5 shrink-0" />
              <span>
                {isEdit ? "Perubahan tersimpan." : "Kwitansi baru tersimpan."}{" "}
                <span className="font-mono font-extrabold">{form.receiptNumber}</span> — tekan
                &ldquo;Unduh PDF&rdquo; untuk mengunduh{" "}
                <span className="font-mono">{receiptFileName(form)}</span>.
              </span>
            </div>
          )}

          <SectionCard icon={FileText} title="Data Kwitansi" step={1}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Nomor Kwitansi"
                hint={isEdit ? "Nomor tetap, tidak bisa diubah." : "Dibuat otomatis saat disimpan."}
              >
                <input
                  readOnly
                  value={form.receiptNumber || "— otomatis —"}
                  className={`${readOnlyClass} font-mono`}
                />
              </Field>
              <Field label="Tanggal Kwitansi">
                <input
                  type="date"
                  value={form.issueDate}
                  onChange={(e) => set("issueDate", e.target.value)}
                  className={inputClass}
                  required
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard icon={User} title="Pelanggan & Layanan" step={2}>
            <Field label="Nama Pelanggan *">
              <input
                type="text"
                value={form.customerName}
                onChange={(e) => set("customerName", e.target.value)}
                className={inputClass}
                placeholder="Nama lengkap pelanggan"
                required
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Jenis Layanan">
                <select
                  value={form.serviceType}
                  onChange={(e) => set("serviceType", e.target.value)}
                  className={inputClass}
                >
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Kendaraan">
                <input
                  type="text"
                  value={form.vehicleName}
                  onChange={(e) => set("vehicleName", e.target.value)}
                  className={inputClass}
                  placeholder="Toyota Avanza"
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard icon={CalendarRange} title="Perjalanan" step={3}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tanggal Mulai">
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => applyDates(e.target.value, form.endDate)}
                  className={inputClass}
                />
              </Field>
              <Field label="Tanggal Selesai">
                <input
                  type="date"
                  value={form.endDate}
                  min={form.startDate || undefined}
                  onChange={(e) => applyDates(form.startDate, e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Jam Mulai">
                <input
                  type="time"
                  value={form.startTime}
                  onChange={(e) => set("startTime", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Jam Selesai">
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => set("endTime", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Lokasi Pickup">
                <input
                  type="text"
                  value={form.pickupLocation}
                  onChange={(e) => set("pickupLocation", e.target.value)}
                  className={inputClass}
                  placeholder="Bandung"
                />
              </Field>
              <Field label="Tujuan">
                <input
                  type="text"
                  value={form.destination}
                  onChange={(e) => set("destination", e.target.value)}
                  className={inputClass}
                  placeholder="Semarang"
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard icon={Wallet} title="Biaya & Pembayaran" step={4}>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Durasi (hari)">
                <input
                  type="number"
                  min={1}
                  value={form.durationDays}
                  onChange={(e) => set("durationDays", Math.max(1, Number(e.target.value) || 1))}
                  className={inputClass}
                />
              </Field>
              <Field label="Harga / Hari">
                <input
                  type="text"
                  inputMode="numeric"
                  value={rupiahInput(form.pricePerDay)}
                  onChange={(e) => setMoney("pricePerDay", e.target.value)}
                  className={`${inputClass} tabular-nums`}
                  placeholder="750.000"
                />
              </Field>
              <Field label="Total">
                <input readOnly value={rupiah(total)} className={readOnlyClass} />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="DP / Dibayar">
                <input
                  type="text"
                  inputMode="numeric"
                  value={rupiahInput(form.downPayment)}
                  onChange={(e) => setMoney("downPayment", e.target.value)}
                  className={`${inputClass} tabular-nums`}
                  placeholder="250.000"
                />
              </Field>
              <Field label="Sisa Pembayaran">
                <input readOnly value={rupiah(remaining)} className={readOnlyClass} />
              </Field>
              <Field label="Status Pembayaran">
                <select
                  value={form.paymentStatus}
                  onChange={(e) => set("paymentStatus", e.target.value as PaymentStatus)}
                  className={inputClass}
                >
                  {(Object.keys(PAYMENT_STATUS_LABEL) as PaymentStatus[]).map((key) => (
                    <option key={key} value={key}>
                      {PAYMENT_STATUS_LABEL[key]}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </SectionCard>

          <SectionCard icon={MapPin} title="Rekening & Catatan" step={5}>
            <Field label="Bank">
              <input
                type="text"
                value={form.bankName}
                onChange={(e) => set("bankName", e.target.value)}
                className={inputClass}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nomor Rekening">
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.bankAccount}
                  onChange={(e) => set("bankAccount", e.target.value)}
                  className={`${inputClass} font-mono tabular-nums`}
                />
              </Field>
              <Field label="Atas Nama">
                <input
                  type="text"
                  value={form.bankHolder}
                  onChange={(e) => set("bankHolder", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label="Catatan">
              <textarea
                value={form.note}
                onChange={(e) => set("note", e.target.value)}
                rows={3}
                className="w-full resize-none rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-semibold leading-relaxed text-heading outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </Field>
          </SectionCard>

          {/* Action bar */}
          <div className="sticky bottom-4 z-20">
            <div className="flex flex-wrap items-center justify-end gap-2 rounded-2xl border border-line bg-white/95 p-3 shadow-elevated backdrop-blur-xl">
              <button
                type="button"
                onClick={isEdit ? exitEdit : reset}
                className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2.5 text-sm font-bold text-heading transition hover:bg-surface"
              >
                <RotateCcw size={15} /> {isEdit ? "Batal" : "Reset"}
              </button>

              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-accent bg-white px-3 py-2.5 text-sm font-extrabold text-accent transition hover:bg-accent/10"
              >
                <Eye size={15} /> Pratinjau
              </button>

              <ReceiptPdfDownload
                data={form}
                className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-extrabold text-heading transition hover:bg-surface disabled:opacity-40"
              />

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] transition hover:bg-accent-hover disabled:opacity-50"
              >
                {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Simpan Kwitansi"}
              </button>
            </div>
          </div>

          <p className="pb-2 text-center text-[11px] leading-relaxed text-muted">
            Nomor dibuat berurutan per tahun (contoh{" "}
            <span className="font-mono font-bold">KWT-2026-0001</span>) dan tidak pernah dipakai
            ulang — termasuk kwitansi yang sudah dihapus. Bank default BCA{" "}
            {DEFAULT_BANK.bankAccount} a.n. {DEFAULT_BANK.bankHolder}, catatan default
            &ldquo;{DEFAULT_RECEIPT_NOTE}&rdquo;.
          </p>
        </form>

        {/* ================= PANEL PRATINJAU ================= */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary">
              Pratinjau
            </p>
            <h2 className="mt-1 text-lg font-extrabold text-heading">
              Kuitansi A4 — hasil PDF
            </h2>
            <p className="mt-2 text-xs font-semibold leading-relaxed text-muted">
              Dokumen A4 (210 &times; 297 mm) yang akan diunduh. Tekan{" "}
              <span className="font-bold text-heading">Pratinjau</span> untuk melihatnya penuh di
              layar, atau langsung tekan{" "}
              <span className="font-bold text-heading">Unduh PDF</span>.
            </p>

            <div className="mt-5 rounded-xl border border-dashed border-line bg-surface/40 p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">
                Berkas
              </p>
              <p className="mt-1 break-all font-mono text-[11px] font-bold text-heading">
                {receiptFileName(form)}
              </p>
            </div>

            <div className="mt-4 space-y-2.5">
              <PreviewSummary label="Pelanggan" value={form.customerName || "-"} />
              <PreviewSummary label="Layanan" value={form.serviceType} />
              <PreviewSummary
                label="Total"
                value={rupiah(total)}
                emphasis
              />
              <PreviewSummary label="Sisa" value={rupiah(remaining)} />
              <PreviewSummary label="Status" value={PAYMENT_STATUS_LABEL[form.paymentStatus]} />
            </div>

            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-extrabold text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] transition hover:bg-accent-hover"
            >
              <Eye size={16} /> Lihat Pratinjau A4
            </button>
          </div>
        </div>
      </div>

      <ReceiptPreviewModal
        data={previewOpen ? form : null}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
}

function PreviewSummary({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-line pb-2 last:border-0">
      <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      <span
        className={`min-w-0 break-words text-right text-xs font-extrabold ${
          emphasis ? "text-base text-primary" : "text-heading"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
