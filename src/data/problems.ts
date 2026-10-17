/* Pages « problèmes de peau » : /taches-brunes-visage (le pilier), /cernes, /taches-acne, /melasma-grossesse.
   Conseils généraux, sans promesse médicale. Les informations sur les produits viennent de products.ts.
   TOUS LES TEXTES DE CE FICHIER SONT « À RELIRE » (idéalement par un dermatologue ou un pharmacien)
   avant la mise en ligne : chaque page est marquée ci-dessous.
   Une page entre dans l'index seulement quand sa relecture est confirmée : champ `reviewed` (voir Review dans site.ts),
   par exemple `reviewed: { date: "2026-11-02", by: "dr-seddiki" }`. La version arabe suit le statut de la page française. */
import type { Faq } from "./faq";
import type { Img, ProductKey } from "./products";
import type { Review } from "./site";

/** Un bloc de texte : un paragraphe, une liste à puces, ou des étapes numérotées.
    Texte enrichi (paragraphes, puces, étapes, intro, encadré) : [libellé](/chemin) = lien interne, **gras**, [n] = renvoi à la source n. */
export type Block = string | { list: string[] } | { steps: string[] };
export interface ProblemPage {
  slug: string;
  label: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  image: Img;
  intro: string[];
  /** `part` : titre d'une grande partie, affiché avant la section (les titres des sections passent alors en h3). */
  sections: { part?: string; h2: string; body: Block[] }[];
  /** Encadré « demande l'avis d'un professionnel » : une phrase, ou plusieurs blocs. */
  advice: string | Block[];
  /** Titre en question au-dessus de l'encadré (« Quand consulter un dermatologue ? ») ; sans titre, l'encadré commence par « Demande l'avis d'un professionnel ». */
  adviceTitle?: string;
  productsTitle: string;
  productsIntro: string;
  /** Les soins conseillés ; vide = pas de bloc « soins » (le texte les présente déjà). */
  products: { key: ProductKey; why: string }[];
  /** Afficher la routine anti-taches en 4 étapes. */
  routine: boolean;
  faq: Faq[];
  /** Sources citées dans le texte par [n] (n = rang dans cette liste, à partir de 1). */
  sources?: { label: string; url: string }[];
  /** Date de première publication (AAAA-MM-JJ), pour le JSON-LD Article (datePublished). */
  published?: string;
  /** Relecture du pharmacien confirmée. Sans elle : noindex, hors sitemap et llms.txt, sans mention « Relu par ». */
  reviewed?: Review;
}

const image = (file: string, w: number, h: number, fr: string): Img => ({ src: `/images/${file}`, w, h, alt: { fr, ar: fr } });

