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
  "Siswa pembayaran wajib dilunasi saat serah terima kendaraan.";

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

/** Nama file unik untuk hasil unduhan. */
export function receiptFileName(data: ReceiptFormData, ext: "pdf" | "png"): string {
  const slug = (data.customerName || "pelanggan")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "pelanggan";
  return `${data.receiptNumber || "KWT-draft"}-${slug}.${ext}`;
}
