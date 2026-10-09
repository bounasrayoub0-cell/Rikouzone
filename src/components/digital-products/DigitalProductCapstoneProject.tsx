import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  digitalProductCapstoneSteps, 
  CapstoneProjectStep 
} from '../../data/digitalProductsData';

interface DigitalProductCapstoneProjectProps {
  onCopyText: (text: string, label: string) => void;
}

const DIGITAL_CAPSTONE_PROGRESS_KEY = 'rikouzone_digital_products_capstone_steps';

export const DigitalProductCapstoneProject: React.FC<DigitalProductCapstoneProjectProps> = ({
  onCopyText
}) => {
  const { isRTL } = useLanguage();
  const ArrowBackIcon = isRTL ? ArrowRight : ArrowLeft;
  const ArrowNextIcon = isRTL ? ArrowLeft : ArrowRight;

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(DIGITAL_CAPSTONE_PROGRESS_KEY);
      return stored ? JSON.parse(stored) : [1];
    } catch {
      return [1];
    }
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleStepCompletion = (stepNumber: number) => {
    setCompletedSteps(prev => {
      const updated = prev.includes(stepNumber)
        ? prev.filter(s => s !== stepNumber)
        : [...prev, stepNumber];
      try {
        localStorage.setItem(DIGITAL_CAPSTONE_PROGRESS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const activeStep: CapstoneProjectStep = digitalProductCapstoneSteps[activeStepIndex] || digitalProductCapstoneSteps[0];
  const isCurrentStepCompleted = completedSteps.includes(activeStep.stepNumber);
  const totalSteps = digitalProductCapstoneSteps.length;
  const progressPercent = Math.round((completedSteps.length / totalSteps) * 100);

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/30 via-zinc-900 to-zinc-950 p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 text-xs font-black text-emerald-300 mb-3">
              <Award className="h-4 w-4" />
              <span>المشروع العملي النهائي (Capstone Project)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              إطلاق أول منتج رقمي متكامل من الفكرة إلى أول دولار
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              اتبع المراحل الست خطوة بخطوة: اختر فكرتك، اكتب مسودة الفصول، صمم الغلاف والموكاب، أنشئ صفحة Payhip مجاناً، وأطلق أول حملة محتوى لجلب مبيعاتك الأولى.
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="flex flex-col items-center sm:items-end bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800">
            <span className="text-xs text-zinc-400 font-bold mb-1">نسبة إنجاز المشروع:</span>
            <div className="text-3xl font-black text-emerald-400">{progressPercent}%</div>
            <div className="w-36 h-2 bg-zinc-800 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-zinc-500 mt-1.5">
              {completedSteps.length} من أصل {totalSteps} خطوات مكتملة
            </span>
          </div>
        </div>
      </div>

      {/* Steps Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {digitalProductCapstoneSteps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isDone = completedSteps.includes(step.stepNumber);

          return (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'border-emerald-500 bg-emerald-950/20 text-white shadow-md shadow-emerald-950/40'
                  : 'border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] font-black ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`}>
                  المرحلة {step.stepNumber}
                </span>
                {isDone ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Circle className="h-3.5 w-3.5 text-zinc-600" />
                )}
              </div>
              <span className="text-xs font-bold line-clamp-1 text-zinc-200">
                {step.title.slice(0, 22)}...
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Step Workspace */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-10 space-y-8">
        {/* Step Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="rounded-md bg-emerald-500/20 text-emerald-300 text-[11px] font-black px-2.5 py-0.5">
                الخطوة التنفيذية {activeStep.stepNumber} من {totalSteps}
              </span>
              <span className="text-xs text-zinc-400 font-medium">مشروعك الفعلي</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white">{activeStep.title}</h4>
            <p className="mt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {activeStep.description}
            </p>
          </div>

          <button
            onClick={() => toggleStepCompletion(activeStep.stepNumber)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
              isCurrentStepCompleted
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
            }`}
          >
            {isCurrentStepCompleted ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>تم إكمال هذه المرحلة ✓</span>
              </>
            ) : (
              <>
                <Circle className="h-4 w-4" />
                <span>تعليم كمكتمل</span>
              </>
            )}
          </button>
        </div>

        {/* Action Items List */}
        <div>
          <h5 className="text-sm font-black text-white flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>قائمة المهام الإجرائية لهذه المرحلة (Action Items):</span>
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeStep.actionItems.map((item: string, idx: number) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed"
              >
                <span className="h-5 w-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-emerald-400 shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverable & Tips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40">
            <span className="text-emerald-400 font-bold block mb-1">المخرج المطلوب تسليمه (Deliverable):</span>
            <p className="text-zinc-200 leading-relaxed font-medium">{activeStep.deliverable}</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-amber-400 font-bold block mb-1">نصيحة ذهبية للنجاح السريع:</span>
            <p className="text-zinc-300 leading-relaxed">{activeStep.tipsForSuccess}</p>
          </div>
        </div>

        {/* Sample Template if available */}
        {activeStep.sampleTemplate && (
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-emerald-400" />
                <span>نموذج استرشادي جاهز للتطبيق:</span>
              </span>

              <button
                onClick={() => handleCopy(activeStep.sampleTemplate!, `tpl-${activeStep.stepNumber}`, 'النموذج الاسترشادي')}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
              >
                {copiedId === `tpl-${activeStep.stepNumber}` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copiedId === `tpl-${activeStep.stepNumber}` ? 'تم النسخ' : 'نسخ النموذج'}</span>
              </button>
            </div>
            <pre className="text-xs text-zinc-300 bg-zinc-900/90 p-4 rounded-xl font-mono whitespace-pre-wrap leading-relaxed border border-zinc-800">
              {activeStep.sampleTemplate}
            </pre>
          </div>
        )}

        {/* Next / Previous Navigation Controls */}
        <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
            disabled={activeStepIndex === 0}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeStepIndex === 0
                ? 'opacity-30 cursor-not-allowed bg-zinc-900 text-zinc-600'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
            }`}
          >
            <ArrowBackIcon className="h-3.5 w-3.5" />
            <span>المرحلة السابقة</span>
          </button>

          <button
            onClick={() => setActiveStepIndex(Math.min(totalSteps - 1, activeStepIndex + 1))}
            disabled={activeStepIndex === totalSteps - 1}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeStepIndex === totalSteps - 1
                ? 'opacity-30 cursor-not-allowed bg-zinc-900 text-zinc-600'
                : 'bg-emerald-500 hover:bg-emerald-400 text-black font-black shadow-md shadow-emerald-500/20'
            }`}
          >
            <span>المرحلة التالية</span>
            <ArrowNextIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
