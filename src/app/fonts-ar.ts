/* Polices des pages en arabe (/ar).
   IBM Plex Sans Arabic (licence OFL) pour le texte : elle s'accorde avec DM Sans, qui reste utilisée pour les
   chiffres et les mots latins (OTAGE, SPF, prix). Elle est hébergée ici, réduite aux lettres arabes, aux lettres
   de la darija (ݣ گ ڭ ڤ چ پ), aux signes et à la ponctuation : 15 Ko par graisse au lieu de 50.
   Deux graisses : 400 pour le texte, 600 pour les titres et les boutons.
   Pas de préchargement : Next l'ajouterait aussi aux pages françaises. */
import { Bodoni_Moda, DM_Mono, DM_Sans } from "next/font/google";
import localFont from "next/font/local";

export const latin = DM_Sans({ subsets: ["latin"], axes: ["opsz"], display: "swap", variable: "--font-latin", preload: false });
export const bodoni = Bodoni_Moda({ subsets: ["latin"], axes: ["opsz"], weight: "variable", display: "swap", variable: "--font-bodoni-latin", preload: false });
export const monoLatin = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-mono-latin", preload: false });
export const arabic = localFont({
  src: [
    { path: "./fonts-files/ibm-plex-sans-arabic-400-ar.woff2", weight: "400", style: "normal" },
    { path: "./fonts-files/ibm-plex-sans-arabic-600-ar.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-ar",
  preload: false,
});

export const arFontVars = [latin.variable, bodoni.variable, monoLatin.variable, arabic.variable].join(" ");
