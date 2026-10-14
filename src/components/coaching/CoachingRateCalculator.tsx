import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Percent, 
  Target, 
  Clock, 
  ShieldAlert, 
  Sparkles,
  ArrowRight,
  Layers,
  RotateCcw,
  Briefcase
} from 'lucide-react';

interface PresetProfile {
  name: string;
  targetIncome: number;
  packagePrice: number;
  sessionsPerWeek: number;
  prepTimePerSession: number;
  softwareCosts: number;
  taxRate: number;
  description: string;
}

const PRESET_PROFILES: PresetProfile[] = [
  {
    name: 'مدرب بدوام جزئي (Part-Time Coach)',
    targetIncome: 1500,
    packagePrice: 500,
    sessionsPerWeek: 3,
    prepTimePerSession: 45,
    softwareCosts: 35,
    taxRate: 15,
    description: 'للمبتدئ بجانب وظيفته الحالية؛ 3 عملاء فقط شهرياً بباقة شهرية مريحة.'
  },
  {
    name: 'مستشار متخصص بدوام كامل (Specialist)',
    targetIncome: 3500,
    packagePrice: 900,
    sessionsPerWeek: 6,
    prepTimePerSession: 40,
    softwareCosts: 70,
    taxRate: 20,
    description: 'تفرغ مهني؛ 4 عملاء شهرياً مع جلسات إضافية واستشارات مكثفة.'
  },
  {
    name: 'مستشار أعمال ونخبة (High-Ticket B2B)',
    targetIncome: 7000,
    packagePrice: 1750,
    sessionsPerWeek: 5,
    prepTimePerSession: 60,
    softwareCosts: 120,
    taxRate: 25,
    description: 'استشارات شركات ورواد أعمال؛ 4 عملاء فقط مع عوائد وتذاكر مرتفعة.'
  }
];

