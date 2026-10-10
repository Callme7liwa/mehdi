import Link from "next/link";
import type { Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

export type Crumb = { name: string; path: string };

/** Fil d'Ariane visible ; le JSON-LD BreadcrumbList est construit avec la même liste. */
export default function Breadcrumbs({ locale, items }: { locale: Locale; items: Crumb[] }) {
  return (
    <nav className="crumbs wrap" aria-label={locale === "ar" ? "مسار التصفح" : "Fil d'Ariane"}>
      <ol>
        {items.map((it, i) =>
          i === items.length - 1 ? (
            <li key={it.path} aria-current="page">{it.name}</li>
          ) : it.path === "/" ? (
            <li key={it.path}><a href={localePath(locale, "/")}>{it.name}</a></li>
          ) : (
            <li key={it.path}><Link prefetch={false} href={localePath(locale, it.path)}>{it.name}</Link></li>
          ),
        )}
      </ol>
    </nav>
  );
}
