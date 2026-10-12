import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  Percent, 
  HelpCircle, 
  Info, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Calculator
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface ProductPreset {
  id: string;
  name: string;
  defaultSalePrice: number;
  defaultBaseCost: number;
  defaultShipping: number;
  description: string;
}

const PRODUCT_PRESETS: ProductPreset[] = [
  {
    id: 'tshirt',
    name: 'تيشيرت كلاسيكي (Bella+Canvas 3001)',
    defaultSalePrice: 26.99,
    defaultBaseCost: 10.50,
    defaultShipping: 4.75,
    description: 'المنتج الأكثر شعبية وطلباً في عالم الطباعة عند الطلب.'
  },
  {
    id: 'hoodie',
    name: 'سترة بغطاء رأس (Gildan 18500 Hoodie)',
    defaultSalePrice: 44.99,
    defaultBaseCost: 21.00,
    defaultShipping: 7.50,
    description: 'منتج شتوي فاخر بهامش ربح نقدي مرتفع لكل قطعة.'
  },
  {
    id: 'mug',
    name: 'كوب قهوة سيراميك 11oz',
    defaultSalePrice: 16.99,
    defaultBaseCost: 5.20,
    defaultShipping: 5.50,
    description: 'خيار الهدايا الأول في الأعياد والمناسبات والشركات.'
  },
  {
    id: 'sticker',
    name: 'ملصق فينيل عالي الجودة (Sticker)',
    defaultSalePrice: 5.99,
    defaultBaseCost: 1.60,
    defaultShipping: 1.00,
    description: 'منتج خفيف لجلب التقييمات الأولى وبناء الثقة في المتجر.'
  },
  {
    id: 'canvas',
    name: 'لوحة جدارية قماشية (Canvas 16x20)',
    defaultSalePrice: 59.99,
    defaultBaseCost: 26.00,
    defaultShipping: 8.90,
    description: 'ديكور منزلي راقٍ يُباع بأسعار مرتفعة للمهتمين بالفن.'
  },
  {
    id: 'totebag',
    name: 'حقيبة تسوق قطنية (Tote Bag)',
    defaultSalePrice: 22.99,
    defaultBaseCost: 8.50,
    defaultShipping: 4.20,
    description: 'منتج عملي صديق للبيئة ومحبوب لدى الشباب والطلاب.'
  }
];

