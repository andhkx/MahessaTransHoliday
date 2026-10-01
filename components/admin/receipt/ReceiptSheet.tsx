import {
  EMPTY_RECEIPT,
  formatRentangTanggal,
  formatRute,
  formatTanggalPanjang,
  PAYMENT_STATUS_LABEL,
  receiptRemaining,
  receiptTotal,
  rupiah,
  type PaymentStatus,
  type ReceiptFormData,
} from "@/lib/receipt";
import {
  EMAIL_ADDRESS,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";

function StatusChip({ status }: { status: PaymentStatus }) {
  const map: Record<PaymentStatus, string> = {
    unpaid: "border-white/45 bg-white/10 text-white",
    partial: "border-[#ffd88a] bg-[#ffd88a]/20 text-[#ffe6b0]",
    paid: "border-[#8ff0c0] bg-[#8ff0c0]/20 text-[#b9f7d8]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-[3mm] py-[1.2mm] text-[8pt] font-extrabold uppercase tracking-[0.16em] ${map[status]}`}
    >
      {PAYMENT_STATUS_LABEL[status]}
    </span>
  );
}

function InfoBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[7.5pt] font-extrabold uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      <div className="mt-[1.5mm] text-[11pt] font-bold text-heading">{children}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-[2mm]">
      <span className="w-[24mm] shrink-0 text-[8pt] font-bold uppercase tracking-[0.1em] text-muted">
        {label}
      </span>
      <span className="text-[10pt] font-semibold text-body-text">{value}</span>
    </div>
  );
}

