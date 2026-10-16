/* Textes mixtes en arabe : ce qui se lit de droite à gauche, et ce qui reste de gauche à droite.

   Dans une phrase arabe, une expression faite de nombres et de signes se lit comme le reste de la phrase, de droite à
   gauche : pour « 2 + 1 مجانًا », l'œil rencontre d'abord 2, puis +, puis 1, puis مجانًا ; pour « 85 % », 85 puis %.
   C'est ce que fait le navigateur tout seul : on ne touche donc PAS à ces expressions. (Les forcer de gauche à droite
   les fait lire « 1 + 2 » et « % 85 » par une lectrice arabophone : c'était l'erreur de la première version.)

   Seuls les fragments qui forment un tout écrit en latin restent de gauche à droite : numéros de téléphone
   (« +212 6 88 91 82 01 »), adresses e-mail, identifiants (« @otage.ma »), adresses de sites. Sans protection, le
   navigateur les découpe (« otage.ma@ », groupes de chiffres dans le désordre). isolate() les entoure de caractères
   d'isolement Unicode (LRI … PDI), invisibles, qui fonctionnent aussi dans les attributs (alt, aria-label…).
   Vérifié par `npm run check:bidi`, sur les pages rendues dans de vrais navigateurs. */
export const LRI = "\u2066", PDI = "\u2069";
const ARABIC = /[\u0600-\u06FF]/;
const GAP = "[ \u00A0\u202F]";
/** Numéro de téléphone : au moins trois groupes de chiffres séparés par des espaces, avec ou sans « + ». */
export const PHONE = `\\+?\\d+(?:${GAP}\\d+){2,}`;
/** Identifiant, e-mail ou adresse : des lettres latines et des chiffres reliés par . @ / _ - (ou précédés de @). */
export const LATIN_UNIT = "@[A-Za-z0-9]+(?:[.@/_-][A-Za-z0-9]+)*|[A-Za-z0-9]+(?:[.@/_-][A-Za-z0-9]+)*[.@_][A-Za-z0-9]+(?:[.@/_-][A-Za-z0-9]+)*";
/** Les fragments à garder de gauche à droite. */
export const LTR_UNIT = new RegExp(`${PHONE}|${LATIN_UNIT}`, "g");
/** Une expression qui se lit dans le sens de la phrase : nombres reliés par un signe entouré d'espaces, ou nombre suivi de %. */
export const EXPRESSION = new RegExp(`\\d+(?:[.,]\\d+)?(?:${GAP}+[+\u00D7x/\u2013\u2212-]${GAP}+\\d+(?:[.,]\\d+)?)+(?:${GAP}?%)?|\\d+(?:[.,]\\d+)?${GAP}?%`, "g");

const isolateText = (text: string) => text.replace(LTR_UNIT, (m) => (/[A-Za-z]/.test(m) || /\d[ \u00A0\u202F]/.test(m) ? LRI + m + PDI : m));

/** Retire les caractères d'isolement (données structurées, messages envoyés, comparaisons). */
export const unisolate = (text: string) => text.replace(/[\u2066\u2069]/g, "");

/** Garde de gauche à droite les numéros de téléphone, e-mails et identifiants d'un texte arabe (balises HTML intactes).
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
