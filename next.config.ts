import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // page 404 commune aux trois layouts racine (accueil, pages françaises, pages arabes)
    globalNotFound: true,
  },
  images: {
    qualities: [75, 85],
  },
  async redirects() {
    return [
      // 301 : anciennes adresses et doublons du français, servi à la racine
      { source: "/index.html", destination: "/", statusCode: 301 },
      { source: "/fr", destination: "/", statusCode: 301 },
      { source: "/fr/:path*", destination: "/:path*", statusCode: 301 },
      { source: "/site.webmanifest", destination: "/manifest.webmanifest", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: "/:dir(images|videos)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
