/* Questions fréquentes. Les chiffres viennent de products.ts et site.ts : rien n'est écrit en double.
   Les réponses peuvent contenir <b>…</b> ; chaque élément du tableau `a` est un paragraphe. */
import { site, type Locale } from "./site";
import { isolateAll } from "../lib/bidi";
import { bundleTotal, bundleUnit, gamme, hasBundle, nameWithArticle, productByKey, unitFormats, type Product } from "./products";
import { productPages } from "./product-pages";

export type Faq = { q: string; a: string[] };

const P = gamme.formats.petit, G = gamme.formats.grand;
const ml = (k: Parameters<typeof productByKey>[0], f: "petit" | "grand") => productByKey(k).ml[f];

/** FAQ générale (page d'accueil, livraison). L'ordre est celui du chat de l'accueil. */
export const faq: Record<Locale, Faq[]> = {
  fr: [
    { q: "Je paie quand ?", a: ["À la livraison, en espèces. Rien à payer en ligne, pas de carte bancaire."] },
    { q: "La livraison est payante ?", a: [`Non pour une gamme complète : elle est <b>offerte</b>. À l'unité, compte <b>${site.delivery.unitFee.min} à ${site.delivery.unitFee.max} DH</b> selon ta ville.`] },
    { q: "Je suis livrée en combien de temps ?", a: [`En <b>${site.delivery.label.fr}</b>, partout au Maroc. On t'appelle d'abord pour confirmer.`] },
    { q: "Combien coûte la gamme anti-taches ?", a: [`<b>${P.price} DH</b> en Petit format, <b>${G.price} DH</b> en Grand format. Avec l'offre 2 + 1, la 3e gamme est offerte.`] },
    { q: "Qu'est-ce qu'il y a dans une gamme ?", a: ["Gel nettoyant, sérum, crème et écran SPF 50.", `Petit format : ${ml("gel", "petit")}, ${ml("serum", "petit")}, ${ml("creme", "petit")} et ${ml("ecran", "petit")} ml. Grand format : ${ml("gel", "grand")}, ${ml("serum", "grand")}, ${ml("creme", "grand")} et ${ml("ecran", "grand")} ml.`] },
    { q: "Comment j'utilise la routine ?", a: ["Le matin : gel, sérum, crème, puis écran solaire. Le soir : les 3 premiers, sans écran."] },
    { q: "Je vois des résultats quand ?", a: ["Pas en quelques jours : les taches s'atténuent petit à petit. Régularité et écran solaire chaque matin comptent le plus."] },
    { q: "Et si j'ai la peau sensible ?", a: ["Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil."] },
    { q: "Je suis enceinte ou j'allaite, je peux l'utiliser ?", a: ["Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients."] },
    { q: "Et après ma commande ?", a: ["On t'appelle pour confirmer ta commande et ton adresse. Ensuite, ton colis part."] },
    { q: "Et si j'ai un problème avec ma commande ?", a: ["Produit abîmé ou erreur : on échange ou on rembourse, sans frais pour toi. Écris-nous sur WhatsApp."] },
    { q: "Je peux retourner ma commande ?", a: [`Oui, sous <b>${site.returns.days} jours</b> après réception (loi 31-08, article 36). Produits non ouverts, retour à nos frais, remboursement ou échange.`] },
    { q: "Vos soins sont fabriqués où ?", a: ["Au Maroc, avec un laboratoire partenaire. Parmi les ingrédients : figue de Barbarie et louban."] },
  ],
  /* À relire par un natif. Même ordre et mêmes informations que le français. */
  ar: isolateAll([
    { q: "متى أدفع؟", a: ["عند الاستلام، نقدًا. لا شيء يُدفع عبر الإنترنت، ولا حاجة لبطاقة بنكية."] },
    { q: "هل التوصيل مدفوع؟", a: [`لا للمجموعة الكاملة: التوصيل <b>مجاني</b>. للمنتجات المنفردة: <b>من ${site.delivery.unitFee.min} إلى ${site.delivery.unitFee.max} درهمًا</b> حسب مدينتك.`] },
    { q: "كم يستغرق التوصيل؟", a: [`<b>${site.delivery.label.ar}</b>، في كل أنحاء المغرب. نتصل بك أولًا للتأكيد.`] },
    { q: "كم ثمن مجموعة العناية ضد البقع؟", a: [`<b>${P.price} درهم</b> بالحجم الصغير، و<b>${G.price} درهم</b> بالحجم الكبير. مع عرض 2 + 1، المجموعة الثالثة مجانًا.`] },
    { q: "ماذا تحتوي المجموعة؟", a: ["جل منظف، سيروم، كريم وواقي شمس SPF 50.", `الحجم الصغير: ${ml("gel", "petit")} و${ml("serum", "petit")} و${ml("creme", "petit")} و${ml("ecran", "petit")} مل. الحجم الكبير: ${ml("gel", "grand")} و${ml("serum", "grand")} و${ml("creme", "grand")} و${ml("ecran", "grand")} مل.`] },
    { q: "كيف أستعمل الروتين؟", a: ["في الصباح: الجل، السيروم، الكريم، ثم واقي الشمس. في المساء: الثلاثة الأولى، بدون واقي."] },
    { q: "متى أرى النتائج؟", a: ["ليس في أيام قليلة: البقع تخف شيئًا فشيئًا. الأهم هو الانتظام وواقي الشمس كل صباح."] },
    { q: "وإذا كانت بشرتي حساسة؟", a: ["جربي أولًا 24 ساعة في ثنية المرفق. في حال الاحمرار، توقفي واستشيري مختصًا."] },
    { q: "أنا حامل أو مرضعة، هل يمكنني استعماله؟", a: ["اسألي أولًا طبيبك أو الصيدلي. أريه قائمة المكونات."] },
    { q: "وماذا بعد طلبي؟", a: ["نتصل بك لتأكيد طلبك وعنوانك. بعد ذلك، يُرسل طردك."] },
    { q: "وماذا لو كانت هناك مشكلة في طلبي؟", a: ["منتج تالف أو خطأ: نستبدله أو نرد لك المبلغ، دون أي مصاريف. راسلينا عبر واتساب."] },
    { q: "هل يمكنني إرجاع طلبي؟", a: [`نعم، خلال <b>${site.returns.days} أيام</b> بعد الاستلام (القانون 31-08، المادة 36). منتجات غير مفتوحة، الإرجاع على حسابنا، استرجاع المبلغ أو الاستبدال.`] },
    { q: "أين تُصنع منتجاتكم؟", a: ["في المغرب، مع مختبر شريك. من مكوناتها: التين الشوكي واللبان."] },
  ]),
};

