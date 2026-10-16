import type { MetadataRoute } from "next";
import { abs, site } from "@/data/site";
import { contentUpdated } from "@/data/updated";
import { localePath } from "@/lib/seo";
import { routes } from "@/lib/routes";

/** Toutes les pages indexables, avec leurs images. Les pages arabes s'ajoutent quand site.arIndexable passe à true.
    lastmod : date de la dernière modification du contenu de la page (src/data/updated.ts), pas la date du build. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.VERCEL_ENV === "preview") return []; // déploiement d'aperçu : aucun sitemap
  const out: MetadataRoute.Sitemap = [];
  for (const r of routes.filter((x) => x.indexed)) {
    const lastModified = contentUpdated[r.path] ?? site.updated;
    const withAr = r.hasAr && site.arIndexable;
    const languages = withAr ? { "fr-MA": abs(r.path), "ar-MA": abs(localePath("ar", r.path)), "x-default": abs(r.path) } : undefined;
    out.push({ url: abs(r.path), lastModified, changeFrequency: "monthly", priority: r.priority, images: r.images, ...(languages ? { alternates: { languages } } : {}) });
    if (withAr) out.push({ url: abs(localePath("ar", r.path)), lastModified, changeFrequency: "monthly", priority: r.priority * 0.9, images: r.images, alternates: { languages } });
  }
  return out;
}
