import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  Lightbulb,
  Award
} from 'lucide-react';
import { RikouLessonQuiz as QuizType } from '../../types/lessonTypes';
import { 
  isLessonQuizPassed, 
  recordLessonQuizPass 
} from '../../utils/lessonProgressStorage';

interface RikouLessonQuizProps {
  quiz: QuizType;
  trackId: string;
  lessonId: string;
  lessonTitle: string;
  onXpEarned?: (amount: number) => void;
}

export const RikouLessonQuiz: React.FC<RikouLessonQuizProps> = ({
  quiz,
  trackId,
  lessonId,
  lessonTitle,
  onXpEarned
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [alreadyPassed, setAlreadyPassed] = useState<boolean>(() => isLessonQuizPassed(trackId, lessonId));

  const isAnswered = selectedIndex !== null;
  const isCorrect = selectedIndex === quiz.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isAnswered && isCorrect) return; // Already answered correctly
    setSelectedIndex(idx);

    if (idx === quiz.correctIndex && !alreadyPassed) {
      const res = recordLessonQuizPass(trackId, lessonId, lessonTitle, quiz.xpReward);
      if (res.xpAwarded > 0 && onXpEarned) {
        onXpEarned(res.xpAwarded);
      }
      setAlreadyPassed(true);
    }
  };

  const handleReset = () => {
    setSelectedIndex(null);
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-white/95 dark:bg-zinc-900/60 p-5 sm:p-7 shadow-sm dark:shadow-none space-y-4">
      {/* Quiz Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              اختبار الفهم السريع
            </span>
            {alreadyPassed && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>تم اجتيازه بنجاح</span>
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-relaxed">
            {quiz.question}
          </h3>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 font-bold text-xs shrink-0 font-sans">
          <Sparkles className="w-3.5 h-3.5" />
          <span>+{quiz.xpReward} XP</span>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2.5 pt-1">
        {quiz.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isThisCorrect = idx === quiz.correctIndex;

          let btnStyle = 'border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/60 text-slate-800 dark:text-zinc-200 hover:border-amber-500/50 hover:bg-slate-100 dark:hover:bg-zinc-900';

          if (isAnswered) {
            if (isSelected) {
              btnStyle = isThisCorrect
                ? 'border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 font-bold'
                : 'border-rose-500 bg-rose-500/15 text-rose-800 dark:text-rose-200 font-bold';
            } else if (isThisCorrect) {
              btnStyle = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
            } else {
              btnStyle = 'opacity-40 border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-500';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-start p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs sm:text-sm ${btnStyle}`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-black/10 dark:bg-black/50 text-[11px] font-bold font-sans shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-relaxed">{option}</span>
              </div>

              {isAnswered && isSelected && (
                isThisCorrect 
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  : <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Feedback & Explanation */}
      {isAnswered && (
        <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed animate-fade-in ${
          isCorrect
            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200'
            : 'border-rose-500/40 bg-rose-500/10 text-rose-800 dark:text-rose-200'
        }`}>
          <div className="flex items-center justify-between gap-2 mb-2 font-bold">
            <span className="flex items-center gap-1.5">
              {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-rose-500" />}
              <span>{isCorrect ? 'إجابة صحيحة وممتازة!' : 'إجابة غير دقيقة'}</span>
            </span>

            {!isCorrect && (
              <button
                onClick={handleReset}
                className="text-xs px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-700 dark:text-rose-200 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>إعادة المحاولة</span>
              </button>
            )}
          </div>

          <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
            <strong className="text-slate-900 dark:text-white">التفسير العلمي: </strong>
            {quiz.explanation}
          </p>
        </div>
      )}

      {/* Hint Toggle */}
      {!isAnswered && quiz.hint && (
        <div className="pt-1">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showHint ? 'إخفاء التلميح' : 'هل تحتاج تلميحاً؟'}</span>
          </button>

          {showHint && (
            <div className="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
              💡 <strong>تلميح:</strong> {quiz.hint}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