/* ---------- Organisation du chat de l'accueil ----------
   Une ligne par question, dans le même ordre que `faq.fr` et `faq.ar`.
   id : nom court ; cat : catégorie ; next : questions de suivi proposées après la réponse. */
export type FaqCat = "commande" | "produits" | "peau";
export const faqMeta: { id: string; cat: FaqCat; next: string[] }[] = [
  { id: "pay", cat: "commande", next: ["after", "delay", "claims"] },
  { id: "shipcost", cat: "commande", next: ["delay", "pay", "after"] },
  { id: "delay", cat: "commande", next: ["shipcost", "after", "pay"] },
  { id: "price", cat: "commande", next: ["contents", "shipcost", "delay"] },
  { id: "contents", cat: "produits", next: ["routine", "price", "results"] },
  { id: "routine", cat: "produits", next: ["results", "contents", "sensitive"] },
  { id: "results", cat: "produits", next: ["routine", "sensitive", "contents"] },
  { id: "sensitive", cat: "peau", next: ["pregnancy", "routine"] },
  { id: "pregnancy", cat: "peau", next: ["sensitive", "contents"] },
  { id: "after", cat: "commande", next: ["delay", "returns", "claims"] },
  { id: "claims", cat: "commande", next: ["returns", "after", "delay"] },
  { id: "returns", cat: "commande", next: ["claims", "shipcost", "delay"] },
  { id: "origin", cat: "produits", next: ["contents", "routine"] },
];
/** Les 4 questions proposées à l'ouverture du chat : prix, livraison, paiement, résultats. */
export const faqStarters = ["price", "delay", "pay", "results"];
/** Une question de la FAQ générale, par son identifiant (indépendant de sa formulation). */
export const faqById = (locale: Locale, id: string) => faq[locale][faqMeta.findIndex((m) => m.id === id)];
/** Les 3 sujets du chat, dans l'ordre (libellés dans src/home/chat/chat-text.ts). */
export const faqCats: FaqCat[] = ["commande", "produits", "peau"];

