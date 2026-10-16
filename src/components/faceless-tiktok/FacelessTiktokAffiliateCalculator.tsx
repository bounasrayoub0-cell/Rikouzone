import React, { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, Sparkles, AlertTriangle, ShieldCheck, Calculator, RefreshCw, Layers } from 'lucide-react';

export const FacelessTiktokAffiliateCalculator: React.FC = () => {
  const [views, setViews] = useState<number>(50000);
  const [ctr, setCtr] = useState<number>(1.5); // % click to bio
  const [conversionRate, setConversionRate] = useState<number>(2.5); // % buy
  const [productPrice, setProductPrice] = useState<number>(45); // $
  const [commissionPct, setCommissionPct] = useState<number>(30); // %

  const calculations = useMemo(() => {
    const clicks = Math.round(views * (ctr / 100));
    const buyers = Math.max(0, Math.round(clicks * (conversionRate / 100)));
    const totalSalesVolume = buyers * productPrice;
    const netEarnings = Math.round(totalSalesVolume * (commissionPct / 100));
    const rpm = views > 0 ? ((netEarnings / views) * 1000).toFixed(2) : '0';

    return {
      clicks,
      buyers,
      totalSalesVolume,
      netEarnings,
      rpm
    };
  }, [views, ctr, conversionRate, productPrice, commissionPct]);

  const applyPreset = (preset: 'conservative' | 'moderate' | 'optimistic') => {
    if (preset === 'conservative') {
      setCtr(0.8);
      setConversionRate(1.5);
      setCommissionPct(20);
    } else if (preset === 'moderate') {
      setCtr(1.5);
      setConversionRate(2.5);
      setCommissionPct(30);
    } else if (preset === 'optimistic') {
      setCtr(3.0);
      setConversionRate(4.0);
      setCommissionPct(35);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 mb-3">
              <Calculator className="h-3.5 w-3.5" />
              <span>حاسبة التسويق بالعمولة الافتراضية (Affiliate Revenue Estimator)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              تقدير إيرادات العمولات الافتراضية بناءً على أرقامك
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              جرّب سيناريوهات مختلفة لاكتشاف كيف تؤثر نسبة النقر على رابط البايو (CTR) ومعدل التحويل (Conversion Rate) ونسبة العمولة على أرباحك المتوقعة.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset('conservative')}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors cursor-pointer"
            >
              سيناريو متحفظ
            </button>
            <button
              onClick={() => applyPreset('moderate')}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 text-xs font-bold transition-colors cursor-pointer"
            >
              سيناريو متوسط
            </button>
            <button
              onClick={() => applyPreset('optimistic')}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 text-xs font-bold transition-colors cursor-pointer"
            >
              سيناريو متفائل
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders and Inputs */}
        <div className="lg:col-span-6 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-5">
          <h3 className="text-sm font-black text-white pb-3 border-b border-zinc-800">
            مدخلات الأداء الافتراضية
          </h3>

          {/* Monthly Views */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-300">المشاهدات الشهرية المتوقعة:</span>
              <span className="text-cyan-400 font-black">{views.toLocaleString()} مشاهدة</span>
            </div>
            <input
              type="range"
              min={5000}
              max={500000}
              step={5000}
              value={views}
              onChange={(e) => setViews(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Link in Bio CTR */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-300">نسبة النقر على رابط البايو (CTR):</span>
              <span className="text-emerald-400 font-black">{ctr}%</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={6.0}
              step={0.1}
              value={ctr}
              onChange={(e) => setCtr(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="text-[10px] text-zinc-500">المتوسط المعتاد في تيك توك: بين 1% إلى 2.5%</div>
          </div>

          {/* Conversion Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-300">معدل التحويل للشراء في صفحة المنتج:</span>
              <span className="text-amber-400 font-black">{conversionRate}%</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={8.0}
              step={0.1}
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="text-[10px] text-zinc-500">المتوسط في المنتجات الرقمية والاشتراكات: بين 1.5% إلى 3%</div>
          </div>

          {/* Product Price */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-300">متوسط سعر المنتج أو الاشتراك:</span>
              <span className="text-white font-black">${productPrice}</span>
            </div>
            <input
              type="range"
              min={10}
              max={250}
              step={5}
              value={productPrice}
              onChange={(e) => setProductPrice(Number(e.target.value))}
              className="w-full accent-white cursor-pointer"
            />
          </div>

          {/* Commission % */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-300">نسبة العمولة المتفق عليها:</span>
              <span className="text-purple-400 font-black">{commissionPct}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={commissionPct}
              onChange={(e) => setCommissionPct(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
            <div className="text-[10px] text-zinc-500">
              أدوات السوفتوير (SaaS) تدفع عادة 20%-40%، بينما أمازون يدفع 3%-10%.
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950/20 p-6 space-y-5">
            <h3 className="text-sm font-black text-white pb-3 border-b border-zinc-800 flex items-center justify-between">
              <span>النتائج الافتراضية المقدرة</span>
              <span className="text-xs text-emerald-400 font-bold">تقديرات شهرية</span>
            </h3>

            {/* Big Net Earnings Card */}
            <div className="p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 text-center space-y-1">
              <div className="text-xs text-zinc-400 font-bold">صافي العمولات المتوقعة</div>
              <div className="text-4xl sm:text-5xl font-black text-emerald-400">
                ${calculations.netEarnings.toLocaleString()}
              </div>
              <div className="text-xs text-zinc-500 pt-1">
                معدل الربح لكل 1000 مشاهدة (RPM): <span className="text-cyan-400 font-bold">${calculations.rpm}</span>
              </div>
            </div>

            {/* Pipeline Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800 text-center">
                <div className="text-zinc-500 mb-1">النقرات على رابط البايو</div>
                <div className="text-lg font-black text-cyan-400">{calculations.clicks.toLocaleString()} نقرة</div>
              </div>
              <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800 text-center">
                <div className="text-zinc-500 mb-1">المبيعات المتوقعة</div>
                <div className="text-lg font-black text-amber-400">{calculations.buyers.toLocaleString()} عميل</div>
              </div>
              <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800 text-center col-span-2">
                <div className="text-zinc-500 mb-1">إجمالي حجم المبيعات المتولدة (GMV)</div>
                <div className="text-lg font-black text-white">${calculations.totalSalesVolume.toLocaleString()}</div>
              </div>
            </div>

            {/* Practical Takeaway */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-300 space-y-1 leading-relaxed">
              <span className="text-cyan-400 font-bold block">💡 كيف ترفع هذه الأرقام واقعياً؟</span>
              <span>
                تحسين نسبة الـ CTR بنسبة 1% فقط (عبر دعوة CTA محددة وتقديم دليل مجاني ملحق) يضاعف عدد المشترين وصافي الأرباح دون الحاجة لزيادة المشاهدات.
              </span>
            </div>
          </div>

          {/* Prominent Disclaimer */}
          <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-950/20 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>إخلاء مسؤولية وتنبيه شفاف صارم</span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              هذه الأرقام افتراضية وتوضيحية لأغراض التدريب والتخطيط فقط وليست ضماناً لتحقيق أي دخل مالي. الأرباح الحقيقية تعتمد حصراً على مصداقية العرض، اهتمام الجمهور، شروط برنامج الشراكة، وتجربة المتابع الفعلية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
