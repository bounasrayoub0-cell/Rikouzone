import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  Sliders, 
  HelpCircle,
  Award,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { 
  RikouInteractiveExercise, 
  OrderStepsExerciseData, 
  DecisionScenarioExerciseData, 
  InteractiveBuilderExerciseData 
} from '../../types/lessonTypes';
import { 
  isLessonExerciseCompleted, 
  recordLessonExerciseCompletion 
} from '../../utils/lessonProgressStorage';
import { useLanguage } from '../../i18n/LanguageContext';

interface RikouInteractiveActivityProps {
  exercise: RikouInteractiveExercise;
  trackId: string;
  lessonId: string;
  onXpEarned?: (amount: number) => void;
}

export const RikouInteractiveActivity: React.FC<RikouInteractiveActivityProps> = ({
  exercise,
  trackId,
  lessonId,
  onXpEarned
}) => {
  const { isRTL } = useLanguage();
  const [alreadyCompleted, setAlreadyCompleted] = useState(() => isLessonExerciseCompleted(trackId, lessonId));

  // State for step ordering
  const [orderedItems, setOrderedItems] = useState(() => {
    if (exercise.type === 'order_steps') {
      const data = exercise.data as OrderStepsExerciseData;
      // Provide a deterministic shuffled order
      return [...data.items].sort((a, b) => (b.text.length - a.text.length));
    }
    return [];
  });
  const [orderChecked, setOrderChecked] = useState(false);
  const [isOrderCorrect, setIsOrderCorrect] = useState(false);

  // State for decision scenario
  const [selectedScenarioOption, setSelectedScenarioOption] = useState<string | null>(null);
  const [scenarioSubmitted, setScenarioSubmitted] = useState(false);

  // State for interactive builder
  const [builderValues, setBuilderValues] = useState<Record<string, any>>(() => {
    if (exercise.type === 'interactive_builder') {
      const data = exercise.data as InteractiveBuilderExerciseData;
      const initial: Record<string, any> = {};
      data.fields.forEach(f => {
        initial[f.id] = f.defaultValue;
      });
      return initial;
    }
    return {};
  });
  const [builderSubmitted, setBuilderSubmitted] = useState(false);

  // Handle Order Steps logic
  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (orderChecked && isOrderCorrect) return;
    const newItems = [...orderedItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setOrderedItems(newItems);
    setOrderChecked(false);
  };

  const handleVerifyOrder = () => {
    const isAllCorrect = orderedItems.every((item, idx) => item.correctOrder === idx + 1);
    setOrderChecked(true);
    setIsOrderCorrect(isAllCorrect);

    if (isAllCorrect && !alreadyCompleted) {
      const res = recordLessonExerciseCompletion(trackId, lessonId, exercise.title, exercise.xpReward);
      if (res.xpAwarded > 0 && onXpEarned) {
        onXpEarned(res.xpAwarded);
      }
      setAlreadyCompleted(true);
    }
  };

  // Handle Decision Scenario logic
  const handleSelectScenario = (optionId: string) => {
    if (scenarioSubmitted && alreadyCompleted) return;
    setSelectedScenarioOption(optionId);
    setScenarioSubmitted(true);

    const data = exercise.data as DecisionScenarioExerciseData;
    const opt = data.options.find(o => o.id === optionId);
    if (opt?.isOptimal && !alreadyCompleted) {
      const res = recordLessonExerciseCompletion(trackId, lessonId, exercise.title, exercise.xpReward);
      if (res.xpAwarded > 0 && onXpEarned) {
        onXpEarned(res.xpAwarded);
      }
      setAlreadyCompleted(true);
    }
  };

  // Handle Builder logic
  const calculateBuilderResult = (): number => {
    if (exercise.type !== 'interactive_builder') return 0;
    const data = exercise.data as InteractiveBuilderExerciseData;
    // Simple evaluator supporting product margin and views estimation formulas
    let total = 1;
    data.fields.forEach(f => {
      const val = Number(builderValues[f.id]) || 1;
      total *= val;
    });
    return Math.round(total);
  };

  const handleApplyBuilder = () => {
    setBuilderSubmitted(true);
    if (!alreadyCompleted) {
      const res = recordLessonExerciseCompletion(trackId, lessonId, exercise.title, exercise.xpReward);
      if (res.xpAwarded > 0 && onXpEarned) {
        onXpEarned(res.xpAwarded);
      }
      setAlreadyCompleted(true);
    }
  };

  return (
    <div className="rounded-3xl border border-amber-500/30 bg-slate-900/60 dark:bg-zinc-900/70 p-5 sm:p-7 backdrop-blur-xl space-y-5">
      {/* Exercise Header */}
      <div className="flex items-start justify-between gap-3 border-b border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              تطبيق عملي تفاعلي
            </span>
            {alreadyCompleted && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>تم إنجازه (+{exercise.xpReward} XP)</span>
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            {exercise.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
            {exercise.instruction}
          </p>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs shrink-0 font-sans">
          <Sparkles className="w-3.5 h-3.5" />
          <span>+{exercise.xpReward} XP</span>
        </div>
      </div>

      {/* 1. ORDER STEPS EXERCISE */}
      {exercise.type === 'order_steps' && (
        <div className="space-y-3">
          <p className="text-xs text-amber-300/90 font-medium">
            💡 استخدم أسهم الترتيب لتنظيم الخطوات في التسلسل الصحيح:
          </p>

          <div className="space-y-2">
            {orderedItems.map((item, idx) => {
              const isCorrectPosition = orderChecked && item.correctOrder === idx + 1;
              const isWrongPosition = orderChecked && item.correctOrder !== idx + 1;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isCorrectPosition
                      ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200'
                      : isWrongPosition
                      ? 'border-rose-500/50 bg-rose-500/10 text-rose-200'
                      : 'border-zinc-800 bg-zinc-950/80 text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-black/60 font-black text-xs font-sans text-amber-400 border border-zinc-800 shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold leading-relaxed">
                      {item.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moveItem(idx, 'up')}
                      disabled={idx === 0 || (orderChecked && isOrderCorrect)}
                      className="p-1 rounded-lg bg-zinc-900 border border-zinc-700/80 hover:bg-zinc-800 disabled:opacity-20 text-zinc-300 cursor-pointer"
                      title="تحريك لأعلى"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveItem(idx, 'down')}
                      disabled={idx === orderedItems.length - 1 || (orderChecked && isOrderCorrect)}
                      className="p-1 rounded-lg bg-zinc-900 border border-zinc-700/80 hover:bg-zinc-800 disabled:opacity-20 text-zinc-300 cursor-pointer"
                      title="تحريك لأسفل"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleVerifyOrder}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              التحقق من الترتيب
            </button>

            {orderChecked && (
              <span className={`text-xs font-bold ${isOrderCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isOrderCorrect ? '✅ ترتيب احترافي نموذجي! تم فتح النقاط.' : '❌ هناك خطوات في غير موضعها، حاول تعديلها.'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 2. DECISION SCENARIO EXERCISE */}
      {exercise.type === 'decision_scenario' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 text-xs sm:text-sm text-zinc-200 leading-relaxed">
            <strong className="text-amber-400 block mb-1">السيناريو الواقعي:</strong>
            {(exercise.data as DecisionScenarioExerciseData).scenario}
          </div>

          <p className="text-xs text-zinc-400 font-medium">
            اختر القرار الأنسب وفقاً لدروس المنصة:
          </p>

          <div className="space-y-2.5">
            {(exercise.data as DecisionScenarioExerciseData).options.map((option) => {
              const isSelected = selectedScenarioOption === option.id;
              return (
                <div key={option.id} className="space-y-2">
                  <button
                    onClick={() => handleSelectScenario(option.id)}
                    className={`w-full text-start p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold ${
                      isSelected
                        ? option.isOptimal
                          ? 'border-emerald-500 bg-emerald-500/15 text-emerald-200'
                          : 'border-rose-500 bg-rose-500/15 text-rose-200'
                        : 'border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-300'
                    }`}
                  >
                    <span>{option.text}</span>
                    {isSelected && (
                      option.isOptimal 
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        : <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>

                  {isSelected && (
                    <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                      option.isOptimal 
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                        : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                    }`}>
                      <strong>تحليل القرار:</strong> {option.feedback}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. INTERACTIVE BUILDER / PARAMETER TUNER */}
      {exercise.type === 'interactive_builder' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(exercise.data as InteractiveBuilderExerciseData).fields.map((f) => (
              <div key={f.id} className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/70 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                  <span>{f.label}</span>
                  <span className="text-amber-400 font-sans">
                    {builderValues[f.id]}
                  </span>
                </div>

                {f.type === 'slider' && (
                  <input
                    type="range"
                    min={f.min || 1}
                    max={f.max || 100}
                    step={f.step || 1}
                    value={builderValues[f.id]}
                    onChange={(e) => setBuilderValues(prev => ({ ...prev, [f.id]: Number(e.target.value) }))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                )}

                {f.type === 'select' && f.options && (
                  <select
                    value={builderValues[f.id]}
                    onChange={(e) => setBuilderValues(prev => ({ ...prev, [f.id]: e.target.value }))}
                    className="w-full p-2 rounded-xl border border-zinc-700 bg-zinc-900 text-xs text-white cursor-pointer"
                  >
                    {f.options.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs text-zinc-300 block">
                {(exercise.data as InteractiveBuilderExerciseData).resultLabel}:
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-sans">
                {calculateBuilderResult().toLocaleString()} {(exercise.data as InteractiveBuilderExerciseData).unit}
              </span>
            </div>

            <button
              onClick={handleApplyBuilder}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition-all cursor-pointer shadow-md"
            >
              اعتماد المعطيات
            </button>
          </div>
        </div>
      )}

      {/* Solution Explanation Box */}
      <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 text-xs text-zinc-400 flex items-start gap-2.5 leading-relaxed">
        <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-zinc-200">الدرس المستفاد: </strong>
          {exercise.solutionExplanation}
        </p>
      </div>
    </div>
  );
};
