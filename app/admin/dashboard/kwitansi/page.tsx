import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import type { Metadata } from "next";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import KwitansiTabs from "@/components/admin/receipt/KwitansiTabs";
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
      subtitle="Isi data kwitansi, lalu lihat pratinjau A4 dalam popup atau langsung unduh sebagai PDF dengan nama Kwitansi-0001-MahessaTransHoliday.pdf. Nomor dibuat otomatis dan tidak pernah dipakai ulang."
      hideStats
    >
      <KwitansiTabs />
      <Suspense
        fallback={
          <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-line bg-white py-20 text-sm font-bold text-muted shadow-card">
            <Loader2 size={18} className="animate-spin" /> Menyiapkan form...
          </div>
        }
      >
        <ReceiptFormClient />
      </Suspense>
    </AdminDashboardLayout>
  );
}
