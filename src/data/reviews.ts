/* Avis de clientes affichés dans la fenêtre « Tu hésites ? » de l'accueil (messages WhatsApp, avec leur accord).
   - soin : 0 gel, 1 sérum, 2 crème, 3 écran solaire, ou "gamme"
   - messages : de "cliente" ou "otage" ; rtl: true pour l'arabe ; photo: URL facultative
   - exemple: true affiche l'étiquette « Exemple » (à retirer avant la mise en ligne). */
export type ReviewMessage = { de: "cliente" | "otage"; texte: string; heure?: string; rtl?: boolean; photo?: string };
export type Review = { prenom: string; ville: string; soin: 0 | 1 | 2 | 3 | "gamme"; exemple?: boolean; messages: ReviewMessage[] };

export const reviews: Review[] = [
  { prenom: "Nabila B.", ville: "Cliente OTAGE", soin: "gamme", messages: [
    { de: "cliente", texte: "Cc docteur", heure: "17 sept." },
    { de: "cliente", texte: "Je reviens vers vous pour vous donner un feedback concernant la gamme", heure: "17 sept." },
    { de: "cliente", texte: "Elle est juste PARFAITE", heure: "17 sept." },
    { de: "cliente", texte: "Tbarkllah elik", heure: "17 sept." },
    { de: "cliente", texte: "Le gel nettoyant khatir jidan jidan", heure: "17 sept." },
    { de: "cliente", texte: "Il fait bien son travail", heure: "17 sept." } ] },
  { prenom: "Awatef A.", ville: "Cliente OTAGE", soin: "gamme", messages: [
    { de: "cliente", texte: "دكتور اللمعة بدات تبان و ݣاع ليطاش تقريبا مشاو ب 95 فالمئة", heure: "5 sept., 19:29", rtl: true },
    { de: "cliente", texte: "شكراااا ليك بزاااااف", heure: "19:29", rtl: true },
    { de: "cliente", texte: "والله", heure: "19:29", rtl: true },
    { de: "cliente", texte: "عمرني ننسا خيرك يلا بغيتي ندير اوديو شهادة", heure: "19:29", rtl: true },
    { de: "otage", texte: "alhamdulilah hadshi bfadl aallah ama ana hir sabab", heure: "21:38" },
    { de: "otage", texte: "bse7tk", heure: "21:38" } ] },
];
