/* Balises et données structurées, construites à partir de src/data/. */
import type { Metadata } from "next";
import { abs, site, type Locale } from "@/data/site";
import { plain, type Faq } from "@/data/faq";
import { gamme, type FormatKey, type Img, type Product } from "@/data/products";

/** Chemin d'une page dans une langue : le français est à la racine, l'arabe sous /ar. */
export const localePath = (locale: Locale, path = "/") => (locale === "ar" ? (path === "/" ? "/ar" : `/ar${path}`) : path);

export const OG_IMAGE: Img = { src: "/images/og-otage.jpg", w: 1200, h: 630, alt: { fr: "La gamme anti-taches OTAGE : gel nettoyant, sérum, crème et écran solaire SPF 50 dans leur trousse", ar: "مجموعة العناية ضد البقع من OTAGE في حقيبتها" } };

type MetaInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: Img;
  /** La page existe aussi en arabe (accueil, pages produits). */
  hasAr?: boolean;
  type?: "website" | "article";
};

export function pageMetadata({ locale, path, title, description, image = OG_IMAGE, hasAr = false, type = "website" }: MetaInput): Metadata {
  const url = abs(localePath(locale, path));
  const languages: Record<string, string> = { "fr-MA": abs(path), "x-default": abs(path) };
  if (hasAr && site.arIndexable) languages["ar-MA"] = abs(localePath("ar", path));
  const hidden = locale === "ar" && !site.arIndexable;
  const img = { url: abs(image.src), width: image.w, height: image.h, alt: image.alt[locale] };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: hidden ? undefined : languages },
    robots: hidden ? { index: false, follow: true } : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    openGraph: { type, siteName: site.name, locale: locale === "ar" ? "ar_MA" : "fr_MA", url, title, description, images: [img] },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}

/* ---------- JSON-LD ---------- */

const ORG = { "@id": abs("/#organization") };
const maroc = (locale: Locale = "fr") => ({ "@type": "Country", name: locale === "ar" ? "المغرب" : "Maroc" });

export const orgLd = (locale: Locale = "fr") => ({
  "@type": "Organization",
  "@id": abs("/#organization"),
  name: site.name,
  url: abs("/"),
  logo: { "@type": "ImageObject", url: abs("/images/icon-512.png"), width: 512, height: 512 },
  image: abs(OG_IMAGE.src),
  description: site.description[locale],
  slogan: site.slogan[locale],
  sameAs: [site.instagram.url],
  areaServed: maroc(locale),
  contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: site.whatsapp.e164, availableLanguage: ["fr", "ar"], areaServed: "MA" },
});

export const websiteLd = () => ({ "@type": "WebSite", "@id": abs("/#website"), url: abs("/"), name: site.name, inLanguage: ["fr-MA", "ar-MA"], publisher: ORG });

export const webPageLd = (o: { locale: Locale; path: string; title: string; description: string; image?: Img; type?: string }) => {
  const url = abs(localePath(o.locale, o.path));
  const image = o.image ?? OG_IMAGE;
  return {
    "@type": o.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: o.title,
    description: o.description,
    inLanguage: o.locale === "ar" ? "ar-MA" : "fr-MA",
    isPartOf: { "@id": abs("/#website") },
    about: ORG,
    primaryImageOfPage: { "@type": "ImageObject", url: abs(image.src), width: image.w, height: image.h },
    dateModified: site.updated,
  };
};

export const breadcrumbLd = (locale: Locale, items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(localePath(locale, it.path)) })),
});

export const faqLd = (faqs: Faq[], id: string) => ({
  "@type": "FAQPage",
  "@id": id,
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f) } })),
});

const shipping = () => ({
  "@type": "OfferShippingDetails",
  shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "MAD" },
  shippingDestination: { "@type": "DefinedRegion", addressCountry: site.delivery.country },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
    transitTime: { "@type": "QuantitativeValue", minValue: Math.round(site.delivery.minHours / 24), maxValue: Math.round(site.delivery.maxHours / 24), unitCode: "DAY" },
  },
});

/** Politique de retour : absente du JSON-LD tant que site.returns n'est pas renseigné (TODO). */
const returnPolicy = () =>
  site.returns
    ? { hasMerchantReturnPolicy: { "@type": "MerchantReturnPolicy", applicableCountry: "MA", returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow", merchantReturnDays: site.returns.days, returnMethod: "https://schema.org/ReturnByMail" } }
    : {};

export const offerLd = (price: number, url: string) => ({
  "@type": "Offer",
  url,
  price: price.toFixed(2),
  priceCurrency: "MAD",
  availability: "https://schema.org/InStock",
  itemCondition: "https://schema.org/NewCondition",
  seller: ORG,
  shippingDetails: shipping(),
  ...returnPolicy(),
});

const productBase = (name: string, description: string, images: Img[], category: string, locale: Locale = "fr") => ({
  "@type": "Product",
  name,
  description,
  image: images.map((i) => abs(i.src)),
  brand: { "@type": "Brand", name: site.name },
  manufacturer: ORG,
  countryOfOrigin: maroc(locale),
  category,
});

/** Un soin, sur sa page produit. Le prix est le prix à l'unité (Petit format pour la gamme anti-taches). */
export function productLd(p: Product, locale: Locale) {
  const url = abs(localePath(locale, `/soins/${p.slug}`));
  const price = p.unitPrice.petit as number;
  const size = p.ml.petit ? `${p.ml.petit} ml` : undefined;
  return {
    ...productBase(`${p.name[locale]} ${site.name} ${p.no.replace(" ", "")}`, p.metaDescription[locale], [p.hd ?? p.pack, ...p.photos], locale === "ar" ? (p.range === "yeux" ? "العناية بمحيط العين" : "العناية بالوجه ضد البقع") : p.range === "yeux" ? "Soins du contour des yeux" : "Soins du visage anti-taches", locale),
    "@id": `${url}#product`,
    url,
    ...(size ? { size } : {}),
    offers: offerLd(price, url),
  };
}

/** La gamme anti-taches complète, dans un format. */
export function gammeLd(format: FormatKey, desc: string) {
  const f = gamme.formats[format];
  return {
    ...productBase(`${gamme.name.fr} ${site.name}, ${f.label.fr}`, desc, gamme.photos.slice(0, 2), "Soins du visage anti-taches"),
    "@id": abs(`/#gamme-anti-taches-${format}-format`),
    offers: offerLd(f.price, abs("/#offres")),
  };
}

export const articleLd = (o: { locale: Locale; path: string; title: string; description: string; image: Img }) => {
  const url = abs(localePath(o.locale, o.path));
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: o.title,
    description: o.description,
    image: abs(o.image.src),
    inLanguage: o.locale === "ar" ? "ar-MA" : "fr-MA",
    datePublished: site.updated,
    dateModified: site.updated,
    author: ORG,
    publisher: ORG,
    mainEntityOfPage: url,
  };
};

export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
