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
  PieChart
} from 'lucide-react';

export const MicroSaasCalculator: React.FC = () => {
  const [subscriptionPrice, setSubscriptionPrice] = useState<number>(29);
  const [activeSubscribers, setActiveSubscribers] = useState<number>(120);
  const [monthlyChurnRate, setMonthlyChurnRate] = useState<number>(4);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(180);
  const [newSubscribersPerMonth, setNewSubscribersPerMonth] = useState<number>(15);
  const [cacCost, setCacCost] = useState<number>(85);
  const [valuationMultiple, setValuationMultiple] = useState<number>(4.5);

  const stats = useMemo(() => {
    const mrr = activeSubscribers * subscriptionPrice;
    const arr = mrr * 12;
    const netMonthlyProfit = Math.max(0, mrr - monthlyExpenses);
    const netAnnualProfit = netMonthlyProfit * 12;

    // Churn & Lifetime
    const churnDecimal = Math.max(0.01, monthlyChurnRate / 100);
    const averageMonthsRetention = 1 / churnDecimal;
    const ltv = subscriptionPrice * averageMonthsRetention;

    // LTV : CAC ratio
    const ltvCacRatio = cacCost > 0 ? (ltv / cacCost).toFixed(1) : '∞';

    // Projected net churned per month
    const churnedUsersPerMonth = Math.round(activeSubscribers * churnDecimal);
    const netGrowthSubscribers = newSubscribersPerMonth - churnedUsersPerMonth;
    const netGrowthMrr = netGrowthSubscribers * subscriptionPrice;

    // Project valuation on Acquire.com
    const estimatedExitValuation = netAnnualProfit * valuationMultiple;

    // Health Score
    let healthRating = 'صحي جداً';
    let healthColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (monthlyChurnRate > 8 || Number(ltvCacRatio) < 2) {
      healthRating = 'يحتاج انتباه حرج (نزيف إلغاء)';
      healthColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    } else if (monthlyChurnRate > 5 || Number(ltvCacRatio) < 3) {
      healthRating = 'متوسط - قابل للتحسين';
      healthColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }

    return {
      mrr,
      arr,
      netMonthlyProfit,
      netAnnualProfit,
      averageMonthsRetention: averageMonthsRetention.toFixed(1),
      ltv: Math.round(ltv),
      ltvCacRatio,
      churnedUsersPerMonth,
      netGrowthSubscribers,
      netGrowthMrr,
      estimatedExitValuation: Math.round(estimatedExitValuation),
      healthRating,
      healthColor
    };
  }, [
    subscriptionPrice, 
    activeSubscribers, 
    monthlyChurnRate, 
    monthlyExpenses, 
    newSubscribersPerMonth, 
    cacCost, 
    valuationMultiple
  ]);

  const handleReset = () => {
    setSubscriptionPrice(29);
    setActiveSubscribers(120);
    setMonthlyChurnRate(4);
    setMonthlyExpenses(180);
    setNewSubscribersPerMonth(15);
    setCacCost(85);
    setValuationMultiple(4.5);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      {/* Intro Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
              <Calculator className="h-4 w-4" />
              <span>حاسبة اقتصاديات الوحدة لـ Micro-SaaS</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              محاكي الإيرادات المتكررة (MRR) وقيمة التخارج والـ Unit Economics
            </h2>
            <p className="text-sm text-zinc-400 max-w-2xl">
              اضبط أرقام مشروعك التقديرية أو الفعلية لمعرفة الإيراد السنوي المتكرر (ARR)، والقيمة الدائمة للعميل (LTV)، وقيمة بيع مشروعك التقديرية على منصة Acquire.com.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>إعادة تعيين</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Input Panel */}
        <div className="lg:col-span-7 space-y-5 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span>معايير ومدخلات النموذج المالي</span>
          </h3>

          {/* Slider 1: Subscription Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-300 font-medium">سعر الاشتراك الشهري للعميل</span>
              <span className="text-emerald-400 font-mono font-bold text-base">
                ${subscriptionPrice} / شهرياً
              </span>
            </div>
            <input
              type="range"
              min="9"
              max="199"
              step="1"
              value={subscriptionPrice}
              onChange={(e) => setSubscriptionPrice(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
              <span>$9 (B2C)</span>
              <span>$29 (Starter B2B)</span>
              <span>$79 (Pro)</span>
              <span>$199 (Agency)</span>
            </div>
          </div>

          {/* Slider 2: Active Subscribers */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-300 font-medium">عدد المشتركين النشطين الحاليين</span>
              <span className="text-cyan-400 font-mono font-bold text-base">
                {activeSubscribers} مشترك
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="1000"
              step="5"
              value={activeSubscribers}
              onChange={(e) => setActiveSubscribers(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
              <span>5 عملاء أولين</span>
              <span>100 عميل (الحرية المالية)</span>
              <span>500 عميل</span>
              <span>1000 عميل</span>
            </div>
          </div>

          {/* Slider 3: Churn Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-300 font-medium">معدل الإلغاء الشهري (Monthly Churn)</span>
              <span className="text-amber-400 font-mono font-bold text-base">
                {monthlyChurnRate}% / شهر
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={monthlyChurnRate}
              onChange={(e) => setMonthlyChurnRate(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
              <span>1% (ممتاز جداً)</span>
              <span>4% (معدل B2B صحي)</span>
              <span>8% (تحذير)</span>
              <span>20% (نزيف حاد)</span>
            </div>
          </div>

          {/* Slider 4: Monthly Operating Expenses */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-300 font-medium">مصاريف التشغيل الشهرية (سيرفرات، أدوات، APIs)</span>
              <span className="text-rose-400 font-mono font-bold text-base">
                ${monthlyExpenses} / شهر
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="1500"
              step="10"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
              <span>$20 (البداية)</span>
              <span>$150 (Vercel + Supabase Pro)</span>
              <span>$500</span>
              <span>$1,500</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* New Subscriptions per month */}
            <div className="space-y-1.5 bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800">
              <label className="text-xs text-zinc-400 block font-medium">مشتركون جدد شهرياً</label>
              <input
                type="number"
                min="0"
                max="200"
                value={newSubscribersPerMonth}
                onChange={(e) => setNewSubscribersPerMonth(Math.max(0, Number(e.target.value)))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-zinc-500">حجم الاستحواذ الجديد شهرياً</span>
            </div>

            {/* CAC Cost */}
            <div className="space-y-1.5 bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800">
              <label className="text-xs text-zinc-400 block font-medium">تكلفة اكتساب العميل (CAC $)</label>
              <input
                type="number"
                min="0"
                max="500"
                value={cacCost}
                onChange={(e) => setCacCost(Math.max(0, Number(e.target.value)))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-zinc-500">متوسط ما تنفقه لجلب عميل</span>
            </div>
          </div>

          {/* Valuation Multiple slider */}
          <div className="space-y-2 pt-2 border-t border-zinc-800/80">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-300 font-medium">مضاعف التقييم التقديري عند البيع (ARR Multiple)</span>
              <span className="text-purple-400 font-mono font-bold text-base">
                {valuationMultiple}x الأرباح السنوية
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="7"
              step="0.5"
              value={valuationMultiple}
              onChange={(e) => setValuationMultiple(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
              <span>2.5x (أداة بطيئة النمو)</span>
              <span>4.0x - 4.5x (متوسط السوق المعتاد)</span>
              <span>6x+ (نمو صاروخي)</span>
            </div>
          </div>
        </div>

        {/* Output Metrics Panel */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main MRR Card */}
          <div className="bg-gradient-to-br from-emerald-950/50 via-zinc-900 to-zinc-950 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                الإيراد الشهري المتكرر (MRR)
              </span>
              <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${stats.healthColor}`}>
                {stats.healthRating}
              </div>
            </div>

            <div className="text-4xl font-black text-white font-mono tracking-tight">
              ${stats.mrr.toLocaleString()}
              <span className="text-base text-zinc-400 font-normal mr-2">/ شهرياً</span>
            </div>

            <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-sm">
              <span className="text-zinc-400">الإيراد السنوي المتكرر (ARR):</span>
              <span className="text-white font-mono font-bold">${stats.arr.toLocaleString()}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-zinc-400">صافي الربح الشهري في جيبك:</span>
              <span className="text-emerald-400 font-mono font-bold">${stats.netMonthlyProfit.toLocaleString()}</span>
            </div>
          </div>

          {/* Unit Economics Box */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <PieChart className="h-3.5 w-3.5 text-cyan-400" />
              <span>مؤشرات اقتصاديات الوحدة (Unit Economics)</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-950/80 p-3 rounded-xl border border-zinc-800">
                <span className="text-[11px] text-zinc-400 block">القيمة الدائمة (LTV)</span>
                <span className="text-lg font-mono font-bold text-cyan-400">${stats.ltv}</span>
                <span className="text-[10px] text-zinc-500 block">متوسط ما يدفعه العميل</span>
              </div>

              <div className="bg-zinc-950/80 p-3 rounded-xl border border-zinc-800">
                <span className="text-[11px] text-zinc-400 block">نسبة LTV : CAC</span>
                <span className="text-lg font-mono font-bold text-emerald-400">{stats.ltvCacRatio}x</span>
                <span className="text-[10px] text-zinc-500 block">المثالي: أكثر من 3.0x</span>
              </div>

              <div className="bg-zinc-950/80 p-3 rounded-xl border border-zinc-800">
                <span className="text-[11px] text-zinc-400 block">متوسط بقاء المشترك</span>
                <span className="text-lg font-mono font-bold text-amber-400">{stats.averageMonthsRetention} شهر</span>
                <span className="text-[10px] text-zinc-500 block">قبل الإلغاء المحتمل</span>
              </div>

              <div className="bg-zinc-950/80 p-3 rounded-xl border border-zinc-800">
                <span className="text-[11px] text-zinc-400 block">النمو الصافي شهرياً</span>
                <span className={`text-lg font-mono font-bold ${stats.netGrowthSubscribers >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stats.netGrowthSubscribers >= 0 ? `+${stats.netGrowthSubscribers}` : stats.netGrowthSubscribers} عميل
                </span>
                <span className="text-[10px] text-zinc-500 block">
                  {stats.netGrowthMrr >= 0 ? `+$${stats.netGrowthMrr} MRR` : `-$${Math.abs(stats.netGrowthMrr)} MRR`}
                </span>
              </div>
            </div>
          </div>

          {/* Exit Valuation Card */}
          <div className="bg-zinc-900/60 border border-purple-500/30 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <Building2 className="h-4 w-4" />
                <span>قيمة بيع الأداة التقديرية (Acquire.com)</span>
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">{valuationMultiple}x ARR</span>
            </div>
            <div className="text-2xl font-black text-white font-mono">
              ${stats.estimatedExitValuation.toLocaleString()}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
              إذا قررت عرض مشروعك للبيع كأصل جاهز بعد عام من الاستقرار، فهذه هي السيولة النقدية المتوقع تحصيلها كصفقة استحواذ واحدة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
