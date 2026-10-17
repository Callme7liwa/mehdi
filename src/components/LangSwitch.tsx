"use client";

import { usePathname } from "next/navigation";

/** Sélecteur de langue : mène à la même page dans l'autre langue (français à la racine, arabe sous /ar).
    `frOnly` : chemins français des pages sans version arabe à jour ; le sélecteur n'y est affiché dans aucune des deux langues. */
export default function LangSwitch({ label, title, frOnly = [] }: { label: string; title: string; frOnly?: string[] }) {
  const path = usePathname() || "/";
  const isAr = path === "/ar" || path.startsWith("/ar/");
  if (frOnly.includes(isAr ? path.replace(/^\/ar/, "") || "/" : path)) return null;
  const target = isAr ? path.replace(/^\/ar/, "") || "/" : path === "/" ? "/ar" : `/ar${path}`;
  // lien simple : les deux langues ont des layouts différents, la page se recharge
  return (
    <a className="lang" href={target} lang={isAr ? "fr" : "ar"} hrefLang={isAr ? "fr" : "ar"} title={title}>
      {label}
    </a>
  );
}
