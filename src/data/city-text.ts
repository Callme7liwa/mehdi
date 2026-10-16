/* Textes du champ « Ville » (la liste des villes est dans cities.ts). Fichier séparé : les formulaires côté client
   les importent sans embarquer la liste dans le JavaScript. */
import type { L } from "./site";

/** Textes du champ « Ville », les mêmes dans tous les formulaires de commande (accueil, boutique, fiches). */
export const cityText = {
  label: { fr: "Ville", ar: "المدينة" } as L,
  /** Fiches produits : les libellés du ticket tutoient (« Ton nom », « Ton téléphone »). */
  labelTicket: { fr: "Ta ville", ar: "مدينتك" } as L,
  placeholder: { fr: "Cherche ta ville", ar: "ابحثي عن مدينتك" } as L,
  other: { fr: "Autre ville ? Écris-la : on livre partout au Maroc.", ar: "مدينة أخرى؟ اكتبيها: نوصل إلى كل أنحاء المغرب." } as L,
};
