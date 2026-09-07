import { NextResponse } from "next/server";
import { isLocale, LOCALE_COOKIE } from "@/lib/i18n/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const lang = body?.lang;
  if (!isLocale(lang)) {
    return NextResponse.json({ ok: false, error: "invalid locale" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true, lang });
  res.cookies.set(LOCALE_COOKIE, lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}
