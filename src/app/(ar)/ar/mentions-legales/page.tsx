import { site } from "@/data/site";
import TextPage, { textMetadata, Todo } from "@/templates/TextPage";

/* Mentions légales en arabe. Même structure que la page française ; mêmes informations en attente (TODO).
   À RELIRE PAR UN NATIF ET PAR UN JURISTE. */
const L = site.legal;
const info = {
  path: "/mentions-legales",
  label: "إشعار قانوني",
  title: "إشعار قانوني | OTAGE",
  description: "الإشعار القانوني لموقع otage.ma: الناشر، المستضيف، الملكية الفكرية والمعطيات الشخصية.",
  h1: "إشعار قانوني",
  draft: !L.raisonSociale || !L.ice || !L.adresse,
};
export const metadata = textMetadata(info, "ar");
const v = (value: string | null, what: string) => value ?? <Todo locale="ar">{what}</Todo>;

export default function Page() {
  return (
    <TextPage locale="ar" info={info}>
      <h2>ناشر الموقع</h2>
      <ul>
        <li>الاسم التجاري: {v(L.raisonSociale, "الاسم التجاري")}</li>
        <li>الشكل القانوني: {v(L.formeJuridique, "الشكل القانوني ورأس المال")}</li>
        <li><span dir="ltr">ICE</span>: {v(L.ice, "رقم التعريف الموحد للمقاولة")}</li>
        <li>السجل التجاري: {v(L.rc, "رقم السجل التجاري والمدينة")}</li>
        <li>المقر الاجتماعي: {v(L.adresse, "العنوان")}</li>
        <li>البريد الإلكتروني: {v(L.email, "عنوان البريد الإلكتروني")}</li>
        <li>الهاتف / واتساب: <span dir="ltr">{site.whatsapp.e164}</span></li>
        <li>مدير النشر: {v(L.directeurPublication, "اسم المسؤول")}</li>
      </ul>

      <h2>المستضيف</h2>
      <p dir="ltr" lang="fr" style={{ textAlign: "right" }}>{L.hebergeur}</p>

      <h2>الملكية الفكرية</h2>
      <p>علامة OTAGE، الشعار، النصوص، الصور والفيديوهات على هذا الموقع ملك للناشر. يُمنع أي نسخ دون إذن كتابي.</p>

      <h2>المعطيات الشخصية</h2>
      <p>حين تطلبين، نجمع اسمك، رقم هاتفك، مدينتك، وعنوانك إن أعطيته. تُستعمل هذه المعلومات فقط لتأكيد طلبك وتوصيله. تُسجل في جدول بيانات <span dir="ltr" lang="en">Google Sheets</span> وتُسلَّم لشركة التوصيل من أجل التوصيل. لا تُباع.</p>
      <p>طبقًا للقانون المغربي رقم <bdi>09-08</bdi> المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي، يمكنك طلب الاطلاع على معطياتك، تصحيحها أو حذفها بمراسلتنا عبر واتساب.</p>
      <p>التصريح لدى اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي: <Todo locale="ar">رقم التصريح أو الإذن</Todo></p>

      <h2>ملفات تعريف الارتباط</h2>
      <p>هذا الموقع لا يستعمل ملفات تعريف ارتباط إشهارية. يسجل فقط، في متصفحك، اختياراتك في العرض ومعلومات التوصيل التي أدخلتها، حتى لا تعيدي كتابتها.</p>

      <h2>مستحضرات التجميل</h2>
      <p>منتجات OTAGE مستحضرات تجميل. لا تعوض رأيًا طبيًا. في حال الشك، الحمل، الرضاعة أو تفاعل جلدي، استشيري طبيبًا أو صيدليًا.</p>
    </TextPage>
  );
}
