/* Identifiants Google utilisés seulement côté serveur (métadonnées, JSON-LD, pages statiques).
   À part de site.ts, qui est aussi embarqué dans le JavaScript du navigateur : ces chaînes n'alourdissent pas les pages. */

/** Fiche d'établissement Google (Google Maps) : lien stable par identifiant (cid), relié au site par le JSON-LD (sameAs). */
export const googleMaps = "https://maps.google.com/?cid=6247617281648532441";

/** Google Search Console : jeton de la balise <meta name="google-site-verification"> (propriété otage.ma). */
export const googleVerification = "BjBEMRIG80-T25QYFrUikbX9QefJWi7o4_jDHpaB7LY";
