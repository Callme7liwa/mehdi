/* Les polices du site d'origine, hébergées par Next (plus aucun appel à Google Fonts). */
import { Bodoni_Moda, DM_Mono, DM_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";

export const dmSans = DM_Sans({ subsets: ["latin"], axes: ["opsz"], display: "swap", variable: "--font-dm-sans" });
export const bodoni = Bodoni_Moda({ subsets: ["latin"], axes: ["opsz"], weight: "variable", display: "swap", variable: "--font-bodoni", preload: false });
export const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-dm-mono", preload: false });
export const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500"], display: "swap", variable: "--font-plex-arabic", preload: false });
/** Pages en arabe : la police arabe est la police principale, donc préchargée. */
export const plexArabicMain = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600"], display: "swap", variable: "--font-plex-arabic" });

export const fontVars = [dmSans.variable, bodoni.variable, dmMono.variable, plexArabic.variable].join(" ");
