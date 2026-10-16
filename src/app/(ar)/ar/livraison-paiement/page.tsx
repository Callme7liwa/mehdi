import { abs, site, waLink } from "@/data/site";
import type { Faq } from "@/data/faq";
import { faqLd } from "@/lib/seo";
import TextPage, { textMetadata } from "@/templates/TextPage";

/* Page « Livraison et paiement » en arabe. Même structure que la page française. À RELIRE PAR UN NATIF. */
const info = {
  path: "/livraison-paiement",
  label: "التوصيل والدفع",
  title: `التوصيل ${site.delivery.label.ar} والدفع عند الاستلام | OTAGE`,
  description: `التوصيل ${site.delivery.label.ar} في كل المغرب: مجاني للمجموعة الكاملة، ومن ${site.delivery.unitFee.min} إلى ${site.delivery.unitFee.max} درهمًا للمنتج المنفرد. الدفع عند الاستلام، والإرجاع خلال ${site.returns.days} أيام.`,
  h1: "التوصيل والدفع عند الاستلام",
};
export const metadata = textMetadata(info, "ar");

const wa = (msg: string) => `<a href="${waLink(msg)}" target="_blank" rel="noopener">واتساب على الرقم <span dir="ltr">${site.whatsapp.display}</span></a>`;

/* كل قسم سؤال: نفس النص للـ HTML وللـ JSON-LD FAQPage. حق التراجع والشكايات منقولة حرفيًا من الشروط العامة للبيع. */
const items: (Faq & { id?: string })[] = [
  { q: "متى يصلني الطلب؟", a: [`<b>${site.delivery.label.ar}</b>، في كل المغرب. نتصل بك أولًا للتأكيد.`] },
  { q: "كم يكلف التوصيل؟", a: [`مجاني للمجموعة الكاملة. للمنتج المنفرد: <b>من ${site.delivery.unitFee.min} إلى ${site.delivery.unitFee.max} درهمًا</b> حسب مدينتك، نؤكدها هاتفيًا.`] },
  { q: "كيف أدفع؟", a: ["عند الاستلام، نقدًا. لا شيء يُدفع عبر الإنترنت."] },
  {
    id: "retours",
    q: "هل يمكنني إرجاع طلبي؟",
    a: [
      `<b>${site.returns.right.ar}</b>`,
      `أخبرينا خلال ${site.returns.days} أيام بعد الاستلام. منتجات غير مفتوحة وغير مستعملة، الإرجاع على حسابنا، استرجاع المبلغ أو الاستبدال.`,
      `راسلينا على ${wa("مرحبًا OTAGE، أريد إرجاع طلبي.")} مع اسمك ورقم طلبك. التفاصيل في <a href="/ar/cgv">الشروط العامة للبيع</a>.`,
    ],
  },
  { q: "وإذا كان في طردي مشكل؟", a: [site.claims.ar, `راسلينا على ${wa("مرحبًا OTAGE، لدي شكاية بخصوص طلبي.")}.`] },
];

export default function Page() {
  return (
    <TextPage locale="ar" info={info} lead={`التوصيل ${site.delivery.label.ar} في كل المغرب، مجاني للمجموعة الكاملة. تدفعين عند الاستلام، نقدًا.`} extraLd={[faqLd(items, `${abs("/ar" + info.path)}#faq`)]}>
      <h2>كيف يتم الطلب؟</h2>
      <ol>
        <li><b>تطلبين</b> من الموقع في 20 ثانية (الاسم، الهاتف، المدينة) أو عبر واتساب.</li>
        <li><b>نتصل بك</b> لتأكيد طلبك وعنوانك.</li>
        <li><b>يُرسل طردك</b> ويصل {site.delivery.label.ar}، في كل المغرب.</li>
        <li><b>تدفعين عند الاستلام</b>، نقدًا، حين يسلمك عامل التوصيل طردك.</li>
      </ol>

      <div id="faq">
        {items.map((f) => (
          <section key={f.q}>
            <h2 id={f.id}>{f.q}</h2>
            {f.a.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
          </section>
        ))}
      </div>
    </TextPage>
  );
}
