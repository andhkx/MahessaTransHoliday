import type { Metadata } from "next";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import KwitansiTabs from "@/components/admin/receipt/KwitansiTabs";
import ReceiptHistoryClient from "@/components/admin/receipt/ReceiptHistoryClient";

export const metadata: Metadata = {
  title: "Riwayat Kwitansi | Mahessa Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function RiwayatKwitansiPage() {
  return (
    <AdminDashboardLayout
      eyebrow="Dokumen"
      title="Riwayat Kwitansi"
      subtitle="Semua kwitansi yang pernah dibuat, lengkap dengan nomor, pelanggan, total, dan status pembayaran. PDF bisa diunduh ulang kapan saja dengan format Kwitansi-0001-MahessaTransHoliday.pdf."
      hideStats
    >
      <KwitansiTabs />
      <ReceiptHistoryClient />
    </AdminDashboardLayout>
  );
}
