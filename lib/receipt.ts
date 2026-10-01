export type PaymentStatus = "unpaid" | "partial" | "paid";

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  unpaid: "Belum Dibayar",
  partial: "DP / Belum Lunas",
  paid: "Lunas",
};

export const RECEIPT_PREFIX = "KWT";

/** Bank default, bisa diedit per kwitansi. */
export const DEFAULT_BANK = {
  bankName: "Bank Central Asia (BCA)",
  bankAccount: "3760498415",
  bankHolder: "Sandhy Mulyana",
};

export const DEFAULT_RECEIPT_NOTE =
  "Sisa pembayaran wajib dilunasi saat serah terima kendaraan.";

export type ReceiptFormData = {
  receiptNumber: string;
  issueDate: string;
  customerName: string;
  serviceType: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  pickupLocation: string;
  destination: string;
  durationDays: number;
  pricePerDay: number;
  downPayment: number;
  paymentStatus: PaymentStatus;
  note: string;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
};

export const EMPTY_RECEIPT: ReceiptFormData = {
  receiptNumber: "",
  issueDate: "",
  customerName: "",
  serviceType: "Sewa Mobil Tanpa Driver",
  vehicleName: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  pickupLocation: "",
  destination: "",
  durationDays: 1,
  pricePerDay: 0,
  downPayment: 0,
  paymentStatus: "partial",
  note: DEFAULT_RECEIPT_NOTE,
  bankName: DEFAULT_BANK.bankName,
  bankAccount: DEFAULT_BANK.bankAccount,
  bankHolder: DEFAULT_BANK.bankHolder,
};

export function receiptTotal(data: Pick<ReceiptFormData, "durationDays" | "pricePerDay">) {
  return Math.max(0, data.durationDays || 0) * Math.max(0, data.pricePerDay || 0);
}

export function receiptRemaining(data: Pick<ReceiptFormData, "durationDays" | "pricePerDay" | "downPayment">) {
  return Math.max(0, receiptTotal(data) - Math.max(0, data.downPayment || 0));
}

/** 3000000 -> "Rp 3.000.000" */
export function rupiah(amount: number): string {
  const safe = Number.isFinite(amount) ? Math.round(amount) : 0;
  return "Rp " + safe.toLocaleString("id-ID");
}

/** Angka untuk <input type="text">: 750000 -> "750.000" */
export function rupiahInput(value: number | string): string {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("id-ID");
}

/** "750.000" -> 750000 */
export function parseRupiah(value: string): number {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (!digits) return 0;
  return parseInt(digits, 10) || 0;
}

const LONG_MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
const SHORT_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

/** "2026-10-10" -> "10 Oktober 2026" */
export function formatTanggalPanjang(iso: string): string {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${LONG_MONTHS[m - 1]} ${y}`;
}

/** "2026-10-10" -> "10 Okt 2026" */
export function formatTanggalPendek(iso: string): string {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${SHORT_MONTHS[m - 1]} ${y}`;
}

/** "2026-10-10" -> "10 Oktober 2026, 14.30" (fallback zona lokal) */
export function formatTanggalJam(isoDateTime: string): string {
  if (!isoDateTime) return "-";
  const date = new Date(isoDateTime);
  if (Number.isNaN(date.getTime())) return isoDateTime;
  return `${formatTanggalPanjang(date.toISOString().slice(0, 10))}, ${date
    .toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    .replace(/\./g, ":")}`;
}

/** Range tanggal rental, disederhanakan jadi satu baris. */
export function formatRentangTanggal(start: string, end: string): string {
  if (start && end && start !== end) {
    const [sy, sm] = start.split("-");
    const [ey, em] = end.split("-");
    if (sy === ey && sm === em) {
      const s = Number(start.split("-")[2]);
      const e = Number(end.split("-")[2]);
      return `${s}–${e} ${LONG_MONTHS[Number(sm) - 1]} ${sy}`;
    }
    return `${formatTanggalPanjang(start)} – ${formatTanggalPanjang(end)}`;
  }
  return formatTanggalPanjang(start || end);
}

/** Derive durasi hari dari rentang tanggal (minimal 1). */
export function daysBetween(start: string, end: string): number {
  if (!start || !end) return 1;
  const a = new Date(`${start}T00:00:00`);
  const b = new Date(`${end}T00:00:00`);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 1;
  const diff = Math.round((b.getTime() - a.getTime()) / 86_400_000) + 1;
  return diff > 0 ? diff : 1;
}

/** "Brandung – Semarang" (dengan en-dash, bukan hyphen). */
export function formatRute(pickup: string, destination: string): string {
  const from = pickup.trim();
  const to = destination.trim();
  if (from && to) return `${from} – ${to}`;
  return from || to || "-";
}

