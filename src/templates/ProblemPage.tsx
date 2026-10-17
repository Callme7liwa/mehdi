import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import FaqList from "@/components/FaqList";
import GuideFigure from "@/components/GuideFigure";
import JsonLd from "@/components/JsonLd";
import { BagIcon, WaIcon } from "@/components/icons";
import { isIndexed, pageStatus, problems, type Block, type ProblemPage as Problem } from "@/data/problems";
import { bundleTotal, gamme, lowestPrice, productByKey, yeuxPrice } from "@/data/products";
import { abs, formatDate, reviewers, waLink, type Locale } from "@/data/site";
import { reviewerLd } from "@/lib/seo";
import { arUpToDate, problemsAr } from "@/data/problems.ar";
import { pageUpdated } from "@/data/updated";
import { ui } from "@/data/ui";
import { articleLd, breadcrumbLd, faqLd, graph, localePath, orgLd, pageMetadata, webPageLd } from "@/lib/seo";

/** Espace insécable avant : ? ! (typographie française), pour qu'ils ne passent pas seuls à la ligne. */
const nbsp = (t: string) => t.replace(/ ([:?!])/g, "\u00a0$1");

/** Les pages conseils dans une langue (mêmes adresses, sous /ar pour l'arabe). */
export const problemsFor = (locale: Locale) => (locale === "ar" ? problemsAr : problems);

/** Page approuvée (reviewed) ou publiée par l'équipe (editorial) : indexée ; sinon hors de l'index. */
export const problemMetadata = (p: Problem, locale: Locale): Metadata => {
  const m = pageMetadata({ locale, path: `/${p.slug}`, title: p.metaTitle, description: p.metaDescription, image: p.image, type: "article", hasAr: arUpToDate(p.slug) });
  return isIndexed(p) ? m : { ...m, robots: { index: false, follow: true } };
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

/** Un bloc de texte : paragraphe, liste à puces, étapes numérotées, cases à cocher ou tableau. */
function BlockView({ b, locale }: { b: Block; locale: Locale }) {
  if (typeof b === "string") return <p><Rich text={b} locale={locale} /></p>;
  if ("steps" in b) return <ol>{b.steps.map((li) => <li key={li}><Rich text={li} locale={locale} /></li>)}</ol>;
  if ("figure" in b) return <GuideFigure name={b.figure} />;
  if ("checklist" in b) return <ul className="checklist">{b.checklist.map((li) => <li key={li}><Rich text={li} locale={locale} /></li>)}</ul>;
  if ("table" in b)
    return (
      <div className="table-wrap">
        <table>
          <thead><tr>{b.table.head.map((h, i) => <th key={i} scope="col"><Rich text={h} locale={locale} /></th>)}</tr></thead>
          <tbody>{b.table.rows.map((r, i) => <tr key={i}>{r.map((c, k) => (k === 0 ? <th key={k} scope="row"><Rich text={c} locale={locale} /></th> : <td key={k} data-label={b.table.head[k]}><Rich text={c} locale={locale} /></td>))}</tr>)}</tbody>
        </table>
      </div>
    );
  return <ul>{b.list.map((li) => <li key={li}><Rich text={li} locale={locale} /></li>)}</ul>;
}

/** Ancre d'un titre : « Quels signes doivent m'alerter ? » → « quels-signes-doivent-m-alerter ». */
const anchor = (title: string) => title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Nombre de mots du contenu d'une page (texte enrichi compris), pour décider d'afficher le sommaire. */
function words(p: Problem) {
  const text = (b: Block): string => (typeof b === "string" ? b : "figure" in b ? "" : "table" in b ? [...b.table.head, ...b.table.rows.flat()].join(" ") : ("steps" in b ? b.steps : "checklist" in b ? b.checklist : b.list).join(" "));
  const all = [...p.intro, ...(p.essentials ?? []), ...p.sections.flatMap((s) => [s.h2, ...s.body.map(text)]), ...(typeof p.advice === "string" ? [p.advice] : p.advice.map(text)),
    ...(p.maroc ?? []).map(text), ...(p.solution?.body ?? []).map(text), ...p.faq.flatMap((f) => [f.q, ...f.a])].join(" ");
  return all.replace(/\[\d+\]|\]\([^)]*\)/g, " ").split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length;
}
/** Au-delà de ce nombre de mots, la page affiche un sommaire en tête. */
const TOC_FROM = 800;

