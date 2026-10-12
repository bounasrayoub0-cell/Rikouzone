import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles,
  HelpCircle,
  Percent,
  CheckCircle2,
  Package,
  Layers,
  Info
} from 'lucide-react';

interface CalculationInputs {
  sellingPrice: number;
  productCost: number;
  packagingCost: number;
  shippingCost: number;
  returnRatePercent: number;
  returnShippingCost: number;
  gatewayFeePercent: number;
  gatewayFixedFee: number;
  adCostPerOrder: number;
  monthlyFixedOverhead: number;
  targetMonthlyOrders: number;
}

const presetScenarios: { name: string; desc: string; values: CalculationInputs }[] = [
  {
    name: 'منتج محلي خفيف (تخصيص جاهز)',
    desc: 'بساط مكتبي أو إكسسوار جلدي بوزن خفيف وشحن محلي سريع ونسبة استلام عالية',
    values: {
      sellingPrice: 38,
      productCost: 7.5,
      packagingCost: 1.5,
      shippingCost: 4.0,
      returnRatePercent: 8,
      returnShippingCost: 3.5,
      gatewayFeePercent: 2.5,
      gatewayFixedFee: 0.3,
      adCostPerOrder: 9.0,
      monthlyFixedOverhead: 60,
      targetMonthlyOrders: 150
    }
  },
  {
    name: 'براند مستحضرات عناية / عطور',
    desc: 'هوامش ربح مرتفعة وتغليف فاخر، مع معدل إعادة شراء متكرر',
    values: {
      sellingPrice: 48,
      productCost: 8.0,
      packagingCost: 3.0,
      shippingCost: 4.5,
      returnRatePercent: 5,
      returnShippingCost: 4.0,
      gatewayFeePercent: 2.8,
      gatewayFixedFee: 0.3,
      adCostPerOrder: 13.0,
      monthlyFixedOverhead: 90,
      targetMonthlyOrders: 120
    }
  },
  {
    name: 'أدوات منزلية / قهوة (دفع عند الاستلام)',
    desc: 'سعر بيع ممتاز مع احتساب نسبة رفض أو مرتجعات واقعية (15%)',
    values: {
      sellingPrice: 52,
      productCost: 12.5,
      packagingCost: 2.5,
      shippingCost: 5.5,
      returnRatePercent: 14,
      returnShippingCost: 4.5,
      gatewayFeePercent: 1.5,
      gatewayFixedFee: 0.0,
      adCostPerOrder: 12.0,
      monthlyFixedOverhead: 80,
      targetMonthlyOrders: 100
    }
  }
];

export const BrandedEcommerceProfitCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInputs>(presetScenarios[0].values);

  const handleInputChange = (field: keyof CalculationInputs, val: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: isNaN(val) ? 0 : val
    }));
  };

  const handleLoadPreset = (scenarioValues: CalculationInputs) => {
    setInputs(scenarioValues);
  };

  // Unit Economics Mathematics
  const results = useMemo(() => {
    const {
      sellingPrice,
      productCost,
      packagingCost,
      shippingCost,
      returnRatePercent,
      returnShippingCost,
      gatewayFeePercent,
      gatewayFixedFee,
      adCostPerOrder,
      monthlyFixedOverhead,
      targetMonthlyOrders
    } = inputs;

    // 1. Direct gateway fees on successful transaction
    const gatewayFeePerOrder = (sellingPrice * (gatewayFeePercent / 100)) + gatewayFixedFee;

    // 2. Base direct production & fulfillment cost
    const directDeliveredCost = productCost + packagingCost + shippingCost + gatewayFeePerOrder + adCostPerOrder;

    // 3. Return cost penalty per delivered order
    // If return rate is r% (e.g. 10%), then for every 100 orders, 10 are returned.
    // The returned order pays packaging + return shipping + wasted ad cost, but no revenue.
    const returnFraction = Math.max(0, Math.min(0.5, returnRatePercent / 100));
    const successfulFraction = 1 - returnFraction;

    // Cost of a returned unit: return shipping + packaging/box loss + ad cost allocated
    const singleReturnedLoss = packagingCost + returnShippingCost + adCostPerOrder;
    // Penalty allocated per successful order
    const returnPenaltyPerDelivered = successfulFraction > 0
      ? (returnFraction / successfulFraction) * singleReturnedLoss
      : 0;

    // 4. True Unit Cost & Net Profit
    const trueTotalCostPerOrder = directDeliveredCost + returnPenaltyPerDelivered;
    const netProfitPerOrder = sellingPrice - trueTotalCostPerOrder;
    const netProfitMargin = sellingPrice > 0 ? (netProfitPerOrder / sellingPrice) * 100 : 0;

    // 5. Break-even ROAS
    // How much revenue needed per $1 of ad spend to break even
    const grossMarginBeforeAds = sellingPrice - (productCost + packagingCost + shippingCost + gatewayFeePerOrder + returnPenaltyPerDelivered);
    const breakEvenRoas = grossMarginBeforeAds > 0 ? (sellingPrice / grossMarginBeforeAds) : 0;

    // 6. Break-even orders for monthly fixed overheads
    const breakEvenOrdersNeeded = netProfitPerOrder > 0
      ? Math.ceil(monthlyFixedOverhead / netProfitPerOrder)
      : Infinity;

    // 7. Monthly Projections
    const projectedSuccessfulOrders = targetMonthlyOrders * successfulFraction;
    const projectedGrossRevenue = targetMonthlyOrders * sellingPrice;
    const projectedNetMonthlyProfit = (projectedSuccessfulOrders * netProfitPerOrder) - monthlyFixedOverhead;

    return {
      gatewayFeePerOrder: Number(gatewayFeePerOrder.toFixed(2)),
      directDeliveredCost: Number(directDeliveredCost.toFixed(2)),
      returnPenaltyPerDelivered: Number(returnPenaltyPerDelivered.toFixed(2)),
      trueTotalCostPerOrder: Number(trueTotalCostPerOrder.toFixed(2)),
      netProfitPerOrder: Number(netProfitPerOrder.toFixed(2)),
      netProfitMargin: Number(netProfitMargin.toFixed(1)),
      breakEvenRoas: Number(breakEvenRoas.toFixed(2)),
      breakEvenOrdersNeeded: isFinite(breakEvenOrdersNeeded) ? breakEvenOrdersNeeded : 0,
      projectedGrossRevenue: Number(projectedGrossRevenue.toFixed(0)),
      projectedNetMonthlyProfit: Number(projectedNetMonthlyProfit.toFixed(0)),
      projectedSuccessfulOrders: Math.round(projectedSuccessfulOrders)
    };
  }, [inputs]);

  const isHealthyMargin = results.netProfitMargin >= 22;
  const isDangerousMargin = results.netProfitMargin < 12;

  return (
    <div className="space-y-6">
      {/* Header and Presets */}
      <div className="rounded-3xl border border-zinc-800 bg-[#0c0d14]/90 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm shadow-amber-500/10">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>حاسبة هندسة الأرباح ونقطة التعادل (Unit Economics)</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-sans">
                  Branded E-commerce Model
                </span>
              </h2>
              <p className="mt-1 text-xs text-zinc-400">
                حساب التكاليف الحقيقية لكل طلب: تصنيع، تغليف مخصص، شحن، رسوم بوابات، تسويق، ومخصص المرتجعات.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleLoadPreset(presetScenarios[0].values)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700/60 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors cursor-pointer self-start md:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>إعادة ضبط الأرقام</span>
          </button>
        </div>

        {/* Preset Buttons */}
        <div className="mt-4 pt-1">
          <span className="text-[11px] font-bold text-zinc-400 block mb-2">نماذج أعمال تجريبية جاهزة للاختبار السريع:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {presetScenarios.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => handleLoadPreset(sc.values)}
                className="text-right p-3 rounded-2xl bg-[#10121a] hover:bg-[#151722] border border-zinc-800 hover:border-amber-500/40 transition-all cursor-pointer group"
              >
                <span className="text-xs font-black text-zinc-200 group-hover:text-amber-400 transition-colors block">
                  {sc.name}
                </span>
                <span className="text-[10px] text-zinc-400 mt-0.5 block leading-relaxed line-clamp-1">
                  {sc.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs vs Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left/Main Column: Input Sliders & Fields (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl border border-zinc-800 bg-[#0e1017]/90 p-5 sm:p-6 shadow-xl space-y-5">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Package className="h-4 w-4 text-amber-400" />
              <span>1. تكاليف المنتج وسعر البيع</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>سعر بيع المنتج للعميل ($)</span>
                  <span className="text-amber-400 font-sans font-black">{inputs.sellingPrice}$</span>
                </label>
                <input
                  type="number"
                  min="5"
                  max="500"
                  step="1"
                  value={inputs.sellingPrice}
                  onChange={(e) => handleInputChange('sellingPrice', parseFloat(e.target.value))}
                  className="w-full rounded-xl bg-[#141620] border border-zinc-800 px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>تكلفة تصنيع/شراء القطعة من المورد ($)</span>
                  <span className="text-zinc-200 font-sans font-bold">{inputs.productCost}$</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  step="0.5"
                  value={inputs.productCost}
                  onChange={(e) => handleInputChange('productCost', parseFloat(e.target.value))}
                  className="w-full rounded-xl bg-[#141620] border border-zinc-800 px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>التغليف المخصص وبطاقات الشكر والملصقات ($)</span>
                  <span className="text-zinc-200 font-sans font-bold">{inputs.packagingCost}$</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.25"
                  value={inputs.packagingCost}
                  onChange={(e) => handleInputChange('packagingCost', parseFloat(e.target.value))}
                  className="w-full rounded-xl bg-[#141620] border border-zinc-800 px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>تكلفة شحن الطرد الناجح للعميل ($)</span>
                  <span className="text-zinc-200 font-sans font-bold">{inputs.shippingCost}$</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  step="0.5"
                  value={inputs.shippingCost}
                  onChange={(e) => handleInputChange('shippingCost', parseFloat(e.target.value))}
                  className="w-full rounded-xl bg-[#141620] border border-zinc-800 px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500/60"
                />
              </div>
            </div>

            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-zinc-800 pt-3 pb-3">
              <TrendingUp className="h-4 w-4 text-orange-400" />
              <span>2. التسويق والمرتجعات ورسوم الدفع</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>تكلفة الإعلانات لجلب طلب واحد (CAC) ($)</span>
                  <span className="text-orange-400 font-sans font-black">{inputs.adCostPerOrder}$</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  step="0.5"
                  value={inputs.adCostPerOrder}
                  onChange={(e) => handleInputChange('adCostPerOrder', parseFloat(e.target.value))}
                  className="w-full rounded-xl bg-[#141620] border border-zinc-800 px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-orange-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>نسبة المرتجعات أو عدم الاستلام (%)</span>
                  <span className="text-red-400 font-sans font-black">{inputs.returnRatePercent}%</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  step="1"
                  value={inputs.returnRatePercent}
                  onChange={(e) => handleInputChange('returnRatePercent', parseFloat(e.target.value))}
                  className="w-full rounded-xl bg-[#141620] border border-zinc-800 px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-red-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>تكلفة شحن الطرد المرتجع ($)</span>
                  <span className="text-zinc-200 font-sans font-bold">{inputs.returnShippingCost}$</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.5"
                  value={inputs.returnShippingCost}
                  onChange={(e) => handleInputChange('returnShippingCost', parseFloat(e.target.value))}
                  className="w-full rounded-xl bg-[#141620] border border-zinc-800 px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>رسوم بوابة الدفع أو التحصيل (%)</span>
                  <span className="text-zinc-200 font-sans font-bold">{inputs.gatewayFeePercent}%</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={inputs.gatewayFeePercent}
                  onChange={(e) => handleInputChange('gatewayFeePercent', parseFloat(e.target.value))}
                  className="w-full rounded-xl bg-[#141620] border border-zinc-800 px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-zinc-700"
                />
              </div>
            </div>

            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-zinc-800 pt-3 pb-3">
              <Layers className="h-4 w-4 text-emerald-400" />
              <span>3. مصاريف التشغيل الشهرية والهدف</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>المصاريف الثابتة الشهرية (منصة، تطبيقات، هاتف) ($)</span>
                  <span className="text-zinc-200 font-sans font-bold">{inputs.monthlyFixedOverhead}$</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="500"
                  step="5"
                  value={inputs.monthlyFixedOverhead}
                  onChange={(e) => handleInputChange('monthlyFixedOverhead', parseFloat(e.target.value))}
                  className="w-full rounded-xl bg-[#141620] border border-zinc-800 px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>عدد الطلبات المستهدفة شهرياً</span>
                  <span className="text-emerald-400 font-sans font-black">{inputs.targetMonthlyOrders} طلب</span>
                </label>
                <input
                  type="number"
                  min="10"
                  max="2000"
                  step="10"
                  value={inputs.targetMonthlyOrders}
                  onChange={(e) => handleInputChange('targetMonthlyOrders', parseFloat(e.target.value))}
                  className="w-full rounded-xl bg-[#141620] border border-zinc-800 px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/60"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Economic Metrics & Projections (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Main Profit Card */}
          <div className={`rounded-3xl border p-5 sm:p-6 shadow-2xl transition-all ${
            results.netProfitPerOrder > 0 
              ? 'border-emerald-500/40 bg-gradient-to-b from-[#0a1811] via-[#0c120f] to-[#07080b]' 
              : 'border-red-500/40 bg-gradient-to-b from-[#180a0a] via-[#120c0c] to-[#07080b]'
          }`}>
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              صافي الربح التقديري للطلب الواحد
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`text-3xl sm:text-4xl font-black font-sans tracking-tight ${
                results.netProfitPerOrder > 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {results.netProfitPerOrder > 0 ? `+${results.netProfitPerOrder}` : results.netProfitPerOrder}$
              </span>
              <span className={`text-sm font-bold font-sans ${
                results.netProfitPerOrder > 0 ? 'text-emerald-300' : 'text-red-300'
              }`}>
                ({results.netProfitMargin}%)
              </span>
            </div>

            <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
              {results.netProfitPerOrder > 0 
                ? `من كل مبيعة بـ ${inputs.sellingPrice}$، يتبقى في جيبك صافي ربح حقيقي قدره ${results.netProfitPerOrder}$ بعد خصم كافة المصاريف والتسويق والمرتجعات.`
                : 'تحذير: هذا التسعير يسبب خسارة فعلية لكل طلب يخرج من متجرك! ارفع سعر البيع فوراً أو تفاوض مع المورد لخفض التكلفة.'}
            </p>

            {/* Progress / Margin Bar */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-zinc-400 font-bold">صحة هامش الربح:</span>
                <span className={`font-black ${
                  isHealthyMargin ? 'text-emerald-400' : isDangerousMargin ? 'text-red-400' : 'text-amber-400'
                }`}>
                  {isHealthyMargin ? 'هامش صحي ممتاز (22%+)' : isDangerousMargin ? 'هامش خطير جداً (<12%)' : 'هامش متوسط ومقبول'}
                </span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isHealthyMargin ? 'bg-emerald-500' : isDangerousMargin ? 'bg-red-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.max(5, Math.min(100, results.netProfitMargin * 2.5))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Detailed Cost Breakdown Table */}
          <div className="rounded-3xl border border-zinc-800 bg-[#0e1017]/90 p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-black text-white flex items-center gap-1.5 border-b border-zinc-800/80 pb-2.5">
              <Info className="h-3.5 w-3.5 text-amber-400" />
              <span>تفكيك تكلفة الطلب الواحد المنجز:</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-zinc-300">
                <span>تكلفة المنتج الخام:</span>
                <span className="font-mono font-bold text-zinc-200">{inputs.productCost}$</span>
              </div>
              <div className="flex items-center justify-between text-zinc-300">
                <span>التغليف وبطاقة الشكر:</span>
                <span className="font-mono font-bold text-zinc-200">{inputs.packagingCost}$</span>
              </div>
              <div className="flex items-center justify-between text-zinc-300">
                <span>أجرة الشحن والتوصيل:</span>
                <span className="font-mono font-bold text-zinc-200">{inputs.shippingCost}$</span>
              </div>
              <div className="flex items-center justify-between text-zinc-300">
                <span>رسوم بوابة الدفع/التحصيل:</span>
                <span className="font-mono font-bold text-zinc-200">{results.gatewayFeePerOrder}$</span>
              </div>
              <div className="flex items-center justify-between text-zinc-300">
                <span>تكلفة الإعلانات للطلب (CAC):</span>
                <span className="font-mono font-bold text-orange-400">{inputs.adCostPerOrder}$</span>
              </div>
              <div className="flex items-center justify-between text-zinc-300">
                <span className="flex items-center gap-1">
                  <span>مخصص خسائر المرتجعات:</span>
                  <span className="text-[10px] text-zinc-500">({inputs.returnRatePercent}%)</span>
                </span>
                <span className="font-mono font-bold text-red-400">+{results.returnPenaltyPerDelivered}$</span>
              </div>
              
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between font-bold text-white">
                <span>التكلفة الحقيقية الكاملة للطلب:</span>
                <span className="font-mono text-amber-400">{results.trueTotalCostPerOrder}$</span>
              </div>
            </div>
          </div>

          {/* Break-even & Monthly Projection */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-zinc-800 bg-[#0e1017]/90 p-3.5">
              <span className="text-[10px] text-zinc-400 font-bold block truncate">نقطة تعادل الإعلانات (Break-even ROAS)</span>
              <span className="text-base sm:text-lg font-black text-amber-400 font-mono mt-1 block">
                {results.breakEvenRoas}x
              </span>
              <span className="text-[9px] text-zinc-500 block mt-0.5 leading-tight">
                أي عائد إعلاني أعلى من {results.breakEvenRoas} يعني ربحاً صافياً.
              </span>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#0e1017]/90 p-3.5">
              <span className="text-[10px] text-zinc-400 font-bold block truncate">طلبات تغطية المصاريف الثابتة</span>
              <span className="text-base sm:text-lg font-black text-white font-mono mt-1 block">
                {results.breakEvenOrdersNeeded} طلب
              </span>
              <span className="text-[9px] text-zinc-500 block mt-0.5 leading-tight">
                لتغطية {inputs.monthlyFixedOverhead}$ مصاريف ثابتة شهرياً.
              </span>
            </div>
          </div>

          {/* Monthly Projection Box */}
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-[#12141e] to-[#0e1017] p-4 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-zinc-300">التوقع الشهري عند هدف ({inputs.targetMonthlyOrders} طلب):</span>
              <span className="text-[11px] text-zinc-400 font-mono">
                {results.projectedSuccessfulOrders} طلب ناجح
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <span className="text-zinc-400">صافي الأرباح الشهرية التقديرية:</span>
              <span className={`font-mono text-base font-black ${
                results.projectedNetMonthlyProfit > 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {results.projectedNetMonthlyProfit > 0 ? `+${results.projectedNetMonthlyProfit}` : results.projectedNetMonthlyProfit}$
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 block mt-1">
              * التوقع مبني على البيانات المدخلة ولا يمثل وعداً بالربح، بل أداة تخطيط مالي دقيقة.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
