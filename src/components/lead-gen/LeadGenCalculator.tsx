import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, AlertCircle, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface NichePreset {
  name: string;
  leadsGenerated: number;
  qualifiedRate: number;
  acceptanceRate: number;
  pricePerLead: number;
  adSpend: number;
  operatingCosts: number;
}

const PRESETS: NichePreset[] = [
  {
    name: 'عزل الأسطح والمقاولات (Roofing / Waterproofing)',
    leadsGenerated: 80,
    qualifiedRate: 70,
    acceptanceRate: 85,
    pricePerLead: 45,
    adSpend: 850,
    operatingCosts: 150
  },
  {
    name: 'صيانة وتكييف مركزي (HVAC)',
    leadsGenerated: 120,
    qualifiedRate: 75,
    acceptanceRate: 80,
    pricePerLead: 30,
    adSpend: 900,
    operatingCosts: 120
  },
  {
    name: 'عيادات الأسنان والجلدية (Medical / Dental)',
    leadsGenerated: 100,
    qualifiedRate: 65,
    acceptanceRate: 85,
    pricePerLead: 40,
    adSpend: 1100,
    operatingCosts: 200
  },
  {
    name: 'تنظيف الخزانات ونقل الأثاث (Moving / Cleaning)',
    leadsGenerated: 150,
    qualifiedRate: 80,
    acceptanceRate: 90,
    pricePerLead: 20,
    adSpend: 950,
    operatingCosts: 100
  }
];

