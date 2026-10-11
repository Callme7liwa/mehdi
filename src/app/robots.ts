import type { MetadataRoute } from "next";
import { abs } from "@/data/site";

/* Tout le site est ouvert aux moteurs de recherche et aux assistants IA, cités explicitement. */
const AI_AND_SEARCH = [
  "Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot", "Applebot-Extended",
];

/** Déploiement d'aperçu Vercel (branche, pull request) : rien n'est indexable, et aucun sitemap n'est annoncé. */
const PREVIEW = process.env.VERCEL_ENV === "preview";

export default function robots(): MetadataRoute.Robots {
  if (PREVIEW) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_AND_SEARCH, allow: "/" },
    ],
    sitemap: abs("/sitemap.xml"),
    host: abs("/").replace(/\/$/, ""),
  };
}
