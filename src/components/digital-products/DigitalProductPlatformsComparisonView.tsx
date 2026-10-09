import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  HelpCircle, 
  Globe, 
  Copy, 
  Check, 
  Layers, 
  AlertTriangle 
} from 'lucide-react';
import { 
  digitalProductPlatformsList, 
  DigitalProductPlatformComparison 
} from '../../data/digitalProductsData';

interface DigitalProductPlatformsComparisonViewProps {
  onCopyText: (text: string, label: string) => void;
}

export const DigitalProductPlatformsComparisonView: React.FC<DigitalProductPlatformsComparisonViewProps> = ({
  onCopyText
}) => {
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>('payhip');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Profit Margin & Payout Calculator State
  const [calcPrice, setCalcPrice] = useState<number>(15);
  const [calcSales, setCalcSales] = useState<number>(50);
  const [selectedFeeRate, setSelectedFeeRate] = useState<number>(0.05); // Payhip: 5%

  const handleCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const activePlatform = digitalProductPlatformsList.find(p => p.id === selectedPlatformId) || digitalProductPlatformsList[0];

  // Financial calculation
  const grossRevenue = calcPrice * calcSales;
  const platformFee = grossRevenue * selectedFeeRate;
  const paymentGatewayFee = grossRevenue * 0.034 + (calcSales * 0.3); // Stripe/PayPal avg: ~3.4% + 0.30$
  const totalFees = platformFee + paymentGatewayFee;
  const netProfit = Math.max(0, grossRevenue - totalFees);
  const profitMarginPercent = grossRevenue > 0 ? Math.round((netProfit / grossRevenue) * 100) : 0;

  return (
    <div className="space-y-10">
      {/* Overview Banner */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 mb-3">
              <Globe className="h-3.5 w-3.5" />
              <span>دليل المنصات واستقبال المدفوعات</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              مقارنة منصات البيع وحلول استلام الأرباح في الدول العربية
            </h3>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              اختر المنصة الأنسب لجمهورك وموقعك الجغرافي، وتعرف على كيفية تخطي عوائق بوابات الدفع واستلام أرباحك في حسابك البنكي أو بطاقتك بأقل عمولة ممكنة.
            </p>
          </div>
        </div>
      </div>

      {/* Platform Tabs & Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Platform Selectors */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block px-1">
            اختر المنصة للتحليل:
          </span>
          {digitalProductPlatformsList.map((platform) => {
            const isSelected = platform.id === selectedPlatformId;
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatformId(platform.id)}
                className={`w-full text-right p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-500/60 bg-emerald-950/20 shadow-lg shadow-emerald-950/30 text-white'
                    : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-base">{platform.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                    {platform.setupEase}
                  </span>
                </div>
                <span className="text-xs text-zinc-400 block mt-1">{platform.arabicName}</span>
                <span className="text-[11px] text-emerald-400/90 font-medium block mt-2">
                  {platform.fees.slice(0, 45)}...
                </span>
              </button>
            );
          })}

          {/* Quick Tip Box */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-400 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="h-4 w-4" />
              <span>توصية الخبراء للمبتدئ العربي</span>
            </div>
            <p className="leading-relaxed">
              ابدأ مع <strong>Payhip</strong> لأنها مجانية تماماً، تأخذ 5% فقط، وتربط مباشرة بـ PayPal وStripe. إذا كنت تستهدف السوق السعودي فقط وتملك وثيقة عمل حر، فمنصة <strong>سلة</strong> هي الأفضل لتوفر Apple Pay ومدى.
            </p>
          </div>
        </div>

        {/* Right Column: Active Platform Comprehensive Card */}
        <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2.5">
                <h4 className="text-2xl font-black text-white">{activePlatform.name}</h4>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                  {activePlatform.setupEase}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">{activePlatform.arabicName}</p>
            </div>

            <button
              onClick={() => handleCopy(
                `منصة: ${activePlatform.name}\nالرسوم: ${activePlatform.fees}\nأفضل استخدام: ${activePlatform.bestFor}\nطرق الدفع: ${activePlatform.payoutMethods.join(', ')}`,
                activePlatform.id,
                'بيانات المنصة'
              )}
              className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 px-3 py-1.5 font-bold transition-all cursor-pointer"
            >
              {copiedId === activePlatform.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedId === activePlatform.id ? 'تم النسخ' : 'نسخ المواصفات'}</span>
            </button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-500 font-bold block mb-1">الرسوم والعمولات:</span>
              <p className="text-zinc-200 leading-relaxed">{activePlatform.fees}</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-500 font-bold block mb-1">الوضع في الدول العربية:</span>
              <p className="text-zinc-200 leading-relaxed">{activePlatform.payoutArabCountries}</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 sm:col-span-2">
              <span className="text-emerald-400 font-bold block mb-1">الاستخدام الأمثل:</span>
              <p className="text-zinc-200 leading-relaxed">{activePlatform.bestFor}</p>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>أبرز المزايا</span>
              </span>
              <ul className="space-y-2 text-xs text-zinc-300">
                {activePlatform.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2.5">
                <AlertTriangle className="h-4 w-4" />
                <span>العيوب والقيود</span>
              </span>
              <ul className="space-y-2 text-xs text-zinc-300">
                {activePlatform.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Website note */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
            <span>الرابط المباشر: {activePlatform.linkNote}</span>
          </div>
        </div>
      </div>

      {/* Interactive Revenue & Net Profit Calculator */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 p-6 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-400 mb-2">
              <DollarSign className="h-3.5 w-3.5" />
              <span>حاسبة الأرباح الواقعية وهامش الربح الصافي</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              احسب دخلك الصافي بعد خصم عمولات المنصة وبوابة الدفع
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
              تطبيق عملي لمبدأ "لماذا لا يكون هامش الربح 100% بالكامل؟" لترى الأرقام الحقيقية في جيبك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  سعر مبيعة النسخة: (${calcPrice})
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  عدد النسخ المباعة شهرياً: ({calcSales} نسخة)
                </label>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={calcSales}
                  onChange={(e) => setCalcSales(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  عمولة المنصة المختارة:
                </label>
                <select
                  value={selectedFeeRate}
                  onChange={(e) => setSelectedFeeRate(parseFloat(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-700 text-xs text-zinc-200 rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:border-emerald-500"
                >
                  <option value={0.05}>Payhip (5% عمولة)</option>
                  <option value={0.10}>Gumroad (10% عمولة)</option>
                  <option value={0.00}>Ko-fi (0% مع PayPal المباشر)</option>
                </select>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs text-zinc-300 border-t md:border-t-0 md:border-r border-zinc-800 pt-4 md:pt-0 md:pr-6">
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">إجمالي المبيعات (Gross):</span>
                <span className="font-bold text-white">${grossRevenue}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">عمولة المنصة:</span>
                <span className="text-red-400">-${platformFee.toFixed(1)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">رسوم Stripe / PayPal (~3.4% + $0.3):</span>
                <span className="text-red-400">-${paymentGatewayFee.toFixed(1)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">مجموع الرسوم المقتطعة:</span>
                <span className="text-red-400 font-bold">-${totalFees.toFixed(1)}</span>
              </div>
            </div>

            {/* Final Net Pocket */}
            <div className="flex flex-col justify-center items-center p-5 rounded-2xl bg-zinc-950 border border-emerald-500/30 text-center">
              <span className="text-xs text-zinc-400 font-medium">صافي ربحك في حسابك:</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 my-2">
                ${netProfit.toFixed(0)}
              </div>
              <span className="text-[11px] text-zinc-400">
                هامش ربح حقيقي: <strong className="text-emerald-300">{profitMarginPercent}%</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
