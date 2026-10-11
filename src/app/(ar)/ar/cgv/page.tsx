import Link from "next/link";
import { bundleUnit, gamme, yeuxPrice } from "@/data/products";
import { site } from "@/data/site";
import TextPage, { textMetadata, Todo } from "@/templates/TextPage";

/* Conditions générales de vente en arabe. Même structure que la page française ; mêmes informations en attente (TODO).
   À RELIRE PAR UN NATIF ET PAR UN JURISTE. */
const L = site.legal;
const info = {
  path: "/cgv",
  label: "الشروط العامة للبيع",
  title: "الشروط العامة للبيع | OTAGE",
  description: "الشروط العامة للبيع لدى OTAGE: المنتجات، الأسعار بالدرهم، الطلب، التوصيل المجاني في المغرب، والدفع عند الاستلام.",
  h1: "الشروط العامة للبيع",
  draft: !L.raisonSociale || !L.tribunal,
};
export const metadata = textMetadata(info, "ar");
const P = gamme.formats.petit, G = gamme.formats.grand;
const offer = "2 + 1";

export default function Page() {
  return (
    <TextPage locale="ar" info={info}>
      <h2>1. الموضوع</h2>
      <p>تنظم هذه الشروط بيع مستحضرات التجميل OTAGE عبر موقع <span dir="ltr">{site.url.replace("https://", "")}</span> أو عبر واتساب، بين {L.raisonSociale ?? <Todo locale="ar">الاسم التجاري للبائع</Todo>} وزبوناته وزبنائه في المغرب.</p>

      <h2>2. المنتجات</h2>
      <p>المنتجات المعروضة هي تلك المقدمة على الموقع يوم الطلب: مجموعة العناية ضد البقع (جل منظف، سيروم، كريم، واقي الشمس SPF 50)، بالحجم الصغير أو الكبير، وسيروم محيط العين. الصور غير تعاقدية.</p>

      <h2>3. الأسعار</h2>
      <p>الأسعار مبينة بالدرهم المغربي. <Todo locale="ar">توضيح ما إذا كانت الأسعار شاملة للضرائب</Todo></p>
      <ul>
        <li>مجموعة العناية ضد البقع بالحجم الصغير: {P.price} درهم. بالحجم الكبير: {G.price} درهم.</li>
        <li>عرض {offer}: عند شراء مجموعتين، الثالثة مجانًا (أي {bundleUnit(P.price)} درهم للمجموعة بالحجم الصغير، و{bundleUnit(G.price)} درهم بالحجم الكبير).</li>
        <li>سيروم محيط العين: {yeuxPrice} درهم، أو {bundleUnit(yeuxPrice)} درهم للسيروم مع عرض {offer}.</li>
      </ul>
      <p>الأسعار المطبقة هي المعروضة وقت الطلب.</p>

      <h2>4. الطلب</h2>
      <p>يتم الطلب من الموقع (الاسم، الهاتف، المدينة، العنوان) أو عبر واتساب. يصبح الطلب نهائيًا بعد تأكيده هاتفيًا مع OTAGE.</p>

      <h2>5. التوصيل</h2>
      <p>يتم التوصيل في كل أنحاء المغرب. هو مجاني عند شراء مجموعة كاملة. عند شراء منتجات منفردة، مصاريف التوصيل من {site.delivery.unitFee.min} إلى {site.delivery.unitFee.max} درهمًا حسب المدينة؛ تُضاف إلى المجموع وتُؤكَّد للزبونة قبل الإرسال. المدة التقريبية هي {site.delivery.label.ar} بعد تأكيد الطلب.</p>

      <h2>6. الدفع</h2>
      <p>يتم الدفع عند الاستلام، نقدًا، عند تسليم الطرد. لا يُطلب أي دفع عبر الإنترنت.</p>

      <h2 id="retours">7. حق التراجع، الإرجاع والشكايات</h2>
      <p><b>{site.returns.right.ar}</b></p>
      <p>للزبونة أجل {site.returns.days} أيام من تاريخ استلام طلبها لممارسة حق التراجع، دون تبرير ودون أي غرامة. يكفي إخبار OTAGE داخل هذا الأجل، عبر واتساب على الرقم <span dir="ltr">{site.whatsapp.display}</span> أو بالبريد الإلكتروني <span dir="ltr">{site.email}</span>، مع ذكر الاسم ورقم الطلب.</p>
      {/* À faire valider par un juriste : exception des produits cosmétiques ouverts (voir la version française). */}
      <p>يجب أن تكون المنتجات المرجعة غير مفتوحة وغير مستعملة، في غلافها الأصلي. مصاريف الإرجاع تتحملها OTAGE.</p>
      {/* À faire valider par un juriste : délai de remboursement (voir la version française). */}
      <p>حسب اختيار الزبونة، ترد OTAGE المبالغ المدفوعة أو تستبدل المنتج. <Todo locale="ar">أجل استرجاع المبلغ (يُراجع مع مستشار قانوني)</Todo></p>
      <p>{site.claims.ar}</p>

      <h2>8. احتياطات الاستعمال</h2>
      <p>منتجات OTAGE مستحضرات تجميل، للاستعمال الخارجي. جربي على منطقة صغيرة قبل أول استعمال. في حال الاحمرار أو التهيج، توقفي واستشيري مختصًا. إن كنت حاملًا أو مرضعة، اسألي أولًا طبيبك أو الصيدلي.</p>

      <h2>9. المعطيات الشخصية</h2>
      <p>تُستعمل المعطيات المجمعة فقط لمعالجة الطلب. انظري <Link href="/ar/mentions-legales">الإشعار القانوني</Link>.</p>

      <h2>10. القانون المطبق</h2>
      <p>تخضع هذه الشروط للقانون المغربي. {L.tribunal ?? <Todo locale="ar">المحكمة المختصة في حال النزاع</Todo>}</p>
    </TextPage>
  );
}
