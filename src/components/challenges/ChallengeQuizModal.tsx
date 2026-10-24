import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Award,
  AlertCircle 
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ChallengeTask } from '../../data/challengesDataTypes';

interface ChallengeQuizModalProps {
  challenge: ChallengeTask;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (challengeId: string, earnedXp: number) => void;
}

export const ChallengeQuizModal: React.FC<ChallengeQuizModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { isRTL } = useLanguage();
  const quiz = challenge.quizData;

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  if (!isOpen || !quiz) return null;

  const isCorrect = selectedOption === quiz.correctIndex;

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
  };

  const handleClaimReward = () => {
    if (isCorrect) {
      onSuccess(challenge.id, challenge.xpReward);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto">
      <div 
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-zinc-800/90 bg-white dark:bg-[#0c0e15] text-slate-900 dark:text-zinc-100 p-5 sm:p-7 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 -z-10 h-32 w-64 rounded-full bg-amber-500/10 blur-2xl" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500 dark:text-amber-400 border border-amber-500/30 shadow-sm shadow-amber-500/10">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase text-amber-600 dark:text-amber-400 block tracking-wider">
                اختبار التحقق من الفهم
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white line-clamp-1">
                {challenge.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 dark:bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black shadow-sm shadow-amber-500/10">
            <Sparkles className="h-3.5 w-3.5" />
            <span>+{challenge.xpReward} XP</span>
          </div>
        </div>

        {/* Question */}
        <div className="my-6">
          <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100 leading-relaxed">
            {quiz.question}
          </p>

          <div className="mt-5 space-y-2.5">
            {quiz.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = 'border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#12141d]/70 text-slate-700 dark:text-zinc-300 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-100 dark:hover:bg-[#161825]';

              if (isSelected && !isAnswerSubmitted) {
                btnStyle = 'border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-900 dark:text-white font-bold ring-1 ring-orange-500/40 shadow-sm shadow-orange-500/15';
              }

              if (isAnswerSubmitted) {
                if (idx === quiz.correctIndex) {
                  btnStyle = 'border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-red-500/60 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-200 font-bold';
                } else {
                  btnStyle = 'border-slate-200 dark:border-zinc-800/60 bg-slate-100/50 dark:bg-[#10121a]/30 text-slate-400 dark:text-zinc-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => !isAnswerSubmitted && setSelectedOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-right p-3.5 rounded-2xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span className="leading-relaxed">{option}</span>
                  {isAnswerSubmitted && idx === quiz.correctIndex && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation when submitted */}
        {isAnswerSubmitted && (
          <div className={`p-4 rounded-2xl border text-xs sm:text-sm mb-6 ${
            isCorrect 
              ? 'bg-[#0a1410]/80 border-emerald-500/40 text-emerald-300' 
              : 'bg-[#180d0d]/80 border-red-500/40 text-red-300'
          }`}>
            <div className="flex items-center gap-2 font-black mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>إجابة صحيحة وممتازة! 🎉</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <span>إجابة غير دقيقة! حاول مجدداً بعد مراجعة المفهوم.</span>
                </>
              )}
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed mt-1">
              {quiz.explanation}
            </p>
          </div>
        )}

        {/* Actions Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            إلغاء
          </button>

          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                selectedOption !== null
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-md shadow-orange-500/25 border border-orange-400/30'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              تأكيد الإجابة
            </button>
          ) : isCorrect ? (
            <button
              onClick={handleClaimReward}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-black text-xs shadow-lg shadow-emerald-500/25 border border-emerald-400/30 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="h-4 w-4" />
              <span>استلام {challenge.xpReward} XP وإنهاء التحدي</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedOption(null);
                setIsAnswerSubmitted(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#141620] dark:hover:bg-[#1a1d2b] border border-slate-300 dark:border-zinc-700/60 text-slate-800 dark:text-zinc-200 font-black text-xs cursor-pointer transition-colors"
            >
              إعادة المحاولة
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
