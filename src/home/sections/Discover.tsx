import type { HomeText } from "../text";
import Img from "@/components/Img";
import { bundleUnit, productByKey, products, yeuxPrice, type Product } from "@/data/products";
import type { Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

const rangeCards = products.filter((p) => p.range === "taches");
const yeux = productByKey("yeux");
const deo = productByKey("deo");
const deoPrice = deo.unitPrice.petit as number;
const lowerFirst = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
/** Le sérum contour des yeux a deux fiches : le produit, puis « Sur la peau » (2e phrase de sa présentation). */
const split = (t: string) => t.split(/(?<=\.)\s+/);

function Card({ p, locale }: { p: Product; locale: Locale }) {
  const taches = p.range === "taches";
  const ar = locale === "ar";
  const ml = ar ? "مل" : "ml";
  return (
    <article className="pc" id={p.homeAnchor}>
      <div className="pc-pic"><Img src={p.pack.src} alt={p.pack.alt[locale]} width={p.pack.w} height={p.pack.h} /><span className="pc-no" dir="ltr">{p.no}</span><span className="pc-when">{p.when[locale]}</span></div>
      <div className="pc-body">
        <h3>{p.name[locale]}<span className="pc-size">{p.ml.grand ?? p.ml.petit} {ml}</span></h3>
        <p>{taches ? p.lead[locale] : split(p.lead[locale])[0]}</p>
        <ul>{p.ingredients.map((i) => <li key={i.fr}>{i[locale]}</li>)}</ul>
        <p className="pc-how"><b>{ar ? "الطريقة:" : "Comment :"}</b> {ar ? p.how.ar : lowerFirst(p.how.fr)}</p>
        <a className="pc-link" href={localePath(locale, `/soins/${p.slug}`)}>{ar ? "صفحة المنتج الكاملة" : "Voir la fiche complète"}<span aria-hidden="true"> {ar ? "←" : "→"}</span></a>
      </div>
    </article>
  );
}

function YeuxSkin({ locale }: { locale: Locale }) {
  const photo = yeux.photos[0];
  return (
    <article className="pc" id="contour-des-yeux-sur-la-peau">
      <div className="pc-pic full"><Img src={photo.src} alt={photo.alt[locale]} width={photo.w} height={photo.h} /><span className="pc-no" dir="ltr">{yeux.no}</span></div>
      <div className="pc-body"><h3>{locale === "ar" ? "على البشرة" : "Sur la peau"}</h3><p>{split(yeux.lead[locale])[1]}</p></div>
    </article>
  );
}

export default function Discover({ t, locale }: { t: HomeText; locale: Locale }) {
  return (
    <section className="dgx" id="decouvrir" aria-label={t.discoverDecouvrirLesSoins} style={{ "--bag-dg": "url('/images/gamme-anti-taches-otage-trousse-vignette.webp')" } as React.CSSProperties}>
      <div className="dg-in">
        <div className="dg-res" aria-live="polite">
          {/* Résultat « taches » : les 4 soins sont présentés une seule fois, dans la routine du haut de page.
              Ici, un rappel court avec un lien vers chaque fiche (contenances, prix à l'unité, mode d'emploi). */}
          <article className="dg-r" data-r="taches" aria-label={t.discoverLaRoutineAntiTaches}>
            <div className="dg-r-pic dg-r-gamme" aria-hidden="true"></div>
            <div className="dg-r-txt">
              <p className="dg-k">{t.discoverPourLesTaches}</p>
              <h2>{t.discoverLaRoutineAntiTaches}</h2>
              <p>{t.discoverContreLesTachesBrunes}</p>
              <ul className="dg-fiches">
                {rangeCards.map((p) => <li key={p.key}><a href={localePath(locale, `/soins/${p.slug}`)}>{p.name[locale]}</a></li>)}
              </ul>
              <div className="dg-act">
                <button type="button" className="o-btn o-primary o-md" data-see-offer="taches"><span className="o-lbl">{t.discoverVoirLOffre}</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg></span></button>
                <button type="button" className="dg-link" data-routine="">{t.discoverVoirLaRoutine}</button>
              </div>
            </div>
          </article>
          <article className="dg-r dg-car" data-r="yeux" aria-label={t.discoverLeSoinDesCernes} hidden>
            <div className="car-head">
              <p className="dg-k">{t.discoverPourLesCernes}</p>
              <h2>{t.discoverLeSerumContourDes}</h2>
              <p className="car-sub">{t.discoverPourLesCernesEt}</p>
            </div>
            <div className="car-rail">
              <div className="car-track" tabIndex={0} data-car="yeux">
              <Card p={yeux} locale={locale} />
              <YeuxSkin locale={locale} />
            </div>
            </div>
            <div className="car-offer">
              <span className="co-txt"><b>{t.discoverOffre21}</b>{t.discoverLeSerumA}<em>{bundleUnit(yeuxPrice)}{t.discoverDh}</em> <s>{yeuxPrice}{t.discoverDh}</s></span>
              <button type="button" className="o-btn o-primary o-md" data-see-offer="yeux"><span className="o-lbl">{t.discoverVoirLOffre}</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg></span></button>
            </div>
          </article>
          <article className="dg-r" data-r="odeurs" hidden>
            <div className="dg-r-pic dg-r-deo" aria-hidden="true"><Img src="/images/deodorant-creme-otage-50ml.webp" alt="" width={720} height={900} sizes="(min-width: 900px) 420px, 100vw" /><span>{t.discoverBientot}</span></div>
            <div className="dg-r-txt">
              <p className="dg-k">{t.discoverPourLesOdeurs}</p>
              <h2>{t.discoverNotreDeodorantArriveBientot}</h2>
              <p>{t.discoverOnLePrepareAvec}{deoPrice}{t.discoverDh}{t.discoverLePotDe}{deo.ml.petit} {locale === "ar" ? "مل" : "ml"}.</p>
              <div className="dg-act">
                <a className="dg-link" href={localePath(locale, `/soins/${deo.slug}`)}>{t.discoverCommanderLeDeo}{deoPrice}{t.discoverDh}</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
