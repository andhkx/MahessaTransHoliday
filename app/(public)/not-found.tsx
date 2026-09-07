import Link from "next/link";
import { getLocale, getDict } from "@/lib/i18n/server";

export default async function NotFound() {
  const locale = await getLocale();
  const t = getDict(locale);
  const isEn = locale === "en";

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 pt-16">
      <div className="text-center">
        <p className="text-h1 font-extrabold text-primary">404</p>
        <h1 className="mt-4 text-h4 font-bold text-black">
          {t.common.notFoundTitle}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-body-text">
          {isEn ? t.common.notFoundHint : t.common.notFoundDesc}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn btn-primary btn-md"
          >
            {t.common.backHome}
          </Link>
          <Link
            href="/armada"
            className="btn btn-secondary btn-md"
          >
            {t.common.seeFleet}
          </Link>
        </div>
      </div>
    </section>
  );
}
