/* Fiche produit (/soins/<soin> et /ar/soins/<soin>) : « le ticket qui s'écrit en direct ».
   Le HTML de toute la page est rendu par le serveur (titres, offre, étiquette, avis, questions, autres soins) ;
   le navigateur ajoute le ticket et les gestes. Textes de la fiche : src/data/product-pages.ts ; prix : src/data/products.ts. */
import { linkedin } from "@/data/google";
import type { Metadata } from "next";
import Img from "@/components/Img";
import CityList from "@/components/CityList";
import JsonLd from "@/components/JsonLd";
import Reassure from "@/components/Reassure";
import { productFaq } from "@/data/faq";
import { productPages, productUi } from "@/data/product-pages";
import { problems } from "@/data/problems";
import { problemsAr } from "@/data/problems.ar";
import { reviewName, reviewsFor } from "@/data/reviews";
import { products, unitFormats, hasBundle, type Product, productDescription, nameWithArticle } from "@/data/products";
import { abs, isReviewed, site, waLink, type Locale } from "@/data/site";
import { breadcrumbLd, faqLd, graph, localePath, orgLd, pageMetadata, productLd, webPageLd } from "@/lib/seo";
import { CartProvider, MoreCard, Offer, OpenButton, TotalLabel } from "./cart";
import { fill, type CartItem } from "./shared";
import { Arrow, PerkSvg, Spark, StepSvg, Wa } from "./icons";
import Ticket from "./Ticket";
import { uiFor } from "./ui";
import { Carousel, FaqList, Fx, Ingredients } from "./widgets";

const path = (p: Product) => `/soins/${p.slug}`;
const title = (p: Product, locale: Locale) => `${p.metaTitle[locale]} | OTAGE`;
/** Villes proposées en un geste dans le ticket (les autres s'écrivent). */
/** Numéros des chapitres : i., ii., iii. en français ; أ. ب. ج. en arabe. */
const CHAP = { fr: ["i.", "ii.", "iii.", "iv."], ar: ["أ.", "ب.", "ج.", "د."] };
const LOGO = { src: "/images/logo-otage.webp", w: 206, h: 96 };

export function productMetadata(p: Product, locale: Locale): Metadata {
  return pageMetadata({ locale, path: path(p), title: title(p, locale), description: productDescription(p, locale), image: p.photos[0] ?? p.hd ?? p.pack, hasAr: true });
}

const cartItem = (p: Product, locale: Locale): CartItem => {
  const img = p.hd ?? p.pack;
  return {
    key: p.key,
    no: p.no.replace(/\D/g, ""),
    name: p.name[locale],
    url: localePath(locale, path(p)),
    img: { src: img.src, w: img.w, h: img.h },
    wide: img.w / img.h > 0.6,
    formats: unitFormats(p).map((f) => ({ f, ml: p.ml[f] as number, price: p.unitPrice[f] as number })),
    bundle: hasBundle(p.key),
  };
};

