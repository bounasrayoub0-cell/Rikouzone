import React, { useState } from 'react';
import { 
  Headphones, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Copy, 
  Check, 
  ArrowRight, 
  RotateCcw,
  MessageSquare,
  Award
} from 'lucide-react';
import { courseSupportScenarios, CourseSupportScenario } from '../../data/onlineCoursesData';

export const CourseSupportSimulator: React.FC<{ onCopyText: (text: string, label: string) => void }> = ({ onCopyText }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [completedScenarios, setCompletedScenarios] = useState<Record<string, { optionId: string; points: number }>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const scenario = courseSupportScenarios[currentScenarioIndex];
  const isAnswered = selectedOptionId !== null || !!completedScenarios[scenario.id];
  const currentSelection = selectedOptionId || completedScenarios[scenario.id]?.optionId;
  const chosenOption = scenario.options.find((opt) => opt.id === currentSelection);

  const handleSelectOption = (optionId: string, points: number) => {
    if (completedScenarios[scenario.id]) return;

    setSelectedOptionId(optionId);
    setTotalScore((prev) => prev + points);
    setCompletedScenarios((prev) => ({
      ...prev,
      [scenario.id]: { optionId, points }
    }));
  };

  const handleNext = () => {
    if (currentScenarioIndex < courseSupportScenarios.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
      setSelectedOptionId(null);
    }
  };

  const handlePrev = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex((prev) => prev - 1);
      setSelectedOptionId(completedScenarios[courseSupportScenarios[currentScenarioIndex - 1].id]?.optionId || null);
    }
  };

  const handleReset = () => {
    setCurrentScenarioIndex(0);
    setSelectedOptionId(null);
    setTotalScore(0);
    setCompletedScenarios({});
  };

  const handleCopyResponse = (text: string, optId: string) => {
    onCopyText(text, 'تم نسخ نموذج الرد المقترح إلى الحافظة');
    setCopiedId(optId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-500/10 via-zinc-900 to-zinc-900/90 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold mb-2">
              <Headphones className="h-3.5 w-3.5" />
              <span>محاكي دعم الطلاب والاعتراضات الواقعية</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              محاكي خدمة ما بعد البيع واعتراضات الطلاب الحقيقية
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
              اختبر ردود أفعالك في مواقف حساسة (اعتراض السعر، طلب الاسترجاع، الإحباط، وتسريب المحتوى) وتعلم كيف تحمي سمعتك وعلاقتك بالطلاب.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/90 text-right">
              <span className="text-[10px] text-zinc-400 block">رصيد النقاط التراكمي</span>
              <span className="text-base font-black font-mono text-amber-400">{totalScore} نقطة</span>
            </div>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all cursor-pointer"
              title="إعادة تشغيل المحاكي"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span>السيناريو {currentScenarioIndex + 1} من {courseSupportScenarios.length}</span>
          <div className="flex gap-1.5">
            {courseSupportScenarios.map((sc, idx) => (
              <div
                key={sc.id}
                className={`h-2 rounded-full transition-all ${
                  idx === currentScenarioIndex
                    ? 'w-6 bg-rose-500'
                    : completedScenarios[sc.id]
                    ? 'w-2 bg-emerald-500'
                    : 'w-2 bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Scenario Simulation Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 space-y-6 shadow-xl">
        {/* Scenario Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-800 text-rose-300 border border-zinc-700">
                {scenario.studentSituation}
              </span>
              <span className="text-xs text-zinc-500">القناة: {scenario.channel}</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white mt-1">
              {scenario.title}
            </h4>
          </div>
        </div>

        {/* Incoming Student Message Bubble */}
        <div className="rounded-2xl border border-zinc-700/80 bg-zinc-950/80 p-5 space-y-2 relative">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
            <MessageSquare className="h-4 w-4" />
            <span>رسالة الطالب الواردة:</span>
          </div>
          <p className="text-sm text-zinc-200 leading-relaxed font-normal italic pr-2 border-r-2 border-rose-500">
            "{scenario.studentMessage}"
          </p>
          <div className="text-[11px] text-zinc-400 pt-1">
            <strong>السياق الخفي:</strong> {scenario.context}
          </div>
        </div>

        {/* Action Options */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-zinc-300">
            كيف ستتعامل مع هذا الموقف كرائد أعمال ومدرب محترف؟
          </h5>

          <div className="space-y-3">
            {scenario.options.map((opt) => {
              const isSelected = currentSelection === opt.id;
              const isHarmful = opt.quality === 'harmful';
              const isExcellent = opt.quality === 'excellent';

              return (
                <button
                  key={opt.id}
                  disabled={!!completedScenarios[scenario.id] && !isSelected}
                  onClick={() => handleSelectOption(opt.id, opt.points)}
                  className={`w-full text-right p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? isExcellent
                        ? 'border-emerald-500 bg-emerald-950/20 shadow-md shadow-emerald-500/10'
                        : isHarmful
                        ? 'border-rose-500 bg-rose-950/20'
                        : 'border-cyan-500 bg-cyan-950/20'
                      : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-white block">
                        {opt.label}
                      </span>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        "{opt.responseText}"
                      </p>
                    </div>

                    {isAnswered && isSelected && (
                      <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${
                        isExcellent ? 'bg-emerald-500/20 text-emerald-300' :
                        isHarmful ? 'bg-rose-500/20 text-rose-300' :
                        'bg-cyan-500/20 text-cyan-300'
                      }`}>
                        {opt.points > 0 ? `+${opt.points}` : opt.points} نقطة
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Block after answering */}
        {chosenOption && (
          <div className={`p-4 rounded-xl border animate-fadeIn space-y-3 ${
            chosenOption.quality === 'excellent'
              ? 'border-emerald-500/40 bg-emerald-950/20'
              : chosenOption.quality === 'harmful'
              ? 'border-rose-500/40 bg-rose-950/20'
              : 'border-cyan-500/40 bg-cyan-950/20'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5">
                {chosenOption.quality === 'excellent' ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-300">تصرف مثالي واحترافي!</span>
                  </>
                ) : chosenOption.quality === 'harmful' ? (
                  <>
                    <XCircle className="h-4 w-4 text-rose-400" />
                    <span className="text-rose-300">تصرف ضار بالسمعة والمشروع!</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                    <span className="text-cyan-300">تصرف مقبول لكن يمكن تحسينه</span>
                  </>
                )}
              </span>

              <button
                onClick={() => handleCopyResponse(chosenOption.responseText, chosenOption.id)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white text-[11px] font-bold cursor-pointer transition-all"
              >
                {copiedId === chosenOption.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copiedId === chosenOption.id ? 'تم النسخ!' : 'نسخ نص الرد'}</span>
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {chosenOption.feedback}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <button
            onClick={handlePrev}
            disabled={currentScenarioIndex === 0}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentScenarioIndex === 0 ? 'text-zinc-600 cursor-not-allowed' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            السابق
          </button>

          <button
            onClick={handleNext}
            disabled={currentScenarioIndex === courseSupportScenarios.length - 1}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentScenarioIndex === courseSupportScenarios.length - 1
                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                : 'bg-rose-500 text-black hover:bg-rose-400 shadow-md shadow-rose-500/20'
            }`}
          >
            <span>السيناريو التالي</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
