import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  DollarSign, 
  ShieldCheck,
  Building2,
  Award
} from 'lucide-react';

interface NicheOption {
  id: string;
  name: string;
  category: 'b2b-saas' | 'tech-ai' | 'finance' | 'ecommerce' | 'career-productivity' | 'lifestyle';
  avgCpm: number;
  sponsorDemand: 'فائق للغاية' | 'مرتفع جداً' | 'متوسط' | 'منخفض';
  paidTierViability: 'ممتاز' | 'جيد جداً' | 'متوسط' | 'صعب';
  targetReader: string;
  exampleSponsors: string[];
  recommendedAngle: string;
  score: number;
}

const NICHES: NicheOption[] = [
  {
    id: 'b2b-saas',
    name: 'أدوات وحلول برمجيات الـ B2B وأتمتة العمل',
    category: 'b2b-saas',
    avgCpm: 65,
    sponsorDemand: 'فائق للغاية',
    paidTierViability: 'ممتاز',
    targetReader: 'مؤسسو الشركات التقنية، مدراء المنتجات، وأصحاب الوكالات.',
    exampleSponsors: ['HubSpot', 'Notion', 'Zapier', 'Linear', 'ClickUp'],
    recommendedAngle: 'ملخص أسبوعي لأفضل أدوات زيادة إنتاجية فرق العمل وتقليل التكاليف التشغيلية.',
    score: 96
  },
  {
    id: 'ai-workflows',
    name: 'تطبيقات الذكاء الاصطناعي في الأعمال (Practical AI)',
    category: 'tech-ai',
    avgCpm: 60,
    sponsorDemand: 'فائق للغاية',
    paidTierViability: 'ممتاز',
    targetReader: 'المحترفون، المستقلون، ورواد الأعمال الباحثون عن توفير ساعات العمل.',
    exampleSponsors: ['Midjourney tools', 'Claude apps', 'Make.com', 'Perplexity'],
    recommendedAngle: 'أدلة تطبيقية مصورة لاستخدام نماذج الذكاء الاصطناعي في حل مشاكل تجارية حقيقية.',
    score: 95
  },
  {
    id: 'fintech-crypto',
    name: 'التقنية المالية، الاستثمار، والعملات الرقمية',
    category: 'finance',
    avgCpm: 80,
    sponsorDemand: 'مرتفع جداً',
    paidTierViability: 'ممتاز',
    targetReader: 'المستثمرون الأفراد، المهتمون بالأسهم والعملات الرقمية وصناديق المؤشرات.',
    exampleSponsors: ['منصات التداول المرخصة', 'بوابات الدفع', 'أدوات التحليل المالي'],
    recommendedAngle: 'تحليلات أسبوعية معمقة لاتجاهات السوق مع شرح الفرص دون تقديم نصائح استثمارية ملزمة.',
    score: 92
  },
  {
    id: 'ecommerce-dtc',
    name: 'التجارة الإلكترونية والعلامات المباشرة (D2C)',
    category: 'ecommerce',
    avgCpm: 50,
    sponsorDemand: 'مرتفع جداً',
    paidTierViability: 'جيد جداً',
    targetReader: 'أصحاب المتاجر الإلكترونية، مسوقو الإعلانات الممولة (Media Buyers)، والموردون.',
    exampleSponsors: ['Shopify apps', 'بوابات الشحن والتخزين', 'أدوات الإيميل ماركتنج'],
    recommendedAngle: 'دراسات حالة لتحليل المتاجر التي حققت ملايين الدولارات مع تفكيك استراتيجيات إعلاناتها.',
    score: 89
  },
  {
    id: 'career-growth',
    name: 'النمو الوظيفي والعمل عن بُعد للمحترفين',
    category: 'career-productivity',
    avgCpm: 45,
    sponsorDemand: 'متوسط',
    paidTierViability: 'جيد جداً',
    targetReader: 'الموظفون الطامحون للترقية، المهندسون، ومحترفو العمل عن بُعد مع شركات عالمية.',
    exampleSponsors: ['منصات التوظيف العالمية (Deel)', 'منصات الدورات', 'أدوات السيرة الذاتية'],
    recommendedAngle: 'فرص العمل عن بُعد غير المعلنة أسبوعياً ونصائح التفاوض على الرواتب.',
    score: 84
  },
  {
    id: 'general-lifestyle',
    name: 'المنوعات وتطوير الذات العام',
    category: 'lifestyle',
    avgCpm: 22,
    sponsorDemand: 'منخفض',
    paidTierViability: 'صعب',
    targetReader: 'الجمهور العام بدون تخصص وظيفي محدد.',
    exampleSponsors: ['تطبيقات الهواتف العامة', 'منتجات استهلاكية رخيصة'],
    recommendedAngle: 'نصائح عامة عن العادات والإنتاجية (يحتاج أعداد ضخمة جداً لتوليد دخل معتبر).',
    score: 55
  }
];

