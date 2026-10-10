import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import FaqList from "@/components/FaqList";
import Img from "@/components/Img";
import JsonLd from "@/components/JsonLd";
import { BagIcon, WaIcon } from "@/components/icons";
import { problems, type ProblemPage as Problem } from "@/data/problems";
import { bundleUnit, gamme, productByKey, rangeProducts, yeuxPrice } from "@/data/products";
import { abs, formatDate, site, waLink, type Locale } from "@/data/site";
import { problemsAr } from "@/data/problems.ar";
import { ui } from "@/data/ui";
import { articleLd, breadcrumbLd, faqLd, graph, localePath, orgLd, pageMetadata, webPageLd } from "@/lib/seo";

/** Espace insécable avant : ? ! (typographie française), pour qu'ils ne passent pas seuls à la ligne. */
const nbsp = (t: string) => t.replace(/ ([:?!])/g, "\u00a0$1");

/** Les pages conseils dans une langue (mêmes adresses, sous /ar pour l'arabe). */
export const problemsFor = (locale: Locale) => (locale === "ar" ? problemsAr : problems);

export const problemMetadata = (p: Problem, locale: Locale): Metadata =>
  pageMetadata({ locale, path: `/${p.slug}`, title: p.metaTitle, description: p.metaDescription, image: p.image, type: "article", hasAr: true });

/** Page « problème de peau » : causes, conseils, routine, soins OTAGE adaptés, FAQ. */
export default function ProblemPage({ p, locale }: { p: Problem; locale: Locale }) {
  const t = ui[locale];
  const ar = locale === "ar";
  const path = `/${p.slug}`;
  const crumbs: Crumb[] = [{ name: t.home, path: "/" }, { name: p.label, path }];
  const yeux = p.products.every((x) => x.key === "yeux");
  const P = gamme.formats.petit;
  return (
    <>
      <JsonLd
        data={graph(
          orgLd(locale),
          webPageLd({ locale, path, title: p.metaTitle, description: p.metaDescription, image: p.image }),
          breadcrumbLd(locale, crumbs),
          articleLd({ locale, path, title: p.h1, description: p.metaDescription, image: p.image }),
          faqLd(p.faq, `${abs(localePath(locale, path))}#faq`),
        )}
      />
      <Breadcrumbs locale={locale} items={crumbs} />
      <main id="contenu" className="wrap">
        <article>
          <header className="page-head">
            <p className="kicker">{t.advice}</p>
            <h1>{nbsp(p.h1)}</h1>
            {p.intro.map((t) => <p className="lead" key={t}>{t}</p>)}
            <p className="updated">{t.updated} <time dateTime={site.updated}>{formatDate(site.updated, locale)}</time>{ar ? "، " : ", "}{t.byTeam}.</p>
          </header>

          <div className="prose">
            {p.sections.map((s) => (
              <section key={s.h2} style={{ display: "grid", gap: 14 }}>
                <h2>{nbsp(s.h2)}</h2>
                {s.body.map((b, i) => (typeof b === "string" ? <p key={i}>{b}</p> : <ul key={i}>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>))}
              </section>
            ))}
            <p className="note"><b>{t.askPro}</b> {p.advice}</p>
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
                <Link className="pcard" key={key} href={localePath(locale, `/soins/${x.slug}`)}>
                  <div className="pcard-pic">
                    <Img src={x.pack.src} alt={x.pack.alt[locale]} width={x.pack.w} height={x.pack.h} />
                    <span className="num" dir="ltr">{x.no}</span>
                  </div>
                  <div className="pcard-body">
                    <h3>{x.name[locale]}</h3>
                    <p>{why}</p>
                    <p>{x.ingredients.map((i) => i[locale]).join(ar ? "، " : ", ")}</p>
                    <span className="pcard-more">{t.seeProduct}<span aria-hidden="true"> {ar ? "←" : "→"}</span></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {p.routine && (
          <section className="sec" aria-labelledby="routine">
            <div className="sec-head">
              <h2 id="routine">{t.routineSteps}</h2>
              <p>{t.routineSummary}</p>
            </div>
            <ol className="steps">
              {rangeProducts.map((x) => (
                <li key={x.key}>
                  <div>
                    <Link href={localePath(locale, `/soins/${x.slug}`)}>{x.name[locale]}</Link>
                    <br /><span>{x.how[locale]}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="sec">
          <div className="band">
            <h2>{yeux ? t.bandYeux : t.bandRange}</h2>
            <p>
              {yeux
                ? ar
                  ? `${yeuxPrice} درهم، أو ${bundleUnit(yeuxPrice)} درهم للسيروم مع عرض 2 + 1. `
                  : `${yeuxPrice} DH, ou ${bundleUnit(yeuxPrice)} DH le sérum avec l'offre 2 + 1. `
                : ar
                  ? `المنتجات الأربعة ابتداءً من ${P.price} درهم بدل ${P.was} درهم، أو ${bundleUnit(P.price)} درهم للمجموعة مع عرض 2 + 1. `
                  : `Les 4 soins dès ${P.price} DH au lieu de ${P.was} DH, ou ${bundleUnit(P.price)} DH la gamme avec l'offre 2 + 1. `}
              {ar ? `توصيل مجاني في كل أنحاء المغرب خلال ${site.delivery.label.ar}، والدفع عند الاستلام.` : `Livraison offerte partout au Maroc en ${site.delivery.label.fr}, paiement à la livraison.`}
            </p>
            <div className="btns">
              <a className="btn btn-primary" href={`${localePath(locale, "/")}${yeux ? "?produit=yeux" : ""}#offres`}>{t.seeOffer}<BagIcon /></a>
              <a className="btn btn-ghost" href={waLink(ar ? `مرحبًا OTAGE، لدي سؤال عن: ${p.label}.` : `Bonjour OTAGE, j'ai une question sur : ${p.label.toLowerCase()}.`)} target="_blank" rel="noopener">{t.askWhatsApp}<WaIcon /></a>
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="faq-t">
          <div className="sec-head"><h2 id="faq-t">{t.faq}</h2></div>
          <FaqList items={p.faq} />
        </section>

        <section className="sec" aria-labelledby="autres">
          <div className="sec-head"><h2 id="autres">{t.otherAdvice}</h2></div>
          <ul className="chips">
            {problemsFor(locale).filter((x) => x.slug !== p.slug).map((x) => <li key={x.slug}><Link href={localePath(locale, `/${x.slug}`)}>{x.label}</Link></li>)}
          </ul>
        </section>
      </main>
    </>
  );
}
