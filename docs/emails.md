# E-mails de commande : mise en place

Le site envoie deux e-mails à chaque commande, par [Resend](https://resend.com) :

- à la cliente, si elle a donné son adresse : la confirmation (français ou arabe, selon la page où elle a commandé) ;
- à la boutique : une notification interne.

L'e-mail n'est jamais bloquant : si l'envoi échoue, la commande est enregistrée quand même, et l'échec est noté dans la colonne « E-mail de confirmation » du tableur.

## 1. Compte Resend et domaine

1. Créer un compte sur resend.com, puis **Domains → Add Domain** : `otage.ma`. Région conseillée : `eu-west-1` (Irlande), la plus proche du Maroc.
2. Resend affiche alors les enregistrements DNS à créer. **Recopier les valeurs affichées par Resend** : la clé DKIM est propre à chaque domaine, et le serveur MX dépend de la région choisie.

## 2. Enregistrements DNS à ajouter dans Cloudflare

Cloudflare → `otage.ma` → DNS → Records. Pour chacun : **Proxy status « DNS only »** (nuage gris), TTL « Auto ».

| Rôle | Type | Nom | Contenu | Priorité |
|---|---|---|---|---|
| Retours de courrier (MX du sous-domaine d'envoi) | MX | `send` | `feedback-smtp.eu-west-1.amazonses.com` (la région est celle choisie dans Resend) | 10 |
| SPF du sous-domaine d'envoi | TXT | `send` | `v=spf1 include:amazonses.com ~all` | |
| DKIM | TXT | `resend._domainkey` | `p=…` (la longue clé publique affichée par Resend, à copier telle quelle) | |
| DMARC | TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:Dr.mouldwa@gmail.com` | |

- Les trois premiers sont ceux que Resend demande ; le nom et le contenu exacts sont ceux de son écran. Le DMARC n'est pas demandé par Resend mais il est attendu par Gmail et Yahoo.
- `p=none` : on observe d'abord. Après quelques semaines sans problème dans les rapports reçus à l'adresse `rua`, passer à `p=quarantine`.
- Ces enregistrements portent sur le sous-domaine `send.otage.ma` et sur DKIM : ils ne changent rien à la réception du courrier du domaine ni au site.
- Dans Resend, cliquer sur **Verify DNS Records** : le domaine passe à « Verified » (quelques minutes à quelques heures).
- Dans Resend → Domains → otage.ma : laisser **Open Tracking** et **Click Tracking** désactivés. Les e-mails ne contiennent aucun pixel de suivi.

## 3. Variables d'environnement (Vercel → Settings → Environment Variables)

| Variable | Valeur | Obligatoire |
|---|---|---|
| `ORDERS_ENDPOINT` | Adresse du script Google Apps Script qui écrit dans le Google Sheet (`https://script.google.com/macros/s/…/exec`) | Oui : sans elle, aucune commande ne peut être enregistrée |
| `RESEND_API_KEY` | Clé créée dans Resend → API Keys (permission « Sending access », domaine `otage.ma`) | Pour les e-mails |
| `SHOP_EMAIL` | Adresse qui reçoit la notification interne de chaque commande | Pour la notification |
| `EMAIL_FROM` | Expéditeur, si l'on veut autre chose que `OTAGE Cosmétiques <commandes@otage.ma>` | Non |

À créer pour **Production** (et **Preview** si l'on veut tester les aperçus), puis redéployer. En local : copier `.env.example` en `.env.local`.

L'ancienne adresse du script était écrite dans le code du site, donc publique. Pour que plus personne ne puisse écrire dans le tableur sans passer par le site : dans Apps Script, **Déployer → Nouveau déploiement**, mettre la nouvelle adresse dans `ORDERS_ENDPOINT`, puis archiver l'ancien déploiement.

## 4. Mettre à jour le script Google

Le tableur gagne trois colonnes (E-mail, E-mail de confirmation, Langue) et vérifie que chaque numéro de commande est unique.
Dans le Google Sheet : Extensions → Apps Script, remplacer tout le code par `apps-script/otage-commandes.gs`, puis déployer (nouvelle version, ou nouveau déploiement comme ci-dessus).

## 5. Vérifier

```bash
npm run email:preview     # aperçu local des e-mails (français, arabe, notification), sans rien envoyer
npm run check:order       # teste la route /api/order avec un faux tableur et un faux Resend
```

Une fois le DNS vérifié et les variables en place :

1. Passer une vraie commande de test avec sa propre adresse e-mail, en français puis sur `/ar`.
2. Regarder le résultat dans Gmail (web, Android, iOS), Apple Mail et Outlook (web et Windows), en clair et en sombre.
3. [mail-tester.com](https://www.mail-tester.com) : envoyer une commande de test à l'adresse fournie par le site. Objectif : 9/10 ou plus.
