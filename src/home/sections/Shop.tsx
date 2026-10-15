import type { HomeText } from "../text";
import { homeJsText } from "../text-js";
import ShopIsland, { type ShopItem } from "../shop/ShopIsland";
import { products, unitFormats } from "@/data/products";
import { site, type Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

/** « À l'unité » : chaque soin vendu séparément, avec un panier.
    Prix et contenances viennent de src/data/products.ts, les frais de livraison de src/data/site.ts.
    Les cartes sont dans le HTML servi ; le panier et la commande (même route /api/order que la gamme) sont dans l'îlot. */
export default function Shop({ t, locale }: { t: HomeText; locale: Locale }) {
  const js = homeJsText[locale];
  const fee = site.delivery.unitFee;
  const items: ShopItem[] = products.map((p) => {
    const img = p.hd ?? p.pack;
    return {
      key: p.key,
      no: p.no.replace(/\D/g, ""),
      name: p.name[locale],
      tag: p.benefit[locale],
      // les 3 premiers actifs : c'est ici, et seulement ici, que les soins sont décrits sur l'accueil
      actives: p.ingredients.slice(0, 3).map((i) => i[locale]).join(" · "),
      url: localePath(locale, `/soins/${p.slug}`),
      img: { src: img.src, w: img.w, h: img.h },
      wide: img.w / img.h > 0.6,
      formats: unitFormats(p).map((f) => ({ f, ml: p.ml[f] as number, price: p.unitPrice[f] as number })),
    };
  });
  return (
    <section className="shop" id="unite" aria-labelledby="shop-title">
      <div className="shop-in">
        <header className="shop-head">
          <p className="shop-k">{t.shopALUnite}</p>
          <h2 id="shop-title">{t.shopUnSeulSoin}</h2>
          <p>{t.shopChoisisA}{fee.min}{t.shopChoisisB}{fee.max}{t.shopChoisisC}</p>
        </header>
      </div>
      <ShopIsland
        items={items}
        locale={locale}
        fee={fee}
        links={{ cgv: localePath(locale, "/cgv"), returns: `${localePath(locale, "/livraison-paiement")}#retours` }}
        t={{
          dh: t.offersDh.trim(), ml: js.ml, comma: js.comma,
          see: t.shopVoirLeProduit, format: t.shopFormat, petit: t.shopPetit, grand: t.shopGrand, unique: t.shopFormatUnique,
          add: t.shopAjouter, minus: t.shopRetirer, plus: t.shopAjouterUn, prev: t.shopPrecedents, next: t.shopSuivants, track: t.shopProduits,
          article: t.shopArticle, articles: t.shopArticles, plusDelivery: t.shopPlusLivraison, order: t.heroCommander,
          cart: js.cartTitle, delivery: js.delivery, feeA: t.shopFraisA, feeB: t.shopFraisB, feeC: t.shopFraisC, subtotal: js.cartSubtotal, note: js.cartNote,
          close: t.hesiteFermer,
          nom: t.offersNomComplet, nomEx: t.offersExSalmaBennani, tel: t.offersTelephone, ville: t.offersVille, villeEx: t.offersExCasablanca, villeInfo: t.offersAutreVille,
          adresse: t.offersAdresse, adresseOpt: t.offersFacultatifOnPeutLa, adresseEx: t.offersQuartierRueNumero,
          email: t.offersEmail, emailOpt: t.offersEmailOpt, emailHint: t.offersEmailHint, emailConsent: t.offersEmailConsent,
          agreeA: t.offersAgreeA, agreeCgv: t.offersAgreeCgv, agreeAnd: t.offersAgreeAnd, agreeReturns: t.offersAgreeReturns,
          send: t.offersValiderMaCommande, pay: t.shopTuPaies, thanksDefault: t.offersMerci, done: t.offersTaCommandeEstBien,
          thanks: js.thanks, orderNo: js.orderNo, offline: js.doneOffline, total: js.totalWord, to: t.shopA,
          errPhone: js.errPhone, errEmail: js.errEmail, errFields: js.errFields, errTerms: js.errTerms, errLimit: js.errLimit, errServer: js.errServer,
        }}
      />
    </section>
  );
}
