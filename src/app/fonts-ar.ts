/* Polices des pages en arabe (/ar). Fichier à part : Next précharge les polices du fichier importé par le layout. */
import { Bodoni_Moda, DM_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";

export const dmSans = DM_Sans({ subsets: ["latin"], axes: ["opsz"], display: "swap", variable: "--font-dm-sans", preload: false });
export const bodoni = Bodoni_Moda({ subsets: ["latin"], axes: ["opsz"], weight: "variable", display: "swap", variable: "--font-bodoni", preload: false });
/** Pages en arabe : police arabe complète. Pas de préchargement : Next l'ajouterait aussi aux pages françaises. */
export const plexArabicMain = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600"], display: "swap", variable: "--font-plex-arabic", preload: false });
