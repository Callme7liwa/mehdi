"use client";

import { usePathname } from "next/navigation";

/** Sélecteur de langue : mène à la même page dans l'autre langue (français à la racine, arabe sous /ar). */
export default function LangSwitch({ label, title }: { label: string; title: string }) {
  const path = usePathname() || "/";
  const isAr = path === "/ar" || path.startsWith("/ar/");
  const target = isAr ? path.replace(/^\/ar/, "") || "/" : path === "/" ? "/ar" : `/ar${path}`;
  // lien simple : les deux langues ont des layouts différents, la page se recharge
  return (
    <a className="lang" href={target} lang={isAr ? "fr" : "ar"} hrefLang={isAr ? "fr" : "ar"} title={title}>
      {label}
    </a>
  );
}
