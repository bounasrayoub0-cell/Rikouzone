import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { IncomePath, ContentIdea } from '../../types';
import { incomePaths } from '../../data/incomePaths';
import { contentIdeas } from '../../data/contentIdeas';
import { 
  TrendingUp, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Bookmark, 
  Calculator, 
  Layers, 
  Zap,
  Gamepad2,
  Check
} from 'lucide-react';

interface HomeFeaturedProps {
  onNavigate: (tab: string) => void;
  onSelectPath: (path: IncomePath) => void;
  onSelectIdea: (idea: ContentIdea) => void;
  onToggleSave: (id: string, type: 'income' | 'idea') => void;
  isSaved: (id: string) => boolean;
  onCopyText: (text: string, label: string) => void;
}

export const HomeFeatured: React.FC<HomeFeaturedProps> = ({
  onNavigate,
  onSelectPath,
  onSelectIdea,
  onToggleSave,
  isSaved,
  onCopyText
}) => {
  const { language, isRTL, t, localizePath, localizeIdea } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const featuredPaths = incomePaths.slice(0, 4);
  const featuredIdeas = contentIdeas.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Global Metrics Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl shadow-sm dark:shadow-none">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5 text-center">
            
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/60 bg-slate-50/80 dark:bg-zinc-950/60 p-4 shadow-sm dark:shadow-none">
              <div className="text-2xl sm:text-3xl font-black text-[#2563EB] dark:text-blue-400 font-sans">35+</div>
              <div className="mt-1 text-xs font-semibold text-[#667085] dark:text-zinc-400">
                {t.stats.paths}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/60 bg-slate-50/80 dark:bg-zinc-950/60 p-4 shadow-sm dark:shadow-none">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">160+</div>
              <div className="mt-1 text-xs font-semibold text-[#667085] dark:text-zinc-400">
                {t.stats.ideas}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/60 bg-slate-50/80 dark:bg-zinc-950/60 p-4 shadow-sm dark:shadow-none">
              <div className="text-2xl sm:text-3xl font-black text-[#2563EB] dark:text-blue-400 font-sans">17</div>
              <div className="mt-1 text-xs font-semibold text-[#667085] dark:text-zinc-400">
                {t.stats.tools}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/60 bg-slate-50/80 dark:bg-zinc-950/60 p-4 shadow-sm dark:shadow-none">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">15</div>
              <div className="mt-1 text-xs font-semibold text-[#667085] dark:text-zinc-400">
                {t.stats.ai}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-4 lg:col-span-1 rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-[#EAF1FF] dark:bg-blue-950/20 p-4 flex flex-col justify-center shadow-sm dark:shadow-none">
              <div className="text-xl sm:text-2xl font-black text-[#2563EB] dark:text-blue-400 font-sans">100%</div>
              <div className="mt-1 text-xs font-semibold text-slate-700 dark:text-zinc-300">
                {t.stats.freeSuite}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Challenges & Daily XP Invitation Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div 
          onClick={() => onNavigate('challenges')}
          className="group relative cursor-pointer overflow-hidden rounded-3xl border border-blue-200 dark:border-blue-900/40 bg-gradient-to-r from-[#EAF1FF] via-white to-blue-50/50 dark:from-blue-950/30 dark:via-zinc-900 dark:to-zinc-950 p-4.5 sm:p-7 backdrop-blur-xl transition-all hover:border-[#2563EB] hover:shadow-lg shadow-sm dark:shadow-none min-w-0"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-md shadow-blue-600/20 shrink-0">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-xs font-bold text-[#2563EB] dark:text-blue-400 shrink-0">قسم جديد</span>
                  <span className="text-[10px] bg-white/80 dark:bg-blue-900/40 text-[#2563EB] dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-full font-bold truncate">
                    تحديات يومية وأسبوعية 2026
                  </span>
                </div>
                <h3 className="text-sm sm:text-lg font-black text-slate-900 dark:text-white mt-0.5 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors break-words">
                  التحديات ونقاط الخبرة XP — حوّل تعلّمك إلى عادة يومية
                </h3>
                <p className="text-xs text-[#667085] dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                  اختبر معلوماتك، أنجز تمارين تطبيقية، حافظ على شعلة الأيام المتتالية Streak، واجمع شارات التميز.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs group-hover:bg-[#1D4ED8] transition-colors flex items-center gap-1.5 shadow-md shadow-blue-600/20">
                <span>دخول التحديات</span>
                <ArrowIcon className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Income Paths Spotlight */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] dark:text-blue-400 uppercase tracking-wider">
              <TrendingUp className="h-4 w-4" />
              <span>{t.sections.incomeOpportunities}</span>
            </div>
            <h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
              {t.income.topPathsTitle}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('income')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] dark:text-blue-400 hover:text-[#1D4ED8] dark:hover:text-blue-300 transition-colors"
          >
            <span>{t.income.browseAllPathsBtn}</span>
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredPaths.map((path) => {
            const { title, shortDesc, category } = localizePath(path);
            const saved = isSaved(path.id);

            return (
              <div
                key={path.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/60 p-5 shadow-sm dark:shadow-none transition-all hover:border-[#2563EB]/40 hover:bg-slate-50 dark:hover:bg-zinc-900/90 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-[#EAF1FF] dark:bg-blue-950/40 px-2.5 py-1 text-[11px] font-bold text-[#2563EB] dark:text-blue-400 border border-blue-200 dark:border-blue-900/40">
                      {category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(path.id, 'income');
                      }}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-[#2563EB] hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
                      title={t.common.save}
                    >
                      <Bookmark className={`h-4 w-4 ${saved ? 'fill-[#2563EB] text-[#2563EB]' : ''}`} />
                    </button>
                  </div>

                  <h3 
                    onClick={() => {
                      if (path.id === 'affiliate-marketing') {
                        onNavigate('affiliate');
                      } else if (path.id === 'tiktok-affiliate') {
                        onNavigate('tiktok-affiliate');
                      } else if (path.id === 'youtube-monetization') {
                        onNavigate('youtube-monetization');
                      } else if (path.id === 'instagram-monetization') {
                        onNavigate('instagram-monetization');
                      } else if (path.id === 'facebook-monetization') {
                        onNavigate('facebook-monetization');
                      } else if (path.id === 'blogging') {
                        onNavigate('blogging');
                      } else if (path.id === 'seo-services') {
                        onNavigate('seo-services');
                      } else if (path.id === 'freelance-writing') {
                        onNavigate('freelance-writing');
                      } else if (path.id === 'copywriting') {
                        onNavigate('copywriting');
                      } else if (path.id === 'video-editing') {
                        onNavigate('video-editing');
                      } else if (path.id === 'graphic-design') {
                        onNavigate('graphic-design');
                      } else if (path.id === 'thumbnail-design') {
                        onNavigate('thumbnail-design');
                      } else if (path.id === 'web-development') {
                        onNavigate('web-development');
                      } else if (path.id === 'app-development') {
                        onNavigate('app-development');
                      } else if (path.id === 'social-media-management') {
                        onNavigate('social-media-management');
                      } else if (path.id === 'ugc-content') {
                        onNavigate('ugc-content');
                      } else if (path.id === 'print-on-demand') {
                        onNavigate('print-on-demand');
                      } else if (path.id === 'dropshipping') {
                        onNavigate('dropshipping');
                      } else if (path.id === 'ecommerce') {
                        onNavigate('ecommerce');
                      } else {
                        onSelectPath(path);
                      }
                    }}
                    className="mt-3 text-base font-bold text-slate-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-1"
                  >
                    {title}
                  </h3>
                  
                  <p className="mt-2 text-xs text-[#667085] dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {shortDesc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-zinc-800/70">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#667085] dark:text-zinc-500">{t.income.incomeRange}</span>
                    <span className="font-bold text-[#2563EB] dark:text-blue-400">{path.potentialMonthlyIncome || path.estimatedIncomeRange}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="text-[#667085] dark:text-zinc-500">{t.income.timeToIncome}</span>
                    <span className="font-semibold text-slate-700 dark:text-zinc-300">{path.timeToLearn || path.timeToFirstIncome}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (path.id === 'affiliate-marketing') {
                        onNavigate('affiliate');
                      } else if (path.id === 'tiktok-affiliate') {
                        onNavigate('tiktok-affiliate');
                      } else if (path.id === 'youtube-monetization') {
                        onNavigate('youtube-monetization');
                      } else if (path.id === 'instagram-monetization') {
                        onNavigate('instagram-monetization');
                      } else if (path.id === 'facebook-monetization') {
                        onNavigate('facebook-monetization');
                      } else if (path.id === 'blogging') {
                        onNavigate('blogging');
                      } else if (path.id === 'seo-services') {
                        onNavigate('seo-services');
                      } else if (path.id === 'freelance-writing') {
                        onNavigate('freelance-writing');
                      } else if (path.id === 'copywriting') {
                        onNavigate('copywriting');
                      } else if (path.id === 'video-editing') {
                        onNavigate('video-editing');
                      } else if (path.id === 'ugc-content') {
                        onNavigate('ugc-content');
                      } else if (path.id === 'print-on-demand') {
                        onNavigate('print-on-demand');
                      } else if (path.id === 'dropshipping') {
                        onNavigate('dropshipping');
                      } else if (path.id === 'ecommerce') {
                        onNavigate('ecommerce');
                      } else if (path.id === 'online-courses') {
                        onNavigate('online-courses');
                      } else if (path.id === 'online-coaching') {
                        onNavigate('online-coaching');
                      } else if (path.id === 'newsletter') {
                        onNavigate('newsletter');
                      } else if (path.id === 'micro-saas') {
                        onNavigate('micro-saas');
                      } else if (path.id === 'cpa-marketing') {
                        onNavigate('cpa-marketing');
                      } else if (path.id === 'lead-generation') {
                        onNavigate('lead-generation');
                      } else if (path.id === 'stock-content') {
                        onNavigate('stock-content');
                      } else if (path.id === 'gaming-content') {
                        onNavigate('gaming-content');
                      } else if (path.id === 'free-fire-content') {
                        onNavigate('free-fire-content');
                      } else if (path.id === 'faceless-youtube') {
                        onNavigate('faceless-youtube');
                      } else if (path.id === 'faceless-tiktok') {
                        onNavigate('faceless-tiktok');
                      } else if (path.id === 'local-business-digital-services') {
                        onNavigate('local-business-digital-services');
                      } else {
                        onSelectPath(path);
                      }
                    }}
                    className={`mt-3 w-full rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
                      path.id === 'affiliate-marketing' || path.id === 'tiktok-affiliate' || path.id === 'youtube-monetization' || path.id === 'instagram-monetization' || path.id === 'facebook-monetization' || path.id === 'blogging' || path.id === 'seo-services' || path.id === 'freelance-writing' || path.id === 'copywriting' || path.id === 'video-editing' || path.id === 'print-on-demand' || path.id === 'dropshipping' || path.id === 'ecommerce' || path.id === 'online-courses' || path.id === 'online-coaching' || path.id === 'newsletter' || path.id === 'micro-saas' || path.id === 'cpa-marketing' || path.id === 'lead-generation' || path.id === 'stock-content' || path.id === 'gaming-content' || path.id === 'free-fire-content' || path.id === 'faceless-youtube' || path.id === 'faceless-tiktok' || path.id === 'local-business-digital-services'
                        ? 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] font-bold shadow-md shadow-blue-600/20'
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-[#2563EB] hover:text-white'
                    }`}
                  >
                    {path.id === 'affiliate-marketing' || path.id === 'tiktok-affiliate' || path.id === 'youtube-monetization' || path.id === 'instagram-monetization' || path.id === 'facebook-monetization' || path.id === 'blogging' || path.id === 'seo-services' || path.id === 'freelance-writing' || path.id === 'copywriting' || path.id === 'video-editing' || path.id === 'print-on-demand' || path.id === 'dropshipping' || path.id === 'ecommerce' || path.id === 'online-courses' || path.id === 'online-coaching' || path.id === 'newsletter' || path.id === 'micro-saas' || path.id === 'cpa-marketing' || path.id === 'lead-generation' || path.id === 'stock-content' || path.id === 'gaming-content' || path.id === 'free-fire-content' || path.id === 'faceless-youtube' || path.id === 'faceless-tiktok' || path.id === 'local-business-digital-services'
                      ? t.income.openFullCourse
                      : t.income.viewDetails}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. High-Impact Content Ideas Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/30 p-6 sm:p-8 backdrop-blur-xl shadow-sm dark:shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] dark:text-blue-400 uppercase tracking-wider">
                <Flame className="h-4 w-4 text-[#2563EB] dark:text-blue-400" />
                <span>{t.ideas.libraryBadge}</span>
              </div>
              <h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
                {t.ideas.readyToPublish}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('ideas')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] dark:text-blue-400 hover:text-[#1D4ED8] dark:hover:text-blue-300 transition-colors"
            >
              <span>{t.sections.browseAllIdeas}</span>
              <ArrowIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredIdeas.map((idea) => {
              const { title, hook } = localizeIdea(idea);

              return (
                <div
                  key={idea.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-zinc-800/90 bg-white dark:bg-zinc-950/70 p-5 shadow-sm dark:shadow-none hover:border-[#2563EB]/40 hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="rounded-md bg-slate-100 dark:bg-zinc-800/80 px-2 py-0.5 font-bold text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/50">
                        {idea.platform}
                      </span>
                      <span className="font-semibold text-[#2563EB] dark:text-blue-400">
                        {idea.niche}
                      </span>
                    </div>

                    <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                      {title}
                    </h3>

                    {/* Hook Callout Box */}
                    <div className="mt-3 rounded-xl border border-blue-100 dark:border-blue-950/60 bg-[#EAF1FF]/40 dark:bg-blue-950/20 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] dark:text-blue-400">
                          {t.sections.openingHookCallout}
                        </span>
                        <button
                          onClick={() => onCopyText(hook, t.sections.hookCopiedFeedback)}
                          className="flex items-center gap-1 rounded bg-slate-200 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
                          title={t.sections.copyHookBtn}
                        >
                          <Copy className="h-3 w-3" />
                          <span>{t.common.copy}</span>
                        </button>
                      </div>
                      <p className="mt-1.5 text-xs font-semibold text-slate-800 dark:text-zinc-200 line-clamp-2 italic">
                        "{hook}"
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectIdea(idea)}
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-transparent py-2 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-blue-400 transition-all cursor-pointer"
                  >
                    <span>{t.sections.viewScriptOutline}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Special Free Fire & Gaming Creator Hub Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-blue-200 dark:border-blue-900/40 bg-gradient-to-r from-slate-50 via-white to-blue-50/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 sm:p-10 backdrop-blur-xl shadow-sm dark:shadow-none">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF1FF] text-[#2563EB] dark:bg-blue-950/50 dark:border-blue-900/50 dark:text-blue-400 px-3 py-1 text-xs font-bold border border-blue-200">
                <Gamepad2 className="h-4 w-4" />
                <span>{t.sections.gamingBannerTag}</span>
              </div>
              <h3 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {t.sections.gamingBannerTitle}
              </h3>
              <p className="mt-2 text-sm text-[#667085] dark:text-zinc-300 leading-relaxed">
                {t.sections.gamingBannerDesc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate('creators')}
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 hover:scale-105 transition-all cursor-pointer"
              >
                <Flame className="h-4 w-4" />
                <span>{t.sections.gamingBannerBtnGuide}</span>
              </button>
              <button
                onClick={() => onNavigate('ideas')}
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/80 px-5 py-3.5 text-sm font-bold text-slate-700 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm dark:shadow-none cursor-pointer"
              >
                <span>{t.sections.gamingBannerBtnIdeas}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
