import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ContentIdea } from '../../types';
import { 
  X, 
  Copy, 
  Bookmark, 
  Share2, 
  Flame, 
  Clock, 
  UserCheck, 
  UserX, 
  Layers, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface IdeaDetailModalProps {
  idea: ContentIdea | null;
  onClose: () => void;
  onToggleSave: (id: string) => void;
  isSaved: boolean;
  onCopyText: (text: string, label: string) => void;
}

export const IdeaDetailModal: React.FC<IdeaDetailModalProps> = ({
  idea,
  onClose,
  onToggleSave,
  isSaved,
  onCopyText
}) => {
  const { language, isRTL, t, localizeIdea } = useLanguage();

  if (!idea) return null;

  const { title, hook, desc, cta } = localizeIdea(idea);
  const script = (language === 'ar' || language === 'ary') 
    ? (idea.arabicScriptOutline || idea.scriptOutline) 
    : ((idea as any).frenchScriptOutline && language === 'fr') 
    ? (idea as any).frenchScriptOutline 
    : idea.scriptOutline;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Accent */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 -z-10 h-40 w-80 rounded-full bg-purple-600/20 blur-3xl" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-zinc-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-lg bg-purple-500/15 dark:bg-purple-500/10 px-2.5 py-0.5 text-xs font-bold text-purple-700 dark:text-purple-400 border border-purple-500/30 dark:border-purple-500/20">
                {idea.platform}
              </span>
              <span className="rounded-lg bg-slate-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-transparent">
                {idea.niche}
              </span>
              {idea.facelessPossibility && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-purple-500/15 dark:bg-purple-500/10 px-2 py-0.5 text-[11px] font-bold text-purple-700 dark:text-purple-300 border border-purple-500/30 dark:border-purple-500/20">
                  <UserX className="h-3 w-3" />
                  {t.income.facelessPossible}
                </span>
              )}
              {idea.arabicAngle && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-indigo-500/15 dark:bg-indigo-500/10 px-2 py-0.5 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 dark:border-indigo-500/20">
                  {idea.arabicAngle}
                </span>
              )}
            </div>

            <h2 className="mt-3 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleSave(idea.id)}
              className={`rounded-xl p-2.5 border transition-all cursor-pointer ${
                isSaved 
                  ? 'border-purple-500/50 bg-purple-500/20 text-purple-600 dark:text-purple-400' 
                  : 'border-slate-200 dark:border-zinc-800 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900/80 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={isSaved ? t.income.saved : t.common.save}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-purple-500 text-purple-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900/80 p-2.5 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Viral Hook Box */}
        <div className="mt-5 rounded-2xl border border-purple-300/50 dark:border-purple-500/30 bg-purple-50/70 dark:bg-gradient-to-r dark:from-purple-500/10 dark:to-indigo-500/10 p-4 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span>{t.ideas.openingHookTitle}</span>
            </span>
            <button
              onClick={() => onCopyText(hook, t.ideas.hookCopied)}
              className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-purple-500 transition-all cursor-pointer shadow-sm shadow-purple-600/20"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>{t.ideas.copyHook}</span>
            </button>
          </div>
          <p className="mt-2 text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed italic">
            "{hook}"
          </p>
        </div>

        {/* Description & Duration Stats */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-900/50 p-2.5 shadow-sm dark:shadow-none">
            <span className="text-slate-500 dark:text-zinc-500">{t.ideas.duration}:</span>
            <div className="font-black text-slate-800 dark:text-zinc-200 mt-0.5">{idea.duration}</div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-900/50 p-2.5 shadow-sm dark:shadow-none">
            <span className="text-slate-500 dark:text-zinc-500">{t.ideas.viralPotential}:</span>
            <div className="font-black text-purple-700 dark:text-purple-400 mt-0.5 capitalize">
              {idea.viralPotential === 'explosive' ? t.common.explosive : t.common.high}
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-900/50 p-2.5 shadow-sm dark:shadow-none">
            <span className="text-slate-500 dark:text-zinc-500">{t.ideas.competition}:</span>
            <div className="font-black text-slate-800 dark:text-zinc-200 mt-0.5 capitalize">{idea.competition}</div>
          </div>
        </div>

        {/* Step-by-Step Script Structure */}
        <div className="mt-5">
          <h3 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span>{t.ideas.scriptStructureTitle}</span>
          </h3>
          <div className="mt-2.5 space-y-2">
            {script.map((step: string, idx: number) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-slate-200 dark:border-zinc-800/60 bg-slate-50/70 dark:bg-zinc-900/40 p-3 shadow-sm dark:shadow-none"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-xs font-bold text-purple-700 dark:text-purple-400">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-zinc-200 leading-relaxed font-medium">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA (Call to Action) */}
        <div className="mt-5 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-900/40 p-4 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span>{t.ideas.closingCtaTitle}</span>
            </h4>
            <button
              onClick={() => onCopyText(cta, t.ideas.ctaCopied)}
              className="text-[11px] font-bold text-purple-700 dark:text-purple-400 hover:underline cursor-pointer"
            >
              {t.common.copy}
            </button>
          </div>
          <p className="mt-1.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-zinc-200">
            "{cta}"
          </p>
        </div>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {idea.tags.map((tag, i) => (
            <span key={i} className="rounded-md bg-slate-100 dark:bg-zinc-900 px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-zinc-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl bg-purple-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-purple-500 transition-all cursor-pointer shadow-md shadow-purple-600/20"
          >
            {t.common.close}
          </button>
        </div>

      </div>
    </div>
  );
};
