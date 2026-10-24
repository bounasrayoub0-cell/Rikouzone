import React, { useState } from 'react';
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
  Sparkles,
  Lock,
  Unlock,
  BookOpen
} from 'lucide-react';
import { 
  useUserXp, 
  isTrackLocked, 
  getTrackLockDetails, 
  LOCKED_TRACKS_RULES, 
  lockedTracksI18n 
} from '../../utils/lockedTracks';
import { RikouLessonReader } from '../lessons/RikouLessonReader';
import { getTrackUnifiedLesson } from '../../data/lessonsData/lessonAdapter';

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
  onNavigateToPrintOnDemand?: () => void;
  onNavigateToDropshipping?: () => void;
  onNavigateToEcommerce?: () => void;
  onNavigateToOnlineCourses?: () => void;
  onNavigateToCoaching?: () => void;
  onNavigateToNewsletter?: () => void;
  onNavigateToMicroSaas?: () => void;
  onNavigateToCpaMarketing?: () => void;
  onNavigateToLeadGeneration?: () => void;
  onNavigateToStockContent?: () => void;
  onNavigateToGamingContent?: () => void;
  onNavigateToFreeFireContent?: () => void;
  onNavigateToFacelessYoutube?: () => void;
  onNavigateToFacelessTiktok?: () => void;
  onNavigateToLocalBusiness?: () => void;
  onNavigateToChallenges?: () => void;
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
  onNavigateToPrintOnDemand,
  onNavigateToDropshipping,
  onNavigateToEcommerce,
  onNavigateToOnlineCourses,
  onNavigateToCoaching,
  onNavigateToNewsletter,
  onNavigateToMicroSaas,
  onNavigateToCpaMarketing,
  onNavigateToLeadGeneration,
  onNavigateToStockContent,
  onNavigateToGamingContent,
  onNavigateToFreeFireContent,
  onNavigateToFacelessYoutube,
  onNavigateToFacelessTiktok,
  onNavigateToLocalBusiness,
  onNavigateToChallenges,
}) => {
  const { language, isRTL, t, localizePath } = useLanguage();
  const userXp = useUserXp();
  const [showInteractiveLesson, setShowInteractiveLesson] = useState<boolean>(false);

  if (!path) return null;

  if (showInteractiveLesson) {
    const unifiedLesson = getTrackUnifiedLesson(path.id, path);
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
        <div 
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 sm:p-7 shadow-2xl my-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top navigation inside lesson reader */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-zinc-800">
            <button
              onClick={() => setShowInteractiveLesson(false)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer"
            >
              <span>← العودة لبطاقة المجال</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900/80 p-2 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <RikouLessonReader
            lesson={unifiedLesson}
            onNavigateBack={() => setShowInteractiveLesson(false)}
            onCopyText={onCopyText}
          />
        </div>
      </div>
    );
  }

  const { title, shortDesc, category } = localizePath(path);
  const desc = (language === 'ar' || language === 'ary') 
    ? (path.arabicFullDescription || path.arabicShortDescription || shortDesc) 
    : language === 'fr' 
    ? (path.frenchFullDescription || path.frenchShortDescription || shortDesc) 
    : (shortDesc || path.fullDescription || path.shortDescription);

  const timeLabel = (language === 'ar' || language === 'ary') ? (path.arabicTimeToFirstIncome || path.timeToFirstIncome) : path.timeToFirstIncome;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-3xl rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#101828] p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent Glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 -z-10 h-40 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Top Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-zinc-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-lg bg-[#EAF1FF] dark:bg-blue-950/40 px-3 py-1 text-xs font-bold text-[#2563EB] dark:text-blue-400 border border-blue-200 dark:border-blue-900/50">
                {category}
              </span>
              <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                path.difficulty === 'beginner' 
                  ? 'bg-blue-50 dark:bg-blue-950/30 text-[#2563EB] dark:text-blue-400 border border-blue-200 dark:border-blue-900/40' 
                  : path.difficulty === 'intermediate'
                  ? 'bg-amber-500/15 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 dark:border-amber-500/20'
                  : 'bg-rose-500/15 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/30 dark:border-rose-500/20'
              }`}>
                {path.difficulty === 'beginner' ? t.income.beginnerFriendly : path.difficulty === 'intermediate' ? t.common.intermediate : t.common.advanced}
              </span>
              {path.facelessPossible && (
                <span className="rounded-lg bg-[#EAF1FF] dark:bg-blue-950/40 px-2.5 py-1 text-xs font-bold text-[#2563EB] dark:text-blue-400 border border-blue-200 dark:border-blue-900/40">
                  {t.income.facelessPossible}
                </span>
              )}
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleSave(path.id)}
              className={`rounded-xl p-2.5 border transition-all cursor-pointer ${
                isSaved 
                  ? 'border-blue-200 bg-[#EAF1FF] text-[#2563EB]' 
                  : 'border-slate-200 dark:border-zinc-800 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900/80 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={isSaved ? t.income.saved : t.income.savePath}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-[#2563EB] text-[#2563EB]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900/80 p-2.5 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Upgraded Interactive Course Banner / Lock Banner */}
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
            "print-on-demand": onNavigateToPrintOnDemand,
            "dropshipping": onNavigateToDropshipping,
            "ecommerce": onNavigateToEcommerce,
            "online-courses": onNavigateToOnlineCourses,
            "online-coaching": onNavigateToCoaching,
            "newsletter": onNavigateToNewsletter,
            "micro-saas": onNavigateToMicroSaas,
            "cpa-marketing": onNavigateToCpaMarketing,
            "lead-generation": onNavigateToLeadGeneration,
            "stock-content": onNavigateToStockContent,
            "gaming-content": onNavigateToGamingContent,
            "free-fire-content": onNavigateToFreeFireContent,
            "faceless-youtube": onNavigateToFacelessYoutube,
            "faceless-tiktok": onNavigateToFacelessTiktok,
            "local-business-digital-services": onNavigateToLocalBusiness,
          };
          const navFn = navMap[path.id];
          if (!navFn) return null;

          const lockRule = LOCKED_TRACKS_RULES[path.id];
          const isLocked = lockRule ? isTrackLocked(path.id, userXp) : false;
          const lockDetails = lockRule ? getTrackLockDetails(path.id, userXp) : null;
          const tLock = lockedTracksI18n[language] || lockedTracksI18n['ar'];

          if (isLocked && lockRule && lockDetails) {
            return (
              <div className="mt-5 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-zinc-900/90 to-amber-500/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-amber-500/10">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-[11px] font-black text-amber-300">
                    <Lock className="h-3 w-3" />
                    <span>{tLock.lockedBadge} · {lockRule.requiredXp} XP</span>
                  </div>
                  <h4 className="mt-1.5 text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <span>{title}</span>
                    <Lock className="h-4 w-4 text-amber-400" />
                  </h4>
                  <p className="mt-0.5 text-xs text-zinc-300 leading-relaxed">
                    {tLock.modalDesc.replace('{req}', `${lockRule.requiredXp}`)}
                  </p>
                  
                  {/* Progress indicator */}
                  <div className="mt-2.5 flex items-center gap-3">
                    <div className="h-2 w-32 sm:w-48 overflow-hidden rounded-full bg-zinc-900 border border-amber-500/20">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        style={{ width: `${Math.max(4, lockDetails.progressPercent)}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-mono text-amber-300 font-bold">
                      {lockDetails.progressPercent}% ({userXp} / {lockRule.requiredXp} XP)
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateToChallenges) {
                      onNavigateToChallenges();
                    } else {
                      navFn();
                    }
                  }}
                  className="shrink-0 w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl py-2.5 px-5 text-xs font-bold transition-all cursor-pointer bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/10 border border-amber-500/40 text-amber-300 hover:from-amber-500 hover:to-orange-500 hover:text-black shadow-md shadow-amber-500/10 active:scale-95"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>{tLock.cardActionLocked.replace('{req}', `${lockRule.requiredXp}`)}</span>
                </button>
              </div>
            );
          }

          return (
            <div className="mt-5 rounded-2xl border border-emerald-400/50 dark:border-emerald-500/40 bg-gradient-to-r from-emerald-50 via-emerald-100/40 to-white dark:from-emerald-500/15 dark:via-zinc-900/90 dark:to-emerald-500/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm dark:shadow-xl dark:shadow-emerald-500/10">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-black text-emerald-800 dark:text-emerald-300">
                  {lockRule ? (
                    <>
                      <Unlock className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      <span>{tLock.unlockedBadge} ({userXp} / {lockRule.requiredXp} XP)</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      <span>{t.income.trackUpgradedBadge}</span>
                    </>
                  )}
                </div>
                <h4 className="mt-1.5 text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {title}
                </h4>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {desc}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setShowInteractiveLesson(true)}
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2.5 text-xs font-black text-black hover:from-amber-400 hover:to-yellow-400 transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>الدرس التفاعلي (+35 XP)</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navFn();
                  }}
                  className="rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-black text-black hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/25 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{t.income.openFullCourse}</span>
                  <span>🚀</span>
                </button>
              </div>
            </div>
          );
        })()}

        {/* Description */}
        <p className="mt-5 text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
          {desc}
        </p>

        {/* 3-Pillar Financial Metrics Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-900/40 p-4 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-zinc-400">
              <DollarSign className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
              <span>{t.income.monthlyPotential}</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400">
              {path.estimatedIncomeRange}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-900/40 p-4 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-zinc-400">
              <Clock className="h-4 w-4 text-orange-500 dark:text-orange-400" />
              <span>{t.income.timeToIncome}</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-slate-800 dark:text-zinc-100">
              {timeLabel}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-900/40 p-4 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-zinc-400">
              <TrendingUp className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
              <span>{t.income.startupCapital}</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {path.startingCostAmount}
            </div>
          </div>
        </div>

        {/* Step-by-Step Action Roadmap */}
        {path.stepByStep && path.stepByStep.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
              <span>{t.income.stepByStepTitle}</span>
            </h3>

            <div className="mt-3 space-y-2.5">
              {path.stepByStep.map((step) => (
                <div 
                  key={step.stepNumber}
                  className="flex items-start gap-3.5 rounded-2xl border border-slate-200 dark:border-zinc-800/60 bg-slate-50/70 dark:bg-zinc-900/30 p-3.5 shadow-sm dark:shadow-none"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-xs font-black text-emerald-600 dark:text-emerald-400">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h4>
                    <p className="mt-0.5 text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
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
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-900/30 p-4 shadow-sm dark:shadow-none">
            <h4 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
              <span>{t.income.requiredSkills}</span>
            </h4>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {path.requiredSkills.map((s, idx) => (
                <span key={idx} className="rounded-lg bg-white dark:bg-zinc-800/90 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700/50 shadow-sm dark:shadow-none">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-900/30 p-4 shadow-sm dark:shadow-none">
            <h4 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Wrench className="h-4 w-4 text-orange-500 dark:text-orange-400" />
              <span>{t.income.recommendedTools}</span>
            </h4>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {[...path.tools, ...path.platforms].map((tItem, idx) => (
                <span key={idx} className="rounded-lg bg-emerald-500/15 dark:bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 dark:border-emerald-500/20">
                  {tItem}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-emerald-400/40 dark:border-emerald-500/20 bg-emerald-50/70 dark:bg-emerald-500/5 p-4 shadow-sm dark:shadow-none">
            <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <ThumbsUp className="h-4 w-4" />
              <span>{t.income.advantagesTitle}</span>
            </h4>
            <ul className="space-y-1 text-xs text-slate-700 dark:text-zinc-300">
              {path.pros.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-rose-400/40 dark:border-rose-500/20 bg-rose-50/70 dark:bg-rose-500/5 p-4 shadow-sm dark:shadow-none">
            <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <ThumbsDown className="h-4 w-4" />
              <span>{t.income.challengesTitle}</span>
            </h4>
            <ul className="space-y-1 text-xs text-slate-700 dark:text-zinc-300">
              {path.cons.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-rose-600 dark:text-rose-400 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Realistic Warning Box */}
        <div className="mt-6 rounded-2xl border border-amber-400/40 dark:border-amber-500/30 bg-gradient-to-r from-amber-50/90 to-orange-50/50 dark:from-amber-500/10 dark:to-orange-500/10 p-4 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>{t.income.realityCheckTitle}</span>
          </div>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-800 dark:text-zinc-200 font-medium leading-relaxed">
            {path.realisticWarning}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onCopyText(`${title}\n${path.estimatedIncomeRange}\n${desc}`, t.toasts.copySuccess)}
              className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] dark:text-blue-400 hover:underline cursor-pointer"
            >
              <Copy className="h-4 w-4" />
              <span>{t.income.copySummary}</span>
            </button>

            <button
              onClick={() => setShowInteractiveLesson(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] dark:text-blue-400 hover:underline cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>الدرس التفاعلي الشامل (+35 XP)</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] px-6 py-2.5 text-xs font-bold text-white transition-all cursor-pointer shadow-md shadow-blue-600/20"
          >
            {t.common.close}
          </button>
        </div>

      </div>
    </div>
  );
};
