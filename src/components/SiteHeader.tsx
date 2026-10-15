import Link from "next/link";
import Img from "./Img";
import LangSwitch from "./LangSwitch";
import HeaderCta from "./HeaderCta";
import { MenuIcon } from "./icons";
import { gamme, productByKey } from "@/data/products";
import { ui } from "@/data/ui";
import type { Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const links = [
    { href: localePath(locale, "/soins"), label: t.products },
    { href: localePath(locale, "/taches-pigmentaires"), label: t.spots },
    { href: localePath(locale, "/cernes"), label: t.darkCircles },
    { href: localePath(locale, "/livraison-paiement"), label: t.delivery },
    { href: localePath(locale, "/contact"), label: t.contact },
  ];
  const home = localePath(locale, "/");
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
        <LangSwitch label={t.langSwitch} title={t.langSwitchLabel} />
        <HeaderCta fallback={fallback} byPath={byPath} />
        <details className="top-menu">
          <summary aria-label={t.menu}><MenuIcon /></summary>
          <nav aria-label={t.menu}>
            <a href={home}>{t.home}</a>
            {links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            <LangSwitch label={t.langSwitch} title={t.langSwitchLabel} />
          </nav>
        </details>
      </div>
    </header>
  );
}
