import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Sparkles,
  Calculator,
  ShieldCheck,
  Check,
  Package,
  Layers,
  HelpCircle,
  Copy,
  AlertCircle
} from 'lucide-react';

interface RetainerTier {
  name: string;
  arabicName: string;
  badge: string;
  idealFor: string;
  recommendedPrice: number;
  services: string[];
}

const DEFAULT_TIERS: RetainerTier[] = [
  {
    name: 'Starter',
    arabicName: 'باقة الانطلاق والإنعاش الرقمي',
    badge: 'الأنسب للأنشطة الصغيرة والمبتدئين',
    idealFor: 'محلات الحلاقة، المقاهي الصغيرة، محلات الوجبات السريعة في الأحياء',
    recommendedPrice: 250,
    services: [
      'تهيئة وتوثيق ملف خرائط Google وتصحيح بيانات NAP',
      'جلسة تصوير شهرية بالهاتف (15 صورة احترافية)',
      'الرد على كافة التقييمات وحل الشكاوى مرتين أسبوعياً',
      'إعداد زر ورابط WhatsApp Business للطلبات المباشرة',
      'تقرير أداء شهري مبسط بعدد الزيارات والاتصالات'
    ]
  },
  {
    name: 'Growth',
    arabicName: 'باقة النمو ومضاعفة الزبائن',
    badge: 'الأكثر طلباً وربحية (Most Popular)',
    idealFor: 'المطاعم الكبيرة، عيادات الأسنان، مراكز التجميل، صالات الجيم',
    recommendedPrice: 480,
    services: [
      'كل مزايا باقة الانطلاق (خرائط Google + WhatsApp)',
      'إدارة حسابي Instagram وFacebook (8 منشورات + 4 Reels شهرياً)',
      'جلستا تصوير ميداني شهرياً بمعدات خفيفة وإضاءة',
      'إدارة حملة إعلانية ممولة بمحيط 3-5 كم (أتعاب الإدارة متضمنة)',
      'تحسين السيو المحلي للكلمات المفتاحية في المنطقة',
      'تقرير أداء شهري تفصيلي يوضح العائد على الإنفاق (ROAS)'
    ]
  },
  {
    name: 'Pro',
    arabicName: 'باقة السيطرة والتوسع الكامل',
    badge: 'للأنشطة المرموقة والشركات المحلية',
    idealFor: 'المصحات، مدارس اللغات، وكالات العقار، وسلاسل المتاجر المحلية',
    recommendedPrice: 900,
    services: [
      'كل مزايا باقة النمو مع تصوير احترافي أسبوعي (4 زيارات)',
      'موقع إلكتروني تعريفي سريع من صفحة واحدة لحجز المواعيد',
      'إدارة كاملة لحملات Google Search المحلية وMeta Ads',
      'كتابة ونشر 12 مقطع Reel/TikTok بتعليق صوتي وتصميم سينمائي',
      'نظام أتمتة الردود وحجز المواعيد على مدار الساعة 24/7',
      'دعم واستشارة تسويقية عبر مجموعة واتساب خاصة ذات أولوية'
    ]
  }
];

