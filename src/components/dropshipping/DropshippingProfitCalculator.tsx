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
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const DropshippingProfitCalculator: React.FC = () => {
  const { isRTL } = useLanguage();

  // Basic Unit Inputs
  const [sellingPrice, setSellingPrice] = useState<number>(39.99);
  const [productCost, setProductCost] = useState<number>(10.50);
  const [shippingCost, setShippingCost] = useState<number>(4.50);
  const [adCostPerOrder, setAdCostPerOrder] = useState<number>(12.00);
  const [gatewayFeePercent, setGatewayFeePercent] = useState<number>(2.9);
  const [gatewayFixedFee, setGatewayFixedFee] = useState<number>(0.30);
  const [refundReservePercent, setRefundReservePercent] = useState<number>(3.0);

  // Volume & Fixed Overhead
  const [monthlyOrders, setMonthlyOrders] = useState<number>(150);
  const [fixedOverheadMonthly, setFixedOverheadMonthly] = useState<number>(65); // Shopify + Apps + Domain

  // Presets
  const applyPreset = (preset: 'organizer' | 'gadget' | 'massager' | 'lamp') => {
    if (preset === 'organizer') {
      setSellingPrice(24.99);
      setProductCost(4.50);
      setShippingCost(3.20);
      setAdCostPerOrder(8.00);
      setRefundReservePercent(2.0);
      setMonthlyOrders(200);
    } else if (preset === 'gadget') {
      setSellingPrice(39.99);
      setProductCost(10.50);
      setShippingCost(4.50);
      setAdCostPerOrder(12.00);
      setRefundReservePercent(3.0);
      setMonthlyOrders(150);
    } else if (preset === 'massager') {
      setSellingPrice(59.99);
      setProductCost(16.00);
      setShippingCost(6.50);
      setAdCostPerOrder(18.00);
      setRefundReservePercent(4.5);
      setMonthlyOrders(100);
    } else if (preset === 'lamp') {
      setSellingPrice(44.99);
      setProductCost(12.00);
      setShippingCost(5.00);
      setAdCostPerOrder(14.00);
      setRefundReservePercent(3.0);
      setMonthlyOrders(120);
    }
  };

  const resetDefaults = () => {
    applyPreset('gadget');
  };

  // Calculations
  const calculations = useMemo(() => {
    const safeSelling = Math.max(0.1, Number(sellingPrice) || 0);
    const safeProduct = Math.max(0, Number(productCost) || 0);
    const safeShipping = Math.max(0, Number(shippingCost) || 0);
    const safeAd = Math.max(0, Number(adCostPerOrder) || 0);
    const safeGatewayPct = Math.max(0, Number(gatewayFeePercent) || 0) / 100;
    const safeGatewayFix = Math.max(0, Number(gatewayFixedFee) || 0);
    const safeRefundPct = Math.max(0, Number(refundReservePercent) || 0) / 100;
    const safeOrders = Math.max(1, Number(monthlyOrders) || 1);
    const safeOverhead = Math.max(0, Number(fixedOverheadMonthly) || 0);

    // COGS
    const totalCogs = safeProduct + safeShipping;

    // Fees per order
    const gatewayFee = (safeSelling * safeGatewayPct) + safeGatewayFix;
    const refundReserve = safeSelling * safeRefundPct;

    // Total Variable Cost per Order
    const totalVariableCost = totalCogs + safeAd + gatewayFee + refundReserve;

    // Unit Net Profit before overhead
    const unitNetProfit = safeSelling - totalVariableCost;
    const unitProfitMarginPercent = (unitNetProfit / safeSelling) * 100;

    // Markup multiplier
    const markupMultiple = totalCogs > 0 ? safeSelling / totalCogs : 0;

    // Break-even CPA (Max you can pay for ad per acquisition without losing money)
    const breakEvenCPA = safeSelling - (totalCogs + gatewayFee + refundReserve);

    // Break-even ROAS (Revenue / Ad Spend needed to break even)
    // At break-even: Ad Spend = breakEvenCPA. ROAS = safeSelling / breakEvenCPA
    const breakEvenROAS = breakEvenCPA > 0 ? safeSelling / breakEvenCPA : 0;

    // Current ROAS
    const currentROAS = safeAd > 0 ? safeSelling / safeAd : 0;

    // Monthly Projections
    const monthlyGrossRevenue = safeSelling * safeOrders;
    const monthlyTotalCogs = totalCogs * safeOrders;
    const monthlyAdSpend = safeAd * safeOrders;
    const monthlyPaymentFees = gatewayFee * safeOrders;
    const monthlyRefundReserves = refundReserve * safeOrders;
    const monthlyTotalVariable = totalVariableCost * safeOrders;
    const monthlyNetProfit = (unitNetProfit * safeOrders) - safeOverhead;
    const monthlyNetMarginPercent = monthlyGrossRevenue > 0 ? (monthlyNetProfit / monthlyGrossRevenue) * 100 : 0;

    return {
      totalCogs,
      gatewayFee,
      refundReserve,
      totalVariableCost,
      unitNetProfit,
      unitProfitMarginPercent,
      markupMultiple,
      breakEvenCPA,
      breakEvenROAS,
      currentROAS,
      monthlyGrossRevenue,
      monthlyTotalCogs,
      monthlyAdSpend,
      monthlyPaymentFees,
      monthlyRefundReserves,
      monthlyTotalVariable,
      monthlyNetProfit,
      monthlyNetMarginPercent
    };
  }, [
    sellingPrice,
    productCost,
    shippingCost,
    adCostPerOrder,
    gatewayFeePercent,
    gatewayFixedFee,
    refundReservePercent,
    monthlyOrders,
    fixedOverheadMonthly
  ]);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>حاسبة الهوامش واقتصاديات الطلب الحقيقي</span>
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-black text-white">
              حاسبة أرباح ونقطة تعادل الدروب شيبينغ (Unit Economics)
            </h3>
            <p className="mt-1 text-sm text-zinc-400 max-w-2xl">
              احسب صافي الربح الحقيقي لكل طلب بعد احتساب تكلفة المورد، الشحن الدولي، بوابات الدفع، واقتطاعات الإعلانات ونسبة المرتجعات دون أي أوهام.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={resetDefaults}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>إعادة الضبط</span>
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80">
          <div className="text-xs font-semibold text-zinc-400 mb-2">أمثلة جاهزة للتجربة السريعة:</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset('organizer')}
              className="rounded-lg border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 px-3 py-1.5 text-xs text-zinc-200 transition"
            >
              📦 أداة تنظيم مكتبية ($24.99)
            </button>
            <button
              onClick={() => applyPreset('gadget')}
              className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 text-xs text-emerald-300 transition"
            >
              ⚡ جهاز إلكتروني ذكي ($39.99)
            </button>
            <button
              onClick={() => applyPreset('lamp')}
              className="rounded-lg border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 px-3 py-1.5 text-xs text-zinc-200 transition"
            >
              💡 مصباح لاسلكي مبتكر ($44.99)
            </button>
            <button
              onClick={() => applyPreset('massager')}
              className="rounded-lg border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 px-3 py-1.5 text-xs text-zinc-200 transition"
            >
              💆 جهاز مساج محمول ($59.99)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Unit Pricing & Costs */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-5">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <DollarSign className="h-5 w-5 text-emerald-400" />
              <h4 className="font-bold text-white text-base">1. سعر البيع وتكاليف المورد (لكل وحدة)</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  سعر بيع المنتج في متجرك ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-500 text-sm">$</span>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-7 py-2 text-sm font-semibold text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <p className="mt-1 text-[11px] text-zinc-500">السعر النهائي الذي يدفعه الزبون عند الدفع</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  سعر شراء المنتج من المورد ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-500 text-sm">$</span>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={productCost}
                    onChange={(e) => setProductCost(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-7 py-2 text-sm font-semibold text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <p className="mt-1 text-[11px] text-zinc-500">تكلفة القطعة الواحدة في علي إكسبرس أو CJ</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  تكلفة الشحن الدولي لكل طلب ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-500 text-sm">$</span>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-7 py-2 text-sm font-semibold text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <p className="mt-1 text-[11px] text-zinc-500">سعر خط الشحن السريع (CJPacket / Special Line)</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  تكلفة الإعلانات لكل عملية شراء CPA ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-500 text-sm">$</span>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={adCostPerOrder}
                    onChange={(e) => setAdCostPerOrder(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-7 py-2 text-sm font-semibold text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <p className="mt-1 text-[11px] text-zinc-500">ما تنفقه على TikTok أو فيسبوك لجلب طلب واحد (أو 0$ للعضوي)</p>
              </div>
            </div>
          </div>

          {/* Card 2: Gateway & Risk Reserves */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-5">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Percent className="h-5 w-5 text-blue-400" />
              <h4 className="font-bold text-white text-base">2. رسوم بوابات الدفع واحتياطي المرتجعات</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  نسبة بوابة الدفع (%)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-500 text-sm">%</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={gatewayFeePercent}
                    onChange={(e) => setGatewayFeePercent(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-7 py-2 text-sm font-semibold text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <p className="mt-1 text-[11px] text-zinc-500">Stripe: عادة 2.9%</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  رسم المعاملة الثابت ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-500 text-sm">$</span>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    value={gatewayFixedFee}
                    onChange={(e) => setGatewayFixedFee(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-7 py-2 text-sm font-semibold text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <p className="mt-1 text-[11px] text-zinc-500">عادة $0.30 لكل معاملة</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  احتياطي الإرجاع والتلف (%)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-500 text-sm">%</span>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={refundReservePercent}
                    onChange={(e) => setRefundReservePercent(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-7 py-2 text-sm font-semibold text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <p className="mt-1 text-[11px] text-zinc-500">موصى بـ 2% - 5% للطوارئ</p>
              </div>
            </div>
          </div>

          {/* Card 3: Monthly Volume & Fixed Subscriptions */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-5">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <TrendingUp className="h-5 w-5 text-amber-400" />
              <h4 className="font-bold text-white text-base">3. الحجم الشهري والتكاليف الثابتة للمتجر</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  عدد الطلبات التقديري شهرياً
                </label>
                <input
                  type="number"
                  step="10"
                  min="1"
                  value={monthlyOrders}
                  onChange={(e) => setMonthlyOrders(parseInt(e.target.value, 10) || 1)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2 text-sm font-semibold text-white focus:border-amber-500 focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-zinc-500">مثلاً: 5 طلبات يومياً = 150 طلب شهرياً</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  الاشتراكات الشهرية الثابتة ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-500 text-sm">$</span>
                  <input
                    type="number"
                    step="5"
                    min="0"
                    value={fixedOverheadMonthly}
                    onChange={(e) => setFixedOverheadMonthly(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-7 py-2 text-sm font-semibold text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <p className="mt-1 text-[11px] text-zinc-500">شوبيفاي (~$39) + تطبيقات وإيميلات ودومين</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary & Analysis (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Profit Card */}
          <div className={`rounded-2xl border p-6 transition shadow-2xl ${
            calculations.unitNetProfit > 0 
              ? 'border-emerald-500/40 bg-gradient-to-b from-emerald-950/40 via-zinc-900 to-zinc-950' 
              : 'border-rose-500/40 bg-gradient-to-b from-rose-950/40 via-zinc-900 to-zinc-950'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                صافي ربح الطلب الواحد (Unit Profit)
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-black ${
                calculations.unitProfitMarginPercent >= 25 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : calculations.unitProfitMarginPercent > 0
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                هامش {calculations.unitProfitMarginPercent.toFixed(1)}%
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className={`text-4xl sm:text-5xl font-black ${
                calculations.unitNetProfit > 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                ${calculations.unitNetProfit.toFixed(2)}
              </span>
              <span className="text-xs text-zinc-400">صافي في جيبك لكل مبيعة</span>
            </div>

            {/* Diagnostic Alert */}
            <div className="mt-4">
              {calculations.unitNetProfit <= 0 ? (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                  <div>
                    <strong>أنت تخسر مالاً على كل طلب!</strong> مجموع تكلفة المنتج والشحن والإعلانات يتجاوز سعر البيع. ارفع سعر البيع أو اخفض تكلفة الإعلانات.
                  </div>
                </div>
              ) : calculations.unitProfitMarginPercent < 20 ? (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <strong>هامش ربح ضيق (&lt; 20%)</strong> قد يجعلك عرضة للخسارة في حال حدوث أي تقلب في تكلفة الإعلانات أو زيادة في المرتجعات.
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <strong>اقتصاديات ممتازة ومستقرة!</strong> هامش ربحك قوي ويوفر أماناً مالياً كافياً للتوسع واختبار الإعلانات بأمان.
                  </div>
                </div>
              )}
            </div>

            {/* Breakdown List */}
            <div className="mt-6 pt-5 border-t border-zinc-800 space-y-2.5 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span>سعر البيع للزبون:</span>
                <span className="font-bold text-white">${Number(sellingPrice).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>تكلفة المنتج والشحن (COGS):</span>
                <span className="text-rose-400">-${calculations.totalCogs.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>تكلفة الإعلان لكل طلب (CPA):</span>
                <span className="text-rose-400">-${Number(adCostPerOrder).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>رسوم بوابة الدفع (Stripe/PayPal):</span>
                <span className="text-rose-400">-${calculations.gatewayFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>احتياطي المرتجعات والتلف:</span>
                <span className="text-rose-400">-${calculations.refundReserve.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between font-bold text-sm">
                <span className="text-zinc-200">الربح المتبقي لكل قطعة:</span>
                <span className={calculations.unitNetProfit > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  ${calculations.unitNetProfit.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Key Metrics: Break-Even CPA & ROAS */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>مؤشرات الإعلانات ونقاط التعادل (Break-Even)</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-800/40 p-3">
                <div className="text-[11px] text-zinc-400 font-medium">أقصى كلفة إعلان مسموحة (BE CPA)</div>
                <div className="mt-1 text-lg font-black text-white">
                  ${Math.max(0, calculations.breakEvenCPA).toFixed(2)}
                </div>
                <p className="mt-0.5 text-[10px] text-zinc-500">إذا تجاوز CPA هذا الرقم ستخسر</p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-800/40 p-3">
                <div className="text-[11px] text-zinc-400 font-medium">نقطة تعادل العائد (BE ROAS)</div>
                <div className="mt-1 text-lg font-black text-white">
                  {calculations.breakEvenROAS.toFixed(2)}x
                </div>
                <p className="mt-0.5 text-[10px] text-zinc-500">الحد الأدنى لعائد الإعلانات</p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-800/40 p-3">
                <div className="text-[11px] text-zinc-400 font-medium">مضاعف التسعير (Markup)</div>
                <div className="mt-1 text-lg font-black text-emerald-400">
                  {calculations.markupMultiple.toFixed(1)}x
                </div>
                <p className="mt-0.5 text-[10px] text-zinc-500">الموصى به: 2.5x إلى 3.5x</p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-800/40 p-3">
                <div className="text-[11px] text-zinc-400 font-medium">عائد الإعلان الحالي (ROAS)</div>
                <div className="mt-1 text-lg font-black text-amber-400">
                  {calculations.currentROAS.toFixed(2)}x
                </div>
                <p className="mt-0.5 text-[10px] text-zinc-500">سعر البيع ÷ تكلفة الإعلان</p>
              </div>
            </div>
          </div>

          {/* Monthly Projections */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-purple-400" />
              <span>التوقعات الشهرية عند تحقيق {monthlyOrders} طلب</span>
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">إجمالي المبيعات (Revenue):</span>
                <span className="font-bold text-white text-sm">${calculations.monthlyGrossRevenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">تكلفة البضائع للمورد:</span>
                <span className="text-rose-400">-${calculations.monthlyTotalCogs.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">إجمالي ميزانية الإعلانات:</span>
                <span className="text-rose-400">-${calculations.monthlyAdSpend.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">بوابات الدفع واحتياطي المرتجعات:</span>
                <span className="text-rose-400">-${(calculations.monthlyPaymentFees + calculations.monthlyRefundReserves).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">الاشتراكات الشهرية الثابتة للمتجر:</span>
                <span className="text-rose-400">-${Number(fixedOverheadMonthly).toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-between items-center">
                <span className="font-bold text-zinc-200 text-sm">صافي الربح الشهري في جيبك:</span>
                <span className={`text-xl font-black ${
                  calculations.monthlyNetProfit > 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  ${calculations.monthlyNetProfit.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);