/** Encadré titré (L'essentiel, Au Maroc, Notre solution). */
function Box({ title, blocks, locale, className = "" }: { title: string; blocks: Block[]; locale: Locale; className?: string }) {
  return (
    <aside className={`note note-blocks box ${className}`}>
      <p className="box-t">{title}</p>
      {blocks.map((b, i) => <BlockView key={i} b={b} locale={locale} />)}
    </aside>
  );
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
  const status = pageStatus(p);
  const review = status === "reviewed" ? p.reviewed! : null;
  // date de la dernière modification du contenu de cette page (src/data/updated.ts), la même que dans le pied de page
  const updated = pageUpdated(path);
  const reviewer = review && reviewers[review.by];
  // sommaire (pages longues) : les questions de la page, l'encadré « quand consulter », la FAQ et les sources
  const hasAdvice = typeof p.advice === "string" || p.advice.length > 0;
  const toc = words(p) > TOC_FROM
    ? [...p.sections.map((s) => ({ id: anchor(s.h2), title: s.h2 })), ...(hasAdvice && p.adviceTitle ? [{ id: anchor(p.adviceTitle), title: p.adviceTitle }] : []), { id: "faq-t", title: t.faq }, ...(p.sources?.length ? [{ id: "sources-t", title: t.sources }] : [])]
    : [];
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
            {p.essentials?.length ? <Box title={t.essentials} blocks={[{ list: p.essentials }]} locale={locale} className="essentials" /> : null}
            {p.intro.map((t) => <p className="lead" key={t}><Rich text={t} locale={locale} /></p>)}
            <p className="updated">{t.updated} <time dateTime={updated}>{formatDate(updated, locale)}</time>{ar ? "، " : ", "}{t.byTeam}.</p>
            {/* affiché seulement quand la relecture de cette page est confirmée (p.reviewed) */}
            {/* page publiée par l'équipe, pas encore approuvée (p.editorial) */}
            {status === "editorial" && <p className="updated reviewed">{t.editorialNote}</p>}
            {review && reviewer && <p className="updated reviewed">{t.reviewedBy} {ar ? reviewer.nameAr : reviewer.name}{ar ? "، " : ", "}{reviewer.jobTitle[locale].toLowerCase()}{ar ? "، " : ", "}<time dateTime={review.date}>{formatDate(review.date, locale)}</time>.</p>}
          </header>

          {toc.length > 0 && (
            <nav className="toc" aria-labelledby="toc-t">
              <p className="toc-t" id="toc-t">{t.toc}</p>
              <ol>{toc.map((x) => <li key={x.id}><a href={`#${x.id}`}>{x.title}</a></li>)}</ol>
            </nav>
          )}

          <div className="prose">
            {p.sections.map((s) => (
              <section key={s.h2} style={{ display: "grid", gap: 14 }}>
                {s.part && <h2 className="part">{nbsp(s.part)}</h2>}
                {parts ? <h3 id={anchor(s.h2)}>{nbsp(s.h2)}</h3> : <h2 id={anchor(s.h2)}>{nbsp(s.h2)}</h2>}
                {s.body.map((b, i) => <BlockView key={i} b={b} locale={locale} />)}
              </section>
            ))}
            {p.maroc?.length ? <Box title={t.inMorocco} blocks={p.maroc} locale={locale} className="maroc" /> : null}
            {!hasAdvice ? null : p.adviceTitle ? (
              <section style={{ display: "grid", gap: 14 }}>
                <h2 id={anchor(p.adviceTitle)}>{nbsp(p.adviceTitle)}</h2>
                {typeof p.advice === "string" ? <p className="note">{p.advice}</p> : <div className="note note-blocks">{p.advice.map((b, i) => <BlockView key={i} b={b} locale={locale} />)}</div>}
              </section>
            ) : (
              typeof p.advice === "string" ? <p className="note"><b>{t.askPro}</b> {p.advice}</p> : <div className="note note-blocks"><p><b>{t.askPro}</b></p>{p.advice.map((b, i) => <BlockView key={i} b={b} locale={locale} />)}</div>
            )}
            {p.solution ? <Box title={p.solution.title} blocks={p.solution.body} locale={locale} className="solution" /> : null}
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

        {!p.noSale && <section className="sec">
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
        </section>}

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
