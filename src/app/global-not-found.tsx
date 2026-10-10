import type { Metadata } from "next";
import "./site.css";
import "./rtl.css";
import { fontVars } from "./fonts";
import { arabic } from "./fonts-ar";
import { BagIcon } from "@/components/icons";
import { products } from "@/data/products";
import { ui } from "@/data/ui";
import type { Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

export const metadata: Metadata = { title: "Page introuvable | الصفحة غير موجودة | OTAGE", description: "Cette page n'existe pas ou a été déplacée. هذه الصفحة غير موجودة." };

/* La page 404 est commune à tout le site et générée une seule fois : elle contient les deux langues.
   Avant l'affichage, ce script garde celle qui correspond à l'adresse (/ar… → arabe, de droite à gauche). */
const pick = `(function(){var ar=/^\\/ar(\\/|$)/.test(location.pathname),h=document.documentElement;h.lang=ar?"ar":"fr";h.dir=ar?"rtl":"ltr";var s=document.createElement("style");s.textContent="[data-nf="+(ar?"fr":"ar")+"]{display:none!important}";document.head.appendChild(s)})()`;

function Block({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const home = localePath(locale, "/");
  return (
    <div data-nf={locale} lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <header className="top">
        <div className="top-in">
          <a className="top-logo" href={home} aria-label={`OTAGE, ${t.home}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- page 404 : image simple, sans optimisation */}
            <img src="/images/logo-otage.webp" alt="OTAGE" width={206} height={96} />
          </a>
          <a className="btn btn-dark btn-sm top-cta" href={`${home}#offres`}>{t.order}<BagIcon /></a>
        </div>
      </header>
      <main className="nf">
        <p className="big" aria-hidden="true" dir="ltr">404</p>
        <h1>{t.notFoundTitle}</h1>
        <p className="lead">{t.notFoundText}</p>
        <div className="btns" style={{ justifyContent: "center" }}>
          <a className="btn btn-primary" href={home}>{t.backHome}</a>
          <a className="btn btn-ghost" href={localePath(locale, "/soins")}>{t.allProducts}</a>
        </div>
        <ul className="chips" style={{ justifyContent: "center" }}>
          {products.map((p) => <li key={p.slug}><a href={localePath(locale, `/soins/${p.slug}`)}>{p.name[locale]}</a></li>)}
        </ul>
      </main>
    </div>
  );
}

/** Page 404 commune à tout le site, en français ou en arabe selon l'adresse. */
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${fontVars} ${arabic.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: pick }} />
        <Block locale="fr" />
        <Block locale="ar" />
      </body>
    </html>
  );
}
