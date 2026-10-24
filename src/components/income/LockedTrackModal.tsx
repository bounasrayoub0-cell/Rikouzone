import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { IncomePath } from '../../types';
import { 
  getTrackLockDetails, 
  lockedTracksI18n, 
  LOCKED_TRACKS_RULES 
} from '../../utils/lockedTracks';
import { 
  X, 
  Lock, 
  Sparkles, 
  Trophy, 
  ArrowRight, 
  ArrowLeft, 
  Flame, 
  CheckCircle2, 
  Info,
  ShieldCheck
} from 'lucide-react';

interface LockedTrackModalProps {
  path: IncomePath | null;
  currentXp: number;
  onClose: () => void;
  onNavigateToChallenges: () => void;
}

export const LockedTrackModal: React.FC<LockedTrackModalProps> = ({
  path,
  currentXp,
  onClose,
  onNavigateToChallenges
}) => {
  const { language, isRTL, localizePath } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  if (!path) return null;

  const lockRule = LOCKED_TRACKS_RULES[path.id];
  if (!lockRule) return null;

  const lockDetails = getTrackLockDetails(path.id, currentXp);
  if (!lockDetails) return null;

  const tLock = lockedTracksI18n[language] || lockedTracksI18n.ar;
  const { title, category } = localizePath(path);

  const formattedDesc = tLock.modalDesc.replace('{req}', `${lockDetails.requiredXp}`);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      dir={isRTL ? 'rtl' : 'ltr'}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-amber-400/50 dark:border-amber-500/40 bg-white dark:bg-gradient-to-b dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-950 p-6 sm:p-8 shadow-2xl shadow-slate-900/10 dark:shadow-amber-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 end-0 -mt-12 -me-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-0 -mb-12 -ms-12 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-xl text-slate-400 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
          aria-label={tLock.closeBtn}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Icon & Status */}
        <div className="flex flex-col items-center text-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-500 dark:text-amber-400 shadow-lg shadow-amber-500/10 mb-3">
            <Lock className="h-8 w-8 stroke-[2.2]" />
            <span className="absolute -top-1 -end-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-black text-black">
              !
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-700 dark:text-amber-300 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{tLock.modalBadge}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {tLock.modalTitle}
          </h3>

          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{title}</span>
            <span className="text-xs text-slate-400 dark:text-zinc-500">·</span>
            <span className="text-xs text-slate-600 dark:text-zinc-400">{category}</span>
          </div>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed max-w-md">
            {formattedDesc}
          </p>
        </div>

        {/* XP Status Cards */}
        <div className="mt-6 grid grid-cols-3 gap-2.5 text-center">
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/80 p-3 shadow-sm dark:shadow-none">
            <div className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-zinc-400">{tLock.requiredXpLabel}</div>
            <div className="mt-1 text-base sm:text-lg font-black text-amber-600 dark:text-amber-400 font-sans">
              {lockDetails.requiredXp} <span className="text-xs font-normal text-slate-400 dark:text-zinc-400">XP</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/80 p-3 shadow-sm dark:shadow-none">
            <div className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-zinc-400">{tLock.currentXpLabel}</div>
            <div className="mt-1 text-base sm:text-lg font-black text-slate-900 dark:text-white font-sans">
              {lockDetails.currentXp} <span className="text-xs font-normal text-slate-400 dark:text-zinc-400">XP</span>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-400/40 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-3 shadow-sm dark:shadow-none">
            <div className="text-[10px] sm:text-xs font-bold text-amber-800 dark:text-amber-300">{tLock.remainingXpLabel}</div>
            <div className="mt-1 text-base sm:text-lg font-black text-amber-600 dark:text-amber-300 font-sans">
              {lockDetails.remainingXp} <span className="text-xs font-normal text-amber-600 dark:text-amber-400">XP</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-950/70 p-4 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-700 dark:text-zinc-300">{tLock.progressLabel}</span>
            <span className="font-bold font-mono text-amber-600 dark:text-amber-400">
              {lockDetails.progressPercent}% ({lockDetails.currentXp} / {lockDetails.requiredXp} XP)
            </span>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 transition-all duration-500 rounded-full"
              style={{ width: `${Math.max(4, lockDetails.progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Clarification Note: No XP is deducted */}
        <div className="mt-4 rounded-xl border border-amber-300/40 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/5 p-3 flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200/90">
          <Info className="h-4 w-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {tLock.noDeductionNote}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onNavigateToChallenges();
            }}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 py-3 text-xs sm:text-sm font-black text-black shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Trophy className="h-4 w-4" />
            <span>{tLock.goToChallengesBtn}</span>
            <ArrowIcon className="h-4 w-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 dark:border-zinc-800 dark:hover:border-zinc-700 text-xs sm:text-sm font-bold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
          >
            {tLock.closeBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
