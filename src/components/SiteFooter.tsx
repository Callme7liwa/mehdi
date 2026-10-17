import { linkedin } from "@/data/google";
import Link from "next/link";
import { problemPagesFor, trustPages } from "@/data/pages";
import { products } from "@/data/products";
import { formatDate, site, waLink, type Locale } from "@/data/site";
import { ui } from "@/data/ui";
import { localePath } from "@/lib/seo";

/** Pied de page des pages intérieures : des liens vers toutes les pages du site. */
export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <footer className="foot2">
      <div className="wrap">
        <nav className="foot2-cols" aria-label={t.footerNav}>
          <div>
            <p className="t">{t.footProducts}</p>
            <ul>
              {products.map((p) => <li key={p.slug}><Link prefetch={false} href={localePath(locale, `/soins/${p.slug}`)}>{p.name[locale]}</Link></li>)}
              <li><Link prefetch={false} href={localePath(locale, "/soins")}>{t.allProducts}</Link></li>
            </ul>
          </div>
          <div>
            <p className="t">{t.footAdvice}</p>
            <ul>{problemPagesFor(locale).map((p) => <li key={p.slug}><Link prefetch={false} href={localePath(locale, `/${p.slug}`)}>{p.label[locale]}</Link></li>)}</ul>
          </div>
          <div>
            <p className="t">{t.footBrand}</p>
            <ul>
              {trustPages.map((p) => <li key={p.path}><Link prefetch={false} href={localePath(locale, p.path)}>{p.label[locale]}</Link></li>)}
              <li><a href={`${localePath(locale, "/mentions-legales")}#cookies`} data-cookies="">{t.manageCookies}</a></li>
            </ul>
          </div>
          <div>
            <p className="t">{t.footFollow}</p>
            <ul>
              <li><a href={site.instagram.url} target="_blank" rel="me noopener">{locale === "ar" ? "إنستغرام" : "Instagram"}&nbsp;<span dir="ltr">{site.instagram.handle}</span></a></li>
              <li><a href={linkedin} target="_blank" rel="me noopener"><span dir="ltr" lang="en">LinkedIn</span></a></li>
              <li><a href={waLink()} target="_blank" rel="noopener">{locale === "ar" ? "واتساب" : "WhatsApp"}&nbsp;<span dir="ltr">{site.whatsapp.display}</span></a></li>
              <li><a href={`mailto:${site.email}`} dir="ltr">{site.email}</a></li>
              <li><a href={locale === "fr" ? "/" : "/ar"}>{t.home}</a></li>
              <li><a href={locale === "fr" ? "/ar" : "/"} lang={locale === "fr" ? "ar" : "fr"}>{t.otherLang}</a></li>
            </ul>
          </div>
        </nav>
        <p className="foot2-about">{site.description[locale]} {t.freeDelivery}. {t.cod}.</p>
      </div>
      <p className="foot2-legal">
        © {new Date().getFullYear()} {site.brand[locale]}. {t.rights} {t.updated} <time dateTime={site.updated}>{formatDate(site.updated, locale)}</time>.
      </p>
    </footer>
  );
}
