import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    minimumCacheTTL: 2678400,
    formats: ["image/webp"],
    qualities: [65],
    deviceSizes: [640, 828, 1200, 1920, 2560],
  },
};

export default nextConfig;
