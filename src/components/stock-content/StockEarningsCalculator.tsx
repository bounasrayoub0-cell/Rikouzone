import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Sparkles, RefreshCw, Layers, ShieldCheck, Film, Camera, Music, AlertCircle } from 'lucide-react';

interface Preset {
  name: string;
  assetType: 'photos' | 'footage' | 'audio' | 'mixed';
  portfolioSize: number;
  monthlyAdditions: number;
  downloadRate: number; // downloads per asset per month
  avgRoyalty: number; // average royalty per download in $
  monthlyExpenses: number;
}

const PRESETS: Preset[] = [
  {
    name: 'مبتدئ بالهاتف (صور ومقاطع 4K)',
    assetType: 'mixed',
    portfolioSize: 120,
    monthlyAdditions: 30,
    downloadRate: 0.35,
    avgRoyalty: 2.2,
    monthlyExpenses: 15
  },
  {
    name: 'صانع لقطات سينمائية 4K B-Roll',
    assetType: 'footage',
    portfolioSize: 200,
    monthlyAdditions: 25,
    downloadRate: 0.22,
    avgRoyalty: 18.5,
    monthlyExpenses: 35
  },
  {
    name: 'مهندس مؤثرات صوتية وواجهات UI',
    assetType: 'audio',
    portfolioSize: 180,
    monthlyAdditions: 30,
    downloadRate: 0.30,
    avgRoyalty: 4.5,
    monthlyExpenses: 20
  },
  {
    name: 'محفظة هجينة واسعة (مستوى متقدم)',
    assetType: 'mixed',
    portfolioSize: 650,
    monthlyAdditions: 60,
    downloadRate: 0.40,
    avgRoyalty: 4.8,
    monthlyExpenses: 50
  }
];

