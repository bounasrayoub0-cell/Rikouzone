import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw,
  Award,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { sevenDayPlanData, ActionDay } from '../../data/affiliateGuideData';

const ACTION_PLAN_STORAGE_KEY = 'rikouzone_affiliate_action_plan_tasks';

export const AffiliateActionPlan: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(ACTION_PLAN_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [activeDay, setActiveDay] = useState<number>(1);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(ACTION_PLAN_STORAGE_KEY, JSON.stringify(completedTasks));
    } catch (e) {
      console.warn('Failed to save action plan progress:', e);
    }
  }, [completedTasks]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Calculate totals
  const allTasks = sevenDayPlanData.flatMap((d) => d.tasks);
  const totalTasksCount = allTasks.length;
  const completedTasksCount = allTasks.filter((t) => !!completedTasks[t.id]).length;
  const progressPercent = Math.round((completedTasksCount / totalTasksCount) * 100);

  const handleReset = () => {
    if (window.confirm('هل تريد تصفير جميع مهام خطة الـ 7 أيام والبدء من جديد؟')) {
      setCompletedTasks({});
    }
  };

  const currentDayData = sevenDayPlanData.find((d) => d.dayNumber === activeDay) || sevenDayPlanData[0];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl">
      
      {/* Header and overall progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
            <Calendar className="h-3.5 w-3.5" />
            <span>خطة تطبيق عملية خطوة بخطوة</span>
          </div>
          <h3 className="mt-2 text-xl sm:text-2xl font-black text-white">
            خطة الـ 7 أيام: من الصفر إلى أول فيديو ورابط شغال
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            مهمة واحدة مركزة لكل يوم. علّم على المهام المنجزة لتتبع تقدمك المالي والتسويقي.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-left rtl:text-right">
            <div className="text-xs text-zinc-400 font-medium">التقدم الإجمالي للخطة</div>
            <div className="text-xl font-black text-amber-400 font-mono">
              {completedTasksCount} / {totalTasksCount} مهمة ({progressPercent}%)
            </div>
          </div>
          {completedTasksCount > 0 && (
            <button
              onClick={handleReset}
              className="p-2 rounded-xl border border-zinc-800 text-zinc-500 hover:text-white transition-colors"
              title="تصفير التقدم"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-zinc-950 h-2.5 rounded-full overflow-hidden border border-zinc-800">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Days Tabs (Day 1 to Day 7) */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {sevenDayPlanData.map((d) => {
          const dayTasks = d.tasks;
          const dayDone = dayTasks.every((t) => !!completedTasks[t.id]);
          const isSelected = activeDay === d.dayNumber;

          return (
            <button
              key={d.dayNumber}
              onClick={() => setActiveDay(d.dayNumber)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap border ${
                isSelected
                  ? 'border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : dayDone
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : 'border-zinc-800 bg-zinc-950/80 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <span>اليوم {d.dayNumber}</span>
              {dayDone ? (
                <CheckCircle2 className={`h-4 w-4 ${isSelected ? 'text-black' : 'text-emerald-400'}`} />
              ) : (
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {dayTasks.filter((t) => !!completedTasks[t.id]).length}/{dayTasks.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Day Detail Card */}
      <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 space-y-6">
        
        {/* Day Meta Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
          <div>
            <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded-md">
              خطة اليوم {currentDayData.dayNumber} من أصل 7
            </span>
            <h4 className="mt-2 text-xl font-black text-white">
              {currentDayData.title}
            </h4>
            <p className="mt-1 text-xs text-zinc-300">
              <strong className="text-zinc-100">الهدف الأساسي: </strong>{currentDayData.objective}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900 px-3.5 py-2 rounded-xl border border-zinc-800 shrink-0">
            <Clock className="h-4 w-4 text-amber-400" />
            <span>الوقت المقدر: {currentDayData.estimatedTime}</span>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-zinc-400 block">مهام اليوم المطلوبة (اضغط على المهمة بعد إكمالها):</span>
          {currentDayData.tasks.map((task) => {
            const isCompleted = !!completedTasks[task.id];
            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                  isCompleted
                    ? 'border-emerald-500/50 bg-emerald-500/5 text-zinc-200 shadow-sm'
                    : 'border-zinc-800/80 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-400/20" />
                  ) : (
                    <Circle className="h-5 w-5 text-zinc-600" />
                  )}
                </div>
                <div>
                  <h5 className={`text-sm font-bold ${isCompleted ? 'text-emerald-300 line-through' : 'text-white'}`}>
                    {task.text}
                  </h5>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                    {task.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pro Tip Box */}
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-start gap-3 text-xs text-zinc-300">
          <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-400 block mb-0.5">نصيحة ذهبية لهذا اليوم:</strong>
            <span>{currentDayData.proTip}</span>
          </div>
        </div>

        {/* Day Navigation */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={() => setActiveDay(prev => Math.max(1, prev - 1))}
            disabled={activeDay === 1}
            className="flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowRight className="h-4 w-4" />
            <span>اليوم السابق</span>
          </button>

          {activeDay < 7 ? (
            <button
              onClick={() => setActiveDay(prev => Math.min(7, prev + 1))}
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
            >
              <span>اليوم التالي</span>
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
              <Award className="h-4 w-4" />
              <span>أكملت الخطة بالكامل! استمر في النشر اليومي</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