const T = <K extends string>(locale: Locale, fr: K, ar: string) => (locale === "ar" ? ar : fr);

/** FAQ d'une page produit : usage, ingrédients, contenance et prix (générés), puis les questions propres au produit. */
export function productFaq(p: Product, locale: Locale): Faq[] {
  const page = productPages[p.key];
  const name = nameWithArticle(p, locale);
  const out: Faq[] = [];

  // le mode d'emploi a sa section sur la fiche ; il reste ici seulement pour une fiche qui ne l'a pas encore
  if (!page.use) {
    out.push({
      q: T(locale, `Comment utiliser ${name} ?`, `كيف أستعمل ${name}؟`),
      a: [p.how[locale], p.step ? T(locale, `C'est l'étape ${p.step} de la routine anti-taches (${p.when.fr.toLowerCase()}).`, `هو الخطوة ${p.step} في روتين العناية ضد البقع (${p.when.ar}).`) : T(locale, `À utiliser ${p.when.fr.toLowerCase()}.`, `يُستعمل ${p.when.ar}.`)],
    });
  }
  // la composition est dans « L'étiquette » : pas de question en double

  // le prix d'abord (lu dans ce fichier et products.ts), puis une phrase
  const sizes = unitFormats(p);
  if (!hasBundle(p.key)) {
    const it = /^crème/i.test(p.name.fr) ? "Elle" : "Il";
    const fr = sizes.map((f) => `<b>${p.unitPrice[f]} DH</b> les ${p.ml[f]} ml`).join(", ");
    const ar = sizes.map((f) => `<b>${p.unitPrice[f]} درهم</b> لـ ${p.ml[f]} مل`).join("، و");
    out.push({
      q: T(locale, `Quel prix pour ${name} ?`, `كم ثمن ${name}؟`),
      a: [T(locale, `${fr}. ${it} est aussi dans la gamme complète, dès ${P.price} DH.`, `${ar}. يوجد أيضًا ضمن المجموعة الكاملة، ابتداءً من ${P.price} درهم.`)],
    });
  } else {
    const price = p.unitPrice.petit as number, unit = page.unitWord!;
    const qty = T(locale, p.key === "deo" ? `le pot de ${p.ml.petit} ml` : `les ${p.ml.petit} ml`, `لـ ${p.ml.petit} مل`);
    out.push({
      q: T(locale, `Quel prix pour ${name} ?`, `كم ثمن ${name}؟`),
      a: [T(locale, `<b>${price} DH</b> ${qty}. Avec l'offre 2 + 1 : ${bundleTotal(price)} DH les 3, soit ${bundleUnit(price)} DH le ${unit.one.fr}.`, `<b>${price} درهم</b> ${qty}. مع عرض 2 + 1: ${bundleTotal(price)} درهم للثلاثة، أي ${bundleUnit(price)} درهم لل${unit.one.ar}.`)],
    });
  }

  for (const x of p.extraFaq) out.push({ q: x.q[locale], a: [x.a[locale]] });
  if (locale === "ar") out.splice(0, out.length, ...isolateAll(out));

  for (const id of ["sensitive", "pregnancy", "delay"]) out.push(faqById(locale, id));
  return out;
}


/** Texte brut d'une réponse (JSON-LD, llms.txt). */
export const plain = (f: Faq) => f.a.join(" ").replace(/<[^>]+>/g, "");

