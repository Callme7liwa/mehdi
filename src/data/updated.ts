/* Date de la dernière modification du CONTENU de chaque page : la SEULE source des dates du site.
   Elle sert pour la balise <lastmod> du sitemap, la mention « Mis à jour le » (page et pied de page), dateModified
   du JSON-LD et site.updated (la plus récente de toutes, pour llms.txt).
   À mettre à jour à la main quand le texte, les prix, la FAQ ou les avis d'une page changent ;
   pas pour un changement technique (CSS, mise en page, refactor, budget de performance).
   Pourquoi pas git au moment du build : Vercel clone le dépôt de façon superficielle (historique incomplet),
   et un fichier comme product-pages.ts contient les 6 fiches à la fois.
   `npm run check:dates` liste les commits plus récents qui touchent le contenu d'une page, pour décider s'il faut changer sa date.
   Valeurs initiales : date du dernier commit de contenu de chaque page (relevée dans l'historique git). */
export const contentUpdated: Record<string, string> = {
  "/": "2026-10-17T13:45:00+02:00", // lot 2 : cartes « Mélasma » et « Grossesse » vers /melasma
  "/soins": "2026-10-16T09:30:06+02:00", // 9f16fc6 : « paiement à la livraison » (meta, chapeau)
  "/soins/gel-nettoyant": "2026-10-17T12:35:47+02:00", // bf2b020 : lien vers le guide « Taches brunes du visage » (au lieu de « Taches pigmentaires »)
  "/soins/serum-anti-taches": "2026-10-17T13:45:00+02:00", // lot 2 : lien vers le guide /melasma
  "/soins/creme-anti-taches": "2026-10-17T13:45:00+02:00", // lot 2 : lien vers le guide /melasma
  "/soins/ecran-solaire-spf50": "2026-10-17T13:45:00+02:00", // lot 2 : liens vers /appliquer-ecran-solaire et /melasma
  "/soins/contour-des-yeux": "2026-10-16T10:05:26+02:00", // e70bbf6
  "/soins/deodorant-creme": "2026-10-16T10:05:26+02:00", // e70bbf6 : « crème » au lieu de « baume », transpiration dans « Pour qui »
  "/avis": "2026-10-16T02:47:39+02:00", // 535ee9e : H1, intro
  "/a-propos": "2026-10-16T02:47:39+02:00", // 471dd5e : sans « cosmétique naturelle »
  "/livraison-paiement": "2026-10-16T09:30:06+02:00", // 9f16fc6 : « Paiement à la livraison »
  "/taches-brunes-visage": "2026-10-17T13:45:00+02:00", // lot 2 : liens vers les guides publiés (pilier-ajouts.md, approuvé)
  // guides « taches brunes », approuvés par Dr Seddiki le 17 octobre 2026 (src/data/guides.ts) ; 15 h 20 : corrections avant mise en ligne
  "/melasma": "2026-10-17T15:20:00+02:00",
  "/taches-acne": "2026-10-17T15:20:00+02:00",
  "/taches-solaires": "2026-10-17T15:20:00+02:00",
  "/taches-peau-mate": "2026-10-17T15:20:00+02:00",
  "/soleil-maroc-taches": "2026-10-17T15:20:00+02:00",
  "/appliquer-ecran-solaire": "2026-10-17T15:20:00+02:00",
  "/routine-taches-matin-soir": "2026-10-17T15:20:00+02:00",
  "/erreurs-taches-visage": "2026-10-17T15:20:00+02:00",
  "/choisir-creme-anti-taches": "2026-10-17T15:20:00+02:00",
  "/taches-quand-consulter": "2026-10-17T15:20:00+02:00",
  "/contact": "2026-10-16T12:52:38+02:00", // 26414c8 : section « Google Maps »
  // pages hors index (noindex) : leur date sert à l'affichage et au JSON-LD
  "/cernes": "2026-10-16T02:24:19+02:00", // e263dff : contenu v3
  "/mentions-legales": "2026-10-16T16:51:35+02:00", // 33c1ebc : cookies et mesure d'audience
  "/cgv": "2026-10-15T21:14:56+02:00", // 15082f3 : article 3 « Prix », déodorant
};

/** Date (AAAA-MM-JJ) de la dernière modification de contenu de tout le site : la plus récente de la liste. */
export const lastContentUpdate = Object.values(contentUpdated).sort().at(-1)!.slice(0, 10);

/** Date (AAAA-MM-JJ) de la dernière modification de contenu d'une page (chemin français, sans /ar) ;
    pour une page absente de la liste, celle du site. */
export const pageUpdated = (path: string) => (contentUpdated[path] ?? lastContentUpdate).slice(0, 10);
