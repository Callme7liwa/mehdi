/* Pages « problèmes de peau » : /taches-pigmentaires, /cernes, /taches-acne, /melasma-grossesse.
   Conseils généraux, sans promesse médicale. Les informations sur les produits viennent de products.ts.
   TOUS LES TEXTES DE CE FICHIER SONT « À RELIRE » (idéalement par un dermatologue ou un pharmacien)
   avant la mise en ligne : chaque page est marquée ci-dessous. */
import type { Faq } from "./faq";
import type { Img, ProductKey } from "./products";

/** Un bloc de texte : un paragraphe, une liste à puces, ou des étapes numérotées. */
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
  /** Encadré « demande l'avis d'un professionnel ». */
  advice: string;
  /** Titre en question au-dessus de l'encadré (« Quand consulter un dermatologue ? ») ; sans titre, l'encadré commence par « Demande l'avis d'un professionnel ». */
  adviceTitle?: string;
  productsTitle: string;
  productsIntro: string;
  products: { key: ProductKey; why: string }[];
  /** Afficher la routine anti-taches en 4 étapes. */
  routine: boolean;
  faq: Faq[];
}

const image = (file: string, w: number, h: number, fr: string): Img => ({ src: `/images/${file}`, w, h, alt: { fr, ar: fr } });

export const problems: ProblemPage[] = [
  /* ------------------------------------------------------------------ À relire : /taches-pigmentaires */
  {
    slug: "taches-pigmentaires",
    label: "Taches pigmentaires",
    h1: "Taches pigmentaires : causes et routine pour les atténuer",
    metaTitle: "Taches pigmentaires : causes et routine | OTAGE",
    metaDescription: "Taches pigmentaires : d'où elles viennent, ce qui les fonce et la routine pour les atténuer pas à pas. Conseils simples, sans promesse miracle.",
    image: image("gamme-anti-taches-4-soins-papier-rouge.webp", 1600, 1600, "Les 4 soins de la routine anti-taches OTAGE"),
    // réponse directe en 2 phrases, en haut de page : le bloc que les moteurs et les IA peuvent citer tel quel
    intro: ["Une tache pigmentaire est une zone où la peau fabrique trop de mélanine. Pour l'atténuer : écran solaire chaque matin et routine régulière, avec patience."],
    sections: [
      {
        h2: "D'où viennent les taches pigmentaires ?",
        body: [{ list: ["Le soleil : les UV stimulent la mélanine, les taches foncent.", "Les hormones : grossesse ou contraception peuvent donner un mélasma.", "Une inflammation : un bouton ou une brûlure laisse une marque brune.", "L'âge : le soleil accumulé fait apparaître de petites taches."] }],
      },
      {
        h2: "Qu'est-ce qui aide vraiment ?",
        body: [{ list: ["L'écran solaire chaque jour, même en hiver.", "La régularité, matin et soir, plus que le nombre de produits.", "Ne pas gratter ni percer les boutons.", "Tester tout nouveau soin 24 h sur une petite zone."] }],
      },
    ],
    adviceTitle: "Quand consulter un dermatologue ?",
    advice: "Dans la plupart des cas, une tache pigmentaire est sans danger. Consulte si elle change de forme, de couleur ou de taille, saigne ou démange.",
    productsTitle: "Quelle routine pour atténuer les taches ?",
    productsIntro: "Le matin, les 4 étapes. Le soir, les 3 premières.",
    products: [
      { key: "gel", why: "Masse 30 secondes sur peau humide, puis rince." },
      { key: "serum", why: "3 à 4 gouttes sur peau sèche, en tapotant." },
      { key: "creme", why: "Une noisette sur le visage et le cou." },
      { key: "ecran", why: "Le matin, en dernier." },
    ],
    routine: true,
    faq: [
      { q: "Combien de temps pour atténuer une tache pigmentaire ?", a: ["Il n'y a pas de délai garanti. Les taches s'atténuent petit à petit, avec régularité et écran solaire."] },
      { q: "Les taches peuvent-elles revenir ?", a: ["Oui, surtout avec le soleil. C'est pour ça que l'écran SPF 50 est dans la routine du matin."] },
      { q: "Faut-il de l'écran solaire quand il n'y a pas de soleil ?", a: ["Oui. Les UVA traversent les nuages et les vitres."] },
      { q: "J'ai la peau sensible, je peux suivre la routine ?", a: ["Fais d'abord un test de 24 h sur une petite zone. En cas de rougeur, arrête et demande conseil."] },
    ],
  },

  /* ------------------------------------------------------------------ À relire : /cernes */
  {
    slug: "cernes",
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
