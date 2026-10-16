"use client";

/* Mesure d'audience (Google Tag Manager, ou GA4 en direct), seulement avec l'accord de la visiteuse (loi 09-08).
   - Avec un conteneur GTM (prop gtmId, écrit en dur dans data/google.ts) : GTM est chargé après « Accepter », et les événements du site sont
     poussés dans le dataLayer ; les balises GA4 se configurent dans GTM. Pas de <noscript> GTM : sans JavaScript,
     la visiteuse ne peut pas donner son accord.
   - Sans GTM mais avec un identifiant GA4 (NEXT_PUBLIC_GA_ID) : gtag.js en direct.
   - Sans aucun des deux : ce composant n'affiche rien et ne charge rien.
   - Refus ou pas de réponse : aucun script Google, aucun cookie de mesure.
   - Le choix est gardé dans le navigateur. Le lien « Gérer les cookies » du pied de page (attribut data-cookies)
     et l'adresse /mentions-legales#cookies rouvrent la question.
   Événements (liste fermée de champs, jamais de nom, téléphone, ville, adresse ni e-mail) :
     clic_whatsapp      { page }                                  chemin de la page, sans paramètres
     choix_offre        { offre }                                 « gamme » ou « contour_des_yeux »
     commande_envoyee   { value, currency: "MAD", offre, numero } montant calculé par le serveur, numéro OTG-…
     visite_ia          { source_ia }                             site de l'assistant IA d'où vient la visite
   Le groupe de canaux « Trafic IA » se crée dans l'interface de GA4 : voir docs/mise-en-ligne.md. */
import { useEffect, useState } from "react";

const KEY = "otage-consentement";
/** Assistants IA : sources du groupe de canaux « Trafic IA ». */
const AI = /(^|\.)(chatgpt\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai)$/;

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}

const TEXT = {
  fr: { msg: "On aimerait mesurer la fréquentation du site (pages vues, clics sur WhatsApp, commandes) avec Google Analytics. Rien n'est mesuré sans ton accord.", yes: "Accepter", no: "Refuser", more: "En savoir plus", label: "Mesure d'audience" },
  ar: { msg: "نود قياس عدد زيارات الموقع (الصفحات، النقر على واتساب، الطلبات) بواسطة Google Analytics. لا شيء يُقاس دون موافقتك.", yes: "أوافق", no: "أرفض", more: "للمزيد", label: "قياس الزيارات" },
};

type Params = Record<string, string | number>;
/** Champs autorisés par événement : tout autre champ est ignoré. */
const ALLOWED: Record<string, string[]> = {
  clic_whatsapp: ["page"],
  choix_offre: ["offre"],
  commande_envoyee: ["value", "currency", "offre", "numero"],
  visite_ia: ["source_ia"],
};
const clean = (name: string, params: Record<string, unknown>): Params =>
  Object.fromEntries((ALLOWED[name] ?? []).filter((k) => typeof params[k] === "string" || typeof params[k] === "number").map((k) => [k, params[k] as string | number]));

function push(id: string, name: string, params: Record<string, unknown>) {
  const p = clean(name, params);
  if (id.startsWith("GTM-")) { if (document.getElementById("gtm-js")) window.dataLayer?.push({ event: name, ...p }); }
  else window.gtag?.("event", name, p);
}

function load(id: string) {
  window.dataLayer = window.dataLayer || [];
  if (id.startsWith("GTM-")) {
    if (document.getElementById("gtm-js")) return;
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const s = document.createElement("script");
    s.id = "gtm-js"; s.async = true; s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
  } else {
    if (window.gtag) return;
    window.gtag = function gtag() { window.dataLayer!.push(arguments); }; // eslint-disable-line prefer-rest-params
    window.gtag("js", new Date());
    window.gtag("config", id);
    const s = document.createElement("script");
    s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
  }
  try { const ref = document.referrer && new URL(document.referrer).hostname; if (ref && AI.test(ref)) push(id, "visite_ia", { source_ia: ref }); } catch { /* adresse d'origine illisible */ }
}

