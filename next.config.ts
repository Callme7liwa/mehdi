import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // page 404 commune aux trois layouts racine (accueil, pages françaises, pages arabes)
    globalNotFound: true,
  },
  images: {
    qualities: [75, 85],
    // AVIF pour les navigateurs qui le lisent, WebP pour les autres
    formats: ["image/avif", "image/webp"],
    // une image optimisée garde la même adresse tant que son fichier ne change pas de nom : cache d'un an
    minimumCacheTTL: 31536000,
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
        // polices : le nom du fichier porte sa version (-v1), on peut donc les garder un an
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:dir(images|videos)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