export const LocalBusinessPackageBuilder: React.FC = () => {
  const [starterPrice, setStarterPrice] = useState<number>(250);
  const [growthPrice, setGrowthPrice] = useState<number>(480);
  const [proPrice, setProPrice] = useState<number>(850);

  const [starterClients, setStarterClients] = useState<number>(2);
  const [growthClients, setGrowthClients] = useState<number>(3);
  const [proClients, setProClients] = useState<number>(1);

  const [toolCosts, setToolCosts] = useState<number>(65); // Canva Pro, CapCut, Scheduling, etc.
  const [copied, setCopied] = useState<boolean>(false);

  // Financial calculations
  const totalClients = starterClients + growthClients + proClients;

  const monthlyGrossRevenue = useMemo(() => {
    return (
      starterClients * starterPrice +
      growthClients * growthPrice +
      proClients * proPrice
    );
  }, [starterClients, starterPrice, growthClients, growthPrice, proClients, proPrice]);

  const netMonthlyProfit = Math.max(0, monthlyGrossRevenue - toolCosts);
  const annualProjectedRevenue = monthlyGrossRevenue * 12;

  // Estimated hours per week (Starter: 2h/wk, Growth: 4h/wk, Pro: 7h/wk)
  const totalHoursPerWeek = starterClients * 2 + growthClients * 4 + proClients * 7;
  const hourlyRateEquivalent = totalHoursPerWeek > 0 ? Math.round(monthlyGrossRevenue / (totalHoursPerWeek * 4)) : 0;

  const handleCopyPricing = () => {
    const text = `📋 باقات الخدمات الرقمية للمشاريع المحلية:

1️⃣ ${DEFAULT_TIERS[0].arabicName} (Starter)
السعر الشهري: $${starterPrice} / شهر
الخدمات:
${DEFAULT_TIERS[0].services.map((s) => `• ${s}`).join('\n')}

2️⃣ ${DEFAULT_TIERS[1].arabicName} (Growth) - الأكثر طلباً
السعر الشهري: $${growthPrice} / شهر
الخدمات:
${DEFAULT_TIERS[1].services.map((s) => `• ${s}`).join('\n')}

3️⃣ ${DEFAULT_TIERS[2].arabicName} (Pro)
السعر الشهري: $${proPrice} / شهر
الخدمات:
${DEFAULT_TIERS[2].services.map((s) => `• ${s}`).join('\n')}

* الشروط: جميع الأسعار لا تشمل ميزانية الإعلانات الممولة المباشرة المدفوعة لفيسبوك/جوجل.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400">
              <Sparkles className="h-4 w-4" />
              <span>الأداة التفاعلية الثالثة · هندسة الاشتراكات الشهرية (Retainers)</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
              حاسبة وباني باقات الخدمات الرقمية والاشتراكات (Pricing Builder)
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              السر في بناء دخل ثابت ومستقر هو الابتعاد عن المشاريع لمرة واحدة والتركيز على العقود الشهرية المتجددة (Monthly Retainers). اضبط أسعار باقاتك وعدد عملائك واحسب دخلك المتوقع.
            </p>
          </div>

          <button
            onClick={handleCopyPricing}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-black text-black hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'تم نسخ الباقات' : 'نسخ ملخص الباقات'}</span>
          </button>
        </div>
      </div>

      {/* Revenue Forecast Card */}
      <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 sm:p-8 backdrop-blur-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-400">الدخل الشهري الإجمالي (MRR)</span>
            <div className="mt-1 text-2xl sm:text-3xl font-black text-emerald-400">
              ${monthlyGrossRevenue.toLocaleString()}
            </div>
            <span className="text-[10px] text-zinc-500">من {totalClients} عملاء نشطين</span>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-400">صافي الربح الشهري</span>
            <div className="mt-1 text-2xl sm:text-3xl font-black text-white">
              ${netMonthlyProfit.toLocaleString()}
            </div>
            <span className="text-[10px] text-zinc-500">بعد خصم الأدوات (${toolCosts})</span>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-400">ساعات العمل الأسبوعية التقديرية</span>
            <div className="mt-1 text-2xl sm:text-3xl font-black text-amber-400">
              {totalHoursPerWeek} ساعة / أسبوع
            </div>
            <span className="text-[10px] text-zinc-500">يعادل ~${hourlyRateEquivalent}/ساعة عمل</span>
          </div>

          <div className="bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-400">الدخل السنوي المتوقع (ARR)</span>
            <div className="mt-1 text-2xl sm:text-3xl font-black text-sky-400">
              ${annualProjectedRevenue.toLocaleString()}
            </div>
            <span className="text-[10px] text-zinc-500">مع الحفاظ على نسبة استبقاء 80%+</span>
          </div>
        </div>

        {/* Client Sliders Controls */}
        <div className="mt-6 pt-6 border-t border-emerald-500/20 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-300">عملاء باقة Starter (${starterPrice}/ش):</span>
              <span className="text-emerald-400">{starterClients} عملاء</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={starterClients}
              onChange={(e) => setStarterClients(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-300">عملاء باقة Growth (${growthPrice}/ش):</span>
              <span className="text-amber-400">{growthClients} عملاء</span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              value={growthClients}
              onChange={(e) => setGrowthClients(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-300">عملاء باقة Pro (${proPrice}/ش):</span>
              <span className="text-sky-400">{proClients} عملاء</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              value={proClients}
              onChange={(e) => setProClients(Number(e.target.value))}
              className="w-full accent-sky-500"
            />
          </div>
        </div>
      </div>

      {/* The 3 Tier Breakdown Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {DEFAULT_TIERS.map((tier, idx) => {
          const currentPrice = idx === 0 ? starterPrice : idx === 1 ? growthPrice : proPrice;
          const setPrice = idx === 0 ? setStarterPrice : idx === 1 ? setGrowthPrice : setProPrice;
          const isFeatured = idx === 1;

          return (
            <div
              key={tier.name}
              className={`rounded-3xl border p-6 sm:p-7 flex flex-col justify-between transition-all ${
                isFeatured
                  ? 'border-amber-500/50 bg-gradient-to-b from-amber-500/10 via-zinc-900/90 to-zinc-950 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/30'
                  : 'border-zinc-800 bg-zinc-900/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
                    {tier.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isFeatured
                        ? 'border-amber-500/40 bg-amber-500/20 text-amber-300'
                        : 'border-zinc-700 bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-black text-white">{tier.arabicName}</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{tier.idealFor}</p>

                {/* Price input */}
                <div className="mt-5 p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400 font-bold">السعر المقترح:</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-zinc-400">$</span>
                      <input
                        type="number"
                        min="100"
                        max="3000"
                        step="10"
                        value={currentPrice}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-20 rounded-lg bg-zinc-900 border border-zinc-700 px-2 py-1 text-center font-black text-white text-sm focus:border-amber-500 focus:outline-none"
                      />
                      <span className="text-xs text-zinc-500">/ شهر</span>
                    </div>
                  </div>
                </div>

                {/* Services list */}
                <div className="mt-5 space-y-2.5">
                  <span className="text-xs font-bold text-zinc-300">الخدمات المتضمنة شهرياً:</span>
                  {tier.services.map((srv, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-zinc-800/80">
                <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>دفع شهري مسبق في بداية كل شهر لضمان الاستمرارية.</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Realistic Warning Banner */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 flex items-start gap-3.5">
        <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300 leading-relaxed">
          <strong className="text-white block font-black mb-1">
            قاعدة ذهبية في عقود المشاريع المحلية:
          </strong>
          افصل دائماً بين أتعابك الشهرية (Management Retainer) وبين ميزانية الإعلانات الممولة (Ad Spend). التاجر يدفع ميزانية الإعلانات مباشرة ببطاقته البنكية لمنصة Meta أو Google، بينما أتعابك لك وحدك مقابل التخطيط والتنفيذ وصناعة المحتوى.
        </div>
      </div>
    </div>
  );
};
