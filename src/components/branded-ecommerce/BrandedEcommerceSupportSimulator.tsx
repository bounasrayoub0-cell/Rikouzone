import React, { useState } from 'react';
import { 
  Headphones, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  Copy, 
  Check, 
  Award,
  ShieldCheck,
  Send,
  User,
  HeartHandshake
} from 'lucide-react';
import { supportSimulatorScenarios, CustomerSupportScenario } from '../../data/brandedEcommerceData';

interface BrandedEcommerceSupportSimulatorProps {
  onCopyText: (text: string, label: string) => void;
}

export const BrandedEcommerceSupportSimulator: React.FC<BrandedEcommerceSupportSimulatorProps> = ({
  onCopyText
}) => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [copiedOptionId, setCopiedOptionId] = useState<string | null>(null);

  const scenario = supportSimulatorScenarios[activeScenarioIdx];
  const selectedOption = scenario.options.find(o => o.id === (userAnswers[scenario.id] || selectedOptionId));
  const isAnswered = !!userAnswers[scenario.id] || !!selectedOptionId;

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    setUserAnswers(prev => ({
      ...prev,
      [scenario.id]: optionId
    }));
  };

  const handleCopyScript = (text: string, id: string) => {
    onCopyText(text, 'تم نسخ رد خدمة العملاء الاحترافي');
    setCopiedOptionId(id);
    setTimeout(() => setCopiedOptionId(null), 2500);
  };

  const handleResetSimulator = () => {
    setUserAnswers({});
    setSelectedOptionId(null);
    setActiveScenarioIdx(0);
  };

  // Calculate cumulative score
  const totalScore = Object.entries(userAnswers).reduce((acc, [scenarioId, chosenOptId]) => {
    const sc = supportSimulatorScenarios.find(s => s.id === scenarioId);
    const opt = sc?.options.find(o => o.id === chosenOptId);
    return acc + (opt?.points || 0);
  }, 0);

  const maxPossibleScore = supportSimulatorScenarios.length * 100;
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-zinc-800 bg-[#0c0d14]/90 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm shadow-amber-500/10">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>محاكي محادثات خدمة العملاء التفاعلي</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-sans">
                  Interactive Support Lab
                </span>
              </h2>
              <p className="mt-1 text-xs text-zinc-400">
                تدرب على إدارة مواقف العملاء الحقيقية: تأخر الشحن، المنتجات المتضررة، وتردد الشراء، واكتشف ردود كسب الولاء.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 block font-bold">نقاط رضا العملاء:</span>
              <span className="text-base sm:text-lg font-black text-amber-400 font-mono">
                {totalScore} <span className="text-xs text-zinc-500">/ {maxPossibleScore}</span>
              </span>
            </div>

            <button
              onClick={handleResetSimulator}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700/60 text-xs font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>إعادة الاختبار</span>
            </button>
          </div>
        </div>

        {/* Progress bar across scenarios */}
        <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
          <span>التقدم في المحاكاة: ({answeredCount} من {supportSimulatorScenarios.length} سيناريوهات مكتملة)</span>
          <span className="text-amber-400 font-black font-sans">
            {Math.round((answeredCount / supportSimulatorScenarios.length) * 100)}%
          </span>
        </div>
        <div className="mt-1.5 h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / supportSimulatorScenarios.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Scenario Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {supportSimulatorScenarios.map((sc, idx) => {
          const isCurrent = idx === activeScenarioIdx;
          const isDone = !!userAnswers[sc.id];

          return (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioIdx(idx);
                setSelectedOptionId(userAnswers[sc.id] || null);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                isCurrent
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25 border border-orange-400/40'
                  : isDone
                  ? 'bg-[#10131d] text-emerald-300 border border-emerald-500/30'
                  : 'bg-[#0e1017] text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <span>سيناريو #{idx + 1}</span>
              {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Chat Window Simulation (7 Cols) */}
        <div className="lg:col-span-7 rounded-3xl border border-zinc-800 bg-[#0e1017]/95 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs">
                {scenario.channel === 'WhatsApp' ? 'WA' : scenario.channel === 'Instagram DM' ? 'IG' : 'EM'}
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-white">{scenario.title}</h3>
                <span className="text-[10px] text-zinc-400">عبر: {scenario.channel}</span>
              </div>
            </div>

            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
              scenario.customerEmotion === 'غاضب' ? 'bg-red-950/40 text-red-300 border-red-800/40' :
              scenario.customerEmotion === 'مستاء من خطأ' ? 'bg-orange-950/40 text-orange-300 border-orange-800/40' :
              'bg-blue-950/40 text-blue-300 border-blue-800/40'
            }`}>
              حالة العميل: {scenario.customerEmotion}
            </span>
          </div>

          {/* Context Note */}
          <div className="p-3 rounded-xl bg-[#141622] border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed">
            <span className="font-bold text-amber-400 block mb-0.5">سياق الحالة:</span>
            <p>{scenario.context}</p>
          </div>

          {/* Incoming Customer Message Bubble */}
          <div className="space-y-2 pt-2">
            <div className="flex items-start gap-2.5">
              <div className="h-7 w-7 rounded-full bg-red-950/60 border border-red-800/40 text-red-300 flex items-center justify-center shrink-0 mt-1">
                <User className="h-4 w-4" />
              </div>
              <div className="rounded-2xl rounded-tr-none bg-[#161826] border border-zinc-700/80 p-3.5 text-xs text-zinc-100 max-w-[85%] leading-relaxed shadow-md">
                <span className="text-[10px] font-bold text-zinc-400 block mb-1">العميل:</span>
                <p>{scenario.customerMessage}</p>
              </div>
            </div>
          </div>

          {/* Response Options */}
          <div className="pt-3 border-t border-zinc-800 space-y-2.5">
            <span className="text-xs font-bold text-zinc-300 block">
              اختر الرد الذي تمثله كصاحب علامة تجارية محترفة:
            </span>

            {scenario.options.map((option) => {
              const isSelected = (userAnswers[scenario.id] || selectedOptionId) === option.id;

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-xs leading-relaxed ${
                    !isAnswered
                      ? 'border-zinc-800 bg-[#12141e]/70 hover:border-zinc-700 hover:bg-[#161826] text-zinc-300'
                      : isSelected
                      ? option.quality === 'excellent'
                        ? 'border-emerald-500/80 bg-emerald-950/30 text-emerald-100 shadow-md shadow-emerald-950/20'
                        : option.quality === 'acceptable'
                        ? 'border-amber-500/80 bg-amber-950/30 text-amber-100'
                        : 'border-red-500/80 bg-red-950/30 text-red-100'
                      : option.quality === 'excellent'
                      ? 'border-emerald-500/40 bg-[#0a1610]/40 text-emerald-200/80'
                      : 'border-zinc-800/60 bg-[#10121a]/30 text-zinc-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold">{option.label}</span>
                    {isAnswered && option.quality === 'excellent' && (
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
                        الخيار الأفضل (+100 XP)
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-200 mt-1 italic">"{option.responseText}"</p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right: Feedback & Educational Breakdown (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {selectedOption ? (
            <div className={`rounded-3xl border p-5 sm:p-6 shadow-xl space-y-4 ${
              selectedOption.quality === 'excellent'
                ? 'border-emerald-500/40 bg-gradient-to-b from-[#0a1811] to-[#0c0e15]'
                : selectedOption.quality === 'acceptable'
                ? 'border-amber-500/40 bg-gradient-to-b from-[#18140a] to-[#0c0e15]'
                : 'border-red-500/40 bg-gradient-to-b from-[#180a0a] to-[#0c0e15]'
            }`}>
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2">
                  {selectedOption.quality === 'excellent' ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  ) : selectedOption.quality === 'acceptable' ? (
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                  <span className="text-sm font-black text-white">
                    {selectedOption.quality === 'excellent' ? 'تقييم ممتاز واحترافي!' :
                     selectedOption.quality === 'acceptable' ? 'رد مقبول ولكن يفوت فرصة الولاء' :
                     'رد ضار بسمعة العلامة التجارية!'}
                  </span>
                </div>

                <span className={`text-sm font-black font-mono ${
                  selectedOption.points > 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {selectedOption.points > 0 ? `+${selectedOption.points}` : selectedOption.points} نقطة
                </span>
              </div>

              {/* Feedback text */}
              <div className="text-xs text-zinc-200 leading-relaxed space-y-2">
                <span className="font-bold text-amber-400 block">التحليل التربوي للموقف:</span>
                <p>{selectedOption.feedback}</p>
              </div>

              {/* Copy Script CTA */}
              {selectedOption.quality === 'excellent' && (
                <div className="pt-2">
                  <button
                    onClick={() => handleCopyScript(selectedOption.responseText, selectedOption.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs transition-all shadow-md shadow-emerald-500/25 cursor-pointer"
                  >
                    {copiedOptionId === selectedOption.id ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>تم نسخ الرد الاحترافي بنجاح!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>نسخ هذا الرد لاستخدامه في متجرك</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Next Scenario button */}
              {activeScenarioIdx < supportSimulatorScenarios.length - 1 && (
                <button
                  onClick={() => {
                    const nextIdx = activeScenarioIdx + 1;
                    setActiveScenarioIdx(nextIdx);
                    setSelectedOptionId(userAnswers[supportSimulatorScenarios[nextIdx].id] || null);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold text-xs shadow-md shadow-orange-500/25 border border-orange-400/30 cursor-pointer"
                >
                  <span>الانتقال للسيناريو التالي</span>
                  <span>←</span>
                </button>
              )}
            </div>
          ) : (
            <div className="rounded-3xl border border-zinc-800 bg-[#0e1017]/90 p-5 sm:p-6 text-center text-xs text-zinc-400 space-y-2">
              <MessageSquare className="h-8 w-8 text-amber-400 mx-auto opacity-60" />
              <p className="font-bold text-zinc-200">اختر واحداً من خيارات الرد الثلاثة لمشاهدة التحليل التعليمي</p>
              <p className="text-[11px] text-zinc-500">
                ستتعلم كيف يؤثر أسلوب الرد على نفسية العميل، ومعدل المرتجعات، وتكرار الشراء.
              </p>
            </div>
          )}

          {/* Gold Rules of Customer Service */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0c0d14]/90 p-4 text-xs space-y-2">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span>القواعد الذهبية لخدمة عملاء البراند:</span>
            </span>
            <ul className="space-y-1.5 text-zinc-300 text-[11px] leading-relaxed">
              <li>• لا تجادل العميل الغاضب؛ اعترف بمشاعره وقدم حلاً فورياً.</li>
              <li>• تكلفة استبدال قطعة تالفة أقل بكثير من خسارة سمعة المتجر.</li>
              <li>• التأكيد السريع على الواتساب هو السد المنيع ضد المرتجعات.</li>
              <li>• احفظ خصوصية بيانات العميل ولا ترسل رسائل إعلانية متطفلة.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
