/* Ancien domaine frezabio.com → otage.ma. PRÉPARÉ, PAS ACTIVÉ.

   Pour l'activer, le jour où l'accès au domaine est récupéré :
   1. ajouter frezabio.com et www.frezabio.com au projet Vercel (Settings → Domains) et faire pointer leur DNS vers Vercel ;
   2. compléter OLD_URLS ci-dessous avec les anciennes adresses qui ont encore des visites ou des liens
      (Search Console de frezabio.com → Pages, ou archive.org) ;
   3. définir la variable d'environnement FREZABIO_REDIRECT=1 dans Vercel, puis redéployer ;
   4. dans la Search Console de frezabio.com : Paramètres → Changement d'adresse → otage.ma.

   TODO : les anciennes adresses ne sont pas connues. Aucune n'est inventée ici : tant que la liste est vide,
   toutes les pages de frezabio.com renvoient vers l'accueil d'otage.ma. */

/** Ancienne adresse (chemin sur frezabio.com) → nouvelle adresse (chemin sur otage.ma). */
export const OLD_URLS: Record<string, string> = {
  // exemple de forme attendue, à remplacer par les vraies adresses :
  // "/produit/serum-anti-taches": "/soins/serum-anti-taches",
};

const hosts = [{ type: "host" as const, value: "(www\\.)?frezabio\\.com" }];

export const frezabioRedirects = (domain: string) => [
  ...Object.entries(OLD_URLS).map(([from, to]) => ({ source: from, has: hosts, destination: `https://${domain}${to}`, statusCode: 301 as const })),
  // tout le reste : l'accueil
  { source: "/:path*", has: hosts, destination: `https://${domain}/`, statusCode: 301 as const },
];
