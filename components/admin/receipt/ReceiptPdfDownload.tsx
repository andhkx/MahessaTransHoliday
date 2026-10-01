"use client";

import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import ReceiptSheet from "./ReceiptSheet";
import { downloadReceiptPdf } from "@/lib/receipt-pdf";
import { describeReceiptError, receiptFileName, type ReceiptFormData } from "@/lib/receipt";

function waitForNode(get: () => HTMLElement | null, timeout = 2000): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      const node = get();
      if (node) return resolve(node);
      if (Date.now() - start > timeout) {
        return reject(new Error("Gagal menyiapkan dokumen untuk diunduh."));
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/**
 * Tombol unduh PDF. Sheet A4 hanya dirender saat sedang mengunduh lalu dilepas
 * kembali — jadi tidak ada dokumen A4 berat yang tertahan di DOM.
 */
export default function ReceiptPdfDownload({
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
  const [mounted, setMounted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    setMounted(true);
    try {
      const node = await waitForNode(() => sheetRef.current);
      await downloadReceiptPdf(data, node);
      onError?.("");
    } catch (err: unknown) {
      const message = describeReceiptError(err);
      setError(message);
      onError?.(message);
    } finally {
      setMounted(false);
      setBusy(false);
    }
  };

  return (
    <>
      {mounted && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-[-12000px] top-0 h-0 w-0 overflow-hidden"
        >
          <div ref={sheetRef}>
            <ReceiptSheet data={data} />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleClick}
        disabled={busy}
        className={className}
        title={`Unduh ${receiptFileName(data)}`}
      >
        {busy ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
        {busy ? "Menyiapkan..." : label}
      </button>

      {error && <p className="sr-only" role="alert">{error}</p>}
    </>
  );
}
