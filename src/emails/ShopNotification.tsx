/* Notification interne : un e-mail simple et lisible pour la boutique, à chaque commande.
   Téléphone cliquable, et un lien WhatsApp vers la cliente avec un message de confirmation prérempli. */
import { Body, Column, Container, Head, Html, Link, Preview, Row, Section, Text } from "@react-email/components";
import type { CSSProperties } from "react";
import { phoneE164 } from "@/lib/order/compute";
import { amount, firstName, orderDate, type OrderEmail } from "./OrderConfirmation";
import { C, FONT } from "./theme";

export type ShopEmail = OrderEmail & { email?: string; page?: string };

/** Message WhatsApp que la boutique envoie à la cliente pour confirmer, dans la langue de sa commande. */
export const confirmMessage = (o: ShopEmail) =>
  o.locale === "ar"
    ? `مرحبًا ${firstName(o.nom)}، معك OTAGE. توصلنا بطلبك رقم ${o.numero} (${amount(o.priced.total, "ar")}، الدفع عند الاستلام). هل تؤكدين الطلب وعنوان التوصيل؟`
    : `Bonjour ${firstName(o.nom)}, ici OTAGE. On a bien reçu ta commande ${o.numero} (${amount(o.priced.total, "fr")}, paiement à la livraison). Tu confirmes la commande et l'adresse de livraison ?`;

export const shopSubject = (o: ShopEmail) => `Nouvelle commande ${o.numero} : ${o.nom}, ${amount(o.priced.total, "fr")}`;

export default function ShopNotification(o: ShopEmail) {
  const tel = phoneE164(o.tel), p = o.priced;
  const cell: CSSProperties = { fontFamily: FONT.sans, fontSize: 15, lineHeight: "22px", color: C.ink, padding: "6px 0", verticalAlign: "top" };
  const label: CSSProperties = { ...cell, width: 130, color: C.soft, fontSize: 13 };
  const row = (k: string, v: React.ReactNode) => <Row key={k}><Column style={label}>{k}</Column><Column style={{ ...cell, fontWeight: 600 }}>{v}</Column></Row>;
  return (
    <Html lang="fr">
      <Head />
      <Preview>{`${o.nom}, ${o.ville} : ${amount(p.total, "fr")}`}</Preview>
      <Body style={{ margin: 0, padding: "20px 0", backgroundColor: C.cream, fontFamily: FONT.sans }}>
        <Container style={{ width: "100%", maxWidth: 600, margin: "0 auto", backgroundColor: "#ffffff", borderRadius: 14 }}>
          <Section><Row><Column style={{ padding: "22px 26px" }}>
            <Text style={{ margin: 0, fontFamily: FONT.sans, fontSize: 13, lineHeight: "18px", color: C.soft }}>Nouvelle commande sur otage.ma{o.locale === "ar" ? " (page en arabe)" : ""}</Text>
            <Text style={{ margin: "4px 0 14px", fontFamily: FONT.sans, fontSize: 24, lineHeight: "30px", fontWeight: 600, color: C.bordeaux }}>{o.numero}</Text>
            <Section>
              {row("Cliente", o.nom)}
              {row("Téléphone", <Link href={`tel:${tel}`} style={{ color: C.bordeaux }}>{o.tel}</Link>)}
              {row("Ville", o.ville)}
              {row("Adresse", o.adresse || "À demander au téléphone")}
              {row("E-mail", o.email ? <Link href={`mailto:${o.email}`} style={{ color: C.bordeaux }}>{o.email}</Link> : "Non renseigné")}
              {row("Date", orderDate(o.date, "fr"))}
            </Section>
            <Text style={{ margin: "16px 0 6px", fontFamily: FONT.sans, fontSize: 13, color: C.soft }}>Produits</Text>
            {p.lines.map((l, i) => (
              <Text key={i} style={{ margin: "0 0 4px", fontFamily: FONT.sans, fontSize: 15, lineHeight: "22px", color: C.ink }}>
                <b>{l.qty} × {l.name.fr}</b>, {l.detail.fr} : {l.offered ? "offert" : `${l.total} DH`}
              </Text>
            ))}
            <Section style={{ marginTop: 10 }}>
              {row("Sous-total", `${p.subtotal} DH`)}
              {row("Livraison", p.fee ? `${p.fee.min} à ${p.fee.max} DH selon la ville (à confirmer à la cliente)` : "Offerte")}
              {row("Total à encaisser", <span style={{ fontSize: 20, color: C.red }}>{amount(p.total, "fr")}</span>)}
            </Section>
            <Section style={{ marginTop: 18 }}><Row><Column>
              <Link href={`https://wa.me/${tel.slice(1)}?text=${encodeURIComponent(confirmMessage(o))}`} style={{ display: "inline-block", backgroundColor: C.green, color: "#ffffff", fontFamily: FONT.sans, fontSize: 15, fontWeight: 600, lineHeight: "20px", textDecoration: "none", padding: "12px 22px", borderRadius: 999 }}>Confirmer sur WhatsApp</Link>
            </Column></Row></Section>
            <Text style={{ margin: "14px 0 0", fontFamily: FONT.sans, fontSize: 12, lineHeight: "18px", color: C.soft }}>Le message est prérempli{o.locale === "ar" ? ", en arabe" : ""}. La commande est aussi dans le tableur, au statut « À confirmer ».{o.page ? ` Page : ${o.page}` : ""}</Text>
          </Column></Row></Section>
        </Container>
      </Body>
    </Html>
  );
}
