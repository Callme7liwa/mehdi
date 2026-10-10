/* Pages « problèmes de peau » : /taches-pigmentaires, /cernes, /taches-acne, /melasma-grossesse.
   Conseils généraux, sans promesse médicale. Les informations sur les produits viennent de products.ts.
   TOUS LES TEXTES DE CE FICHIER SONT « À RELIRE » (idéalement par un dermatologue ou un pharmacien)
   avant la mise en ligne : chaque page est marquée ci-dessous. */
import type { Faq } from "./faq";
import type { Img, ProductKey } from "./products";

export type Block = string | { list: string[] };
export interface ProblemPage {
  slug: string;
  label: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  image: Img;
  intro: string[];
  sections: { h2: string; body: Block[] }[];
  /** Encadré « demande l'avis d'un professionnel ». */
  advice: string;
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
    h1: "Taches pigmentaires sur le visage : causes, conseils et routine",
    metaTitle: "Taches pigmentaires du visage : causes et routine | OTAGE",
    metaDescription: "D'où viennent les taches pigmentaires (hyperpigmentation), ce qui les fait foncer et quelle routine anti-taches adopter. Soins fabriqués au Maroc.",
    image: image("gamme-anti-taches-4-soins-papier-rouge.webp", 1600, 1600, "Les 4 soins de la routine anti-taches OTAGE"),
    intro: [
      "Une tache pigmentaire est une zone de peau plus foncée que le reste du visage. On parle aussi de taches brunes ou d'hyperpigmentation. Elles ne sont pas dangereuses dans la grande majorité des cas, mais elles peuvent gêner.",
      "Cette page explique d'où elles viennent, ce qui les aggrave, et comment construire une routine régulière pour les atténuer petit à petit.",
    ],
    sections: [
      {
        h2: "D'où viennent les taches pigmentaires ?",
        body: [
          "La couleur de la peau vient d'un pigment, la mélanine. Quand la peau en fabrique trop à un endroit, une tache apparaît. Plusieurs choses peuvent déclencher cette surproduction :",
          { list: [
            "Le soleil : c'est la cause la plus fréquente. Les UV stimulent la mélanine, et les taches foncent à chaque exposition sans protection.",
            "Les hormones : grossesse, contraception ou changements hormonaux peuvent provoquer un mélasma (le « masque de grossesse »).",
            "Les marques laissées par un bouton, une brûlure ou une irritation : c'est l'hyperpigmentation post-inflammatoire.",
            "L'âge : avec le temps et le soleil accumulé, de petites taches apparaissent sur le visage et les mains.",
          ] },
        ],
      },
      {
        h2: "Ce qui aide vraiment",
        body: [
          { list: [
            "Protéger sa peau du soleil tous les jours, même en ville et même en hiver. Sans protection, les taches reviennent.",
            "Être régulière : une routine suivie matin et soir compte plus que le nombre de produits.",
            "Être patiente : les taches s'estompent petit à petit, pas du jour au lendemain. Le rythme varie d'une peau à l'autre.",
            "Éviter de gratter, frotter fort ou percer les boutons : toute irritation peut laisser une nouvelle marque.",
            "Introduire un nouveau soin progressivement, après un essai sur une petite zone.",
          ] },
        ],
      },
      {
        h2: "Une routine anti-taches en 4 étapes",
        body: [
          "Le matin : nettoyer, traiter, hydrater, protéger. Le soir : les trois premières étapes, sans écran solaire. C'est la logique de la routine OTAGE, présentée ci-dessous.",
        ],
      },
    ],
    advice: "Une tache qui change de forme, de couleur ou de taille, qui saigne ou qui démange doit être montrée à un dermatologue. Si tes taches sont étendues ou anciennes, demande aussi son avis : il pourra te dire de quel type de tache il s'agit.",
    productsTitle: "Les soins OTAGE pour les taches",
    productsIntro: "La gamme anti-taches OTAGE est conçue pour les taches brunes et le teint irrégulier. Ses 4 soins se complètent :",
    products: [
      { key: "gel", why: "Étape 1. Nettoie en douceur sans dessécher et prépare la peau à recevoir les soins." },
      { key: "serum", why: "Étape 2. Le soin concentré de la gamme, qui cible les taches." },
      { key: "creme", why: "Étape 3. Hydrate, unifie le teint et scelle le sérum." },
      { key: "ecran", why: "Étape 4, le matin. Protège des UVA et des UVB pour que les taches ne reviennent pas." },
    ],
    routine: true,
    faq: [
      { q: "Combien de temps faut-il pour atténuer une tache pigmentaire ?", a: ["Il n'y a pas de délai garanti. Les taches s'estompent petit à petit, pas du jour au lendemain, et le rythme varie d'une peau à l'autre. Ce qui compte, c'est la régularité matin et soir et l'écran solaire chaque matin."] },
      { q: "Les taches peuvent-elles revenir ?", a: ["Oui, surtout avec le soleil. Sans protection solaire, les taches reviennent. C'est pour cela que l'écran solaire SPF 50 fait partie de la routine du matin."] },
      { q: "Faut-il mettre de l'écran solaire même quand il n'y a pas de soleil ?", a: ["Oui. Les UV traversent les nuages et les vitres. Applique l'écran solaire chaque matin en dernier, et renouvelle-le toutes les 2 heures au soleil."] },
      { q: "J'ai la peau sensible, je peux suivre une routine anti-taches ?", a: ["Fais d'abord un essai sur une petite zone, dans le pli du coude ou derrière l'oreille, et attends 24 h. En cas de rougeur ou d'irritation, arrête et demande conseil à un professionnel."] },
    ],
  },

  /* ------------------------------------------------------------------ À relire : /cernes */
  {
    slug: "cernes",
    label: "Cernes",
    h1: "Cernes et contour des yeux fatigué : causes et gestes simples",
    metaTitle: "Cernes : causes, conseils et soin contour des yeux | OTAGE",
    metaDescription: "Pourquoi les cernes apparaissent, les gestes simples pour un regard moins fatigué et comment utiliser un sérum contour des yeux à la caféine.",
    image: image("serum-contour-des-yeux-n05-application.webp", 1195, 1600, "Sérum contour des yeux OTAGE N°05 tenu près du visage"),
    intro: [
      "Les cernes sont des zones plus sombres ou creusées sous les yeux. La peau y est très fine : tout se voit plus vite qu'ailleurs sur le visage, la fatigue comme les petits vaisseaux.",
      "Ils sont très courants et sans gravité dans la plupart des cas. On ne les efface pas d'un coup, mais quelques habitudes et un soin adapté peuvent aider le contour des yeux à paraître moins fatigué.",
    ],
    sections: [
      {
        h2: "Pourquoi a-t-on des cernes ?",
        body: [
          { list: [
            "L'hérédité : certaines familles et certaines carnations ont naturellement le contour des yeux plus foncé.",
            "Le manque de sommeil et la fatigue, qui rendent le teint plus terne et les cernes plus visibles.",
            "Une peau très fine sous l'œil, qui laisse voir les petits vaisseaux (cernes bleutés ou violacés).",
            "Un excès de pigment (cernes bruns), que le soleil et les frottements peuvent accentuer.",
            "L'âge : la peau s'affine et le contour de l'œil se creuse avec le temps.",
          ] },
        ],
      },
      {
        h2: "Les gestes qui aident",
        body: [
          { list: [
            "Dormir suffisamment et à heures régulières, autant que possible.",
            "Ne pas se frotter les yeux, et se démaquiller en douceur.",
            "Protéger le contour des yeux du soleil : lunettes, et écran solaire sur le visage.",
            "Appliquer son soin contour des yeux matin et soir, avec légèreté, sans tirer la peau.",
          ] },
        ],
      },
      {
        h2: "Comment appliquer un sérum contour des yeux",
        body: [
          "Passe la bille sous l'œil, de l'intérieur vers l'extérieur, puis tapote doucement du bout du doigt. Une petite quantité suffit. Le sérum OTAGE a une texture légère qui se glisse sous le maquillage.",
        ],
      },
    ],
    advice: "Des cernes apparus brusquement, d'un seul côté, ou accompagnés d'un gonflement ou d'une gêne méritent l'avis d'un médecin. Si tes cernes sont très marqués depuis toujours, un dermatologue pourra t'expliquer leur origine et ce qu'on peut raisonnablement en attendre.",
    productsTitle: "Le soin OTAGE pour le contour des yeux",
    productsIntro: "OTAGE propose un sérum pensé pour les cernes et le contour des yeux fatigué :",
    products: [{ key: "yeux", why: "15 ml, applicateur bille. Aloe vera, acide hyaluronique et caféine. Matin et soir." }],
    routine: false,
    faq: [
      { q: "Un sérum peut-il faire disparaître les cernes ?", a: ["Aucun soin ne peut promettre de les faire disparaître. Selon leur origine (hérédité, peau fine, pigment), les cernes s'atténuent plus ou moins. Un soin régulier et de bonnes habitudes aident le contour des yeux à paraître moins fatigué."] },
      { q: "Quand appliquer le sérum contour des yeux ?", a: ["Matin et soir. Passe la bille sous l'œil, de l'intérieur vers l'extérieur, puis tapote doucement."] },
      { q: "Peut-on le mettre sous le maquillage ?", a: ["Oui : sa texture légère se glisse sous le maquillage."] },
      { q: "Je suis enceinte ou j'allaite, je peux l'utiliser ?", a: ["Demande d'abord l'avis de ton médecin ou de ton pharmacien, en lui montrant la liste des ingrédients. C'est plus sûr."] },
    ],
  },

  /* ------------------------------------------------------------------ À relire : /taches-acne */
  {
    slug: "taches-acne",
    label: "Taches d'acné",
    h1: "Taches d'acné : pourquoi les boutons laissent des marques",
    metaTitle: "Taches d'acné : causes, conseils et routine | OTAGE",
    metaDescription: "Les marques brunes laissées par les boutons sont une hyperpigmentation post-inflammatoire. Ce qui les aggrave, ce qui aide, et quelle routine suivre.",
    image: image("femme-serum-anti-taches.webp", 1195, 1600, "Une femme tend le sérum anti-taches OTAGE"),
    intro: [
      "Après un bouton, il reste souvent une petite marque brune ou rosée. Ce n'est pas une cicatrice : c'est une tache, appelée hyperpigmentation post-inflammatoire. La peau a fabriqué plus de pigment à l'endroit de l'inflammation.",
      "Ces taches s'atténuent avec le temps, plus ou moins vite selon les peaux. Les peaux mates et foncées y sont plus sujettes.",
    ],
    sections: [
      {
        h2: "Tache ou cicatrice : faire la différence",
        body: [
          { list: [
            "Une tache est plate : seule la couleur change (brun, rose, violacé). C'est le sujet de cette page.",
            "Une cicatrice modifie le relief de la peau : un creux ou une bosse. Un soin cosmétique ne change pas le relief ; c'est au dermatologue de proposer une solution.",
          ] },
        ],
      },
      {
        h2: "Ce qui aggrave les taches d'acné",
        body: [
          { list: [
            "Percer ou gratter les boutons : l'inflammation dure plus longtemps et la marque est plus foncée.",
            "Le soleil sans protection : il fonce les taches et les fait durer.",
            "Les gommages agressifs et les produits irritants, qui entretiennent l'inflammation.",
          ] },
        ],
      },
      {
        h2: "Ce qui aide",
        body: [
          { list: [
            "Nettoyer la peau en douceur, matin et soir, sans décaper.",
            "Appliquer un écran solaire chaque matin.",
            "Suivre une routine régulière, et lui laisser le temps d'agir.",
            "Tester tout nouveau soin sur une petite zone avant de l'utiliser sur le visage.",
          ] },
        ],
      },
    ],
    advice: "Si tu as encore des boutons (acné active), des kystes ou des cicatrices en creux, demande l'avis d'un dermatologue avant d'ajouter de nouveaux soins : l'acné se traite, et un traitement adapté évite de nouvelles marques.",
    productsTitle: "Les soins OTAGE pour les marques brunes",
    productsIntro: "La gamme anti-taches OTAGE est conçue pour les taches brunes et le teint irrégulier. Elle ne traite pas l'acné elle-même.",
    products: [
      { key: "gel", why: "Étape 1. Un nettoyage doux, sans sulfate, qui ne dessèche pas." },
      { key: "serum", why: "Étape 2. Le soin concentré de la gamme, qui cible les taches." },
      { key: "creme", why: "Étape 3. Hydrate et unifie le teint." },
      { key: "ecran", why: "Étape 4, le matin. Sans protection, les taches reviennent." },
    ],
    routine: true,
    faq: [
      { q: "Les taches d'acné partent-elles toutes seules ?", a: ["Souvent, elles s'atténuent avec le temps, mais cela peut prendre plusieurs mois et le rythme varie d'une peau à l'autre. Le soleil sans protection les fait durer."] },
      { q: "La routine anti-taches soigne-t-elle l'acné ?", a: ["Non. Elle est conçue pour les taches brunes et le teint irrégulier, pas pour traiter les boutons. Pour une acné active, demande l'avis d'un dermatologue."] },
      { q: "Peut-on utiliser la routine sur une peau qui a encore des boutons ?", a: ["Demande d'abord l'avis d'un dermatologue ou d'un pharmacien, et fais un essai sur une petite zone pendant 24 h. En cas de rougeur ou d'irritation, arrête."] },
    ],
  },

  /* ------------------------------------------------------------------ À relire : /melasma-grossesse */
  {
    slug: "melasma-grossesse",
    label: "Mélasma et grossesse",
    h1: "Mélasma et masque de grossesse : comprendre et protéger sa peau",
    metaTitle: "Mélasma (masque de grossesse) : causes et conseils | OTAGE",
    metaDescription: "Le mélasma, ou masque de grossesse, donne des taches brunes sur le visage. Ses causes, le rôle du soleil, et quoi demander à son médecin avant tout soin.",
    image: image("ecran-solaire-spf50-plage-bouee.webp", 1600, 1600, "L'écran solaire SPF 50 OTAGE à la plage"),
    intro: [
      "Le mélasma se présente comme des taches brunes aux contours irréguliers, souvent symétriques, sur le front, les joues, le nez ou au-dessus de la lèvre. Quand il apparaît pendant la grossesse, on l'appelle le masque de grossesse.",
      "Il est sans danger pour la santé, mais il peut durer. Voici ce qu'on sait de ses causes et ce qui aide à le limiter.",
    ],
    sections: [
      {
        h2: "Pourquoi le mélasma apparaît-il ?",
        body: [
          { list: [
            "Les hormones : la grossesse, certaines contraceptions et les changements hormonaux stimulent la production de pigment.",
            "Le soleil : c'est lui qui déclenche et fonce les taches. Même une courte exposition peut suffire.",
            "Le terrain : les peaux mates et foncées, et certaines familles, y sont plus sujettes.",
          ] },
        ],
      },
      {
        h2: "Que faire pendant la grossesse ?",
        body: [
          { list: [
            "Se protéger du soleil tous les jours : chapeau, ombre, et une protection solaire validée par ton médecin ou ton pharmacien.",
            "Éviter les expositions aux heures les plus chaudes.",
            "Ne pas multiplier les produits : pendant la grossesse et l'allaitement, chaque soin doit être validé par un professionnel de santé.",
            "Rester patiente : le masque de grossesse s'atténue souvent dans les mois qui suivent l'accouchement, mais pas toujours.",
          ] },
        ],
      },
      {
        h2: "Et après la grossesse ?",
        body: [
          "Si les taches persistent après l'accouchement et la fin de l'allaitement, une routine anti-taches régulière et une protection solaire quotidienne peuvent aider à les atténuer petit à petit. Le mélasma revient facilement avec le soleil : la protection reste le geste le plus important.",
        ],
      },
    ],
    advice: "Enceinte ou allaitante : avant d'utiliser un soin OTAGE, écran solaire compris, demande l'avis de ton médecin ou de ton pharmacien en lui montrant la liste des ingrédients. Un mélasma étendu ou qui persiste doit être vu par un dermatologue.",
    productsTitle: "Les soins OTAGE, à voir avec ton médecin",
    productsIntro: "Ces soins font partie de la routine anti-taches OTAGE. Pendant la grossesse ou l'allaitement, ne les utilise qu'avec l'accord de ton médecin ou de ton pharmacien.",
    products: [
      { key: "ecran", why: "Écran solaire SPF 50, haute protection UVA/UVB : le geste du matin pour que les taches ne reviennent pas." },
      { key: "serum", why: "Le soin concentré de la gamme, qui cible les taches." },
      { key: "creme", why: "Hydrate, unifie le teint et scelle le sérum." },
    ],
    routine: false,
    faq: [
      { q: "Le masque de grossesse disparaît-il après l'accouchement ?", a: ["Souvent, il s'atténue dans les mois qui suivent, mais pas toujours et pas complètement chez tout le monde. S'il persiste, demande l'avis d'un dermatologue."] },
      { q: "Puis-je utiliser les soins OTAGE enceinte ou pendant l'allaitement ?", a: ["Demande d'abord l'avis de ton médecin ou de ton pharmacien, en lui montrant la liste des ingrédients. C'est plus sûr."] },
      { q: "Le soleil aggrave-t-il le mélasma ?", a: ["Oui. Le soleil déclenche et fonce les taches, et le mélasma revient facilement après une exposition. La protection solaire quotidienne est le geste le plus important."] },
    ],
  },
];

export const problemBySlug = (slug: string) => problems.find((p) => p.slug === slug);
