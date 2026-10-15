import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";
import ProductShell from "@/product/Shell";

export const metadata: Metadata = { metadataBase: new URL(site.url), manifest: "/ar/manifest.webmanifest" };
export const viewport: Viewport = { themeColor: "#4a0d16", viewportFit: "cover" };

/** Layout des fiches produits en arabe (/ar/soins/<soin>), de droite à gauche. */
export default function ProductArLayout({ children }: { children: React.ReactNode }) {
  return <ProductShell locale="ar">{children}</ProductShell>;
}
