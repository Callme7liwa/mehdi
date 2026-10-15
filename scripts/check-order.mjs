/* Teste la route /api/order de bout en bout, sans rien envoyer à l'extérieur.
   Usage : `npm run build`, puis `npm run check:order`.

   Le script lance le site construit sur le port 8791, branché sur un faux tableur et un faux Resend qu'il démarre
   lui-même (port 8792) : aucune commande ne part vers le vrai Google Sheet, aucun e-mail n'est envoyé.
   Cas testés : commande valide en français et en arabe, gamme Petit et Grand, soins à l'unité avec frais,
   prix falsifié par le navigateur, robot (champ piège), consentement CGV absent ou faux, trop de commandes, e-mail absent, Resend en panne,
   tableur en panne, champs invalides. */
import { spawn } from "node:child_process";
import http from "node:http";

const SITE = 8791, MOCK = 8792, base = `http://localhost:${SITE}`;
const state = { sheet: [], notes: [], emails: [], failResend: false, failSheet: false, calls: 0 };
const mock = http.createServer((req, res) => {
  let body = ""; req.on("data", (c) => (body += c)); req.on("end", () => {
    state.calls++;
    const send = (code, obj) => { res.writeHead(code, { "Content-Type": "application/json" }); res.end(JSON.stringify(obj)); };
    if (req.url === "/sheet") {
      if (state.failSheet) return send(500, {});
      const c = JSON.parse(body);
      if (c.action === "email") { state.notes.push(c); return send(200, { ok: true }); }
      state.sheet.push(c); return send(200, { ok: true, ticket: c.ticket });
    }
    if (req.url === "/emails") { if (state.failResend) return send(500, { name: "internal_server_error", message: "panne simulée" }); state.emails.push(JSON.parse(body)); return send(200, { id: "faux-" + state.emails.length }); }
    send(404, {});
  });
}).listen(MOCK);

