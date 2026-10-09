import React, { useState } from 'react';
import { 
  Briefcase, 
  Layers, 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Check, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  AlertCircle,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { aaaSystemProjectsList, AaaSystemProject } from '../../data/aiAutomationData';

interface AaaSystemProjectsViewProps {
  onCopyText: (text: string, label: string) => void;
}

export const AaaSystemProjectsView: React.FC<AaaSystemProjectsViewProps> = ({ onCopyText }) => {
  const { isRTL } = useLanguage();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(aaaSystemProjectsList[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeProject = aaaSystemProjectsList.find((p) => p.id === selectedProjectId) || aaaSystemProjectsList[0];

  const handleCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header Banner */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              المشاريع التطبيقية الخمسة: بناء أنظمة أتمتة متكاملة للشركات
            </h3>
            <p className="mt-0.5 text-xs sm:text-sm text-zinc-400">
              خطوة بخطوة: الأدوات المطلوبة، طريقة الربط، تسلسل الخطوات، اختبار الحالات العادية والحرجة، وحدود الأمان.
            </p>
          </div>
        </div>

        {/* 5-Project Selector Bar */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 pt-3 border-t border-zinc-800/80">
          {aaaSystemProjectsList.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
              className={`rounded-xl p-3 text-right transition-all cursor-pointer border flex flex-col justify-between ${
                selectedProjectId === project.id
                  ? 'bg-cyan-500/15 border-cyan-500/50 text-white shadow-lg shadow-cyan-500/10'
                  : 'bg-zinc-800/40 border-zinc-800 text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-200'
              }`}
            >
              <div className="text-[11px] font-mono text-cyan-400 font-bold">
                مشروع #{project.projectNumber}
              </div>
              <div className="mt-1 text-xs font-bold truncate">
                {project.title.split(':')[1] || project.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Active Project Details */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 sm:p-8 space-y-6">
        {/* Title Header */}
        <div className="pb-5 border-b border-zinc-800 space-y-2">
          <span className="rounded-md bg-cyan-500/10 px-2.5 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/20">
            المشروع {activeProject.projectNumber} من 5
          </span>
          <h4 className="text-xl sm:text-2xl font-black text-white">
            {activeProject.title}
          </h4>
          <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
            {activeProject.shortSummary}
          </p>
        </div>

        {/* Problem vs Solution Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-red-500/30 bg-red-950/10 p-5 space-y-2">
            <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4" />
              <span>المشكلة التجارية الحقيقية لدى الشركات:</span>
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {activeProject.businessProblem}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-5 space-y-2">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>هندسة الحل بالأتمتة (Solution Architecture):</span>
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {activeProject.solutionArchitecture}
            </p>
          </div>
        </div>

        {/* Tools Required */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 space-y-3">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="h-4 w-4 text-cyan-400" />
            <span>الأدوات المطلوبة وتكاليفها التقديرية:</span>
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {activeProject.toolsRequired.map((tool, idx) => (
              <div key={idx} className="rounded-xl bg-zinc-950/70 border border-zinc-800/80 p-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">{tool.name}</span>
                  <span className="text-[11px] text-zinc-400 block mt-0.5">{tool.role}</span>
                </div>
                <div className="mt-2 text-[10px] text-cyan-400 font-mono font-medium">
                  {tool.costNote}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Visual Sequence */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
          <h5 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-cyan-400" />
            <span>تسلسل ومخطط سير العمل خطوة بخطوة (Workflow Sequence):</span>
          </h5>
          <div className="space-y-2">
            {activeProject.workflowDiagram.map((node) => (
              <div key={node.stepNumber} className="flex items-start gap-3 rounded-xl bg-zinc-950/80 p-3.5 border border-zinc-800/80">
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                  node.eventType === 'trigger'
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : node.eventType === 'filter'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : node.eventType === 'router'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {node.stepNumber}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{node.label}</span>
                    <span className="text-[10px] font-mono text-zinc-500">[{node.app}]</span>
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-300 leading-relaxed font-normal">
                    {node.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Setup Steps */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Target className="h-4 w-4 text-cyan-400" />
            <span>خطوات التنفيذ والإعداد في المنصة:</span>
          </h5>
          <div className="space-y-3">
            {activeProject.detailedSetupSteps.map((setup) => (
              <div key={setup.step} className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-cyan-500/20 text-[11px] font-bold text-cyan-400">
                    {setup.step}
                  </span>
                  <h6 className="text-xs sm:text-sm font-bold text-white">{setup.title}</h6>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  {setup.instructions}
                </p>
                <div className="rounded-lg bg-zinc-950/80 p-2.5 border border-zinc-800 text-[11px] text-cyan-300">
                  <strong>معيار التحقق:</strong> {setup.verification}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testing Procedures */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>إجراءات الاختبار الصارم (Testing Procedure):</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-xl bg-zinc-950/70 p-3 border border-zinc-800">
              <span className="font-bold text-emerald-400 block mb-1">الحالة الطبيعية (Normal):</span>
              <p className="text-zinc-300 leading-relaxed">{activeProject.testingProcedure.normalCase}</p>
            </div>
            <div className="rounded-xl bg-zinc-950/70 p-3 border border-zinc-800">
              <span className="font-bold text-amber-400 block mb-1">حالة الفشل أو التضارب (Edge Case):</span>
              <p className="text-zinc-300 leading-relaxed">{activeProject.testingProcedure.edgeOrFailureCase}</p>
            </div>
            <div className="rounded-xl bg-zinc-950/70 p-3 border border-zinc-800">
              <span className="font-bold text-cyan-400 block mb-1">النتيجة المتوقعة:</span>
              <p className="text-zinc-300 leading-relaxed">{activeProject.testingProcedure.expectedResult}</p>
            </div>
          </div>
        </div>

        {/* Safety & Limitations + Handover Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-950/10 p-4 space-y-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span>حدود النظام وضوابط الأمان:</span>
            </span>
            <ul className="space-y-1 text-xs text-zinc-300">
              {activeProject.knownLimitationsAndSafety.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-4 space-y-2">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>قائمة فحص التسليم للعميل (Handover):</span>
            </span>
            <ul className="space-y-1 text-xs text-zinc-300">
              {activeProject.clientHandoverChecklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
