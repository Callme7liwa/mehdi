/* Liste des pages du site, pour les menus, le pied de page, le sitemap et llms.txt. */
export const problemPages = [
  { slug: "taches-pigmentaires", label: "Taches pigmentaires" },
  { slug: "cernes", label: "Cernes" },
  { slug: "taches-acne", label: "Taches d'acné" },
  { slug: "melasma-grossesse", label: "Mélasma et grossesse" },
] as const;

export const trustPages = [
  { path: "/a-propos", label: "À propos" },
  { path: "/livraison-paiement", label: "Livraison et paiement" },
  { path: "/contact", label: "Contact" },
  { path: "/mentions-legales", label: "Mentions légales" },
  { path: "/cgv", label: "Conditions générales de vente" },
] as const;
