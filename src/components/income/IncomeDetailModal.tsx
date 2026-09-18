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
  Monitor
} from 'lucide-react';

interface IncomeDetailModalProps {
  path: IncomePath | null;
  onClose: () => void;
  onToggleSave: (id: string) => void;
  isSaved: boolean;
  onCopyText: (text: string, label: string) => void;
}

export const IncomeDetailModal: React.FC<IncomeDetailModalProps> = ({
  path,
  onClose,
  onToggleSave,
  isSaved,
  onCopyText
}) => {
  const { language, isRTL } = useLanguage();

  if (!path) return null;

  const title = language === 'ar' ? path.arabicTitle : language === 'fr' ? path.frenchTitle : path.title;
  const desc = language === 'ar' 
    ? (path.arabicFullDescription || path.arabicShortDescription) 
    : language === 'fr' 
    ? (path.frenchFullDescription || path.frenchShortDescription) 
    : (path.fullDescription || path.shortDescription);

  const timeLabel = isRTL ? path.arabicTimeToFirstIncome : path.timeToFirstIncome;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-3xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent Glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 -z-10 h-40 w-80 rounded-full bg-amber-500/20 blur-3xl" />

        {/* Top Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
                {path.category}
              </span>
              <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                path.difficulty === 'beginner' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : path.difficulty === 'intermediate'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {path.difficulty === 'beginner' ? (isRTL ? 'مناسب للمبتدئين' : 'Beginner Friendly') : path.difficulty}
              </span>
              {path.facelessPossible && (
                <span className="rounded-lg bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400 border border-blue-500/20">
                  {isRTL ? 'بدون إظهار الوجه' : 'Faceless Possible'}
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
                  ? 'border-amber-500/50 bg-amber-500/20 text-amber-400' 
                  : 'border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white'
              }`}
              title={isRTL ? 'حفظ المسار' : 'Bookmark'}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2.5 text-zinc-400 hover:border-zinc-700 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="mt-5 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
          {desc}
        </p>

        {/* 3-Pillar Financial Metrics Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <DollarSign className="h-4 w-4 text-amber-400" />
              <span>{isRTL ? 'الدخل الشهري المتوقع' : 'Potential Monthly Income'}</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-black text-amber-300">
              {path.estimatedIncomeRange}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <Clock className="h-4 w-4 text-orange-400" />
              <span>{isRTL ? 'وقت تحقيق أول دولار' : 'Time to First Income'}</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-zinc-100">
              {timeLabel}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>{isRTL ? 'تكلفة البدء المطلوبة' : 'Startup Capital'}</span>
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
              <Layers className="h-4 w-4 text-amber-400" />
              <span>{isRTL ? 'خريطة العمل خطوة بخطوة:' : 'Step-by-Step Action Plan:'}</span>
            </h3>

            <div className="mt-3 space-y-2.5">
              {path.stepByStep.map((step) => (
                <div 
                  key={step.stepNumber}
                  className="flex items-start gap-3.5 rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-3.5"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-xs font-black text-amber-400">
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
              <span>{isRTL ? 'المهارات الأساسية للنجاح' : 'Required Skills'}</span>
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
              <span>{isRTL ? 'الأدوات والمنصات الموصى بها' : 'Tools & Platforms'}</span>
            </h4>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {[...path.tools, ...path.platforms].map((t, idx) => (
                <span key={idx} className="rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300 border border-amber-500/20">
                  {t}
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
              <span>{isRTL ? 'المميزات الرئيسية' : 'Advantages'}</span>
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
              <span>{isRTL ? 'التحديات والعيوب' : 'Challenges'}</span>
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
            <span>{isRTL ? 'تنبيه واقعي صريح (بدون تزييف):' : 'Realistic Reality Check:'}</span>
          </div>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
            {path.realisticWarning}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
          <button
            onClick={() => onCopyText(`${title}\n${path.estimatedIncomeRange}\n${desc}`, isRTL ? 'تم نسخ ملخص المسار!' : 'Summary copied!')}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline"
          >
            <Copy className="h-4 w-4" />
            <span>{isRTL ? 'نسخ ملخص المسار' : 'Copy Summary'}</span>
          </button>

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
