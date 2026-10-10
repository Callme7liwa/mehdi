import OrderForm, { type OrderData, type OrderText } from "./OrderForm";
import { gamme, productByKey, yeuxPrice, type FormatKey, type ProductKey } from "@/data/products";
import { site, type Locale } from "@/data/site";
import { ui } from "@/data/ui";

const CITIES: Record<Locale, string[]> = {
  fr: ["Casablanca", "Rabat", "Salé", "Fès", "Marrakech", "Tanger", "Agadir", "Meknès", "Oujda", "Kénitra", "Tétouan", "El Jadida"],
  ar: ["الدار البيضاء", "الرباط", "سلا", "فاس", "مراكش", "طنجة", "أكادير", "مكناس", "وجدة", "القنيطرة", "تطوان", "الجديدة"],
};

const content = (f: FormatKey, locale: Locale) =>
  (["gel", "serum", "creme", "ecran"] as const)
    .map((k) => {
      const p = productByKey(k);
      const short = { gel: { fr: "Gel", ar: "جل" }, serum: { fr: "sérum", ar: "سيروم" }, creme: { fr: "crème", ar: "كريم" }, ecran: { fr: "écran solaire", ar: "واقي شمس" } }[k][locale];
      return `${short} ${p.ml[f]} ${locale === "ar" ? "مل" : "ml"}`;
    })
    .join(locale === "ar" ? "، " : ", ");

/** Le formulaire de commande, prêt pour une langue et un produit (gamme anti-taches ou sérum contour des yeux). */
export default function OrderBox({ locale, product, unitKey }: { locale: Locale; product: "taches" | "yeux"; unitKey?: ProductKey }) {
  const t = ui[locale];
  const fmt = (f: FormatKey) => ({ label: gamme.formats[f].label[locale], labelFr: gamme.formats[f].label.fr, price: gamme.formats[f].price, was: gamme.formats[f].was, content: content(f, locale) });
  // vente à l'unité : Petit format, au prix à l'unité de products.ts (le prix du Grand format à l'unité n'est pas communiqué)
  const u = unitKey ? productByKey(unitKey) : undefined;
  const unit = u && u.range === "taches" && u.unitPrice.petit ? { name: u.name[locale], nameFr: u.name.fr, size: `${u.ml.petit} ${locale === "ar" ? "مل" : "ml"}`, sizeFr: `${u.ml.petit} ml`, price: u.unitPrice.petit } : undefined;
  const data: OrderData = { endpoint: site.ordersEndpoint, product, formats: { petit: fmt("petit"), grand: fmt("grand") }, yeuxPrice, cities: CITIES[locale], unit };
  const keys: (keyof OrderText)[] = ["chooseWhat", "unitAlone", "fullRange", "from", "quantity", "less", "more", "chooseFormat", "chooseOffer", "chooseOfferOnly", "yourInfo", "perRange", "perSerum", "rangeWord", "rangesWord", "serumWord", "serumsWord", "free", "freeM", "save", "total", "name", "namePh", "phone", "phonePh", "city", "cityPh", "address", "addressOpt", "addressPh", "submit", "payNote", "youPay", "errPhone", "errFields", "thanks", "done", "insteadOf", "bundle", "dh"];
  const text = Object.fromEntries(keys.map((k) => [k, t[k]])) as OrderText;
  return <OrderForm data={data} t={text} />;
}
