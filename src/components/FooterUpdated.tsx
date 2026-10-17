"use client";

import { usePathname } from "next/navigation";

/** Date « Mis à jour le » du pied de page des pages intérieures : celle de la page affichée (src/data/updated.ts).
    Le pied de page vient du layout, qui ne connaît pas la page : les dates, déjà formatées, arrivent du serveur,
    et le chemin est lu ici (rendu aussi côté serveur, donc présent dans le HTML). */
export default function FooterUpdated({ label, dates, fallback }: { label: string; dates: Record<string, [string, string]>; fallback: [string, string] }) {
  const path = (usePathname() || "/").replace(/^\/ar(?=\/|$)/, "") || "/";
  const [iso, text] = dates[path] ?? fallback;
  return <>{label} <time dateTime={iso}>{text}</time>.</>;
}
