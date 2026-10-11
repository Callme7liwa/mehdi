# Mise en ligne d'otage.ma : ce qu'il faut faire le jour J

Tout ce qui suit se fait à la main, dans l'ordre. Rien n'est en ligne tant que ces étapes ne sont pas faites.

## Avant le jour J (à fournir par le client)

- [ ] Mentions légales et CGV : raison sociale, forme juridique, ICE, RC, adresse, e-mail, directeur de la publication, numéro CNDP, tribunal compétent (`src/data/site.ts`, bloc `legal`). Tant qu'il en manque, ces deux pages affichent « À compléter » et restent en noindex.
- [ ] CGV : faire valider par un juriste l'exception des produits cosmétiques ouverts et le délai de remboursement (commentaires dans `src/app/(fr)/cgv/page.tsx`), et préciser si les prix sont TTC.
- [ ] Relecture du pharmacien : `docs/relecture-pharmacien.docx`. Une fois validée, mettre `medicalReview: { validated: true, date: "AAAA-MM-JJ" }` dans `src/data/site.ts` : les 4 pages conseils sortent du noindex et affichent « Relu par Dr Seddiki El Mehdi, pharmacien ».
- [ ] Relecture de l'arabe par un natif (`src/data/ar-relecture.md`), puis `arIndexable: true` dans `src/data/site.ts`. Nom arabe de la marque (« أوتاج للعناية بالبشرة ») et du fondateur à confirmer.
- [ ] Numéro d'enregistrement DMP de chaque produit (`dmp` dans `src/data/products.ts`) : il s'affiche sur la fiche dès qu'il est renseigné.
- [ ] Confirmer que le sérum contour des yeux suit bien la règle « achat à l'unité » (livraison de 35 à 45 DH).

## 0. Commandes et e-mails (avant de fusionner)

Les commandes passent maintenant par le serveur du site. **Sans la variable `ORDERS_ENDPOINT` sur Vercel, aucune commande n'est enregistrée.** Suivre `docs/emails.md` : variables d'environnement, mise à jour du script Google, domaine Resend et enregistrements DNS.

## 1. Fusion et déploiement

1. Fusionner `nextjs-migration` dans `main` et pousser : Vercel déploie en production.
2. Vérifier la page d'accueil, une fiche, le formulaire (sans valider) et `/ar`.

## 2. Domaine (Vercel → Settings → Domains)

1. Ajouter `otage.ma` (domaine principal) et `www.otage.ma`.
2. Chez le registrar du domaine : enregistrement A de `otage.ma` et CNAME de `www` vers les valeurs indiquées par Vercel.
3. Le site redirige déjà en 301 `www.otage.ma` et toutes les adresses `*.vercel.app` (dont `otage-maroc.vercel.app`) vers `https://otage.ma`. Vérifier :
   `curl -I https://www.otage.ma/soins` et `curl -I https://otage-maroc.vercel.app/` → `301` vers `https://otage.ma/…`.
4. Les déploiements d'aperçu (branches) restent consultables, avec `X-Robots-Tag: noindex` et sans sitemap.

## 3. Google Search Console

1. Ajouter la propriété « Domaine » `otage.ma` (validation par enregistrement DNS TXT).
2. Sitemaps → envoyer `https://otage.ma/sitemap.xml`.
3. Inspection de l'URL → demander l'indexation de `/`, `/soins` et des 5 fiches.
4. Tester une fiche dans le test des résultats enrichis : https://search.google.com/test/rich-results

OTAGE vend seulement en ligne : pas de fiche Google Business Profile (la marque n'y est pas éligible), et pas de pages par ville.

## 4. Bing et IndexNow

1. Bing Webmaster Tools : ajouter `otage.ma` (import possible depuis la Search Console) et envoyer le sitemap.
2. Depuis le dépôt, après le déploiement :
   `npm run indexnow` (montre la liste) puis `npm run indexnow -- --send --all` (première fois).
   Ensuite, après chaque mise à jour de contenu : `npm run indexnow -- --send`.

## 5. Mesure d'audience (GA4)

1. Créer une propriété GA4, flux Web `https://otage.ma`, et copier l'identifiant `G-XXXXXXX`.
2. Vercel → Settings → Environment Variables : `NEXT_PUBLIC_GA_ID` = cet identifiant (Production), puis redéployer.
   La bannière de consentement (FR/AR) apparaît ; rien n'est mesuré sans accord.
3. GA4 → Administration → Événements : marquer `commande_envoyee` comme événement clé. Les autres événements : `clic_whatsapp`, `choix_offre`, `visite_ia`.
4. GA4 → Administration → Affichage des données → Groupes de canaux → créer un groupe, ajouter le canal **Trafic IA** au-dessus de « Referral » :
   Source correspond à l'expression régulière `chatgpt\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai`.

## 6. Instagram

- Bio de @otage.1 : remplacer le lien par `https://otage.ma`, et écrire le nom « OTAGE Cosmétiques ».
- Même nom, même numéro WhatsApp (+212 6 88 91 82 01) et même description que sur le site.

## 7. Plus tard : frezabio.com

Si l'accès au domaine est récupéré : suivre les étapes écrites en tête de `src/data/redirects-frezabio.ts` (ajout du domaine à Vercel, liste des anciennes adresses, variable `FREZABIO_REDIRECT=1`, changement d'adresse dans la Search Console).

## Commandes de contrôle

```bash
npm run build && npm run start
npm run check:ar        # aucun texte français sur les pages arabes
npm run check:bidi      # ordre de lecture des nombres et des mots latins en arabe
npm run check:budget    # poids des pages
npm run relecture:pharmacien   # régénère docs/relecture-pharmacien.docx
```
