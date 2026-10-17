import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { formatDate, type Locale } from "@/data/site";
import { pageUpdated } from "@/data/updated";
import { ui } from "@/data/ui";
import { breadcrumbLd, graph, orgLd, pageMetadata, webPageLd } from "@/lib/seo";

type Info = { path: string; title: string; description: string; h1: string; label: string; schemaType?: string; /** Page encore incomplète (TODO juridiques) : hors de l'index. */ draft?: boolean };

export function textMetadata(i: Info, locale: Locale = "fr"): Metadata {
  const m = pageMetadata({ locale, path: i.path, title: i.title, description: i.description, hasAr: true });
  return i.draft ? { ...m, robots: { index: false, follow: true } } : m;
}

/** Information encore manquante, bien visible pour ne pas l'oublier avant la mise en ligne. */
export const Todo = ({ children, locale = "fr" }: { children: React.ReactNode; locale?: Locale }) => <span className="todo">{ui[locale].todo}{locale === "ar" ? ": " : " : "}{children}</span>;

/** Gabarit des pages de texte (à propos, livraison, contact, mentions légales, CGV). */
export default function TextPage({ info, lead, children, extraLd = [], locale = "fr" }: { info: Info; lead?: string; children: React.ReactNode; extraLd?: object[]; locale?: Locale }) {
  const t = ui[locale];
  const crumbs = [{ name: t.home, path: "/" }, { name: info.label, path: info.path }];
  return (
    <>
      <JsonLd data={graph(orgLd(locale), webPageLd({ locale, path: info.path, title: info.title, description: info.description, type: info.schemaType }), breadcrumbLd(locale, crumbs), ...extraLd)} />
      <Breadcrumbs locale={locale} items={crumbs} />
      <main id="contenu" className="wrap">
        <header className="page-head">
          <h1>{info.h1}</h1>
          {lead && <p className="lead">{lead}</p>}
        </header>
        <div className="prose">
          {children}
          <p className="updated">{t.updated} <time dateTime={pageUpdated(info.path)}>{formatDate(pageUpdated(info.path), locale)}</time>.</p>
        </div>
      </main>
    </>
  );
}
