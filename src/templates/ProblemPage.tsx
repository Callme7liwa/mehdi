import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { BagIcon, WaIcon } from "@/components/icons";
import { problems, type Block, type ProblemPage as Problem } from "@/data/problems";
import { bundleTotal, gamme, lowestPrice, productByKey, yeuxPrice } from "@/data/products";
import { abs, formatDate, isReviewed, reviewers, site, waLink, type Locale } from "@/data/site";
import { reviewerLd } from "@/lib/seo";
import { hasArProblem, problemsAr } from "@/data/problems.ar";
import { contentUpdated } from "@/data/updated";
import { ui } from "@/data/ui";
import { articleLd, breadcrumbLd, faqLd, graph, localePath, orgLd, pageMetadata, webPageLd } from "@/lib/seo";

/** Espace insécable avant : ? ! (typographie française), pour qu'ils ne passent pas seuls à la ligne. */
const nbsp = (t: string) => t.replace(/ ([:?!])/g, "\u00a0$1");

/** Les pages conseils dans une langue (mêmes adresses, sous /ar pour l'arabe). */
export const problemsFor = (locale: Locale) => (locale === "ar" ? problemsAr : problems);

/** Relecture du pharmacien confirmée pour cette page (p.reviewed) : sinon elle reste hors de l'index. */
export const problemMetadata = (p: Problem, locale: Locale): Metadata => {
  const m = pageMetadata({ locale, path: `/${p.slug}`, title: p.metaTitle, description: p.metaDescription, image: p.image, type: "article", hasAr: hasArProblem(p.slug) });
  return isReviewed(p.reviewed) ? m : { ...m, robots: { index: false, follow: true } };
};

/** Texte enrichi des pages conseils : [libellé](/chemin) = lien interne, **gras**, [n] = renvoi vers la source n. */
function Rich({ text, locale }: { text: string; locale: Locale }) {
  return text.split(/(\[[^\]]+\]\(\/[^)]*\)|\*\*[^*]+\*\*|\[\d+\])/).map((s, i) => {
    const link = s.match(/^\[([^\]]+)\]\((\/[^)]*)\)$/);
    if (link) return <Link key={i} href={localePath(locale, link[2])}>{link[1]}</Link>;
    if (/^\*\*[^*]+\*\*$/.test(s)) return <b key={i}>{s.slice(2, -2)}</b>;
    const cite = s.match(/^\[(\d+)\]$/);
    if (cite) return <sup key={i} className="cite"><a href={`#source-${cite[1]}`} aria-label={`${locale === "ar" ? "المصدر" : "Source"} ${cite[1]}`}>[{cite[1]}]</a></sup>;
    return s;
  });
}

/** Un bloc de texte : paragraphe, liste à puces ou étapes numérotées. */
function BlockView({ b, locale }: { b: Block; locale: Locale }) {
  if (typeof b === "string") return <p><Rich text={b} locale={locale} /></p>;
  if ("steps" in b) return <ol>{b.steps.map((li) => <li key={li}><Rich text={li} locale={locale} /></li>)}</ol>;
  return <ul>{b.list.map((li) => <li key={li}><Rich text={li} locale={locale} /></li>)}</ul>;
}