export type ReceiptDetailRow = { label: string; value: string };

/** Baris detail yang benar-benar terisi (jam opsional boleh kosong). */
export function receiptDetailRows(data: ReceiptFormData): ReceiptDetailRow[] {
  const rows: ReceiptDetailRow[] = [
    { label: "Rental", value: formatRentangTanggal(data.startDate, data.endDate) },
    { label: "Durasi", value: `${data.durationDays} hari` },
  ];

  const rute = formatRute(data.pickupLocation, data.destination);
  if (rute !== "-") rows.push({ label: "Rute", value: rute });

  const jam =
    data.startTime && data.endTime
      ? `${data.startTime} – ${data.endTime}`
      : data.startTime
        ? `${data.startTime} – selesai`
        : data.endTime
          ? `mulai – ${data.endTime}`
          : "";
  if (jam) rows.push({ label: "Jam", value: jam });

  return rows;
}

/**
 * Ambil pesan error yang bisa dibaca.
 * Supabase/PostgREST mengembalikan { code, message, details, hint } —
 * `String(err)` saja menghasilkan "[object Object]".
 */
export function describeReceiptError(err: unknown): string {
  if (err == null) return "Terjadi kesalahan yang tidak diketahui.";
  if (typeof err === "string") return err.trim() || "Terjadi kesalahan.";

  if (typeof err === "object") {
    const e = err as Record<string, unknown>;
    const parts = [e.message, e.details, e.hint, e.code]
      .map((v) => (typeof v === "string" ? v.trim() : ""))
      .filter(Boolean);
    if (parts.length > 0) {
      // hindari mengulang pesan yang identik dengan details
      return Array.from(new Set(parts)).join(" — ");
    }
    try {
      const json = JSON.stringify(err);
      if (json && json !== "{}") return json;
    } catch {
      /* fallthrough */
    }
  }

  const text = String(err);
  return text === "[object Object]" ? "Terjadi kesalahan yang tidak diketahui." : text;
}

/** Petunjuk tindakan untuk error yang sering muncul. */
export function receiptErrorHint(message: string): string | null {
  if (/next_document_number|receipts|document_counters/i.test(message) && /does not exist|not found|schema cache|permission denied/i.test(message)) {
    return "Jalankan migration 012_receipts.sql di Supabase → SQL Editor, lalu tunggu ~10 detik sebelum mencoba lagi.";
  }
  if (/duplicate key|receipt_number/i.test(message)) {
    return "Nomor kwitansi sudah dipakai. Coba simpan ulang.";
  }
  if (/row-level security|RLS|permission denied/i.test(message)) {
    return "Sesi admin mungkin habis. Keluar dan masuk kembali ke dashboard admin.";
  }
  if (/Failed to fetch|NetworkError|load failed/i.test(message)) {
    return "Koneksi terputus. Periksa jaringan lalu ulangi.";
  }
  return null;
}

/** Baris kwitansi di database (dipakai form edit & riwayat). */
export type ReceiptRecord = {
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

/** Ubah baris DB -> state form (dipakai saat edit & melihat riwayat). */
export function receiptRowToFormData(row: ReceiptRecord): ReceiptFormData {
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

/** Payload insert/update Supabase dari state form. */
export function receiptFormToPayload(
  data: ReceiptFormData,
  totals: { total: number; remaining: number },
) {
  return {
    issue_date: data.issueDate || null,
    customer_name: data.customerName.trim(),
    service_type: data.serviceType,
    vehicle_name: data.vehicleName.trim() || null,
    start_date: data.startDate || null,
    end_date: data.endDate || null,
    start_time: data.startTime || null,
    end_time: data.endTime || null,
    pickup_location: data.pickupLocation.trim() || null,
    destination: data.destination.trim() || null,
    duration_days: data.durationDays,
    price_per_day: data.pricePerDay,
    total_amount: totals.total,
    down_payment: data.downPayment,
    remaining_amount: totals.remaining,
    payment_status: data.paymentStatus,
    note: data.note.trim() || null,
    bank_name: data.bankName.trim() || null,
    bank_account: data.bankAccount.trim() || null,
    bank_holder: data.bankHolder.trim() || null,
  };
}

/** Urutan angka saja dari nomor kwitansi: "KWT-2026-0007" -> "0007". */
export function receiptSequence(receiptNumber: string): string {
  const last = receiptNumber.split("-").pop() ?? "";
  return /^\d+$/.test(last) ? last : "0000";
}

/** Nama file hasil unduhan: "Kwitansi-0001-MahessaTransHoliday.pdf" */
export function receiptFileName(data: ReceiptFormData): string {
  return `Kwitansi-${receiptSequence(data.receiptNumber)}-MahessaTransHoliday.pdf`;
}
