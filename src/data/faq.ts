/* Questions fréquentes. Les chiffres viennent de products.ts et site.ts : rien n'est écrit en double.
   Les réponses peuvent contenir <b>…</b> ; chaque élément du tableau `a` est un paragraphe. */
import { site, type L, type Locale } from "./site";
import { bundleTotal, bundleUnit, gamme, productByKey, yeuxPrice, type Product } from "./products";

export type Faq = { q: string; a: string[] };

const P = gamme.formats.petit, G = gamme.formats.grand;
const nb = (n: number) => n.toLocaleString("fr-FR").replace(/ /g, " ");
const ml = (k: Parameters<typeof productByKey>[0], f: "petit" | "grand") => productByKey(k).ml[f];

/** FAQ générale (page d'accueil, livraison). L'ordre est celui du chat de l'accueil. */
export const faq: Record<Locale, Faq[]> = {
  fr: [
    { q: "Je paie quand ?", a: ["À la livraison, en espèces, quand le livreur te remet ton colis.", "Rien à payer en ligne, pas besoin de carte bancaire."] },
    { q: "La livraison est payante ?", a: ["Non, elle est <b>offerte partout au Maroc</b>, quel que soit le format ou le nombre de gammes."] },
    { q: "Je suis livrée en combien de temps ?", a: [`Compte <b>${site.delivery.label.fr}</b>, partout au Maroc. On t'appelle d'abord pour confirmer ta commande.`] },
    { q: "C'est quoi l'offre 2 + 1 ?", a: ["Tu prends 2 gammes, la 3e est offerte.", `En Petit format : <b>${bundleUnit(P.price)} DH la gamme</b> au lieu de ${P.price} DH, soit ${nb(bundleTotal(P.price))} DH les 3. En Grand format : <b>${bundleUnit(G.price)} DH</b> au lieu de ${G.price} DH, soit ${nb(bundleTotal(G.price))} DH les 3.`] },
    { q: "Combien coûte la gamme anti-taches ?", a: [`Le Petit format coûte <b>${P.price} DH</b> la gamme au lieu de ${P.was} DH, le Grand format <b>${G.price} DH</b> au lieu de ${G.was} DH.`, `Avec l'offre 2 + 1, la gamme revient à ${bundleUnit(P.price)} DH en Petit format et à ${bundleUnit(G.price)} DH en Grand format. La livraison est offerte.`] },
    { q: "Qu'est-ce qu'il y a dans une gamme ?", a: ["Les 4 soins de la routine : gel nettoyant, sérum anti-taches, crème anti-taches et écran solaire SPF 50.", `En Grand format : gel ${ml("gel", "grand")} ml, sérum ${ml("serum", "grand")} ml, crème ${ml("creme", "grand")} ml et écran solaire ${ml("ecran", "grand")} ml. En Petit format : gel ${ml("gel", "petit")} ml, sérum ${ml("serum", "petit")} ml, crème ${ml("creme", "petit")} ml et écran solaire ${ml("ecran", "petit")} ml.`] },
    { q: "Comment j'utilise la routine ?", a: ["Le matin : gel nettoyant, sérum, crème, puis écran solaire.", "Le soir : les 3 premiers, sans écran solaire. Le sérum, c'est le cœur de la routine contre les taches."] },
    { q: "Quels sont les ingrédients actifs ?", a: ["Gel nettoyant : figue de Barbarie et louban, sans sulfate. Sérum anti-taches : alpha-arbutine, matcha et calendula. Crème anti-taches : niacinamide, acide hyaluronique et AHA.", "L'écran solaire SPF 50 offre une haute protection UVA/UVB."] },
    { q: "Je vois des résultats quand ?", a: ["Honnêtement : les taches s'estompent petit à petit, pas du jour au lendemain.", "Ce qui compte, c'est la régularité matin et soir, et l'écran solaire chaque matin. Sans protection, les taches reviennent. Le rythme varie d'une peau à l'autre."] },
    { q: "Pourquoi l'écran solaire est indispensable ?", a: ["Parce que sans protection, les taches reviennent.", "L'écran solaire SPF 50 protège des UVA et des UVB : applique-le chaque matin en dernier, et renouvelle-le toutes les 2 heures au soleil."] },
    { q: "J'ai la peau sensible", a: ["Fais d'abord un essai sur une petite zone, dans le pli du coude ou derrière l'oreille, et attends 24 h.", "En cas de rougeur ou d'irritation, arrête et demande conseil à un professionnel."] },
    { q: "Je suis enceinte ou j'allaite, je peux l'utiliser ?", a: ["Demande d'abord l'avis de ton médecin ou de ton pharmacien, en lui montrant la liste des ingrédients. C'est plus sûr."] },
    { q: "Le sérum contour des yeux, c'est pour qui ?", a: ["Pour les cernes et le contour des yeux fatigué. Il contient de l'aloe vera, de l'acide hyaluronique et de la caféine, en 15 ml, avec un applicateur bille.", `Il coûte ${yeuxPrice} DH, ou ${bundleUnit(yeuxPrice)} DH le sérum avec l'offre 2 + 1.`] },
    { q: "Et après ma commande ?", a: ["On t'appelle pour confirmer ta commande et ton adresse, puis ton colis part.", "Tu paies à la réception, c'est tout."] },
    { q: "Et si j'ai un problème avec ma commande ?", a: ["On accepte les réclamations pour un produit abîmé, une erreur de commande ou si tu n'es pas satisfaite.", "Les modalités de retour ou d'échange te sont précisées sur demande, sur WhatsApp."] },
    { q: "Vos soins sont fabriqués où ?", a: ["Au Maroc, avec des ingrédients comme la figue de Barbarie et le louban."] },
  ],
  /* À relire par un natif. Même ordre et mêmes informations que le français. */
  ar: [
    { q: "متى أدفع؟", a: ["عند الاستلام، نقدًا، حين يسلمك عامل التوصيل طردك.", "لا شيء يُدفع عبر الإنترنت، ولا حاجة لبطاقة بنكية."] },
    { q: "هل التوصيل مدفوع؟", a: ["لا، التوصيل <b>مجاني في كل أنحاء المغرب</b>، مهما كان الحجم أو عدد المجموعات."] },
    { q: "كم يستغرق التوصيل؟", a: [`<b>${site.delivery.label.ar}</b>، في كل أنحاء المغرب. نتصل بك أولًا لتأكيد طلبك.`] },
    { q: "ما هو عرض ⁦2 + 1⁩؟", a: ["تأخذين مجموعتين، والثالثة مجانًا.", `بالحجم الصغير: <b>${bundleUnit(P.price)} درهم للمجموعة</b> بدل ${P.price} درهم، أي ${nb(bundleTotal(P.price))} درهم للثلاث. بالحجم الكبير: <b>${bundleUnit(G.price)} درهم</b> بدل ${G.price} درهم، أي ${nb(bundleTotal(G.price))} درهم للثلاث.`] },
    { q: "كم ثمن مجموعة العناية ضد البقع؟", a: [`الحجم الصغير بـ <b>${P.price} درهم</b> للمجموعة بدل ${P.was} درهم، والحجم الكبير بـ <b>${G.price} درهم</b> بدل ${G.was} درهم.`, `مع عرض ⁦2 + 1⁩، تصبح المجموعة بـ ${bundleUnit(P.price)} درهم بالحجم الصغير و${bundleUnit(G.price)} درهم بالحجم الكبير. التوصيل مجاني.`] },
    { q: "ماذا تحتوي المجموعة؟", a: ["منتجات الروتين الأربعة: جل منظف، سيروم ضد البقع، كريم ضد البقع وواقي الشمس SPF 50.", `بالحجم الكبير: جل ${ml("gel", "grand")} مل، سيروم ${ml("serum", "grand")} مل، كريم ${ml("creme", "grand")} مل وواقي شمس ${ml("ecran", "grand")} مل. بالحجم الصغير: جل ${ml("gel", "petit")} مل، سيروم ${ml("serum", "petit")} مل، كريم ${ml("creme", "petit")} مل وواقي شمس ${ml("ecran", "petit")} مل.`] },
    { q: "كيف أستعمل الروتين؟", a: ["في الصباح: الجل المنظف، السيروم، الكريم، ثم واقي الشمس.", "في المساء: المنتجات الثلاثة الأولى، بدون واقي الشمس. السيروم هو قلب الروتين ضد البقع."] },
    { q: "ما هي المكونات الفعالة؟", a: ["الجل المنظف: التين الشوكي واللبان، بدون سلفات. سيروم ضد البقع: ألفا أربوتين، ماتشا وآذريون. كريم ضد البقع: نياسيناميد، حمض الهيالورونيك وأحماض AHA.", "واقي الشمس SPF 50 يوفر حماية عالية من UVA و UVB."] },
    { q: "متى أرى النتائج؟", a: ["بصراحة: البقع تخف شيئًا فشيئًا، وليس بين ليلة وضحاها.", "المهم هو الانتظام صباحًا ومساءً، وواقي الشمس كل صباح. بدون حماية، تعود البقع. الوتيرة تختلف من بشرة إلى أخرى."] },
    { q: "لماذا واقي الشمس ضروري؟", a: ["لأن البقع تعود بدون حماية.", "واقي الشمس SPF 50 يحمي من UVA و UVB: ضعيه كل صباح كآخر خطوة، وجدديه كل ساعتين تحت الشمس."] },
    { q: "بشرتي حساسة", a: ["جربي أولًا على منطقة صغيرة، في ثنية المرفق أو خلف الأذن، وانتظري 24 ساعة.", "في حال الاحمرار أو التهيج، توقفي واستشيري مختصًا."] },
    { q: "أنا حامل أو مرضعة، هل يمكنني استعماله؟", a: ["اسألي أولًا طبيبك أو الصيدلي، مع عرض قائمة المكونات عليه. هذا أكثر أمانًا."] },
    { q: "سيروم محيط العين، لمن هو؟", a: ["للهالات السوداء ومحيط العين المتعب. يحتوي على الألوفيرا، حمض الهيالورونيك والكافيين، في 15 مل، مع بكرة دوارة.", `ثمنه ${yeuxPrice} درهم، أو ${bundleUnit(yeuxPrice)} درهم للسيروم مع عرض ⁦2 + 1⁩.`] },
    { q: "وماذا بعد طلبي؟", a: ["نتصل بك لتأكيد طلبك وعنوانك، ثم يُرسل طردك.", "تدفعين عند الاستلام، وهذا كل شيء."] },
    { q: "وماذا لو كانت هناك مشكلة في طلبي؟", a: ["نقبل الشكايات في حال منتج متضرر، خطأ في الطلب أو إذا لم تكوني راضية.", "طريقة الإرجاع أو الاستبدال نوضحها لك عند الطلب، عبر واتساب."] },
    { q: "أين تُصنع منتجاتكم؟", a: ["في المغرب، بمكونات مثل التين الشوكي واللبان."] },
  ],
};

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
    const unit = p.unitPrice.petit;
    out.push({
      q: T(locale, "Quelle contenance et quel prix ?", "ما الحجم وما الثمن؟"),
      a: [
        T(locale, `${sizeFr}.${unit ? ` À l'unité, le Petit format coûte <b>${unit} DH</b>.` : ""}`, `${sizeAr}.${unit ? ` ثمن الحجم الصغير منفردًا <b>${unit} درهم</b>.` : ""}`),
        T(
          locale,
          `Dans la gamme anti-taches complète (4 soins) : ${P.price} DH en Petit format au lieu de ${P.was} DH, ${G.price} DH en Grand format au lieu de ${G.was} DH. Livraison offerte.`,
          `ضمن مجموعة العناية ضد البقع الكاملة (4 منتجات): ${P.price} درهم بالحجم الصغير بدل ${P.was} درهم، و${G.price} درهم بالحجم الكبير بدل ${G.was} درهم. التوصيل مجاني.`,
        ),
      ],
    });
  } else {
    out.push({
      q: T(locale, "Quelle contenance et quel prix ?", "ما الحجم وما الثمن؟"),
      a: [T(locale, `${p.ml.petit} ml. Il coûte <b>${yeuxPrice} DH</b>, ou ${bundleUnit(yeuxPrice)} DH le sérum avec l'offre 2 + 1 (${bundleTotal(yeuxPrice)} DH les 3). Livraison offerte.`, `${p.ml.petit} مل. ثمنه <b>${yeuxPrice} درهم</b>، أو ${bundleUnit(yeuxPrice)} درهم للسيروم مع عرض ⁦2 + 1⁩ (${bundleTotal(yeuxPrice)} درهم للثلاثة). التوصيل مجاني.`)],
    });
  }

  for (const x of p.extraFaq) out.push({ q: x.q[locale], a: [x.a[locale]] });

  const base = faq[locale];
  const find = (frQ: string, arQ: string) => base.find((x) => x.q === (locale === "ar" ? arQ : frQ));
  for (const x of [find("J'ai la peau sensible", "بشرتي حساسة"), find("Je suis enceinte ou j'allaite, je peux l'utiliser ?", "أنا حامل أو مرضعة، هل يمكنني استعماله؟"), find("Je suis livrée en combien de temps ?", "كم يستغرق التوصيل؟")]) if (x) out.push(x);
  return out;
}

/** « le sérum… », « l'écran… », « la crème… » */
function articleLe(lower: string) {
  if (/^[aeéèiouh]/i.test(lower)) return `l'${lower}`;
  return /^(crème)/.test(lower) ? `la ${lower}` : `le ${lower}`;
}

/** Texte brut d'une réponse (JSON-LD, llms.txt). */
export const plain = (f: Faq) => f.a.join(" ").replace(/<[^>]+>/g, "");

export type { L };
