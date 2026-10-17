# Lot 2 : plan technique, doublons et suite

> BRIEF (non publié) · document de travail pour l'équipe, pas pour la relecture médicale. Rien de ce qui suit n'est codé.

## 1. Données structurées prévues (toutes les pages du lot)

- **Article** : headline = H1 ; author = Organization OTAGE (@id https://otage.ma/#organization) ; reviewedBy = Person Dr Seddiki El Mehdi (@id https://otage.ma/#founder, url /dr-seddiki-el-mehdi) ; datePublished = date de mise en ligne (champ `published`) ; dateModified = src/data/updated.ts ; image ; inLanguage fr-MA ; about = entités de la page (voir chaque brief, nom exact : mélasma, hyperpigmentation post-inflammatoire, lentigo solaire, rayonnement ultraviolet…).
- **WebPage** : reviewedBy + lastReviewed (déjà en place pour le pilier).
- **FAQPage** : conservé pour que les assistants IA lisent les questions-réponses ; aucun résultat enrichi attendu de Google.
- **BreadcrumbList** : Accueil > Conseils peau > page.
- **Pas de HowTo** (Google ne l'affiche plus), y compris sur /appliquer-ecran-solaire.
- **Page auteur /dr-seddiki-el-mehdi** : ProfilePage + Person (name, jobTitle, alumniOf, worksFor, knowsAbout, sameAs, image), même @id que le fondateur dans tout le site.
- **Lien « Relu par »** : sur chaque page relue (conseils et fiches), le nom du relecteur devient un lien vers /dr-seddiki-el-mehdi.

## 2. Mesure (à coder plus tard)

Événement dataLayer **`clic_conseil_vers_fiche`**, envoyé seulement si l'accord de mesure a été donné (comme les autres événements du site) :

| Paramètre | Exemple | Remarque |
|---|---|---|
| event | clic_conseil_vers_fiche | |
| page_source | /taches-peau-mate | chemin seul, sans paramètres |
| fiche_cible | /soins/ecran-solaire-spf50 | chemin seul |
| emplacement | texte, encadre_solution, faq | optionnel |

Aucune donnée personnelle. À ajouter dans scripts/check-datalayer.mjs le jour où il est codé.

## 3. Publication et liens en attente

- Dans les brouillons, tout lien vers une page pas encore publiée porte la marque **[LIEN EN ATTENTE]**, juste après le lien.
- `npm run check:renvois -- --brouillons` vérifie que chaque lien vers une page absente porte la marque, et que la marque n'est pas laissée sur une page publiée.
- `npm run check:renvois -- --publier docs/brouillons/<page>.md` affiche le texte prêt à publier : une phrase de renvoi (« Tout savoir : … », « Plus de détails : … ») dont le lien est en attente est retirée entière ; ailleurs, le lien en attente devient du texte simple. Les marques [À VALIDER] et [SOURCE À TROUVER] restent : la page ne se publie qu'une fois ces marques traitées.

## 4. Doublons de FAQ vérifiés

Chaque FAQ du lot 2 a été comparée à src/data/faq.ts (accueil), productFaq (fiches), problems.ts (pilier, cernes, acné, mélasma) et aux brouillons du lot 1. Aucune question identique. Questions proches, gardées car l'angle diffère :

| Question du lot 2 | Proche de | Pourquoi on garde |
|---|---|---|
| V1 « Faut-il de l'écran pour rester à la maison ? » | Pilier « Faut-il de l'écran solaire en hiver ? » ; fiche écran « … quand il n'y a pas de soleil ? » | Angle « fenêtre / intérieur », appuyé sur Tuchinda 2006 |
| T2 « Mon gel ou ma crème anti-taches habituelle : je continue ? » | Accueil et fiches « Je suis enceinte ou j'allaite, je peux l'utiliser ? » | Même réponse de sécurité, angle « soins déjà utilisés » ; à fusionner si Dr Seddiki préfère |
| T5 « Les peaux mates ont-elles moins de risques avec le soleil ? » | Pilier « Une peau mate a-t-elle besoin d'écran solaire ? » | Angle « risque », pas « besoin » |
| C1 « Peut-on utiliser une crème anti-taches et un écran solaire en même temps ? » | Routine (lot 1) « Le sérum avant ou après la crème ? » | Ordre crème / écran, pas sérum / crème |

## 5. Chevauchements restants (anti-cannibalisation)

- **V1 / V2 / T4** : séparation tenue (V1 = quand et où, V2 = comment, T4 = type de tache). V1 compte 639 mots utiles hors blocs « Au Maroc » et « L'avis du pharmacien » (729 avec) : gardée comme page séparée. Si la relecture retire plus de 40 mots sourcés, elle passe sous 600 : la fusionner alors dans V2.
- **T2 / mélasma (lot 1)** : la carte prévoit la scission de /melasma-grossesse en /melasma et /masque-de-grossesse. Tant que /melasma n'est pas publiée, le pilier pointe vers /melasma-grossesse.
- **C1 / fiches sérum et crème** : C1 nomme les actifs sans développer leurs effets (réservés aux futures pages ingrédients, en attente de la liste INCI) ; la routine OTAGE y est présentée comme une option parmi d'autres.
- **R1 (routine, lot 1) / accueil** : inchangé depuis la carte ; R1 vise « ordre des soins », l'accueil « routine anti-taches ».

## 6. Deux clusters suivants (proposition courte)

### Contour des yeux

| Page | Statut | URL | Requête principale | Fiche |
|---|---|---|---|---|
| Pilier : les cernes | existe (/cernes, noindex) | /cernes | cernes causes | contour des yeux |
| Cernes bruns (pigmentaires) | à créer | /cernes-bruns | cernes marron | contour des yeux, écran |
| Poches sous les yeux | à créer | /poches-sous-les-yeux | poches sous les yeux | contour des yeux |
| Cernes et sommeil, écrans | à créer, à fusionner dans le pilier si mince | /cernes-fatigue | cernes fatigue | — |
| Appliquer un soin contour des yeux | à créer | /appliquer-contour-des-yeux | comment appliquer contour des yeux | contour des yeux |

Points d'attention : aucune promesse sur les poches (souvent anatomiques) ; « caféine » et « acide hyaluronique » seulement avec rôles validés (partie 4 de validation-client.md) ; quand consulter (cerne d'un seul côté, gonflement soudain).

### Déodorant

| Page | Statut | URL | Requête principale | Fiche |
|---|---|---|---|---|
| Pilier : transpiration et odeurs | à créer | /transpiration-odeurs | odeur transpiration | déodorant crème |
| Déodorant ou anti-transpirant | à créer | /deodorant-ou-antitranspirant | différence déodorant anti-transpirant | déodorant crème |
| Sans aluminium | **bloquée** tant que l'allégation n'est pas validée (validation-client.md) | /deodorant-sans-aluminium | déodorant sans aluminium | — |
| Transpiration excessive : quand consulter | à créer | /transpiration-excessive | transpiration excessive | aucune |
| Appliquer un déodorant crème | à créer | /appliquer-deodorant-creme | comment utiliser déodorant crème | déodorant crème |

Points d'attention : « ne bloque pas la transpiration », « 5 ingrédients », « sans aluminium » sont des allégations encore à valider ; page « transpiration excessive » sans vente.
