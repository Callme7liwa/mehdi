import { Fragment } from "react";
import { reassure, type Locale } from "@/data/site";

/* La ligne de réassurance (« Livraison 24–72 h · Paiement à la livraison · Retour 7 jours »), la même près de chaque
   bouton principal de l'accueil et des fiches. Chaque partie reste sur une ligne : seul le « · » peut passer à la ligne.
   Dans la barre fixe, étroite, les parties s'empilent (une par ligne, sans « · »). */
export default function Reassure({ locale, as: Tag = "p", className }: { locale: Locale; as?: "p" | "li" | "span"; className?: string }) {
  const parts = reassure[locale].split(" · ");
  return (
    <Tag className={className ? `reassure ${className}` : "reassure"}>
      {parts.map((x, i) => <Fragment key={i}>{i > 0 && " "}<span className="rs">{x}{i < parts.length - 1 && <span className="sep"> ·</span>}</span></Fragment>)}
    </Tag>
  );
}
