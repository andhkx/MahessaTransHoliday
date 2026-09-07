import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale } from "./dict";

export { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale, getDict, format } from "./dict";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "id" || value === "en";
}

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
