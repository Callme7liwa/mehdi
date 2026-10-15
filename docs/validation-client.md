> **Fichier généré par `npm run validation` : le copier avant de le remplir.** Le relancer écrase ce fichier, cases cochées comprises.

# Validation avant mise en ligne : fiches produits v2

Document à faire remplir par le client (et par le pharmacien pour les parties indiquées), avant toute mise en ligne.
Pour chaque ligne : cocher **Validé**, ou **À modifier** en écrivant la bonne valeur. Rien n'est en ligne tant que ce document n'est pas validé.

Généré le 15 octobre 2026, à partir du code : les valeurs sont celles que le site affiche aujourd'hui.

Les traductions arabes ne sont pas reprises ici : elles sont toutes dans `src/data/ar-relecture.md`, à faire relire par un natif.

## 1. Prix et offres (client)

| Donnée | Valeur affichée sur le site | Source dans le code | Validé | À modifier (préciser) |
|---|---|---|---|---|
| Sérum contour des yeux N° 05 : prix à l'unité | 185 DH (ancien prix : 130 DH), 15 ml | src/data/products.ts, produit « yeux », unitPrice | ☐ Validé | ☐ À modifier : |
| Sérum contour des yeux : offre 2 + 1 | 3 sérums pour 370 DH au lieu de 555 DH (≈ 123 DH le sérum) | src/data/products.ts, bundleKeys | ☐ Validé | ☐ À modifier : |
| Déodorant crème N° 06 : prix | 85 DH, format unique de 50 ml | src/data/products.ts, produit « deo », unitPrice et ml | ☐ Validé | ☐ À modifier : |
| Déodorant crème : offre 2 + 1 | 3 pots pour 170 DH au lieu de 255 DH (≈ 57 DH le pot) | src/data/products.ts, bundleKeys | ☐ Validé | ☐ À modifier : |
| Règle de l'offre 2 + 1 à l'unité | Pour le sérum contour des yeux et le déodorant crème : 1 article offert pour 3 identiques dans la même commande, cumulable (6 = 2 offerts), y compris quand le soin est ajouté depuis la fiche d'un autre produit. Calculé par le serveur. | src/data/products.ts (freeCount), src/lib/order/compute.ts | ☐ Validé | ☐ À modifier : |
| Livraison du déodorant et du contour des yeux | Payante : de 35 à 45 DH selon la ville (comme tout achat à l'unité) | src/data/site.ts, delivery.unitFee | ☐ Validé | ☐ À modifier : |

## 2. Déodorant crème N° 06 (client, pharmacien pour les allégations)

### Fiche

| Donnée | Valeur affichée | Source | Validé | À modifier (préciser) |
|---|---|---|---|---|
| Nom et numéro | Déodorant crème, N° 06 | src/data/products.ts | ☐ Validé | ☐ À modifier : |
| Contenance | 50 ml, un seul format | src/data/products.ts | ☐ Validé | ☐ À modifier : |
| Ingrédients (liste complète affichée) | Oxyde de zinc, Huile de coco, Huile de jojoba, Cire d'abeille, Vitamine E | src/data/products.ts, ingredients | ☐ Validé | ☐ À modifier : |
| Moment d'utilisation | Le matin | src/data/products.ts, when (texte écrit par nous, pas dans la maquette) | ☐ Validé | ☐ À modifier : |
| Mode d'emploi | Prends un peu de baume du bout du doigt, laisse-le fondre puis applique-le sur l'aisselle propre et sèche. | src/data/products.ts, how (texte écrit par nous, pas dans la maquette) | ☐ Validé | ☐ À modifier : |
| Photos (le texte de l'étiquette doit correspondre au produit vendu) | deodorant-creme-n06-pot.webp ; deodorant-creme-n06-mains.webp ; deodorant-creme-n06-etiquette.webp | public/images/ | ☐ Validé | ☐ À modifier : |

### Allégations : À valider

« 100 % naturel » (et « naturel », « ingrédients naturels ») a été **retiré partout** (fiche, méta, JSON-LD, llms.txt, accueil, arabe) en attendant votre validation. Les allégations ci-dessous sont affichées ; elles restent **à valider**.

| Allégation | Où elle apparaît | Statut | Validé | À modifier (préciser) |
|---|---|---|---|---|
| Sans sels d'aluminium | fiche (avantage, titre H1, titre Google, description), accueil (carte « odeurs », « À l'unité »), FAQ, llms.txt | À valider | ☐ Validé | ☐ À modifier : |
| Sans parabène | fiche (avantage) | À valider | ☐ Validé | ☐ À modifier : |
| Ne bloque pas la transpiration (agit sur les odeurs) | fiche (avantage, « Pour qui ? », FAQ « Est-ce qu'il bloque la transpiration ? ») | À valider | ☐ Validé | ☐ À modifier : |
| Sans sulfate | fiche (avantage) — venait de la maquette | À valider | ☐ Validé | ☐ À modifier : |
| « Cinq ingrédients, rien d'autre » | fiche (texte d'accroche), accueil | À valider (la liste complète est-elle bien de 5 ingrédients ?) | ☐ Validé | ☐ À modifier : |
| « 100 % naturel » | retiré partout | À rétablir seulement si validé | ☐ Validé | ☐ À modifier : |

## 3. Textes que nous avons écrits (absents des maquettes) — client

| Texte | Contenu affiché | Source | Validé | À modifier (préciser) |
|---|---|---|---|---|
| Déodorant : titre de la page (H1) | Déodorant crème sans sels d'aluminium | src/data/products.ts, h1 | ☐ Validé | ☐ À modifier : |
| Déodorant : titre dans Google | Déodorant crème sans aluminium, fabriqué au Maroc \| OTAGE | src/data/products.ts, metaTitle | ☐ Validé | ☐ À modifier : |
| Déodorant : description dans Google (et JSON-LD) | Déodorant crème OTAGE N°06 : sans sels d'aluminium, 5 ingrédients. Offre 2 + 1, paiement à la livraison partout au Maroc. | src/data/products.ts, metaDescription | ☐ Validé | ☐ À modifier : |
| Déodorant : « Pour qui ? » | Pour celles et ceux qui veulent un déodorant sans sels d'aluminium, qui agit sur les odeurs sans bloquer la transpiration. | src/data/products.ts, forWho | ☐ Validé | ☐ À modifier : |
| Déodorant : FAQ « Comment utiliser le déodorant crème ? » | Prends un peu de baume du bout du doigt, laisse-le fondre puis applique-le sur l'aisselle propre et sèche. À utiliser le matin. | src/data/faq.ts (réponse générée) et products.ts | ☐ Validé | ☐ À modifier : |
| Déodorant : FAQ « Que contient le déodorant crème ? » | Oxyde de zinc, Huile de coco, Huile de jojoba, Cire d'abeille, Vitamine E. | src/data/faq.ts (réponse générée) et products.ts | ☐ Validé | ☐ À modifier : |
| Déodorant : FAQ « Quelle contenance et quel prix ? » | 50 ml. Il coûte 85 DH, ou 57 DH le pot avec l'offre 2 + 1 (170 DH les 3). Livraison : de 35 à 45 DH selon la ville. | src/data/faq.ts (réponse générée) et products.ts | ☐ Validé | ☐ À modifier : |
| Déodorant : FAQ « Est-ce qu'il bloque la transpiration ? » | Non. Sans sels d'aluminium, il ne bloque pas la transpiration : il agit sur les odeurs. Transpirer est normal. | src/data/faq.ts (réponse générée) et products.ts | ☐ Validé | ☐ À modifier : |
| Déodorant : FAQ « J'ai la peau sensible » | Fais d'abord un essai sur une petite zone, dans le pli du coude ou derrière l'oreille, et attends 24 h. En cas de rougeur ou d'irritation, arrête et demande conseil à un professionnel. | src/data/faq.ts (réponse générée) et products.ts | ☐ Validé | ☐ À modifier : |
| Déodorant : FAQ « Je suis enceinte ou j'allaite, je peux l'utiliser ? » | Demande d'abord l'avis de ton médecin ou de ton pharmacien, en lui montrant la liste des ingrédients. C'est plus sûr. | src/data/faq.ts (réponse générée) et products.ts | ☐ Validé | ☐ À modifier : |
| Déodorant : FAQ « Je suis livrée en combien de temps ? » | Compte 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer ta commande. | src/data/faq.ts (réponse générée) et products.ts | ☐ Validé | ☐ À modifier : |
| Accueil : carte « odeurs » | Des odeurs sous les bras — Déodorant crème, sans aluminium — Nouveau · 85 DH | src/home/text.ts | ☐ Validé | ☐ À modifier : |
| Accueil : résultat « odeurs » | Notre déodorant crème est là. Cinq ingrédients : oxyde de zinc, huile de jojoba, huile de coco, cire d'abeille et vitamine E. 85 DH. Bouton : Commander le déodorant · 85 DH | src/home/text.ts | ☐ Validé | ☐ À modifier : |
| Accueil, « À l'unité » : sous-titre du déodorant | Sans sels d'aluminium | src/home/text.ts, shopPourDeo | ☐ Validé | ☐ À modifier : |
| Fiches : mention sous chaque avis | Chaque peau est différente : ce message raconte l’expérience d’une cliente, pas une promesse de résultat. | src/data/product-pages.ts, reviewNote | ☐ Validé | ☐ À modifier : |
| Fiches : intitulé de l'avis d'Awatef (gel, sérum, crème, écran) | Avis sur la routine complète | src/data/reviews.ts | ☐ Validé | ☐ À modifier : |
| Fiches : titre des questions | Tu te poses la question ? | src/data/product-pages.ts | ☐ Validé | ☐ À modifier : |
| Fiches : case de consentement | J’ai lu et j’accepte les CGV et la politique de retour. | src/data/product-pages.ts | ☐ Validé | ☐ À modifier : |
| Page /soins : chapeau | Une routine anti-taches en 4 soins, un sérum contour des yeux et un déodorant crème. Fabriqués au Maroc, livrés en 24 à 72 h, payés à la livraison. | src/templates/ProductsIndex.tsx | ☐ Validé | ☐ À modifier : |
| Description générale du site (Google, JSON-LD, llms.txt) | Marque marocaine de cosmétique naturelle : gamme anti-taches (gel nettoyant, sérum, crème, écran solaire SPF 50), sérum contour des yeux et déodorant crème, fabriqués au Maroc. | src/data/site.ts, description | ☐ Validé | ☐ À modifier : |
| CGV, article 2 « Produits » : liste générée | Gel nettoyant anti-taches (125 ml ou 200 ml) ; Sérum anti-taches (15 ml ou 30 ml) ; Crème anti-taches (30 ml ou 50 ml) ; Écran solaire SPF 50 (30 ml ou 50 ml) ; Sérum contour des yeux (15 ml) ; Déodorant crème (50 ml) | src/app/(fr)/cgv/page.tsx, depuis products.ts | ☐ Validé | ☐ À modifier : |

## 4. Rôles des ingrédients « [À VALIDER] » des 6 fiches — pharmacien

Textes de la section « L'étiquette, sans filtre », repris des maquettes, où ils étaient marqués « [À VALIDER] ». La mention « Rôles relus par notre pharmacien » reste masquée tant que `site.medicalReview.validated` n'est pas à true.

### N° 01 · Gel nettoyant anti-taches

| Ingrédient | Rôle affiché | Ce que ça change (deuxième ligne) | Validé | À modifier (préciser) |
|---|---|---|---|---|
| Figue de Barbarie (sur l’étiquette) | Un actif marocain, connu pour adoucir et hydrater la peau. | La peau reste douce après le rinçage, sans tiraillement. | ☐ Validé | ☐ À modifier : |
| Louban (sur l’étiquette) | Une résine traditionnelle, utilisée depuis longtemps pour purifier la peau. | Il aide à nettoyer en profondeur, en douceur. | ☐ Validé | ☐ À modifier : |
| Sans sulfate (sur l’étiquette) | Une base lavante douce, sans sulfates agressifs. | La peau est propre, sans être décapée : elle est prête pour le sérum. | ☐ Validé | ☐ À modifier : |

### N° 02 · Sérum anti-taches

| Ingrédient | Rôle affiché | Ce que ça change (deuxième ligne) | Validé | À modifier (préciser) |
|---|---|---|---|---|
| Matcha (sur l’étiquette) | Un thé vert riche en antioxydants, qui protège la peau des agressions du quotidien. | Il aide le teint à retrouver de l’éclat. | ☐ Validé | ☐ À modifier : |
| Calendula (sur l’étiquette) | Une fleur connue pour apaiser les peaux sensibles. | Le sérum reste doux, même appliqué matin et soir. | ☐ Validé | ☐ À modifier : |
| Alpha-arbutine (sur l’étiquette) | L’actif qui cible les taches brunes en limitant la production de mélanine. | C’est lui qui travaille sur les taches, jour après jour. | ☐ Validé | ☐ À modifier : |

### N° 03 · Crème anti-taches

| Ingrédient | Rôle affiché | Ce que ça change (deuxième ligne) | Validé | À modifier (préciser) |
|---|---|---|---|---|
| Niacinamide (sur l’étiquette) | La vitamine B3 : elle aide à unifier le teint et à atténuer l’aspect des taches. | Elle travaille avec le sérum pour un teint plus régulier. | ☐ Validé | ☐ À modifier : |
| Acide hyaluronique (sur l’étiquette) | Il retient l’eau dans la peau pour une hydratation durable. | La peau reste souple et confortable toute la journée. | ☐ Validé | ☐ À modifier : |
| AHA (sur l’étiquette) | Des acides de fruits qui affinent le grain de peau en douceur. | Ils aident la peau à retrouver de l’éclat. Toujours avec un écran solaire le matin. | ☐ Validé | ☐ À modifier : |

### N° 04 · Écran solaire SPF 50

| Ingrédient | Rôle affiché | Ce que ça change (deuxième ligne) | Validé | À modifier (préciser) |
|---|---|---|---|---|
| SPF 50 (sur l’étiquette) | Le plus haut niveau de protection contre les coups de soleil (UVB). | Pour une peau qui a des taches, c’est le minimum recommandé au Maroc. | ☐ Validé | ☐ À modifier : |
| UVA / UVB (sur l’étiquette) | Il protège des deux types de rayons : UVB (coups de soleil) et UVA (taches, vieillissement). | Ce sont surtout les UVA qui font revenir les taches. | ☐ Validé | ☐ À modifier : |
| Le bon geste (chaque matin) | En dernier, après la crème. Renouvelle toutes les 2 heures au soleil. | Sans écran, le sérum et la crème travaillent pour rien. | ☐ Validé | ☐ À modifier : |

### N° 05 · Sérum contour des yeux

| Ingrédient | Rôle affiché | Ce que ça change (deuxième ligne) | Validé | À modifier (préciser) |
|---|---|---|---|---|
| Caféine (sur l’étiquette) | Elle aide à atténuer l’aspect des poches et des cernes. | Le regard paraît moins fatigué. | ☐ Validé | ☐ À modifier : |
| Acide hyaluronique (sur l’étiquette) | Il hydrate la peau fine du contour de l’œil. | La peau est plus lisse, plus repulpée. | ☐ Validé | ☐ À modifier : |
| Aloe vera (sur l’étiquette) | Elle apaise et rafraîchit. | Une sensation de fraîcheur dès l’application. | ☐ Validé | ☐ À modifier : |

### N° 06 · Déodorant crème

| Ingrédient | Rôle affiché | Ce que ça change (deuxième ligne) | Validé | À modifier (préciser) |
|---|---|---|---|---|
| Oxyde de zinc (sur l’étiquette) | Un minéral qui limite le développement des bactéries responsables des odeurs. | L’actif principal : il agit sur l’odeur sans bloquer la transpiration. | ☐ Validé | ☐ À modifier : |
| Huile de coco (sur l’étiquette) | Elle donne au baume sa texture fondante et participe à l’action contre les odeurs. | Elle fond au contact de la peau : l’application est facile. | ☐ Validé | ☐ À modifier : |
| Huile de jojoba (sur l’étiquette) | Elle nourrit et adoucit la peau fine des aisselles. | Pour une peau confortable, même après le rasage. | ☐ Validé | ☐ À modifier : |
| Cire d’abeille (dans le baume) | Elle donne sa tenue au baume et protège la peau. | Sans elle, la crème serait liquide dans le pot. | ☐ Validé | ☐ À modifier : |
| Vitamine E (dans le baume) | Un antioxydant qui protège la formule et la peau. | Elle aide la crème à rester stable dans le temps. | ☐ Validé | ☐ À modifier : |

## 5. Points à trancher (client)

| Point | Situation actuelle | Fichier | Validé | À modifier (préciser) |
|---|---|---|---|---|
| CGV, article 3 « Prix » | Non modifié (consigne). Il cite la gamme et le contour des yeux (185 DH, 123 DH avec l'offre 2 + 1), mais ni le déodorant (85 DH, offre 2 + 1), ni les prix à l'unité des 4 soins de la gamme. | src/app/(fr)/cgv/page.tsx et src/app/(ar)/ar/cgv/page.tsx | ☐ Validé | ☐ À modifier : |
| Commandes gardées hors connexion avant la case CGV | Renvoyées avec cgv: true (les formulaires de l'accueil exigeaient déjà la case avant de les enregistrer). | src/home/islands/offers.js | ☐ Validé | ☐ À modifier : |

