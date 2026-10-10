import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import FaqList from "@/components/FaqList";
import Img from "@/components/Img";
import JsonLd from "@/components/JsonLd";
import { BagIcon, WaIcon } from "@/components/icons";
import { problems, type ProblemPage as Problem } from "@/data/problems";
import { bundleUnit, gamme, productByKey, rangeProducts, yeuxPrice } from "@/data/products";
import { abs, formatDate, site, waLink } from "@/data/site";
import { articleLd, breadcrumbLd, faqLd, graph, orgLd, pageMetadata, webPageLd } from "@/lib/seo";

/** Espace insécable avant : ? ! (typographie française), pour qu'ils ne passent pas seuls à la ligne. */
const nbsp = (t: string) => t.replace(/ ([:?!])/g, "\u00a0$1");

export const problemMetadata = (p: Problem): Metadata =>
  pageMetadata({ locale: "fr", path: `/${p.slug}`, title: p.metaTitle, description: p.metaDescription, image: p.image, type: "article" });

/** Page « problème de peau » : causes, conseils, routine, soins OTAGE adaptés, FAQ. */
export default function ProblemPage({ p }: { p: Problem }) {
  const path = `/${p.slug}`;
  const crumbs: Crumb[] = [{ name: "Accueil", path: "/" }, { name: p.label, path }];
  const yeux = p.products.every((x) => x.key === "yeux");
  const P = gamme.formats.petit;
  return (
    <>
      <JsonLd
        data={graph(
          orgLd(),
          webPageLd({ locale: "fr", path, title: p.metaTitle, description: p.metaDescription, image: p.image }),
          breadcrumbLd("fr", crumbs),
          articleLd({ path, title: p.h1, description: p.metaDescription, image: p.image }),
          faqLd(p.faq, `${abs(path)}#faq`),
        )}
      />
      <Breadcrumbs locale="fr" items={crumbs} />
      <main id="contenu" className="wrap">
        <article>
          <header className="page-head">
            <p className="kicker">Conseils peau</p>
            <h1>{nbsp(p.h1)}</h1>
            {p.intro.map((t) => <p className="lead" key={t}>{t}</p>)}
            <p className="updated">Mis à jour le <time dateTime={site.updated}>{formatDate(site.updated, "fr")}</time>, par l'équipe OTAGE.</p>
          </header>

          <div className="prose">
            {p.sections.map((s) => (
              <section key={s.h2} style={{ display: "grid", gap: 14 }}>
                <h2>{nbsp(s.h2)}</h2>
                {s.body.map((b, i) => (typeof b === "string" ? <p key={i}>{b}</p> : <ul key={i}>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>))}
              </section>
            ))}
            <p className="note"><b>Demande l'avis d'un professionnel.</b> {p.advice}</p>
          </div>
        </article>

        <section className="sec" aria-labelledby="soins-adaptes" style={{ marginTop: "clamp(36px, 6vw, 72px)" }}>
          <div className="sec-head">
            <h2 id="soins-adaptes">{p.productsTitle}</h2>
            <p className="lead">{p.productsIntro}</p>
          </div>
          <div className={`grid ${p.products.length > 3 ? "c4" : p.products.length > 1 ? "c3" : "c2"}`}>
            {p.products.map(({ key, why }) => {
              const x = productByKey(key);
              return (
                <Link className="pcard" key={key} href={`/soins/${x.slug}`}>
                  <div className="pcard-pic">
                    <Img src={x.pack.src} alt={x.pack.alt.fr} width={x.pack.w} height={x.pack.h} />
                    <span className="num">{x.no}</span>
                  </div>
                  <div className="pcard-body">
                    <h3>{x.name.fr}</h3>
                    <p>{why}</p>
                    <p>{x.ingredients.map((i) => i.fr).join(", ")}.</p>
                    <span className="pcard-more">Voir le soin<span aria-hidden="true"> →</span></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {p.routine && (
          <section className="sec" aria-labelledby="routine">
            <div className="sec-head">
              <h2 id="routine">La routine, étape par étape</h2>
              <p>Le matin : les 4 étapes. Le soir : les 3 premières, sans écran solaire.</p>
            </div>
            <ol className="steps">
              {rangeProducts.map((x) => (
                <li key={x.key}>
                  <div>
                    <Link href={`/soins/${x.slug}`}>{x.name.fr}</Link>
                    <br /><span>{x.how.fr}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="sec">
          <div className="band">
            <h2>{yeux ? "Le sérum contour des yeux" : "La gamme anti-taches complète"}</h2>
            <p>
              {yeux
                ? `${yeuxPrice} DH, ou ${bundleUnit(yeuxPrice)} DH le sérum avec l'offre 2 + 1. `
                : `Les 4 soins dès ${P.price} DH au lieu de ${P.was} DH, ou ${bundleUnit(P.price)} DH la gamme avec l'offre 2 + 1. `}
              Livraison offerte partout au Maroc en {site.delivery.label.fr}, paiement à la livraison.
            </p>
            <div className="btns">
              <a className="btn btn-primary" href={yeux ? "/?produit=yeux#offres" : "/#offres"}>Voir l'offre<BagIcon /></a>
              <a className="btn btn-ghost" href={waLink(`Bonjour OTAGE, j'ai une question sur : ${p.label.toLowerCase()}.`)} target="_blank" rel="noopener">Poser une question sur WhatsApp<WaIcon /></a>
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="faq-t">
          <div className="sec-head"><h2 id="faq-t">Questions fréquentes</h2></div>
          <FaqList items={p.faq} />
        </section>

        <section className="sec" aria-labelledby="autres">
          <div className="sec-head"><h2 id="autres">Autres conseils peau</h2></div>
          <ul className="chips">
            {problems.filter((x) => x.slug !== p.slug).map((x) => <li key={x.slug}><Link href={`/${x.slug}`}>{x.label}</Link></li>)}
          </ul>
        </section>
      </main>
    </>
  );
}
