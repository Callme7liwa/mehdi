/* Pages « conseils peau » en arabe : /ar/cernes, /ar/taches-acne.
   /ar/cernes traduit la page française actuelle. /ar/taches-acne traduit l'ANCIENNE version française (avant le guide
   du 17 octobre 2026) : à retraduire à partir de src/data/guides.ts avant de rendre l'arabe indexable.
   Une page française sans texte arabe ici (le pilier et les autres guides, pour l'instant) n'a pas de version arabe :
   pas de /ar/…, pas de hreflang, et les liens arabes vers elle sont retirés (voir hasArProblem).
   Aucune page arabe ne porte de statut (« Relu par » ou mention de l'équipe) : seuls les textes français sont approuvés.
   TOUS LES TEXTES DE CE FICHIER SONT « À RELIRE PAR UN NATIF » (et, comme le français, par un dermatologue
   ou un pharmacien). Aucune promesse médicale. */
import { isolateAll, isolateAr } from "../lib/bidi";
import { problems, type ProblemPage } from "./problems";
import type { ProductKey } from "./products";

// la page arabe garde ses propres soins (la page française peut avoir changé) ; ni statut, ni encadrés, ni sources du français
type Ar = Omit<ProblemPage, "slug" | "image" | "routine" | "products" | "reviewed" | "editorial" | "essentials" | "maroc" | "solution" | "sources" | "noSale" | "pharmacistNote">
  & { products: { key: ProductKey; why: string }[]; routine: boolean };

const ar: Record<string, Ar> = {
  /* ------------------------------------------------------------------ À relire par un natif : /ar/cernes */
  cernes: {
    label: "الهالات السوداء",
    h1: "الهالات السوداء: الأسباب والخطوات لنظرة مرتاحة",
    metaTitle: "الهالات السوداء: الأسباب وعناية محيط العين | OTAGE",
    metaDescription: "الهالات السوداء: من أين تأتي، الخطوات التي تساعد، وكيف تضعين سيروم محيط العين بالكافيين. نصائح بسيطة وواضحة، بدون وعود مبالغ فيها، من علامة OTAGE المغربية.",
    intro: ["الهالات تأتي من الوراثة أو التعب أو رقة البشرة أو الصبغة. النوم والحماية من الشمس وعناية محيط العين تساعد على تخفيفها."],
    sections: [
      {
        h2: "لماذا تظهر الهالات السوداء؟",
        body: [{ list: ["الوراثة: بعض العائلات محيط عينها أغمق.", "التعب: البشرة تبهت، فتظهر الهالات أكثر.", "البشرة الرقيقة: تظهر العروق الصغيرة (هالات زرقاء).", "الصبغة: هالات بنية، تزيدها الشمس والفرك.", "العمر: البشرة ترق ومحيط العين يغور."] }],
      },
      {
        h2: "ما الذي يساعد ضد الهالات؟",
        body: [{ list: ["النوم بما يكفي، في أوقات منتظمة.", "عدم فرك العينين، وإزالة المكياج بلطف.", "حماية العينين من الشمس: نظارات وواقي.", "عناية لمحيط العين صباحًا ومساءً، دون شد البشرة."] }],
      },
      {
        h2: "كيف تضعين سيروم محيط العين؟",
        body: [{ steps: ["صباحًا ومساءً، على بشرة نظيفة.", "مرري البكرة تحت العين، من الداخل إلى الخارج.", "انقري بلطف بطرف الإصبع."] }],
      },
    ],
    adviceTitle: "متى تستشيرين الطبيب؟",
    advice: "إذا ظهرت الهالات فجأة، أو في جهة واحدة، أو مع انتفاخ. طبيب الجلد يشرح لك أيضًا الهالات الواضحة منذ الصغر.",
    productsTitle: "عناية OTAGE للهالات",
    productsIntro: "",
    products: [{ key: "yeux", why: "كافيين، حمض الهيالورونيك وألوفيرا، ببكرة دوارة، 15 مل." }],
    routine: false,
    faq: [
      { q: "هل يُخفي السيروم الهالات تمامًا؟", a: ["لا، لا يمكن لأي عناية أن تعد بذلك. حسب سببها، تخف بدرجات مختلفة."] },
      { q: "هل يمكن وضعه تحت المكياج؟", a: ["نعم. قوامه الخفيف يندمج تحت المكياج."] },
      { q: "أنا حامل أو مرضعة، هل يمكنني استعماله؟", a: ["اسألي أولًا طبيبك أو الصيدلي. اعرضي عليه قائمة المكونات."] },
    ],
  },

  /* ------------------------------------------------------------------ À relire par un natif : /ar/taches-acne */
  "taches-acne": {
    label: "آثار حب الشباب",
    h1: "آثار حب الشباب: لماذا تبقى وكيف تخففينها",
    metaTitle: "آثار حب الشباب: كيف تخففين البقع | OTAGE",
    metaDescription: "آثار حب الشباب: لماذا تترك الحبوب بقعًا بنية، ما الذي يزيدها، والروتين للتخفيف منها. نصائح بسيطة وواضحة، بدون وعود مبالغ فيها، من علامة OTAGE المغربية.",
    intro: ["الأثر البني بعد حبة هو بقعة، وليس ندبة. يخف مع الوقت، وأسرع إذا حميتِه من الشمس."],
    sections: [
      {
        h2: "بقعة أم ندبة: كيف تفرقين بينهما؟",
        body: [{ list: ["البقعة: مسطحة، يتغير لونها فقط. إذا كانت بنية، فهي فرط تصبغ بعد الالتهاب.", "وردية أو حمراء: عروق صغيرة ما زالت متوسعة، تبهت مع الوقت.", "الندبة: حفرة أو نتوء. العناية التجميلية لا تغيرها."] }],
      },
      {
        h2: "ما الذي يزيد آثار حب الشباب؟",
        body: [{ list: ["عصر الحبوب أو حكها: الأثر يغمق.", "الشمس بدون حماية: تُغمق البقع وتطيل بقاءها.", "التقشير القوي والمنتجات المهيجة."] }],
      },
      {
        h2: "ما الذي يساعد؟",
        body: [{ list: ["التنظيف بلطف، صباحًا ومساءً.", "واقي الشمس كل صباح.", "روتين منتظم، حتى يأخذ وقته.", "تجربة كل منتج جديد 24 ساعة على منطقة صغيرة."] }],
      },
    ],
    adviceTitle: "متى تستشيرين طبيب الجلد؟",
    advice: "إذا كانت لديك حبوب أو أكياس أو ندوب غائرة. حب الشباب يُعالج، والعلاج يمنع آثارًا جديدة.",
    productsTitle: "أي روتين للآثار البنية؟",
    productsIntro: "يخفف البقع، ولا يعالج حب الشباب. في المساء، بدون واقي.",
    products: [
      { key: "gel", why: "ينظف دون تجفيف، بدون سلفات." },
      { key: "serum", why: "3 إلى 4 قطرات على بشرة جافة." },
      { key: "creme", why: "يرطب ويوحد لون البشرة." },
      { key: "ecran", why: "في الصباح، كآخر خطوة." },
    ],
    routine: true,
    faq: [
      { q: "هل تزول آثار حب الشباب وحدها؟", a: ["غالبًا نعم، خلال عدة أشهر. الشمس بدون حماية تطيل بقاءها."] },
      { q: "هل يعالج روتين البقع حب الشباب؟", a: ["لا: يخفف البقع البنية، لا الحبوب. لحب الشباب النشط، استشيري طبيب الجلد."] },
      { q: "وإذا كانت لدي حبوب بعد؟", a: ["اسألي أولًا طبيب الجلد أو الصيدلي. ثم جربي 24 ساعة على منطقة صغيرة."] },
    ],
  },
};

