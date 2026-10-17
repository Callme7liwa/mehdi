# Carte thématique : taches brunes du visage

**Statut : préparation. Rien n'est publié, aucun code du site n'est modifié.** Toutes les pages prévues ici restent en noindex (hors sitemap et llms.txt) jusqu'à leur validation par Dr Seddiki El Mehdi, pharmacien.

Relevé du 17 octobre 2026, sur le HTML compilé (`.next/server/app`, build du jour) et sur `src/data/*.ts`. Les mots sont comptés dans le contenu de la page, hors menu, pied de page et scripts. Les requêtes sont des **cibles probables, non mesurées** : à confirmer avec Search Console et un outil de volumes avant d'écrire.

## Règles de rédaction (toutes les pages de cette carte)

1. **Aucune allégation non validée.** Un rôle d'ingrédient ou un bénéfice ne se reprend que s'il est coché « Validé » dans `docs/validation-client.md` (partie 4, rôles des ingrédients ; aujourd'hui aucun ne l'est). Ni chiffre, ni délai, ni pourcentage, ni « cliniquement prouvé ».
2. **Mots interdits : « blanchir », « éclaircir », « تبييض »**, ni leurs dérivés (« blanchissant », « éclaircissant », « تفتيح » également à éviter). Vérifié : aucun texte du site ne les contient aujourd'hui. Vocabulaire à utiliser : atténuer, unifier le teint, limiter le retour des taches.
3. **Pas de promesse de disparition.** Formule déjà en place : « les taches s'atténuent petit à petit, avec régularité et écran solaire ».
4. **Grossesse et allaitement :** toujours renvoyer au médecin ou au pharmacien.
5. **Signature « guide d'un pharmacien »** et mention « Relu par Dr Seddiki… » : affichées seulement après sa relecture effective de la page (même logique que `site.medicalReview`).
6. Les sources médicales citées (OMS, sociétés de dermatologie) doivent être réelles, datées et liées.

---

## 1. Audit du contenu existant

### Pages

| URL | Sujet principal | Requête cible probable | Statut | Mots (contenu) | Liens sortants : contenu / total | Liens entrants : contenu / total |
|---|---|---|---|---:|---:|---:|
| `/` | Gamme anti-taches, offre, commande | routine anti-taches Maroc | index | ≈ 1 765 (dont 92 noms de villes du formulaire) | 18 cibles internes (menus compris) | 7 / 17 |
| `/soins` | Les 6 soins | soins anti-taches Maroc | index | 146 | 7 / 19 | 1 / 17 |
| `/soins/gel-nettoyant` | Gel nettoyant N°01 | gel nettoyant visage sans sulfate | index | 652 | 8 / 13 | 8 / 17 |
| `/soins/serum-anti-taches` | Sérum N°02 (alpha-arbutine) | sérum anti-taches | index | 605 | 9 / 14 | 9 / 17 |
| `/soins/creme-anti-taches` | Crème N°03 (niacinamide) | crème anti-taches | index | 616 | 9 / 14 | 9 / 17 |
| `/soins/ecran-solaire-spf50` | Écran SPF 50 N°04 | écran solaire SPF 50 visage | index | 626 | 9 / 14 | 9 / 17 |
| `/soins/contour-des-yeux` | Sérum contour des yeux N°05 | sérum contour des yeux caféine | index | 499 | 6 / 11 | 7 / 17 |
| `/soins/deodorant-creme` | Déodorant crème N°06 | déodorant crème | index | 513 | 5 / 10 | 6 / 17 |
| `/taches-pigmentaires` | Causes des taches, routine | taches pigmentaires visage | **noindex** | 297 | 8 / 19 | 7 / 15 |
| `/cernes` | Causes des cernes, soin yeux | cernes causes | **noindex** | 274 | 5 / 19 | 4 / 12 |
| `/taches-acne` | Marques brunes post-acné | taches d'acné | **noindex** | 283 | 8 / 19 | 7 / 15 |
| `/melasma-grossesse` | Mélasma, masque de grossesse | masque de grossesse | **noindex** | 306 | 7 / 19 | 6 / 14 |

