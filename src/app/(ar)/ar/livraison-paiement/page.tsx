import FaqList from "@/components/FaqList";
import { faq } from "@/data/faq";
import { abs, site, waLink } from "@/data/site";
import { faqLd } from "@/lib/seo";
import TextPage, { textMetadata } from "@/templates/TextPage";

/* Page « Livraison et paiement » en arabe. Même contenu que la page française. À RELIRE PAR UN NATIF.
   TODO (comme en français) : politique de retour ; conditions de livraison à confirmer par OTAGE. */
const info = {
  path: "/livraison-paiement",
  label: "التوصيل والدفع",
  title: "توصيل مجاني في المغرب والدفع عند الاستلام | OTAGE",
  description: `توصيل OTAGE مجاني في كل أنحاء المغرب خلال ${site.delivery.label.ar}. الدفع عند الاستلام، نقدًا: لا شيء يُدفع عبر الإنترنت. نتصل بك لتأكيد طلبك.`,
  h1: "التوصيل والدفع",
};
export const metadata = textMetadata(info, "ar");

const questions = ["متى أدفع؟", "هل التوصيل مدفوع؟", "كم يستغرق التوصيل؟", "وماذا بعد طلبي؟"];
const items = faq.ar.filter((f) => questions.includes(f.q));

export default function Page() {
  return (
    <TextPage locale="ar" info={info} lead={`توصيل مجاني في كل أنحاء المغرب خلال ${site.delivery.label.ar}. تدفعين عند الاستلام، نقدًا.`} extraLd={[faqLd(items, `${abs("/ar" + info.path)}#faq`)]}>
      <h2>كيف يتم الطلب</h2>
      <ol>
        <li><b>تطلبين</b> من الموقع في 20 ثانية (الاسم، الهاتف، المدينة) أو عبر واتساب.</li>
        <li><b>نتصل بك</b> لتأكيد طلبك وعنوانك.</li>
        <li><b>يُرسل طردك</b> ويصل خلال {site.delivery.label.ar}، في كل أنحاء المغرب.</li>
        <li><b>تدفعين عند الاستلام</b>، نقدًا، حين يسلمك عامل التوصيل طردك.</li>
      </ol>

      <h2>التوصيل</h2>
      <ul>
        <li>المنطقة: كل المغرب.</li>
        <li>المدة: {site.delivery.label.ar}.</li>
        <li>التكلفة: مجانًا، مهما كان الحجم أو عدد المجموعات.</li>
      </ul>

      <h2>الدفع</h2>
      <ul>
        <li>عند الاستلام، نقدًا.</li>
        <li>لا شيء يُدفع عبر الإنترنت، ولا حاجة لبطاقة بنكية.</li>
      </ul>

      <h2>مشكلة في طردك؟</h2>
      <p>طرد متضرر، خطأ في الطلب أو سؤال عن الإرجاع: راسلينا على <a href={waLink("مرحبًا OTAGE، لدي سؤال عن طلبي.")} target="_blank" rel="noopener">واتساب على الرقم <span dir="ltr">{site.whatsapp.display}</span></a>، وننظر في الأمر معك.</p>

      <h2 id="faq">الأسئلة الشائعة</h2>
      <FaqList items={items} />
    </TextPage>
  );
}
