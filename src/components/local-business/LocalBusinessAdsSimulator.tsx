import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Sparkles,
  Calculator,
  Compass,
  AlertTriangle,
  MapPin,
  Users,
  DollarSign,
  HelpCircle,
  Eye,
  PhoneCall
} from 'lucide-react';

export const LocalBusinessAdsSimulator: React.FC = () => {
  const [dailyBudget, setDailyBudget] = useState<number>(5);
  const [radiusKm, setRadiusKm] = useState<number>(3);
  const [businessType, setBusinessType] = useState<'restaurant' | 'salon' | 'clinic' | 'retail'>('restaurant');
  const [campaignDays, setCampaignDays] = useState<number>(30);

  // Industry metrics benchmark
  const industryBenchmark = useMemo(() => {
    switch (businessType) {
      case 'restaurant':
        return { cpm: 1.8, ctr: 2.5, convRate: 8, avgOrderValue: 15, name: 'مطاعم ومقاهي' };
      case 'salon':
        return { cpm: 2.2, ctr: 2.1, convRate: 6, avgOrderValue: 25, name: 'صالونات ومراكز تجميل' };
      case 'clinic':
        return { cpm: 3.5, ctr: 1.6, convRate: 4, avgOrderValue: 60, name: 'عيادات ومراكز طبية' };
      case 'retail':
        return { cpm: 2.0, ctr: 1.9, convRate: 5, avgOrderValue: 35, name: 'متاجر تجزئة وملابس' };
    }
  }, [businessType]);

  const totalAdSpend = dailyBudget * campaignDays;

  // Impressions = (Spend / CPM) * 1000
  const estimatedImpressions = Math.round((totalAdSpend / industryBenchmark.cpm) * 1000);

  // Clicks = Impressions * (CTR / 100)
  const estimatedClicks = Math.round(estimatedImpressions * (industryBenchmark.ctr / 100));

  // Inquiries / Actions (Calls/WhatsApp) = Clicks * (ConvRate / 100)
  const estimatedCustomers = Math.round(estimatedClicks * (industryBenchmark.convRate / 100));

  // Estimated Gross Revenue for the Merchant
  const estimatedRevenue = estimatedCustomers * industryBenchmark.avgOrderValue;
  const estimatedROAS = totalAdSpend > 0 ? (estimatedRevenue / totalAdSpend).toFixed(1) : '0';

  return (
    <div className="space-y-8 text-zinc-100">
      {/* Header */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-bold text-rose-400">
          <Sparkles className="h-4 w-4" />
          <span>الأداة التفاعلية السابعة · تخطيط الحملات الإعلانية الجغرافية</span>
        </div>
        <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
          محاكي الميزانيات الإعلانية المحلية والعائد (Local Ads Simulator)
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
          اكتشف كيف تحسب التكلفة المتوقعة للإعلانات الممولة في محيط 2 إلى 5 كم حول أي محل تجاري، وتوقع عدد الاتصالات والزيارات التي يمكن للميزانية التجريبية تحقيقها.
        </p>

        {/* Inputs */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-zinc-800/80">
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">نوع النشاط التجاري</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value as any)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
            >
              <option value="restaurant">مطاعم ومقاهي وجبات سريعة</option>
              <option value="salon">صالونات حلاقة ومراكز تجميل</option>
              <option value="clinic">عيادات ومراكز طبية وأسنان</option>
              <option value="retail">متاجر ملابس وتجزئة</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">
              الميزانية اليومية المخصصة للإعلان (${dailyBudget}/يوم)
            </label>
            <input
              type="range"
              min="2"
              max="30"
              step="1"
              value={dailyBudget}
              onChange={(e) => setDailyBudget(Number(e.target.value))}
              className="w-full accent-rose-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
              <span>$2 تجريبية</span>
              <span className="text-white font-bold">${dailyBudget} يومياً</span>
              <span>$30 موسعة</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">
              نصف قطر الاستهداف الجغرافي ({radiusKm} كم)
            </label>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
              <span>1 كم (الحي المباشر)</span>
              <span className="text-white font-bold">{radiusKm} كم</span>
              <span>15 كم (المدينة كاملة)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">مدة الحملة بالـ أيام</label>
            <select
              value={campaignDays}
              onChange={(e) => setCampaignDays(Number(e.target.value))}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
            >
              <option value="7">أسبوع تجريبي (7 أيام)</option>
              <option value="14">أسبوعان (14 يوماً)</option>
              <option value="30">شهر كامل (30 يوماً)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Projection Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/60 p-5 rounded-3xl border border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
            <DollarSign className="h-4 w-4 text-rose-400" />
            <span>إجمالي ميزانية الإعلان</span>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-rose-400">
            ${totalAdSpend}
          </div>
          <span className="text-[10px] text-zinc-500">يدفعها التاجر لـ Meta مباشرة</span>
        </div>

        <div className="bg-zinc-900/60 p-5 rounded-3xl border border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
            <Eye className="h-4 w-4 text-sky-400" />
            <span>الظهور في محيط {radiusKm} كم</span>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-white">
            {estimatedImpressions.toLocaleString()}
          </div>
          <span className="text-[10px] text-zinc-500">مشاهدة لسكان الحي المستهدف</span>
        </div>

        <div className="bg-zinc-900/60 p-5 rounded-3xl border border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
            <PhoneCall className="h-4 w-4 text-amber-400" />
            <span>اتصالات وزبائن متوقعين</span>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-amber-400">
            ~{estimatedCustomers} زبون
          </div>
          <span className="text-[10px] text-zinc-500">طلبات وحجوزات جديدة</span>
        </div>

        <div className="bg-zinc-900/60 p-5 rounded-3xl border border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span>العائد التقديري للتاجر</span>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-400">
            ${estimatedRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-zinc-500">عائد تقريبي {estimatedROAS}x ضعف الإنفاق</span>
        </div>
      </div>

      {/* Critical Clarification Card */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 flex items-start gap-4">
        <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300 leading-relaxed space-y-1.5">
          <strong className="text-amber-300 font-bold block text-sm">
            تنبيه جوهري للمستقلين: فصل ميزانية الإعلان عن أتعاب الإدارة
          </strong>
          <p>
            الميزانية الموضحة أعلاه (${totalAdSpend}) هي تكلفة المنصة الإعلانية التي يسددها التاجر لفيسبوك أو إنستغرام ببطاقته مباشرة.
          </p>
          <p>
            أتعابك أنت كمستقل (Management Fee) تتراوح بين <strong>150$ إلى 300$ إضافية</strong> مقابل إعداد الإعلان، استهداف الحي، وتصميم الصور والنصوص وكتابة العنوان الجذاب.
          </p>
        </div>
      </div>
    </div>
  );
};
