/* Les polices du site d'origine, hébergées par Next (plus aucun appel à Google Fonts). */
import { Bodoni_Moda, DM_Mono, DM_Sans } from "next/font/google";
import localFont from "next/font/local";

export const dmSans = DM_Sans({ subsets: ["latin"], axes: ["opsz"], display: "swap", variable: "--font-dm-sans" });
export const bodoni = Bodoni_Moda({ subsets: ["latin"], axes: ["opsz"], weight: "variable", display: "swap", variable: "--font-bodoni", preload: false });
export const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-dm-mono", preload: false });
/* IBM Plex Sans Arabic (licence OFL), réduite aux lettres arabes, chiffres et ponctuation : 29 Ko au lieu de 96 Ko.
   Sert aux quelques lignes en arabe de l'accueil (devise, affiche, avis). Les pages /ar utilisent la police complète (fonts-ar.ts). */
export const plexArabic = localFont({
  src: [
    { path: "./fonts-files/ibm-plex-sans-arabic-400-subset.woff2", weight: "400", style: "normal" },
    { path: "./fonts-files/ibm-plex-sans-arabic-500-subset.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-plex-arabic",
  preload: false,
});

export const fontVars = [dmSans.variable, bodoni.variable, dmMono.variable, plexArabic.variable].join(" ");
