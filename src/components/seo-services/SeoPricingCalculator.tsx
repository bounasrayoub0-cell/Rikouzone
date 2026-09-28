import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Copy, 
  Check, 
  Sliders, 
  Sparkles, 
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

interface SeoPricingCalculatorProps {
  onCopyText: (text: string, label: string) => void;
}

export const SeoPricingCalculator: React.FC<SeoPricingCalculatorProps> = ({ onCopyText }) => {
  const [model, setModel] = useState<'retainer' | 'audit' | 'hourly' | 'project'>('retainer');
  const [monthlyHours, setMonthlyHours] = useState<number>(20);
  const [hourlyTargetRate, setHourlyTargetRate] = useState<number>(35); // $35/hr
  const [competitionLevel, setCompetitionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [includeContent, setIncludeContent] = useState<boolean>(true);
  const [articlesCount, setArticlesCount] = useState<number>(3);
  const [includeLocalGmb, setIncludeLocalGmb] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Cost calculation
  const competitionMultiplier = competitionLevel === 'high' ? 1.3 : competitionLevel === 'medium' ? 1.0 : 0.85;
  const contentCost = includeContent ? articlesCount * 60 : 0;
  const localGmbCost = includeLocalGmb ? 150 : 0;

  // Retainer calculation
  const baseLabor = monthlyHours * hourlyTargetRate;
  const suggestedRetainer = Math.round((baseLabor + contentCost + (includeLocalGmb ? 50 : 0)) * competitionMultiplier);

  // One-time audit calculation
  const auditHours = 8;
  const suggestedAuditPrice = Math.round(auditHours * hourlyTargetRate * competitionMultiplier);

  // Project calculation
  const projectBase = Math.round((baseLabor * 1.5 + contentCost + localGmbCost) * competitionMultiplier);

  const getProposalSummary = () => {
    if (model === 'retainer') {
      return `عرض السعر المقترح للعقد الشهري (Monthly Retainer):
- الباقة المقترحة: إدارة سيو متكاملة وتحسين مستمر
- ساعات العمل المخصصة: ${monthlyHours} ساعة شهرياً
- القيمة الشهرية المقترحة: $${suggestedRetainer} / شهرياً
- تتضمن:
  * التحسين التقني المستمر وحل مشاكل الفهرسة
  * On-Page SEO لأهم صفحات الخدمات
  ${includeContent ? `* كتابة ونشر ${articlesCount} مقالات سيو شهرية متخصصة` : ''}
  ${includeLocalGmb ? '* إدارة وتحديث الملف التجاري على خرائط جوجل' : ''}
  * تقرير شهري تفاعلي مع مكالمة مراجعة الأداء`;
    }
    if (model === 'audit') {
      return `عرض سعر فحص وتدقيق الموقع الشامل (Comprehensive SEO Audit):
- المخرجات: تقرير PDF مفصل + فيديو Loom شرح 10 دقائق + خطة عمل لـ 30 يوماً
- الوقت المستغرق: 6 إلى 8 ساعات فحص دقيق
- القيمة الاستثمارية (دفعة واحدة): $${suggestedAuditPrice}
- النتيجة: كشف كافة الثغرات الفنية والفرص التي تمنع موقعكم من الصفحة الأولى.`;
    }
    return `عرض سعر المشروع المحدد (Project SEO Package):
- نطاق العمل: تحسين شامل للأساسات والمحتوى
- القيمة الإجمالية للمشروع: $${projectBase}
- شروط السداد: 50% مقدماً عند توقيع العقد، و50% عند تسليم المشروع بالكامل.`;
  };

  const handleCopyProposal = () => {
    const text = getProposalSummary();
    onCopyText(text, 'عرض السعر وحساب التكلفة');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Calculator className="h-4 w-4" />
            <span>حاسبة تسعير خدمات السيو وتقدير الأرباح</span>
          </div>
          <h3 className="mt-1 text-2xl font-black text-white">
            حاسبة تسعير الخدمات والعقود الشهرية (Pricing Calculator)
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            حدد ساعات عملك ومستوى المنافسة والخدمات الإضافية لتعرف السعر العادل والرابح الذي يمكنك طلبه من العميل.
          </p>
        </div>

        <button
          onClick={handleCopyProposal}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-black text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all shrink-0"
        >
          {copied ? <Check className="h-4 w-4 stroke-[3]" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'تم نسخ العرض المقترح!' : 'نسخ ملخص التسعير للعميل'}</span>
        </button>
      </div>

      {/* Pricing Models Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800">
        {[
          { id: 'retainer', label: 'العقد الشهري المستمر (Retainer)', badge: 'الأكثر ربحية ⭐' },
          { id: 'audit', label: 'فحص الموقع لمرة واحدة (Audit)', badge: 'بوابة الدخول' },
          { id: 'project', label: 'باقة مشروع محدد (Project)', badge: 'دفعة واحدة' },
          { id: 'hourly', label: 'السعر بالساعة (Hourly)', badge: 'استشارات' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setModel(tab.id as any)}
            className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
              model === tab.id
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
              model === tab.id ? 'bg-black/20 text-black' : 'bg-zinc-800 text-amber-400'
            }`}>
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Controls & Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Sliders & Options */}
        <div className="space-y-6">
          {/* Target Hourly Rate */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300">
                سعر ساعتك المستهدف (Hourly Rate):
              </label>
              <span className="text-base font-black text-amber-400 font-sans">
                ${hourlyTargetRate} / ساعة
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="100"
              step="5"
              value={hourlyTargetRate}
              onChange={(e) => setHourlyTargetRate(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-zinc-500 font-sans">
              <span>$15/h (مبتدئ جداً)</span>
              <span>$35/h (متوسط معقول)</span>
              <span>$75+/h (محترف متمكن)</span>
            </div>
          </div>

          {/* Monthly Hours (if retainer/project) */}
          {(model === 'retainer' || model === 'project') && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300">
                  عدد ساعات العمل المخصصة لهذا العميل:
                </label>
                <span className="text-base font-black text-amber-400 font-sans">
                  {monthlyHours} ساعة {model === 'retainer' ? 'شهرياً' : 'إجمالي'}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={monthlyHours}
                onChange={(e) => setMonthlyHours(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 font-sans">
                <span>10 ساعات (صيانة خفيفة)</span>
                <span>20-30 ساعة (نمو نشط)</span>
                <span>50+ ساعة (عميل VIP)</span>
              </div>
            </div>
          )}

          {/* Competition Level */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 space-y-3">
            <label className="text-xs font-bold text-zinc-300 block">
              مستوى المنافسة في نيتش العميل:
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'low', label: 'منخفضة (مدينة صغيرة)', mult: '0.85x' },
                { id: 'medium', label: 'متوسطة (منافسة طبيعية)', mult: '1.0x' },
                { id: 'high', label: 'شديدة (مدن كبرى / عواصم)', mult: '1.3x' }
              ].map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => setCompetitionLevel(comp.id as any)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    competitionLevel === comp.id
                      ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-xs">{comp.label}</div>
                  <div className="text-[10px] text-amber-400/80 mt-1 font-mono">{comp.mult}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons (Content & Maps) */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 space-y-4">
            <label className="text-xs font-bold text-zinc-300 block">
              الخدمات الإضافية المضمنة في الباقة:
            </label>

            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-300 font-semibold select-none">
                <input
                  type="checkbox"
                  checked={includeContent}
                  onChange={(e) => setIncludeContent(e.target.checked)}
                  className="rounded border-zinc-700 text-amber-500 focus:ring-amber-500"
                />
                <span>كتابة مقالات سيو شهرية متخصصة</span>
              </label>

              {includeContent && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-mono">العدد:</span>
                  <select
                    value={articlesCount}
                    onChange={(e) => setArticlesCount(Number(e.target.value))}
                    className="rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-amber-400 font-bold focus:outline-none"
                  >
                    <option value={2}>2 مقال ($120)</option>
                    <option value={3}>3 مقالات ($180)</option>
                    <option value={4}>4 مقالات ($240)</option>
                    <option value={6}>6 مقالات ($360)</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 pt-2 border-t border-zinc-900">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-300 font-semibold select-none">
                <input
                  type="checkbox"
                  checked={includeLocalGmb}
                  onChange={(e) => setIncludeLocalGmb(e.target.checked)}
                  className="rounded border-zinc-700 text-amber-500 focus:ring-amber-500"
                />
                <span>إدارة ملف خرائط جوجل Google Business Profile</span>
              </label>
              <span className="text-xs font-bold text-amber-400">+$50/شهرياً</span>
            </div>
          </div>
        </div>

        {/* Right: Calculated Price Summary Cards */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-zinc-950/80 to-zinc-950 p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-amber-500/10 rounded-full blur-2xl" />

            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                السعر الموصى به للعميل:
              </span>
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-[11px] font-black text-amber-300 border border-amber-500/30">
                تسعير احترافي رابح
              </span>
            </div>

            <div className="relative z-10">
              <div className="text-4xl sm:text-5xl font-black text-white font-sans tracking-tight">
                ${model === 'retainer'
                  ? suggestedRetainer
                  : model === 'audit'
                  ? suggestedAuditPrice
                  : model === 'project'
                  ? projectBase
                  : hourlyTargetRate}
                <span className="text-xl font-bold text-zinc-400 font-sans mr-2">
                  {model === 'retainer' ? '/ شهرياً' : model === 'hourly' ? '/ ساعة' : ' دفعة واحدة'}
                </span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">
                {model === 'retainer'
                  ? `بناءً على ${monthlyHours} ساعة شهرياً مع معدل ربح أمان 25% لحماية وقتك.`
                  : model === 'audit'
                  ? 'سعر مناسب جداً لموقع يضم حتى 50 صفحة مع فيديو Loom احترافي.'
                  : 'يشمل تكلفة العمل المباشر وضمان متابعة لمدة 30 يوماً بعد التسليم.'}
              </p>
            </div>

            {/* Income Projections */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800/80 relative z-10">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                <div className="text-[11px] font-bold text-zinc-400">الدخل مع 3 عملاء</div>
                <div className="text-lg font-black text-emerald-400 font-sans mt-0.5">
                  ${(model === 'retainer' ? suggestedRetainer : suggestedAuditPrice) * 3}
                  <span className="text-xs text-zinc-500 mr-1">/ شهر</span>
                </div>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                <div className="text-[11px] font-bold text-zinc-400">الدخل مع 5 عملاء</div>
                <div className="text-lg font-black text-amber-400 font-sans mt-0.5">
                  ${(model === 'retainer' ? suggestedRetainer : suggestedAuditPrice) * 5}
                  <span className="text-xs text-zinc-500 mr-1">/ شهر</span>
                </div>
              </div>
            </div>

            {/* Rule of thumb advice */}
            <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-4 text-xs text-zinc-300 leading-relaxed space-y-2">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Info className="h-4 w-4" />
                <span>قاعدة التفاوض الذكية للمبتدئ:</span>
              </div>
              <p>
                لا تقل للعميل سعراً قطعياً واحداً! اعرض عليه دائماً باقتين: مثلاً باقة أساسية بـ ${Math.round(suggestedRetainer * 0.75)} وباقة كاملة بـ ${suggestedRetainer}. هذا يوجه تفكيره من "هل أشتري أم لا؟" إلى "أي باقة أختار؟".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
