import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Percent, 
  Target, 
  Clock, 
  Sparkles,
  ArrowRight,
  RotateCcw,
  Layers,
  FileText,
  Mail,
  ShieldCheck
} from 'lucide-react';

interface PresetProfile {
  name: string;
  subscribers: number;
  openRate: number;
  issuesPerMonth: number;
  sponsorshipCpm: number;
  secondaryCpm: number;
  paidConversionRate: number;
  paidMonthlyPrice: number;
  affiliateMonthly: number;
  platformMonthlyFee: number;
  description: string;
}

const PRESET_PROFILES: PresetProfile[] = [
  {
    name: 'نشرة صاعدة للمبتدئين (Early Growth - 1.5K Subs)',
    subscribers: 1500,
    openRate: 46,
    issuesPerMonth: 4,
    sponsorshipCpm: 40,
    secondaryCpm: 15,
    paidConversionRate: 0,
    paidMonthlyPrice: 0,
    affiliateMonthly: 60,
    platformMonthlyFee: 0, // Free on beehiiv under 2.5k
    description: 'نشرة أسبوعية صاعدة؛ رعاية رئيسية ورابط فرعي مجدول لكل عدد مع عمولات أفيلييت هادئة.'
  },
  {
    name: 'نشرة متخصصة محترفة (B2B Pro - 5K Subs)',
    subscribers: 5000,
    openRate: 44,
    issuesPerMonth: 4,
    sponsorshipCpm: 55,
    secondaryCpm: 25,
    paidConversionRate: 2.5,
    paidMonthlyPrice: 9,
    affiliateMonthly: 250,
    platformMonthlyFee: 42,
    description: 'نشرة B2B تقنية أو أعمال؛ رعاية مميزة، روابط فرعية، واشتراك مدفوع لـ 125 مشتركاً.'
  },
  {
    name: 'إمبراطورية إعلامية مصغرة (Media Powerhouse - 20K Subs)',
    subscribers: 20000,
    openRate: 42,
    issuesPerMonth: 8, // Bi-weekly issues
    sponsorshipCpm: 65,
    secondaryCpm: 30,
    paidConversionRate: 3.2,
    paidMonthlyPrice: 12,
    affiliateMonthly: 850,
    platformMonthlyFee: 84,
    description: 'إصداران أسبوعياً؛ رعاية رئيسية ورابطان مصنفان في كل عدد + 640 مشترك مدفوع وعمولات شهرية.'
  }
];

