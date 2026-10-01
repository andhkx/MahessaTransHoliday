import { toJpeg } from "html-to-image";
import { receiptFileName, type ReceiptFormData } from "@/lib/receipt";

/** Ukuran A4 dalam CSS pixel (96dpi): 210mm x 297mm */
export const A4_PX = { width: 794, height: 1123 };
/** Rasio resolusi cetak ~240 DPI supaya teks tetap tajam di PDF */
const PIXEL_RATIO = 2.5;
/** A4 dalam poin (72dpi) */
const PAGE_W = 595.28;
const PAGE_H = 841.89;

function dataUrlToBytes(dataUrl: string): Uint8Array {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/**
 * Susun PDF satu halaman berisi satu gambar JPEG (DCTDecode).
 * PDF minimal ini dibuat manual supaya tidak perlu library PDF besar.
 */
function buildSinglePagePdf(jpeg: Uint8Array, widthPx: number, heightPx: number): Uint8Array {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [];
  let cursor = 0;

  const push = (part: Uint8Array | string) => {
    const bytes = typeof part === "string" ? encoder.encode(part) : part;
    chunks.push(bytes);
    cursor += bytes.length;
  };
  const openObject = (id: number) => {
    offsets[id] = cursor;
    push(`${id} 0 obj\n`);
  };

  push("%PDF-1.4\n");
  openObject(1);
  push("<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  openObject(2);
  push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
  openObject(3);
  push(
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
      `/Resources << /XObject << /Im0 4 0 R >> /ProcSet [/PDF /ImageC] >> ` +
      `/Contents 5 0 R >>\nendobj\n`,
  );

  openObject(4);
  push(
    `<< /Type /XObject /Subtype /Image /Width ${widthPx} /Height ${heightPx} ` +
      `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode ` +
      `/Length ${jpeg.length} >>\nstream\n`,
  );
  push(jpeg);
  push("\nendstream\nendobj\n");

  const content = `q\n${PAGE_W.toFixed(2)} 0 0 ${PAGE_H.toFixed(2)} 0 0 cm\n/Im0 Do\nQ\n`;
  openObject(5);
  push(`<< /Length ${encoder.encode(content).length} >>\nstream\n${content}endstream\nendobj\n`);

  const xrefStart = cursor;
  let xref = "xref\n0 6\n0000000000 65535 f \n";
  for (let id = 1; id <= 5; id += 1) {
    xref += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  }
  push(xref);
  push(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`);

  const pdf = new Uint8Array(cursor);
  let position = 0;
  for (const chunk of chunks) {
    pdf.set(chunk, position);
    position += chunk.length;
  }
  return pdf;
}

export async function receiptToJpeg(node: HTMLElement): Promise<{
  bytes: Uint8Array;
  width: number;
  height: number;
}> {
  // Font web harus siap dulu, kalau tidak teks akan jatuh ke font fallback.
  if (document.fonts?.ready) {
    await document.fonts.ready.catch(() => undefined);
  }

  const dataUrl = await toJpeg(node, {
    backgroundColor: "#ffffff",
    quality: 0.96,
    width: A4_PX.width,
    height: A4_PX.height,
    pixelRatio: PIXEL_RATIO,
    cacheBust: false,
  });

  return {
    bytes: dataUrlToBytes(dataUrl),
    width: Math.round(A4_PX.width * PIXEL_RATIO),
    height: Math.round(A4_PX.height * PIXEL_RATIO),
  };
}

/**
 * Rasterisasi elemen kwitansi A4 lalu unduh sebagai PDF satu halaman.
 * Menghasilkan file yang persis sama dengan pratinjau.
 */
export async function downloadReceiptPdf(
  data: ReceiptFormData,
  node: HTMLElement,
): Promise<string> {
  const { bytes, width, height } = await receiptToJpeg(node);
  const pdf = buildSinglePagePdf(bytes, width, height);
  const fileName = receiptFileName(data);

  const blob = new Blob([pdf as unknown as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  } finally {
    // Beri waktu browser mulai mengunduh sebelum URL dicabut
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  return fileName;
}
