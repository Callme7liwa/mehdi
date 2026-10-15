import type { HomeText } from "../text";
import { productByKey } from "@/data/products";
import type { Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

/* « Les soins en photos » : un lien vers chaque fiche, écrit dans la page, puis les photos, ajoutées par le script.
   Les actifs ne sont décrits qu'une fois sur l'accueil, dans les cartes « À l'unité ». Sans script, le titre n'est jamais seul. */
const POINTS = (["gel", "serum", "creme"] as const).map(productByKey);

export default function Gallery({ t, locale }: { t: HomeText; locale: Locale }) {
  return (
    <section className="ogs" id="ingredients" aria-labelledby="ogs-title">
      <div className="ogs-in">
        <h2 id="ogs-title">{t.galleryCeQuiFaitLa}</h2>
        <ul className="og-points">
          {POINTS.map((p) => (
            <li key={p.key}>
              <a href={localePath(locale, `/soins/${p.slug}`)}>{p.name[locale]}</a>
            </li>
          ))}
        </ul>
        <div className="og" aria-label={t.galleryLeProduitEnPhotos}>
              <div className="og-track" tabIndex={0}></div>
              <div className="og-dots" aria-hidden="true"></div>
            </div>
      </div>
    </section>
  );
}
