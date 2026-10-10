import type { Metadata } from "next";
import "./site.css";
import { fontVars } from "./fonts";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { products } from "@/data/products";
import { ui } from "@/data/ui";

export const metadata: Metadata = { title: "Page introuvable | OTAGE", description: "Cette page n'existe pas ou a été déplacée." };

/** Page 404 commune à tout le site. */
export default function GlobalNotFound() {
  const t = ui.fr;
  return (
    <html lang="fr" className={fontVars}>
      <body>
        <SiteHeader locale="fr" />
        <main id="contenu" className="nf">
          <p className="big" aria-hidden="true">404</p>
          <h1>{t.notFoundTitle}</h1>
          <p className="lead">{t.notFoundText}</p>
          <div className="btns" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="/">{t.backHome}</a>
            <a className="btn btn-ghost" href="/soins">{t.allProducts}</a>
          </div>
          <ul className="chips" style={{ justifyContent: "center" }}>
            {products.map((p) => <li key={p.slug}><a href={`/soins/${p.slug}`}>{p.name.fr}</a></li>)}
          </ul>
        </main>
        <SiteFooter locale="fr" />
      </body>
    </html>
  );
}
