"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Printer, X } from "lucide-react";
import ReceiptSheet from "./ReceiptSheet";
import ReceiptPdfDownload from "./ReceiptPdfDownload";
import { receiptFileName, type ReceiptFormData } from "@/lib/receipt";

const SHEET_PX = 794;

/**
 * Popup pratinjau A4. Sheet diperkecil otomatis supaya muat di layar
 * (HP maupun desktop) tanpa scroll horizontal.
 */
export default function ReceiptPreviewModal({
  data,
  onClose,
  footer,
}: {
  data: ReceiptFormData | null;
  onClose: () => void;
  footer?: React.ReactNode;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!data) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let observer: ResizeObserver | null = null;
    const update = () => {
      const width = bodyRef.current?.clientWidth ?? SHEET_PX;
      setScale(Math.min(1, width / SHEET_PX));
    };
    const raf = requestAnimationFrame(() => {
      update();
      if (bodyRef.current) {
        observer = new ResizeObserver(update);
        observer.observe(bodyRef.current);
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/65 p-3 backdrop-blur-sm sm:p-6">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative my-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-white shadow-elevated">
        <header className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <FileText size={17} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-xs font-extrabold text-accent">
              {data.receiptNumber || "Belum disimpan"}
            </p>
            <p className="truncate text-[11px] font-semibold text-muted">
              {receiptFileName(data)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line text-muted transition hover:bg-surface hover:text-heading"
            aria-label="Tutup pratinjau"
          >
            <X size={17} />
          </button>
        </header>

        <div
          ref={bodyRef}
          className="max-h-[70vh] w-full min-w-0 overflow-hidden bg-surface/40 p-3 sm:p-5"
        >
          <div
            className="relative mx-auto"
            style={{ width: SHEET_PX * scale, height: 1123 * scale }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: SHEET_PX,
              }}
            >
              <ReceiptSheet data={data} />
            </div>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-line px-4 py-3 sm:px-5">
          {footer}
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-extrabold text-heading transition hover:bg-surface"
          >
            <Printer size={15} /> Cetak
          </button>
          <ReceiptPdfDownload
            data={data}
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] transition hover:bg-accent-hover"
          />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-bold text-heading transition hover:bg-surface"
          >
            Tutup
          </button>
        </footer>
      </div>
    </div>
  );
}
