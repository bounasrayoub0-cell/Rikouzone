import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { IncomePath } from '../../types';
import { 
  X, 
  Copy, 
  Bookmark, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  Layers, 
  ShieldCheck,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Monitor,
  Sparkles
} from 'lucide-react';

interface IncomeDetailModalProps {
  path: IncomePath | null;
  onClose: () => void;
  onToggleSave: (id: string) => void;
  isSaved: boolean;
  onCopyText: (text: string, label: string) => void;
  onNavigateToAffiliate?: () => void;
  onNavigateToTikTokAffiliate?: () => void;
  onNavigateToYouTube?: () => void;
  onNavigateToInstagram?: () => void;
  onNavigateToFacebook?: () => void;
  onNavigateToBlogging?: () => void;
  onNavigateToSeoServices?: () => void;
  onNavigateToWriting?: () => void;
  onNavigateToCopywriting?: () => void;
  onNavigateToVideoEditing?: () => void;
  onNavigateToGraphicDesign?: () => void;
  onNavigateToThumbnailDesign?: () => void;
  onNavigateToWebDev?: () => void;
  onNavigateToAppDev?: () => void;
  onNavigateToSocialMedia?: () => void;
  onNavigateToUgc?: () => void;
  onNavigateToAiContent?: () => void;
  onNavigateToAiAutomation?: () => void;
  onNavigateToDigitalProducts?: () => void;
  onNavigateToTemplates?: () => void;
}

