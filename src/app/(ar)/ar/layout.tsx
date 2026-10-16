import { gtmId } from "@/data/google";
import type { Metadata, Viewport } from "next";
import "../../site.css";
import "../../rtl.css";
import Analytics from "@/components/Analytics";
import FontPreload from "@/components/FontPreload";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/data/site";

export const metadata: Metadata = { metadataBase: new URL(site.url), manifest: "/ar/manifest.webmanifest" };
export const viewport: Viewport = { themeColor: "#4a0d16", viewportFit: "cover" };

/** Layout des pages arabes : lecture de droite à gauche. */
export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head><FontPreload locale="ar" /></head>
      <body>
        <SiteHeader locale="ar" />
        {children}
        <SiteFooter locale="ar" />
        <Analytics gaId={site.gaId} gtmId={gtmId} locale="ar" />
      </body>
    </html>
  );
}