const site = spawn("npx", ["next", "start", "-p", String(SITE)], {
  env: { ...process.env, ORDERS_ENDPOINT: `http://localhost:${MOCK}/sheet`, RESEND_BASE_URL: `http://localhost:${MOCK}`, RESEND_API_KEY: "re_test_local", SHOP_EMAIL: "boutique@example.com", EMAIL_FROM: "" },
  stdio: "ignore",
});
const stop = (code) => { site.kill(); mock.close(); process.exit(code); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
for (let i = 0; i < 60; i++) { if (await fetch(base + "/api/email-preview").then((r) => r.ok, () => false)) break; await sleep(500); if (i === 59) { console.error("Le site ne démarre pas : lancer d'abord « npm run build »."); stop(1); } }

let n = 0, failed = 0;
const check = (label, ok, detail = "") => { console.log(`${ok ? "✓" : "✗"} ${label}${ok || !detail ? "" : `\n   ${detail}`}`); if (!ok) failed++; };
/** Chaque commande de test a son téléphone et son adresse IP : les limites anti-spam ne se croisent pas. */
const person = (extra = {}) => { n++; return { nom: "Salma Test", tel: `06 00 00 ${String(n).padStart(2, "0")} 00`, ville: "Rabat", adresse: "12 rue des Tests", cgv: true, ...extra }; };
const post = async (body, ip = `10.0.0.${n}`) => { const r = await fetch(base + "/api/order", { method: "POST", headers: { "Content-Type": "application/json", "X-Forwarded-For": ip }, body: JSON.stringify(body) }); return { status: r.status, body: await r.json().catch(() => ({})) }; };
/** Les e-mails partent après la réponse : on attend qu'ils arrivent au faux Resend. */
const settle = async (emails, notes = state.notes.length) => { for (let i = 0; i < 40 && (state.emails.length < emails || state.notes.length < notes); i++) await sleep(100); await sleep(150); };
const mailTo = (to) => state.emails.filter((e) => [].concat(e.to).includes(to));

/* 1. Gamme Petit format, en français, avec e-mail */
{
  const r = await post({ locale: "fr", kind: "gamme", format: "petit", ...person({ email: "cliente1@example.com" }) });
  await settle(2, 1);
  const row = state.sheet.at(-1), mail = mailTo("cliente1@example.com")[0], shop = mailTo("boutique@example.com")[0];
  check("Gamme Petit, français : 200, numéro OTG-AAMM-1234, total 299 DH", r.status === 200 && /^OTG-\d{4}-\d{4}$/.test(r.body.numero) && r.body.total.min === 299 && r.body.total.max === 299 && r.body.fee === null, JSON.stringify(r.body));
  check("… enregistrée dans le tableur avec son numéro, en français", row?.ticket === r.body.numero && row.produit === "Gamme anti-taches" && row.format === "Petit format" && row.total === 299 && row.email === "cliente1@example.com", JSON.stringify(row));
  check("… e-mail à la cliente : expéditeur, réponse, objet, HTML et texte", mail && /OTAGE Cosm.tiques <commandes@otage\.ma>/.test(mail.from) && [].concat(mail.reply_to).includes("Dr.mouldwa@gmail.com") && mail.subject === `Commande OTAGE n° ${r.body.numero} confirmée ✓` && mail.html.includes("299") && mail.text.includes("TOTAL À PAYER À LA LIVRAISON : 299 DH"), JSON.stringify({ from: mail?.from, reply: mail?.reply_to, subject: mail?.subject }));
  check("… e-mail sous 100 Ko, sans script, sans pixel ni mot « tracking »", mail && Buffer.byteLength(mail.html) < 100 * 1024 && !/tracking|<script|width="1" height="1"/i.test(mail.html), mail ? `${Buffer.byteLength(mail.html)} octets` : "");
  check("… notification à la boutique : téléphone cliquable et lien WhatsApp prérempli", shop && shop.subject.includes(r.body.numero) && /href="tel:\+2126/.test(shop.html) && /wa\.me\/2126\d+\?text=/.test(shop.html), shop?.subject);
  check("… le tableur note « envoyé »", state.notes.at(-1)?.ticket === r.body.numero && state.notes.at(-1)?.statut === "envoyé", JSON.stringify(state.notes.at(-1)));
}
/* 2. Gamme Grand format, en arabe */
{
  const before = state.emails.length;
  const r = await post({ locale: "ar", kind: "gamme", format: "grand", ...person({ nom: "سلمى بناني", ville: "فاس", email: "cliente2@example.com" }) });
  await settle(before + 2);
  const mail = mailTo("cliente2@example.com")[0];
  check("Gamme Grand, arabe : 599 DH, économie 201 DH", r.status === 200 && r.body.total.min === 599 && r.body.saving === 201, JSON.stringify(r.body));
  check("… e-mail en arabe, de droite à gauche", mail && /dir="rtl"/.test(mail.html) && /lang="ar"/.test(mail.html) && mail.subject.includes("تم تأكيد طلبك") && mail.text.includes("599 درهم"), mail?.subject);
  check("… le tableur reste en français (libellés) et garde la langue", state.sheet.at(-1)?.format === "Grand format" && state.sheet.at(-1)?.langue === "ar");
}
/* 3. Soins à l'unité : frais de livraison ajoutés */
{
  const before = state.emails.length;
  const r = await post({ locale: "fr", kind: "unite", items: [{ key: "serum", format: "grand", qty: 2 }, { key: "gel", format: "petit", qty: 1 }], ...person({ email: "cliente3@example.com" }) });
  await settle(before + 2);
  const mail = mailTo("cliente3@example.com")[0];
  check("À l'unité : 2 sérums Grand + 1 gel Petit = 621 DH, livraison 35 à 45 DH, total de 656 à 666 DH", r.status === 200 && r.body.subtotal === 621 && r.body.fee?.min === 35 && r.body.fee?.max === 45 && r.body.total.min === 656 && r.body.total.max === 666, JSON.stringify(r.body));
  check("… l'e-mail annonce la fourchette et la confirmation par téléphone", mail && mail.text.includes("de 656 à 666 DH") && mail.text.includes("35 à 45 DH selon la ville") && mail.text.includes("confirmé par téléphone"));
}
/* 3 bis. Fiche produit : tous les soins dans le même ticket, offre 2 + 1 appliquée par le serveur (contour des yeux, déodorant) */
{
  const before = state.emails.length;
  const r = await post({ locale: "fr", kind: "unite", items: [{ key: "deo", format: "petit", qty: 3 }, { key: "serum", format: "grand", qty: 1 }, { key: "yeux", format: "petit", qty: 2 }], ...person() });
  await settle(before + 1);
  check("Ticket : 3 déodorants (1 offert) + 1 sérum Grand + 2 contours des yeux = 805 DH, économie 85 DH", r.status === 200 && r.body.subtotal === 805 && r.body.saving === 85 && r.body.fee?.min === 35, JSON.stringify(r.body));
  check("… le tableur note le pot offert", /offert \(2 \+ 1\)/.test(state.sheet.at(-1)?.offre ?? ""), state.sheet.at(-1)?.offre);
  const grandDeo = await post({ locale: "fr", kind: "unite", items: [{ key: "deo", format: "grand", qty: 1 }], ...person() });
  check("Format qui n'existe pas (déodorant Grand) : refusé (400)", grandDeo.status === 400 && grandDeo.body.fields?.includes("items"), JSON.stringify(grandDeo.body));
}
/* 4. Prix falsifié par le navigateur : recalculé par le serveur */
{
  const r = await post({ locale: "fr", kind: "gamme", format: "grand", bundle: true, total: 1, subtotal: 1, prix: 1, price: 1, fee: 0, items: [{ key: "serum", format: "grand", qty: 1, price: 1 }], ...person() });
  await settle(state.emails.length + 1);
  check("Prix falsifié (total: 1) : le serveur recalcule, 3 gammes Grand = 1198 DH", r.status === 200 && r.body.total.min === 1198 && state.sheet.at(-1)?.total === 1198, JSON.stringify(r.body));
  const bad = await post({ locale: "fr", kind: "unite", items: [{ key: "yeux", format: "petit", qty: 1 }, { key: "serum", format: "grand", qty: -3 }], ...person() });
  check("Produit ou quantité invalides : refusés (400)", bad.status === 400 && bad.body.fields?.includes("items"), JSON.stringify(bad.body));
}
/* 5. Anti-spam */
{
  const rows = state.sheet.length, mails = state.emails.length;
  const bot = await post({ locale: "fr", kind: "gamme", format: "petit", site: "http://spam.example", ...person({ email: "robot@example.com" }) });
  await sleep(600);
  check("Robot (champ piège rempli) : réponse normale, rien d'enregistré, aucun e-mail", bot.status === 200 && state.sheet.length === rows && state.emails.length === mails);
  const who = person(); const codes = [];
  for (let i = 0; i < 4; i++) codes.push((await post({ locale: "fr", kind: "yeux", ...who }, `10.1.0.${i}`)).status);
  check("Même téléphone : 3 commandes acceptées, la 4e refusée (429)", codes.join() === "200,200,200,429", codes.join());
  const ipCodes = [];
  for (let i = 0; i < 11; i++) ipCodes.push((await post({ locale: "fr", kind: "yeux", ...person() }, "10.9.9.9")).status);
  check("Même adresse IP : 10 commandes acceptées, la 11e refusée (429)", ipCodes.slice(0, 10).every((c) => c === 200) && ipCodes[10] === 429, ipCodes.join());
  const again = { id: "meme-envoi-1", locale: "fr", kind: "yeux", ...person() };
  const a = await post(again), b = await post(again);
  check("Même formulaire renvoyé deux fois : une seule commande, même numéro", a.body.numero && a.body.numero === b.body.numero && state.sheet.filter((x) => x.ticket === a.body.numero).length === 1);
  await settle(state.emails.length);
}
/* 6. Sans e-mail */
{
  await sleep(500);
  const mails = state.emails.length, notes = state.notes.length;
  const r = await post({ locale: "fr", kind: "gamme", format: "petit", ...person() });
  await settle(mails + 1); await sleep(400);
  check("Sans e-mail : commande acceptée, seule la boutique est prévenue", r.status === 200 && state.emails.length === mails + 1 && [].concat(state.emails.at(-1).to).includes("boutique@example.com") && state.notes.length === notes && state.sheet.at(-1)?.email === "");
}
/* 7. Resend en panne */
{
  state.failResend = true;
  const rows = state.sheet.length, notes = state.notes.length;
  const r = await post({ locale: "fr", kind: "gamme", format: "grand", ...person({ email: "cliente7@example.com" }) });
  await settle(state.emails.length, notes + 1);
  check("Resend en panne : la commande passe quand même et reste dans le tableur", r.status === 200 && /^OTG-/.test(r.body.numero) && state.sheet.length === rows + 1, JSON.stringify(r.body));
  check("… et l'échec de l'e-mail est noté dans le tableur", state.notes.at(-1)?.ticket === r.body.numero && /^échec/.test(state.notes.at(-1)?.statut ?? ""), JSON.stringify(state.notes.at(-1)));
  state.failResend = false;
}
/* 7 bis. Consentement : la case « J'ai lu et j'accepte les CGV et la politique de retour » est vérifiée par le serveur */
{
  const rows = state.sheet.length;
  const none = await post({ locale: "fr", kind: "gamme", format: "petit", ...person({ cgv: undefined }) });
  check("Sans la case CGV cochée : refusée (400, champ « cgv »), rien d'enregistré", none.status === 400 && none.body.fields?.includes("cgv") && state.sheet.length === rows, JSON.stringify(none.body));
  const fake = await post({ locale: "ar", kind: "unite", items: [{ key: "deo", format: "petit", qty: 1 }], ...person({ cgv: "on" }) });
  check("… une valeur autre que true (« on ») : refusée aussi", fake.status === 400 && fake.body.fields?.includes("cgv"), JSON.stringify(fake.body));
  const no = await post({ locale: "fr", kind: "yeux", ...person({ cgv: false }) });
  check("… case décochée (false) : refusée", no.status === 400 && no.body.fields?.includes("cgv") && state.sheet.length === rows, JSON.stringify(no.body));
}
/* 8. Champs invalides, tableur en panne */
{
  const r = await post({ locale: "fr", kind: "gamme", format: "petit", nom: "A", tel: "0512345678", ville: "", email: "pas-une-adresse", cgv: true });
  check("Téléphone fixe (05), nom, ville et e-mail invalides : 400 avec la liste des champs", r.status === 400 && ["nom", "tel", "ville", "email"].every((f) => r.body.fields?.includes(f)), JSON.stringify(r.body));
  const ok = await post({ locale: "fr", kind: "yeux", ...person({ tel: "+212 7 11 22 33 44" }) });
  check("Téléphone au format +212 7… : accepté", ok.status === 200, JSON.stringify(ok.body));
  state.failSheet = true;
  const down = await post({ locale: "fr", kind: "yeux", ...person() });
  check("Tableur en panne : 502, la commande n'est pas confirmée à tort", down.status === 502 && down.body.ok === false, JSON.stringify(down.body));
  state.failSheet = false;
}
/* 9. Rien n'est sorti de la machine */
{
  const page = await fetch(base + "/soins/serum-anti-taches").then((r) => r.text());
  const home = await fetch(base + "/").then((r) => r.text());
  check("L'adresse du script Google n'apparaît plus dans les pages", !/script\.google\.com/.test(page) && !/script\.google\.com/.test(home));
}
console.log(failed ? `\n${failed} test(s) en échec.` : `\nRoute /api/order : tous les tests passent (${state.sheet.length} commandes de test dans le faux tableur, ${state.emails.length} e-mails reçus par le faux Resend, rien n'est sorti de la machine).`);
stop(failed ? 1 : 0);
