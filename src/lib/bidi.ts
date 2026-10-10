/* Textes mixtes en arabe. Dans une phrase écrite de droite à gauche, le navigateur réordonne les fragments latins ou
   numériques faits de plusieurs morceaux : « 2 + 1 » s'affiche « 1 + 2 », « 85 % » devient « % 85 », « −50 » devient « 50− »,
   « @otage.1 » devient « otage.1@ », un numéro de téléphone s'affiche à l'envers, groupe par groupe.
   On entoure donc chaque fragment de caractères d'isolement Unicode (LRI … PDI) : il s'affiche tel qu'il est écrit.
   Ces caractères sont invisibles et fonctionnent aussi dans les attributs (alt, aria-label, title…).
   Un mot latin seul (OTAGE) ou un nombre seul (299) ne peut pas être réordonné : on n'y touche pas.
   Vérifié par `npm run check:bidi`. */
export const LRI = "\u2066", PDI = "\u2069";
const ARABIC = /[؀-ۿ]/;
const WORD = "[A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF0-9]+";
const GAP = "[ \u00A0\u202F]";
/** Un fragment latin ou numérique : mots et nombres reliés par des espaces ou des signes, signe ou % compris. */
export const FRAGMENT = new RegExp(`[@+\u2212-]?${WORD}(?:(?:${GAP}*[.,@/_:+\u00D7\u00B0\u2013\u2212-]${GAP}*|${GAP}+)${WORD})*(?:${GAP}?%)?`, "g");
const SINGLE = new RegExp(`^${WORD}$`);

const isolateText = (text: string) => text.replace(FRAGMENT, (m) => (SINGLE.test(m) ? m : LRI + m + PDI));

/** Retire les caractères d'isolement (données structurées, messages envoyés, comparaisons). */
export const unisolate = (text: string) => text.replace(/[\u2066\u2069]/g, "");

/** Isole les fragments latins ou numériques d'un texte arabe (les balises HTML sont laissées intactes).
    Sans effet sur un texte sans lettres arabes. */
export const isolate = (text: string) =>
  ARABIC.test(text) ? unisolate(text).split(/(<[^>]*>|\{[^}]*\})/).map((part, i) => (i % 2 ? part : isolateText(part))).join("") : text;

/** Applique `isolate` à tous les textes arabes d'un objet : la valeur `ar` de chaque paire { fr, ar }, en profondeur. */
export function isolateAr<T>(value: T): T {
  if (Array.isArray(value)) return value.map(isolateAr) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = k === "ar" && typeof v === "string" ? isolate(v) : isolateAr(v);
    return out as T;
  }
  return value;
}

/** Applique `isolate` à toutes les chaînes d'un objet entièrement en arabe (dictionnaires d'interface). */
export function isolateAll<T>(value: T): T {
  if (typeof value === "string") return isolate(value) as T;
  if (Array.isArray(value)) return value.map(isolateAll) as T;
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, isolateAll(v)])) as T;
  return value;
}
