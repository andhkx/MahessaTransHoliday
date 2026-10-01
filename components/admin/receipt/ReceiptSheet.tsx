import { forwardRef } from "react";
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

/* Palet dokumen: teks lebih terang dari palet website supaya tidak "gelap",
   aksen biru lebih kuat supaya terlihat. */
const INK = "#4f6579";
const INK_SOFT = "#7d93a6";
const BLUE = "#005691";
const BLUE_DEEP = "#003f6b";
const BLUE_VIVID = "#0a72b4";
const TINT = "#e6f0f7";
const HAIRLINE = "#c8dcea";

function StatusChip({ status }: { status: PaymentStatus }) {
  const map: Record<PaymentStatus, string> = {
    unpaid: "border-white/50 bg-white/15 text-white",
    partial: "border-[#ffd88a] bg-[#ffd88a]/25 text-[#ffe9bd]",
    paid: "border-[#8ff0c0] bg-[#8ff0c0]/25 text-[#c3f9de]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-[3mm] py-[1.2mm] text-[8pt] font-extrabold uppercase tracking-[0.16em] ${map[status]}`}
    >
      {PAYMENT_STATUS_LABEL[status]}
    </span>
  );
}

function InfoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[7.5pt] font-extrabold uppercase tracking-[0.18em]" style={{ color: INK_SOFT }}>
        {label}
      </p>
      <div className="mt-[1.5mm] text-[11pt] font-extrabold leading-snug" style={{ color: BLUE_DEEP }}>
        {children}
      </div>
    </div>
  );
}

/** Baris label-kiri nilai-kanan. Nilai `break-words` supaya rute panjang
 *  seperti "ST KCIC Padalarang" wrap dengan rapi dan tidak menggeser kolom. */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-baseline justify-between gap-[4mm] border-b border-dashed pb-[1.2mm]"
      style={{ borderColor: HAIRLINE }}
    >
      <span
        className="shrink-0 text-[7pt] font-extrabold uppercase tracking-[0.14em]"
        style={{ color: INK_SOFT }}
      >
        {label}
      </span>
      <span
        className="min-w-0 break-words text-right text-[9.5pt] font-extrabold leading-snug"
        style={{ color: BLUE_DEEP }}
      >
        {value}
      </span>
    </div>
  );
}

