import type { HomeText } from "../text";
import Img from "@/components/Img";
import { bundleUnit, gamme, productByKey, products, yeuxPrice, type Product } from "@/data/products";
import type { Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

const P = gamme.formats.petit, G = gamme.formats.grand;
const rangeCards = products.filter((p) => p.range === "taches");
const yeux = productByKey("yeux");
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
        <p className="pc-meta">
          {taches
            ? ar
              ? `السعة: ${p.ml.grand} مل في الحجم الكبير، ${p.ml.petit} مل في الحجم الصغير. يباع ضمن مجموعة العناية ضد البقع: ${P.price} درهم بالحجم الصغير، ${G.price} درهم بالحجم الكبير.`
              : `Contenance : ${p.ml.grand} ml en Grand format, ${p.ml.petit} ml en Petit format. Vendu dans la gamme anti-taches : ${P.price} DH en Petit format, ${G.price} DH en Grand format.`
            : ar
              ? `الثمن: ${yeuxPrice} درهم، أو ${bundleUnit(yeuxPrice)} درهم للسيروم مع عرض ⁦2 + 1⁩.`
              : `Prix : ${yeuxPrice} DH, ou ${bundleUnit(yeuxPrice)} DH le sérum avec l'offre 2 + 1.`}
        </p>
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
    <section className="dgx" id="decouvrir" aria-label={t.discoverDecouvrirLesSoins}>
      <div className="dg-in">
        <div className="dg-res" aria-live="polite">
          <article className="dg-r dg-car" data-r="taches" aria-label={t.discoverLaRoutineAntiTaches}>
            <div className="car-head">
              <p className="dg-k">{t.discoverPourLesTaches}</p>
              <h2>{t.discoverLaRoutineAntiTaches2}</h2>
              <p className="car-sub">{t.discoverContreLesTachesBrunes}</p>
            </div>
            <div className="car-rail">
              <button type="button" className="car-nav car-prev" aria-label={t.discoverSoinPrecedent}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg></button>
              <div className="car-track" tabIndex={0} data-car="taches">
              {rangeCards.map((p) => <Card key={p.key} p={p} locale={locale} />)}
            </div>
              <button type="button" className="car-nav car-next" aria-label={t.discoverSoinSuivant}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg></button>
            </div>
            <div className="car-dots" aria-hidden="true"></div>
            <div className="car-offer">
              <span className="co-txt"><b>{t.discoverOffre21}</b>{t.discoverLaGammeA}<em>{bundleUnit(P.price)}{t.discoverDh}</em> <s>{P.price}{t.discoverDh}</s></span>
              <button type="button" className="o-btn o-primary o-md" data-see-offer="taches"><span className="o-lbl">{t.discoverVoirLOffre}</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg></span></button>
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
            <div className="dg-r-pic dg-r-soon" aria-hidden="true"><span>{t.discoverBientot}</span></div>
            <div className="dg-r-txt">
              <p className="dg-k">{t.discoverPourLesOdeurs}</p>
              <h2>{t.discoverNotreDeodorantArriveBientot}</h2>
              <p>{t.discoverOnLePrepareAvec}</p>
              <div className="dg-act">
                <button type="button" className="dg-link" data-pick="taches">{t.discoverVoirLesSoinsAnti}</button>
                <button type="button" className="dg-link" data-pick="yeux">{t.discoverVoirLeContourDes}</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
