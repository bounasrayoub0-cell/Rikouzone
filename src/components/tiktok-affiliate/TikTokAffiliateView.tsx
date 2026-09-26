import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Home, 
  CheckCircle2, 
  Circle, 
  ArrowLeft, 
  ArrowRight, 
  Copy, 
  Check, 
  Flame, 
  Video, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink, 
  HelpCircle, 
  Layers, 
  Calendar, 
  RotateCcw,
  DollarSign,
  Clock,
  Award
} from 'lucide-react';
import { 
  tiktokBasicsLessons, 
  tiktokProductCriteria, 
  tiktokContentSources, 
  tiktokContentTemplates, 
  readyTikTokHooks, 
  tiktokConversionGuides, 
  tiktokFunnelStages, 
  tiktokMistakesData, 
  tiktokSevenDayPlan,
  TikTokLesson,
  TikTokTemplate
} from '../../data/tiktokAffiliateData';
import { TikTokAffiliateCalculators } from './TikTokAffiliateCalculators';

interface TikTokAffiliateViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const TT_TASKS_STORAGE_KEY = 'rikouzone_tiktok_affiliate_tasks';
const TT_READ_LESSONS_KEY = 'rikouzone_tiktok_read_lessons';

export const TikTokAffiliateView: React.FC<TikTokAffiliateViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  // Navigation & Scroll refs
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // 1. Basics lessons tab
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [readLessons, setReadLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(TT_READ_LESSONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 2. Action Plan Checkbox State
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(TT_TASKS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return [];
    }
  });

  const [activePlanDay, setActivePlanDay] = useState<number>(1);

  // Template copied tracking
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);
  const [copiedHookId, setCopiedHookId] = useState<string | null>(null);

  // Template category filter
  const [selectedTplFilter, setSelectedTplFilter] = useState<string>('all');

  // Hooks category filter
  const [selectedHookFilter, setSelectedHookFilter] = useState<string>('all');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(TT_READ_LESSONS_KEY, JSON.stringify(readLessons));
    } catch (e) {
      console.warn('Failed to save read lessons:', e);
    }
  }, [readLessons]);

  useEffect(() => {
    try {
      localStorage.setItem(TT_TASKS_STORAGE_KEY, JSON.stringify(completedTasks));
    } catch (e) {
      console.warn('Failed to save action tasks:', e);
    }
  }, [completedTasks]);

  const currentLesson = tiktokBasicsLessons[activeLessonIndex];

  useEffect(() => {
    if (currentLesson && !readLessons.includes(currentLesson.id)) {
      setReadLessons(prev => [...prev, currentLesson.id]);
    }
  }, [activeLessonIndex]);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  // Progress metrics
  const allTasks = tiktokSevenDayPlan.flatMap(d => d.tasks);
  const doneTasksCount = allTasks.filter(t => !!completedTasks[t.id]).length;
  const planProgress = Math.round((doneTasksCount / allTasks.length) * 100);

  const filteredTemplates = selectedTplFilter === 'all'
    ? tiktokContentTemplates
    : tiktokContentTemplates.filter(t => t.type === selectedTplFilter);

  const filteredHooks = selectedHookFilter === 'all'
    ? readyTikTokHooks
    : readyTikTokHooks.filter(h => h.category === selectedHookFilter);

  const handleCopyTpl = (tpl: TikTokTemplate) => {
    onCopyText(tpl.templateText, `تم نسخ "${tpl.title}" بنجاح!`);
    setCopiedTemplateId(tpl.id);
    setTimeout(() => setCopiedTemplateId(null), 2500);
  };

  const handleCopyHook = (text: string, id: string) => {
    onCopyText(text, 'تم نسخ الهوك بنجاح!');
    setCopiedHookId(id);
    setTimeout(() => setCopiedHookId(null), 2000);
  };

  const navJumpList = [
    { id: 'sec-basics', label: '1. الأساسيات' },
    { id: 'sec-products', label: '2. اختيار المنتجات' },
    { id: 'sec-ideas', label: '3. أفكار المحتوى' },
    { id: 'sec-templates', label: '4. قوالب المحتوى' },
    { id: 'sec-hooks', label: '5. Hooks جاهزين' },
    { id: 'sec-clicks', label: '6. تحويل لـ Clicks' },
    { id: 'sec-funnel', label: '7. تحليل النتائج' },
    { id: 'sec-mistakes', label: '8. الأخطاء الشائعة' },
    { id: 'sec-plan', label: '9. خطة 7 أيام' },
    { id: 'sec-tools', label: '10. الأدوات' },
  ];

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 pb-24" dir="rtl">
      
      {/* ------------------------------------------------------------- */}
      {/* HERO / INTRODUCTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-zinc-800/80 bg-gradient-to-b from-amber-500/10 via-zinc-950 to-[#060608] pt-8 pb-14">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-amber-500/15 blur-[120px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-6 flex-wrap">
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Home className="h-3.5 w-3.5 text-zinc-500" />
              <span>الرئيسية</span>
            </button>
            <ChevronLeft className="h-3.5 w-3.5 text-zinc-600" />
            <button 
              onClick={() => onNavigate('income')} 
              className="hover:text-white transition-colors"
            >
              مسارات الدخل
            </button>
            <ChevronLeft className="h-3.5 w-3.5 text-zinc-600" />
            <span className="font-bold text-amber-400">أفلييت تيك توك (TikTok Affiliate)</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-black text-amber-400 shadow-sm shadow-amber-500/10">
                  <Flame className="h-3.5 w-3.5" />
                  <span>دليل تيك توك أفيلييت العملي 2026</span>
                </span>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                  TikTok Shop + روابط البايو
                </span>
                <span className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400">
                  بالهاتف فقط وبدون رأس مال
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans">
                أفلييت تيك توك
              </h1>

              <h2 className="text-xl sm:text-2xl font-bold text-amber-400">
                من الصفر إلى أول فيديو ورابط شغال ومبيعات حقيقية
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                دليل كامل وتطبيقي لصناعة المحتوى الترويجي على تيك توك. تعلم كيفية اختيار المنتجات ذات التأثير البصري، كتابة الهوكات الخاطفة لأول ثانيتين، استخدام القوالب الجاهزة للنسخ، وتطبيق خطة الـ 7 أيام بالهاتف فقط.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => scrollToSection('sec-basics')}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3.5 text-sm font-black text-black shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-orange-400 transition-all active:scale-95"
                >
                  <span>ابدأ بالأساسيات (القسم 1)</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={() => scrollToSection('sec-templates')}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 px-5 py-3.5 text-sm font-bold text-zinc-200 hover:border-amber-500/40 hover:text-white transition-all"
                >
                  <Copy className="h-4 w-4 text-amber-400" />
                  <span>قوالب الفيديوهات والـ Hooks</span>
                </button>
              </div>
            </div>

            {/* Quick Progress Box */}
            <div className="lg:col-span-4 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                <span className="text-xs font-bold text-zinc-400">مؤشر الإنجاز بخطة 7 أيام</span>
                <span className="text-xs font-mono font-bold text-amber-400">{planProgress}% مكتمل</span>
              </div>

              <div className="mt-3 w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800/60">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                  style={{ width: `${planProgress}%` }}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs text-center">
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3">
                  <span className="text-[10px] text-zinc-500 font-medium block">أقسام الدليل</span>
                  <span className="text-lg font-black text-white font-mono mt-0.5 block">10 أقسام</span>
                </div>
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3">
                  <span className="text-[10px] text-zinc-500 font-medium block">قوالب للنسخ</span>
                  <span className="text-lg font-black text-amber-400 font-mono mt-0.5 block">6 قوالب</span>
                </div>
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3">
                  <span className="text-[10px] text-zinc-500 font-medium block">Hooks جاهزة</span>
                  <span className="text-lg font-black text-orange-400 font-mono mt-0.5 block">12 هوك</span>
                </div>
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3">
                  <span className="text-[10px] text-zinc-500 font-medium block">مهام الخطة</span>
                  <span className="text-lg font-black text-emerald-400 font-mono mt-0.5 block">{doneTasksCount}/{allTasks.length}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>تحديث مستمر لسنة 2026</span>
                <span className="text-amber-400 font-bold">بدون وعود وهمية ✓</span>
              </div>
            </div>

          </div>

          {/* Quick jump navigation */}
          <div className="mt-10 pt-6 border-t border-zinc-800/80">
            <span className="text-xs font-bold text-zinc-400 block mb-3">
              التنقل السريع بين أقسام أفلييت تيك توك الـ 10:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {navJumpList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-xs font-medium text-zinc-300 hover:border-amber-500/40 hover:text-white transition-all whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-20">

        {/* ------------------------------------------------------------- */}
        {/* 1. الأساسيات */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-basics"
          ref={(el) => { sectionRefs.current['sec-basics'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>1. الأساسيات</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                فهم آلية العمل وأرباح أفلييت تيك توك
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                ما هو تيك توك أفيلييت، كيف يعمل النظام، حساب العمولات، ومتطلبات البدء حسب منطقتك.
              </p>
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              الدرس {activeLessonIndex + 1} من {tiktokBasicsLessons.length}
            </div>
          </div>

          {/* Lessons Horizontal Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {tiktokBasicsLessons.map((l, idx) => {
              const isSelected = activeLessonIndex === idx;
              const isDone = readLessons.includes(l.id);

              return (
                <button
                  key={l.id}
                  onClick={() => setActiveLessonIndex(idx)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap border ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                      : isDone
                      ? 'border-zinc-800 bg-zinc-900/80 text-zinc-200'
                      : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{idx + 1}.</span>
                  <span>{l.title}</span>
                  {isDone && <CheckCircle2 className={`h-3.5 w-3.5 ${isSelected ? 'text-black' : 'text-emerald-400'}`} />}
                </button>
              );
            })}
          </div>

          {/* Active Lesson Display */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800/80">
              <div>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md">
                  الدرس #{activeLessonIndex + 1}
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-black text-white">
                  {currentLesson.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  {currentLesson.shortDesc}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-300 shrink-0 hidden sm:block">
                القاعدة الذهبية
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 text-xs font-semibold text-amber-200 flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-400 block mb-0.5">الخلاصة المباشرة:</strong>
                <span>{currentLesson.keyTakeaway}</span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
              {currentLesson.content.map((p, pIdx) => (
                <p key={pIdx} className="bg-zinc-950/40 p-3.5 rounded-2xl border border-zinc-900">
                  {p}
                </p>
              ))}
            </div>

            {currentLesson.practicalExample && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-300">
                <span className="font-bold text-emerald-400 block mb-1">💡 مثال عملي من أرقام تيك توك:</span>
                <p className="leading-relaxed text-zinc-300">{currentLesson.practicalExample}</p>
              </div>
            )}

            {currentLesson.warning && (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300 flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{currentLesson.warning}</span>
              </div>
            )}

            {/* Prev / Next buttons */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <button
                onClick={() => setActiveLessonIndex(prev => Math.max(0, prev - 1))}
                disabled={activeLessonIndex === 0}
                className="flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ArrowRight className="h-4 w-4" />
                <span>الدرس السابق</span>
              </button>

              {activeLessonIndex < tiktokBasicsLessons.length - 1 ? (
                <button
                  onClick={() => setActiveLessonIndex(prev => Math.min(tiktokBasicsLessons.length - 1, prev + 1))}
                  className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
                >
                  <span>الدرس التالي</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => scrollToSection('sec-products')}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-black hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                >
                  <span>انتقل لاختيار المنتجات (القسم 2)</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 2. اختيار المنتجات */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-products"
          ref={(el) => { sectionRefs.current['sec-products'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>2. اختيار المنتجات</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                كيف تختار وتقارن المنتجات الرابحة في تيك توك؟
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                معايير المنتج المناسب لخوارزمية تيك توك، نطاق الأسعار المثالي، ونسبة العمولة المجزية.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tiktokProductCriteria.map((crit) => (
              <div
                key={crit.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white font-mono bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
                      معيار أساسي
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      crit.weight === 'ضروري جداً'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {crit.weight}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-white">
                    {crit.title}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                    {crit.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-2 text-[11px]">
                  <div className="text-emerald-400">
                    <span className="font-bold">المعيار المثالي: </span>
                    <span className="text-zinc-300">{crit.idealStandard}</span>
                  </div>
                  <div className="text-rose-400">
                    <span className="font-bold">تجنب: </span>
                    <span className="text-zinc-400">{crit.dangerSign}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick jump to product checklist tool */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0" />
              <span className="text-xs text-zinc-200 font-medium">
                هل لديك منتج معين وتريد فحصه الآن بنقرة واحدة عبر أداة التدقيق التفاعلية؟
              </span>
            </div>
            <button
              onClick={() => scrollToSection('sec-tools')}
              className="shrink-0 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
            >
              افتح فاحص المنتجات التفاعلي
            </button>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 3. البحث عن أفكار المحتوى */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-ideas"
          ref={(el) => { sectionRefs.current['sec-ideas'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>3. البحث عن أفكار المحتوى</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                من أين تأتي بأفكار فيديوهات فيروسية للمنتج؟
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                استخراج الأفكار من TikTok Creative Center، تعليقات المشترين الحقيقيين، وتحويل خصائص المنتج إلى زوايا سينمائية تبيع.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tiktokContentSources.map((src, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    {src.title}
                  </h3>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    طريقة معتمدة
                  </span>
                </div>

                <div className="text-xs text-zinc-400 font-mono">
                  المصدر: <span className="text-zinc-200">{src.source}</span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-3 rounded-2xl border border-zinc-800/80">
                  {src.howToUse}
                </p>

                <div className="pt-2 border-t border-zinc-800/60 text-xs text-emerald-400">
                  <strong className="text-emerald-400">مثال تطبيقي: </strong>
                  <span className="text-zinc-300">{src.example}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 4. صناعة المحتوى — قوالب جاهزة للنسخ */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-templates"
          ref={(el) => { sectionRefs.current['sec-templates'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>4. صناعة المحتوى (قوالب جاهزة للنسخ)</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                6 قوالب وسكربتات تيك توك عملية قابلة للنسخ
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Hook، Product Demo، Review، Comparison، Problem → Solution، و Top Products مع زر نسخ مباشر.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'جميع القوالب (6)' },
              { id: 'Hook', label: 'Hook خاطف' },
              { id: 'Product Demo', label: 'عرض عملي' },
              { id: 'Review', label: 'مراجعة صريحة' },
              { id: 'Comparison', label: 'مقارنة حاسمة' },
              { id: 'Problem Solution', label: 'مشكلة وحل' },
              { id: 'Top Products', label: 'أفضل 3 منتجات' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedTplFilter(f.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                  selectedTplFilter === f.id
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredTemplates.map((tpl) => {
              const isCopied = copiedTemplateId === tpl.id;

              return (
                <div
                  key={tpl.id}
                  className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-xl group hover:border-amber-500/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-amber-400">
                          <Video className="h-4 w-4" />
                        </span>
                        <span className="rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
                          {tpl.typeAr}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
                          {tpl.duration}
                        </span>
                        <button
                          onClick={() => handleCopyTpl(tpl)}
                          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                            isCopied
                              ? 'bg-emerald-500 text-black'
                              : 'border border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-amber-500/40 hover:text-amber-400'
                          }`}
                        >
                          {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{isCopied ? 'تم النسخ!' : 'نسخ القالب'}</span>
                        </button>
                      </div>
                    </div>

                    <h3 className="mt-4 text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                      {tpl.title}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                      {tpl.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80">
                      <span className="text-[11px] font-bold text-zinc-500 block mb-2">توزيع ثواني الفيديو:</span>
                      <div className="space-y-1 text-xs text-zinc-300">
                        {tpl.structure.map((item, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pre box */}
                    <div className="mt-4 relative">
                      <div className="flex items-center justify-between bg-zinc-950 px-3.5 py-2 rounded-t-xl border-t border-x border-zinc-800 text-[11px] text-zinc-400">
                        <span className="font-mono">نص السكربت للتصوير:</span>
                        <button
                          onClick={() => handleCopyTpl(tpl)}
                          className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                        >
                          <Copy className="h-3 w-3" />
                          <span>نسخ</span>
                        </button>
                      </div>
                      <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap rounded-b-xl border border-zinc-800 bg-zinc-950/90 p-3.5 text-xs font-mono text-zinc-200 leading-relaxed selection:bg-amber-500 selection:text-black scrollbar-thin">
                        {tpl.templateText}
                      </pre>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-amber-300 flex items-start gap-2 bg-amber-500/5 p-3 rounded-2xl border border-amber-500/10">
                    <Sparkles className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                    <span><strong>نصيحة التصوير:</strong> {tpl.tips}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 5. Hooks جاهزين للتطبيق الفوري */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-hooks"
          ref={(el) => { sectionRefs.current['sec-hooks'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>5. Hooks جاهزين لتيك توك</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                12 هوك ناري مجرب يخطف انتباه المشاهد في أول ثانيتين
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                مقسمة حسب الهدف: فضول وصدمة، سر وبديل رخيص، تحذير وتوفير، وتحدي وتجربة. قابلة للنسخ بنقرة واحدة.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'جميع الهوكات (12)' },
              { id: 'فضول وصدمة', label: 'فضول وصدمة' },
              { id: 'سر وبديل رخيص', label: 'سر وبديل رخيص' },
              { id: 'تحذير وتوفير', label: 'تحذير وتوفير' },
              { id: 'تحدي وتجربة', label: 'تحدي وتجربة' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedHookFilter(f.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                  selectedHookFilter === f.id
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHooks.map((h) => {
              const isCopied = copiedHookId === h.id;

              return (
                <div
                  key={h.id}
                  onClick={() => handleCopyHook(h.hookText, h.id)}
                  className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-amber-500/40 hover:bg-zinc-900/80 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                      {h.category}
                    </span>
                    <p className="mt-2 text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      "{h.hookText}"
                    </p>
                    <span className="mt-1 text-[11px] text-zinc-500 block">
                      أنسب استخدام: {h.bestUsedFor}
                    </span>
                  </div>

                  <button
                    className={`p-2.5 rounded-xl border transition-all shrink-0 ${
                      isCopied
                        ? 'bg-emerald-500 text-black border-emerald-400'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 group-hover:text-white group-hover:border-zinc-700'
                    }`}
                  >
                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 6. تحويل المشاهدات إلى Clicks */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-clicks"
          ref={(el) => { sectionRefs.current['sec-clicks'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>6. تحويل المشاهدات إلى Clicks</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                كيف تجعل المشاهد يضغط ويشتري؟ (CTA والروابط والإفصاح)
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                طريقة تقديم العرض، التوجيه للسلة الصفراء أو البايو، والإفصاح القانوني لحماية الحساب من التقييد.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tiktokConversionGuides.map((guide, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-3">
                    {guide.title}
                  </h3>

                  <ul className="space-y-2 text-xs text-zinc-300">
                    {guide.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-800 text-[11px] text-emerald-400 bg-emerald-500/5 p-3 rounded-2xl border border-emerald-500/10">
                  <strong className="block mb-0.5 text-emerald-300">الخلاصة العملية:</strong>
                  <span>{guide.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 7. تحليل النتائج (The Funnel) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-funnel"
          ref={(el) => { sectionRefs.current['sec-funnel'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>7. تحليل النتائج</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                قمع مبيعات تيك توك: من المشاهدة إلى العمولة الصافية
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Views → Engagement → Clicks → Conversions → Commission وكيف تحدد بدقة أين المشكلة في فيديوهاتك.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {tiktokFunnelStages.map((stage, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {stage.stageAr} ({stage.stage})
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400">
                    <strong className="text-zinc-300">المؤشر المحسوب: </strong>{stage.metric}
                  </p>
                  <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                    <strong className="text-amber-400">طريقة التحسين: </strong>{stage.howToImprove}
                  </p>
                </div>

                <div className="rounded-xl bg-zinc-950 p-3 border border-zinc-800 text-xs shrink-0 text-left rtl:text-right">
                  <span className="text-[10px] text-zinc-500 block">المعدل النموذجي:</span>
                  <span className="font-mono font-bold text-emerald-400">{stage.benchmark}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 8. الأخطاء الشائعة */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-mistakes"
          ref={(el) => { sectionRefs.current['sec-mistakes'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>8. الأخطاء الشائعة</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                5 فخاخ قاتلة تجعل 80% من المبتدئين يفشلون في تيك توك
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                بطاقات واضحة توضح الخطأ، النتيجة الكارثية على الحساب، والحل البديل الصحيح.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tiktokMistakesData.map((m) => (
              <div
                key={m.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between hover:border-rose-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      خطأ شائع
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      {m.category}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-white">
                    {m.title}
                  </h3>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/80 text-zinc-300">
                      <strong className="text-zinc-400 block mb-0.5">ماذا يفعل المبتدئ:</strong>
                      <span>{m.mistake}</span>
                    </div>

                    <div className="bg-rose-500/5 p-3 rounded-xl border border-rose-500/20 text-rose-300">
                      <strong className="block mb-0.5">النتيجة:</strong>
                      <span>{m.consequence}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-emerald-400">
                  <strong className="block mb-0.5">الحل الصحيح:</strong>
                  <span className="text-zinc-300">{m.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 9. خطة 7 أيام تفاعلية */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-plan"
          ref={(el) => { sectionRefs.current['sec-plan'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>9. خطة 7 أيام العملية</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                خطة التطبيق خطوة بخطوة بالهاتف فقط
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                من إعداد الحساب، مروراً باختيار 3 منتجات وتصوير أول فيديو، حتى نشر العرض وقراءة الإحصائيات.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-left rtl:text-right">
                <div className="text-xs text-zinc-400 font-medium">إنجاز الخطة</div>
                <div className="text-xl font-black text-amber-400 font-mono">
                  {doneTasksCount} / {allTasks.length} ({planProgress}%)
                </div>
              </div>
              {doneTasksCount > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('هل تريد تصفير مهام خطة الـ 7 أيام؟')) {
                      setCompletedTasks({});
                    }
                  }}
                  className="p-2 rounded-xl border border-zinc-800 text-zinc-500 hover:text-white"
                  title="تصفير الخطة"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Days buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {tiktokSevenDayPlan.map((d) => {
              const dayTasks = d.tasks;
              const isAllDone = dayTasks.every(t => !!completedTasks[t.id]);
              const isSelected = activePlanDay === d.dayNumber;

              return (
                <button
                  key={d.dayNumber}
                  onClick={() => setActivePlanDay(d.dayNumber)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap border ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                      : isAllDone
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                      : 'border-zinc-800 bg-zinc-950/80 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>اليوم {d.dayNumber}</span>
                  {isAllDone ? (
                    <CheckCircle2 className={`h-4 w-4 ${isSelected ? 'text-black' : 'text-emerald-400'}`} />
                  ) : (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isSelected ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {dayTasks.filter(t => !!completedTasks[t.id]).length}/{dayTasks.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Day Card */}
          {(() => {
            const currentDay = tiktokSevenDayPlan.find(d => d.dayNumber === activePlanDay) || tiktokSevenDayPlan[0];

            return (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md">
                      خطة اليوم {currentDay.dayNumber}
                    </span>
                    <h3 className="mt-2 text-xl font-black text-white">
                      {currentDay.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-300">
                      <strong>الهدف: </strong>{currentDay.objective}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900 px-3.5 py-2 rounded-xl border border-zinc-800 shrink-0">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span>الوقت المقدر: {currentDay.estimatedTime}</span>
                  </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-zinc-400 block">مهام اليوم (اضغط على المهمة بعد إكمالها):</span>
                  {currentDay.tasks.map((task) => {
                    const isDone = !!completedTasks[task.id];

                    return (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                          isDone
                            ? 'border-emerald-500/50 bg-emerald-500/5 text-zinc-200 shadow-sm'
                            : 'border-zinc-800/80 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-400/20" />
                          ) : (
                            <Circle className="h-5 w-5 text-zinc-600" />
                          )}
                        </div>

                        <div>
                          <h4 className={`text-sm font-bold ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>
                            {task.text}
                          </h4>
                          <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                            {task.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-start gap-3 text-xs text-zinc-300">
                  <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-400 block mb-0.5">نصيحة ذهبية لهذا اليوم:</strong>
                    <span>{currentDay.proTip}</span>
                  </div>
                </div>

                {/* Day Navigation */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setActivePlanDay(prev => Math.max(1, prev - 1))}
                    disabled={activePlanDay === 1}
                    className="flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span>اليوم السابق</span>
                  </button>

                  {activePlanDay < 7 ? (
                    <button
                      onClick={() => setActivePlanDay(prev => Math.min(7, prev + 1))}
                      className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
                    >
                      <span>اليوم التالي</span>
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                      <Award className="h-4 w-4" />
                      <span>أكملت الخطة بالكامل! استمر في تصوير فيديو يومياً</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 10. الأدوات التفاعلية */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-tools"
          ref={(el) => { sectionRefs.current['sec-tools'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>10. الأدوات التفاعلية</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                أدوات تيك توك أفيلييت: فاحص المنتجات، مولد الهوكات، وحاسبة الأرباح
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                أدوات برمجية عملية مدمجة لحساب العمولات، توليد أفكار المحتوى، واختبار المنتجات.
              </p>
            </div>
          </div>

          {/* Interactive tools component */}
          <TikTokAffiliateCalculators onCopyText={onCopyText} />
        </section>

        {/* Bottom CTA Banner */}
        <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-zinc-950 to-orange-500/10 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 h-40 w-96 rounded-full bg-amber-500/20 blur-3xl" />
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400">
              <Flame className="h-4 w-4" />
              <span>جاهز لتصوير أول فيديو أفيلييت؟</span>
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              اختر منتجك اليوم، انسخ أحد القوالب، وانشر أول فيديو
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              تذكر دائماً: تيك توك لا يحتاج استوديو احترافي، بل يحتاج إلى هوك صادم وعرض مباشر للنتيجة واستمرارية لـ 30 يوماً متواصلة.
            </p>

            <div className="pt-3 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => scrollToSection('sec-plan')}
                className="flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-3 text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition-all active:scale-95"
              >
                <span>ابدأ خطة الـ 7 أيام الآن</span>
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigate('income')}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-xs sm:text-sm font-bold text-zinc-300 hover:text-white transition-all"
              >
                استكشاف باقي المسارات
              </button>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
};
