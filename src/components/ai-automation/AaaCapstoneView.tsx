import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ArrowLeft, 
  Target, 
  Copy, 
  Check, 
  FileText, 
  TrendingUp,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { aaaCapstoneMilestonesList, AaaCapstoneMilestone } from '../../data/aiAutomationData';

interface AaaCapstoneViewProps {
  onCopyText: (text: string, label: string) => void;
}

export const AaaCapstoneView: React.FC<AaaCapstoneViewProps> = ({ onCopyText }) => {
  const { isRTL } = useLanguage();
  const ArrowNext = isRTL ? ArrowLeft : ArrowRight;
  const ArrowPrev = isRTL ? ArrowRight : ArrowLeft;

  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [completedMilestones, setCompletedMilestones] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('rz_aaa_capstone_completed');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeMilestone: AaaCapstoneMilestone = aaaCapstoneMilestonesList[activeMilestoneIndex] || aaaCapstoneMilestonesList[0];

  const handleCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleMilestone = (num: number) => {
    setCompletedMilestones((prev) => {
      const next = prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num];
      try {
        localStorage.setItem('rz_aaa_capstone_completed', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  const progressPercent = Math.round((completedMilestones.length / aaaCapstoneMilestonesList.length) * 100);

  return (
    <div className="space-y-6">
      {/* Capstone Header Banner */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                مشروع التخرج العملي: بناء نظام أتمتة لشركة افتراضية
              </h3>
              <p className="mt-0.5 text-xs sm:text-sm text-zinc-400">
                من وصف المشكلة وتصميم سير العمل إلى اختيار الأدوات واختبار الحالات وحساب العائد وتقديم العرض التجاري.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="text-right sm:text-left">
              <span className="text-[11px] font-bold text-zinc-400 block">تقدم الإنجاز</span>
              <span className="text-sm font-black text-emerald-400">{progressPercent}% ({completedMilestones.length}/8)</span>
            </div>
            <div className="h-10 w-10 rounded-full border-2 border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center font-bold text-xs text-emerald-400">
              {completedMilestones.length}
            </div>
          </div>
        </div>

        {/* 8-Milestone Tracker */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {aaaCapstoneMilestonesList.map((m, idx) => {
              const isCurrent = activeMilestoneIndex === idx;
              const isDone = completedMilestones.includes(m.milestoneNumber);

              return (
                <button
                  key={m.milestoneNumber}
                  onClick={() => setActiveMilestoneIndex(idx)}
                  className={`rounded-xl p-2.5 text-right transition-all cursor-pointer border flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                      : isDone
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      : 'bg-zinc-950/60 border-zinc-800/60 text-zinc-500 hover:text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black font-mono">#{m.milestoneNumber}</span>
                    {isDone ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 text-zinc-600" />
                    )}
                  </div>
                  <div className="mt-2 text-[11px] font-bold truncate">
                    {m.title.split(':')[1] || m.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Milestone Workspace */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div>
            <span className="rounded-md bg-emerald-500/20 px-2.5 py-0.5 text-xs font-black text-emerald-400 border border-emerald-500/30">
              المرحلة {activeMilestone.milestoneNumber} من 8
            </span>
            <h4 className="mt-2 text-xl sm:text-2xl font-black text-white">
              {activeMilestone.title}
            </h4>
          </div>

          <button
            onClick={() => toggleMilestone(activeMilestone.milestoneNumber)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              completedMilestones.includes(activeMilestone.milestoneNumber)
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
            }`}
          >
            {completedMilestones.includes(activeMilestone.milestoneNumber) ? (
              <>
                <Check className="h-4 w-4" />
                <span>تم إنجاز هذه المرحلة</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>تعليم كمكتمل</span>
              </>
            )}
          </button>
        </div>

        {/* Objective & Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-1">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Target className="h-4 w-4" />
              <span>الهدف التعليمي للمرحلة:</span>
            </span>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
              {activeMilestone.objective}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 space-y-1">
            <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-cyan-400" />
              <span>إرشادات التنفيذ العملي:</span>
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {activeMilestone.guidance}
            </p>
          </div>
        </div>

        {/* Sample Implementation Box */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <span>نموذج تطبيقي معتمد لمشروع "عيادة ديرما كير":</span>
            </span>
            <button
              onClick={() => handleCopy(activeMilestone.sampleImplementation, `sample-capstone-${activeMilestone.milestoneNumber}`, 'تم نسخ النموذج')}
              className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {copiedId === `sample-capstone-${activeMilestone.milestoneNumber}` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>نسخ النموذج</span>
            </button>
          </div>
          <div className="rounded-xl bg-zinc-950/80 border border-zinc-800/80 p-4 text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-line font-normal">
            {activeMilestone.sampleImplementation}
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
          <span className="text-xs font-bold text-white block mb-3 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>معايير فحص الجودة والتسليم لهذه المرحلة (Checklist):</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {activeMilestone.deliverablesChecklist.map((chk, idx) => (
              <div key={idx} className="flex items-start gap-2 rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/60 text-xs text-zinc-300">
                <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                <span className="leading-relaxed">{chk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <button
            onClick={() => setActiveMilestoneIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeMilestoneIndex === 0}
            className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowPrev className="h-4 w-4" />
            <span>المرحلة السابقة</span>
          </button>

          <span className="text-xs text-zinc-500 font-mono font-bold">
            {activeMilestoneIndex + 1} / {aaaCapstoneMilestonesList.length}
          </span>

          <button
            onClick={() => setActiveMilestoneIndex((prev) => Math.min(aaaCapstoneMilestonesList.length - 1, prev + 1))}
            disabled={activeMilestoneIndex === aaaCapstoneMilestonesList.length - 1}
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
