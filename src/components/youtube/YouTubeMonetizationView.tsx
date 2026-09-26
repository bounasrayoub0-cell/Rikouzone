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
  Youtube, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink, 
  HelpCircle, 
  Layers, 
  Calendar, 
  RotateCcw,
  Clock,
  Award,
  Video,
  Eye,
  Mail,
  Users,
  FileText
} from 'lucide-react';
import { 
  youtubeBasicsLessons, 
  yppConditionsData, 
  yppApplicationSteps, 
  rejectionReasonsData, 
  nicheRPMData, 
  contentStrategyComparisons, 
  youtubeTemplatesData, 
  sponsorshipGuides, 
  youtubeAnalyticsData, 
  youtubeThirtyDayPlan, 
  youtubeMistakesData,
  YouTubeLesson,
  YouTubeTemplate
} from '../../data/youtubeMonetizationData';
import { YouTubeCalculators } from './YouTubeCalculators';

interface YouTubeMonetizationViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const YT_TASKS_KEY = 'rikouzone_youtube_action_tasks';
const YT_READ_LESSONS_KEY = 'rikouzone_youtube_read_lessons';

export const YouTubeMonetizationView: React.FC<YouTubeMonetizationViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // 1. Basics Lessons State
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [readLessons, setReadLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(YT_READ_LESSONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 2. 30-Day Action Plan State
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(YT_TASKS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return [];
    }
  });
  const [activeWeekNumber, setActiveWeekNumber] = useState<number>(1);

  // 3. Template filter & copied state
  const [selectedTplCategory, setSelectedTplCategory] = useState<string>('all');
  const [copiedTplId, setCopiedTplId] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(YT_READ_LESSONS_KEY, JSON.stringify(readLessons));
    } catch (e) {
      console.warn('Failed to save read lessons:', e);
    }
  }, [readLessons]);

  useEffect(() => {
    try {
      localStorage.setItem(YT_TASKS_KEY, JSON.stringify(completedTasks));
    } catch (e) {
      console.warn('Failed to save action plan tasks:', e);
    }
  }, [completedTasks]);

  const currentLesson = youtubeBasicsLessons[activeLessonIndex];

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

  const allTasks = youtubeThirtyDayPlan.flatMap(w => w.tasks);
  const doneTasksCount = allTasks.filter(t => !!completedTasks[t.id]).length;
  const planProgress = Math.round((doneTasksCount / allTasks.length) * 100);

  const filteredTemplates = selectedTplCategory === 'all'
    ? youtubeTemplatesData
    : youtubeTemplatesData.filter(t => t.category === selectedTplCategory);

  const handleCopyTemplate = (tpl: YouTubeTemplate) => {
    onCopyText(tpl.templateText, `تم نسخ "${tpl.title}" بنجاح!`);
    setCopiedTplId(tpl.id);
    setTimeout(() => setCopiedTplId(null), 2500);
  };

  const navJumpList = [
    { id: 'sec-basics', label: '1. الأساسيات' },
    { id: 'sec-approval', label: '2. تفعيل الربح' },
    { id: 'sec-rpm', label: '3. أرباح AdSense' },
    { id: 'sec-niche', label: '4. اختيار المحتوى' },
    { id: 'sec-templates', label: '5. صناعة المحتوى' },
    { id: 'sec-sponsorships', label: '6. الرعايات' },
    { id: 'sec-mediakit', label: '7. Media Kit' },
    { id: 'sec-analytics', label: '8. تحليلات YouTube' },
    { id: 'sec-plan', label: '9. خطة 30 يوم' },
    { id: 'sec-mistakes', label: '10. الأخطاء الشائعة' },
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
            <span className="font-bold text-amber-400">تحقيق الدخل من يوتيوب (AdSense & Sponsorships)</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-black text-amber-400 shadow-sm shadow-amber-500/10">
                  <Youtube className="h-3.5 w-3.5 text-red-500" />
                  <span>دليل بناء الأصول الرقمية لعام 2026</span>
                </span>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                  إعلانات ادسنس + رعايات الشركات
                </span>
                <span className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400">
                  دخل سلبي متراكم ومستمر
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans">
                تحقيق الدخل من يوتيوب
              </h1>

              <h2 className="text-xl sm:text-2xl font-bold text-amber-400">
                من الصفر إلى شروط YPP وأرباح AdSense ورعايات الشركات
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                مسار تطبيقي شامل للمبتدئين والمطورين: فهم خوارزمية يوتيوب، شروط الـ 4000 ساعة و 1000 مشترك، استيعاب مقاييس الـ RPM الحقيقية، قوالب السكربتات والعناوين الجاهزة، وأداة Media Kit تفاعلية لمراسلة الشركات، مع خطة 30 يوماً خطوة بخطوة.
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
                  onClick={() => scrollToSection('sec-rpm')}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 px-5 py-3.5 text-sm font-bold text-zinc-200 hover:border-amber-500/40 hover:text-white transition-all"
                >
                  <DollarSign className="h-4 w-4 text-amber-400" />
                  <span>حاسبة أرباح الـ RPM و AdSense</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Card */}
            <div className="lg:col-span-4 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                <span className="text-xs font-bold text-zinc-400">مؤشر إنجاز خطة الـ 30 يوماً</span>
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
                  <span className="text-[10px] text-zinc-500 font-medium block">شروط YPP</span>
                  <span className="text-lg font-black text-amber-400 font-mono mt-0.5 block">1k + 4k hrs</span>
                </div>
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3">
                  <span className="text-[10px] text-zinc-500 font-medium block">قوالب للنسخ</span>
                  <span className="text-lg font-black text-orange-400 font-mono mt-0.5 block">6 قوالب</span>
                </div>
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3">
                  <span className="text-[10px] text-zinc-500 font-medium block">مهام الخطة</span>
                  <span className="text-lg font-black text-emerald-400 font-mono mt-0.5 block">{doneTasksCount}/{allTasks.length}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>معلومات يوتيوب الرسمية</span>
                <span className="text-amber-400 font-bold">بدون أرباح وهمية ✓</span>
              </div>
            </div>

          </div>

          {/* Quick jump navigation */}
          <div className="mt-10 pt-6 border-t border-zinc-800/80">
            <span className="text-xs font-bold text-zinc-400 block mb-3">
              التنقل السريع بين أقسام يوتيوب الـ 10:
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

      {/* Main Roadmap Container */}
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
                كيف يعمل تحقيق الدخل من YouTube ومصادر الأرباح
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                كيفية تقاسم الأرباح مع جوجل، الفرق بين AdSense و Sponsorships، برنامج YPP، ومصطلحات Views و RPM و CPM.
              </p>
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              الدرس {activeLessonIndex + 1} من {youtubeBasicsLessons.length}
            </div>
          </div>

          {/* Lessons Horizontal Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {youtubeBasicsLessons.map((l, idx) => {
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
                <span className="font-bold text-emerald-400 block mb-1">💡 مثال عملي من أرقام يوتيوب:</span>
                <p className="leading-relaxed text-zinc-300">{currentLesson.practicalExample}</p>
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

              {activeLessonIndex < youtubeBasicsLessons.length - 1 ? (
                <button
                  onClick={() => setActiveLessonIndex(prev => Math.min(youtubeBasicsLessons.length - 1, prev + 1))}
                  className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
                >
                  <span>الدرس التالي</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => scrollToSection('sec-approval')}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-black hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                >
                  <span>انتقل لشروط وتفعيل الربح (القسم 2)</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 2. تفعيل الربح والشروط الرسمية */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-approval"
          ref={(el) => { sectionRefs.current['sec-approval'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>2. تفعيل الربح (YPP Approval Guide)</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                متطلبات الأهلية، ربط AdSense، وأسباب الرفض الشائعة
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                الشروط الرسمية المحدثة ليوتيوب، خطوات تقديم الطلب بالترتيب، وكيف تتجنب فخ المحتوى المعاد استخدامه.
              </p>
            </div>
          </div>

          {/* 2 Tiers of YPP Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {yppConditionsData.map((c, idx) => (
              <div 
                key={idx}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      {c.level}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-300">
                      شرط رسمي
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                      <span className="text-zinc-500 font-medium block">المشتركون المطلوبون:</span>
                      <span className="text-lg font-black text-white font-mono">{c.subscribers}</span>
                    </div>

                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                      <span className="text-zinc-500 font-medium block">ساعات / مشاهدات المشاهدة:</span>
                      <span className="text-xs text-zinc-200 font-semibold leading-relaxed mt-0.5 block">{c.watchRequirements}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-emerald-400">
                  <strong className="block mb-0.5">ما الذي تفتحه هذه المرحلة:</strong>
                  <span className="text-zinc-300">{c.unlocks}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Steps to apply */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-4">
              خطوات تقديم القناة لبرنامج شركاء يوتيوب (خطوة بخطوة):
            </h3>

            <div className="space-y-3">
              {yppApplicationSteps.map((step) => (
                <div 
                  key={step.stepNumber}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 text-xs"
                >
                  <span className="h-6 w-6 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">
                    {step.stepNumber}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    <p className="mt-0.5 text-zinc-300 leading-relaxed font-normal">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rejection reasons and fixes */}
          <div className="rounded-3xl border border-rose-500/30 bg-rose-500/5 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base mb-4">
              <AlertTriangle className="h-5 w-5" />
              <span>أشهر 4 أسباب لرفض القنوات وكيف تحلها قبل التقديم:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rejectionReasonsData.map((rej, idx) => (
                <div key={idx} className="bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800 text-xs space-y-2">
                  <h4 className="text-sm font-bold text-rose-300">{rej.title}</h4>
                  <p className="text-zinc-400 leading-relaxed">{rej.reason}</p>
                  <div className="pt-2 border-t border-zinc-800 text-emerald-400">
                    <strong>الحل الصحيح: </strong>
                    <span className="text-zinc-300">{rej.fix}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 3. فهم أرباح AdSense وحاسبة الـ RPM */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-rpm"
          ref={(el) => { sectionRefs.current['sec-rpm'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>3. فهم أرباح AdSense</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                Views → Monetized Views → RPM → Revenue
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                كيف تتحول المشاهدات إلى دولارات حقيقية مع جدول مقارنة متوسطات الـ RPM حسب التخصصات وحاسبة تفاعلية.
              </p>
            </div>
          </div>

          {/* RPM Benchmark Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nicheRPMData.map((item) => (
              <div 
                key={item.nicheId}
                className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex flex-col justify-between hover:border-amber-500/40 transition-all"
              >
                <div>
                  <h4 className="text-base font-bold text-white mb-2">{item.name}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">{item.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 block">RPM العربي التقريبي</span>
                      <span className="text-sm font-black text-amber-400 font-mono mt-0.5 block">{item.avgRPMAr}</span>
                    </div>

                    <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 block">RPM العالمي/الخليج</span>
                      <span className="text-sm font-black text-emerald-400 font-mono mt-0.5 block">{item.avgRPMGlobal}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                  <strong className="text-zinc-300">سرعة تحقيق الدخل: </strong>{item.monetizationSpeed}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Calculator Component */}
          <YouTubeCalculators onCopyText={onCopyText} />
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 4. اختيار محتوى القناة واستراتيجية النمو */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-niche"
          ref={(el) => { sectionRefs.current['sec-niche'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>4. اختيار محتوى القناة</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                Long-form vs Shorts و Evergreen vs Trending
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                المعادلة المتوازنة بين المحتوى الذي يجلب المشتركين والمحتوى الذي يبني الدخل السلبي المستدام.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {contentStrategyComparisons.map((strat, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-3">
                    {strat.title}
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="bg-zinc-950 p-3 rounded-2xl border border-zinc-800">
                      <strong className="text-amber-400 block mb-1">الخيار الأول:</strong>
                      <p className="text-zinc-300 leading-relaxed">{strat.longFormPros}</p>
                    </div>

                    <div className="bg-zinc-950 p-3 rounded-2xl border border-zinc-800">
                      <strong className="text-orange-400 block mb-1">الخيار الثاني:</strong>
                      <p className="text-zinc-300 leading-relaxed">{strat.shortsPros}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-emerald-400 bg-emerald-500/5 p-3 rounded-2xl border border-emerald-500/10">
                  <strong className="block mb-0.5 text-emerald-300">الاستراتيجية الفائزة الموصى بها:</strong>
                  <span>{strat.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 5. صناعة المحتوى — قوالب قابلة للنسخ */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-templates"
          ref={(el) => { sectionRefs.current['sec-templates'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>5. صناعة المحتوى (قوالب قابلة للنسخ)</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                6 قوالب احترافية للـ Hooks والعناوين والوصف وجدول النشر
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                قوالب عملية مجربة ترفع معدل الاحتفاظ بالجمهور ونسبة النقر للظهور مع زر نسخ مباشر.
              </p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'جميع القوالب (6)' },
              { id: 'Video Hooks', label: 'هوكات الفيديو' },
              { id: 'Titles', label: 'صيغ العناوين' },
              { id: 'Descriptions', label: 'صندوق الوصف' },
              { id: 'CTA', label: 'نداء العمل (CTA)' },
              { id: 'Shorts Ideas', label: 'أفكار شورتس' },
              { id: 'Content Calendar', label: 'جدول النشر الشهري' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedTplCategory(f.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                  selectedTplCategory === f.id
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
              const isCopied = copiedTplId === tpl.id;

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
                          {tpl.categoryAr}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyTemplate(tpl)}
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

                    <h3 className="mt-4 text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                      {tpl.title}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                      {tpl.description}
                    </p>

                    {/* Pre box */}
                    <div className="mt-4 relative">
                      <div className="flex items-center justify-between bg-zinc-950 px-3.5 py-2 rounded-t-xl border-t border-x border-zinc-800 text-[11px] text-zinc-400">
                        <span className="font-mono">نص القالب:</span>
                        <button
                          onClick={() => handleCopyTemplate(tpl)}
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
                    <span><strong>نصيحة احترافية:</strong> {tpl.tips}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 6. الرعايات والتعاون مع الشركات (Sponsorships) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-sponsorships"
          ref={(el) => { sectionRefs.current['sec-sponsorships'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>6. الرعايات والشراكات (Brand Sponsorships)</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                كيف تحصل على أول رعاية مدفوعة وتتفاوض باحترافية؟
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                من إيجاد الشركات، مروراً بالتسعير العادل وصياغة العقد، حتى الالتزام بإفصاح الإعلانات المدفوعة.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sponsorshipGuides.map((guide, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                    {guide.summary}
                  </p>

                  <ul className="space-y-2 text-xs text-zinc-300">
                    {guide.steps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] text-emerald-400 bg-emerald-500/5 p-3 rounded-2xl border border-emerald-500/10">
                  <strong className="block mb-0.5 text-emerald-300">نصيحة ذهبية:</strong>
                  <span>{guide.keyAdvice}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 7. Media Kit */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-mediakit"
          ref={(el) => { sectionRefs.current['sec-mediakit'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>7. منشئ الـ Media Kit التفاعلي</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                بطاقة القناة التسويقية الاحترافية
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                املأ بياناتك في قسم الأدوات في الأعلى للحصول على ملف منسق يمكنك إرفاقه مع كل إيميل رعاية ترسله للشركات.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-amber-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">أداة Media Kit متوفرة وجاهزة للاستخدام</h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  تتيح لك تعديل اسم القناة، المشتركين، متوسط المشاهدات، والبريد الرسمي، ونسخها بصيغة نصية فوراً.
                </p>
              </div>
            </div>

            <button
              onClick={() => scrollToSection('sec-rpm')}
              className="shrink-0 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
            >
              افتح أداة الـ Media Kit الآن
            </button>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 8. YouTube Analytics */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-analytics"
          ref={(el) => { sectionRefs.current['sec-analytics'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>8. استوديو تحليلات يوتيوب (Analytics)</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                فك شفرة مقاييس النجاح: Views و CTR و AVD و RPM
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                كيف تقرأ الأرقام في استوديو يوتيوب لتعرف أين المشكلة في فيديوهاتك ولماذا توقفت المشاهدات أو الأرباح.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeAnalyticsData.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex flex-col justify-between hover:border-amber-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-amber-400" />
                      <span>{m.nameAr}</span>
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                      {m.name}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                    {m.whatItIs}
                  </p>

                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 text-xs mb-3">
                    <span className="text-[10px] text-zinc-500 block">المعدل المستهدف:</span>
                    <span className="font-mono font-bold text-emerald-400 text-xs">{m.targetBenchmark}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                  <strong className="text-amber-400">طريقة التحسين: </strong>
                  <span>{m.howToImprove}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 9. خطة الـ 30 يوماً (4 أسابيع تفاعلية) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-plan"
          ref={(el) => { sectionRefs.current['sec-plan'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>9. خطة 30 يوم العملية</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                خريطة الطريق من الصفر إلى إطلاق القناة والتحضير للربح
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                مقسمة إلى 4 أسابيع عملية: النيتش ← هندسة المحتوى ← النشر والتحليل ← الرعايات والتطوير.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-left rtl:text-right">
                <div className="text-xs text-zinc-400 font-medium">المهام المنجزة</div>
                <div className="text-xl font-black text-amber-400 font-mono">
                  {doneTasksCount} / {allTasks.length} ({planProgress}%)
                </div>
              </div>
              {doneTasksCount > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('هل تريد تصفير مهام خطة الـ 30 يوماً؟')) {
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

          {/* Week Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {youtubeThirtyDayPlan.map((w) => {
              const weekTasks = w.tasks;
              const isWeekDone = weekTasks.every(t => !!completedTasks[t.id]);
              const isSelected = activeWeekNumber === w.weekNumber;

              return (
                <button
                  key={w.weekNumber}
                  onClick={() => setActiveWeekNumber(w.weekNumber)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap border ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                      : isWeekDone
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                      : 'border-zinc-800 bg-zinc-950/80 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>الأسبوع {w.weekNumber} ({w.theme})</span>
                  {isWeekDone ? (
                    <CheckCircle2 className={`h-4 w-4 ${isSelected ? 'text-black' : 'text-emerald-400'}`} />
                  ) : (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isSelected ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {weekTasks.filter(t => !!completedTasks[t.id]).length}/{weekTasks.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Week Card */}
          {(() => {
            const currentWeek = youtubeThirtyDayPlan.find(w => w.weekNumber === activeWeekNumber) || youtubeThirtyDayPlan[0];

            return (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md">
                      الأسبوع {currentWeek.weekNumber} من أصل 4
                    </span>
                    <h3 className="mt-2 text-xl font-black text-white">
                      {currentWeek.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-300">
                      <strong>الهدف: </strong>{currentWeek.objective}
                    </p>
                  </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-zinc-400 block">مهام هذا الأسبوع (اضغط على المهمة بعد إكمالها):</span>
                  {currentWeek.tasks.map((task) => {
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
                    <strong className="text-amber-400 block mb-0.5">نصيحة الأسبوع الذهبية:</strong>
                    <span>{currentWeek.proTip}</span>
                  </div>
                </div>

                {/* Week Navigation */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setActiveWeekNumber(prev => Math.max(1, prev - 1))}
                    disabled={activeWeekNumber === 1}
                    className="flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span>الأسبوع السابق</span>
                  </button>

                  {activeWeekNumber < 4 ? (
                    <button
                      onClick={() => setActiveWeekNumber(prev => Math.min(4, prev + 1))}
                      className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
                    >
                      <span>الأسبوع التالي</span>
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                      <Award className="h-4 w-4" />
                      <span>أكملت خطة الشهر بنجاح! استمر في جدول النشر المنتظم</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 10. الأخطاء الشائعة */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-mistakes"
          ref={(el) => { sectionRefs.current['sec-mistakes'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>10. الأخطاء الشائعة</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                6 فخاخ قاتلة تجنبها لحماية قناتك من الحظر والموت البطيء
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                شراء المشتركين، نسخ المحتوى، الكليك بايت المضلل، وتجاهل الإفصاح عن الرعايات.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {youtubeMistakesData.map((m) => (
              <div
                key={m.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between hover:border-rose-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      فخ قاتل
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
                      <strong className="block mb-0.5">العواقب:</strong>
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

        {/* Bottom CTA Banner */}
        <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-zinc-950 to-orange-500/10 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 h-40 w-96 rounded-full bg-amber-500/20 blur-3xl" />
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400">
              <Award className="h-4 w-4" />
              <span>جاهز لبناء قناتك المربحة؟</span>
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              ابدأ الأسبوع الأول اليوم: اختر نيتشك واكتب أول سكربت
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              الفارق الوحيد بين من يكسب آلاف الدولارات شهرياً من يوتيوب ومن لا يكسب شيئاً هو الاستمرارية في نشر فيديو واحد أسبوعياً لمدة 6 أشهر متواصلة دون استسلام.
            </p>

            <div className="pt-3 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => scrollToSection('sec-plan')}
                className="flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-3 text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition-all active:scale-95"
              >
                <span>ابدأ خطة الـ 30 يوماً الآن</span>
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
