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

export default nextConfig;