"use client";

/* Bouton principal de l'en-tête des pages intérieures, toujours avec le prix (lu dans products.ts par l'en-tête).
   Par défaut : la gamme anti-taches, sur l'accueil. Sur une page qui parle d'un seul soin (Cernes : le contour des yeux),
   le bouton mène à ce soin, avec son prix. usePathname fonctionne aussi au rendu serveur : le bon bouton est dans le HTML.
   Sur petit écran, « dès » est masqué pour que le bouton tienne sur une ligne ; le prix reste. */
import { usePathname } from "next/navigation";
import { BagIcon } from "./icons";

export type Cta = { href: string; order: string; from?: string; price: string };

export default function HeaderCta({ fallback, byPath }: { fallback: Cta; byPath: Record<string, Cta> }) {
  const path = (usePathname() || "/").replace(/\/$/, "");
  const c = byPath[path] ?? fallback;
  return (
    <a className="btn btn-dark btn-sm top-cta" href={c.href}>
      {c.order} · {c.from && <span className="top-from">{c.from} </span>}{c.price}<BagIcon />
    </a>
  );
}
