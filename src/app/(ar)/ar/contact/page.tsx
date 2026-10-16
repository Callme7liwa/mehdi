import Link from "next/link";
import { WaIcon } from "@/components/icons";
import { site, waLink } from "@/data/site";
import TextPage, { textMetadata } from "@/templates/TextPage";

/* Page « Contact » en arabe. Même contenu que la page française. À RELIRE PAR UN NATIF. */
const info = {
  path: "/contact",
  label: "اتصلي بنا",
  title: "اتصلي بـ OTAGE: واتساب، بريد إلكتروني وإنستغرام",
  description: `سؤال عن بشرتك، عن منتج أو عن طلبك؟ راسلي OTAGE على واتساب، بالبريد الإلكتروني أو على إنستغرام ${site.instagram.handle}. نجيبك ${site.availability.ar}، طيلة الأسبوع.`,
  h1: "اتصلي بـ OTAGE",
  schemaType: "ContactPage",
};
export const metadata = textMetadata(info, "ar");

export default function Page() {
  return (
    <TextPage locale="ar" info={info} lead="سؤال عن بشرتك، عن منتج أو عن طلبك؟ راسلينا مباشرة، ونجيبك بأنفسنا.">
      <h2>واتساب</h2>
      <p>الأسرع: <b dir="ltr">{site.whatsapp.display}</b> (<span dir="ltr">{site.whatsapp.e164}</span>).</p>
      <p><a className="btn btn-wa" href={waLink("مرحبًا OTAGE، لدي سؤال.")} target="_blank" rel="noopener">راسلينا على واتساب<WaIcon /></a></p>

      <h2>البريد الإلكتروني</h2>
      <p><a href={`mailto:${site.email}`} dir="ltr">{site.email}</a></p>

      <h2>أوقات الرد</h2>
      <p>نجيبك {site.availability.ar}، طيلة أيام الأسبوع.</p>

      <h2>إنستغرام</h2>
      <p><a href={site.instagram.url} target="_blank" rel="noopener"><span dir="ltr">{site.instagram.handle}</span></a>: جديدنا، والرسائل الخاصة لمراسلتنا.</p>

      <h2>خرائط Google</h2>
      <p><a href={site.googleMaps} target="_blank" rel="noopener"><span dir="ltr">OTAGE.MA</span> على خرائط Google</a>: صفحتنا على Google، للعثور علينا وترك رأيك.</p>

      <h2>الطلب</h2>
      <p>اطلبي <Link href="/ar#offres">من الموقع</Link> أو عبر واتساب. التوصيل {site.delivery.label.ar}، والدفع عند الاستلام.</p>
    </TextPage>
  );
}
