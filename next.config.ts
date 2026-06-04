import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "s7d1.scene7.com" },
      { protocol: "https", hostname: "www.kyndryl.com" },
    ],
  },
};

export default nextConfig;
