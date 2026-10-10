/* Informations générales du site OTAGE.
   Tout ce qui est écrit ici est repris par les pages, le JSON-LD, le sitemap et llms.txt. */

export type Locale = "fr" | "ar";
/** Texte dans les deux langues. L'arabe est « À relire par un natif ». */
export type L = { fr: string; ar: string };

export const locales: Locale[] = ["fr", "ar"];

export const site = {
  /** Domaine officiel, sans / à la fin. */
  url: "https://otage.ma",
  name: "OTAGE",
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

  /** Application web Google Apps Script qui reçoit les commandes (Google Sheet + e-mail). */
  ordersEndpoint: "https://script.google.com/macros/s/AKfycbx3oe7dX8dQH3r7bBNo0am2F4Egk9jNVdc5h6-yvWQ-e55La6RJCxxH1vkp8KOIf_tb/exec",

  delivery: {
    country: "MA",
    free: true,
    minHours: 24,
    maxHours: 72,
    label: { fr: "24 à 72 h", ar: "من 24 إلى 72 ساعة" } as L,
  },
  payment: {
    fr: "Paiement à la livraison, en espèces",
    ar: "الدفع عند الاستلام، نقدًا",
  } as L,

  /** Réclamations : ce qu'OTAGE accepte aujourd'hui. Les modalités de retour ou d'échange se donnent sur WhatsApp. */
  claims: {
    fr: "Nous acceptons les réclamations pour un produit abîmé, une erreur de commande ou si tu n'es pas satisfaite. Les modalités de retour ou d'échange te sont précisées sur demande, sur WhatsApp.",
    ar: "نقبل الشكايات في حال منتج متضرر، خطأ في الطلب أو إذا لم تكوني راضية. طريقة الإرجاع أو الاستبدال نوضحها لك عند الطلب، عبر واتساب.",
  } as L,

  /** TODO : délai de retour (en jours) et frais. null = pas de hasMerchantReturnPolicy dans le JSON-LD. */
  returns: null as null | { days: number; fr: string; ar: string },

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

  /** Date de dernière mise à jour du contenu (affichée et envoyée aux moteurs). */
  updated: "2026-10-10",

  /** Les pages en arabe restent hors de l'index Google (noindex, absentes du sitemap et des hreflang)
      tant que la traduction n'a pas été relue par un natif. Après relecture : remplacer la ligne par
      `arIndexable: true,`. (AR_INDEXABLE=1 au build permet de tester sans modifier ce fichier.) */
  arIndexable: process.env.AR_INDEXABLE === "1",
} as const;

/** Adresse absolue d'un chemin du site. */
export const abs = (path = "/") => `${site.url}${path === "/" ? "/" : path}`;

/** Lien WhatsApp avec un message pré-rempli. */
export const waLink = (message?: string) =>
  `https://wa.me/${site.whatsapp.wa}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const formatDate = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(locale === "ar" ? "ar-MA" : "fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso + "T00:00:00Z"));
