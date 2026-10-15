import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";
import ProductShell from "@/product/Shell";

export const metadata: Metadata = { metadataBase: new URL(site.url) };
export const viewport: Viewport = { themeColor: "#4a0d16", viewportFit: "cover" };

/** Layout des fiches produits en français (/soins/<soin>). */
export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <ProductShell locale="fr">{children}</ProductShell>;
}
