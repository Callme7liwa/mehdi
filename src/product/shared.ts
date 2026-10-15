/* Ce que partagent la page (serveur) et le ticket (navigateur) : le format d'un soin dans le ticket, et deux petites aides. */
import type { FormatKey, ProductKey } from "@/data/products";

export type CartItem = {
  key: ProductKey;
  no: string;
  name: string;
  url: string;
  img: { src: string; w: number; h: number };
  /** Pot plus large que haut (déodorant) : affiché plus petit que les flacons. */
  wide: boolean;
  formats: { f: FormatKey; ml: number; price: number }[];
  /** Offre 2 + 1 : 1 article offert tous les 3. */
  bundle: boolean;
};
export type Line = { key: ProductKey; f: FormatKey; qty: number; main?: boolean };

export const fill = (tpl: string, vars: Record<string, string | number>) => tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
export const freeOf = (it: CartItem, qty: number) => (it.bundle ? Math.floor(qty / 3) : 0);

