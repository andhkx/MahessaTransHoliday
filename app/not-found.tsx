import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 pt-16">
      <div className="text-center">
        <p className="text-7xl font-extrabold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-extrabold text-ink sm:text-3xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-600">
          Halaman yang kamu cari mungkin sudah dipindah atau tidak pernah ada.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/armada"
            className="rounded-full border-2 border-primary px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Lihat Armada
          </Link>
        </div>
      </div>
    </section>
  );
}
