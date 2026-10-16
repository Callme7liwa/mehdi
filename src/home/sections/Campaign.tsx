import type { HomeText } from "../text";
import Img from "@/components/Img";
import { productByKey, type ProductKey } from "@/data/products";
import type { Locale } from "@/data/site";
import { localePath } from "@/lib/seo";

/* « Le mur de l'atelier » : les 9 affiches en collage fixe (desktop), en bande horizontale native au doigt (mobile).
   Chaque affiche est un lien vers le soin qu'elle montre ; la gamme mène aux offres, la photo de groupe à /soins.
   Positions dessinées sur une toile de 1200 × 1346 px, en % : la composition suit la largeur et se met en miroir en arabe.
   --d : plan de profondeur (1 fond … 3 devant) pour le léger parallaxe (CSS seul, desktop). */
type Shot = { id: string; src: string; w: number; h: number; alt: (t: HomeText) => string; to: ProductKey | "offres" | "soins"; x: number; y: number; size: number; r: number; d: 1 | 2 | 3; video?: boolean };
const SHOTS: Shot[] = [
  { id: "gamme", src: "/images/gamme-anti-taches-4-soins-papier-rouge.webp", w: 1600, h: 1600, alt: (t) => t.campaignLes4SoinsTenus, to: "offres", x: 3.33, y: 4.46, size: 39.17, r: -2, d: 2 },
  { id: "eclat", src: "/images/affiche-eclat-serum-anti-taches.webp", w: 664, h: 1000, alt: (t) => t.campaignAfficheEclatAvecLe, to: "serum", x: 41.25, y: 1.49, size: 20.83, r: 3, d: 3 },
  { id: "plage", src: "/images/ecran-solaire-spf50-plage-bouee.webp", w: 1600, h: 1600, alt: (t) => t.campaignLEcranSolaireA, to: "ecran", x: 65.0, y: 5.2, size: 27.5, r: -3, d: 1 },
  { id: "cliente", src: "/images/cliente-gel-nettoyant-anti-taches.webp", w: 1600, h: 1600, alt: (t) => t.campaignUneClienteSourianteTend, to: "gel", x: 46.67, y: 35.66, size: 27.5, r: -1.5, d: 2 },
  { id: "creme", src: "/images/panneau-ton-teint-revele-creme-anti-taches.webp", w: 1195, h: 1600, alt: (t) => t.campaignPanneauPublicitaireTonTeint, to: "creme", x: 77.08, y: 37.15, size: 20.83, r: 2.5, d: 3 },
  { id: "femme", src: "/images/femme-serum-anti-taches.webp", w: 1195, h: 1600, alt: (t) => t.campaignUneFemmeTendLe, to: "serum", x: 5.83, y: 48.29, size: 20.42, r: 2, d: 1 },
  { id: "video", src: "/videos/ecran-solaire-spf50.mp4", w: 720, h: 720, alt: () => "", to: "ecran", x: 25.0, y: 52.01, size: 23.33, r: -3.5, d: 3, video: true },
  { id: "flacons", src: "/images/flacons-otage-trousse.webp", w: 1600, h: 1600, alt: (t) => t.campaignUnePluieDeFlacons, to: "soins", x: 50.0, y: 66.12, size: 25.0, r: 3.5, d: 1 },
  { id: "gelmains", src: "/images/gel-nettoyant-anti-taches-mains.webp", w: 1195, h: 1600, alt: (t) => t.campaignLeGelNettoyantTenu, to: "gel", x: 78.33, y: 69.09, size: 19.17, r: -2.5, d: 2 },
];
const ARROW = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default function Campaign({ t, locale }: { t: HomeText; locale: Locale }) {
  const link = (s: Shot) => {
    if (s.to === "offres") return { href: "#offres", name: t.campaignLaGammeComplete, go: t.campaignVoirLesOffres };
    if (s.to === "soins") return { href: localePath(locale, "/soins"), name: t.galleryTousLesSoins, go: t.campaignVoirLesSoins };
    const p = productByKey(s.to);
    return { href: localePath(locale, `/soins/${p.slug}`), name: p.name[locale], go: t.campaignVoirLeSoin };
  };
  return (
    <section className="camp" id="campagne" aria-labelledby="camp-title">
      <header className="camp-head">
        <h2 id="camp-title">{t.campaignOnLAffichePartout}</h2>
        <p>{t.campaignFaisDefilerLeMur}</p>
      </header>
      <div className="wall">
        {SHOTS.map((s) => {
          const l = link(s);
          const style = { "--x": `${s.x}%`, "--y": `${s.y}%`, "--w": `${s.size}%`, "--r": `${s.r}deg`, "--rm": `${(s.r / 2).toFixed(2)}deg`, "--d": s.d, "--ar": `${s.w} / ${s.h}` } as React.CSSProperties;
          return (
            <a key={s.id} className={`poster pd${s.d}`} href={l.href} style={style}>
              <span className="tape t1" aria-hidden="true"></span><span className="tape t2" aria-hidden="true"></span>
              <span className="p-img">
                {s.video
                  ? <video src={s.src} data-poster="/images/ecran-solaire-spf50-video-poster.webp" width={s.w} height={s.h} muted loop playsInline preload="none" aria-hidden="true"></video>
                  : <Img src={s.src} alt={s.alt(t)} width={s.w} height={s.h} sizes={`(min-width: 1024px) ${Math.round(s.size)}vw, 78vw`} />}
              </span>
              <span className="p-tag"><span className="p-name">{l.name}</span><span className="p-go">{l.go}<i>{ARROW}</i></span></span>
            </a>
          );
        })}
        <p className="wall-note n1" style={{ "--x": "5.83%", "--y": "44.95%" } as React.CSSProperties}>{t.campaignNoteRoutine}</p>
        <p className="wall-note n2" style={{ "--x": "27.5%", "--y": "79.12%" } as React.CSSProperties}>{t.campaignNoteMaroc}</p>
      </div>
    </section>
  );
}