« Contenu » = liens dans le corps de la page (hors menu et pied de page) ; « total » = toutes les pages internes distinctes liées. Les 4 pages conseils sont en noindex via `site.medicalReview.validated = false` (`src/lib/routes.ts`, `src/templates/ProblemPage.tsx`) ; elles portent un JSON-LD Article + FAQPage. Pages de confiance (avis, à propos, livraison, contact, mentions, CGV) : hors sujet pour cette carte. Les versions `/ar/…` existent et restent en noindex (`site.arIndexable`).

### FAQ

| Où | Questions | Thème | Remarque |
|---|---:|---|---|
| Accueil (`src/data/faq.ts`, JSON-LD FAQPage) | 13 | Commande, routine, résultats, peau sensible, grossesse | 3 questions « peau » seulement ; le reste est transactionnel |
| Fiches produits (`productFaq`) | 3 à 5 par fiche | Prix, usage, + 3 questions communes (peau sensible, grossesse, délai) | Les 3 questions communes sont répétées sur les 6 fiches |
| Pages conseils (`problems.ts`) | 3 à 4 par page | Délais, retour des taches, grossesse | Voir doublons, partie 3 |

### Constats

- **Contenu thématique très mince :** 4 pages conseils de 274 à 306 mots, toutes en noindex. Aujourd'hui, seules les fiches produits et l'accueil peuvent se positionner.
- **Aucun pilier :** les 4 pages conseils sont au même niveau et se lient toutes entre elles (y compris `/cernes`, hors sujet taches).
- **Les fiches produits ne lient pas vers un guide central**, seulement vers les pages conseils de leur champ `problems`.
- **L'accueil a deux cartes vers la même URL** (« Mélasma » et « Grossesse et allaitement » → `/melasma-grossesse`).

---

## 2. Carte thématique

### Vue d'ensemble

| # | Page | Statut | URL proposée | Fiche produit liée |
|---|---|---|---|---|
| P | **Pilier : Taches brunes du visage, le guide d'un pharmacien** | à fusionner (reprend `/taches-pigmentaires`) | `/taches-brunes-visage` | les 4 de la gamme |
| T1 | Mélasma (+ taches hormonales, pilule) | à créer à partir de `/melasma-grossesse` | `/melasma` | sérum, écran |
| T2 | Masque de grossesse | existe (`/melasma-grossesse`, recentrée) | `/masque-de-grossesse` | écran (avec accord du médecin) |
| T3 | Taches post-acné | existe | `/taches-acne` (inchangée) | gel, sérum |
| T4 | Taches solaires | à créer | `/taches-solaires` | écran, sérum |
| T5 | Taches sur peau mate | à créer | `/taches-peau-mate` | gel, écran |
| — | Taches hormonales / pilule | **à fusionner dans T1** | — | — |
| V1 | Le soleil au Maroc toute l'année | à créer | `/soleil-maroc-taches` | écran |
| V2 | Bien appliquer son SPF 50 | à créer | `/appliquer-ecran-solaire` | écran |
| R1 | Routine matin et soir (+ délais) | à créer | `/routine-taches-matin-soir` | les 4 de la gamme |
| — | Combien de temps pour voir un résultat | **à fusionner dans R1** | — | — |
| R2 | Les erreurs qui aggravent les taches | à créer | `/erreurs-taches-visage` | gel, écran |
| R3 | Quand consulter un dermatologue | à créer | `/taches-quand-consulter` | aucune |
| I0 | Les actifs de la routine (hub) | à créer | `/ingredients` | les 4 de la gamme |
| I1 | Alpha-arbutine | à créer | `/ingredients/alpha-arbutine` | sérum |
| I2 | Niacinamide | à créer | `/ingredients/niacinamide` | crème |
| I3 | AHA | à créer | `/ingredients/aha` | crème, écran |

Hors carte : `/cernes` reste une page à part (groupe « contour des yeux ») ; le pilier la cite une fois, pour les cernes bruns.

### Maillage

