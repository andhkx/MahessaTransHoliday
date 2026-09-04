import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllVehicles } from "@/lib/data/supabase/vehicles";
import { getAllPackages } from "@/lib/data/supabase/packages";
import { getAllArticles } from "@/lib/data/supabase/articles";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/armada`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/paket`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/galeri`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/kontak`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/temukan`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const [vehicles, packages, articles] = await Promise.all([
    getAllVehicles(),
    getAllPackages(),
    getAllArticles().catch(() => []),
  ]);

  const vehiclePages: MetadataRoute.Sitemap = vehicles.map((v) => ({
    url: `${SITE_URL}/armada/${v.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const packagePages: MetadataRoute.Sitemap = packages.map((p) => ({
    url: `${SITE_URL}/paket/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = articles
    .filter((a) => a.status === "published")
    .map((a) => ({
      url: `${SITE_URL}/artikel/${a.slug}`,
      lastModified: a.published_at ? new Date(a.published_at) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticPages, ...vehiclePages, ...packagePages, ...articlePages];
}

