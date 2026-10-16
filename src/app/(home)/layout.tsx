import { gtmId } from "@/data/google";
import type { Metadata, Viewport } from "next";
import Analytics from "@/components/Analytics";
import FontPreload from "@/components/FontPreload";
import { site } from "@/data/site";

export const metadata: Metadata = { metadataBase: new URL(site.url) };
export const viewport: Viewport = { themeColor: "#4a0d16", viewportFit: "cover" };

/** Layout de la page d'accueil animée (son CSS lui est propre). */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head><FontPreload locale="fr" /></head>
      <body>
        {children}
        <Analytics gaId={site.gaId} gtmId={gtmId} above locale="fr" />
      </body>
    </html>
  );
}
