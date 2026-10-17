> **Fichier généré par `npm run validation` : le copier avant de le remplir.** Le relancer écrase ce fichier, cases cochées comprises.

# Validation client : le site otage.ma

Document à faire remplir par le client (et par le pharmacien pour les parties indiquées).
Pour chaque ligne : cocher **Validé**, ou **À modifier** en écrivant la bonne valeur. Toute correction sera reportée sur le site.

Généré le 17 octobre 2026, à partir du code : les valeurs sont celles que le site affiche aujourd'hui.

Les traductions arabes ne sont pas reprises ici : elles sont toutes dans `src/data/ar-relecture.md`, à faire relire par un natif.

## Ce qu'on attend de toi

Ce document reprend ce que le site otage.ma affiche aujourd'hui. Pour chaque ligne, coche **Validé**, ou **À modifier** en écrivant la correction. Merci de nous le rendre complet : tant qu'une ligne n'est pas validée, elle peut être fausse sur le site.

1. **Valider les prix** (partie 1) : gamme, soins à l'unité, offres 2 + 1, livraison.
2. **Valider les allégations** (partie 2) : ce que l'on dit des soins (« sans sulfate », « ne bloque pas la transpiration », etc.). Si une allégation n'est pas prouvée, elle doit être retirée.
3. **Faire relire par le pharmacien** les rôles des ingrédients (partie 4), le mode d'emploi et les résultats de chaque fiche (partie 6) et les **4 pages conseils** (partie 6). Ces pages restent invisibles sur Google tant qu'il ne les a pas validées.
4. **Donner le parcours du pharmacien** (tableau ci-dessous), pour la page « À propos » et la mention « Relu par notre pharmacien ».

### Le parcours du pharmacien (page « À propos »)

| Information | À compléter | Validé | À modifier (préciser) |
|---|---|---|---|
| Nom tel qu'il doit apparaître | Dr Seddiki El Mehdi | ☐ Validé | ☐ À modifier : |
| Faculté de pharmacie (ville, pays) | … | ☐ Validé | ☐ À modifier : |
| Année du diplôme | … | ☐ Validé | ☐ À modifier : |
| Officine (nom, ville) et années d'exercice | … | ☐ Validé | ☐ À modifier : |
| Autres formations ou spécialités (dermocosmétique, etc.) | … | ☐ Validé | ☐ À modifier : |
| Phrase de présentation souhaitée (facultatif) | … | ☐ Validé | ☐ À modifier : |

## 1. Prix et offres (client)

### La gamme anti-taches (4 soins)

