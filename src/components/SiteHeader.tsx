import Link from "next/link";
import Img from "./Img";
import LangSwitch from "./LangSwitch";
import { BagIcon, MenuIcon } from "./icons";
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
  const orderHref = `${home}#offres`;
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
        <a className="btn btn-dark btn-sm top-cta" href={orderHref}>{t.order}<BagIcon /></a>
        <details className="top-menu">
          <summary aria-label={t.menu}><MenuIcon /></summary>
          <nav aria-label={t.menu}>
            <a href={home}>{t.home}</a>
            {links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
          </nav>
        </details>
      </div>
    </header>
  );
}
