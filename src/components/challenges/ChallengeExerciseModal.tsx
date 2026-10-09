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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto">
      <div 
        className="relative w-full max-w-xl rounded-3xl border border-zinc-700/80 bg-zinc-950 p-6 sm:p-8 shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 -z-10 h-32 w-64 rounded-full bg-emerald-500/15 blur-2xl" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase text-emerald-400 block tracking-wider">
                التطبيق والتمرين العملي
              </span>
              <h3 className="text-base sm:text-lg font-black text-white line-clamp-1">
                {challenge.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black">
            <Sparkles className="h-3.5 w-3.5" />
            <span>+{challenge.xpReward} XP</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="my-5 space-y-4">
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <span className="text-emerald-400 font-bold block mb-1">تعليمات المهمة:</span>
            <p>{exercise.instructions}</p>
          </div>

          {/* User Input Area */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">
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
              className="w-full rounded-2xl bg-zinc-900/90 border border-zinc-800 p-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Verification Criteria Checkboxes */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-400 block">
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
                        ? 'border-emerald-500/60 bg-emerald-950/20 text-emerald-200'
                        : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 ${
                      checked ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-zinc-700 bg-zinc-950'
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
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-400 flex items-start justify-between gap-3">
              <div>
                <span className="font-bold text-zinc-300 block mb-0.5">نموذج استرشادي:</span>
                <p className="italic text-zinc-400">"{exercise.sampleAnswer}"</p>
              </div>
              <button
                onClick={handleCopySample}
                className="shrink-0 p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                title="نسخ النموذج"
              >
                {copiedSample ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            إلغاء
          </button>

          <button
            onClick={handleComplete}
            disabled={!isInputValid || !allChecksConfirmed}
            className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              isInputValid && allChecksConfirmed
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
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
