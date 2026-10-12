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
  fourteenDayEcommercePlan, 
  ecommerceLaunchChecklist, 
  DayPlanItem, 
  ChecklistItem 
} from '../../data/brandedEcommerceData';

export const BrandedEcommerceChecklistAndPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plan' | 'checklist'>('plan');

  // Persistence keys
  const PLAN_STORAGE_KEY = 'rikouzone_branded_ecommerce_plan_completed';
  const CHECKLIST_STORAGE_KEY = 'rikouzone_branded_ecommerce_checklist_completed';

  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(PLAN_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedChecklist, setCompletedChecklist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  useEffect(() => {
    try {
      localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(completedDays));
    } catch {
      // ignore
    }
  }, [completedDays]);

  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(completedChecklist));
    } catch {
      // ignore
    }
  }, [completedChecklist]);

  const toggleDay = (day: number) => {
    setCompletedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const toggleChecklistItem = (id: string) => {
    setCompletedChecklist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const resetPlan = () => {
    if (window.confirm('هل تريد إعادة تعيين تقدم خطة الـ 14 يوماً؟')) {
      setCompletedDays([]);
    }
  };

  const resetChecklist = () => {
    if (window.confirm('هل تريد إعادة تعيين تقدم قائمة التحقق من الإطلاق؟')) {
      setCompletedChecklist([]);
    }
  };

  const planProgress = Math.round((completedDays.length / fourteenDayEcommercePlan.length) * 100);
  const checklistProgress = Math.round((completedChecklist.length / ecommerceLaunchChecklist.length) * 100);

  // Group checklist items by category
  const categories: { key: ChecklistItem['category']; label: string; icon: string }[] = [
    { key: 'قانوني وهوية', label: 'الهوية والعلامة والمظهر القانوني', icon: '🎨' },
    { key: 'منتج ومورد', label: 'المنتج والعينات والمورد', icon: '📦' },
    { key: 'متجر وتجربة مستخدم', label: 'المتجر والتجربة والصفحات', icon: '🛍️' },
    { key: 'بوابات ودفع', label: 'بوابات الدفع والتسعير', icon: '💳' },
    { key: 'شحن وسياسات', label: 'سياسة الشحن والإرجاع والتوصيل', icon: '🚚' },
    { key: 'خدمة عملاء وتتبع', label: 'خدمة العملاء والجاهزية للمشكلات', icon: '🎧' }
  ];

  return (
    <div className="space-y-6">
      {/* Switcher & Overall Progress */}
      <div className="bg-[#0c0e15] border border-zinc-800/90 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('plan')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'plan'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              خطة الـ 14 يوماً للمبتدئ ({completedDays.length}/{fourteenDayEcommercePlan.length})
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'checklist'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              قائمة التحقق قبل الإطلاق ({completedChecklist.length}/{ecommerceLaunchChecklist.length})
            </button>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <div className="text-right">
              <span className="text-xs text-zinc-400 block">نسبة الإنجاز</span>
              <span className="text-lg font-extrabold text-amber-400">
                {activeTab === 'plan' ? `${planProgress}%` : `${checklistProgress}%`}
              </span>
            </div>
            <button
              onClick={activeTab === 'plan' ? resetPlan : resetChecklist}
              title="إعادة تعيين التقدم"
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-zinc-900 rounded-full h-2.5 overflow-hidden border border-zinc-800/80">
          <div 
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${activeTab === 'plan' ? planProgress : checklistProgress}%` }}
          />
        </div>
      </div>

      {/* 14-DAY PLAN VIEW */}
      {activeTab === 'plan' && (
        <div className="space-y-4">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-xs sm:text-sm text-zinc-300 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-400 block mb-1">دليل الالتزام بالخطة:</strong>
              هذه الخطة مُصممة خطوة بخطوة بحيث لا تنتقل إلى يوم حتى تُنهي مهام اليوم السابق. لا تتعجل إطلاق الإعلانات قبل فحص المنتج والتأكد من وضوح السياسات وتجربة الشراء.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {fourteenDayEcommercePlan.map((item: DayPlanItem) => {
              const isCompleted = completedDays.includes(item.dayNumber);
              const isExpanded = expandedDay === item.dayNumber;

              return (
                <div 
                  key={item.dayNumber}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isCompleted
                      ? 'bg-[#080d0a] border-emerald-500/30 shadow-sm'
                      : isExpanded
                      ? 'bg-[#0e111a] border-amber-500/40 shadow-lg shadow-amber-500/5'
                      : 'bg-[#0c0e15] border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  {/* Item Header */}
                  <div className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                    onClick={() => setExpandedDay(isExpanded ? null : item.dayNumber)}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDay(item.dayNumber);
                        }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform active:scale-95 ${
                          isCompleted
                            ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                            : 'bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                        ) : (
                          <span className="font-mono text-xs font-bold">{item.dayNumber}</span>
                        )}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-amber-400 font-mono">اليوم {item.dayNumber}</span>
                          <span className="text-xs text-zinc-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {item.phaseTitle}
                          </span>
                        </div>
                        <h4 className={`text-sm sm:text-base font-bold truncate mt-0.5 ${
                          isCompleted ? 'text-zinc-400 line-through' : 'text-white'
                        }`}>
                          {item.dayTitle}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500 hidden sm:inline-block">
                        {item.actionItems.length} مهام
                      </span>
                      <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-amber-400' : ''
                      }`} />
                    </div>
                  </div>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 pt-1 border-t border-zinc-800/80 bg-black/20 space-y-4">
                      {/* Objective */}
                      <div className="text-xs sm:text-sm text-zinc-300">
                        <strong className="text-amber-400 block mb-0.5">الهدف الرئيسي لليوم:</strong>
                        <span>{item.primaryObjective}</span>
                      </div>

                      {/* Tasks Checklist */}
                      <div>
                        <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-amber-400" />
                          المهام التنفيذية المطلوبة:
                        </h5>
                        <ul className="space-y-2">
                          {item.actionItems.map((task: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverable */}
                      <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs sm:text-sm flex items-start gap-2.5">
                        <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-emerald-400 block mb-0.5">المُخرج النهائي لهذا اليوم:</strong>
                          <span className="text-zinc-300">{item.deliverable}</span>
                        </div>
                      </div>

                      {/* Warning Note if exists */}
                      {item.warningNote && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span><strong>تنبيه هام:</strong> {item.warningNote}</span>
                        </div>
                      )}

                      {/* Toggle button */}
                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => toggleDay(item.dayNumber)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            isCompleted
                              ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                              : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20'
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <RotateCcw className="w-3.5 h-3.5" />
                              إلغاء وضع علامة الإنجاز
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              تم إكمال مهام اليوم بنجاح!
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CHECKLIST VIEW */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-xs sm:text-sm text-zinc-300 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-400 block mb-1">تحذير قبل إطلاق الإعلانات وضخ الميزانية:</strong>
              أي بند في هذه القائمة غير مكتمل قد يتسبب في إهدار ميزانيتك الإعلانية، أو إغلاق حسابك الإعلاني، أو تلقي شكاوى متتالية من العملاء. تأكد من وضوح السياسات وفحص طلب تجريبي حي.
            </div>
          </div>

          <div className="space-y-6">
            {categories.map((cat) => {
              const items = ecommerceLaunchChecklist.filter(item => item.category === cat.key);
              if (items.length === 0) return null;

              const completedInCat = items.filter(i => completedChecklist.includes(i.id)).length;
              const catPercent = Math.round((completedInCat / items.length) * 100);

              return (
                <div 
                  key={cat.key}
                  className="bg-[#0c0e15] border border-zinc-800/90 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{cat.icon}</span>
                      <h4 className="font-bold text-white text-sm sm:text-base">{cat.label}</h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
                      {completedInCat} / {items.length} ({catPercent}%)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {items.map((item) => {
                      const isDone = completedChecklist.includes(item.id);

                      return (
                        <div 
                          key={item.id}
                          onClick={() => toggleChecklistItem(item.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-3 ${
                            isDone 
                              ? 'bg-emerald-950/20 border-emerald-500/40 text-zinc-300' 
                              : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-200'
                          }`}
                        >
                          <div className={`mt-0.5 shrink-0 transition-transform ${isDone ? 'scale-110' : ''}`}>
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
                            ) : (
                              <Circle className="w-5 h-5 text-zinc-500" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h5 className={`text-xs sm:text-sm font-bold ${
                                isDone ? 'text-emerald-300 line-through' : 'text-white'
                              }`}>
                                {item.title}
                              </h5>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                item.criticality === 'إلزامي'
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                              }`}>
                                {item.criticality}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
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
