import { SITE_URL } from "@/lib/constants";

export function hreflang(path: string) {
  const url = `${SITE_URL}${path}`;
  return {
    canonical: path,
    languages: {
      id: url,
      en: url,
      "x-default": url,
    },
  };
}
