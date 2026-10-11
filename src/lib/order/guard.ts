/* Anti-spam de la route /api/order : limite le nombre de commandes par téléphone et par adresse IP.
   Les compteurs sont gardés en mémoire, par instance du serveur : c'est un frein contre les envois en rafale,
   pas un compteur exact (Vercel peut faire tourner plusieurs instances, et les remet à zéro au redémarrage).
   Le champ piège du formulaire et l'appel de confirmation par téléphone restent les autres protections. */
const WINDOW = 60 * 60 * 1000; // une heure
export const LIMITS = { phone: 3, ip: 10 };

const hits = new Map<string, number[]>();
/** Identifiants de commande déjà traités : un renvoi du même formulaire ne crée pas de doublon. */
const seen = new Map<string, { at: number; response: unknown }>();

function prune(now: number) {
  if (hits.size + seen.size < 5000) return;
  for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW)) hits.delete(k);
  for (const [k, v] of seen) if (now - v.at > WINDOW) seen.delete(k);
}

/** true si la limite est atteinte pour cette clé (sans compter cette tentative). */
export function limited(kind: keyof typeof LIMITS, key: string, now = Date.now()) {
  const list = (hits.get(`${kind}:${key}`) ?? []).filter((t) => now - t < WINDOW);
  return list.length >= LIMITS[kind];
}
/** Compte une commande acceptée. */
export function count(kind: keyof typeof LIMITS, key: string, now = Date.now()) {
  prune(now);
  const k = `${kind}:${key}`;
  hits.set(k, [...(hits.get(k) ?? []).filter((t) => now - t < WINDOW), now]);
}
export const replay = (id: string) => seen.get(id)?.response;
export const remember = (id: string, response: unknown) => { seen.set(id, { at: Date.now(), response }); };
