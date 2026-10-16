import type { Metadata, Viewport } from "next";
import "../../rtl.css";
import Analytics from "@/components/Analytics";
import FontPreload from "@/components/FontPreload";
import { site } from "@/data/site";

export const metadata: Metadata = { metadataBase: new URL(site.url), manifest: "/ar/manifest.webmanifest" };
export const viewport: Viewport = { themeColor: "#4a0d16", viewportFit: "cover" };

/** Layout de l'accueil arabe animé : même page que l'accueil français, de droite à gauche. */
export default function HomeArLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head><FontPreload locale="ar" /></head>
      <body>
        {children}
        <Analytics gaId={site.gaId} gtmId={site.gtmId} above locale="ar" />
      </body>
    </html>
  );
}