export const PodProfitCalculator: React.FC = () => {
  const { isRTL } = useLanguage();

  const [selectedPresetId, setSelectedPresetId] = useState<string>('tshirt');
  const [salePrice, setSalePrice] = useState<number>(26.99);
  const [baseCost, setBaseCost] = useState<number>(10.50);
  const [shippingCost, setShippingCost] = useState<number>(4.75);
  const [freeShippingToCustomer, setFreeShippingToCustomer] = useState<boolean>(true);
  const [customerPaidShipping, setCustomerPaidShipping] = useState<number>(0);
  const [platformFeePercent, setPlatformFeePercent] = useState<number>(8.5); // Etsy / payment combined default
  const [fixedFeePerOrder, setFixedFeePerOrder] = useState<number>(0.45);
  const [estimatedMonthlySales, setEstimatedMonthlySales] = useState<number>(30);

  const handleSelectPreset = (preset: ProductPreset) => {
    setSelectedPresetId(preset.id);
    setSalePrice(preset.defaultSalePrice);
    setBaseCost(preset.defaultBaseCost);
    setShippingCost(preset.defaultShipping);
    if (!freeShippingToCustomer) {
      setCustomerPaidShipping(preset.defaultShipping);
    }
  };

  const handleReset = () => {
    const defaultPreset = PRODUCT_PRESETS[0];
    handleSelectPreset(defaultPreset);
    setFreeShippingToCustomer(true);
    setCustomerPaidShipping(0);
    setPlatformFeePercent(8.5);
    setFixedFeePerOrder(0.45);
    setEstimatedMonthlySales(30);
  };

  const calculation = useMemo(() => {
    // Total revenue collected from customer
    const totalCollected = freeShippingToCustomer 
      ? salePrice 
      : salePrice + customerPaidShipping;

    // Platform and payment processing fees
    const fees = (totalCollected * (platformFeePercent / 100)) + fixedFeePerOrder;

    // Total production & fulfillment cost paid to print provider
    const supplierTotal = baseCost + shippingCost;

    // Net profit per single item
    const netProfitPerItem = totalCollected - supplierTotal - fees;

    // Profit margin percentage based on retail sale price
    const marginPercent = salePrice > 0 ? (netProfitPerItem / salePrice) * 100 : 0;

    // Total monthly estimates
    const monthlyRevenue = totalCollected * estimatedMonthlySales;
    const monthlyTotalCosts = (supplierTotal + fees) * estimatedMonthlySales;
    const monthlyNetProfit = netProfitPerItem * estimatedMonthlySales;

    return {
      totalCollected: Math.max(0, totalCollected),
      supplierTotal,
      fees: Math.max(0, fees),
      netProfitPerItem,
      marginPercent,
      monthlyRevenue,
      monthlyTotalCosts,
      monthlyNetProfit
    };
  }, [
    salePrice, 
    baseCost, 
    shippingCost, 
    freeShippingToCustomer, 
    customerPaidShipping, 
    platformFeePercent, 
    fixedFeePerOrder, 
    estimatedMonthlySales
  ]);

  const isHealthyMargin = calculation.marginPercent >= 25;
  const isDangerMargin = calculation.netProfitPerItem <= 2 || calculation.marginPercent < 15;

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-8 backdrop-blur-xl" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400 mb-2">
            <Calculator className="h-3.5 w-3.5" />
            <span>حاسبة الأرباح والتكاليف التقديرية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            احسب صافي الربح الحقيقي لكل قطعة ومبيعات الشهر
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
            غيّر الأرقام بحرية لاكتشاف كيف تؤثر تكلفة تصنيع المزود والشحن ورسوم المنصة على صافي أرباحك، وتعلّم كيفية تسعير منتجك بأمان مالي.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 self-start sm:self-center rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>إعادة ضبط الأرقام</span>
        </button>
      </div>

      {/* Preset Selector */}
      <div className="mt-6">
        <label className="text-xs font-bold text-zinc-300 block mb-3">
          اختر قالباً جاهزاً لمنتج شائع للبدء بسرعة:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {PRODUCT_PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-3 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/15 text-white shadow-md shadow-emerald-500/10'
                    : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="text-xs font-black line-clamp-1">{preset.name}</div>
                <div className="mt-2 text-[11px] font-mono font-bold text-emerald-400">
                  ~${preset.defaultSalePrice}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inputs and Output Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5">
          <div className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-3">
            <DollarSign className="h-4 w-4 text-emerald-400" />
            <span>متغيرات الطلب والتكاليف</span>
          </div>

          {/* 1. Retail Price */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-bold text-zinc-300">سعر البيع النهائي للزبون (Retail Price):</span>
              <span className="font-mono font-black text-emerald-400 text-sm">${salePrice.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={0.5}
              value={salePrice}
              onChange={(e) => setSalePrice(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
              <span>$5</span>
              <span>$50</span>
              <span>$100</span>
            </div>
          </div>

          {/* 2. Base Supplier Cost */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-bold text-zinc-300">تكلفة تصنيع المزود (Printify / Printful):</span>
              <span className="font-mono font-black text-amber-400 text-sm">${baseCost.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              step={0.25}
              value={baseCost}
              onChange={(e) => setBaseCost(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
              <span>$1 (ملصق)</span>
              <span>$25</span>
              <span>$50 (جاكيت فاخر)</span>
            </div>
          </div>

          {/* 3. Shipping Options */}
          <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/50 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-300">تكلفة شحن المزود الفعلية:</span>
              <span className="font-mono font-bold text-zinc-200">${shippingCost.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={20}
              step={0.25}
              value={shippingCost}
              onChange={(e) => setShippingCost(parseFloat(e.target.value))}
              className="w-full accent-zinc-500 cursor-pointer"
            />

            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs text-zinc-300">استراتيجية الشحن للعميل:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFreeShippingToCustomer(true);
                    setCustomerPaidShipping(0);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    freeShippingToCustomer
                      ? 'bg-emerald-500 text-black shadow-sm'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  شحن مجاني (مدمج في السعر)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFreeShippingToCustomer(false);
                    setCustomerPaidShipping(shippingCost);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    !freeShippingToCustomer
                      ? 'bg-emerald-500 text-black shadow-sm'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  العميل يدفع الشحن
                </button>
              </div>
            </div>

            {!freeShippingToCustomer && (
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-zinc-400">مبلغ الشحن الذي يدفعه الزبون:</span>
                <div className="flex items-center gap-1 font-mono">
                  <span>$</span>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={customerPaidShipping}
                    onChange={(e) => setCustomerPaidShipping(parseFloat(e.target.value) || 0)}
                    className="w-16 rounded border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-xs text-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 4. Platform and Payment Fees */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-950/40">
              <label className="text-zinc-400 block mb-1">نسبة عمولة المنصة والدفع (%):</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  max={40}
                  step={0.5}
                  value={platformFeePercent}
                  onChange={(e) => setPlatformFeePercent(parseFloat(e.target.value) || 0)}
                  className="w-full rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-white font-mono"
                />
                <span className="text-zinc-500">%</span>
              </div>
              <span className="text-[10px] text-zinc-500 mt-1 block">مثال: 8.5% (Etsy + Stripe)</span>
            </div>

            <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-950/40">
              <label className="text-zinc-400 block mb-1">رسوم ثابتة لكل طلب ($):</label>
              <div className="flex items-center gap-1">
                <span className="text-zinc-500">$</span>
                <input
                  type="number"
                  min={0}
                  max={5}
                  step={0.05}
                  value={fixedFeePerOrder}
                  onChange={(e) => setFixedFeePerOrder(parseFloat(e.target.value) || 0)}
                  className="w-full rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-white font-mono"
                />
              </div>
              <span className="text-[10px] text-zinc-500 mt-1 block">رسوم معالجة (0.30$ - 0.45$)</span>
            </div>
          </div>

          {/* 5. Monthly Volume Slider */}
          <div className="pt-2">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-bold text-zinc-300">مبيعات متوقعة في الشهر:</span>
              <span className="font-mono font-black text-white text-sm">{estimatedMonthlySales} قطعة / شهر</span>
            </div>
            <input
              type="range"
              min={1}
              max={300}
              step={1}
              value={estimatedMonthlySales}
              onChange={(e) => setEstimatedMonthlySales(parseInt(e.target.value) || 1)}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
              <span>1</span>
              <span>50 (هدف البداية)</span>
              <span>150</span>
              <span>300 قطعة</span>
            </div>
          </div>
        </div>

        {/* Results Card Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 end-0 -mt-8 -me-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <span className="text-xs font-bold text-zinc-400">نتائج حساب القطعة الواحدة</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                isHealthyMargin 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : isDangerMargin 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {isHealthyMargin ? 'هامش ربح صحي وممتاز' : isDangerMargin ? 'هامش ضعيف ومخاطرة' : 'هامش متوسط ومقبول'}
              </span>
            </div>

            {/* Big Net Profit Display */}
            <div className="mt-5 text-center">
              <div className="text-xs text-zinc-400 font-semibold">صافي الربح التقديري لكل قطعة:</div>
              <div className={`mt-1 text-4xl sm:text-5xl font-black font-sans tracking-tight ${
                calculation.netProfitPerItem >= 0 ? 'text-emerald-400' : 'text-rose-500'
              }`}>
                ${calculation.netProfitPerItem.toFixed(2)}
              </div>
              <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-zinc-400 font-medium">
                <span>نسبة الهامش الصافي:</span>
                <span className="font-bold font-mono text-emerald-300">{calculation.marginPercent.toFixed(1)}%</span>
              </div>
            </div>

            {/* Breakdown Bars */}
            <div className="mt-6 space-y-2.5 text-xs pt-4 border-t border-zinc-800/80">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">المبلغ الإجمالي المحصّل من الزبون:</span>
                <span className="font-mono font-bold text-white">${calculation.totalCollected.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-amber-300/90">
                <span>- تكلفة تصنيع وشحن المزود:</span>
                <span className="font-mono font-bold">-${calculation.supplierTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-zinc-400">
                <span>- رسوم المنصة وبوابة الدفع:</span>
                <span className="font-mono font-bold">-${calculation.fees.toFixed(2)}</span>
              </div>
            </div>

            {/* Monthly Forecast Box */}
            <div className="mt-6 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-4 text-center">
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                التوقع الشهري عند بيع ({estimatedMonthlySales} قطعة):
              </div>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-white font-sans">
                ${calculation.monthlyNetProfit.toFixed(2)}
                <span className="text-xs font-normal text-zinc-400 ms-1">صافي ربح شهري</span>
              </div>
              <div className="mt-1 text-[11px] text-zinc-400 font-mono">
                إجمالي المبيعات: ${calculation.monthlyRevenue.toFixed(0)} | إجمالي التكاليف: ${calculation.monthlyTotalCosts.toFixed(0)}
              </div>
            </div>

            {/* Realistic Advice */}
            <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-[11px] text-zinc-300 flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {isDangerMargin ? (
                  <span className="text-rose-300 font-bold">
                    تحذير: هامش الربح أقل من المطلوب. ارفع سعر البيع بمقدار 2$ إلى 4$ أو ابحث عن مزود طباعة بتكلفة إنتاج أقل لضمان عدم الخسارة عند تقديم تخفيضات.
                  </span>
                ) : (
                  <span>
                    نصيحة تسعيرية: هامش 8$ إلى 12$ للقميص يوفر لك مرونة كافية لتقديم خصومات في المناسبات وتغطية أي طلب إرجاع نادر دون التأثير على أرباحك الإجمالية.
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Legal and Disclaimer Notice */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs text-amber-200/90 flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              تنبيه شفاف: هذه الأرقام هي نماذج حسابية رياضية لتقريب الصورة وفهم التكاليف، وليست ضماناً لتحقيق أرباح مؤكدة. المبيعات الفعلية تعتمد على جاذبية التصميم وجودة التسويق والطلب الحقيقي في السوق.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
