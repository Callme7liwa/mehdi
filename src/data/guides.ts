/* Guides « taches brunes » (docs/carte-thematique.md), approuvés par Dr Seddiki El Mehdi pour publication sous son nom
   le 17 octobre 2026 (confirmation écrite conservée). Textes de docs/brouillons/publies/*.md : les brouillons relus,
   nettoyés avant publication (phrases sans source retirées, passages en attente de ses réponses neutralisés, version A
   de la page « erreurs », encadrés « L'avis du pharmacien » vides retirés ; détail page par page dans docs/brouillons/diffs/).
   Convertis une fois depuis ces fichiers, puis tenus à jour ici, comme problems.ts. Pas de version arabe.
   Texte enrichi : voir Block dans problems.ts. Chaque texte modifié après approbation doit être réapprouvé avant de garder « reviewed ». */
import type { ProblemPage } from "./problems";
import type { Img } from "./products";

const image = (file: string, w: number, h: number, fr: string): Img => ({ src: `/images/${file}`, w, h, alt: { fr, ar: fr } });

export const guides: ProblemPage[] = [
  /* ------------------------------------------------------------------ Relu par Dr Seddiki le 17 octobre 2026 : /melasma */
  {
    slug: "melasma",
    label: "Mélasma",
    h1: "Mélasma : comprendre ces taches et limiter leur retour",
    metaTitle: "Mélasma du visage : causes, pilule et soleil | OTAGE",
    metaDescription: "Mélasma : le reconnaître, le rôle des hormones et de la pilule, pourquoi il revient au soleil et ce que peut proposer un dermatologue. Conseils clairs.",
    image: image("ecran-solaire-spf50-plage-bouee.webp", 1600, 1600, "L'écran solaire SPF 50 OTAGE à la plage"),
    intro: [
      "Le mélasma, ce sont des plaques brunes sur le visage, souvent des deux côtés de façon symétrique [1]. Il vient d'un mélange de terrain familial, d'hormones et de soleil [1][2]. On ne le guérit pas pour de bon, mais on peut l'atténuer et limiter son retour, d'abord en se protégeant du soleil chaque jour [1][3]."
    ],
    sections: [
      {
        "h2": "Comment distinguer le mélasma des autres taches ?",
        "body": [
          "Le mélasma a une allure assez reconnaissable. Ce ne sont pas des petits points, mais des plaques aux contours flous.",
          {
            "list": [
              "Elles sont souvent symétriques : les deux joues, ou les deux côtés du front [1].",
              "Elles touchent surtout les joues, le front, le nez, le menton et le dessus de la lèvre supérieure [1].",
              "Leur couleur va du brun clair au brun foncé, parfois grisâtre [1]."
            ]
          },
          "Il touche plus souvent les femmes adultes, et plus souvent les peaux mates [1][4]. Il arrive aussi qu'un proche de la famille en ait déjà [4].",
          "Les marques d'acné, elles, apparaissent à la place d'anciens boutons [5]. Les taches solaires sont de petites taches rondes et bien délimitées [6]. Pour comparer les trois : [le guide des taches brunes du visage](/taches-brunes-visage).",
          "Seul un dermatologue peut confirmer un mélasma. Il examine ton visage, parfois avec une lampe ou un dermatoscope [3]."
        ]
      },
      {
        "h2": "Pourquoi les hormones, la pilule ou la grossesse le déclenchent-elles ?",
        "body": [
          "Les hormones féminines, les œstrogènes et la progestérone, rendent les cellules qui fabriquent la mélanine plus réactives [1][4]. C'est pour ça que le mélasma apparaît souvent :",
          {
            "list": [
              "pendant une grossesse : on l'appelle alors « masque de grossesse » [4] ;",
              "avec une contraception hormonale : pilule, stérilet hormonal ou implant [1][4] ;",
              "avec un traitement hormonal [1]."
            ]
          },
          "C'est ce qu'on appelle souvent les « taches hormonales ». Ce n'est pas un autre problème : c'est le même mélasma.",
          "D'autres facteurs peuvent jouer : certains médicaments qui rendent la peau sensible au soleil, et des problèmes de thyroïde [4]. Des cosmétiques parfumés peuvent aussi provoquer une réaction au soleil [1]."
        ]
      },
      {
        "h2": "Faut-il arrêter sa pilule ?",
        "body": [
          "Ne l'arrête jamais seule. Une contraception ne s'arrête pas sans solution de remplacement, et c'est une décision à prendre avec ton médecin ou ta sage-femme [7].",
          "Si tu penses que ta pilule joue un rôle, parles-en avec lui. Il peut te proposer une autre contraception, adaptée à ta santé [7].",
          "Même quand une pilule a déclenché le mélasma, l'arrêter ne suffit pas toujours. Il peut s'atténuer après l'arrêt du facteur déclenchant, ou durer des années [3]. La protection solaire reste le geste de base, dans tous les cas [1][3]."
        ]
      },
      {
        "h2": "Pourquoi revient-il si vite après le soleil ?",
        "body": [
          "Le mélasma est très sensible à la lumière. Les UV le foncent, mais aussi la lumière visible, celle qu'on voit, et les UVA longs [2].",
          "Même après un bon résultat, il peut revenir avec le soleil de l'été [1]. C'est frustrant, mais c'est connu : le mélasma est une affection qui dure et qui revient [1][2].",
          "Ce qui aide, chaque jour, toute l'année [1][3] :",
          {
            "list": [
              "Un écran solaire à large spectre, le matin, en dernier geste, et renouvelé au soleil.",
              "Un chapeau à larges bords et l'ombre, surtout au milieu de la journée.",
              "Éviter ce qui irrite la peau : gommages agressifs, produits qui piquent."
            ]
          },
          "Les dermatologues conseillent souvent, pour le mélasma, un écran solaire teinté contenant des oxydes de fer, qui protège aussi d'une partie de la lumière visible [1][3]. Demande à ton pharmacien lequel convient à ta peau.",
          "Au Maroc, le soleil est fort une grande partie de l'année : [se protéger toute l'année](/soleil-maroc-taches)."
        ]
      },
      {
        "h2": "Peut-on le faire disparaître ? Que peut proposer un dermatologue ?",
        "body": [
          "Aucun soin ne peut promettre de faire disparaître un mélasma. Il peut s'atténuer, parfois beaucoup, mais il a tendance à revenir [1][3].",
          "Le mélasma n'est pas dangereux pour ta santé [3]. On le traite parce qu'il gêne, et c'est une bonne raison.",
          "Une routine régulière et l'écran solaire peuvent aider à atténuer les taches et à limiter leur retour. La routine OTAGE associe le [sérum anti-taches](/soins/serum-anti-taches), à l'alpha-arbutine, et l'[écran solaire SPF 50](/soins/ecran-solaire-spf50) le matin.",
          "Si ton mélasma est étendu, ancien, ou s'il ne bouge pas, un dermatologue peut proposer [3] :",
          {
            "list": [
              "des crèmes sur ordonnance, parfois associées entre elles ;",
              "un traitement par la bouche, dans certains cas, après avoir vérifié tes antécédents ;",
              "des soins en cabinet, comme certains peelings ou lasers."
            ]
          },
          "Ces gestes se décident avec lui, et seulement avec lui [3]. Mal utilisés, certains lasers peuvent foncer le mélasma [1]."
        ]
      }
    ],
    maroc: [
      "Au Maroc, pour la pilule, c'est ton médecin, ta sage-femme ou le centre de santé qui peut proposer une autre contraception."
    ],
    adviceTitle: "Quand consulter un dermatologue ?",
    advice: [
      "Consulte si :",
      {
        "list": [
          "ton mélasma est étendu, ancien, ou continue de foncer malgré la protection solaire ;",
          "tu n'es pas sûre qu'il s'agisse d'un mélasma ;",
          "une tache change de forme, de couleur ou de taille, saigne ou démange [8] ;",
          "tu prends un traitement et tu penses qu'il joue un rôle : ne l'arrête pas seule, parles-en d'abord au médecin qui l'a prescrit [7]."
        ]
      }
    ],
    productsTitle: "",
    productsIntro: "",
    products: [],
    routine: false,
    faq: [
      {
        "q": "Le mélasma est-il dangereux ?",
        "a": [
          "Non, il n'est pas dangereux pour la santé. Mais une tache qui change doit être montrée à un dermatologue."
        ]
      },
      {
        "q": "Le mélasma peut-il partir tout seul ?",
        "a": [
          "Parfois, surtout après une grossesse ou l'arrêt d'un facteur déclenchant. Mais il peut aussi durer des années."
        ]
      },
      {
        "q": "Les hommes peuvent-ils avoir un mélasma ?",
        "a": [
          "Oui, même si c'est beaucoup plus rare que chez les femmes."
        ]
      },
      {
        "q": "Puis-je utiliser les soins OTAGE si je prends la pilule ?",
        "a": [
          "La pilule n'empêche pas d'utiliser un soin. En cas de doute, demande à ton pharmacien et fais un test de 24 h sur une petite zone."
        ]
      }
    ],
    sources: [
      {
        "label": "DermNet (Nouvelle-Zélande), « Melasma », A. Oakley, mise à jour B. J. Doolan et M. Gupta, décembre 2025.",
        "url": "https://dermnetnz.org/topics/melasma"
      },
      {
        "label": "Morgado-Carrasco D, Piquero-Casals J, Granger C, Trullàs C, Passeron T. « Melasma: The need for tailored photoprotection to improve clinical outcomes ». Photodermatol Photoimmunol Photomed. 2022;38(6):515-521.",
        "url": "https://doi.org/10.1111/phpp.12783"
      },
      {
        "label": "American Academy of Dermatology (AAD), « Melasma: Diagnosis and treatment », mise à jour le 15 février 2022.",
        "url": "https://www.aad.org/public/diseases/a-z/melasma-treatment"
      },
      {
        "label": "AAD, « Melasma: Causes », mise à jour le 15 février 2022.",
        "url": "https://www.aad.org/public/diseases/a-z/melasma-causes"
      },
      {
        "label": "DermNet, « Postinflammatory hyperpigmentation », V. Ngan, mise à jour A. Oakley, décembre 2015.",
        "url": "https://dermnetnz.org/topics/postinflammatory-hyperpigmentation"
      },
      {
        "label": "DermNet, « Solar lentigo », A. Fitzpatrick et J. Chan, relu en novembre 2025.",
        "url": "https://dermnetnz.org/topics/solar-lentigo"
      },
      {
        "label": "AAD, « How to fade dark spots in darker skin tones », mise à jour le 10 mars 2025 (« ne pas arrêter seul un médicament prescrit »).",
        "url": "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/fade-dark-spots"
      },
      {
        "label": "AAD, « What to look for: ABCDEs of melanoma », date de mise à jour non affichée.",
        "url": "https://www.aad.org/public/diseases/skin-cancer/abcdes-melanoma"
      }
    ],
    published: "2026-10-10",
    reviewed: { date: "2026-10-17", by: "dr-seddiki" },
  },

  /* ------------------------------------------------------------------ Relu par Dr Seddiki le 17 octobre 2026 : /taches-acne */
  {
    slug: "taches-acne",
    label: "Taches d'acné",
    h1: "Taches d'acné : pourquoi elles restent et comment les atténuer",
    metaTitle: "Taches d'acné : comment atténuer les marques | OTAGE",
    metaDescription: "Taches d'acné : la différence avec une cicatrice, pourquoi percer un bouton fonce la marque, ce qui aide à l'atténuer et quand voir un dermatologue.",
    image: image("femme-serum-anti-taches.webp", 1195, 1600, "Une femme tend le sérum anti-taches OTAGE"),
    intro: [
      "Une marque brune après un bouton est le plus souvent une tache, pas une cicatrice : la peau est lisse, seule la couleur a changé [1][2]. Elle vient de l'inflammation du bouton, qui pousse la peau à fabriquer trop de pigment [1]. Elle s'atténue avec le temps, à condition de ne pas la gratter et de la protéger du soleil [2][3]."
    ],
    sections: [
      {
        "h2": "Tache ou cicatrice : comment faire la différence ?",
        "body": [
          "Passe le bout du doigt sur la marque. C'est le test le plus simple.",
          {
            "list": [
              "**Une tache** est plate. La surface de la peau est lisse, seule la couleur change : brune, parfois grisâtre [1]. Les médecins l'appellent « hyperpigmentation post-inflammatoire ».",
              "**Une cicatrice** est un creux ou un relief dans la peau. Elle vient de la façon dont la peau a cicatrisé en profondeur [4]. Une cicatrice peut s'estomper, mais elle part rarement complètement [4]."
            ]
          },
          "Pourquoi c'est important ? Parce qu'une tache s'atténue souvent avec le temps et les bons gestes [2][3]. Une cicatrice, elle, ne change pas avec un soin cosmétique : si tu en as, parles-en à un dermatologue [4]."
        ]
      },
      {
        "h2": "Pourquoi percer un bouton laisse-t-il une marque plus foncée ?",
        "body": [
          "Quand tu perces, grattes ou presses un bouton, tu ajoutes de l'inflammation dans la peau [4]. Plus la peau est enflammée, plus elle risque de garder une marque, et plus cette marque peut être foncée [1][4].",
          "Percer un bouton augmente aussi le risque d'infection et de cicatrice [4].",
          "Ce qu'on peut faire à la place :",
          {
            "list": [
              "Laisser le bouton tranquille, même s'il est tentant.",
              "Appliquer le traitement anti-acné conseillé par ton médecin ou ton pharmacien [4].",
              "Nettoyer ta peau en douceur, sans frotter."
            ]
          },
          "Les gommages à grains et les produits qui piquent irritent aussi la peau, et une peau irritée marque plus [3]. La liste des gestes à éviter : [les erreurs qui aggravent les taches](/erreurs-taches-visage)."
        ]
      },
      {
        "h2": "Les marques partent-elles toutes seules ?",
        "body": [
          "Souvent, oui. Une fois le bouton guéri, beaucoup de marques s'atténuent d'elles-mêmes [2][3].",
          "Mais elles prennent leur temps. Plus la marque est foncée et profonde dans la peau, plus elle dure [3]. Personne ne peut te donner un délai précis pour ta peau.",
          "Deux choses les font durer plus longtemps :",
          {
            "list": [
              "**Le soleil.** Il fonce les taches existantes et les fait durer [2][3]. Un écran solaire chaque matin, même en hiver, est le geste le plus utile [3].",
              "**De nouveaux boutons.** Chaque nouveau bouton peut laisser une nouvelle marque [3]. C'est pour ça qu'il faut d'abord traiter l'acné."
            ]
          }
        ]
      },
      {
        "h2": "Peut-on suivre une routine anti-taches avec des boutons actifs ?",
        "body": [
          "D'abord, l'acné. Les dermatologues sont clairs : pour que les marques s'atténuent, il faut d'abord calmer ce qui les cause [2][3]. Si tu as encore des boutons, des kystes ou des boutons douloureux, vois un dermatologue : l'acné se traite.",
          "Ensuite, une routine douce peut aider à atténuer les marques brunes. Elle ne traite pas l'acné : elle s'occupe des taches.",
          "La routine OTAGE, matin et soir :",
          {
            "steps": [
              "Le [gel nettoyant](/soins/gel-nettoyant), sans sulfate, pour nettoyer sans décaper.",
              "Le [sérum anti-taches](/soins/serum-anti-taches), à l'alpha-arbutine, sur les taches brunes.",
              "La crème anti-taches, qui hydrate et unifie le teint.",
              "Le matin seulement, l'écran solaire SPF 50, en dernier."
            ]
          },
          "Avec des boutons actifs, demande d'abord l'avis de ton dermatologue ou de ton pharmacien. Certains traitements contre l'acné ne s'associent pas avec tous les soins. Fais aussi un test de 24 h sur une petite zone. Le détail des étapes : [la routine matin et soir](/routine-taches-matin-soir)."
        ]
      },
      {
        "h2": "Pourquoi les marques durent-elles plus sur peau mate ?",
        "body": [
          "Les marques brunes après un bouton touchent tout le monde. Mais elles sont plus fréquentes, plus foncées et plus durables sur les peaux mates et foncées [1][2].",
          "La raison : une peau mate réagit plus vite à l'inflammation en fabriquant du pigment [2]. Un simple bouton, une irritation ou un produit trop fort peut suffire [3].",
          "Sur peau mate, trois gestes comptent encore plus :",
          {
            "list": [
              "Ne pas percer ni gratter les boutons [4].",
              "Choisir des soins doux, sans parfum si possible, et arrêter tout produit qui brûle ou pique [3].",
              "Se protéger du soleil chaque jour [2][3]."
            ]
          },
          "Plus de conseils : [les taches sur peau mate](/taches-peau-mate). Pour comparer avec les autres taches : [le guide des taches brunes du visage](/taches-brunes-visage)."
        ]
      }
    ],
    maroc: [
      "Au Maroc, ton pharmacien peut t'aider à faire la différence entre une marque brune et une cicatrice, et t'orienter vers un dermatologue si tu as encore des boutons."
    ],
    adviceTitle: "Quand consulter un dermatologue ?",
    advice: [
      "Consulte si :",
      {
        "list": [
          "tu as encore des boutons, surtout s'ils sont nombreux, profonds ou douloureux : traiter l'acné évite de nouvelles marques [2][3] ;",
          "tu as des creux ou des reliefs : ce sont des cicatrices, un soin cosmétique n'y changera rien [4] ;",
          "les marques ne s'atténuent pas malgré une routine régulière et l'écran solaire [3] ;",
          "une tache change de forme ou de couleur, saigne ou démange [5]."
        ]
      }
    ],
    productsTitle: "",
    productsIntro: "",
    products: [],
    routine: false,
    faq: [
      {
        "q": "La routine anti-taches soigne-t-elle l'acné ?",
        "a": [
          "Non. Elle s'occupe des taches brunes, pas des boutons. Pour l'acné, vois un dermatologue."
        ]
      },
      {
        "q": "Ma peau picote avec un nouveau soin : que faire ?",
        "a": [
          "Arrête-le. Un produit qui brûle ou pique irrite la peau, et l'irritation peut foncer les marques. Demande conseil à ton pharmacien."
        ]
      },
      {
        "q": "Faut-il de l'écran solaire si j'ai la peau grasse ?",
        "a": [
          "Oui. Le soleil fonce les marques, quel que soit ton type de peau."
        ]
      }
    ],
    sources: [
      {
        "label": "DermNet (Nouvelle-Zélande), « Postinflammatory hyperpigmentation », V. Ngan, mise à jour A. Oakley, décembre 2015.",
        "url": "https://dermnetnz.org/topics/postinflammatory-hyperpigmentation"
      },
      {
        "label": "Davis EC, Callender VD. « Postinflammatory hyperpigmentation: a review of the epidemiology, clinical features, and treatment options in skin of color ». J Clin Aesthet Dermatol. 2010;3(7):20-31.",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2921758/"
      },
      {
        "label": "American Academy of Dermatology (AAD), « How to fade dark spots in darker skin tones », mise à jour le 10 mars 2025.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/fade-dark-spots"
      },
      {
        "label": "AAD, « Acne scars: Causes », mise à jour le 8 décembre 2023.",
        "url": "https://www.aad.org/public/diseases/acne/derm-treat/scars/causes"
      },
      {
        "label": "AAD, « What to look for: ABCDEs of melanoma », date de mise à jour non affichée.",
        "url": "https://www.aad.org/public/diseases/skin-cancer/abcdes-melanoma"
      }
    ],
    published: "2026-10-10",
    reviewed: { date: "2026-10-17", by: "dr-seddiki" },
  },

  /* ------------------------------------------------------------------ Relu par Dr Seddiki le 17 octobre 2026 : /taches-solaires */
  {
    slug: "taches-solaires",
    label: "Taches solaires",
    h1: "Taches solaires sur le visage : d'où viennent-elles et quand s'inquiéter ?",
    metaTitle: "Taches solaires visage : causes et signes d'alerte | OTAGE",
    metaDescription: "Petites taches brunes et rondes ? Souvent des taches solaires. Comment les reconnaître, quand s'inquiéter, et comment éviter qu'elles se multiplient.",
    image: image("ecran-solaire-spf50-video-poster.webp", 720, 720, "L'écran solaire SPF 50 OTAGE au soleil"),
    essentials: [
      "Une tache solaire, ou lentigo solaire, est une tache plate, brune et bien délimitée, qui apparaît sur la peau exposée au soleil [1].",
      "Le lentigo solaire est bénin, mais il signale que la peau a reçu beaucoup d'UV au fil des années [1].",
      "Une tache solaire peut ressembler à une lésion plus sérieuse : seul un dermatologue peut faire la différence, parfois avec un dermatoscope [1]."
    ],
    intro: [
      "Une tache solaire est une petite tache brune, plate et bien délimitée, qui apparaît là où le soleil touche le plus : dos des mains, avant-bras [1], et souvent le visage. Elle vient des UV reçus pendant des années [1]. Elle est sans danger, mais elle doit être surveillée, et la protection solaire limite l'apparition de nouvelles taches [1]."
    ],
    sections: [
      {
        "h2": "À quoi ressemble une tache solaire ?",
        "body": [
          "C'est une tache plate, ronde ou ovale, aux bords nets, d'une couleur assez uniforme : du beige au brun foncé [1]. Elle ne gratte pas et ne fait pas mal [1].",
          "Sa taille va de quelques millimètres à plus d'un centimètre [1]. Elle apparaît sur les zones exposées : le dos des mains, les avant-bras, le haut du corps [1], et le visage.",
          "On l'appelle aussi « tache de vieillesse » ou « tache de soleil » [1]."
        ]
      },
      {
        "h2": "Tache solaire, mélasma ou grain de beauté : comment les distinguer ?",
        "body": [
          "Ces trois taches n'ont pas la même origine. Seul un dermatologue peut confirmer le diagnostic.",
          { "figure": "taches" },
          {
            "table": {
              "head": [
                "",
                "Tache solaire",
                "Mélasma",
                "Grain de beauté"
              ],
              "rows": [
                [
                  "Aspect",
                  "Petite tache plate, ronde, bords nets [1]",
                  "Plaques aux contours flous, souvent symétriques [2]",
                  "—"
                ],
                [
                  "Où",
                  "Zones exposées au soleil [1]",
                  "Joues, front, nez, lèvre supérieure [2]",
                  "N'importe où"
                ],
                [
                  "Cause",
                  "UV accumulés [1]",
                  "Soleil, hormones, terrain familial [2][3]",
                  "—"
                ],
                [
                  "Quand s'inquiéter",
                  "Si elle change [1][4]",
                  "Si elle s'étend ou fonce malgré la protection [5]",
                  "Si elle change (règle ABCDE) [4]"
                ]
              ]
            }
          },
          "Pour le mélasma : [tout savoir sur le mélasma](/melasma)."
        ]
      },
      {
        "h2": "Pourquoi apparaissent-elles avec les années ?",
        "body": [
          "Parce que les UV s'accumulent. Chaque exposition laisse une trace, et les taches apparaissent après des années de soleil [1].",
          "Elles touchent surtout les adultes d'âge moyen et plus âgés, et plus souvent les peaux claires [1]. Les cabines de bronzage augmentent aussi le risque [1]."
        ]
      },
      {
        "h2": "Quand une tache solaire doit-elle inquiéter ?",
        "body": [
          "Quand elle change. Une tache qui grandit, change de forme ou de couleur, devient irrégulière, saigne ou démange doit être vue rapidement [4].",
          "Le lentigo solaire peut ressembler à un mélanome débutant [1]. Le dermatologue fait la différence avec un dermatoscope, et parfois une biopsie [1].",
          "Les signes à connaître, un par un : [quand consulter un dermatologue](/taches-quand-consulter)."
        ]
      },
      {
        "h2": "Comment éviter qu'elles se multiplient ?",
        "body": [
          "En protégeant ta peau du soleil, toute l'année. Une protection solaire stricte réduit l'apparition de nouvelles taches [1].",
          "Les gestes, dans l'ordre recommandé par l'OMS [6] :",
          {
            "steps": [
              "Chercher l'ombre au milieu de la journée.",
              "Porter un chapeau à larges bords et des lunettes de soleil.",
              "Mettre un écran solaire à large spectre sur la peau découverte."
            ]
          },
          "Le mode d'emploi de l'écran : [bien appliquer son écran solaire](/appliquer-ecran-solaire). Le soleil en hiver et derrière une vitre : [le soleil au Maroc, toute l'année](/soleil-maroc-taches)."
        ]
      },
      {
        "h2": "Les taches solaires peuvent-elles s'atténuer ?",
        "body": [
          "Un peu, parfois. Selon DermNet, une protection solaire stricte peut atténuer légèrement les taches existantes [1].",
          "Aucun soin ne peut promettre de les effacer."
        ]
      }
    ],
    maroc: [
      "Au Maroc, beaucoup d'activités se font dehors toute l'année : trajets, marché, travail aux champs. Pense au dos des mains, souvent oublié quand on met de l'écran."
    ],
    adviceTitle: "Quand consulter ?",
    advice: [
      "Toute tache qui change, saigne, démange ou ne ressemble pas aux autres doit être montrée à un dermatologue [4]. Avant tout traitement d'une tache solaire, un diagnostic est nécessaire [1]. Les signes : [quand consulter](/taches-quand-consulter)."
    ],
    solution: {
      "title": "Notre solution",
      "body": [
        "Le geste qui compte le plus contre les taches solaires, c'est la protection. L'[écran solaire SPF 50](/soins/ecran-solaire-spf50) OTAGE protège des UVA et des UVB. Le [sérum anti-taches](/soins/serum-anti-taches) peut aider à atténuer les taches brunes.",
        "Ce qu'ils ne font pas : ils ne font pas disparaître une tache solaire, et ils ne remplacent pas l'avis d'un dermatologue sur une tache qui change. Le guide complet : [taches brunes du visage](/taches-brunes-visage)."
      ]
    },
    productsTitle: "",
    productsIntro: "",
    products: [],
    routine: false,
    faq: [
      {
        "q": "Une tache solaire peut-elle devenir un cancer ?",
        "a": [
          "Non. Selon DermNet, le lentigo solaire est bénin : non traité, il persiste en général, mais reste bénin. En revanche, une lésion plus dangereuse, comme un mélanome débutant, peut lui ressembler. C'est pour ça qu'une tache doit être examinée par un dermatologue, parfois avec un dermatoscope ou une biopsie. Le lentigo solaire signale aussi beaucoup de soleil reçu : il est associé à un risque plus élevé de mélanome."
        ]
      },
      {
        "q": "Les cabines de bronzage donnent-elles des taches solaires ?",
        "a": [
          "Oui, elles en augmentent le risque, comme le soleil."
        ]
      },
      {
        "q": "Pourquoi j'ai des taches sur les mains et pas sur le ventre ?",
        "a": [
          "Parce que les taches solaires apparaissent sur la peau la plus exposée au soleil."
        ]
      }
    ],
    sources: [
      {
        "label": "DermNet (Nouvelle-Zélande), « Solar lentigo », A. Fitzpatrick et J. Chan, relu en novembre 2025.",
        "url": "https://dermnetnz.org/topics/solar-lentigo"
      },
      {
        "label": "DermNet, « Melasma », A. Oakley, mise à jour B. J. Doolan et M. Gupta, décembre 2025.",
        "url": "https://dermnetnz.org/topics/melasma"
      },
      {
        "label": "American Academy of Dermatology (AAD), « Melasma: Causes », mise à jour le 15 février 2022.",
        "url": "https://www.aad.org/public/diseases/a-z/melasma-causes"
      },
      {
        "label": "AAD, « What to look for: ABCDEs of melanoma », date de mise à jour non affichée.",
        "url": "https://www.aad.org/public/diseases/skin-cancer/abcdes-melanoma"
      },
      {
        "label": "AAD, « Melasma: Diagnosis and treatment », mise à jour le 15 février 2022.",
        "url": "https://www.aad.org/public/diseases/a-z/melasma-treatment"
      },
      {
        "label": "Organisation mondiale de la santé, « Ultraviolet radiation », aide-mémoire, 21 juin 2022.",
        "url": "https://www.who.int/news-room/fact-sheets/detail/ultraviolet-radiation"
      }
    ],
    published: "2026-10-17",
    reviewed: { date: "2026-10-17", by: "dr-seddiki" },
  },

  /* ------------------------------------------------------------------ Relu par Dr Seddiki le 17 octobre 2026 : /taches-peau-mate */
  {
    slug: "taches-peau-mate",
    label: "Taches sur peau mate",
    h1: "Pourquoi les peaux mates marquent-elles plus, et comment limiter les taches ?",
    metaTitle: "Taches peau mate visage : comprendre et limiter | OTAGE",
    metaDescription: "Sur peau mate, un bouton ou une irritation laisse vite une tache brune. Pourquoi, quelles taches sont fréquentes, et les gestes qui aident vraiment.",
    image: image("cliente-gel-nettoyant-anti-taches.webp", 1600, 1600, "Une cliente souriante tend le gel nettoyant OTAGE"),
    essentials: [
      "Les peaux mates et foncées marquent plus facilement : après une inflammation, la tache brune est plus fréquente, plus foncée et dure plus longtemps [1][2].",
      "Sur les peaux mates, la lumière visible provoque une pigmentation plus foncée et plus durable que les UVA longs, selon une étude sur des peaux de phototypes IV à VI [3].",
      "Pour une peau mate, l'Académie américaine de dermatologie conseille un écran solaire teinté, qui évite le voile blanc et protège aussi de la lumière visible [4]."
    ],
    intro: [
      "Une peau mate fabrique facilement de la mélanine : c'est ce qui la protège, mais c'est aussi pourquoi elle marque vite [1]. Un bouton, une irritation ou un gommage trop fort peut laisser une tache brune [1][5]. Les bons gestes : douceur, protection solaire chaque jour, et ne rien gratter."
    ],
    sections: [
      {
        "h2": "Pourquoi les peaux mates marquent-elles plus facilement ?",
        "body": [
          "Parce que leurs cellules pigmentaires réagissent vite. Dès que la peau est enflammée ou irritée, elle produit plus de mélanine à cet endroit [1][2].",
          "Cette tache s'appelle une hyperpigmentation post-inflammatoire. Elle peut toucher toutes les peaux, mais elle est plus fréquente et plus intense sur les peaux mates et foncées [1][2]. Elle peut aussi durer plus longtemps [1].",
          "Ce n'est pas une maladie, et elle n'est pas dangereuse [1]. Mais elle peut gêner, surtout quand elle s'accumule."
        ]
      },
      {
        "h2": "Quelles taches sont les plus fréquentes sur peau mate ?",
        "body": [
          "Seul un dermatologue peut confirmer le type de tache. Voici les plus courantes :",
          {
            "table": {
              "head": [
                "Type de tache",
                "À quoi elle ressemble",
                "D'où elle vient",
                "Que faire"
              ],
              "rows": [
                [
                  "Marque post-inflammatoire",
                  "Tache plate, à l'endroit d'un bouton, d'une piqûre, d'une irritation [1]",
                  "L'inflammation de la peau [1]",
                  "Traiter la cause, ne pas gratter, écran solaire [2][5]"
                ],
                [
                  "Mélasma",
                  "Plaques brunes, souvent symétriques, joues, front, lèvre supérieure [6]",
                  "Soleil, hormones, terrain familial [6][7]",
                  "Protection solaire stricte, avis d'un dermatologue [6][8]"
                ],
                [
                  "Tache solaire",
                  "Petite tache ronde, bien délimitée, sur une zone exposée [9]",
                  "Le soleil accumulé [9]",
                  "Protection solaire, surveiller qu'elle ne change pas [9]"
                ]
              ]
            }
          },
          "Les deux premières sont les plus fréquentes sur peau mate [2][7]. Tout savoir : [le mélasma](/melasma) et [les taches d'acné](/taches-acne)."
        ]
      },
      {
        "h2": "Pourquoi les produits irritants foncent-ils la peau mate ?",
        "body": [
          "Parce que l'irritation est une inflammation, et que l'inflammation fait fabriquer du pigment [1][5].",
          "L'Académie américaine de dermatologie conseille d'éviter les gommages forts, mécaniques ou chimiques, si tu as la peau mate ou des marques brunes après l'acné [10]. Elle conseille aussi de choisir des produits « pour peau sensible » ou sans parfum, et d'arrêter tout produit qui brûle ou pique [5].",
          "Les erreurs à éviter : [citron, gommage, crèmes sans étiquette](/erreurs-taches-visage)."
        ]
      },
      {
        "h2": "Faut-il un écran solaire quand on a la peau mate ?",
        "body": [
          "Oui, chaque jour [5]. La peau mate bronze facilement, mais le soleil fonce aussi les marques et le mélasma [1][6].",
          "Les points à regarder sur l'écran [4] :",
          {
            "list": [
              "large spectre (UVA et UVB) ;",
              "SPF d'au moins 30 ;",
              "une version teintée, pour éviter le voile blanc et se protéger aussi de la lumière visible."
            ]
          },
          "La lumière visible compte particulièrement pour les peaux mates : elle peut les foncer, plus durablement que les UVA longs [3].",
          "Le mode d'emploi : [bien appliquer son écran solaire](/appliquer-ecran-solaire)."
        ]
      },
      {
        "h2": "Les traitements chez le dermatologue sont-ils adaptés aux peaux mates ?",
        "body": [
          "Oui, mais avec prudence. Lasers, lumière pulsée et peelings peuvent aider certaines taches, mais ils peuvent aussi foncer la peau s'ils l'abîment [1][8].",
          "Ils doivent être faits par un dermatologue, qui adapte le traitement à ta couleur de peau [8]."
        ]
      }
    ],
    maroc: [
      "Au Maroc, le hammam fait partie de la semaine de beaucoup de familles. Le gommage au kessa et au savon noir frotte fort : sur une peau mate qui marque, frotte doucement et évite les zones irritées ou les marques récentes [10].",
      "Au souk ou sur les réseaux sociaux, méfie-toi des crèmes sans étiquette claire, présentées comme des solutions miracles pour le teint. Avant d'en acheter une, demande à ton pharmacien de lire l'étiquette avec toi."
    ],
    adviceTitle: "Quand consulter ?",
    advice: [
      "Consulte si une tache change, saigne ou démange, si tes marques ne s'atténuent pas malgré la protection solaire, ou si tu as encore beaucoup de boutons [5][11]. Tous les signes : [quand consulter un dermatologue](/taches-quand-consulter)."
    ],
    solution: {
      "title": "Notre solution",
      "body": [
        "Deux soins répondent aux deux règles de cette page, douceur et protection : le [gel nettoyant](/soins/gel-nettoyant), sans sulfate, qui nettoie sans décaper, et l'[écran solaire SPF 50](/soins/ecran-solaire-spf50), UVA et UVB, chaque matin.",
        "Ce qu'ils ne font pas : ils ne traitent pas l'acné ni le mélasma. Pour toute la routine : [le guide des taches brunes du visage](/taches-brunes-visage)."
      ]
    },
    productsTitle: "",
    productsIntro: "",
    products: [],
    routine: false,
    faq: [
      {
        "q": "Les peaux mates ont-elles moins de risques avec le soleil ?",
        "a": [
          "Elles brûlent moins vite, mais elles marquent plus, et elles peuvent aussi avoir un cancer de la peau."
        ]
      },
      {
        "q": "Un écran teinté remplace-t-il le fond de teint ?",
        "a": [
          "Il peut unifier légèrement le teint, mais son rôle est de protéger. Choisis une teinte proche de ta peau."
        ]
      },
      {
        "q": "Mes marques foncent après le hammam. Pourquoi ?",
        "a": [
          "Un gommage fort peut irriter la peau et foncer les marques, surtout sur peau mate. Frotte plus doucement, et évite les zones irritées."
        ]
      }
    ],
    sources: [
      {
        "label": "DermNet (Nouvelle-Zélande), « Postinflammatory hyperpigmentation », V. Ngan, mise à jour A. Oakley, décembre 2015.",
        "url": "https://dermnetnz.org/topics/postinflammatory-hyperpigmentation"
      },
      {
        "label": "Davis EC, Callender VD. « Postinflammatory hyperpigmentation: a review of the epidemiology, clinical features, and treatment options in skin of color ». J Clin Aesthet Dermatol. 2010;3(7):20-31.",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2921758/"
      },
      {
        "label": "Mahmoud BH, Ruvolo E, Hexsel CL, et al. « Impact of long-wavelength UVA and visible light on melanocompetent skin ». J Invest Dermatol. 2010;130(8):2092-2097.",
        "url": "https://doi.org/10.1038/jid.2010.95"
      },
      {
        "label": "American Academy of Dermatology (AAD), « How do I know if I'm using the right sunscreen? », mise à jour le 25 avril 2024.",
        "url": "https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/choosing-right-sunscreen"
      },
      {
        "label": "AAD, « How to fade dark spots in darker skin tones », mise à jour le 10 mars 2025.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/fade-dark-spots"
      },
      {
        "label": "DermNet, « Melasma », A. Oakley, mise à jour B. J. Doolan et M. Gupta, décembre 2025.",
        "url": "https://dermnetnz.org/topics/melasma"
      },
      {
        "label": "AAD, « Melasma: Causes », mise à jour le 15 février 2022.",
        "url": "https://www.aad.org/public/diseases/a-z/melasma-causes"
      },
      {
        "label": "AAD, « Melasma: Diagnosis and treatment », mise à jour le 15 février 2022.",
        "url": "https://www.aad.org/public/diseases/a-z/melasma-treatment"
      },
      {
        "label": "DermNet, « Solar lentigo », A. Fitzpatrick et J. Chan, relu en novembre 2025.",
        "url": "https://dermnetnz.org/topics/solar-lentigo"
      },
      {
        "label": "AAD, « How to safely exfoliate at home », mise à jour le 6 février 2026.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/safely-exfoliate-at-home"
      },
      {
        "label": "AAD, « Finding skin cancer in darker skin tones », mise à jour le 3 juin 2025.",
        "url": "https://www.aad.org/public/diseases/skin-cancer/darker-skin-tones"
      }
    ],
    published: "2026-10-17",
    reviewed: { date: "2026-10-17", by: "dr-seddiki" },
  },

  /* ------------------------------------------------------------------ Relu par Dr Seddiki le 17 octobre 2026 : /soleil-maroc-taches */
  {
    slug: "soleil-maroc-taches",
    label: "Le soleil au Maroc, toute l'année",
    h1: "Faut-il se protéger du soleil toute l'année au Maroc, même en hiver ?",
    metaTitle: "Écran solaire toute l'année au Maroc : pourquoi | OTAGE",
    metaDescription: "Hiver, nuages, fenêtre, voiture : le soleil continue d'agir sur tes taches. Quand te protéger au Maroc, et comment lire l'indice UV, expliqué simplement.",
    image: image("ecran-solaire-spf50-plage-bouee.webp", 1600, 1600, "L'écran solaire SPF 50 OTAGE à la plage"),
    essentials: [
      "L'Organisation mondiale de la santé recommande de se protéger du soleil dès que l'indice UV atteint 3 [1].",
      "Les UV restent présents en hiver et par temps nuageux, selon l'Académie américaine de dermatologie [2].",
      "Le verre d'une fenêtre ordinaire arrête les UVB, mais laisse passer les UVA et la lumière visible [3]."
    ],
    intro: [
      "Oui, au Maroc, il est utile de se protéger toute l'année. Les UV sont présents en hiver et sous les nuages [1][2], et ils foncent les taches [4]. L'indice UV te dit, jour par jour, quand la protection est nécessaire [1]."
    ],
    sections: [
      {
        "h2": "L'hiver, le soleil fonce-t-il encore les taches ?",
        "body": [
          "Oui. L'Académie américaine de dermatologie rappelle que la peau reçoit des UV chaque fois qu'on sort, même en hiver [2]. Les UV sont plus faibles l'hiver, mais ils ne disparaissent pas.",
          "Pour les taches, c'est important : le mélasma fonce avec le soleil et peut revenir avec le soleil de l'été, même après un bon résultat [4]."
        ]
      },
      {
        "h2": "Et quand le ciel est couvert ?",
        "body": [
          "Les nuages ne suffisent pas. Selon l'OMS, les UV sont au plus haut par ciel dégagé, mais ils peuvent rester élevés même avec des nuages [1].",
          "Un ciel gris n'est donc pas une raison d'oublier ton écran le matin."
        ]
      },
      {
        "h2": "Les UV traversent-ils les fenêtres et les vitres de voiture ?",
        "body": [
          "En partie. Le verre ordinaire arrête les UVB, mais laisse passer les UVA et la lumière visible [3].",
          "Ce sont justement les UVA et la lumière visible qui peuvent foncer les taches, surtout sur peau mate [6][7]. Si tu passes tes journées près d'une fenêtre ou que tu conduis beaucoup, le côté le plus exposé du visage reçoit cette lumière.",
          "Certaines vitres récentes, ou traitées, protègent mieux des UV [3]. Mais tu ne sais pas toujours quel verre tu as : dans le doute, protège-toi."
        ]
      },
      {
        "h2": "À quelles heures le soleil est-il le plus fort ?",
        "body": [
          "Au milieu de la journée. L'OMS conseille de limiter l'exposition au soleil de midi [1]. L'Académie américaine de dermatologie conseille de limiter le temps dehors entre 10 h et 14 h [5].",
          "Le plus simple : regarde l'indice UV du jour, dans ton application météo. Dès qu'il atteint 3, protège-toi [1]."
        ]
      },
      {
        "h2": "Écran, chapeau ou ombre : qu'est-ce qui protège le mieux ?",
        "body": [
          "L'ombre et les vêtements d'abord, l'écran ensuite. Selon l'OMS, la protection se fait d'abord en cherchant l'ombre et en se couvrant, et l'écran solaire protège la peau que les vêtements ne couvrent pas [1].",
          "La checklist de l'OMS [1] :",
          {
            "checklist": [
              "Limiter le soleil de midi et chercher l'ombre.",
              "Porter des vêtements couvrants.",
              "Porter un chapeau à larges bords, qui protège les yeux, le visage, les oreilles et le cou.",
              "Porter des lunettes de soleil qui filtrent les UVA et les UVB.",
              "Mettre un écran solaire à large spectre sur la peau découverte."
            ]
          },
          "Un écran solaire ne sert pas à rester plus longtemps au soleil [1].",
          "Le mode d'emploi de l'écran : [bien appliquer son écran solaire](/appliquer-ecran-solaire)."
        ]
      }
    ],
    maroc: [
      "Au Maroc, le chapeau, le foulard et l'ombre font déjà partie des habitudes : garde-les, et ajoute l'écran sur le visage. En voiture, pense au côté du visage tourné vers la vitre [3]."
    ],
    adviceTitle: "Quand consulter ?",
    advice: [
      "Si une tache fonce malgré la protection, ou si elle change de forme ou de couleur, montre-la à un dermatologue : [quand consulter](/taches-quand-consulter)."
    ],
    solution: {
      "title": "Notre solution",
      "body": [
        "L'[écran solaire SPF 50](/soins/ecran-solaire-spf50) OTAGE protège des UVA et des UVB. Il se met le matin, en dernier, et se renouvelle toutes les deux heures au soleil.",
        "Ce qu'il ne fait pas : il ne remplace ni l'ombre ni le chapeau, et il ne fait pas disparaître les taches. Le guide complet : [taches brunes du visage](/taches-brunes-visage)."
      ]
    },
    productsTitle: "",
    productsIntro: "",
    products: [],
    routine: false,
    faq: [
      {
        "q": "Faut-il de l'écran pour rester à la maison ?",
        "a": [
          "Si tu restes loin des fenêtres, le besoin est faible. Près d'une fenêtre ensoleillée, les UVA et la lumière visible passent à travers le verre ordinaire."
        ]
      },
      {
        "q": "Les lunettes de soleil sont-elles utiles contre les taches ?",
        "a": [
          "Elles protègent les yeux et la peau autour. L'OMS conseille des lunettes qui filtrent les UVA et les UVB."
        ]
      },
      {
        "q": "Comment lire l'indice UV ?",
        "a": [
          "C'est un chiffre qui mesure la force des UV du jour. Dès 3, l'OMS recommande de se protéger."
        ]
      }
    ],
    sources: [
      {
        "label": "Organisation mondiale de la santé, « Ultraviolet radiation », aide-mémoire, 21 juin 2022.",
        "url": "https://www.who.int/news-room/fact-sheets/detail/ultraviolet-radiation"
      },
      {
        "label": "American Academy of Dermatology (AAD), « How to apply sunscreen », mise à jour le 15 août 2025.",
        "url": "https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/how-to-apply-sunscreen"
      },
      {
        "label": "Tuchinda C, Srivannaboon S, Lim HW. « Photoprotection by window glass, automobile glass, and sunglasses ». J Am Acad Dermatol. 2006;54(5):845-854.",
        "url": "https://doi.org/10.1016/j.jaad.2005.11.1082"
      },
      {
        "label": "DermNet (Nouvelle-Zélande), « Melasma », A. Oakley, mise à jour B. J. Doolan et M. Gupta, décembre 2025.",
        "url": "https://dermnetnz.org/topics/melasma"
      },
      {
        "label": "AAD, « How to fade dark spots in darker skin tones », mise à jour le 10 mars 2025.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/fade-dark-spots"
      },
      {
        "label": "Morgado-Carrasco D, Piquero-Casals J, Granger C, Trullàs C, Passeron T. « Melasma: The need for tailored photoprotection to improve clinical outcomes ». Photodermatol Photoimmunol Photomed. 2022;38(6):515-521.",
        "url": "https://doi.org/10.1111/phpp.12783"
      },
      {
        "label": "Mahmoud BH, Ruvolo E, Hexsel CL, et al. « Impact of long-wavelength UVA and visible light on melanocompetent skin ». J Invest Dermatol. 2010;130(8):2092-2097.",
        "url": "https://doi.org/10.1038/jid.2010.95"
      }
    ],
    published: "2026-10-17",
    reviewed: { date: "2026-10-17", by: "dr-seddiki" },
  },

  /* ------------------------------------------------------------------ Relu par Dr Seddiki le 17 octobre 2026 : /appliquer-ecran-solaire */
  {
    slug: "appliquer-ecran-solaire",
    label: "Bien appliquer son écran solaire",
    h1: "Comment bien appliquer son écran solaire sur le visage ?",
    metaTitle: "Appliquer son écran solaire visage : le bon geste | OTAGE",
    metaDescription: "Quelle quantité, dans quel ordre, quand le renouveler, et sous le maquillage ? Le mode d'emploi de l'écran solaire visage, expliqué par un pharmacien.",
    image: image("ecran-solaire-spf50-n04-fond-blanc.webp", 1092, 1092, "Écran solaire SPF 50 OTAGE N°04, flacon sur fond blanc"),
    essentials: [
      "Pour le visage, l'Académie américaine de dermatologie conseille au moins une cuillère à café d'écran solaire [1].",
      "Au soleil, un écran solaire se renouvelle toutes les deux heures, et tout de suite après avoir nagé ou transpiré [1].",
      "Un maquillage avec SPF ne remplace pas un écran solaire : la plupart des produits de maquillage protègent mal des UVA [2]."
    ],
    intro: [
      "Un écran solaire ne protège bien que s'il est mis en quantité suffisante, au bon moment, et renouvelé. Le matin, il se met en dernier, après la crème et avant le maquillage. Au soleil, il se renouvelle toutes les deux heures [1]."
    ],
    sections: [
      {
        "h2": "Quelle quantité d'écran solaire mettre sur le visage ?",
        "body": [
          "Au moins une cuillère à café pour le visage, selon l'Académie américaine de dermatologie, soit à peu près la longueur de ton index et de ton majeur [1]. C'est souvent plus que ce qu'on met spontanément.",
          { "figure": "ecran" },
          "Pour ne pas en manquer :",
          {
            "steps": [
              "Dépose l'écran en petits points : front, joues, nez, menton.",
              "Étale en douceur, sans frotter fort.",
              "N'oublie pas le cou et les oreilles [1]."
            ]
          },
          "Pour les lèvres, utilise un baume avec un SPF d'au moins 30 [1]."
        ]
      },
      {
        "h2": "Avant ou après la crème, et combien de temps avant de sortir ?",
        "body": [
          "Le matin, l'écran solaire se met en dernier soin, après le nettoyage, le soin de traitement et la crème, et avant le maquillage [3][2].",
          "Mets-le avant de sortir : il faut environ 15 minutes pour que la peau absorbe l'écran et soit protégée [1]."
        ]
      },
      {
        "h2": "Toutes les combien de temps faut-il le renouveler ?",
        "body": [
          "Au soleil, toutes les deux heures, et tout de suite après avoir nagé, transpiré ou t'être essuyée [1]. Une seule application le matin ne suffit pas pour une journée dehors."
        ]
      },
      {
        "h2": "Comment le renouveler par-dessus le maquillage ?",
        "body": [
          "Mets ton écran solaire en premier, puis ton maquillage par-dessus [2].",
          "Pour le renouveler dans la journée sans tout enlever, des dermatologues proposent un écran solaire en poudre à poser sur le fond de teint [2].",
          "Attention : un fond de teint « avec SPF » ne suffit pas seul. La plupart des produits de maquillage protègent mal des UVA [2]. Il vient en plus de l'écran, pas à la place."
        ]
      },
      {
        "h2": "J'ai la peau mate : quel écran choisir ?",
        "body": [
          "Choisis un écran à large spectre (UVA et UVB), avec un SPF d'au moins 30 [4]. Sur peau mate ou foncée, un écran teinté évite le voile blanc [4].",
          "Un écran teinté a un autre avantage : il protège aussi de la lumière visible, qui peut foncer les taches [4]. Sur les peaux mates, la lumière visible provoque une pigmentation plus foncée et plus durable que les UVA longs, selon une étude menée sur des peaux de phototypes IV à VI [5].",
          "Les dermatologues conseillent souvent, contre le mélasma, un écran teinté qui contient des oxydes de fer [6][7].",
          "Plus de détails : [les taches sur peau mate](/taches-peau-mate)."
        ]
      },
      {
        "h2": "Quelles erreurs font perdre la protection ?",
        "body": [
          "Voici les oublis les plus fréquents :",
          {
            "table": {
              "head": [
                "Erreur",
                "Pourquoi c'est un problème",
                "Le bon geste"
              ],
              "rows": [
                [
                  "Pas de renouvellement au soleil",
                  "La protection ne dure pas toute la journée [1]",
                  "Toutes les deux heures, et après la baignade ou la sueur [1]"
                ],
                [
                  "Compter sur le fond de teint SPF",
                  "Protection UVA souvent insuffisante [2]",
                  "Écran d'abord, maquillage ensuite [2]"
                ],
                [
                  "Oublier cou, oreilles, lèvres",
                  "Zones exposées elles aussi [1]",
                  "Les inclure, baume SPF 30 pour les lèvres [1]"
                ],
                [
                  "Écran seul en plein soleil",
                  "L'écran ne sert pas à rester plus longtemps au soleil [8]",
                  "Ombre, chapeau, lunettes en plus [8]"
                ]
              ]
            }
          }
        ]
      }
    ],
    maroc: [
      "Au Maroc, garde un écran dans ton sac : il se renouvelle facilement à midi, entre deux trajets. Pour savoir quand te protéger (hiver, nuages, vitres) : [le soleil au Maroc, toute l'année](/soleil-maroc-taches)."
    ],
    adviceTitle: "Quand consulter ?",
    advice: [
      "Si ta peau rougit, pique ou gratte avec un écran solaire, arrête-le et demande conseil à ton pharmacien. Une tache qui change malgré la protection doit être vue par un dermatologue : [quand consulter](/taches-quand-consulter)."
    ],
    solution: {
      "title": "Notre solution",
      "body": [
        "L'[écran solaire SPF 50](/soins/ecran-solaire-spf50) OTAGE protège des UVA et des UVB. C'est la dernière étape du matin de la routine anti-taches, et il se renouvelle toutes les deux heures au soleil.",
        "Ce qu'il ne fait pas : il ne fait pas disparaître les taches, et il ne remplace ni l'ombre ni le chapeau.",
        "Pour le reste du guide : [taches brunes du visage](/taches-brunes-visage)."
      ]
    },
    productsTitle: "",
    productsIntro: "",
    products: [],
    routine: false,
    faq: [
      {
        "q": "Faut-il attendre avant de se maquiller ?",
        "a": [
          "Laisse l'écran pénétrer quelques minutes avant le maquillage, pour qu'il ne bouge pas."
        ]
      },
      {
        "q": "Un écran solaire minéral est-il mieux pour une peau sensible ?",
        "a": [
          "Pour une peau qui pique facilement, l'AAD conseille un écran qui ne contient que de l'oxyde de zinc et du dioxyde de titane."
        ]
      }
    ],
    sources: [
      {
        "label": "American Academy of Dermatology (AAD), « How to apply sunscreen », mise à jour le 15 août 2025.",
        "url": "https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/how-to-apply-sunscreen"
      },
      {
        "label": "Skin Cancer Foundation, « Faire fonctionner votre crème solaire avec votre maquillage », 9 janvier 2018, mise à jour le 27 mars 2025.",
        "url": "https://www.skincancer.org/fr/blog/making-sunscreen-work-makeup/"
      },
      {
        "label": "AAD, « Should I apply my skin care products in a certain order? », date de mise à jour non affichée.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-basics/care/apply-skin-care-certain-order"
      },
      {
        "label": "AAD, « How do I know if I'm using the right sunscreen? », mise à jour le 25 avril 2024.",
        "url": "https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/choosing-right-sunscreen"
      },
      {
        "label": "Mahmoud BH, Ruvolo E, Hexsel CL, et al. « Impact of long-wavelength UVA and visible light on melanocompetent skin ». J Invest Dermatol. 2010;130(8):2092-2097.",
        "url": "https://doi.org/10.1038/jid.2010.95"
      },
      {
        "label": "AAD, « Melasma: Diagnosis and treatment », mise à jour le 15 février 2022.",
        "url": "https://www.aad.org/public/diseases/a-z/melasma-treatment"
      },
      {
        "label": "DermNet (Nouvelle-Zélande), « Melasma », A. Oakley, mise à jour B. J. Doolan et M. Gupta, décembre 2025.",
        "url": "https://dermnetnz.org/topics/melasma"
      },
      {
        "label": "Organisation mondiale de la santé, « Ultraviolet radiation », aide-mémoire, 21 juin 2022.",
        "url": "https://www.who.int/news-room/fact-sheets/detail/ultraviolet-radiation"
      }
    ],
    published: "2026-10-17",
    reviewed: { date: "2026-10-17", by: "dr-seddiki" },
  },

  /* ------------------------------------------------------------------ Relu par Dr Seddiki le 17 octobre 2026 : /routine-taches-matin-soir */
  {
    slug: "routine-taches-matin-soir",
    label: "Routine matin et soir",
    h1: "Routine contre les taches brunes : l'ordre des soins, matin et soir",
    metaTitle: "Taches brunes : l'ordre des soins matin et soir | OTAGE",
    metaDescription: "Dans quel ordre appliquer tes soins contre les taches brunes, pourquoi pas d'écran le soir, que faire si ta peau picote et à quoi t'attendre.",
    image: image("gamme-anti-taches-otage-trousse.webp", 1600, 1600, "La gamme anti-taches OTAGE dans sa trousse"),
    intro: [
      "Contre les taches brunes, une routine simple suffit : nettoyer, traiter, hydrater, puis protéger du soleil le matin [1]. Le soir, on garde les trois premières étapes, sans écran solaire. Ce qui compte le plus, c'est de la suivre chaque jour, avec un écran solaire chaque matin [2][3]."
    ],
    sections: [
      {
        "h2": "Dans quel ordre appliquer les soins le matin ?",
        "body": [
          "Les dermatologues conseillent un ordre logique : on nettoie, on applique le soin de traitement juste après, puis l'hydratant et l'écran solaire, puis le maquillage si tu en mets [1].",
          "Avec la [routine anti-taches OTAGE](/), le matin, cela donne 4 étapes :",
          {
            "steps": [
              "**Nettoyer.** Le [gel nettoyant](/soins/gel-nettoyant), sur peau humide. Masse 30 secondes, puis rince. Sèche en tapotant, sans frotter.",
              "**Traiter.** Le [sérum anti-taches](/soins/serum-anti-taches) : 3 à 4 gouttes sur peau sèche, en tapotant du bout des doigts. C'est le soin qui cible les taches.",
              "**Hydrater.** La [crème anti-taches](/soins/creme-anti-taches) : une noisette sur le visage et le cou, en mouvements vers le haut. Elle hydrate et unifie le teint.",
              "**Protéger.** L'[écran solaire SPF 50](/soins/ecran-solaire-spf50), en dernier, avant de sortir. Au soleil, renouvelle-le toutes les 2 heures, et après avoir transpiré [4]."
            ]
          },
          "Pourquoi le sérum avant la crème ? Le soin de traitement s'applique sur la peau propre, juste après le nettoyage, et l'hydratant vient ensuite [1]. Laisse chaque produit pénétrer quelques instants avant le suivant.",
          "Les gestes complets : [bien appliquer son écran solaire](/appliquer-ecran-solaire)."
        ]
      },
      {
        "h2": "Pourquoi pas d'écran solaire le soir ?",
        "body": [
          "Le soir, il n'y a plus de soleil : l'écran solaire n'a plus de rôle à jouer. La routine du soir garde donc les 3 premières étapes :",
          {
            "steps": [
              "Le gel nettoyant, pour retirer la journée : poussière, transpiration, écran solaire et maquillage.",
              "Le sérum anti-taches.",
              "La crème anti-taches."
            ]
          },
          "Nettoie bien, mais en douceur : frotter fort irrite la peau [2].",
          "Bon à savoir : la crème OTAGE contient des AHA, des acides de fruits. Les AHA rendent la peau plus sensible au soleil [5]. C'est une raison de plus pour ne jamais oublier l'écran le lendemain matin [5]."
        ]
      },
      {
        "h2": "En combien de temps voit-on un résultat ?",
        "body": [
          "Personne ne peut te donner un délai précis, et méfie-toi de ceux qui le font.",
          "Ce qu'on peut dire honnêtement :",
          {
            "list": [
              "Les premiers jours, ne t'attends pas à voir une différence. C'est normal.",
              "Avec la régularité, les taches s'atténuent petit à petit.",
              "Le temps dépend de ta peau, du type de tache, de sa profondeur et de son ancienneté [2][6].",
              "Le soleil peut faire revenir les taches, même après un bon résultat, surtout le mélasma [6]."
            ]
          },
          "Pour suivre tes progrès, prends une photo de ton visage à la lumière du jour, au même endroit, de temps en temps. C'est plus fiable que le miroir de tous les jours.",
          "Si rien ne bouge malgré une routine régulière et l'écran solaire, vois un dermatologue [2]."
        ]
      },
      {
        "h2": "Que faire si on oublie un jour, ou si la peau picote ?",
        "body": [
          "**Tu as oublié un jour ?** Ce n'est pas grave. Reprends simplement le lendemain, sans doubler les doses. Ce qui compte, c'est la régularité sur la durée.",
          "**Tu as oublié l'écran solaire ?** C'est l'oubli le plus important à éviter. Si tu sors au soleil sans protection, reste à l'ombre et porte un chapeau [7]. Garde ton écran dans ton sac.",
          "**Ta peau picote ou rougit ?** Arrête le produit en cause. Un produit qui brûle ou pique irrite la peau, et l'irritation peut foncer les taches [2]. Demande conseil à ton pharmacien avant de reprendre.",
          "**Avant de commencer**, fais un test de 24 h sur une petite zone, par exemple dans le pli du coude. En cas de rougeur, n'utilise pas le produit et demande conseil."
        ]
      },
      {
        "h2": "Peut-on ajouter d'autres soins à la routine ?",
        "body": [
          "Mieux vaut éviter d'empiler les produits. Utiliser trop de soins à la fois peut irriter la peau [1], et une peau irritée marque plus [2].",
          "Quelques règles simples :",
          {
            "list": [
              "Pas de gommage à grains ni de produit qui pique en même temps que la routine [2].",
              "Pas d'autre soin aux acides sans en parler à ton pharmacien : la crème contient déjà des AHA.",
              "Pas de produit acheté sans étiquette claire ou sans contrôle : certains contiennent des corticoïdes ou du mercure non déclarés [2].",
              "Un traitement prescrit par ton dermatologue passe en priorité : demande-lui comment l'associer."
            ]
          },
          "Tu peux garder ton maquillage habituel, à appliquer après l'écran solaire [1]. Le contour des yeux a son propre soin : le [sérum contour des yeux](/soins/contour-des-yeux).",
          "Pour comprendre d'où viennent les taches : [le guide des taches brunes du visage](/taches-brunes-visage). Les gestes à éviter : [les erreurs qui aggravent les taches](/erreurs-taches-visage)."
        ]
      }
    ],
    maroc: [
      "Au Maroc, la routine du matin se termine par l'écran, même en hiver."
    ],
    adviceTitle: "Quand consulter un dermatologue ?",
    advice: [
      "Consulte si :",
      {
        "list": [
          "tes taches ne s'atténuent pas malgré une routine régulière et l'écran solaire [2] ;",
          "ta peau réagit à plusieurs produits : rougeurs, brûlures, démangeaisons ;",
          "tu as encore des boutons, ou un mélasma étendu [2][6] ;",
          "une tache change de forme, de couleur ou de taille, saigne ou démange [8]."
        ]
      },
      "Enceinte ou allaitante ? Demande l'accord de ton médecin avant de commencer la routine. Montre-lui la liste des ingrédients [9]."
    ],
    productsTitle: "",
    productsIntro: "",
    products: [],
    routine: false,
    faq: [
      {
        "q": "Faut-il utiliser les 4 soins ?",
        "a": [
          "Le matin, oui : l'écran solaire est indispensable, sans lui les taches reviennent. Le soir, les 3 premiers suffisent."
        ]
      },
      {
        "q": "Le sérum avant ou après la crème ?",
        "a": [
          "Avant. Le sérum va sur la peau propre et sèche, la crème vient ensuite."
        ]
      },
      {
        "q": "Peut-on suivre la routine toute l'année ?",
        "a": [
          "Oui, et l'écran solaire aussi : les UV sont présents même en hiver et par temps couvert."
        ]
      },
      {
        "q": "Je suis enceinte, je peux suivre la routine ?",
        "a": [
          "Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients."
        ]
      }
    ],
    sources: [
      {
        "label": "American Academy of Dermatology (AAD), « Should I apply my skin care products in a certain order? », date de mise à jour non affichée.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-basics/care/apply-skin-care-certain-order"
      },
      {
        "label": "AAD, « How to fade dark spots in darker skin tones », mise à jour le 10 mars 2025.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/fade-dark-spots"
      },
      {
        "label": "AAD, « Melasma: Diagnosis and treatment », mise à jour le 15 février 2022.",
        "url": "https://www.aad.org/public/diseases/a-z/melasma-treatment"
      },
      {
        "label": "AAD, « How to apply sunscreen », mise à jour le 15 août 2025.",
        "url": "https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/how-to-apply-sunscreen"
      },
      {
        "label": "U.S. Food and Drug Administration (FDA), « Alpha Hydroxy Acids », contenu à jour au 22 novembre 2022.",
        "url": "https://www.fda.gov/cosmetics/cosmetic-ingredients/alpha-hydroxy-acids"
      },
      {
        "label": "DermNet (Nouvelle-Zélande), « Melasma », A. Oakley, mise à jour B. J. Doolan et M. Gupta, décembre 2025.",
        "url": "https://dermnetnz.org/topics/melasma"
      },
      {
        "label": "Organisation mondiale de la santé, « Ultraviolet radiation », aide-mémoire, 21 juin 2022.",
        "url": "https://www.who.int/news-room/fact-sheets/detail/ultraviolet-radiation"
      },
      {
        "label": "AAD, « What to look for: ABCDEs of melanoma », date de mise à jour non affichée.",
        "url": "https://www.aad.org/public/diseases/skin-cancer/abcdes-melanoma"
      },
      {
        "label": "Bozzo P, Chua-Gocheco A, Einarson A. « Safety of skin care products during pregnancy ». Can Fam Physician. 2011;57(6):665-667.",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3114665/"
      }
    ],
    published: "2026-10-17",
    reviewed: { date: "2026-10-17", by: "dr-seddiki" },
  },

  /* ------------------------------------------------------------------ Relu par Dr Seddiki le 17 octobre 2026 : /erreurs-taches-visage */
  {
    slug: "erreurs-taches-visage",
    label: "Les erreurs qui foncent les taches",
    h1: "Citron, gommage, crèmes sans étiquette : quelles erreurs foncent les taches ?",
    metaTitle: "Citron, gommage : les erreurs qui foncent les taches | OTAGE",
    metaDescription: "Le citron, le gommage ou une crème sans étiquette peuvent foncer tes taches au lieu de les atténuer. Les erreurs à éviter, et quoi faire à la place.",
    image: image("gel-nettoyant-anti-taches-mains.webp", 1195, 1600, "Le gel nettoyant anti-taches OTAGE tenu entre deux mains"),
    essentials: [
      "Le jus de citron vert ou jaune sur la peau, suivi d'une exposition au soleil, peut provoquer une réaction qui laisse des taches brunes durables [1][2].",
      "L'Académie américaine de dermatologie déconseille les gommages forts aux peaux mates, car ils peuvent foncer la peau [3].",
      "L'Organisation mondiale de la santé alerte sur les crèmes qui contiennent du mercure, interdites dans de nombreux pays mais encore vendues sur Internet [4]."
    ],
    intro: [
      "Certains gestes censés « effacer » les taches les foncent en réalité. Le citron, les gommages trop forts, les boutons percés et les crèmes sans étiquette claire irritent la peau ou la rendent sensible au soleil [1][3][5][6]. Et une peau irritée fabrique plus de pigment [7]."
    ],
    sections: [
      {
        "h2": "Le citron sur les taches, ça marche ?",
        "body": [
          "Non, et c'est risqué. Le jus de citron contient des substances qui réagissent avec le soleil [1][2]. Appliqué sur la peau avant une exposition, il peut provoquer une brûlure, puis une tache brune qui peut durer longtemps [1].",
          "Ce phénomène porte un nom : la phytophotodermatose. Il est décrit avec le citron vert et avec le citron jaune [2]. Sur peau mate, la tache qui suit peut être plus marquée [1]."
        ]
      },
      {
        "h2": "Le gommage aide-t-il à faire partir les taches ?",
        "body": [
          "Un gommage trop fort aggrave souvent les taches au lieu de les atténuer. L'Académie américaine de dermatologie conseille d'éviter les gommages forts, mécaniques ou chimiques, si tu as la peau mate ou des marques brunes après l'acné [3].",
          "Elle prévient aussi qu'un gommage trop fréquent rend la peau rouge et irritée [3].",
          "Si tu gommes ta peau :",
          {
            "steps": [
              "Choisis un geste doux, en petits cercles, sans appuyer [3].",
              "Rince à l'eau tiède [3].",
              "N'en fais pas sur une peau irritée, brûlée par le soleil ou blessée [3]."
            ]
          }
        ]
      },
      {
        "h2": "Pourquoi ne faut-il pas percer ses boutons ?",
        "body": [
          "Percer ou presser un bouton augmente l'inflammation [5]. Plus la peau est enflammée, plus le risque de cicatrice augmente [5]. Et sur peau mate, l'inflammation laisse souvent une marque brune qui dure [7][8].",
          "À la place : laisse le bouton, applique le traitement conseillé par ton médecin ou ton pharmacien [5]. Tout savoir : [les taches d'acné](/taches-acne)."
        ]
      },
      {
        "h2": "Quelles crèmes « miracles » sont dangereuses ?",
        "body": [
          "Certaines crèmes vendues sans contrôle, présentées comme des produits dépigmentants, contiennent des substances interdites ou réservées à l'ordonnance [4][6]. L'OMS cite le mercure et l'hydroquinone parmi les ingrédients dangereux de ces produits [4]. L'Académie américaine de dermatologie signale des produits importés contenant des corticoïdes ou du mercure non déclarés sur l'étiquette [6].",
          "Le mercure est dangereux pour la santé. Ces produits sont interdits dans de nombreux pays, mais restent vendus sur Internet [4].",
          "L'hydroquinone est un médicament sur ordonnance aux États-Unis [9]. Elle est déconseillée pendant la grossesse [10].",
          "Les signes qui doivent te faire reposer un produit :",
          {
            "checklist": [
              "Pas de liste d'ingrédients, ou une liste illisible.",
              "Pas de nom ni d'adresse du fabricant.",
              "Une promesse de résultat rapide ou garanti.",
              "Un produit vendu en pot sans étiquette, ou reconditionné."
            ]
          }
        ]
      },
      {
        "h2": "Oublier l'écran solaire, c'est grave ?",
        "body": [
          "C'est l'erreur qui annule le plus d'efforts. Le soleil fonce les taches existantes et les fait revenir [7][11]. Même après un bon résultat, le mélasma peut revenir avec le soleil de l'été [11].",
          "Le bon réflexe : un écran solaire chaque matin, renouvelé au soleil, avec un chapeau et l'ombre [12]. Le mode d'emploi : [bien appliquer son écran solaire](/appliquer-ecran-solaire)."
        ]
      },
      {
        "h2": "Le récapitulatif",
        "body": [
          {
            "table": {
              "head": [
                "Idée reçue",
                "Ce qui se passe vraiment",
                "À faire à la place"
              ],
              "rows": [
                [
                  "« Le citron efface les taches »",
                  "Citron + soleil peuvent provoquer une brûlure puis une tache [1][2]",
                  "Ne rien mettre de piquant ; écran solaire le matin"
                ],
                [
                  "« Plus je gomme, plus ça part »",
                  "Un gommage fort peut foncer une peau mate [3]",
                  "Nettoyer en douceur, sans frotter"
                ],
                [
                  "« Je perce pour que ça guérisse vite »",
                  "Plus d'inflammation, plus de marque [5]",
                  "Laisser le bouton, traiter l'acné"
                ],
                [
                  "« Cette crème du souk marche vite »",
                  "Elle peut contenir du mercure ou des corticoïdes [4][6]",
                  "Une étiquette claire, un avis du pharmacien"
                ],
                [
                  "« L'hiver, pas besoin d'écran »",
                  "Les UV sont là toute l'année [13]",
                  "Écran chaque matin"
                ]
              ]
            }
          }
        ]
      }
    ],
    maroc: [
      "Au Maroc, on se transmet des recettes contre les taches : citron, bicarbonate, mélanges maison. Au souk ou sur les réseaux sociaux, on trouve aussi des crèmes sans étiquette claire, parfois vendues en pot sans nom.",
      "Au hammam, le gommage au kessa et au savon noir est une tradition : sur une peau marquée de taches, frotte doucement et évite les zones irritées [3]. Avant d'acheter une crème, demande à ton pharmacien de lire l'étiquette avec toi."
    ],
    adviceTitle: "Quand consulter ?",
    advice: [
      "Si un produit t'a brûlé la peau, si une tache fonce vite ou si tu as utilisé longtemps une crème sans savoir ce qu'elle contient, parles-en à un médecin. Les signes qui doivent t'alerter : [quand consulter un dermatologue](/taches-quand-consulter)."
    ],
    solution: {
      "title": "Notre solution",
      "body": [
        "Pour remplacer les gestes agressifs, deux soins simples : le [gel nettoyant](/soins/gel-nettoyant), sans sulfate, pour nettoyer sans frotter, et l'[écran solaire SPF 50](/soins/ecran-solaire-spf50) chaque matin pour limiter le retour des taches.",
        "Ce qu'ils ne font pas : ils ne réparent pas une brûlure ni une peau abîmée par un produit, et ils ne remplacent pas un avis médical. Pour le reste : [taches brunes du visage](/taches-brunes-visage)."
      ]
    },
    productsTitle: "",
    productsIntro: "",
    products: [],
    routine: false,
    faq: [
      {
        "q": "Un produit naturel est-il forcément sans danger ?",
        "a": [
          "Non. Le citron est naturel, et pourtant, avec le soleil, il peut brûler la peau et laisser une tache."
        ]
      },
      {
        "q": "J'ai utilisé une crème sans étiquette pendant des mois. Que faire ?",
        "a": [
          "Arrête-la, garde l'emballage si tu l'as, et montre-le à ton médecin ou à ton pharmacien."
        ]
      },
      {
        "q": "Comment savoir si une crème contient du mercure ?",
        "a": [
          "À l'œil, c'est impossible, et l'étiquette ne le dit pas toujours. Dans le doute, ne l'utilise pas et montre-la à ton pharmacien."
        ]
      }
    ],
    sources: [
      {
        "label": "DermNet (Nouvelle-Zélande), « Phytophotodermatitis », I. Coulson, novembre 2021.",
        "url": "https://dermnetnz.org/topics/phytophotodermatitis"
      },
      {
        "label": "Mioduszewski M, Beecker J. « Phytophotodermatitis from making sangria: a phototoxic reaction to lime and lemon juice ». CMAJ. 2015;187(10):756.",
        "url": "https://doi.org/10.1503/cmaj.140942"
      },
      {
        "label": "American Academy of Dermatology (AAD), « How to safely exfoliate at home », mise à jour le 6 février 2026.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/safely-exfoliate-at-home"
      },
      {
        "label": "Organisation mondiale de la santé, « Mercury in skin lightening products », note d'information, 3 novembre 2019.",
        "url": "https://www.who.int/publications/i/item/WHO-CED-PHE-EPE-19.13"
      },
      {
        "label": "AAD, « Acne scars: Causes », mise à jour le 8 décembre 2023.",
        "url": "https://www.aad.org/public/diseases/acne/derm-treat/scars/causes"
      },
      {
        "label": "AAD, « How to fade dark spots in darker skin tones », mise à jour le 10 mars 2025.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/fade-dark-spots"
      },
      {
        "label": "DermNet, « Postinflammatory hyperpigmentation », V. Ngan, mise à jour A. Oakley, décembre 2015.",
        "url": "https://dermnetnz.org/topics/postinflammatory-hyperpigmentation"
      },
      {
        "label": "Davis EC, Callender VD. « Postinflammatory hyperpigmentation: a review of the epidemiology, clinical features, and treatment options in skin of color ». J Clin Aesthet Dermatol. 2010;3(7):20-31.",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2921758/"
      },
      {
        "label": "AAD, « Melasma: Diagnosis and treatment », mise à jour le 15 février 2022.",
        "url": "https://www.aad.org/public/diseases/a-z/melasma-treatment"
      },
      {
        "label": "AAD, « Dermatologist-approved pregnancy skin care », mise à jour le 26 juin 2025.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/pregnancy-skin-care"
      },
      {
        "label": "DermNet, « Melasma », A. Oakley, mise à jour B. J. Doolan et M. Gupta, décembre 2025.",
        "url": "https://dermnetnz.org/topics/melasma"
      },
      {
        "label": "Organisation mondiale de la santé, « Ultraviolet radiation », aide-mémoire, 21 juin 2022.",
        "url": "https://www.who.int/news-room/fact-sheets/detail/ultraviolet-radiation"
      },
      {
        "label": "AAD, « How to apply sunscreen », mise à jour le 15 août 2025.",
        "url": "https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/how-to-apply-sunscreen"
      }
    ],
    published: "2026-10-17",
    reviewed: { date: "2026-10-17", by: "dr-seddiki" },
  },

  /* ------------------------------------------------------------------ Relu par Dr Seddiki le 17 octobre 2026 : /choisir-creme-anti-taches */
  {
    slug: "choisir-creme-anti-taches",
    label: "Choisir une crème anti-taches",
    h1: "Comment choisir une crème anti-taches sans se tromper ?",
    metaTitle: "Choisir une crème anti-taches : le guide honnête | OTAGE",
    metaDescription: "Actifs, écran solaire, tolérance, étiquette : les vrais critères pour choisir une crème anti-taches, et les pièges qui doivent te faire reposer un produit.",
    image: image("panneau-ton-teint-revele-creme-anti-taches.webp", 1195, 1600, "Panneau « Ton teint, révélé » avec la crème anti-taches OTAGE"),
    essentials: [
      "Sans écran solaire chaque jour, une crème anti-taches perd une grande partie de son intérêt, car le soleil fonce et fait revenir les taches [1][2].",
      "L'Organisation mondiale de la santé alerte sur des produits contenant du mercure ou de l'hydroquinone, encore vendus sur Internet malgré des interdictions [3]."
    ],
    intro: [
      "Une bonne crème anti-taches se choisit sur des critères simples : des actifs connus, une bonne tolérance, une étiquette claire, et un écran solaire à côté [1][4]. Méfie-toi des promesses de résultat rapide et des produits sans étiquette [3][5]. Aucune crème ne peut promettre de faire disparaître une tache."
    ],
    sections: [
      {
        "h2": "Quels actifs regarder sur l'étiquette ?",
        "body": [
          "Les dermatologues citent plusieurs actifs utilisés contre les taches, par exemple l'acide azélaïque, l'acide glycolique (un AHA), l'acide kojique, les rétinoïdes ou la vitamine C [5]. D'autres, comme l'arbutine ou la niacinamide, sont aussi étudiés [6].",
          "Ce qu'il faut retenir :",
          {
            "list": [
              "un actif connu vaut mieux qu'une promesse ;",
              "plusieurs actifs « forts » en même temps peuvent irriter [7] ;",
              "certains actifs ne conviennent pas pendant la grossesse, comme les rétinoïdes et l'hydroquinone [8]."
            ]
          }
        ]
      },
      {
        "h2": "Pourquoi l'écran solaire compte-t-il plus que la crème ?",
        "body": [
          "Parce que le soleil fonce les taches et les fait revenir [1][2]. Une crème appliquée le soir ne sert pas à grand-chose si la peau prend le soleil sans protection le lendemain.",
          "Pour les taches, choisis un écran à large spectre, SPF 30 ou plus, et si possible teinté, qui protège aussi de la lumière visible [4].",
          "Le mode d'emploi : [bien appliquer son écran solaire](/appliquer-ecran-solaire)."
        ]
      },
      {
        "h2": "Comment savoir si une crème est bien tolérée ?",
        "body": [
          "Fais toujours un test avant : un peu de produit sur une petite zone, pendant 24 heures. En cas de rougeur ou de brûlure, ne l'utilise pas.",
          "Pour une peau sensible ou mate, l'Académie américaine de dermatologie conseille des produits marqués « pour peau sensible » ou sans parfum, et d'arrêter tout produit qui brûle ou pique [5]. Sur peau mate, une irritation peut laisser une tache [2][6]."
        ]
      },
      {
        "h2": "Que doit-on trouver sur l'étiquette ?",
        "body": [
          "Voici ce qu'il faut regarder avant d'acheter :",
          {
            "table": {
              "head": [
                "Sur l'étiquette",
                "Pourquoi c'est important"
              ],
              "rows": [
                [
                  "La liste complète des ingrédients",
                  "Savoir ce que tu mets sur ta peau ; la montrer à ton pharmacien ou à ton médecin [8]"
                ],
                [
                  "Pour un écran : SPF et « large spectre » ou « UVA/UVB »",
                  "Savoir de quoi il protège [4]"
                ]
              ]
            }
          }
        ]
      },
      {
        "h2": "Quels pièges doivent te faire reposer un produit ?",
        "body": [
          "Les signaux d'alerte :",
          {
            "checklist": [
              "Une promesse de résultat garanti, rapide, ou « définitif ».",
              "Pas de liste d'ingrédients, ou une liste illisible.",
              "Un pot sans étiquette, ou un produit reconditionné.",
              "Un prix très bas pour une promesse très forte.",
              "Une vente uniquement par messages privés, sans nom de fabricant."
            ]
          },
          "Certains produits vendus sans contrôle contiennent du mercure, de l'hydroquinone ou des corticoïdes non déclarés [3][5]. Ils peuvent abîmer la peau. Tout savoir : [les erreurs qui aggravent les taches](/erreurs-taches-visage)."
        ]
      }
    ],
    maroc: [
      "Au Maroc, on trouve des crèmes anti-taches en pharmacie, en parapharmacie, en grande surface et en ligne. Ton pharmacien peut lire l'étiquette avec toi et te dire si un produit convient à ta peau."
    ],
    adviceTitle: "Quand consulter ?",
    advice: [
      "Avant de choisir une crème, il faut savoir de quelle tache il s'agit. Une tache qui change, saigne ou démange doit être vue par un dermatologue : [quand consulter](/taches-quand-consulter)."
    ],
    solution: {
      "title": "Une option parmi d'autres : la routine OTAGE",
      "body": [
        "La routine OTAGE est une option, pas la seule. Elle associe un [sérum anti-taches](/soins/serum-anti-taches) à l'alpha-arbutine, une [crème anti-taches](/soins/creme-anti-taches) à la niacinamide et aux AHA, un gel nettoyant et un écran SPF 50.",
        "Ce qu'elle fait : elle aide à atténuer les taches brunes et à limiter leur retour, avec la régularité et l'écran solaire. Ce qu'elle ne fait pas : elle ne fait pas disparaître les taches, elle ne traite ni l'acné ni un mélasma étendu, et elle ne remplace pas l'avis d'un dermatologue.",
        "Le guide complet : [taches brunes du visage](/taches-brunes-visage). La routine pas à pas : [matin et soir](/routine-taches-matin-soir)."
      ]
    },
    productsTitle: "",
    productsIntro: "",
    products: [],
    routine: false,
    faq: [
      {
        "q": "Une crème chère est-elle forcément meilleure ?",
        "a": [
          "Non. Le prix ne dit rien de l'efficacité. Regarde les actifs, la tolérance et l'étiquette."
        ]
      },
      {
        "q": "Peut-on utiliser une crème anti-taches et un écran solaire en même temps ?",
        "a": [
          "Oui, c'est même conseillé : la crème d'abord, l'écran en dernier le matin."
        ]
      },
      {
        "q": "Où acheter une crème anti-taches en sécurité ?",
        "a": [
          "Là où le produit a une étiquette complète et où quelqu'un peut te conseiller, comme en pharmacie."
        ]
      }
    ],
    sources: [
      {
        "label": "DermNet (Nouvelle-Zélande), « Melasma », A. Oakley, mise à jour B. J. Doolan et M. Gupta, décembre 2025.",
        "url": "https://dermnetnz.org/topics/melasma"
      },
      {
        "label": "DermNet, « Postinflammatory hyperpigmentation », V. Ngan, mise à jour A. Oakley, décembre 2015.",
        "url": "https://dermnetnz.org/topics/postinflammatory-hyperpigmentation"
      },
      {
        "label": "Organisation mondiale de la santé, « Mercury in skin lightening products », note d'information, 3 novembre 2019.",
        "url": "https://www.who.int/publications/i/item/WHO-CED-PHE-EPE-19.13"
      },
      {
        "label": "American Academy of Dermatology (AAD), « How do I know if I'm using the right sunscreen? », mise à jour le 25 avril 2024.",
        "url": "https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/choosing-right-sunscreen"
      },
      {
        "label": "AAD, « How to fade dark spots in darker skin tones », mise à jour le 10 mars 2025.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/fade-dark-spots"
      },
      {
        "label": "Davis EC, Callender VD. « Postinflammatory hyperpigmentation: a review of the epidemiology, clinical features, and treatment options in skin of color ». J Clin Aesthet Dermatol. 2010;3(7):20-31.",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2921758/"
      },
      {
        "label": "AAD, « Should I apply my skin care products in a certain order? », date de mise à jour non affichée.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-basics/care/apply-skin-care-certain-order"
      },
      {
        "label": "AAD, « Dermatologist-approved pregnancy skin care », mise à jour le 26 juin 2025.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/pregnancy-skin-care"
      }
    ],
    published: "2026-10-17",
    reviewed: { date: "2026-10-17", by: "dr-seddiki" },
  },

  /* ------------------------------------------------------------------ Relu par Dr Seddiki le 17 octobre 2026 : /taches-quand-consulter */
  {
    slug: "taches-quand-consulter",
    label: "Quand consulter un dermatologue",
    h1: "Tache brune sur le visage : quand faut-il voir un dermatologue ?",
    metaTitle: "Tache brune visage : quand consulter un dermatologue | OTAGE",
    metaDescription: "Une tache qui change, saigne ou ne ressemble pas aux autres ? Les signes qui doivent t'amener chez le dermatologue, et quoi préparer avant le rendez-vous.",
    image: image("diagnostic-taches-pigmentaires.webp", 320, 320, "Gros plan sur une peau avec des taches brunes"),
    essentials: [
      "La plupart des taches brunes du visage sont bénignes, mais seul un dermatologue peut le confirmer [1][2].",
      "Une tache qui grandit, change de forme ou de couleur, saigne ou démange doit être montrée rapidement à un dermatologue [1][3].",
      "Les peaux mates et foncées peuvent aussi avoir un cancer de la peau, avec parfois des signes différents, comme une plaie qui ne guérit pas ou une ligne sombre dans un ongle [3]."
    ],
    intro: [
      "Si une tache est nouvelle, si elle change ou si elle ne ressemble pas aux autres, prends rendez-vous chez un dermatologue [1][3]. Ce n'est pas forcément grave, mais personne ne peut le savoir sans un examen. Une tache ancienne, plate, de couleur uniforme et qui ne bouge pas est le plus souvent sans danger [2], mais un avis reste utile avant tout traitement."
    ],
    sections: [
      {
        "h2": "Quels signes doivent m'alerter sur une tache ?",
        "body": [
          "Retiens la règle ABCDE, utilisée par les dermatologues [1]. Un seul de ces signes suffit pour consulter.",
          { "figure": "abcde" },
          {
            "table": {
              "head": [
                "Lettre",
                "Ce qu'il faut regarder",
                "Signe d'alerte"
              ],
              "rows": [
                [
                  "A",
                  "La forme",
                  "Les deux moitiés de la tache ne se ressemblent pas"
                ],
                [
                  "B",
                  "Les bords",
                  "Bords irréguliers, flous ou découpés"
                ],
                [
                  "C",
                  "La couleur",
                  "Plusieurs couleurs : brun, noir, rouge, blanc ou bleu"
                ],
                [
                  "D",
                  "La taille",
                  "Plus grande qu'une gomme de crayon, mais une tache plus petite peut aussi être concernée"
                ],
                [
                  "E",
                  "L'évolution",
                  "La tache change de taille, de forme ou de couleur, ou ne ressemble pas aux autres"
                ]
              ]
            }
          },
          "D'autres signes comptent aussi [1][3] :",
          {
            "list": [
              "une tache qui saigne, démange ou fait mal ;",
              "une plaie qui ne guérit pas, ou qui guérit puis revient au même endroit ;",
              "une nouvelle tache qui apparaît et grandit."
            ]
          }
        ]
      },
      {
        "h2": "J'ai la peau mate : est-ce que je suis concernée ?",
        "body": [
          "Oui. Une peau mate ou foncée peut aussi développer un cancer de la peau [3]. Les signes peuvent être différents de ceux des peaux claires.",
          "L'Académie américaine de dermatologie demande de surveiller en particulier [3] :",
          {
            "list": [
              "une bosse ou une tache qui grandit, saigne, démange ou change ;",
              "une plaie qui ne guérit pas ;",
              "une ligne ou une bande sombre dans un ongle."
            ]
          },
          "Sur peau mate, les taches brunes « habituelles » sont fréquentes : marques d'acné, mélasma [4][5]. Elles ne sont pas dangereuses. Mais c'est justement parce qu'elles sont courantes qu'une tache différente des autres doit attirer ton attention."
        ]
      },
      {
        "h2": "Une tache solaire ou un mélasma, faut-il aussi consulter ?",
        "body": [
          "Oui, au moins une fois, pour être sûre du diagnostic. Une tache solaire peut ressembler à une lésion plus sérieuse, et le dermatologue sait faire la différence [2].",
          "Consulte aussi si :",
          {
            "list": [
              "ton mélasma est étendu, ancien, ou fonce malgré la protection solaire [6] ;",
              "tu as encore des boutons, des kystes ou des boutons douloureux : traiter l'acné évite de nouvelles marques [4][7] ;",
              "tu as des creux ou des reliefs après l'acné : ce sont des cicatrices, un soin cosmétique n'y change rien [8]."
            ]
          },
          "Tout savoir : [les taches solaires](/taches-solaires). Et aussi : [le mélasma](/melasma) et [les taches d'acné](/taches-acne)."
        ]
      },
      {
        "h2": "Comment se passe la consultation ?",
        "body": [
          "Le dermatologue regarde ta peau à l'œil nu, puis souvent avec un dermatoscope, une petite loupe éclairée [2][6]. C'est rapide et ça ne fait pas mal.",
          "S'il a un doute, il peut proposer une biopsie : il prélève un petit morceau de peau pour l'analyser [2][6]. C'est le seul moyen d'être certain.",
          "Ensuite, il te dit ce qu'est la tache et ce qu'il conseille : surveiller, traiter, ou ne rien faire."
        ]
      },
      {
        "h2": "Que préparer avant le rendez-vous ?",
        "body": [
          "Une bonne préparation aide le médecin. Voici la checklist :",
          {
            "checklist": [
              "Des photos de la tache, datées, si tu l'as vue changer.",
              "Depuis quand elle est là, et ce qui a changé.",
              "La liste de tes soins visage, avec leurs étiquettes.",
              "Tes traitements en cours, y compris la pilule [9].",
              "Si tu es enceinte ou si tu allaites : dis-le dès le début [10].",
              "Si quelqu'un dans ta famille a eu un mélasma [9] ou un cancer de la peau."
            ]
          },
          "Ne mets pas de maquillage sur la zone le jour du rendez-vous."
        ]
      },
      {
        "h2": "Puis-je traiter une tache moi-même en attendant ?",
        "body": [
          "Non. Avant de savoir ce qu'est une tache, ne la traite pas : ni crème, ni gommage, ni remède maison [2]. Un produit peut masquer un changement ou irriter la peau.",
          "En attendant le rendez-vous, protège la zone du soleil, chaque jour [11].",
          "Les traitements en cabinet (laser, lumière pulsée, peelings) doivent être faits par un dermatologue, après un diagnostic [6]."
        ]
      }
    ],
    maroc: [
      "Au Maroc, ton pharmacien est souvent le premier à voir une tache : pour une tache banale, il peut te conseiller ; pour une tache qui change, saigne ou démange, demande-lui de t'orienter vers un dermatologue."
    ],
    advice: [],
    productsTitle: "",
    productsIntro: "",
    products: [],
    routine: false,
    noSale: true,
    faq: [
      {
        "q": "Une tache qui gratte, est-ce grave ?",
        "a": [
          "Pas forcément, mais une tache qui démange, surtout si elle change aussi, doit être montrée à un dermatologue."
        ]
      },
      {
        "q": "Mon grain de beauté a toujours été là. Dois-je le surveiller ?",
        "a": [
          "Oui. Ce qui compte, c'est le changement. Un grain de beauté ancien qui change de taille, de forme ou de couleur doit être vu."
        ]
      },
      {
        "q": "Un dermatologue peut-il enlever une tache bénigne ?",
        "a": [
          "Oui, parfois, par différents traitements en cabinet. C'est à décider avec lui, après le diagnostic."
        ]
      }
    ],
    sources: [
      {
        "label": "American Academy of Dermatology (AAD), « What to look for: ABCDEs of melanoma », date de mise à jour non affichée.",
        "url": "https://www.aad.org/public/diseases/skin-cancer/abcdes-melanoma"
      },
      {
        "label": "DermNet (Nouvelle-Zélande), « Solar lentigo », A. Fitzpatrick et J. Chan, relu en novembre 2025.",
        "url": "https://dermnetnz.org/topics/solar-lentigo"
      },
      {
        "label": "AAD, « Finding skin cancer in darker skin tones », mise à jour le 3 juin 2025.",
        "url": "https://www.aad.org/public/diseases/skin-cancer/darker-skin-tones"
      },
      {
        "label": "Davis EC, Callender VD. « Postinflammatory hyperpigmentation: a review of the epidemiology, clinical features, and treatment options in skin of color ». J Clin Aesthet Dermatol. 2010;3(7):20-31.",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2921758/"
      },
      {
        "label": "AAD, « Melasma: Causes », mise à jour le 15 février 2022.",
        "url": "https://www.aad.org/public/diseases/a-z/melasma-causes"
      },
      {
        "label": "AAD, « Melasma: Diagnosis and treatment », mise à jour le 15 février 2022.",
        "url": "https://www.aad.org/public/diseases/a-z/melasma-treatment"
      },
      {
        "label": "AAD, « How to fade dark spots in darker skin tones », mise à jour le 10 mars 2025.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/fade-dark-spots"
      },
      {
        "label": "AAD, « Acne scars: Causes », mise à jour le 8 décembre 2023.",
        "url": "https://www.aad.org/public/diseases/acne/derm-treat/scars/causes"
      },
      {
        "label": "DermNet, « Melasma », A. Oakley, mise à jour B. J. Doolan et M. Gupta, décembre 2025.",
        "url": "https://dermnetnz.org/topics/melasma"
      },
      {
        "label": "AAD, « Dermatologist-approved pregnancy skin care », mise à jour le 26 juin 2025.",
        "url": "https://www.aad.org/public/everyday-care/skin-care-secrets/routine/pregnancy-skin-care"
      },
      {
        "label": "Organisation mondiale de la santé, « Ultraviolet radiation », aide-mémoire, 21 juin 2022.",
        "url": "https://www.who.int/news-room/fact-sheets/detail/ultraviolet-radiation"
      }
    ],
    published: "2026-10-17",
    reviewed: { date: "2026-10-17", by: "dr-seddiki" },
  },
];
