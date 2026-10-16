/* Icônes des fiches produits, reprises des maquettes (trait de 1,6 px, 24 × 24). */
import type { PerkIcon, StepIcon } from "@/data/product-pages";

const NO = <><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></>;
const letter = (t: string, size: number) => <text x="12" y="15.2" textAnchor="middle" fontSize={size} fontFamily="DM Sans,sans-serif" fontWeight="700" fill="currentColor" stroke="none">{t}</text>;
const DROP = <path d="M12 3c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10z" />;

const PERKS: Record<PerkIcon | "price", React.ReactNode> = {
  spots: <><circle cx="12" cy="12" r="8" /><circle cx="9" cy="10" r="1.6" /><circle cx="14.5" cy="13.5" r="2.2" /><circle cx="10" cy="15" r=".9" /></>,
  leaf: <><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" /><path d="M5 19c3-4 6-7 10-9" /></>,
  flower: <><circle cx="12" cy="12" r="2.5" /><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></>,
  star: <path d="M12 3l2.2 5.2L20 9l-4.3 3.8L17 18.5 12 15.6 7 18.5l1.3-5.7L4 9l5.8-.8z" />,
  noSulfate: <>{NO}<circle cx="10" cy="13" r="2" /><circle cx="14.5" cy="9.5" r="1.4" /></>,
  fig: <><circle cx="12" cy="13" r="7" /><path d="M12 6V3M9 4l3 2 3-2" /><circle cx="10" cy="12" r=".6" /><circle cx="14" cy="14" r=".6" /><circle cx="11" cy="16" r=".6" /></>,
  drop: <>{DROP}<path d="M10 14a2 2 0 0 0 2 2" /></>,
  waves: <><path d="M4 12c2-2 4-2 6 0s4 2 6 0 4-2 4-2" /><path d="M4 17c2-2 4-2 6 0s4 2 6 0 4-2 4-2" /><path d="M8 7c1-1.5 2.5-1.5 3.5 0" /></>,
  drop2: DROP,
  halfTone: <><circle cx="12" cy="12" r="8" /><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none" opacity=".35" /></>,
  flask: <><path d="M9 3h6M10 3v5l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V3" /><path d="M7.5 14h9" /></>,
  helix: <path d="M7 4c3 3 3 5 0 8s-3 5 0 8M17 4c-3 3-3 5 0 8s3 5 0 8M8 8h8M8 16h8" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  noSpots: <><circle cx="12" cy="12" r="8" /><circle cx="9" cy="10" r="1.6" /><circle cx="14.5" cy="13.5" r="2.2" /><path d="M5 5l14 14" /></>,
  bottle: <path d="M7 3h10l-1 4H8zM8 7h8v13a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" />,
  eye: <><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="2.6" /></>,
  cup: <><path d="M6 8h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" /><path d="M17 10h1.5a2 2 0 0 1 0 4H17M9 3c0 1.5 1 1.5 1 3M13 3c0 1.5 1 1.5 1 3" /></>,
  aloe: <path d="M12 21V9M12 13c-3-1-5-4-5-8 3 1 5 4 5 8zM12 13c3-1 5-4 5-8-3 1-5 4-5 8z" />,
  noAl: <>{NO}{letter("Al", 7.5)}</>,
  noP: <>{NO}{letter("P", 8)}</>,
  price: <><path d="M3 12V4h8l10 10-8 8z" /><circle cx="7.5" cy="8.5" r="1.4" /></>,
};