export const IncomeDetailModal: React.FC<IncomeDetailModalProps> = ({
  path,
  onClose,
  onToggleSave,
  isSaved,
  onCopyText,
  onNavigateToAffiliate,
  onNavigateToTikTokAffiliate,
  onNavigateToYouTube,
  onNavigateToInstagram,
  onNavigateToFacebook,
  onNavigateToBlogging,
  onNavigateToSeoServices,
  onNavigateToWriting,
  onNavigateToCopywriting,
  onNavigateToVideoEditing,
  onNavigateToGraphicDesign,
  onNavigateToThumbnailDesign,
  onNavigateToWebDev,
  onNavigateToAppDev,
  onNavigateToSocialMedia,
  onNavigateToUgc,
  onNavigateToAiContent,
  onNavigateToAiAutomation,
  onNavigateToDigitalProducts,
  onNavigateToTemplates,
}) => {
  const { language, isRTL, t, localizePath } = useLanguage();

  if (!path) return null;

  const { title, shortDesc, category } = localizePath(path);
  const desc = (language === 'ar' || language === 'ary') 
    ? (path.arabicFullDescription || path.arabicShortDescription || shortDesc) 
    : language === 'fr' 
    ? (path.frenchFullDescription || path.frenchShortDescription || shortDesc) 
    : (shortDesc || path.fullDescription || path.shortDescription);

  const timeLabel = (language === 'ar' || language === 'ary') ? (path.arabicTimeToFirstIncome || path.timeToFirstIncome) : path.timeToFirstIncome;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-3xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent Glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 -z-10 h-40 w-80 rounded-full bg-emerald-500/20 blur-3xl" />

        {/* Top Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                {category}
              </span>
              <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                path.difficulty === 'beginner' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : path.difficulty === 'intermediate'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {path.difficulty === 'beginner' ? t.income.beginnerFriendly : path.difficulty === 'intermediate' ? t.common.intermediate : t.common.advanced}
              </span>
              {path.facelessPossible && (
                <span className="rounded-lg bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400 border border-blue-500/20">
                  {t.income.facelessPossible}
                </span>
              )}
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleSave(path.id)}
              className={`rounded-xl p-2.5 border transition-all ${
                isSaved 
                  ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-400' 
                  : 'border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white'
              }`}
              title={isSaved ? t.income.saved : t.income.savePath}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-emerald-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2.5 text-zinc-400 hover:border-zinc-700 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Upgraded Interactive Course Banner */}
        {(() => {
          const navMap: Record<string, (() => void) | undefined> = {
            "affiliate-marketing": onNavigateToAffiliate,
            "tiktok-affiliate": onNavigateToTikTokAffiliate,
            "youtube-monetization": onNavigateToYouTube,
            "instagram-monetization": onNavigateToInstagram,
            "facebook-monetization": onNavigateToFacebook,
            "blogging": onNavigateToBlogging,
            "seo-services": onNavigateToSeoServices,
            "freelance-writing": onNavigateToWriting,
            "copywriting": onNavigateToCopywriting,
            "video-editing": onNavigateToVideoEditing,
            "graphic-design": onNavigateToGraphicDesign,
            "thumbnail-design": onNavigateToThumbnailDesign,
            "web-development": onNavigateToWebDev,
            "app-development": onNavigateToAppDev,
            "social-media-management": onNavigateToSocialMedia,
            "ugc-content": onNavigateToUgc,
            "ai-content-services": onNavigateToAiContent,
            "ai-automation-services": onNavigateToAiAutomation,
            "selling-digital-products": onNavigateToDigitalProducts,
            "selling-templates": onNavigateToTemplates,
          };
          const navFn = navMap[path.id];
          if (!navFn) return null;

          return (
            <div className="mt-5 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-500/15 via-zinc-900/90 to-emerald-500/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-emerald-500/10">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-black text-emerald-300">
                  <Sparkles className="h-3 w-3" />
                  <span>{t.income.trackUpgradedBadge}</span>
                </div>
                <h4 className="mt-1.5 text-base sm:text-lg font-black text-white">
                  {title}
                </h4>
                <p className="mt-0.5 text-xs text-zinc-300 leading-relaxed">
                  {desc}
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  navFn();
                }}
                className="shrink-0 w-full sm:w-auto rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-black text-black hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/25 active:scale-95 cursor-pointer"
              >
                {t.income.openFullCourse} 🚀
              </button>
            </div>
          );
        })()}

        {/* Description */}
        <p className="mt-5 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
          {desc}
        </p>

        {/* 3-Pillar Financial Metrics Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              <span>{t.income.monthlyPotential}</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-black text-emerald-400">
              {path.estimatedIncomeRange}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <Clock className="h-4 w-4 text-orange-400" />
              <span>{t.income.timeToIncome}</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-zinc-100">
              {timeLabel}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>{t.income.startupCapital}</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-emerald-400">
              {path.startingCostAmount}
            </div>
          </div>
        </div>

        {/* Step-by-Step Action Roadmap */}
        {path.stepByStep && path.stepByStep.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-emerald-400" />
              <span>{t.income.stepByStepTitle}</span>
            </h3>

            <div className="mt-3 space-y-2.5">
              {path.stepByStep.map((step) => (
                <div 
                  key={step.stepNumber}
                  className="flex items-start gap-3.5 rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-3.5"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-xs font-black text-emerald-400">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    <p className="mt-0.5 text-xs text-zinc-300 leading-relaxed font-normal">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Tools Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{t.income.requiredSkills}</span>
            </h4>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {path.requiredSkills.map((s, idx) => (
                <span key={idx} className="rounded-lg bg-zinc-800/90 px-2.5 py-1 text-xs font-semibold text-zinc-200 border border-zinc-700/50">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Wrench className="h-4 w-4 text-orange-400" />
              <span>{t.income.recommendedTools}</span>
            </h4>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {[...path.tools, ...path.platforms].map((tItem, idx) => (
                <span key={idx} className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/20">
                  {tItem}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <ThumbsUp className="h-4 w-4" />
              <span>{t.income.advantagesTitle}</span>
            </h4>
            <ul className="space-y-1 text-xs text-zinc-300">
              {path.pros.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <ThumbsDown className="h-4 w-4" />
              <span>{t.income.challengesTitle}</span>
            </h4>
            <ul className="space-y-1 text-xs text-zinc-300">
              {path.cons.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Realistic Warning Box */}
        <div className="mt-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{t.income.realityCheckTitle}</span>
          </div>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
            {path.realisticWarning}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
          <button
            onClick={() => onCopyText(`${title}\n${path.estimatedIncomeRange}\n${desc}`, t.toasts.copySuccess)}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline"
          >
            <Copy className="h-4 w-4" />
            <span>{t.income.copySummary}</span>
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-bold text-black hover:bg-emerald-400 transition-all"
          >
            {t.common.close}
          </button>
        </div>

      </div>
    </div>
  );
};
