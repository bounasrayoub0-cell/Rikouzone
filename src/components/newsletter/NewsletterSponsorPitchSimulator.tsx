import React, { useState } from 'react';
import { 
  Building2, 
  Send, 
  Copy, 
  Check, 
  DollarSign, 
  Sparkles, 
  Users, 
  Percent, 
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';

interface SimulationResult {
  accepted: boolean;
  proposedBudget: number;
  responseHeadline: string;
  feedback: string;
  nextSteps: string;
}

interface NewsletterSponsorPitchSimulatorProps {
  onCopyText: (text: string, label: string) => void;
}

export const NewsletterSponsorPitchSimulator: React.FC<NewsletterSponsorPitchSimulatorProps> = ({ onCopyText }) => {
  const [companyType, setCompanyType] = useState<'b2b-saas' | 'agency' | 'dev-tools' | 'course'>('b2b-saas');
  const [subscriberCount, setSubscriberCount] = useState<number>(3500);
  const [openRate, setOpenRate] = useState<number>(46);
  const [askedRate, setAskedRate] = useState<number>(160);
  const [packageType, setPackageType] = useState<'single' | 'bundle4'>('single');
  const [pitchSubject, setPitchSubject] = useState<string>('فكرة شراكة رعاية: [اسم شركتهم] × نشرة نبض التقنية (3.5K مشترك متفاعل)');
  const [pitchBody, setPitchBody] = useState<string>(
`مرحباً [اسم مدير التسويق]،

أتابع عن قرب حلولكم الممتازة في [اسم الشركة] وكيف توفر على رواد الأعمال ساعات طويلة أسبوعياً.

أكتب نشرة بريدية أسبوعية متخصصة باسم "نبض التقنية" تضم أكثر من 3,500 مشترك من مؤسسي الشركات ومدراء المنتجات والتقنيين، بمعدل فتح فعلي يتجاوز 46% (أكثر من 1,600 قارئ حقيقي لكل عدد).

نظراً لأن عدد الثلاثاء القادم يتناول موضوع "أتمتة العمليات السحابية"، أرى أن عرض أداتكم سيكون حلاً مثالياً يبحث عنه جمهورنا حالياً.

سعر رعاية العدد الواحد هو $160 (يشمل شعاراً وفقرة مخصصة من 80 كلمة مع زر رابط مباشر).

هل تود أن أحجز لكم مكاناً في عدد هذا الأسبوع أو مناقشة حزمة 4 أعداد مع خصم 15%؟

رابط الأعداد السابقة والـ Media Kit: [رابط النشرة]

مع فائق التحية،
[اسمك]`
  );

  const [simulated, setSimulated] = useState<boolean>(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleRunSimulation = () => {
    const activeReaders = (subscriberCount * openRate) / 100;
    const effectiveCPM = (askedRate / (activeReaders / 1000));

    let accepted = false;
    let proposedBudget = askedRate;
    let responseHeadline = '';
    let feedback = '';
    let nextSteps = '';

    if (effectiveCPM > 95) {
      accepted = false;
      proposedBudget = Math.round((activeReaders / 1000) * 55);
      responseHeadline = 'طلب تفاوض وتخفيض السعر (سعر الـ CPM المطلوب مرتفع جداً)';
      feedback = `المعلن مهتم بنوعية جمهورك ولكن سعر الـ CPM المطلوب (${Math.round(effectiveCPM)}$) يفوق ميزانية قسم التسويق المقررة لشركات الناشئة (المعدل الطبيعي 45$-65$). يقترح عليك المعلن رعاية تجريبية بسعر ${proposedBudget}$.`;
      nextSteps = 'اقترح عليه صفقة وسطية، أو اعرض عليه رابطاً مصنفاً (Classified) بسعر أقل لاختبار كفاءة الإعلان قبل الرعاية الكبرى.';
    } else if (openRate < 30) {
      accepted = false;
      proposedBudget = 0;
      responseHeadline = 'اعتذار لطيف (معدل الفتح أقل من المعايير المطلوبة)';
      feedback = 'المعلن اعتذر لأن معدل الفتح (أقل من 30%) يعتبر ضعيفاً مقارنة بنشرات B2B المنافسة ويخشى ألا تحقق الحملة عدد النقرات المطلوب.';
      nextSteps = 'ركز على تنظيف قائمتك البريدية من الحسابات الخاملة لرفع معدل الفتح فوق 40% قبل مراسلة معلنين جدد.';
    } else {
      accepted = true;
      if (packageType === 'bundle4') {
        proposedBudget = Math.round(askedRate * 4 * 0.85);
        responseHeadline = 'قبول فوري وموافقة على حزمة الـ 4 أعداد بخصم 15%!';
        feedback = `مدير التسويق معجب جداً بتخصيص الرسالة ونسبة الفتح الممتازة (${openRate}%)، ووافق على حجز حزمة الشهر الكامل بقيمة إجمالية ${proposedBudget}$.`;
        nextSteps = 'أرسل له رابط الدفع عبر Stripe أو الفاتورة، مع رابط نموذج استلام نص الإعلان والشعار وتاريخ النشر المطلوب.';
      } else {
        proposedBudget = askedRate;
        responseHeadline = 'قبول حجز رعاية العدد القادم بنجاح!';
        feedback = `مدير التسويق وافق على السعر المطلوب (${askedRate}$) ويريد حجز العدد القادم فوراً لاختبار نتائج الحملة.`;
        nextSteps = 'أكد الحجز خطياً وأرسل له تفاصيل الفاتورة والموعد النهائي لاستلام المواد الإعلانية (Copy Deadline).';
      }
    }

    setResult({
      accepted,
      proposedBudget,
      responseHeadline,
      feedback,
      nextSteps
    });
    setSimulated(true);
  };

  const handleCopyPitch = () => {
    onCopyText(pitchBody, 'تم نسخ سكريبت التواصل مع الراعي!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
            <Building2 className="w-3.5 h-3.5" />
            <span>محاكي إغلاق صفقات الرعاية مع مسؤولي التسويق (B2B Sponsors)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            محاكي التفاوض والتواصل مع الشركات الراعية
          </h2>
          <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
            اختبر سكريبت عرض الرعاية الخاص بك، وتعرف على كيفية رد مدراء التسويق وفق أرقام مشتركي نشرتك ونسبة الفتح والسعر المعروض.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Pitch Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 space-y-5">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>1. معطيات الصفقة وحجم النشرة</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">نوع الشركة المستهدفة:</label>
                <select
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="b2b-saas">شركة برمجيات سحابية (B2B SaaS)</option>
                  <option value="agency">وكالة تسويق أو برمجية متخصصة</option>
                  <option value="dev-tools">منصة أدوات مطورين وذكاء اصطناعي</option>
                  <option value="course">أكاديمية تعليمية وتدريبية</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">نوع العرض المطلوب:</label>
                <select
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="single">رعاية عدد واحد مستقل (Single Issue)</option>
                  <option value="bundle4">حزمة شهرية كاملة (4 أعداد بخصم 15%)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">المشتركون:</label>
                <input
                  type="number"
                  value={subscriberCount}
                  onChange={(e) => setSubscriberCount(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">نسبة الفتح (%):</label>
                <input
                  type="number"
                  value={openRate}
                  onChange={(e) => setOpenRate(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">السعر المطلوب ($):</label>
                <input
                  type="number"
                  value={askedRate}
                  onChange={(e) => setAskedRate(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-emerald-400 font-mono font-bold"
                />
              </div>
            </div>

            {/* Pitch Subject & Body */}
            <div className="space-y-3 pt-2 border-t border-zinc-800/80">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">عنوان رسالة التواصل (Subject):</label>
                <input
                  type="text"
                  value={pitchSubject}
                  onChange={(e) => setPitchSubject(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none font-bold"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-zinc-300">نص رسالة العرض البارد (Email Pitch Body):</label>
                  <button
                    onClick={handleCopyPitch}
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
                  </button>
                </div>
                <textarea
                  rows={8}
                  value={pitchBody}
                  onChange={(e) => setPitchBody(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 focus:border-emerald-500 focus:outline-none leading-relaxed font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleRunSimulation}
              className="w-full py-3 rounded-xl bg-emerald-500 text-black text-xs font-black hover:bg-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>إرسال العرض وتشغيل المحاكي التفاعلي 🚀</span>
            </button>
          </div>
        </div>

        {/* Simulation Output Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <h4 className="text-xs font-bold text-zinc-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>تقييم واستجابة مسؤول التسويق في الشركة:</span>
            </h4>
          </div>

          {!simulated ? (
            <div className="p-8 rounded-3xl border border-dashed border-zinc-800 bg-zinc-950 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                <Building2 className="w-6 h-6" />
              </div>
              <h5 className="text-sm font-bold text-zinc-400">بانتظار إرسال العرض...</h5>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed">
                اضغط على زر "تشغيل المحاكي" لمعرفة قرار مدير التسويق بشأن السعر ونوعية الجمهور.
              </p>
            </div>
          ) : result ? (
            <div className={`rounded-3xl border p-6 space-y-5 shadow-2xl ${
              result.accepted 
                ? 'bg-zinc-950 border-emerald-500/40 text-emerald-300' 
                : 'bg-zinc-950 border-amber-500/40 text-amber-300'
            }`}>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <span className="text-xs font-black">
                  {result.accepted ? '🟢 تم قبول العرض!' : '🟡 طلب تفاوض أو تعديل'}
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-zinc-900 text-white border border-zinc-800">
                  الميزانية: ${result.proposedBudget}
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-white">
                  {result.responseHeadline}
                </h4>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
                  {result.feedback}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-zinc-300 space-y-1.5">
                <strong className="text-emerald-400 block font-bold">🎯 الخطوة التالية المقترحة لإتمام الصفقة:</strong>
                <p className="leading-relaxed">{result.nextSteps}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
