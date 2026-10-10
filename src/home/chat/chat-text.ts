/* Textes du chat FAQ de l'accueil. Arabe : « À relire par un natif ».
   Les questions et les réponses, elles, viennent de src/data/faq.ts. */
import type { Locale } from "@/data/site";

const fr = {
  label: "Conversation avec OTAGE",
  service: "Service client",
  welcome: "Salam 👋 Pose ta question ou choisis un sujet : on te répond tout de suite.",
  suggestions: "Questions proposées",
  other: "Autres questions",
  topics: "Choisis un sujet :",
  cats: { commande: "Commande et livraison", produits: "Produits et utilisation", peau: "Peau sensible et grossesse" },
  back: "Sujets",
  restart: "Recommencer",
  typing: "OTAGE écrit…",
  done: "Tu as fait le tour des questions. Une autre ? Écris-nous sur WhatsApp.",
  whatsapp: "Écrire sur WhatsApp",
  waIntro: "Bonjour OTAGE, j'ai une question.",
  waQuestion: "Bonjour OTAGE, j'ai une question : ",
};
export type ChatText = typeof fr;

const ar: ChatText = {
  label: "محادثة مع OTAGE",
  service: "خدمة الزبونات",
  welcome: "سلام 👋 اطرحي سؤالك أو اختاري موضوعًا: نجيبك حالًا.",
  suggestions: "أسئلة مقترحة",
  other: "أسئلة أخرى",
  topics: "اختاري موضوعًا:",
  cats: { commande: "الطلب والتوصيل", produits: "المنتجات والاستعمال", peau: "البشرة الحساسة والحمل" },
  back: "المواضيع",
  restart: "البدء من جديد",
  typing: "OTAGE يكتب…",
  done: "لقد طرحت كل الأسئلة. سؤال آخر؟ راسلينا على واتساب.",
  whatsapp: "راسلينا على واتساب",
  waIntro: "مرحبًا OTAGE، لدي سؤال.",
  waQuestion: "مرحبًا OTAGE، لدي سؤال: ",
};

export const chatText: Record<Locale, ChatText> = { fr, ar };
