/* Liste des pages du site, pour les menus, le pied de page, le sitemap et llms.txt.
   Libellés arabes : « À relire par un natif ». */
import { isolateAr } from "../lib/bidi";
import { problems } from "./problems";
import { hasArProblem, problemsAr } from "./problems.ar";
import type { L, Locale } from "./site";

/** Les pages conseils, dans l'ordre de problems.ts ; libellé arabe : celui de la page arabe quand elle existe. */
export const problemPages: { slug: string; label: L }[] = problems.map((p) => ({
  slug: p.slug,
  label: { fr: p.label, ar: problemsAr.find((x) => x.slug === p.slug)?.label ?? p.label },
}));

/** Les pages conseils d'une langue : en arabe, seulement celles qui ont une version arabe. */
export const problemPagesFor = (locale: Locale) => problemPages.filter((p) => locale === "fr" || hasArProblem(p.slug));

export const trustPages: { path: string; label: L }[] = isolateAr([
  { path: "/avis", label: { fr: "Avis de clientes", ar: "آراء الزبونات" } },
  { path: "/a-propos", label: { fr: "À propos", ar: "من نحن" } },
  { path: "/livraison-paiement", label: { fr: "Livraison et paiement", ar: "التوصيل والدفع" } },
  { path: "/contact", label: { fr: "Contact", ar: "اتصلي بنا" } },
  { path: "/mentions-legales", label: { fr: "Mentions légales", ar: "إشعار قانوني" } },
  { path: "/cgv", label: { fr: "Conditions générales de vente", ar: "الشروط العامة للبيع" } },
]);
