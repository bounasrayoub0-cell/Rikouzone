import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Sparkles, 
  Clock, 
  FileCheck2, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { PracticalAssignment } from '../../types/lessonTypes';
import { 
  isLessonAssignmentDone, 
  recordLessonAssignmentCompletion 
} from '../../utils/lessonProgressStorage';

interface RikouLessonAssignmentProps {
  assignment: PracticalAssignment;
  trackId: string;
  lessonId: string;
  onXpEarned?: (amount: number) => void;
}

export const RikouLessonAssignment: React.FC<RikouLessonAssignmentProps> = ({
  assignment,
  trackId,
  lessonId,
  onXpEarned
}) => {
  const [alreadyCompleted, setAlreadyCompleted] = useState<boolean>(() => isLessonAssignmentDone(trackId, lessonId));
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>(() => {
    try {
      const raw = localStorage.getItem(`rz_assign_${trackId}_${lessonId}`);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const toggleCheck = (idx: number) => {
    const updated = { ...checkedItems, [idx]: !checkedItems[idx] };
    setCheckedItems(updated);
    try {
      localStorage.setItem(`rz_assign_${trackId}_${lessonId}`, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save checklist:', e);
    }
  };

  const allItemsChecked = assignment.checklist.every((_, idx) => !!checkedItems[idx]);

  const handleMarkFinished = () => {
    if (!alreadyCompleted) {
      const res = recordLessonAssignmentCompletion(trackId, lessonId, assignment.title, assignment.xpReward);
      if (res.xpAwarded > 0 && onXpEarned) {
        onXpEarned(res.xpAwarded);
      }
      setAlreadyCompleted(true);
    }
  };

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-white/95 dark:bg-zinc-900/60 p-5 sm:p-7 shadow-sm dark:shadow-none space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              المهمة العملية للتطبيق الفوري
            </span>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 flex items-center gap-1 font-sans">
              <Clock className="w-3 h-3" />
              <span>{assignment.estimatedMinutes} دقيقة</span>
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            {assignment.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 mt-1 leading-relaxed">
            {assignment.instruction}
          </p>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs shrink-0 font-sans">
          <Sparkles className="w-3.5 h-3.5" />
          <span>+{assignment.xpReward} XP</span>
        </div>
      </div>

      {/* Deliverable Box */}
      <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
        <FileCheck2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>الناتج النهائي المطلوب تسليمه أو تطبيقه:</strong> {assignment.deliverable}
        </p>
      </div>

      {/* Checklist */}
      <div className="space-y-2 pt-1">
        <span className="text-xs font-bold text-slate-800 dark:text-zinc-300 block">
          قائمة التحقق من إنجاز المهمة:
        </span>
        {assignment.checklist.map((item, idx) => {
          const isDone = !!checkedItems[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 text-xs sm:text-sm ${
                isDone 
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200' 
                  : 'border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/40 text-slate-700 dark:text-zinc-300 hover:border-emerald-500/30'
              }`}
            >
              {isDone ? (
                <CheckSquare className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
              ) : (
                <Square className="w-4.5 h-4.5 text-slate-400 dark:text-zinc-500 shrink-0" />
              )}
              <span className={`leading-relaxed ${isDone ? 'line-through opacity-80' : ''}`}>
                {item}
              </span>
            </div>
          );
        })}
      </div>

      {/* Finish Action Button */}
      <div className="pt-3 border-t border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={handleMarkFinished}
          disabled={alreadyCompleted}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
            alreadyCompleted
              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 cursor-default'
              : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20 active:scale-95'
          }`}
        >
          {alreadyCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>تم إنجاز المهمة واحتساب النقاط ✅</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>أنجزت هذه المهمة عملياً (+{assignment.xpReward} XP)</span>
            </>
          )}
        </button>

        <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
          {alreadyCompleted ? 'المهمة مكتملة ومحفوظة محلياً' : allItemsChecked ? 'جميع البنود محددة جاهزة للتأكيد!' : 'حدد البنود أثناء التنفيذ'}
        </span>
      </div>
    </div>
  );
};
