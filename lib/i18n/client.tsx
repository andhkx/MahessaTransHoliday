"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { DEFAULT_LOCALE, getDict, format, LOCALE_COOKIE, type Locale } from "./dict";

export { format };

export const LOCALE_STORAGE_KEY = LOCALE_COOKIE;

type Ctx = { locale: Locale; setLocale: (l: Locale) => void };

const LocaleContext = createContext<Ctx>({ locale: DEFAULT_LOCALE, setLocale: () => {} });

export function LocaleProvider({ locale: initial, children }: { locale: Locale; children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initial);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
      if (stored && stored !== locale && (stored === "id" || stored === "en")) {
        setLocaleState(stored);
        document.cookie = `${LOCALE_COOKIE}=${stored}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
        document.documentElement.lang = stored === "en" ? "en" : "id";
      }
    } catch {}
  }, []); // ponytail: one-time hydration sync; no server writeback needed

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {}
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    document.documentElement.lang = next === "en" ? "en" : "id";
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "id";
  }, [locale]);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext).locale;
}

export function useSetLocale(): (l: Locale) => void {
  return useContext(LocaleContext).setLocale;
}

export function useT() {
  return getDict(useLocale());
}
