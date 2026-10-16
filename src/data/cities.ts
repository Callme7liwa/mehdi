/* Villes du Maroc proposées dans les formulaires de commande (saisie automatique), en français et en arabe.
   La liste couvre les villes principales de toutes les régions ; ce n'est pas un contrôle : la cliente peut écrire
   une autre ville, un village ou un douar. Classée par ordre alphabétique français, les plus grandes d'abord. */
import type { L } from "./site";

const MAIN: L[] = [
  { fr: "Casablanca", ar: "الدار البيضاء" }, { fr: "Rabat", ar: "الرباط" }, { fr: "Salé", ar: "سلا" }, { fr: "Fès", ar: "فاس" },
  { fr: "Marrakech", ar: "مراكش" }, { fr: "Tanger", ar: "طنجة" }, { fr: "Agadir", ar: "أكادير" }, { fr: "Meknès", ar: "مكناس" },
  { fr: "Oujda", ar: "وجدة" }, { fr: "Kénitra", ar: "القنيطرة" }, { fr: "Tétouan", ar: "تطوان" }, { fr: "Témara", ar: "تمارة" },
  { fr: "Safi", ar: "آسفي" }, { fr: "Mohammédia", ar: "المحمدية" }, { fr: "El Jadida", ar: "الجديدة" }, { fr: "Béni Mellal", ar: "بني ملال" },
  { fr: "Nador", ar: "الناظور" }, { fr: "Khouribga", ar: "خريبكة" }, { fr: "Settat", ar: "سطات" }, { fr: "Laâyoune", ar: "العيون" },
];
const OTHERS: L[] = [
  { fr: "Aïn Harrouda", ar: "عين حرودة" }, { fr: "Aït Melloul", ar: "آيت ملول" }, { fr: "Al Hoceïma", ar: "الحسيمة" }, { fr: "Asilah", ar: "أصيلة" },
  { fr: "Azemmour", ar: "أزمور" }, { fr: "Azilal", ar: "أزيلال" }, { fr: "Azrou", ar: "أزرو" }, { fr: "Ben Guerir", ar: "ابن جرير" },
  { fr: "Benslimane", ar: "بنسليمان" }, { fr: "Berkane", ar: "بركان" }, { fr: "Berrechid", ar: "برشيد" }, { fr: "Biougra", ar: "بيوكرى" },
  { fr: "Boujdour", ar: "بوجدور" }, { fr: "Bouskoura", ar: "بوسكورة" }, { fr: "Bouznika", ar: "بوزنيقة" }, { fr: "Chefchaouen", ar: "شفشاون" },
  { fr: "Chichaoua", ar: "شيشاوة" }, { fr: "Dakhla", ar: "الداخلة" }, { fr: "Dar Bouazza", ar: "دار بوعزة" }, { fr: "Dcheira El Jihadia", ar: "الدشيرة الجهادية" },
  { fr: "Demnate", ar: "دمنات" }, { fr: "Driouch", ar: "الدريوش" }, { fr: "El Hajeb", ar: "الحاجب" }, { fr: "El Kelâa des Sraghna", ar: "قلعة السراغنة" },
  { fr: "Errachidia", ar: "الرشيدية" }, { fr: "Essaouira", ar: "الصويرة" }, { fr: "Es-Semara", ar: "السمارة" }, { fr: "Fnideq", ar: "الفنيدق" },
  { fr: "Fquih Ben Salah", ar: "الفقيه بن صالح" }, { fr: "Guelmim", ar: "كلميم" }, { fr: "Guercif", ar: "جرسيف" }, { fr: "Ifrane", ar: "إفران" },
  { fr: "Imzouren", ar: "إمزورن" }, { fr: "Inezgane", ar: "إنزكان" }, { fr: "Jerada", ar: "جرادة" }, { fr: "Kasba Tadla", ar: "قصبة تادلة" },
  { fr: "Khémisset", ar: "الخميسات" }, { fr: "Khénifra", ar: "خنيفرة" }, { fr: "Ksar El Kébir", ar: "القصر الكبير" }, { fr: "Larache", ar: "العرائش" },
  { fr: "Martil", ar: "مرتيل" }, { fr: "M'diq", ar: "المضيق" }, { fr: "Médiouna", ar: "مديونة" }, { fr: "Midelt", ar: "ميدلت" },
  { fr: "Mechra Bel Ksiri", ar: "مشرع بلقصيري" }, { fr: "Nouaceur", ar: "النواصر" }, { fr: "Oualidia", ar: "الوليدية" }, { fr: "Ouarzazate", ar: "ورزازات" },
  { fr: "Ouazzane", ar: "وزان" }, { fr: "Oued Zem", ar: "وادي زم" }, { fr: "Oulad Teïma", ar: "أولاد تايمة" }, { fr: "Sefrou", ar: "صفرو" },
  { fr: "Sidi Bennour", ar: "سيدي بنور" }, { fr: "Sidi Ifni", ar: "سيدي إفني" }, { fr: "Sidi Kacem", ar: "سيدي قاسم" }, { fr: "Sidi Slimane", ar: "سيدي سليمان" },
  { fr: "Sidi Yahya El Gharb", ar: "سيدي يحيى الغرب" }, { fr: "Skhirat", ar: "الصخيرات" }, { fr: "Souk El Arbaa", ar: "سوق الأربعاء" }, { fr: "Tan-Tan", ar: "طانطان" },
  { fr: "Taounate", ar: "تاونات" }, { fr: "Taourirt", ar: "تاوريرت" }, { fr: "Taroudant", ar: "تارودانت" }, { fr: "Tata", ar: "طاطا" },
  { fr: "Taza", ar: "تازة" }, { fr: "Tiflet", ar: "تيفلت" }, { fr: "Tinghir", ar: "تنغير" }, { fr: "Tit Mellil", ar: "تيط مليل" },
  { fr: "Tiznit", ar: "تزنيت" }, { fr: "Youssoufia", ar: "اليوسفية" }, { fr: "Zagora", ar: "زاكورة" }, { fr: "Zaïo", ar: "زايو" },
];
export const cities: L[] = [...MAIN, ...OTHERS];

/** Textes du champ « Ville », les mêmes dans tous les formulaires de commande (accueil, boutique, fiches). */
export const cityText = {
  label: { fr: "Ville", ar: "المدينة" } as L,
  /** Fiches produits : les libellés du ticket tutoient (« Ton nom », « Ton téléphone »). */
  labelTicket: { fr: "Ta ville", ar: "مدينتك" } as L,
  placeholder: { fr: "Cherche ta ville", ar: "ابحثي عن مدينتك" } as L,
  other: { fr: "Autre ville ? Écris-la : on livre partout au Maroc.", ar: "مدينة أخرى؟ اكتبيها: نوصل إلى كل أنحاء المغرب." } as L,
};