/** Page « problème de peau » : causes, conseils, routine, soins OTAGE adaptés, FAQ, sources. */
export default function ProblemPage({ p, locale }: { p: Problem; locale: Locale }) {
  const t = ui[locale];
  const ar = locale === "ar";
  const path = `/${p.slug}`;
  const crumbs: Crumb[] = [{ name: t.home, path: "/" }, { name: p.label, path }];
  const yeux = p.products.length > 0 && p.products.every((x) => x.key === "yeux");
  const parts = p.sections.some((s) => s.part);
  const P = gamme.formats.petit;
  const review = isReviewed(p.reviewed) ? p.reviewed : null;
  // date de la dernière modification du contenu de cette page (src/data/updated.ts), sinon celle du site
  const updated = contentUpdated[path]?.slice(0, 10) ?? site.updated;
  const reviewer = review && reviewers[review.by];
  return (
    <>
      <JsonLd
        data={graph(
          orgLd(locale),
          { ...webPageLd({ locale, path, title: p.metaTitle, description: p.metaDescription, image: p.image }), ...(review ? { reviewedBy: reviewerLd(locale, review.by), lastReviewed: review.date } : {}) },
          breadcrumbLd(locale, crumbs),
          articleLd({ locale, path, title: p.h1, description: p.metaDescription, image: p.image, published: p.published, modified: updated }),
          faqLd(p.faq, `${abs(localePath(locale, path))}#faq`),
        )}
      />
      <Breadcrumbs locale={locale} items={crumbs} />
      <main id="contenu" className="wrap">
        <article>
          <header className="page-head">
            <p className="kicker">{t.advice}</p>
            <h1>{nbsp(p.h1)}</h1>
            {p.intro.map((t) => <p className="lead" key={t}><Rich text={t} locale={locale} /></p>)}
            <p className="updated">{t.updated} <time dateTime={updated}>{formatDate(updated, locale)}</time>{ar ? "، " : ", "}{t.byTeam}.</p>
            {/* affiché seulement quand la relecture de cette page est confirmée (p.reviewed) */}
            {review && reviewer && <p className="updated reviewed">{t.reviewedBy} {ar ? reviewer.nameAr : reviewer.name}{ar ? "، " : ", "}{reviewer.jobTitle[locale].toLowerCase()}{ar ? "، " : ", "}<time dateTime={review.date}>{formatDate(review.date, locale)}</time>.</p>}
          </header>

          <div className="prose">
            {p.sections.map((s) => (
              <section key={s.h2} style={{ display: "grid", gap: 14 }}>
                {s.part && <h2 className="part">{nbsp(s.part)}</h2>}
                {parts ? <h3>{nbsp(s.h2)}</h3> : <h2>{nbsp(s.h2)}</h2>}
                {s.body.map((b, i) => <BlockView key={i} b={b} locale={locale} />)}
              </section>
            ))}
            {p.adviceTitle ? (
              <section style={{ display: "grid", gap: 14 }}>
                <h2>{nbsp(p.adviceTitle)}</h2>
                {typeof p.advice === "string" ? <p className="note">{p.advice}</p> : <div className="note note-blocks">{p.advice.map((b, i) => <BlockView key={i} b={b} locale={locale} />)}</div>}
              </section>
            ) : (
              typeof p.advice === "string" ? <p className="note"><b>{t.askPro}</b> {p.advice}</p> : <div className="note note-blocks"><p><b>{t.askPro}</b></p>{p.advice.map((b, i) => <BlockView key={i} b={b} locale={locale} />)}</div>
            )}
          </div>
        </article>

        {/* les soins : un lien nommé vers chaque fiche, et le geste (routine) ou ce qu'il apporte ;
            la routine n'est décrite qu'ici (elle était répétée dans 3 sections) */}
        {p.products.length > 0 && <section className="sec" aria-labelledby="soins-adaptes" style={{ marginTop: "clamp(36px, 6vw, 72px)" }}>
          <div className="sec-head">
            <h2 id="soins-adaptes">{nbsp(p.productsTitle)}</h2>
            {p.productsIntro && <p className="lead">{p.productsIntro}</p>}
          </div>
          {(() => {
            const items = p.products.map(({ key, why }) => {
              const x = productByKey(key);
              return (
                <li key={key}>
                  <div>
                    <Link href={localePath(locale, `/soins/${x.slug}`)}>{x.name[locale]}</Link>
                    {!p.routine && <span dir="ltr"> · {lowestPrice(x)} {ar ? "درهم" : "DH"}</span>}
                    <br /><span>{why}</span>
                  </div>
                </li>
              );
            });
            return p.routine ? <ol className="steps">{items}</ol> : <ul className="steps">{items}</ul>;
          })()}
        </section>}

        <section className="sec">
          <div className="band">
            <h2>{yeux ? t.bandYeux : t.bandRange}</h2>
            <p>
              {yeux
                ? ar ? `${yeuxPrice} درهم، أو 3 بـ ${bundleTotal(yeuxPrice)} درهم مع عرض 2 + 1.` : `${yeuxPrice} DH, ou 3 pour ${bundleTotal(yeuxPrice)} DH avec l'offre 2 + 1.`
                : ar ? `المنتجات الأربعة ابتداءً من ${P.price} درهم، والتوصيل مجاني.` : `Les 4 soins dès ${P.price} DH, livraison offerte.`}
            </p>
            <div className="btns">
              <a className="btn btn-primary" href={`${localePath(locale, "/")}${yeux ? "?produit=yeux" : ""}#offres`}>{t.seeOffer} · {yeux ? "" : `${t.from} `}{yeux ? yeuxPrice : P.price} {t.dh}<BagIcon /></a>
              <a className="btn btn-ghost" href={waLink(ar ? `مرحبًا OTAGE، لدي سؤال عن: ${p.label}.` : `Bonjour OTAGE, j'ai une question sur : ${p.label.toLowerCase()}.`)} target="_blank" rel="noopener">{t.askWhatsApp}<WaIcon /></a>
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="faq-t">
          <div className="sec-head"><h2 id="faq-t">{t.faq}</h2></div>
          <FaqList items={p.faq} />
        </section>

        {p.sources?.length ? (
          <section className="sec" aria-labelledby="sources-t">
            <div className="sec-head"><h2 id="sources-t">{t.sources}</h2></div>
            <ol className="sources">
              {p.sources.map((x, i) => <li key={x.url} id={`source-${i + 1}`}>{x.label} <a href={x.url} target="_blank" rel="noopener" dir="ltr">{x.url.replace(/^https?:\/\/(www\.)?/, "")}</a></li>)}
            </ol>
          </section>
        ) : null}

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