export const NewsletterNicheValidator: React.FC = () => {
  const [selectedNiche, setSelectedNiche] = useState<NicheOption>(NICHES[0]);

  // Custom Niche Evaluation
  const [customName, setCustomName] = useState<string>('');
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [hasSaaSCompanies, setHasSaaSCompanies] = useState<boolean>(true);
  const [hasHighIncomeReaders, setHasHighIncomeReaders] = useState<boolean>(true);
  const [isWeeklyFeasible, setIsWeeklyFeasible] = useState<boolean>(true);
  const [customEvaluated, setCustomEvaluated] = useState<boolean>(false);

  const customScore = (hasSaaSCompanies ? 40 : 10) + 
                      (hasHighIncomeReaders ? 35 : 10) + 
                      (isWeeklyFeasible ? 25 : 10);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
            <Target className="w-3.5 h-3.5" />
            <span>مقياس النيتشات الربحية والأكثر طلباً لدى الرعاة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            محلل ومقيّم النيتش والتخصص التجاري
          </h2>
          <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
            اكتشف النيتشات التي تحقق أعلى معدلات CPM في السوق العالمي والعربي، وتعرف على نوعية الشركات الراعية واستعداد القراء للدفع.
          </p>
        </div>
      </div>

      {/* Niches Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {NICHES.map((niche) => {
          const isSelected = selectedNiche.id === niche.id;
          return (
            <div
              key={niche.id}
              onClick={() => setSelectedNiche(niche)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                isSelected 
                  ? 'border-emerald-500 bg-zinc-900 shadow-xl shadow-emerald-500/10' 
                  : 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-850 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                  niche.score >= 90 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : niche.score >= 80 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'bg-zinc-800 text-zinc-400'
                }`}>
                  تقييم الربحية: {niche.score} / 100
                </span>
                <span className="text-xs font-mono font-black text-emerald-400">
                  CPM: ${niche.avgCpm}
                </span>
              </div>

              <h4 className="text-base font-bold text-white mt-3">
                {niche.name}
              </h4>

              <div className="mt-3 space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>طلب الرعاة:</span>
                  <span className="font-bold text-zinc-200">{niche.sponsorDemand}</span>
                </div>
                <div className="flex justify-between">
                  <span>قابلية الاشتراك المدفوع:</span>
                  <span className="font-bold text-zinc-200">{niche.paidTierViability}</span>
                </div>
              </div>

              {isSelected && (
                <div className="mt-3 pt-3 border-t border-emerald-500/30 flex items-center gap-1.5 text-xs font-black text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>النيتش المحدد للدراسة المفصلة</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Niche In-Depth Card */}
      <div className="rounded-3xl border border-emerald-500/30 bg-zinc-900/80 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <span className="text-xs font-bold text-emerald-400">تفاصيل وتحليل النيتش المختار:</span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {selectedNiche.name}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block">متوسط CPM المتوقع</span>
              <span className="text-lg font-black text-emerald-400 font-mono">${selectedNiche.avgCpm}</span>
            </div>
            <div className="text-center px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 block">درجة الربحية</span>
              <span className="text-lg font-black text-white font-mono">{selectedNiche.score}/100</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-4">
            <div>
              <h5 className="text-xs font-black text-zinc-400 flex items-center gap-1.5 mb-1.5">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>القارئ المستهدف الأكثر استعداداً للقراءة:</span>
              </h5>
              <p className="text-zinc-200 bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 leading-relaxed text-xs">
                {selectedNiche.targetReader}
              </p>
            </div>

            <div>
              <h5 className="text-xs font-black text-zinc-400 flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>الزاوية المقترحة للنشرة (Recommended Hook Angle):</span>
              </h5>
              <p className="text-zinc-200 bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 leading-relaxed text-xs">
                {selectedNiche.recommendedAngle}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="text-xs font-black text-zinc-400 flex items-center gap-1.5 mb-1.5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>أمثلة على الشركات والمنتجات المستعدة للرعاية:</span>
              </h5>
              <div className="flex flex-wrap gap-2 bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
                {selectedNiche.exampleSponsors.map((sponsor, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-200 text-xs font-mono font-medium border border-zinc-700">
                    {sponsor}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400 block mb-1">💡 نصيحة انطلاق:</strong>
              إذا كان هذا هو نيتشك المفضل، ابدأ بالبحث عن أفضل 3 أعداد من نشرات أجنبية ناجحة في هذا المجال لدراسة التنسيق وطريقة طرح الروابط المنتقاة.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Custom Niche Evaluator */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-6">
        <div className="border-b border-zinc-800 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>أداة تقييم فكرتك الخاصة (Custom Idea Test)</span>
          </div>
          <h3 className="text-xl font-black text-white">
            هل فكرة نشرتك البريدية الخاصة مؤهلة للربح من الرعايات؟
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            أجب عن الأسئلة الثلاثة التالية لاختبار الجدوى الاقتصادية لفكرتك قبل إطلاق العدد الأول:
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-300 block mb-1.5">
              اسم أو فكرة النشرة المقترحة:
            </label>
            <input
              type="text"
              placeholder="مثال: ملخص أدوات التسويق بالمحتوى والذكاء الاصطناعي للمتاجر..."
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700">
              <input
                type="checkbox"
                checked={hasSaaSCompanies}
                onChange={(e) => setHasSaaSCompanies(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
              <span className="text-xs text-zinc-200">
                هل يوجد أكثر من 10 شركات برمجيات أو خدمات تجارية (B2B) تبيع منتجات مدفوعة في هذا المجال؟ (+40 نقطة)
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700">
              <input
                type="checkbox"
                checked={hasHighIncomeReaders}
                onChange={(e) => setHasHighIncomeReaders(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
              <span className="text-xs text-zinc-200">
                هل القراء المستهدفون هم مهنيون، أصحاب مشاريع، أو أشخاص يملكون قوة شرائية واضحة؟ (+35 نقطة)
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700">
              <input
                type="checkbox"
                checked={isWeeklyFeasible}
                onChange={(e) => setIsWeeklyFeasible(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
              <span className="text-xs text-zinc-200">
                هل لديك القدرة والشغف على قراءة ومتابعة هذا المجال أسبوعياً لمدة 6 أشهر متواصلة دون ملل؟ (+25 نقطة)
              </span>
            </label>
          </div>

          <button
            onClick={() => setCustomEvaluated(true)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 text-black text-xs font-black hover:bg-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            تحليل النتيجة الآن 🚀
          </button>

          {customEvaluated && (
            <div className={`p-4 rounded-2xl border transition-all ${
              customScore >= 80 
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' 
                : customScore >= 60 
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-300' 
                : 'bg-red-950/30 border-red-500/40 text-red-300'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-black text-sm">
                  درجة جدوى الفكرة: {customScore} / 100
                </span>
                <span className="text-xs font-bold font-mono">
                  {customScore >= 80 ? '🟢 فكرة ذهبية ممتازة' : customScore >= 60 ? '🟡 فكرة مقبولة تحتاج تدقيق الزاوية' : '🔴 نيتش غير مربح للرعايات'}
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                {customScore >= 80 
                  ? 'تهانينا! فكرتك تملك جميع مقومات النشرة المربحة: جمهور صاحب قوة شرائية، شركات مستعدة لدفع الرعايات، وقدرة على الاستمرار. ابدأ فوراً بإعداد الحساب!' 
                  : customScore >= 60 
                  ? 'فكرتك جيدة ولكن قد تواجه صعوبة في تسعير الرعايات بسعر CPM مرتفع؛ حاول تضييق التخصص وجعله يستهدف أصحاب الأعمال أكثر من الجمهور العام.' 
                  : 'احذر؛ النشرات الموجهة للجمهور العام بدون قوة شرائية أو شركات معلنة تتطلب مئات آلاف المشتركين لكسب مبالغ بسيطة. أعد توجيه البوصلة نحو B2B.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
