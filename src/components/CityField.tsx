import type { InputHTMLAttributes } from "react";
import { cities, cityText } from "@/data/cities";
import type { Locale } from "@/data/site";

/* Champ « Ville » de tous les formulaires de commande (accueil, boutique à l'unité, fiches produits).
   Une seule liste (src/data/cities.ts) proposée en saisie automatique : la cliente tape pour chercher, ou écrit
   une autre ville, un village ou un douar (champ libre, rien n'est refusé). Sans hook : utilisable côté serveur et client.
   `look` reprend la mise en forme des champs de la page (accueil : .fld, fiches : .f). */
type Props = {
  locale: Locale;
  /** Préfixe des id (champ, aide, liste) : unique par formulaire. */
  id: string;
  look: "home" | "product";
  /** Id d'une liste déjà présente dans la page (sinon le champ ajoute la sienne). */
  listId?: string;
  input?: InputHTMLAttributes<HTMLInputElement>;
};

export function CityList({ id, locale }: { id: string; locale: Locale }) {
  return <datalist id={id}>{cities.map((c) => <option key={c.fr} value={c[locale]} />)}</datalist>;
}

export default function CityField({ locale, id, look, listId, input }: Props) {
  const list = listId ?? `${id}-villes`, info = `${id}-ville-info`;
  const field = <input id={`${id}-ville`} name="ville" list={list} autoComplete="address-level2" enterKeyHint="next" placeholder={cityText.placeholder[locale]} aria-describedby={info} {...input} />;
  const help = <small id={info} className={look === "home" ? "fld-info" : "f-info"}>{cityText.other[locale]}</small>;
  return look === "home" ? (
    <label className="fld"><span>{cityText.label[locale]}</span>{field}{help}{!listId && <CityList id={list} locale={locale} />}</label>
  ) : (
    <div className="f"><label htmlFor={`${id}-ville`}>{cityText.labelTicket[locale]}</label>{field}{help}{!listId && <CityList id={list} locale={locale} />}</div>
  );
}
