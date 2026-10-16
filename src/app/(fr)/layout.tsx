import type { Metadata, Viewport } from "next";
import "../site.css";
import Analytics from "@/components/Analytics";
import FontPreload from "@/components/FontPreload";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/data/site";

export const metadata: Metadata = { metadataBase: new URL(site.url) };
export const viewport: Viewport = { themeColor: "#4a0d16", viewportFit: "cover" };

/** Layout des pages françaises (produits, conseils, pages de confiance). */
export default function FrLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head><FontPreload locale="fr" /></head>
      <body>
        <SiteHeader locale="fr" />
        {children}
        <SiteFooter locale="fr" />
        <Analytics gaId={site.gaId} gtmId={site.gtmId} locale="fr" />
      </body>
    </html>
  );
}
