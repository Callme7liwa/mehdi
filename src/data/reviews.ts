/* Avis de clientes : messages reçus sur Instagram, montrés tels quels (capture d'origine + transcription).
   Affichés dans la fenêtre « Avis » de l'accueil et sur la page /avis (et /ar/avis).
   - prenom : prénom seulement
   - soin : 0 gel, 1 sérum, 2 crème, 3 écran solaire, ou "gamme"
   - messages : de "cliente" ou "otage", dans la langue d'origine ; rtl: true pour l'arabe
   - traduction : aide à la lecture dans l'autre langue (À RELIRE : traduction de la darija par nos soins)
   - produits : les soins que la cliente nomme elle-même dans ses messages ; l'avis s'affiche sur la fiche de
     ces soins, et seulement sur elle (un avis qui ne nomme aucun soin reste sur /avis et l'accueil)
   - exemple: true affiche l'étiquette « Exemple » (à retirer avant la mise en ligne).
   Aucune note ni aggregateRating / Review dans le JSON-LD : ce ne sont pas des avis notés et vérifiables. */
import type { Img, ProductKey } from "./products";
import { isolateAr } from "../lib/bidi";
import type { L } from "./site";

export type ReviewMessage = { de: "cliente" | "otage"; texte: string; heure?: string; rtl?: boolean; photo?: string };
export type Review = {
  prenom: string;
  ville: string;
  soin: 0 | 1 | 2 | 3 | "gamme";
  /** Soins nommés par la cliente dans ses messages : fiches produits où l'avis est montré. */
  produits: ProductKey[];
  exemple?: boolean;
  messages: ReviewMessage[];
  /** Capture d'écran d'origine du message. */
  capture?: Img;
  date?: L;
  /** Traduction du message dans l'autre langue, si l'original n'est pas dans la langue de la page. */
  traduction?: Partial<L>;
};

export const reviews: Review[] = isolateAr([
  {
    prenom: "Nabila",
    ville: "Cliente OTAGE",
    soin: "gamme",
    // « Le gel nettoyant khatir jidan jidan » : le seul soin qu'elle nomme (le reste parle de « la gamme »)
    produits: ["gel"],
    date: { fr: "17 septembre", ar: "17 شتنبر" },
    capture: {
      src: "/images/avis/avis-cliente-nabila-instagram.webp", w: 739, h: 1600,
      alt: { fr: "Capture d'un message Instagram de Nabila : « Elle est juste PARFAITE », à propos de la gamme anti-taches OTAGE", ar: "لقطة لرسالة إنستغرام من نبيلة عن مجموعة OTAGE ضد البقع: «إنها ببساطة مثالية»" },
    },
    messages: [
      { de: "cliente", texte: "Cc docteur", heure: "17 sept." },
      { de: "cliente", texte: "Je reviens vers vous pour vous donner un feedback concernant la gamme", heure: "17 sept." },
      { de: "cliente", texte: "Elle est juste PARFAITE", heure: "17 sept." },
      { de: "cliente", texte: "Tbarkllah elik", heure: "17 sept." },
      { de: "cliente", texte: "Le gel nettoyant khatir jidan jidan", heure: "17 sept." },
      { de: "cliente", texte: "Il fait bien son travail", heure: "17 sept." },
    ],
    traduction: {
      fr: "« Tbarkllah elik » : bravo à vous. « Khatir jidan jidan » : vraiment excellent.",
      ar: "مرحبًا دكتور. أعود إليكم لأعطيكم رأيي في المجموعة. إنها ببساطة مثالية. تبارك الله عليك. الجل المنظف ممتاز جدًا جدًا. يقوم بعمله جيدًا.",
    },
  },
  {
    prenom: "Awatef",
    ville: "Cliente OTAGE",
    soin: "gamme",
    // ses messages parlent des taches et de l'éclat, sans nommer de soin : sur aucune fiche
    produits: [],
    date: { fr: "5 septembre", ar: "5 شتنبر" },
    capture: {
      src: "/images/avis/avis-cliente-awatef-instagram.webp", w: 739, h: 1600,
      alt: { fr: "Capture d'un message Instagram d'Awatef, en arabe, à propos de ses taches après la gamme anti-taches OTAGE", ar: "لقطة لرسالة إنستغرام من عواطف عن البقع بعد استعمال مجموعة OTAGE ضد البقع" },
    },
    messages: [
      { de: "cliente", texte: "الله يحفظك دكتور", heure: "5 sept.", rtl: true },
      { de: "cliente", texte: "دكتور اللمعة بدات تبان و ݣاع ليطاش تقريبا مشاو ب 95 فالمئة", heure: "5 sept., 19:29", rtl: true },
      { de: "cliente", texte: "شكراااا ليك بزاااااف", heure: "19:29", rtl: true },
      { de: "cliente", texte: "والله", heure: "19:29", rtl: true },
      { de: "cliente", texte: "عمرني ننسا خيرك يلا بغيتي ندير اوديو شهادة", heure: "19:29", rtl: true },
      { de: "otage", texte: "alhamdulilah hadshi bfadl aallah ama ana hir sabab", heure: "21:38" },
      { de: "otage", texte: "bse7tk", heure: "21:38" },
    ],
    traduction: {
      ar: "حفظك الله دكتور. دكتور، بدأت النضارة تظهر وتقريبًا كل البقع اختفت بنسبة 95 في المئة. شكرًا جزيلًا لك. والله. لن أنسى فضلك أبدًا، وإن أردت أسجل شهادة صوتية. رد OTAGE: الحمد لله، هذا بفضل الله، وأنا مجرد سبب. بالصحة.",
      fr: "Que Dieu vous garde, docteur. Docteur, l'éclat commence à se voir et presque toutes les taches sont parties, à 95 %. Merci infiniment. Vraiment. Je n'oublierai jamais votre bienfait ; si vous voulez, je fais un audio de témoignage. Réponse d'OTAGE : Dieu merci, c'est grâce à Dieu, moi je ne suis qu'un moyen. À votre santé.",
    },
  },
]);

/** Prénom affiché : écrit en arabe sur les pages /ar. */
const nameAr: Record<string, string> = { Nabila: "نبيلة", Awatef: "عواطف" };
export const reviewName = (r: Review, locale: "fr" | "ar") => (locale === "ar" ? nameAr[r.prenom] ?? r.prenom : r.prenom);
/** Les avis qui nomment ce soin : ceux montrés sur sa fiche. */
export const reviewsFor = (key: ProductKey) => reviews.filter((r) => r.produits.includes(key));
