import type { MetadataRoute } from "next";
import { abs } from "@/data/site";

/* Tout le site est ouvert aux moteurs de recherche et aux assistants IA, cités explicitement. */
const AI_AND_SEARCH = [
  "Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot", "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_AND_SEARCH, allow: "/" },
    ],
    sitemap: abs("/sitemap.xml"),
    host: abs("/").replace(/\/$/, ""),
  };
}
