import Link from "next/link";
import { ingredientList, products } from "@/data/products";
import { site, waLink } from "@/data/site";
import TextPage, { textMetadata } from "@/templates/TextPage";

/* Page « À propos » en arabe. Même contenu que la page française. À RELIRE PAR UN NATIF. */
const info = {
  path: "/a-propos",
  label: "من نحن",
  title: "من نحن: OTAGE، عناية صادقة مصنوعة في المغرب",
  description: "OTAGE علامة مغربية لمستحضرات التجميل الطبيعية: روتين ضد البقع من 4 منتجات وسيروم لمحيط العين، مصنوعة في المغرب.",
  h1: "OTAGE: عناية صادقة، مصنوعة في المغرب",
  schemaType: "AboutPage",
};
export const metadata = textMetadata(info, "ar");

export default function Page() {
  return (
    <TextPage locale="ar" info={info} lead="OTAGE علامة مغربية لمستحضرات التجميل الطبيعية. وعدنا في جملة واحدة: لا نبيع الوهم، نبيع النتيجة.">
      <h2>ماذا نصنع</h2>
      <p>نصنع في المغرب روتينًا ضد البقع من 4 منتجات، مصممًا للبقع البنية، البقع الصبغية ولون البشرة غير الموحد، وكذلك سيرومًا لمحيط العين للهالات السوداء.</p>
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
        <li><b>توصيل مجاني</b> في كل أنحاء المغرب، خلال {site.delivery.label.ar}.</li>
      </ul>

      <h2>صنع في المغرب، بمكونات من هنا</h2>
      <p>منتجاتنا تُصنع في المغرب، بمكونات مثل التين الشوكي واللبان. «ما كنبيعوش الوهم، كنبيعو النتيجة»: هذا شعارنا، بالدارجة.</p>

      <h2>المؤسسون يجيبونك</h2>
      <p>سؤال عن بشرتك، عن منتج أو عن طلبك؟ راسلينا مباشرة، ونجيبك بأنفسنا: <a href={waLink()} target="_blank" rel="noopener">واتساب <span dir="ltr">{site.whatsapp.display}</span></a> أو <a href={site.instagram.url} target="_blank" rel="noopener">إنستغرام <span dir="ltr">{site.instagram.handle}</span></a>.</p>
    </TextPage>
  );
}