export const problems: ProblemPage[] = [
  /* ------------------------------------------------------------------ Relu par Dr Seddiki le 17 octobre 2026 : /taches-brunes-visage
     Pilier « taches brunes » (docs/carte-thematique.md), texte de docs/brouillons/01-pilier-taches-brunes-visage.md validé tel quel.
     Remplace /taches-pigmentaires (redirection 301, next.config.ts). Pas encore de version arabe.
     Aucune phrase de renvoi sans lien : les renvois vers les pages prévues par la carte et pas encore créées sont retirés,
     on les remettra (phrase + lien) à la création de chaque page. Le mélasma renvoie à /melasma-grossesse en attendant /melasma. */
  {
    slug: "taches-brunes-visage",
    label: "Taches brunes du visage",
    h1: "Taches brunes du visage : le guide d'un pharmacien",
    metaTitle: "Taches brunes du visage : causes et routine | OTAGE",
    metaDescription: "Taches brunes : d'où elles viennent, comment reconnaître leur type, pourquoi le soleil les fonce et quelle routine suivre. Conseils d'un pharmacien.",
    image: image("gamme-anti-taches-4-soins-papier-rouge.webp", 1600, 1600, "Les 4 soins de la routine anti-taches OTAGE"),
    intro: ["Une tache brune, c'est une zone où ta peau a fabriqué trop de mélanine, le pigment qui lui donne sa couleur [1]. Sur le visage, les trois plus fréquentes sont le mélasma, les marques laissées par les boutons et les taches solaires [2][3][4]. Pour toutes, le geste le plus important est le même : protéger ta peau du soleil, chaque jour [5]."],
    sections: [
      {
        h2: "Qu'est-ce qu'une tache brune, et pourquoi la peau fabrique-t-elle trop de mélanine ?",
        body: [
          "Ta peau contient des cellules qui fabriquent la mélanine. C'est elle qui donne leur couleur à la peau, et elle la protège en partie du soleil.",
          "Parfois, ces cellules en produisent trop à un endroit précis. La zone devient plus foncée que le reste du visage : c'est une tache brune, qu'on appelle aussi tache pigmentaire ou hyperpigmentation [1].",
          "Trois choses peuvent pousser la peau à en fabriquer trop :",
          { list: [
            "Le soleil : les rayons UV, et aussi la lumière visible, stimulent la mélanine [2][6].",
            "Les hormones : la grossesse ou la pilule peuvent déclencher un mélasma [2][7].",
            "Une inflammation : un bouton, une irritation ou une brûlure peut laisser une marque brune après sa guérison [1][8].",
          ] },
          "Une tache brune n'est pas sale et ne vient pas d'un manque d'hygiène. Dans la grande majorité des cas, elle est sans danger pour la santé [3][4]. Mais elle peut gêner, et c'est une raison suffisante pour s'en occuper.",
        ],
      },
      {
        h2: "Comment reconnaître son type de taches : mélasma, marques d'acné, taches solaires ?",
        body: [
          "Savoir d'où vient ta tache aide à choisir les bons gestes. Voici les trois cas les plus fréquents.",
          "**Le mélasma.** Des plaques brunes, souvent des deux côtés du visage, de façon presque symétrique. Elles apparaissent surtout sur les joues, le front, le nez et au-dessus de la lèvre supérieure [2]. Il touche plus souvent les femmes, et plus souvent les peaux mates [2][7]. Pendant la grossesse, on l'appelle aussi « masque de grossesse ». Tout savoir : [le mélasma](/melasma-grossesse).",
          "**Les marques d'acné.** Une tache plate et brune, à l'endroit exact d'un ancien bouton. Ce n'est pas une cicatrice : la surface de la peau est lisse, seule la couleur change [8]. Ces marques sont plus fréquentes et plus foncées sur peau mate [1][8]. Tout savoir : [les taches d'acné](/taches-acne).",
          "**Les taches solaires.** De petites taches rondes ou ovales, bien délimitées, d'une couleur assez uniforme. Elles apparaissent sur les zones les plus exposées au soleil, souvent avec les années [4].",
          "Si tu ne sais pas à quel type appartient ta tache, demande à un dermatologue : lui seul peut poser un diagnostic.",
        ],
      },
      {
        h2: "Pourquoi les taches foncent-elles et reviennent-elles au soleil ?",
        body: [
          "Le soleil est le premier ennemi des taches brunes. Il pousse la peau à fabriquer plus de mélanine, et les zones déjà foncées réagissent plus vite que le reste du visage [2][7].",
          "C'est pour ça qu'une tache peut s'atténuer pendant l'hiver, puis revenir en quelques jours d'été. Pour le mélasma, ce retour est fréquent, même après un bon résultat [2][6].",
          "Au Maroc, le soleil est présent presque toute l'année. Les UV restent présents même quand le ciel est couvert, et en hiver [5][9]. La protection ne s'arrête donc pas à l'été.",
          "Les gestes recommandés par l'Organisation mondiale de la santé, dans cet ordre [5] :",
          { list: [
            "Chercher l'ombre, surtout au milieu de la journée.",
            "Porter un chapeau à larges bords et des lunettes de soleil.",
            "Mettre un écran solaire à large spectre sur la peau que les vêtements ne couvrent pas.",
          ] },
          "L'écran solaire ne sert pas à rester plus longtemps au soleil [5]. Il complète l'ombre et le chapeau, il ne les remplace pas.",
          "Certains gestes aggravent aussi les taches : le jus de citron vert sur la peau puis le soleil [10], gratter ou percer les boutons [11], ou des produits vendus sans contrôle, qui peuvent contenir des corticoïdes ou du mercure non déclarés [12].",
        ],
      },
      {
        h2: "Quelle routine suivre, et en combien de temps les taches s'atténuent-elles ?",
        body: [
          "Une bonne routine est simple et régulière. Matin et soir, plus que le nombre de produits, c'est la régularité qui compte.",
          "Les dermatologues recommandent un ordre logique : nettoyer, appliquer le soin de traitement, hydrater, puis protéger du soleil le matin [13]. Trop de produits à la fois peut irriter la peau [13]. Et une peau irritée marque plus [1][12].",
          "La routine OTAGE suit cet ordre, en 4 étapes :",
          { steps: [
            "Le matin et le soir : le [gel nettoyant](/soins/gel-nettoyant), sans sulfate, sur peau humide.",
            "Le [sérum anti-taches](/soins/serum-anti-taches), à l'alpha-arbutine, sur peau sèche.",
            "La [crème anti-taches](/soins/creme-anti-taches), à la niacinamide, qui hydrate et unifie le teint.",
            "Le matin seulement : l'[écran solaire SPF 50](/soins/ecran-solaire-spf50), en dernier, pour limiter le retour des taches.",
          ] },
          "Le soir, la routine s'arrête à l'étape 3.",
          "En combien de temps ? Personne ne peut te promettre un délai. Les taches s'atténuent petit à petit, avec la régularité et l'écran solaire chaque matin. Le temps dépend de ta peau, du type de tache et de son ancienneté [2][3]. Les premiers jours, ne t'attends pas à voir une différence : c'est normal.",
          "Avant tout nouveau soin, fais un test de 24 h sur une petite zone, par exemple dans le pli du coude. En cas de rougeur ou de brûlure, arrête et demande conseil [12].",
          "Enceinte ou allaitante ? Demande d'abord à ton médecin ou à ton pharmacien avant d'utiliser un soin contre les taches. Montre-lui la liste des ingrédients [14].",
        ],
      },
    ],
    adviceTitle: "Quand montrer une tache à un dermatologue ?",
    advice: [
      "La plupart des taches brunes du visage sont sans danger. Mais certaines doivent être vues rapidement par un dermatologue [15] :",
      { list: [
        "Une tache qui change de taille, de forme ou de couleur.",
        "Une tache aux bords irréguliers, ou de plusieurs couleurs.",
        "Une tache qui saigne, démange ou ne ressemble pas aux autres.",
        "Une nouvelle tache qui apparaît et grandit.",
      ] },
      "Consulte aussi si ton mélasma est étendu ou ancien, si tu as encore des boutons, ou si tu ne sais pas quel est ton type de tache. Un dermatologue peut proposer des traitements sur ordonnance ou des soins en cabinet [3].",
    ],
    // la routine et ses 4 soins sont dans le texte (section 4) : pas de bloc « soins » en double
    productsTitle: "",
    productsIntro: "",
    products: [],
    routine: false,
    faq: [
      { q: "Les taches brunes sont-elles dangereuses ?", a: ["Le plus souvent, non. Mais une tache qui change, saigne ou démange doit être montrée à un dermatologue."] },
      { q: "Les taches peuvent-elles disparaître complètement ?", a: ["Aucun soin ne peut le promettre. Elles s'atténuent plus ou moins selon leur type, et elles peuvent revenir avec le soleil."] },
      { q: "Faut-il de l'écran solaire en hiver ?", a: ["Oui. Les UV sont présents toute l'année, même par temps couvert."] },
      { q: "Une peau mate a-t-elle besoin d'écran solaire ?", a: ["Oui. Les peaux mates marquent plus facilement après une inflammation, et le soleil fonce ces marques."] },
    ],
    sources: [
      { label: "DermNet (Nouvelle-Zélande), « Postinflammatory hyperpigmentation », V. Ngan, mise à jour A. Oakley, décembre 2015.", url: "https://dermnetnz.org/topics/postinflammatory-hyperpigmentation" },
      { label: "DermNet, « Melasma », A. Oakley, mise à jour B. J. Doolan et M. Gupta, décembre 2025.", url: "https://dermnetnz.org/topics/melasma" },
      { label: "American Academy of Dermatology (AAD), « Melasma: Diagnosis and treatment », mise à jour le 15 février 2022.", url: "https://www.aad.org/public/diseases/a-z/melasma-treatment" },
      { label: "DermNet, « Solar lentigo », A. Fitzpatrick et J. Chan, relu en novembre 2025.", url: "https://dermnetnz.org/topics/solar-lentigo" },
      { label: "Organisation mondiale de la santé, « Ultraviolet radiation », aide-mémoire, 21 juin 2022.", url: "https://www.who.int/news-room/fact-sheets/detail/ultraviolet-radiation" },
      { label: "Morgado-Carrasco D, Piquero-Casals J, Granger C, Trullàs C, Passeron T. « Melasma: The need for tailored photoprotection to improve clinical outcomes ». Photodermatol Photoimmunol Photomed. 2022;38(6):515-521.", url: "https://doi.org/10.1111/phpp.12783" },
      { label: "AAD, « Melasma: Causes », mise à jour le 15 février 2022.", url: "https://www.aad.org/public/diseases/a-z/melasma-causes" },
      { label: "Davis EC, Callender VD. « Postinflammatory hyperpigmentation: a review of the epidemiology, clinical features, and treatment options in skin of color ». J Clin Aesthet Dermatol. 2010;3(7):20-31.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2921758/" },
      { label: "AAD, « How to apply sunscreen », mise à jour le 15 août 2025.", url: "https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/how-to-apply-sunscreen" },
      { label: "DermNet, « Phytophotodermatitis », I. Coulson, novembre 2021.", url: "https://dermnetnz.org/topics/phytophotodermatitis" },
      { label: "AAD, « Acne scars: Causes », mise à jour le 8 décembre 2023.", url: "https://www.aad.org/public/diseases/acne/derm-treat/scars/causes" },
      { label: "AAD, « How to fade dark spots in darker skin tones », mise à jour le 10 mars 2025.", url: "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/fade-dark-spots" },
      { label: "AAD, « Should I apply my skin care products in a certain order? ».", url: "https://www.aad.org/public/everyday-care/skin-care-basics/care/apply-skin-care-certain-order" },
      { label: "Bozzo P, Chua-Gocheco A, Einarson A. « Safety of skin care products during pregnancy ». Can Fam Physician. 2011;57(6):665-667.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3114665/" },
      { label: "AAD, « What to look for: ABCDEs of melanoma ».", url: "https://www.aad.org/public/diseases/skin-cancer/abcdes-melanoma" },
    ],
    published: "2026-10-17",
    reviewed: { date: "2026-10-17", by: "dr-seddiki" },
  },

  /* ------------------------------------------------------------------ À relire : /cernes */
  {
    slug: "cernes",
    published: "2026-10-10", // 6132920 : première mise en ligne des pages conseils
    label: "Cernes",
    h1: "Cernes : causes et gestes pour un regard reposé",
    metaTitle: "Cernes : causes et soin contour des yeux | OTAGE",
    metaDescription: "Cernes : d'où ils viennent, les gestes qui aident et comment appliquer un sérum contour des yeux à la caféine. Conseils simples, sans promesse miracle.",
    image: image("serum-contour-des-yeux-n05-application.webp", 1195, 1600, "Sérum contour des yeux OTAGE N°05 tenu près du visage"),
    // réponse directe en 2 phrases, en haut de page : le bloc que les moteurs et les IA peuvent citer tel quel
    intro: ["Les cernes viennent de l'hérédité, de la fatigue, d'une peau fine ou du pigment. Sommeil, protection solaire et soin contour des yeux aident à les atténuer."],
    sections: [
      {
        h2: "Pourquoi a-t-on des cernes ?",
        body: [{ list: ["L'hérédité : certaines familles ont le contour des yeux plus foncé.", "La fatigue : le teint devient terne, les cernes se voient plus.", "Une peau fine : les petits vaisseaux se voient (cernes bleutés).", "Le pigment : cernes bruns, accentués par le soleil et les frottements.", "L'âge : la peau s'affine et le contour de l'œil se creuse."] }],
      },
      {
        h2: "Qu'est-ce qui aide contre les cernes ?",
        body: [{ list: ["Dormir assez, à heures régulières.", "Ne pas te frotter les yeux ; te démaquiller en douceur.", "Protéger tes yeux du soleil : lunettes et écran solaire.", "Un soin contour des yeux matin et soir, sans tirer la peau."] }],
      },
      {
        h2: "Comment appliquer un sérum contour des yeux ?",
        body: [{ steps: ["Matin et soir, sur peau propre.", "Passe la bille sous l'œil, de l'intérieur vers l'extérieur.", "Tapote doucement du bout du doigt."] }],
      },
    ],
    adviceTitle: "Quand consulter un médecin ?",
    advice: "Si tes cernes apparaissent d'un coup, d'un seul côté, ou avec un gonflement. Un dermatologue peut aussi t'expliquer des cernes très marqués depuis toujours.",
    productsTitle: "Le soin OTAGE pour les cernes",
    productsIntro: "",
    products: [
      { key: "yeux", why: "Caféine, acide hyaluronique et aloe vera, applicateur bille de 15 ml." },
    ],
    routine: false,
    faq: [
      { q: "Un sérum peut-il faire disparaître les cernes ?", a: ["Non, aucun soin ne peut le promettre. Selon leur origine, ils s'atténuent plus ou moins."] },
      { q: "Peut-on le mettre sous le maquillage ?", a: ["Oui. Sa texture légère se glisse sous le maquillage."] },
      { q: "Je suis enceinte ou j'allaite, je peux l'utiliser ?", a: ["Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients."] },
    ],
  },

  /* ------------------------------------------------------------------ À relire : /taches-acne */
  {
    slug: "taches-acne",
    published: "2026-10-10", // 6132920 : première mise en ligne des pages conseils
    label: "Taches d'acné",
    h1: "Taches d'acné : pourquoi elles restent et comment les atténuer",
    metaTitle: "Taches d'acné : comment atténuer les marques | OTAGE",
    metaDescription: "Taches d'acné : pourquoi les boutons laissent des marques brunes, ce qui les aggrave et la routine pour les atténuer. Conseils simples, sans promesse.",
    image: image("femme-serum-anti-taches.webp", 1195, 1600, "Une femme tend le sérum anti-taches OTAGE"),
    // réponse directe en 2 phrases, en haut de page : le bloc que les moteurs et les IA peuvent citer tel quel
    intro: ["Une marque brune après un bouton est une tache, pas une cicatrice. Elle s'atténue avec le temps, plus vite si tu la protèges du soleil."],
    sections: [
      {
        h2: "Tache ou cicatrice : comment faire la différence ?",
        body: [{ list: ["Tache : plate, seule la couleur change. Brune, c'est une hyperpigmentation post-inflammatoire.", "Rose ou rouge : de petits vaisseaux encore dilatés, qui pâlissent avec le temps.", "Cicatrice : un creux ou une bosse. Un soin cosmétique n'y change rien."] }],
      },
      {
        h2: "Qu'est-ce qui aggrave les taches d'acné ?",
        body: [{ list: ["Percer ou gratter les boutons : la marque fonce.", "Le soleil sans protection : il fonce les taches et les fait durer.", "Les gommages agressifs et les produits irritants."] }],
      },
      {
        h2: "Qu'est-ce qui aide ?",
        body: [{ list: ["Nettoyer en douceur, matin et soir.", "Un écran solaire chaque matin.", "Une routine régulière, le temps qu'elle agisse.", "Tester tout nouveau soin 24 h sur une petite zone."] }],
      },
    ],
    adviceTitle: "Quand consulter un dermatologue ?",
    advice: "Si tu as encore des boutons, des kystes ou des cicatrices en creux. L'acné se traite, et un traitement évite de nouvelles marques.",
    productsTitle: "Quelle routine pour les marques brunes ?",
    productsIntro: "Elle atténue les taches, elle ne traite pas l'acné. Le soir, sans écran.",
    products: [
      { key: "gel", why: "Nettoie sans dessécher, sans sulfate." },
      { key: "serum", why: "3 à 4 gouttes sur peau sèche." },
      { key: "creme", why: "Hydrate et unifie le teint." },
      { key: "ecran", why: "Le matin, en dernier." },
    ],
    routine: true,
    faq: [
      { q: "Les taches d'acné partent-elles toutes seules ?", a: ["Souvent, oui, en plusieurs mois. Le soleil sans protection les fait durer."] },
      { q: "La routine anti-taches soigne-t-elle l'acné ?", a: ["Non : elle atténue les taches brunes, pas les boutons. Pour une acné active, vois un dermatologue."] },
      { q: "Et si j'ai encore des boutons ?", a: ["Demande d'abord à un dermatologue ou à un pharmacien. Puis fais un test de 24 h sur une petite zone."] },
    ],
  },

  /* ------------------------------------------------------------------ À relire : /melasma-grossesse */
  {
    slug: "melasma-grossesse",
    published: "2026-10-10", // 6132920 : première mise en ligne des pages conseils
    label: "Mélasma et grossesse",
    h1: "Mélasma et masque de grossesse : comprendre et se protéger",
    metaTitle: "Mélasma et masque de grossesse : que faire ? | OTAGE",
    metaDescription: "Mélasma et masque de grossesse : causes, rôle du soleil, précautions pendant la grossesse et l'allaitement, et quoi demander à ton médecin avant un soin.",
    image: image("ecran-solaire-spf50-plage-bouee.webp", 1600, 1600, "L'écran solaire SPF 50 OTAGE à la plage"),
    // réponse directe en 2 phrases, en haut de page : le bloc que les moteurs et les IA peuvent citer tel quel
    intro: ["Le mélasma donne des taches brunes symétriques, souvent pendant la grossesse. Le geste clé : te protéger du soleil, chaque jour."],
    sections: [
      {
        h2: "Pourquoi le mélasma apparaît-il ?",
        body: [{ list: ["Les hormones : grossesse, contraception, changements hormonaux.", "Le soleil : il déclenche et fonce les taches, même en peu de temps.", "Le terrain : peaux mates et certaines familles y sont plus sujettes."] }],
      },
      {
        h2: "Qu'est-ce qui aide à le limiter ?",
        body: [{ list: ["Te protéger du soleil chaque jour : chapeau, ombre, écran.", "Éviter le soleil aux heures chaudes.", "Ne pas irriter la peau : pas de gommage agressif.", "Être patiente : aucun soin ne peut promettre de le faire disparaître."] }],
      },
      {
        h2: "Enceinte ou allaitante : quelles précautions ?",
        body: [{ list: ["Te protéger du soleil, avec un écran validé par ton médecin.", "Ne pas multiplier les produits : fais valider chaque soin.", "Aucun traitement des taches sans avis médical.", "Rétinoïdes et hydroquinone sont déconseillés pendant la grossesse."] }],
      },
      {
        h2: "Et après la grossesse ?",
        body: ["Le masque s'atténue souvent dans les mois qui suivent, pas toujours. S'il reste, une routine anti-taches et l'écran solaire peuvent aider."],
      },
    ],
    adviceTitle: "Quand consulter un dermatologue ?",
    advice: "Si ton mélasma est étendu, ancien ou s'il persiste. Il existe des traitements médicaux, à décider avec lui.",
    productsTitle: "Quels soins OTAGE, avec l'accord de ton médecin ?",
    productsIntro: "Enceinte ou allaitante, utilise-les seulement après l'accord de ton médecin.",
    products: [
      { key: "ecran", why: "Le geste du matin, pour limiter le retour des taches." },
      { key: "serum", why: "Atténue les taches brunes." },
      { key: "creme", why: "Hydrate et unifie le teint." },
    ],
    routine: false,
    faq: [
      { q: "Le masque de grossesse disparaît-il après l'accouchement ?", a: ["Souvent, il s'atténue en quelques mois, pas toujours. S'il reste, vois un dermatologue."] },
      { q: "Puis-je utiliser les soins OTAGE enceinte ou en allaitant ?", a: ["Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients."] },
      { q: "Le soleil aggrave-t-il le mélasma ?", a: ["Oui. Il fonce les taches et le mélasma revient vite après une exposition."] },
    ],
  },
];

export const problemBySlug = (slug: string) => problems.find((p) => p.slug === slug);
