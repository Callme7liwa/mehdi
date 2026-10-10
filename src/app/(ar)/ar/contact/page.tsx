import { WaIcon } from "@/components/icons";
import { site, waLink } from "@/data/site";
import TextPage, { textMetadata } from "@/templates/TextPage";

/* Page « Contact » en arabe. Même contenu que la page française. À RELIRE PAR UN NATIF. */
const info = {
  path: "/contact",
  label: "اتصلي بنا",
  title: "اتصلي بـ OTAGE: واتساب وإنستغرام",
  description: "سؤال عن بشرتك، عن منتج أو عن طلبك؟ راسلي OTAGE على واتساب أو إنستغرام. المؤسسون يجيبون بأنفسهم.",
  h1: "اتصلي بنا",
  schemaType: "ContactPage",
};
export const metadata = textMetadata(info, "ar");

export default function Page() {
  return (
    <TextPage locale="ar" info={info} lead="سؤال عن بشرتك، عن منتج أو عن طلبك؟ راسلينا مباشرة، ونجيبك بأنفسنا.">
      <h2>واتساب</h2>
      <p>الأسرع: <b dir="ltr">{site.whatsapp.display}</b> (<span dir="ltr">{site.whatsapp.e164}</span>).</p>
      <p><a className="btn btn-wa" href={waLink("مرحبًا OTAGE، لدي سؤال.")} target="_blank" rel="noopener">راسلينا على واتساب<WaIcon /></a></p>

      <h2>إنستغرام</h2>
      <p><a href={site.instagram.url} target="_blank" rel="noopener"><span dir="ltr">{site.instagram.handle}</span></a>: جديدنا، والرسائل الخاصة لمراسلتنا.</p>

      <h2>الطلب</h2>
      <p>يمكنك الطلب <a href="/ar#offres">من الموقع</a> أو مباشرة عبر واتساب. توصيل مجاني في كل أنحاء المغرب خلال {site.delivery.label.ar}، والدفع عند الاستلام.</p>
    </TextPage>
  );
}
