export function formatIDR(amount: number): string {
  return `Rp${amount.toLocaleString("id-ID")}`;
}

/** Versi pendek untuk kartu: 350000 -> "Rp350rb", 12750000 -> "Rp12,75jt" */
export function formatShort(amount: number): string {
  if (amount >= 1_000_000) {
    const jt = amount / 1_000_000;
    const text = Number.isInteger(jt) ? String(jt) : jt.toFixed(2).replace(/0$/, "");
    return `Rp${text.replace(".", ",")}jt`;
  }
  return `Rp${amount / 1000}rb`;
}
