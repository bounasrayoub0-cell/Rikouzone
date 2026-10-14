import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertTriangle, Sparkles, Building2, HelpCircle, ChevronLeft } from 'lucide-react';

interface NicheItem {
  id: string;
  name: string;
  category: string;
  avgJobValue: number; // $
  leadPricePotential: number; // $
  urgencyScore: number; // 1-10
  targetingEase: number; // 1-10
  b2bReadiness: number; // 1-10
  competitionLevel: 'منخفض' | 'متوسط' | 'مرتفع';
  idealCustomer: string;
  keyQuestion: string;
  verdict: string;
}

const DEFAULT_NICHES: NicheItem[] = [
  {
    id: 'roofing',
    name: 'عزل الأسطح وكشف التسربات المائية',
    category: 'المقاولات والترميم',
    avgJobValue: 1200,
    leadPricePotential: 50,
    urgencyScore: 9,
    targetingEase: 8,
    b2bReadiness: 9,
    competitionLevel: 'متوسط',
    idealCustomer: 'مالك فيلا أو عمارة سكنية يعاني من رطوبة الأسقف أو يستعد لموسم الأمطار.',
    keyQuestion: 'هل العقار ملك شخصي أم إيجار؟ وما هي مساحة السطح بالمتر المربع؟',
    verdict: 'قطاع ممتاز جداً بهوامش ربح مرتفعة واستعداد كبير من المقاولين لشراء الفرص بانتظام.'
  },
  {
    id: 'hvac',
    name: 'صيانة وتوريد التكييف المركزي والسبليت',
    category: 'الخدمات المنزلية الفنية',
    avgJobValue: 650,
    leadPricePotential: 35,
    urgencyScore: 10,
    targetingEase: 9,
    b2bReadiness: 8,
    competitionLevel: 'مرتفع',
    idealCustomer: 'أصحاب منازل أو مكاتب تعطل مكيفهم فجأة في الصيف أو يحتاجون تنظيفاً دورياً شاملاً.',
    keyQuestion: 'كم عدد الوحدات المتعطلة؟ وهل المشكلة تسريب فريون أم توقف تام عن التبريد؟',
    verdict: 'طلب ملح جداً في فترات الصيف والحر؛ نسبة إغلاق الصفقات سريعة وفورية للمقاولين.'
  },
  {
    id: 'dental',
    name: 'زراعة وتقويم الأسنان وابتسامة هوليود',
    category: 'الرعاية الصحية والتجميل',
    avgJobValue: 1800,
    leadPricePotential: 60,
    urgencyScore: 6,
    targetingEase: 7,
    b2bReadiness: 9,
    competitionLevel: 'مرتفع',
    idealCustomer: 'أشخاص يبحثون عن حلول تجميلية أو علاجية دائمة ولديهم القدرة المالية على التقسيط أو الكاش.',
    keyQuestion: 'هل قمت بزيارة طبيب أسنان خلال آخر 6 أشهر؟ وما هو الإجراء المطلوب تحديداً؟',
    verdict: 'قيمة صفقات ضخمة جداً؛ تحتاج إلى فلترة دقيقة للأشخاص الجادين لتجنب إضاعة وقت العيادات.'
  },
  {
    id: 'moving',
    name: 'نقل العفش وتخزين الأثاث مع الفك والتركيب',
    category: 'الخدمات اللوجستية المحلية',
    avgJobValue: 350,
    leadPricePotential: 22,
    urgencyScore: 8,
    targetingEase: 9,
    b2bReadiness: 7,
    competitionLevel: 'مرتفع',
    idealCustomer: 'عائلات أو شركات تنتقل إلى حي جديد أو مدينة مجاورة وتحتاج لضمان سلامة الأثاث.',
    keyQuestion: 'ما هو موعد الانتقال المحدد؟ ومن أي حي إلى أي حي سيتم النقل؟',
    verdict: 'دورة قرار سريعة ولكن المنافسة في الأسعار عالية؛ ركز على شركات النقل التي تقدم خدمات راقية بضمان.'
  },
  {
    id: 'solar',
    name: 'تركيب أنظمة الطاقة الشمسية المنزلية',
    category: 'الطاقة والتكنولوجيا الخضراء',
    avgJobValue: 4500,
    leadPricePotential: 90,
    urgencyScore: 5,
    targetingEase: 6,
    b2bReadiness: 9,
    competitionLevel: 'منخفض',
    idealCustomer: 'أصحاب فيلات ومزارع ومصانع يعانون من فواتير كهرباء باهظة شهرياً.',
    keyQuestion: 'كم يبلغ متوسط فاتورة الكهرباء الشهرية لديك؟ وهل السطح خرساني ومتاح للتركيب؟',
    verdict: 'أعلى عمولات لكل فرصة مقبولة ولكن دورة المبيعات تستغرق وقتاً أطول للفحص والتركيب.'
  }
];

