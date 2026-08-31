import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = isVercel
  ? {
      // Vercel: default Next.js server build (supports dynamic routes, middleware, server components)
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "*.supabase.co",
          },
        ],
      },
    }
  : {
      // Cloudflare Pages: static export
      output: "export",
      images: {
        unoptimized: true,
      },
    };

/**
 * DEPLOYMENT STRATEGY (2 branch):
 * - main branch → Vercel (admin.mahessatransholiday.web.id)
 *   - Full Next.js server runtime
 *   - Middleware protection for /admin/*
 *   - app/admin/** accessible
 * - public branch → Cloudflare Pages (mahessatransholiday.web.id)
 *   - Static export (output: "export")
 *   - NO middleware (renamed to middleware.ts.disabled)
 *   - app/admin/ RENAMED to app/_admin_disabled/
 *   - Sync via GitHub Actions: main → public (auto on push)
 */
export default nextConfig;