export const StockEarningsCalculator: React.FC = () => {
  const [assetType, setAssetType] = useState<'photos' | 'footage' | 'audio' | 'mixed'>('mixed');
  const [portfolioSize, setPortfolioSize] = useState<number>(150);
  const [monthlyAdditions, setMonthlyAdditions] = useState<number>(30);
  const [downloadRate, setDownloadRate] = useState<number>(0.35); // downloads per asset / month
  const [avgRoyalty, setAvgRoyalty] = useState<number>(3.5); // $ per download
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(20); // cloud storage, props, transport
  const [targetIncome, setTargetIncome] = useState<number>(1000);

  const applyPreset = (preset: Preset) => {
    setAssetType(preset.assetType);
    setPortfolioSize(preset.portfolioSize);
    setMonthlyAdditions(preset.monthlyAdditions);
    setDownloadRate(preset.downloadRate);
    setAvgRoyalty(preset.avgRoyalty);
    setMonthlyExpenses(preset.monthlyExpenses);
  };

  // Calculations
  // Total downloads per month = portfolioSize * downloadRate
  const currentMonthlyDownloads = Math.round(portfolioSize * downloadRate);
  const currentGrossRevenue = currentMonthlyDownloads * avgRoyalty;
  const currentNetProfit = Math.max(0, currentGrossRevenue - monthlyExpenses);
  const rpi = portfolioSize > 0 ? (currentGrossRevenue / portfolioSize) : 0;

  // Projection after 6 months
  const portfolioSize6Mo = portfolioSize + (monthlyAdditions * 6);
  // Slight compounding efficiency factor (0.95 to 1.05)
  const grossRevenue6Mo = Math.round(portfolioSize6Mo * downloadRate * avgRoyalty);
  const netProfit6Mo = Math.max(0, grossRevenue6Mo - monthlyExpenses);

  // Projection after 12 months
  const portfolioSize12Mo = portfolioSize + (monthlyAdditions * 12);
  const grossRevenue12Mo = Math.round(portfolioSize12Mo * downloadRate * avgRoyalty);
  const netProfit12Mo = Math.max(0, grossRevenue12Mo - monthlyExpenses);

  // Time & assets needed to reach target income
  // targetGross = targetIncome + monthlyExpenses
  // targetAssets = targetGross / (downloadRate * avgRoyalty)
  const revenuePerAsset = downloadRate * avgRoyalty;
  const targetAssetsNeeded = revenuePerAsset > 0 
    ? Math.ceil((targetIncome + monthlyExpenses) / revenuePerAsset) 
    : 0;
  
  const additionalAssetsNeeded = Math.max(0, targetAssetsNeeded - portfolioSize);
  const monthsToTarget = monthlyAdditions > 0 
    ? Math.ceil(additionalAssetsNeeded / monthlyAdditions) 
    : 999;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">حاسبة العوائد ونمو محفظة الستوك</h2>
              <p className="text-xs text-zinc-400">
                نمذجة مالية واقعية لتقدير الأرباح التراكمية، ومقياس RPI، وخطة التوسع بالأشهر
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(p)}
                className="rounded-lg border border-zinc-700 bg-zinc-800/80 px-2.5 py-1.5 text-xs font-semibold text-zinc-300 hover:border-amber-500/40 hover:text-white transition-all cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-5">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Layers className="h-4 w-4 text-amber-400" />
              <span>معايير ومدخلات المحفظة</span>
            </h3>

            {/* Asset Type Selector */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2">نوع المحتوى الأساسي</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'photos', label: 'صور فقط', icon: Camera, defaultRate: 0.45, defaultRoyalty: 0.65 },
                  { id: 'footage', label: 'فيديو 4K', icon: Film, defaultRate: 0.20, defaultRoyalty: 18.0 },
                  { id: 'audio', label: 'صوت ومؤثرات', icon: Music, defaultRate: 0.30, defaultRoyalty: 4.5 },
                  { id: 'mixed', label: 'محفظة هجينة', icon: Sparkles, defaultRate: 0.35, defaultRoyalty: 3.5 }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = assetType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setAssetType(item.id as any);
                        setDownloadRate(item.defaultRate);
                        setAvgRoyalty(item.defaultRoyalty);
                      }}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isActive
                          ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      <Icon className="h-4 w-4 mb-1" />
                      <span className="text-[11px]">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Portfolio Size */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-zinc-300">حجم المحفظة الحالي (ملف نشط):</span>
                <span className="font-black text-amber-400">{portfolioSize} ملف</span>
              </div>
              <input
                type="range"
                min="10"
                max="2000"
                step="10"
                value={portfolioSize}
                onChange={(e) => setPortfolioSize(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>10 ملفات</span>
                <span>500</span>
                <span>1000</span>
                <span>2000+ ملف</span>
              </div>
            </div>

            {/* Monthly Additions */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-zinc-300">معدل الإضافة الشهري (ملفات جديدة):</span>
                <span className="font-black text-emerald-400">+{monthlyAdditions} ملف / شهر</span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                step="5"
                value={monthlyAdditions}
                onChange={(e) => setMonthlyAdditions(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                تعادل حوالي {Math.round(monthlyAdditions / 4)} ملف أسبوعياً (جلسة تصوير أو تسجيل واحدة).
              </p>
            </div>

            {/* Monthly Download Rate per Asset */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-zinc-300">معدل التحميل الشهري لكل أصل:</span>
                <span className="font-black text-white">{downloadRate.toFixed(2)} تحميل / ملف</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1.50"
                step="0.05"
                value={downloadRate}
                onChange={(e) => setDownloadRate(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <p className="text-[10px] text-zinc-500 mt-1">
                المتوسط المتحفظ في السوق يتراوح بين 0.15 و0.40 تحميل شهرياً لكل ملف مقبول.
              </p>
            </div>

            {/* Average Royalty Per Download */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-zinc-300">متوسط العمولة لكل تحميل:</span>
                <span className="font-black text-amber-400">${avgRoyalty.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.30"
                max="35.0"
                step="0.20"
                value={avgRoyalty}
                onChange={(e) => setAvgRoyalty(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <p className="text-[10px] text-zinc-500 mt-1">
                الصور: 0.35$ - 1.20$ · الفيديو 4K: 12$ - 35$ · المؤثرات الصوتية: 2$ - 8$
              </p>
            </div>

            {/* Monthly Expenses */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-zinc-300">المصاريف الشهرية (تخزين، تنقل، إكسسوارات):</span>
                <span className="font-black text-rose-400">${monthlyExpenses}</span>
              </div>
              <input
                type="range"
                min="0"
                max="150"
                step="5"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>

            {/* Target Income */}
            <div className="pt-2 border-t border-zinc-800">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold text-zinc-300">هدفك للدخل السلبي الشهري:</span>
                <span className="font-black text-emerald-400">${targetIncome} / شهر</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[300, 500, 1000, 2500].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTargetIncome(t)}
                    className={`py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      targetIncome === t
                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    ${t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-zinc-900/60 to-zinc-950 p-5">
              <span className="text-[11px] font-bold text-amber-400/90 uppercase tracking-wider">الدخل الشهري الحالي المقدر</span>
              <div className="mt-2 text-3xl font-black text-white">
                ${Math.round(currentGrossRevenue)}
              </div>
              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-zinc-400">صافي بعد المصاريف:</span>
                <span className="font-bold text-emerald-400">${Math.round(currentNetProfit)}</span>
              </div>
              <div className="mt-2 text-[10px] text-zinc-500 border-t border-zinc-800/80 pt-1.5">
                بناءً على {currentMonthlyDownloads} تحميلاً شهرياً
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">العائد لكل أصل (RPI)</span>
              <div className="mt-2 text-3xl font-black text-amber-400">
                ${rpi.toFixed(2)}
              </div>
              <div className="mt-1 text-xs text-zinc-400">
                متوسط العائد الشهري لكل ملف
              </div>
              <div className="mt-2 text-[10px] text-zinc-500 border-t border-zinc-800/80 pt-1.5">
                مقياس الكفاءة النوعية للمحتوى
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-zinc-900/60 to-zinc-950 p-5">
              <span className="text-[11px] font-bold text-emerald-400/90 uppercase tracking-wider">الوصول للهدف (${targetIncome})</span>
              <div className="mt-2 text-3xl font-black text-emerald-300">
                {monthsToTarget <= 0 ? 'متحقق الآن!' : `${monthsToTarget} أشهر`}
              </div>
              <div className="mt-1 text-xs text-zinc-400">
                تحتاج محفظة من: <span className="text-white font-bold">{targetAssetsNeeded} ملف</span>
              </div>
              <div className="mt-2 text-[10px] text-zinc-500 border-t border-zinc-800/80 pt-1.5">
                بمعدل +{monthlyAdditions} ملف شهرياً
              </div>
            </div>
          </div>

          {/* Growth Projection Timeline */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
            <h4 className="text-sm font-black text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span>مسار نمو المحفظة والدخل التراكمي (Snowball Effect)</span>
              </span>
              <span className="text-xs text-zinc-400">توقعات استمرارية الإنتاج</span>
            </h4>

            <div className="space-y-4 pt-2">
              {/* Today */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-zinc-500" />
                    <span className="font-bold text-zinc-300">الوضع الحالي (اليوم):</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-400">{portfolioSize} ملف</span>
                    <span className="font-black text-white">${Math.round(currentGrossRevenue)} / شهر</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-zinc-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(10, (portfolioSize / portfolioSize12Mo) * 100))}%` }}
                  />
                </div>
              </div>

              {/* 6 Months */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span className="font-bold text-amber-300">بعد 6 أشهر (+{monthlyAdditions * 6} ملف):</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-400">{portfolioSize6Mo} ملف</span>
                    <span className="font-black text-amber-400">${grossRevenue6Mo} / شهر</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(20, (portfolioSize6Mo / portfolioSize12Mo) * 100))}%` }}
                  />
                </div>
              </div>

              {/* 12 Months */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="font-bold text-emerald-300">بعد سنة كاملة (+{monthlyAdditions * 12} ملف):</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-400">{portfolioSize12Mo} ملف</span>
                    <span className="font-black text-emerald-400">${grossRevenue12Mo} / شهر</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs text-zinc-400 leading-relaxed">
              <span className="text-amber-400 font-bold ml-1">ملاحظة واقعية:</span>
              في سوق الستوك، الملفات التي تنتجها لا تنتهي صلاحيتها بانتهاء الشهر، بل تظل تباع على مدار سنوات قادمة. إضافة 30 ملفاً شهرياً فقط تبني لك بعد عامين أصلاً رقمياً يدر أكثر من 1,500$ شهرياً دون تكلفة إعادة إنتاج.
            </div>
          </div>

          {/* Strategic Recommendations based on selection */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-3">
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>توصيات الذكاء الاستثماري لتحسين محفظتك</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="font-bold text-amber-300 block mb-1">ضاعف نسبة الفيديو 4K:</span>
                <p className="text-zinc-400 leading-relaxed">
                  مقطع فيديو واحد يباع بـ 15$ - 35$ يعادل عائد 30 إلى 60 تحميلاً لصورة عادية. خصص 30% على الأقل من وقت جلساتك لتصوير لقطات B-roll قصيرة.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="font-bold text-emerald-300 block mb-1">الرفع متعدد المنصات:</span>
                <p className="text-zinc-400 leading-relaxed">
                  لا تقتصر على Adobe Stock وحدها؛ نشر نفس الملفات غير الحصرية على Shutterstock وPond5 يرفع إجمالي أرباح هذا التقدير بنسبة 60% إلى 120% فوراً.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
