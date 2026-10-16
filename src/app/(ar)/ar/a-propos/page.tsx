import Link from "next/link";
import Img from "@/components/Img";
import { site, waLink } from "@/data/site";
import { founderLd } from "@/lib/seo";
import TextPage, { textMetadata } from "@/templates/TextPage";

/* Page « À propos » en arabe. Même contenu que la page française. À RELIRE PAR UN NATIF. */
const F = site.founder;
const info = {
  path: "/a-propos",
  label: "من نحن",
  title: "من نحن: OTAGE، عناية أسسها صيدلي",
  description: `OTAGE علامة مغربية للعناية أسسها ${F.nameAr}، صيدلي: أسعار واضحة، بدون وعود خارقة، منتجات مصنوعة في المغرب، والدفع عند الاستلام في كل المغرب.`,
  h1: "OTAGE: عناية صادقة، مصنوعة في المغرب",
  schemaType: "AboutPage",
};
export const metadata = textMetadata(info, "ar");

export default function Page() {
  return (
    <TextPage locale="ar" info={info} extraLd={[founderLd("ar")]} lead="OTAGE علامة مغربية للعناية، أسسها صيدلي. نقول لك ما تفعله كل عناية، بدون وعود خارقة.">
      <h2>المؤسس</h2>
      <Img className="founder" src={F.photo} alt={F.alt.ar} width={900} height={1125} sizes="(max-width: 700px) 70vw, 320px" />
      <p><b>{F.nameAr}</b> {F.jobTitle.ar}، {F.specialty.ar}. هو مؤسس OTAGE.</p>
      <blockquote className="quote">
        <p>«{F.story.ar}»</p>
        <footer>{F.nameAr}، مؤسس OTAGE</footer>
      </blockquote>

      <h2>ماذا نقدم</h2>
      <p>روتين ضد البقع من 4 منتجات، سيروم لمحيط العين ومزيل عرق كريم. <Link href="/ar/soins">شاهدي المنتجات الستة ومكوناتها</Link>.</p>

      <h2>الصدق، عمليًا</h2>
      <ul>
        <li><b>أسعار واضحة:</b> تذكرة الطلب تُكتب أمام عينيك.</li>
        <li><b>بدون وعود خارقة:</b> البقع تخف شيئًا فشيئًا.</li>
        <li><b>الدفع عند الاستلام:</b> لا شيء يُدفع مسبقًا عبر الإنترنت.</li>
        <li><b>التوصيل {site.delivery.label.ar}</b>، مجاني مع المجموعة الكاملة.</li>
      </ul>

      <h2>صنع في المغرب، مع مختبر شريك</h2>
      <p>تُصنع في المغرب مع مختبر شريك، بمكونات مثل اللبان.</p>
      {/* شعار العلامة بالدارجة يبقى توقيعها */}
      <p>« ما كنبيعوش الوهم، كنبيعو النتيجة »</p>

      <h2>سؤال؟ نجيبك</h2>
      <p>سؤال عن بشرتك، عن منتج أو عن طلبك؟ راسلينا مباشرة، {site.availability.ar}: <a href={waLink()} target="_blank" rel="noopener">واتساب <span dir="ltr">{site.whatsapp.display}</span></a>، <a href={`mailto:${site.email}`} dir="ltr">{site.email}</a> أو <a href={site.instagram.url} target="_blank" rel="noopener">إنستغرام <span dir="ltr">{site.instagram.handle}</span></a>.</p>
    </TextPage>
  );
}
