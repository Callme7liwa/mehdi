/* Questions fréquentes. Les chiffres viennent de products.ts et site.ts : rien n'est écrit en double.
   Les réponses peuvent contenir <b>…</b> ; chaque élément du tableau `a` est un paragraphe. */
import { site, type Locale } from "./site";
import { isolateAll } from "../lib/bidi";
import { bundleTotal, bundleUnit, gamme, productByKey, type Product } from "./products";

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
    { q: "متى أدفع؟", a: ["عند الاستلام، نقدًا، حين يسلمك عامل التوصيل طردك.", "لا شيء يُدفع عبر الإنترنت، ولا حاجة لبطاقة بنكية."] },
    { q: "هل التوصيل مدفوع؟", a: ["للمجموعة الكاملة، التوصيل <b>مجاني</b>، مهما كان الحجم أو عدد المجموعات.", `عند شراء منتجات منفردة، ثمنه <b>من ${site.delivery.unitFee.min} إلى ${site.delivery.unitFee.max} درهمًا حسب المدينة</b>، يُضاف إلى المجموع. نؤكد لك المبلغ الدقيق هاتفيًا.`] },
    { q: "كم يستغرق التوصيل؟", a: [`<b>${site.delivery.label.ar}</b>، في كل أنحاء المغرب. نتصل بك أولًا لتأكيد طلبك.`] },
    { q: "كم ثمن مجموعة العناية ضد البقع؟", a: [`الحجم الصغير بـ <b>${P.price} درهم</b> للمجموعة بدل ${P.was} درهم، والحجم الكبير بـ <b>${G.price} درهم</b> بدل ${G.was} درهم.`, `مع عرض 2 + 1، تصبح المجموعة بـ ${bundleUnit(P.price)} درهم بالحجم الصغير و${bundleUnit(G.price)} درهم بالحجم الكبير. توصيل المجموعة مجاني.`] },
    { q: "ماذا تحتوي المجموعة؟", a: ["منتجات الروتين الأربعة: جل منظف، سيروم ضد البقع، كريم ضد البقع وواقي الشمس SPF 50.", `بالحجم الكبير: جل ${ml("gel", "grand")} مل، سيروم ${ml("serum", "grand")} مل، كريم ${ml("creme", "grand")} مل وواقي شمس ${ml("ecran", "grand")} مل. بالحجم الصغير: جل ${ml("gel", "petit")} مل، سيروم ${ml("serum", "petit")} مل، كريم ${ml("creme", "petit")} مل وواقي شمس ${ml("ecran", "petit")} مل.`] },
    { q: "كيف أستعمل الروتين؟", a: ["في الصباح: الجل المنظف، السيروم، الكريم، ثم واقي الشمس.", "في المساء: المنتجات الثلاثة الأولى، بدون واقي الشمس. السيروم هو قلب الروتين ضد البقع."] },
    { q: "متى أرى النتائج؟", a: ["بصراحة: البقع تخف شيئًا فشيئًا، وليس بين ليلة وضحاها.", "المهم هو الانتظام صباحًا ومساءً، وواقي الشمس كل صباح. بدون حماية، تعود البقع. الوتيرة تختلف من بشرة إلى أخرى."] },
    { q: "بشرتي حساسة", a: ["جربي أولًا على منطقة صغيرة، في ثنية المرفق أو خلف الأذن، وانتظري 24 ساعة.", "في حال الاحمرار أو التهيج، توقفي واستشيري مختصًا."] },
    { q: "أنا حامل أو مرضعة، هل يمكنني استعماله؟", a: ["اسألي أولًا طبيبك أو الصيدلي، مع عرض قائمة المكونات عليه. هذا أكثر أمانًا."] },
    { q: "وماذا بعد طلبي؟", a: ["نتصل بك لتأكيد طلبك وعنوانك، ثم يُرسل طردك.", "تدفعين عند الاستلام، وهذا كل شيء."] },
    { q: "وماذا لو كانت هناك مشكلة في طلبي؟", a: [site.claims.ar, "وإذا لم يناسبك المنتج، لديك 7 أيام لإرجاعه (انظري سؤال الإرجاع)."] },
    { q: "هل يمكنني إرجاع طلبي؟", a: [`نعم. لديك <b>${site.returns.days} أيام بعد الاستلام</b> لتغيير رأيك: هذا حقك في التراجع (المادة 36 من القانون رقم 31-08).`, "يجب أن تكون المنتجات غير مفتوحة وغير مستعملة. مصاريف الإرجاع تتحملها OTAGE، ولك الاختيار: استرجاع المبلغ أو الاستبدال. راسلينا عبر واتساب لبدء الإرجاع."] },
    { q: "أين تُصنع منتجاتكم؟", a: ["في المغرب، بمكونات مثل التين الشوكي واللبان."] },
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
  const name = p.name[locale];
  const lower = locale === "fr" ? name.charAt(0).toLowerCase() + name.slice(1) : name;
  const ing = p.ingredients.map((i) => i[locale]).join(locale === "ar" ? "، " : ", ");
  const sizes = (["petit", "grand"] as const).filter((f) => p.ml[f]);
  const out: Faq[] = [];

  out.push({
    q: T(locale, `Comment utiliser ${articleLe(lower)} ?`, `كيف أستعمل ${name}؟`),
    a: [p.how[locale], p.step ? T(locale, `C'est l'étape ${p.step} de la routine anti-taches (${p.when.fr.toLowerCase()}).`, `هو الخطوة ${p.step} في روتين العناية ضد البقع (${p.when.ar}).`) : T(locale, `À utiliser ${p.when.fr.toLowerCase()}.`, `يُستعمل ${p.when.ar}.`)],
  });
  out.push({
    q: T(locale, `Que contient ${articleLe(lower)} ?`, `ماذا يحتوي ${name}؟`),
    a: [T(locale, `${ing}.`, `${ing}.`)],
  });

  if (p.range === "taches") {
    const sizeFr = sizes.map((f) => `${p.ml[f]} ml en ${gamme.formats[f].label.fr}`).join(", ");
    const sizeAr = sizes.map((f) => `${p.ml[f]} مل في ${gamme.formats[f].label.ar}`).join("، ");
    const unitFr = sizes.filter((f) => p.unitPrice[f]).map((f) => `<b>${p.unitPrice[f]} DH</b> en ${gamme.formats[f].label.fr}`).join(", ");
    const unitAr = sizes.filter((f) => p.unitPrice[f]).map((f) => `<b>${p.unitPrice[f]} درهم</b> في ${gamme.formats[f].label.ar}`).join("، ");
    out.push({
      q: T(locale, "Quelle contenance et quel prix ?", "ما الحجم وما الثمن؟"),
      a: [
        T(locale, `${sizeFr}. À l'unité : ${unitFr}.`, `${sizeAr}. الثمن منفردًا: ${unitAr}.`),
        T(
          locale,
          `Dans la gamme anti-taches complète (4 soins) : ${P.price} DH en Petit format au lieu de ${P.was} DH, ${G.price} DH en Grand format au lieu de ${G.was} DH. La livraison de la gamme est offerte ; à l'unité, elle coûte de ${site.delivery.unitFee.min} à ${site.delivery.unitFee.max} DH selon la ville.`,
          `ضمن مجموعة العناية ضد البقع الكاملة (4 منتجات): ${P.price} درهم بالحجم الصغير بدل ${P.was} درهم، و${G.price} درهم بالحجم الكبير بدل ${G.was} درهم. توصيل المجموعة مجاني؛ وللمنتجات المنفردة، من ${site.delivery.unitFee.min} إلى ${site.delivery.unitFee.max} درهمًا حسب المدينة.`,
        ),
      ],
    });
  } else {
    const price = p.unitPrice.petit as number;
    out.push({
      q: T(locale, "Quelle contenance et quel prix ?", "ما الحجم وما الثمن؟"),
      a: [T(locale, `${p.ml.petit} ml. Il coûte <b>${price} DH</b>, ou ${bundleUnit(price)} DH ${p.key === "deo" ? "le pot" : "le sérum"} avec l'offre 2 + 1 (${bundleTotal(price)} DH les 3). Livraison : de ${site.delivery.unitFee.min} à ${site.delivery.unitFee.max} DH selon la ville.`, `${p.ml.petit} مل. ثمنه <b>${price} درهم</b>، أو ${bundleUnit(price)} درهم ${p.key === "deo" ? "للعلبة" : "للسيروم"} مع عرض 2 + 1 (${bundleTotal(price)} درهم للثلاثة). التوصيل: من ${site.delivery.unitFee.min} إلى ${site.delivery.unitFee.max} درهمًا حسب المدينة.`)],
    });
  }

  for (const x of p.extraFaq) out.push({ q: x.q[locale], a: [x.a[locale]] });
  if (locale === "ar") out.splice(0, out.length, ...isolateAll(out));

  for (const id of ["sensitive", "pregnancy", "delay"]) out.push(faqById(locale, id));
  return out;
}

/** « le sérum… », « l'écran… », « la crème… » */
function articleLe(lower: string) {
  if (/^[aeéèiouh]/i.test(lower)) return `l'${lower}`;
  return /^(crème)/.test(lower) ? `la ${lower}` : `le ${lower}`;
}

/** Texte brut d'une réponse (JSON-LD, llms.txt). */
export const plain = (f: Faq) => f.a.join(" ").replace(/<[^>]+>/g, "");

