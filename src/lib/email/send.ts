/* Envoi des e-mails par Resend. La clé (RESEND_API_KEY) et l'expéditeur facultatif (EMAIL_FROM) sont des variables
   d'environnement : rien n'est écrit dans le code. Un envoi ne lève jamais d'erreur : il renvoie ce qui s'est passé,
   pour que la commande ne dépende jamais de l'e-mail. Aucun suivi des ouvertures ni des clics. */
import { Resend } from "resend";
import { site } from "@/data/site";

/** Expéditeur : « OTAGE Cosmétiques <commandes@otage.ma> », sur le domaine vérifié chez Resend. */
export const FROM = () => process.env.EMAIL_FROM || `${site.brand.fr} <commandes@${new URL(site.url).hostname}>`;

export type Sent = { ok: true; id: string } | { ok: false; error: string };

export async function sendEmail(mail: { to: string; subject: string; html: string; text: string; replyTo?: string }): Promise<Sent> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "RESEND_API_KEY absente" };
  try {
    const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error("délai dépassé")), 10000));
    const { data, error } = await Promise.race([
      new Resend(key).emails.send({ from: FROM(), to: mail.to, subject: mail.subject, html: mail.html, text: mail.text, replyTo: mail.replyTo ?? site.email }),
      timeout,
    ]);
    if (error || !data) return { ok: false, error: error ? `${error.name} : ${error.message}` : "réponse vide" };
    return { ok: true, id: data.id };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
