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
  fourteenDayCourseLaunchPlan, 
  courseLaunchChecklist, 
  CourseActionPlanDay, 
  CourseLaunchChecklistItem 
} from '../../data/onlineCoursesData';

const PLAN_STORAGE_KEY = 'rikouzone_course_plan_progress';
const CHECKLIST_STORAGE_KEY = 'rikouzone_course_checklist_progress';

export const CourseChecklistAndPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plan' | 'checklist'>('plan');

  // Plan State (checked days)
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(PLAN_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Checklist State (checked item ids)
  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [selectedChecklistCategory, setSelectedChecklistCategory] = useState<string>('all');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(completedDays));
    } catch (e) {
      console.error(e);
    }
  }, [completedDays]);

  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(completedItems));
    } catch (e) {
      console.error(e);
    }
  }, [completedItems]);

  const toggleDay = (dayNum: number) => {
    setCompletedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const toggleChecklistItem = (id: string) => {
    setCompletedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const resetPlan = () => {
    setCompletedDays([]);
  };

  const resetChecklist = () => {
    setCompletedItems([]);
  };

  // Checklist categories
  const checklistCategories = [
    { id: 'all', label: 'الكل (24 بنداً)' },
    { id: 'التحقق والطلب', label: 'التحقق والطلب' },
    { id: 'المنهج والمحتوى', label: 'المنهج والمحتوى' },
    { id: 'التسجيل والإنتاج', label: 'التسجيل والإنتاج' },
    { id: 'المنصة وبوابات الدفع', label: 'المنصة وبوابات الدفع' },
    { id: 'صفحة البيع والمسار', label: 'صفحة البيع والمسار' },
    { id: 'الإطلاق والتسويق', label: 'الإطلاق والتسويق' }
  ];

  const filteredChecklist = courseLaunchChecklist.filter((item) => {
    return selectedChecklistCategory === 'all' || item.category === selectedChecklistCategory;
  });

  const planProgressPct = Math.round((completedDays.length / fourteenDayCourseLaunchPlan.length) * 100);
  const checklistProgressPct = Math.round((completedItems.length / courseLaunchChecklist.length) * 100);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-500/10 via-zinc-900 to-zinc-900/90 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold mb-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>خطة العمل وقائمة التدقيق الصارمة</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              خطة إطلاق الدورة في 14 يوماً وقائمة التحقق قبل الإعلان
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
              جدول يومي محدد المهام لنقلك من الفكرة إلى أول المبيعات الحقيقية، وقائمة تفقد من 24 بنداً تضمن عدم نسيان أي خطوة حاسمة.
            </p>
          </div>

          {/* Sub Navigation Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-950 border border-zinc-800">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'plan'
                  ? 'bg-rose-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              خطة الـ 14 يوماً ({planProgressPct}%)
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'checklist'
                  ? 'bg-rose-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              قائمة التحقق 24 بنداً ({checklistProgressPct}%)
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-5 pt-4 border-t border-zinc-800">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-300 font-bold">
              {activeTab === 'plan' ? 'إنجاز خطة الـ 14 يوماً:' : 'جاهزية الإطلاق والتدقيق:'}
            </span>
            <span className="font-mono font-black text-rose-400">
              {activeTab === 'plan' ? `${completedDays.length} / 14 يوماً` : `${completedItems.length} / 24 بنداً`} ({activeTab === 'plan' ? planProgressPct : checklistProgressPct}%)
            </span>
          </div>
          <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${activeTab === 'plan' ? planProgressPct : checklistProgressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* View 1: 14-Day Action Plan */}
      {activeTab === 'plan' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-rose-400" />
              <span>الجدول الزمني اليومي (اضغط على الدائرة لتعليم اليوم كمكتمل):</span>
            </h4>

            {completedDays.length > 0 && (
              <button
                onClick={resetPlan}
                className="text-xs text-zinc-400 hover:text-rose-400 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>إعادة ضبط الخطة</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {fourteenDayCourseLaunchPlan.map((day) => {
              const isDone = completedDays.includes(day.dayNumber);

              return (
                <div
                  key={day.dayNumber}
                  className={`rounded-2xl border transition-all p-5 ${
                    isDone
                      ? 'border-emerald-500/40 bg-emerald-950/10'
                      : 'border-zinc-800 bg-zinc-900/70 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <button
                        onClick={() => toggleDay(day.dayNumber)}
                        className="mt-1 text-zinc-400 hover:text-emerald-400 transition-all cursor-pointer shrink-0"
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                        ) : (
                          <Circle className="h-6 w-6 text-zinc-600 hover:text-zinc-400" />
                        )}
                      </button>

                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                            {day.phaseTitle}
                          </span>
                          <span className="text-xs font-mono font-black text-rose-400">
                            اليوم {day.dayNumber}
                          </span>
                          <h5 className={`text-sm sm:text-base font-bold ${isDone ? 'text-zinc-300 line-through' : 'text-white'}`}>
                            {day.dayTitle}
                          </h5>
                        </div>

                        <p className="text-xs text-zinc-300 leading-relaxed">
                          🎯 <strong className="text-white">الهدف الأساسي:</strong> {day.primaryObjective}
                        </p>

                        <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/80 space-y-1.5 text-xs">
                          <span className="text-[11px] font-bold text-zinc-400 block">المهام التنفيذية لليوم:</span>
                          <ul className="space-y-1 text-zinc-300 text-xs">
                            {day.actionItems.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-rose-400 font-bold shrink-0">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1">
                          <div className="text-emerald-400 font-semibold">
                            📦 المخرج النهائي المطلوب: <span className="text-zinc-200">{day.deliverable}</span>
                          </div>

                          {day.warningNote && (
                            <div className="text-amber-400/90 text-[11px] flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3 shrink-0" />
                              <span>{day.warningNote}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: Launch Readiness Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-2">
            <div className="flex items-center gap-2 flex-wrap">
              {checklistCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedChecklistCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedChecklistCategory === cat.id
                      ? 'bg-rose-500 text-black font-black shadow-md'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {completedItems.length > 0 && (
              <button
                onClick={resetChecklist}
                className="text-xs text-zinc-400 hover:text-rose-400 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>إعادة ضبط القائمة</span>
              </button>
            )}
          </div>

          {/* Checklist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredChecklist.map((item) => {
              const isChecked = completedItems.includes(item.id);
              const isCritical = item.importance === 'حرج جداً';

              return (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`rounded-xl border p-4 transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? 'border-emerald-500/40 bg-emerald-950/15'
                      : 'border-zinc-800 bg-zinc-900/70 hover:border-zinc-700'
                  }`}
                >
                  <button className="mt-0.5 text-zinc-400 hover:text-emerald-400 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <Circle className="h-5 w-5 text-zinc-600" />
                    )}
                  </button>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-zinc-300 line-through' : 'text-white'}`}>
                        {item.title}
                      </h5>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                        isCritical ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        'bg-zinc-800 text-zinc-400'
                      }`}>
                        {item.importance}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="text-[10px] text-zinc-500 flex items-center gap-1 pt-1">
                      <Clock className="h-3 w-3" />
                      <span>الوقت التقديري: {item.estimatedMinutes} دقيقة</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Unlock Badge if 100% Completed */}
          {checklistProgressPct === 100 && (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-6 text-center space-y-2 animate-fadeIn shadow-2xl">
              <Award className="h-10 w-10 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-black text-white">
                تهانينا! دورتك التدريبية مستوفية لكافة معايير الإطلاق بنسبة 100% 🚀
              </h4>
              <p className="text-xs text-zinc-300 max-w-lg mx-auto">
                لقد تحققت من كل التفاصيل من جودة الصوت، المنصة، بوابات الدفع، وصفحة البيع. أنت جاهز الآن لفتح باب التسجيل بثقة كاملة.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
