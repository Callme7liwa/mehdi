import type { Metadata, Viewport } from "next";
import { fontVars } from "../fonts";
import { site } from "@/data/site";

export const metadata: Metadata = { metadataBase: new URL(site.url) };
export const viewport: Viewport = { themeColor: "#4a0d16", viewportFit: "cover" };

/** Layout de la page d'accueil animée (son CSS lui est propre). */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
