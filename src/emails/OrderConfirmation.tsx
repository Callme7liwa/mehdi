/* E-mail de confirmation de commande envoyé à la cliente, en français ou en arabe (droite à gauche).
   Mise en page en tableaux et styles en ligne (messageries), largeur maximale 600 px.
   Rien d'important n'est montré seulement en image : le numéro et le total sont du texte. Aucun pixel de suivi. */
import { Body, Column, Container, Head, Html, Img, Link, Preview, Row, Section, Text } from "@react-email/components";
import type { CSSProperties, ReactNode } from "react";
import { site, type Locale } from "@/data/site";
import type { PricedOrder } from "@/lib/order/compute";
import { emailText, fill } from "./text";
import { C, FONT, headCss } from "./theme";

export type OrderEmail = {
  locale: Locale;
  numero: string;
  date: Date;
  nom: string;
  tel: string;
  ville: string;
  adresse?: string;
  priced: PricedOrder;
  /** Adresse du site pour les images et les liens (https://otage.ma ; l'aperçu local met la sienne). */
  base?: string;
};

export const firstName = (nom: string) => nom.trim().split(/\s+/)[0];
/** « 299 DH », ou « de 656 à 666 DH » quand les frais dépendent de la ville. */
export const amount = (t: { min: number; max: number }, locale: Locale) => {
  const x = emailText[locale];
  return t.min === t.max ? `${t.min} ${x.dh}` : fill(x.totalRange, { min: t.min, max: t.max });
};
export const orderDate = (d: Date, locale: Locale) => new Intl.DateTimeFormat(locale === "ar" ? "ar-MA" : "fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Casablanca", numberingSystem: "latn" }).format(d);

/** Fragment écrit de gauche à droite dans une phrase arabe : numéro de commande, téléphone, e-mail. */
const Ltr = ({ children }: { children: ReactNode }) => <span dir="ltr" style={{ unicodeBidi: "isolate", whiteSpace: "nowrap" }}>{children}</span>;
const Rule = () => <Section><Row><Column className="rule" style={{ borderTop: `1px solid ${C.line}`, fontSize: 0, lineHeight: 0, height: 1 }}>&nbsp;</Column></Row></Section>;
/* Les marges intérieures se posent sur une cellule (<td>) : les messageries les ignorent sur un tableau. */
const Block = ({ children, top = 28 }: { children: ReactNode; top?: number }) => <Section><Row><Column className="pad" style={{ padding: `${top}px 32px 0` }}>{children}</Column></Row></Section>;
/** Encadré crème (commande, droits). */
const Panel = ({ children }: { children: ReactNode }) => <Section><Row><Column className="panel" style={{ backgroundColor: C.cream, borderRadius: 14, padding: "16px 18px" }}>{children}</Column></Row></Section>;

