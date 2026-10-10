import type { Metadata, Viewport } from "next";
import "../../site.css";
import { bodoni, dmSans, plexArabicMain } from "../../fonts-ar";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/data/site";

export const metadata: Metadata = { metadataBase: new URL(site.url) };
export const viewport: Viewport = { themeColor: "#4a0d16", viewportFit: "cover" };

/** Layout des pages arabes : lecture de droite à gauche. */
export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${dmSans.variable} ${bodoni.variable} ${plexArabicMain.variable}`}>
      <body>
        <SiteHeader locale="ar" />
        {children}
        <SiteFooter locale="ar" />
      </body>
    </html>
  );
}