export const LeadNicheComparator: React.FC = () => {
  const [niches, setNiches] = useState<NicheItem[]>(DEFAULT_NICHES);
  const [selectedNicheId, setSelectedNicheId] = useState<string>(DEFAULT_NICHES[0].id);

  // Custom Niche Form Modal / Drawer
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [customAvgJob, setCustomAvgJob] = useState(500);
  const [customLeadPrice, setCustomLeadPrice] = useState(30);

  const activeNiche = niches.find((n) => n.id === selectedNicheId) || niches[0];

  const calculateTotalScore = (item: NicheItem) => {
    // Score out of 100
    const jobScore = Math.min(30, (item.avgJobValue / 2000) * 30);
    const urgency = item.urgencyScore * 2.5; // max 25
    const targeting = item.targetingEase * 2.0; // max 20
    const b2b = item.b2bReadiness * 2.5; // max 25
    return Math.round(jobScore + urgency + targeting + b2b);
  };

  const handleAddCustomNiche = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newItem: NicheItem = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      category: customCategory.trim() || 'خدمات محلية متخصصة',
      avgJobValue: customAvgJob,
      leadPricePotential: customLeadPrice,
      urgencyScore: 7,
      targetingEase: 8,
      b2bReadiness: 8,
      competitionLevel: 'متوسط',
      idealCustomer: 'عملاء محليون يبحثون عن حلول موثوقة لهذه الخدمة في منطقتك.',
      keyQuestion: 'هل أنت مالك العقار/المشروع؟ ومتى ترغب في بدء الخدمة؟',
      verdict: 'قطاع مخصص أضفته بنفسك لتحليله ومقارنته ببقية القطاعات.'
    };

    setNiches((prev) => [newItem, ...prev]);
    setSelectedNicheId(newItem.id);
    setCustomName('');
    setCustomCategory('');
  };

  return (
    <div className="space-y-8 animate-fadeIn text-right" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900/90 via-zinc-900/50 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
          <Scale className="h-3.5 w-3.5" />
          <span>الدرس 2: نموذج تقييم القطاعات والشركات المستهدفة</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          مصفوفة مقارنة وجدوى قطاعات الخدمات المحلية (Niche Evaluator)
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
          قارن بين القطاعات المرشحة بناءً على: متوسط قيمة الصفقة للمقاول، درجة الإلحاح، سهولة الاستهداف الإعلاني، وقدرة الشركات على شراء الفرص المؤهلة بسعر عادل.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Niche Selector List (Span 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold text-zinc-400 px-1">اختر قطاعاً لاستعراض تحليله التفصيلي:</div>
          <div className="space-y-2.5">
            {niches.map((n) => {
              const score = calculateTotalScore(n);
              const isSelected = n.id === activeNiche.id;
              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNicheId(n.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/5'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span>{n.name}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {n.category} · متوسط الصفقة: <span className="font-mono text-emerald-400 font-bold">${n.avgJobValue}</span>
                    </div>
                  </div>

                  <div className="text-left shrink-0">
                    <div className="text-sm font-black font-mono text-cyan-400">
                      {score}/100
                    </div>
                    <div className="text-[10px] text-zinc-500">مؤشر الجدوى</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add custom niche form */}
          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-3">
            <div className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>إضافة قطاع محلي جديد للمقارنة:</span>
            </div>
            <form onSubmit={handleAddCustomNiche} className="space-y-2.5">
              <input
                type="text"
                placeholder="اسم القطاع (مثلاً: تركيب مظلات وسواتر)"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1">متوسط الصفقة ($):</label>
                  <input
                    type="number"
                    value={customAvgJob}
                    onChange={(e) => setCustomAvgJob(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1">سعر الفرصة المقترح ($):</label>
                  <input
                    type="number"
                    value={customLeadPrice}
                    onChange={(e) => setCustomLeadPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold transition-colors cursor-pointer"
              >
                + إضافة القطاع وتحليله
              </button>
            </form>
          </div>
        </div>

        {/* Selected Niche Deep Dive (Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[11px] font-bold text-cyan-400 font-mono uppercase">
                  {activeNiche.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {activeNiche.name}
                </h3>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold text-center">
                سعر الفرصة التقديري: ${activeNiche.leadPricePotential}
              </div>
            </div>

            {/* Score Indicators Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-500 mb-1">متوسط الصفقة</div>
                <div className="text-base font-black font-mono text-emerald-400">${activeNiche.avgJobValue}</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-500 mb-1">درجة الإلحاح</div>
                <div className="text-base font-black font-mono text-amber-400">{activeNiche.urgencyScore}/10</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-500 mb-1">سهولة الاستهداف</div>
                <div className="text-base font-black font-mono text-cyan-400">{activeNiche.targetingEase}/10</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-500 mb-1">المنافسة الإعلانية</div>
                <div className="text-sm font-bold text-zinc-200 mt-0.5">{activeNiche.competitionLevel}</div>
              </div>
            </div>

            {/* Ideal Customer Persona */}
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
              <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Building2 className="h-4 w-4" />
                <span>العميل المثالي المستهدف (ICP):</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeNiche.idealCustomer}
              </p>
            </div>

            {/* Key Qualifying Question */}
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4" />
                <span>سؤال الفلترة والتأهيل الجوهري في النموذج:</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                "{activeNiche.keyQuestion}"
              </p>
            </div>

            {/* Executive Verdict */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-1.5">
              <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                <span>التقييم المهني والتوصية:</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeNiche.verdict}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
