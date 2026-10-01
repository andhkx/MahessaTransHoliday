import {
  EMPTY_RECEIPT,
  formatRute,
  formatTanggalPanjang,
  PAYMENT_STATUS_LABEL,
  receiptDetailRows,
  receiptRemaining,
  receiptTotal,
  rupiah,
  type PaymentStatus,
  type ReceiptFormData,
} from "@/lib/receipt";
import { EMAIL_ADDRESS, SITE_NAME, SITE_URL, WHATSAPP_DISPLAY } from "@/lib/constants";

/**
 * Tampilan kwitansi untuk HP: fluid, satu kolom, tanpa scroll horizontal.
 * Isi & strukturnya sama persis dengan versi A4 supaya tidak ada
 * perbedaan data antara layar HP dan hasil cetak.
 */
export default function ReceiptSheetMobile({ data }: { data: ReceiptFormData }) {
  const d = { ...EMPTY_RECEIPT, ...data };
  const total = receiptTotal(d);
  const remaining = receiptRemaining(d);
  const rows = receiptDetailRows(d);

  const statusMap: Record<PaymentStatus, string> = {
    unpaid: "bg-white/15 text-white border-white/40",
    partial: "bg-[#ffd88a]/25 text-[#ffe9bd] border-[#ffd88a]",
    paid: "bg-[#8ff0c0]/25 text-[#c3f9de] border-[#8ff0c0]",
  };

  return (
    <div className="receipt-sheet-mobile w-full overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#0f83c9] via-[#005691] to-[#003a63] px-5 py-5 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl"
        />
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-14 shrink-0 items-center justify-center rounded-xl bg-white px-1.5 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo_mahessa.webp" alt={SITE_NAME} className="h-auto w-full" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-extrabold leading-tight">{SITE_NAME}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
              Rental Mobil &amp; Wisata
            </p>
            <span
              className={`mt-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] ${statusMap[d.paymentStatus]}`}
            >
              {PAYMENT_STATUS_LABEL[d.paymentStatus]}
            </span>
          </div>
        </div>

        <div className="relative mt-5 flex items-end justify-between gap-3 border-t border-white/25 pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/80">
              Dokumen Resmi
            </p>
            <h1 className="text-2xl font-extrabold leading-none tracking-[0.06em]">KUITANSI</h1>
          </div>
          <div className="rounded-lg border border-white/40 bg-white/15 px-3 py-1.5 text-right">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/80">
              No. Kwitansi
            </p>
            <p className="font-mono text-xs font-extrabold">{d.receiptNumber || "KWT-0000-0000"}</p>
          </div>
        </div>
      </header>

      <div className="space-y-3 p-4">
        {/* Pelanggan */}
        <section className="rounded-xl bg-[#f4f9fd] p-4">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#7d93a6]">
            Diterimakan Kepada
          </p>
          <p className="mt-1 text-lg font-extrabold leading-tight text-[#003f6b]">
            {d.customerName || "Nama Pelanggan"}
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#7d93a6]">
                Jenis Layanan
              </p>
              <p className="mt-0.5 text-xs font-extrabold text-[#003f6b]">{d.serviceType}</p>
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#7d93a6]">
                Tanggal Kwitansi
              </p>
              <p className="mt-0.5 text-xs font-extrabold text-[#003f6b]">
                {formatTanggalPanjang(d.issueDate)}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#7d93a6]">
                Perjalanan
              </p>
              <p className="mt-0.5 text-xs font-extrabold text-[#003f6b]">
                {formatRute(d.pickupLocation, d.destination)}
              </p>
            </div>
          </div>
        </section>

        {/* Item */}
        <section className="overflow-hidden rounded-xl border border-line">
          <div className="flex items-center gap-2 bg-[#e6f0f7] px-4 py-2.5">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#003f6b]">
              Rincian
            </span>
            <span className="h-px flex-1 bg-[#c8dcea]" />
            <span className="text-[10px] font-extrabold text-[#005691]">{d.durationDays} hari</span>
          </div>

          <div className="p-4">
            <p className="text-sm font-extrabold leading-tight text-[#003f6b]">{d.serviceType}</p>
            {d.vehicleName && (
              <p className="mt-0.5 text-xs font-bold text-[#005691]">{d.vehicleName}</p>
            )}

            <div className="mt-3 flex flex-col gap-2.5">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-3 border-b border-dashed border-line pb-1.5"
                >
                  <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#7d93a6]">
                    {row.label}
                  </span>
                  <span className="min-w-0 break-words text-right text-xs font-extrabold leading-snug text-[#003f6b]">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <dl className="mt-3 space-y-1.5 border-t border-line pt-3">
              <div className="flex items-center justify-between">
                <dt className="text-xs font-semibold text-[#4f6579]">Harga per hari</dt>
                <dd className="text-xs font-bold tabular-nums text-[#4f6579]">
                  {rupiah(d.pricePerDay)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-xs font-semibold text-[#4f6579]">Durasi</dt>
                <dd className="text-xs font-bold tabular-nums text-[#4f6579]">
                  {d.durationDays} hari
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Rekening Pembayaran — sebelum total */}
        <section className="rounded-xl border border-line p-4">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#005691]">
            Rekening Pembayaran
          </p>
          <dl className="mt-2.5 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <dt className="shrink-0 text-xs font-semibold text-[#7d93a6]">Bank</dt>
              <dd className="text-right text-xs font-extrabold text-[#003f6b]">
                {d.bankName || "-"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="shrink-0 text-xs font-semibold text-[#7d93a6]">No. Rekening</dt>
              <dd className="font-mono text-base font-extrabold tracking-[0.06em] text-[#0a72b4]">
                {d.bankAccount || "-"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="shrink-0 text-xs font-semibold text-[#7d93a6]">Atas Nama</dt>
              <dd className="text-right text-xs font-extrabold text-[#003f6b]">
                {d.bankHolder || "-"}
              </dd>
            </div>
          </dl>
        </section>

        {/* Total Tagihan — full width */}
        <section className="flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-[#0f83c9] via-[#00629f] to-[#00416f] px-4 py-4 text-white shadow-[0_6px_16px_-8px_rgba(0,86,145,0.5)]">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/80">
              Total Tagihan
            </p>
            <p className="mt-0.5 text-[10px] font-semibold text-white/70">
              {rupiah(d.pricePerDay)} &times; {d.durationDays} hari
            </p>
          </div>
          <p className="text-lg font-extrabold leading-none tabular-nums">{rupiah(total)}</p>
        </section>

        {/* Rincian Pembayaran — paling bawah supaya pembayaran jelas terlihat */}
        <section className="overflow-hidden rounded-xl border border-line">
          <div className="grid grid-cols-2">
            <div className="border-b border-line bg-[#f4f9fd] p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#7d93a6]">
                DP / Dibayar
              </p>
              <p className="mt-1 text-base font-extrabold tabular-nums text-[#003f6b]">
                {rupiah(d.downPayment)}
              </p>
            </div>
            <div className="border-b border-l border-line bg-[#0a72b4] p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/80">
                Sisa Pembayaran
              </p>
              <p className="mt-1 text-xl font-extrabold tabular-nums text-white">
                {rupiah(remaining)}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between bg-white px-4 py-2.5">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#7d93a6]">
              Total Tagihan
            </p>
            <p className="text-xs font-extrabold tabular-nums text-[#003f6b]">
              {rupiah(total)}
            </p>
          </div>
        </section>

        {/* Catatan */}
        {d.note && (
          <section className="rounded-xl border-l-[3px] border-accent bg-[#f2f8fc] px-4 py-3">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#005691]">
              Catatan
            </p>
            <p className="mt-1 text-xs font-semibold leading-relaxed text-[#4f6579]">{d.note}</p>
          </section>
        )}

        {/* Penutup */}
        <section className="rounded-xl border border-dashed border-line bg-[#e6f0f7] p-4">
          <p className="text-sm font-extrabold leading-tight text-[#003f6b]">
            Terima kasih sudah bepergian bersama kami
          </p>
          <p className="mt-1 text-[11px] font-semibold text-[#7d93a6]">
            Simpan kwitansi ini sebagai bukti transaksi Anda.
          </p>
        </section>

        <footer className="flex flex-col gap-1 border-t border-line pt-3 text-[10px] font-semibold text-[#7d93a6]">
          <p className="truncate">
            {SITE_URL.replace(/^https?:\/\//, "")} &middot; {EMAIL_ADDRESS}
          </p>
          <p>{WHATSAPP_DISPLAY}</p>
        </footer>
      </div>
    </div>
  );
}
