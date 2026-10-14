import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Percent, 
  Clock, 
  Sparkles,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Building2,
  PieChart,
  HelpCircle,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface CpaPreset {
  id: string;
  name: string;
  desc: string;
  visits: number;
  ctr: number;
  conversionRate: number;
  acceptanceRate: number;
  payout: number;
  costs: number;
}

const PRESETS: CpaPreset[] = [
  {
    id: 'app-cpi',
    name: 'تثبيت تطبيق هاتف مجاني (CPI)',
    desc: 'زيارات من مقطع يوتيوب أو تيك توك، نسبة نقر عالية وإجراء سهل وسريع',
    visits: 6000,
    ctr: 9.5,
    conversionRate: 12.0,
    acceptanceRate: 88,
    payout: 1.80,
    costs: 20
  },
  {
    id: 'lead-soi',
    name: 'تسجيل بريد في موقع توظيف (SOI CPL)',
    desc: 'مقال SEO يستهدف الباحثين عن عمل، إدخال إيميل فقط دون تفعيل',
    visits: 3500,
    ctr: 8.0,
    conversionRate: 7.5,
    acceptanceRate: 82,
    payout: 3.50,
    costs: 30
  },
  {
    id: 'saas-trial',
    name: 'تجربة مجانية لأداة إنتاجية (B2B Trial)',
    desc: 'مدونة أعمال متخصصة، تحويلات أقل ولكن عمولة أعلى بكثير لكل تحويل',
    visits: 2000,
    ctr: 6.0,
    conversionRate: 4.5,
    acceptanceRate: 90,
    payout: 18.00,
    costs: 45
  },
  {
    id: 'survey-doi',
    name: 'استبيان رأي بأجر (Survey DOI)',
    desc: 'منشورات مجتمعية تشرح فكرة استطلاعات الرأي مع اشتراط تأكيد الإيميل',
    visits: 5000,
    ctr: 7.0,
    conversionRate: 5.0,
    acceptanceRate: 75,
    payout: 2.40,
    costs: 15
  }
];

