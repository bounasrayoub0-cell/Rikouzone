import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Sparkles, UserCheck, RefreshCw } from 'lucide-react';

interface SampleLead {
  title: string;
  phoneValid: boolean;
  inLocation: boolean;
  isOwner: boolean;
  specificIssue: boolean;
  urgentTimeline: boolean;
  readyForInspection: boolean;
}

const SAMPLE_LEADS: SampleLead[] = [
  {
    title: 'نموذج 1: مالك فيلا في حي النرجس (تسرب مياه نشط في السقف)',
    phoneValid: true,
    inLocation: true,
    isOwner: true,
    specificIssue: true,
    urgentTimeline: true,
    readyForInspection: true
  },
  {
    title: 'نموذج 2: مستأجر شقة (سؤال عام عن أرخص سعر لصيانة مكيف قديم)',
    phoneValid: true,
    inLocation: true,
    isOwner: false,
    specificIssue: false,
    urgentTimeline: false,
    readyForInspection: false
  },
  {
    title: 'نموذج 3: مالك مجمع سكني (يبحث عن معاينة وتجديد عزل بعد شهرين)',
    phoneValid: true,
    inLocation: true,
    isOwner: true,
    specificIssue: true,
    urgentTimeline: false,
    readyForInspection: true
  },
  {
    title: 'نموذج 4: رقم ناقص في مدينة أخرى (تسجيل خاطئ عبر الإنترنت)',
    phoneValid: false,
    inLocation: false,
    isOwner: true,
    specificIssue: true,
    urgentTimeline: true,
    readyForInspection: false
  }
];

