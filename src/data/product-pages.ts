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

/** Un actif : une ligne (role). `why` n'est gardé que pour les fiches pas encore réécrites. */
export type Ingredient = { name: L; where: L; role: L; why?: L };

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
  /** Section « Mode d'emploi » : pour qui (60 mots max), étapes numérotées, résultats honnêtes en 2 phrases. */
  use?: { forWho: L; steps: L[]; results: L };
};

const label = { fr: "sur l’étiquette", ar: "على الملصق" };
export const productPages: Record<ProductKey, ProductPageText> = isolateAr({
  gel: {
    tag: { fr: "N° 01 · Routine anti-taches", ar: "رقم 01 · روتين ضد البقع" },
    eyebrow: { fr: "N° 01 sur 04 · Routine anti-taches", ar: "رقم 01 من 04 · روتين ضد البقع" },
    title: [{ fr: "Gel nettoyant", ar: "جل منظف" }, { fr: "anti-taches.", ar: "ضد البقع." }],
    lede: { fr: "Pour nettoyer ta peau sans la dessécher, avant le sérum anti-taches.", ar: "لتنظيف بشرتك دون تجفيفها، قبل السيروم ضد البقع." },
    media: "pack",
    mediaAlt: { fr: "Le flacon de gel nettoyant anti-taches OTAGE, 200 ml", ar: "عبوة الجل المنظف ضد البقع من OTAGE، 200 مل" },
    // le bénéfice du soin (les 3 objections et le prix sont communs à toutes les fiches)
    perks: [{ icon: "waves", label: { fr: "Ne dessèche pas", ar: "لا يجفف البشرة" } }],
    upsell: { flag: { fr: "+75 ml pour {d} DH de plus", ar: "‎+75 مل مقابل {d} درهم إضافية" }, nudge: { fr: "+75 ml pour {d} DH", ar: "‎+75 مل مقابل {d} درهم" } },
    lab: {
      title: [{ fr: "Le gel nettoyant :", ar: "الجل المنظف:" }, { fr: "ses 3 actifs.", ar: "مكوناته الثلاثة." }],
      alt: { fr: "L’étiquette du gel : figue de Barbarie, louban, sans sulfate, 200 ml", ar: "ملصق الجل: التين الشوكي، اللبان، بدون سلفات، 200 مل" },
      ingredients: [
        { name: { fr: "Figue de Barbarie", ar: "التين الشوكي" }, where: label, role: { fr: "Adoucit et hydrate, sans tiraillement après le rinçage.", ar: "ينعّم ويرطب، دون شد بعد الشطف." } },
        { name: { fr: "Louban", ar: "اللبان" }, where: label, role: { fr: "Résine traditionnelle qui aide à purifier la peau.", ar: "راتنج تقليدي يساعد على تنقية البشرة." } },
        { name: { fr: "Sans sulfate", ar: "بدون سلفات" }, where: label, role: { fr: "Base lavante douce : la peau est propre, sans être décapée.", ar: "قاعدة غسل لطيفة: بشرة نظيفة دون أن تتهيج." } },
      ],
    },
    // mode d'emploi : pour qui (60 mots max), étapes, résultats honnêtes (arabe « À relire par un natif »)
    use: {
      forWho: { fr: "Pour toi si tu as des taches brunes ou un teint irrégulier. C'est l'étape 1 de la routine, matin et soir.", ar: "لك إن كانت لديك بقع بنية أو لون بشرة غير موحد. هو الخطوة 1 في الروتين، صباحًا ومساءً." },
      steps: [
        { fr: "Mouille ton visage, matin et soir.", ar: "بللي وجهك، صباحًا ومساءً." },
        { fr: "Masse le gel 30 secondes.", ar: "دلّكي بالجل 30 ثانية." },
        { fr: "Rince, puis applique le sérum anti-taches.", ar: "اشطفي، ثم ضعي السيروم ضد البقع." },
      ],
      results: { fr: "Tout de suite : une peau nettoyée en douceur. Sur les taches, c'est la routine complète qui agit, petit à petit.", ar: "فورًا: بشرة نظيفة بلطف. أما البقع، فالروتين الكامل هو الذي يعمل عليها، شيئًا فشيئًا." },
    },
  },
  serum: {
    tag: { fr: "N° 02 · Routine anti-taches", ar: "رقم 02 · روتين ضد البقع" },
    eyebrow: { fr: "N° 02 sur 04 · Routine anti-taches", ar: "رقم 02 من 04 · روتين ضد البقع" },
    title: [{ fr: "Sérum", ar: "سيروم" }, { fr: "anti-taches.", ar: "ضد البقع." }],
    lede: { fr: "Pour atténuer les taches brunes et unifier le teint, goutte après goutte.", ar: "لتخفيف البقع البنية وتوحيد لون البشرة، قطرة بعد قطرة." },
    media: "pack",
    mediaAlt: { fr: "Le flacon compte-gouttes du sérum anti-taches OTAGE, 30 ml", ar: "عبوة السيروم ضد البقع من OTAGE بقطارة، 30 مل" },
    // le bénéfice du soin (les 3 objections et le prix sont communs à toutes les fiches)
    perks: [{ icon: "spots", label: { fr: "Atténue les taches", ar: "يخفف البقع" } }],
    upsell: { flag: { fr: "2× plus de sérum pour {d} DH de plus", ar: "ضعف كمية السيروم مقابل {d} درهم إضافية" }, nudge: { fr: "2× plus de sérum pour {d} DH", ar: "ضعف كمية السيروم مقابل {d} درهم" } },
    lab: {
      title: [{ fr: "Le sérum anti-taches :", ar: "السيروم ضد البقع:" }, { fr: "ses 3 actifs.", ar: "مكوناته الثلاثة." }],
      alt: { fr: "L’étiquette du sérum : matcha, calendula, alpha-arbutine, 30 ml", ar: "ملصق السيروم: ماتشا، آذريون، ألفا أربوتين، 30 مل" },
      ingredients: [
        { name: { fr: "Matcha", ar: "ماتشا" }, where: label, role: { fr: "Thé vert antioxydant, qui aide le teint à retrouver de l'éclat.", ar: "شاي أخضر مضاد للأكسدة، يساعد البشرة على استعادة إشراقها." } },
        { name: { fr: "Calendula", ar: "آذريون (كاليندولا)" }, where: label, role: { fr: "Fleur apaisante : le sérum reste doux, matin et soir.", ar: "زهرة مهدئة: السيروم يبقى لطيفًا، صباحًا ومساءً." } },
        { name: { fr: "Alpha-arbutine", ar: "ألفا أربوتين" }, where: label, role: { fr: "Limite la production de mélanine : c'est l'actif qui agit sur les taches.", ar: "يحد من إنتاج الميلانين: هو المكوّن الذي يعمل على البقع." } },
      ],
    },
    // mode d'emploi : pour qui (60 mots max), étapes, résultats honnêtes (arabe « À relire par un natif »)
    use: {
      forWho: { fr: "Pour les taches brunes, l'hyperpigmentation et le teint irrégulier. C'est l'étape 2 de la routine, matin et soir.", ar: "للبقع البنية وفرط التصبغ ولون البشرة غير الموحد. هو الخطوة 2 في الروتين، صباحًا ومساءً." },
      steps: [
        { fr: "Après le gel nettoyant, sèche ta peau.", ar: "بعد الجل المنظف، جففي بشرتك." },
        { fr: "Dépose 3 à 4 gouttes sur le visage.", ar: "ضعي 3 إلى 4 قطرات على الوجه." },
        { fr: "Tapote du bout des doigts, puis applique la crème.", ar: "ربّتي بأطراف الأصابع، ثم ضعي الكريم." },
      ],
      results: { fr: "Les taches s'atténuent petit à petit, pas en quelques jours. Le rythme dépend de ta peau, de ta régularité et de l'écran solaire.", ar: "البقع تخف شيئًا فشيئًا، وليس في أيام قليلة. الوتيرة تتوقف على بشرتك وانتظامك وواقي الشمس." },
    },
  },
  creme: {
    tag: { fr: "N° 03 · Routine anti-taches", ar: "رقم 03 · روتين ضد البقع" },
    eyebrow: { fr: "N° 03 sur 04 · Routine anti-taches", ar: "رقم 03 من 04 · روتين ضد البقع" },
    title: [{ fr: "Crème", ar: "كريم" }, { fr: "anti-taches.", ar: "ضد البقع." }],
    lede: { fr: "Pour hydrater, unifier le teint et fixer le sérum, avant l'écran solaire.", ar: "لترطيب البشرة وتوحيد لونها وتثبيت السيروم، قبل واقي الشمس." },
    media: "pack",
    mediaAlt: { fr: "Le flacon pompe de la crème anti-taches OTAGE, 50 ml", ar: "عبوة الكريم ضد البقع من OTAGE بمضخة، 50 مل" },
    // le bénéfice du soin (les 3 objections et le prix sont communs à toutes les fiches)
    perks: [{ icon: "halfTone", label: { fr: "Unifie le teint", ar: "يوحد لون البشرة" } }],
    upsell: { flag: { fr: "+20 ml pour {d} DH de plus", ar: "‎+20 مل مقابل {d} درهم إضافية" }, nudge: { fr: "+20 ml pour {d} DH", ar: "‎+20 مل مقابل {d} درهم" } },
    lab: {
      title: [{ fr: "La crème anti-taches :", ar: "الكريم ضد البقع:" }, { fr: "ses 3 actifs.", ar: "مكوناته الثلاثة." }],
      alt: { fr: "L’étiquette de la crème : niacinamide, acide hyaluronique, AHA, 50 ml", ar: "ملصق الكريم: نياسيناميد، حمض الهيالورونيك، AHA، ‏50 مل" },
      ingredients: [
        { name: { fr: "Niacinamide", ar: "نياسيناميد" }, where: label, role: { fr: "Vitamine B3 : aide à unifier le teint et à atténuer les taches.", ar: "فيتامين B3: يساعد على توحيد لون البشرة وتخفيف مظهر البقع." } },
        { name: { fr: "Acide hyaluronique", ar: "حمض الهيالورونيك" }, where: label, role: { fr: "Retient l'eau : la peau reste souple toute la journée.", ar: "يحتفظ بالماء: البشرة تبقى ليّنة طول اليوم." } },
        { name: { fr: "AHA", ar: "أحماض AHA" }, where: label, role: { fr: "Acides de fruits qui affinent le grain de peau. Écran solaire le matin.", ar: "أحماض فواكه تنعّم ملمس البشرة. واقي الشمس في الصباح." } },
      ],
    },
    // mode d'emploi : pour qui (60 mots max), étapes, résultats honnêtes (arabe « À relire par un natif »)
    use: {
      forWho: { fr: "Pour un teint irrégulier ou marqué par des taches. C'est l'étape 3 de la routine, matin et soir, après le sérum.", ar: "للبشرة ذات اللون غير الموحد أو التي بها بقع. هو الخطوة 3 في الروتين، صباحًا ومساءً، بعد السيروم." },
      steps: [
        { fr: "Après le sérum, prends une noisette de crème.", ar: "بعد السيروم، خذي كمية صغيرة من الكريم." },
        { fr: "Applique sur le visage et le cou.", ar: "ضعيه على الوجه والرقبة." },
        { fr: "Masse vers le haut. Le matin, termine par l'écran solaire.", ar: "دلّكي نحو الأعلى. في الصباح، اختمي بواقي الشمس." },
      ],
      results: { fr: "La peau est hydratée dès l'application. Les taches, elles, s'atténuent petit à petit avec la routine complète.", ar: "البشرة مرطبة منذ الاستعمال. أما البقع فتخف شيئًا فشيئًا مع الروتين الكامل." },
    },
  },
  ecran: {
    tag: { fr: "N° 04 · Routine anti-taches", ar: "رقم 04 · روتين ضد البقع" },
    eyebrow: { fr: "N° 04 sur 04 · Routine anti-taches", ar: "رقم 04 من 04 · روتين ضد البقع" },
    title: [{ fr: "Écran solaire", ar: "واقي الشمس" }, { fr: "SPF 50.", ar: "SPF 50." }],
    lede: { fr: "Pour protéger ta peau des UVA et des UVB, et limiter le retour des taches.", ar: "لحماية بشرتك من UVA و UVB، والحد من عودة البقع." },
    media: "pack",
    mediaAlt: { fr: "Le flacon pompe de l’écran solaire SPF 50 OTAGE, 50 ml", ar: "عبوة واقي الشمس SPF 50 من OTAGE بمضخة، 50 مل" },
    // le bénéfice du soin (les 3 objections et le prix sont communs à toutes les fiches)
    perks: [{ icon: "sun", label: { fr: "SPF 50, UVA et UVB", ar: "SPF 50، UVA و UVB" } }],
    upsell: { flag: { fr: "+20 ml pour {d} DH de plus", ar: "‎+20 مل مقابل {d} درهم إضافية" }, nudge: { fr: "+20 ml pour {d} DH", ar: "‎+20 مل مقابل {d} درهم" } },
    lab: {
      title: [{ fr: "L'écran SPF 50 :", ar: "واقي SPF 50:" }, { fr: "ses 2 protections.", ar: "نوعا الحماية." }],
      alt: { fr: "L’étiquette de l’écran : SPF 50, haute protection UVA/UVB, 50 ml", ar: "ملصق الواقي: SPF 50، حماية عالية من UVA/UVB، ‏50 مل" },
      ingredients: [
        { name: { fr: "SPF 50", ar: "SPF 50" }, where: label, role: { fr: "Le plus haut niveau de protection contre les coups de soleil (UVB).", ar: "أعلى مستوى من الحماية من حروق الشمس (UVB)." } },
        { name: { fr: "UVA / UVB", ar: "UVA / UVB" }, where: label, role: { fr: "Protège aussi des UVA, ceux qui foncent les taches et les font revenir.", ar: "يحمي أيضًا من UVA، الأشعة التي تُغمّق البقع وتعيدها." } },
      ],
    },
    // mode d'emploi : pour qui (60 mots max), étapes, résultats honnêtes (arabe « À relire par un natif »)
    use: {
      forWho: { fr: "Pour toute peau qui suit une routine anti-taches. C'est l'étape 4, le matin seulement.", ar: "لكل بشرة تتبع روتينًا ضد البقع. هو الخطوة 4، في الصباح فقط." },
      steps: [
        { fr: "Le matin, en dernier, après la crème.", ar: "في الصباح، كآخر خطوة بعد الكريم." },
        { fr: "Applique sur tout le visage.", ar: "ضعيه على كامل الوجه." },
        { fr: "Au soleil, renouvelle toutes les 2 heures.", ar: "تحت الشمس، جدديه كل ساعتين." },
      ],
      results: { fr: "L'écran ne fait pas disparaître les taches : il limite leur retour. C'est lui qui laisse le sérum et la crème agir.", ar: "الواقي لا يزيل البقع: يحد من عودتها. وهو ما يسمح للسيروم والكريم بالعمل." },
    },
  },
  yeux: {
    tag: { fr: "N° 05 · Contour des yeux", ar: "رقم 05 · محيط العين" },
    eyebrow: { fr: "N° 05 · Contour des yeux", ar: "رقم 05 · محيط العين" },
    title: [{ fr: "Sérum", ar: "سيروم" }, { fr: "contour des yeux.", ar: "محيط العين." }],
    lede: { fr: "Pour atténuer l'aspect des cernes et rafraîchir le regard, matin et soir.", ar: "لتخفيف مظهر الهالات وإنعاش النظرة، صباحًا ومساءً." },
    media: "pack",
    mediaAlt: { fr: "Le flacon du sérum contour des yeux OTAGE, 15 ml", ar: "عبوة سيروم محيط العين من OTAGE، 15 مل" },
    // le bénéfice du soin (les 3 objections et le prix sont communs à toutes les fiches)
    perks: [{ icon: "eye", label: { fr: "Atténue les cernes", ar: "يخفف الهالات" } }],
    unitWord: { one: { fr: "sérum", ar: "سيروم" }, many: { fr: "sérums", ar: "سيرومات" } },
    lab: {
      title: [{ fr: "Le contour des yeux :", ar: "سيروم محيط العين:" }, { fr: "ses 3 actifs.", ar: "مكوناته الثلاثة." }],
      alt: { fr: "L’étiquette du sérum contour des yeux : aloe vera, acide hyaluronique, caféine, 15 ml", ar: "ملصق سيروم محيط العين: ألوفيرا، حمض الهيالورونيك، كافيين، 15 مل" },
      ingredients: [
        { name: { fr: "Caféine", ar: "كافيين" }, where: label, role: { fr: "Aide à atténuer l'aspect des poches et des cernes.", ar: "يساعد على تخفيف مظهر الانتفاخ والهالات." } },
        { name: { fr: "Acide hyaluronique", ar: "حمض الهيالورونيك" }, where: label, role: { fr: "Hydrate la peau fine sous l'œil.", ar: "يرطب البشرة الرقيقة تحت العين." } },
        { name: { fr: "Aloe vera", ar: "ألوفيرا" }, where: label, role: { fr: "Apaise et rafraîchit dès l'application.", ar: "تهدئ وتنعش من أول استعمال." } },
      ],
    },
    // mode d'emploi : pour qui (60 mots max), étapes, résultats honnêtes (arabe « À relire par un natif »)
    use: {
      forWho: { fr: "Pour les cernes et le contour des yeux fatigué. Texture légère, applicateur bille, compatible avec le maquillage.", ar: "للهالات السوداء ومحيط العين المتعب. قوام خفيف، بكرة دوارة، يوضع تحت المكياج." },
      steps: [
        { fr: "Matin et soir, sur peau propre.", ar: "صباحًا ومساءً، على بشرة نظيفة." },
        { fr: "Passe la bille sous l'œil, de l'intérieur vers l'extérieur.", ar: "مرري البكرة تحت العين، من الداخل إلى الخارج." },
        { fr: "Tapote doucement du bout du doigt.", ar: "ربّتي بلطف بطرف الإصبع." },
      ],
      results: { fr: "Une sensation de fraîcheur dès l'application. Sur les cernes, l'effet dépend de leur origine : hérédité, fatigue ou pigment.", ar: "إحساس بالانتعاش منذ الاستعمال. أما الهالات، فالنتيجة تتوقف على سببها: الوراثة أو التعب أو الصبغة." },
    },
  },
  deo: {
    tag: { fr: "N° 06 · Soin du corps · 50 ml", ar: "رقم 06 · العناية بالجسم · 50 مل" },
    eyebrow: { fr: "N° 06 · Nouveau · 50 ml", ar: "جديد · مصنوع في المغرب" },
    title: [{ fr: "Déodorant crème", ar: "مزيل العرق" }, { fr: "OTAGE.", ar: "كريم." }],
    lede: { fr: "Pour les odeurs, avec 5 ingrédients et sans sels d'aluminium.", ar: "بلسم ذائب يعتني بالروائح. خمسة مكونات، لا شيء غيرها." },
    media: "photo",
    mediaAlt: { fr: "Le pot de déodorant crème OTAGE ouvert, tenu à deux mains, un doigt dans le baume", ar: "علبة مزيل العرق كريم OTAGE مفتوحة بين يدين، وإصبع في البلسم" },
    // le bénéfice du soin (les 3 objections et le prix sont communs à toutes les fiches)
    perks: [{ icon: "waves", label: { fr: "Agit sur les odeurs", ar: "يعمل على الروائح" } }],
    unitWord: { one: { fr: "pot", ar: "علبة" }, many: { fr: "pots", ar: "علب" } },
    lab: {
      title: [{ fr: "Le déodorant crème :", ar: "خمسة مكونات." }, { fr: "ses 5 ingrédients.", ar: "ولا واحد زيادة." }],
      alt: { fr: "L’étiquette du pot : oxyde de zinc, huile de coco, huile de jojoba, 50 ml", ar: "ملصق العلبة: أكسيد الزنك، زيت جوز الهند، زيت الجوجوبا، 50 مل" },
      ingredients: [
        { name: { fr: "Oxyde de zinc", ar: "أكسيد الزنك" }, where: label, role: { fr: "Limite les bactéries qui causent les odeurs.", ar: "معدن يحد من تكاثر البكتيريا المسؤولة عن الروائح." } },
        { name: { fr: "Huile de coco", ar: "زيت جوز الهند" }, where: label, role: { fr: "Donne au baume sa texture fondante.", ar: "يمنح البلسم قوامه الذائب ويساهم في محاربة الروائح." } },
        { name: { fr: "Huile de jojoba", ar: "زيت الجوجوبا" }, where: label, role: { fr: "Nourrit et adoucit la peau des aisselles.", ar: "يغذي وينعّم البشرة الرقيقة للإبط." } },
        { name: { fr: "Cire d’abeille", ar: "شمع العسل" }, where: { fr: "dans le baume", ar: "في البلسم" }, role: { fr: "Donne sa tenue au baume.", ar: "يمنح البلسم تماسكه ويحمي البشرة." } },
        { name: { fr: "Vitamine E", ar: "فيتامين E" }, where: { fr: "dans le baume", ar: "في البلسم" }, role: { fr: "Antioxydant qui protège la formule dans le temps.", ar: "مضاد للأكسدة يحمي التركيبة والبشرة." } },
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
    // mode d'emploi : pour qui (60 mots max), étapes, résultats honnêtes (arabe « À relire par un natif »)
    use: {
      forWho: { fr: "Pour toi si tu veux un déodorant sans sels d'aluminium. Il agit sur les odeurs, pas sur la transpiration.", ar: "لك إن كنت تريدين مزيل عرق بدون أملاح الألمنيوم. يعمل على الروائح، لا على التعرق." },
      steps: [
        { fr: "Le matin, sur une aisselle propre et sèche.", ar: "في الصباح، على إبط نظيف وجاف." },
        { fr: "Prends un peu de baume du bout du doigt.", ar: "خذي قليلًا من البلسم بطرف الإصبع." },
        { fr: "Laisse-le fondre, puis applique.", ar: "اتركيه يذوب، ثم ضعيه." },
      ],
      results: { fr: "Il ne bloque pas la transpiration : transpirer est normal. Il agit sur les odeurs, et la tenue varie d'une personne à l'autre.", ar: "لا يمنع التعرق: التعرق أمر طبيعي. يعمل على الروائح، ومدة فعاليته تختلف من شخص لآخر." },
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
  only: { fr: "{p} DH le pot", ar: "{p} درهم للعلبة" },
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
  reviewNote: { fr: "Chaque peau est différente : c’est un témoignage, pas une promesse.", ar: "كل بشرة مختلفة: هذه شهادة، وليست وعدًا." },
  prev: { fr: "Précédent", ar: "السابق" },
  next: { fr: "Suivant", ar: "التالي" },
  faqChap: { fr: "Questions fréquentes", ar: "أسئلة شائعة" },
  faqTitle: { fr: "Tu te poses", ar: "تتساءلين" },
  faqTitleEm: { fr: "la question ?", ar: "عن شيء؟" },
  moreChap: { fr: "Nos autres soins", ar: "منتجاتنا الأخرى" },
  moreTitle: { fr: "Les autres", ar: "باقي" },
  moreTitleEm: { fr: "soins OTAGE.", ar: "منتجات OTAGE." },
  madeIn: { fr: "Fabrication marocaine", ar: "صنع مغربي" },
  // section « Mode d'emploi » des fiches
  useChap: { fr: "Mode d’emploi", ar: "طريقة الاستعمال" },
  forWhoQ: { fr: "{x}, pour qui ?", ar: "{x}، لمن؟" },
  howQ: { fr: "Comment utiliser {x} ?", ar: "كيف أستعمل {x}؟" },
  resultsQ: { fr: "Combien de temps pour voir des résultats ?", ar: "متى تظهر النتائج؟" },
  guides: { fr: "Nos guides", ar: "دلائلنا" },
  // tuiles du haut de fiche : les 3 objections, et les frais sous le bouton
  atoutDelivery: { fr: "Livraison 24 à 72 h", ar: "التوصيل خلال 24 إلى 72 ساعة" },
  atoutPay: { fr: "Paiement à la livraison", ar: "الدفع عند الاستلام" },
  atoutReturn: { fr: "Retour 7 jours", ar: "الإرجاع خلال 7 أيام" },
  hzFee: { fr: "Livraison : {a} à {b} DH selon ta ville.", ar: "التوصيل: من {a} إلى {b} درهم حسب مدينتك." },
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
  threeBoxes: { fr: "3 cases, l’e-mail si tu veux", ar: "3 خانات، والبريد إن أردت" },
  nom: { fr: "Ton nom", ar: "اسمك" },
  nomEx: { fr: "Salma Bennani", ar: "سلمى بناني" },
  tel: { fr: "Ton téléphone", ar: "هاتفك" },
  telHint: { fr: "on t’appelle pour confirmer", ar: "نتصل بك للتأكيد" },
  ville: { fr: "Ta ville", ar: "مدينتك" },
  villeEx: { fr: "Fès", ar: "فاس" },
  quickCities: { fr: "Villes rapides", ar: "مدن سريعة" },
  // champ e-mail : mêmes textes que les formulaires de l'accueil (src/home/text.ts, offersEmail…)
  email: { fr: "E-mail", ar: "البريد الإلكتروني" },
  emailOpt: { fr: "facultatif", ar: "اختياري" },
  emailHint: { fr: "Reçois ta confirmation par email.", ar: "توصلي بتأكيد طلبك عبر البريد الإلكتروني." },
  emailConsent: { fr: "Ton adresse sert uniquement à t’envoyer la confirmation de cette commande. Tu peux demander sa suppression à tout moment (loi 09-08).", ar: "يُستعمل عنوانك فقط لإرسال تأكيد هذا الطلب. يمكنك طلب حذفه في أي وقت (القانون 09-08)." },
  errEmail: { fr: "Vérifie ton adresse e-mail (ou laisse le champ vide).", ar: "تحققي من بريدك الإلكتروني (أو اتركي الخانة فارغة)." },
  doneEmail: { fr: "La confirmation t’est aussi envoyée par e-mail à <b>{email}</b>.", ar: "يُرسل إليك تأكيد الطلب أيضًا عبر البريد الإلكتروني إلى <b>{email}</b>." },
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
