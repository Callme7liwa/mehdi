import { site } from "@/data/site";
import TextPage, { textMetadata } from "@/templates/TextPage";

/* Mentions légales en arabe. Même structure que la page française ; mêmes informations en attente (TODO).
   À RELIRE PAR UN NATIF ET PAR UN JURISTE. */
const L = site.legal;
const info = {
  path: "/mentions-legales",
  label: "إشعار قانوني",
  title: "إشعار قانوني | OTAGE",
  description: "الإشعار القانوني لموقع otage.ma: الناشر، المستضيف، الملكية الفكرية والمعطيات الشخصية.",
  h1: "إشعار قانوني",
  draft: !L.raisonSociale || !L.formeJuridique || !L.ice || !L.rc || !L.adresse || !L.cndp,
};
export const metadata = textMetadata(info, "ar");

export default function Page() {
  return (
    <TextPage locale="ar" info={info}>
      {/* Champs retirés de la page tant que l'information manque (aucun « À compléter » visible) :
          raison sociale, forme juridique, ICE, registre du commerce, siège social, e-mail, directeur de la publication.
          Chaque ligne réapparaît toute seule dès que sa valeur est renseignée dans src/data/site.ts (bloc legal). */}
      <h2>ناشر الموقع</h2>
      <ul>
        {L.raisonSociale && <li>الاسم التجاري: {L.raisonSociale}</li>}
        {L.formeJuridique && <li>الشكل القانوني: {L.formeJuridique}</li>}
        {L.ice && <li><span dir="ltr">ICE</span>: {L.ice}</li>}
        {L.rc && <li>السجل التجاري: {L.rc}</li>}
        {L.adresse && <li>المقر الاجتماعي: {L.adresse}</li>}
        {L.email && <li>البريد الإلكتروني: <span dir="ltr">{L.email}</span></li>}
        <li>الهاتف / واتساب: <span dir="ltr">{site.whatsapp.e164}</span></li>
        {L.directeurPublication && <li>مدير النشر: {L.directeurPublication}</li>}
      </ul>

      <h2>المستضيف</h2>
      <p dir="ltr" lang="fr" style={{ textAlign: "right" }}>{L.hebergeur}</p>

      <h2>الملكية الفكرية</h2>
      <p>علامة OTAGE، الشعار، النصوص، الصور والفيديوهات على هذا الموقع ملك للناشر. يُمنع أي نسخ دون إذن كتابي.</p>

      <h2>المعطيات الشخصية</h2>
      <p>حين تطلبين، نجمع اسمك، رقم هاتفك، مدينتك، وعنوانك إن أعطيته. تُستعمل هذه المعلومات فقط لتأكيد طلبك وتوصيله. تُسجل في جدول بيانات <span dir="ltr" lang="en">Google Sheets</span> وتُسلَّم لشركة التوصيل من أجل التوصيل. لا تُباع.</p>
      <p>طبقًا للقانون المغربي رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي، يمكنك طلب الاطلاع على معطياتك، تصحيحها أو حذفها بمراسلتنا عبر واتساب.</p>
      {/* numéro CNDP : la phrase réapparaît dès que legal.cndp est renseigné */}
      {L.cndp && <p>التصريح لدى اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي: {L.cndp}</p>}

      <h2 id="cookies">ملفات تعريف الارتباط وقياس الزيارات</h2>
      <p>هذا الموقع لا يستعمل ملفات تعريف ارتباط إشهارية. يسجل فقط، في متصفحك، اختياراتك في العرض ومعلومات التوصيل التي أدخلتها، حتى لا تعيدي كتابتها.</p>
      {site.gaId && <p>بموافقتك فقط، نقيس عدد زيارات الموقع بواسطة Google Analytics (الصفحات، النقر على واتساب، الطلبات المرسلة). دون موافقتك، لا يُحمَّل أي برنامج قياس ولا يُوضع أي ملف تعريف للقياس. يمكنك تغيير رأيك في أي وقت بإعادة فتح <a href="#cookies">هذا القسم</a>: يُطرح عليك السؤال من جديد.</p>}

      <h2>مستحضرات التجميل</h2>
      <p>منتجات OTAGE مستحضرات تجميل. لا تعوض رأيًا طبيًا. في حال الشك، الحمل، الرضاعة أو تفاعل جلدي، استشيري طبيبًا أو صيدليًا.</p>
    </TextPage>
  );
}
