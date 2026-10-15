/* Textes des fiches produits (maquettes « le ticket qui s'écrit en direct », newpages/otage-*.html).
   Les avis ne sont pas ici : chaque fiche montre les messages réels de src/data/reviews.ts qui citent ce soin (champ « produits »).
   Prix, contenances, noms et ingrédients restent dans src/data/products.ts : ici, seulement la mise en scène de chaque fiche.
   {d} est remplacé par l'écart de prix entre le Petit et le Grand format. L'arabe est « À relire par un natif ». */
import { isolateAr } from "../lib/bidi";
import type { ProductKey } from "./products";
import type { L } from "./site";

export type PerkIcon =
  | "spots" | "leaf" | "flower" | "star" | "noSulfate" | "fig" | "drop" | "waves" | "drop2" | "halfTone" | "flask" | "helix"
  | "sun" | "shield" | "noSpots" | "bottle" | "eye" | "cup" | "aloe" | "noAl" | "noP";

export type Ingredient = { name: L; where: L; role: L; why: L };

export type ProductPageText = {
  /** Pastille posée sur la photo. */
  tag: L;
  /** Petite ligne au-dessus du titre. */
  eyebrow: L;
  /** Titre en deux lignes : la seconde en italique rouge. */
  title: [L, L];
  lede: L;
  /** Le visuel principal : flacon détouré (pack) ou photo plein cadre (photo). */
  media: "pack" | "photo";
  mediaAlt: L;
  perks: { icon: PerkIcon; label: L }[];
  /** Grand format (soins en deux formats) : bandeau de la carte et rappel dans le ticket. */
  upsell?: { flag: L; nudge: L };
  /** Soins à offre 2 + 1 : le mot pour un article (« sérum », « pot »). */
  unitWord?: { one: L; many: L };
  lab: { title: [L, L]; alt: L; ingredients: Ingredient[]; spots?: { x: number; y: number; tip: L }[] };
};

