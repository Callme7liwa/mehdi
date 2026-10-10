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

  whatsapp: {
    /** Format wa.me : international, sans + ni espaces. */
    wa: "212688918201",
    e164: "+212688918201",
    display: "06 88 91 82 01",
  },
  instagram: { handle: "@otage.1", url: "https://www.instagram.com/otage.1/" },

  /** Application web Google Apps Script qui reçoit les commandes (Google Sheet + e-mail). */
  ordersEndpoint: "https://script.google.com/macros/s/AKfycbx3oe7dX8dQH3r7bBNo0am2F4Egk9jNVdc5h6-yvWQ-e55La6RJCxxH1vkp8KOIf_tb/exec",

  delivery: {
    country: "MA",
    free: true,
    minHours: 48,
    maxHours: 72,
    label: { fr: "48 à 72 h", ar: "من 48 إلى 72 ساعة" } as L,
  },
  payment: {
    fr: "Paiement à la livraison, en espèces",
    ar: "الدفع عند الاستلام، نقدًا",
  } as L,

  /** TODO : politique de retour (délai en jours, conditions, frais). null = non affichée, absente du JSON-LD. */
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