export const CpaCalculator: React.FC = () => {
  // Input States
  const [visits, setVisits] = useState<number>(5000);
  const [ctr, setCtr] = useState<number>(8.0);
  const [conversionRate, setConversionRate] = useState<number>(6.5);
  const [acceptanceRate, setAcceptanceRate] = useState<number>(85);
  const [payout, setPayout] = useState<number>(3.80);
  const [costs, setCosts] = useState<number>(35);

  // Apply Preset
  const handleApplyPreset = (p: CpaPreset) => {
    setVisits(p.visits);
    setCtr(p.ctr);
    setConversionRate(p.conversionRate);
    setAcceptanceRate(p.acceptanceRate);
    setPayout(p.payout);
    setCosts(p.costs);
  };

  // Reset to default
  const handleReset = () => {
    setVisits(5000);
    setCtr(8.0);
    setConversionRate(6.5);
    setAcceptanceRate(85);
    setPayout(3.80);
    setCosts(35);
  };

  // Calculations
  const metrics = useMemo(() => {
    // Validations & sanitizations
    const safeVisits = Math.max(0, visits);
    const safeCtr = Math.min(100, Math.max(0, ctr));
    const safeCr = Math.min(100, Math.max(0, conversionRate));
    const safeAcceptance = Math.min(100, Math.max(0, acceptanceRate));
    const safePayout = Math.max(0, payout);
    const safeCosts = Math.max(0, costs);

    // Step 1: Expected Clicks on Offer
    const expectedClicks = Math.round(safeVisits * (safeCtr / 100));

    // Step 2: Raw / Initial Conversions
    const rawConversions = Math.round(expectedClicks * (safeCr / 100));

    // Step 3: Accepted Conversions after scrub
    const acceptedConversions = Math.round(rawConversions * (safeAcceptance / 100));

    // Step 4: Rejected Conversions
    const rejectedConversions = Math.max(0, rawConversions - acceptedConversions);

    // Step 5: Gross Revenue
    const grossRevenue = acceptedConversions * safePayout;

    // Step 6: Net Profit
    const netProfit = grossRevenue - safeCosts;

    // Step 7: ROI %
    const roi = safeCosts > 0 ? ((netProfit / safeCosts) * 100) : (grossRevenue > 0 ? 100 : 0);

    // Step 8: EPC (Earnings Per Click)
    const epc = expectedClicks > 0 ? (grossRevenue / expectedClicks) : 0;

    // Step 9: RPM (Revenue Per 1000 Visitors)
    const rpm = safeVisits > 0 ? ((grossRevenue / safeVisits) * 1000) : 0;

    // Break-even conversions needed
    const breakEvenConversions = safePayout > 0 ? Math.ceil(safeCosts / safePayout) : 0;

    return {
      expectedClicks,
      rawConversions,
      acceptedConversions,
      rejectedConversions,
      grossRevenue,
      netProfit,
      roi,
      epc,
      rpm,
      breakEvenConversions
    };
  }, [visits, ctr, conversionRate, acceptanceRate, payout, costs]);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Tool Header */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-zinc-900 to-emerald-950/30 border border-zinc-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              <Calculator className="h-3.5 w-3.5" />
              <span>CPA Dynamic Profit & Funnel Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              حاسبة التحويلات والأرباح والعائد (CPA Calculator)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              محرك حسابي تفاعلي دقيق يحسب مسار قمع الـ CPA خطوة بخطوة: من عدد الزيارات، إلى النقرات، ثم التحويلات الأولية، ونسبة القبول المعتمدة، وصولاً إلى صافي الربح والـ EPC ومعدل العائد ROI.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>إعادة التعيين</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80">
          <div className="text-xs font-bold text-zinc-400 mb-2.5">نماذج حملات جاهزة للاختبار السريع:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleApplyPreset(p)}
                className="text-right p-3 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-white group-hover:text-cyan-300">{p.name}</div>
                <div className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">{p.desc}</div>
                <div className="mt-2 text-[10px] text-emerald-400 font-mono font-bold">
                  عمولة {p.payout}$ · قبول {p.acceptanceRate}%
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs vs Real-time Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: 6 Core Dynamic Inputs (Span 7) */}
        <div className="lg:col-span-7 space-y-5 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <PieChart className="h-4 w-4 text-cyan-400" />
            <span>مدخلات الحملة وقمع التحويل (6 متغيرات أساسية)</span>
          </h3>

          <div className="space-y-4">
            {/* Input 1: Monthly / Campaign Visitors */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-cyan-400" />
                  <span>1. عدد الزيارات لصفحة الهبوط (Visitors):</span>
                </label>
                <span className="font-mono text-cyan-400 font-bold">{visits.toLocaleString()} زائر</span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={visits}
                onChange={(e) => setVisits(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>500 زائر</span>
                <span>25,000</span>
                <span>50,000 زائر</span>
              </div>
            </div>

            {/* Input 2: Click-Through Rate (CTR) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <Percent className="h-3.5 w-3.5 text-indigo-400" />
                  <span>2. نسبة النقر على رابط العرض (CTR %):</span>
                </label>
                <span className="font-mono text-indigo-400 font-bold">{ctr}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={ctr}
                onChange={(e) => setCtr(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <p className="text-[11px] text-zinc-400">
                نسبة الزوار الذين ينقرون زر الانتقال لعرض المعلن بعد قراءة مراجعتك (المتوسط الطبيعي: 5% - 15%).
              </p>
            </div>

            {/* Input 3: Conversion Rate (CR) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-purple-400" />
                  <span>3. نسبة إكمال الإجراء لدى المعلن (Conversion Rate %):</span>
                </label>
                <span className="font-mono text-purple-400 font-bold">{conversionRate}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <p className="text-[11px] text-zinc-400">
                نسبة من ينقرون ويقومون فعلياً بكتابة إيميلهم أو تثبيت التطبيق في صفحة المعلن (المتوسط: 3% - 12%).
              </p>
            </div>

            {/* Input 4: Acceptance / Approval Rate */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  <span>4. نسبة قبول واعتماد التحويلات (Approval Rate %):</span>
                </label>
                <span className="font-mono text-amber-400 font-bold">{acceptanceRate}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="1"
                value={acceptanceRate}
                onChange={(e) => setAcceptanceRate(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-[11px] text-zinc-400">
                التحويلات التي يجتاز أصحابها فلاتر الجودة ومكافحة التكرار لدى المعلن (الباقي يُرفض كـ Scrub).
              </p>
            </div>

            {/* Input 5: Payout per conversion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-200 flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                  <span>5. العمولة لكل تحويل مقبول ($):</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-xs">$</span>
                  <input
                    type="number"
                    min="0.2"
                    max="200"
                    step="0.1"
                    value={payout}
                    onChange={(e) => setPayout(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 pl-7 py-2 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Input 6: Marketing & Tools Costs */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-200 flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-rose-400" />
                  <span>6. التكاليف الإجمالية للأدوات/الإعلانات ($):</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-xs">$</span>
                  <input
                    type="number"
                    min="0"
                    max="2000"
                    step="5"
                    value={costs}
                    onChange={(e) => setCosts(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 pl-7 py-2 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Computed Real-Time Financial Cards (Span 5) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Main Profit Card */}
          <div className={`p-6 rounded-2xl border transition-all ${
            metrics.netProfit >= 0
              ? 'bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-950 border-emerald-500/40 shadow-xl shadow-emerald-500/5'
              : 'bg-gradient-to-br from-rose-950/40 via-zinc-900 to-zinc-950 border-rose-500/40'
          }`}>
            <div className="text-xs font-bold text-zinc-400 flex items-center justify-between">
              <span>صافي الربح التقديري (Net Profit):</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                metrics.netProfit >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {metrics.netProfit >= 0 ? 'حملة رابحة' : 'حملة خاسرة'}
              </span>
            </div>

            <div className="mt-2 text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
              ${metrics.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-zinc-500 block">إجمالي الإيرادات:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  ${metrics.grossRevenue.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">العائد على الاستثمار:</span>
                <span className={`font-mono font-bold text-sm ${metrics.roi >= 0 ? 'text-cyan-400' : 'text-rose-400'}`}>
                  {metrics.roi > 999 ? '>999%' : `${metrics.roi.toFixed(1)}%`}
                </span>
              </div>
            </div>
          </div>

          {/* Funnel Breakdown Box */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3.5">
            <h4 className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 border-b border-zinc-800 pb-2.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>مخرجات قمع التحويل التفصيلية:</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-zinc-800/50">
                <span className="text-zinc-400">النقرات المتوقعة على العرض:</span>
                <span className="font-mono font-bold text-white">{metrics.expectedClicks} نقرة</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-800/50">
                <span className="text-zinc-400">التحويلات الأولية (Raw Leads):</span>
                <span className="font-mono font-bold text-zinc-300">{metrics.rawConversions} تحويل</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-800/50">
                <span className="text-zinc-400">التحويلات المقبولة المعتمدة:</span>
                <span className="font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 inline" />
                  <span>{metrics.acceptedConversions} تحويل</span>
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-800/50">
                <span className="text-zinc-400">المرفوضات المتوقعة (Scrub):</span>
                <span className="font-mono font-bold text-rose-400">{metrics.rejectedConversions} تحويل</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-800/50">
                <span className="text-zinc-400">الأرباح لكل نقرة (EPC):</span>
                <span className="font-mono font-bold text-cyan-400">${metrics.epc.toFixed(3)}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-zinc-400">التحويلات المطلوبة لنقطة التعادل:</span>
                <span className="font-mono font-bold text-amber-400">{metrics.breakEvenConversions} تحويل مقبول</span>
              </div>
            </div>
          </div>

          {/* Safety & Reality Disclaimer */}
          <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 text-[11px] text-amber-300/90 leading-relaxed flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <span>
              <strong>تنبيه واقعي:</strong> هذه الأرقام هي نماذج حسابية تقديرية مبنية على المعادلات الموضحة لمساعدتك في قياس الجدوى، وليست ضماناً ثابتاً للأرباح؛ فالنتائج الحقيقية تعتمد على جودة محتواك وصدق استهدافك.
            </span>
          </div>

        </div>

      </div>

      {/* Equations & Formula Documentation */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-3">
        <h4 className="text-xs font-bold text-white flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-cyan-400" />
          <span>المعادلات والافتراضات المعتمدة في الحاسبة:</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-zinc-400 font-mono">
          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-cyan-400 font-bold block mb-1">النقرات المتوقعة:</span>
            الزيارات × (CTR ÷ 100)
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-emerald-400 font-bold block mb-1">التحويلات المعتمدة:</span>
            النقرات × (CR ÷ 100) × (القبول ÷ 100)
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-purple-400 font-bold block mb-1">متوسط EPC:</span>
            إجمالي الإيرادات ÷ إجمالي النقرات
          </div>
        </div>
      </div>
    </div>
  );
};
