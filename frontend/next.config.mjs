/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ["localhost", "payla.az"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  eslint: {
    // Production'da ESLint hatalarını görmezden gelmek için
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Production build'leri sırasında tip hatalarını görmezden gelmek için
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
