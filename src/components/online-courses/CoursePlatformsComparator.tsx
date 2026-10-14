import React, { useState, useMemo } from 'react';
import { 
  Server, 
  Check, 
  X, 
  DollarSign, 
  Users, 
  Award, 
  Globe, 
  ShieldCheck, 
  Sparkles,
  Filter,
  CheckCircle2,
  Info
} from 'lucide-react';
import { coursePlatformsData, CoursePlatformComparisonItem } from '../../data/onlineCoursesData';

export const CoursePlatformsComparator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterArabicGateways, setFilterArabicGateways] = useState<boolean>(false);
  const [filterCommunityBuiltIn, setFilterCommunityBuiltIn] = useState<boolean>(false);
  const [filterQuizzesAndCerts, setFilterQuizzesAndCerts] = useState<boolean>(false);

  const filteredPlatforms = useMemo(() => {
    return coursePlatformsData.filter((platform) => {
      if (selectedCategory !== 'all' && platform.category !== selectedCategory) {
        return false;
      }
      if (filterArabicGateways && !platform.localArabPaymentGateways) {
        return false;
      }
      if (filterCommunityBuiltIn && !platform.communityBuiltIn) {
        return false;
      }
      if (filterQuizzesAndCerts && !platform.quizzesAndCertificates) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, filterArabicGateways, filterCommunityBuiltIn, filterQuizzesAndCerts]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-zinc-900 to-zinc-900/90 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-2">
            <Server className="h-3.5 w-3.5" />
            <span>مقارن المنصات وطرق الاستضافة</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            مصفوفة مقارنة منصات الدورات وبوابات الدفع (Platform Matrix)
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
            قارن بين المنصات الرائدة عالمياً وعربياً من حيث التكلفة الثابتة، العمولات، تجربة الطلاب، وبوابات الدفع المحلية لاختيار الحل الأنسب لميزانيتك.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-zinc-400">التصنيف:</span>
            {[
              { id: 'all', label: 'الكل (7 منصات)' },
              { id: 'community', label: 'مجتمعات تفاعلية (Skool)' },
              { id: 'all-in-one', label: 'شاملة (Teachable/Kajabi)' },
              { id: 'minimalist', label: 'بسيطة بدون اشتراك (Gumroad)' },
              { id: 'arabic-friendly', label: 'دعم محلي عربي (سلة/يوكان)' },
              { id: 'marketplace', label: 'ماركت بليس (Udemy)' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-black font-black shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Checkboxes */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-4 flex-wrap text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white select-none">
            <input
              type="checkbox"
              checked={filterArabicGateways}
              onChange={(e) => setFilterArabicGateways(e.target.checked)}
              className="rounded bg-zinc-800 border-zinc-700 text-cyan-500 focus:ring-0 cursor-pointer"
            />
            <span>دعم وسائل دفع عربية ومحلية (مدى، تابي، CMI)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white select-none">
            <input
              type="checkbox"
              checked={filterCommunityBuiltIn}
              onChange={(e) => setFilterCommunityBuiltIn(e.target.checked)}
              className="rounded bg-zinc-800 border-zinc-700 text-cyan-500 focus:ring-0 cursor-pointer"
            />
            <span>مجتمع ونقاشات مدمجة داخل المنصة</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white select-none">
            <input
              type="checkbox"
              checked={filterQuizzesAndCerts}
              onChange={(e) => setFilterQuizzesAndCerts(e.target.checked)}
              className="rounded bg-zinc-800 border-zinc-700 text-cyan-500 focus:ring-0 cursor-pointer"
            />
            <span>نظام اختبارات وإصدار شهادات تلقائية</span>
          </label>
        </div>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPlatforms.map((platform) => {
          const isHigh = platform.recommendationLevel === 'عالي جداً';
          const isSpecial = platform.recommendationLevel === 'ممتاز لحالات محددة';

          return (
            <div
              key={platform.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-lg space-y-4"
            >
              <div>
                {/* Platform Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {platform.category === 'community' ? 'مجتمع تفاعلي' :
                       platform.category === 'all-in-one' ? 'الكل في واحد' :
                       platform.category === 'minimalist' ? 'بدون اشتراك ثابت' :
                       platform.category === 'arabic-friendly' ? 'متجر محلي عربي' : 'ماركت بليس'}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5 leading-snug">
                      {platform.name}
                    </h4>
                  </div>

                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${
                    isHigh ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    isSpecial ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                    'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {platform.recommendationLevel}
                  </span>
                </div>

                {/* Price & Fee Block */}
                <div className="mt-3.5 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-zinc-500 text-[10px] block">الاشتراك الشهري:</span>
                    <span className="font-bold font-mono text-zinc-200">{platform.monthlyBaseCost}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] block">العمولة على البيع:</span>
                    <span className="font-bold font-mono text-cyan-400">{platform.transactionFee}</span>
                  </div>
                </div>

                {/* Feature Checklist */}
                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-[11px]">استضافة الفيديو مشمولة:</span>
                    {platform.videoHostingIncluded ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <X className="h-3.5 w-3.5 text-rose-400" />
                    )}
                  </div>

                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-[11px]">مجتمع تفاعلي مدمج:</span>
                    {platform.communityBuiltIn ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <X className="h-3.5 w-3.5 text-rose-400" />
                    )}
                  </div>

                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-[11px]">اختبارات وشهادات:</span>
                    {platform.quizzesAndCertificates ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <X className="h-3.5 w-3.5 text-rose-400" />
                    )}
                  </div>

                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-[11px]">بوابات دفع محلية عربية:</span>
                    {platform.localArabPaymentGateways ? (
                      <span className="text-emerald-400 font-bold text-[10px]">نعم (مدى/تابي)</span>
                    ) : (
                      <span className="text-zinc-500 text-[10px]">Stripe / PayPal فقط</span>
                    )}
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="mt-4 pt-3 border-t border-zinc-800 text-xs space-y-2">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 block mb-1">المزايا الأقوى:</span>
                    <ul className="space-y-1 text-zinc-300 text-[11px]">
                      {platform.pros.slice(0, 2).map((pro, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-rose-400 block mb-1">السلبيات أو القيود:</span>
                    <ul className="space-y-1 text-zinc-400 text-[11px]">
                      {platform.cons.slice(0, 2).map((con, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <X className="h-3 w-3 text-rose-400 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Best For Footer */}
              <div className="pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-300">
                <strong className="text-cyan-400">الأنسب لمن؟</strong> {platform.bestFor}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
