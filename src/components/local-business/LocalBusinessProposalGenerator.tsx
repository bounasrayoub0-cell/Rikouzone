import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  Building,
  User,
  Calendar,
  DollarSign,
  Download,
  ShieldCheck,
  Briefcase,
  AlertCircle
} from 'lucide-react';

export const LocalBusinessProposalGenerator: React.FC = () => {
  const [clientName, setClientName] = useState<string>('');
  const [businessName, setBusinessName] = useState<string>('');
  const [providerName, setProviderName] = useState<string>('');
  const [packageSelected, setPackageSelected] = useState<string>('growth');
  const [monthlyFee, setMonthlyFee] = useState<number>(450);
  const [contractDuration, setContractDuration] = useState<string>('3 أشهر قابلة للتجديد');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const [deliverables, setDeliverables] = useState<{ id: string; label: string; checked: boolean }[]>([
    { id: 'gbp', label: 'إدارة وتحديث ملف Google Business Profile والرد الأسبوعي على التقييمات', checked: true },
    { id: 'photos', label: 'جلسة تصوير ميدانية شهرية بالهاتف الذكي عالي الدقة للمنتجات والمحل', checked: true },
    { id: 'social_posts', label: 'تصميم وجدولة 8 منشورات + 4 مقاطع فيديو قصيرة (Reels) شهرياً', checked: true },
    { id: 'whatsapp', label: 'تنظيم قوالب الردود السريعة ورابط الطلب عبر WhatsApp Business', checked: true },
    { id: 'ads', label: 'إعداد ومراقبة الحملات الإعلانية الجغرافية بمحيط المحل (الميزانية على العميل)', checked: true },
    { id: 'report', label: 'تسليم تقرير أداء تحليلي شهري بالأرقام والاتصالات والنتائج', checked: true },
    { id: 'website', label: 'تصميم صفحة هبوط تعريفية سريعة ببيانات المحل وزر الاتصال', checked: false }
  ]);

  const [copied, setCopied] = useState<boolean>(false);

  const toggleDeliverable = (id: string) => {
    setDeliverables(deliverables.map((d) => (d.id === id ? { ...d, checked: !d.checked } : d)));
  };

  const generateAgreementText = () => {
    const activeDeliverables = deliverables
      .filter((d) => d.checked)
      .map((d, i) => `${i + 1}. ${d.label}`)
      .join('\n');

    return `================================================
وثيقة نطاق العمل واتفاقية تقديم الخدمات الرقمية (Scope of Work - SOW)
================================================

تاريخ البدء: ${startDate}
مدة الاتفاقية: ${contractDuration}

الطرف الأول (مقدم الخدمة المستقل):
الاسم: ${providerName || 'الاستشاري الرقمي'}
الصفة: أخصائي تطوير الحضور الرقمي والأنشطة المحلية

الطرف الثاني (العميل):
اسم المسؤول: ${clientName || 'المالك / المدير'}
اسم النشاط التجاري: ${businessName || 'المشروع المحلي'}

------------------------------------------------
1. نطاق العمل والتسليمات المتفق عليها (Deliverables):
------------------------------------------------
يلتزم الطرف الأول بتقديم الخدمات التالية بشكل شهري ودوري:
${activeDeliverables}

------------------------------------------------
2. التزامات ومسؤوليات الطرف الثاني (العميل):
------------------------------------------------
- تزويد مقدم الخدمة بصلاحيات الوصول لصفحات التواصل وملف الخرائط كـ "مدير" (Manager).
- إتاحة المحل والمنتجات في المواعيد المحددة لجلسات التصوير الشهرية.
- تزويد الطرف الأول بأحدث العروض والأسعار الرسمية قبل نشرها بـ 48 ساعة.
- دفع ميزانية الإعلانات الممولة مباشرة من خلال حسابه الإعلاني دون وساطة مالية.

------------------------------------------------
3. المقابل المالي وشروط الدفع (Payment Terms):
------------------------------------------------
- المقابل المالي الشهري: $${monthlyFee} (أو ما يعادله بالعملة المحلية).
- يتم سداد المستحقات الشهرية مقدماً في اليوم الأول من كل شهر تعاقدي.
- لا تشمل هذه الأتعاب أي ميزانيات إعلانية مدفوعة مباشرة لمنصات Meta أو Google.

------------------------------------------------
4. الضمان وجودة الخدمة:
------------------------------------------------
- يلتزم مقدم الخدمة بالأمانة والسرية التامة لبيانات العميل وأرقام أعماله.
- يحق لأي من الطرفين إنهاء الاتفاقية بإخطار كتابي مسبق مدته 14 يوماً قبل نهاية الشهر الجاري.

توقيع مقدم الخدمة: _____________________
توقيع وموافقة العميل: _____________________`;
  };

  const handleCopy = () => {
    const text = generateAgreementText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = generateAgreementText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SOW_${businessName || 'Local_Client'}_Agreement.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold text-sky-400">
              <Sparkles className="h-4 w-4" />
              <span>الأداة التفاعلية الرابعة · توثيق العقود والتسليمات</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
              مولد وثيقة نطاق العمل والاتفاقية الشهرية (SOW Generator)
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              احمِ نفسك ووقتك من طلبات العمل غير المنتهية (Scope Creep). وثيقة احترافية مبسطة تحدد بدقة ما ستقدمه للتاجر، مواعيد التسليم، وشروط الدفع المسبق.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-bold text-zinc-200 hover:bg-zinc-700 transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>تحميل كملف نصي</span>
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500 px-4 py-2 text-xs font-black text-black hover:bg-sky-400 transition shadow-lg shadow-sky-500/20"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'تم النسخ' : 'نسخ الوثيقة'}</span>
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80">
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">اسم النشاط التجاري (العميل)</label>
            <input
              type="text"
              placeholder="مثال: مطعم شواية مراكش"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">اسم المسؤول / المالك</label>
            <input
              type="text"
              placeholder="مثال: السيد رشيد العلمي"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">اسمك أو اسم وكالتك</label>
            <input
              type="text"
              placeholder="مثال: أيوب ديجيتال سيرفيسز"
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">المقابل المالي الشهري ($)</label>
            <input
              type="number"
              value={monthlyFee}
              onChange={(e) => setMonthlyFee(Number(e.target.value))}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">مدة العقد</label>
            <select
              value={contractDuration}
              onChange={(e) => setContractDuration(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
            >
              <option value="شهر تجريبي واحد">شهر تجريبي واحد</option>
              <option value="3 أشهر قابلة للتجديد">3 أشهر قابلة للتجديد (موصى بها)</option>
              <option value="6 أشهر مع خصم 10%">6 أشهر مع خصم 10%</option>
              <option value="سنة تعاقدية كاملة">سنة تعاقدية كاملة</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">تاريخ بدء العمل</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="mt-6 pt-6 border-t border-zinc-800/80">
          <label className="block text-xs font-bold text-sky-400 mb-3">
            حدد التسليمات والخدمات المشمولة في هذا الاتفاق:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {deliverables.map((d) => (
              <div
                key={d.id}
                onClick={() => toggleDeliverable(d.id)}
                className={`cursor-pointer rounded-xl border p-3 flex items-center gap-3 transition ${
                  d.checked
                    ? 'border-sky-500/50 bg-sky-500/10'
                    : 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900'
                }`}
              >
                <div
                  className={`h-4 w-4 rounded flex items-center justify-center border text-[10px] ${
                    d.checked
                      ? 'border-sky-500 bg-sky-500 text-black'
                      : 'border-zinc-700 bg-zinc-800'
                  }`}
                >
                  {d.checked && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <span className="text-xs text-zinc-200 font-medium">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Output */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 backdrop-blur-xl">
        <h3 className="text-base font-black text-white flex items-center gap-2">
          <FileText className="h-4 w-4 text-sky-400" />
          <span>معاينة وثيقة الاتفاقية الجاهزة للتوقيع</span>
        </h3>

        <div className="mt-4 p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap selection:bg-sky-500 selection:text-black">
          {generateAgreementText()}
        </div>
      </div>
    </div>
  );
};
