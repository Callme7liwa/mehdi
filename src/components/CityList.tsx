import { cities } from "@/data/cities";
import type { Locale } from "@/data/site";

/* Liste des villes du Maroc (src/data/cities.ts) pour la saisie automatique du champ « Ville ».
   Rendue côté serveur, une fois par page ; les champs (CityField) la désignent par son id. */
export default function CityList({ id, locale }: { id: string; locale: Locale }) {
  return <datalist id={id}>{cities.map((c) => <option key={c.fr} value={c[locale]} />)}</datalist>;
}
