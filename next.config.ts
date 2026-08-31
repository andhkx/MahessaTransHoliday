import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Single host: Vercel handles public site + admin dashboard.
  // Server runtime → middleware works for /admin/* protection.
  // Dynamic routes (app/admin/dashboard/armada/[id], etc.) are SSR.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
