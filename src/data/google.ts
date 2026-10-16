/* Identifiants Google utilisés seulement côté serveur (métadonnées, JSON-LD, pages statiques).
   À part de site.ts, qui est aussi embarqué dans le JavaScript du navigateur : ces chaînes n'alourdissent pas les pages. */

/** Fiche d'établissement Google (Google Maps) : lien stable par identifiant (cid), relié au site par le JSON-LD (sameAs). */
export const googleMaps = "https://maps.google.com/?cid=6247617281648532441";

/** Google Search Console : jeton de la balise <meta name="google-site-verification"> (propriété otage.ma). */
export const googleVerification = "BjBEMRIG80-T25QYFrUikbX9QefJWi7o4_jDHpaB7LY";

/** Google Tag Manager (conteneur otage.ma). Écrit en dur : ce n'est pas un secret, et le site ne dépend plus d'une
    variable d'environnement Vercel. Chargé seulement après l'accord de la visiteuse (components/Analytics.tsx). */
export const gtmId = "GTM-K84L87K3";