export default function ReceiptSheet({ data }: { data: ReceiptFormData }) {
  const d = { ...EMPTY_RECEIPT, ...data };
  const total = receiptTotal(d);
  const remaining = receiptRemaining(d);
  const rentalDates = formatRentangTanggal(d.startDate, d.endDate);
  const timeRange =
    d.startTime && d.endTime ? `${d.startTime} – ${d.endTime}` : d.startTime || d.endTime || "-";

  return (
    <div className="receipt-sheet relative mx-auto flex w-[210mm] min-h-[297mm] flex-col bg-white text-body-text shadow-[0_18px_50px_-24px_rgba(0,74,124,0.45)]">
      {/* ============ HEADER ============ */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#0a72b4] via-[#005691] to-[#003d69] px-[12mm] pb-[9mm] pt-[10mm] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[30mm] -top-[34mm] h-[80mm] w-[80mm] rounded-full bg-white/10 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[26mm] left-[40mm] h-[60mm] w-[60mm] rounded-full bg-[#8fd4ff]/15 blur-2xl"
        />

        <div className="relative flex items-start justify-between gap-[8mm]">
          {/* Brand: logo resmi di panel putih + wordmark */}
          <div className="flex items-center gap-[5mm]">
            <div className="flex h-[19mm] w-[26mm] shrink-0 items-center justify-center rounded-[3mm] bg-white px-[2mm] shadow-[0_4px_12px_-4px_rgba(0,0,0,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo_mahessa.webp"
                alt={SITE_NAME}
                className="h-auto w-full"
              />
            </div>
            <div>
              <p className="text-[13pt] font-extrabold leading-tight tracking-[-0.01em]">
                {SITE_NAME}
              </p>
              <p className="mt-[1mm] text-[8pt] font-semibold uppercase tracking-[0.2em] text-white/75">
                Rental Mobil &amp; Wisata
              </p>
              <div className="mt-[2.5mm]">
                <StatusChip status={d.paymentStatus} />
              </div>
            </div>
          </div>

          {/* Doc title */}
          <div className="shrink-0 text-right">
            <p className="text-[8pt] font-bold uppercase tracking-[0.3em] text-white/70">
              Dokumen Resmi
            </p>
            <h1 className="mt-[1mm] text-[26pt] font-extrabold leading-none tracking-[0.06em]">
              KUITANSI
            </h1>
            <div className="mt-[3mm] inline-block rounded-[2mm] border border-white/35 bg-white/10 px-[3.5mm] py-[1.6mm]">
              <p className="text-[7pt] font-bold uppercase tracking-[0.18em] text-white/70">
                No. Kwitansi
              </p>
              <p className="font-mono text-[11pt] font-extrabold tracking-tight">
                {d.receiptNumber || "KWT-0000-0000"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ============ BODY ============ */}
      <div className="flex flex-1 flex-col px-[12mm] pb-[10mm] pt-[8mm]">
        {/* Meta row */}
        <section className="grid grid-cols-[1.35fr_1fr] gap-[8mm] border-b border-line pb-[6mm]">
          <div className="space-y-[5mm]">
            <InfoBlock label="Diterimakan Kepada">
              <p className="text-[15pt] font-extrabold leading-tight">
                {d.customerName || "Nama Pelanggan"}
              </p>
            </InfoBlock>
            <InfoBlock label="Jenis Layanan">
              {d.serviceType || "Sewa Mobil Tanpa Driver"}
            </InfoBlock>
          </div>

          <div className="space-y-[5mm]">
            <InfoBlock label="Tanggal Kwitansi">
              {formatTanggalPanjang(d.issueDate)}
            </InfoBlock>
            <InfoBlock label="Lokasi Perjalanan">
              {formatRute(d.pickupLocation, d.destination)}
            </InfoBlock>
          </div>
        </section>

        {/* Rincian table */}
        <section className="mt-[7mm]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#eef5f9]">
                <th className="w-[10mm] rounded-l-[2mm] border-y border-line py-[2.4mm] text-left text-[7.5pt] font-extrabold uppercase tracking-[0.12em] text-heading">
                  No
                </th>
                <th className="border-y border-line py-[2.4mm] text-left text-[7.5pt] font-extrabold uppercase tracking-[0.12em] text-heading">
                  Keterangan
                </th>
                <th className="w-[16mm] border-y border-line py-[2.4mm] text-right text-[7.5pt] font-extrabold uppercase tracking-[0.12em] text-heading">
                  Qty
                </th>
                <th className="w-[26mm] border-y border-line py-[2.4mm] text-right text-[7.5pt] font-extrabold uppercase tracking-[0.12em] text-heading">
                  Harga
                </th>
                <th className="w-[30mm] rounded-r-[2mm] border-y border-line py-[2.4mm] text-right text-[7.5pt] font-extrabold uppercase tracking-[0.12em] text-heading">
                  Jumlah
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-line py-[4mm] text-[10pt] font-bold text-muted align-top">
                  1
                </td>
                <td className="border-b border-line py-[4mm] align-top">
                  <p className="text-[11.5pt] font-extrabold leading-tight text-heading">
                    {d.serviceType || "Sewa Mobil Tanpa Driver"}
                  </p>
                  {d.vehicleName && (
                    <p className="mt-[1mm] text-[10pt] font-bold text-body-text">
                      {d.vehicleName}
                    </p>
                  )}
                  <div className="mt-[3mm] grid grid-cols-2 gap-x-[6mm] gap-y-[1.8mm]">
                    <DetailRow label="Rental" value={rentalDates} />
                    <DetailRow label="Durasi" value={`${d.durationDays} hari`} />
                    <DetailRow label="Rute" value={formatRute(d.pickupLocation, d.destination)} />
                    <DetailRow label="Jam" value={timeRange} />
                  </div>
                </td>
                <td className="border-b border-line py-[4mm] text-right align-top text-[10pt] font-bold">
                  {d.durationDays} hari
                </td>
                <td className="border-b border-line py-[4mm] text-right align-top text-[10pt] font-bold tabular-nums">
                  {rupiah(d.pricePerDay)}
                </td>
                <td className="border-b border-line py-[4mm] text-right align-top text-[10pt] font-extrabold tabular-nums text-heading">
                  {rupiah(total)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Total */}
        <section className="mt-[4mm] flex justify-end">
          <div className="w-[86mm] rounded-[3mm] bg-[#0a72b4] px-[5mm] py-[3.5mm] text-white">
            <div className="flex items-center justify-between">
              <span className="text-[8.5pt] font-extrabold uppercase tracking-[0.2em] text-white/80">
                Total
              </span>
              <span className="text-[16pt] font-extrabold tabular-nums">
                {rupiah(total)}
              </span>
            </div>
          </div>
        </section>

        {/* Payment + bank */}
        <section className="mt-[7mm] grid grid-cols-2 gap-[6mm]">
          <div className="rounded-[3mm] border border-line bg-[#f7fafc] p-[5mm]">
            <p className="text-[7.5pt] font-extrabold uppercase tracking-[0.18em] text-primary">
              Rincian Pembayaran
            </p>
            <dl className="mt-[3.5mm] space-y-[2.4mm]">
              <div className="flex items-baseline justify-between gap-[3mm]">
                <dt className="text-[9pt] font-semibold text-muted">Total Tagihan</dt>
                <dd className="text-[9.5pt] font-extrabold tabular-nums text-heading">
                  {rupiah(total)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-[3mm]">
                <dt className="text-[9pt] font-semibold text-muted">DP / Dibayar</dt>
                <dd className="text-[9.5pt] font-extrabold tabular-nums text-heading">
                  {rupiah(d.downPayment)}
                </dd>
              </div>
              <div className="h-px bg-line" />
              <div className="flex items-baseline justify-between gap-[3mm]">
                <dt className="text-[9pt] font-extrabold uppercase tracking-[0.08em] text-heading">
                  Sisa Pembayaran
                </dt>
                <dd className="text-[12pt] font-extrabold tabular-nums text-primary">
                  {rupiah(remaining)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[3mm] border border-line bg-white p-[5mm]">
            <p className="text-[7.5pt] font-extrabold uppercase tracking-[0.18em] text-primary">
              Rekening Pembayaran
            </p>
            <div className="mt-[3.5mm] space-y-[2.4mm]">
              <div>
                <p className="text-[8pt] font-semibold text-muted">Bank</p>
                <p className="text-[9.5pt] font-extrabold text-heading">
                  {d.bankName || "-"}
                </p>
              </div>
              <div>
                <p className="text-[8pt] font-semibold text-muted">Nomor Rekening</p>
                <p className="font-mono text-[13pt] font-extrabold tracking-[0.06em] text-heading">
                  {d.bankAccount || "-"}
                </p>
              </div>
              <div>
                <p className="text-[8pt] font-semibold text-muted">Atas Nama</p>
                <p className="text-[9.5pt] font-extrabold text-heading">
                  {d.bankHolder || "-"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Note */}
        {d.note && (
          <section className="mt-[6mm] rounded-[3mm] border-l-[1.2mm] border-accent bg-[#eef5f9] px-[5mm] py-[3.5mm]">
            <p className="text-[7.5pt] font-extrabold uppercase tracking-[0.18em] text-primary">
              Catatan
            </p>
            <p className="mt-[1.8mm] text-[9.5pt] font-semibold leading-relaxed text-body-text">
              {d.note}
            </p>
          </section>
        )}

        {/* Signature */}
        <section className="mt-auto grid grid-cols-2 gap-[12mm] pt-[10mm]">
          <div className="text-center">
            <p className="text-[8.5pt] font-bold uppercase tracking-[0.12em] text-muted">
              Tanda Tangan Pelanggan
            </p>
            <div className="mt-[16mm] border-b border-dashed border-line" />
            <p className="mt-[1.5mm] text-[7.5pt] text-muted">{d.customerName || "-"}</p>
          </div>
          <div className="text-center">
            <p className="text-[8.5pt] font-bold uppercase tracking-[0.12em] text-muted">
              Hormat Kami
            </p>
            <p className="mt-[1.5mm] text-[10pt] font-extrabold text-heading">{SITE_NAME}</p>
            <div className="mt-[13mm] border-b border-dashed border-line" />
            <p className="mt-[1.5mm] text-[7.5pt] text-muted">{d.bankHolder || "-"}</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-[8mm] flex flex-wrap items-center justify-between gap-x-[6mm] gap-y-[1.5mm] border-t border-line pt-[3.5mm]">
          <p className="text-[7.5pt] font-semibold text-muted">
            {SITE_URL.replace(/^https?:\/\//, "")} &middot; {EMAIL_ADDRESS}
          </p>
          <p className="text-[7.5pt] font-semibold text-muted">{WHATSAPP_DISPLAY}</p>
        </footer>
      </div>
    </div>
  );
}