| Donnée | Valeur affichée sur le site | Source dans le code | Validé | À modifier (préciser) |
|---|---|---|---|---|
| Gamme Petit format | 299 DH (au lieu de 496 DH, le prix des 4 soins à l'unité) ; offre 2 + 1 : 3 gammes pour 598 DH (≈ 199 DH la gamme) | src/data/products.ts, gamme | ☐ Validé | ☐ À modifier : |
| Gamme Grand format | 599 DH (au lieu de 800 DH, le prix des 4 soins à l'unité) ; offre 2 + 1 : 3 gammes pour 1198 DH (≈ 399 DH la gamme) | src/data/products.ts, gamme | ☐ Validé | ☐ À modifier : |
| Livraison de la gamme | Offerte | src/data/site.ts, delivery | ☐ Validé | ☐ À modifier : |

### Les soins à l'unité

| Soin | Prix affiché | Source dans le code | Validé | À modifier (préciser) |
|---|---|---|---|---|
| Gel nettoyant anti-taches (N° 01) | Petit 125 ml : 91 DH ; Grand 200 ml : 140 DH | src/data/products.ts, produit « gel », unitPrice | ☐ Validé | ☐ À modifier : |
| Sérum anti-taches (N° 02) | Petit 15 ml : 163 DH ; Grand 30 ml : 265 DH | src/data/products.ts, produit « serum », unitPrice | ☐ Validé | ☐ À modifier : |
| Crème anti-taches (N° 03) | Petit 30 ml : 130 DH ; Grand 50 ml : 205 DH | src/data/products.ts, produit « creme », unitPrice | ☐ Validé | ☐ À modifier : |
| Écran solaire SPF 50 (N° 04) | Petit 30 ml : 112 DH ; Grand 50 ml : 190 DH | src/data/products.ts, produit « ecran », unitPrice | ☐ Validé | ☐ À modifier : |
| Sérum contour des yeux N° 05 | 185 DH (ancien prix : 130 DH), 15 ml | src/data/products.ts, produit « yeux », unitPrice | ☐ Validé | ☐ À modifier : |
| Sérum contour des yeux : offre 2 + 1 | 3 sérums pour 370 DH au lieu de 555 DH (≈ 123 DH le sérum) | src/data/products.ts, bundleKeys | ☐ Validé | ☐ À modifier : |
| Déodorant crème N° 06 | 85 DH, format unique de 50 ml | src/data/products.ts, produit « deo », unitPrice et ml | ☐ Validé | ☐ À modifier : |
| Déodorant crème : offre 2 + 1 | 3 pots pour 170 DH au lieu de 255 DH (≈ 57 DH le pot) | src/data/products.ts, bundleKeys | ☐ Validé | ☐ À modifier : |
| Règle de l'offre 2 + 1 à l'unité | Pour le sérum contour des yeux et le déodorant crème : 1 article offert pour 3 identiques dans la même commande, cumulable (6 = 2 offerts). Calculé par le serveur. | src/data/products.ts (freeCount) | ☐ Validé | ☐ À modifier : |
| Livraison d'un achat à l'unité | De 35 à 45 DH selon la ville | src/data/site.ts, delivery.unitFee | ☐ Validé | ☐ À modifier : |

## 2. Déodorant crème N° 06 (client, pharmacien pour les allégations)

### Fiche

| Donnée | Valeur affichée | Source | Validé | À modifier (préciser) |
|---|---|---|---|---|
| Nom et numéro | Déodorant crème, N° 06 | src/data/products.ts | ☐ Validé | ☐ À modifier : |
| Contenance | 50 ml, un seul format | src/data/products.ts | ☐ Validé | ☐ À modifier : |
| Ingrédients (liste complète affichée) | Oxyde de zinc, Huile de coco, Huile de jojoba, Cire d'abeille, Vitamine E | src/data/products.ts, ingredients | ☐ Validé | ☐ À modifier : |
| Moment d'utilisation | Le matin | src/data/products.ts, when (texte écrit par nous, pas dans la maquette) | ☐ Validé | ☐ À modifier : |
| Mode d'emploi | Prends un peu de crème du bout du doigt, laisse-la fondre puis applique-la sur l'aisselle propre et sèche. | src/data/products.ts, how (texte écrit par nous, pas dans la maquette) | ☐ Validé | ☐ À modifier : |
| Photos (le texte de l'étiquette doit correspondre au produit vendu) | deodorant-creme-n06-pot.webp ; deodorant-creme-n06-mains.webp ; deodorant-creme-n06-etiquette.webp | public/images/ | ☐ Validé | ☐ À modifier : |

### Allégations : à valider

Une allégation non prouvée doit être retirée du site. État au 17 octobre 2026, relevé sur les pages en ligne :

| Allégation | Soin | Où elle apparaît aujourd'hui | Validé | À modifier (préciser) |
|---|---|---|---|---|
| Sans sulfate | Gel nettoyant | fiche du gel, accueil, /soins, llms.txt (aussi écrit sur l'étiquette) | ☐ Validé | ☐ À modifier : |
| Ne bloque pas la transpiration (agit sur les odeurs) | Déodorant | fiche du déodorant (« Pour qui ? », description Google), llms.txt | ☐ Validé | ☐ À modifier : |
| 5 ingrédients | Déodorant | carte et fiche du déodorant, accueil, titre Google | ☐ Validé | ☐ À modifier : |
| Sans sels d'aluminium | Déodorant | nulle part : retiré du site en attendant votre validation | ☐ Validé | ☐ À modifier : |
| Sans parabène | Déodorant | nulle part : retiré du site en attendant votre validation | ☐ Validé | ☐ À modifier : |
| « 100 % naturel » | Tous | nulle part : retiré du site ; à rétablir seulement si validé | ☐ Validé | ☐ À modifier : |

## 3. Textes que nous avons écrits (absents des maquettes) — client

| Texte | Contenu affiché | Source | Validé | À modifier (préciser) |
|---|---|---|---|---|
| Déodorant : titre de la page (H1), neutre | Déodorant crème OTAGE. | src/data/product-pages.ts, deo.title | ☐ Validé | ☐ À modifier : |
| Déodorant : variante du H1, activée seulement après validation de « sans aluminium » | Déodorant crème sans aluminium. | src/data/product-pages.ts (commentaire au-dessus de deo.title) | ☐ Validé | ☐ À modifier : |
| Déodorant : titre dans Google | Déodorant crème OTAGE, 5 ingrédients \| OTAGE | src/data/products.ts, metaTitle | ☐ Validé | ☐ À modifier : |
| Déodorant : description dans Google (et JSON-LD) | Déodorant crème OTAGE fabriqué au Maroc, 5 ingrédients, pot de 50 ml. Agit sur les odeurs sans bloquer la transpiration. 85 DH, paiement à la livraison. | src/data/products.ts, metaDescription | ☐ Validé | ☐ À modifier : |
| Déodorant : « Pour qui ? » | Pour celles et ceux qui veulent un déodorant crème simple, qui agit sur les odeurs sans bloquer la transpiration. | src/data/products.ts, forWho | ☐ Validé | ☐ À modifier : |
| Déodorant : FAQ « Quel prix pour le déodorant crème ? » | 85 DH le pot de 50 ml. Avec l'offre 2 + 1 : 170 DH les 3, soit 57 DH le pot. | src/data/faq.ts (réponse générée) et products.ts | ☐ Validé | ☐ À modifier : |
| Déodorant : FAQ « Et si j'ai la peau sensible ? » | Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil. | src/data/faq.ts (réponse générée) et products.ts | ☐ Validé | ☐ À modifier : |
| Déodorant : FAQ « Je suis enceinte ou j'allaite, je peux l'utiliser ? » | Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients. | src/data/faq.ts (réponse générée) et products.ts | ☐ Validé | ☐ À modifier : |
| Déodorant : FAQ « Je suis livrée en combien de temps ? » | En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer. | src/data/faq.ts (réponse générée) et products.ts | ☐ Validé | ☐ À modifier : |
| Accueil : carte « odeurs » | Des odeurs sous les bras — Déodorant crème, 5 ingrédients — Nouveau · 85 DH | src/home/text.ts | ☐ Validé | ☐ À modifier : |
| Accueil : résultat « odeurs » | Notre déodorant crème est là. 5 ingrédients. 85 DH. Bouton : Commander le déodorant · 85 DH | src/home/text.ts | ☐ Validé | ☐ À modifier : |
| Accueil et /soins : bénéfice du déodorant sur sa carte | Agit sur les odeurs, 5 ingrédients | src/data/products.ts, benefit | ☐ Validé | ☐ À modifier : |
| Fiches : mention sous chaque avis | Chaque peau est différente : c’est un témoignage, pas une promesse. | src/data/product-pages.ts, reviewNote | ☐ Validé | ☐ À modifier : |
| Fiches : intitulé de l'avis d'Awatef (gel, sérum, crème, écran) | Avis sur la routine complète | src/data/reviews.ts | ☐ Validé | ☐ À modifier : |
| Fiches : titre des questions | Questions fréquentes sur le déodorant crème | src/data/product-pages.ts | ☐ Validé | ☐ À modifier : |
| Fiches : case de consentement | J’ai lu et j’accepte les CGV et la politique de retour. | src/data/product-pages.ts | ☐ Validé | ☐ À modifier : |
| Page /soins : chapeau | Fabriqués au Maroc, livrés en 24 à 72 h, paiement à la livraison. | src/templates/ProductsIndex.tsx | ☐ Validé | ☐ À modifier : |
| Description générale du site (Google, JSON-LD, llms.txt) | Marque marocaine de soins : gamme anti-taches (gel nettoyant, sérum, crème, écran solaire SPF 50), sérum contour des yeux et déodorant crème, fabriqués au Maroc. | src/data/site.ts, description | ☐ Validé | ☐ À modifier : |
| CGV, article 2 « Produits » : liste générée | Gel nettoyant anti-taches (125 ml ou 200 ml) ; Sérum anti-taches (15 ml ou 30 ml) ; Crème anti-taches (30 ml ou 50 ml) ; Écran solaire SPF 50 (30 ml ou 50 ml) ; Sérum contour des yeux (15 ml) ; Déodorant crème (50 ml) | src/app/(fr)/cgv/page.tsx, depuis products.ts | ☐ Validé | ☐ À modifier : |

## 4. Rôles des ingrédients « [À VALIDER] » des 6 fiches — pharmacien

Textes de la section « L'étiquette, sans filtre », raccourcis à une ligne (contenu v3). La mention « Rôles relus par notre pharmacien » reste masquée tant que `site.medicalReview.validated` n'est pas à true.

### N° 01 · Gel nettoyant anti-taches

| Ingrédient | Rôle affiché (une ligne) | Validé | À modifier (préciser) |
|---|---|---|---|
| Figue de Barbarie (sur l’étiquette) | Adoucit et hydrate, sans tiraillement après le rinçage. | ☐ Validé | ☐ À modifier : |
| Louban (sur l’étiquette) | Résine traditionnelle qui aide à purifier la peau. | ☐ Validé | ☐ À modifier : |
| Sans sulfate (sur l’étiquette) | Base lavante douce : la peau est propre, sans être décapée. | ☐ Validé | ☐ À modifier : |

### N° 02 · Sérum anti-taches

| Ingrédient | Rôle affiché (une ligne) | Validé | À modifier (préciser) |
|---|---|---|---|
| Matcha (sur l’étiquette) | Thé vert antioxydant, qui aide le teint à retrouver de l'éclat. | ☐ Validé | ☐ À modifier : |
| Calendula (sur l’étiquette) | Fleur apaisante : le sérum reste doux, matin et soir. | ☐ Validé | ☐ À modifier : |
| Alpha-arbutine (sur l’étiquette) | Limite la production de mélanine : c'est l'actif qui agit sur les taches. | ☐ Validé | ☐ À modifier : |

### N° 03 · Crème anti-taches

| Ingrédient | Rôle affiché (une ligne) | Validé | À modifier (préciser) |
|---|---|---|---|
| Niacinamide (sur l’étiquette) | Vitamine B3 : aide à unifier le teint et à atténuer les taches. | ☐ Validé | ☐ À modifier : |
| Acide hyaluronique (sur l’étiquette) | Retient l'eau : la peau reste souple toute la journée. | ☐ Validé | ☐ À modifier : |
| AHA (sur l’étiquette) | Acides de fruits qui affinent le grain de peau. Écran solaire le matin. | ☐ Validé | ☐ À modifier : |

### N° 04 · Écran solaire SPF 50

| Ingrédient | Rôle affiché (une ligne) | Validé | À modifier (préciser) |
|---|---|---|---|
| SPF 50 (sur l’étiquette) | Le plus haut niveau de protection contre les coups de soleil (UVB). | ☐ Validé | ☐ À modifier : |
| UVA / UVB (sur l’étiquette) | Protège aussi des UVA, ceux qui foncent les taches et les font revenir. | ☐ Validé | ☐ À modifier : |

### N° 05 · Sérum contour des yeux

| Ingrédient | Rôle affiché (une ligne) | Validé | À modifier (préciser) |
|---|---|---|---|
| Caféine (sur l’étiquette) | Aide à atténuer l'aspect des poches et des cernes. | ☐ Validé | ☐ À modifier : |
| Acide hyaluronique (sur l’étiquette) | Hydrate la peau fine sous l'œil. | ☐ Validé | ☐ À modifier : |
| Aloe vera (sur l’étiquette) | Apaise et rafraîchit dès l'application. | ☐ Validé | ☐ À modifier : |

### N° 06 · Déodorant crème

| Ingrédient | Rôle affiché (une ligne) | Validé | À modifier (préciser) |
|---|---|---|---|
| Oxyde de zinc (sur l’étiquette) | Limite les bactéries qui causent les odeurs. | ☐ Validé | ☐ À modifier : |
| Huile de coco (sur l’étiquette) | Donne à la crème sa texture fondante. | ☐ Validé | ☐ À modifier : |
| Huile de jojoba (sur l’étiquette) | Nourrit et adoucit la peau des aisselles. | ☐ Validé | ☐ À modifier : |
| Cire d’abeille (dans la crème) | Donne sa tenue à la crème. | ☐ Validé | ☐ À modifier : |
| Vitamine E (dans la crème) | Antioxydant qui protège la formule dans le temps. | ☐ Validé | ☐ À modifier : |

## 5. Points à trancher (client)

| Point | Situation actuelle | Fichier | Validé | À modifier (préciser) |
|---|---|---|---|---|
| CGV, article 3 « Prix » | Liste générée depuis products.ts : la gamme (Petit et Grand format, offre 2 + 1), puis sérum contour des yeux 185 DH (123 DH avec l'offre 2 + 1) et déodorant crème 85 DH (57 DH avec l'offre 2 + 1). Les prix à l'unité des 4 soins de la gamme n'y figurent pas. | src/app/(fr)/cgv/page.tsx et src/app/(ar)/ar/cgv/page.tsx | ☐ Validé | ☐ À modifier : |

## 6. Contenu v3 : nouveaux textes courts (client, pharmacien pour les fiches et les conseils)

### Bénéfice et « Pour qui ? / Comment l'utiliser ? / Résultats » de chaque fiche

#### N° 01 · Gel nettoyant anti-taches

| Texte | Contenu affiché | Validé | À modifier (préciser) |
|---|---|---|---|
| Titre de la page (H1) | Gel nettoyant anti-taches. | ☐ Validé | ☐ À modifier : |
| Titre dans Google | Gel nettoyant anti-taches sans sulfate \| OTAGE | ☐ Validé | ☐ À modifier : |
| Description dans Google | Gel nettoyant anti-taches sans sulfate, à la figue de Barbarie et au louban. Dès 91 DH, livré en 24 à 72 h partout au Maroc, paiement à la livraison. | ☐ Validé | ☐ À modifier : |
| Bénéfice (cartes, accueil, /soins) | Nettoie sans dessécher | ☐ Validé | ☐ À modifier : |
| Accroche de la fiche | Pour nettoyer ta peau sans la dessécher, avant le sérum anti-taches. | ☐ Validé | ☐ À modifier : |
| Pour qui ? | Pour toi si tu as des taches brunes ou un teint irrégulier. C'est l'étape 1 de la routine, matin et soir. | ☐ Validé | ☐ À modifier : |
| Comment l'utiliser ? | 1. Mouille ton visage, matin et soir. 2. Masse le gel 30 secondes. 3. Rince, puis applique le sérum anti-taches. | ☐ Validé | ☐ À modifier : |
| Résultats (frise : quand, et à quoi s'attendre ; reformulée depuis le texte déjà affiché, sans promesse chiffrée) | Dès l'application : Une peau nettoyée en douceur. · Avec la routine complète : Les taches s'atténuent petit à petit. | ☐ Validé | ☐ À modifier : |

#### N° 02 · Sérum anti-taches

| Texte | Contenu affiché | Validé | À modifier (préciser) |
|---|---|---|---|
| Titre de la page (H1) | Sérum anti-taches. | ☐ Validé | ☐ À modifier : |
| Titre dans Google | Sérum anti-taches à l'alpha-arbutine \| OTAGE | ☐ Validé | ☐ À modifier : |
| Description dans Google | Sérum anti-taches à l'alpha-arbutine, au matcha et au calendula, pour atténuer les taches brunes. Dès 163 DH, livré en 24 à 72 h, paiement à la livraison. | ☐ Validé | ☐ À modifier : |
| Bénéfice (cartes, accueil, /soins) | Atténue les taches brunes | ☐ Validé | ☐ À modifier : |
| Accroche de la fiche | Pour atténuer les taches brunes et unifier le teint, goutte après goutte. | ☐ Validé | ☐ À modifier : |
| Pour qui ? | Pour les taches brunes, l'hyperpigmentation et le teint irrégulier. C'est l'étape 2 de la routine, matin et soir. | ☐ Validé | ☐ À modifier : |
| Comment l'utiliser ? | 1. Après le gel nettoyant, sèche ta peau. 2. Dépose 3 à 4 gouttes sur le visage. 3. Tapote du bout des doigts, puis applique la crème. | ☐ Validé | ☐ À modifier : |
| Résultats (frise : quand, et à quoi s'attendre ; reformulée depuis le texte déjà affiché, sans promesse chiffrée) | Les premiers jours : Pas de changement visible : c'est normal. · Avec la régularité : Les taches s'atténuent petit à petit. · Ce qui compte : Ta peau, ta régularité et l'écran solaire. | ☐ Validé | ☐ À modifier : |

#### N° 03 · Crème anti-taches

| Texte | Contenu affiché | Validé | À modifier (préciser) |
|---|---|---|---|
| Titre de la page (H1) | Crème anti-taches. | ☐ Validé | ☐ À modifier : |
| Titre dans Google | Crème anti-taches à la niacinamide \| OTAGE | ☐ Validé | ☐ À modifier : |
| Description dans Google | Crème anti-taches à la niacinamide et à l'acide hyaluronique : hydrate et unifie le teint. Dès 130 DH, livrée en 24 à 72 h, paiement à la livraison. | ☐ Validé | ☐ À modifier : |
| Bénéfice (cartes, accueil, /soins) | Hydrate et unifie le teint | ☐ Validé | ☐ À modifier : |
| Accroche de la fiche | Pour hydrater, unifier le teint et fixer le sérum, avant l'écran solaire. | ☐ Validé | ☐ À modifier : |
| Pour qui ? | Pour un teint irrégulier ou marqué par des taches. C'est l'étape 3 de la routine, matin et soir, après le sérum. | ☐ Validé | ☐ À modifier : |
| Comment l'utiliser ? | 1. Après le sérum, prends une noisette de crème. 2. Applique sur le visage et le cou. 3. Masse vers le haut. Le matin, termine par l'écran solaire. | ☐ Validé | ☐ À modifier : |
| Résultats (frise : quand, et à quoi s'attendre ; reformulée depuis le texte déjà affiché, sans promesse chiffrée) | Dès l'application : La peau est hydratée. · Avec la routine complète : Les taches s'atténuent petit à petit. | ☐ Validé | ☐ À modifier : |

#### N° 04 · Écran solaire SPF 50

| Texte | Contenu affiché | Validé | À modifier (préciser) |
|---|---|---|---|
| Titre de la page (H1) | Écran solaire SPF 50. | ☐ Validé | ☐ À modifier : |
| Titre dans Google | Écran solaire SPF 50 anti-taches \| OTAGE | ☐ Validé | ☐ À modifier : |
| Description dans Google | Écran solaire SPF 50, haute protection UVA et UVB, pour limiter le retour des taches. Dès 112 DH, livré en 24 à 72 h au Maroc, paiement à la livraison. | ☐ Validé | ☐ À modifier : |
| Bénéfice (cartes, accueil, /soins) | Limite le retour des taches | ☐ Validé | ☐ À modifier : |
| Accroche de la fiche | Pour protéger ta peau des UVA et des UVB, et limiter le retour des taches. | ☐ Validé | ☐ À modifier : |
| Pour qui ? | Pour toute peau qui suit une routine anti-taches. C'est l'étape 4, le matin seulement. | ☐ Validé | ☐ À modifier : |
| Comment l'utiliser ? | 1. Le matin, en dernier, après la crème. 2. Applique sur tout le visage. 3. Au soleil, renouvelle toutes les 2 heures. | ☐ Validé | ☐ À modifier : |
| Résultats (frise : quand, et à quoi s'attendre ; reformulée depuis le texte déjà affiché, sans promesse chiffrée) | Chaque matin : Il laisse le sérum et la crème agir. · Avec la régularité : Il limite le retour des taches. Il ne les fait pas disparaître. | ☐ Validé | ☐ À modifier : |

#### N° 05 · Sérum contour des yeux

| Texte | Contenu affiché | Validé | À modifier (préciser) |
|---|---|---|---|
| Titre de la page (H1) | Sérum contour des yeux. | ☐ Validé | ☐ À modifier : |
| Titre dans Google | Sérum contour des yeux à la caféine \| OTAGE | ☐ Validé | ☐ À modifier : |
| Description dans Google | Sérum contour des yeux à la caféine, 15 ml, applicateur bille, pour atténuer l'aspect des cernes. 185 DH, ou 3 pour 370 DH, paiement à la livraison. | ☐ Validé | ☐ À modifier : |
| Bénéfice (cartes, accueil, /soins) | Atténue l'aspect des cernes | ☐ Validé | ☐ À modifier : |
| Accroche de la fiche | Pour atténuer l'aspect des cernes et rafraîchir le regard, matin et soir. | ☐ Validé | ☐ À modifier : |
| Pour qui ? | Pour les cernes et le contour des yeux fatigué. Texture légère, applicateur bille, compatible avec le maquillage. | ☐ Validé | ☐ À modifier : |
| Comment l'utiliser ? | 1. Matin et soir, sur peau propre. 2. Passe la bille sous l'œil, de l'intérieur vers l'extérieur. 3. Tapote doucement du bout du doigt. | ☐ Validé | ☐ À modifier : |
| Résultats (frise : quand, et à quoi s'attendre ; reformulée depuis le texte déjà affiché, sans promesse chiffrée) | Dès l'application : Une sensation de fraîcheur. · Avec la régularité : Sur les cernes, l'effet dépend de leur origine : hérédité, fatigue ou pigment. | ☐ Validé | ☐ À modifier : |

#### N° 06 · Déodorant crème

| Texte | Contenu affiché | Validé | À modifier (préciser) |
|---|---|---|---|
| Titre de la page (H1) | Déodorant crème OTAGE. | ☐ Validé | ☐ À modifier : |
| Titre dans Google | Déodorant crème OTAGE, 5 ingrédients \| OTAGE | ☐ Validé | ☐ À modifier : |
| Description dans Google | Déodorant crème OTAGE fabriqué au Maroc, 5 ingrédients, pot de 50 ml. Agit sur les odeurs sans bloquer la transpiration. 85 DH, paiement à la livraison. | ☐ Validé | ☐ À modifier : |
| Bénéfice (cartes, accueil, /soins) | Agit sur les odeurs, 5 ingrédients | ☐ Validé | ☐ À modifier : |
| Accroche de la fiche | Pour les odeurs, avec 5 ingrédients seulement. | ☐ Validé | ☐ À modifier : |
| Pour qui ? | Pour toi si tu veux un déodorant crème simple, à 5 ingrédients. Il agit sur les odeurs, pas sur la transpiration : transpirer est normal. | ☐ Validé | ☐ À modifier : |
| Comment l'utiliser ? | 1. Le matin, sur une aisselle propre et sèche. 2. Prends un peu de crème du bout du doigt. 3. Laisse-la fondre, puis applique. | ☐ Validé | ☐ À modifier : |
| Résultats (frise : quand, et à quoi s'attendre ; reformulée depuis le texte déjà affiché, sans promesse chiffrée) | Dès l'application : Il agit sur les odeurs. · Dans la journée : La tenue varie d'une personne à l'autre. | ☐ Validé | ☐ À modifier : |

### Citation du fondateur (À propos)

La version actuelle reste en ligne ; la version courte ne remplace l'actuelle qu'après votre accord.

| Version | Texte | Validé | À modifier (préciser) |
|---|---|---|---|
| Actuelle (en ligne) | J'ai constaté la présence de nombreux produits cosmétiques falsifiés sur le marché marocain. Face à ce constat, j'ai décidé de créer OTAGE, une marque de cosmétiques fondée sur une volonté de transparence, d'honnêteté et de confiance. Mon objectif est de proposer des produits avec une attention particulière portée à leur qualité et à la transparence des informations communiquées. | ☐ Validé | ☐ À modifier : |
| Courte (proposée) | J'ai vu beaucoup de cosmétiques falsifiés au Maroc. J'ai créé OTAGE pour des soins de qualité, avec des informations claires. | ☐ Validé | ☐ À modifier : |

### Pages conseils réécrites : pharmacien

Elles restent en noindex tant que `site.medicalReview.validated` n'est pas à true. Une ligne par bloc de la page.

#### /taches-pigmentaires : Taches pigmentaires : causes et routine pour les atténuer

| Bloc | Texte affiché | Validé | À modifier (préciser) |
|---|---|---|---|
| Réponse directe (en haut de page) | Une tache pigmentaire est une zone où la peau fabrique trop de mélanine. Pour l'atténuer : écran solaire chaque matin et routine régulière, avec patience. | ☐ Validé | ☐ À modifier : |
| D'où viennent les taches pigmentaires ? | • Le soleil : les UV stimulent la mélanine, les taches foncent. • Les hormones : grossesse ou contraception peuvent donner un mélasma. • Une inflammation : un bouton ou une brûlure laisse une marque brune. • L'âge : le soleil accumulé fait apparaître de petites taches. | ☐ Validé | ☐ À modifier : |
| Qu'est-ce qui aide vraiment ? | • L'écran solaire chaque jour, même en hiver. • La régularité, matin et soir, plus que le nombre de produits. • Ne pas gratter ni percer les boutons. • Tester tout nouveau soin 24 h sur une petite zone. | ☐ Validé | ☐ À modifier : |
| Quand consulter un dermatologue ? | Dans la plupart des cas, une tache pigmentaire est sans danger. Consulte si elle change de forme, de couleur ou de taille, saigne ou démange. | ☐ Validé | ☐ À modifier : |
| Quelle routine pour atténuer les taches ? | Le matin, les 4 étapes. Le soir, les 3 premières. Gel nettoyant anti-taches : Masse 30 secondes sur peau humide, puis rince. Sérum anti-taches : 3 à 4 gouttes sur peau sèche, en tapotant. Crème anti-taches : Une noisette sur le visage et le cou. Écran solaire SPF 50 : Le matin, en dernier. | ☐ Validé | ☐ À modifier : |
| FAQ : Combien de temps pour atténuer une tache pigmentaire ? | Il n'y a pas de délai garanti. Les taches s'atténuent petit à petit, avec régularité et écran solaire. | ☐ Validé | ☐ À modifier : |
| FAQ : Les taches peuvent-elles revenir ? | Oui, surtout avec le soleil. C'est pour ça que l'écran SPF 50 est dans la routine du matin. | ☐ Validé | ☐ À modifier : |
| FAQ : Faut-il de l'écran solaire quand il n'y a pas de soleil ? | Oui. Les UVA traversent les nuages et les vitres. | ☐ Validé | ☐ À modifier : |
| FAQ : J'ai la peau sensible, je peux suivre la routine ? | Fais d'abord un test de 24 h sur une petite zone. En cas de rougeur, arrête et demande conseil. | ☐ Validé | ☐ À modifier : |

#### /cernes : Cernes : causes et gestes pour un regard reposé

| Bloc | Texte affiché | Validé | À modifier (préciser) |
|---|---|---|---|
| Réponse directe (en haut de page) | Les cernes viennent de l'hérédité, de la fatigue, d'une peau fine ou du pigment. Sommeil, protection solaire et soin contour des yeux aident à les atténuer. | ☐ Validé | ☐ À modifier : |
| Pourquoi a-t-on des cernes ? | • L'hérédité : certaines familles ont le contour des yeux plus foncé. • La fatigue : le teint devient terne, les cernes se voient plus. • Une peau fine : les petits vaisseaux se voient (cernes bleutés). • Le pigment : cernes bruns, accentués par le soleil et les frottements. • L'âge : la peau s'affine et le contour de l'œil se creuse. | ☐ Validé | ☐ À modifier : |
| Qu'est-ce qui aide contre les cernes ? | • Dormir assez, à heures régulières. • Ne pas te frotter les yeux ; te démaquiller en douceur. • Protéger tes yeux du soleil : lunettes et écran solaire. • Un soin contour des yeux matin et soir, sans tirer la peau. | ☐ Validé | ☐ À modifier : |
| Comment appliquer un sérum contour des yeux ? | • Matin et soir, sur peau propre. • Passe la bille sous l'œil, de l'intérieur vers l'extérieur. • Tapote doucement du bout du doigt. | ☐ Validé | ☐ À modifier : |
| Quand consulter un médecin ? | Si tes cernes apparaissent d'un coup, d'un seul côté, ou avec un gonflement. Un dermatologue peut aussi t'expliquer des cernes très marqués depuis toujours. | ☐ Validé | ☐ À modifier : |
| Le soin OTAGE pour les cernes | Sérum contour des yeux : Caféine, acide hyaluronique et aloe vera, applicateur bille de 15 ml. | ☐ Validé | ☐ À modifier : |
| FAQ : Un sérum peut-il faire disparaître les cernes ? | Non, aucun soin ne peut le promettre. Selon leur origine, ils s'atténuent plus ou moins. | ☐ Validé | ☐ À modifier : |
| FAQ : Peut-on le mettre sous le maquillage ? | Oui. Sa texture légère se glisse sous le maquillage. | ☐ Validé | ☐ À modifier : |
| FAQ : Je suis enceinte ou j'allaite, je peux l'utiliser ? | Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients. | ☐ Validé | ☐ À modifier : |

#### /taches-acne : Taches d'acné : pourquoi elles restent et comment les atténuer

| Bloc | Texte affiché | Validé | À modifier (préciser) |
|---|---|---|---|
| Réponse directe (en haut de page) | Une marque brune après un bouton est une tache, pas une cicatrice. Elle s'atténue avec le temps, plus vite si tu la protèges du soleil. | ☐ Validé | ☐ À modifier : |
| Tache ou cicatrice : comment faire la différence ? | • Tache : plate, seule la couleur change. Brune, c'est une hyperpigmentation post-inflammatoire. • Rose ou rouge : de petits vaisseaux encore dilatés, qui pâlissent avec le temps. • Cicatrice : un creux ou une bosse. Un soin cosmétique n'y change rien. | ☐ Validé | ☐ À modifier : |
| Qu'est-ce qui aggrave les taches d'acné ? | • Percer ou gratter les boutons : la marque fonce. • Le soleil sans protection : il fonce les taches et les fait durer. • Les gommages agressifs et les produits irritants. | ☐ Validé | ☐ À modifier : |
| Qu'est-ce qui aide ? | • Nettoyer en douceur, matin et soir. • Un écran solaire chaque matin. • Une routine régulière, le temps qu'elle agisse. • Tester tout nouveau soin 24 h sur une petite zone. | ☐ Validé | ☐ À modifier : |
| Quand consulter un dermatologue ? | Si tu as encore des boutons, des kystes ou des cicatrices en creux. L'acné se traite, et un traitement évite de nouvelles marques. | ☐ Validé | ☐ À modifier : |
| Quelle routine pour les marques brunes ? | Elle atténue les taches, elle ne traite pas l'acné. Le soir, sans écran. Gel nettoyant anti-taches : Nettoie sans dessécher, sans sulfate. Sérum anti-taches : 3 à 4 gouttes sur peau sèche. Crème anti-taches : Hydrate et unifie le teint. Écran solaire SPF 50 : Le matin, en dernier. | ☐ Validé | ☐ À modifier : |
| FAQ : Les taches d'acné partent-elles toutes seules ? | Souvent, oui, en plusieurs mois. Le soleil sans protection les fait durer. | ☐ Validé | ☐ À modifier : |
| FAQ : La routine anti-taches soigne-t-elle l'acné ? | Non : elle atténue les taches brunes, pas les boutons. Pour une acné active, vois un dermatologue. | ☐ Validé | ☐ À modifier : |
| FAQ : Et si j'ai encore des boutons ? | Demande d'abord à un dermatologue ou à un pharmacien. Puis fais un test de 24 h sur une petite zone. | ☐ Validé | ☐ À modifier : |

#### /melasma-grossesse : Mélasma et masque de grossesse : comprendre et se protéger

| Bloc | Texte affiché | Validé | À modifier (préciser) |
|---|---|---|---|
| Réponse directe (en haut de page) | Le mélasma donne des taches brunes symétriques, souvent pendant la grossesse. Le geste clé : te protéger du soleil, chaque jour. | ☐ Validé | ☐ À modifier : |
| Pourquoi le mélasma apparaît-il ? | • Les hormones : grossesse, contraception, changements hormonaux. • Le soleil : il déclenche et fonce les taches, même en peu de temps. • Le terrain : peaux mates et certaines familles y sont plus sujettes. | ☐ Validé | ☐ À modifier : |
| Qu'est-ce qui aide à le limiter ? | • Te protéger du soleil chaque jour : chapeau, ombre, écran. • Éviter le soleil aux heures chaudes. • Ne pas irriter la peau : pas de gommage agressif. • Être patiente : aucun soin ne peut promettre de le faire disparaître. | ☐ Validé | ☐ À modifier : |
| Enceinte ou allaitante : quelles précautions ? | • Te protéger du soleil, avec un écran validé par ton médecin. • Ne pas multiplier les produits : fais valider chaque soin. • Aucun traitement des taches sans avis médical. • Rétinoïdes et hydroquinone sont déconseillés pendant la grossesse. | ☐ Validé | ☐ À modifier : |
| Et après la grossesse ? | Le masque s'atténue souvent dans les mois qui suivent, pas toujours. S'il reste, une routine anti-taches et l'écran solaire peuvent aider. | ☐ Validé | ☐ À modifier : |
| Quand consulter un dermatologue ? | Si ton mélasma est étendu, ancien ou s'il persiste. Il existe des traitements médicaux, à décider avec lui. | ☐ Validé | ☐ À modifier : |
| Quels soins OTAGE, avec l'accord de ton médecin ? | Enceinte ou allaitante, utilise-les seulement après l'accord de ton médecin. Écran solaire SPF 50 : Le geste du matin, pour limiter le retour des taches. Sérum anti-taches : Atténue les taches brunes. Crème anti-taches : Hydrate et unifie le teint. | ☐ Validé | ☐ À modifier : |
| FAQ : Le masque de grossesse disparaît-il après l'accouchement ? | Souvent, il s'atténue en quelques mois, pas toujours. S'il reste, vois un dermatologue. | ☐ Validé | ☐ À modifier : |
| FAQ : Puis-je utiliser les soins OTAGE enceinte ou en allaitant ? | Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients. | ☐ Validé | ☐ À modifier : |
| FAQ : Le soleil aggrave-t-il le mélasma ? | Oui. Il fonce les taches et le mélasma revient vite après une exposition. | ☐ Validé | ☐ À modifier : |

## 7. Questions fréquentes (client, pharmacien pour les questions de peau)

Les réponses telles qu'affichées sur le site (et lues par Google : données structurées FAQ).

### Accueil

| Question | Réponse affichée | Validé | À modifier (préciser) |
|---|---|---|---|
| Je paie quand ? | À la livraison, en espèces. Rien à payer en ligne, pas de carte bancaire. | ☐ Validé | ☐ À modifier : |
| La livraison est payante ? | Non pour une gamme complète : elle est offerte. À l'unité, compte 35 à 45 DH selon ta ville. | ☐ Validé | ☐ À modifier : |
| Je suis livrée en combien de temps ? | En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer. | ☐ Validé | ☐ À modifier : |
| Combien coûte la gamme anti-taches ? | 299 DH en Petit format, 599 DH en Grand format. Avec l'offre 2 + 1, la 3e gamme est offerte. | ☐ Validé | ☐ À modifier : |
| Qu'est-ce qu'il y a dans une gamme ? | Gel nettoyant, sérum, crème et écran SPF 50. Petit format : 125, 15, 30 et 30 ml. Grand format : 200, 30, 50 et 50 ml. | ☐ Validé | ☐ À modifier : |
| Comment j'utilise la routine ? | Le matin : gel, sérum, crème, puis écran solaire. Le soir : les 3 premiers, sans écran. | ☐ Validé | ☐ À modifier : |
| Je vois des résultats quand ? | Pas en quelques jours : les taches s'atténuent petit à petit. Régularité et écran solaire chaque matin comptent le plus. | ☐ Validé | ☐ À modifier : |
| Et si j'ai la peau sensible ? | Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil. | ☐ Validé | ☐ À modifier : |
| Je suis enceinte ou j'allaite, je peux l'utiliser ? | Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients. | ☐ Validé | ☐ À modifier : |
| Et après ma commande ? | On t'appelle pour confirmer ta commande et ton adresse. Ensuite, ton colis part. | ☐ Validé | ☐ À modifier : |
| Et si j'ai un problème avec ma commande ? | Produit abîmé ou erreur : on échange ou on rembourse, sans frais pour toi. Écris-nous sur WhatsApp. | ☐ Validé | ☐ À modifier : |
| Je peux retourner ma commande ? | Oui, sous 7 jours après réception (loi 31-08, article 36). Produits non ouverts, retour à nos frais, remboursement ou échange. | ☐ Validé | ☐ À modifier : |
| Vos soins sont fabriqués où ? | Au Maroc, avec un laboratoire partenaire. Parmi les ingrédients : figue de Barbarie et louban. | ☐ Validé | ☐ À modifier : |

### N° 01 · Gel nettoyant anti-taches

| Question | Réponse affichée | Validé | À modifier (préciser) |
|---|---|---|---|
| Quel prix pour le gel nettoyant anti-taches ? | 91 DH les 125 ml, 140 DH les 200 ml. Il est aussi dans la gamme complète, dès 299 DH. | ☐ Validé | ☐ À modifier : |
| Le gel nettoyant dessèche-t-il la peau ? | Non : il est sans sulfate, avec figue de Barbarie et louban. | ☐ Validé | ☐ À modifier : |
| Et si j'ai la peau sensible ? | Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil. | ☐ Validé | ☐ À modifier : |
| Je suis enceinte ou j'allaite, je peux l'utiliser ? | Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients. | ☐ Validé | ☐ À modifier : |
| Je suis livrée en combien de temps ? | En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer. | ☐ Validé | ☐ À modifier : |

### N° 02 · Sérum anti-taches

| Question | Réponse affichée | Validé | À modifier (préciser) |
|---|---|---|---|
| Quel prix pour le sérum anti-taches ? | 163 DH les 15 ml, 265 DH les 30 ml. Il est aussi dans la gamme complète, dès 299 DH. | ☐ Validé | ☐ À modifier : |
| Et si j'ai la peau sensible ? | Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil. | ☐ Validé | ☐ À modifier : |
| Je suis enceinte ou j'allaite, je peux l'utiliser ? | Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients. | ☐ Validé | ☐ À modifier : |
| Je suis livrée en combien de temps ? | En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer. | ☐ Validé | ☐ À modifier : |

### N° 03 · Crème anti-taches

| Question | Réponse affichée | Validé | À modifier (préciser) |
|---|---|---|---|
| Quel prix pour la crème anti-taches ? | 130 DH les 30 ml, 205 DH les 50 ml. Elle est aussi dans la gamme complète, dès 299 DH. | ☐ Validé | ☐ À modifier : |
| Avant ou après le sérum ? | Après. La crème est l'étape 3 : elle fixe le sérum appliqué juste avant. | ☐ Validé | ☐ À modifier : |
| Et si j'ai la peau sensible ? | Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil. | ☐ Validé | ☐ À modifier : |
| Je suis enceinte ou j'allaite, je peux l'utiliser ? | Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients. | ☐ Validé | ☐ À modifier : |
| Je suis livrée en combien de temps ? | En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer. | ☐ Validé | ☐ À modifier : |

### N° 04 · Écran solaire SPF 50

| Question | Réponse affichée | Validé | À modifier (préciser) |
|---|---|---|---|
| Quel prix pour l'écran solaire SPF 50 ? | 112 DH les 30 ml, 190 DH les 50 ml. Il est aussi dans la gamme complète, dès 299 DH. | ☐ Validé | ☐ À modifier : |
| Faut-il le mettre le soir ? | Non. Le soir, la routine s'arrête à l'étape 3, la crème. | ☐ Validé | ☐ À modifier : |
| Faut-il en mettre quand il n'y a pas de soleil ? | Oui. Les UVA traversent les nuages et les vitres. | ☐ Validé | ☐ À modifier : |
| Et si j'ai la peau sensible ? | Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil. | ☐ Validé | ☐ À modifier : |
| Je suis enceinte ou j'allaite, je peux l'utiliser ? | Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients. | ☐ Validé | ☐ À modifier : |
| Je suis livrée en combien de temps ? | En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer. | ☐ Validé | ☐ À modifier : |

### N° 05 · Sérum contour des yeux

| Question | Réponse affichée | Validé | À modifier (préciser) |
|---|---|---|---|
| Quel prix pour le sérum contour des yeux ? | 185 DH les 15 ml. Avec l'offre 2 + 1 : 370 DH les 3, soit 123 DH le sérum. | ☐ Validé | ☐ À modifier : |
| Peut-on le mettre sous le maquillage ? | Oui. Sa texture légère se glisse sous le maquillage. | ☐ Validé | ☐ À modifier : |
| Et si j'ai la peau sensible ? | Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil. | ☐ Validé | ☐ À modifier : |
| Je suis enceinte ou j'allaite, je peux l'utiliser ? | Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients. | ☐ Validé | ☐ À modifier : |
| Je suis livrée en combien de temps ? | En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer. | ☐ Validé | ☐ À modifier : |

### N° 06 · Déodorant crème

| Question | Réponse affichée | Validé | À modifier (préciser) |
|---|---|---|---|
| Quel prix pour le déodorant crème ? | 85 DH le pot de 50 ml. Avec l'offre 2 + 1 : 170 DH les 3, soit 57 DH le pot. | ☐ Validé | ☐ À modifier : |
| Et si j'ai la peau sensible ? | Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil. | ☐ Validé | ☐ À modifier : |
| Je suis enceinte ou j'allaite, je peux l'utiliser ? | Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients. | ☐ Validé | ☐ À modifier : |
| Je suis livrée en combien de temps ? | En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer. | ☐ Validé | ☐ À modifier : |

## 8. Mentions légales : cookies et mesure d'audience (client)

Texte de la section « Cookies et mesure d'audience » (page Mentions légales, FR ; même contenu en arabe). Les durées doivent correspondre aux réglages de Google Analytics.

| Paragraphe | Texte affiché | Validé | À modifier (préciser) |
|---|---|---|---|
| § 1 | Ce site n'utilise pas de cookies publicitaires. Il enregistre seulement, dans ton navigateur, tes préférences d'affichage et les informations de livraison que tu as saisies, pour t'éviter de les retaper. | ☐ Validé | ☐ À modifier : |
| § 2 | Mesure d'audience (Google Analytics), seulement avec ton accord. Quand tu cliques sur « Accepter », nous utilisons Google Analytics, chargé par Google Tag Manager, pour mesurer la fréquentation du site : pages vues, provenance des visites (Instagram, Google, assistant IA…), type d'appareil, pays ou ville approximatifs, clics vers WhatsApp, offres choisies et commandes envoyées (montant, offre et numéro de commande). Ton nom, ton téléphone, ta ville et ton adresse ne sont jamais transmis. | ☐ Validé | ☐ À modifier : |
| § 3 | Finalité : comprendre comment le site est utilisé, pour l'améliorer. Ces données sont traitées par Google (Google Ireland Limited et Google LLC), y compris hors du Maroc. Les cookies de mesure (_ga, _ga_…) sont conservés 13 mois au plus ; les statistiques, 14 mois au plus. | ☐ Validé | ☐ À modifier : |
| § 4 | Tu peux refuser : sans ton accord, aucun script Google n'est chargé et aucun cookie de mesure n'est déposé, et le site fonctionne de la même façon. Ton choix est gardé dans ton navigateur. Tu peux le changer à tout moment avec le lien « Gérer les cookies », en bas de chaque page. | ☐ Validé | ☐ À modifier : |

