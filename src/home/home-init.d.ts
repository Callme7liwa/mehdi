import type { Review } from "@/data/reviews";

export interface HomeConfig {
  /** Numéro WhatsApp au format wa.me (vide = boutons masqués). */
  whatsapp: string;
  ordersEndpoint: string;
  /** Formats de la gamme anti-taches : prix et contenances. */
  formats: Record<"petit" | "grand", { label: string; price: number; was: number; ml: Record<"gel" | "serum" | "creme" | "ecran", number | null> }>;
  yeuxPrice: number;
  /** Contenu de la fenêtre « Voir le soin », dans l'ordre des 4 soins de la routine. */
  quick: { num: string; name: string; size: string; lead: string; chips: string[]; how: string; when: string; url: string }[];
  reviews: Review[];
}

export function initHome(cfg: HomeConfig): void;
