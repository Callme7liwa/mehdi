/* Produits OTAGE : la seule source pour les prix (en dirhams, MAD), contenances et ingrédients.
   Les textes français viennent du site d'origine. Les textes arabes sont « À relire par un natif ». */
import type { L } from "./site";

export type ProductKey = "gel" | "serum" | "creme" | "ecran" | "yeux";
export type FormatKey = "petit" | "grand";
export type Img = { src: string; w: number; h: number; alt: L };
export type QA = { q: L; a: L };

export interface Product {
  key: ProductKey;
  slug: string;
  /** Ancre de la fiche sur la page d'accueil (liens historiques). */
  homeAnchor: string;
  no: string;
  /** Gamme dans laquelle le produit est vendu sur le site. */
  range: "taches" | "yeux";
  name: L;
  /** Autre nom courant du produit, s'il y en a un. */
  aka?: L;
  h1: L;
  metaTitle: L;
  metaDescription: L;
  lead: L;
  forWho: L;
  ingredients: L[];
  how: L;
  when: L;
  /** Étape dans la routine anti-taches (1 à 4), ou null. */
  step: number | null;
  /** Contenance en ml par format. */
  ml: Partial<Record<FormatKey, number>>;
  /** Prix à l'unité en DH par format. null = TODO, prix non communiqué. */
  unitPrice: Partial<Record<FormatKey, number | null>>;
  pack: Img;
  /** Grand visuel du flacon (fenêtre « Voir le soin »). */
  hd?: Img;
  photos: Img[];
  /** Pages « problèmes de peau » liées. */
  problems: string[];
  /** Question propre au produit, en plus des questions générées (usage, ingrédients, prix). */
  extraFaq: QA[];
}

const img = (file: string, w: number, h: number, fr: string, ar: string): Img => ({ src: `/images/${file}`, w, h, alt: { fr, ar } });

