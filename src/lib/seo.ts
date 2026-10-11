/* Balises et données structurées, construites à partir de src/data/. */
import type { Metadata } from "next";
import { abs, site, type Locale } from "@/data/site";
import { plain, type Faq } from "@/data/faq";
import { gamme, unitFormats, type FormatKey, type Img, type Product } from "@/data/products";

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
    openGraph: { type, siteName: site.brand[locale], locale: locale === "ar" ? "ar_MA" : "fr_MA", url, title, description, images: [img] },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}

/* ---------- JSON-LD ---------- */

const ORG = { "@id": abs("/#organization") };
const maroc = (locale: Locale = "fr") => ({ "@type": "Country", name: locale === "ar" ? "المغرب" : "Maroc" });

export const orgLd = (locale: Locale = "fr") => ({
  "@type": "Organization",
  "@id": abs("/#organization"),
  name: site.brand[locale],
  alternateName: [site.name, site.brand[locale === "ar" ? "fr" : "ar"]],
  url: abs("/"),
  logo: { "@type": "ImageObject", url: abs("/images/icon-512.png"), width: 512, height: 512 },
  image: abs(OG_IMAGE.src),
  description: site.description[locale],
  slogan: site.slogan[locale],
  sameAs: [site.instagram.url],
  areaServed: maroc(locale),
  founder: { "@id": abs("/#founder") },
  hasMerchantReturnPolicy: returnPolicy(),
  email: site.email,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: site.whatsapp.e164,
    email: site.email,
    availableLanguage: ["fr", "ar"],
    areaServed: "MA",
    hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" },
  },
});

/** Le fondateur. À placer dans le même graphe que l'Organization (qui y renvoie par `founder`). */
export const founderLd = (locale: Locale = "fr") => ({
  "@type": "Person",
  "@id": abs("/#founder"),
  name: locale === "ar" ? site.founder.nameAr : site.founder.name,
  ...(locale === "ar" ? { alternateName: site.founder.name } : { alternateName: site.founder.nameAr }),
  givenName: site.founder.givenName,
  familyName: site.founder.familyName,
  honorificPrefix: "Dr",
  jobTitle: site.founder.jobTitle[locale],
  description: `${site.founder.jobTitle[locale]}${locale === "ar" ? "، " : ", "}${site.founder.specialty[locale]}`,
  image: abs(site.founder.photo),
  worksFor: ORG,
});

/** Le relecteur des pages conseils (JSON-LD reviewedBy), quand la relecture est confirmée. */
export const reviewerLd = (locale: Locale = "fr") => ({ "@type": "Person", "@id": abs("/#founder"), name: locale === "ar" ? site.founder.nameAr : site.founder.name, jobTitle: site.founder.jobTitle[locale] });

export const websiteLd = (locale: Locale = "fr") => ({ "@type": "WebSite", "@id": abs("/#website"), url: abs("/"), name: site.brand[locale], alternateName: site.name, inLanguage: ["fr-MA", "ar-MA"], publisher: ORG });

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

/** Livraison : offerte pour une gamme complète ; de 35 à 45 MAD selon la ville pour un achat à l'unité. 1 à 3 jours, au Maroc. */
const shipping = (unit: boolean) => ({
  "@type": "OfferShippingDetails",
  shippingRate: unit
    ? { "@type": "MonetaryAmount", minValue: site.delivery.unitFee.min.toFixed(2), maxValue: site.delivery.unitFee.max.toFixed(2), currency: "MAD" }
    : { "@type": "MonetaryAmount", value: "0", currency: "MAD" },
  shippingDestination: { "@type": "DefinedRegion", addressCountry: site.delivery.country },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
    transitTime: { "@type": "QuantitativeValue", minValue: Math.round(site.delivery.minHours / 24), maxValue: Math.round(site.delivery.maxHours / 24), unitCode: "DAY" },
  },
});

/** Politique de retour, déclarée une fois, au niveau de l'Organization : 7 jours, retour gratuit par colis, produits neufs. */
const returnPolicy = () => ({
  "@type": "MerchantReturnPolicy",
  "@id": abs("/#politique-de-retour"),
  applicableCountry: "MA",
  returnPolicyCountry: "MA",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: site.returns.days,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/FreeReturn",
  refundType: ["https://schema.org/FullRefund", "https://schema.org/ExchangeRefund"],
  itemCondition: "https://schema.org/NewCondition",
  merchantReturnLink: abs("/livraison-paiement#retours"),
});

/** `unit` : achat à l'unité (livraison payante) ; sinon gamme complète (livraison offerte). */
export const offerLd = (price: number, url: string, unit: boolean) => ({
  "@type": "Offer",
  url,
  price: price.toFixed(2),
  priceCurrency: "MAD",
  availability: "https://schema.org/InStock",
  itemCondition: "https://schema.org/NewCondition",
  seller: ORG,
  shippingDetails: shipping(unit),
  hasMerchantReturnPolicy: { "@id": abs("/#politique-de-retour") },
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

/** Un soin, sur sa page produit : une offre par format vendu à l'unité (prix, MAD, disponibilité). */
export function productLd(p: Product, locale: Locale) {
  const url = abs(localePath(locale, `/soins/${p.slug}`));
  const formats = unitFormats(p);
  const offers = formats.map((f) => ({
    ...offerLd(p.unitPrice[f] as number, url, true),
    name: `${p.name[locale]}${formats.length > 1 ? `${locale === "ar" ? "، " : ", "}${gamme.formats[f].label[locale]}` : ""} (${p.ml[f]} ${locale === "ar" ? "مل" : "ml"})`,
    sku: `OTAGE-${p.no.replace(/\D/g, "")}-${f === "grand" ? "G" : "P"}`,
  }));
  return {
    ...productBase(`${p.name[locale]} ${site.name} ${p.no.replace(" ", "")}`, p.metaDescription[locale], [p.hd ?? p.pack, ...p.photos], locale === "ar" ? (p.range === "yeux" ? "العناية بمحيط العين" : "العناية بالوجه ضد البقع") : p.range === "yeux" ? "Soins du contour des yeux" : "Soins du visage anti-taches", locale),
    "@id": `${url}#product`,
    url,
    size: formats.map((f) => `${p.ml[f]} ml`).join(" / "),
    offers: offers.length > 1 ? offers : offers[0],
  };
}

/** La gamme anti-taches complète, dans un format. */
export function gammeLd(format: FormatKey, desc: string) {
  const f = gamme.formats[format];
  return {
    ...productBase(`${gamme.name.fr} ${site.name}, ${f.label.fr}`, desc, gamme.photos.slice(0, 2), "Soins du visage anti-taches"),
    "@id": abs(`/#gamme-anti-taches-${format}-format`),
    offers: offerLd(f.price, abs("/#offres"), false),
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