/** Les pages en arabe : mêmes adresses, mêmes images et mêmes produits que le français, pour les pages traduites. */
const imageAlt: Record<string, string> = {
  cernes: "سيروم محيط العين OTAGE رقم 05 قرب الوجه",
  "taches-acne": "امرأة تحمل سيروم OTAGE ضد البقع",
};

export const problemsAr: ProblemPage[] = isolateAr(problems.filter((p) => ar[p.slug]).map((p) => {
  const t = isolateAll(ar[p.slug]);
  // adviceTitle : seulement celui de l'arabe (sans repli sur le français)
  return {
    ...p, ...t, adviceTitle: t.adviceTitle, image: { ...p.image, alt: { fr: p.image.alt.fr, ar: imageAlt[p.slug] } },
    // rien du français qui ne soit pas traduit ou pas approuvé pour l'arabe
    reviewed: undefined, editorial: undefined, essentials: undefined, maroc: undefined, solution: undefined, sources: undefined, noSale: undefined, pharmacistNote: undefined,
  };
}));

/** La page conseil existe-t-elle en arabe ? */
export const hasArProblem = (slug: string) => problemsAr.some((p) => p.slug === slug);

/** Pages arabes qui traduisent une ancienne version de la page française : elles restent en ligne (côté arabe),
    mais sans hreflang ni sélecteur de langue entre les deux versions, tant qu'elles ne sont pas retraduites. */
const outdatedAr = new Set(["taches-acne"]);
/** La page arabe existe ET traduit la version française actuelle : seules ces paires sont liées (hreflang, sélecteur). */
export const arUpToDate = (slug: string) => hasArProblem(slug) && !outdatedAr.has(slug);