/* Pictogrammes des étapes « Comment » du mode d'emploi : même trait que les avantages. */
const STEPS: Record<StepIcon, React.ReactNode> = {
  drop: <>{DROP}<path d="M9.6 13.4a2.4 2.4 0 0 0 2.4 2.4" /></>,
  hands: <><path d="M6.5 12a5.5 5.5 0 0 1 9.4-3.9" /><path d="M16.3 4.6v3.7h-3.7" /><path d="M17.5 12a5.5 5.5 0 0 1-9.4 3.9" /><path d="M7.7 19.4v-3.7h3.7" /></>,
  rinse: <><path d="M8 4.5c1 1.3 1.6 2.2 1.6 3a1.6 1.6 0 0 1-3.2 0c0-.8.6-1.7 1.6-3z" /><path d="M15.5 3.5c1 1.3 1.6 2.2 1.6 3a1.6 1.6 0 0 1-3.2 0c0-.8.6-1.7 1.6-3z" /><path d="M3 14.5c2 0 2-1.5 4.5-1.5s2.5 1.5 4.5 1.5 2-1.5 4.5-1.5 2.5 1.5 4.5 1.5" /><path d="M3 19c2 0 2-1.5 4.5-1.5S10 19 12 19s2-1.5 4.5-1.5S19 19 21 19" /></>,
  towel: <><path d="M3 5h18" /><path d="M6 5v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5" /><path d="M6 15h12" /><path d="M6 12.5h12" /></>,
  dropper: <><path d="M14.6 4.6a2 2 0 0 1 2.8 0l2 2a2 2 0 0 1 0 2.8L18 10.8 13.2 6z" /><path d="M15.6 8.4l-7.9 7.9-1.3 2.9 2.9-1.3 7.9-7.9" /><path d="M5 18.5c.8 1 1.2 1.7 1.2 2.2a1.2 1.2 0 0 1-2.4 0c0-.5.4-1.2 1.2-2.2z" /></>,
  tap: <><path d="M10 20.5v-8a1.5 1.5 0 0 1 3 0v3" /><path d="M13 14a1.5 1.5 0 0 1 3 0v1.5" /><path d="M16 15a1.5 1.5 0 0 1 3 0v2a4.5 4.5 0 0 1-4.5 4.5h-1.6a4 4 0 0 1-3.1-1.5L7 16.9a1.4 1.4 0 0 1 2.1-1.8l.9 1" /><path d="M8.2 7.5a4 4 0 0 1 6.6 0" /><path d="M5.6 5.6a7.6 7.6 0 0 1 11.8 0" /></>,
  jar: <><path d="M6.5 6.5h11a1 1 0 0 1 1 1v2.5h-13V7.5a1 1 0 0 1 1-1z" /><path d="M6 10h12v8a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" /><path d="M9.5 15h5" /></>,
  face: <><circle cx="12" cy="9" r="5.5" /><path d="M5 21c.9-3 3.6-5 7-5s6.1 2 7 5" /><path d="M9.6 9.2c.5-.4 1-.4 1.5 0M12.9 9.2c.5-.4 1-.4 1.5 0" /></>,
  up: <><path d="M8 20V8" /><path d="M5 11l3-3 3 3" /><path d="M16 20V5" /><path d="M13 8l3-3 3 3" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" /></>,
  clock: <><circle cx="12" cy="12.5" r="8.5" /><path d="M12 8v4.5l3 2" /><path d="M9.5 2.5h5" /></>,
  roller: <><circle cx="12" cy="5.5" r="2.5" /><path d="M8.5 9h7v10a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2z" /><path d="M8.5 13h7" /></>,
  dayNight: <><circle cx="8" cy="9" r="3" /><path d="M8 3v1.2M8 13.8V15M2 9h1.2M3.8 4.8l.9.9M3.8 13.2l.9-.9M12.2 4.8l-.9.9" /><path d="M21 16.5a5 5 0 0 1-6.5-6.5 5.5 5.5 0 1 0 6.5 6.5z" /></>,
  finger: <><path d="M10 21v-8a1.5 1.5 0 0 1 3 0v3" /><path d="M13 15a1.5 1.5 0 0 1 3 0v1" /><path d="M16 16a1.5 1.5 0 0 1 3 0v1a4.5 4.5 0 0 1-4.5 4.5" /><path d="M10 17.5l-1.6-1.6a1.4 1.4 0 0 0-2 2l2.6 2.8" /><path d="M9.4 10.6c0-1.4.9-2.5 2.1-2.5s2.1 1.1 2.1 2.5z" /><path d="M11.5 8.1c.3-.8.9-1.3 1.7-1.5" /></>,
  melt: <><path d="M12 5.5c2.5 3.1 3.9 5.4 3.9 7.6a3.9 3.9 0 0 1-7.8 0c0-2.2 1.4-4.5 3.9-7.6z" /><path d="M5 16c-1-1-1-2 0-3s1-2 0-3" /><path d="M19 16c-1-1-1-2 0-3s1-2 0-3" /></>,
};

export const StepSvg = ({ name }: { name: StepIcon }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{STEPS[name]}</svg>
);

export const PerkSvg = ({ name }: { name: PerkIcon | "price" }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{PERKS[name]}</svg>
);

export const Arrow = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Back = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const Next = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Up = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
);
export const Close = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Check = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
export const Plus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
);
export const Pot = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="7" width="14" height="13" rx="3" /><rect x="6" y="3.5" width="12" height="4" rx="1.5" /></svg>
);
export const Spark = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z" /></svg>
);
export const Wa = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.4 4.8 4.9-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1c0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3z" /></svg>
);
