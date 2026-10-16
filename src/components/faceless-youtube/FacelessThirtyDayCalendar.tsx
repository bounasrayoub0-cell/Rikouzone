import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Clock, Sparkles, RefreshCw, Plus, Trash2, Tag, Target } from 'lucide-react';

interface CalendarEvent {
  id: string;
  dayNumber: number;
  weekName: string;
  title: string;
  category: 'research' | 'script' | 'audio' | 'edit' | 'publish';
  status: 'pending' | 'in-progress' | 'completed';
}

const DEFAULT_EVENTS: CalendarEvent[] = [
  // WEEK 1
  { id: 'ev-1', dayNumber: 1, weekName: 'الأسبوع 1', title: 'تحديد النيتش بدقة وإجراء اختبار الـ 50 موضوعاً', category: 'research', status: 'completed' },
  { id: 'ev-2', dayNumber: 3, weekName: 'الأسبوع 1', title: 'تصميم الشعار والغلاف وضبط هوية القناة في Canva', category: 'research', status: 'completed' },
  { id: 'ev-3', dayNumber: 5, weekName: 'الأسبوع 1', title: 'بناء بنك الأفكار الأول (توليد 20 عنواناً موثقاً)', category: 'research', status: 'completed' },
  { id: 'ev-4', dayNumber: 7, weekName: 'الأسبوع 1', title: 'اختيار فكرة الفيديو الأول وجمع 3 مصادر مؤكدة', category: 'research', status: 'completed' },

  // WEEK 2
  { id: 'ev-5', dayNumber: 9, weekName: 'الأسبوع 2', title: 'صياغة سكريبت الفيديو الأول بالهيكل السباعي (700 كلمة)', category: 'script', status: 'in-progress' },
  { id: 'ev-6', dayNumber: 11, weekName: 'الأسبوع 2', title: 'تسجيل التعليق الصوتي ومعالجته ببرنامج Audacity', category: 'audio', status: 'pending' },
  { id: 'ev-7', dayNumber: 13, weekName: 'الأسبوع 2', title: 'جمع اللقطات المرخصة وتجميع تايملاين المونتاج', category: 'edit', status: 'pending' },
  { id: 'ev-8', dayNumber: 14, weekName: 'الأسبوع 2', title: 'إنهاء المونتاج، المؤثرات الصوتية وتصدير نسخة 1080p', category: 'edit', status: 'pending' },

  // WEEK 3
  { id: 'ev-9', dayNumber: 16, weekName: 'الأسبوع 3', title: 'تصميم نسختين من الصورة المصغرة وكتابة سيو الوصف', category: 'publish', status: 'pending' },
  { id: 'ev-10', dayNumber: 18, weekName: 'الأسبوع 3', title: 'رفع الفيديو كغير مدرج ثم النشر الرسمي المجدول', category: 'publish', status: 'pending' },
  { id: 'ev-11', dayNumber: 20, weekName: 'الأسبوع 3', title: 'الرد على التعليقات ومراقبة نسبة الـ CTR بعد 48 ساعة', category: 'publish', status: 'pending' },
  { id: 'ev-12', dayNumber: 21, weekName: 'الأسبوع 3', title: 'تحليل منحنى الاحتفاظ (Retention) وتحديد فجوة التحسين', category: 'research', status: 'pending' },

  // WEEK 4
  { id: 'ev-13', dayNumber: 23, weekName: 'الأسبوع 4', title: 'كتابة سكريبت الفيديو الثاني مع تصحيح أخطاء الأول', category: 'script', status: 'pending' },
  { id: 'ev-14', dayNumber: 25, weekName: 'الأسبوع 4', title: 'تسجيل الصوت ومونتاج سريع مستفيداً من القوالب المحفوظة', category: 'edit', status: 'pending' },
  { id: 'ev-15', dayNumber: 28, weekName: 'الأسبوع 4', title: 'نشر الفيديو الثاني بانتظام ومقارنة الأداء', category: 'publish', status: 'pending' },
  { id: 'ev-16', dayNumber: 30, weekName: 'الأسبوع 4', title: 'مراجعة الشهر الأول وتثبيت تقويم الـ 4 فيديوهات القادمة', category: 'research', status: 'pending' }
];

