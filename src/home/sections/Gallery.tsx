import type { HomeText } from "../text";
import { homeJsText } from "../text-js";
import Img from "@/components/Img";
import { productByKey, type ProductKey } from "@/data/products";
import type { Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

/* « Les soins en photos » : chaque photo est un lien vers la fiche du soin qu'elle montre (ou vers /soins pour une photo
   de groupe). Les deux galeries (taches, cernes) sont écrites dans la page : le script affiche celle du soin choisi
   dans l'offre et dessine les points. Le texte du lien finit par le nom du soin : l'ancre est descriptive. */
type Shot = { src: string; w: number; h: number; alt: (t: HomeText) => string; key: ProductKey | null; pack?: boolean };
const yeux = productByKey("yeux");
const GAL: Record<"taches" | "yeux", Shot[]> = {
  taches: [
    { src: "/images/affiche-eclat-serum-anti-taches.webp", w: 664, h: 1000, alt: (t) => t.campaignAfficheEclatAvecLe, key: "serum" },
    { src: "/images/femme-serum-anti-taches.webp", w: 1195, h: 1600, alt: (t) => t.campaignUneFemmeTendLe, key: "serum" },
    { src: "/images/gel-nettoyant-anti-taches-mains.webp", w: 1195, h: 1600, alt: (t) => t.campaignLeGelNettoyantTenu, key: "gel" },
    { src: "/images/ecran-solaire-spf50-plage-bouee.webp", w: 1600, h: 1600, alt: (t) => t.campaignLEcranSolaireA, key: "ecran" },
    { src: "/images/gamme-anti-taches-4-soins-papier-rouge.webp", w: 1600, h: 1600, alt: (t) => t.campaignLes4SoinsTenus, key: null },
  ],
  yeux: [
    { src: "/images/serum-contour-des-yeux-n05-application.webp", w: 1195, h: 1600, alt: (t) => t.diagnosticSerumContourDesYeux, key: "yeux" },
    { src: yeux.pack.src, w: yeux.pack.w, h: yeux.pack.h, alt: () => "", key: "yeux", pack: true },
    { src: "/images/flacons-otage-trousse.webp", w: 1600, h: 1600, alt: (t) => t.campaignUnePluieDeFlacons, key: null },
  ],
};

export default function Gallery({ t, locale }: { t: HomeText; locale: Locale }) {
  const js = homeJsText[locale];
  const caps = { taches: js.galTaches, yeux: js.galYeux };
  const arrow = locale === "ar" ? "←" : "→";
  return (
    <section className="ogs" id="ingredients" aria-labelledby="ogs-title">
      <div className="ogs-in">
        <h2 id="ogs-title">{t.galleryCeQuiFaitLa}</h2>
        <div className="og" aria-label={t.galleryLeProduitEnPhotos}>
          {(["taches", "yeux"] as const).map((g) => (
            <div key={g} className="og-track" data-gal={g} tabIndex={0} hidden={g === "yeux"}>
              {GAL[g].map((s, i) => {
                const p = s.key && productByKey(s.key);
                const alt = s.pack && p ? p.pack.alt[locale] : s.alt(t);
                return (
                  <a key={s.src + i} className={`og-s${s.pack ? " pack" : ""}`} href={localePath(locale, p ? `/soins/${p.slug}` : "/soins")}>
                    <Img src={s.src} alt={alt} width={s.w} height={s.h} sizes="(min-width: 900px) 300px, 80vw" />
                    <span className="og-cap"><b>{caps[g][i].t}</b><span>{caps[g][i].s}</span><span className="og-go">{p ? p.name[locale] : t.galleryTousLesSoins}<i aria-hidden="true">{arrow}</i></span></span>
                  </a>
                );
              })}
            </div>
          ))}
          <div className="og-dots" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
}
