import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  FileText,
  Check, 
  Copy 
} from 'lucide-react';
import { ChallengeTask } from '../../data/challengesDataTypes';

interface ChallengeExerciseModalProps {
  challenge: ChallengeTask;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (challengeId: string, earnedXp: number) => void;
  onCopyText: (text: string, label: string) => void;
}

export const ChallengeExerciseModal: React.FC<ChallengeExerciseModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onSuccess,
  onCopyText
}) => {
  const exercise = challenge.exerciseData;
  const [userInput, setUserInput] = useState<string>('');
  const [confirmedChecks, setConfirmedChecks] = useState<boolean[]>([]);
  const [copiedSample, setCopiedSample] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen || !exercise) return null;

  const criteriaCount = exercise.verificationCriteria.length;

  const toggleCheck = (idx: number) => {
    setConfirmedChecks((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const allChecksConfirmed = 
    confirmedChecks.length === criteriaCount && 
    confirmedChecks.every(Boolean);

  const isInputValid = userInput.trim().length >= 15;

  const handleComplete = () => {
    if (!isInputValid) {
      setErrorMsg('يرجى كتابة نص تطبيقي لا يقل عن 15 حرفاً للتحقق من الجدية.');
      return;
    }
    if (!allChecksConfirmed) {
      setErrorMsg('يرجى التحقق من جميع معايير الجودة والضغط على مربعات التأكيد.');
      return;
    }

    onSuccess(challenge.id, challenge.xpReward);
    onClose();
  };

  const handleCopySample = () => {
    if (exercise.sampleAnswer) {
      onCopyText(exercise.sampleAnswer, 'تم نسخ النموذج الاسترشادي');
      setCopiedSample(true);
      setTimeout(() => setCopiedSample(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto">
      <div 
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-zinc-800/90 bg-white dark:bg-[#0c0e15] text-slate-900 dark:text-zinc-100 p-5 sm:p-7 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 -z-10 h-32 w-64 rounded-full bg-blue-500/10 blur-2xl" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/15 text-[#2563EB] dark:text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-500/10">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase text-[#2563EB] dark:text-blue-400 block tracking-wider">
                التطبيق والتمرين العملي
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white line-clamp-1">
                {challenge.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-[#2563EB] dark:text-blue-300 text-xs font-black shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>+{challenge.xpReward} XP</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="my-5 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12141d]/80 border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
            <span className="text-[#2563EB] dark:text-blue-400 font-bold block mb-1">تعليمات المهمة:</span>
            <p>{exercise.instructions}</p>
          </div>

          {/* User Input Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
              مساحة كتابة أو لصق تطبيقك العملي:
            </label>
            <textarea
              rows={3}
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder="اكتب هنا ما طبقته للتحقق والحصول على نقاط الـ XP..."
              className="w-full rounded-2xl bg-white dark:bg-[#10121a] border border-slate-300 dark:border-zinc-800 p-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] shadow-sm dark:shadow-none transition-colors"
            />
          </div>

          {/* Verification Criteria Checkboxes */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-600 dark:text-zinc-400 block">
              معايير التحقق والتأكيد الذاتي (ضع علامة صح بعد مراجعتها):
            </span>
            <div className="space-y-2">
              {exercise.verificationCriteria.map((crit, idx) => {
                const checked = !!confirmedChecks[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCheck(idx)}
                    className={`w-full text-right p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center gap-3 ${
                      checked
                        ? 'border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200 font-medium'
                        : 'border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#12141c]/50 text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 ${
                      checked ? 'bg-emerald-500 border-emerald-500 text-white font-bold' : 'border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-950'
                    }`}>
                      {checked && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                    <span className="leading-relaxed">{crit}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sample Answer if provided */}
          {exercise.sampleAnswer && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#10121a] border border-slate-200 dark:border-zinc-800/80 text-xs text-slate-600 dark:text-zinc-400 flex items-start justify-between gap-3">
              <div>
                <span className="font-bold text-slate-800 dark:text-zinc-300 block mb-0.5">نموذج استرشادي:</span>
                <p className="italic text-slate-600 dark:text-zinc-400">"{exercise.sampleAnswer}"</p>
              </div>
              <button
                onClick={handleCopySample}
                className="shrink-0 p-1.5 rounded-lg bg-slate-200 dark:bg-[#181a26] hover:bg-slate-300 dark:hover:bg-[#202334] border border-slate-300 dark:border-zinc-700/60 text-slate-700 dark:text-zinc-300 transition-colors cursor-pointer"
                title="نسخ النموذج"
              >
                {copiedSample ? <Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-[#180d0d]/80 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-zinc-800/80">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            إلغاء
          </button>

          <button
            onClick={handleComplete}
            disabled={!isInputValid || !allChecksConfirmed}
            className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              isInputValid && allChecksConfirmed
                ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-md shadow-blue-500/25 border border-blue-400/30'
                : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>تأكيد الإنجاز والحصول على {challenge.xpReward} XP</span>
          </button>
        </div>
      </div>
    </div>
  );
};
