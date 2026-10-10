import Img from "@/components/Img";
import { bundleUnit, gamme, productByKey, products, yeuxPrice, type Product } from "@/data/products";

const P = gamme.formats.petit, G = gamme.formats.grand;
const rangeCards = products.filter((p) => p.range === "taches");
const yeux = productByKey("yeux");
const lowerFirst = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
/** Le sérum contour des yeux a deux fiches : le produit, puis « Sur la peau ». */
const [yeuxLead, yeuxSkin] = yeux.lead.fr.split(/(?<=\.)\s+/);

function Card({ p }: { p: Product }) {
  const taches = p.range === "taches";
  return (
    <article className="pc" id={p.homeAnchor}>
      <div className="pc-pic"><Img src={p.pack.src} alt={p.pack.alt.fr} width={p.pack.w} height={p.pack.h} /><span className="pc-no">{p.no}</span><span className="pc-when">{p.when.fr}</span></div>
      <div className="pc-body">
        <h3>{p.name.fr}<span className="pc-size">{p.ml.grand ?? p.ml.petit} ml</span></h3>
        <p>{taches ? p.lead.fr : yeuxLead}</p>
        <ul>{p.ingredients.map((i) => <li key={i.fr}>{i.fr}</li>)}</ul>
        <p className="pc-how"><b>Comment :</b> {lowerFirst(p.how.fr)}</p>
        <p className="pc-meta">
          {taches
            ? `Contenance : ${p.ml.grand} ml en Grand format, ${p.ml.petit} ml en Petit format. Vendu dans la gamme anti-taches : ${P.price} DH en Petit format, ${G.price} DH en Grand format.`
            : `Prix : ${yeuxPrice} DH, ou ${bundleUnit(yeuxPrice)} DH le sérum avec l'offre 2 + 1.`}
        </p>
        <a className="pc-link" href={`/soins/${p.slug}`}>Voir la fiche complète<span aria-hidden="true"> →</span></a>
      </div>
    </article>
  );
}

function YeuxSkin() {
  const photo = yeux.photos[0];
  return (
    <article className="pc" id="contour-des-yeux-sur-la-peau">
      <div className="pc-pic full"><Img src={photo.src} alt={photo.alt.fr} width={photo.w} height={photo.h} /><span className="pc-no">{yeux.no}</span></div>
      <div className="pc-body"><h3>Sur la peau</h3><p>{yeuxSkin}</p></div>
    </article>
  );
}

export default function Discover() {
  return (
    <section className="dgx" id="decouvrir" aria-label="Découvrir les soins">
      <div className="dg-in">
        <div className="dg-res" aria-live="polite">
          <article className="dg-r dg-car" data-r="taches" aria-label="La routine anti-taches">
            <div className="car-head">
              <p className="dg-k">Pour les taches</p>
              <h2>La routine anti-taches, en 4 soins</h2>
              <p className="car-sub">Contre les taches brunes, les taches pigmentaires et le teint irrégulier. Fais défiler pour découvrir chaque soin.</p>
            </div>
            <div className="car-rail">
              <button type="button" className="car-nav car-prev" aria-label="Soin précédent"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg></button>
              <div className="car-track" tabIndex={0} data-car="taches">
              {rangeCards.map((p) => <Card key={p.key} p={p} />)}
            </div>
              <button type="button" className="car-nav car-next" aria-label="Soin suivant"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg></button>
            </div>
            <div className="car-dots" aria-hidden="true"></div>
            <div className="car-offer">
              <span className="co-txt"><b>Offre 2 + 1 :</b> la gamme à <em>{bundleUnit(P.price)} DH</em> <s>{P.price} DH</s></span>
              <button type="button" className="o-btn o-primary o-md" data-see-offer="taches"><span className="o-lbl">Voir l'offre</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg></span></button>
            </div>
          </article>
          <article className="dg-r dg-car" data-r="yeux" aria-label="Le soin des cernes" hidden>
            <div className="car-head">
              <p className="dg-k">Pour les cernes</p>
              <h2>Le sérum contour des yeux</h2>
              <p className="car-sub">Pour les cernes et le contour des yeux fatigué. Ce qu'il faut savoir avant de l'adopter.</p>
            </div>
            <div className="car-rail">
              <div className="car-track" tabIndex={0} data-car="yeux">
              <Card p={yeux} />
              <YeuxSkin />
            </div>
            </div>
            <div className="car-offer">
              <span className="co-txt"><b>Offre 2 + 1 :</b> le sérum à <em>{bundleUnit(yeuxPrice)} DH</em> <s>{yeuxPrice} DH</s></span>
              <button type="button" className="o-btn o-primary o-md" data-see-offer="yeux"><span className="o-lbl">Voir l'offre</span><span className="o-cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg></span></button>
            </div>
          </article>
          <article className="dg-r" data-r="odeurs" hidden>
            <div className="dg-r-pic dg-r-soon" aria-hidden="true"><span>Bientôt</span></div>
            <div className="dg-r-txt">
              <p className="dg-k">Pour les odeurs</p>
              <h2>Notre déodorant arrive bientôt.</h2>
              <p>On le prépare avec le même soin que le reste de la gamme. En attendant, découvre nos autres soins.</p>
              <div className="dg-act">
                <button type="button" className="dg-link" data-pick="taches">Voir les soins anti-taches</button>
                <button type="button" className="dg-link" data-pick="yeux">Voir le contour des yeux</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
