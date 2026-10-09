import React, { useState } from 'react';
import { 
  FolderCheck, 
  Copy, 
  Check, 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  Briefcase,
  Layers,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { aaaPortfolioProjectsList, AaaPortfolioProject } from '../../data/aiAutomationData';

interface AaaPortfolioViewProps {
  onCopyText: (text: string, label: string) => void;
}

export const AaaPortfolioView: React.FC<AaaPortfolioViewProps> = ({ onCopyText }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeProject = aaaPortfolioProjectsList[selectedProjectIndex] || aaaPortfolioProjectsList[0];

  const handleCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <FolderCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              معرض أعمال الأتمتة الاحترافي (Portfolio Architecture)
            </h3>
            <p className="mt-0.5 text-xs sm:text-sm text-zinc-400">
              ثلاثة مشاريع تجريبية موثقة بالكامل بدون كشف أسرار العملاء، مع قياس الأثر التجاري قبل وبعد الأتمتة.
            </p>
          </div>
        </div>

        {/* 3 Portfolio Items Switcher */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-zinc-800/80">
          {aaaPortfolioProjectsList.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedProjectIndex(idx)}
              className={`rounded-xl p-3 text-right transition-all cursor-pointer border ${
                selectedProjectIndex === idx
                  ? 'bg-purple-500/15 border-purple-500/50 text-white shadow-lg shadow-purple-500/10'
                  : 'bg-zinc-800/40 border-zinc-800 text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-200'
              }`}
            >
              <div className="text-[11px] font-mono text-purple-400 font-bold">دراسة حالة #{idx + 1}</div>
              <div className="mt-1 text-xs font-bold truncate">{item.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Study Details */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 sm:p-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div>
            <span className="rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-bold text-purple-400 border border-purple-500/20">
              نوع العميل: {activeProject.clientType}
            </span>
            <h4 className="mt-2 text-xl sm:text-2xl font-black text-white">
              {activeProject.title}
            </h4>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-xs text-zinc-300">
            <Lock className="h-4 w-4 text-emerald-400" />
            <span>بيانات تجريبية مجهلة وآمنة (Anonymized Data)</span>
          </div>
        </div>

        {/* Problem vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 space-y-2">
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
              <span>توصيف المشكلة (Problem Statement):</span>
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {activeProject.problemStatement}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 space-y-2">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <span>الحل المنفذ (Implemented Solution):</span>
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {activeProject.implementedSolution}
            </p>
          </div>
        </div>

        {/* Impact Metric (Before vs After) */}
        <div className="rounded-2xl border border-purple-500/30 bg-purple-950/10 p-5">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4" />
            <span>الأثر التجاري المقاس بالأرقام: {activeProject.expectedImpact.metric}</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-zinc-950/80 border border-red-500/20 p-3.5 text-center">
              <span className="text-[11px] font-bold text-zinc-400 block mb-1">قبل الأتمتة (يدوياً):</span>
              <span className="text-base font-bold text-red-400">{activeProject.expectedImpact.before}</span>
            </div>
            <div className="rounded-xl bg-zinc-950/80 border border-emerald-500/20 p-3.5 text-center">
              <span className="text-[11px] font-bold text-zinc-400 block mb-1">بعد نظام الأتمتة:</span>
              <span className="text-base font-bold text-emerald-400">{activeProject.expectedImpact.after}</span>
            </div>
          </div>
        </div>

        {/* Workflow Steps Summary */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 space-y-3">
          <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-purple-400" />
            <span>مراحل سير العمل المعتمدة:</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeProject.workflowStepsSummary.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/60 text-xs text-zinc-300">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-purple-400 font-bold text-[10px]">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Anonymized Data Simulation */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-cyan-400" />
              <span>نموذج تدفق البيانات التجريبي (Data Flow Sample):</span>
            </span>
            <button
              onClick={() => handleCopy(activeProject.anonymizedSampleData.inputSample, `sample-${selectedProjectIndex}`, 'تم نسخ نموذج البيانات')}
              className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {copiedId === `sample-${selectedProjectIndex}` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>نسخ المدخلات</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="rounded-xl bg-zinc-950/90 border border-zinc-800 p-3 space-y-1">
              <span className="text-[11px] font-bold text-cyan-400 font-sans block">1. مدخلات العميل (Input):</span>
              <pre className="text-zinc-300 whitespace-pre-wrap text-[11px] leading-relaxed overflow-x-auto">
                {activeProject.anonymizedSampleData.inputSample}
              </pre>
            </div>

            <div className="rounded-xl bg-zinc-950/90 border border-zinc-800 p-3 space-y-1">
              <span className="text-[11px] font-bold text-purple-400 font-sans block">2. المعالجة الآلية (Logic):</span>
              <pre className="text-zinc-300 whitespace-pre-wrap text-[11px] leading-relaxed overflow-x-auto">
                {activeProject.anonymizedSampleData.processedSample}
              </pre>
            </div>

            <div className="rounded-xl bg-zinc-950/90 border border-zinc-800 p-3 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 font-sans block">3. المخرجات والتنبيه (Output):</span>
              <pre className="text-zinc-300 whitespace-pre-wrap text-[11px] leading-relaxed overflow-x-auto">
                {activeProject.anonymizedSampleData.outputSample}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
