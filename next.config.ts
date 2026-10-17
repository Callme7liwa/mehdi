import type { NextConfig } from "next";
import { frezabioRedirects } from "./src/data/redirects-frezabio";

/** Environnement Vercel : "production" (otage.ma), "preview" (branche, pull request) ou rien (en local). */
const ENV = process.env.VERCEL_ENV;
const DOMAIN = "otage.ma";

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
      // la page « taches pigmentaires » devient le pilier « taches brunes du visage » (docs/carte-thematique.md)
      { source: "/taches-pigmentaires", destination: "/taches-brunes-visage", statusCode: 301 },
      // son ancienne version arabe : le pilier n'a pas encore de version arabe (redirection temporaire,
      // à faire pointer vers /ar/taches-brunes-visage quand elle existera)
      { source: "/ar/taches-pigmentaires", destination: "/taches-brunes-visage", statusCode: 302 },
      // un seul domaine : www.otage.ma → otage.ma
      { source: "/:path*", has: [{ type: "host", value: `www.${DOMAIN}` }], destination: `https://${DOMAIN}/:path*`, statusCode: 301 },
      // en production, toute adresse *.vercel.app (otage-maroc.vercel.app compris) renvoie vers otage.ma.
      // Les déploiements d'aperçu ne sont pas redirigés : ils restent consultables, en noindex (voir headers).
      ...(ENV === "production"
        ? [{ source: "/:path*", has: [{ type: "host" as const, value: "(?<sub>.+)\\.vercel\\.app" }], destination: `https://${DOMAIN}/:path*`, statusCode: 301 as const }]
        : []),
      // ancien domaine frezabio.com : prêt, activé seulement avec FREZABIO_REDIRECT=1 (voir src/data/redirects-frezabio.ts)
      ...(process.env.FREZABIO_REDIRECT === "1" ? frezabioRedirects(DOMAIN) : []),
    ];
  },
  async headers() {
    return [
      // déploiements d'aperçu : jamais dans les moteurs de recherche
      ...(ENV === "preview" ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }] : []),
      {
        // polices : le nom du fichier porte sa version (-v1), on peut donc les garder un an
        source: "/fonts/:path*",
        // Access-Control-Allow-Origin : les messageries qui chargent les polices du site dans les e-mails l'exigent
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }, { key: "Access-Control-Allow-Origin", value: "*" }],
      },
      {
        source: "/:dir(images|videos)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
