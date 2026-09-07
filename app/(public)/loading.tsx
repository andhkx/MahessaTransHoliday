import { getLocale, getDict } from "@/lib/i18n/server";

export default async function PublicLoading() {
  const locale = await getLocale();
  const t = getDict(locale);
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-accent border-t-transparent" />
        <p className="text-muted text-sm">{t.common.loadingPage}</p>
      </div>
    </div>
  );
}
