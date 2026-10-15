import Link from "next/link";
import Img from "./Img";
import { unitFormats, type Product } from "@/data/products";
import type { Locale } from "@/data/site";
import { ui } from "@/data/ui";
import { localePath } from "@/lib/seo";

/** « le gel nettoyant… », « l'écran solaire… », « la crème… » : pour le bouton nommé de la carte. */
const withArticle = (name: string) => {
  const lower = name.charAt(0).toLowerCase() + name.slice(1);
  if (/^[aeéèiouh]/i.test(lower)) return `l'${lower}`;
  return /^crème/.test(lower) ? `la ${lower}` : `le ${lower}`;
};

/** Carte produit (/soins) : nom, bénéfice, 3 actifs, prix (lu dans products.ts) et bouton nommé. */
export default function ProductCard({ p, locale }: { p: Product; locale: Locale }) {
  const t = ui[locale];
  const prices = unitFormats(p).map((f) => p.unitPrice[f] as number);
  const price = `${prices.length > 1 ? `${t.from} ` : ""}${Math.min(...prices)} ${t.dh}`;
  const see = locale === "ar" ? `${t.seeProduct}: ${p.name.ar}` : `Voir ${withArticle(p.name.fr)}`;
  return (
    <Link className="pcard" href={localePath(locale, `/soins/${p.slug}`)}>
      <div className="pcard-pic">
        <Img src={p.pack.src} alt={p.pack.alt[locale]} width={p.pack.w} height={p.pack.h} />
        <span className="num" dir="ltr">{p.no}</span>
      </div>
      <div className="pcard-body">
        <h3>{p.name[locale]}</h3>
        <p>{p.benefit[locale]}</p>
        <p className="pcard-act">{p.ingredients.slice(0, 3).map((i) => i[locale]).join(" · ")}</p>
        <p className="pcard-price">{price}</p>
        <span className="pcard-more">{see}<span aria-hidden="true"> {locale === "ar" ? "←" : "→"}</span></span>
      </div>
    </Link>
  );
}