```
                         Accueil (« Comprendre ta peau »)
                                     │
                    ┌────────── PILIER /taches-brunes-visage ──────────┐
                    │          │            │            │             │
               Types (T1-T5)  Prévention  Traitement   Ingrédients   4 fiches gamme
                    │         (V1, V2)    (R1-R3)      (I0 → I1-I3)
                    └── chaque satellite → pilier + 2 ou 3 satellites voisins + 1 ou 2 fiches
```

Règles :
- Pilier ↔ chaque satellite, dans les deux sens, avec une ancre descriptive (« le mélasma », pas « lire la suite »).
- Chaque satellite lie 2 ou 3 satellites voisins (listés page par page ci-dessous), pas tous.
- Chaque satellite lie **1 ou 2 fiches au maximum**, celles qui répondent au problème traité.
- Chaque fiche de la gamme lie le pilier, plus son ingrédient phare (sérum → I1, crème → I2 et I3).
- Les liens vers une page en noindex sont autorisés (`follow`) mais n'apportent rien tant qu'elle n'est pas indexée.

---

### P. Pilier : Taches brunes du visage, le guide d'un pharmacien

- **Statut :** à fusionner. Reprend et élargit `/taches-pigmentaires` (297 mots), qui devient une redirection 301 vers le pilier. La page n'a jamais été indexée : le changement d'URL ne coûte rien aujourd'hui. Le site dit partout « taches brunes » (bénéfices, fiches) : l'URL suit.
- **URL :** `/taches-brunes-visage`
- **Requête principale :** taches brunes visage
- **Secondaires :** taches pigmentaires visage · hyperpigmentation visage · comment atténuer les taches brunes
- **Questions à couvrir :**
  1. Qu'est-ce qu'une tache brune, et pourquoi la peau fabrique-t-elle trop de mélanine ?
  2. Comment reconnaître son type de taches : mélasma, marques d'acné, taches solaires ?
  3. Pourquoi les taches foncent-elles et reviennent-elles au soleil ?
  4. Quelle routine suivre, et en combien de temps les taches s'atténuent-elles ?
  5. Quand une tache doit-elle être montrée à un dermatologue ?
- **Liens sortants :** T1 à T5, V1, V2, R1, R2, R3, I0 ; fiches gel, sérum, crème, écran.
- **Liens entrants :** accueil (carte « Taches pigmentaires » renommée), tous les satellites, les 4 fiches de la gamme.

### T1. Mélasma

- **Statut :** à créer, en reprenant la partie générale de `/melasma-grossesse` (causes, rôle du soleil, « après la grossesse »). Inclut les **taches hormonales et la pilule** : c'est le même phénomène ; une page séparée se cannibaliserait avec celle-ci.
- **URL :** `/melasma`
- **Requête principale :** mélasma visage
- **Secondaires :** mélasma causes · taches hormonales visage · taches pilule contraceptive
- **Questions :**
  1. Comment distinguer le mélasma des autres taches (symétrie, front, joues, lèvre supérieure) ?
  2. Pourquoi les hormones (pilule, grossesse) le déclenchent-elles ?
  3. Faut-il arrêter sa pilule ? (réponse : en parler à son médecin, ne jamais arrêter seule)
  4. Pourquoi revient-il si vite après le soleil ?
  5. Peut-on le faire disparaître ? Que peut proposer un dermatologue ?
- **Liens :** pilier ; T2, T5, V1 ; fiches sérum, écran.

### T2. Masque de grossesse

- **Statut :** existe (`/melasma-grossesse`), recentré sur la grossesse et l'allaitement ; URL changée (301), la partie générale part dans T1. L'accueil a déjà une carte « Grossesse et allaitement » qui trouve ainsi sa propre page.
- **URL :** `/masque-de-grossesse`
- **Requête principale :** masque de grossesse
- **Secondaires :** taches de grossesse visage · soins visage enceinte · écran solaire enceinte
- **Questions :**
  1. Pourquoi des taches apparaissent-elles pendant la grossesse ?
  2. Le masque part-il après l'accouchement ?
  3. Quels soins éviter enceinte ou allaitante ? (rétinoïdes, hydroquinone : déjà dans le texte actuel, à faire confirmer)
  4. Peut-on mettre de l'écran solaire enceinte ?
  5. Que montrer à son médecin avant d'utiliser un soin ?