export default function OrderConfirmation({ locale, numero, date, nom, tel, ville, adresse, priced, base = site.url }: OrderEmail) {
  const t = emailText[locale], rtl = locale === "ar";
  const dir = rtl ? "rtl" : "ltr", start = rtl ? "right" : "left", end = rtl ? "left" : "right";
  const font = rtl ? FONT.arabic : FONT.sans;
  const path = (p: string) => `${site.url}${rtl ? "/ar" : ""}${p}`;
  const total = amount(priced.total, locale);
  const p: CSSProperties = { margin: 0, fontFamily: font, fontSize: 15, lineHeight: "23px", color: C.ink, textAlign: start };
  const small: CSSProperties = { ...p, fontSize: 13, lineHeight: "20px", color: C.soft };
  const h2: CSSProperties = { ...p, fontSize: 18, lineHeight: "26px", fontWeight: 600, color: C.bordeaux, margin: "0 0 12px" };
  const num: CSSProperties = { fontFamily: FONT.serif, fontWeight: 600 };
  const kv = (label: string, value: ReactNode) => (
    <Row key={label}>
      <Column className="soft" style={{ ...small, width: "38%", padding: "4px 0", verticalAlign: "top" }}>{label}</Column>
      <Column className="ink" style={{ ...p, padding: "4px 0", verticalAlign: "top", fontWeight: 600 }}>{value}</Column>
    </Row>
  );
  const offered = (l: PricedOrder["lines"][number]) => (l.product && rtl ? t.offeredM : l.product ? t.offeredM : t.offered);

  return (
    <Html lang={rtl ? "ar" : "fr"} dir={dir}>
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <style dangerouslySetInnerHTML={{ __html: headCss(site.url) }} />
      </Head>
      <Preview>{fill(t.preheader, { total, delay: site.delivery.label[locale] })}</Preview>
      <Body className="page" dir={dir} style={{ margin: 0, padding: "24px 0", backgroundColor: C.cream, fontFamily: font }}>
        <Container className="card" style={{ width: "100%", maxWidth: 600, margin: "0 auto", backgroundColor: C.paper, borderRadius: 20, overflow: "hidden" }}>

          {/* a. En-tête : logo sur son bandeau crème (lisible en clair comme en sombre), puis le message */}
          <Section><Row><Column align="center" style={{ backgroundColor: C.cream, padding: "24px 32px 22px", textAlign: "center" }}>
            <Link href={path("/")}><Img src={`${base}/images/email/logo.png`} width={129} height={60} alt={t.logoAlt} style={{ display: "inline-block", margin: "0 auto" }} /></Link>
          </Column></Row></Section>
          <Block top={30}>
            <Text className="ink h1" style={{ ...p, fontSize: 28, lineHeight: "36px", fontWeight: rtl ? 600 : 500, letterSpacing: rtl ? 0 : "-0.02em", color: C.bordeaux }}>{fill(t.hello, { name: firstName(nom) })}</Text>
            <Text className="soft" style={{ ...p, color: C.soft, marginTop: 10 }}>{t.intro}</Text>
          </Block>

          {/* b. La commande : numéro, date, paiement */}
          <Block top={22}>
            <Panel>
              <Section>
                {kv(t.orderNo, <Ltr><span className="accent" style={{ ...num, fontSize: 18, color: C.red }}>{numero}</span></Ltr>)}
                {kv(t.date, orderDate(date, locale))}
                {kv(t.status, t.statusValue)}
              </Section>
            </Panel>
          </Block>

          {/* c. Récapitulatif */}
          <Block>
            <Text className="ink" style={h2}>{t.recap}</Text>
            {priced.lines.map((l, i) => (
              <Section key={i} style={{ padding: "10px 0" }}>
                <Row>
                  <Column style={{ width: 76, verticalAlign: "top" }}>
                    <Img src={`${base}/images/email/${l.product ? l.product.key : "gamme"}.jpg`} width={64} height={64} alt={l.name[locale]} style={{ display: "block", borderRadius: 12 }} />
                  </Column>
                  <Column style={{ verticalAlign: "top" }}>
                    <Text className="ink" style={{ ...p, fontWeight: 600 }}>{l.name[locale]}</Text>
                    <Text className="soft" style={small}>{l.detail[locale]}{t.comma}{t.qty.toLowerCase()}{t.colon}{l.qty}</Text>
                    {l.contents.length > 0 && <Text className="soft" style={small}>{t.contains}{t.colon}{l.contents.map((c) => `${c.product.name[locale]} ${c.ml} ${rtl ? "مل" : "ml"}`).join(t.comma)}</Text>}
                  </Column>
                  <Column style={{ width: 96, verticalAlign: "top", textAlign: end }}>
                    <Text className="ink" style={{ ...p, textAlign: end, fontWeight: 600, whiteSpace: "nowrap" }}>{l.offered ? <span className="accent" style={{ color: C.red }}>{offered(l)}</span> : <><span style={num}>{l.total}</span> {t.dh}</>}</Text>
                  </Column>
                </Row>
              </Section>
            ))}
            <Rule />
            <Section style={{ padding: "10px 0 0" }}>
              {[
                [t.subtotal, <><span style={num}>{priced.subtotal}</span> {t.dh}</>] as const,
                [t.delivery, priced.fee ? fill(t.deliveryFee, priced.fee) : <span className="accent" style={{ color: C.red, fontWeight: 600 }}>{t.deliveryFree}</span>] as const,
                ...(priced.saving > 0 ? [[t.saving, <><span style={num}>{priced.saving}</span> {t.dh}</>] as const] : []),
              ].map(([label, value]) => (
                <Row key={label}>
                  <Column className="soft" style={{ ...small, fontSize: 14, padding: "3px 0" }}>{label}</Column>
                  <Column className="ink" style={{ ...p, fontSize: 14, padding: "3px 0", textAlign: end }}>{value}</Column>
                </Row>
              ))}
            </Section>
            {/* le total : en texte, sur fond bordeaux dans les deux modes */}
            <Section style={{ marginTop: 14 }}>
              <Row>
                <Column className="stack total-label" style={{ ...p, backgroundColor: C.bordeaux, borderRadius: rtl ? "0 14px 14px 0" : "14px 0 0 14px", padding: "16px 18px", color: C.cream, fontSize: 13, lineHeight: "18px", fontWeight: 600, letterSpacing: rtl ? 0 : "0.06em", textTransform: rtl ? "none" : "uppercase", verticalAlign: "middle" }}>{t.total}</Column>
                <Column className="stack total-amount" style={{ ...p, ...num, backgroundColor: C.bordeaux, borderRadius: rtl ? "14px 0 0 14px" : "0 14px 14px 0", padding: "16px 18px", color: C.cream, fontSize: priced.fee ? 24 : 32, lineHeight: "38px", textAlign: end, verticalAlign: "middle", whiteSpace: "nowrap", fontFamily: priced.fee && rtl ? font : FONT.serif }}>{total}</Column>
              </Row>
            </Section>
            {priced.fee && <Text className="soft" style={{ ...small, marginTop: 8 }}>{t.feeNote}</Text>}
          </Block>

          {/* d. Livraison */}
          <Block>
            <Text className="ink" style={h2}>{t.shipTitle}</Text>
            <Section>
              {kv(t.shipTo, adresse || <span className="soft" style={{ fontWeight: 400, color: C.soft }}>{t.addressLater}</span>)}
              {kv(t.shipCity, ville)}
              {kv(t.shipPhone, <Ltr>{tel}</Ltr>)}
              {kv(t.shipDelay, fill(t.shipDelayValue, { delay: site.delivery.label[locale] }))}
            </Section>
            <Text className="ink" style={{ ...p, marginTop: 10 }}>{t.shipNote}</Text>
          </Block>

          {/* e. Routine : l'ordre d'utilisation des soins commandés, avec un lien vers chaque fiche */}
          <Block>
            <Text className="ink" style={h2}>{t.routineTitle}</Text>
            {priced.products.length > 1 && <Text className="soft" style={{ ...small, marginBottom: 6 }}>{t.routineOrder}</Text>}
            {priced.products.map((x, i) => (
              <Text key={x.key} className="ink" style={{ ...p, margin: "0 0 6px" }}>
                {priced.products.length > 1 && <b className="accent" style={{ ...num, color: C.red }}>{i + 1}. </b>}
                <Link className="lnk" href={path(`/soins/${x.slug}`)} style={{ color: C.bordeaux, fontWeight: 600 }}>{x.name[locale]}</Link>{t.colon}{x.when[locale].toLowerCase()}.
              </Text>
            ))}
            {priced.products.some((x) => x.key === "ecran") && priced.products.length > 1 && <Text className="soft" style={small}>{t.routineEvening} {t.routineSun}</Text>}
            <Text className="soft" style={{ ...small, marginTop: 4 }}>{t.routineTest}</Text>
          </Block>

          {/* f. WhatsApp, avec le numéro de commande dans le message */}
          <Block top={28}>
            <Section><Row><Column align="center" style={{ textAlign: "center" }}>
              <Link href={`https://wa.me/${site.whatsapp.wa}?text=${encodeURIComponent(fill(t.waMessage, { n: numero }))}`} style={{ display: "inline-block", backgroundColor: C.green, color: "#ffffff", fontFamily: font, fontSize: 16, fontWeight: 600, lineHeight: "20px", textDecoration: "none", padding: "14px 28px", borderRadius: 999 }}>{t.question}</Link>
            </Column></Row></Section>
          </Block>

          {/* g. Vos droits */}
          <Block>
            <Panel>
              <Text className="ink" style={{ ...h2, fontSize: 16, margin: "0 0 8px" }}>{t.rightsTitle}</Text>
              {t.rights.map((r) => <Text key={r} className="ink" style={{ ...p, fontSize: 14, lineHeight: "21px", margin: "0 0 4px" }}>• {r}</Text>)}
              <Text style={{ ...p, fontSize: 14, marginTop: 8 }}><Link className="lnk" href={path("/cgv")} style={{ color: C.bordeaux, fontWeight: 600 }}>{t.cgv}</Link></Text>
            </Panel>
          </Block>

          {/* h. Signature */}
          <Block>
            <Row>
              <Column style={{ width: 68, verticalAlign: "middle" }}>
                <Img src={`${base}/images/email/fondateur.jpg`} width={56} height={56} alt={site.founder.alt[locale]} style={{ display: "block", borderRadius: 28 }} />
              </Column>
              <Column style={{ verticalAlign: "middle" }}>
                <Text className="ink" style={{ ...p, fontWeight: 600 }}>{rtl ? site.founder.nameAr : site.founder.name}</Text>
                <Text className="soft" style={small}>{t.signRole}</Text>
              </Column>
            </Row>
          </Block>

          {/* i. Pied de page */}
          <Section><Row><Column className="pad" style={{ padding: "28px 32px 30px" }}>
            <Rule />
            <Text className="foot" style={{ ...small, textAlign: "center", marginTop: 16, fontWeight: 600, color: C.bordeaux }}>{site.brand[locale]}</Text>
            <Text className="foot" style={{ ...small, textAlign: "center", marginTop: 6 }}>
              {t.footContact}{t.colon}<Link href={`https://wa.me/${site.whatsapp.wa}`} style={{ color: C.soft }}><Ltr>{site.whatsapp.display}</Ltr></Link> · <Link href={`mailto:${site.email}`} style={{ color: C.soft }}><Ltr>{site.email}</Ltr></Link>
            </Text>
            <Text className="foot" style={{ ...small, textAlign: "center", marginTop: 4 }}>
              <Link href={site.instagram.url} style={{ color: C.soft }}>Instagram <Ltr>{site.instagram.handle}</Ltr></Link> · <Link href={path("/mentions-legales")} style={{ color: C.soft }}>{t.footLegal}</Link> · <Link href={path("/")} style={{ color: C.soft }}><Ltr>otage.ma</Ltr></Link>
            </Text>
            <Text className="foot" style={{ ...small, fontSize: 12, textAlign: "center", marginTop: 10 }}>{t.footWhy}</Text>
          </Column></Row></Section>
        </Container>
      </Body>
    </Html>
  );
}
