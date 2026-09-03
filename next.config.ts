import type { NextConfig } from "next";

const supabaseHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "").hostname;
  } catch {
    return "*.supabase.co";
  }
})();

const nextConfig: NextConfig = {
  // Cache headers for Supabase images (immutable, public bucket)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  images: {
    // Re-enable optimization to enable format negotiation + responsive sizes
    unoptimized: false,
    remotePatterns: [
      { protocol: "https", hostname: supabaseHost },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
    // Supabase storage CDN cache (1 year for immutable file names)
    minimumCacheTTL: 60 * 60 * 24 * 365,
    formats: ["image/avif", "image/webp"],
  },
  // Compress JS bundles
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? false : false,
  },
  // Allow Vercel Image Optimization to compress Supabase images
  experimental: {
    optimizePackageImports: ["lucide-react", "motion/react"],
  },
};

export default nextConfig;