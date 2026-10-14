import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Percent, 
  Target, 
  PieChart, 
  ShieldAlert, 
  Sparkles,
  ArrowRight,
  Layers,
  RotateCcw
} from 'lucide-react';

interface Preset {
  name: string;
  price: number;
  students: number;
  adCostPerStudent: number;
  platformFeePct: number;
  fixedCost: number;
  description: string;
}

export const CourseProfitCalculator: React.FC = () => {
  // Inputs
  const [coursePrice, setCoursePrice] = useState<number>(97);
  const [targetStudents, setTargetStudents] = useState<number>(30);
  const [adCostPerStudent, setAdCostPerStudent] = useState<number>(25);
  const [platformMonthlyCost, setPlatformMonthlyCost] = useState<number>(39);
  const [paymentFeePct, setPaymentFeePct] = useState<number>(3.5);
  const [fixedFeePerTx, setFixedFeePerTx] = useState<number>(0.30);
  const [softwareMonthlyCost, setSoftwareMonthlyCost] = useState<number>(20);
  const [supportMonthlyCost, setSupportMonthlyCost] = useState<number>(0);
  const [conversionRatePct, setConversionRatePct] = useState<number>(2.0);

  const presets: Preset[] = [
    {
      name: 'دورة مصغرة (Mini-Course)',
      price: 27,
      students: 75,
      adCostPerStudent: 6,
      platformFeePct: 5.0,
      fixedCost: 0,
      description: 'سعر منخفض يكسر حاجز التردد ويحقق مبيعات سريعة بكميات أكبر.'
    },
    {
      name: 'الدورة الرئيسية (Flagship Blueprint)',
      price: 147,
      students: 25,
      adCostPerStudent: 35,
      platformFeePct: 3.5,
      fixedCost: 39,
      description: 'المعيار الذهبي: تسعير عادل يقدم قيمة عميقة مع ميزانية تسويق مريحة.'
    },
    {
      name: 'برنامج مكثف مع مرافقة (Cohort / High-Ticket)',
      price: 497,
      students: 12,
      adCostPerStudent: 90,
      platformFeePct: 2.9,
      fixedCost: 99,
      description: 'عدد طلاب محدود مع جلسات زووم أسبوعية ومتابعة فردية مباشرة.'
    },
    {
      name: 'اشتراك مجتمع تعليمي شهري (Membership)',
      price: 39,
      students: 60,
      adCostPerStudent: 12,
      platformFeePct: 3.5,
      fixedCost: 99,
      description: 'دخل شهري متكرر (MRR) مستدام يبنى على التفاعل والمحتوى المتجدد.'
    }
  ];

  const applyPreset = (preset: Preset) => {
    setCoursePrice(preset.price);
    setTargetStudents(preset.students);
    setAdCostPerStudent(preset.adCostPerStudent);
    setPaymentFeePct(preset.platformFeePct);
    setPlatformMonthlyCost(preset.fixedCost);
  };

  const handleReset = () => {
    setCoursePrice(97);
    setTargetStudents(30);
    setAdCostPerStudent(25);
    setPlatformMonthlyCost(39);
    setPaymentFeePct(3.5);
    setFixedFeePerTx(0.30);
    setSoftwareMonthlyCost(20);
    setSupportMonthlyCost(0);
    setConversionRatePct(2.0);
  };

  // Calculations
  const metrics = useMemo(() => {
    const grossRevenue = coursePrice * targetStudents;
    const variableGatewayFeePerStudent = (coursePrice * (paymentFeePct / 100)) + fixedFeePerTx;
    const totalGatewayFees = variableGatewayFeePerStudent * targetStudents;
    const totalMarketingCost = adCostPerStudent * targetStudents;
    const totalFixedCosts = platformMonthlyCost + softwareMonthlyCost + supportMonthlyCost;
    const totalExpenses = totalGatewayFees + totalMarketingCost + totalFixedCosts;
    const netProfit = grossRevenue - totalExpenses;
    const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;
    
    // Unit Economics
    const netProfitPerStudent = targetStudents > 0 ? netProfit / targetStudents : 0;
    
    // Break-even
    const contributionMarginPerStudent = coursePrice - variableGatewayFeePerStudent - adCostPerStudent;
    const breakEvenStudents = contributionMarginPerStudent > 0 
      ? Math.ceil(totalFixedCosts / contributionMarginPerStudent) 
      : 9999;

    // Traffic estimation
    const visitorsNeeded = conversionRatePct > 0 ? Math.ceil(targetStudents / (conversionRatePct / 100)) : 0;
    const emailLeadsNeeded = Math.ceil(targetStudents / 0.05); // Assuming 5% lead-to-buyer rate

    return {
      grossRevenue,
      totalGatewayFees,
      totalMarketingCost,
      totalFixedCosts,
      totalExpenses,
      netProfit,
      profitMargin,
      netProfitPerStudent,
      breakEvenStudents,
      visitorsNeeded,
      emailLeadsNeeded,
      annualGross: grossRevenue * 12,
      annualNet: netProfit * 12
    };
  }, [
    coursePrice, 
    targetStudents, 
    adCostPerStudent, 
    platformMonthlyCost, 
    paymentFeePct, 
    fixedFeePerTx, 
    softwareMonthlyCost, 
    supportMonthlyCost, 
    conversionRatePct
  ]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-900/90 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
              <Calculator className="h-3.5 w-3.5" />
              <span>حاسبة الجدوى الاقتصادية للدورة</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              حاسبة تسعير وأرباح الدورة ونقطة التعادل
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
              اكتشف صافي أرباحك الحقيقية بعد خصم عمولات الدفع، تكلفة الاستضافة، وميزانية التسويق لكل طالب.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 text-zinc-300 text-xs hover:text-white hover:bg-zinc-700 transition-all cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>إعادة التعيين</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mt-5 pt-4 border-t border-zinc-800 grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset)}
              className="text-right p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/60 hover:border-amber-500/50 hover:bg-zinc-800/60 transition-all cursor-pointer group"
            >
              <div className="text-xs font-bold text-amber-400 group-hover:text-amber-300 flex items-center justify-between">
                <span>{preset.name}</span>
                <span className="text-[11px] font-mono text-zinc-400">${preset.price}</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1 leading-snug">
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Inputs vs Summary Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Input Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-5">
            <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-2 pb-3 border-b border-zinc-800">
              <DollarSign className="h-4 w-4 text-amber-400" />
              <span>متغيرات التسعير وحجم الطلاب</span>
            </h4>

            {/* Course Price Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-medium">سعر بيع الدورة للطالب</span>
                <span className="text-amber-400 font-mono font-black text-sm">${coursePrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max="997"
                step="5"
                value={coursePrice}
                onChange={(e) => setCoursePrice(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>$10 (دورة رخيصة)</span>
                <span>$150 (متوسط)</span>
                <span>$997 (مكثفة)</span>
              </div>
            </div>

            {/* Target Students Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-medium">عدد الطلاب المستهدف شهرياً</span>
                <span className="text-emerald-400 font-mono font-black text-sm">{targetStudents} طالب</span>
              </div>
              <input
                type="range"
                min="1"
                max="250"
                step="1"
                value={targetStudents}
                onChange={(e) => setTargetStudents(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>1 طالب</span>
                <span>50 طالب</span>
                <span>250 طالب/شهرياً</span>
              </div>
            </div>

            {/* Marketing / Ad CPA per student */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-medium">كلفة التسويق / الإعلانات لكل طالب مكتسب (CPA)</span>
                <span className="text-rose-400 font-mono font-black text-sm">${adCostPerStudent}</span>
              </div>
              <input
                type="range"
                min="0"
                max="150"
                step="2"
                value={adCostPerStudent}
                onChange={(e) => setAdCostPerStudent(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>$0 (تسويق عضوي مجاني)</span>
                <span>$40 (إعلانات متوازنة)</span>
                <span>$150 (استحواذ مكلف)</span>
              </div>
            </div>
          </div>

          {/* Operational & Gateway Costs */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
            <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-2 pb-3 border-b border-zinc-800">
              <Layers className="h-4 w-4 text-purple-400" />
              <span>التكاليف التقنية وبوابات الدفع</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  اشتراك منصة الاستضافة الشهري ($)
                </label>
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={platformMonthlyCost}
                  onChange={(e) => setPlatformMonthlyCost(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                />
                <span className="text-[10px] text-zinc-500 mt-0.5 block">0$ لـ Gumroad، 39$ لـ Teachable، 99$ لـ Skool</span>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  عمولة بوابة الدفع أو المنصة (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="0.5"
                  value={paymentFeePct}
                  onChange={(e) => setPaymentFeePct(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                />
                <span className="text-[10px] text-zinc-500 mt-0.5 block">Stripe 2.9%، Gumroad 10%، Hotmart 9.9%</span>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  أدوات إضافية (إيميلات، تصوير) ($/شهرياً)
                </label>
                <input
                  type="number"
                  min="0"
                  max="300"
                  value={softwareMonthlyCost}
                  onChange={(e) => setSoftwareMonthlyCost(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  معدل تحويل صفحة البيع المتوقع (%)
                </label>
                <input
                  type="number"
                  min="0.5"
                  max="15"
                  step="0.5"
                  value={conversionRatePct}
                  onChange={(e) => setConversionRatePct(Math.max(0.1, Number(e.target.value)))}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                />
                <span className="text-[10px] text-zinc-500 mt-0.5 block">المعدل الطبيعي 1.5% - 3.5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Financial Health Dashboard (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Profit Card */}
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-zinc-900 to-emerald-950/20 p-5 shadow-2xl relative overflow-hidden">
            <div className="text-xs font-semibold text-zinc-400 flex items-center justify-between">
              <span>صافي الربح الشهري المتوقع</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                metrics.profitMargin >= 65 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                هامش ربح {metrics.profitMargin.toFixed(1)}%
              </span>
            </div>

            <div className="mt-3 text-3xl sm:text-4xl font-black font-mono text-emerald-400">
              ${metrics.netProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              <span className="text-xs font-sans text-zinc-400 font-normal mr-2">/ شهرياً</span>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800/80 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-zinc-900/80 p-3 border border-zinc-800">
                <span className="text-zinc-400 block text-[11px]">الإيراد الإجمالي (Gross)</span>
                <span className="text-white font-mono font-black text-sm">
                  ${metrics.grossRevenue.toLocaleString()}
                </span>
              </div>

              <div className="rounded-xl bg-zinc-900/80 p-3 border border-zinc-800">
                <span className="text-zinc-400 block text-[11px]">صافي الربح السنوي</span>
                <span className="text-emerald-300 font-mono font-black text-sm">
                  ${metrics.annualNet.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            {/* Expense Breakdown */}
            <div className="mt-5 space-y-2 text-xs">
              <span className="text-zinc-400 text-[11px] font-bold block">توزيع المصاريف الشهرية:</span>
              <div className="flex justify-between text-zinc-300">
                <span>عمولات بوابات الدفع ({paymentFeePct}%):</span>
                <span className="font-mono text-rose-400">-${metrics.totalGatewayFees.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>تكلفة الإعلانات والتسويق:</span>
                <span className="font-mono text-rose-400">-${metrics.totalMarketingCost.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>التكاليف الثابتة (منصة وبرامج):</span>
                <span className="font-mono text-rose-400">-${metrics.totalFixedCosts.toFixed(0)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-800 font-bold text-white">
                <span>إجمالي المصاريف:</span>
                <span className="font-mono text-rose-300">-${metrics.totalExpenses.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Unit Economics & Break-Even */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
            <h5 className="text-xs font-bold text-zinc-300 flex items-center gap-2">
              <Target className="h-4 w-4 text-amber-400" />
              <span>مؤشرات الأداء ونقطة التعادل (Break-Even)</span>
            </h5>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-800/40 border border-zinc-800">
                <span className="text-zinc-400">عدد الطلاب للوصول لنقطة التعادل:</span>
                <span className="font-mono font-bold text-amber-400">
                  {metrics.breakEvenStudents > 500 ? 'غير مجدٍ (التكلفة أعلى من السعر)' : `${metrics.breakEvenStudents} طلاب فقط`}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-800/40 border border-zinc-800">
                <span className="text-zinc-400">صافي الربح الحقيقي لكل طالب:</span>
                <span className="font-mono font-bold text-emerald-400">
                  ${metrics.netProfitPerStudent.toFixed(1)}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-800/40 border border-zinc-800">
                <span className="text-zinc-400">زيارات صفحة البيع المطلوبة شهرياً:</span>
                <span className="font-mono font-bold text-blue-400">
                  {metrics.visitorsNeeded.toLocaleString()} زائر
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-800/40 border border-zinc-800">
                <span className="text-zinc-400">مشتركون محتملون في القائمة البريدية:</span>
                <span className="font-mono font-bold text-purple-400">
                  ~{metrics.emailLeadsNeeded.toLocaleString()} مشترك
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