export const LeadGenCalculator: React.FC = () => {
  // Inputs as required in Lesson 10 & Prompt
  const [leadsGenerated, setLeadsGenerated] = useState<number>(80);
  const [qualifiedRate, setQualifiedRate] = useState<number>(70); // %
  const [acceptanceRate, setAcceptanceRate] = useState<number>(85); // %
  const [pricePerLead, setPricePerLead] = useState<number>(45); // $
  const [adSpend, setAdSpend] = useState<number>(850); // $
  const [operatingCosts, setOperatingCosts] = useState<number>(150); // $

  // Calculations
  const qualifiedLeads = Math.round((leadsGenerated * qualifiedRate) / 100);
  const acceptedLeads = Math.round((qualifiedLeads * acceptanceRate) / 100);
  const grossRevenue = acceptedLeads * pricePerLead;
  const totalCosts = adSpend + operatingCosts;
  const netProfit = grossRevenue - totalCosts;
  const profitMargin = grossRevenue > 0 ? Math.round((netProfit / grossRevenue) * 100) : 0;
  
  const costPerRawLead = leadsGenerated > 0 ? (totalCosts / leadsGenerated).toFixed(1) : '0';
  const costPerQualifiedLead = qualifiedLeads > 0 ? (totalCosts / qualifiedLeads).toFixed(1) : '0';
  const costPerAcceptedLead = acceptedLeads > 0 ? (totalCosts / acceptedLeads).toFixed(1) : '0';

  const applyPreset = (preset: NichePreset) => {
    setLeadsGenerated(preset.leadsGenerated);
    setQualifiedRate(preset.qualifiedRate);
    setAcceptanceRate(preset.acceptanceRate);
    setPricePerLead(preset.pricePerLead);
    setAdSpend(preset.adSpend);
    setOperatingCosts(preset.operatingCosts);
  };

  const resetDefaults = () => {
    setLeadsGenerated(80);
    setQualifiedRate(70);
    setAcceptanceRate(85);
    setPricePerLead(45);
    setAdSpend(850);
    setOperatingCosts(150);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-right" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900/90 via-zinc-900/50 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
          <Calculator className="h-3.5 w-3.5" />
          <span>الدرس 10: حاسبة تكلفة الفرص والإيرادات والأرباح</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          حاسبة نموذج توليد العملاء المحليين (Lead Gen Profit Calculator)
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
          أدخل معطيات مشروعك التقديرية لتحليل عدد الفرص المقبولة، الإيرادات المتوقعة، إجمالي التكاليف الإعلانية والتشغيلية، وصافي الربح وهامش الأمان دون افتراض أرقام خيالية.
        </p>

        {/* Niche Presets */}
        <div className="pt-3 border-t border-zinc-800/80">
          <div className="text-xs font-bold text-zinc-400 mb-2 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>نماذج جاهزة لقطاعات محلية شائعة:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(p)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-cyan-500/50 transition-all cursor-pointer"
              >
                {p.name}
              </button>
            ))}
            <button
              onClick={resetDefaults}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-zinc-300 transition-all flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              <span>إعادة الضبط</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Layers className="h-4 w-4 text-cyan-400" />
              <span>معطيات الاستقطاب والتأهيل والأسعار</span>
            </h3>

            {/* Input 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-zinc-300">1. عدد الفرص المستقطبة شهرياً (الطلبات الخام):</span>
                <span className="font-mono text-cyan-400 font-bold">{leadsGenerated} فرصة</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={leadsGenerated}
                onChange={(e) => setLeadsGenerated(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="text-[11px] text-zinc-500">إجمالي الأشخاص الذين ملأوا النموذج أو الاستمارة على صفحة الهبوط.</div>
            </div>

            {/* Input 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-zinc-300">2. نسبة الفرص المؤهلة بعد الفرز (%):</span>
                <span className="font-mono text-emerald-400 font-bold">{qualifiedRate}% ({qualifiedLeads} فرصة)</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={qualifiedRate}
                onChange={(e) => setQualifiedRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="text-[11px] text-zinc-500">الطلبات التي تقع في النطاق الجغرافي وتحمل رقم هاتف صحيح ومالك عقار.</div>
            </div>

            {/* Input 3 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-zinc-300">3. نسبة قبول الشركة الشريكة للفرص (%):</span>
                <span className="font-mono text-indigo-400 font-bold">{acceptanceRate}% ({acceptedLeads} فرصة مقبولة)</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                step="5"
                value={acceptanceRate}
                onChange={(e) => setAcceptanceRate(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="text-[11px] text-zinc-500">الفرص التي أكد المقاول جاهزيتها للمعاينة واستبعد أي تكرار أو عدم رد مبرر.</div>
            </div>

            {/* Input 4 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-zinc-300">4. السعر المتفق عليه لكل فرصة مقبولة ($):</span>
                <span className="font-mono text-amber-400 font-bold">${pricePerLead}</span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                step="5"
                value={pricePerLead}
                onChange={(e) => setPricePerLead(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="text-[11px] text-zinc-500">المبلغ الذي يدفعه المقاول عن كل فرصة معتمدة وفق العقد (Pay Per Lead).</div>
            </div>

            {/* Input 5 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-zinc-300">5. تكاليف الإعلانات والاستضافة والأدوات ($):</span>
                <span className="font-mono text-rose-400 font-bold">${adSpend}</span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="25"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="text-[11px] text-zinc-500">ميزانية إعلانات فيسبوك/جوجل + اشتراك أداة النماذج أو الأتمتة السحابية.</div>
            </div>

            {/* Input 6 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-zinc-300">6. المصاريف التشغيلية والاحتياطي ($):</span>
                <span className="font-mono text-zinc-300 font-bold">${operatingCosts}</span>
              </div>
              <input
                type="range"
                min="0"
                max="800"
                step="25"
                value={operatingCosts}
                onChange={(e) => setOperatingCosts(Number(e.target.value))}
                className="w-full accent-zinc-500 cursor-pointer"
              />
              <div className="text-[11px] text-zinc-500">باقة الهاتف، اتصالات المتابعة، والاحتياطي المالي لأي طوارئ.</div>
            </div>
          </div>
        </div>

        {/* Right Financial Results (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>النتائج التقديرية للمشروع</span>
            </h3>

            {/* Big Net Profit Card */}
            <div className={`p-5 rounded-2xl border ${netProfit >= 0 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'} space-y-1 text-center`}>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">الربح الصافي التقديري شهرياً</div>
              <div className="text-3xl sm:text-4xl font-black font-mono">
                ${netProfit.toLocaleString()}
              </div>
              <div className="text-xs text-zinc-400 pt-1 font-semibold">
                هامش ربح صافي: <span className="font-mono font-bold text-white">{profitMargin}%</span>
              </div>
            </div>

            {/* Key Breakdown Metrics */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-zinc-400">عدد الفرص المقبولة (المفوترة):</span>
                <span className="font-mono font-bold text-white text-sm">{acceptedLeads} فرصة</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-zinc-400">الإيراد الإجمالي التقديري:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">${grossRevenue.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-zinc-400">إجمالي التكاليف (إعلانات + تشغيل):</span>
                <span className="font-mono font-bold text-rose-400 text-sm">${totalCosts.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-zinc-400">تكلفة الفرصة الخام الإعلانية:</span>
                <span className="font-mono font-bold text-zinc-300">${costPerRawLead}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-zinc-400">تكلفة الفرصة المقبولة الفعلية:</span>
                <span className="font-mono font-bold text-amber-400">${costPerAcceptedLead}</span>
              </div>
            </div>

            {/* Educational Disclaimer */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-zinc-300">
                <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>تنبيه مهني واقعي:</span>
              </div>
              <p className="leading-relaxed">
                هذه الأرقام نموذج افتراضي مبني على مدخلاتك التقديرية. تختلف تكلفة النقرات ومعدلات القبول حسب جودة الإعلانات والموسم وخبرة فنيي الشركة في التواصل وإغلاق الصفقات.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
