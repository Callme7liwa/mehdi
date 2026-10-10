import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { formatDate, site } from "@/data/site";
import { breadcrumbLd, graph, orgLd, pageMetadata, webPageLd } from "@/lib/seo";

type Info = { path: string; title: string; description: string; h1: string; label: string; schemaType?: string; /** Page encore incomplète (TODO juridiques) : hors de l'index. */ draft?: boolean };

export function textMetadata(i: Info): Metadata {
  const m = pageMetadata({ locale: "fr", path: i.path, title: i.title, description: i.description });
  return i.draft ? { ...m, robots: { index: false, follow: true } } : m;
}

/** Information encore manquante, bien visible pour ne pas l'oublier avant la mise en ligne. */
export const Todo = ({ children }: { children: React.ReactNode }) => <span className="todo">À compléter : {children}</span>;

/** Gabarit des pages de texte (à propos, livraison, contact, mentions légales, CGV). */
export default function TextPage({ info, lead, children, extraLd = [] }: { info: Info; lead?: string; children: React.ReactNode; extraLd?: object[] }) {
  const crumbs = [{ name: "Accueil", path: "/" }, { name: info.label, path: info.path }];
  return (
    <>
      <JsonLd data={graph(orgLd(), webPageLd({ locale: "fr", path: info.path, title: info.title, description: info.description, type: info.schemaType }), breadcrumbLd("fr", crumbs), ...extraLd)} />
      <Breadcrumbs locale="fr" items={crumbs} />
      <main id="contenu" className="wrap">
        <header className="page-head">
          <h1>{info.h1}</h1>
          {lead && <p className="lead">{lead}</p>}
        </header>
        <div className="prose">
          {children}
          <p className="updated">Mis à jour le <time dateTime={site.updated}>{formatDate(site.updated, "fr")}</time>.</p>
        </div>
      </main>
    </>
  );
}
