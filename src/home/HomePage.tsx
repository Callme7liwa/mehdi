import "./home.css";
import { gamme, productByKey, rangeProducts } from "@/data/products";
import { reviews } from "@/data/reviews";
import { site, type Locale } from "@/data/site";
import { localePath } from "@/lib/seo";
import HomeScripts from "./HomeScripts";
import type { HomeConfig } from "./home-init";
import Campaign from "./sections/Campaign";
import Diagnostic from "./sections/Diagnostic";
import Discover from "./sections/Discover";
import Fab from "./sections/Fab";
import Faq from "./sections/Faq";
import Footer from "./sections/Footer";
import Gallery from "./sections/Gallery";
import Hero from "./sections/Hero";
import Hesite from "./sections/Hesite";
import Offers from "./sections/Offers";
import QuickView from "./sections/QuickView";
import { isolateAll } from "@/lib/bidi";
import { homeText } from "./text";
import { homeJsText } from "./text-js";

const lowerFirst = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
const ml = (f: "petit" | "grand") => ({
  gel: productByKey("gel").ml[f] ?? null,
  serum: productByKey("serum").ml[f] ?? null,
  creme: productByKey("creme").ml[f] ?? null,
  ecran: productByKey("ecran").ml[f] ?? null,
});

/** Données passées aux scripts d'animation : tout vient de src/data/. */
function config(locale: Locale): HomeConfig {
  const ar = locale === "ar";
  const t = ar ? isolateAll(homeJsText.ar) : homeJsText.fr;
  const fmt = (f: "petit" | "grand") => ({ label: gamme.formats[f].label[locale], labelFr: gamme.formats[f].label.fr, price: gamme.formats[f].price, was: gamme.formats[f].was, ml: ml(f) });
  return {
    t,
    rtl: ar,
    whatsapp: site.whatsapp.wa,
    retractation: site.returns.short[locale],
    formats: { petit: fmt("petit"), grand: fmt("grand") },
    yeuxPrice: productByKey("yeux").unitPrice.petit as number,
    quick: rangeProducts.map((p) => ({
      num: `${p.no} / 04`,
      name: p.name[locale],
      size: `${p.ml.grand} ${t.ml}`,
      lead: p.lead[locale],
      chips: p.ingredients.map((i) => i[locale]),
      how: ar ? p.how.ar : lowerFirst(p.how.fr),
      when: ar
        ? `الخطوة ${p.step} في الروتين، <b>${p.step === 4 ? "في الصباح فقط" : "صباحًا ومساءً"}</b>.`
        : `Étape ${p.step} de la routine, <b>${p.step === 4 ? "le matin uniquement" : "matin et soir"}</b>.`,
      url: localePath(locale, `/soins/${p.slug}`),
    })),
    // les messages des clientes restent dans leur langue d'origine ; seule l'étiquette est traduite
    reviews: (ar ? isolateAll(reviews) : reviews).map((r) => ({ ...r, ville: r.ville === "Cliente OTAGE" ? t.customer : r.ville })),
  };
}

/* Avant l'affichage : le ciel prend tout de suite la bonne couleur (matin ou soir, heure du Maroc),
   sans attendre le chargement des scripts. Même règle que setPhase() dans home-init.js. */
const phaseScript = `(function(){try{var h=document.querySelector(".hero"),s=null,hr;try{s=localStorage.getItem("otage-moment")}catch(e){}try{hr=Number(new Intl.DateTimeFormat("fr-FR",{hour:"numeric",hourCycle:"h23",timeZone:"Africa/Casablanca"}).format(new Date()))}catch(e){hr=new Date().getHours()}var p=s==="matin"||s==="soir"?s:hr>=5&&hr<17?"matin":"soir";h.dataset.phase=p;h.querySelectorAll(".switch button").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.set===p))});if(p==="soir")h.querySelector(".pin.ecran").classList.add("off")}catch(e){}})()`;

/** La page d'accueil animée, en français (/) ou en arabe (/ar, de droite à gauche). */
export default function HomePage({ locale }: { locale: Locale }) {
  const t = homeText[locale];
  return (
    <>
      <Hero t={t} locale={locale} />
      <script dangerouslySetInnerHTML={{ __html: phaseScript }} />
      <QuickView t={t} />
      <Diagnostic t={t} />
      <Offers t={t} locale={locale} />
      <Discover t={t} locale={locale} />
      <Campaign t={t} />
      <Faq t={t} locale={locale} />
      <Gallery t={t} locale={locale} />
      <Footer t={t} locale={locale} />
      <Hesite t={t} locale={locale} />
      <Fab t={t} />
      <HomeScripts cfg={config(locale)} />
    </>
  );
}
