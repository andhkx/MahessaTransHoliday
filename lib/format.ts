export function formatIDR(amount: number): string {
  return `Rp. ${amount.toLocaleString("id-ID")}`;
}

/** Versi compact untuk display: 650000 -> "Rp650rb", 1500000 -> "Rp1,5jt" */
export function formatCompact(amount: number): string {
  if (amount >= 1_000_000) {
    const jt = amount / 1_000_000;
    const text = Number.isInteger(jt) ? String(jt) : jt.toFixed(1).replace(".", ",");
    return `Rp${text}jt`;
  }
  return `Rp${amount / 1000}rb`;
}