const ReceiptSheet = forwardRef<HTMLDivElement, { data: ReceiptFormData }>(
  function ReceiptSheet({ data }, ref) {
    const d = { ...EMPTY_RECEIPT, ...data };
    const total = receiptTotal(d);
    const remaining = receiptRemaining(d);
    const rows = receiptDetailRows(d);
    const lastIsOdd = rows.length % 2 === 1;

    return (
      <div
        ref={ref}
        className="receipt-sheet relative mx-auto flex w-[210mm] min-h-[297mm] flex-col bg-white shadow-[0_18px_50px_-24px_rgba(0,74,124,0.45)]"
        style={{ color: INK }}
      >
        {/* ============ HEADER ============ */}
        <header className="relative overflow-hidden bg-gradient-to-br from-[#0f83c9] via-[#005691] to-[#003a63] px-[12mm] pb-[10mm] pt-[11mm] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[28mm] -top-[32mm] h-[78mm] w-[78mm] rounded-full bg-white/12 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[24mm] left-[34mm] h-[58mm] w-[58mm] rounded-full bg-[#7fd0ff]/20 blur-2xl"
          />

          <div className="relative flex items-start justify-between gap-[8mm]">
            <div className="flex items-center gap-[5mm]">
              <div className="flex h-[19mm] w-[27mm] shrink-0 items-center justify-center rounded-[3mm] bg-white px-[2mm] shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo_mahessa.webp" alt={SITE_NAME} className="h-auto w-full" />
              </div>
              <div>
                <p className="text-[13.5pt] font-extrabold leading-tight">{SITE_NAME}</p>
                <p className="mt-[1mm] text-[8pt] font-bold uppercase tracking-[0.22em] text-white/80">
                  Rental Mobil &amp; Wisata
                </p>
                <div className="mt-[2.5mm]">
                  <StatusChip status={d.paymentStatus} />
                </div>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-[8pt] font-bold uppercase tracking-[0.32em] text-white/80">
                Dokumen Resmi
              </p>
              <h1 className="mt-[1mm] text-[27pt] font-extrabold leading-none tracking-[0.06em]">
                KUITANSI
              </h1>
              <div className="mt-[3.5mm] inline-block rounded-[2mm] border border-white/40 bg-white/15 px-[3.5mm] py-[1.8mm]">
                <p className="text-[7pt] font-bold uppercase tracking-[0.18em] text-white/80">
                  No. Kwitansi
                </p>
                <p className="font-mono text-[11.5pt] font-extrabold tracking-tight">
                  {d.receiptNumber || "KWT-0000-0000"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ============ BODY ============ */}
        <div className="flex flex-1 flex-col px-[12mm] pb-[9mm] pt-[8mm]">
          {/* Pelanggan */}
          <section className="grid grid-cols-[1.3fr_1fr] gap-[8mm] rounded-[3mm] bg-[#f4f9fd] px-[5mm] py-[5mm]">
            <div className="space-y-[5mm]">
              <InfoBlock label="Diterimakan Kepada">
                <p className="text-[16pt] font-extrabold leading-tight">
                  {d.customerName || "Nama Pelanggan"}
                </p>
              </InfoBlock>
              <InfoBlock label="Jenis Layanan">{d.serviceType}</InfoBlock>
            </div>
            <div className="space-y-[5mm]">
              <InfoBlock label="Tanggal Kwitansi">
                {formatTanggalPanjang(d.issueDate)}
              </InfoBlock>
              <InfoBlock label="Perjalanan">
                {formatRute(d.pickupLocation, d.destination)}
              </InfoBlock>
            </div>
          </section>

          {/* ---- RINCIAN (daftar, bukan tabel) ---- */}
          <section className="mt-[6mm] overflow-hidden rounded-[3mm] border" style={{ borderColor: HAIRLINE }}>
            <div
              className="flex items-center gap-[3mm] px-[5mm] py-[2.6mm]"
              style={{ background: TINT }}
            >
              <span
                className="text-[7.5pt] font-extrabold uppercase tracking-[0.18em]"
                style={{ color: BLUE_DEEP }}
              >
                Rincian
              </span>
              <span className="h-px flex-1" style={{ background: HAIRLINE }} />
              <span className="text-[7.5pt] font-extrabold" style={{ color: BLUE }}>
                1 item
              </span>
            </div>

            <div className="px-[5mm] py-[5mm]">
              <p className="text-[12.5pt] font-extrabold leading-tight" style={{ color: BLUE_DEEP }}>
                {d.serviceType}
              </p>
              {d.vehicleName && (
                <p className="mt-[1mm] text-[10pt] font-bold" style={{ color: BLUE }}>
                  {d.vehicleName}
                </p>
              )}

              <div className="mt-[4mm] grid grid-cols-2 gap-x-[10mm] gap-y-[2.6mm]">
                {rows.map((row, index) => (
                  <div
                    key={row.label}
                    className={
                      lastIsOdd && index === rows.length - 1 ? "col-span-2" : undefined
                    }
                  >
                    <DetailRow label={row.label} value={row.value} />
                  </div>
                ))}
              </div>

              <div
                className="mt-[4mm] flex items-baseline justify-between gap-[4mm] border-t pt-[3mm]"
                style={{ borderColor: HAIRLINE }}
              >
                <span className="text-[9pt] font-extrabold uppercase tracking-[0.1em]" style={{ color: INK_SOFT }}>
                  Harga &times; durasi
                </span>
                <span className="text-[13pt] font-extrabold tabular-nums" style={{ color: BLUE_DEEP }}>
                  {rupiah(d.pricePerDay)} &times; {d.durationDays} hari
                </span>
              </div>
            </div>
          </section>

          {/* ---- REKENING PEMBAYARAN ---- */}
          <section
            className="mt-[5mm] grid grid-cols-[1.1fr_1.2fr_1fr] gap-[5mm] rounded-[3mm] border p-[4.5mm]"
            style={{ borderColor: HAIRLINE }}
          >
            <div>
              <p className="text-[7pt] font-extrabold uppercase tracking-[0.16em]" style={{ color: INK_SOFT }}>
                Bank
              </p>
              <p className="mt-[1mm] text-[9.5pt] font-extrabold leading-tight" style={{ color: BLUE_DEEP }}>
                {d.bankName || "-"}
              </p>
            </div>
            <div>
              <p className="text-[7pt] font-extrabold uppercase tracking-[0.16em]" style={{ color: INK_SOFT }}>
                Nomor Rekening
              </p>
              <p
                className="mt-[1mm] font-mono text-[15pt] font-extrabold tracking-[0.06em] leading-none"
                style={{ color: BLUE_VIVID }}
              >
                {d.bankAccount || "-"}
              </p>
            </div>
            <div>
              <p className="text-[7pt] font-extrabold uppercase tracking-[0.16em]" style={{ color: INK_SOFT }}>
                Atas Nama
              </p>
              <p className="mt-[1mm] text-[9.5pt] font-extrabold leading-tight" style={{ color: BLUE_DEEP }}>
                {d.bankHolder || "-"}
              </p>
            </div>
          </section>

          {/* ---- TOTAL TAGIHAN (full width) ---- */}
          <section className="mt-[5mm]">
            <div className="flex w-full items-center justify-between gap-[6mm] rounded-[3mm] bg-gradient-to-r from-[#0f83c9] via-[#00629f] to-[#00416f] px-[6mm] py-[4.5mm] text-white shadow-[0_6px_16px_-8px_rgba(0,86,145,0.5)]">
              <div>
                <p className="text-[8.5pt] font-extrabold uppercase tracking-[0.24em] text-white/80">
                  Total Tagihan
                </p>
                <p className="mt-[0.8mm] text-[8pt] font-semibold text-white/70">
                  {rupiah(d.pricePerDay)} &times; {d.durationDays} hari
                </p>
              </div>
              <p className="text-[22pt] font-extrabold leading-none tabular-nums">
                {rupiah(total)}
              </p>
            </div>
          </section>

          {/* ---- RINCIAN PEMBAYARAN (paling bawah) ---- */}
          <section className="mt-[5mm]">
            <div
              className="grid grid-cols-3 overflow-hidden rounded-[3mm] border"
              style={{ borderColor: HAIRLINE, background: "#f4f9fd" }}
            >
              <div className="px-[4.5mm] py-[4mm]">
                <p className="text-[7pt] font-extrabold uppercase tracking-[0.16em]" style={{ color: INK_SOFT }}>
                  Total Tagihan
                </p>
                <p className="mt-[1.5mm] text-[12pt] font-extrabold tabular-nums" style={{ color: BLUE_DEEP }}>
                  {rupiah(total)}
                </p>
              </div>
              <div
                className="border-x px-[4.5mm] py-[4mm]"
                style={{ borderColor: HAIRLINE, background: TINT }}
              >
                <p className="text-[7pt] font-extrabold uppercase tracking-[0.16em]" style={{ color: INK_SOFT }}>
                  DP / Dibayar
                </p>
                <p className="mt-[1.5mm] text-[12pt] font-extrabold tabular-nums" style={{ color: BLUE_DEEP }}>
                  {rupiah(d.downPayment)}
                </p>
              </div>
              <div
                className="px-[4.5mm] py-[4mm]"
                style={{ background: "#0a72b4" }}
              >
                <p className="text-[7pt] font-extrabold uppercase tracking-[0.16em] text-white/80">
                  Sisa Pembayaran
                </p>
                <p className="mt-[1.5mm] text-[15pt] font-extrabold tabular-nums text-white">
                  {rupiah(remaining)}
                </p>
              </div>
            </div>
          </section>

          {/* Penutup */}
          <div className="mt-auto pt-[7mm]">
            <div
              className="flex items-center justify-between gap-[5mm] rounded-[3mm] border border-dashed px-[5mm] py-[4mm]"
              style={{ borderColor: HAIRLINE, background: TINT }}
            >
              <div>
                <p className="text-[11pt] font-extrabold leading-tight" style={{ color: BLUE_DEEP }}>
                  Terima kasih sudah bepergian bersama kami
                </p>
                <p className="mt-[1mm] text-[8.5pt] font-semibold" style={{ color: INK_SOFT }}>
                  Simpan kwitansi ini sebagai bukti transaksi Anda.
                </p>
              </div>
              <p
                className="shrink-0 text-[8pt] font-extrabold uppercase tracking-[0.18em]"
                style={{ color: BLUE }}
              >
                {SITE_NAME}
              </p>
            </div>

            <footer
              className="mt-[5mm] flex flex-wrap items-center justify-between gap-x-[6mm] gap-y-[1.5mm] border-t pt-[3.5mm]"
              style={{ borderColor: HAIRLINE, color: INK_SOFT }}
            >
              <p className="text-[7.5pt] font-semibold">
                {SITE_URL.replace(/^https?:\/\//, "")} &middot; {EMAIL_ADDRESS}
              </p>
              <p className="text-[7.5pt] font-semibold">{WHATSAPP_DISPLAY}</p>
            </footer>
          </div>
        </div>
      </div>
    );
  },
);

export default ReceiptSheet;
