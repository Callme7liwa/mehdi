# Contenu v3 : audit et nouveaux textes (FR)

**Statut : proposition, en attente de validation.** Aucun texte du site n'a été modifié. Branche `contenu-v3`, rien en ligne.

Étape 1 (audit) et étape 2 (proposition) de la mission « contenu court, précis, orienté achat ». L'étape 3 (application FR puis AR, un commit par page) ne commencera qu'après ton accord sur ce document et sur les décisions ci-dessous.

**Comment lire.** Les mots sont comptés sur le HTML servi, sans JavaScript (ce que lisent Google et les IA), section par section, hors en-tête, pied de page et ticket de commande. « Après » = le même comptage une fois les textes proposés appliqués ; les libellés d'interface non modifiés (prix, formats, champs du formulaire, 92 villes) restent comptés. Chaque nouveau texte a été contrôlé automatiquement : phrases de 15 mots max, paragraphes de 2 phrases max, réponses de FAQ de 40 mots max, title ≤ 60 caractères, meta de 140 à 155 caractères, aucun mot interdit.

## Décisions à prendre avant l'étape 3

1. **Fiches produits : 3 blocs nouveaux** (« Pour qui ? », « Comment l'utiliser ? », « Combien de temps pour voir des résultats ? »). La nouvelle maquette ne les a pas. Je propose une section de plus entre « L'étiquette » et « Avis », avec les styles qui existent déjà (numéro de chapitre, grand titre, liste). Sans cette section, ils ne peuvent aller que dans la FAQ (pas de H2, et la fiche reste sans lien vers les guides). **Recommandé : la nouvelle section.**
2. **Fiches produits : tuiles d'avantages.** Aujourd'hui elles répètent les actifs. Je propose : bénéfice principal, « Livré en 24 à 72 h », « Payé à la livraison », « Retour 7 jours », prix. Il faut 3 icônes de plus (camion, billet, retour), dessinées comme les autres.
3. **Cartes produits (accueil « À l'unité » et /soins) : une ligne d'actifs en plus**, et sur /soins le prix et un bouton nommé (« Voir le sérum anti-taches »). C'est du texte dans les cartes existantes.
4. **Bouton principal avec le prix.** Pages intérieures : « Commander · dès 299 DH » dans l'en-tête fixe (sur la page Cernes : « Commander · 185 DH », vers la fiche contour des yeux). Accueil : barre fixe mobile « Commander · 299 DH ». Fiches : déjà le cas.
5. **Pages conseils.** Leurs textes sont médicaux et la relecture du pharmacien n'est pas faite (`site.medicalReview` = false, pages hors index en attendant). Les réécrire maintenant veut dire : relecture du pharmacien sur la nouvelle version. **D'accord pour réécrire avant sa relecture ?**
6. **Citation du fondateur (À propos).** Je propose une version courte ; ce sont ses mots, il doit la valider. Sinon, on garde la citation telle quelle (exception aux règles d'écriture).
7. **Déodorant : H1 « Déodorant crème sans aluminium »** seulement si l'allégation « sans aluminium » est validée (elle est dans la liste « À valider »). Sinon : « Déodorant crème ».
8. **« Cosmétique naturelle »** (À propos, pied de page de l'accueil, description du site, llms.txt) : c'est une allégation de naturalité, comme « 100 % naturel ». **Je propose de la retirer partout** en attendant la validation du client.
9. **Hero de l'accueil : retrait du bouton « Trouver mon soin »** (la section suivante sert à ça) pour tenir le budget de 25 mots et un seul bouton.
10. **Contraste (accessibilité).** Lighthouse donne 97 en accessibilité sur les fiches (numéros « 01 » et mention « sur l'étiquette » trop pâles sur fond bordeaux). Pour atteindre 100, il faut foncer un peu ces deux textes : c'est une retouche de couleur, pas de mise en page. **D'accord ?**

## Synthèse : mots par page, avant et après

| Page | Mots avant | Mots après | Écart | Title (car.) avant → après | Meta (car.) avant → après |
|---|---:|---:|---:|---|---|
| Accueil (`/`) | 1521 | 1107 | -414 (-27 %) | 65 → 58 | 155 → 145 |
| Tous les soins (`/soins`) | 155 | 164 | +9 (6 %) | 56 → 56 | 180 → 142 |
| Fiche : Gel nettoyant anti-taches (`/soins/gel-nettoyant`) | 664 | 582 | -82 (-12 %) | 56 → 46 | 158 → 145 |
| Fiche : Sérum anti-taches (`/soins/serum-anti-taches`) | 614 | 525 | -89 (-14 %) | 50 → 44 | 158 → 150 |
| Fiche : Crème anti-taches (`/soins/creme-anti-taches`) | 609 | 535 | -74 (-12 %) | 48 → 42 | 158 → 145 |
| Fiche : Écran solaire SPF 50 (`/soins/ecran-solaire-spf50`) | 646 | 537 | -109 (-17 %) | 59 → 40 | 157 → 147 |
| Fiche : Sérum contour des yeux (`/soins/contour-des-yeux`) | 434 | 411 | -23 (-5 %) | 60 → 43 | 158 → 144 |
| Fiche : Déodorant crème (`/soins/deodorant-creme`) | 534 | 438 | -96 (-18 %) | 57 → 53 | 121 → 146 |
| Conseils : taches pigmentaires (`/taches-pigmentaires`) | 723 | 386 | -337 (-47 %) | 57 → 47 | 146 → 143 |
| Conseils : cernes (`/cernes`) | 480 | 302 | -178 (-37 %) | 58 → 48 | 141 → 151 |
| Conseils : taches d'acné (`/taches-acne`) | 593 | 337 | -256 (-43 %) | 51 → 52 | 149 → 150 |
| Conseils : mélasma et grossesse (`/melasma-grossesse`) | 628 | 320 | -308 (-49 %) | 58 → 52 | 153 → 153 |
| Avis (`/avis`) | 219 | 209 | -10 (-5 %) | 49 → 46 | 142 → 144 |
| À propos (`/a-propos`) | 363 | 210 | -153 (-42 %) | 60 → 48 | 153 → 144 |
| Livraison et paiement (`/livraison-paiement`) | 535 | 300 | -235 (-44 %) | 53 → 52 | 141 → 141 |
| Contact (`/contact`) | 107 | 86 | -21 (-20 %) | 47 → 47 | 133 → 145 |
| **Total (16 pages)** | **8825** | **6449** | **-2376 (-27 %)** | | |

Les fiches produits perdent peu de mots, ou en gagnent : elles reçoivent les blocs demandés (« Pour qui », « Comment l'utiliser », « Résultats »), qui manquent aujourd'hui. Le gain vient de la FAQ, raccourcie et sans doublons.

## Étape 1 : audit, page par page

### Accueil (`/`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| Bandeau de preuve (au-dessus du titre) | 11 | Utile : un chiffre et sa source. | Inchangé. | 11 |
| Hero (H1) | 44 | Deux boutons, et le prix répété 2 fois (bouton + ligne « Gamme complète dès 299 DH »). Aucune phrase ne dit ce que font les soins. | Surtitre + H1 + 1 phrase + 1 bouton (24 mots). « Trouver mon soin » retiré : la section suivante sert à ça. Libellés de l'animation (Matin, Soir, étapes 01 à 04) et devise en darija inchangés. | 42 |
| « Qu'est-ce qui te gêne ? » (diagnostic) | 49 | Intro qui répète les 3 cartes juste en dessous. | Intro raccourcie ; cartes inchangées. | 46 |
| « L'offre à ne pas rater. » (offre gamme et formulaire) | 320 | Titre sans mot-clé. Prix et « livraison offerte » déjà dans le hero. « Ton ticket s'écrit en direct… » est creux. « Tu hésites ? Avis, résultats, ou parle au fondateur » apparaît 2 fois. Les 92 noms de villes (aide à la saisie) et les libellés du formulaire sont fonctionnels. | Titre avec mot-clé, intro de 11 mots, lien « Tu hésites ? » une seule fois. Sous le bouton « Valider », les 3 objections en une ligne. | 315 |
| « Un seul soin te suffit ? » (achat à l'unité) | 161 | 3 phrases d'intro pour une seule info (les frais). Les cartes n'affichent pas les actifs : la cliente ne sait pas ce qu'il y a dedans. | C'est ici, et seulement ici, que les 6 soins sont décrits sur l'accueil. Chaque carte : nom, bénéfice (8 mots max), 3 actifs, prix, bouton. | 205 |
| Résultats du diagnostic (taches, cernes, odeurs) | 55 (+137 masqués) | « La fiche de chaque soin donne sa contenance, son prix et son mode d'emploi » ne sert pas. Carte cernes : le prix est écrit 2 fois (ligne « Prix » et ligne « Offre 2 + 1 »). | 1 phrase par résultat. Ligne « Prix » de la carte cernes retirée (l'offre reste juste en dessous). | 7 |
| « On l'affiche partout. » (affiches) | 75 | Intro de 2 phrases pour un geste évident. Liens « Voir le soin » répétés 8 fois, sans dire quel soin. | Intro de 7 mots. Nom accessible de chaque lien : « Voir le sérum anti-taches », etc. (même affichage). | 71 |
| « Comprendre ta peau. » (conseils) | 51 | Court et utile. Les liens « Lire » ne disent pas où ils mènent. | Inchangé ; nom accessible des liens = titre du guide (« Lire : les taches pigmentaires »). | 51 |
| « Les questions qu'on nous pose. » (FAQ) | 730 | 17 questions. Le prix de la gamme et l'offre 2 + 1 sont expliqués 3 fois. Les actifs, le contour des yeux et l'écran solaire y sont décrits alors qu'ils ont leur fiche. Réponses de 20 à 55 mots qui ne commencent pas par la réponse. | 13 questions, réponses de 40 mots max qui commencent par la réponse. Questions déplacées : voir la liste des contenus déplacés. Même texte dans le HTML et le JSON-LD FAQPage (une seule source : src/data/faq.ts). | 348 |
| « Ce qui fait la différence. » (photos) | 25 | Légendes = actifs du gel, du sérum et de la crème, déjà sur les cartes. Titre creux. | Titre descriptif ; légendes réduites au nom du soin (les photos restent). | 11 |
| **Total** | **1521** | | | **1107** |

Hors total : **Pied de page : paragraphe de présentation** : 90 → 30 mots. 5 phrases ; oublie le déodorant ; « cosmétique naturelle » est une allégation non validée ; répète prix, délais et livraison. 2 phrases, les 6 soins cités.

Hors total : **Barre « Commander » fixe sur mobile** : 12 → 16 mots. Le bouton dit seulement « Commander » ; le prix est dans le texte à côté. Le prix sur le bouton, et les 3 objections à la place du texte.

### Tous les soins (`/soins`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| En-tête | 2 | Bouton « Commander » sans prix. | « Commander · dès 299 DH » (voir décision 4). | 5 |
| H1 + intro + 6 cartes + bandeau gamme | 153 | H1 sans mot-clé. L'intro répète la liste des soins des cartes. Cartes : phrases longues tirées des fiches, sans prix ni actifs ; lien « Voir le soin » × 6 sans dire lequel. | H1 mot-clé, intro d'une phrase (délai, paiement). Cartes au format demandé : nom, bénéfice, 3 actifs, prix, bouton nommé. | 159 |
| **Total** | **155** | | | **164** |

### Fiche : Gel nettoyant anti-taches (`/soins/gel-nettoyant`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| Haut de fiche : pastille et surtitre | 12 | La pastille et le surtitre disent souvent la même chose (« N° 02 · Routine anti-taches »). | Pastille « Fabriqué au Maroc », surtitre uniforme « N° x sur 04 · Routine anti-taches ». | 11 |
| Au-dessus de la ligne de flottaison : H1, phrase, avantages, formats, bouton, atouts | 75 | Les tuiles d'avantages répètent les actifs (décrits juste en dessous). Les atouts sous le bouton ne donnent pas le délai (24 à 72 h). | H1 avec le mot-clé complet, 1 phrase « pour qui / pour quoi », tuiles = bénéfice + 3 atouts (livraison, paiement, retour) + prix. Sous le bouton : les frais de livraison, visibles avant la commande. Formats et bouton inchangés. | 78 |
| « Actifs et rôle » (l'étiquette) | 79 | Titre sans mot-clé ; 2 phrases par actif (rôle + effet) ; textes « [À VALIDER] » par le pharmacien. | Titre avec le nom du soin ; 1 ligne par actif. À faire relire par le pharmacien. | 47 |
| NOUVEAU « Gel nettoyant anti-taches, pour qui ? » (H2) | 0 | Le texte « Pour qui » de l'ancienne fiche a disparu avec la nouvelle maquette, comme les liens vers les pages conseils. | Bloc de 60 mots max, avec des liens nommés vers les guides (maillage fiche → conseil). | 34 |
| NOUVEAU « Comment utiliser le gel nettoyant ? » (H2) | 0 | Le mode d'emploi n'existe que dans la FAQ. | Étapes numérotées (sorties de la FAQ). | 20 |
| NOUVEAU « Combien de temps pour voir des résultats ? » (H2) | 0 | La réponse n'existe que dans la FAQ, pas sur toutes les fiches. | 2 phrases honnêtes (sorties de la FAQ). | 20 |
| Avis | 170 | Messages des clientes : rien à couper. La mention sous chaque avis fait 16 mots. | Messages inchangés ; mention raccourcie. | 160 |
| FAQ produit (« Tu te poses la question ? ») | 235 | Le mode d'emploi, la composition et les résultats y sont, alors qu'ils ont leur bloc. La réponse « prix » répète tout le prix de la gamme (40 mots). | Questions gardées : prix, question propre au soin, peau sensible, grossesse, livraison. Réponses de 40 mots max, réponse d'abord. HTML et JSON-LD FAQPage identiques. | 120 |
| Autres soins (« Le reste de la maison ») | 93 | Titre de marque, sans mot-clé ; cartes utiles (prix, formats, ajout). | Titre « Les autres soins OTAGE » ; cartes inchangées. | 92 |
| **Total** | **664** | | | **582** |

### Fiche : Sérum anti-taches (`/soins/serum-anti-taches`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| Haut de fiche : pastille et surtitre | 13 | La pastille et le surtitre disent souvent la même chose (« N° 02 · Routine anti-taches »). | Pastille « Fabriqué au Maroc », surtitre uniforme « N° x sur 04 · Routine anti-taches ». | 11 |
| Au-dessus de la ligne de flottaison : H1, phrase, avantages, formats, bouton, atouts | 78 | Les tuiles d'avantages répètent les actifs (décrits juste en dessous). Les atouts sous le bouton ne donnent pas le délai (24 à 72 h). | H1 avec le mot-clé complet, 1 phrase « pour qui / pour quoi », tuiles = bénéfice + 3 atouts (livraison, paiement, retour) + prix. Sous le bouton : les frais de livraison, visibles avant la commande. Formats et bouton inchangés. | 80 |
| « Actifs et rôle » (l'étiquette) | 78 | Titre sans mot-clé ; 2 phrases par actif (rôle + effet) ; textes « [À VALIDER] » par le pharmacien. | Titre avec le nom du soin ; 1 ligne par actif. À faire relire par le pharmacien. | 50 |
| NOUVEAU « Sérum anti-taches, pour qui ? » (H2) | 0 | Le texte « Pour qui » de l'ancienne fiche a disparu avec la nouvelle maquette, comme les liens vers les pages conseils. | Bloc de 60 mots max, avec des liens nommés vers les guides (maillage fiche → conseil). | 39 |
| NOUVEAU « Comment utiliser le sérum anti-taches ? » (H2) | 0 | Le mode d'emploi n'existe que dans la FAQ. | Étapes numérotées (sorties de la FAQ). | 27 |
| NOUVEAU « Combien de temps pour voir des résultats ? » (H2) | 0 | La réponse n'existe que dans la FAQ, pas sur toutes les fiches. | 2 phrases honnêtes (sorties de la FAQ). | 23 |
| Avis | 104 | Messages des clientes : rien à couper. La mention sous chaque avis fait 16 mots. | Messages inchangés ; mention raccourcie. | 99 |
| FAQ produit (« Tu te poses la question ? ») | 247 | Le mode d'emploi, la composition et les résultats y sont, alors qu'ils ont leur bloc. La réponse « prix » répète tout le prix de la gamme (40 mots). | Questions gardées : prix, question propre au soin, peau sensible, grossesse, livraison. Réponses de 40 mots max, réponse d'abord. HTML et JSON-LD FAQPage identiques. | 103 |
| Autres soins (« Le reste de la maison ») | 94 | Titre de marque, sans mot-clé ; cartes utiles (prix, formats, ajout). | Titre « Les autres soins OTAGE » ; cartes inchangées. | 93 |
| **Total** | **614** | | | **525** |

### Fiche : Crème anti-taches (`/soins/creme-anti-taches`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| Haut de fiche : pastille et surtitre | 13 | La pastille et le surtitre disent souvent la même chose (« N° 02 · Routine anti-taches »). | Pastille « Fabriqué au Maroc », surtitre uniforme « N° x sur 04 · Routine anti-taches ». | 11 |
| Au-dessus de la ligne de flottaison : H1, phrase, avantages, formats, bouton, atouts | 74 | Les tuiles d'avantages répètent les actifs (décrits juste en dessous). Les atouts sous le bouton ne donnent pas le délai (24 à 72 h). | H1 avec le mot-clé complet, 1 phrase « pour qui / pour quoi », tuiles = bénéfice + 3 atouts (livraison, paiement, retour) + prix. Sous le bouton : les frais de livraison, visibles avant la commande. Formats et bouton inchangés. | 78 |
| « Actifs et rôle » (l'étiquette) | 88 | Titre sans mot-clé ; 2 phrases par actif (rôle + effet) ; textes « [À VALIDER] » par le pharmacien. | Titre avec le nom du soin ; 1 ligne par actif. À faire relire par le pharmacien. | 53 |
| NOUVEAU « Crème anti-taches, pour qui ? » (H2) | 0 | Le texte « Pour qui » de l'ancienne fiche a disparu avec la nouvelle maquette, comme les liens vers les pages conseils. | Bloc de 60 mots max, avec des liens nommés vers les guides (maillage fiche → conseil). | 35 |
| NOUVEAU « Comment utiliser la crème anti-taches ? » (H2) | 0 | Le mode d'emploi n'existe que dans la FAQ. | Étapes numérotées (sorties de la FAQ). | 28 |
| NOUVEAU « Combien de temps pour voir des résultats ? » (H2) | 0 | La réponse n'existe que dans la FAQ, pas sur toutes les fiches. | 2 phrases honnêtes (sorties de la FAQ). | 17 |
| Avis | 104 | Messages des clientes : rien à couper. La mention sous chaque avis fait 16 mots. | Messages inchangés ; mention raccourcie. | 99 |
| FAQ produit (« Tu te poses la question ? ») | 236 | Le mode d'emploi, la composition et les résultats y sont, alors qu'ils ont leur bloc. La réponse « prix » répète tout le prix de la gamme (40 mots). | Questions gardées : prix, question propre au soin, peau sensible, grossesse, livraison. Réponses de 40 mots max, réponse d'abord. HTML et JSON-LD FAQPage identiques. | 121 |
| Autres soins (« Le reste de la maison ») | 94 | Titre de marque, sans mot-clé ; cartes utiles (prix, formats, ajout). | Titre « Les autres soins OTAGE » ; cartes inchangées. | 93 |
| **Total** | **609** | | | **535** |

### Fiche : Écran solaire SPF 50 (`/soins/ecran-solaire-spf50`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| Haut de fiche : pastille et surtitre | 15 | La pastille et le surtitre disent souvent la même chose (« N° 02 · Routine anti-taches »). | Pastille « Fabriqué au Maroc », surtitre uniforme « N° x sur 04 · Routine anti-taches ». | 11 |
| Au-dessus de la ligne de flottaison : H1, phrase, avantages, formats, bouton, atouts | 83 | Les tuiles d'avantages répètent les actifs (décrits juste en dessous). Les atouts sous le bouton ne donnent pas le délai (24 à 72 h). | H1 avec le mot-clé complet, 1 phrase « pour qui / pour quoi », tuiles = bénéfice + 3 atouts (livraison, paiement, retour) + prix. Sous le bouton : les frais de livraison, visibles avant la commande. Formats et bouton inchangés. | 85 |
| « Actifs et rôle » (l'étiquette) | 93 | Titre sans mot-clé ; 2 phrases par actif (rôle + effet) ; textes « [À VALIDER] » par le pharmacien. | Titre avec le nom du soin ; 1 ligne par actif. À faire relire par le pharmacien. | 41 |
| NOUVEAU « Écran solaire SPF 50, pour qui ? » (H2) | 0 | Le texte « Pour qui » de l'ancienne fiche a disparu avec la nouvelle maquette, comme les liens vers les pages conseils. | Bloc de 60 mots max, avec des liens nommés vers les guides (maillage fiche → conseil). | 28 |
| NOUVEAU « Comment utiliser l'écran solaire SPF 50 ? » (H2) | 0 | Le mode d'emploi n'existe que dans la FAQ. | Étapes numérotées (sorties de la FAQ). | 22 |
| NOUVEAU « Combien de temps pour voir des résultats ? » (H2) | 0 | La réponse n'existe que dans la FAQ, pas sur toutes les fiches. | 2 phrases honnêtes (sorties de la FAQ). | 21 |
| Avis | 104 | Messages des clientes : rien à couper. La mention sous chaque avis fait 16 mots. | Messages inchangés ; mention raccourcie. | 99 |
| FAQ produit (« Tu te poses la question ? ») | 259 | Le mode d'emploi, la composition et les résultats y sont, alors qu'ils ont leur bloc. La réponse « prix » répète tout le prix de la gamme (40 mots). | Questions gardées : prix, question propre au soin, peau sensible, grossesse, livraison. Réponses de 40 mots max, réponse d'abord. HTML et JSON-LD FAQPage identiques. | 139 |
| Autres soins (« Le reste de la maison ») | 92 | Titre de marque, sans mot-clé ; cartes utiles (prix, formats, ajout). | Titre « Les autres soins OTAGE » ; cartes inchangées. | 91 |
| **Total** | **646** | | | **537** |

### Fiche : Sérum contour des yeux (`/soins/contour-des-yeux`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| Haut de fiche : pastille et surtitre | 12 | La pastille et le surtitre disent souvent la même chose (« N° 02 · Routine anti-taches »). | Pastille « Fabriqué au Maroc », surtitre uniforme « N° x sur 04 · Routine anti-taches ». | 10 |
| Au-dessus de la ligne de flottaison : H1, phrase, avantages, formats, bouton, atouts | 80 | Les tuiles d'avantages répètent les actifs (décrits juste en dessous). Les atouts sous le bouton ne donnent pas le délai (24 à 72 h). | H1 avec le mot-clé complet, 1 phrase « pour qui / pour quoi », tuiles = bénéfice + 3 atouts (livraison, paiement, retour) + prix. Sous le bouton : les frais de livraison, visibles avant la commande. Formats et bouton inchangés. | 77 |
| « Actifs et rôle » (l'étiquette) | 63 | Titre sans mot-clé ; 2 phrases par actif (rôle + effet) ; textes « [À VALIDER] » par le pharmacien. | Titre avec le nom du soin ; 1 ligne par actif. À faire relire par le pharmacien. | 44 |
| NOUVEAU « Sérum contour des yeux, pour qui ? » (H2) | 0 | Le texte « Pour qui » de l'ancienne fiche a disparu avec la nouvelle maquette, comme les liens vers les pages conseils. | Bloc de 60 mots max, avec des liens nommés vers les guides (maillage fiche → conseil). | 25 |
| NOUVEAU « Comment utiliser le sérum contour des yeux ? » (H2) | 0 | Le mode d'emploi n'existe que dans la FAQ. | Étapes numérotées (sorties de la FAQ). | 24 |
| NOUVEAU « Combien de temps pour voir des résultats ? » (H2) | 0 | La réponse n'existe que dans la FAQ, pas sur toutes les fiches. | 2 phrases honnêtes (sorties de la FAQ). | 18 |
| Avis | 0 | Pas d'avis sur cette fiche (section masquée). | Inchangé. | 0 |
| FAQ produit (« Tu te poses la question ? ») | 183 | Le mode d'emploi, la composition et les résultats y sont, alors qu'ils ont leur bloc. La réponse « prix » répète tout le prix de la gamme (40 mots). | Questions gardées : prix, question propre au soin, peau sensible, grossesse, livraison. Réponses de 40 mots max, réponse d'abord. HTML et JSON-LD FAQPage identiques. | 118 |
| Autres soins (« Le reste de la maison ») | 96 | Titre de marque, sans mot-clé ; cartes utiles (prix, formats, ajout). | Titre « Les autres soins OTAGE » ; cartes inchangées. | 95 |
| **Total** | **434** | | | **411** |

### Fiche : Déodorant crème (`/soins/deodorant-creme`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| Haut de fiche : pastille et surtitre | 13 | La pastille et le surtitre disent souvent la même chose (« N° 02 · Routine anti-taches »). | Pastille « Fabriqué au Maroc », surtitre uniforme « N° x sur 04 · Routine anti-taches ». | 10 |
| Au-dessus de la ligne de flottaison : H1, phrase, avantages, formats, bouton, atouts | 68 | Les tuiles d'avantages répètent les actifs (décrits juste en dessous). Les atouts sous le bouton ne donnent pas le délai (24 à 72 h). | H1 avec le mot-clé complet, 1 phrase « pour qui / pour quoi », tuiles = bénéfice + 3 atouts (livraison, paiement, retour) + prix. Sous le bouton : les frais de livraison, visibles avant la commande. Formats et bouton inchangés. | 72 |
| « Actifs et rôle » (l'étiquette) | 158 | Titre sans mot-clé ; 2 phrases par actif (rôle + effet) ; textes « [À VALIDER] » par le pharmacien. | Titre avec le nom du soin ; 1 ligne par actif. À faire relire par le pharmacien. | 91 |
| NOUVEAU « Déodorant crème, pour qui ? » (H2) | 0 | Le texte « Pour qui » de l'ancienne fiche a disparu avec la nouvelle maquette, comme les liens vers les pages conseils. | Bloc de 60 mots max, avec des liens nommés vers les guides (maillage fiche → conseil). | 19 |
| NOUVEAU « Comment utiliser le déodorant crème ? » (H2) | 0 | Le mode d'emploi n'existe que dans la FAQ. | Étapes numérotées (sorties de la FAQ). | 24 |
| NOUVEAU « Combien de temps pour voir des résultats ? » (H2) | 0 | La réponse n'existe que dans la FAQ, pas sur toutes les fiches. | 2 phrases honnêtes (sorties de la FAQ). | 22 |
| Avis | 0 | Pas d'avis sur cette fiche (section masquée). | Inchangé. | 0 |
| FAQ produit (« Tu te poses la question ? ») | 197 | Le mode d'emploi, la composition et les résultats y sont, alors qu'ils ont leur bloc. La réponse « prix » répète tout le prix de la gamme (40 mots). | Questions gardées : prix, question propre au soin, peau sensible, grossesse, livraison. Réponses de 40 mots max, réponse d'abord. HTML et JSON-LD FAQPage identiques. | 103 |
| Autres soins (« Le reste de la maison ») | 98 | Titre de marque, sans mot-clé ; cartes utiles (prix, formats, ajout). | Titre « Les autres soins OTAGE » ; cartes inchangées. | 97 |
| **Total** | **534** | | | **438** |

### Conseils : taches pigmentaires (`/taches-pigmentaires`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| Introduction → réponse directe | 79 | 2 paragraphes avant d'arriver à la réponse ; « Cette page explique… » ne sert pas. | Bloc de réponse en 2 phrases, citable tel quel par les IA. « Sans danger dans la plupart des cas » passe dans « Quand consulter ». | 43 |
| D'où viennent les taches pigmentaires ? | 102 | Phrase d'introduction inutile ; 4 causes en phrases longues. | 4 causes, une ligne chacune. | 44 |
| Ce qui aide vraiment → Qu'est-ce qui aide vraiment ? | 87 | Bien, mais chaque point fait 2 phrases. | H2 en question ; 4 points d'une ligne. | 39 |
| « Une routine en 4 étapes » + « Les soins OTAGE » + « La routine, étape par étape » | 281 | La même routine expliquée 3 fois de suite (logique, produits, gestes). Liens « Voir le soin » sans nom. | Une seule section : 4 étapes numérotées, chaque soin nommé dans son lien, puis un bouton avec le prix. Le bloc « professionnel » devient une section « Quand consulter ? ». | 124 |
| Bloc « Demande l'avis d'un professionnel » → Quand consulter un dermatologue ? | 0 | (compté dans la section précédente) | Section à part, en question. | 22 |
| Questions fréquentes | 161 | Réponses de 25 à 45 mots ; la question « peau sensible » répète « Ce qui aide ». | Réponses qui commencent par la réponse, 40 mots max. | 98 |
| Autres conseils peau | 9 | Liens déjà descriptifs. | Inchangé. | 9 |
| En-tête | 4 | Bouton « Commander » sans prix, qui mène à l'accueil. | « Commander · dès 299 DH » (voir décision 4). | 7 |
| **Total** | **723** | | | **386** |

### Conseils : cernes (`/cernes`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| Introduction → réponse directe | 89 | 2 paragraphes avant la réponse. | Réponse directe en 2 phrases. | 46 |
| Pourquoi a-t-on des cernes ? | 80 | Correct ; phrases un peu longues. | 5 causes d'une ligne. | 57 |
| Les gestes qui aident → Qu'est-ce qui aide ? | 53 | Bien. | H2 en question ; textes inchangés ou presque. | 42 |
| Comment appliquer + « Le soin OTAGE » | 132 | Le mode d'emploi est aussi dans la fiche et dans la FAQ ; le soin OTAGE est présenté à part, avec un lien « Voir le soin ». | Une section : 3 étapes, puis le soin nommé avec son prix. Bloc « professionnel » → « Quand consulter ? ». | 91 |
| Bloc « Demande l'avis d'un professionnel » → Quand consulter ? | 0 | (compté dans la section précédente) | Section à part, en question. | -11 |
| Questions fréquentes | 112 | « Quand appliquer » répète la section du dessus. | 3 questions, réponses courtes. | 61 |
| Autres conseils + en-tête | 14 | Bouton « Commander » sans prix, vers la gamme alors que la page parle du contour des yeux. | Bouton « Commander · 185 DH » vers la fiche contour des yeux (voir décision 4). | 16 |
| **Total** | **480** | | | **302** |

### Conseils : taches d'acné (`/taches-acne`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| Introduction → réponse directe | 97 | Définitions médicales longues avant la réponse. | Réponse directe en 2 phrases ; le vocabulaire médical passe dans « Tache ou cicatrice ». | 43 |
| Tache ou cicatrice : faire la différence | 59 | Correct. | H2 en question ; ajoute les 2 termes médicaux retirés de l'intro. | 49 |
| Ce qui aggrave les taches d'acné | 43 | Bien. | H2 en question. | 33 |
| Ce qui aide | 82 | Le bloc « professionnel » est noyé dans la section. | H2 en question ; « professionnel » → « Quand consulter ? ». | 58 |
| « Les soins OTAGE » + « La routine, étape par étape » | 196 | Routine décrite 2 fois ; liens « Voir le soin » sans nom. | Une section : 4 étapes, soins nommés dans les liens, mise en garde gardée. | 71 |
| Questions fréquentes | 103 | Réponses qui ne commencent pas toutes par la réponse. | Réponses courtes, réponse d'abord. | 67 |
| Autres conseils + en-tête | 13 | Bouton « Commander » sans prix. | « Commander · dès 299 DH ». | 16 |
| **Total** | **593** | | | **337** |

### Conseils : mélasma et grossesse (`/melasma-grossesse`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| Introduction → réponse directe | 83 | 2 paragraphes avant la réponse. | Réponse directe en 2 phrases. | 41 |
| 1. Le mélasma : comprendre | 153 | 2 sous-parties en une ; titres numérotés peu recherchés. | 2 H2 en questions ; une ligne par point. | 89 |
| 2. Grossesse et allaitement : les précautions | 183 | Précautions médicales importantes, mais en phrases longues ; le bloc « professionnel » répète la FAQ. | H2 en question ; précautions gardées une à une (rétinoïdes, hydroquinone). | 71 |
| Les soins OTAGE, à voir avec ton médecin | 104 | Description des soins déjà sur les fiches ; liens « Voir le soin » sans nom. | Une phrase de précaution, puis 3 liens nommés. | 41 |
| Questions fréquentes | 93 | « Le soleil aggrave-t-il ? » répète la section du dessus. | Réponses courtes ; question soleil gardée (recherche fréquente). | 63 |
| Autres conseils + en-tête | 12 | Bouton « Commander » sans prix. | « Commander · dès 299 DH ». | 15 |
| **Total** | **628** | | | **320** |

### Avis (`/avis`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| En-tête | 2 | Bouton « Commander » sans prix. | « Commander · dès 299 DH » (voir décision 4). | 5 |
| H1 + intro + satisfaction | 37 | H1 sans mot-clé ; intro longue. | H1 mot-clé ; intro courte ; chiffre de satisfaction gardé avec sa source. | 24 |
| Messages de Nabila et d'Awatef | 180 | Ce sont les mots des clientes : rien à couper. | Inchangé. Mention finale gardée. | 180 |
| **Total** | **219** | | | **209** |

### À propos (`/a-propos`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| En-tête | 2 | Bouton « Commander » sans prix. | « Commander · dès 299 DH » (voir décision 4). | 5 |
| Introduction | 31 | « cosmétique naturelle » est une allégation non validée ; « on vend le résultat » ressemble à une promesse de résultat. | Réécrite sans ces deux formules. | 29 |
| Le fondateur | 77 | Citation de 3 phrases longues (mots du fondateur). | Version courte proposée, à faire valider par le fondateur (ce sont ses mots). | 39 |
| Ce que nous faisons | 97 | Liste des 6 soins avec tous leurs actifs : la même liste que /soins. | Une phrase et un lien vers /soins. | 27 |
| Honnêtes, concrètement | 77 | Bien, phrases un peu longues. | 4 points d'une ligne. | 41 |
| Fabriqué au Maroc, avec un laboratoire partenaire | 40 | Correct. | Une phrase de moins ; la devise en darija reste. | 30 |
| Une question ? On te répond | 39 | Bien. | Inchangé. | 39 |
| **Total** | **363** | | | **210** |

### Livraison et paiement (`/livraison-paiement`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| En-tête | 2 | Bouton « Commander » sans prix. | « Commander · dès 299 DH » (voir décision 4). | 5 |
| Intro + « Comment se passe une commande » | 79 | Bien : 4 étapes concrètes. | H2 en question ; étapes inchangées. | 79 |
| Livraison + Paiement + Retours + Réclamations, puis « Questions fréquentes » | 454 | Chaque information est écrite 2 fois : une fois dans sa section, une fois dans la FAQ en bas (237 mots en double). | Les sections deviennent les questions (H2 en question) et la FAQ en bas disparaît. Le JSON-LD FAQPage est construit à partir de ces mêmes questions. Le texte légal du droit de rétractation (site.returns, repris des CGV) reste mot pour mot. | 216 |
| **Total** | **535** | | | **300** |

### Contact (`/contact`)

| Section | Mots actuels | Redondant ou creux | Proposition | Mots après |
|---|---:|---|---|---:|
| En-tête | 2 | Bouton « Commander » sans prix. | « Commander · dès 299 DH » (voir décision 4). | 5 |
| H1 + intro | 18 | H1 sans la marque. | H1 « Contacter OTAGE » ; intro inchangée. | 18 |
| WhatsApp, e-mail, disponibilité, Instagram | 38 | Court et utile. | Inchangé. | 38 |
| Commander | 49 | Répète délai et frais (déjà dans la page Livraison). | 2 phrases, lien vers la page Livraison. | 25 |
| **Total** | **107** | | | **86** |

## Étape 2 : nouveaux textes, page par page

### Accueil (`/`)

| | Actuel | Proposé |
|---|---|---|
| Title | OTAGE Cosmétiques : sérum et crème anti-taches fabriqués au Maroc (65 car.) | Routine anti-taches fabriquée au Maroc, dès 299 DH \| OTAGE (58 car.) |
| Meta description | Routine anti-taches OTAGE : gel nettoyant, sérum, crème et écran solaire SPF 50 contre les taches pigmentaires. Fabriqué au Maroc, paiement à la livraison. (155 car.) | Gel nettoyant, sérum, crème et écran SPF 50 pour atténuer les taches brunes. Dès 299 DH, livraison offerte en 24 à 72 h, paiement à la livraison. (145 car.) |
| H1 | Routine anti-taches · Des soins honnêtes. Fabriqués au Maroc | Routine anti-taches · Des soins honnêtes. Fabriqués au Maroc. (inchangé : le mot-clé « routine anti-taches » est déjà dans le H1) |

**Hero (H1)**

| Actuel | Proposé |
|---|---|
| Voir les offres dès 299 DH. Trouver mon soin. Gamme complète dès 299 DH, livraison offerte. Paiement à la livraison. | 4 soins pour atténuer les taches brunes, payés à la livraison.<br>Bouton : Voir les offres · dès 299 DH |

**« Qu'est-ce qui te gêne ? » (diagnostic)**

| Actuel | Proposé |
|---|---|
| Taches pigmentaires, cernes ou odeurs : choisis, on te montre le bon soin. | Choisis ton souci : on te montre le bon soin. |

**« L'offre à ne pas rater. » (offre gamme et formulaire)**

| Actuel | Proposé |
|---|---|
| L'offre à ne pas rater. Gamme complète dès 299 DH, livraison offerte. Ton ticket s'écrit en direct : tout est affiché, rien n'est caché. Tu hésites ? Avis, résultats, ou parle au fondateur. Livraison offerte. | La gamme anti-taches complète.<br>Les 4 soins de la routine, livraison offerte partout au Maroc.<br>Sous le bouton : Livrée en 24 à 72 h · Retour sous 7 jours |

**« Un seul soin te suffit ? » (achat à l'unité)**

| Actuel | Proposé |
|---|---|
| Choisis exactement ce qu'il te faut. Paiement à la réception, livraison de 35 à 45 DH selon ta ville. Pour la gamme complète, la livraison est offerte. Nettoie sans dessécher. Cible les taches. Protège des UVA et des UVB. Sans sels d'aluminium. | Chaque soin seul. Livraison 35 à 45 DH selon ta ville, paiement à la livraison.<br>Gel nettoyant anti-taches : Nettoie sans dessécher · Figue de Barbarie, louban, sans sulfate<br>Sérum anti-taches : Atténue les taches brunes · Alpha-arbutine, matcha, calendula<br>Crème anti-taches : Hydrate et unifie le teint · Niacinamide, acide hyaluronique, AHA<br>Écran solaire SPF 50 : Limite le retour des taches · SPF 50, UVA, UVB<br>Sérum contour des yeux : Atténue l'aspect des cernes · Caféine, acide hyaluronique, aloe vera<br>Déodorant crème : Agit sur les odeurs, sans aluminium · Oxyde de zinc, coco, jojoba |

**Résultats du diagnostic (taches, cernes, odeurs)**

| Actuel | Proposé |
|---|---|
| Contre les taches brunes, les taches pigmentaires et le teint irrégulier : 4 soins qui se suivent, matin et soir. La fiche de chaque soin donne sa contenance, son prix et son mode d'emploi. Pour les cernes et le contour des yeux fatigué. Ce qu'il faut savoir avant de l'adopter. Prix : 185 DH, ou 123 DH le sérum avec l'offre 2 + 1. Cinq ingrédients : oxyde de zinc, huile de jojoba, huile de coco, cire d'abeille et vitamine E. 85 DH. | 4 soins qui se suivent, matin et soir, contre les taches brunes.<br>Pour les cernes et le regard fatigué.<br>5 ingrédients, sans sels d'aluminium. 85 DH le pot de 50 ml. |

**« On l'affiche partout. » (affiches)**

| Actuel | Proposé |
|---|---|
| Fais défiler le mur. Touche une affiche pour découvrir le soin. | Touche une affiche pour voir le soin. |

**« Les questions qu'on nous pose. » (FAQ)**

| Actuel | Proposé |
|---|---|
| Touche une question : on te répond comme sur WhatsApp, sans détour.<br>Je paie quand ? À la livraison, en espèces, quand le livreur te remet ton colis. Rien à payer en ligne, pas besoin de carte bancaire.<br>La livraison est payante ? Pour une gamme complète, elle est offerte, quel que soit le format ou le nombre de gammes. Pour un achat à l'unité, elle coûte de 35 à 45 DH selon la ville, ajoutés au total. On te confirme le montant exact par téléphone.<br>Je suis livrée en combien de temps ? Compte 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer ta commande.<br>C'est quoi l'offre 2 + 1 ? Tu prends 2 gammes, la 3e est offerte. En Petit format : 199 DH la gamme au lieu de 299 DH, soit 598 DH les 3. En Grand format : 399 DH au lieu de 599 DH, soit 1 198 DH les 3.<br>Combien coûte la gamme anti-taches ? Le Petit format coûte 299 DH la gamme au lieu de 496 DH, le Grand format 599 DH au lieu de 800 DH. Avec l'offre 2 + 1, la gamme revient à 199 DH en Petit format et à 399 DH en Grand format. La livraison de la gamme est offerte.<br>Qu'est-ce qu'il y a dans une gamme ? Les 4 soins de la routine : gel nettoyant, sérum anti-taches, crème anti-taches et écran solaire SPF 50. En Grand format : gel 200 ml, sérum 30 ml, crème 50 ml et écran solaire 50 ml. En Petit format : gel 125 ml, sérum 15 ml, crème 30 ml et écran solaire 30 ml.<br>Comment j'utilise la routine ? Le matin : gel nettoyant, sérum, crème, puis écran solaire. Le soir : les 3 premiers, sans écran solaire. Le sérum, c'est le cœur de la routine contre les taches.<br>Quels sont les ingrédients actifs ? Gel nettoyant : figue de Barbarie et louban, sans sulfate. Sérum anti-taches : alpha-arbutine, matcha et calendula. Crème anti-taches : niacinamide, acide hyaluronique et AHA. L'écran solaire SPF 50 offre une haute protection UVA/UVB.<br>Je vois des résultats quand ? Honnêtement : les taches s'estompent petit à petit, pas du jour au lendemain. Ce qui compte, c'est la régularité matin et soir, et l'écran solaire chaque matin. Sans protection, les taches reviennent. Le rythme varie d'une peau à l'autre.<br>Pourquoi l'écran solaire est indispensable ? Parce que sans protection, les taches reviennent. L'écran solaire SPF 50 protège des UVA et des UVB : applique-le chaque matin en dernier, et renouvelle-le toutes les 2 heures au soleil.<br>J'ai la peau sensible. Fais d'abord un essai sur une petite zone, dans le pli du coude ou derrière l'oreille, et attends 24 h. En cas de rougeur ou d'irritation, arrête et demande conseil à un professionnel.<br>Je suis enceinte ou j'allaite, je peux l'utiliser ? Demande d'abord l'avis de ton médecin ou de ton pharmacien, en lui montrant la liste des ingrédients. C'est plus sûr.<br>Le sérum contour des yeux, c'est pour qui ? Pour les cernes et le contour des yeux fatigué. Il contient de l'aloe vera, de l'acide hyaluronique et de la caféine, en 15 ml, avec un applicateur bille. Il coûte 185 DH, ou 123 DH le sérum avec l'offre 2 + 1.<br>Et après ma commande ? On t'appelle pour confirmer ta commande et ton adresse, puis ton colis part. Tu paies à la réception, c'est tout.<br>Et si j'ai un problème avec ma commande ? Produit abîmé ou erreur dans ta commande ? Écris-nous sur WhatsApp : on échange le produit ou on te rembourse, sans frais pour toi. Et si le produit ne te convient pas, tu as 7 jours pour le retourner (voir la question sur les retours).<br>Je peux retourner ma commande ? Oui. Tu as 7 jours après la réception pour changer d'avis : c'est ton droit de rétractation (article 36 de la loi 31-08). Les produits doivent être non ouverts et non utilisés. Les frais de retour sont pris en charge par OTAGE, et tu choisis : remboursement ou échange. Écris-nous sur WhatsApp pour lancer le retour.<br>Vos soins sont fabriqués où ? Au Maroc, avec des ingrédients comme la figue de Barbarie et le louban. | Touche une question, on te répond sans détour.<br>**Je paie quand ?** À la livraison, en espèces. Rien à payer en ligne, pas de carte bancaire.<br>**La livraison est payante ?** Non pour une gamme complète : elle est offerte. À l'unité, compte 35 à 45 DH selon ta ville.<br>**Je suis livrée en combien de temps ?** En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer.<br>**Combien coûte la gamme anti-taches ?** 299 DH en Petit format, 599 DH en Grand format. Avec l'offre 2 + 1, la 3e gamme est offerte.<br>**Qu'est-ce qu'il y a dans une gamme ?** Gel nettoyant, sérum, crème et écran SPF 50.<br>Petit format : 125, 15, 30 et 30 ml. Grand format : 200, 30, 50 et 50 ml.<br>**Comment j'utilise la routine ?** Le matin : gel, sérum, crème, puis écran solaire. Le soir : les 3 premiers, sans écran.<br>**Je vois des résultats quand ?** Pas en quelques jours : les taches s'atténuent petit à petit. Régularité et écran solaire chaque matin comptent le plus.<br>**Et si j'ai la peau sensible ?** Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil.<br>**Je suis enceinte ou j'allaite, je peux l'utiliser ?** Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients.<br>**Et après ma commande ?** On t'appelle pour confirmer ta commande et ton adresse. Ensuite, ton colis part.<br>**Je peux retourner ma commande ?** Oui, sous 7 jours après réception (loi 31-08, article 36). Produits non ouverts, retour à nos frais, remboursement ou échange.<br>**Et si mon colis arrive abîmé ?** On échange ou on rembourse, sans frais pour toi. Écris-nous sur WhatsApp avec une photo.<br>**Vos soins sont fabriqués où ?** Au Maroc, avec un laboratoire partenaire. Parmi les ingrédients : figue de Barbarie et louban. |

**« Ce qui fait la différence. » (photos)**

| Actuel | Proposé |
|---|---|
| Ce qui fait la différence. Figue de Barbarie, louban, sans sulfate. Matcha, calendula, alpha-arbutine. Niacinamide, acide hyaluronique, AHA. | Les soins en photos. |

**Pied de page : paragraphe de présentation**

| Actuel | Proposé |
|---|---|
| OTAGE est une marque marocaine de cosmétique naturelle. Sa gamme anti-taches réunit 4 soins fabriqués au Maroc : un gel nettoyant, un sérum anti-taches, une crème anti-taches et un écran solaire SPF 50, pour atténuer les taches pigmentaires et l'hyperpigmentation, puis éviter qu'elles reviennent. OTAGE propose aussi un sérum contour des yeux pour les cernes. Livraison en 24 à 72 h partout au Maroc : offerte pour la gamme complète, de 35 à 45 DH selon la ville pour un achat à l'unité. Paiement à la livraison. | OTAGE fabrique au Maroc une routine anti-taches, un sérum contour des yeux et un déodorant. Livraison en 24 à 72 h, paiement à la livraison. |

**Barre « Commander » fixe sur mobile**

| Actuel | Proposé |
|---|---|
| La routine anti-taches. Dès 299 DH la gamme avec l'offre. Commander | Paiement à la livraison · 24 à 72 h · Retour 7 jours<br>Bouton : Commander · 299 DH |

**Contenu SEO retiré ou déplacé**

| Contenu | Où il va |
|---|---|
| FAQ « Quels sont les ingrédients actifs ? » | Cartes « À l'unité » de l'accueil (3 actifs par carte) et bloc « Actifs et rôle » de chaque fiche. |
| FAQ « Pourquoi l'écran solaire est indispensable ? » | Fiche Écran solaire (« Pour qui » et « Résultats ») et guide Taches pigmentaires. |
| FAQ « Le sérum contour des yeux, c'est pour qui ? » | Fiche Sérum contour des yeux (« Pour qui »). |
| FAQ « C'est quoi l'offre 2 + 1 ? » | Fusionnée dans « Combien coûte la gamme anti-taches ? » ; le détail chiffré reste dans le bloc de l'offre, à l'écran. |
| Contenances détaillées par soin dans la FAQ | Raccourcies en une ligne dans « Qu'est-ce qu'il y a dans une gamme ? » ; détail complet sur chaque fiche. |
| Légendes d'actifs de la galerie | Cartes « À l'unité » (même page). |

### Tous les soins (`/soins`)

| | Actuel | Proposé |
|---|---|---|
| Title | Soins anti-taches, contour des yeux et déodorant \| OTAGE (56 car.) | Soins anti-taches, contour des yeux et déodorant \| OTAGE (inchangé) (56 car.) |
| Meta description | Les 6 soins OTAGE fabriqués au Maroc : gel nettoyant, sérum anti-taches, crème anti-taches, écran solaire SPF 50, sérum contour des yeux et déodorant crème. Livraison en 24 à 72 h. (180 car.) | Les 6 soins OTAGE fabriqués au Maroc : routine anti-taches, contour des yeux, déodorant. Dès 85 DH, livrés en 24 à 72 h, payés à la livraison. (142 car.) |
| H1 | Les soins OTAGE | Soins anti-taches, contour des yeux et déodorant |

**En-tête**

| Actuel | Proposé |
|---|---|
| Commander | Commander · dès 299 DH |

**H1 + intro + 6 cartes + bandeau gamme**

| Actuel | Proposé |
|---|---|
| Les soins OTAGE. Une routine anti-taches en 4 soins, un sérum contour des yeux et un déodorant crème. Fabriqués au Maroc, livrés en 24 à 72 h, payés à la livraison. Nettoie en douceur sans dessécher et prépare la peau à recevoir les soins. Voir le soin. Le soin concentré de la gamme, qui cible les taches. Voir le soin. Hydrate, unifie le teint et scelle le sérum. Voir le soin. Protège des UVA et des UVB pour que les taches ne reviennent pas. Voir le soin. Un applicateur bille pour le contour de l'œil. Une texture légère qui se glisse sous le maquillage, matin et soir. Voir le soin. Un baume fondant qui s'occupe des odeurs. Cinq ingrédients, rien d'autre. Voir le soin. | Soins anti-taches, contour des yeux et déodorant<br>Fabriqués au Maroc, livrés en 24 à 72 h, payés à la livraison.<br>Gel nettoyant anti-taches · Nettoie sans dessécher · Figue de Barbarie, louban, sans sulfate · Dès 91 DH · Voir le gel nettoyant<br>Sérum anti-taches · Atténue les taches brunes · Alpha-arbutine, matcha, calendula · Dès 163 DH · Voir le sérum anti-taches<br>Crème anti-taches · Hydrate et unifie le teint · Niacinamide, acide hyaluronique, AHA · Dès 130 DH · Voir la crème anti-taches<br>Écran solaire SPF 50 · Limite le retour des taches · SPF 50, UVA, UVB · Dès 112 DH · Voir l'écran solaire<br>Sérum contour des yeux · Atténue l'aspect des cernes · Caféine, acide hyaluronique, aloe vera · 185 DH · Voir le contour des yeux<br>Déodorant crème · Agit sur les odeurs, sans aluminium · Oxyde de zinc, coco, jojoba · 85 DH · Voir le déodorant |

**Contenu SEO retiré ou déplacé**

| Contenu | Où il va |
|---|---|
| Phrases longues des cartes (« Un applicateur bille… », « scelle le sérum »…) | Fiche de chaque soin (« Pour qui », « Comment l'utiliser »). |

### Fiche : Gel nettoyant anti-taches (`/soins/gel-nettoyant`)

| | Actuel | Proposé |
|---|---|---|
| Title | Gel nettoyant anti-taches sans sulfate, au Maroc \| OTAGE (56 car.) | Gel nettoyant anti-taches sans sulfate \| OTAGE (46 car.) |
| Meta description | Gel nettoyant anti-taches OTAGE N°01 : figue de Barbarie, louban, sans sulfate. Nettoie en douceur sans dessécher. Fabriqué au Maroc, paiement à la livraison. (158 car.) | Gel nettoyant anti-taches sans sulfate, à la figue de Barbarie et au louban. Dès 91 DH, livré en 24 à 72 h partout au Maroc, payé à la livraison. (145 car.) |
| H1 | Gel nettoyant. | Gel nettoyant anti-taches. |

**Haut de fiche : pastille et surtitre**

| Actuel | Proposé |
|---|---|
| N° 01 · Routine anti-taches (pastille) ; N° 01 sur 04 · Routine anti-taches (surtitre) | Fabriqué au Maroc (pastille) ; N° 01 sur 04 · Routine anti-taches (surtitre) |

**Au-dessus de la ligne de flottaison : H1, phrase, avantages, formats, bouton, atouts**

| Actuel | Proposé |
|---|---|
| Gel nettoyant. Nettoie en douceur, sans dessécher, et prépare la peau à recevoir les soins anti-taches. Sans sulfate · Figue de Barbarie · Louban · Ne dessèche pas · Dès 91 DH Paiement à la réception. Livraison 35 à 45 DH. 7 jours pour changer d'avis. | Gel nettoyant anti-taches.<br>Pour nettoyer ta peau sans la dessécher, avant le sérum anti-taches.<br>Tuiles : Ne dessèche pas · Livré en 24 à 72 h · Payé à la livraison · Retour 7 jours · Dès 91 DH<br>Sous le bouton : Livraison 35 à 45 DH selon ta ville. |

**« Actifs et rôle » (l'étiquette)**

| Actuel | Proposé |
|---|---|
| Trois mots sur l'étiquette. Tout est dit. Figue de Barbarie : Un actif marocain, connu pour adoucir et hydrater la peau. La peau reste douce après le rinçage, sans tiraillement. Louban : Une résine traditionnelle, utilisée depuis longtemps pour purifier la peau. Il aide à nettoyer en profondeur, en douceur. Sans sulfate : Une base lavante douce, sans sulfates agressifs. La peau est propre, sans être décapée : elle est prête pour le sérum. | Le gel nettoyant : ses 3 actifs.<br>- Figue de Barbarie : adoucit et hydrate, sans tiraillement après le rinçage.<br>- Louban : résine traditionnelle qui aide à purifier la peau.<br>- Sans sulfate : base lavante douce, la peau est propre sans être décapée. |

**NOUVEAU « Gel nettoyant anti-taches, pour qui ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | Pour toi si tu as des taches brunes ou un teint irrégulier. C'est l'étape 1 de la routine, matin et soir.<br>Lien : Taches pigmentaires : causes et routine<br>Lien : Taches d'acné : comment atténuer les marques |

**NOUVEAU « Comment utiliser le gel nettoyant ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | 1. Mouille ton visage, matin et soir.<br>2. Masse le gel 30 secondes.<br>3. Rince, puis applique le sérum anti-taches. |

**NOUVEAU « Combien de temps pour voir des résultats ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | Tout de suite : une peau nettoyée en douceur. Sur les taches, c'est la routine complète qui agit, petit à petit. |

**Avis**

| Actuel | Proposé |
|---|---|
| Chaque peau est différente : ce message raconte l'expérience d'une cliente, pas une promesse de résultat. Chaque peau est différente : ce message raconte l'expérience d'une cliente, pas une promesse de résultat. | Chaque peau est différente : c'est un témoignage, pas une promesse. Chaque peau est différente : c'est un témoignage, pas une promesse. |

**FAQ produit (« Tu te poses la question ? »)**

| Actuel | Proposé |
|---|---|
| Tu te poses la question ? Comment utiliser le gel nettoyant anti-taches ? Matin et soir, sur peau humide. Masse 30 secondes, puis rince. C'est l'étape 1 de la routine anti-taches (matin et soir). Que contient le gel nettoyant anti-taches ? Figue de Barbarie, Louban, Sans sulfate. Quelle contenance et quel prix ? 125 ml en Petit format, 200 ml en Grand format. À l'unité : 91 DH en Petit format, 140 DH en Grand format. Dans la gamme anti-taches complète (4 soins) : 299 DH en Petit format au lieu de 496 DH, 599 DH en Grand format au lieu de 800 DH. La livraison de la gamme est offerte ; à l'unité, elle coûte de 35 à 45 DH selon la ville. Le gel nettoyant dessèche-t-il la peau ? Non : il nettoie en douceur sans dessécher. Il est formulé sans sulfate, avec de la figue de Barbarie et du louban. J'ai la peau sensible. Fais d'abord un essai sur une petite zone, dans le pli du coude ou derrière l'oreille, et attends 24 h. En cas de rougeur ou d'irritation, arrête et demande conseil à un professionnel. Je suis enceinte ou j'allaite, je peux l'utiliser ? Demande d'abord l'avis de ton médecin ou de ton pharmacien, en lui montrant la liste des ingrédients. C'est plus sûr. Je suis livrée en combien de temps ? Compte 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer ta commande. | Tu te poses la question ?<br>**Quel prix pour le gel nettoyant ?** 91 DH les 125 ml, 140 DH les 200 ml. Il est aussi dans la gamme complète, dès 299 DH.<br>**Le gel nettoyant dessèche-t-il la peau ?** Non : il est sans sulfate, avec figue de Barbarie et louban.<br>**Et si j'ai la peau sensible ?** Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil.<br>**Je suis enceinte ou j'allaite, je peux l'utiliser ?** Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients.<br>**Je suis livrée en combien de temps ?** En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer. |

**Autres soins (« Le reste de la maison »)**

| Actuel | Proposé |
|---|---|
| Le reste de la maison. | Les autres soins OTAGE. |

**Contenu SEO retiré ou déplacé**

| Contenu | Où il va |
|---|---|
| FAQ « Comment utiliser le gel nettoyant ? » | Bloc H2 « Comment utiliser… ? » (même page), en étapes numérotées. |
| FAQ « Que contient le gel nettoyant ? » | Bloc « Actifs et rôle » (même page). |
| Phrase sur le prix de la gamme dans la réponse « prix » | Réduite à « aussi dans la gamme complète, dès 299 DH » ; le détail est sur l'accueil et dans la FAQ générale. |

### Fiche : Sérum anti-taches (`/soins/serum-anti-taches`)

| | Actuel | Proposé |
|---|---|---|
| Title | Sérum anti-taches Maroc à l'alpha-arbutine \| OTAGE (50 car.) | Sérum anti-taches à l'alpha-arbutine \| OTAGE (44 car.) |
| Meta description | Sérum anti-taches OTAGE N°02 : alpha-arbutine, matcha, calendula. Le soin concentré qui cible les taches pigmentaires. Fabriqué au Maroc, payé à la livraison. (158 car.) | Sérum anti-taches à l'alpha-arbutine, au matcha et au calendula, pour atténuer les taches brunes. Dès 163 DH, livré en 24 à 72 h, payé à la livraison. (150 car.) |
| H1 | Sérum anti-taches. | Sérum anti-taches. (inchangé) |

**Haut de fiche : pastille et surtitre**

| Actuel | Proposé |
|---|---|
| N° 02 · Routine anti-taches (pastille) ; N° 02 sur 04 · Le soin concentré (surtitre) | Fabriqué au Maroc (pastille) ; N° 02 sur 04 · Routine anti-taches (surtitre) |

**Au-dessus de la ligne de flottaison : H1, phrase, avantages, formats, bouton, atouts**

| Actuel | Proposé |
|---|---|
| Sérum anti-taches. Le soin concentré de la routine : il cible les taches brunes et unifie le teint, goutte après goutte. Cible les taches · Matcha · Calendula · Alpha-arbutine · Dès 163 DH Paiement à la réception. Livraison 35 à 45 DH. 7 jours pour changer d'avis. | Sérum anti-taches.<br>Pour atténuer les taches brunes et unifier le teint, goutte après goutte.<br>Tuiles : Atténue les taches · Livré en 24 à 72 h · Payé à la livraison · Retour 7 jours · Dès 163 DH<br>Sous le bouton : Livraison 35 à 45 DH selon ta ville. |

**« Actifs et rôle » (l'étiquette)**

| Actuel | Proposé |
|---|---|
| Trois actifs. Une seule mission. Matcha : Un thé vert riche en antioxydants, qui protège la peau des agressions du quotidien. Il aide le teint à retrouver de l'éclat. Calendula : Une fleur connue pour apaiser les peaux sensibles. Le sérum reste doux, même appliqué matin et soir. Alpha-arbutine : L'actif qui cible les taches brunes en limitant la production de mélanine. C'est lui qui travaille sur les taches, jour après jour. | Le sérum anti-taches : ses 3 actifs.<br>- Alpha-arbutine : limite la production de mélanine, c'est l'actif qui agit sur les taches.<br>- Matcha : thé vert antioxydant, qui aide le teint à retrouver de l'éclat.<br>- Calendula : fleur apaisante, le sérum reste doux matin et soir. |

**NOUVEAU « Sérum anti-taches, pour qui ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | Pour les taches brunes, l'hyperpigmentation et le teint irrégulier. C'est l'étape 2 de la routine, matin et soir.<br>Lien : Taches pigmentaires : causes et routine<br>Lien : Taches d'acné : comment atténuer les marques<br>Lien : Mélasma et masque de grossesse : que faire ? |

**NOUVEAU « Comment utiliser le sérum anti-taches ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | 1. Après le gel nettoyant, sèche ta peau.<br>2. Dépose 3 à 4 gouttes sur le visage.<br>3. Tapote du bout des doigts, puis applique la crème. |

**NOUVEAU « Combien de temps pour voir des résultats ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | Les taches s'atténuent petit à petit, pas en quelques jours. Le rythme dépend de ta peau, de ta régularité et de l'écran solaire. |

**Avis**

| Actuel | Proposé |
|---|---|
| Chaque peau est différente : ce message raconte l'expérience d'une cliente, pas une promesse de résultat. | Chaque peau est différente : c'est un témoignage, pas une promesse. |

**FAQ produit (« Tu te poses la question ? »)**

| Actuel | Proposé |
|---|---|
| Tu te poses la question ? Comment utiliser le sérum anti-taches ? 3 à 4 gouttes sur peau sèche, en tapotant du bout des doigts. C'est l'étape 2 de la routine anti-taches (matin et soir). Que contient le sérum anti-taches ? Matcha, Calendula, Alpha-arbutine. Quelle contenance et quel prix ? 15 ml en Petit format, 30 ml en Grand format. À l'unité : 163 DH en Petit format, 265 DH en Grand format. Dans la gamme anti-taches complète (4 soins) : 299 DH en Petit format au lieu de 496 DH, 599 DH en Grand format au lieu de 800 DH. La livraison de la gamme est offerte ; à l'unité, elle coûte de 35 à 45 DH selon la ville. Au bout de combien de temps voit-on des résultats ? Honnêtement : les taches s'estompent petit à petit, pas du jour au lendemain. Ce qui compte, c'est la régularité matin et soir, et l'écran solaire chaque matin. Le rythme varie d'une peau à l'autre. J'ai la peau sensible. Fais d'abord un essai sur une petite zone, dans le pli du coude ou derrière l'oreille, et attends 24 h. En cas de rougeur ou d'irritation, arrête et demande conseil à un professionnel. Je suis enceinte ou j'allaite, je peux l'utiliser ? Demande d'abord l'avis de ton médecin ou de ton pharmacien, en lui montrant la liste des ingrédients. C'est plus sûr. Je suis livrée en combien de temps ? Compte 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer ta commande. | Tu te poses la question ?<br>**Quel prix pour le sérum anti-taches ?** 163 DH les 15 ml, 265 DH les 30 ml. Il est aussi dans la gamme complète, dès 299 DH.<br>**Et si j'ai la peau sensible ?** Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil.<br>**Je suis enceinte ou j'allaite, je peux l'utiliser ?** Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients.<br>**Je suis livrée en combien de temps ?** En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer. |

**Autres soins (« Le reste de la maison »)**

| Actuel | Proposé |
|---|---|
| Le reste de la maison. | Les autres soins OTAGE. |

**Contenu SEO retiré ou déplacé**

| Contenu | Où il va |
|---|---|
| FAQ « Comment utiliser le sérum anti-taches ? » | Bloc H2 « Comment utiliser… ? » (même page), en étapes numérotées. |
| FAQ « Que contient le sérum anti-taches ? » | Bloc « Actifs et rôle » (même page). |
| Phrase sur le prix de la gamme dans la réponse « prix » | Réduite à « aussi dans la gamme complète, dès 299 DH » ; le détail est sur l'accueil et dans la FAQ générale. |
| FAQ « Au bout de combien de temps voit-on des résultats ? » | Bloc H2 « Combien de temps pour voir des résultats ? » (même page). |

### Fiche : Crème anti-taches (`/soins/creme-anti-taches`)

| | Actuel | Proposé |
|---|---|---|
| Title | Crème anti-taches Maroc à la niacinamide \| OTAGE (48 car.) | Crème anti-taches à la niacinamide \| OTAGE (42 car.) |
| Meta description | Crème anti-taches OTAGE N°03 : niacinamide, acide hyaluronique, AHA. Hydrate, unifie le teint et scelle le sérum. Fabriquée au Maroc, paiement à la livraison. (158 car.) | Crème anti-taches à la niacinamide et à l'acide hyaluronique : hydrate et unifie le teint. Dès 130 DH, livrée en 24 à 72 h, payée à la livraison. (145 car.) |
| H1 | Crème anti-taches. | Crème anti-taches. (inchangé) |

**Haut de fiche : pastille et surtitre**

| Actuel | Proposé |
|---|---|
| N° 03 · Routine anti-taches (pastille) ; N° 03 sur 04 · Hydrate et unifie (surtitre) | Fabriquée au Maroc (pastille) ; N° 03 sur 04 · Routine anti-taches (surtitre) |

**Au-dessus de la ligne de flottaison : H1, phrase, avantages, formats, bouton, atouts**

| Actuel | Proposé |
|---|---|
| Crème anti-taches. Elle hydrate, unifie le teint et scelle le sérum : la dernière étape avant l'écran solaire. Hydrate · Unifie le teint · Niacinamide · Acide hyaluronique · Dès 130 DH Paiement à la réception. Livraison 35 à 45 DH. 7 jours pour changer d'avis. | Crème anti-taches.<br>Pour hydrater, unifier le teint et fixer le sérum, avant l'écran solaire.<br>Tuiles : Unifie le teint · Livrée en 24 à 72 h · Payée à la livraison · Retour 7 jours · Dès 130 DH<br>Sous le bouton : Livraison 35 à 45 DH selon ta ville. |

**« Actifs et rôle » (l'étiquette)**

| Actuel | Proposé |
|---|---|
| Hydrater, unifier. Sans compliquer. Niacinamide : La vitamine B3 : elle aide à unifier le teint et à atténuer l'aspect des taches. Elle travaille avec le sérum pour un teint plus régulier. Acide hyaluronique : Il retient l'eau dans la peau pour une hydratation durable. La peau reste souple et confortable toute la journée. AHA : Des acides de fruits qui affinent le grain de peau en douceur. Ils aident la peau à retrouver de l'éclat. Toujours avec un écran solaire le matin. | La crème anti-taches : ses 3 actifs.<br>- Niacinamide : vitamine B3, aide à unifier le teint et à atténuer les taches.<br>- Acide hyaluronique : retient l'eau, la peau reste souple toute la journée.<br>- AHA : acides de fruits qui affinent le grain de peau. Écran solaire le matin. |

**NOUVEAU « Crème anti-taches, pour qui ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | Pour un teint irrégulier ou marqué par des taches. C'est l'étape 3 de la routine, matin et soir, après le sérum.<br>Lien : Taches pigmentaires : causes et routine<br>Lien : Mélasma et masque de grossesse : que faire ? |

**NOUVEAU « Comment utiliser la crème anti-taches ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | 1. Après le sérum, prends une noisette de crème.<br>2. Applique sur le visage et le cou.<br>3. Masse vers le haut. Le matin, termine par l'écran solaire. |

**NOUVEAU « Combien de temps pour voir des résultats ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | La peau est hydratée dès l'application. Les taches, elles, s'atténuent petit à petit avec la routine complète. |

**Avis**

| Actuel | Proposé |
|---|---|
| Chaque peau est différente : ce message raconte l'expérience d'une cliente, pas une promesse de résultat. | Chaque peau est différente : c'est un témoignage, pas une promesse. |

**FAQ produit (« Tu te poses la question ? »)**

| Actuel | Proposé |
|---|---|
| Tu te poses la question ? Comment utiliser la crème anti-taches ? Une noisette sur le visage et le cou, en mouvements vers le haut. C'est l'étape 3 de la routine anti-taches (matin et soir). Que contient la crème anti-taches ? Niacinamide, Acide hyaluronique, AHA. Quelle contenance et quel prix ? 30 ml en Petit format, 50 ml en Grand format. À l'unité : 130 DH en Petit format, 205 DH en Grand format. Dans la gamme anti-taches complète (4 soins) : 299 DH en Petit format au lieu de 496 DH, 599 DH en Grand format au lieu de 800 DH. La livraison de la gamme est offerte ; à l'unité, elle coûte de 35 à 45 DH selon la ville. Faut-il appliquer la crème avant ou après le sérum ? Après. La crème est l'étape 3 de la routine : elle hydrate, unifie le teint et scelle le sérum appliqué juste avant. J'ai la peau sensible. Fais d'abord un essai sur une petite zone, dans le pli du coude ou derrière l'oreille, et attends 24 h. En cas de rougeur ou d'irritation, arrête et demande conseil à un professionnel. Je suis enceinte ou j'allaite, je peux l'utiliser ? Demande d'abord l'avis de ton médecin ou de ton pharmacien, en lui montrant la liste des ingrédients. C'est plus sûr. Je suis livrée en combien de temps ? Compte 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer ta commande. | Tu te poses la question ?<br>**Quel prix pour la crème anti-taches ?** 130 DH les 30 ml, 205 DH les 50 ml. Elle est aussi dans la gamme complète, dès 299 DH.<br>**Avant ou après le sérum ?** Après. La crème est l'étape 3 : elle fixe le sérum appliqué juste avant.<br>**Et si j'ai la peau sensible ?** Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil.<br>**Je suis enceinte ou j'allaite, je peux l'utiliser ?** Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients.<br>**Je suis livrée en combien de temps ?** En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer. |

**Autres soins (« Le reste de la maison »)**

| Actuel | Proposé |
|---|---|
| Le reste de la maison. | Les autres soins OTAGE. |

**Contenu SEO retiré ou déplacé**

| Contenu | Où il va |
|---|---|
| FAQ « Comment utiliser la crème anti-taches ? » | Bloc H2 « Comment utiliser… ? » (même page), en étapes numérotées. |
| FAQ « Que contient la crème anti-taches ? » | Bloc « Actifs et rôle » (même page). |
| Phrase sur le prix de la gamme dans la réponse « prix » | Réduite à « aussi dans la gamme complète, dès 299 DH » ; le détail est sur l'accueil et dans la FAQ générale. |

### Fiche : Écran solaire SPF 50 (`/soins/ecran-solaire-spf50`)

| | Actuel | Proposé |
|---|---|---|
| Title | Écran solaire SPF 50 anti-taches, fabriqué au Maroc \| OTAGE (59 car.) | Écran solaire SPF 50 anti-taches \| OTAGE (40 car.) |
| Meta description | Écran solaire OTAGE N°04 : SPF 50, haute protection UVA/UVB, pour que les taches ne reviennent pas. Dernière étape de la routine du matin. Fabriqué au Maroc. (157 car.) | Écran solaire SPF 50, haute protection UVA et UVB, pour limiter le retour des taches. Dès 112 DH, livré en 24 à 72 h au Maroc, payé à la livraison. (147 car.) |
| H1 | Écran SPF 50. | Écran solaire SPF 50. |

**Haut de fiche : pastille et surtitre**

| Actuel | Proposé |
|---|---|
| N° 04 · Routine anti-taches (pastille) ; N° 04 sur 04 · Le geste qui protège tout (surtitre) | Fabriqué au Maroc (pastille) ; N° 04 sur 04 · Routine anti-taches (surtitre) |

**Au-dessus de la ligne de flottaison : H1, phrase, avantages, formats, bouton, atouts**

| Actuel | Proposé |
|---|---|
| Écran SPF 50. Le soleil réveille les taches. L'écran les empêche de revenir : le dernier geste du matin, tous les jours. SPF 50 · UVA / UVB · Évite le retour des taches · Tous les matins · Dès 112 DH Paiement à la réception. Livraison 35 à 45 DH. 7 jours pour changer d'avis. | Écran solaire SPF 50.<br>Pour protéger ta peau des UVA et des UVB, et limiter le retour des taches.<br>Tuiles : SPF 50, UVA et UVB · Livré en 24 à 72 h · Payé à la livraison · Retour 7 jours · Dès 112 DH<br>Sous le bouton : Livraison 35 à 45 DH selon ta ville. |

**« Actifs et rôle » (l'étiquette)**

| Actuel | Proposé |
|---|---|
| Sans écran, les taches reviennent. SPF 50 : Le plus haut niveau de protection contre les coups de soleil (UVB). Pour une peau qui a des taches, c'est le minimum recommandé au Maroc. UVA / UVB : Il protège des deux types de rayons : UVB (coups de soleil) et UVA (taches, vieillissement). Ce sont surtout les UVA qui font revenir les taches. Le bon geste (chaque matin) : En dernier, après la crème. Renouvelle toutes les 2 heures au soleil. Sans écran, le sérum et la crème travaillent pour rien. | L'écran SPF 50 : ses 2 protections.<br>- SPF 50 : le plus haut niveau de protection contre les coups de soleil (UVB).<br>- UVA : protège aussi des UVA, ceux qui foncent les taches et les font revenir. |

**NOUVEAU « Écran solaire SPF 50, pour qui ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | Pour toute peau qui suit une routine anti-taches. C'est l'étape 4, le matin seulement.<br>Lien : Taches pigmentaires : causes et routine<br>Lien : Mélasma et masque de grossesse : que faire ? |

**NOUVEAU « Comment utiliser l'écran solaire SPF 50 ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | 1. Le matin, en dernier, après la crème.<br>2. Applique sur tout le visage.<br>3. Au soleil, renouvelle toutes les 2 heures. |

**NOUVEAU « Combien de temps pour voir des résultats ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | L'écran ne fait pas disparaître les taches : il limite leur retour. C'est lui qui laisse le sérum et la crème agir. |

**Avis**

| Actuel | Proposé |
|---|---|
| Chaque peau est différente : ce message raconte l'expérience d'une cliente, pas une promesse de résultat. | Chaque peau est différente : c'est un témoignage, pas une promesse. |

**FAQ produit (« Tu te poses la question ? »)**

| Actuel | Proposé |
|---|---|
| Tu te poses la question ? Comment utiliser l'écran solaire SPF 50 ? Le matin, en dernier. Renouvelle toutes les 2 heures au soleil. C'est l'étape 4 de la routine anti-taches (le matin). Que contient l'écran solaire SPF 50 ? Haute protection, UVA/UVB. Quelle contenance et quel prix ? 30 ml en Petit format, 50 ml en Grand format. À l'unité : 112 DH en Petit format, 190 DH en Grand format. Dans la gamme anti-taches complète (4 soins) : 299 DH en Petit format au lieu de 496 DH, 599 DH en Grand format au lieu de 800 DH. La livraison de la gamme est offerte ; à l'unité, elle coûte de 35 à 45 DH selon la ville. Pourquoi l'écran solaire est-il indispensable contre les taches ? Parce que sans protection, les taches reviennent. L'écran solaire SPF 50 protège des UVA et des UVB : applique-le chaque matin en dernier, et renouvelle-le toutes les 2 heures au soleil. Faut-il le mettre le soir ? Non. Le soir, la routine s'arrête à l'étape 3 (la crème). J'ai la peau sensible. Fais d'abord un essai sur une petite zone, dans le pli du coude ou derrière l'oreille, et attends 24 h. En cas de rougeur ou d'irritation, arrête et demande conseil à un professionnel. Je suis enceinte ou j'allaite, je peux l'utiliser ? Demande d'abord l'avis de ton médecin ou de ton pharmacien, en lui montrant la liste des ingrédients. C'est plus sûr. Je suis livrée en combien de temps ? Compte 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer ta commande. | Tu te poses la question ?<br>**Quel prix pour l'écran solaire SPF 50 ?** 112 DH les 30 ml, 190 DH les 50 ml. Il est aussi dans la gamme complète, dès 299 DH.<br>**Faut-il le mettre le soir ?** Non. Le soir, la routine s'arrête à l'étape 3, la crème.<br>**Faut-il en mettre quand il n'y a pas de soleil ?** Oui. Les UVA traversent les nuages et les vitres.<br>**Et si j'ai la peau sensible ?** Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil.<br>**Je suis enceinte ou j'allaite, je peux l'utiliser ?** Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients.<br>**Je suis livrée en combien de temps ?** En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer. |

**Autres soins (« Le reste de la maison »)**

| Actuel | Proposé |
|---|---|
| Le reste de la maison. | Les autres soins OTAGE. |

**Contenu SEO retiré ou déplacé**

| Contenu | Où il va |
|---|---|
| FAQ « Comment utiliser l'écran solaire SPF 50 ? » | Bloc H2 « Comment utiliser… ? » (même page), en étapes numérotées. |
| FAQ « Que contient l'écran solaire SPF 50 ? » | Bloc « Actifs et rôle » (même page). |
| Phrase sur le prix de la gamme dans la réponse « prix » | Réduite à « aussi dans la gamme complète, dès 299 DH » ; le détail est sur l'accueil et dans la FAQ générale. |
| FAQ « Pourquoi l'écran solaire est-il indispensable contre les taches ? » | Phrase d'accroche et bloc « Résultats » (même page). |
| « Pour une peau qui a des taches, c'est le minimum recommandé au Maroc » | Retirée : affirmation sans source (à rétablir seulement si le pharmacien la confirme). |
| Actif « Le bon geste » | Bloc « Comment utiliser… ? » (même page). |

### Fiche : Sérum contour des yeux (`/soins/contour-des-yeux`)

| | Actuel | Proposé |
|---|---|---|
| Title | Sérum contour des yeux pour les cernes, à la caféine \| OTAGE (60 car.) | Sérum contour des yeux à la caféine \| OTAGE (43 car.) |
| Meta description | Sérum contour des yeux OTAGE N°05, 15 ml, applicateur bille : caféine, acide hyaluronique, aloe vera. Pour les cernes et le regard fatigué. Fabriqué au Maroc. (158 car.) | Sérum contour des yeux à la caféine, 15 ml, applicateur bille, pour atténuer l'aspect des cernes. 185 DH, ou 3 pour 370 DH, payé à la livraison. (144 car.) |
| H1 | Contour des yeux. | Sérum contour des yeux. |

**Haut de fiche : pastille et surtitre**

| Actuel | Proposé |
|---|---|
| N° 05 · Contour des yeux (pastille) ; N° 05 · Fabriqué au Maroc (surtitre) | Fabriqué au Maroc (pastille) ; N° 05 · Contour des yeux (surtitre) |

**Au-dessus de la ligne de flottaison : H1, phrase, avantages, formats, bouton, atouts**

| Actuel | Proposé |
|---|---|
| Contour des yeux. Un sérum léger pour la peau fine sous les yeux : il atténue l'aspect des cernes et rafraîchit le regard, matin et soir. Atténue les cernes · Caféine · Acide hyaluronique · Aloe vera · 3 pour 370 DH Paiement à la réception. Livraison 35 à 45 DH. 7 jours pour changer d'avis. | Sérum contour des yeux.<br>Pour atténuer l'aspect des cernes et rafraîchir le regard, matin et soir.<br>Tuiles : Atténue les cernes · Livré en 24 à 72 h · Payé à la livraison · Retour 7 jours · 3 pour 370 DH<br>Sous le bouton : Livraison 35 à 45 DH selon ta ville. |

**« Actifs et rôle » (l'étiquette)**

| Actuel | Proposé |
|---|---|
| Trois actifs. Un regard reposé. Caféine : Elle aide à atténuer l'aspect des poches et des cernes. Le regard paraît moins fatigué. Acide hyaluronique : Il hydrate la peau fine du contour de l'œil. La peau est plus lisse, plus repulpée. Aloe vera : Elle apaise et rafraîchit. Une sensation de fraîcheur dès l'application. | Le contour des yeux : ses 3 actifs.<br>- Caféine : aide à atténuer l'aspect des poches et des cernes.<br>- Acide hyaluronique : hydrate la peau fine sous l'œil.<br>- Aloe vera : apaise et rafraîchit dès l'application. |

**NOUVEAU « Sérum contour des yeux, pour qui ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | Pour les cernes et le contour des yeux fatigué. Texture légère, applicateur bille, compatible avec le maquillage.<br>Lien : Cernes : causes et soin contour des yeux |

**NOUVEAU « Comment utiliser le sérum contour des yeux ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | 1. Matin et soir, sur peau propre.<br>2. Passe la bille sous l'œil, de l'intérieur vers l'extérieur.<br>3. Tapote doucement du bout du doigt. |

**NOUVEAU « Combien de temps pour voir des résultats ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | Une sensation de fraîcheur dès l'application. Sur les cernes, l'effet dépend de leur origine : hérédité, fatigue ou pigment. |

**FAQ produit (« Tu te poses la question ? »)**

| Actuel | Proposé |
|---|---|
| Tu te poses la question ? Comment utiliser le sérum contour des yeux ? Passe la bille sous l'œil, de l'intérieur vers l'extérieur, puis tapote doucement. À utiliser matin et soir. Que contient le sérum contour des yeux ? Aloe vera, Acide hyaluronique, Caféine. Quelle contenance et quel prix ? 15 ml. Il coûte 185 DH, ou 123 DH le sérum avec l'offre 2 + 1 (370 DH les 3). Livraison : de 35 à 45 DH selon la ville. Peut-on le mettre sous le maquillage ? Oui : sa texture légère se glisse sous le maquillage, matin et soir. J'ai la peau sensible. Fais d'abord un essai sur une petite zone, dans le pli du coude ou derrière l'oreille, et attends 24 h. En cas de rougeur ou d'irritation, arrête et demande conseil à un professionnel. Je suis enceinte ou j'allaite, je peux l'utiliser ? Demande d'abord l'avis de ton médecin ou de ton pharmacien, en lui montrant la liste des ingrédients. C'est plus sûr. Je suis livrée en combien de temps ? Compte 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer ta commande. | Tu te poses la question ?<br>**Quel prix pour le sérum contour des yeux ?** 185 DH les 15 ml. Avec l'offre 2 + 1 : 370 DH les 3, soit 123 DH le sérum.<br>**Peut-on le mettre sous le maquillage ?** Oui. Sa texture légère se glisse sous le maquillage.<br>**Et si j'ai la peau sensible ?** Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil.<br>**Je suis enceinte ou j'allaite, je peux l'utiliser ?** Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients.<br>**Je suis livrée en combien de temps ?** En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer. |

**Autres soins (« Le reste de la maison »)**

| Actuel | Proposé |
|---|---|
| Le reste de la maison. | Les autres soins OTAGE. |

**Contenu SEO retiré ou déplacé**

| Contenu | Où il va |
|---|---|
| FAQ « Comment utiliser le sérum contour des yeux ? » | Bloc H2 « Comment utiliser… ? » (même page), en étapes numérotées. |
| FAQ « Que contient le sérum contour des yeux ? » | Bloc « Actifs et rôle » (même page). |
| Phrase sur le prix de la gamme dans la réponse « prix » | Réduite à « aussi dans la gamme complète, dès 299 DH » ; le détail est sur l'accueil et dans la FAQ générale. |

### Fiche : Déodorant crème (`/soins/deodorant-creme`)

| | Actuel | Proposé |
|---|---|---|
| Title | Déodorant crème sans aluminium, fabriqué au Maroc \| OTAGE (57 car.) | Déodorant crème sans aluminium, 5 ingrédients \| OTAGE (53 car.) |
| Meta description | Déodorant crème OTAGE N°06 : sans sels d'aluminium, 5 ingrédients. Offre 2 + 1, paiement à la livraison partout au Maroc. (121 car.) | Déodorant crème sans sels d'aluminium, 5 ingrédients, pot de 50 ml. Agit sur les odeurs sans bloquer la transpiration. 85 DH, payé à la livraison. (146 car.) |
| H1 | Déodorant crème. | Déodorant crème sans aluminium. (si l'allégation est validée ; sinon : Déodorant crème.) |

**Haut de fiche : pastille et surtitre**

| Actuel | Proposé |
|---|---|
| N° 06 · Soin du corps · 50 ml (pastille) ; Nouveau · Fabriqué au Maroc (surtitre) | Fabriqué au Maroc (pastille) ; N° 06 · Nouveau · 50 ml (surtitre) |

**Au-dessus de la ligne de flottaison : H1, phrase, avantages, formats, bouton, atouts**

| Actuel | Proposé |
|---|---|
| Déodorant crème. Un baume fondant qui s'occupe des odeurs. Cinq ingrédients, rien d'autre. Ne bloque pas la transpiration · Sans aluminium · Sans parabène · Sans sulfate · 85 DH seulement Paiement à la réception. Livraison 35 à 45 DH. 7 jours pour changer d'avis. | Déodorant crème sans aluminium.<br>Pour les odeurs, avec 5 ingrédients et sans sels d'aluminium.<br>Tuiles : Agit sur les odeurs · Livré en 24 à 72 h · Payé à la livraison · Retour 7 jours · 85 DH<br>Sous le bouton : Livraison 35 à 45 DH selon ta ville. |

**« Actifs et rôle » (l'étiquette)**

| Actuel | Proposé |
|---|---|
| Cinq ingrédients. Pas un de plus. Oxyde de zinc : Un minéral qui limite le développement des bactéries responsables des odeurs. L'actif principal : il agit sur l'odeur sans bloquer la transpiration. Huile de coco : Elle donne au baume sa texture fondante et participe à l'action contre les odeurs. Elle fond au contact de la peau : l'application est facile. Huile de jojoba : Elle nourrit et adoucit la peau fine des aisselles. Pour une peau confortable, même après le rasage. Cire d'abeille : Elle donne sa tenue au baume et protège la peau. Sans elle, la crème serait liquide dans le pot. Vitamine E : Un antioxydant qui protège la formule et la peau. Elle aide la crème à rester stable dans le temps. | Le déodorant crème : ses 5 ingrédients.<br>- Oxyde de zinc : limite les bactéries qui causent les odeurs.<br>- Huile de coco : donne au baume sa texture fondante.<br>- Huile de jojoba : nourrit et adoucit la peau des aisselles.<br>- Cire d'abeille : donne sa tenue au baume.<br>- Vitamine E : antioxydant qui protège la formule dans le temps. |

**NOUVEAU « Déodorant crème, pour qui ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | Pour toi si tu veux un déodorant sans sels d'aluminium. Il agit sur les odeurs, pas sur la transpiration. |

**NOUVEAU « Comment utiliser le déodorant crème ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | 1. Le matin, sur une aisselle propre et sèche.<br>2. Prends un peu de baume du bout du doigt.<br>3. Laisse-le fondre, puis applique. |

**NOUVEAU « Combien de temps pour voir des résultats ? » (H2)**

| Actuel | Proposé |
|---|---|
| _(n’existe pas)_ | Il ne bloque pas la transpiration : transpirer est normal. Il agit sur les odeurs, et la tenue varie d'une personne à l'autre. |

**FAQ produit (« Tu te poses la question ? »)**

| Actuel | Proposé |
|---|---|
| Tu te poses la question ? Comment utiliser le déodorant crème ? Prends un peu de baume du bout du doigt, laisse-le fondre puis applique-le sur l'aisselle propre et sèche. À utiliser le matin. Que contient le déodorant crème ? Oxyde de zinc, Huile de coco, Huile de jojoba, Cire d'abeille, Vitamine E. Quelle contenance et quel prix ? 50 ml. Il coûte 85 DH, ou 57 DH le pot avec l'offre 2 + 1 (170 DH les 3). Livraison : de 35 à 45 DH selon la ville. Est-ce qu'il bloque la transpiration ? Non. Sans sels d'aluminium, il ne bloque pas la transpiration : il agit sur les odeurs. Transpirer est normal. J'ai la peau sensible. Fais d'abord un essai sur une petite zone, dans le pli du coude ou derrière l'oreille, et attends 24 h. En cas de rougeur ou d'irritation, arrête et demande conseil à un professionnel. Je suis enceinte ou j'allaite, je peux l'utiliser ? Demande d'abord l'avis de ton médecin ou de ton pharmacien, en lui montrant la liste des ingrédients. C'est plus sûr. Je suis livrée en combien de temps ? Compte 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer ta commande. | Tu te poses la question ?<br>**Quel prix pour le déodorant crème ?** 85 DH le pot de 50 ml. Avec l'offre 2 + 1 : 170 DH les 3, soit 57 DH le pot.<br>**Et si j'ai la peau sensible ?** Fais d'abord un test de 24 h dans le pli du coude. En cas de rougeur, arrête et demande conseil.<br>**Je suis enceinte ou j'allaite, je peux l'utiliser ?** Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients.<br>**Je suis livrée en combien de temps ?** En 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer. |

**Autres soins (« Le reste de la maison »)**

| Actuel | Proposé |
|---|---|
| Le reste de la maison. | Les autres soins OTAGE. |

**Contenu SEO retiré ou déplacé**

| Contenu | Où il va |
|---|---|
| FAQ « Comment utiliser le déodorant crème ? » | Bloc H2 « Comment utiliser… ? » (même page), en étapes numérotées. |
| FAQ « Que contient le déodorant crème ? » | Bloc « Actifs et rôle » (même page). |
| Phrase sur le prix de la gamme dans la réponse « prix » | Réduite à « aussi dans la gamme complète, dès 299 DH » ; le détail est sur l'accueil et dans la FAQ générale. |
| FAQ « Est-ce qu'il bloque la transpiration ? » | Bloc « Résultats » et « Pour qui » (même page) ; allégation à valider. |

### Conseils : taches pigmentaires (`/taches-pigmentaires`)

| | Actuel | Proposé |
|---|---|---|
| Title | Taches pigmentaires du visage : causes et routine \| OTAGE (57 car.) | Taches pigmentaires : causes et routine \| OTAGE (47 car.) |
| Meta description | D'où viennent les taches pigmentaires (hyperpigmentation), ce qui les fait foncer et quelle routine anti-taches adopter. Soins fabriqués au Maroc. (146 car.) | Taches pigmentaires : d'où elles viennent, ce qui les fonce et la routine pour les atténuer pas à pas. Conseils simples, sans promesse miracle. (143 car.) |
| H1 | Taches pigmentaires sur le visage : causes, conseils et routine | Taches pigmentaires : causes et routine pour les atténuer |

**Introduction → réponse directe**

| Actuel | Proposé |
|---|---|
| Une tache pigmentaire est une zone de peau plus foncée que le reste du visage. On parle aussi de taches brunes ou d'hyperpigmentation. Elles ne sont pas dangereuses dans la grande majorité des cas, mais elles peuvent gêner. Cette page explique d'où elles viennent, ce qui les aggrave, et comment construire une routine régulière pour les atténuer petit à petit. | Une tache pigmentaire est une zone où la peau fabrique trop de mélanine. Pour l'atténuer : écran solaire chaque matin et routine régulière, avec patience. |

**D'où viennent les taches pigmentaires ?**

| Actuel | Proposé |
|---|---|
| La couleur de la peau vient d'un pigment, la mélanine. Quand la peau en fabrique trop à un endroit, une tache apparaît. Plusieurs choses peuvent déclencher cette surproduction : Le soleil : c'est la cause la plus fréquente. Les UV stimulent la mélanine, et les taches foncent à chaque exposition sans protection. Les hormones : grossesse, contraception ou changements hormonaux peuvent provoquer un mélasma (le « masque de grossesse »). Les marques laissées par un bouton, une brûlure ou une irritation : c'est l'hyperpigmentation post-inflammatoire. L'âge : avec le temps et le soleil accumulé, de petites taches apparaissent sur le visage et les mains. | - Le soleil : les UV stimulent la mélanine, les taches foncent.<br>- Les hormones : grossesse ou contraception peuvent donner un mélasma.<br>- Une inflammation : un bouton ou une brûlure laisse une marque brune.<br>- L'âge : le soleil accumulé fait apparaître de petites taches. |

**Ce qui aide vraiment → Qu'est-ce qui aide vraiment ?**

| Actuel | Proposé |
|---|---|
| Ce qui aide vraiment. Protéger sa peau du soleil tous les jours, même en ville et même en hiver. Sans protection, les taches reviennent. Être régulière : une routine suivie matin et soir compte plus que le nombre de produits. Être patiente : les taches s'estompent petit à petit, pas du jour au lendemain. Le rythme varie d'une peau à l'autre. Éviter de gratter, frotter fort ou percer les boutons : toute irritation peut laisser une nouvelle marque. Introduire un nouveau soin progressivement, après un essai sur une petite zone. | Qu'est-ce qui aide vraiment ?<br>- L'écran solaire chaque jour, même en hiver.<br>- La régularité, matin et soir, plus que le nombre de produits.<br>- Ne pas gratter ni percer les boutons.<br>- Tester tout nouveau soin 24 h sur une petite zone. |

**« Une routine en 4 étapes » + « Les soins OTAGE » + « La routine, étape par étape »**

| Actuel | Proposé |
|---|---|
| Une routine anti-taches en 4 étapes. Le matin : nettoyer, traiter, hydrater, protéger. Le soir : les trois premières étapes, sans écran solaire. C'est la logique de la routine OTAGE, présentée ci-dessous. Les soins OTAGE pour les taches. La gamme anti-taches OTAGE est conçue pour les taches brunes et le teint irrégulier. Ses 4 soins se complètent : Gel nettoyant anti-taches. Étape 1. Nettoie en douceur sans dessécher et prépare la peau à recevoir les soins. Figue de Barbarie, Louban, Sans sulfate. Voir le soin. Sérum anti-taches. Étape 2. Le soin concentré de la gamme, qui cible les taches. Matcha, Calendula, Alpha-arbutine. Voir le soin. Crème anti-taches. Étape 3. Hydrate, unifie le teint et scelle le sérum. Niacinamide, Acide hyaluronique, AHA. Voir le soin. Écran solaire SPF 50. Étape 4, le matin. Protège des UVA et des UVB pour limiter le retour des taches. Haute protection, UVA/UVB. Voir le soin. La routine, étape par étape. Le matin : les 4 étapes. Le soir : les 3 premières, sans écran solaire. Gel nettoyant anti-taches. Matin et soir, sur peau humide. Masse 30 secondes, puis rince. Sérum anti-taches. 3 à 4 gouttes sur peau sèche, en tapotant du bout des doigts. Crème anti-taches. Une noisette sur le visage et le cou, en mouvements vers le haut. Écran solaire SPF 50. Le matin, en dernier. Renouvelle toutes les 2 heures au soleil. | Quelle routine pour atténuer les taches ?<br>Le matin, les 4 étapes. Le soir, les 3 premières.<br>1. Gel nettoyant anti-taches : masse 30 secondes sur peau humide, puis rince.<br>2. Sérum anti-taches : 3 à 4 gouttes sur peau sèche, en tapotant.<br>3. Crème anti-taches : une noisette sur le visage et le cou.<br>4. Écran solaire SPF 50 : le matin, en dernier.<br>Bouton : Voir la gamme complète · dès 299 DH |

**Bloc « Demande l'avis d'un professionnel » → Quand consulter un dermatologue ?**

| Actuel | Proposé |
|---|---|
| Demande l'avis d'un professionnel. | Quand consulter un dermatologue ?<br>Si une tache change de forme, de couleur ou de taille, saigne ou démange. Aussi si tes taches sont étendues ou anciennes. |

**Questions fréquentes**

| Actuel | Proposé |
|---|---|
| Questions fréquentes Combien de temps faut-il pour atténuer une tache pigmentaire ? Il n'y a pas de délai garanti. Les taches s'estompent petit à petit, pas du jour au lendemain, et le rythme varie d'une peau à l'autre. Ce qui compte, c'est la régularité matin et soir et l'écran solaire chaque matin. Les taches peuvent-elles revenir ? Oui, surtout avec le soleil. Sans protection solaire, les taches reviennent. C'est pour cela que l'écran solaire SPF 50 fait partie de la routine du matin. Faut-il mettre de l'écran solaire même quand il n'y a pas de soleil ? Oui. Les UVA traversent les nuages et les vitres. Applique l'écran solaire chaque matin en dernier, et renouvelle-le toutes les 2 heures au soleil. J'ai la peau sensible, je peux suivre une routine anti-taches ? Fais d'abord un essai sur une petite zone, dans le pli du coude ou derrière l'oreille, et attends 24 h. En cas de rougeur ou d'irritation, arrête et demande conseil à un professionnel. | Questions fréquentes<br>**Combien de temps pour atténuer une tache pigmentaire ?** Il n'y a pas de délai garanti. Les taches s'atténuent petit à petit, avec régularité et écran solaire.<br>**Les taches peuvent-elles revenir ?** Oui, surtout avec le soleil. C'est pour ça que l'écran SPF 50 est dans la routine du matin.<br>**Faut-il de l'écran solaire quand il n'y a pas de soleil ?** Oui. Les UVA traversent les nuages et les vitres.<br>**J'ai la peau sensible, je peux suivre la routine ?** Fais d'abord un test de 24 h sur une petite zone. En cas de rougeur, arrête et demande conseil. |

**En-tête**

| Actuel | Proposé |
|---|---|
| Commander | Commander · dès 299 DH |

**Contenu SEO retiré ou déplacé**

| Contenu | Où il va |
|---|---|
| Phrase « Elles ne sont pas dangereuses dans la grande majorité des cas » | Section « Quand consulter un dermatologue ? » (même page), à faire relire par le pharmacien. |
| Description de chaque soin (actifs, bénéfice) | Fiches produits ; ici, seuls le nom et le geste restent, avec un lien nommé vers chaque fiche. |

### Conseils : cernes (`/cernes`)

| | Actuel | Proposé |
|---|---|---|
| Title | Cernes : causes, conseils et soin contour des yeux \| OTAGE (58 car.) | Cernes : causes et soin contour des yeux \| OTAGE (48 car.) |
| Meta description | Pourquoi les cernes apparaissent, les gestes simples pour un regard moins fatigué et comment utiliser un sérum contour des yeux à la caféine. (141 car.) | Cernes : d'où ils viennent, les gestes qui aident et comment appliquer un sérum contour des yeux à la caféine. Conseils simples, sans promesse miracle. (151 car.) |
| H1 | Cernes et contour des yeux fatigué : causes et gestes simples | Cernes : causes et gestes pour un regard reposé |

**Introduction → réponse directe**

| Actuel | Proposé |
|---|---|
| Les cernes sont des zones plus sombres ou creusées sous les yeux. La peau y est très fine : tout se voit plus vite qu'ailleurs sur le visage, la fatigue comme les petits vaisseaux. Ils sont très courants et sans gravité dans la plupart des cas. On ne les efface pas d'un coup, mais quelques habitudes et un soin adapté peuvent aider le contour des yeux à paraître moins fatigué. | Les cernes viennent de l'hérédité, de la fatigue, d'une peau fine ou du pigment. Sommeil, protection solaire et soin contour des yeux aident à les atténuer. |

**Pourquoi a-t-on des cernes ?**

| Actuel | Proposé |
|---|---|
| L'hérédité : certaines familles et certaines carnations ont naturellement le contour des yeux plus foncé. Le manque de sommeil et la fatigue, qui rendent le teint plus terne et les cernes plus visibles. Une peau très fine sous l'œil, qui laisse voir les petits vaisseaux (cernes bleutés ou violacés). Un excès de pigment (cernes bruns), que le soleil et les frottements peuvent accentuer. L'âge : la peau s'affine et le contour de l'œil se creuse avec le temps. | - L'hérédité : certaines familles ont le contour des yeux plus foncé.<br>- La fatigue : le teint devient terne, les cernes se voient plus.<br>- Une peau fine : les petits vaisseaux se voient (cernes bleutés).<br>- Le pigment : cernes bruns, accentués par le soleil et les frottements.<br>- L'âge : la peau s'affine et le contour de l'œil se creuse. |

**Les gestes qui aident → Qu'est-ce qui aide ?**

| Actuel | Proposé |
|---|---|
| Les gestes qui aident. Dormir suffisamment et à heures régulières, autant que possible. Ne pas se frotter les yeux, et se démaquiller en douceur. Protéger le contour des yeux du soleil : lunettes, et écran solaire sur le visage. Appliquer son soin contour des yeux matin et soir, avec légèreté, sans tirer la peau. | Qu'est-ce qui aide contre les cernes ?<br>- Dormir assez, à heures régulières.<br>- Ne pas te frotter les yeux ; te démaquiller en douceur.<br>- Protéger tes yeux du soleil : lunettes et écran solaire.<br>- Un soin contour des yeux matin et soir, sans tirer la peau. |

**Comment appliquer + « Le soin OTAGE »**

| Actuel | Proposé |
|---|---|
| Comment appliquer un sérum contour des yeux. Passe la bille sous l'œil, de l'intérieur vers l'extérieur, puis tapote doucement du bout du doigt. Une petite quantité suffit. Le sérum OTAGE a une texture légère qui se glisse sous le maquillage. Le soin OTAGE pour le contour des yeux. OTAGE propose un sérum pensé pour les cernes et le contour des yeux fatigué : Sérum contour des yeux. 15 ml, applicateur bille. Aloe vera, acide hyaluronique et caféine. Matin et soir. Voir le soin. | Comment appliquer un sérum contour des yeux ?<br>1. Matin et soir, sur peau propre.<br>2. Passe la bille sous l'œil, de l'intérieur vers l'extérieur.<br>3. Tapote doucement du bout du doigt.<br>Lien : Sérum contour des yeux à la caféine · 185 DH |

**Bloc « Demande l'avis d'un professionnel » → Quand consulter ?**

| Actuel | Proposé |
|---|---|
| Des cernes apparus brusquement, d'un seul côté, ou accompagnés d'un gonflement ou d'une gêne méritent l'avis d'un médecin. Si tes cernes sont très marqués depuis toujours, un dermatologue pourra t'expliquer leur origine et ce qu'on peut raisonnablement en attendre. | Quand consulter un médecin ?<br>Si tes cernes apparaissent d'un coup, d'un seul côté, ou avec un gonflement. Un dermatologue peut aussi t'expliquer des cernes très marqués depuis toujours. |

**Questions fréquentes**

| Actuel | Proposé |
|---|---|
| Questions fréquentes Un sérum peut-il faire disparaître les cernes ? Aucun soin ne peut promettre de les faire disparaître. Selon leur origine (hérédité, peau fine, pigment), les cernes s'atténuent plus ou moins. Un soin régulier et de bonnes habitudes aident le contour des yeux à paraître moins fatigué. Quand appliquer le sérum contour des yeux ? Matin et soir. Passe la bille sous l'œil, de l'intérieur vers l'extérieur, puis tapote doucement. Peut-on le mettre sous le maquillage ? Oui : sa texture légère se glisse sous le maquillage. Je suis enceinte ou j'allaite, je peux l'utiliser ? Demande d'abord l'avis de ton médecin ou de ton pharmacien, en lui montrant la liste des ingrédients. C'est plus sûr. | Questions fréquentes<br>**Un sérum peut-il faire disparaître les cernes ?** Non, aucun soin ne peut le promettre. Selon leur origine, ils s'atténuent plus ou moins.<br>**Peut-on le mettre sous le maquillage ?** Oui. Sa texture légère se glisse sous le maquillage.<br>**Je suis enceinte ou j'allaite, je peux l'utiliser ?** Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients. |

**Autres conseils + en-tête**

| Actuel | Proposé |
|---|---|
| Commander | Commander · 185 DH |

**Contenu SEO retiré ou déplacé**

| Contenu | Où il va |
|---|---|
| « Quand appliquer le sérum contour des yeux ? » (FAQ) | Section « Comment appliquer un sérum contour des yeux ? » (même page) et fiche du soin. |
| Présentation du soin OTAGE (actifs, contenance) | Fiche Sérum contour des yeux ; ici, un lien nommé avec le prix. |

### Conseils : taches d'acné (`/taches-acne`)

| | Actuel | Proposé |
|---|---|---|
| Title | Taches d'acné : causes, conseils et routine \| OTAGE (51 car.) | Taches d'acné : comment atténuer les marques \| OTAGE (52 car.) |
| Meta description | Les marques brunes laissées par les boutons sont une hyperpigmentation post-inflammatoire. Ce qui les aggrave, ce qui aide, et quelle routine suivre. (149 car.) | Taches d'acné : pourquoi les boutons laissent des marques brunes, ce qui les aggrave et la routine pour les atténuer. Conseils simples, sans promesse. (150 car.) |
| H1 | Taches d'acné : pourquoi les boutons laissent des marques | Taches d'acné : pourquoi elles restent et comment les atténuer |

**Introduction → réponse directe**

| Actuel | Proposé |
|---|---|
| Après un bouton, il reste souvent une petite marque brune ou rosée. Ce n'est pas une cicatrice : c'est une tache. Quand elle est brune, on parle d'hyperpigmentation post-inflammatoire : la peau a fabriqué plus de pigment à l'endroit de l'inflammation. Quand elle est rose ou rouge, ce sont de petits vaisseaux encore dilatés (érythème post-inflammatoire). Ces marques s'atténuent avec le temps, plus ou moins vite selon les peaux. Les taches brunes sont plus fréquentes sur les peaux mates et foncées. | Une marque brune après un bouton est une tache, pas une cicatrice. Elle s'atténue avec le temps, plus vite si tu la protèges du soleil. |

**Tache ou cicatrice : faire la différence**

| Actuel | Proposé |
|---|---|
| Une tache est plate : seule la couleur change (brun, rose, violacé). C'est le sujet de cette page ; la routine anti-taches concerne surtout les marques brunes. Une cicatrice modifie le relief de la peau : un creux ou une bosse. Un soin cosmétique ne change pas le relief ; c'est au dermatologue de proposer une solution. | Tache ou cicatrice : comment faire la différence ?<br>- Tache : plate, seule la couleur change. Brune, c'est une hyperpigmentation post-inflammatoire.<br>- Rose ou rouge : de petits vaisseaux encore dilatés, qui pâlissent avec le temps.<br>- Cicatrice : un creux ou une bosse. Un soin cosmétique n'y change rien. |

**Ce qui aggrave les taches d'acné**

| Actuel | Proposé |
|---|---|
| Ce qui aggrave les taches d'acné. Percer ou gratter les boutons : l'inflammation dure plus longtemps et la marque est plus foncée. Le soleil sans protection : il fonce les taches et les fait durer. Les gommages agressifs et les produits irritants, qui entretiennent l'inflammation. | Qu'est-ce qui aggrave les taches d'acné ?<br>- Percer ou gratter les boutons : la marque fonce.<br>- Le soleil sans protection : il fonce les taches et les fait durer.<br>- Les gommages agressifs et les produits irritants. |

**Ce qui aide**

| Actuel | Proposé |
|---|---|
| Ce qui aide. Nettoyer la peau en douceur, matin et soir, sans décaper. Appliquer un écran solaire chaque matin. Suivre une routine régulière, et lui laisser le temps d'agir. Tester tout nouveau soin sur une petite zone avant de l'utiliser sur le visage. Demande l'avis d'un professionnel. Si tu as encore des boutons (acné active), des kystes ou des cicatrices en creux, demande l'avis d'un dermatologue avant d'ajouter de nouveaux soins : l'acné se traite, et un traitement adapté évite de nouvelles marques. | Qu'est-ce qui aide ?<br>- Nettoyer en douceur, matin et soir.<br>- Un écran solaire chaque matin.<br>- Une routine régulière, le temps qu'elle agisse.<br>- Tester tout nouveau soin 24 h sur une petite zone.<br>Quand consulter un dermatologue ?<br>Si tu as encore des boutons, des kystes ou des cicatrices en creux. L'acné se traite, et un traitement évite de nouvelles marques. |

**« Les soins OTAGE » + « La routine, étape par étape »**

| Actuel | Proposé |
|---|---|
| Les soins OTAGE pour les marques brunes. La gamme anti-taches OTAGE est conçue pour les taches brunes et le teint irrégulier. Elle ne traite pas l'acné elle-même. Gel nettoyant anti-taches. Étape 1. Un nettoyage doux, sans sulfate, qui ne dessèche pas. Figue de Barbarie, Louban, Sans sulfate. Voir le soin. Sérum anti-taches. Étape 2. Le soin concentré de la gamme, qui cible les taches. Matcha, Calendula, Alpha-arbutine. Voir le soin. Crème anti-taches. Étape 3. Hydrate et unifie le teint. Niacinamide, Acide hyaluronique, AHA. Voir le soin. Écran solaire SPF 50. Étape 4, le matin. Sans protection solaire, les taches foncent et reviennent plus facilement. Haute protection, UVA/UVB. Voir le soin. La routine, étape par étape. Le matin : les 4 étapes. Le soir : les 3 premières, sans écran solaire. Gel nettoyant anti-taches. Matin et soir, sur peau humide. Masse 30 secondes, puis rince. Sérum anti-taches. 3 à 4 gouttes sur peau sèche, en tapotant du bout des doigts. Crème anti-taches. Une noisette sur le visage et le cou, en mouvements vers le haut. Écran solaire SPF 50. Le matin, en dernier. Renouvelle toutes les 2 heures au soleil. | Quelle routine pour les marques brunes ?<br>Elle atténue les taches, elle ne traite pas l'acné. Le soir, sans écran.<br>1. Gel nettoyant anti-taches : nettoie sans dessécher, sans sulfate.<br>2. Sérum anti-taches : 3 à 4 gouttes sur peau sèche.<br>3. Crème anti-taches : hydrate et unifie le teint.<br>4. Écran solaire SPF 50 : le matin, en dernier.<br>Bouton : Voir la gamme complète · dès 299 DH |

**Questions fréquentes**

| Actuel | Proposé |
|---|---|
| Questions fréquentes Les taches d'acné partent-elles toutes seules ? Souvent, elles s'atténuent avec le temps, mais cela peut prendre plusieurs mois et le rythme varie d'une peau à l'autre. Le soleil sans protection les fait durer. La routine anti-taches soigne-t-elle l'acné ? Non. Elle est conçue pour les taches brunes et le teint irrégulier, pas pour traiter les boutons. Pour une acné active, demande l'avis d'un dermatologue. Peut-on utiliser la routine sur une peau qui a encore des boutons ? Demande d'abord l'avis d'un dermatologue ou d'un pharmacien, et fais un essai sur une petite zone pendant 24 h. En cas de rougeur ou d'irritation, arrête. | Questions fréquentes<br>**Les taches d'acné partent-elles toutes seules ?** Souvent, oui, en plusieurs mois. Le soleil sans protection les fait durer.<br>**La routine anti-taches soigne-t-elle l'acné ?** Non : elle atténue les taches brunes, pas les boutons. Pour une acné active, vois un dermatologue.<br>**Et si j'ai encore des boutons ?** Demande d'abord à un dermatologue ou à un pharmacien. Puis fais un test de 24 h sur une petite zone. |

**Autres conseils + en-tête**

| Actuel | Proposé |
|---|---|
| Commander | Commander · dès 299 DH |

**Contenu SEO retiré ou déplacé**

| Contenu | Où il va |
|---|---|
| Termes « érythème post-inflammatoire », « peaux mates et foncées » | « érythème » remplacé par une explication simple dans « Tache ou cicatrice » ; la mention des peaux mates disparaît (à confirmer avec le pharmacien). |
| Description de chaque soin | Fiches produits ; ici, nom du soin et geste, avec un lien nommé. |

### Conseils : mélasma et grossesse (`/melasma-grossesse`)

| | Actuel | Proposé |
|---|---|---|
| Title | Mélasma (masque de grossesse) : causes et conseils \| OTAGE (58 car.) | Mélasma et masque de grossesse : que faire ? \| OTAGE (52 car.) |
| Meta description | Le mélasma, ou masque de grossesse, donne des taches brunes sur le visage. Ses causes, le rôle du soleil, et quoi demander à son médecin avant tout soin. (153 car.) | Mélasma et masque de grossesse : causes, rôle du soleil, précautions pendant la grossesse et l'allaitement, et quoi demander à ton médecin avant un soin. (153 car.) |
| H1 | Mélasma et masque de grossesse : comprendre, et précautions pendant la grossesse | Mélasma et masque de grossesse : comprendre et se protéger |

**Introduction → réponse directe**

| Actuel | Proposé |
|---|---|
| Le mélasma se présente comme des taches brunes aux contours irréguliers, souvent symétriques, sur le front, les joues, le nez ou au-dessus de la lèvre. Quand il apparaît pendant la grossesse, on l'appelle le masque de grossesse. Il est sans danger pour la santé, mais il peut durer. Voici ce qu'on sait de ses causes et ce qui aide à le limiter. | Le mélasma donne des taches brunes symétriques, souvent pendant la grossesse. Le geste clé : te protéger du soleil, chaque jour. |

**1. Le mélasma : comprendre**

| Actuel | Proposé |
|---|---|
| Pourquoi le mélasma apparaît-il ? Les hormones : la grossesse, certaines contraceptions et les changements hormonaux stimulent la production de pigment. Le soleil : c'est lui qui déclenche et fonce les taches. Même une courte exposition peut suffire. Le terrain : les peaux mates et foncées, et certaines familles, y sont plus sujettes. Ce qui aide à le limiter. Se protéger du soleil tous les jours, toute l'année : chapeau, ombre, écran solaire à haute protection, renouvelé toutes les 2 heures au soleil. Éviter les expositions aux heures les plus chaudes. Ne pas irriter la peau : pas de gommage agressif ni de produit qui pique ou qui brûle. Être patiente : le mélasma s'atténue lentement et revient facilement avec le soleil. Aucun soin cosmétique ne peut promettre de le faire disparaître. Un mélasma étendu, ancien ou qui te gêne beaucoup se montre à un dermatologue : il existe des traitements médicaux, qui se décident avec lui. | Pourquoi le mélasma apparaît-il ?<br>- Les hormones : grossesse, contraception, changements hormonaux.<br>- Le soleil : il déclenche et fonce les taches, même en peu de temps.<br>- Le terrain : peaux mates et certaines familles y sont plus sujettes.<br>Qu'est-ce qui aide à le limiter ?<br>- Te protéger du soleil chaque jour : chapeau, ombre, écran.<br>- Éviter le soleil aux heures chaudes.<br>- Ne pas irriter la peau : pas de gommage agressif.<br>- Être patiente : aucun soin ne peut promettre de le faire disparaître.<br>Un mélasma étendu ou ancien se montre à un dermatologue. |

**2. Grossesse et allaitement : les précautions**

| Actuel | Proposé |
|---|---|
| Que faire pendant la grossesse ? Se protéger du soleil tous les jours : chapeau, ombre, et une protection solaire validée par ton médecin ou ton pharmacien. Ne pas multiplier les produits : pendant la grossesse et l'allaitement, chaque soin doit être validé par un professionnel de santé. Ne commencer aucun traitement des taches sans avis médical : certains actifs utilisés contre les taches ou les rides (rétinoïdes, hydroquinone) sont déconseillés pendant la grossesse. Rester patiente : le masque de grossesse s'atténue souvent dans les mois qui suivent l'accouchement, mais pas toujours. Et après la grossesse ? Si les taches persistent après l'accouchement et la fin de l'allaitement, une routine anti-taches régulière et une protection solaire quotidienne peuvent aider à les atténuer petit à petit. Le mélasma revient facilement avec le soleil : la protection reste le geste le plus important. Demande l'avis d'un professionnel. Enceinte ou allaitante : avant d'utiliser un soin OTAGE, écran solaire compris, demande l'avis de ton médecin ou de ton pharmacien en lui montrant la liste des ingrédients. Un mélasma étendu ou qui persiste doit être vu par un dermatologue. | Enceinte ou allaitante : quelles précautions ?<br>- Te protéger du soleil, avec un écran validé par ton médecin.<br>- Ne pas multiplier les produits : fais valider chaque soin.<br>- Aucun traitement des taches sans avis médical.<br>- Rétinoïdes et hydroquinone sont déconseillés pendant la grossesse.<br>Et après la grossesse ?<br>Le masque s'atténue souvent dans les mois qui suivent, pas toujours. S'il reste, une routine anti-taches et l'écran solaire peuvent aider. |

**Les soins OTAGE, à voir avec ton médecin**

| Actuel | Proposé |
|---|---|
| Ces soins font partie de la routine anti-taches OTAGE. Pendant la grossesse ou l'allaitement, ne les utilise qu'avec l'accord de ton médecin ou de ton pharmacien. Écran solaire SPF 50. Écran solaire SPF 50, haute protection UVA/UVB : le geste du matin pour limiter le retour des taches. Haute protection, UVA/UVB. Voir le soin. Sérum anti-taches. Le soin concentré de la gamme, qui cible les taches. Matcha, Calendula, Alpha-arbutine. Voir le soin. Crème anti-taches. Hydrate, unifie le teint et scelle le sérum. Niacinamide, Acide hyaluronique, AHA. Voir le soin. | Quels soins OTAGE, avec l'accord de ton médecin ?<br>Enceinte ou allaitante, utilise-les seulement après l'accord de ton médecin.<br>Liens : Écran solaire SPF 50 · Sérum anti-taches · Crème anti-taches |

**Questions fréquentes**

| Actuel | Proposé |
|---|---|
| Questions fréquentes Le masque de grossesse disparaît-il après l'accouchement ? Souvent, il s'atténue dans les mois qui suivent, mais pas toujours et pas complètement chez tout le monde. S'il persiste, demande l'avis d'un dermatologue. Puis-je utiliser les soins OTAGE enceinte ou pendant l'allaitement ? Demande d'abord l'avis de ton médecin ou de ton pharmacien, en lui montrant la liste des ingrédients. C'est plus sûr. Le soleil aggrave-t-il le mélasma ? Oui. Le soleil déclenche et fonce les taches, et le mélasma revient facilement après une exposition. La protection solaire quotidienne est le geste le plus important. | Questions fréquentes<br>**Le masque de grossesse disparaît-il après l'accouchement ?** Souvent, il s'atténue en quelques mois, pas toujours. S'il reste, vois un dermatologue.<br>**Puis-je utiliser les soins OTAGE enceinte ou en allaitant ?** Demande d'abord à ton médecin ou à ton pharmacien. Montre-lui la liste des ingrédients.<br>**Le soleil aggrave-t-il le mélasma ?** Oui. Il fonce les taches et le mélasma revient vite après une exposition. |

**Autres conseils + en-tête**

| Actuel | Proposé |
|---|---|
| Commander | Commander · dès 299 DH |

**Contenu SEO retiré ou déplacé**

| Contenu | Où il va |
|---|---|
| Phrase « Il est sans danger pour la santé, mais il peut durer » | Retirée de l'intro ; à confirmer par le pharmacien si elle doit rester (dans « Pourquoi le mélasma apparaît-il ? »). |
| Titres numérotés « 1. Le mélasma : comprendre », « 2. Grossesse et allaitement » | Remplacés par 4 H2 en questions (même contenu). |

### Avis (`/avis`)

| | Actuel | Proposé |
|---|---|---|
| Title | Avis de clientes sur la gamme anti-taches \| OTAGE (49 car.) | Avis clientes sur la gamme anti-taches \| OTAGE (46 car.) |
| Meta description | Les messages que des clientes OTAGE nous ont envoyés sur Instagram à propos de la gamme anti-taches : captures d'origine et texte retranscrit. (142 car.) | Avis de clientes sur la gamme anti-taches OTAGE : leurs messages Instagram, la capture d'origine et le texte retranscrit, sans retouche ni note. (144 car.) |
| H1 | Ce que nos clientes nous écrivent | Avis clientes sur la gamme anti-taches |

**En-tête**

| Actuel | Proposé |
|---|---|
| Commander | Commander · dès 299 DH |

**H1 + intro + satisfaction**

| Actuel | Proposé |
|---|---|
| Ce que nos clientes nous écrivent. Des messages reçus sur Instagram, montrés tels qu'ils nous ont été envoyés : la capture d'origine, et le texte retranscrit à côté. | Avis clientes sur la gamme anti-taches<br>Leurs messages Instagram, tels quels : capture et texte. |

### À propos (`/a-propos`)

| | Actuel | Proposé |
|---|---|---|
| Title | À propos d'OTAGE et de son fondateur, le Dr Seddiki El Mehdi (60 car.) | À propos d'OTAGE : soins créés par un pharmacien (48 car.) |
| Meta description | OTAGE est une marque marocaine de cosmétique fondée par le Dr Seddiki El Mehdi, pharmacien, sur une volonté de transparence, d'honnêteté et de confiance. (153 car.) | OTAGE, marque marocaine de soins créée par le Dr Seddiki El Mehdi, pharmacien : prix affichés, pas de promesse miracle, paiement à la livraison. (144 car.) |
| H1 | OTAGE : des soins honnêtes, fabriqués au Maroc | OTAGE : des soins honnêtes, fabriqués au Maroc (inchangé) |

**En-tête**

| Actuel | Proposé |
|---|---|
| Commander | Commander · dès 299 DH |

**Introduction**

| Actuel | Proposé |
|---|---|
| OTAGE est une marque marocaine de cosmétique naturelle. Notre promesse tient en une phrase : on ne vend pas du rêve, on vend le résultat. | OTAGE est une marque marocaine de soins, créée par un pharmacien. On te dit ce que fait chaque soin, sans promesse miracle. |

**Le fondateur**

| Actuel | Proposé |
|---|---|
| J'ai constaté la présence de nombreux produits cosmétiques falsifiés sur le marché marocain. Face à ce constat, j'ai décidé de créer OTAGE, une marque de cosmétiques fondée sur une volonté de transparence, d'honnêteté et de confiance. Mon objectif est de proposer des produits avec une attention particulière portée à leur qualité et à la transparence des informations communiquées. | J'ai vu beaucoup de cosmétiques falsifiés au Maroc. J'ai créé OTAGE pour des soins de qualité, avec des informations claires. |

**Ce que nous faisons**

| Actuel | Proposé |
|---|---|
| Nous proposons une routine anti-taches en 4 soins, pensée pour les taches brunes, les taches pigmentaires et le teint irrégulier, ainsi qu'un sérum contour des yeux pour les cernes. Gel nettoyant anti-taches (N° 01) : figue de Barbarie, louban, sans sulfate. Sérum anti-taches (N° 02) : matcha, calendula, alpha-arbutine. Crème anti-taches (N° 03) : niacinamide, acide hyaluronique, AHA. Écran solaire SPF 50 (N° 04) : haute protection, UVA/UVB. Sérum contour des yeux (N° 05) : aloe vera, acide hyaluronique, caféine. Déodorant crème (N° 06) : oxyde de zinc, huile de coco, huile de jojoba, cire d'abeille, vitamine E. | Une routine anti-taches en 4 soins, un sérum contour des yeux et un déodorant crème.<br>Lien : Voir les 6 soins et leurs actifs |

**Honnêtes, concrètement**

| Actuel | Proposé |
|---|---|
| Des prix affichés. Le ticket de commande s'écrit sous tes yeux : tout est affiché, rien n'est caché. Pas de promesse miracle. Les taches s'estompent petit à petit, pas du jour au lendemain. Nous le disons clairement. Tu paies à la livraison. Rien à avancer en ligne, pas besoin de carte bancaire. Livraison en 24 à 72 h partout au Maroc : offerte pour la gamme complète, de 35 à 45 DH selon la ville à l'unité. | - Prix affichés : le ticket se remplit sous tes yeux.<br>- Pas de promesse miracle : les taches s'atténuent petit à petit.<br>- Paiement à la livraison : rien à avancer en ligne.<br>- Livraison en 24 à 72 h, offerte avec la gamme complète. |

**Fabriqué au Maroc, avec un laboratoire partenaire**

| Actuel | Proposé |
|---|---|
| Nos soins sont fabriqués au Maroc, en collaboration avec un laboratoire partenaire, avec des ingrédients comme la figue de Barbarie et le louban. | Fabriqués au Maroc avec un laboratoire partenaire, à partir d'ingrédients comme le louban. |

**Contenu SEO retiré ou déplacé**

| Contenu | Où il va |
|---|---|
| Liste des actifs des 6 soins | Page /soins (cartes) et fiches produits ; lien nommé depuis « Ce que nous faisons ». |
| « cosmétique naturelle » | Retiré (allégation à valider) ; la description générale du site (site.ts) en parle aussi : même question. |

### Livraison et paiement (`/livraison-paiement`)

| | Actuel | Proposé |
|---|---|---|
| Title | Livraison, paiement à la livraison et retours \| OTAGE (53 car.) | Livraison 24 à 72 h, paiement à la livraison \| OTAGE (52 car.) |
| Meta description | Livraison OTAGE en 24 à 72 h partout au Maroc : offerte pour la gamme complète, de 35 à 45 DH à l'unité. Paiement à la livraison, en espèces. (141 car.) | Livraison en 24 à 72 h partout au Maroc : offerte pour la gamme complète, 35 à 45 DH à l'unité. Paiement à la livraison, retour sous 7 jours. (141 car.) |
| H1 | Livraison et paiement | Livraison et paiement à la livraison |

**En-tête**

| Actuel | Proposé |
|---|---|
| Commander | Commander · dès 299 DH |

**Intro + « Comment se passe une commande »**

| Actuel | Proposé |
|---|---|
| Comment se passe une commande | Comment se passe une commande ? |

**Livraison + Paiement + Retours + Réclamations, puis « Questions fréquentes »**

| Actuel | Proposé |
|---|---|
| Livraison. Zone : tout le Maroc. Délai : 24 à 72 h. Gamme complète : livraison offerte, quel que soit le format ou le nombre de gammes. Achat à l'unité (un ou plusieurs soins séparés, sérum contour des yeux) : de 35 à 45 DH selon la ville, ajoutés au total. On te confirme le montant exact par téléphone, avant l'envoi. Paiement. À la livraison, en espèces. Rien à payer en ligne, pas besoin de carte bancaire. Réclamations. Produit abîmé ou erreur dans ta commande ? Écris-nous sur WhatsApp : on échange le produit ou on te rembourse, sans frais pour toi. Écris-nous sur WhatsApp au +212 6 88 91 82 01, on regarde ça avec toi. Questions fréquentes. Je paie quand ? À la livraison, en espèces, quand le livreur te remet ton colis. Rien à payer en ligne, pas besoin de carte bancaire. La livraison est payante ? Pour une gamme complète, elle est offerte, quel que soit le format ou le nombre de gammes. Pour un achat à l'unité, elle coûte de 35 à 45 DH selon la ville, ajoutés au total. On te confirme le montant exact par téléphone. Je suis livrée en combien de temps ? Compte 24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer ta commande. Et après ma commande ? On t'appelle pour confirmer ta commande et ton adresse, puis ton colis part. Tu paies à la réception, c'est tout. Et si j'ai un problème avec ma commande ? Produit abîmé ou erreur dans ta commande ? Écris-nous sur WhatsApp : on échange le produit ou on te rembourse, sans frais pour toi. Et si le produit ne te convient pas, tu as 7 jours pour le retourner (voir la question sur les retours). Je peux retourner ma commande ? Oui. Tu as 7 jours après la réception pour changer d'avis : c'est ton droit de rétractation (article 36 de la loi 31-08). Les produits doivent être non ouverts et non utilisés. Les frais de retour sont pris en charge par OTAGE, et tu choisis : remboursement ou échange. Écris-nous sur WhatsApp pour lancer le retour. | En combien de temps suis-je livrée ?<br>24 à 72 h, partout au Maroc. On t'appelle d'abord pour confirmer.<br>Combien coûte la livraison ?<br>Offerte pour une gamme complète. À l'unité : 35 à 45 DH selon ta ville, confirmés par téléphone.<br>Comment je paie ?<br>À la livraison, en espèces. Rien à payer en ligne.<br>Puis-je retourner ma commande ?<br>(texte légal inchangé : 7 jours, article 36 de la loi 31-08, produits non ouverts, retour aux frais d'OTAGE, remboursement ou échange)<br>Et si mon colis a un problème ?<br>On échange ou on rembourse, sans frais pour toi. Écris-nous sur WhatsApp au +212 6 88 91 82 01. |

**Contenu SEO retiré ou déplacé**

| Contenu | Où il va |
|---|---|
| Bloc « Questions fréquentes » en bas de page | Fusionné avec les sections (devenues des questions) : même contenu, une seule fois. FAQPage JSON-LD = ces questions. |

### Contact (`/contact`)

| | Actuel | Proposé |
|---|---|---|
| Title | Contacter OTAGE : WhatsApp, e-mail et Instagram (47 car.) | Contacter OTAGE : WhatsApp, e-mail et Instagram (inchangé) (47 car.) |
| Meta description | Une question sur ta peau, un soin ou ta commande ? Écris à OTAGE sur WhatsApp, par e-mail ou sur Instagram @otage.1. Réponse 24 h/24. (133 car.) | Une question sur ta peau, un soin ou ta commande ? Écris à OTAGE sur WhatsApp, par e-mail ou sur Instagram @otage.1. On te répond 24 h/24, 7 j/7. (145 car.) |
| H1 | Nous contacter | Contacter OTAGE |

**En-tête**

| Actuel | Proposé |
|---|---|
| Commander | Commander · dès 299 DH |

**H1 + intro**

| Actuel | Proposé |
|---|---|
| Nous contacter. | Contacter OTAGE. |

**Commander**

| Actuel | Proposé |
|---|---|
| Tu peux commander sur le site ou directement sur WhatsApp. Livraison en 24 à 72 h partout au Maroc : offerte pour la gamme complète, de 35 à 45 DH selon la ville pour un achat à l'unité, paiement à la livraison. | Commande sur le site ou sur WhatsApp. Livraison en 24 à 72 h, paiement à la livraison. |

## Ce qui ne change pas (SEO et données structurées)

- Un seul H1 par page (vérifié sur les 16 pages dans l'audit).
- JSON-LD Product, Organization, BreadcrumbList et Article : même structure ; seuls les textes réécrits (descriptions) changent. Prix, offres, `shippingDetails` et `hasMerchantReturnPolicy` viennent toujours de `products.ts` et `site.ts`.
- FAQ : le HTML et le JSON-LD FAQPage sont générés à partir de la même liste (`faq.ts`, ou la liste des questions de la page) ; ils restent identiques par construction.
- Accordéons : tout le texte reste dans le HTML servi (vérifié dans l'audit : la FAQ de l'accueil, 730 mots, est déjà présente sans JavaScript).
- Les prix ne sont écrits nulle part à la main : les meta descriptions avec un prix seront générées depuis `products.ts`.
- llms.txt : régénéré avec les textes finaux à l'étape 3.

## Textes à faire valider (en plus de docs/validation-client.md)

- **Pharmacien :** les nouvelles lignes « Actifs et rôle » des 6 fiches ; les blocs « Résultats » ; les 4 pages conseils réécrites ; la suppression de « minimum recommandé au Maroc » (écran solaire).
- **Client :** les titles et meta descriptions ; les phrases « pour qui » des 6 fiches ; la version courte de la citation du fondateur ; le retrait de « cosmétique naturelle » ; les bénéfices courts des cartes (« Limite le retour des taches », « Agit sur les odeurs, sans aluminium »).
- **Toujours « À valider »** (docs/validation-client.md) : sans aluminium, sans parabène, ne bloque pas la transpiration, sans sulfate, cinq ingrédients pour le déodorant.

## Parcours d'achat : constat

| Page | Bouton principal fixe sur mobile | Prix sur le bouton | Objections à côté du bouton | Frais visibles avant validation |
|---|---|---|---|---|
| Accueil | Oui (barre fixe) | Non → proposé | Non → proposé | Oui (bloc « À l'unité » et ticket de l'offre) |
| Fiches produits | Oui (barre du ticket) | Oui | Partiel : délai absent → proposé | Oui (ticket) |
| /soins, conseils, avis, à propos, livraison, contact | Oui (en-tête fixe) | Non → proposé (décision 4) | Non | Sans objet (commande sur l'accueil ou les fiches) |

## Mesures « avant » (pour la vérification finale)


- **Accueil**, Lighthouse mobile (médiane de 3) : performance 88, accessibilité 100, bonnes pratiques 100, SEO 100 ; LCP 3.7 s, TBT 11 ms, CLS 0.001.
- **Fiche sérum anti-taches**, Lighthouse mobile (médiane de 3) : performance 89, accessibilité 97, bonnes pratiques 100, SEO 100 ; LCP 3.5 s, TBT 14 ms, CLS 0.
- Captures mobile 390 px « avant » : `docs/contenu-v3/avant/` (accueil et fiche sérum, écran et page entière). Mesures brutes : `docs/contenu-v3/avant/lighthouse-avant.json`.

La page arabe n'est pas traitée ici : elle suivra la version française validée, avec la même concision, et chaque nouveau texte ira dans `src/data/ar-relecture.md`.

## Décisions validées (15 octobre 2026)

1. Section « Pour qui ? », « Comment l'utiliser ? », « Résultats » sur les fiches : oui, avec les styles existants, H2 en questions et liens vers les pages conseils.
2. Tuiles des fiches : livraison 24 à 72 h, paiement à la livraison, retour 7 jours ; icônes dans le style existant. Les ingrédients restent dans « L'étiquette ».
3. Cartes produits : 3 actifs, prix et bouton nommé sur /soins.
4. Prix sur le bouton principal, toujours lu depuis products.ts.
5. Pages conseils réécrites maintenant ; elles restent en noindex ; le pharmacien relira la nouvelle version (ajoutée à docs/validation-client.md).
6. Citation du fondateur : version courte préparée, l'actuelle reste en ligne jusqu'à son accord.
7. H1 du déodorant neutre (« Déodorant crème OTAGE ») ; variante « sans aluminium » prête, activée seulement après validation.
8. « Cosmétique naturelle » et « minimum recommandé au Maroc » retirés partout ; le slogan en darija reste comme signature ; la paraphrase « on vend le résultat » est supprimée.
9. « Trouver mon soin » retiré du hero (le diagnostic reste juste en dessous et dans le menu).
10. Contraste foncé pour atteindre 100 en accessibilité.
11. Captures « avant » non versionnées (docs/contenu-v3/avant/ dans .gitignore).
