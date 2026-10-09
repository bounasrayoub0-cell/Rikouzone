import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Globe, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink,
  Layers,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { 
  templatePlatformDetailsList, 
  TemplatePlatformDetails 
} from '../../data/templateData';

interface TemplatePlatformsViewProps {
  onCopyText: (text: string, label: string) => void;
}

export const TemplatePlatformsView: React.FC<TemplatePlatformsViewProps> = ({ onCopyText }) => {
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>('payhip');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Revenue and net income calculator
  const [unitPrice, setUnitPrice] = useState<number>(14);
  const [salesVolume, setSalesVolume] = useState<number>(40);
  const [platformFeeRate, setPlatformFeeRate] = useState<number>(0.05); // Payhip 5%

  const handleCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const activePlatform = templatePlatformDetailsList.find(p => p.id === selectedPlatformId) || templatePlatformDetailsList[0];

  const grossIncome = unitPrice * salesVolume;
  const platformFee = grossIncome * platformFeeRate;
  const paymentProcessorFee = grossIncome * 0.034 + (salesVolume * 0.3); // Avg PayPal/Stripe 3.4% + 0.30$
  const totalDeductions = platformFee + paymentProcessorFee;
  const netEarnings = Math.max(0, grossIncome - totalDeductions);
  const marginPercent = grossIncome > 0 ? Math.round((netEarnings / grossIncome) * 100) : 0;

  return (
    <div className="space-y-10">
      {/* Overview Top Card */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 mb-3">
              <Globe className="h-3.5 w-3.5" />
              <span>فحص المنصات الواقعي للمغرب والعالم العربي</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              منصات بيع القوالب، بوابات الدفع، وحلول سحب الأرباح البنكية
            </h3>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              تحقق دقيق من المنصات المقبولة للبائعين في المغرب، العمولات الحقيقية، وسائل الدفع المتاحة لعملائك، وحاسبة الأرباح الصافية بعد خصم الرسوم.
            </p>
          </div>
        </div>
      </div>

      {/* Platform Comparison & Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left List */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block px-1">
            اختر المنصة للتحليل:
          </span>
          {templatePlatformDetailsList.map((platform) => {
            const isSelected = platform.id === selectedPlatformId;
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatformId(platform.id)}
                className={`w-full text-right p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-500/80 bg-emerald-950/20 shadow-lg shadow-emerald-950/30 text-white'
                    : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-base">{platform.name.split('(')[0]}</span>
                  {platform.id === 'etsy' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950/70 text-red-400 border border-red-900/40">
                      تنبيه
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-900/40">
                      متاح
                    </span>
                  )}
                </div>
                <span className="text-xs text-zinc-400 block mt-1.5 line-clamp-1">{platform.moroccoSupportStatus}</span>
                <span className="text-[11px] text-emerald-400/90 font-medium block mt-1">
                  الرسوم: {platform.feesAndCommissions.slice(0, 40)}...
                </span>
              </button>
            );
          })}

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-400 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="h-4 w-4" />
              <span>التوصية المباشرة للمقيم في المغرب</span>
            </div>
            <p className="leading-relaxed">
              استخدم <strong>Payhip</strong> كمتجرك الأساسي: تسجيل مجاني تماماً، عمولة 5% فقط، يدعم تسليم روابط Notion وCanva التفاعلية بأمان، ويربط بحساب PayPal الذي يمكنك سحب رصيده إلى بطاقة فيزا البنك المغربي.
            </p>
          </div>
        </div>

        {/* Right Active Platform Details */}
        <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-zinc-800">
            <div>
              <h4 className="text-2xl font-black text-white">{activePlatform.name}</h4>
              <p className="text-xs text-zinc-400 mt-1">{activePlatform.bestUse}</p>
            </div>

            <button
              onClick={() => handleCopy(
                `منصة: ${activePlatform.name}\nدعم المغرب: ${activePlatform.moroccoSupportStatus}\nالرسوم: ${activePlatform.feesAndCommissions}\nطرق سحب الأرباح: ${activePlatform.payoutMethods.join(', ')}`,
                activePlatform.id,
                'مواصفات المنصة'
              )}
              className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 px-3 py-1.5 font-bold transition-all cursor-pointer"
            >
              {copiedId === activePlatform.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedId === activePlatform.id ? 'تم النسخ' : 'نسخ التفاصيل'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-500 font-bold block mb-1">دعم البائعين في المغرب:</span>
              <p className="text-zinc-200 leading-relaxed font-medium">{activePlatform.moroccoSupportStatus}</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-500 font-bold block mb-1">الرسوم والعمولات:</span>
              <p className="text-zinc-200 leading-relaxed">{activePlatform.feesAndCommissions}</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-500 font-bold block mb-1">طرق سحب واستقبال الأرباح:</span>
              <p className="text-emerald-400 leading-relaxed">{activePlatform.payoutMethods.join(' • ')}</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-500 font-bold block mb-1">وسائل الدفع للمشترين:</span>
              <p className="text-zinc-200 leading-relaxed">{activePlatform.customerPaymentMethods.join(' • ')}</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 sm:col-span-2">
              <span className="text-cyan-400 font-bold block mb-1">شروط بيع قوالب Notion وCanva:</span>
              <p className="text-zinc-200 leading-relaxed">{activePlatform.termsForNotionCanva}</p>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>المزايا ونقاط القوة</span>
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
        </div>
      </div>

      {/* Real Profit & Margin Calculator */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 p-6 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-400 mb-2">
              <DollarSign className="h-3.5 w-3.5" />
              <span>حاسبة الأرباح الصافية وهوامش الربح</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              احسب دخلك الصافي الحقيقي من بيع القوالب
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
              شاهد المبالغ الفعلية التي تصلك بعد استقطاع عمولة المنصة وبوابات الدفع (Stripe/PayPal).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  سعر بيع القالب: (${unitPrice})
                </label>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  عدد المبيعات الشهرية: ({salesVolume} مبيعة)
                </label>
                <input
                  type="range"
                  min="5"
                  max="300"
                  step="5"
                  value={salesVolume}
                  onChange={(e) => setSalesVolume(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  المنصة المستخدمة:
                </label>
                <select
                  value={platformFeeRate}
                  onChange={(e) => setPlatformFeeRate(parseFloat(e.target.value))}
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
                <span className="font-bold text-white">${grossIncome}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">عمولة المنصة:</span>
                <span className="text-red-400">-${platformFee.toFixed(1)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">رسوم Stripe / PayPal (~3.4% + $0.3):</span>
                <span className="text-red-400">-${paymentProcessorFee.toFixed(1)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">مجموع الاقتطاعات:</span>
                <span className="text-red-400 font-bold">-${totalDeductions.toFixed(1)}</span>
              </div>
            </div>

            {/* Net Result */}
            <div className="flex flex-col justify-center items-center p-5 rounded-2xl bg-zinc-950 border border-emerald-500/30 text-center">
              <span className="text-xs text-zinc-400 font-medium">صافي أرباحك في حسابك:</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 my-2">
                ${netEarnings.toFixed(0)}
              </div>
              <span className="text-[11px] text-zinc-400">
                هامش ربح صافي: <strong className="text-emerald-300">{marginPercent}%</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
