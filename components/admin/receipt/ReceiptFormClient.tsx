"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  AlertCircle,
  BadgeCheck,
  CalendarRange,
  Download,
  FileText,
  Loader2,
  MapPin,
  Monitor,
  Printer,
  RotateCcw,
  Save,
  Smartphone,
  User,
  Wallet,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import ReceiptSheet from "./ReceiptSheet";
import ReceiptSheetMobile from "./ReceiptSheetMobile";
import { downloadReceiptPdf } from "@/lib/receipt-pdf";
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
  receiptRemaining,
  receiptTotal,
  rupiah,
  rupiahInput,
  type PaymentStatus,
  type ReceiptFormData,
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

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-bold text-heading outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15";

const readOnlyClass =
  "w-full rounded-xl border border-dashed border-accent/40 bg-accent/[0.06] px-3.5 py-2.5 text-sm font-extrabold tabular-nums text-primary";

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

const COMPACT_QUERY = "(max-width: 1023px)";

function subscribeCompact(onChange: () => void) {
  const mq = window.matchMedia(COMPACT_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function ReceiptFormClient() {
  const supabase = createClient();
  const [form, setForm] = useState<ReceiptFormData>(() => ({
    ...EMPTY_RECEIPT,
    issueDate: todayIso(),
  }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Default pratinjau mengikuti perangkat (HP -> mobile, desktop -> A4),
  // ikut berubah saat HP dirotasi. Override manual menang.
  const isCompact = useSyncExternalStore(
    subscribeCompact,
    () => window.matchMedia(COMPACT_QUERY).matches,
    () => false,
  );
  const [viewOverride, setViewOverride] = useState<"mobile" | "a4" | null>(null);
  const view = viewOverride ?? (isCompact ? "mobile" : "a4");

  const a4Ref = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [exportNote, setExportNote] = useState<string | null>(null);

  const handleDownloadPdf = async () => {
    const node = a4Ref.current;
    if (!node || exporting) return;
    setExporting(true);
    setExportNote(null);
    try {
      await downloadReceiptPdf(form, node);
    } catch (err: unknown) {
      setExportNote(describeReceiptError(err));
    } finally {
      setExporting(false);
    }
  };

  const total = useMemo(() => receiptTotal(form), [form]);
  const remaining = useMemo(() => receiptRemaining(form), [form]);

  const set = <K extends keyof ReceiptFormData>(key: K, value: ReceiptFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
    setError(null);
    setHint(null);
  };

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
    try {
      // Nomor dibuat server-side lewat counter atomik (unik, tanpa bentrok)
      const { data: number, error: numberError } = await supabase.rpc(
        "next_document_number",
        { p_prefix: RECEIPT_PREFIX },
      );
      if (numberError) throw numberError;
      const receiptNumber = String(number ?? "").trim();
      if (!receiptNumber) throw new Error("Nomor kwitansi gagal dibuat.");

      const { error: insertError } = await supabase.from("receipts").insert({
        receipt_number: receiptNumber,
        issue_date: form.issueDate || null,
        customer_name: form.customerName.trim(),
        service_type: form.serviceType,
        vehicle_name: form.vehicleName.trim() || null,
        start_date: form.startDate || null,
        end_date: form.endDate || null,
        start_time: form.startTime || null,
        end_time: form.endTime || null,
        pickup_location: form.pickupLocation.trim() || null,
        destination: form.destination.trim() || null,
        duration_days: form.durationDays,
        price_per_day: form.pricePerDay,
        total_amount: total,
        down_payment: form.downPayment,
        remaining_amount: remaining,
        payment_status: form.paymentStatus,
        note: form.note.trim() || null,
        bank_name: form.bankName.trim() || null,
        bank_account: form.bankAccount.trim() || null,
        bank_holder: form.bankHolder.trim() || null,
      });
      if (insertError) throw insertError;

      setForm((prev) => ({ ...prev, receiptNumber }));
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

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:items-start">
      {/* ================= FORM ================= */}
      <form onSubmit={handleSave} className="receipt-no-print space-y-4">
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
              Kwitansi <span className="font-mono font-extrabold">{form.receiptNumber}</span>{" "}
              tersimpan. Klik &ldquo;Unduh PDF&rdquo; untuk mengunduh{" "}
              <span className="font-mono">{receiptFileName(form)}</span>.
            </span>
          </div>
        )}

        {exportNote && (
          <div className="space-y-1 rounded-2xl border border-warning/40 bg-warning/10 p-4">
            <p className="text-xs font-bold leading-relaxed text-warning">
              Gagal membuat PDF otomatis.
            </p>
            <p className="text-[11px] font-semibold leading-relaxed text-warning/90">
              {exportNote}
            </p>
            <p className="text-[11px] font-semibold leading-relaxed text-warning/80">
              Sementara itu tombol &ldquo;Cetak&rdquo; tetap bisa dipakai.
            </p>
          </div>
        )}

        <SectionCard icon={FileText} title="Data Kwitansi" step={1}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Nomor Kwitansi"
              hint="Dibuat otomatis & unik saat disimpan."
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

        <SectionCard icon={User} title="Pelanggan &amp; Layanan" step={2}>
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

        <SectionCard icon={Wallet} title="Biaya &amp; Pembayaran" step={4}>
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

        <SectionCard icon={MapPin} title="Rekening &amp; Catatan" step={5}>
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

        {/* Sticky action bar */}
        <div className="sticky bottom-4 z-20">
          <div className="flex flex-wrap items-center justify-end gap-2.5 rounded-2xl border border-line bg-white/95 p-3 shadow-elevated backdrop-blur-xl">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3.5 py-2.5 text-sm font-bold text-heading transition hover:bg-surface"
            >
              <RotateCcw size={15} /> Reset
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              disabled={!form.receiptNumber}
              title="Cetak langsung dari printer (cadangan)"
              className="inline-flex items-center gap-1.5 rounded-xl border border-accent bg-white px-3.5 py-2.5 text-sm font-extrabold text-accent transition hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Printer size={15} /> Cetak
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={!form.receiptNumber || exporting}
              title={
                form.receiptNumber
                  ? `Unduh ${receiptFileName(form)}`
                  : "Simpan kwitansi dulu untuk membuat nomor"
              }
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-extrabold text-heading transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Download size={15} /> {exporting ? "Menyiapkan..." : "Unduh PDF"}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] transition hover:bg-accent-hover disabled:opacity-50"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? "Menyimpan..." : "Simpan Kwitansi"}
            </button>
          </div>
        </div>

        <p className="pb-2 text-center text-[11px] leading-relaxed text-muted">
          Nomor dibuat berurutan per tahun (contoh{" "}
          <span className="font-mono font-bold">KWT-2026-0001</span>) dan tidak akan bentrok
          antar admin. Bank default BCA {DEFAULT_BANK.bankAccount} a.n. {DEFAULT_BANK.bankHolder},
          catatan default &ldquo;{DEFAULT_RECEIPT_NOTE}&rdquo;.
        </p>
      </form>

      {/* ================= PREVIEW ================= */}
      <div className="lg:sticky lg:top-24">
        <div className="receipt-no-print mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary">
              Pratinjau
            </p>
            <h2 className="text-sm font-extrabold text-heading">
              {view === "a4" ? "Kuitansi A4 — hasil cetak" : "Kuitansi tampilan HP"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle tampilan sesuai perangkat */}
            <div className="flex items-center gap-1 rounded-xl border border-line bg-white p-1">
              <button
                type="button"
                onClick={() => setViewOverride("mobile")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-extrabold transition ${
                  view === "mobile"
                    ? "bg-accent text-white shadow-[0_6px_14px_-6px_rgba(0,86,145,0.5)]"
                    : "text-muted hover:text-accent"
                }`}
              >
                <Smartphone size={13} /> HP
              </button>
              <button
                type="button"
                onClick={() => setViewOverride("a4")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-extrabold transition ${
                  view === "a4"
                    ? "bg-accent text-white shadow-[0_6px_14px_-6px_rgba(0,86,145,0.5)]"
                    : "text-muted hover:text-accent"
                }`}
              >
                <Monitor size={13} /> A4
              </button>
            </div>
            <span className="hidden rounded-full border border-line bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted sm:inline">
              210 &times; 297 mm
            </span>
          </div>
        </div>

        {/* Tampilan HP: fluid, tanpa scroll horizontal */}
        <div className={`receipt-view-mobile ${view === "mobile" ? "" : "hidden"}`}>
          <ReceiptSheetMobile data={form} />
        </div>

        {/*
          Tampilan A4 SELALU ada di DOM supaya bisa di-capture jadi PDF.
          Saat mode HP, disembunyikan dengan `h-0 overflow-hidden` (bukan
          `display:none`) supaya computed style tetap terbaca saat rasterisasi.
        */}
        <div
          className={
            view === "a4" ? "" : "pointer-events-none h-0 overflow-hidden opacity-0"
          }
          aria-hidden={view === "a4" ? undefined : true}
        >
          <div className="receipt-view-a4 receipt-scroll overflow-x-auto rounded-2xl border border-line bg-surface/40 p-3 sm:p-5">
            <ReceiptSheet ref={a4Ref} data={form} />
          </div>
        </div>

        <p className="receipt-no-print mt-3 text-[11px] leading-relaxed text-muted">
          Tekan{" "}
          <span className="font-bold text-heading">&ldquo;Unduh PDF&rdquo;</span> untuk langsung
          mengunduh file{" "}
          <span className="font-mono font-bold text-heading">{receiptFileName(form)}</span>. Hasilnya
          sama persis dengan pratinjau A4. Gunakan{" "}
          <span className="font-bold text-heading">&ldquo;Cetak&rdquo;</span> hanya jika ingin
          mencetak langsung dari printer.
        </p>
      </div>
    </div>
  );
}
