import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  HelpCircle, 
  Calendar, 
  Sparkles, 
  RotateCcw, 
  Award, 
  ShieldCheck, 
  AlertTriangle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check,
  X
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  dropshippingSevenDayPlan, 
  dropshippingLaunchChecklist, 
  dropshippingComprehensiveQuiz 
} from '../../data/dropshippingData';

const DS_CHECKLIST_KEY = 'rikouzone_ds_checklist_state';
const DS_DAYS_KEY = 'rikouzone_ds_completed_days';

export const DropshippingChecklistAndQuiz: React.FC = () => {
  const { isRTL } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'checklist' | 'plan' | 'quiz'>('checklist');

  // Checklist state
  const [checkedItems, setCheckedItems] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(DS_CHECKLIST_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 7-day plan completed days
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(DS_DAYS_KEY);
      return stored ? JSON.parse(stored) : [1];
    } catch {
      return [1];
    }
  });

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(DS_CHECKLIST_KEY, JSON.stringify(checkedItems));
    } catch (e) {
      console.error(e);
    }
  }, [checkedItems]);

  useEffect(() => {
    try {
      localStorage.setItem(DS_DAYS_KEY, JSON.stringify(completedDays));
    } catch (e) {
      console.error(e);
    }
  }, [completedDays]);

  const toggleChecklistItem = (id: string) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleDay = (dayNum: number) => {
    setCompletedDays(prev => 
      prev.includes(dayNum) ? prev.filter(d => d !== dayNum) : [...prev, dayNum]
    );
  };

  const handleSelectQuizAnswer = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    dropshippingComprehensiveQuiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const checklistProgress = Math.round((checkedItems.length / dropshippingLaunchChecklist.length) * 100);
  const daysProgress = Math.round((completedDays.length / dropshippingSevenDayPlan.length) * 100);
  const quizScore = calculateQuizScore();
  const quizTotal = dropshippingComprehensiveQuiz.length;

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>أدوات التحقق والتنفيذ العملي</span>
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-black text-white">
              قائمة الفحص قبل الإطلاق، خطة الـ 7 أيام، والاختبار الشامل
            </h3>
            <p className="mt-1 text-sm text-zinc-400 max-w-2xl">
              تأكد من جاهزية متجرك قبل إنفاق أي دولار، وتابع خطتك الأسبوعية خطوة بخطوة، واختبر استيعابك للمفاهيم الأساسية.
            </p>
          </div>

          {/* Sub-tabs switcher */}
          <div className="inline-flex p-1 rounded-xl bg-zinc-850 border border-zinc-800">
            <button
              onClick={() => setActiveSubTab('checklist')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeSubTab === 'checklist'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>قائمة الفحص ({checkedItems.length}/{dropshippingLaunchChecklist.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('plan')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeSubTab === 'plan'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>خطة الـ 7 أيام ({completedDays.length}/7)</span>
            </button>
            <button
              onClick={() => setActiveSubTab('quiz')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeSubTab === 'quiz'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>الاختبار النهائي</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Tab 1: Checklist */}
      {activeSubTab === 'checklist' && (
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-zinc-400">معدل جاهزية المتجر للإطلاق (Launch Readiness):</span>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-white">{checklistProgress}%</span>
                <span className="text-xs text-zinc-400">({checkedItems.length} من أصل {dropshippingLaunchChecklist.length} بنود مكتملة)</span>
              </div>
            </div>

            <div className="w-full sm:w-64">
              <div className="h-2.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                  style={{ width: `${checklistProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Checklist Items Grouped */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dropshippingLaunchChecklist.map((item) => {
              const isDone = checkedItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`rounded-2xl border p-4 cursor-pointer transition flex items-start gap-3.5 ${
                    isDone 
                      ? 'border-emerald-500/40 bg-emerald-950/20' 
                      : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <Circle className="h-5 w-5 text-zinc-600" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-zinc-800 border border-zinc-700/80 px-2 py-0.5 text-[10px] font-bold text-zinc-300">
                        {item.category}
                      </span>
                    </div>
                    <h4 className={`text-sm font-bold ${isDone ? 'text-emerald-200 line-through' : 'text-white'}`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-Tab 2: 7-Day Plan */}
      {activeSubTab === 'plan' && (
        <div className="space-y-6">
          {/* Progress Banner */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-zinc-400">إنجاز خطة الـ 7 أيام:</span>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-white">{daysProgress}%</span>
                <span className="text-xs text-zinc-400">({completedDays.length} من أصل 7 أيام مكتملة)</span>
              </div>
            </div>

            <div className="w-full sm:w-64">
              <div className="h-2.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                  style={{ width: `${daysProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Days Roadmap */}
          <div className="space-y-4">
            {dropshippingSevenDayPlan.map((day) => {
              const isDone = completedDays.includes(day.dayNumber);
              return (
                <div
                  key={day.dayNumber}
                  className={`rounded-2xl border p-5 transition ${
                    isDone 
                      ? 'border-blue-500/40 bg-blue-950/20' 
                      : 'border-zinc-800 bg-zinc-900/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-xl font-black flex items-center justify-center text-sm ${
                        isDone ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {day.dayNumber}
                      </div>
                      <h4 className="text-base font-bold text-white">{day.title}</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-zinc-500" />
                        {day.estimatedHours}
                      </span>
                      <button
                        onClick={() => toggleDay(day.dayNumber)}
                        className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                          isDone 
                            ? 'border-blue-500/40 bg-blue-500/20 text-blue-300' 
                            : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                        }`}
                      >
                        {isDone ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-blue-400" />
                            <span>مكتمل ✓</span>
                          </>
                        ) : (
                          <span>تحديد كمكتمل</span>
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-zinc-300 leading-relaxed">
                    {day.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-zinc-800/60 flex items-center gap-2 text-xs text-blue-300">
                    <span className="font-bold text-white">المخرَج العملي (Deliverable):</span>
                    <span>{day.actionItem}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Comprehensive Quiz */}
      {activeSubTab === 'quiz' && (
        <div className="space-y-6">
          {/* Quiz Header Score */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-white">اختبار التحقق من الفهم الشامل للدروب شيبينغ الحديث</h4>
              <p className="text-xs text-zinc-400 mt-1">6 أسئلة مبنية على سيناريوهات ومواقف واقعية يواجهها أصحاب المتاجر.</p>
            </div>

            {quizSubmitted ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-zinc-405 font-bold">النتيجة النهائية:</div>
                  <div className={`text-2xl font-black ${
                    quizScore >= 5 ? 'text-emerald-400' : quizScore >= 3 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {quizScore} من {quizTotal} ({Math.round((quizScore / quizTotal) * 100)}%)
                  </div>
                </div>
                <button
                  onClick={resetQuiz}
                  className="rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-3 py-2 text-xs font-bold text-zinc-200 transition"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < quizTotal}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition shadow-lg ${
                  Object.keys(quizAnswers).length >= quizTotal
                    ? 'bg-purple-600 text-white shadow-purple-500/20 hover:bg-purple-500'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}
              >
                تصحيح الاختبار وعرض النتيجة
              </button>
            )}
          </div>

          {/* Quiz Questions */}
          <div className="space-y-5">
            {dropshippingComprehensiveQuiz.map((q, idx) => {
              const selectedIdx = quizAnswers[q.id];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = selectedIdx === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="h-6 w-6 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-black text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white leading-relaxed">
                      {q.question}
                    </h4>
                  </div>

                  <div className="space-y-2 pr-9">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedIdx === optIdx;
                      let optionClasses = 'border-zinc-800 bg-zinc-850/60 text-zinc-300 hover:bg-zinc-800';

                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optionClasses = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300 font-bold';
                        } else if (isOptionSelected && !isCorrect) {
                          optionClasses = 'border-rose-500/60 bg-rose-950/40 text-rose-300 font-bold';
                        } else {
                          optionClasses = 'border-zinc-800/40 bg-zinc-900/20 text-zinc-500';
                        }
                      } else if (isOptionSelected) {
                        optionClasses = 'border-purple-500 bg-purple-500/20 text-white font-bold';
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectQuizAnswer(q.id, optIdx)}
                          className={`rounded-xl border p-3 cursor-pointer text-xs transition flex items-center justify-between ${optionClasses}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && optIdx === q.correctIndex && (
                            <Check className="h-4 w-4 text-emerald-400 shrink-0 mr-2" />
                          )}
                          {quizSubmitted && isOptionSelected && !isCorrect && (
                            <X className="h-4 w-4 text-rose-400 shrink-0 mr-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="pr-9 pt-3 border-t border-zinc-800 text-xs">
                      <div className="rounded-xl border border-zinc-800 bg-zinc-850 p-3 text-zinc-300 leading-relaxed">
                        <strong className="text-emerald-400 block mb-1">الشرح والتفسير:</strong>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