export const LeadQualificationScorer: React.FC = () => {
  const [phoneValid, setPhoneValid] = useState<boolean>(true);
  const [inLocation, setInLocation] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(true);
  const [specificIssue, setSpecificIssue] = useState<boolean>(true);
  const [urgentTimeline, setUrgentTimeline] = useState<boolean>(true);
  const [readyForInspection, setReadyForInspection] = useState<boolean>(true);

  // Score Calculation
  let score = 0;
  if (phoneValid) score += 25;
  if (inLocation) score += 20;
  if (isOwner) score += 20;
  if (specificIssue) score += 15;
  if (urgentTimeline) score += 10;
  if (readyForInspection) score += 10;

  // Status & Recommendation
  let status: 'qualified' | 'warm' | 'rejected' = 'rejected';
  let statusText = 'فرصة غير مؤهلة (تُستبعد من الفاتورة)';
  let statusColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  let advice = 'الطلب يفتقد لعناصر جوهرية (مثل صحة الرقم أو النطاق الجغرافي أو موافقة المالك)؛ لا ترسل هذا الطلب للشركة الشريكة حتى لا تُهدر وقتها.';

  if (!phoneValid || !inLocation) {
    status = 'rejected';
    statusText = 'مرفوضة فوراً لخلل في الاتصال أو التغطية';
  } else if (score >= 80) {
    status = 'qualified';
    statusText = 'فرصة ساخنة ومؤهلة بنجاح (Hot Qualified Lead)';
    statusColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    advice = 'الفرصة متكاملة ومستوفية لكافة المعايير؛ سلمها فوراً لمسؤول مبيعات الشركة الشريكة عبر واتساب واحتسبها ضمن الفاتورة الأسبوعية.';
  } else if (score >= 50) {
    status = 'warm';
    statusText = 'فرصة دافئة تحتاج لتأكيد مسبق (Warm Lead)';
    statusColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    advice = 'العميل مهتم لكنه يحتاج مكالمة تأهيل وتأكيد توقيت المعاينة أو التأكد من إذن المالك قبل تسليمه كطلب فوري للمقاول.';
  }

  const applySample = (sample: SampleLead) => {
    setPhoneValid(sample.phoneValid);
    setInLocation(sample.inLocation);
    setIsOwner(sample.isOwner);
    setSpecificIssue(sample.specificIssue);
    setUrgentTimeline(sample.urgentTimeline);
    setReadyForInspection(sample.readyForInspection);
  };

  const resetAll = () => {
    setPhoneValid(true);
    setInLocation(true);
    setIsOwner(true);
    setSpecificIssue(true);
    setUrgentTimeline(true);
    setReadyForInspection(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-right" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900/90 via-zinc-900/50 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
          <UserCheck className="h-3.5 w-3.5" />
          <span>الدرس 8: نموذج تأهيل العميل المحتمل (Lead Scoring Matrix)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          أداة فحص وتأهيل الفرص البيعية قبل التسليم للشركات
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
          وظيفتك الأساسية التي تجعل المقاولين يدفعون لك بسخاء هي فحص وتصفية الطلبات الواردة والتأكد من مطابقتها لمعايير الجدية والموقع؛ جرب معايير التأهيل على أي طلب وارد.
        </p>

        {/* Sample Leads Buttons */}
        <div className="pt-3 border-t border-zinc-800/80">
          <div className="text-xs font-bold text-zinc-400 mb-2 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>نماذج واقعية لاختبار آلية التأهيل:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_LEADS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => applySample(s)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-cyan-500/50 transition-all cursor-pointer"
              >
                {s.title}
              </button>
            ))}
            <button
              onClick={resetAll}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-zinc-300 transition-all flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              <span>إعادة ضبط</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Checklist Inputs (Span 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-zinc-800 pb-3 flex items-center justify-between">
              <span>معايير الفحص والتصفية الستة:</span>
              <span className="text-xs font-mono text-cyan-400 font-bold">{score} / 100 نقطة</span>
            </h3>

            {/* Item 1 */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 cursor-pointer hover:border-zinc-700 transition-all">
              <input
                type="checkbox"
                checked={phoneValid}
                onChange={(e) => setPhoneValid(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-cyan-500 focus:ring-0 cursor-pointer"
              />
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>1. صحة رقم الهاتف والاسم (25 نقطة)</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">شرط إلزامي</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  رقم الهاتف مكتمل، شغال، متاح على واتساب أو أرسل كود تأكيد OTP صحيح.
                </p>
              </div>
            </label>

            {/* Item 2 */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 cursor-pointer hover:border-zinc-700 transition-all">
              <input
                type="checkbox"
                checked={inLocation}
                onChange={(e) => setInLocation(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-cyan-500 focus:ring-0 cursor-pointer"
              />
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>2. النطاق الجغرافي داخل تغطية المقاول (20 نقطة)</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">شرط إلزامي</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  العقار يقع في الأحياء والمدينة التي تغطيها الشركة الشريكة فعلياً.
                </p>
              </div>
            </label>

            {/* Item 3 */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 cursor-pointer hover:border-zinc-700 transition-all">
              <input
                type="checkbox"
                checked={isOwner}
                onChange={(e) => setIsOwner(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-cyan-500 focus:ring-0 cursor-pointer"
              />
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white">
                  3. صفة العميل: مالك العقار أو صانع القرار المباشر (20 نقطة)
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  العميل يملك العقار أو مفوض رسمياً باتخاذ قرار الترميم والموافقة على التكلفة.
                </p>
              </div>
            </label>

            {/* Item 4 */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 cursor-pointer hover:border-zinc-700 transition-all">
              <input
                type="checkbox"
                checked={specificIssue}
                onChange={(e) => setSpecificIssue(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-cyan-500 focus:ring-0 cursor-pointer"
              />
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white">
                  4. وضوح تفاصيل المشكلة أو الخدمة المطلوبة (15 نقطة)
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  العميل حدد نوع المشكلة بدقة (مساحة السطح، وجود تسرب مائي نشط، نوع المكيفات).
                </p>
              </div>
            </label>

            {/* Item 5 */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 cursor-pointer hover:border-zinc-700 transition-all">
              <input
                type="checkbox"
                checked={urgentTimeline}
                onChange={(e) => setUrgentTimeline(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-cyan-500 focus:ring-0 cursor-pointer"
              />
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white">
                  5. الجاهزية والتوقيت الزمني القريب (10 نقاط)
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  العميل يرغب في فحص ومعاينة فورية خلال أسبوع إلى أسبوعين وليس بعد سنة.
                </p>
              </div>
            </label>

            {/* Item 6 */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 cursor-pointer hover:border-zinc-700 transition-all">
              <input
                type="checkbox"
                checked={readyForInspection}
                onChange={(e) => setReadyForInspection(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-cyan-500 focus:ring-0 cursor-pointer"
              />
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white">
                  6. الاستعداد لاستقبال زيارة المعاينة الفنية (10 نقاط)
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  العميل صرح باستعداده لحضور مهندس الفحص وتقديم عرض السعر الدقيق.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Qualification Verdict (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>نتيجة تقييم الطلب وقرار التسليم</span>
            </h3>

            {/* Big Score Card */}
            <div className={`p-6 rounded-2xl border ${statusColor} space-y-2 text-center`}>
              <div className="text-4xl font-black font-mono">{score} / 100</div>
              <div className="text-xs font-bold pt-1">{statusText}</div>
            </div>

            {/* Recommendation guidance */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="text-xs font-bold text-zinc-200">التوجيه الإجرائي الموصى به:</div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {advice}
              </p>
            </div>

            {/* Dispatch Rules */}
            <div className="space-y-2 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80">
              <div className="font-bold text-zinc-300 mb-1">قواعد الاحتساب في الفاتورة:</div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>الدرجة ≥ 80: تُرسل للمقاول فوراً وتُفوتر بالكامل.</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>الدرجة 50 - 75: تتطلب مكالمة تأكيد سريعة من فريقك أولاً.</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                <span>الدرجة &lt; 50: تُستبعد وتُستبدل مجاناً إذا أُرسلت بالخطأ.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
