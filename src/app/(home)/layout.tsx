import type { Metadata, Viewport } from "next";
import Analytics from "@/components/Analytics";
import FontPreload from "@/components/FontPreload";
import { site } from "@/data/site";
import { arefRuqaa } from "@/home/fonts";

export const metadata: Metadata = { metadataBase: new URL(site.url) };
export const viewport: Viewport = { themeColor: "#4a0d16", viewportFit: "cover" };

/** Layout de la page d'accueil animée (son CSS lui est propre). */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={arefRuqaa.variable}>
      <head><FontPreload locale="fr" /></head>
      <body>
        {children}
        <Analytics gaId={site.gaId} locale="fr" />
      </body>
    </html>
  );
}
