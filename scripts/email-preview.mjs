/* Aperçu local des e-mails, sans rien envoyer.
   Usage : lancer le site (npm run dev), puis `npm run email:preview`.
   Ouvre la liste des aperçus dans le navigateur et vérifie le poids de chaque e-mail (Gmail coupe au-delà de 102 Ko). */
import { exec } from "node:child_process";

const BASE = process.env.BASE || "http://localhost:3000";
const LIMIT = 100 * 1024;
const index = `${BASE}/api/email-preview`;
const html = await fetch(index).then((r) => (r.ok ? r.text() : ""), () => "");
if (!html) { console.error(`Le site ne répond pas sur ${BASE}. Lancer « npm run dev » (ou BASE=http://localhost:3000 …).`); process.exit(1); }

let heavy = 0;
for (const [, query] of html.matchAll(/href="(\?mail=[^"]+)"/g)) {
  if (query.includes("format=texte")) continue;
  const r = await fetch(index + query.replace(/&amp;/g, "&"));
  const body = await r.text(), bytes = Buffer.byteLength(body);
  const forbidden = /tracking|width="1" height="1"|<script/i.test(body);
  if (bytes > LIMIT || forbidden) heavy++;
  console.log(`${bytes > LIMIT || forbidden ? "✗" : "✓"} ${(bytes / 1024).toFixed(1).padStart(5)} Ko  ${decodeURIComponent(r.headers.get("x-email-subject") || "").padEnd(52)} ${index}${query.replace(/&amp;/g, "&")}${forbidden ? "  ← script, pixel ou mot « tracking »" : ""}`);
}
console.log(heavy ? `\n${heavy} e-mail(s) à corriger (plus de 100 Ko, ou contenu interdit).` : "\nTous les e-mails pèsent moins de 100 Ko, sans script ni pixel de suivi.");
if (!process.env.CI && !process.argv.includes("--no-open")) exec(`${process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open"} ${index}`);
process.exit(heavy ? 1 : 0);
