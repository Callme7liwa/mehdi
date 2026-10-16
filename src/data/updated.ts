/* Date de la dernière modification du CONTENU de chaque page indexée : la balise <lastmod> du sitemap.
   À mettre à jour à la main quand le texte, les prix, la FAQ ou les avis d'une page changent ;
   pas pour un changement technique (CSS, mise en page, refactor, budget de performance).
   Pourquoi pas git au moment du build : Vercel clone le dépôt de façon superficielle (historique incomplet),
   et un fichier comme product-pages.ts contient les 6 fiches à la fois.
   `npm run check:dates` liste les commits plus récents qui touchent le contenu d'une page, pour décider s'il faut changer sa date.
   Valeurs initiales : date du dernier commit de contenu de chaque page (relevée dans l'historique git). */
export const contentUpdated: Record<string, string> = {
  "/": "2026-10-16T10:28:52+02:00", // 435c65e : carte déodorant de l'accueil (« 5 ingrédients. »)
  "/soins": "2026-10-16T09:30:06+02:00", // 9f16fc6 : « paiement à la livraison » (meta, chapeau)
  "/soins/gel-nettoyant": "2026-10-16T10:05:26+02:00", // e70bbf6 : mode d'emploi, frise « résultats »
  "/soins/serum-anti-taches": "2026-10-16T10:05:26+02:00", // e70bbf6
  "/soins/creme-anti-taches": "2026-10-16T10:05:26+02:00", // e70bbf6
  "/soins/ecran-solaire-spf50": "2026-10-16T10:05:26+02:00", // e70bbf6
  "/soins/contour-des-yeux": "2026-10-16T10:05:26+02:00", // e70bbf6
  "/soins/deodorant-creme": "2026-10-16T10:05:26+02:00", // e70bbf6 : « crème » au lieu de « baume », transpiration dans « Pour qui »
  "/avis": "2026-10-16T02:47:39+02:00", // 535ee9e : H1, intro
  "/a-propos": "2026-10-16T02:47:39+02:00", // 471dd5e : sans « cosmétique naturelle »
  "/livraison-paiement": "2026-10-16T09:30:06+02:00", // 9f16fc6 : « Paiement à la livraison »
  "/contact": "2026-10-16T02:47:39+02:00", // a33ef07 : H1 « Contacter OTAGE »
};