const label = { fr: "sur l’étiquette", ar: "على الملصق" };
export const productPages: Record<ProductKey, ProductPageText> = isolateAr({
  gel: {
    tag: { fr: "N° 01 · Routine anti-taches", ar: "رقم 01 · روتين ضد البقع" },
    eyebrow: { fr: "N° 01 sur 04 · Routine anti-taches", ar: "رقم 01 من 04 · روتين ضد البقع" },
    title: [{ fr: "Gel", ar: "جل" }, { fr: "nettoyant.", ar: "منظف." }],
    lede: { fr: "Nettoie en douceur, sans dessécher, et prépare la peau à recevoir les soins anti-taches.", ar: "ينظف بلطف، دون تجفيف، ويهيئ البشرة لاستقبال العناية ضد البقع." },
    media: "pack",
    mediaAlt: { fr: "Le flacon de gel nettoyant anti-taches OTAGE, 200 ml", ar: "عبوة الجل المنظف ضد البقع من OTAGE، 200 مل" },
    perks: [
      { icon: "noSulfate", label: { fr: "Sans sulfate", ar: "بدون سلفات" } },
      { icon: "fig", label: { fr: "Figue de Barbarie", ar: "التين الشوكي" } },
      { icon: "drop", label: { fr: "Louban", ar: "اللبان" } },
      { icon: "waves", label: { fr: "Ne dessèche pas", ar: "لا يجفف البشرة" } },
    ],
    upsell: { flag: { fr: "+75 ml pour {d} DH de plus", ar: "‎+75 مل مقابل {d} درهم إضافية" }, nudge: { fr: "+75 ml pour {d} DH", ar: "‎+75 مل مقابل {d} درهم" } },
    lab: {
      title: [{ fr: "Trois mots sur l’étiquette.", ar: "ثلاث كلمات على الملصق." }, { fr: "Tout est dit.", ar: "وكل شيء قيل." }],
      alt: { fr: "L’étiquette du gel : figue de Barbarie, louban, sans sulfate, 200 ml", ar: "ملصق الجل: التين الشوكي، اللبان، بدون سلفات، 200 مل" },
      ingredients: [
        { name: { fr: "Figue de Barbarie", ar: "التين الشوكي" }, where: label, role: { fr: "Un actif marocain, connu pour adoucir et hydrater la peau.", ar: "مكوّن مغربي معروف بتنعيم البشرة وترطيبها." }, why: { fr: "La peau reste douce après le rinçage, sans tiraillement.", ar: "تبقى البشرة ناعمة بعد الشطف، دون شدّ." } },
        { name: { fr: "Louban", ar: "اللبان" }, where: label, role: { fr: "Une résine traditionnelle, utilisée depuis longtemps pour purifier la peau.", ar: "راتنج تقليدي يُستعمل منذ زمن طويل لتنقية البشرة." }, why: { fr: "Il aide à nettoyer en profondeur, en douceur.", ar: "يساعد على التنظيف العميق، بلطف." } },
        { name: { fr: "Sans sulfate", ar: "بدون سلفات" }, where: label, role: { fr: "Une base lavante douce, sans sulfates agressifs.", ar: "قاعدة غسل لطيفة، بدون سلفات قاسية." }, why: { fr: "La peau est propre, sans être décapée : elle est prête pour le sérum.", ar: "البشرة نظيفة دون أن تتجرد: جاهزة للسيروم." } },
      ],
    },
  },
  serum: {
    tag: { fr: "N° 02 · Routine anti-taches", ar: "رقم 02 · روتين ضد البقع" },
    eyebrow: { fr: "N° 02 sur 04 · Le soin concentré", ar: "رقم 02 من 04 · العناية المركزة" },
    title: [{ fr: "Sérum", ar: "سيروم" }, { fr: "anti-taches.", ar: "ضد البقع." }],
    lede: { fr: "Le soin concentré de la routine : il cible les taches brunes et unifie le teint, goutte après goutte.", ar: "العناية المركزة في الروتين: يستهدف البقع البنية ويوحد لون البشرة، قطرة بعد قطرة." },
    media: "pack",
    mediaAlt: { fr: "Le flacon compte-gouttes du sérum anti-taches OTAGE, 30 ml", ar: "عبوة السيروم ضد البقع من OTAGE بقطارة، 30 مل" },
    perks: [
      { icon: "spots", label: { fr: "Cible les taches", ar: "يستهدف البقع" } },
      { icon: "leaf", label: { fr: "Matcha", ar: "ماتشا" } },
      { icon: "flower", label: { fr: "Calendula", ar: "آذريون" } },
      { icon: "star", label: { fr: "Alpha-arbutine", ar: "ألفا أربوتين" } },
    ],
    upsell: { flag: { fr: "2× plus de sérum pour {d} DH de plus", ar: "ضعف كمية السيروم مقابل {d} درهم إضافية" }, nudge: { fr: "2× plus de sérum pour {d} DH", ar: "ضعف كمية السيروم مقابل {d} درهم" } },
    lab: {
      title: [{ fr: "Trois actifs.", ar: "ثلاثة مكونات فعالة." }, { fr: "Une seule mission.", ar: "مهمة واحدة." }],
      alt: { fr: "L’étiquette du sérum : matcha, calendula, alpha-arbutine, 30 ml", ar: "ملصق السيروم: ماتشا، آذريون، ألفا أربوتين، 30 مل" },
      ingredients: [
        { name: { fr: "Matcha", ar: "ماتشا" }, where: label, role: { fr: "Un thé vert riche en antioxydants, qui protège la peau des agressions du quotidien.", ar: "شاي أخضر غني بمضادات الأكسدة، يحمي البشرة من الاعتداءات اليومية." }, why: { fr: "Il aide le teint à retrouver de l’éclat.", ar: "يساعد البشرة على استعادة إشراقها." } },
        { name: { fr: "Calendula", ar: "آذريون (كاليندولا)" }, where: label, role: { fr: "Une fleur connue pour apaiser les peaux sensibles.", ar: "زهرة معروفة بتهدئة البشرة الحساسة." }, why: { fr: "Le sérum reste doux, même appliqué matin et soir.", ar: "يبقى السيروم لطيفًا، حتى عند وضعه صباحًا ومساءً." } },
        { name: { fr: "Alpha-arbutine", ar: "ألفا أربوتين" }, where: label, role: { fr: "L’actif qui cible les taches brunes en limitant la production de mélanine.", ar: "المكوّن الذي يستهدف البقع البنية بالحد من إنتاج الميلانين." }, why: { fr: "C’est lui qui travaille sur les taches, jour après jour.", ar: "هو الذي يعمل على البقع، يومًا بعد يوم." } },
      ],
    },
  },
  creme: {
    tag: { fr: "N° 03 · Routine anti-taches", ar: "رقم 03 · روتين ضد البقع" },
    eyebrow: { fr: "N° 03 sur 04 · Hydrate et unifie", ar: "رقم 03 من 04 · يرطب ويوحد" },
    title: [{ fr: "Crème", ar: "كريم" }, { fr: "anti-taches.", ar: "ضد البقع." }],
    lede: { fr: "Elle hydrate, unifie le teint et scelle le sérum : la dernière étape avant l’écran solaire.", ar: "يرطب، يوحد لون البشرة ويثبت السيروم: آخر خطوة قبل واقي الشمس." },
    media: "pack",
    mediaAlt: { fr: "Le flacon pompe de la crème anti-taches OTAGE, 50 ml", ar: "عبوة الكريم ضد البقع من OTAGE بمضخة، 50 مل" },
    perks: [
      { icon: "drop2", label: { fr: "Hydrate", ar: "يرطب" } },
      { icon: "halfTone", label: { fr: "Unifie le teint", ar: "يوحد لون البشرة" } },
      { icon: "flask", label: { fr: "Niacinamide", ar: "نياسيناميد" } },
      { icon: "helix", label: { fr: "Acide hyaluronique", ar: "حمض الهيالورونيك" } },
    ],
    upsell: { flag: { fr: "+20 ml pour {d} DH de plus", ar: "‎+20 مل مقابل {d} درهم إضافية" }, nudge: { fr: "+20 ml pour {d} DH", ar: "‎+20 مل مقابل {d} درهم" } },
    lab: {
      title: [{ fr: "Hydrater, unifier.", ar: "ترطيب وتوحيد." }, { fr: "Sans compliquer.", ar: "دون تعقيد." }],
      alt: { fr: "L’étiquette de la crème : niacinamide, acide hyaluronique, AHA, 50 ml", ar: "ملصق الكريم: نياسيناميد، حمض الهيالورونيك، AHA، ‏50 مل" },
      ingredients: [
        { name: { fr: "Niacinamide", ar: "نياسيناميد" }, where: label, role: { fr: "La vitamine B3 : elle aide à unifier le teint et à atténuer l’aspect des taches.", ar: "فيتامين B3: يساعد على توحيد لون البشرة وتخفيف مظهر البقع." }, why: { fr: "Elle travaille avec le sérum pour un teint plus régulier.", ar: "يعمل مع السيروم من أجل لون بشرة أكثر انتظامًا." } },
        { name: { fr: "Acide hyaluronique", ar: "حمض الهيالورونيك" }, where: label, role: { fr: "Il retient l’eau dans la peau pour une hydratation durable.", ar: "يحتفظ بالماء في البشرة لترطيب يدوم." }, why: { fr: "La peau reste souple et confortable toute la journée.", ar: "تبقى البشرة مرنة ومرتاحة طوال اليوم." } },
        { name: { fr: "AHA", ar: "أحماض AHA" }, where: label, role: { fr: "Des acides de fruits qui affinent le grain de peau en douceur.", ar: "أحماض فواكه تنعّم ملمس البشرة بلطف." }, why: { fr: "Ils aident la peau à retrouver de l’éclat. Toujours avec un écran solaire le matin.", ar: "تساعد البشرة على استعادة إشراقها. دائمًا مع واقي الشمس في الصباح." } },
      ],
    },
  },
  ecran: {
    tag: { fr: "N° 04 · Routine anti-taches", ar: "رقم 04 · روتين ضد البقع" },
    eyebrow: { fr: "N° 04 sur 04 · Le geste qui protège tout", ar: "رقم 04 من 04 · الخطوة التي تحمي كل شيء" },
    title: [{ fr: "Écran", ar: "واقي الشمس" }, { fr: "SPF 50.", ar: "SPF 50." }],
    lede: { fr: "Le soleil réveille les taches. L’écran les empêche de revenir : le dernier geste du matin, tous les jours.", ar: "الشمس توقظ البقع. والواقي يمنعها من العودة: آخر خطوة في الصباح، كل يوم." },
    media: "pack",
    mediaAlt: { fr: "Le flacon pompe de l’écran solaire SPF 50 OTAGE, 50 ml", ar: "عبوة واقي الشمس SPF 50 من OTAGE بمضخة، 50 مل" },
    perks: [
      { icon: "sun", label: { fr: "SPF 50", ar: "SPF 50" } },
      { icon: "shield", label: { fr: "UVA / UVB", ar: "UVA / UVB" } },
      { icon: "noSpots", label: { fr: "Évite le retour des taches", ar: "يمنع عودة البقع" } },
      { icon: "bottle", label: { fr: "Tous les matins", ar: "كل صباح" } },
    ],
    upsell: { flag: { fr: "+20 ml pour {d} DH de plus", ar: "‎+20 مل مقابل {d} درهم إضافية" }, nudge: { fr: "+20 ml pour {d} DH", ar: "‎+20 مل مقابل {d} درهم" } },
    lab: {
      title: [{ fr: "Sans écran,", ar: "بدون واقي،" }, { fr: "les taches reviennent.", ar: "تعود البقع." }],
      alt: { fr: "L’étiquette de l’écran : SPF 50, haute protection UVA/UVB, 50 ml", ar: "ملصق الواقي: SPF 50، حماية عالية من UVA/UVB، ‏50 مل" },
      ingredients: [
        { name: { fr: "SPF 50", ar: "SPF 50" }, where: label, role: { fr: "Le plus haut niveau de protection contre les coups de soleil (UVB).", ar: "أعلى مستوى من الحماية من حروق الشمس (UVB)." }, why: { fr: "Pour une peau qui a des taches, c’est le minimum recommandé au Maroc.", ar: "للبشرة التي بها بقع، هو الحد الأدنى الموصى به في المغرب." } },
        { name: { fr: "UVA / UVB", ar: "UVA / UVB" }, where: label, role: { fr: "Il protège des deux types de rayons : UVB (coups de soleil) et UVA (taches, vieillissement).", ar: "يحمي من نوعي الأشعة: UVB (حروق الشمس) و UVA (البقع، الشيخوخة)." }, why: { fr: "Ce sont surtout les UVA qui font revenir les taches.", ar: "أشعة UVA هي التي تعيد البقع خصوصًا." } },
        { name: { fr: "Le bon geste", ar: "الخطوة الصحيحة" }, where: { fr: "chaque matin", ar: "كل صباح" }, role: { fr: "En dernier, après la crème. Renouvelle toutes les 2 heures au soleil.", ar: "في الأخير، بعد الكريم. جدديه كل ساعتين تحت الشمس." }, why: { fr: "Sans écran, le sérum et la crème travaillent pour rien.", ar: "بدون واقي، يعمل السيروم والكريم بلا فائدة." } },
      ],
    },
  },
  yeux: {
    tag: { fr: "N° 05 · Contour des yeux", ar: "رقم 05 · محيط العين" },
    eyebrow: { fr: "N° 05 · Fabriqué au Maroc", ar: "رقم 05 · مصنوع في المغرب" },
    title: [{ fr: "Contour", ar: "محيط" }, { fr: "des yeux.", ar: "العين." }],
    lede: { fr: "Un sérum léger pour la peau fine sous les yeux : il atténue l’aspect des cernes et rafraîchit le regard, matin et soir.", ar: "سيروم خفيف للبشرة الرقيقة تحت العينين: يخفف مظهر الهالات وينعش النظرة، صباحًا ومساءً." },
    media: "pack",
    mediaAlt: { fr: "Le flacon du sérum contour des yeux OTAGE, 15 ml", ar: "عبوة سيروم محيط العين من OTAGE، 15 مل" },
    perks: [
      { icon: "eye", label: { fr: "Atténue les cernes", ar: "يخفف الهالات" } },
      { icon: "cup", label: { fr: "Caféine", ar: "كافيين" } },
      { icon: "drop2", label: { fr: "Acide hyaluronique", ar: "حمض الهيالورونيك" } },
      { icon: "aloe", label: { fr: "Aloe vera", ar: "ألوفيرا" } },
    ],
    unitWord: { one: { fr: "sérum", ar: "سيروم" }, many: { fr: "sérums", ar: "سيرومات" } },
    lab: {
      title: [{ fr: "Trois actifs.", ar: "ثلاثة مكونات فعالة." }, { fr: "Un regard reposé.", ar: "نظرة مرتاحة." }],
      alt: { fr: "L’étiquette du sérum contour des yeux : aloe vera, acide hyaluronique, caféine, 15 ml", ar: "ملصق سيروم محيط العين: ألوفيرا، حمض الهيالورونيك، كافيين، 15 مل" },
      ingredients: [
        { name: { fr: "Caféine", ar: "كافيين" }, where: label, role: { fr: "Elle aide à atténuer l’aspect des poches et des cernes.", ar: "يساعد على تخفيف مظهر الانتفاخ والهالات." }, why: { fr: "Le regard paraît moins fatigué.", ar: "تبدو النظرة أقل تعبًا." } },
        { name: { fr: "Acide hyaluronique", ar: "حمض الهيالورونيك" }, where: label, role: { fr: "Il hydrate la peau fine du contour de l’œil.", ar: "يرطب البشرة الرقيقة حول العين." }, why: { fr: "La peau est plus lisse, plus repulpée.", ar: "تصبح البشرة أنعم وأكثر امتلاءً." } },
        { name: { fr: "Aloe vera", ar: "ألوفيرا" }, where: label, role: { fr: "Elle apaise et rafraîchit.", ar: "تهدئ وتنعش." }, why: { fr: "Une sensation de fraîcheur dès l’application.", ar: "إحساس بالانتعاش منذ الاستعمال." } },
      ],
    },
  },
  deo: {
    tag: { fr: "N° 06 · Soin du corps · 50 ml", ar: "رقم 06 · العناية بالجسم · 50 مل" },
    eyebrow: { fr: "Nouveau · Fabriqué au Maroc", ar: "جديد · مصنوع في المغرب" },
    title: [{ fr: "Déodorant", ar: "مزيل العرق" }, { fr: "crème.", ar: "كريم." }],
    lede: { fr: "Un baume fondant qui s’occupe des odeurs. Cinq ingrédients naturels, rien d’autre.", ar: "بلسم ذائب يعتني بالروائح. خمسة مكونات طبيعية، لا شيء غيرها." },
    media: "photo",
    mediaAlt: { fr: "Le pot de déodorant crème OTAGE ouvert, tenu à deux mains, un doigt dans le baume", ar: "علبة مزيل العرق كريم OTAGE مفتوحة بين يدين، وإصبع في البلسم" },
    perks: [
      { icon: "leaf", label: { fr: "100 % naturel", ar: "طبيعي 100%" } },
      { icon: "noAl", label: { fr: "Sans aluminium", ar: "بدون ألمنيوم" } },
      { icon: "noP", label: { fr: "Sans parabène", ar: "بدون بارابين" } },
      { icon: "noSulfate", label: { fr: "Sans sulfate", ar: "بدون سلفات" } },
    ],
    unitWord: { one: { fr: "pot", ar: "علبة" }, many: { fr: "pots", ar: "علب" } },
    lab: {
      title: [{ fr: "Cinq ingrédients.", ar: "خمسة مكونات." }, { fr: "Pas un de plus.", ar: "ولا واحد زيادة." }],
      alt: { fr: "L’étiquette du pot : oxyde de zinc, huile de coco, huile de jojoba, 50 ml", ar: "ملصق العلبة: أكسيد الزنك، زيت جوز الهند، زيت الجوجوبا، 50 مل" },
      ingredients: [
        { name: { fr: "Oxyde de zinc", ar: "أكسيد الزنك" }, where: label, role: { fr: "Un minéral qui limite le développement des bactéries responsables des odeurs.", ar: "معدن يحد من تكاثر البكتيريا المسؤولة عن الروائح." }, why: { fr: "L’actif principal : il agit sur l’odeur sans bloquer la transpiration.", ar: "المكوّن الأساسي: يعمل على الرائحة دون أن يمنع التعرق." } },
        { name: { fr: "Huile de coco", ar: "زيت جوز الهند" }, where: label, role: { fr: "Elle donne au baume sa texture fondante et participe à l’action contre les odeurs.", ar: "يمنح البلسم قوامه الذائب ويساهم في محاربة الروائح." }, why: { fr: "Elle fond au contact de la peau : l’application est facile.", ar: "يذوب عند ملامسة البشرة: الاستعمال سهل." } },
        { name: { fr: "Huile de jojoba", ar: "زيت الجوجوبا" }, where: label, role: { fr: "Elle nourrit et adoucit la peau fine des aisselles.", ar: "يغذي وينعّم البشرة الرقيقة للإبط." }, why: { fr: "Pour une peau confortable, même après le rasage.", ar: "لبشرة مرتاحة، حتى بعد الحلاقة." } },
        { name: { fr: "Cire d’abeille", ar: "شمع العسل" }, where: { fr: "dans le baume", ar: "في البلسم" }, role: { fr: "Elle donne sa tenue au baume et protège la peau.", ar: "يمنح البلسم تماسكه ويحمي البشرة." }, why: { fr: "Sans elle, la crème serait liquide dans le pot.", ar: "بدونه، يصبح الكريم سائلًا في العلبة." } },
        { name: { fr: "Vitamine E", ar: "فيتامين E" }, where: { fr: "dans le baume", ar: "في البلسم" }, role: { fr: "Un antioxydant qui protège la formule et la peau.", ar: "مضاد للأكسدة يحمي التركيبة والبشرة." }, why: { fr: "Elle aide la crème à rester stable dans le temps.", ar: "يساعد الكريم على البقاء مستقرًا مع الوقت." } },
      ],
      // points posés sur la vraie photo de l'étiquette, en % de l'image
      spots: [
        { x: 25, y: 83.5, tip: { fr: "Oxyde de zinc", ar: "أكسيد الزنك" } },
        { x: 49, y: 83.5, tip: { fr: "Huile de coco", ar: "زيت جوز الهند" } },
        { x: 74, y: 82.5, tip: { fr: "Huile de jojoba", ar: "زيت الجوجوبا" } },
        { x: 30, y: 22, tip: { fr: "Cire d’abeille · dans le baume", ar: "شمع العسل · في البلسم" } },
        { x: 74, y: 25, tip: { fr: "Vitamine E · dans le baume", ar: "فيتامين E · في البلسم" } },
      ],
    },
  },
} satisfies Record<ProductKey, ProductPageText>);

