import type { HomeText } from "../text";
import { ingredientList, productByKey } from "@/data/products";
import type { Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

/* « Ce qui fait la différence » : les ingrédients de trois soins, écrits dans la page (ils viennent de products.ts),
   puis les photos, ajoutées par le script. Sans script ou sans photos, le titre n'est jamais seul. */
const POINTS = (["gel", "serum", "creme"] as const).map(productByKey);
const upperFirst = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export default function Gallery({ t, locale }: { t: HomeText; locale: Locale }) {
  return (
    <section className="ogs" id="ingredients" aria-labelledby="ogs-title">
      <div className="ogs-in">
        <h2 id="ogs-title">{t.galleryCeQuiFaitLa}</h2>
        <ul className="og-points">
          {POINTS.map((p) => (
            <li key={p.key}>
              <b>{upperFirst(ingredientList(p, locale))}</b>
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
