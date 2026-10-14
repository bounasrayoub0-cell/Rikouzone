import React, { useState, useMemo } from 'react';
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Sliders, 
  ArrowRight, 
  BookOpen, 
  Search,
  Filter,
  Check,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { coachingNichePresets, CoachingNichePreset } from '../../data/coachingData';

export const CoachingNicheValidator: React.FC = () => {
  // Custom niche inputs
  const [customTitle, setCustomTitle] = useState<string>('تطوير مهارات الإقناع للمبيعات العقارية');
  const [customAudience, setCustomAudience] = useState<string>('الوسطاء العقاريون المبتدئون الذين يجدون صعوبة في إقناع المشترين');
  const [customPromise, setCustomPromise] = useState<string>('إتقان سكريبت إغلاق الصفقات وتحقيق أول عمولة بيع في 45 يوماً');

  // Sliders (1 to 10)
  const [problemSeverity, setProblemSeverity] = useState<number>(8);
  const [purchasingPower, setPurchasingPower] = useState<number>(9);
  const [outcomeTangibility, setOutcomeTangibility] = useState<number>(8);
  const [personalCredibility, setPersonalCredibility] = useState<number>(7);
  const [marketAccess, setMarketAccess] = useState<number>(8);

  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  // Load a preset
  const handleSelectPreset = (preset: CoachingNichePreset) => {
    setActivePresetId(preset.id);
    setCustomTitle(preset.title);
    setCustomAudience(preset.audience);
    setCustomPromise(preset.corePromise);
    setProblemSeverity(preset.problemSeverity);
    setPurchasingPower(preset.purchasingPower);
    setOutcomeTangibility(preset.outcomeTangibility);
    setPersonalCredibility(preset.personalCredibility);
    setMarketAccess(preset.marketAccess);
  };

  // Weighted Score calculation (out of 100)
  // Weights: Severity (2.5), Purchasing (2.5), Outcome (2.0), Credibility (1.5), Access (1.5)
  // Max possible: (10*2.5) + (10*2.5) + (10*2.0) + (10*1.5) + (10*1.5) = 25 + 25 + 20 + 15 + 15 = 100
  const validationScore = useMemo(() => {
    const raw = (problemSeverity * 2.5) +
      (purchasingPower * 2.5) +
      (outcomeTangibility * 2.0) +
      (personalCredibility * 1.5) +
      (marketAccess * 1.5);
    return Math.min(100, Math.round(raw));
  }, [problemSeverity, purchasingPower, outcomeTangibility, personalCredibility, marketAccess]);

  const scoreVerdict = useMemo(() => {
    if (validationScore >= 85) {
      return {
        label: 'تخصص ذهبي استثنائي (Elite Niche)',
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10 border-emerald-500/30',
        badgeColor: 'bg-emerald-500/20 text-emerald-300',
        action: 'تخصص عالي الربحية والطلب! ابدأ فوراً ببناء عرض الـ 4 أسابيع واستهداف العملاء على لينكد إن وإكس.',
        status: 'go'
      };
    } else if (validationScore >= 70) {
      return {
        label: 'تخصص واعد وقابل للربح (Strong Potential)',
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/10 border-amber-500/30',
        badgeColor: 'bg-amber-500/20 text-amber-300',
        action: 'الفكرة جيدة جداً، لكن حاول تضييق الشريحة أو ربط النتيجة بأرقام ومخرجات أكثر وضوحاً لرفع التسعير.',
        status: 'refine'
      };
    } else if (validationScore >= 55) {
      return {
        label: 'تخصص متوسط يحتاج إعادة ضبط (Needs Adjustment)',
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10 border-orange-500/30',
        badgeColor: 'bg-orange-500/20 text-orange-300',
        action: 'قد تعاني في البيع بسبب ضعف القدرة الشرائية للجمهور أو عدم إلحاح المشكلة؛ استهدف شريحة أكثر احترافية.',
        status: 'caution'
      };
    } else {
      return {
        label: 'فكرة غير مجدية للتدريب عالي القيمة (High Risk)',
        color: 'text-rose-400',
        bgColor: 'bg-rose-500/10 border-rose-500/30',
        badgeColor: 'bg-rose-500/20 text-rose-300',
        action: 'خطر! المشكلة عامة جداً أو العميل غير مستعد للدفع؛ أعد التفكير في مشكلة أخرى ترتبط بالمال أو التطور الوظيفي.',
        status: 'stop'
      };
    }
  }, [validationScore]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              <Target className="h-3.5 w-3.5" />
              <span>مُقيّم جدوى التخصص وعرض القيمة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              فحص تخصص التدريب وجاذبيته الشرائية
            </h2>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              قم بتقييم فكرة تخصصك التدريبي عبر 5 معايير تسويقية دقيقة لمعرفة هل الجمهور مستعد لدفع تذاكر مرتفعة أم أن الفكرة تحتاج لتعديل.
            </p>
          </div>

          {/* Quick Score Badge */}
          <div className="flex items-center gap-4 bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-white">
                {validationScore}<span className="text-sm text-zinc-500">/100</span>
              </div>
              <div className={`text-[11px] font-black mt-0.5 ${scoreVerdict.color}`}>
                {scoreVerdict.label}
              </div>
            </div>
          </div>
        </div>

        {/* Pre-seeded Niche Ideas */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>أفكار تخصصات مجربة للبدء السريع (انقر لتحميل الفكرة):</span>
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {coachingNichePresets.map((preset) => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3.5 rounded-xl border text-right transition-all group ${
                    isSelected 
                      ? 'bg-amber-500/15 border-amber-500/60 shadow-lg shadow-amber-500/10' 
                      : 'bg-zinc-950/60 border-zinc-800 hover:bg-zinc-800/40 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white group-hover:text-amber-400 transition-colors">
                      {preset.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300">
                      {preset.category}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {preset.corePromise}
                  </p>
                  <div className="mt-2 text-[10px] font-bold text-amber-400/90 flex items-center justify-between">
                    <span>التسعير: {preset.recommendedPricing}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-amber-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Editor & Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders & Fields */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-6 backdrop-blur-sm">
            <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-zinc-800/80 pb-3">
              <Sliders className="h-4 w-4 text-amber-400" />
              <span>معايير التقييم الخمسة (درجة من 1 إلى 10)</span>
            </h3>

            {/* Title & Audience */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">عنوان التخصص أو الخدمة</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => {
                    setCustomTitle(e.target.value);
                    setActivePresetId(null);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white focus:border-amber-500 outline-none"
                  placeholder="مثال: تدريب كتاب المحتوى على كتابة صفحات البيع المقنعة"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">الجمهور المستهدف بدقة (Who)</label>
                <input
                  type="text"
                  value={customAudience}
                  onChange={(e) => {
                    setCustomAudience(e.target.value);
                    setActivePresetId(null);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:border-amber-500 outline-none"
                  placeholder="من هو العميل الذي يعاني من هذه المشكلة؟"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">وعد التحول والنتيجة (Transformation Promise)</label>
                <input
                  type="text"
                  value={customPromise}
                  onChange={(e) => {
                    setCustomPromise(e.target.value);
                    setActivePresetId(null);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:border-amber-500 outline-none"
                  placeholder="ما هي النتيجة الملموسة التي سيخرج بها بعد 4-8 أسابيع؟"
                />
              </div>
            </div>

            {/* Slider 1: Problem Severity */}
            <div className="space-y-2 pt-2 border-t border-zinc-800/60">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-zinc-200">1. شدة وإلحاح المشكلة (Problem Urgency)</span>
                  <p className="text-[11px] text-zinc-400">هل تسبب خسارة مالية، أو تعطيلاً يومياً، أو ضياع فرص ثمينة؟</p>
                </div>
                <span className="font-black text-amber-400 text-sm px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800">
                  {problemSeverity} / 10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={problemSeverity}
                onChange={(e) => {
                  setProblemSeverity(Number(e.target.value));
                  setActivePresetId(null);
                }}
                className="w-full accent-amber-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 2: Purchasing Power */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-zinc-200">2. القدرة الشرائية للجمهور (Purchasing Power)</span>
                  <p className="text-[11px] text-zinc-400">هل العميل يملك دخلاً كافياً أو ميزانية بيزنس لدفع 500$-1,500$؟</p>
                </div>
                <span className="font-black text-amber-400 text-sm px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800">
                  {purchasingPower} / 10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={purchasingPower}
                onChange={(e) => {
                  setPurchasingPower(Number(e.target.value));
                  setActivePresetId(null);
                }}
                className="w-full accent-amber-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 3: Outcome Tangibility */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-zinc-200">3. وضوح النتيجة وإمكانية قياسها (Outcome Tangibility)</span>
                  <p className="text-[11px] text-zinc-400">هل يمكن معرفة ما إذا كان البرنامج قد نجح بالأرقام والمخرجات؟</p>
                </div>
                <span className="font-black text-amber-400 text-sm px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800">
                  {outcomeTangibility} / 10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={outcomeTangibility}
                onChange={(e) => {
                  setOutcomeTangibility(Number(e.target.value));
                  setActivePresetId(null);
                }}
                className="w-full accent-amber-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 4: Personal Credibility */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-zinc-200">4. المصداقية والخبرة الشخصية (Personal Credibility)</span>
                  <p className="text-[11px] text-zinc-400">هل حققت هذه النتيجة بنفسك سابقاً وتملك نظاماً مجرباً؟</p>
                </div>
                <span className="font-black text-amber-400 text-sm px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800">
                  {personalCredibility} / 10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={personalCredibility}
                onChange={(e) => {
                  setPersonalCredibility(Number(e.target.value));
                  setActivePresetId(null);
                }}
                className="w-full accent-amber-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 5: Market Access */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-zinc-200">5. سهولة الوصول للعملاء (Market Reachability)</span>
                  <p className="text-[11px] text-zinc-400">هل العميل متواجد بنشاط على LinkedIn أو X أو Instagram ويسهل مراسلته؟</p>
                </div>
                <span className="font-black text-amber-400 text-sm px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800">
                  {marketAccess} / 10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={marketAccess}
                onChange={(e) => {
                  setMarketAccess(Number(e.target.value));
                  setActivePresetId(null);
                }}
                className="w-full accent-amber-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Diagnostic Verdict & Tactical Advice */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`rounded-2xl border p-6 space-y-5 ${scoreVerdict.bgColor}`}>
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${scoreVerdict.badgeColor}`}>
                التشخيص النهائي
              </span>
              <span className="text-2xl font-black text-white">
                {validationScore}/100
              </span>
            </div>

            <div>
              <h4 className={`text-xl font-black ${scoreVerdict.color}`}>
                {scoreVerdict.label}
              </h4>
              <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                {scoreVerdict.action}
              </p>
            </div>

            {/* Summary details */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-3">
              <div className="text-xs">
                <span className="text-zinc-400 block font-bold">ملخص العرض المقترح:</span>
                <p className="text-white font-bold mt-1 leading-relaxed bg-zinc-950/70 p-3 rounded-xl border border-zinc-800">
                  «أساعد <span className="text-amber-400">{customAudience || '[جمهورك]'}</span> على <span className="text-emerald-400">{customPromise || '[النتيجة]'}</span> عبر برنامج توجيه فردي ومتابعة أسبوعية مركزة».
                </p>
              </div>

              {/* Strategic Next Step */}
              <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/90 space-y-2">
                <span className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>الخطوة التكتيكية التالية الموصى بها:</span>
                </span>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  {validationScore >= 75 ? (
                    'انتقل إلى قسم «مُصمم برامج التدريب» لتقسيم هذه الخدمة إلى 4 أسابيع، ثم أنشئ منشور دراسة حالة تجريبية لجلب أول عميلين.'
                  ) : (
                    'قم برفع وضوح النتيجة أو استهداف شريحة تمتلك قدرة مالية أفضل (مثل أصحاب الأعمال ورواد المشاريع بدلاً من الطلاب غير القادرين على الدفع).'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