- **Liens :** pilier ; T1, V1, R3 ; fiche écran, avec la mention « avec l'accord de ton médecin ».

### T3. Taches post-acné

- **Statut :** existe (`/taches-acne`, 283 mots), à enrichir.
- **URL :** `/taches-acne` (inchangée)
- **Requête principale :** taches d'acné
- **Secondaires :** marques de boutons visage · taches brunes après bouton · hyperpigmentation post-inflammatoire
- **Questions :**
  1. Tache ou cicatrice : comment faire la différence ?
  2. Pourquoi percer un bouton laisse-t-il une marque plus foncée ?
  3. Les marques partent-elles toutes seules ?
  4. Peut-on suivre une routine anti-taches avec des boutons actifs ?
  5. Pourquoi les marques durent-elles plus sur peau mate ?
- **Liens :** pilier ; T5, R2, R3 ; fiches gel, sérum.

### T4. Taches solaires

- **Statut :** à créer (aujourd'hui une ligne dans `/taches-pigmentaires` : « L'âge : le soleil accumulé… »).
- **URL :** `/taches-solaires`
- **Requête principale :** taches solaires visage
- **Secondaires :** taches de soleil visage · lentigo solaire · taches brunes avec l'âge
- **Questions :**
  1. À quoi ressemble une tache solaire ?
  2. Pourquoi apparaissent-elles avec les années ?
  3. Tache solaire ou grain de beauté : quels signes doivent alerter ?
  4. Comment éviter qu'elles foncent ou que d'autres apparaissent ?
  5. S'atténuent-elles avec une routine ?
- **Liens :** pilier ; V1, V2, R3 ; fiches écran, sérum.

### T5. Taches sur peau mate

