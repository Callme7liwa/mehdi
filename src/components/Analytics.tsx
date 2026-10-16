"use client";

/* Mesure d'audience (Google Tag Manager, ou GA4 en direct), seulement avec l'accord de la visiteuse (loi 09-08).
   - Avec un conteneur GTM (prop gtmId = site.gtmId) : GTM est chargé après « Accepter », et les événements du site sont poussés
     dans le dataLayer ({ event: "commande_envoyee", … }) : les balises GA4 se configurent dans GTM.
     Pas de <noscript> GTM : sans JavaScript, la visiteuse ne peut pas donner son accord.
   - Sans GTM mais avec un identifiant GA4 (NEXT_PUBLIC_GA_ID) : gtag.js en direct, comme avant.
   - Sans aucun des deux : ce composant n'affiche rien et ne charge rien.
   - Sans accord : aucun script Google n'est chargé, aucun cookie n'est déposé.
   - Le choix est gardé dans le navigateur ; on peut le changer à l'adresse /mentions-legales#cookies.
   Événements envoyés : clic_whatsapp, commande_envoyee, choix_offre, visite_ia (arrivée depuis un assistant IA).
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

function load(id: string) {
  window.dataLayer = window.dataLayer || [];
  if (id.startsWith("GTM-")) {
    if (document.getElementById("gtm-js")) return;
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const s = document.createElement("script");
    s.id = "gtm-js"; s.async = true; s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
    try { const ref = document.referrer && new URL(document.referrer).hostname; if (ref && AI.test(ref)) window.dataLayer.push({ event: "visite_ia", source_ia: ref }); } catch { /* adresse d'origine illisible */ }
    return;
  }
  if (window.gtag) return;
  window.gtag = function gtag() { window.dataLayer!.push(arguments); }; // eslint-disable-line prefer-rest-params
  window.gtag("js", new Date());
  window.gtag("config", id);
  const s = document.createElement("script");
  s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  try { const ref = document.referrer && new URL(document.referrer).hostname; if (ref && AI.test(ref)) window.gtag("event", "visite_ia", { source_ia: ref }); } catch { /* adresse d'origine illisible */ }
}

export default function Analytics({ gaId: ga, gtmId, locale }: { gaId: string; gtmId?: string; locale: "fr" | "ar" }) {
  const [ask, setAsk] = useState(false);
  // GTM en priorité (les balises GA4 y sont configurées) ; sinon GA4 en direct
  const gaId = gtmId || ga;

  useEffect(() => {
    if (!gaId) return;
    let choice: string | null = null;
    try { choice = localStorage.getItem(KEY); } catch { /* stockage indisponible : on redemandera */ }
    if (choice === "oui") load(gaId);
    const reopen = () => { if (location.hash === "#cookies") setAsk(true); };
    // la question s'affiche après le premier rendu (le choix est lu dans le navigateur, pas sur le serveur)
    const first = requestAnimationFrame(() => setAsk(choice === null || location.hash === "#cookies"));
    window.addEventListener("hashchange", reopen);

    // GTM : l'événement va dans le dataLayer ; GA4 en direct : gtag. Rien n'est envoyé tant que le script n'est pas chargé.
    const send = (name: string, params: Record<string, unknown>) => {
      if (gaId.startsWith("GTM-")) { if (document.getElementById("gtm-js")) window.dataLayer?.push({ event: name, ...params }); }
      else window.gtag?.("event", name, params);
    };
    const onClick = (e: MouseEvent) => { const a = (e.target as Element | null)?.closest?.('a[href*="wa.me"]'); if (a) send("clic_whatsapp", { page: location.pathname }); };
    const onOrder = (e: Event) => send("commande_envoyee", { currency: "MAD", ...(e as CustomEvent).detail });
    const onChoice = (e: Event) => send("choix_offre", (e as CustomEvent).detail);
    document.addEventListener("click", onClick);
    window.addEventListener("otage:order", onOrder);
    window.addEventListener("otage:choice", onChoice);
    return () => { cancelAnimationFrame(first); window.removeEventListener("hashchange", reopen); document.removeEventListener("click", onClick); window.removeEventListener("otage:order", onOrder); window.removeEventListener("otage:choice", onChoice); };
  }, [gaId]);

  if (!gaId || !ask) return null;
  const t = TEXT[locale];
  const answer = (yes: boolean) => {
    try { localStorage.setItem(KEY, yes ? "oui" : "non"); } catch { /* choix valable pour cette page seulement */ }
    if (yes) load(gaId);
    setAsk(false);
  };
  const btn = { minHeight: 44, padding: "0 18px", borderRadius: 999, font: "600 14px inherit", cursor: "pointer" } as const;
  return (
    <div role="dialog" aria-label={t.label} style={{ position: "fixed", insetInline: 12, bottom: 12, zIndex: 1000, maxWidth: 560, marginInline: "auto", padding: "14px 16px", borderRadius: 18, background: "#fffcf8", color: "#2b2223", boxShadow: "0 18px 50px -18px rgba(74,13,22,.55), inset 0 0 0 1px rgba(74,13,22,.12)", fontSize: 14, lineHeight: 1.5 }}>
      <p style={{ margin: 0 }}>{t.msg} <a href={locale === "ar" ? "/ar/mentions-legales" : "/mentions-legales"} style={{ color: "#4a0d16", fontWeight: 600 }}>{t.more}</a></p>
      <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "flex-end" }}>
        <button type="button" onClick={() => answer(false)} style={{ ...btn, border: "1.5px solid rgba(74,13,22,.3)", background: "transparent", color: "#4a0d16" }}>{t.no}</button>
        <button type="button" onClick={() => answer(true)} style={{ ...btn, border: 0, background: "#4a0d16", color: "#f7efe6" }}>{t.yes}</button>
      </div>
    </div>
  );
}
