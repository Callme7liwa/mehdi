import Link from "next/link";
import Img from "./Img";
import LangSwitch from "./LangSwitch";
import HeaderCta from "./HeaderCta";
import { MenuIcon } from "./icons";
import { gamme, productByKey } from "@/data/products";
import { problems } from "@/data/problems";
import { arUpToDate, hasArProblem } from "@/data/problems.ar";
import { ui } from "@/data/ui";
import type { Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const links = [
    { href: localePath(locale, "/soins"), label: t.products },
    // le guide des taches n'a pas encore de version arabe : en arabe, le lien mène aux conseils de l'accueil
    { href: locale === "fr" || hasArProblem("taches-brunes-visage") ? localePath(locale, "/taches-brunes-visage") : "/ar#conseils", label: t.spots },
    { href: localePath(locale, "/cernes"), label: t.darkCircles },
    { href: localePath(locale, "/livraison-paiement"), label: t.delivery },
    { href: localePath(locale, "/contact"), label: t.contact },
  ];
  const home = localePath(locale, "/");
  // pages sans version arabe à jour : pas de sélecteur de langue, ni côté français ni côté arabe (ni de hreflang, voir problemMetadata)
  const frOnly = problems.filter((p) => !arUpToDate(p.slug)).map((p) => `/${p.slug}`);
  // le prix sur le bouton, toujours lu dans products.ts
  const yeux = productByKey("yeux");
  const fallback = { href: `${home}#offres`, order: t.order, from: t.from, price: `${gamme.formats.petit.price} ${t.dh}` };
  const byPath = { [localePath(locale, "/cernes")]: { href: localePath(locale, `/soins/${yeux.slug}`), order: t.order, price: `${yeux.unitPrice.petit} ${t.dh}` } };
  return (
    <header className="top">
      <a className="skip" href="#contenu">{t.skip}</a>
      <div className="top-in">
        {/* accueil : rechargement complet, la page d'accueil a son propre layout */}
        <a className="top-logo" href={home} aria-label={`OTAGE, ${t.home}`}>
          <Img src="/images/logo-otage.webp" alt="OTAGE" width={206} height={96} loading="eager" />
        </a>
        <nav className="top-nav" aria-label={t.menu}>
          {links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>
        <LangSwitch label={t.langSwitch} title={t.langSwitchLabel} frOnly={frOnly} />
        <HeaderCta fallback={fallback} byPath={byPath} />
        <details className="top-menu">
          <summary aria-label={t.menu}><MenuIcon /></summary>
          <nav aria-label={t.menu}>
            <a href={home}>{t.home}</a>
            {links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            <LangSwitch label={t.langSwitch} title={t.langSwitchLabel} frOnly={frOnly} />
          </nav>
        </details>
      </div>
    </header>
  );
}
