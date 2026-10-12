import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  getTrackLockDetails, 
  lockedTracksI18n, 
  LOCKED_TRACKS_RULES 
} from '../../utils/lockedTracks';
import { 
  Lock, 
  Trophy, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Home, 
  Compass, 
  Info,
  ShieldCheck
} from 'lucide-react';

import { incomePaths } from '../../data/incomePaths';

interface LockedTrackAccessGuardProps {
  trackId: string;
  currentXp: number;
  onNavigate: (tab: string) => void;
}

export const LockedTrackAccessGuard: React.FC<LockedTrackAccessGuardProps> = ({
  trackId,
  currentXp,
  onNavigate
}) => {
  const { language, isRTL, localizePath } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const rule = LOCKED_TRACKS_RULES[trackId];
  const lockDetails = getTrackLockDetails(trackId, currentXp);
  const tLock = lockedTracksI18n[language] || lockedTracksI18n.ar;

  const requiredXp = rule ? rule.requiredXp : 1000;
  const remainingXp = lockDetails ? lockDetails.remainingXp : Math.max(0, requiredXp - currentXp);
  const progressPercent = lockDetails ? lockDetails.progressPercent : 0;
  const pathObj = incomePaths.find(p => p.id === trackId);
  const trackName = pathObj ? localizePath(pathObj).title : (language === 'ar' || language === 'ary' ? (rule?.arabicName || trackId) : (rule?.englishName || trackId));

  const formattedDesc = tLock.directBlockedDesc
    .replace('{req}', `${requiredXp}`)
    .replace('{curr}', `${currentXp}`)
    .replace('{rem}', `${remainingXp}`);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 text-zinc-100 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 end-0 -mt-16 -me-16 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-0 -mb-16 -ms-16 w-56 h-56 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Big Lock Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500/15 border border-amber-500/40 text-amber-400 shadow-xl shadow-amber-500/10 mb-4">
          <Lock className="h-10 w-10 stroke-[2.2]" />
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{tLock.modalBadge}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {tLock.directBlockedTitle}
        </h1>

        <div className="mt-2 text-base font-bold text-amber-400">
          {trackName}
        </div>

        <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl mx-auto">
          {formattedDesc}
        </p>

        {/* XP Details Cards */}
        <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg mx-auto">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3.5">
            <div className="text-xs text-zinc-400 font-semibold">{tLock.requiredXpLabel}</div>
            <div className="mt-1 text-lg sm:text-xl font-black text-amber-400 font-sans">
              {requiredXp} <span className="text-xs font-normal text-zinc-400">XP</span>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3.5">
            <div className="text-xs text-zinc-400 font-semibold">{tLock.currentXpLabel}</div>
            <div className="mt-1 text-lg sm:text-xl font-black text-white font-sans">
              {currentXp} <span className="text-xs font-normal text-zinc-400">XP</span>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5">
            <div className="text-xs text-amber-300 font-bold">{tLock.remainingXpLabel}</div>
            <div className="mt-1 text-lg sm:text-xl font-black text-amber-300 font-sans">
              {remainingXp} <span className="text-xs font-normal text-amber-400">XP</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 max-w-lg mx-auto rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-zinc-300">{tLock.progressLabel}</span>
            <span className="font-bold font-mono text-amber-400">
              {progressPercent}% ({currentXp} / {requiredXp} XP)
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-900 border border-zinc-800">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 transition-all duration-500 rounded-full"
              style={{ width: `${Math.max(4, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Note */}
        <div className="mt-5 max-w-lg mx-auto rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 flex items-start gap-2 text-xs text-amber-200/90 text-start">
          <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {tLock.noDeductionNote}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
          <button
            onClick={() => onNavigate('challenges')}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 py-3 text-xs sm:text-sm font-black text-black shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Trophy className="h-4 w-4" />
            <span>{tLock.goToChallengesBtn}</span>
            <ArrowIcon className="h-4 w-4" />
          </button>

          <button
            onClick={() => onNavigate('income')}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-xs sm:text-sm font-bold text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Compass className="h-4 w-4 text-amber-400" />
            <span>{tLock.browseOtherPathsBtn}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
