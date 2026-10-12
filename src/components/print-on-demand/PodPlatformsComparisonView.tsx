import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  AlertTriangle, 
  ShieldCheck, 
  Globe, 
  CreditCard, 
  HelpCircle,
  Sparkles,
  Layers,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { podPlatformsComparison } from '../../data/printOnDemandData';
import { useLanguage } from '../../i18n/LanguageContext';

export const PodPlatformsComparisonView: React.FC = () => {
  const { isRTL } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'marketplace' | 'integration'>('all');

  const filteredPlatforms = podPlatformsComparison.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.type === selectedFilter;
  });

  return (
    <div className="space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Intro Header */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400 mb-3">
            <Layers className="h-3.5 w-3.5" />
            <span>مقارنة المنصات ومزودي الطباعة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            أي مسار تختار: الأسواق الجاهزة أم المتاجر المستقلة؟
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            الفرق الجوهري بين بيع تصاميمك في سوق يملك زواره بالفعل (مثل Redbubble)، أو تأسيس متجر إلكتروني مستقل مربوط بمزود طباعة عالمي (مثل Etsy أو Shopify مع Printify). فصّلنا لك التكاليف، وسائل السحب، ودعم البائعين في المغرب والدول العربية.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-zinc-800/80">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white'
            }`}
          >
            جميع الخيارات المتاحة
          </button>
          <button
            onClick={() => setSelectedFilter('marketplace')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === 'marketplace'
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white'
            }`}
          >
            الأسواق الجاهزة فقط (Marketplaces)
          </button>
          <button
            onClick={() => setSelectedFilter('integration')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === 'integration'
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white'
            }`}
          >
            المتاجر المربوطة بمزود طباعة (Integrations)
          </button>
        </div>
      </div>

      {/* Critical Country & Payout Notice */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-amber-500/5 p-4 sm:p-5 flex items-start gap-3.5 shadow-lg shadow-amber-500/5">
        <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <strong className="text-amber-300 block mb-1">
            تنبيه حاسم للبائعين في المغرب والدول العربية بخصوص وسائل السحب والتسجيل:
          </strong>
          لا تفترض أن جميع المنصات تعمل بنفس الطريقة في كل بلد. منصة مثل <strong>Redbubble</strong> تدعم السحب عبر PayPal و Payoneer بسهولة، بينما <strong>Etsy</strong> تفرض شروطاً على دعم نظام Etsy Payments المباشر. احرص دائماً على فتح حساب بنكي إلكتروني دولي مثل <strong>Payoneer</strong> أو <strong>Wise</strong> لامتلاك حساب بنكي أمريكي افتراضي وتفادي مشاكل تحويل العملات وسحب الأرباح.
        </div>
      </div>

      {/* Platform Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPlatforms.map((platform) => (
          <div
            key={platform.name}
            className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-500/40 transition-all hover:shadow-xl hover:shadow-emerald-500/5 backdrop-blur-sm"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    platform.type === 'marketplace'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {platform.type === 'marketplace' ? 'سوق مجاني متكامل' : 'متجر مستقل + مزود طباعة'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                    {platform.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                {platform.tagline}
              </p>

              {/* Key Specs */}
              <div className="mt-5 space-y-2.5 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">التكلفة المسبقة للبدء:</span>
                  <span className="font-bold text-white font-mono">{platform.upfrontCost}</span>
                </div>
                <div className="flex items-start justify-between pt-2 border-t border-zinc-800/80">
                  <span className="text-zinc-400">طرق سحب العائدات:</span>
                  <span className="font-bold text-emerald-400 text-end max-w-[60%]">
                    {platform.payoutMethods.join(' · ')}
                  </span>
                </div>
              </div>

              {/* Regional Support Notes */}
              <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] text-amber-200/90 leading-relaxed">
                <strong className="text-amber-300 block mb-0.5">الوضع للبائعين في المغرب والمنطقة:</strong>
                {platform.moroccoSupportNotes}
              </div>

              {/* Pros & Cons */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="space-y-2">
                  <span className="font-bold text-emerald-400 flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>المميزات الرئيسية:</span>
                  </span>
                  <ul className="space-y-1.5 text-zinc-300 text-[11px]">
                    {platform.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-rose-400 flex items-center gap-1 text-[11px]">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>العيوب والتحديات:</span>
                  </span>
                  <ul className="space-y-1.5 text-zinc-400 text-[11px]">
                    {platform.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-400 mt-0.5">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Recommendation */}
            <div className="mt-6 pt-4 border-t border-zinc-800/80">
              <div className="text-[11px] text-zinc-400">
                <strong className="text-zinc-200">الخيار الأمثل لـ: </strong>
                {platform.idealFor}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Supplier Comparison Summary: Printify vs Printful */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-xl">
        <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-400" />
          <span>مقارنة سريعة بين أشهر مزودي الطباعة: Printify مقابل Printful</span>
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
          كلاهما يربط متجرك تلقائياً، ولكن بينهما اختلافات جوهرية في نموذج التسعير والإنتاج:
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-base text-emerald-400">Printify</h4>
              <span className="text-[11px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/20">الأوفر في تكلفة القطعة</span>
            </div>
            <p className="text-zinc-300 leading-relaxed text-[11px]">
              عبارة عن <strong>شبكة مطابع عالمية</strong> (Network of Print Providers). تختار المطبعة بناءً على التقييم، القرب الجغرافي من العميل، وسعر التيشيرت. أسعاره أرخص مما يمنحك هامش ربح أعلى لكل قطعة، لكن الجودة تختلف قليلاً من مطبعة لأخرى في الشبكة.
            </p>
            <div className="text-[11px] font-bold text-zinc-400 pt-2 border-t border-zinc-800">
              الخيار الأفضل لـ: المبتدئين والباحثين عن أعلى هامش ربح صافي على Etsy و Shopify.
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-base text-blue-400">Printful</h4>
              <span className="text-[11px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/20">الأعلى في ثبات الجودة</span>
            </div>
            <p className="text-zinc-300 leading-relaxed text-[11px]">
              يملك <strong>مصانعه ومعداته الخاصة</strong> في أمريكا وأوروبا. الجودة موحدة وثابتة تماماً وخدمة التغليف بالعلامة التجارية الشخصية (Custom Branding) فائقة الاحترافية، لكن أسعار تصنيع القطعة أغلى بـ 2 إلى 4 دولارات مقارنة بـ Printify.
            </p>
            <div className="text-[11px] font-bold text-zinc-400 pt-2 border-t border-zinc-800">
              الخيار الأفضل لـ: البراندات الفاخرة التي تضع الجودة الثابتة والتطريز المتقن كأولوية أولى.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
