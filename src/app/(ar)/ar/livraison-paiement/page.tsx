import Link from "next/link";
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
  title: "التوصيل، الدفع عند الاستلام والإرجاع | OTAGE",
  description: `توصيل OTAGE في كل أنحاء المغرب خلال ${site.delivery.label.ar}: مجاني للمجموعة الكاملة، ومن ${site.delivery.unitFee.min} إلى ${site.delivery.unitFee.max} درهمًا للمنتجات المنفردة. الدفع عند الاستلام، نقدًا.`,
  h1: "التوصيل والدفع",
};
export const metadata = textMetadata(info, "ar");

const questions = ["متى أدفع؟", "هل التوصيل مدفوع؟", "كم يستغرق التوصيل؟", "وماذا بعد طلبي؟", "وماذا لو كانت هناك مشكلة في طلبي؟", "هل يمكنني إرجاع طلبي؟"];
const items = faq.ar.filter((f) => questions.includes(f.q));

export default function Page() {
  return (
    <TextPage locale="ar" info={info} lead={`التوصيل في كل أنحاء المغرب خلال ${site.delivery.label.ar}، مجاني للمجموعة الكاملة. تدفعين عند الاستلام، نقدًا.`} extraLd={[faqLd(items, `${abs("/ar" + info.path)}#faq`)]}>
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
        <li>المجموعة الكاملة: التوصيل <b>مجاني</b>، مهما كان الحجم أو عدد المجموعات.</li>
        <li>شراء منتجات منفردة (منتج أو أكثر، سيروم محيط العين): <b>من {site.delivery.unitFee.min} إلى {site.delivery.unitFee.max} درهمًا حسب المدينة</b>، تُضاف إلى المجموع. نؤكد لك المبلغ الدقيق هاتفيًا قبل الإرسال.</li>
      </ul>

      <h2>الدفع</h2>
      <ul>
        <li>عند الاستلام، نقدًا.</li>
        <li>لا شيء يُدفع عبر الإنترنت، ولا حاجة لبطاقة بنكية.</li>
      </ul>

      <h2 id="retours">الإرجاع وحق التراجع</h2>
      <p><b>{site.returns.right.ar}</b></p>
      <ul>
        <li>لديك {site.returns.days} أيام بعد استلام طردك لتخبرينا أنك تريدين إرجاعه، حتى لو غيّرتِ رأيك فقط.</li>
        <li>يجب أن تكون المنتجات غير مفتوحة وغير مستعملة.</li>
        <li>مصاريف الإرجاع تتحملها OTAGE.</li>
        <li>لك الاختيار: استرجاع المبلغ أو الاستبدال.</li>
      </ul>
      <p>لبدء الإرجاع، راسلينا على <a href={waLink("مرحبًا OTAGE، أريد إرجاع طلبي.")} target="_blank" rel="noopener">واتساب على الرقم <span dir="ltr">{site.whatsapp.display}</span></a> مع اسمك ورقم طلبك. التفاصيل في <Link href="/ar/cgv">الشروط العامة للبيع</Link>.</p>

      <h2>الشكايات</h2>
      <p>{site.claims.ar}</p>
      <p>راسلينا على <a href={waLink("مرحبًا OTAGE، لدي شكاية بخصوص طلبي.")} target="_blank" rel="noopener">واتساب على الرقم <span dir="ltr">{site.whatsapp.display}</span></a>، وننظر في الأمر معك.</p>

      <h2 id="faq">الأسئلة الشائعة</h2>
      <FaqList items={items} />
    </TextPage>
  );
}
