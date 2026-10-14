import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  ShieldCheck, 
  AlertTriangle, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  ChevronDown,
  Layers,
  Award
} from 'lucide-react';
import { 
  coaching14DayPlan, 
  coachingReadinessChecklist, 
  CoachingPlanDay, 
  CoachingChecklistItem 
} from '../../data/coachingData';

const PLAN_COMPLETED_DAYS_KEY = 'rikouzone_coaching_completed_days';
const CHECKLIST_COMPLETED_KEY = 'rikouzone_coaching_completed_checklist';

export const CoachingChecklistAndPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plan' | 'checklist'>('plan');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Completed Days State
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(PLAN_COMPLETED_DAYS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Completed Checklist State
  const [completedChecklist, setCompletedChecklist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(CHECKLIST_COMPLETED_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PLAN_COMPLETED_DAYS_KEY, JSON.stringify(completedDays));
    } catch (e) {
      console.error(e);
    }
  }, [completedDays]);

  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_COMPLETED_KEY, JSON.stringify(completedChecklist));
    } catch (e) {
      console.error(e);
    }
  }, [completedChecklist]);

  const toggleDay = (dayNum: number) => {
    setCompletedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const toggleChecklistItem = (id: string) => {
    setCompletedChecklist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const resetPlan = () => {
    if (window.confirm('هل تريد إعادة تعيين تقدم خطة الـ 14 يوماً؟')) {
      setCompletedDays([]);
    }
  };

  const resetChecklist = () => {
    if (window.confirm('هل تريد إعادة تعيين تقدم قائمة التحقق؟')) {
      setCompletedChecklist([]);
    }
  };

  // Filtered Plan
  const filteredPlan = coaching14DayPlan.filter((day) => {
    return selectedPhase === 'all' || day.phase === selectedPhase;
  });

  // Filtered Checklist
  const filteredChecklist = coachingReadinessChecklist.filter((item) => {
    return selectedCategory === 'all' || item.category === selectedCategory;
  });

  const planProgress = Math.round((completedDays.length / coaching14DayPlan.length) * 100);
  const checklistProgress = Math.round((completedChecklist.length / coachingReadinessChecklist.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              <Calendar className="h-3.5 w-3.5" />
              <span>خريطة الإطلاق والتنفيذ الميداني</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              خطة الـ 14 يوماً وقائمة جاهزية إطلاق خدمة التدريب
            </h2>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              خارطة طريق يومية ملموسة تأخذك من مرحلة الفكرة المجردة إلى استقبال أول عميل مدفوع وعقد الجلسة الأولى، مع قائمة تدقيق من 24 بنداً لضمان عدم نسيان أي تفصيلة مهنية.
            </p>
          </div>

          {/* Quick Toggle Tabs */}
          <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'plan'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              خطة الـ 14 يوماً ({completedDays.length}/14)
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'checklist'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              قائمة الجاهزية ({completedChecklist.length}/24)
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-zinc-300">
              {activeTab === 'plan' ? 'نسبة إنجاز خطة الأيام الأربعة عشر:' : 'نسبة إتمام بنود الجاهزية:'}
            </span>
            <span className="text-amber-400 font-black">
              {activeTab === 'plan' ? `${planProgress}%` : `${checklistProgress}%`}
            </span>
          </div>
          <div className="w-full bg-zinc-950 h-2.5 rounded-full overflow-hidden border border-zinc-800/80">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${activeTab === 'plan' ? planProgress : checklistProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* VIEW 1: 14-DAY PLAN */}
      {activeTab === 'plan' && (
        <div className="space-y-6">
          {/* Phase Filter and Reset */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'جميع المراحل (14 يوماً)' },
                { id: 'phase-1', label: 'المرحلة 1: التدقيق والتخصص' },
                { id: 'phase-2', label: 'المرحلة 2: البنية والأدوات' },
                { id: 'phase-3', label: 'المرحلة 3: المحتوى والاستقطاب' },
                { id: 'phase-4', label: 'المرحلة 4: الإغلاق والجلسات' },
              ].map((ph) => (
                <button
                  key={ph.id}
                  onClick={() => setSelectedPhase(ph.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedPhase === ph.id
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                  }`}
                >
                  {ph.label}
                </button>
              ))}
            </div>

            <button
              onClick={resetPlan}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-bold transition-all border border-zinc-800"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>إعادة تعيين الأيام</span>
            </button>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredPlan.map((day) => {
              const isDone = completedDays.includes(day.dayNumber);
              return (
                <div
                  key={day.dayNumber}
                  className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                    isDone
                      ? 'bg-emerald-500/5 border-emerald-500/30'
                      : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <button
                        onClick={() => toggleDay(day.dayNumber)}
                        className={`w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-400 text-black shadow-md shadow-emerald-500/20'
                            : 'bg-zinc-950 border-zinc-700 text-transparent hover:border-amber-400'
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[11px] font-black border border-amber-500/30">
                            اليوم {day.dayNumber}
                          </span>
                          <span className="text-[11px] font-bold text-zinc-400">
                            {day.phaseName}
                          </span>
                        </div>
                        <h3 className={`text-base font-black transition-colors ${isDone ? 'text-zinc-400 line-through' : 'text-white'}`}>
                          {day.title}
                        </h3>
                        <p className="text-xs text-zinc-300 leading-relaxed pt-0.5">
                          🎯 <span className="font-bold">الهدف:</span> {day.objective}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tasks List */}
                  <div className="mt-4 pt-4 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                    <div className="md:col-span-7 space-y-2">
                      <span className="font-bold text-zinc-300 block">مهام التنفيذ اليومية:</span>
                      <ul className="space-y-1.5 text-zinc-300">
                        {day.tasks.map((t, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span className="leading-relaxed">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-5 space-y-3">
                      <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                        <span className="text-[11px] font-black text-emerald-400 block mb-0.5">
                          المخرج النهائي لليوم:
                        </span>
                        <p className="text-zinc-200 text-xs font-bold leading-relaxed">
                          {day.deliverable}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-relaxed">
                        ⚠️ <span className="font-bold">تحذير مهم:</span> {day.warningNote}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          {/* Category Filter and Reset */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'جميع البنود (24 بنداً)' },
                { id: 'foundations', label: 'الأساسيات' },
                { id: 'offer', label: 'العرض والباقة' },
                { id: 'tech', label: 'التقنية والجدولة' },
                { id: 'marketing', label: 'التسويق والمحتوى' },
                { id: 'sales', label: 'المبيعات والعقود' },
                { id: 'delivery', label: 'التنفيذ والمتابعة' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === c.id
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <button
              onClick={resetChecklist}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-bold transition-all border border-zinc-800"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>إعادة تعيين البنود</span>
            </button>
          </div>

          {/* Checklist Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredChecklist.map((item) => {
              const isDone = completedChecklist.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isDone
                      ? 'bg-emerald-500/10 border-emerald-500/40 shadow-sm'
                      : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800/40 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-400 text-black font-black'
                        : 'bg-zinc-950 border-zinc-700'
                    }`}>
                      {isDone && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                          item.importance === 'critical'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-zinc-800 text-zinc-300'
                        }`}>
                          {item.importance === 'critical' ? 'جوهري وإلزامي' : 'موصى به'}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-bold flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{item.estimatedHours}</span>
                        </span>
                      </div>

                      <h4 className={`text-xs sm:text-sm font-black transition-colors ${
                        isDone ? 'text-zinc-400 line-through' : 'text-white'
                      }`}>
                        {item.label}
                      </h4>

                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
