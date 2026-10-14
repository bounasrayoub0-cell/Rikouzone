import React, { useState } from 'react';
import { FileText, Copy, Check, Sparkles, Building2, PhoneCall, Handshake, AlertCircle } from 'lucide-react';

interface LeadDemandValidatorProps {
  onCopyText: (text: string, label: string) => void;
}

export const LeadDemandValidator: React.FC<LeadDemandValidatorProps> = ({ onCopyText }) => {
  const [activeSubTab, setActiveSubTab] = useState<'interview' | 'proposal' | 'agreement'>('interview');
  
  // Customization fields
  const [contractorName, setContractorName] = useState('شركة الصفوة للمقاولات');
  const [serviceName, setServiceName] = useState('عزل الأسطح وكشف التسربات');
  const [cityName, setCityName] = useState('الرياض');
  const [pricePerLead, setPricePerLead] = useState('45');
  const [freeLeadsCount, setFreeLeadsCount] = useState('3');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string, label: string) => {
    onCopyText(text, label);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // 1. Phone Interview Script
  const interviewScript = `مرحباً أستاذي الكريم، هل أتحدث مع مدير العمليات أو المشرف في ${contractorName}؟

معكم [اسمك]، مسوق رقمي متخصص في قطاع ${serviceName} هنا في مدينة ${cityName}.
نحن نجهز حالياً حملة استقطاب رقمية متكاملة لجلب طلبات معاينة مباشرة من أصحاب الفلل والمنازل الجادين في أحيائكم.

نحن نبحث عن شريك محلي معتمد ذي سمعة ممتازة لنحيل إليه هذه الطلبات بشكل حصري، وأردت الاستفسار عن نقطتين سريعتين:
1. هل لديكم طاقة استيعابية هذا الشهر لاستقبال 15 إلى 30 فرصة معاينة إضافية؟
2. ما هي الأحياء المحددة التي تفضلون تركيز الفنيين فيها لضمان سرعة الاستجابة؟

نحن لا نبيع باقات إعلانية ولا نطلب أي اشتراك مسبق؛ بل سنمنحكم أول ${freeLeadsCount} فرص مؤهلة ومجانية تماماً لتجربوا سرعة اتصال العميل وجودة طلبه قبل أن نتفق على أي شيء. هل يناسبكم استلام أول فرصة تجريبية غداً عبر واتساب؟`;

  // 2. One-Page B2B Proposal
  const proposalText = `عرض شراكة تجارية لتوريد الفرص البيعية المؤهلة (Lead Generation Partnership)

إلى السادة: إدارة ${contractorName} المحترمين
المدينة: ${cityName}
التاريخ: ${new Date().toLocaleDateString('ar-EG')}

1. الهدف من الشراكة:
تزويد شركتكم بتدفق منتظم ومستمر من طلبات العملاء المؤهلين الراغبين في خدمة ${serviceName} في مدينة ${cityName}، دون أن تتحمل شركتكم أي مخاطر تسويقية أو تكاليف إعلانية مسبقة.

2. نموذج العمل المعتمد (Pay-Per-Lead):
- الدفع فقط مقابل "الفرصة المؤهلة والمقبولة": ${pricePerLead}$ دولار لكل فرصة.
- لا توجد رسوم إدارة حملات، ولا اشتراكات شهرية إلزامية في البداية.

3. معايير الفرصة المؤهلة (Qualified Lead Criteria):
تعتبر الفرصة مقبولة وتستحق الرسوم إذا استوفت الشروط التالية:
أ) اسم العميل ورقم هاتفه الصحيح الفعال.
ب) العقار يقع داخل النطاق الجغرافي المتفق عليه في مدينة ${cityName}.
ج) العميل هو صاحب العقار أو المفوض الرسمي باتخاذ القرار.
د) العميل يطلب صراحة خدمة ${serviceName} ومستعد لتحديد موعد معاينة.

4. سياسة استبدال الفرص المرفوضة (Replacement Policy):
يتم استبدال أي فرصة مجاناً في الحالات التالية فور إبلاغنا خلال 72 ساعة:
- الرقم مغلق أو غير موجود في الخدمة بعد 3 محاولات اتصال في أوقات مختلفة.
- العميل خارج نطاق المدينة أو يطلب خدمة لا تقدمها الشركة.
- العميل سجل بالخطأ وصرح بعدم حاجته للخدمة فور اتصاله.

5. العرض التجريبي الأولي:
نمنح شركتكم عدد (${freeLeadsCount}) فرص مؤهلة مجانية 100% لتجربة كفاءة النظام وجودة العملاء.`;

  // 3. Lead Delivery Agreement
  const agreementText = `مذكرة تفاهم واتفاقية توريد فرص بيعية مؤهلة

الطرف الأول: [اسمك / صانع المنظومة الرقمية]
الطرف الثاني: ${contractorName}

البند الأول: موضوع الاتفاقية
يقوم الطرف الأول بتوريد فرص بيعية حصرية ومؤهلة لخدمة ${serviceName} للطرف الثاني في مدينة ${cityName}.

البند الثاني: التسعير والفوترة
- يلتزم الطرف الثاني بسداد مبلغ (${pricePerLead}$) دولار أمريكي عن كل فرصة مؤهلة ومقبولة.
- تصدر فاتورة الحساب أسبوعياً كل يوم خميس، وتُسدد خلال 48 ساعة عبر التحويل البنكي المتفق عليه.

البند الثالث: آلية التسليم وسرعة الاستجابة
- تُسلم الفرص فورياً عبر واتساب أو النظام السحابي المشترك فور تسجيل العميل.
- يلتزم الطرف الثاني بالاتصال بالعميل خلال مدة أقصاها (ساعتان) من استلام الفرصة لضمان عدم برود اهتمامه.

البند الرابع: آلية الاعتراض والاستبدال
- يحق للطرف الثاني الاعتراض على أي فرصة غير مطابقة للمعايير خلال مهلة أقصاها 72 ساعة من وقت التسليم.
- عدم الاعتراض خلال المهلة المحددة يُعد إقراراً بقبول الفرصة واحتسابها ضمن الفاتورة الأسبوعية.

البند الخامس: حدود المسؤولية
ينتهي التزام الطرف الأول بتسليم فرصة مؤهلة مطابقة للمعايير؛ وإتمام المعاينة، التفاوض، وتوقيع عقد التنفيذ النهائي هو مسؤولية حصرية للطرف الثاني وفريق مبيعاته.`;

  return (
    <div className="space-y-8 animate-fadeIn text-right" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900/90 via-zinc-900/50 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
          <FileText className="h-3.5 w-3.5" />
          <span>الدروس 4 و 11: قوالب التحقق والعرض التجاري والاتفاقيات</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          قوالب الاتصال الميداني والعروض التجارية للشركات (B2B Playbook)
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
          خصص المتغيرات لتوليد نصوص رسمية جاهزة للنسخ والاستخدام الفوري: سيناريو المكالمة الاستكشافية، العرض التجاري في صفحة واحدة، ومذكرة الاتفاق القانونية.
        </p>

        {/* Dynamic Variable Customizers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-3 border-t border-zinc-800/80">
          <div>
            <label className="text-[10px] text-zinc-400 block mb-1">اسم الشركة الشريكة:</label>
            <input
              type="text"
              value={contractorName}
              onChange={(e) => setContractorName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="text-[10px] text-zinc-400 block mb-1">نوع الخدمة المستهدفة:</label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="text-[10px] text-zinc-400 block mb-1">المدينة المستهدفة:</label>
            <input
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="text-[10px] text-zinc-400 block mb-1">سعر الفرصة المقبولة ($):</label>
            <input
              type="number"
              value={pricePerLead}
              onChange={(e) => setPricePerLead(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] text-zinc-400 block mb-1">عدد الفرص التجريبية المجانية:</label>
            <input
              type="number"
              value={freeLeadsCount}
              onChange={(e) => setFreeLeadsCount(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
        <button
          onClick={() => setActiveSubTab('interview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'interview'
              ? 'bg-cyan-500 text-zinc-950'
              : 'bg-zinc-900 text-zinc-400 hover:text-white'
          }`}
        >
          <PhoneCall className="h-4 w-4" />
          <span>سيناريو المكالمة الاستكشافية (التحقق من الطلب)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('proposal')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'proposal'
              ? 'bg-cyan-500 text-zinc-950'
              : 'bg-zinc-900 text-zinc-400 hover:text-white'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>العرض التجاري المختصر (One-Page Proposal)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('agreement')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'agreement'
              ? 'bg-cyan-500 text-zinc-950'
              : 'bg-zinc-900 text-zinc-400 hover:text-white'
          }`}
        >
          <Handshake className="h-4 w-4" />
          <span>قالب اتفاقية توريد الفرص والشروط</span>
        </button>
      </div>

      {/* Content Viewer Card */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>
              {activeSubTab === 'interview' && 'نص المحادثة الهاتفية الموجهة لأصحاب الشركات'}
              {activeSubTab === 'proposal' && 'العرض التجاري الرسمي بصيغة قابلة للطباعة أو الإرسال كـ PDF'}
              {activeSubTab === 'agreement' && 'بنود مذكرة التفاهم لحماية حقوقك وتوضيح آلية القبول والرفض'}
            </span>
          </div>

          <button
            onClick={() => {
              const textToCopy =
                activeSubTab === 'interview'
                  ? interviewScript
                  : activeSubTab === 'proposal'
                  ? proposalText
                  : agreementText;
              handleCopy(textToCopy, activeSubTab, 'القالب التجاري');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-zinc-950 text-xs font-bold transition-all cursor-pointer"
          >
            {copiedKey === activeSubTab ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedKey === activeSubTab ? 'تم النسخ!' : 'نسخ النص كاملاً'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-sans whitespace-pre-wrap">
          {activeSubTab === 'interview' && interviewScript}
          {activeSubTab === 'proposal' && proposalText}
          {activeSubTab === 'agreement' && agreementText}
        </pre>

        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
          <span>
            <strong>نصيحة ذهبية:</strong> احرص دائماً على عدم تقديم أي وعود بضمان صفقات بيع نهائية؛ فمسؤوليتك تقتصر على تسليم فرصة مؤهلة تطابق شروط الاتفاق، بينما مهارة البيع والتسعير الميداني مسؤولية الشركة.
          </span>
        </div>
      </div>
    </div>
  );
};
