import type { Metadata } from "next";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import ReceiptFormClient from "@/components/admin/receipt/ReceiptFormClient";

export const metadata: Metadata = {
  title: "Kwitansi | Mahessa Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function KwitansiPage() {
  return (
    <AdminDashboardLayout
      eyebrow="Dokumen"
      title="Kwitansi Sewa Mobil"
      subtitle="Isi data di kiri, pratinjau A4 di kanan. Nomor kwitansi dibuat otomatis dan berurutan setiap kali disimpan, lalu bisa dicetak atau disimpan sebagai PDF."
      hideStats
    >
      <ReceiptFormClient />
    </AdminDashboardLayout>
  );
}
