/* Aref Ruqaa 700 : la calligraphie de l'accroche arabe du hero (et de son affiche). Hébergée ici, sans appel à Google Fonts.
   Le fichier ne contient que les lettres de « ما كنبيعوش الوهم، كنبيعو النتيجة. » (19 Ko) : si l'accroche change,
   il faut le régénérer et changer son suffixe -v1.
   Pas de préchargement : le titre et l'image principale passent avant, la police de repli tient la place en attendant. */
import localFont from "next/font/local";

export const arefRuqaa = localFont({
  src: "./fonts/aref-ruqaa-700-accroche-v1.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-aref",
});
