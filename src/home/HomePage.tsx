import "./home.css";
import { gamme, productByKey, rangeProducts } from "@/data/products";
import { reviews } from "@/data/reviews";
import { site } from "@/data/site";
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

const lowerFirst = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
const ml = (f: "petit" | "grand") => ({
  gel: productByKey("gel").ml[f] ?? null,
  serum: productByKey("serum").ml[f] ?? null,
  creme: productByKey("creme").ml[f] ?? null,
  ecran: productByKey("ecran").ml[f] ?? null,
});

/** Données passées aux scripts d'animation : tout vient de src/data/. */
const cfg: HomeConfig = {
  whatsapp: site.whatsapp.wa,
  ordersEndpoint: site.ordersEndpoint,
  formats: {
    petit: { label: gamme.formats.petit.label.fr, price: gamme.formats.petit.price, was: gamme.formats.petit.was, ml: ml("petit") },
    grand: { label: gamme.formats.grand.label.fr, price: gamme.formats.grand.price, was: gamme.formats.grand.was, ml: ml("grand") },
  },
  yeuxPrice: productByKey("yeux").unitPrice.petit as number,
  quick: rangeProducts.map((p) => ({
    num: `${p.no} / 04`,
    name: p.name.fr,
    size: `${p.ml.grand} ml`,
    lead: p.lead.fr,
    chips: p.ingredients.map((i) => i.fr),
    how: lowerFirst(p.how.fr),
    when: `Étape ${p.step} de la routine, <b>${p.step === 4 ? "le matin uniquement" : "matin et soir"}</b>.`,
    url: `/soins/${p.slug}`,
  })),
  reviews,
};

/* Avant l'affichage : le ciel prend tout de suite la bonne couleur (matin ou soir, heure du Maroc),
   sans attendre le chargement des scripts. Même règle que setPhase() dans home-init.js. */
const phaseScript = `(function(){try{var h=document.querySelector(".hero"),s=null,hr;try{s=localStorage.getItem("otage-moment")}catch(e){}try{hr=Number(new Intl.DateTimeFormat("fr-FR",{hour:"numeric",hourCycle:"h23",timeZone:"Africa/Casablanca"}).format(new Date()))}catch(e){hr=new Date().getHours()}var p=s==="matin"||s==="soir"?s:hr>=5&&hr<17?"matin":"soir";h.dataset.phase=p;h.querySelectorAll(".switch button").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.set===p))});if(p==="soir")h.querySelector(".pin.ecran").classList.add("off")}catch(e){}})()`;

export default function HomePage() {
  return (
    <>
      <Hero />
      <script dangerouslySetInnerHTML={{ __html: phaseScript }} />
      <QuickView />
      <Diagnostic />
      <Offers />
      <Discover />
      <Campaign />
      <Faq />
      <Gallery />
      <Footer />
      <Hesite />
      <Fab />
      <HomeScripts cfg={cfg} />
    </>
  );
}
