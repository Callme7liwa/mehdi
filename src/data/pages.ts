/* Liste des pages du site, pour les menus, le pied de page, le sitemap et llms.txt.
   Libellés arabes : « À relire par un natif ». */
import { isolateAr } from "../lib/bidi";
import type { L } from "./site";

export const problemPages: { slug: string; label: L }[] = [
  { slug: "taches-pigmentaires", label: { fr: "Taches pigmentaires", ar: "البقع الصبغية" } },
  { slug: "cernes", label: { fr: "Cernes", ar: "الهالات السوداء" } },
  { slug: "taches-acne", label: { fr: "Taches d'acné", ar: "بقع حب الشباب" } },
  { slug: "melasma-grossesse", label: { fr: "Mélasma et grossesse", ar: "الكلف والحمل" } },
];

export const trustPages: { path: string; label: L }[] = isolateAr([
  { path: "/avis", label: { fr: "Avis de clientes", ar: "آراء الزبونات" } },
  { path: "/a-propos", label: { fr: "À propos", ar: "من نحن" } },
  { path: "/livraison-paiement", label: { fr: "Livraison et paiement", ar: "التوصيل والدفع" } },
  { path: "/contact", label: { fr: "Contact", ar: "اتصلي بنا" } },
  { path: "/mentions-legales", label: { fr: "Mentions légales", ar: "إشعار قانوني" } },
  { path: "/cgv", label: { fr: "Conditions générales de vente", ar: "الشروط العامة للبيع" } },
]);
