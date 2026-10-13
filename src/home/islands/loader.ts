/* Chargement des îlots de l'accueil : un fichier JavaScript par section, téléchargé à part.
   - hero et voyage démarrent tout de suite (menu, matin / soir, défilement du hero) ;
   - les autres sont téléchargés en même temps, puis démarrent l'un après l'autre, dans l'ordre de la page,
     quand le navigateur est disponible ;
   - le ciel WebGL attend la fin du chargement de la page : il ne retarde ni le premier affichage ni l'image principale.
   Les données (prix, textes, avis) sont écrites une seule fois dans la page par HomePage.tsx (<script id="home-cfg">). */
import type { HomeConfig } from "./config";

const modules = {
  hero: () => import("./hero"),
  sky: () => import("./sky"),
  voyage: () => import("./voyage"),
  quickview: () => import("./quickview"),
  offers: () => import("./offers"),
  campaign: () => import("./campaign"),
  faq: () => import("./faq"),
  fab: () => import("./fab"),
  footer: () => import("./footer"),
  reviews: () => import("./reviews"),
  diagnostic: () => import("./diagnostic"),
  hesite: () => import("./hesite"),
};
export type IslandName = keyof typeof modules;

let cfg: HomeConfig | undefined;
const getCfg = (): HomeConfig => (cfg ??= JSON.parse(document.getElementById("home-cfg")?.textContent || "{}"));

const idle = () => new Promise<void>((done) => ("requestIdleCallback" in window ? requestIdleCallback(() => done(), { timeout: 1200 }) : setTimeout(done, 60)));
const pageLoaded = () => new Promise<void>((done) => (document.readyState === "complete" ? done() : window.addEventListener("load", () => done(), { once: true })));

/** Le ciel animé est réservé aux appareils qui le supportent sans effort : sinon le ciel CSS reste en place. */
function skyAllowed() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  const mobile = window.matchMedia("(pointer: coarse)").matches;
  const weak = (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) || (nav.hardwareConcurrency || 8) <= 2;
  return !(mobile && weak);
}

const NOW: IslandName[] = ["hero", "voyage"];
const started = new Set<IslandName>();
let queue: Promise<unknown> = Promise.resolve();

export function start(name: IslandName) {
  if (started.has(name)) return;
  started.add(name);
  if (name === "sky") {
    pageLoaded().then(idle).then(() => (skyAllowed() ? modules.sky().then((m) => m.default()) : undefined)).catch(() => {});
    return;
  }
  /* Téléchargement tout de suite, en parallèle des autres îlots ; exécution l'une après l'autre, dans l'ordre de la page.
     (En les téléchargeant un par un, le dernier îlot arrivait plusieurs secondes plus tard sur une connexion lente.) */
  const loading = modules[name]();
  loading.catch(() => {});
  queue = queue
    .then(() => (NOW.includes(name) ? undefined : idle()))
    .then(() => loading)
    .then((m) => (m.default as (c: HomeConfig) => void)(getCfg()))
    .catch((e) => console.error(`îlot ${name}`, e));
}