/** `above` : la page a une barre fixe en bas (accueil, fiches) ; le bandeau se place au-dessus pour ne pas la masquer. */
export default function Analytics({ gaId: ga, gtmId, locale, above }: { gaId: string; gtmId?: string; locale: "fr" | "ar"; above?: boolean }) {
  const [ask, setAsk] = useState(false);
  // GTM en priorité (les balises GA4 y sont configurées) ; sinon GA4 en direct
  const gaId = gtmId || ga;

  useEffect(() => {
    if (!gaId) return;
    let choice: string | null = null;
    try { choice = localStorage.getItem(KEY); } catch { /* stockage indisponible : on redemandera */ }
    if (choice === "oui") load(gaId);
    const reopen = () => { if (location.hash === "#cookies") setAsk(true); };
    window.addEventListener("hashchange", reopen);
    // sans choix enregistré, la question s'affiche à la première interaction (défilement, toucher, clavier) :
    // rien n'est mesuré avant l'accord, et le bandeau ne devient pas le plus grand élément du premier affichage (LCP)
    const INPUT = ["scroll", "wheel", "pointerdown", "keydown", "touchstart"] as const;
    const show = () => { INPUT.forEach((ev) => window.removeEventListener(ev, show)); setAsk(true); };
    // arrivée sur /mentions-legales#cookies : la question est posée tout de suite (après le premier rendu)
    const first = location.hash === "#cookies" ? requestAnimationFrame(() => setAsk(true)) : 0;
    if (!first && choice === null) INPUT.forEach((ev) => window.addEventListener(ev, show, { passive: true, once: true }));

    const onClick = (e: MouseEvent) => {
      const el = e.target as Element | null;
      // « Gérer les cookies » : la question est reposée sur place
      if (el?.closest?.("[data-cookies]")) { e.preventDefault(); setAsk(true); return; }
      if (el?.closest?.('a[href*="wa.me"]')) push(gaId, "clic_whatsapp", { page: location.pathname });
    };
    const onOrder = (e: Event) => push(gaId, "commande_envoyee", { ...(e as CustomEvent).detail, currency: "MAD" });
    const onChoice = (e: Event) => push(gaId, "choix_offre", (e as CustomEvent).detail);
    document.addEventListener("click", onClick);
    window.addEventListener("otage:order", onOrder);
    window.addEventListener("otage:choice", onChoice);
    return () => { cancelAnimationFrame(first); INPUT.forEach((ev) => window.removeEventListener(ev, show)); window.removeEventListener("hashchange", reopen); document.removeEventListener("click", onClick); window.removeEventListener("otage:order", onOrder); window.removeEventListener("otage:choice", onChoice); };
  }, [gaId]);

  if (!gaId || !ask) return null;
  const t = TEXT[locale];
  const answer = (yes: boolean) => {
    try { localStorage.setItem(KEY, yes ? "oui" : "non"); } catch { /* choix valable pour cette page seulement */ }
    if (yes) load(gaId);
    setAsk(false);
  };
  // « Refuser » et « Accepter » : même taille, même style, même niveau
  const btn = { flex: 1, minHeight: 44, padding: "0 18px", borderRadius: 999, border: "1.5px solid #4a0d16", background: "#4a0d16", color: "#f7efe6", font: "600 14px inherit", cursor: "pointer" } as const;
  return (
    <div role="dialog" aria-label={t.label} style={{ position: "fixed", insetInline: 12, bottom: above ? "calc(112px + env(safe-area-inset-bottom, 0px))" : "calc(12px + env(safe-area-inset-bottom, 0px))", zIndex: 1000, maxWidth: 560, marginInline: "auto", padding: "14px 16px", borderRadius: 18, background: "#fffcf8", color: "#2b2223", boxShadow: "0 18px 50px -18px rgba(42,10,15,.55)", fontSize: 14, lineHeight: 1.45 }}>
      <p style={{ margin: 0 }}>{t.msg} <a href={locale === "ar" ? "/ar/mentions-legales#cookies" : "/mentions-legales#cookies"} style={{ color: "#4a0d16", fontWeight: 600 }}>{t.more}</a></p>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <button type="button" onClick={() => answer(false)} style={btn}>{t.no}</button>
        <button type="button" onClick={() => answer(true)} style={btn}>{t.yes}</button>
      </div>
    </div>
  );
}
