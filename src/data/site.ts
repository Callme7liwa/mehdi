/* Informations générales du site OTAGE.
   Tout ce qui est écrit ici est repris par les pages, le JSON-LD, le sitemap et llms.txt. */

export type Locale = "fr" | "ar";
/** Texte dans les deux langues. L'arabe est « À relire par un natif ». */
export type L = { fr: string; ar: string };

export const locales: Locale[] = ["fr", "ar"];

export const site = {
  /** Domaine officiel, sans / à la fin. */
  url: "https://otage.ma",
  /** Nom court de la marque (logo, textes). */
  name: "OTAGE",
  /** Nom complet, pour distinguer la marque du mot courant « otage » : titres, données structurées, pied de page.
      TODO : nom arabe à confirmer par le client et à relire par un natif. */
  brand: { fr: "OTAGE Cosmétiques", ar: "أوتاج للعناية بالبشرة" } as L,
  slogan: {
    fr: "Des soins honnêtes, fabriqués au Maroc.",
    ar: "عناية صادقة، مصنوعة في المغرب.",
  } as L,
  description: {
    fr: "Marque marocaine de cosmétique naturelle : gamme anti-taches (gel nettoyant, sérum, crème, écran solaire SPF 50) et sérum contour des yeux, fabriqués au Maroc.",
    ar: "علامة مغربية لمستحضرات التجميل الطبيعية: مجموعة العناية ضد البقع (جل منظف، سيروم، كريم، واقي شمس SPF 50) وسيروم محيط العين، مصنوعة في المغرب.",
  } as L,

  /** Le fondateur de la marque. */
  founder: {
    name: "Dr Seddiki El Mehdi",
    /** TODO : écriture arabe du nom à confirmer par le client. */
    nameAr: "الدكتور المهدي الصديقي",
    givenName: "El Mehdi",
    familyName: "Seddiki",
    jobTitle: { fr: "Pharmacien", ar: "صيدلي" } as L,
    specialty: { fr: "spécialisé en produits cosmétiques et compléments alimentaires", ar: "متخصص في مستحضرات التجميل والمكملات الغذائية" } as L,
    photo: "/images/dr-seddiki-el-mehdi.webp",
    portrait: "/images/dr-seddiki-el-mehdi-portrait.webp",
    alt: { fr: "Dr Seddiki El Mehdi, pharmacien, fondateur d'OTAGE", ar: "الدكتور المهدي الصديقي، صيدلي، مؤسس OTAGE" } as L,
    /** Son récit, à la première personne (texte fourni par le fondateur). L'arabe est « À relire par un natif ». */
    story: {
      fr: "J'ai constaté la présence de nombreux produits cosmétiques falsifiés sur le marché marocain. Face à ce constat, j'ai décidé de créer OTAGE, une marque de cosmétiques fondée sur une volonté de transparence, d'honnêteté et de confiance. Mon objectif est de proposer des produits avec une attention particulière portée à leur qualité et à la transparence des informations communiquées.",
      ar: "لاحظت وجود عدد كبير من مستحضرات التجميل المزورة في السوق المغربية. أمام هذا الواقع، قررت إنشاء OTAGE، علامة لمستحضرات التجميل قائمة على الشفافية والصدق والثقة. هدفي هو تقديم منتجات مع عناية خاصة بجودتها وبشفافية المعلومات المقدمة عنها.",
    } as L,
  },

  whatsapp: {
    /** Format wa.me : international, sans + ni espaces. */
    wa: "212688918201",
    e164: "+212688918201",
    display: "+212 6 88 91 82 01",
  },
  instagram: { handle: "@otage.1", url: "https://www.instagram.com/otage.1/" },
  email: "Dr.mouldwa@gmail.com",
  /** Satisfaction : résultat d'une enquête interne, toujours affiché avec la taille de l'échantillon. Jamais dans le JSON-LD. */
  satisfaction: { percent: 85, sample: 20 },
  /** Disponibilité du service client. */
  availability: { fr: "24 h/24", ar: "على مدار الساعة" } as L,

  /** IndexNow (Bing et moteurs associés) : la clé est aussi servie par public/<clé>.txt. Voir scripts/indexnow.mjs. */
  indexNowKey: "65dc62b65bf579e0df3674fa69bed1fc",
  /** Mesure d'audience GA4 : identifiant « G-XXXXXXX » lu dans NEXT_PUBLIC_GA_ID (variable d'environnement Vercel).
      TODO : créer la propriété GA4 et renseigner la variable. Sans identifiant, aucun script et aucune bannière. */
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",

  /** Application web Google Apps Script qui reçoit les commandes (Google Sheet + e-mail). */
  ordersEndpoint: "https://script.google.com/macros/s/AKfycbx3oe7dX8dQH3r7bBNo0am2F4Egk9jNVdc5h6-yvWQ-e55La6RJCxxH1vkp8KOIf_tb/exec",

  /** Livraison : partout au Maroc, en 24 à 72 h. Offerte pour une gamme complète ; payante pour un achat à l'unité
      (soins de la gamme achetés séparément, sérum contour des yeux). */
  delivery: {
    country: "MA",
    minHours: 24,
    maxHours: 72,
    label: { fr: "24 à 72 h", ar: "من 24 إلى 72 ساعة" } as L,
    /** Frais pour un achat à l'unité, en DH. TODO : grille des frais par ville (le client annonce « de 35 à 45 DH selon la ville »). */
    unitFee: { min: 35, max: 45 },
    feeLabel: { fr: "35 à 45 DH selon la ville", ar: "من 35 إلى 45 درهمًا حسب المدينة" } as L,
    /** La règle complète, en une phrase. */
    rule: {
      fr: "Livraison offerte pour la gamme complète ; de 35 à 45 DH selon la ville pour un achat à l'unité",
      ar: "التوصيل مجاني للمجموعة الكاملة، ومن 35 إلى 45 درهمًا حسب المدينة عند شراء منتجات منفردة",
    } as L,
  },
  payment: {
    fr: "Paiement à la livraison, en espèces",
    ar: "الدفع عند الاستلام، نقدًا",
  } as L,

  /** Réclamations (produit abîmé, erreur de commande). */
  claims: {
    fr: "Produit abîmé ou erreur dans ta commande ? Écris-nous sur WhatsApp : on échange le produit ou on te rembourse, sans frais pour toi.",
    ar: "منتج متضرر أو خطأ في طلبك؟ راسلينا عبر واتساب: نستبدل المنتج أو نرد لك المبلغ، دون أي مصاريف عليك.",
  } as L,

  /** Retours et droit de rétractation (loi 31-08 sur la protection du consommateur, article 36). */
  returns: {
    days: 7,
    /** La politique, en clair. */
    fr: "Tu peux retourner ta commande dans les 7 jours qui suivent sa réception, même si tu as simplement changé d'avis. Les produits doivent être non ouverts et non utilisés. Les frais de retour sont pris en charge par OTAGE. Au choix : remboursement ou échange.",
    ar: "يمكنك إرجاع طلبك خلال 7 أيام من استلامه، حتى لو غيّرتِ رأيك فقط. يجب أن تكون المنتجات غير مفتوحة وغير مستعملة. مصاريف الإرجاع تتحملها OTAGE. ولك الاختيار: استرجاع المبلغ أو الاستبدال.",
    /** La mention légale, en une ligne. */
    right: {
      fr: "Droit de rétractation : 7 jours à compter de la réception (article 36 de la loi 31-08 sur la protection du consommateur).",
      ar: "حق التراجع: 7 أيام من تاريخ الاستلام (المادة 36 من القانون رقم 31-08 المتعلق بحماية المستهلك).",
    } as L,
    /** Rappel court, pour la confirmation de commande. */
    short: { fr: "Droit de rétractation de 7 jours après réception (loi 31-08).", ar: "حق التراجع خلال 7 أيام من الاستلام (القانون 31-08)." } as L,
  },

  /** TODO : informations juridiques à fournir pour les mentions légales et les CGV. */
  legal: {
    raisonSociale: null as string | null, // TODO
    formeJuridique: null as string | null, // TODO
    ice: null as string | null, // TODO
    rc: null as string | null, // TODO registre du commerce
    adresse: null as string | null, // TODO
    email: null as string | null, // TODO
    directeurPublication: null as string | null, // TODO
    hebergeur: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  },

  /** Relecture des pages conseils (taches pigmentaires, cernes, taches d'acné, mélasma et grossesse) par le pharmacien.
      Tant que `validated` est false : ces 4 pages restent hors de l'index (noindex, absentes du sitemap et de llms.txt)
      et n'affichent aucune mention de relecture.
      Quand la relecture est confirmée : mettre `validated: true` et la date (AAAA-MM-JJ). Les pages affichent alors
      « Relu par Dr Seddiki El Mehdi, pharmacien, le … » et le JSON-LD porte reviewedBy + lastReviewed. */
  medicalReview: { validated: false as boolean, date: null as string | null },

  /** Date de dernière mise à jour du contenu (affichée et envoyée aux moteurs). */
  updated: "2026-10-11",

  /** Les pages en arabe restent hors de l'index Google (noindex, absentes du sitemap et des hreflang)
      tant que la traduction n'a pas été relue par un natif. Après relecture : remplacer la ligne par
      `arIndexable: true,`. (AR_INDEXABLE=1 au build permet de tester sans modifier ce fichier.) */
  arIndexable: process.env.AR_INDEXABLE === "1",
} as const;

/** Adresse absolue d'un chemin du site. */
export const abs = (path = "/") => `${site.url}${path === "/" ? "/" : path}`;

/** Lien WhatsApp avec un message pré-rempli. */
export const waLink = (message?: string) =>
  `https://wa.me/${site.whatsapp.wa}${message ? `?text=${encodeURIComponent(message.replace(/[\u2066\u2069]/g, ""))}` : ""}`;

export const formatDate = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(locale === "ar" ? "ar-MA" : "fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso + "T00:00:00Z"));