export const products: Product[] = [
  {
    key: "gel",
    slug: "gel-nettoyant",
    homeAnchor: "gel-nettoyant",
    no: "N° 01",
    range: "taches",
    name: { fr: "Gel nettoyant anti-taches", ar: "جل منظف ضد البقع" },
    h1: { fr: "Gel nettoyant anti-taches sans sulfate", ar: "جل منظف ضد البقع، خالٍ من السلفات" },
    metaTitle: { fr: "Gel nettoyant anti-taches sans sulfate, fabriqué au Maroc", ar: "جل منظف ضد البقع خالٍ من السلفات، مصنوع في المغرب" },
    metaDescription: {
      fr: "Gel nettoyant anti-taches OTAGE N°01 : figue de Barbarie, louban, sans sulfate. Nettoie en douceur sans dessécher. Fabriqué au Maroc, paiement à la livraison.",
      ar: "جل منظف ضد البقع من OTAGE رقم 01: التين الشوكي، اللبان، بدون سلفات. ينظف بلطف دون تجفيف البشرة. مصنوع في المغرب، الدفع عند الاستلام.",
    },
    lead: { fr: "Nettoie en douceur sans dessécher et prépare la peau à recevoir les soins.", ar: "ينظف بلطف دون تجفيف البشرة ويهيئها لاستقبال باقي العناية." },
    forWho: {
      fr: "Pour les peaux qui ont des taches brunes ou un teint irrégulier et qui cherchent un nettoyant doux, sans sulfate. C'est la première étape de la routine anti-taches, matin et soir.",
      ar: "للبشرة التي تعاني من بقع بنية أو لون غير موحد وتبحث عن منظف لطيف بدون سلفات. هو الخطوة الأولى في روتين العناية ضد البقع، صباحًا ومساءً.",
    },
    ingredients: [
      { fr: "Figue de Barbarie", ar: "التين الشوكي" },
      { fr: "Louban", ar: "اللبان" },
      { fr: "Sans sulfate", ar: "بدون سلفات" },
    ],
    how: { fr: "Matin et soir, sur peau humide. Masse 30 secondes, puis rince.", ar: "صباحًا ومساءً، على بشرة مبللة. دلّكي 30 ثانية ثم اشطفي." },
    when: { fr: "Matin et soir", ar: "صباحًا ومساءً" },
    step: 1,
    ml: { petit: 125, grand: 200 },
    unitPrice: { petit: 91, grand: null /* TODO : prix à l'unité du Grand format */ },
    pack: img("gel-nettoyant-anti-taches-n01-200ml.webp", 122, 480, "Gel nettoyant anti-taches OTAGE N°01", "جل منظف ضد البقع OTAGE رقم 01"),
    hd: img("gel-nettoyant-anti-taches-n01-hd.webp", 255, 1000, "Gel nettoyant anti-taches OTAGE N°01, 200 ml", "جل منظف ضد البقع OTAGE رقم 01، 200 مل"),
    photos: [
      img("cliente-gel-nettoyant-anti-taches.webp", 1000, 1000, "Une cliente souriante tend le gel nettoyant", "زبونة مبتسمة تحمل الجل المنظف"),
      img("gel-nettoyant-anti-taches-mains.webp", 747, 1000, "Le gel nettoyant tenu entre deux mains", "الجل المنظف بين يدين"),
    ],
    problems: ["taches-pigmentaires", "taches-acne"],
    extraFaq: [
      {
        q: { fr: "Le gel nettoyant dessèche-t-il la peau ?", ar: "هل يجفف الجل المنظف البشرة؟" },
        a: { fr: "Non : il nettoie en douceur sans dessécher. Il est formulé sans sulfate, avec de la figue de Barbarie et du louban.", ar: "لا: ينظف بلطف دون تجفيف. تركيبته خالية من السلفات وتحتوي على التين الشوكي واللبان." },
      },
    ],
  },
  {
    key: "serum",
    slug: "serum-anti-taches",
    homeAnchor: "serum",
    no: "N° 02",
    range: "taches",
    name: { fr: "Sérum anti-taches", ar: "سيروم ضد البقع" },
    h1: { fr: "Sérum anti-taches à l'alpha-arbutine, fabriqué au Maroc", ar: "سيروم ضد البقع بالألفا أربوتين، مصنوع في المغرب" },
    metaTitle: { fr: "Sérum anti-taches Maroc à l'alpha-arbutine", ar: "سيروم ضد البقع بالألفا أربوتين في المغرب" },
    metaDescription: {
      fr: "Sérum anti-taches OTAGE N°02 : alpha-arbutine, matcha, calendula. Le soin concentré qui cible les taches pigmentaires. Fabriqué au Maroc, paiement à la livraison.",
      ar: "سيروم ضد البقع من OTAGE رقم 02: ألفا أربوتين، ماتشا، آذريون. العناية المركزة التي تستهدف البقع الصبغية. مصنوع في المغرب، الدفع عند الاستلام.",
    },
    lead: { fr: "Le soin concentré de la gamme, qui cible les taches.", ar: "العناية المركزة في المجموعة، تستهدف البقع." },
    forWho: {
      fr: "Pour les taches brunes, les taches pigmentaires (hyperpigmentation) et le teint irrégulier. C'est le cœur de la routine contre les taches.",
      ar: "للبقع البنية، البقع الصبغية (فرط التصبغ) واللون غير الموحد. هو قلب روتين العناية ضد البقع.",
    },
    ingredients: [
      { fr: "Matcha", ar: "ماتشا" },
      { fr: "Calendula", ar: "آذريون (كاليندولا)" },
      { fr: "Alpha-arbutine", ar: "ألفا أربوتين" },
    ],
    how: { fr: "3 à 4 gouttes sur peau sèche, en tapotant du bout des doigts.", ar: "3 إلى 4 قطرات على بشرة جافة، مع التربيت بأطراف الأصابع." },
    when: { fr: "Matin et soir", ar: "صباحًا ومساءً" },
    step: 2,
    ml: { petit: 15, grand: 30 },
    unitPrice: { petit: 163, grand: null /* TODO */ },
    pack: img("serum-anti-taches-n02-30ml.webp", 183, 480, "Sérum anti-taches OTAGE N°02", "سيروم ضد البقع OTAGE رقم 02"),
    hd: img("serum-anti-taches-n02-hd.webp", 381, 1000, "Sérum anti-taches OTAGE N°02, 30 ml", "سيروم ضد البقع OTAGE رقم 02، 30 مل"),
    photos: [
      img("affiche-eclat-serum-anti-taches.webp", 664, 1000, "Affiche « Éclat » avec le sérum anti-taches", "ملصق «إشراقة» مع السيروم ضد البقع"),
      img("femme-serum-anti-taches.webp", 747, 1000, "Une femme tend le sérum anti-taches", "امرأة تحمل السيروم ضد البقع"),
    ],
    problems: ["taches-pigmentaires", "taches-acne", "melasma-grossesse"],
    extraFaq: [
      {
        q: { fr: "Au bout de combien de temps voit-on des résultats ?", ar: "متى تظهر النتائج؟" },
        a: {
          fr: "Honnêtement : les taches s'estompent petit à petit, pas du jour au lendemain. Ce qui compte, c'est la régularité matin et soir, et l'écran solaire chaque matin. Le rythme varie d'une peau à l'autre.",
          ar: "بصراحة: البقع تخف تدريجيًا، وليس بين ليلة وضحاها. المهم هو الانتظام صباحًا ومساءً، وواقي الشمس كل صباح. الوتيرة تختلف من بشرة إلى أخرى.",
        },
      },
    ],
  },
  {
    key: "creme",
    slug: "creme-anti-taches",
    homeAnchor: "creme",
    no: "N° 03",
    range: "taches",
    name: { fr: "Crème anti-taches", ar: "كريم ضد البقع" },
    aka: { fr: "crème éclaircissante", ar: "كريم مفتّح" },
    h1: { fr: "Crème anti-taches à la niacinamide, fabriquée au Maroc", ar: "كريم ضد البقع بالنياسيناميد، مصنوع في المغرب" },
    metaTitle: { fr: "Crème anti-taches Maroc à la niacinamide", ar: "كريم ضد البقع بالنياسيناميد في المغرب" },
    metaDescription: {
      fr: "Crème anti-taches OTAGE N°03 : niacinamide, acide hyaluronique, AHA. Hydrate, unifie le teint et scelle le sérum. Fabriquée au Maroc, paiement à la livraison.",
      ar: "كريم ضد البقع من OTAGE رقم 03: نياسيناميد، حمض الهيالورونيك، AHA. يرطب، يوحد لون البشرة ويثبت السيروم. مصنوع في المغرب، الدفع عند الاستلام.",
    },
    lead: { fr: "Hydrate, unifie le teint et scelle le sérum.", ar: "يرطب، يوحد لون البشرة ويثبت السيروم." },
    forWho: {
      fr: "Pour les peaux au teint irrégulier ou marquées par des taches, qui veulent hydrater et unifier le teint après le sérum. On l'appelle aussi crème éclaircissante.",
      ar: "للبشرة ذات اللون غير الموحد أو التي بها بقع، لترطيبها وتوحيد لونها بعد السيروم. يسمى أيضًا كريمًا مفتّحًا.",
    },
    ingredients: [
      { fr: "Niacinamide", ar: "نياسيناميد" },
      { fr: "Acide hyaluronique", ar: "حمض الهيالورونيك" },
      { fr: "AHA", ar: "أحماض AHA" },
    ],
    how: { fr: "Une noisette sur le visage et le cou, en mouvements vers le haut.", ar: "كمية صغيرة على الوجه والرقبة، بحركات نحو الأعلى." },
    when: { fr: "Matin et soir", ar: "صباحًا ومساءً" },
    step: 3,
    ml: { petit: 30, grand: 50 },
    unitPrice: { petit: 130, grand: null /* TODO */ },
    pack: img("creme-anti-taches-n03-50ml.webp", 117, 480, "Crème anti-taches OTAGE N°03", "كريم ضد البقع OTAGE رقم 03"),
    hd: img("creme-anti-taches-n03-hd.webp", 243, 1000, "Crème anti-taches OTAGE N°03, 50 ml", "كريم ضد البقع OTAGE رقم 03، 50 مل"),
    photos: [img("panneau-ton-teint-revele-creme-anti-taches.webp", 747, 1000, "Panneau publicitaire « Ton teint, révélé » avec la crème anti-taches", "لوحة إعلانية «لون بشرتك، كما هو» مع الكريم ضد البقع")],
    problems: ["taches-pigmentaires", "taches-acne", "melasma-grossesse"],
    extraFaq: [
      {
        q: { fr: "Faut-il appliquer la crème avant ou après le sérum ?", ar: "هل يوضع الكريم قبل السيروم أم بعده؟" },
        a: { fr: "Après. La crème est l'étape 3 de la routine : elle hydrate, unifie le teint et scelle le sérum appliqué juste avant.", ar: "بعده. الكريم هو الخطوة 3 في الروتين: يرطب، يوحد لون البشرة ويثبت السيروم الموضوع قبله." },
      },
    ],
  },
  {
    key: "ecran",
    slug: "ecran-solaire-spf50",
    homeAnchor: "ecran-solaire",
    no: "N° 04",
    range: "taches",
    name: { fr: "Écran solaire SPF 50", ar: "واقي الشمس SPF 50" },
    h1: { fr: "Écran solaire SPF 50, haute protection UVA/UVB", ar: "واقي الشمس SPF 50، حماية عالية من UVA و UVB" },
    metaTitle: { fr: "Écran solaire SPF 50 anti-taches, fabriqué au Maroc", ar: "واقي الشمس SPF 50 ضد البقع، مصنوع في المغرب" },
    metaDescription: {
      fr: "Écran solaire OTAGE N°04 : SPF 50, haute protection UVA/UVB, pour que les taches ne reviennent pas. Dernière étape de la routine du matin. Fabriqué au Maroc.",
      ar: "واقي الشمس من OTAGE رقم 04: SPF 50، حماية عالية من UVA و UVB، حتى لا تعود البقع. آخر خطوة في روتين الصباح. مصنوع في المغرب.",
    },
    lead: { fr: "Protège des UVA et des UVB pour que les taches ne reviennent pas.", ar: "يحمي من أشعة UVA و UVB حتى لا تعود البقع." },
    forWho: {
      fr: "Pour toutes celles qui suivent une routine anti-taches : sans protection solaire, les taches reviennent. C'est la dernière étape du matin.",
      ar: "لكل من تتبع روتينًا ضد البقع: بدون حماية من الشمس، تعود البقع. هو آخر خطوة في الصباح.",
    },
    ingredients: [
      { fr: "Haute protection", ar: "حماية عالية" },
      { fr: "UVA/UVB", ar: "UVA/UVB" },
    ],
    how: { fr: "Le matin, en dernier. Renouvelle toutes les 2 heures au soleil.", ar: "في الصباح، كآخر خطوة. جدديه كل ساعتين تحت الشمس." },
    when: { fr: "Le matin", ar: "في الصباح" },
    step: 4,
    ml: { petit: 30, grand: 50 },
    unitPrice: { petit: 112, grand: null /* TODO */ },
    pack: img("ecran-solaire-spf50-n04-50ml.webp", 117, 480, "Écran solaire SPF 50 OTAGE N°04", "واقي الشمس SPF 50 من OTAGE رقم 04"),
    hd: img("ecran-solaire-spf50-n04-hd.webp", 245, 1000, "Écran solaire SPF 50 OTAGE N°04, 50 ml", "واقي الشمس SPF 50 من OTAGE رقم 04، 50 مل"),
    photos: [img("ecran-solaire-spf50-plage-bouee.webp", 1000, 1000, "L'écran solaire à la plage, à travers une bouée", "واقي الشمس على الشاطئ، من خلال عوامة")],
    problems: ["taches-pigmentaires", "melasma-grossesse", "taches-acne"],
    extraFaq: [
      {
        q: { fr: "Pourquoi l'écran solaire est-il indispensable contre les taches ?", ar: "لماذا واقي الشمس ضروري ضد البقع؟" },
        a: {
          fr: "Parce que sans protection, les taches reviennent. L'écran solaire SPF 50 protège des UVA et des UVB : applique-le chaque matin en dernier, et renouvelle-le toutes les 2 heures au soleil.",
          ar: "لأن البقع تعود بدون حماية. واقي الشمس SPF 50 يحمي من UVA و UVB: ضعيه كل صباح كآخر خطوة، وجدديه كل ساعتين تحت الشمس.",
        },
      },
      {
        q: { fr: "Faut-il le mettre le soir ?", ar: "هل يوضع في المساء؟" },
        a: { fr: "Non. Le soir, la routine s'arrête à l'étape 3 (la crème).", ar: "لا. في المساء، يتوقف الروتين عند الخطوة 3 (الكريم)." },
      },
    ],
  },
  {
    key: "yeux",
    slug: "contour-des-yeux",
    homeAnchor: "contour-des-yeux",
    no: "N° 05",
    range: "yeux",
    name: { fr: "Sérum contour des yeux", ar: "سيروم محيط العين" },
    h1: { fr: "Sérum contour des yeux à la caféine, pour les cernes", ar: "سيروم محيط العين بالكافيين، للهالات السوداء" },
    metaTitle: { fr: "Sérum contour des yeux pour les cernes, à la caféine", ar: "سيروم محيط العين بالكافيين للهالات السوداء" },
    metaDescription: {
      fr: "Sérum contour des yeux OTAGE N°05, 15 ml, applicateur bille : caféine, acide hyaluronique, aloe vera. Pour les cernes et le regard fatigué. Fabriqué au Maroc.",
      ar: "سيروم محيط العين من OTAGE رقم 05، 15 مل، بكرة دوارة: كافيين، حمض الهيالورونيك، ألوفيرا. للهالات السوداء ومحيط العين المتعب. مصنوع في المغرب.",
    },
    lead: { fr: "Un applicateur bille pour le contour de l'œil. Une texture légère qui se glisse sous le maquillage, matin et soir.", ar: "بكرة دوارة لمحيط العين. قوام خفيف يوضع تحت المكياج، صباحًا ومساءً." },
    forWho: { fr: "Pour les cernes et le contour des yeux fatigué.", ar: "للهالات السوداء ومحيط العين المتعب." },
    ingredients: [
      { fr: "Aloe vera", ar: "ألوفيرا" },
      { fr: "Acide hyaluronique", ar: "حمض الهيالورونيك" },
      { fr: "Caféine", ar: "كافيين" },
    ],
    how: { fr: "Passe la bille sous l'œil, de l'intérieur vers l'extérieur, puis tapote doucement.", ar: "مرري البكرة تحت العين، من الداخل إلى الخارج، ثم ربّتي بلطف." },
    when: { fr: "Matin et soir", ar: "صباحًا ومساءً" },
    step: null,
    ml: { petit: 15 },
    unitPrice: { petit: 130 },
    pack: img("serum-contour-des-yeux-n05-15ml.webp", 177, 700, "Sérum contour des yeux OTAGE N°05, 15 ml", "سيروم محيط العين OTAGE رقم 05، 15 مل"),
    photos: [img("serum-contour-des-yeux-n05-application.webp", 600, 803, "Sérum contour des yeux N°05 tenu près du visage", "سيروم محيط العين رقم 05 قرب الوجه")],
    problems: ["cernes"],
    extraFaq: [
      {
        q: { fr: "Peut-on le mettre sous le maquillage ?", ar: "هل يمكن وضعه تحت المكياج؟" },
        a: { fr: "Oui : sa texture légère se glisse sous le maquillage, matin et soir.", ar: "نعم: قوامه الخفيف يوضع تحت المكياج، صباحًا ومساءً." },
      },
    ],
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const productByKey = (key: ProductKey) => products.find((p) => p.key === key)!;
export const rangeProducts = products.filter((p) => p.range === "taches");

/* ---------- Ce qui se commande sur le site ---------- */

/** La gamme anti-taches : les 4 soins vendus ensemble, en deux formats. `was` = prix boutique (somme des prix à l'unité). */
export const gamme = {
  name: { fr: "Gamme anti-taches", ar: "مجموعة العناية ضد البقع" } as L,
  formats: {
    petit: { label: { fr: "Petit format", ar: "الحجم الصغير" } as L, price: 299, was: 496 },
    grand: { label: { fr: "Grand format", ar: "الحجم الكبير" } as L, price: 599, was: 815 },
  } satisfies Record<FormatKey, { label: L; price: number; was: number }>,
  photos: [
    img("gamme-anti-taches-otage-trousse.webp", 1100, 1100, "La gamme anti-taches OTAGE dans sa trousse", "مجموعة العناية ضد البقع من OTAGE في حقيبتها"),
    img("gamme-anti-taches-4-soins-papier-rouge.webp", 1000, 1000, "Les 4 soins tenus par des mains à travers un papier rouge", "المنتجات الأربعة بين أيدٍ من خلال ورق أحمر"),
    img("flacons-otage-trousse.webp", 1000, 1000, "Une pluie de flacons OTAGE sort d'une trousse", "عبوات OTAGE تخرج من حقيبة"),
  ],
};

/** Offre 2 + 1 : pour 2 achetés, le 3e est offert. */
export const bundle = { buy: 2, free: 1 };
/** Prix par article avec l'offre 2 + 1 (même arrondi que le ticket du site). */
export const bundleUnit = (price: number) => Math.round((price * bundle.buy) / (bundle.buy + bundle.free));
export const bundleTotal = (price: number) => price * bundle.buy;

/** Prix du sérum contour des yeux, vendu seul. */
export const yeuxPrice = productByKey("yeux").unitPrice.petit as number;

export const fmtMl = (v?: number) => (v ? `${v} ml` : "");