export const CoachingRateCalculator: React.FC = () => {
  // Inputs
  const [targetMonthlyIncome, setTargetMonthlyIncome] = useState<number>(2500);
  const [packagePrice, setPackagePrice] = useState<number>(650);
  const [sessionsPerMonthPerClient, setSessionsPerMonthPerClient] = useState<number>(4);
  const [sessionDurationMinutes, setSessionDurationMinutes] = useState<number>(60);
  const [prepMinutesPerSession, setPrepMinutesPerSession] = useState<number>(45);
  const [supportHoursPerWeekPerClient, setSupportHoursPerWeekPerClient] = useState<number>(1.5);
  const [softwareToolsMonthlyCost, setSoftwareToolsMonthlyCost] = useState<number>(45);
  const [taxAndSavingsRate, setTaxAndSavingsRate] = useState<number>(20);

  const applyPreset = (preset: PresetProfile) => {
    setTargetMonthlyIncome(preset.targetIncome);
    setPackagePrice(preset.packagePrice);
    setPrepMinutesPerSession(preset.prepTimePerSession);
    setSoftwareToolsMonthlyCost(preset.softwareCosts);
    setTaxAndSavingsRate(preset.taxRate);
  };

  const resetDefaults = () => {
    setTargetMonthlyIncome(2500);
    setPackagePrice(650);
    setSessionsPerMonthPerClient(4);
    setSessionDurationMinutes(60);
    setPrepMinutesPerSession(45);
    setSupportHoursPerWeekPerClient(1.5);
    setSoftwareToolsMonthlyCost(45);
    setTaxAndSavingsRate(20);
  };

  // Calculations
  const stats = useMemo(() => {
    // 1. Gross required income considering software and taxes
    const netDesired = targetMonthlyIncome;
    const taxMultiplier = 1 - (taxAndSavingsRate / 100);
    const grossNeeded = (netDesired / (taxMultiplier > 0 ? taxMultiplier : 1)) + softwareToolsMonthlyCost;

    // 2. Clients required
    const clientsNeeded = Math.max(1, Math.ceil(grossNeeded / (packagePrice || 1)));
    const totalGrossRevenue = clientsNeeded * packagePrice;

    // 3. Time calculation per client per month
    const totalSessionMinutes = sessionsPerMonthPerClient * sessionDurationMinutes;
    const totalPrepMinutes = sessionsPerMonthPerClient * prepMinutesPerSession;
    const totalSupportMinutes = supportHoursPerWeekPerClient * 4 * 60;
    const totalMinutesPerClient = totalSessionMinutes + totalPrepMinutes + totalSupportMinutes;
    const totalHoursPerClient = totalMinutesPerClient / 60;

    // 4. Monthly and weekly hours
    const totalMonthlyClientHours = clientsNeeded * totalHoursPerClient;
    const marketingAdminHoursMonthly = 20; // 5 hours/week for marketing/discovery calls
    const totalMonthlyWorkHours = totalMonthlyClientHours + marketingAdminHoursMonthly;
    const weeklyWorkHours = Math.round(totalMonthlyWorkHours / 4);

    // 5. Effective hourly rate
    const effectiveHourlyRate = totalMonthlyWorkHours > 0 ? Math.round(totalGrossRevenue / totalMonthlyWorkHours) : 0;
    const perClientHourlyEarning = totalHoursPerClient > 0 ? Math.round(packagePrice / totalHoursPerClient) : 0;

    // 6. Equivalent comparisons
    const equivalentTenDollarEbooksNeeded = Math.round(totalGrossRevenue / 10);
    const equivalentFiftyDollarCoursesNeeded = Math.round(totalGrossRevenue / 50);

    return {
      grossNeeded: Math.round(grossNeeded),
      clientsNeeded,
      totalGrossRevenue,
      totalHoursPerClient: Math.round(totalHoursPerClient * 10) / 10,
      totalMonthlyWorkHours: Math.round(totalMonthlyWorkHours),
      weeklyWorkHours,
      effectiveHourlyRate,
      perClientHourlyEarning,
      equivalentTenDollarEbooksNeeded,
      equivalentFiftyDollarCoursesNeeded
    };
  }, [
    targetMonthlyIncome,
    packagePrice,
    sessionsPerMonthPerClient,
    sessionDurationMinutes,
    prepMinutesPerSession,
    supportHoursPerWeekPerClient,
    softwareToolsMonthlyCost,
    taxAndSavingsRate
  ]);

  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="relative rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              <Calculator className="h-3.5 w-3.5" />
              <span>حاسبة هندسة الأسعار والجهد الزمني</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              حاسبة تسعير الاستشارات والدخل الشهري
            </h2>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              احسب عدد العملاء المطلوب للوصول لهدفك المالي، وتفقد ساعات العمل الفعلية أسبوعياً، وشاهد بنفسك لماذا يتفوق نموذج الباقات الفردية على بيع المنتجات الرخيصة.
            </p>
          </div>
          <button
            onClick={resetDefaults}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-all border border-zinc-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>إعادة التعيين</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mt-6 pt-6 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRESET_PROFILES.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-800/50 hover:border-amber-500/40 text-right transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white group-hover:text-amber-400 transition-colors">
                  {preset.name}
                </span>
                <span className="text-[11px] font-bold text-amber-400">
                  ${preset.targetIncome}/ش
                </span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Inputs & Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-6 backdrop-blur-sm">
            <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-zinc-800/80 pb-3">
              <Briefcase className="h-4 w-4 text-amber-400" />
              <span>المعطيات المالية والأسعار</span>
            </h3>

            {/* Target Monthly Income */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-zinc-200">الدخل الصافي الشهري المستهدف</label>
                <span className="font-black text-amber-400 text-sm">
                  ${targetMonthlyIncome.toLocaleString()} / شهر
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={targetMonthlyIncome}
                onChange={(e) => setTargetMonthlyIncome(Number(e.target.value))}
                className="w-full accent-amber-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-300">
                <span>$500</span>
                <span>$5,000</span>
                <span>$10,000+</span>
              </div>
            </div>

            {/* Package Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-zinc-200">سعر باقة التدريب (لكل عميل شهرياً)</label>
                <span className="font-black text-emerald-400 text-sm">
                  ${packagePrice.toLocaleString()} / باقة
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="3000"
                step="50"
                value={packagePrice}
                onChange={(e) => setPackagePrice(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-300">
                <span>$200 (تجريبي)</span>
                <span>$1,000 (احترافي)</span>
                <span>$3,000 (نخبة)</span>
              </div>
            </div>

            {/* Sessions per Month */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-200">عدد الجلسات لكل عميل شهرياً</label>
                <select
                  value={sessionsPerMonthPerClient}
                  onChange={(e) => setSessionsPerMonthPerClient(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white focus:border-amber-500 outline-none"
                >
                  <option value={2}>جلستان (كل أسبوعين جلسة)</option>
                  <option value={4}>4 جلسات (جلسة أسبوعية - موصى به)</option>
                  <option value={6}>6 جلسات (مكثف)</option>
                  <option value={8}>8 جلسات (مرتين أسبوعياً)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-200">مدة الجلسة التدريبية (دقائق)</label>
                <select
                  value={sessionDurationMinutes}
                  onChange={(e) => setSessionDurationMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white focus:border-amber-500 outline-none"
                >
                  <option value={45}>45 دقيقة (تركيز عالي)</option>
                  <option value={60}>60 دقيقة (العيار القياسي)</option>
                  <option value={75}>75 دقيقة</option>
                  <option value={90}>90 دقيقة (استشارات عميقة)</option>
                </select>
              </div>
            </div>

            {/* Prep & Support Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-200">وقت التحضير والملخص للجلسة (دقائق)</label>
                <input
                  type="number"
                  min="15"
                  max="120"
                  step="15"
                  value={prepMinutesPerSession}
                  onChange={(e) => setPrepMinutesPerSession(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white focus:border-amber-500 outline-none"
                />
                <span className="text-[10px] text-zinc-300">مراجعة الاستمارة + إرسال الواجبات</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-200">ساعات الدعم النصي أسبوعياً (لكل عميل)</label>
                <input
                  type="number"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={supportHoursPerWeekPerClient}
                  onChange={(e) => setSupportHoursPerWeekPerClient(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white focus:border-amber-500 outline-none"
                />
                <span className="text-[10px] text-zinc-300">رسائل وتفريغ استفسارات واتساب</span>
              </div>
            </div>

            {/* Expenses & Taxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/60">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-200">تكلفة الأدوات والبرمجيات شهرياً ($)</label>
                <input
                  type="number"
                  min="0"
                  max="300"
                  step="10"
                  value={softwareToolsMonthlyCost}
                  onChange={(e) => setSoftwareToolsMonthlyCost(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white focus:border-amber-500 outline-none"
                />
                <span className="text-[10px] text-zinc-300">Calendly + Zoom Pro + Notion</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-200">نسبة الادخار والضرائب المقدرة (%)</label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  step="5"
                  value={taxAndSavingsRate}
                  onChange={(e) => setTaxAndSavingsRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white focus:border-amber-500 outline-none"
                />
                <span className="text-[10px] text-zinc-300">احتياطي الطوارئ والالتزامات</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Key Metric Card */}
          <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-500/15 via-zinc-900 to-zinc-950 p-6 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                النتيجة الجوهرية
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-black border border-emerald-500/30">
                <Sparkles className="h-3 w-3" />
                قابلة للتنفيذ فوراً
              </span>
            </div>

            <div className="text-center py-2 space-y-1">
              <div className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                {stats.clientsNeeded} <span className="text-xl sm:text-2xl text-amber-400 font-bold">عملاء فقط</span>
              </div>
              <p className="text-xs text-zinc-300">
                عدد العملاء المطلوب شهرياً لتحقيق صافي ربح ${targetMonthlyIncome.toLocaleString()}
              </p>
            </div>

            {/* Quick Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                <div className="text-[11px] text-zinc-400 font-bold">إجمالي الإيرادات</div>
                <div className="text-lg font-black text-emerald-400 mt-0.5">
                  ${stats.totalGrossRevenue.toLocaleString()}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                <div className="text-[11px] text-zinc-400 font-bold">ساعات العمل الأسبوعية</div>
                <div className="text-lg font-black text-white mt-0.5">
                  {stats.weeklyWorkHours} <span className="text-xs text-zinc-400 font-bold">ساعة/أسبوع</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                <div className="text-[11px] text-zinc-400 font-bold">معدل كسبك الفعلي للساعة</div>
                <div className="text-lg font-black text-amber-400 mt-0.5">
                  ${stats.effectiveHourlyRate} <span className="text-xs text-zinc-400 font-bold">/ ساعة</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                <div className="text-[11px] text-zinc-400 font-bold">ساعات العميل الواحد شهرياً</div>
                <div className="text-lg font-black text-white mt-0.5">
                  {stats.totalHoursPerClient} <span className="text-xs text-zinc-400 font-bold">ساعة</span>
                </div>
              </div>
            </div>
          </div>

          {/* Eye-Opening Comparison Box */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
            <h4 className="text-xs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <Target className="h-4 w-4 text-amber-400" />
              <span>مقارنة واقعية: لماذا التدريب الفردي أسرع؟</span>
            </h4>

            <p className="text-xs text-zinc-300 leading-relaxed">
              لتحقيق نفس الإيراد الشهري (<span className="text-white font-bold">${stats.totalGrossRevenue.toLocaleString()}</span>) عبر نماذج أخرى، تحتاج إلى:
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/60 flex items-center justify-between text-xs">
                <span className="text-zinc-300">بيع كتب إلكترونية بسعر 10$</span>
                <span className="font-black text-amber-400">{stats.equivalentTenDollarEbooksNeeded} مشترٍ كل شهر</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/60 flex items-center justify-between text-xs">
                <span className="text-zinc-300">بيع دورات تدريبية مسجلة بسعر 50$</span>
                <span className="font-black text-amber-400">{stats.equivalentFiftyDollarCoursesNeeded} طالباً كل شهر</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                <span className="text-amber-300 font-bold">تقديم باقات تدريب فردي مركّزة</span>
                <span className="font-black text-emerald-400">{stats.clientsNeeded} عملاء فقط!</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">
              💡 إقناع {stats.clientsNeeded} أشخاص جادين بحل مشكلة عميقة أسهل بمئات المرات للمبتدئ من الوصول لمئات أو آلاف المشترين دون ميزانيات إعلانية ضخمة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
