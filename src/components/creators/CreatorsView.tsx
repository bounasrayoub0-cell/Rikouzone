import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { creatorGuides, CreatorPlatformGuide } from '../../data/creators';
import { 
  Gamepad2, 
  Flame, 
  Youtube, 
  Music2, 
  Instagram, 
  Share2, 
  CheckCircle2, 
  DollarSign, 
  Zap, 
  Wrench, 
  Layers, 
  ArrowRight, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface CreatorsViewProps {
  onNavigateToIdeas: () => void;
  onNavigateToTools: () => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Youtube,
  Music2,
  Flame,
  Instagram,
  Share2,
  Gamepad2
};

export const CreatorsView: React.FC<CreatorsViewProps> = ({ onNavigateToIdeas, onNavigateToTools }) => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [selectedGuideId, setSelectedGuideId] = useState<string>(creatorGuides[0].id);
  const activeGuide: CreatorPlatformGuide = creatorGuides.find((g) => g.id === selectedGuideId) || creatorGuides[0];

  const IconComp = iconMap[activeGuide.icon] || Sparkles;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-bold text-orange-400">
          <Gamepad2 className="h-4 w-4" />
          <span>{isRTL ? 'أكاديمية صناع المحتوى والمنصات' : 'Creator Growth & Monetization Academy'}</span>
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-black text-white">
          {isRTL ? 'دليل احتراف المنصات والألعاب' : 'Master Platforms & Monetize Your Audience'}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
          {isRTL
            ? 'شروط تحقيق الربح، أسرار الخوارزميات، تكتيكات زيادة التفاعل، ودليل شامل لصناع محتوى يوتيوب وتيك توك وفري فاير.'
            : 'Monetization policies, algorithmic retention triggers, and growth playbooks for YouTube, TikTok, Free Fire, and Instagram.'}
        </p>
      </div>

      {/* Platform Selector Buttons */}
      <div className="mt-8 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {creatorGuides.map((guide) => {
          const isSelected = guide.id === selectedGuideId;
          const GuideIcon = iconMap[guide.icon] || Sparkles;
          const name = language === 'ar' ? guide.arabicName : language === 'fr' ? guide.frenchName : guide.name;

          return (
            <button
              key={guide.id}
              onClick={() => setSelectedGuideId(guide.id)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
                isSelected
                  ? 'border-orange-500/80 bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-500/20 scale-102'
                  : 'border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <GuideIcon className="h-4 w-4" />
              <span>{name}</span>
            </button>
          );
        })}
      </div>

      {/* Platform Detailed Content Canvas */}
      <div className="mt-8 space-y-6">
        
        {/* Hero Card for Current Guide */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
                <IconComp className="h-8 w-8 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {language === 'ar' ? activeGuide.arabicName : language === 'fr' ? activeGuide.frenchName : activeGuide.name}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-zinc-300 font-medium max-w-xl">
                  {language === 'ar' ? activeGuide.taglineAr : activeGuide.taglineEn}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-center sm:text-end shrink-0">
              <div className="text-xs text-zinc-400 font-semibold">{isRTL ? 'متوسط الـ RPM التقديري:' : 'Average Potential RPM:'}</div>
              <div className="mt-1 text-lg sm:text-xl font-black text-amber-400">{activeGuide.monetization.potentialRpm}</div>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Monetization Requirements & Payouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Monetization Requirements */}
          <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>{isRTL ? 'شروط تفعيل الأرباح الرسمية' : 'Official Monetization Requirements'}</span>
            </h3>

            <div className="mt-4 space-y-2.5">
              {(language === 'ar' ? activeGuide.monetization.arabicRequirements : activeGuide.monetization.requirements).map((req, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-zinc-800/70 bg-zinc-950/50 p-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
                    {req}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payout Channels */}
          <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>{isRTL ? 'طرق وقنوات استلام الأرباح' : 'Payout & Revenue Streams'}</span>
            </h3>

            <div className="mt-4 space-y-2.5">
              {(language === 'ar' ? activeGuide.monetization.arabicPayoutMethods : activeGuide.monetization.payoutMethods).map((method, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-zinc-800/70 bg-zinc-950/50 p-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                    $
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-200 font-medium">
                    {method}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Tactical Algorithmic Growth Hacks */}
        <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>{isRTL ? 'تكتيكات الخوارزمية وأسرار رفع المشاهدات' : 'Algorithmic Growth Tactics'}</span>
          </h3>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeGuide.growthHacks.map((hack, idx) => (
              <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-orange-500/20 text-xs font-black text-orange-400">
                    {idx + 1}
                  </span>
                  <span>{isRTL ? hack.titleAr : hack.titleEn}</span>
                </div>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed font-medium">
                  {isRTL ? hack.detailAr : hack.detailEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Formats & Equipment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Formats */}
          <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="h-4 w-4 text-amber-400" />
              <span>{isRTL ? 'أنواع الفيديوهات الأكثر نجاحاً' : 'Top Performing Formats'}</span>
            </h3>

            <div className="mt-4 space-y-3">
              {activeGuide.bestFormats.map((fmt, i) => (
                <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-3.5">
                  <div className="text-xs sm:text-sm font-bold text-amber-300">
                    {isRTL ? fmt.nameAr : fmt.nameEn}
                  </div>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                    {isRTL ? fmt.descriptionAr : fmt.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Gear & Software */}
          <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <Wrench className="h-4 w-4 text-orange-400" />
              <span>{isRTL ? 'البرامج والأدوات الموصى بها' : 'Recommended Software & Tools'}</span>
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {activeGuide.gearAndTools.map((gear, i) => (
                <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-950/80 px-3.5 py-2 text-xs font-semibold text-zinc-200">
                  {gear}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="text-xs font-bold text-amber-400 mb-1">{isRTL ? 'خطوتك التالية:' : 'Next Step:'}</div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {isRTL
                  ? 'تصفح أفكار المحتوى المتوافقة مع هذه المنصة أو استخدم حاسبة أرباح المشاهدات لحساب دخلك المستهدف.'
                  : 'Check out tailored content ideas for this platform or compute your potential views revenue in the Tools section.'}
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={onNavigateToIdeas}
                  className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-black hover:bg-amber-400"
                >
                  {isRTL ? 'أفكار المحتوى' : 'Ideas'}
                </button>
                <button
                  onClick={onNavigateToTools}
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-200 hover:text-white"
                >
                  {isRTL ? 'الحاسبات' : 'Calculators'}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
