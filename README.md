# OTAGE : site Next.js

Site de la marque OTAGE (soins anti-taches fabriqués au Maroc). Next.js 16, App Router, TypeScript, pages 100 % statiques.

## Commandes

```bash
npm install        # une seule fois
npm run dev        # site en local sur http://localhost:3000
npm run build      # construit le site (toutes les pages en statique)
npm run start      # sert le site construit
npm run lint       # vérifie le code
```

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| le domaine, le WhatsApp, les délais de livraison, la politique de retour, les infos juridiques | `src/data/site.ts` |
| un prix, une contenance, un ingrédient, un texte produit (français ou arabe) | `src/data/products.ts` |
| une question de la FAQ | `src/data/faq.ts` |
| un avis client | `src/data/reviews.ts` |
| un texte des pages « conseils peau » | `src/data/problems.ts` |
| les textes d'interface (boutons, formulaire) | `src/data/ui.ts` |

Les pages, le JSON-LD, le sitemap et `llms.txt` lisent tous ces fichiers : une modification se répercute partout au prochain build.

## Structure

- `src/app/(home)/` : la page d'accueil animée (composants dans `src/home/`).
- `src/app/(fr)/` : pages produits (`/soins/...`), conseils peau, pages de confiance.
- `src/app/(ar)/ar/` : pages en arabe, de droite à gauche.
- `src/templates/` : gabarits de pages. `src/components/` : éléments communs.
- `public/images/`, `public/videos/` : médias.
- `apps-script/` : le script Google qui reçoit les commandes (Google Sheet + e-mail).
- `legacy/` : l'ancien site statique, gardé pour référence.

## Pages arabes

Elles restent hors de l'index Google tant que la traduction n'est pas relue par un natif. Après relecture, passer `arIndexable` à `true` dans `src/data/site.ts` : elles entrent dans le sitemap et les balises hreflang.
