import React, { useState } from 'react';
import { 
  PhoneCall, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Copy, 
  Check, 
  ArrowRight, 
  RotateCcw,
  MessageSquare,
  Award,
  Users
} from 'lucide-react';
import { coachingRoleplayScenarios, CoachingRoleplayScenario } from '../../data/coachingData';

export const CoachingDiscoveryCallSimulator: React.FC = () => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [userScoreTotal, setUserScoreTotal] = useState<Record<number, number>>({});

  const scenario = coachingRoleplayScenarios[activeScenarioIndex];

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOptionIndex(idx);
  };

  const handleSubmitChoice = () => {
    if (selectedOptionIndex === null) return;
    setHasSubmitted(true);
    const score = scenario.options[selectedOptionIndex].score;
    setUserScoreTotal(prev => ({ ...prev, [activeScenarioIndex]: score }));
  };

  const handleNextScenario = () => {
    if (activeScenarioIndex < coachingRoleplayScenarios.length - 1) {
      setActiveScenarioIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setHasSubmitted(false);
    }
  };

  const handlePrevScenario = () => {
    if (activeScenarioIndex > 0) {
      setActiveScenarioIndex(prev => prev - 1);
      setSelectedOptionIndex(null);
      setHasSubmitted(false);
    }
  };

  const handleReset = () => {
    setSelectedOptionIndex(null);
    setHasSubmitted(false);
    setUserScoreTotal(prev => {
      const copy = { ...prev };
      delete copy[activeScenarioIndex];
      return copy;
    });
  };

  const selectedOption = selectedOptionIndex !== null ? scenario.options[selectedOptionIndex] : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              <PhoneCall className="h-3.5 w-3.5" />
              <span>محاكي مكالمات الاستكشاف والاعتراضات الميدانية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              محاكاة حية: تفكيك أصعب اعتراضات العملاء
            </h2>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              تدرب على مواقف ومكالمات واقعية مع عملاء مترددين. اختر أفضل رد استشاري، واكتشف نقاط القوة والضعف في أسلوبك التسويقي قبل خوض المكالمات الفعلية.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {coachingRoleplayScenarios.map((sc, i) => (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveScenarioIndex(i);
                  setSelectedOptionIndex(null);
                  setHasSubmitted(false);
                }}
                className={`w-9 h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${
                  i === activeScenarioIndex
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : userScoreTotal[i] !== undefined
                    ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/40'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Scenario Box */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-6 backdrop-blur-sm">
        {/* Scenario Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              الموقف رقم {activeScenarioIndex + 1} من {coachingRoleplayScenarios.length}
            </span>
            <h3 className="text-lg font-black text-white mt-0.5">
              {scenario.scenarioTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-300 font-bold flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-amber-400" />
              <span>العميل: {scenario.clientPersona}</span>
            </span>
          </div>
        </div>

        {/* Context & Objection Callout */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed">
            <span className="font-bold text-zinc-100 block mb-1">📌 سياق الموقف:</span>
            {scenario.situationContext}
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 space-y-2">
            <span className="text-xs font-black text-rose-300 flex items-center gap-1.5 uppercase tracking-wider">
              <MessageSquare className="h-4 w-4" />
              <span>اعتراض العميل الحرفي في المكالمة:</span>
            </span>
            <p className="text-sm sm:text-base font-bold text-white italic leading-relaxed">
              {scenario.clientObjection}
            </p>
          </div>
        </div>

        {/* Response Options */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-black text-zinc-300 uppercase tracking-wider block">
            اختر أفضل رد استشاري للتعامل مع هذا الموقف:
          </span>

          <div className="space-y-3">
            {scenario.options.map((opt, idx) => {
              const isSelected = selectedOptionIndex === idx;
              return (
                <div
                  key={opt.label}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5'
                      : 'border-zinc-800 bg-zinc-950/60 hover:bg-zinc-800/40 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-amber-500 bg-amber-500 text-black' : 'border-zinc-700 bg-zinc-900'
                    }`}>
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-black text-amber-400 block">
                        {opt.label}
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
                        {opt.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit or Result feedback */}
        {!hasSubmitted ? (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSubmitChoice}
              disabled={selectedOptionIndex === null}
              className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all ${
                selectedOptionIndex !== null
                  ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 cursor-pointer'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              تقييم هذا الرد الآن
            </button>
          </div>
        ) : (
          <div className="space-y-5 pt-4 border-t border-zinc-800/80">
            {/* Feedback box */}
            <div className={`p-5 rounded-2xl border ${
              selectedOption?.isOptimal
                ? 'bg-emerald-500/10 border-emerald-500/40'
                : 'bg-rose-500/10 border-rose-500/40'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                  selectedOption?.isOptimal ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {selectedOption?.isOptimal ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>رد ممتاز واحترافي بنسبة 100%!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4" />
                      <span>رد غير موفق - يحتاج تعديل</span>
                    </>
                  )}
                </span>
                <span className="text-sm font-black text-white">
                  النتيجة: {selectedOption?.score} / 100
                </span>
              </div>

              <p className="text-xs text-zinc-200 leading-relaxed">
                {selectedOption?.feedback}
              </p>

              {/* Pro Tip Callout */}
              <div className="mt-3 pt-3 border-t border-zinc-800/60 text-[11px] text-amber-300/90 leading-relaxed">
                💡 <span className="font-bold">نصيحة المبيعات الذهبية:</span> {scenario.proTip}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-all border border-zinc-700"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>إعادة المحاولة</span>
              </button>

              <div className="flex items-center gap-2">
                {activeScenarioIndex > 0 && (
                  <button
                    onClick={handlePrevScenario}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all"
                  >
                    السابق
                  </button>
                )}

                {activeScenarioIndex < coachingRoleplayScenarios.length - 1 ? (
                  <button
                    onClick={handleNextScenario}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black transition-all shadow-lg shadow-amber-500/20"
                  >
                    <span>الموقف التالي</span>
                    <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    أكملت جميع مواقف المحاكاة! 🎉
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
