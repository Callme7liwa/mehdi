/* Icônes des fiches produits, reprises des maquettes (trait de 1,6 px, 24 × 24). */
import type { PerkIcon } from "@/data/product-pages";

const NO = <><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></>;
const letter = (t: string, size: number) => <text x="12" y="15.2" textAnchor="middle" fontSize={size} fontFamily="DM Sans,sans-serif" fontWeight="700" fill="currentColor" stroke="none">{t}</text>;
const DROP = <path d="M12 3c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10z" />;

const PERKS: Record<PerkIcon | "price" | "truck" | "cash" | "back", React.ReactNode> = {
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
  truck: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>,
  cash: <><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /></>,
  back: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></>,
};

export const PerkSvg = ({ name }: { name: PerkIcon | "price" | "truck" | "cash" | "back" }) => (
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
export const Card = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="13" rx="2" /><path d="M2 10h20" /></svg>
);
export const Undo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
);
export const Wa = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.4 4.8 4.9-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1c0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3z" /></svg>
);