export const FacelessThirtyDayCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    try {
      const saved = localStorage.getItem('faceless_calendar_events_v1');
      return saved ? JSON.parse(saved) : DEFAULT_EVENTS;
    } catch {
      return DEFAULT_EVENTS;
    }
  });

  const [newTitle, setNewTitle] = useState<string>('');
  const [newDay, setNewDay] = useState<number>(15);
  const [newCategory, setNewCategory] = useState<CalendarEvent['category']>('script');

  useEffect(() => {
    try {
      localStorage.setItem('faceless_calendar_events_v1', JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  }, [events]);

  const toggleEventStatus = (id: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== id) return ev;
        const nextStatus =
          ev.status === 'pending'
            ? 'in-progress'
            : ev.status === 'in-progress'
            ? 'completed'
            : 'pending';
        return { ...ev, status: nextStatus };
      })
    );
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const weekNumber = Math.ceil(newDay / 7);
    const newEv: CalendarEvent = {
      id: `custom-${Date.now()}`,
      dayNumber: newDay,
      weekName: `الأسبوع ${weekNumber}`,
      title: newTitle.trim(),
      category: newCategory,
      status: 'pending'
    };

    setEvents((prev) => [...prev, newEv].sort((a, b) => a.dayNumber - b.dayNumber));
    setNewTitle('');
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const resetCalendar = () => {
    if (window.confirm('هل تريد إعادة تعيين جدول الـ 30 يوماً؟')) {
      setEvents(DEFAULT_EVENTS);
    }
  };

  const completedCount = events.filter((e) => e.status === 'completed').length;
  const progressPercent = events.length > 0 ? Math.round((completedCount / events.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 via-zinc-900 to-zinc-950 p-5 sm:p-6 shadow-xl shadow-red-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-amber-500 text-black shadow-lg shadow-red-500/30">
              <Calendar className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/30 px-2.5 py-0.5 text-xs font-bold text-red-400">
                <Sparkles className="h-3 w-3" />
                <span>تقويم التخطيط وجدول النشر المستدام</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                تقويم محتوى 30 يوماً وتتبع خطة النشر
              </h2>
            </div>
          </div>
          <button
            onClick={resetCalendar}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-bold text-zinc-300 hover:text-white hover:bg-zinc-700 cursor-pointer transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>إعادة التعيين</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-3 border-t border-zinc-800">
          <div className="flex justify-between items-center text-xs font-bold mb-1.5">
            <span className="text-zinc-300">
              إنجاز خطة الشهر: {completedCount} من {events.length} مهمة مكتملة
            </span>
            <span className="font-mono text-emerald-400 text-sm font-black">
              {progressPercent}%
            </span>
          </div>
          <div className="h-2.5 w-full bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Add Custom Task Form */}
      <form onSubmit={handleAddEvent} className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="أضف مهمة جديدة للتقويم (مثلاً: تسجيل صوت فيديو الذكاء الاصطناعي)..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
        />
        <div className="flex items-center gap-2">
          <select
            value={newDay}
            onChange={(e) => setNewDay(Number(e.target.value))}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-2.5 py-2 text-xs font-bold text-white focus:border-red-500 focus:outline-none"
          >
            {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                اليوم {d}
              </option>
            ))}
          </select>
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as any)}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-2.5 py-2 text-xs font-bold text-white focus:border-red-500 focus:outline-none"
          >
            <option value="research">بحث</option>
            <option value="script">سكريبت</option>
            <option value="audio">صوت</option>
            <option value="edit">مونتاج</option>
            <option value="publish">نشر</option>
          </select>
          <button
            type="submit"
            className="rounded-lg bg-red-500 px-4 py-2 text-xs font-black text-black hover:bg-red-400 cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة</span>
          </button>
        </div>
      </form>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {events.map((ev) => {
          const isDone = ev.status === 'completed';
          const isInProgress = ev.status === 'in-progress';

          return (
            <div
              key={ev.id}
              className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-zinc-300'
                  : isInProgress
                  ? 'bg-amber-950/20 border-amber-500/40 text-white'
                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-200'
              }`}
            >
              <div
                onClick={() => toggleEventStatus(ev.id)}
                className="flex items-start gap-3 flex-1 cursor-pointer"
              >
                <div
                  className={`h-5 w-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                      : isInProgress
                      ? 'bg-amber-500 text-black font-bold'
                      : 'border border-zinc-700 bg-zinc-950 text-transparent'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-amber-300 font-bold">
                      اليوم {ev.dayNumber} · {ev.weekName}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                        isDone
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : isInProgress
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {isDone ? 'مكتمل' : isInProgress ? 'قيد العمل' : 'معلق'}
                    </span>
                  </div>
                  <div className={`text-xs sm:text-sm font-bold ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                    {ev.title}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDeleteEvent(ev.id)}
                className="text-zinc-400 hover:text-red-400 p-1 rounded-md transition-colors cursor-pointer"
                title="حذف المهمة"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
