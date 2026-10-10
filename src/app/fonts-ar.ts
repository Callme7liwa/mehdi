/* Polices des pages en arabe (/ar).
   IBM Plex Sans Arabic (sous-ensemble arabe uniquement) pour le texte : c'est la cousine arabe des linéales
   géométriques, elle s'accorde avec DM Sans, qui reste utilisée pour les chiffres et les mots latins (OTAGE, SPF, prix).
   Pas de préchargement : Next l'ajouterait aussi aux pages françaises. */
import { Bodoni_Moda, DM_Mono, DM_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";

export const latin = DM_Sans({ subsets: ["latin"], axes: ["opsz"], display: "swap", variable: "--font-latin", preload: false });
export const bodoni = Bodoni_Moda({ subsets: ["latin"], axes: ["opsz"], weight: "variable", display: "swap", variable: "--font-bodoni-latin", preload: false });
export const monoLatin = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-mono-latin", preload: false });
export const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-ar", preload: false });

export const arFontVars = [latin.variable, bodoni.variable, monoLatin.variable, arabic.variable].join(" ");