export default function ProductView({ p, locale }: { p: Product; locale: Locale }) {
  const t = uiFor(locale), x = productPages[p.key], L = <T extends { fr: string; ar: string }>(v: T) => v[locale];
  const main = cartItem(p, locale);
  const others = products.filter((o) => o.key !== p.key).map((o) => cartItem(o, locale));
  const faqs = productFaq(p, locale);
  const url = abs(localePath(locale, path(p)));
  const crumbs = [{ name: locale === "ar" ? "الرئيسية" : "Accueil", path: "/" }, { name: locale === "ar" ? "المنتجات" : "Soins", path: "/soins" }, { name: p.name[locale], path: path(p) }];
  const fee = site.delivery.unitFee;
  const base = main.formats[0].price;
  const priceTag = main.bundle ? (p.key === "yeux" ? fill(t.threeFor, { p: base * 2 }) : fill(t.only, { p: base })) : fill(t.from, { p: base });
  const diff = main.formats.length > 1 ? main.formats[1].price - main.formats[0].price : 0;
  const unitWord = x.unitWord && { one: L(x.unitWord.one), many: L(x.unitWord.many) };
  const media = x.media === "photo" ? p.photos[0] : p.hd ?? p.pack;
  const label = p.key === "deo" ? p.photos[1] : p.hd ?? p.pack;
  const home = localePath(locale, "/");
  const pageReviews = reviewsFor(p.key);
  const pageNav = [["#etiquette", t.navIngredients], ...(x.use ? [["#mode-emploi", t.useChap]] : []), ...(pageReviews.length ? [["#avis", t.navReviews]] : []), ["#maison", t.navMore]];
  // numéros des chapitres : la section « Mode d'emploi » s'insère après l'étiquette
  const chap = (n: number) => CHAP[locale][n + (n > 0 && !x.use ? -1 : 0)];
  // maillage fiche → guides : le titre du guide sert d'ancre
  // (en arabe, seulement les guides qui ont une version arabe)
  const guides = p.problems.flatMap((slug) => (locale === "ar" ? problemsAr : problems).find((g) => g.slug === slug) ?? []).map((g) => ({ href: localePath(locale, `/${g.slug}`), label: g.h1 }));
  const named = nameWithArticle(p, locale), Named = named.charAt(0).toUpperCase() + named.slice(1);

  return (
    <>
      <JsonLd
        data={graph(
          orgLd(locale),
          webPageLd({ locale, path: path(p), title: title(p, locale), description: productDescription(p, locale), image: media, type: "ItemPage" }),
          breadcrumbLd(locale, crumbs),
          productLd(p, locale),
          faqLd(faqs, `${url}#faq`),
        )}
      />
      <a className="skip" href="#contenu">{locale === "ar" ? "الانتقال إلى المحتوى" : "Aller au contenu"}</a>
      <div className="intro" aria-hidden="true"><Img src={LOGO.src} alt="" width={LOGO.w} height={LOGO.h} style={{ filter: "brightness(0) invert(1)" }} loading="eager" sizes="120px" /></div>
      <div className="grain" aria-hidden="true"></div>
      <div className="cur" aria-hidden="true"><span></span></div>

      <header className="nav">
        <a className="nav-logo" href={home} aria-label={t.home}><Img src={LOGO.src} alt="otage" width={LOGO.w} height={LOGO.h} loading="eager" sizes="64px" /></a>
        <nav className="nav-links" aria-label={t.onPage}>
          {pageNav.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
      </header>

      <CartProvider main={main} others={others} locale={locale} t={t}>
        <main className="story" id="contenu">
          {/* 1. la photo, l'offre, les avantages */}
          <section className="hz" aria-labelledby="t-hero">
            <div className={`hz-media${x.media === "pack" ? " is-pack" : ""}`} data-cursor={t.order}>
              <Img className={x.media === "pack" ? "pack" : undefined} src={media.src} alt={L(x.mediaAlt)} width={media.w} height={media.h} sizes={x.media === "pack" ? "(max-width: 1020px) 40vw, 260px" : "(max-width: 1020px) 100vw, 50vw"} loading="eager" preload fetchPriority="high" />
              <span className="hz-tag mono">{t.madeIn}</span>
              <OpenButton className="badge" label={fill(t.orderFrom, { r: t.ring, p: base })} mag>
                <svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="ring" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" /></defs><text>{/* l'arabe garde ses lettres liées (pas d'étirement) et part de la fin du cercle, de droite à gauche */}<textPath href="#ring" {...(locale === "ar" ? { startOffset: "100%" } : { textLength: "249", lengthAdjust: "spacing" })}>{t.ring}</textPath></text></svg>
                <span><b>{base}</b> <small>{t.dh}</small></span>
              </OpenButton>
            </div>
            <div className="hz-info">
              <p className="mono hz-eye">{L(x.eyebrow)}</p>
              <h1 className="hero-title serif" id="t-hero"><span className="ln"><span>{L(x.title[0])}</span></span>{" "}<span className="ln"><span><em>{L(x.title[1])}</em></span></span></h1>
              <p className="hz-lede">{L(x.lede)}</p>
              <ul className="perks">
                {/* le bénéfice du soin, puis les 3 objections (livraison, paiement, retour) ; les actifs sont dans « L'étiquette » */}
                <li><PerkSvg name={x.perks[0].icon} /><span>{L(x.perks[0].label)}</span></li>
                <li className="perk-price"><PerkSvg name="price" /><span>{priceTag}</span></li>
              </ul>
              <Offer upsellFlag={x.upsell && fill(L(x.upsell.flag), { d: diff })} unitWord={unitWord} />
              <OpenButton className="cta-big" mag><TotalLabel tpl={t.orderTotal} /><i aria-hidden="true"><Arrow /></i></OpenButton>
              {/* sous le bouton : la ligne de réassurance (livraison, paiement, retour), puis les frais à l'unité, visibles avant toute validation */}
              <Reassure locale={locale} />
              <p className="hz-trust"><span>{fill(t.hzFee, { a: fee.min, b: fee.max })}</span></p>
            </div>
          </section>

          {/* 2. l'étiquette */}
          <section className="lab" id="etiquette" aria-labelledby="t-lab">
            <div className="pad">
              <div className="chap mono"><b>{chap(0)}</b>{t.labChap}</div>
              <h2 className="h2" id="t-lab">{L(x.lab.title[0])} <em>{L(x.lab.title[1])}</em></h2>
              <Ingredients
                photo={<Img src={label.src} alt={L(x.lab.alt)} width={label.w} height={label.h} sizes="(max-width: 1020px) 100vw, 45vw" />}
                spots={x.lab.spots?.map((s) => ({ x: s.x, y: s.y, tip: L(s.tip) }))}
                items={x.lab.ingredients.map((g, i) => ({ n: `0${i + 1}`, name: L(g.name), where: L(g.where), role: L(g.role), why: g.why && L(g.why) }))}
              />
              {/* tant que la relecture des rôles par le pharmacien n'est pas confirmée pour ce soin (labReviewed), on ne l'annonce pas */}
              {isReviewed(x.labReviewed) && <div className="lab-note mono">{t.labNote}</div>}
            </div>
          </section>

          {/* 3. mode d'emploi : un seul titre (H2), puis 3 cartes. Les questions complètes restent en H3 (moteurs) ;
              les surtitres « Pour qui · Comment · Résultats » sont visuels seulement. */}
          {x.use && (
            <section className="use" id="mode-emploi" aria-labelledby="t-use">
              <div className="chap mono"><b>{chap(1)}</b>{t.useChap}</div>
              <h2 className="use-h" id="t-use">{fill(t.useTitle, { x: Named })}</h2>
              <div className="use-g">
                <div className="use-c use-who">
                  <p className="use-k" aria-hidden="true">{t.useKWho}</p>
                  <h3 className="use-t">{fill(t.forWhoQ, { x: Named })}</h3>
                  <p className="use-p">{L(x.use.forWho)}</p>
                  {guides.length > 0 && (
                    <div className="use-gd">
                      <p className="use-gk">{t.guides}</p>
                      <ul className="use-links">{guides.map((g) => <li key={g.href}><a href={g.href}><span>{g.label}</span><i aria-hidden="true">{locale === "ar" ? "←" : "→"}</i></a></li>)}</ul>
                    </div>
                  )}
                </div>
                <div className="use-c use-how">
                  <p className="use-k" aria-hidden="true">{t.useKHow}</p>
                  <h3 className="use-t">{fill(t.howQ, { x: named })}</h3>
                  <ol className="use-steps">
                    {x.use.steps.map((st, i) => (
                      <li key={st.fr}><span className="st-ic"><StepSvg name={x.use!.icons[i]} /></span><span className="st-x"><span className="st-n">{String(i + 1).padStart(2, "0")}</span><span className="st-t">{L(st)}</span></span></li>
                    ))}
                  </ol>
                </div>
                <div className="use-c use-res">
                  <p className="use-k" aria-hidden="true">{t.useKRes}</p>
                  <h3 className="use-t">{fill(t.resultsQ, { x: named })}</h3>
                  <ol className="use-tl">
                    {x.use.timeline.map((e) => <li key={e.when.fr}><span className="tl-w">{L(e.when)}</span><span className="tl-t">{L(e.what)}</span></li>)}
                  </ol>
                </div>
              </div>
            </section>
          )}

          {/* 4. les avis : seulement les messages réels qui nomment ce soin (src/data/reviews.ts, champ « produits ») */}
          {pageReviews.length > 0 && (
            <section className="revs" id="avis" aria-labelledby="t-avis">
              <Carousel headClass="av-head" trackClass="rv-g" label={t.reviewsTrack} prev={t.prev} next={t.next}
                title={<h2 className="av-t serif" id="t-avis"><em>{t.reviews}</em><sup className="av-n">{pageReviews.length}</sup></h2>}>
                {pageReviews.map((r, i) => {
                  const said = r.messages.filter((m) => m.de === "cliente"), rtl = said.some((m) => m.rtl);
                  // traduction : seulement si le message n'est pas déjà dans la langue de la page
                  const tr = rtl && locale === "ar" ? undefined : (r.traductionCliente ?? r.traduction)?.[locale];
                  return (
                    <article key={r.prenom} className={`rvw rv${i === 0 ? " rvw-big" : ""}`}>
                      <header className="rvw-h"><span className="src src-ig">{locale === "ar" ? "إنستغرام" : "Instagram"}</span><span className="rvw-w"><b>{reviewName(r, locale)}</b><small>{fill(t.reviewMeta, { d: r.date?.[locale] ?? "" })}</small></span></header>
                      {r.intitule && <p className="rvw-ctx">{r.intitule[locale]}</p>}
                      <blockquote className="q-dar" lang={rtl ? "ar" : "fr"} dir={rtl ? "rtl" : "ltr"}>{said.map((m, k) => <span key={k} style={{ display: "block" }}>{m.texte}</span>)}</blockquote>
                      {tr && <p className="q-fr q-tr">{tr}</p>}
                      <p className="q-fr" style={{ fontStyle: "normal", fontSize: 12 }}>{t.reviewNote} <a href={localePath(locale, "/avis")}>{t.reviewSource}</a></p>
                    </article>
                  );
                })}
              </Carousel>
              <OpenButton className="cta-big cta-line"><TotalLabel tpl={t.tryTotal} /><i aria-hidden="true"><Arrow /></i></OpenButton>
            </section>
          )}

          {/* 4. les questions : titre sobre, carte « Une autre question ? » (WhatsApp prérempli avec le nom du soin),
              accordéon exclusif. Le JSON-LD FAQPage est construit à partir des mêmes questions (faqs). */}
          <section className="faq" id="faq" aria-labelledby="t-faq">
            <div className="faq-side">
              <div className="chap mono"><b>{chap(2)}</b>{t.faqChap}</div>
              <h2 className="faq-h" id="t-faq">{fill(t.faqH, { x: named })}</h2>
            </div>
            <FaqList items={faqs} />
            <aside className="faq-help" aria-label={t.faqHelpT}>
              <p className="faq-help-t">{t.faqHelpT}</p>
              <p className="faq-help-p">{fill(t.faqHelpP, { d: site.availability[locale] })}</p>
              <a className="faq-wa" href={waLink(fill(t.faqHelpMsg, { x: named }))} target="_blank" rel="noopener"><Wa />{t.faqHelpBtn}</a>
            </aside>
          </section>

          {/* 5. le reste de la maison */}
          <section className="maison" id="maison" aria-labelledby="t-maison">
            <div className="chap mono"><b>{chap(3)}</b>{t.moreChap}</div>
            <Carousel headClass="revs-top" trackClass="ms-g" label={t.moreTrack} prev={t.prev} next={t.next}
              title={<h2 className="h2" id="t-maison">{t.moreTitle} <em>{t.moreTitleEm}</em></h2>}
              note={<p className="revs-note">{t.moreNote}</p>}>
              {others.map((it) => <MoreCard key={it.key} it={it} />)}
            </Carousel>
          </section>

          <div className="band" aria-hidden="true"><div className="band-in">
            {[0, 1].map((k) => (
              <span key={k}><span>{L(productUi.band[0])}</span><span className="ar" style={{ fontSize: ".8em" }}>ما كنبيعوش الوهم</span><span>{L(productUi.band[1])}</span><span><Spark /></span></span>
            ))}
          </div></div>

          <footer className="foot">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}><Img src={LOGO.src} alt="otage" width={LOGO.w} height={LOGO.h} style={{ height: 30, width: "auto" }} sizes="64px" /><span>{t.footTag}</span></div>
            <nav aria-label="OTAGE">
              <a href={`${localePath(locale, "/livraison-paiement")}#retours`}>{t.footReturns}</a>
              <a href={localePath(locale, "/soins")}>{t.footAdvice}</a>
              <a href={localePath(locale, "/cgv")}>{t.footCgv}</a>
              <a href={`${localePath(locale, "/mentions-legales")}#cookies`} data-cookies="">{t.footCookies}</a>
              <a href={`https://wa.me/${site.whatsapp.wa}`} target="_blank" rel="noopener">WhatsApp</a>
              <a href={site.instagram.url} target="_blank" rel="me noopener">{locale === "ar" ? "إنستغرام" : "Instagram"}</a>
              <a href={linkedin} target="_blank" rel="me noopener"><span dir="ltr" lang="en">LinkedIn</span></a>
            </nav>
          </footer>
        </main>

        <Ticket
          fee={fee}
          wa={site.whatsapp.wa}
          links={{ cgv: localePath(locale, "/cgv"), returns: `${localePath(locale, "/livraison-paiement")}#retours` }}
          upsell={x.upsell && fill(L(x.upsell.nudge), { d: diff })}
          unitWord={unitWord}
          thumb={{ src: p.pack.src, w: p.pack.w, h: p.pack.h }}
          logo={LOGO}
        />
        {/* villes du champ « Ville » du ticket : rendues ici, côté serveur (hors du JavaScript du ticket) */}
        <CityList id="f-villes" locale={locale} />
        <Fx />
      </CartProvider>
    </>
  );
}