- **Statut :** à créer.
- **URL :** `/taches-peau-mate`
- **Requête principale :** taches peau mate visage
- **Secondaires :** hyperpigmentation peau mate · taches peau foncée visage · teint irrégulier peau mate
- **Questions :**
  1. Pourquoi les peaux mates marquent-elles plus facilement ?
  2. Quelles taches sont les plus fréquentes sur peau mate (marques d'acné, mélasma) ?
  3. Pourquoi les produits irritants et les gommages foncent-ils la peau mate ?
  4. Faut-il un écran solaire quand on a la peau mate ?
  5. Quand consulter ?
- **Liens :** pilier ; T1, T3, R2 ; fiches gel, écran.
- **Attention :** ne rien affirmer sur la texture ou l'absence de traces blanches de notre écran (non validé).

### V1. Le soleil au Maroc, toute l'année

- **Statut :** à créer.
- **URL :** `/soleil-maroc-taches`
- **Requête principale :** écran solaire toute l'année
- **Secondaires :** écran solaire en hiver · UV au Maroc · écran solaire à l'intérieur
- **Questions :**
  1. Faut-il un écran solaire en hiver ou par temps nuageux ?
  2. Les UVA traversent-ils les vitres (maison, bureau, voiture) ?
  3. À quelles heures le soleil est-il le plus fort ?
  4. Chapeau, ombre, lunettes : qu'est-ce qui complète l'écran ?
  5. Plage, été, trajets quotidiens : qu'est-ce qui change ?
- **Liens :** pilier ; V2, T1, T4 ; fiche écran.
- **Attention :** un indice UV ou un chiffre sur le Maroc doit venir d'une source citée (OMS, Direction générale de la météorologie).

### V2. Bien appliquer son SPF 50

- **Statut :** à créer.
- **URL :** `/appliquer-ecran-solaire`
- **Requête principale :** comment appliquer écran solaire visage
- **Secondaires :** quelle quantité d'écran solaire visage · renouveler écran solaire · écran solaire avant ou après la crème
- **Questions :**
  1. Quelle quantité mettre sur le visage ? (règle de quantité à valider par le pharmacien)
  2. Dans quel ordre : après la crème, en dernier ? (déjà la règle du site)
  3. Toutes les combien de temps le renouveler ? (« toutes les 2 heures au soleil » : déjà sur la fiche)
  4. Peut-on se maquiller par-dessus ?
  5. Que veut dire « SPF 50 » et « UVA/UVB » ?
- **Liens :** pilier ; V1, R1 ; fiche écran.

### R1. Routine matin et soir

- **Statut :** à créer. Absorbe « **combien de temps pour voir un résultat** » : aucun délai n'est validé, la réponse honnête tient en un paragraphe (« pas en quelques jours, petit à petit, avec régularité et écran ») et existe déjà à 3 endroits. Une page dédiée serait mince et pousserait à écrire des délais non prouvés.
- **URL :** `/routine-taches-matin-soir`
- **Requête principale :** routine visage taches brunes
- **Secondaires :** ordre des soins visage · routine du soir taches · sérum avant ou après crème
- **Questions :**
  1. Dans quel ordre appliquer les soins le matin ?
  2. Pourquoi pas d'écran le soir ?
  3. En combien de temps voit-on un résultat ? (sans chiffre)
  4. Que faire si on oublie un jour, ou si la peau picote ?
  5. Peut-on ajouter d'autres soins à la routine ?
- **Liens :** pilier ; V2, R2, I0 ; fiches sérum, crème (les 4 étapes nommées, une seule fiche mise en avant par étape).

### R2. Les erreurs qui aggravent les taches

- **Statut :** à créer.
- **URL :** `/erreurs-taches-visage`
- **Requête principale :** citron sur les taches
- **Secondaires :** gommage taches brunes · remèdes maison taches visage · crème taches dangereuse
- **Questions :**
  1. Pourquoi le citron sur la peau est-il une mauvaise idée ?
  2. Les gommages font-ils partir les taches ?
  3. Quels produits vendus sans contrôle sont dangereux (hydroquinone sans ordonnance, corticoïdes, mercure) ?
  4. Pourquoi percer ou gratter fonce-t-il les marques ?
  5. Pourquoi oublier l'écran annule-t-il les efforts ?
- **Liens :** pilier ; T3, T5, R3 ; fiches gel, écran.
- **Problème à trancher :** la requête la plus recherchée sur ce sujet contient le mot interdit (« crème blanchissante danger », « كريم تبييض »). Avec la règle actuelle, on ne la cible pas ; on parle de « crèmes vendues sans contrôle » ou « produits dépigmentants non autorisés ». « Dépigmentant » est à faire valider par Dr Seddiki.

### R3. Quand consulter un dermatologue

- **Statut :** à créer. Les encadrés « Quand consulter ? » des pages existantes restent courts et lient vers elle.
- **URL :** `/taches-quand-consulter`
- **Requête principale :** tache brune visage quand consulter
- **Secondaires :** tache qui change de couleur · tache brune qui grossit · dermatologue taches visage
- **Questions :**
  1. Quels changements d'une tache doivent alerter (forme, couleur, taille, saignement, démangeaison) ?
  2. Mélasma étendu ou ancien : que peut faire un dermatologue ?
  3. Acné active : pourquoi la traiter d'abord ?
  4. Enceinte : qui consulter avant tout soin ?
  5. Que préparer pour la consultation (photos, liste de ses produits) ?
- **Liens :** pilier ; T1, T3, T4 ; aucune fiche produit (page de sécurité, pas de vente).

### Ingrédients

Seuls les actifs de `src/data/products.ts` sont retenus. Pages dédiées pour les trois actifs « taches » qui ont une vraie demande de recherche ; les autres vont dans le hub.

| Actif (products.ts) | Soin | Traitement | Pourquoi |
|---|---|---|---|
| Alpha-arbutine | Sérum N°02 | **page I1** | actif taches, forte recherche |
| Niacinamide | Crème N°03 | **page I2** | actif taches, forte recherche |
| AHA | Crème N°03 | **page I3** | lien direct avec l'écran solaire (sensibilité au soleil) |
| Acide hyaluronique | Crème N°03 | section du hub I0 | hydratation, pas les taches |
| Matcha, calendula | Sérum N°02 | section du hub I0 | rôle de soutien |
| Figue de Barbarie, louban | Gel N°01 | section du hub I0 | angle marocain ; **ne pas cibler « huile de figue de Barbarie »** (notre soin est un gel nettoyant : intention différente) |
| « Sans sulfate », « SPF 50 », « UVA/UVB » | Gel, écran | section du hub I0 | ce sont des caractéristiques, pas des actifs |
| Caféine, aloe vera | Contour des yeux | hors carte | groupe « cernes » |
| Oxyde de zinc, huiles, cire, vitamine E | Déodorant | hors carte | hors sujet |

**Prérequis pour toutes les pages ingrédients :** la liste INCI complète de chaque soin, et la nature exacte des « AHA » (acide glycolique ? lactique ?). Aucune concentration n'est connue : n'en citer aucune.

#### I0. Les actifs de la routine (hub)

- **URL :** `/ingredients`
- **Requête principale :** ingrédients anti-taches
- **Secondaires :** actifs anti-taches visage · quel actif contre les taches · ingrédients soins visage marocains
- **Questions :** 1. Quels actifs agissent sur les taches, lesquels hydratent ou protègent ? 2. Que contient chaque soin de la routine ? 3. Peut-on associer alpha-arbutine, niacinamide et AHA ? 4. Que veut dire « sans sulfate » ? 5. Figue de Barbarie et louban : que font-ils dans un nettoyant ?
- **Liens :** pilier ; I1, I2, I3, R1 ; les 4 fiches de la gamme.

#### I1. Alpha-arbutine

- **URL :** `/ingredients/alpha-arbutine`
- **Requête principale :** alpha-arbutine
- **Secondaires :** alpha-arbutine bienfaits · alpha-arbutine et niacinamide · alpha-arbutine grossesse
- **Questions :** 1. Qu'est-ce que l'alpha-arbutine ? 2. Comment agit-elle sur la mélanine ? (rôle à valider, partie 4) 3. Matin, soir, ou les deux ? 4. Avec quoi l'associer ? 5. Précautions : peau sensible, grossesse.
- **Liens :** I0, pilier, I2, T1 ; fiche sérum.

#### I2. Niacinamide

- **URL :** `/ingredients/niacinamide`
- **Requête principale :** niacinamide
- **Secondaires :** niacinamide taches · niacinamide bienfaits peau · niacinamide et alpha-arbutine
- **Questions :** 1. Qu'est-ce que la niacinamide (vitamine B3) ? 2. Que fait-elle sur un teint irrégulier ? 3. Convient-elle aux peaux sensibles ? 4. Peut-on l'utiliser matin et soir ? 5. Avec quels actifs l'associer ?
- **Liens :** I0, pilier, I1, T3 ; fiche crème.

#### I3. AHA

- **URL :** `/ingredients/aha`
- **Requête principale :** AHA visage
- **Secondaires :** acides de fruits peau · AHA et soleil · AHA peau sensible
- **Questions :** 1. Que sont les AHA ? 2. Pourquoi un écran solaire est-il indispensable avec des AHA ? 3. Picotements : normal ou signe d'arrêter ? 4. AHA et peau sensible ou mate ? 5. Faut-il éviter d'autres exfoliants en même temps ?
- **Liens :** I0, pilier, V2, R2 ; fiches crème, écran.

---

## 3. Doublons et cannibalisations

### Entre pages existantes

| Doublon | Où | Proposition |
|---|---|---|
| « Faut-il de l'écran solaire quand il n'y a pas de soleil ? » : même question, même réponse | `/taches-pigmentaires` (FAQ) et fiche écran (`extraFaq`) | Garder sur la fiche ; la page conseil (puis V1) développe et lie. Une question en JSON-LD FAQPage sur une seule page. |
| « Je suis enceinte ou j'allaite… » : même réponse | accueil, les 6 fiches, `/cernes`, `/melasma-grossesse` | Garder la réponse courte partout (sécurité) ; T2 devient la page de référence, liée depuis cette réponse. |
| « Peut-on le mettre sous le maquillage ? » : texte identique | `/cernes` et fiche contour des yeux | Retirer de `/cernes`. |
| « Combien de temps / quand voir des résultats ? » | accueil, `/taches-pigmentaires`, fiches (frise « Résultats » + question) | Une seule formulation, développée dans R1. |
| « Peau sensible : test de 24 h » | accueil, 6 fiches, `/taches-pigmentaires` | Utile partout ; pas de JSON-LD FAQ en double hors accueil et fiches. |
| Encadré « Quand consulter un dermatologue ? » (H2 identique) | 3 pages conseils | Garder des encadrés courts et propres à chaque page, liés vers R3. |
| Deux cartes de l'accueil vers `/melasma-grossesse` | `src/home/sections/Conseils.tsx` | Une carte vers T1, une vers T2. |
| `/cernes` liée depuis les pages taches (bloc « autres conseils ») | `/taches-pigmentaires`, `/taches-acne`, `/melasma-grossesse` | Retirer : hors sujet ; le pilier la cite une fois. |

### Entre pages existantes et pages prévues

| Risque | Pages | Niveau | Comment l'éviter |
|---|---|---|---|
| Même sujet | `/taches-pigmentaires` ↔ Pilier | **fort** | Fusion : 301 de `/taches-pigmentaires` vers `/taches-brunes-visage`. |
| Même sujet | `/melasma-grossesse` ↔ T1 Mélasma ↔ « taches hormonales/pilule » | **fort** | Scission : général → T1 (avec hormones et pilule), grossesse → T2 ; pas de page « hormones ». |
| « routine anti-taches » | Accueil (title « Routine anti-taches fabriquée au Maroc ») ↔ R1 | **fort** | L'accueil garde l'intention d'achat (« routine anti-taches », prix, gamme). R1 vise l'intention d'information (« dans quel ordre », « matin et soir ») ; son title ne contient pas « routine anti-taches », elle lie l'accueil avec cette ancre. |
| « écran solaire SPF 50 » | Fiche écran ↔ V2 | moyen | La fiche garde « écran solaire SPF 50 Maroc » (achat). V2 vise « comment appliquer », sans « SPF 50 » en tête du title. |
| « sérum alpha-arbutine » | Fiche sérum (title « Sérum anti-taches à l'alpha-arbutine ») ↔ I1 | moyen | I1 vise « alpha-arbutine : c'est quoi » ; une seule mention du sérum, avec lien. |
| « crème niacinamide » | Fiche crème ↔ I2 | moyen | Idem I1. |
| Soleil | V1 ↔ V2 ↔ T4 | moyen | V1 = quand se protéger (hiver, vitres, heures) ; V2 = comment appliquer ; T4 = le type de tache. Si V1 ne dépasse pas ≈ 600 mots uniques, la fusionner dans V2. |
| Délais de résultat | R1 ↔ pilier ↔ fiches | moyen | Une réponse de référence dans R1 ; les autres pages renvoient. |
| Peau mate | T5 ↔ T1 ↔ T3 | faible | T5 garde l'angle « peau mate » ; mélasma et acné y sont résumés en 2 lignes avec lien. |

---

## 4. Avant de publier quoi que ce soit

1. **Validation par Dr Seddiki**, page par page : texte, allégations, sources. Le drapeau actuel `site.medicalReview` vaut pour les 4 pages conseils à la fois : il faudra un drapeau par page pour indexer au fil des validations (évolution du code, à faire plus tard).
2. **Rôles des ingrédients** (partie 4 de `docs/validation-client.md`) cochés avant d'écrire I0 à I3.
3. **Liste INCI** et nature des AHA, fournies par le client.
4. **Décision sur les mots interdits** pour R2 (« dépigmentant » accepté ou non).
5. **Redirections 301** (`/taches-pigmentaires`, `/melasma-grossesse`) et mise à jour des liens internes (`products.ts` → `problems`, `pages.ts`, `Conseils.tsx`) au moment de la mise en ligne, pas avant.
6. **Arabe :** même carte, traduite et relue par un natif ; requêtes à étudier (الكلف، بقع الوجه، التصبغات) sans « تبييض » ni « تفتيح ».
7. Ordre d'écriture conseillé : pilier, T1, T3, R1, V2, R2, R3, puis T2, T4, T5, V1, ingrédients.
