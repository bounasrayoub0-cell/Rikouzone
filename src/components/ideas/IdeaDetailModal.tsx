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
  const { language, isRTL } = useLanguage();

  if (!idea) return null;

  const title = language === 'ar' ? idea.arabicTitle : language === 'fr' ? idea.frenchTitle : idea.title;
  const hook = language === 'ar' ? idea.arabicHook : language === 'fr' ? idea.frenchHook : idea.hook;
  const desc = language === 'ar' ? idea.arabicDescription : language === 'fr' ? idea.frenchDescription : idea.description;
  const script = language === 'ar' ? idea.arabicScriptOutline : idea.scriptOutline;
  const cta = language === 'ar' ? idea.arabicCta : idea.cta;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Accent */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 -z-10 h-40 w-80 rounded-full bg-orange-500/20 blur-3xl" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-lg bg-orange-500/10 px-2.5 py-0.5 text-xs font-bold text-orange-400 border border-orange-500/20">
                {idea.platform}
              </span>
              <span className="rounded-lg bg-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-zinc-300">
                {idea.niche}
              </span>
              {idea.facelessPossibility && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
                  <UserX className="h-3 w-3" />
                  {isRTL ? 'محتوى بدون وجه (Faceless)' : 'Faceless Friendly'}
                </span>
              )}
            </div>

            <h2 className="mt-3 text-xl sm:text-2xl font-black text-white">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleSave(idea.id)}
              className={`rounded-xl p-2.5 border transition-all ${
                isSaved 
                  ? 'border-orange-500/50 bg-orange-500/20 text-orange-400' 
                  : 'border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white'
              }`}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-orange-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2.5 text-zinc-400 hover:border-zinc-700 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Viral Hook Box */}
        <div className="mt-5 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span>{isRTL ? 'الخطاف الافتتاحي (Hook) لمنع التمرير:' : 'High-Retention Opening Hook:'}</span>
            </span>
            <button
              onClick={() => onCopyText(hook, isRTL ? 'تم نسخ الهوك بنجاح!' : 'Hook copied!')}
              className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-2.5 py-1 text-xs font-bold text-black hover:bg-amber-400 transition-all"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>{isRTL ? 'نسخ الهوك' : 'Copy Hook'}</span>
            </button>
          </div>
          <p className="mt-2 text-sm sm:text-base font-bold text-white leading-relaxed italic">
            "{hook}"
          </p>
        </div>

        {/* Description & Duration Stats */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-2.5">
            <span className="text-zinc-500">{isRTL ? 'المدة المقترحة:' : 'Duration:'}</span>
            <div className="font-black text-zinc-200 mt-0.5">{idea.duration}</div>
          </div>
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-2.5">
            <span className="text-zinc-500">{isRTL ? 'إمكانية الانتشار:' : 'Viral Potential:'}</span>
            <div className="font-black text-orange-400 mt-0.5 capitalize">
              {idea.viralPotential === 'explosive' ? (isRTL ? 'متفجرة جداً' : 'Explosive') : (isRTL ? 'عالية' : 'High')}
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-2.5">
            <span className="text-zinc-500">{isRTL ? 'المنافسة:' : 'Competition:'}</span>
            <div className="font-black text-zinc-200 mt-0.5 capitalize">{idea.competition}</div>
          </div>
        </div>

        {/* Step-by-Step Script Structure */}
        <div className="mt-5">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-orange-400" />
            <span>{isRTL ? 'هيكل السيناريو والمونتاج المقترح:' : 'Script Outline & Pacing:'}</span>
          </h3>
          <div className="mt-2.5 space-y-2">
            {script.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-3"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange-500/20 text-xs font-bold text-orange-400">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA (Call to Action) */}
        <div className="mt-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-amber-400" />
              <span>{isRTL ? 'نداء التفاعل النهائي (Call to Action):' : 'Closing CTA Formula:'}</span>
            </h4>
            <button
              onClick={() => onCopyText(cta, isRTL ? 'تم نسخ الـ CTA!' : 'CTA copied!')}
              className="text-[11px] font-bold text-amber-400 hover:underline"
            >
              {isRTL ? 'نسخ' : 'Copy'}
            </button>
          </div>
          <p className="mt-1.5 text-xs sm:text-sm font-semibold text-zinc-200">
            "{cta}"
          </p>
        </div>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {idea.tags.map((tag, i) => (
            <span key={i} className="rounded-md bg-zinc-900 px-2 py-1 text-[11px] font-medium text-zinc-400 border border-zinc-800">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-black hover:bg-amber-400 transition-all"
          >
            {isRTL ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
