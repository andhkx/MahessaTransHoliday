"use client";

import { useRef, useState } from "react";
import { Download, Loader2, TriangleAlert } from "lucide-react";
import ReceiptSheet from "./ReceiptSheet";
import { downloadReceiptPdf } from "@/lib/receipt-pdf";
import { describeReceiptError } from "@/lib/receipt";
import type { ReceiptFormData } from "@/lib/receipt";

/**
 * Tombol unduh PDF untuk kwitansi yang sudah tersimpan (dipakai di riwayat).
 * Sheet A4 dirender off-screen supaya bisa di-capture tanpa mengganggu layout.
 */
export default function ReceiptPdfButton({
  data,
  label = "Unduh PDF",
  className = "",
  onError,
}: {
  data: ReceiptFormData;
  label?: string;
  className?: string;
  onError?: (message: string) => void;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    const node = sheetRef.current;
    if (!node || busy) return;
    setBusy(true);
    setError(null);
    try {
      await downloadReceiptPdf(data, node);
      onError?.("");
    } catch (err: unknown) {
      const message = describeReceiptError(err);
      setError(message);
      onError?.(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* Wrapper di luar viewport: tidak menambah scroll, tidak mengubah layout,
          tapi tetap ter-render sehingga bisa di-capture ke PDF. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[-12000px] top-0 h-0 w-0 overflow-hidden"
      >
        <div ref={sheetRef}>
          <ReceiptSheet data={data} />
        </div>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={busy}
        className={className}
        title={
          error
            ? error
            : `Unduh sebagai Kwitansi-${data.receiptNumber.split("-").pop()}-MahessaTransHoliday.pdf`
        }
      >
        {busy ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
        {busy ? "Menyiapkan..." : label}
      </button>

      {error && (
        <p className="mt-1 flex items-start gap-1.5 text-[11px] font-semibold text-error">
          <TriangleAlert size={12} className="mt-0.5 shrink-0" />
          <span className="break-words">{error}</span>
        </p>
      )}
    </>
  );
}
