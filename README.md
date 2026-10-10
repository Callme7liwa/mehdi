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

## Version arabe (/ar)

Chaque page française a son équivalent sous `/ar`, de droite à gauche : accueil animé, soins, conseils peau, pages de confiance, page 404.

| Je veux… | Où |
|---|---|
| relire tout l'arabe au même endroit | `src/data/ar-relecture.md` (français et arabe côte à côte, avec le fichier source à corriger) |
| corriger un texte de l'accueil | `src/home/text.ts` (sections) et `src/home/text-js.ts` (ticket, fenêtres), `src/home/chat/chat-text.ts` (chat des questions) |
| corriger un produit, la FAQ, un bouton | `src/data/products.ts`, `src/data/faq.ts`, `src/data/ui.ts` |
| corriger une page conseil | `src/data/problems.ar.ts` |
| corriger une page de confiance | `src/app/(ar)/ar/<page>/page.tsx` |

```bash
npm run build && npm run start   # dans un terminal
npm run check:ar                 # vérifie qu'aucun texte français ne reste sur les pages arabes
npm run check:bidi               # vérifie que « 2 + 1 », prix, numéros… s'affichent dans le bon ordre en arabe
npm run relecture                # régénère src/data/ar-relecture.md
```

Le même CSS sert dans les deux sens : `home.css` et `site.css` utilisent des propriétés logiques (`inline-start`/`end`) et la variable `--dir`. `src/app/rtl.css` ne contient que la typographie arabe et les icônes directionnelles.

Les pages arabes restent hors de l'index Google tant que la traduction n'est pas relue par un natif. Après relecture, mettre `arIndexable: true` dans `src/data/site.ts` : elles entrent dans le sitemap et les balises hreflang (fr-MA / ar-MA / x-default).

## Performance

```bash
npm run build && npm run start   # dans un terminal
npm run check:budget             # échoue si une page dépasse son poids autorisé (JS, CSS, HTML, polices préchargées)
npm run analyze                  # carte interactive de ce que contient chaque fichier JavaScript (Turbopack)
npm run blur                     # régénère les aperçus flous après l'ajout ou le remplacement d'une photo
```

- Polices : hébergées dans `public/fonts/`, déclarées dans `src/app/fonts.css`. Chaque layout ne précharge que la police de son texte principal (`src/components/FontPreload.tsx`) ; les autres sont téléchargées quand la page en a besoin. Si un fichier change, changer son suffixe `-v1` (cache d'un an).
- Images : servies en AVIF ou WebP par `next/image`. Une image optimisée est gardée un an en cache : pour remplacer une photo, lui donner un nouveau nom de fichier.
- Les budgets sont dans `scripts/check-budget.mjs`. Le socle de Next.js et React pèse à lui seul environ 130 Ko de JavaScript compressé.
