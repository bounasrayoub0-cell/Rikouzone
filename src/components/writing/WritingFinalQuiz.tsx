import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  Sparkles, 
  HelpCircle, 
  ArrowLeft,
  Check
} from 'lucide-react';
import { writingFinalQuizQuestions } from '../../data/freelanceWritingData';

interface WritingFinalQuizProps {
  onOpenCertificate: () => void;
}

export const WritingFinalQuiz: React.FC<WritingFinalQuizProps> = ({ onOpenCertificate }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    writingFinalQuizQuestions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected !== undefined && q.options[selected]?.correct) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const total = writingFinalQuizQuestions.length;
  const isPassed = submitted && score >= 4;

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <HelpCircle className="h-4 w-4" />
            <span>الاختبار النهائي للمسار (Practical Final Quiz)</span>
          </div>
          <h3 className="mt-1 text-2xl font-black text-white">
            اختبر جاهزيتك لسوق العمل الحر وافتح شهادة الإنجاز المعتمدة
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            أجب عن الأسئلة الخمسة العملية لتتأكد من استيعابك للمفاهيم الصحيحة في التعامل مع العملاء والأمانة المهنية.
          </p>
        </div>

        {submitted && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-700 transition-colors shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>إعادة الاختبار</span>
          </button>
        )}
      </div>

      {/* Quiz Questions */}
      <div className="space-y-6">
        {writingFinalQuizQuestions.map((q, qIndex) => {
          const selected = selectedAnswers[q.id];
          const hasAnswered = selected !== undefined;

          return (
            <div
              key={q.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs font-black border border-amber-500/20">
                  {qIndex + 1}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {q.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1 mr-9">
                {q.options.map((opt, optIndex) => {
                  const isSelected = selected === optIndex;
                  const isCorrect = opt.correct;

                  let borderClass = 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700';
                  if (submitted) {
                    if (isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold';
                    } else if (isSelected && !isCorrect) {
                      borderClass = 'border-rose-500 bg-rose-500/10 text-rose-300 line-through';
                    }
                  } else if (isSelected) {
                    borderClass = 'border-amber-500 bg-amber-500/15 text-white font-bold';
                  }

                  return (
                    <button
                      key={optIndex}
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIndex)}
                      className={`w-full text-right p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-center justify-between ${borderClass}`}
                    >
                      <span>{opt.text}</span>
                      {submitted && isCorrect && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mr-2" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle className="h-4 w-4 text-rose-400 shrink-0 mr-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon submit */}
              {submitted && (
                <div className="mr-9 rounded-xl bg-zinc-900 border border-zinc-800/80 p-3.5 text-xs text-zinc-300 leading-relaxed space-y-1">
                  <span className="font-bold text-amber-400 block">التفسير العملي:</span>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit / Score Action Box */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {!submitted ? (
          <>
            <div className="text-xs text-zinc-400">
              تمت الإجابة عن {Object.keys(selectedAnswers).length} من أصل {total} أسئلة
            </div>
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(selectedAnswers).length < total}
              className={`rounded-xl px-6 py-2.5 text-xs font-black transition-all ${
                Object.keys(selectedAnswers).length === total
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              تصحيح الاختبار وعرض النتيجة
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-black font-sans ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                {score} / {total}
              </span>
              <div>
                <div className={`text-xs font-bold ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isPassed ? 'تهانينا! لقد اجتزت الاختبار بنجاح مبهر 🌟' : 'نتيجة جيدة، لكنك تحتاج إلى 4/5 على الأقل لاجتياز الاختبار.'}
                </div>
                <div className="text-[11px] text-zinc-400">
                  {isPassed ? 'أنت الآن جاهز تماماً للخروج لسوق العمل الحر وبدء مراسلة العملاء.' : 'راجع التفسيرات أعلاه وأعد المحاولة مرة أخرى.'}
                </div>
              </div>
            </div>

            {isPassed && (
              <button
                onClick={onOpenCertificate}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-xs font-black text-black shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-orange-400 transition-all shrink-0"
              >
                <Award className="h-4 w-4" />
                <span>عرض شهادة الإنجاز الرقمية</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
