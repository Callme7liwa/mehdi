/* Produits OTAGE : la seule source pour les prix (en dirhams, MAD), contenances et ingrédients.
   Les textes français viennent du site d'origine. Les textes arabes sont « À relire par un natif ». */
import { isolateAr } from "../lib/bidi";
import type { L } from "./site";

export type ProductKey = "gel" | "serum" | "creme" | "ecran" | "yeux" | "deo";
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
  range: "taches" | "yeux" | "corps";
  name: L;
  h1: L;
  metaTitle: L;
  metaDescription: L;
  lead: L;
  /** Bénéfice en 8 mots max : cartes produits de l'accueil (« À l'unité ») et de /soins. */
  benefit: L;
  forWho: L;
  ingredients: L[];
  how: L;
  when: L;
  /** Étape dans la routine anti-taches (1 à 4), ou null. */
  step: number | null;
  /** Contenance en ml par format. */
  ml: Partial<Record<FormatKey, number>>;
  /** Numéro d'enregistrement du produit à la DMP (Direction du médicament et de la pharmacie).
      TODO : à fournir par le client pour chaque soin. Tant qu'il est absent, la fiche ne l'affiche pas. */
  dmp?: string | null;
  /** Prix à l'unité en DH par format. */
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

export const products: Product[] = isolateAr([
  {
    key: "gel",
    slug: "gel-nettoyant",
    homeAnchor: "gel-nettoyant",
    no: "N° 01",
    range: "taches",
    name: { fr: "Gel nettoyant anti-taches", ar: "جل منظف ضد البقع" },
    h1: { fr: "Gel nettoyant anti-taches sans sulfate", ar: "جل منظف ضد البقع، خالٍ من السلفات" },
    metaTitle: { fr: "Gel nettoyant anti-taches sans sulfate", ar: "جل منظف ضد البقع خالٍ من السلفات، مصنوع في المغرب" },
    metaDescription: {
      fr: "Gel nettoyant anti-taches sans sulfate, à la figue de Barbarie et au louban. Dès {prix} DH, livré en 24 à 72 h partout au Maroc, payé à la livraison.",
      ar: "جل منظف ضد البقع من OTAGE رقم 01: التين الشوكي، اللبان، بدون سلفات. ينظف بلطف دون تجفيف البشرة. مصنوع في المغرب، الدفع عند الاستلام.",
    },
    lead: { fr: "Nettoie en douceur sans dessécher et prépare la peau à recevoir les soins.", ar: "ينظف بلطف دون تجفيف البشرة ويهيئها لاستقبال باقي العناية." },
    benefit: { fr: "Nettoie sans dessécher", ar: "ينظف دون تجفيف البشرة" },
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
    unitPrice: { petit: 91, grand: 140 },
    pack: img("gel-nettoyant-anti-taches-n01-200ml.webp", 122, 480, "Gel nettoyant anti-taches OTAGE N°01", "جل منظف ضد البقع OTAGE رقم 01"),
    hd: img("gel-nettoyant-anti-taches-n01-hd.webp", 255, 1000, "Gel nettoyant anti-taches OTAGE N°01, 200 ml", "جل منظف ضد البقع OTAGE رقم 01، 200 مل"),
    photos: [
      img("cliente-gel-nettoyant-anti-taches.webp", 1600, 1600, "Une cliente souriante tend le gel nettoyant", "زبونة مبتسمة تحمل الجل المنظف"),
      img("gel-nettoyant-anti-taches-mains.webp", 1195, 1600, "Le gel nettoyant tenu entre deux mains", "الجل المنظف بين يدين"),
      img("gel-nettoyant-anti-taches-n01-fond-blanc.webp", 1092, 1092, "Gel nettoyant anti-taches OTAGE N°01, flacon sur fond blanc", "جل منظف ضد البقع OTAGE رقم 01 على خلفية بيضاء"),
    ],
    problems: ["taches-pigmentaires", "taches-acne"],
    extraFaq: [
      {
        q: { fr: "Le gel nettoyant dessèche-t-il la peau ?", ar: "هل يجفف الجل المنظف البشرة؟" },
        a: { fr: "Non : il est sans sulfate, avec figue de Barbarie et louban.", ar: "لا: هو بدون سلفات، بالتين الشوكي واللبان." },
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
      fr: "Sérum anti-taches OTAGE N°02 : alpha-arbutine, matcha, calendula. Le soin concentré qui cible les taches pigmentaires. Fabriqué au Maroc, payé à la livraison.",
      ar: "سيروم ضد البقع من OTAGE رقم 02: ألفا أربوتين، ماتشا، آذريون. العناية المركزة التي تستهدف البقع الصبغية. مصنوع في المغرب، الدفع عند الاستلام.",
    },
    lead: { fr: "Le soin concentré de la gamme, qui cible les taches.", ar: "العناية المركزة في المجموعة، تستهدف البقع." },
    benefit: { fr: "Atténue les taches brunes", ar: "يخفف البقع البنية" },
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
    unitPrice: { petit: 163, grand: 265 },
    pack: img("serum-anti-taches-n02-30ml.webp", 183, 480, "Sérum anti-taches OTAGE N°02", "سيروم ضد البقع OTAGE رقم 02"),
    hd: img("serum-anti-taches-n02-hd.webp", 381, 1000, "Sérum anti-taches OTAGE N°02, 30 ml", "سيروم ضد البقع OTAGE رقم 02، 30 مل"),
    photos: [
      img("affiche-eclat-serum-anti-taches.webp", 664, 1000, "Affiche « Éclat » avec le sérum anti-taches", "ملصق «إشراقة» مع السيروم ضد البقع"),
      img("femme-serum-anti-taches.webp", 1195, 1600, "Une femme tend le sérum anti-taches", "امرأة تحمل السيروم ضد البقع"),
      img("serum-anti-taches-n02-fond-blanc.webp", 1092, 1092, "Sérum anti-taches OTAGE N°02, flacon sur fond blanc", "سيروم ضد البقع OTAGE رقم 02 على خلفية بيضاء"),
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
    h1: { fr: "Crème anti-taches à la niacinamide, fabriquée au Maroc", ar: "كريم ضد البقع بالنياسيناميد، مصنوع في المغرب" },
    metaTitle: { fr: "Crème anti-taches Maroc à la niacinamide", ar: "كريم ضد البقع بالنياسيناميد في المغرب" },
    metaDescription: {
      fr: "Crème anti-taches OTAGE N°03 : niacinamide, acide hyaluronique, AHA. Hydrate, unifie le teint et scelle le sérum. Fabriquée au Maroc, paiement à la livraison.",
      ar: "كريم ضد البقع من OTAGE رقم 03: نياسيناميد، حمض الهيالورونيك، AHA. يرطب، يوحد لون البشرة ويثبت السيروم. مصنوع في المغرب، الدفع عند الاستلام.",
    },
    lead: { fr: "Hydrate, unifie le teint et scelle le sérum.", ar: "يرطب، يوحد لون البشرة ويثبت السيروم." },
    benefit: { fr: "Hydrate et unifie le teint", ar: "يرطب ويوحد لون البشرة" },
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
    unitPrice: { petit: 130, grand: 205 },
    pack: img("creme-anti-taches-n03-50ml.webp", 117, 480, "Crème anti-taches OTAGE N°03", "كريم ضد البقع OTAGE رقم 03"),
    hd: img("creme-anti-taches-n03-hd.webp", 243, 1000, "Crème anti-taches OTAGE N°03, 50 ml", "كريم ضد البقع OTAGE رقم 03، 50 مل"),
    photos: [
      img("panneau-ton-teint-revele-creme-anti-taches.webp", 1195, 1600, "Panneau publicitaire « Ton teint, révélé » avec la crème anti-taches", "لوحة إعلانية «لون بشرتك، كما هو» مع الكريم ضد البقع"),
      img("creme-anti-taches-n03-fond-blanc.webp", 1092, 1092, "Crème anti-taches OTAGE N°03, flacon sur fond blanc", "كريم ضد البقع OTAGE رقم 03 على خلفية بيضاء"),
    ],
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
    benefit: { fr: "Limite le retour des taches", ar: "يحد من عودة البقع" },
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
    unitPrice: { petit: 112, grand: 190 },
    pack: img("ecran-solaire-spf50-n04-50ml.webp", 117, 480, "Écran solaire SPF 50 OTAGE N°04", "واقي الشمس SPF 50 من OTAGE رقم 04"),
    hd: img("ecran-solaire-spf50-n04-hd.webp", 245, 1000, "Écran solaire SPF 50 OTAGE N°04, 50 ml", "واقي الشمس SPF 50 من OTAGE رقم 04، 50 مل"),
    photos: [
      img("ecran-solaire-spf50-plage-bouee.webp", 1600, 1600, "L'écran solaire à la plage, à travers une bouée", "واقي الشمس على الشاطئ، من خلال عوامة"),
      img("ecran-solaire-spf50-n04-fond-blanc.webp", 1092, 1092, "Écran solaire SPF 50 OTAGE N°04, flacon sur fond blanc", "واقي الشمس SPF 50 من OTAGE رقم 04 على خلفية بيضاء"),
    ],
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
    benefit: { fr: "Atténue l'aspect des cernes", ar: "يخفف مظهر الهالات السوداء" },
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
    unitPrice: { petit: 185 },
    pack: img("serum-contour-des-yeux-n05-15ml.webp", 227, 896, "Sérum contour des yeux OTAGE N°05, 15 ml", "سيروم محيط العين OTAGE رقم 05، 15 مل"),
    hd: img("serum-contour-des-yeux-n05-hd.webp", 170, 1000, "Sérum contour des yeux OTAGE N°05, 15 ml", "سيروم محيط العين OTAGE رقم 05، 15 مل"),
    photos: [img("serum-contour-des-yeux-n05-application.webp", 1195, 1600, "Sérum contour des yeux N°05 tenu près du visage", "سيروم محيط العين رقم 05 قرب الوجه")],
    problems: ["cernes"],
    extraFaq: [
      {
        q: { fr: "Peut-on le mettre sous le maquillage ?", ar: "هل يمكن وضعه تحت المكياج؟" },
        a: { fr: "Oui : sa texture légère se glisse sous le maquillage, matin et soir.", ar: "نعم: قوامه الخفيف يوضع تحت المكياج، صباحًا ومساءً." },
      },
    ],
  },
  {
    key: "deo",
    slug: "deodorant-creme",
    homeAnchor: "deodorant",
    no: "N° 06",
    range: "corps",
    name: { fr: "Déodorant crème", ar: "مزيل العرق كريم" },
    h1: { fr: "Déodorant crème sans sels d'aluminium", ar: "مزيل عرق كريم بدون أملاح الألمنيوم" },
    metaTitle: { fr: "Déodorant crème sans aluminium, fabriqué au Maroc", ar: "مزيل عرق كريم بدون ألمنيوم، مصنوع في المغرب" },
    metaDescription: {
      fr: "Déodorant crème OTAGE N°06 : sans sels d'aluminium, 5 ingrédients. Offre 2 + 1, paiement à la livraison partout au Maroc.",
      ar: "مزيل العرق كريم من OTAGE رقم 06: بدون أملاح الألمنيوم، 5 مكونات. عرض 2 + 1، الدفع عند الاستلام في كل المغرب.",
    },
    lead: { fr: "Un baume fondant qui s'occupe des odeurs. Cinq ingrédients, rien d'autre.", ar: "بلسم ذائب يعتني بالروائح. خمسة مكونات، لا شيء غيرها." },
    benefit: { fr: "Agit sur les odeurs, sans aluminium", ar: "يعمل على الروائح، بدون ألمنيوم" },
    forWho: {
      fr: "Pour celles et ceux qui veulent un déodorant sans sels d'aluminium, qui agit sur les odeurs sans bloquer la transpiration.",
      ar: "لمن يبحث عن مزيل عرق بدون أملاح الألمنيوم، يعمل على الروائح دون أن يمنع التعرق.",
    },
    ingredients: [
      { fr: "Oxyde de zinc", ar: "أكسيد الزنك" },
      { fr: "Huile de coco", ar: "زيت جوز الهند" },
      { fr: "Huile de jojoba", ar: "زيت الجوجوبا" },
      { fr: "Cire d'abeille", ar: "شمع العسل" },
      { fr: "Vitamine E", ar: "فيتامين E" },
    ],
    how: { fr: "Prends un peu de baume du bout du doigt, laisse-le fondre puis applique-le sur l'aisselle propre et sèche.", ar: "خذي قليلًا من البلسم بطرف الإصبع، اتركيه يذوب ثم ضعيه على إبط نظيف وجاف." },
    when: { fr: "Le matin", ar: "في الصباح" },
    step: null,
    ml: { petit: 50 },
    unitPrice: { petit: 85 },
    pack: img("deodorant-creme-n06-pot.webp", 618, 700, "Déodorant crème OTAGE N°06, pot de 50 ml", "مزيل العرق كريم OTAGE رقم 06، علبة 50 مل"),
    photos: [
      img("deodorant-creme-n06-mains.webp", 791, 1400, "Le pot de déodorant crème OTAGE ouvert, tenu à deux mains, un doigt dans le baume", "علبة مزيل العرق كريم OTAGE مفتوحة بين يدين، وإصبع في البلسم"),
      img("deodorant-creme-n06-etiquette.webp", 880, 960, "L'étiquette du pot : oxyde de zinc, huile de coco, huile de jojoba, 50 ml", "ملصق العلبة: أكسيد الزنك، زيت جوز الهند، زيت الجوجوبا، 50 مل"),
    ],
    problems: [],
    extraFaq: [
      {
        q: { fr: "Est-ce qu'il bloque la transpiration ?", ar: "هل يمنع التعرق؟" },
        a: { fr: "Non. Sans sels d'aluminium, il ne bloque pas la transpiration : il agit sur les odeurs. Transpirer est normal.", ar: "لا. بدون أملاح الألمنيوم، لا يمنع التعرق: يعمل على الروائح. التعرق أمر طبيعي." },
      },
    ],
  },
]);

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const productByKey = (key: ProductKey) => products.find((p) => p.key === key)!;
export const rangeProducts = products.filter((p) => p.range === "taches");

/* ---------- Ce qui se commande sur le site ---------- */

/** Somme des prix à l'unité des 4 soins de la gamme, dans un format : le prix « boutique » de la gamme. */
const unitSum = (f: FormatKey) => rangeProducts.reduce((sum, p) => sum + (p.unitPrice[f] ?? 0), 0);

/** La gamme anti-taches : les mêmes 4 soins vendus ensemble, en deux formats (seules les contenances changent).
    `was` = prix des 4 soins achetés à l'unité ; l'économie (was − price) n'est écrite nulle part, elle se calcule. */
export const gamme = {
  name: { fr: "Gamme anti-taches", ar: "مجموعة العناية ضد البقع" } as L,
  formats: {
    petit: { label: { fr: "Petit format", ar: "الحجم الصغير" } as L, price: 299, was: unitSum("petit") },
    grand: { label: { fr: "Grand format", ar: "الحجم الكبير" } as L, price: 599, was: unitSum("grand") },
  } satisfies Record<FormatKey, { label: L; price: number; was: number }>,
  photos: [
    img("gamme-anti-taches-otage-trousse.webp", 1600, 1600, "La gamme anti-taches OTAGE dans sa trousse", "مجموعة العناية ضد البقع من OTAGE في حقيبتها"),
    img("gamme-anti-taches-4-soins-papier-rouge.webp", 1600, 1600, "Les 4 soins tenus par des mains à travers un papier rouge", "المنتجات الأربعة بين أيدٍ من خلال ورق أحمر"),
    img("flacons-otage-trousse.webp", 1600, 1600, "Une pluie de flacons OTAGE sort d'une trousse", "عبوات OTAGE تخرج من حقيبة"),
  ],
};

/** Offre 2 + 1 : pour 2 achetés, le 3e est offert. */
export const bundle = { buy: 2, free: 1 };
/** Prix par article avec l'offre 2 + 1 (même arrondi que le ticket du site). */
export const bundleUnit = (price: number) => Math.round((price * bundle.buy) / (bundle.buy + bundle.free));
export const bundleTotal = (price: number) => price * bundle.buy;

/** Prix du sérum contour des yeux, vendu seul. */
export const yeuxPrice = productByKey("yeux").unitPrice.petit as number;
/** Soins vendus en format unique avec l'offre 2 + 1 à l'unité : pour 2 achetés, le 3e est offert (sérum contour des yeux, déodorant). */
export const bundleKeys: ProductKey[] = ["yeux", "deo"];
export const hasBundle = (key: ProductKey) => bundleKeys.includes(key);
/** Articles offerts pour une quantité donnée d'un soin à offre 2 + 1 : 1 tous les 3. */
export const freeCount = (key: ProductKey, qty: number) => (hasBundle(key) ? Math.floor(qty / (bundle.buy + bundle.free)) * bundle.free : 0);

export const fmtMl = (v?: number) => (v ? `${v} ml` : "");

/** Prix le plus bas d'un soin vendu à l'unité. */
export const lowestPrice = (p: Product) => Math.min(...(["petit", "grand"] as const).filter((f) => p.unitPrice[f]).map((f) => p.unitPrice[f] as number));
/** Meta description d'un soin : « {prix} » et « {lot} » (3 avec l'offre 2 + 1) sont remplacés par les prix de ce fichier. */
export const productDescription = (p: Product, locale: "fr" | "ar") =>
  p.metaDescription[locale].replace(/\{prix\}/g, String(lowestPrice(p))).replace(/\{lot\}/g, String(bundleTotal(lowestPrice(p))));
/** « le gel nettoyant anti-taches », « l'écran solaire SPF 50 », « la crème anti-taches » (français) ; le nom seul en arabe. */
export const nameWithArticle = (p: Product, locale: "fr" | "ar") => {
  if (locale === "ar") return p.name.ar;
  const lower = p.name.fr.charAt(0).toLowerCase() + p.name.fr.slice(1);
  if (/^[aeéèiouh]/i.test(lower)) return `l'${lower}`;
  return /^crème/.test(lower) ? `la ${lower}` : `le ${lower}`;
};

/** Liste des ingrédients en une phrase : « figue de Barbarie, louban, sans sulfate » (les sigles gardent leurs majuscules). */
export const ingredientList = (p: Product, locale: "fr" | "ar" = "fr") =>
  p.ingredients.map((i) => (locale === "fr" && !/^[A-Z]{2}/.test(i.fr) ? i.fr.charAt(0).toLowerCase() + i.fr.slice(1) : i[locale])).join(locale === "ar" ? "، " : ", ");

/** Économie réalisée en prenant la gamme plutôt que les 4 soins à l'unité, dans un format. */
export const gammeSaving = (f: FormatKey) => gamme.formats[f].was - gamme.formats[f].price;
/** Les formats dans lesquels un soin se vend à l'unité (contenance et prix connus). */
export const unitFormats = (p: Product) => (["petit", "grand"] as const).filter((f) => p.ml[f] && p.unitPrice[f]);
