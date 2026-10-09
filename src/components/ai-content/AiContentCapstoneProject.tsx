import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  FileText,
  Target,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { capstoneProjectSteps, CapstoneStep } from '../../data/aiContentData';

interface AiContentCapstoneProjectProps {
  onCopyText: (text: string, label: string) => void;
}

export const AiContentCapstoneProject: React.FC<AiContentCapstoneProjectProps> = ({ onCopyText }) => {
  const { isRTL } = useLanguage();
  const ArrowNext = isRTL ? ArrowLeft : ArrowRight;
  const ArrowPrev = isRTL ? ArrowRight : ArrowLeft;

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('rz_aicontent_capstone_completed');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeStep: CapstoneStep = capstoneProjectSteps[activeStepIndex] || capstoneProjectSteps[0];

  const handleCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleStepCompleted = (stepNum: number) => {
    setCompletedSteps((prev) => {
      const next = prev.includes(stepNum) 
        ? prev.filter((s) => s !== stepNum)
        : [...prev, stepNum];
      try {
        localStorage.setItem('rz_aicontent_capstone_completed', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  const progressPercent = Math.round((completedSteps.length / capstoneProjectSteps.length) * 100);

  return (
    <div className="space-y-6">
      {/* Capstone Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                المشروع التطبيقي النهائي: محاكاة إنتاج المحتوى (الخطوات الثمانية)
              </h3>
              <p className="mt-0.5 text-xs sm:text-sm text-zinc-400">
                من اختيار المنتج وتحديد الجمهور وحتى توليد البرومبت والتدقيق البشري وإخراج النسخة النهائية الجاهزة للنشر.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="text-right sm:text-left">
              <span className="text-[11px] font-bold text-zinc-400 block">نسبة الإنجاز</span>
              <span className="text-sm font-black text-emerald-400">{progressPercent}% ({completedSteps.length}/8)</span>
            </div>
            <div className="h-10 w-10 rounded-full border-2 border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center font-bold text-xs text-emerald-400">
              {completedSteps.length}
            </div>
          </div>
        </div>

        {/* 8-Step Navigation Tracker */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {capstoneProjectSteps.map((step, idx) => {
              const isCurrent = activeStepIndex === idx;
              const isDone = completedSteps.includes(step.stepNumber);

              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`rounded-xl p-2.5 text-right transition-all cursor-pointer border flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                      : isDone
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      : 'bg-zinc-950/60 border-zinc-800/60 text-zinc-500 hover:text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black font-mono">#{step.stepNumber}</span>
                    {isDone ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 text-zinc-600" />
                    )}
                  </div>
                  <div className="mt-2 text-[11px] font-bold truncate">
                    {step.stepTitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Step Workspace */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 sm:p-8 space-y-6">
        {/* Step Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-emerald-500/20 px-2.5 py-0.5 text-xs font-black text-emerald-400 border border-emerald-500/30">
                المرحلة {activeStep.stepNumber} من 8
              </span>
              <span className="text-xs text-zinc-400 font-medium">مشروع AromaBox للقهوة المختصة</span>
            </div>
            <h4 className="mt-2 text-xl sm:text-2xl font-black text-white">
              {activeStep.stepTitle}
            </h4>
          </div>

          <button
            onClick={() => toggleStepCompleted(activeStep.stepNumber)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              completedSteps.includes(activeStep.stepNumber)
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
            }`}
          >
            {completedSteps.includes(activeStep.stepNumber) ? (
              <>
                <Check className="h-4 w-4" />
                <span>تم إنجاز هذه الخطوة</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>تعليم كمكتمل</span>
              </>
            )}
          </button>
        </div>

        {/* Objective Box */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-start gap-3">
          <Target className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-emerald-400 block mb-0.5">الهدف من هذه المرحلة:</span>
            <p className="text-xs sm:text-sm text-zinc-300 font-medium">
              {activeStep.objective}
            </p>
          </div>
        </div>

        {/* Action Guidance */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 space-y-2">
          <span className="text-xs font-bold text-zinc-400 block">إرشادات التنفيذ للمبتدئين:</span>
          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
            {activeStep.actionGuidance}
          </p>
        </div>

        {/* Input vs Output Live Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Sample Input */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <FileText className="h-4 w-4" />
                <span>المدخلات النموذجية لهذه المرحلة (Input):</span>
              </span>
              <button
                onClick={() => handleCopy(activeStep.sampleInput, `input-${activeStep.stepNumber}`, 'تم نسخ المدخلات')}
                className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copiedId === `input-${activeStep.stepNumber}` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>نسخ</span>
              </button>
            </div>
            <div className="rounded-xl bg-zinc-950/80 border border-zinc-800/80 p-3.5 text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-line max-h-56 overflow-y-auto">
              {activeStep.sampleInput}
            </div>
          </div>

          {/* Sample Output */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                <span>المخرجات المعتمدة الجاهزة (Output):</span>
              </span>
              <button
                onClick={() => handleCopy(activeStep.sampleOutput, `output-${activeStep.stepNumber}`, 'تم نسخ المخرجات')}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedId === `output-${activeStep.stepNumber}` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>نسخ المخرجات</span>
              </button>
            </div>
            <div className="rounded-xl bg-zinc-950/90 border border-emerald-500/20 p-3.5 text-xs text-zinc-200 leading-relaxed whitespace-pre-line max-h-56 overflow-y-auto font-normal">
              {activeStep.sampleOutput}
            </div>
          </div>
        </div>

        {/* Quality Checklist */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <span className="text-xs font-bold text-white block mb-3 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>قائمة فحص الجودة الإلزامية قبل مغادرة هذه الخطوة (Checklist):</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {activeStep.qualityChecklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/60">
                <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                <span className="text-xs text-zinc-300 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <button
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeStepIndex === 0}
            className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowPrev className="h-4 w-4" />
            <span>المرحلة السابقة</span>
          </button>

          <span className="text-xs text-zinc-500 font-mono font-bold">
            {activeStepIndex + 1} / {capstoneProjectSteps.length}
          </span>

          <button
            onClick={() => setActiveStepIndex((prev) => Math.min(capstoneProjectSteps.length - 1, prev + 1))}
            disabled={activeStepIndex === capstoneProjectSteps.length - 1}
            className="rounded-xl bg-emerald-500 text-black px-4 py-2 text-xs font-bold hover:bg-emerald-400 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
          >
            <span>المرحلة التالية</span>
            <ArrowNext className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
