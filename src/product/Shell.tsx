/* <html> des fiches produits, en français ou en arabe : leur propre feuille de style, sans l'en-tête ni le pied des pages intérieures. */
import Analytics from "@/components/Analytics";
import FontPreload from "@/components/FontPreload";
import { site, type Locale } from "@/data/site";
import "./product.css";

/* Les apparitions du haut de page (rideau, titre, badge) sont en CSS seul : elles n'attendent ni le JavaScript ni les polices.
   La classe « js » sert seulement aux avis, qui apparaissent au défilement : sans JavaScript, ils restent visibles. */
const JS = `document.documentElement.classList.add("js")`;

export default function ProductShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : undefined} suppressHydrationWarning>
      {/* layout racine (appelé par src/app/(produit)/layout.tsx) : la balise <head> y est à sa place */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <FontPreload locale={locale} />
        <script dangerouslySetInnerHTML={{ __html: JS }} />
      </head>
      <body>
        {children}
        <Analytics gaId={site.gaId} gtmId={site.gtmId} above locale={locale} />
      </body>
    </html>
  );
}