export const NewsletterProfitCalculator: React.FC = () => {
  const [subscribers, setSubscribers] = useState<number>(3000);
  const [openRate, setOpenRate] = useState<number>(45);
  const [issuesPerMonth, setIssuesPerMonth] = useState<number>(4);
  const [sponsorshipCpm, setSponsorshipCpm] = useState<number>(50);
  const [secondaryCpm, setSecondaryCpm] = useState<number>(20);
  const [hasSecondaryAds, setHasSecondaryAds] = useState<boolean>(true);
  
  // Paid tier
  const [enablePaidTier, setEnablePaidTier] = useState<boolean>(false);
  const [paidConversionRate, setPaidConversionRate] = useState<number>(2.5);
  const [paidMonthlyPrice, setPaidMonthlyPrice] = useState<number>(8);

  // Other revenues & costs
  const [affiliateMonthly, setAffiliateMonthly] = useState<number>(120);
  const [platformCost, setPlatformCost] = useState<number>(subscribers > 2500 ? 42 : 0);

  const applyPreset = (preset: PresetProfile) => {
    setSubscribers(preset.subscribers);
    setOpenRate(preset.openRate);
    setIssuesPerMonth(preset.issuesPerMonth);
    setSponsorshipCpm(preset.sponsorshipCpm);
    setSecondaryCpm(preset.secondaryCpm);
    setHasSecondaryAds(preset.secondaryCpm > 0);
    setEnablePaidTier(preset.paidConversionRate > 0);
    setPaidConversionRate(preset.paidConversionRate);
    setPaidMonthlyPrice(preset.paidMonthlyPrice);
    setAffiliateMonthly(preset.affiliateMonthly);
    setPlatformCost(preset.platformMonthlyFee);
  };

  const handleReset = () => {
    applyPreset(PRESET_PROFILES[0]);
  };

  // Calculations
  const calculated = useMemo(() => {
    const activeReadersPerIssue = Math.round((subscribers * openRate) / 100);
    const thousandsOfActive = activeReadersPerIssue / 1000;

    // Sponsorships per issue
    const mainSponsorPerIssue = thousandsOfActive * sponsorshipCpm;
    const secondarySponsorPerIssue = hasSecondaryAds ? thousandsOfActive * secondaryCpm : 0;
    const totalSponsorPerIssue = mainSponsorPerIssue + secondarySponsorPerIssue;
    const monthlySponsorshipRevenue = totalSponsorPerIssue * issuesPerMonth;

    // Paid Subscriptions
    const paidSubscribersCount = enablePaidTier 
      ? Math.round((subscribers * paidConversionRate) / 100) 
      : 0;
    const monthlyPaidRevenue = paidSubscribersCount * paidMonthlyPrice;

    // Gross Revenue
    const monthlyGrossRevenue = monthlySponsorshipRevenue + monthlyPaidRevenue + affiliateMonthly;

    // Net Profit
    const monthlyNetProfit = Math.max(0, monthlyGrossRevenue - platformCost);
    const annualNetProfit = monthlyNetProfit * 12;

    // Annual enterprise valuation multiplier (usually 3.5x to 5x annual net profit)
    const estimatedValuationMin = annualNetProfit * 3.2;
    const estimatedValuationMax = annualNetProfit * 5.0;

    // Revenue breakdown percentages
    const sponsorPercent = monthlyGrossRevenue > 0 ? Math.round((monthlySponsorshipRevenue / monthlyGrossRevenue) * 100) : 0;
    const paidPercent = monthlyGrossRevenue > 0 ? Math.round((monthlyPaidRevenue / monthlyGrossRevenue) * 100) : 0;
    const affiliatePercent = monthlyGrossRevenue > 0 ? Math.round((affiliateMonthly / monthlyGrossRevenue) * 100) : 0;

    return {
      activeReadersPerIssue,
      mainSponsorPerIssue,
      secondarySponsorPerIssue,
      totalSponsorPerIssue,
      monthlySponsorshipRevenue,
      paidSubscribersCount,
      monthlyPaidRevenue,
      monthlyGrossRevenue,
      monthlyNetProfit,
      annualNetProfit,
      estimatedValuationMin,
      estimatedValuationMax,
      sponsorPercent,
      paidPercent,
      affiliatePercent
    };
  }, [
    subscribers,
    openRate,
    issuesPerMonth,
    sponsorshipCpm,
    secondaryCpm,
    hasSecondaryAds,
    enablePaidTier,
    paidConversionRate,
    paidMonthlyPrice,
    affiliateMonthly,
    platformCost
  ]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-900/90 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
              <Calculator className="w-3.5 h-3.5" />
              <span>حاسبة اقتصاديات وعوائد النشرة التفاعلية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              حاسبة أرباح الرعايات والاشتراكات البريدية
            </h2>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              احسب دخلك الشهري المتوقع بدقة بناءً على عدد المشتركين، معدل الفتح الفعلي (Open Rate)، تسعير الـ CPM المعتمد للرعايات، وإيرادات الاشتراكات المدفوعة والعمولات.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="self-start md:self-center inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-all border border-zinc-700 active:scale-95 cursor-pointer shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة ضبط الحقول</span>
          </button>
        </div>
      </div>

      {/* Preset Profiles */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-black text-zinc-300">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>نماذج جاهزة للاختيار السريع (Preset Benchmarks):</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRESET_PROFILES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset)}
              className="text-right p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 hover:border-emerald-500/40 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-400 group-hover:text-emerald-300">
                  {preset.subscribers.toLocaleString()} مشترك
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 font-mono">
                  {preset.issuesPerMonth} أعداد/شهر
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                {preset.name}
              </h4>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Inputs & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Audience & Open Rate */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>1. حجم الجمهور ونشاط القراءة الفعلي</span>
            </h3>

            {/* Subscribers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-300">إجمالي عدد المشتركين في القائمة:</span>
                <span className="text-emerald-400 font-mono text-sm font-black">
                  {subscribers.toLocaleString()} مشترك
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="250"
                value={subscribers}
                onChange={(e) => setSubscribers(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>500 مشترك</span>
                <span>10,000</span>
                <span>25,000</span>
                <span>50,000 مشترك</span>
              </div>
            </div>

            {/* Open Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-300">معدل الفتح الفعلي لكل عدد (Open Rate %):</span>
                <span className="text-emerald-400 font-mono text-sm font-black">
                  %{openRate} ({calculated.activeReadersPerIssue.toLocaleString()} قارئ يفتحون الإيميل)
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="65"
                step="1"
                value={openRate}
                onChange={(e) => setOpenRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>20% (منخفض)</span>
                <span>40% (ممتاز)</span>
                <span>50% (نخبة)</span>
                <span>65% (فائق التفاعل)</span>
              </div>
            </div>

            {/* Issues Per Month */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-300">عدد الرسائل المرسلة شهرياً (الأعداد):</span>
                <span className="text-emerald-400 font-mono text-sm font-black">
                  {issuesPerMonth} أعداد شهرياً ({issuesPerMonth === 4 ? 'نشرة أسبوعية' : issuesPerMonth === 8 ? 'إصداران أسبوعياً' : 'مخصص'})
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={issuesPerMonth}
                onChange={(e) => setIssuesPerMonth(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Section 2: Sponsorship Pricing (CPM) */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>2. تسعير الرعايات الإعلانية (Sponsorships & CPM)</span>
            </h3>

            {/* Main Sponsor CPM */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-300">سعر الراعي الرئيسي (CPM لكل 1,000 فتح):</span>
                <span className="text-emerald-400 font-mono text-sm font-black">
                  ${sponsorshipCpm} (سعر الإعلان: ${Math.round(calculated.mainSponsorPerIssue)} / عدد)
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="90"
                step="5"
                value={sponsorshipCpm}
                onChange={(e) => setSponsorshipCpm(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>$20 (ترفيه عام)</span>
                <span>$45 (تقنية/تسويق)</span>
                <span>$65 (B2B SaaS)</span>
                <span>$90+ (استثمار/مال)</span>
              </div>
            </div>

            {/* Secondary Ads Toggle & CPM */}
            <div className="pt-2 border-t border-zinc-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="secondaryAds"
                    checked={hasSecondaryAds}
                    onChange={(e) => setHasSecondaryAds(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="secondaryAds" className="text-xs font-bold text-zinc-200 cursor-pointer">
                    تفعيل رابط رعاية إضافي / إعلانات مصنفة (Classified Link)
                  </label>
                </div>
                {hasSecondaryAds && (
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    ${Math.round(calculated.secondarySponsorPerIssue)} / عدد
                  </span>
                )}
              </div>

              {hasSecondaryAds && (
                <div className="space-y-2 pl-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">سعر CPM للرابط الإضافي:</span>
                    <span className="text-zinc-200 font-mono font-bold">${secondaryCpm}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    step="5"
                    value={secondaryCpm}
                    onChange={(e) => setSecondaryCpm(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Paid Subscriptions & Other Revenue */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>3. الاشتراكات المدفوعة ومصادر الدخل المرافقة</span>
            </h3>

            {/* Paid Tier Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="paidTier"
                  checked={enablePaidTier}
                  onChange={(e) => setEnablePaidTier(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500 cursor-pointer"
                />
                <label htmlFor="paidTier" className="text-xs font-bold text-zinc-200 cursor-pointer">
                  تفعيل باقة الاشتراك المدفوع (Paid Membership / Tier)
                </label>
              </div>
              {enablePaidTier && (
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {calculated.paidSubscribersCount} مشترك مدفوع
                </span>
              )}
            </div>

            {enablePaidTier && (
              <div className="space-y-4 pt-2 border-t border-zinc-800/80">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300">نسبة التحويل من القائمة المجانية (%):</span>
                    <span className="text-emerald-400 font-mono font-bold">%{paidConversionRate}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="0.5"
                    value={paidConversionRate}
                    onChange={(e) => setPaidConversionRate(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>1% (تحفظي)</span>
                    <span>2.5% (متوسط السوق)</span>
                    <span>4% (محتوى عالي التخصص)</span>
                    <span>6% (أقصى تقدير)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300">سعر الاشتراك الشهري للشخص:</span>
                    <span className="text-emerald-400 font-mono font-bold">${paidMonthlyPrice} / شهر</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={paidMonthlyPrice}
                    onChange={(e) => setPaidMonthlyPrice(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Affiliate & Costs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">
                  إيراد عمولات أفيلييت ومنتجات (شهرياً):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={affiliateMonthly}
                    onChange={(e) => setAffiliateMonthly(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute left-3 top-2.5 text-zinc-500 text-xs">$</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">
                  رسوم المنصة والبرمجيات (شهرياً):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={platformCost}
                    onChange={(e) => setPlatformCost(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute left-3 top-2.5 text-zinc-500 text-xs">$</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Profit Card */}
          <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">صافي العائد الشهري</h4>
                  <span className="text-[11px] text-zinc-400">بعد خصم التكاليف</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black border border-emerald-500/30">
                صافي الربح
              </span>
            </div>

            {/* Big Numbers */}
            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono tracking-tight">
                ${calculated.monthlyNetProfit.toLocaleString()}
                <span className="text-base text-zinc-400 font-normal"> / شهرياً</span>
              </div>
              <div className="text-sm text-zinc-400 font-mono font-medium">
                ما يعادل <strong className="text-white">${calculated.annualNetProfit.toLocaleString()}</strong> سنوياً كأصل رقمي
              </div>
            </div>

            {/* Income Streams Breakdown */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="text-xs font-bold text-zinc-300">توزيع مصادر الدخل الشهرية:</div>

              <div className="space-y-2.5">
                {/* Sponsorships */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">الرعايات الإعلانية (Sponsorships):</span>
                    <span className="text-white font-mono font-bold">
                      ${calculated.monthlySponsorshipRevenue.toLocaleString()} ({calculated.sponsorPercent}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full" 
                      style={{ width: `${calculated.sponsorPercent}%` }} 
                    />
                  </div>
                </div>

                {/* Paid Subscriptions */}
                {enablePaidTier && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">الاشتراكات المدفوعة (Paid MRR):</span>
                      <span className="text-white font-mono font-bold">
                        ${calculated.monthlyPaidRevenue.toLocaleString()} ({calculated.paidPercent}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full" 
                        style={{ width: `${calculated.paidPercent}%` }} 
                      />
                    </div>
                  </div>
                )}

                {/* Affiliate */}
                {affiliateMonthly > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">عمولات ومبيعات إضافية:</span>
                      <span className="text-white font-mono font-bold">
                        ${affiliateMonthly.toLocaleString()} ({calculated.affiliatePercent}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${calculated.affiliatePercent}%` }} 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Per-Issue Metrics */}
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-2.5 text-xs">
              <div className="font-bold text-zinc-300">معدلات العدد الواحد:</div>
              <div className="flex justify-between">
                <span className="text-zinc-400">القارئ الفعلي لكل عدد:</span>
                <span className="text-white font-mono font-bold">
                  {calculated.activeReadersPerIssue.toLocaleString()} قارئ
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">إجمالي رعاية العدد الواحد:</span>
                <span className="text-emerald-400 font-mono font-bold">
                  ${Math.round(calculated.totalSponsorPerIssue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">عدد الرعايات المتاحة شهرياً:</span>
                <span className="text-white font-mono font-bold">
                  {issuesPerMonth * (hasSecondaryAds ? 2 : 1)} فرصة إعلانية
                </span>
              </div>
            </div>

            {/* Enterprise Valuation Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-zinc-950 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                <ShieldCheck className="w-4 h-4" />
                <span>القيمة التقديرية للنشرة كشركة أصول (Valuation):</span>
              </div>
              <div className="text-xl font-black text-white font-mono">
                ${Math.round(calculated.estimatedValuationMin).toLocaleString()} - ${Math.round(calculated.estimatedValuationMax).toLocaleString()}
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                تقيم النشرات البريدية المتخصصة بمضاعف 3.5x إلى 5x من صافي أرباحها السنوية عند الاستحواذ عليها أو بيعها لمجموعات إعلامية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
