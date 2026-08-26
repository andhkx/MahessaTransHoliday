import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 pt-16">
      <div className="text-center">
        <p className="text-h1 font-extrabold text-primary">404</p>
        <h1 className="mt-4 text-h4 font-bold text-black">
          Halaman tidak ditemukan
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-body-text">
          Halaman yang kamu cari mungkin sudah dipindah atau tidak pernah ada.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn btn-primary btn-md bg-primary shadow-none hover:bg-primary-mid"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/armada"
            className="btn btn-secondary btn-md"
          >
            Lihat Armada
          </Link>
        </div>
      </div>
    </section>
  );
}
