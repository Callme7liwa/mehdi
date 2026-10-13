import type { Review } from "@/data/reviews";
import type { HomeJsText } from "../text-js";

export interface HomeConfig {
  /** Textes écrits par les scripts, dans la langue de la page. */
  t: HomeJsText;
  /** Page en arabe : lecture de droite à gauche. */
  rtl: boolean;
  /** Numéro WhatsApp au format wa.me (vide = boutons masqués). */
  whatsapp: string;
  /** Rappel du droit de rétractation, repris dans le message WhatsApp de confirmation. */
  retractation: string;
  /** Formats de la gamme anti-taches : prix et contenances. labelFr sert au tableur des commandes. */
  formats: Record<"petit" | "grand", { label: string; labelFr: string; price: number; was: number; ml: Record<"gel" | "serum" | "creme" | "ecran", number | null> }>;
  yeuxPrice: number;
  /** Contenu de la fenêtre « Voir le soin », dans l'ordre des 4 soins de la routine. */
  quick: { num: string; name: string; size: string; lead: string; chips: string[]; how: string; when: string; url: string }[];
  reviews: Review[];
}

