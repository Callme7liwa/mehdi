import Link from "next/link";
import Img from "@/components/Img";
import { ingredientList, products } from "@/data/products";
import { site, waLink } from "@/data/site";
import { founderLd } from "@/lib/seo";
import TextPage, { textMetadata } from "@/templates/TextPage";

/* Page « À propos » en arabe. Même contenu que la page française. À RELIRE PAR UN NATIF. */
const F = site.founder;
const info = {
  path: "/a-propos",
  label: "من نحن",
  title: `من نحن: OTAGE ومؤسسها ${F.nameAr}`,
  description: `OTAGE علامة مغربية لمستحضرات التجميل أسسها ${F.nameAr}، صيدلي، على أساس الشفافية والصدق والثقة.`,
  h1: "OTAGE: عناية صادقة، مصنوعة في المغرب",
  schemaType: "AboutPage",
};
export const metadata = textMetadata(info, "ar");

export default function Page() {
  return (
    <TextPage locale="ar" info={info} extraLd={[founderLd("ar")]} lead="OTAGE علامة مغربية لمستحضرات التجميل الطبيعية. وعدنا في جملة واحدة: لا نبيع الوهم، نبيع النتيجة.">
      <h2>المؤسس</h2>
      <Img className="founder" src={F.photo} alt={F.alt.ar} width={900} height={1125} sizes="(max-width: 700px) 70vw, 320px" />
      <p><b>{F.nameAr}</b> {F.jobTitle.ar}، {F.specialty.ar}. هو مؤسس OTAGE.</p>
      <blockquote className="quote">
        <p>«{F.story.ar}»</p>
        <footer>{F.nameAr}، مؤسس OTAGE</footer>
      </blockquote>

      <h2>ماذا نقدم</h2>
      <p>نقدم روتينًا ضد البقع من 4 منتجات، مصممًا للبقع البنية، البقع الصبغية ولون البشرة غير الموحد، وكذلك سيرومًا لمحيط العين للهالات السوداء.</p>
      <ul>
        {products.map((p) => (
          <li key={p.slug}><Link href={`/ar/soins/${p.slug}`}>{p.name.ar}</Link> (<span dir="ltr">{p.no}</span>): {ingredientList(p, "ar")}.</li>
        ))}
      </ul>

      <h2>الصدق، عمليًا</h2>
      <ul>
        <li><b>أسعار واضحة.</b> تذكرة الطلب تُكتب أمام عينيك: كل شيء ظاهر، ولا شيء مخفي.</li>
        <li><b>بدون وعود خارقة.</b> البقع تخف شيئًا فشيئًا، وليس بين ليلة وضحاها. نقولها بوضوح.</li>
        <li><b>تدفعين عند الاستلام.</b> لا شيء يُدفع مسبقًا عبر الإنترنت، ولا حاجة لبطاقة بنكية.</li>
        <li><b>التوصيل خلال {site.delivery.label.ar}</b> في كل أنحاء المغرب: مجاني للمجموعة الكاملة، ومن {site.delivery.unitFee.min} إلى {site.delivery.unitFee.max} درهمًا حسب المدينة للمنتجات المنفردة.</li>
      </ul>

      <h2>صنع في المغرب، مع مختبر شريك</h2>
      <p>منتجاتنا تُصنع في المغرب، بالتعاون مع مختبر شريك، بمكونات مثل التين الشوكي واللبان. «ما كنبيعوش الوهم، كنبيعو النتيجة»: هذا شعارنا، بالدارجة.</p>

      <h2>سؤال؟ نجيبك</h2>
      <p>سؤال عن بشرتك، عن منتج أو عن طلبك؟ راسلينا مباشرة، {site.availability.ar}: <a href={waLink()} target="_blank" rel="noopener">واتساب <span dir="ltr">{site.whatsapp.display}</span></a>، <a href={`mailto:${site.email}`} dir="ltr">{site.email}</a> أو <a href={site.instagram.url} target="_blank" rel="noopener">إنستغرام <span dir="ltr">{site.instagram.handle}</span></a>.</p>
    </TextPage>
  );
}
