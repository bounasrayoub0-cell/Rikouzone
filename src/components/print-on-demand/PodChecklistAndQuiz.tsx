import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Award, 
  RotateCcw, 
  Sparkles, 
  HelpCircle, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  podLaunchChecklist, 
  podComprehensiveQuiz, 
  podSevenDayPlan 
} from '../../data/printOnDemandData';
import { useLanguage } from '../../i18n/LanguageContext';

const POD_CHECKLIST_STORAGE_KEY = 'rikouzone_pod_launch_checklist';

export const PodChecklistAndQuiz: React.FC = () => {
  const { isRTL } = useLanguage();

  // Active view toggle: 'checklist' | 'quiz' | 'plan'
  const [activeSection, setActiveSection] = useState<'checklist' | 'quiz' | 'plan'>('checklist');

  // Checklist state
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(POD_CHECKLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(POD_CHECKLIST_STORAGE_KEY, JSON.stringify(checkedIds));
    } catch (e) {
      console.warn(e);
    }
  }, [checkedIds]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleResetChecklist = () => {
    setCheckedIds([]);
  };

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSelectAnswer = (qId: string, optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const quizScore = Object.keys(selectedAnswers).reduce((acc, qId) => {
    const question = podComprehensiveQuiz.find(q => q.id === qId);
    if (question && selectedAnswers[qId] === question.correctIndex) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const checklistProgress = Math.round((checkedIds.length / podLaunchChecklist.length) * 100);

  return (
    <div className="space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl border border-zinc-800 bg-zinc-950/80 max-w-xl mx-auto">
        <button
          onClick={() => setActiveSection('checklist')}
          className={`flex-1 py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSection === 'checklist'
              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>قائمة فحص الجاهزية (10)</span>
        </button>

        <button
          onClick={() => setActiveSection('quiz')}
          className={`flex-1 py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSection === 'quiz'
              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          <span>اختبار الفهم الشامل (6)</span>
        </button>

        <button
          onClick={() => setActiveSection('plan')}
          className={`flex-1 py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSection === 'plan'
              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>خطة الـ 7 أيام للانطلاق</span>
        </button>
      </div>

      {/* SECTION 1: LAUNCH CHECKLIST */}
      {activeSection === 'checklist' && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400 mb-2">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>تقييم الاستعداد للإطلاق</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                قائمة فحص جاهزية أول منتج (Launch Checklist)
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                لا تضغط على زر النشر النهائي حتى تتأكد من تحقيق هذه المعايير العشرة لضمان جودة الطباعة وسلامة متجرك القانونية.
              </p>
            </div>

            {/* Progress Counter */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-end">
                <div className="text-xs text-zinc-400">نسبة الجاهزية:</div>
                <div className="text-lg font-black font-mono text-emerald-400">
                  {checklistProgress}% ({checkedIds.length}/{podLaunchChecklist.length})
                </div>
              </div>
              {checkedIds.length > 0 && (
                <button
                  onClick={handleResetChecklist}
                  className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700 cursor-pointer"
                  title="إعادة تعيين القائمة"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-zinc-900 border border-zinc-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full"
              style={{ width: `${checklistProgress}%` }}
            />
          </div>

          {/* Items List */}
          <div className="mt-6 space-y-3">
            {podLaunchChecklist.map((item, index) => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'border-emerald-500/40 bg-emerald-500/10'
                      : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70'
                  }`}
                >
                  <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all ${
                    isChecked
                      ? 'border-emerald-500 bg-emerald-500 text-black'
                      : 'border-zinc-700 bg-zinc-900 text-transparent'
                  }`}>
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800/70 px-2 py-0.5 rounded">
                        #{index + 1} · {item.category}
                      </span>
                    </div>
                    <div className={`mt-1 text-sm font-bold ${
                      isChecked ? 'text-white line-through opacity-80' : 'text-zinc-100'
                    }`}>
                      {item.title}
                    </div>
                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {checklistProgress === 100 && (
            <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 p-4 text-center">
              <Sparkles className="mx-auto h-8 w-8 text-emerald-400 mb-1" />
              <div className="text-base font-black text-white">
                تهانينا! منتجك مستوفٍ لجميع معايير الإطلاق الاحترافية
              </div>
              <p className="text-xs text-emerald-200 mt-1 max-w-md mx-auto">
                أنت الآن جاهز لنشر المنتج ومباشرة خطة التسويق العضوي وجلب أول زوار لمتجرك بثقة تامة.
              </p>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: COMPREHENSIVE QUIZ */}
      {activeSection === 'quiz' && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-bold text-blue-400 mb-2">
                <Award className="h-3.5 w-3.5" />
                <span>اختبار الاستيعاب العملي</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                اختبر فهمك الشامل لأساسيات الطباعة عند الطلب
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                6 أسئلة عملية دقيقة تقيس استيعابك لقوانين التسعير، المواصفات الفنية للتصاميم، وحماية الملكية الفكرية.
              </p>
            </div>

            {isSubmitted && (
              <div className="flex items-center gap-3">
                <div className="text-end">
                  <div className="text-xs text-zinc-400">درجتك النهائية:</div>
                  <div className="text-xl font-black font-mono text-emerald-400">
                    {quizScore} / {podComprehensiveQuiz.length}
                  </div>
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
                  title="إعادة الاختبار"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-6">
            {podComprehensiveQuiz.map((q, qIndex) => {
              const selectedOpt = selectedAnswers[q.id];
              const hasAnswered = selectedOpt !== undefined;

              return (
                <div key={q.id} className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-800 text-xs font-black text-zinc-300 shrink-0">
                      {qIndex + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white leading-relaxed">
                      {q.question}
                    </h4>
                  </div>

                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, optIndex) => {
                      const isChosen = selectedOpt === optIndex;
                      const isCorrect = optIndex === q.correctIndex;

                      let optClass = 'border-zinc-800 bg-zinc-950/50 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60';
                      if (isSubmitted) {
                        if (isCorrect) {
                          optClass = 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200 font-bold';
                        } else if (isChosen && !isCorrect) {
                          optClass = 'border-rose-500/60 bg-rose-500/15 text-rose-300';
                        }
                      } else if (isChosen) {
                        optClass = 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-bold shadow-sm';
                      }

                      return (
                        <button
                          key={optIndex}
                          disabled={isSubmitted}
                          onClick={() => handleSelectAnswer(q.id, optIndex)}
                          className={`w-full p-3 rounded-xl border text-start text-xs transition-all cursor-pointer flex items-center justify-between ${optClass}`}
                        >
                          <span>{opt}</span>
                          {isSubmitted && isCorrect && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 ms-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 text-xs text-zinc-400 leading-relaxed">
                      <strong className="text-emerald-400 block mb-1">الشرح والتفسير:</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Action */}
          <div className="mt-8 flex justify-center">
            {!isSubmitted ? (
              <button
                onClick={() => setIsSubmitted(true)}
                disabled={Object.keys(selectedAnswers).length < podComprehensiveQuiz.length}
                className={`px-8 py-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  Object.keys(selectedAnswers).length === podComprehensiveQuiz.length
                    ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 active:scale-95'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}
              >
                {Object.keys(selectedAnswers).length === podComprehensiveQuiz.length
                  ? 'عرض نتيجة الاختبار والتصحيح'
                  : `أجب على جميع الأسئلة أولاً (${Object.keys(selectedAnswers).length}/${podComprehensiveQuiz.length})`}
              </button>
            ) : (
              <button
                onClick={handleResetQuiz}
                className="flex items-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2.5 text-xs font-bold transition-all cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>إعادة الاختبار من جديد</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: 7-DAY ACTION PLAN */}
      {activeSection === 'plan' && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-xl">
          <div className="border-b border-zinc-800/80 pb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400 mb-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>خارطة طريق التطبيق الأسبوعي</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              خطة الـ 7 أيام للانتقال من الصفر إلى إطلاق أول منتج
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
              خطة عمل مركزة ومقسمة على 7 مهام يومية صغيرة وواضحة. التزم بساعتين إلى ثلاث ساعات يومياً لتجد نفسك بنهاية الأسبوع تملك منتجاً منشوراً على الإنترنت وفق أعلى المعايير.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {podSevenDayPlan.map((day) => (
              <div
                key={day.dayNumber}
                className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-5 hover:border-amber-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 font-black font-sans text-base">
                    يوم {day.dayNumber}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white">
                      {day.title}
                    </h4>
                    <p className="mt-1 text-xs text-zinc-300 leading-relaxed max-w-xl">
                      {day.description}
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 px-2.5 py-1 text-[11px] text-amber-300">
                      <span className="font-bold">المخرج المطلوب:</span>
                      <span>{day.actionItem}</span>
                    </div>
                  </div>
                </div>

                <div className="sm:self-center shrink-0 text-start sm:text-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{day.estimatedHours}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