/** Textes d'interface des fiches produits (bouton, ticket, formulaire). */
export const productUi = isolateAr({
  navIngredients: { fr: "Ingrédients", ar: "المكونات" },
  navReviews: { fr: "Avis", ar: "الآراء" },
  navMore: { fr: "Nos soins", ar: "منتجاتنا" },
  home: { fr: "OTAGE, accueil", ar: "OTAGE، الصفحة الرئيسية" },
  onPage: { fr: "Sur cette page", ar: "في هذه الصفحة" },
  order: { fr: "Commander", ar: "اطلبي" },
  orderFrom: { fr: "Commander, à partir de {p} DH", ar: "اطلبي، ابتداءً من {p} درهم" },
  ring: { fr: "Paiement à la réception · Partout au Maroc ·", ar: "الدفع عند الاستلام · في كل المغرب ·" },
  from: { fr: "Dès {p} DH", ar: "ابتداءً من {p} درهم" },
  only: { fr: "{p} DH seulement", ar: "{p} درهم فقط" },
  threeFor: { fr: "3 pour {p} DH", ar: "3 مقابل {p} درهم" },
  chooseFormat: { fr: "Choisis ton format", ar: "اختاري الحجم" },
  chooseOffer: { fr: "Choisis ton offre", ar: "اختاري العرض" },
  petit: { fr: "Petit format", ar: "الحجم الصغير" },
  grand: { fr: "Grand format", ar: "الحجم الكبير" },
  toTry: { fr: "pour essayer", ar: "للتجربة" },
  toTryCap: { fr: "Pour essayer", ar: "للتجربة" },
  bestMl: { fr: "le meilleur prix au ml", ar: "أفضل ثمن للمل" },
  bundleFlag: { fr: "2 achetés = le 3e offert", ar: "اشتري 2 = الثالث مجانًا" },
  offered: { fr: "offert", ar: "مجانًا" },
  perUnit: { fr: "≈ {p} DH le {u}", ar: "≈ {p} درهم لل{u}" },
  orderTotal: { fr: "Commander · {t} DH", ar: "اطلبي · {t} درهم" },
  tryTotal: { fr: "Je veux essayer · {t} DH", ar: "أريد التجربة · {t} درهم" },
  trustPay: { fr: "Paiement à la réception", ar: "الدفع عند الاستلام" },
  trustFee: { fr: "Livraison {a} à {b} DH", ar: "التوصيل من {a} إلى {b} درهم" },
  trustReturn: { fr: "7 jours pour changer d’avis", ar: "7 أيام لتغيير رأيك" },
  labChap: { fr: "L’étiquette, sans filtre", ar: "الملصق، بدون فلتر" },
  labNote: { fr: "Rôles relus par notre pharmacien", ar: "أدوار المكونات راجعها صيدلينا" },
  reviews: { fr: "Avis", ar: "آراء" },
  reviewsTrack: { fr: "Avis des clientes, défile horizontalement", ar: "آراء الزبونات، تمرير أفقي" },
  reviewMeta: { fr: "Message Instagram · {d}", ar: "رسالة إنستغرام · {d}" },
  reviewSource: { fr: "Voir la capture d’origine", ar: "رؤية اللقطة الأصلية" },
  reviewNote: { fr: "Chaque peau est différente : ce message raconte l’expérience d’une cliente, pas une promesse de résultat.", ar: "كل بشرة مختلفة: هذه الرسالة تحكي تجربة زبونة، وليست وعدًا بنتيجة." },
  prev: { fr: "Précédent", ar: "السابق" },
  next: { fr: "Suivant", ar: "التالي" },
  faqChap: { fr: "Questions fréquentes", ar: "أسئلة شائعة" },
  faqTitle: { fr: "Tu te poses", ar: "تتساءلين" },
  faqTitleEm: { fr: "la question ?", ar: "عن شيء؟" },
  moreChap: { fr: "Nos autres soins", ar: "منتجاتنا الأخرى" },
  moreTitle: { fr: "Le reste de", ar: "باقي" },
  moreTitleEm: { fr: "la maison.", ar: "منتجاتنا." },
  moreNote: { fr: "Ajoute-les au même ticket : une seule livraison.", ar: "أضيفيها إلى نفس الطلب: توصيل واحد." },
  moreTrack: { fr: "Nos autres soins, défile horizontalement", ar: "منتجاتنا الأخرى، تمرير أفقي" },
  see: { fr: "Voir la fiche", ar: "صفحة المنتج" },
  band: [{ fr: "Des soins honnêtes.", ar: "عناية صادقة." }, { fr: "Fabriqués au Maroc.", ar: "مصنوعة في المغرب." }],
  footTag: { fr: "Des soins honnêtes, fabriqués au Maroc.", ar: "عناية صادقة، مصنوعة في المغرب." },
  footReturns: { fr: "Retours sous 7 jours", ar: "الإرجاع خلال 7 أيام" },
  footAdvice: { fr: "Tous les soins", ar: "كل المنتجات" },
  footCgv: { fr: "CGV", ar: "شروط البيع" },
  // ticket
  ticket: { fr: "Ta commande", ar: "طلبك" },
  ticketNo: { fr: "Ticket", ar: "تذكرة" },
  closeTicket: { fr: "Fermer le ticket", ar: "إغلاق الطلب" },
  article: { fr: "{n} article", ar: "{n} منتج" },
  articles: { fr: "{n} articles", ar: "{n} منتجات" },
  paidOnDelivery: { fr: "Payé à la livraison", ar: "الدفع عند الاستلام" },
  articlesPlus: { fr: "{n} articles · + livraison", ar: "{n} منتجات · + التوصيل" },
  qty: { fr: "Quantité de {x}", ar: "كمية {x}" },
  remove: { fr: "Retirer {x}", ar: "إزالة {x}" },
  less: { fr: "Moins de {x}", ar: "تقليل {x}" },
  more: { fr: "Plus de {x}", ar: "زيادة {x}" },
  freeOf: { fr: "dont {n} offert", ar: "منها {n} مجانًا" },
  freeOfs: { fr: "dont {n} offerts", ar: "منها {n} مجانًا" },
  nudgeGrand: { fr: "Passe au grand format : <b>{x}</b> de plus.", ar: "انتقلي إلى الحجم الكبير: <b>{x}</b> إضافية." },
  nudgeTake3: { fr: "Prends-en 3 : <b>le 3e est offert</b>. {p} DH les 3 {u}.", ar: "خذي 3: <b>الثالث مجانًا</b>. {p} درهم لل{u} الثلاث." },
  nudgeAdd1: { fr: "Ajoute 1 {u} : <b>il est offert</b>.", ar: "أضيفي {u} واحدًا: <b>مجانًا</b>." },
  passTo3: { fr: "Passer à 3", ar: "خذي 3" },
  plusOneFree: { fr: "+1 offert", ar: "‎+1 مجانًا" },
  addTo: { fr: "Ajoute à ta commande", ar: "أضيفي إلى طلبك" },
  oneTap: { fr: "en 1 tap", ar: "بلمسة واحدة" },
  add: { fr: "+ Ajouter", ar: "+ أضيفي" },
  added: { fr: "Ajouté", ar: "تمت الإضافة" },
  addX: { fr: "Ajouter {x}", ar: "إضافة {x}" },
  formatOf: { fr: "Format de {x}", ar: "حجم {x}" },
  petitShort: { fr: "Petit", ar: "صغير" },
  grandShort: { fr: "Grand", ar: "كبير" },
  unique: { fr: "Format unique", ar: "حجم واحد" },
  subtotal: { fr: "Sous-total", ar: "المجموع الفرعي" },
  delivery: { fr: "Livraison", ar: "التوصيل" },
  deliveryTo: { fr: "à {v}", ar: "إلى {v}" },
  fee: { fr: "{a} à {b} DH", ar: "من {a} إلى {b} درهم" },
  payment: { fr: "Paiement", ar: "الدفع" },
  onReception: { fr: "à la réception", ar: "عند الاستلام" },
  totalProducts: { fr: "Total produits", ar: "مجموع المنتجات" },
  weDeliver: { fr: "On te livre", ar: "نوصل إليك" },
  threeBoxes: { fr: "3 cases, c’est tout", ar: "3 خانات، هذا كل شيء" },
  nom: { fr: "Ton nom", ar: "اسمك" },
  nomEx: { fr: "Salma Bennani", ar: "سلمى بناني" },
  tel: { fr: "Ton téléphone", ar: "هاتفك" },
  telHint: { fr: "on t’appelle pour confirmer", ar: "نتصل بك للتأكيد" },
  ville: { fr: "Ta ville", ar: "مدينتك" },
  villeEx: { fr: "Fès", ar: "فاس" },
  quickCities: { fr: "Villes rapides", ar: "مدن سريعة" },
  errPhone: { fr: "Vérifie ton numéro : 10 chiffres, qui commencent par 06 ou 07.", ar: "تحققي من رقمك: 10 أرقام، تبدأ بـ 06 أو 07." },
  errFields: { fr: "Il manque juste ce qui est souligné en rouge.", ar: "ينقص فقط ما هو محدد بالأحمر." },
  errLimit: { fr: "Trop de commandes envoyées d’un coup. Réessaie dans un moment, ou écris-nous sur WhatsApp.", ar: "تم إرسال طلبات كثيرة دفعة واحدة. أعيدي المحاولة بعد قليل، أو راسلينا على واتساب." },
  errServer: { fr: "La commande n’a pas pu être enregistrée. Réessaie, ou écris-nous sur WhatsApp.", ar: "تعذر تسجيل الطلب. أعيدي المحاولة، أو راسلينا على واتساب." },
  validate: { fr: "Valider · {t} DH", ar: "تأكيد · {t} درهم" },
  whatsapp: { fr: "Commander sur WhatsApp", ar: "اطلبي عبر واتساب" },
  noOnline: { fr: "Rien à payer en ligne", ar: "لا دفع عبر الإنترنت" },
  agreeA: { fr: "J’ai lu et j’accepte les", ar: "قرأت وأوافق على" },
  agreeCgv: { fr: "CGV", ar: "الشروط العامة للبيع" },
  agreeAnd: { fr: "et la", ar: "وعلى" },
  agreeReturns: { fr: "politique de retour", ar: "سياسة الإرجاع" },
  errTerms: { fr: "Coche la case pour accepter les CGV et la politique de retour.", ar: "ضعي علامة في الخانة للموافقة على الشروط العامة للبيع وسياسة الإرجاع." },
  confirmed: { fr: "Confirmé", ar: "تم التأكيد" },
  thanks: { fr: "Merci, {n} !", ar: "شكرًا، {n}!" },
  thanksDefault: { fr: "Merci !", ar: "شكرًا!" },
  done: { fr: "Ta commande N° <b>{no}</b> est bien reçue. On t’appelle au <b>{tel}</b> pour confirmer, puis on expédie. Tu paies à la réception.", ar: "طلبك رقم <b>{no}</b> وصلنا. سنتصل بك على <b>{tel}</b> للتأكيد، ثم نرسله. تدفعين عند الاستلام." },
  doneOffline: { fr: "Ta commande est gardée sur ton téléphone : elle part dès que la connexion revient. On t’appelle au <b>{tel}</b> pour confirmer. Tu paies à la réception.", ar: "طلبك محفوظ على هاتفك: سيُرسل بمجرد عودة الاتصال. سنتصل بك على <b>{tel}</b> للتأكيد. تدفعين عند الاستلام." },
  continue: { fr: "Continuer la visite", ar: "متابعة التصفح" },
  waHello: { fr: "Bonjour OTAGE, je veux commander :", ar: "مرحبًا OTAGE، أريد أن أطلب:" },
  waTotal: { fr: "Total : {t} DH + livraison", ar: "المجموع: {t} درهم + التوصيل" },
  waName: { fr: "Nom : {v}", ar: "الاسم: {v}" },
  waCity: { fr: "Ville : {v}", ar: "المدينة: {v}" },
  grandSuffix: { fr: " · Grand", ar: " · كبير" },
  ml: { fr: "ml", ar: "مل" },
});
