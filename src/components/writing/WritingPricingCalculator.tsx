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
  Info,
  BookOpen
} from 'lucide-react';

interface WritingPricingCalculatorProps {
  onCopyText: (text: string, label: string) => void;
}

export const WritingPricingCalculator: React.FC<WritingPricingCalculatorProps> = ({ onCopyText }) => {
  const [model, setModel] = useState<'per-article' | 'per-word' | 'retainer' | 'hourly'>('per-article');
  const [wordCount, setWordCount] = useState<number>(1200);
  const [ratePerWord, setRatePerWord] = useState<number>(0.05); // $0.05 / word
  const [researchDepth, setResearchDepth] = useState<'basic' | 'medium' | 'deep'>('medium');
  const [isRush, setIsRush] = useState<boolean>(false);
  const [articlesPerMonth, setArticlesPerMonth] = useState<number>(4);
  const [hourlyRate, setHourlyRate] = useState<number>(30); // $30/hr
  const [estimatedHours, setEstimatedHours] = useState<number>(4);
  const [copied, setCopied] = useState<boolean>(false);

  // Multipliers
  const researchMultiplier = researchDepth === 'deep' ? 1.3 : researchDepth === 'medium' ? 1.0 : 0.85;
  const rushMultiplier = isRush ? 1.4 : 1.0;

  // Calculations
  const calculatedPerArticle = Math.round(wordCount * ratePerWord * researchMultiplier * rushMultiplier);
  const calculatedPerWordEquivalent = (calculatedPerArticle / wordCount).toFixed(3);
  const calculatedRetainer = Math.round(calculatedPerArticle * articlesPerMonth * 0.85); // 15% discount for monthly retainer
  const calculatedHourly = Math.round(hourlyRate * estimatedHours * rushMultiplier);

  const getProposalSummary = () => {
    if (model === 'retainer') {
      return `عرض السعر المقترح للباقة الشهرية لكتابة المحتوى (Monthly Retainer):
- الباقة: ${articlesPerMonth} مقالات سيو متخصصة شهرياً
- حجم كل مقال: ما يقارب ${wordCount} كلمة
- مستوى البحث: ${researchDepth === 'deep' ? 'بحث معمق ومصادر إحصائية متقدمة' : 'بحث وتدقيق مصادر موثوقة'}
- المخرجات لكل مقال: عنوان سيو جذاب + وصف ميتة + وسوم H2/H3 + جولة تعديلات مجانية
- القيمة الشهرية المقترحة: $${calculatedRetainer} / شهرياً (مع خصم 15% لالتزام العقد الشهري)
- موعد التسليم: مقال كل أسبوع بانتظام`;
    }
    if (model === 'per-article') {
      return `عرض سعر كتابة المقال الفردي (Per-Article Quote):
- نوع المقال: مقال سيو متخصص ومتوافق مع محركات البحث
- حجم المقال: ${wordCount} كلمة
- المخرجات: المقال كاملاً منسقاً مع العناوين والروابط والمصادر الموثقة + وصف الميتة
- مدة التسليم: ${isRush ? 'خلال 24-36 ساعة (تسليم سريع)' : 'خلال 3 أيام عمل'}
- القيمة الاستثمارية: $${calculatedPerArticle}
- شروط السداد: 50% مقدماً، و50% عند تسليم المسودة النهائية المعتمدة.`;
    }
    if (model === 'hourly') {
      return `عرض سعر العمل بالساعة (Hourly Writing & Consulting):
- نوع الخدمة: تحرير، استشارة، أو كتابة مخصصة
- الوقت المقدر: ${estimatedHours} ساعات
- سعر الساعة: $${hourlyRate} / ساعة
- الإجمالي المتوقع: $${calculatedHourly}`;
    }
    return `عرض السعر بنظام الحساب لكل كلمة (Per-Word Rate):
- عدد الكلمات: ${wordCount} كلمة
- سعر الكلمة: $${ratePerWord} / كلمة
- الإجمالي: $${Math.round(wordCount * ratePerWord * rushMultiplier)}`;
  };

  const handleCopyProposal = () => {
    const text = getProposalSummary();
    onCopyText(text, 'عرض سعر كتابة المحتوى');
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
            <span>حاسبة تسعير خدمات الكتابة والمقالات</span>
          </div>
          <h3 className="mt-1 text-2xl font-black text-white">
            حاسبة تسعير المقالات والعقود الشهرية (Writing Rate Calculator)
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            حدد عدد الكلمات، عمق البحث، ونموذج العمل لتقدير الأجر العادل لمقالك وتوليد عرض سعر جاهز للإرسال للعميل.
          </p>
        </div>

        <button
          onClick={handleCopyProposal}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-black text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all shrink-0"
        >
          {copied ? <Check className="h-4 w-4 stroke-[3]" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'تم نسخ العرض المقترح!' : 'نسخ عرض السعر للعميل'}</span>
        </button>
      </div>

      {/* Model Selection Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800">
        {[
          { id: 'per-article', label: 'سعر المقال الفردي (Per Article)', badge: 'الأكثر شيوعاً ⭐' },
          { id: 'retainer', label: 'العقد الشهري (Monthly Retainer)', badge: 'دخل مستقر' },
          { id: 'per-word', label: 'السعر لكل كلمة (Per Word)', badge: 'صحفي / ترجمة' },
          { id: 'hourly', label: 'السعر بالساعة (Hourly)', badge: 'تحرير واستشارات' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setModel(tab.id as any)}
            className={`flex-1 min-w-[170px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
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

      {/* Interactive Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Inputs */}
        <div className="space-y-6">
          {/* Word Count Slider */}
          {(model === 'per-article' || model === 'per-word' || model === 'retainer') && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300">
                  عدد كلمات المقال المطلوب (Word Count):
                </label>
                <span className="text-base font-black text-amber-400 font-sans">
                  {wordCount.toLocaleString()} كلمة
                </span>
              </div>
              <input
                type="range"
                min="400"
                max="3500"
                step="100"
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 font-sans">
                <span>500 كلمة (مقال قصير)</span>
                <span>1,200 كلمة (مقال سيو قياسي)</span>
                <span>3,000 كلمة (دليل شامل)</span>
              </div>
            </div>
          )}

          {/* Rate per word slider */}
          {(model === 'per-article' || model === 'per-word' || model === 'retainer') && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300">
                  سعر الكلمة الأساسي (Base Rate):
                </label>
                <span className="text-base font-black text-amber-400 font-sans">
                  ${ratePerWord.toFixed(2)} / كلمة
                </span>
              </div>
              <input
                type="range"
                min="0.02"
                max="0.20"
                step="0.01"
                value={ratePerWord}
                onChange={(e) => setRatePerWord(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 font-sans">
                <span>$0.03 (مبتدئ مناسب)</span>
                <span>$0.06 - $0.08 (متوسط متمرس)</span>
                <span>$0.15+ (خبير متخصص)</span>
              </div>
            </div>
          )}

          {/* If Monthly Retainer: Articles Count Slider */}
          {model === 'retainer' && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300">
                  عدد المقالات شهرياً في باقة العقد:
                </label>
                <span className="text-base font-black text-amber-400 font-sans">
                  {articlesPerMonth} مقالات / شهر
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={articlesPerMonth}
                onChange={(e) => setArticlesPerMonth(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 font-sans">
                <span>2 مقال (نصف شهري)</span>
                <span>4 مقالات (مقال أسبوعياً)</span>
                <span>8 مقالات (نشر مكثف)</span>
              </div>
            </div>
          )}

          {/* If Hourly Rate */}
          {model === 'hourly' && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-300">سعر ساعتك:</label>
                  <span className="text-sm font-black text-amber-400 font-sans">${hourlyRate}/h</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="80"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-300">الساعات المقدرة للمشروع:</label>
                  <span className="text-sm font-black text-amber-400 font-sans">{estimatedHours} ساعات</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Research Depth */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 space-y-3">
            <label className="text-xs font-bold text-zinc-300 block">
              عمق البحث والمصادر المطلوبة:
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'basic', label: 'عام وسريع', sub: 'بدون مصادر معقدة (0.85x)' },
                { id: 'medium', label: 'متوسط وموثق', sub: '3+ مصادر موثوقة (1.0x)' },
                { id: 'deep', label: 'معمق ودراسات', sub: 'إحصائيات SaaS/طبية (1.3x)' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setResearchDepth(item.id as any)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    researchDepth === item.id
                      ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-xs">{item.label}</div>
                  <div className="text-[10px] text-zinc-500 mt-1">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Rush Fee Toggle */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 flex items-center justify-between">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-300 font-bold select-none">
              <input
                type="checkbox"
                checked={isRush}
                onChange={(e) => setIsRush(e.target.checked)}
                className="rounded border-zinc-700 text-amber-500 focus:ring-amber-500"
              />
              <span>تسليم عاجل وفوري خلال 24 - 36 ساعة (Rush Order)</span>
            </label>
            <span className="text-xs font-black text-amber-400 font-mono">+40% رسوم استعجال</span>
          </div>
        </div>

        {/* Right Price Display Card */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-zinc-950/80 to-zinc-950 p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-amber-500/10 rounded-full blur-2xl" />

            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                السعر العادل الموصى به:
              </span>
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-[11px] font-black text-amber-300 border border-amber-500/30">
                تسعير احترافي رابح
              </span>
            </div>

            <div className="relative z-10">
              <div className="text-4xl sm:text-5xl font-black text-white font-sans tracking-tight">
                ${model === 'retainer'
                  ? calculatedRetainer
                  : model === 'per-article'
                  ? calculatedPerArticle
                  : model === 'hourly'
                  ? calculatedHourly
                  : Math.round(wordCount * ratePerWord * rushMultiplier)}
                <span className="text-xl font-bold text-zinc-400 font-sans mr-2">
                  {model === 'retainer' ? '/ شهرياً' : model === 'hourly' ? '/ إجمالي' : ' للمقال'}
                </span>
              </div>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                {model === 'retainer'
                  ? `باقة تشمل ${articlesPerMonth} مقالات شهرية بمجموع ${(wordCount * articlesPerMonth).toLocaleString()} كلمة مع خصم ولاء 15%.`
                  : model === 'per-article'
                  ? `بما يعادل ما يقارب $${calculatedPerWordEquivalent} لكل كلمة مع احتساب التدقيق والمصادر.`
                  : 'يحسب بناءً على ساعات العمل التقديرية والتسليم المتفق عليه.'}
              </p>
            </div>

            {/* Income Projections */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800/80 relative z-10">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                <div className="text-[11px] font-bold text-zinc-400">
                  {model === 'retainer' ? 'دخل 3 عملاء شهرياً' : 'دخل كتابة 8 مقالات'}
                </div>
                <div className="text-lg font-black text-emerald-400 font-sans mt-0.5">
                  ${model === 'retainer' ? calculatedRetainer * 3 : calculatedPerArticle * 8}
                  <span className="text-xs text-zinc-500 mr-1">/ شهر</span>
                </div>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                <div className="text-[11px] font-bold text-zinc-400">
                  {model === 'retainer' ? 'دخل 5 عملاء شهرياً' : 'دخل كتابة 15 مقالاً'}
                </div>
                <div className="text-lg font-black text-amber-400 font-sans mt-0.5">
                  ${model === 'retainer' ? calculatedRetainer * 5 : calculatedPerArticle * 15}
                  <span className="text-xs text-zinc-500 mr-1">/ شهر</span>
                </div>
              </div>
            </div>

            {/* Advice Callout */}
            <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-4 text-xs text-zinc-300 leading-relaxed space-y-2 relative z-10">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Info className="h-4 w-4" />
                <span>قاعدة تسعير الكاتب الذكي:</span>
              </div>
              <p>
                لا تبع "كلمات خام"! العميل لا يشتري أحرفاً في مستند، بل يشتري مقالاً يحل مشكلة زواره ويوفر عليه ساعات من البحث والتدقيق. عندما تشرح للعميل أن سعرك يتضمن البحث والتنسيق ووصف الميتة وجولة تعديل مجانية، سيبدو سعرك عادلاً ومغرياً جداً.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
