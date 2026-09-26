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
  Instagram, 
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
  FileText,
  Bookmark,
  Share2,
  CheckCircle,
  MessageCircle,
  BarChart3,
  Link,
  Gift
} from 'lucide-react';
import { 
  instagramBasicsLessons, 
  instagramMonetizationMethods, 
  instagramAccountPillars, 
  instagramReelsGuide, 
  instagramTemplatesData, 
  instagramMetricsData, 
  instagramThirtyDayPlan, 
  instagramMistakesData,
  InstagramLesson,
  InstagramReelsTemplate
} from '../../data/instagramMonetizationData';
import { InstagramCalculators } from './InstagramCalculators';

interface InstagramMonetizationViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const IG_TASKS_KEY = 'rikouzone_instagram_action_tasks';
const IG_READ_LESSONS_KEY = 'rikouzone_instagram_read_lessons';

export const InstagramMonetizationView: React.FC<InstagramMonetizationViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // 1. Basics Lessons State
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [readLessons, setReadLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(IG_READ_LESSONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 2. 30-Day Action Plan State
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(IG_TASKS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [activeWeekNumber, setActiveWeekNumber] = useState<number>(1);

  // 3. Template filter & copied state
  const [selectedTplCategory, setSelectedTplCategory] = useState<string>('all');
  const [copiedTplId, setCopiedTplId] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(IG_READ_LESSONS_KEY, JSON.stringify(readLessons));
    } catch (e) {
      console.warn('Failed to save read lessons:', e);
    }
  }, [readLessons]);

  useEffect(() => {
    try {
      localStorage.setItem(IG_TASKS_KEY, JSON.stringify(completedTasks));
    } catch (e) {
      console.warn('Failed to save action plan tasks:', e);
    }
  }, [completedTasks]);

  const currentLesson = instagramBasicsLessons[activeLessonIndex];

  useEffect(() => {
    if (currentLesson && !readLessons.includes(currentLesson.id)) {
      setReadLessons(prev => [...prev, currentLesson.id]);
    }
  }, [activeLessonIndex, currentLesson, readLessons]);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const allTasks = instagramThirtyDayPlan.flatMap(w => w.tasks);
  const doneTasksCount = allTasks.filter(t => !!completedTasks[t.id]).length;
  const planProgress = Math.round((doneTasksCount / allTasks.length) * 100);

  const filteredTemplates = selectedTplCategory === 'all'
    ? instagramTemplatesData
    : instagramTemplatesData.filter(t => t.category === selectedTplCategory);

  const handleCopyTemplate = (tpl: InstagramReelsTemplate) => {
    onCopyText(tpl.templateText, `تم نسخ "${tpl.title}" بنجاح!`);
    setCopiedTplId(tpl.id);
    setTimeout(() => setCopiedTplId(null), 2500);
  };

  const navJumpList = [
    { id: 'sec-basics', label: '1. الأساسيات' },
    { id: 'sec-methods', label: '2. طرق الربح' },
    { id: 'sec-building', label: '3. بناء الحساب' },
    { id: 'sec-reels', label: '4. Instagram Reels' },
    { id: 'sec-sponsorships', label: '5. الرعايات' },
    { id: 'sec-affiliate', label: '6. الأفلييت' },
    { id: 'sec-analytics', label: '7. التحليلات' },
    { id: 'sec-tools', label: '8. الأدوات والقوالب' },
    { id: 'sec-plan', label: '9. خطة 30 يوم' },
    { id: 'sec-mistakes', label: '10. الأخطاء الشائعة' },
  ];

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 pb-24" dir="rtl">
      
      {/* ------------------------------------------------------------- */}
      {/* HERO / HEADER SECTION */}
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
            <span className="font-bold text-amber-400">الربح من انستغرام (Instagram Monetization)</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-black text-amber-400 shadow-sm shadow-amber-500/10">
                  <Instagram className="h-3.5 w-3.5 text-amber-400" />
                  <span>دليل بناء الأصول الرقمية لعام 2026</span>
                </span>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                  ريلز + رعايات + تسويق بالعمولة
                </span>
                <span className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400">
                  تطبيقي للمبتدئين بدون وعود زائفة
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans">
                الربح من انستغرام
              </h1>

              <h2 className="text-xl sm:text-2xl font-bold text-amber-400">
                من الصفر إلى بناء حساب متخصص، مقاطع ريلز فيروسية، ورعايات الشركات
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                دليل تطبيقي شامل ومفصل: فهم آليات إنستغرام لعام 2026، توضيح شروط كل أداة تحقيق دخل حسب البلد والحساب، هندسة البايو والريلز الفيروسية، قوالب السكربتات ومراسلة الشركات، وحاسبة التفاعل والـ Media Kit، مع خطة 30 يوماً خطوة بخطوة.
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
                  onClick={() => scrollToSection('sec-tools')}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 px-5 py-3.5 text-sm font-bold text-zinc-200 hover:border-amber-500/40 hover:text-white transition-all"
                >
                  <DollarSign className="h-4 w-4 text-amber-400" />
                  <span>حاسبة التفاعل والـ Media Kit</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Progress Card */}
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
                  <span className="text-[10px] text-zinc-500 font-medium block">الدروس المقروءة</span>
                  <span className="text-lg font-black text-amber-400 font-mono mt-0.5 block">
                    {readLessons.length} / {instagramBasicsLessons.length}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                <span>تخزين تقدمك تلقائي محلياً</span>
                <button
                  onClick={() => {
                    setCompletedTasks({});
                    setReadLessons([]);
                    onCopyText('', 'تمت إعادة ضبط تقدمك في الدليل بنجاح');
                  }}
                  className="flex items-center gap-1 text-zinc-500 hover:text-rose-400 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>تصفير</span>
                </button>
              </div>
            </div>

          </div>

          {/* Quick Jump Navigation Bar */}
          <div className="mt-10 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2">
              {navJumpList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="whitespace-nowrap rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-2 text-xs font-bold text-zinc-300 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-300 transition-all active:scale-95"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-20">

        {/* ------------------------------------------------------------- */}
        {/* SECTION 1: الأساسيات (Basics) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-basics" 
          ref={(el) => { sectionRefs.current['sec-basics'] = el; }}
          className="space-y-6 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                <span>القسم 01</span>
                <span>•</span>
                <span>فهم المنصة</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
                1. الأساسيات: كيف تفكر وتعمل منظومة إنستغرام؟
              </h2>
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              الدرس {activeLessonIndex + 1} من {instagramBasicsLessons.length}
            </div>
          </div>

          {/* Interactive Lesson Cards Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {instagramBasicsLessons.map((lesson, idx) => {
              const isSelected = idx === activeLessonIndex;
              const isRead = readLessons.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonIndex(idx)}
                  className={`text-right rounded-2xl p-4 transition-all border ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-amber-400">
                      درس 0{idx + 1}
                    </span>
                    {isRead ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Circle className="h-4 w-4 text-zinc-600" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">
                    {lesson.title}
                  </h4>
                  <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {lesson.shortDesc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Lesson Display Body */}
          {currentLesson && (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 sm:p-8 backdrop-blur-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-xs font-bold text-amber-400">شرح الدرس التفاعلي</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {currentLesson.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={activeLessonIndex === 0}
                    onClick={() => setActiveLessonIndex(prev => Math.max(0, prev - 1))}
                    className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    title="الدرس السابق"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    disabled={activeLessonIndex === instagramBasicsLessons.length - 1}
                    onClick={() => setActiveLessonIndex(prev => Math.min(instagramBasicsLessons.length - 1, prev + 1))}
                    className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    title="الدرس التالي"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Key Takeaway Box */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-5 flex items-start gap-3.5">
                <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-black text-amber-300 block">الخلاصة الذهبية للدرس:</span>
                  <p className="mt-1 text-sm font-semibold text-zinc-200 leading-relaxed">
                    {currentLesson.keyTakeaway}
                  </p>
                </div>
              </div>

              {/* Content Paragraphs */}
              <div className="space-y-3.5 text-sm text-zinc-300 leading-relaxed font-normal">
                {currentLesson.content.map((p, i) => (
                  <p key={i} className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-3.5">
                    {p}
                  </p>
                ))}
              </div>

              {/* Practical Example */}
              {currentLesson.practicalExample && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <span className="text-xs font-black text-emerald-400 block mb-1">مثال واقعي:</span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {currentLesson.practicalExample}
                  </p>
                </div>
              )}

              {/* Warnings / Tips */}
              {currentLesson.warning && (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-200 leading-relaxed">
                    {currentLesson.warning}
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 2: طرق الربح (Monetization Methods) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-methods" 
          ref={(el) => { sectionRefs.current['sec-methods'] = el; }}
          className="space-y-6 scroll-mt-20"
        >
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <span>القسم 02</span>
              <span>•</span>
              <span>تحقيق الدخل</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              2. طرق الربح من إنستغرام (مستقلة وتفصيلية)
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-3xl leading-relaxed">
              شرح دقيق لكل وسيلة ربح مع شروط الأهلية الرسمية الحالية. تنبيه هام: ميزات المنصة المباشرة (Subscriptions و Gifts) ليست متاحة في جميع الدول، بينما الرعايات والتسويق بالعمولة والمنتجات الرقمية تعمل عالمياً بلا أي قيود.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {instagramMonetizationMethods.map((method) => (
              <div
                key={method.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all hover:bg-zinc-900/80"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`rounded-xl px-3 py-1 text-xs font-bold border ${method.badgeColor}`}>
                      {method.badge}
                    </span>
                    <span className="text-[11px] font-bold text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
                      {method.monetizationType}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white">
                    {method.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {method.description}
                  </p>

                  {/* Requirements Box */}
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-2">
                    <span className="text-xs font-bold text-zinc-400 block">شروط الأهلية والتطبيق:</span>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {method.requirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Geographic / Account Availability Notice */}
                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/90 p-3 text-[11px] text-zinc-400 leading-relaxed flex items-start gap-2">
                    <HelpCircle className="h-3.5 w-3.5 text-zinc-500 shrink-0 mt-0.5" />
                    <span><strong>الأهلية والتوفر:</strong> {method.availabilityNotice}</span>
                  </div>

                  {/* How it works steps */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-bold text-zinc-400 block">كيف تبدأ التطبيق؟</span>
                    {method.howItWorks.map((step, sIdx) => (
                      <div key={sIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="text-amber-400 font-mono font-bold shrink-0">{sIdx + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-medium">العائد المتوقع:</span>
                  <span className="font-bold text-amber-400 font-mono">{method.payoutDetail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 3: بناء الحساب (Account Building) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-building" 
          ref={(el) => { sectionRefs.current['sec-building'] = el; }}
          className="space-y-6 scroll-mt-20"
        >
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <span>القسم 03</span>
              <span>•</span>
              <span>التأسيس والنمو</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              3. بناء الحساب: تحويل الزائر إلى متابع مخلص
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-3xl leading-relaxed">
              إنستغرام مكافأة للمتخصصين. الرعاة لا يشترون المتابعين بل يشترون الثقة والتأثير داخل مجال محدد. إليك الأركان الأربعة لتأسيس حساب احترافي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {instagramAccountPillars.map((pillar) => (
              <div 
                key={pillar.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Award className="h-4 w-4 text-amber-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {pillar.desc}
                </p>

                {pillar.formula && (
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs text-amber-200 font-semibold leading-relaxed">
                    💡 المعادلة: {pillar.formula}
                  </div>
                )}

                {pillar.examples && (
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    <span className="text-[11px] text-zinc-500 font-bold">أمثلة:</span>
                    {pillar.examples.map((ex, eIdx) => (
                      <span key={eIdx} className="rounded-lg bg-zinc-950 border border-zinc-800 px-2.5 py-1 text-[11px] text-zinc-300 font-medium">
                        {ex}
                      </span>
                    ))}
                  </div>
                )}

                {pillar.details && (
                  <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                    {pillar.details.map((item, dIdx) => (
                      <div key={dIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 4: Instagram Reels Guide */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-reels" 
          ref={(el) => { sectionRefs.current['sec-reels'] = el; }}
          className="space-y-6 scroll-mt-20"
        >
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <span>القسم 04</span>
              <span>•</span>
              <span>الانتشار الفيروسي</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              4. Instagram Reels: ماكينة الوصول المجاني والمتابعين الجدد
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-3xl leading-relaxed">
              الريلز هي التنسيق الوحيد على إنستغرام الذي تعرضه الخوارزمية لغير المتابعين بنسبة 80%+. فهم أسرار الـ 3 ثوانٍ الأولى والـ CTA الذكي يضاعف مشاهداتك 10 مرات.
            </p>
          </div>

          {/* 4 Step Framework Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {instagramReelsGuide.map((item, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-2.5 relative overflow-hidden"
              >
                <div className="text-3xl font-black text-zinc-800 font-mono absolute -top-1 left-3 select-none">
                  0{idx + 1}
                </div>
                <h4 className="text-sm font-black text-amber-400 relative z-10">
                  {item.step}
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed relative z-10">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>

          {/* Pro Viral Reels Tips Banner */}
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400">
                <Video className="h-3.5 w-3.5" />
                <span>قاعدة المشاهدة التراكمية (Watch Time Hack)</span>
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">
                كيف تجعل الخوارزمية تقترح الريل لآلاف المشاهدين؟
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                اجعل طول الفيديو بين 12 إلى 25 ثانية، واستخدم حلقة مفرغة (Loop) حيث يرتبط آخر إطار في الفيديو بأول ثانية، مما يدفع المشاهد لمشاهدة المقطع مرتين متتاليتين فيرتفع معدل الإكمال وتعتبره الخوارزمية فيروسياً فوراً.
              </p>
            </div>

            <button
              onClick={() => scrollToSection('sec-tools')}
              className="shrink-0 rounded-2xl bg-amber-500 px-6 py-3.5 text-xs font-black text-black hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              استعرض قوالب الـ Hooks والسكربتات 👇
            </button>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 5: Sponsorships & Branded Content */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-sponsorships" 
          ref={(el) => { sectionRefs.current['sec-sponsorships'] = el; }}
          className="space-y-6 scroll-mt-20"
        >
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <span>القسم 05</span>
              <span>•</span>
              <span>شراكات الشركات</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              5. الرعايات: كيف تتعاقد مع الشركات وتربح حتى مع جمهور صغير؟
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-3xl leading-relaxed">
              الشركات في 2026 لا تطلب دائماً مشاهير الملايين، بل تبحث عن صناع محتوى متخصصين (Nano-influencers) لديهم مجتمع متفاعل ويثق برأيهم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-base font-black text-white">1. أين تجد الشركات؟</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                - ابحث عن المنتجات التي يستخدمها منافسوك في نفس المجال.
                - تصفح منصات الرعايات مثل Collabstr و Aspire و Heepsy.
                - راسل مسؤولي التسويق (Marketing / Growth Managers) مباشرة على LinkedIn أو بريد الشركة الرسمي.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-base font-black text-white">2. الـ Media Kit والتفاوض</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                لا ترسل مجرد رسالة تقول "هل لديكم إعلانات؟". أرسل ملف Media Kit دقيق يوضح:
                - من هم متابعوك وجنسياتهم؟
                - معدل التفاعل ومتوسط مشاهدات الريلز.
                - الأفكار الإبداعية التي تقترحها لخدمة منتجهم.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-black text-white">3. وسم الشراكة (Paid Partnership)</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                الشفافية هي سر الاستمرار:
                - فعّل خيار Paid Partnership من إعدادات المنشور.
                - أضف اسم الشركة لحفظ حقك وإتاحة الوصول للتحليلات للعلامة.
                - هذا الإجراء يحمي حسابك من حظر خوارزمية الإعلانات غير المصرح بها.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 6: Affiliate Marketing on Instagram */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-affiliate" 
          ref={(el) => { sectionRefs.current['sec-affiliate'] = el; }}
          className="space-y-6 scroll-mt-20"
        >
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <span>القسم 06</span>
              <span>•</span>
              <span>التسويق بالعمولة</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              6. التسويق بالعمولة على Instagram: آليات البيع دون إزعاج
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-3xl leading-relaxed">
              كيف تضع روابط الخصم في الستوري والبايو وتحقق عمولات مستمرة من المنتجات التي تحبها وترشحها بصدق.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <Link className="h-4 w-4" />
                <h4 className="text-sm font-bold text-white">1. رابط البايو المجمع (Link in Bio)</h4>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                استخدم صفحة بسيطة مثل Bento أو Linktree أو Payhip تضع فيها 3-5 روابط فقط لأفضل الأدوات والمنتجات التي تنصح بها دائماً مع كود الخصم الخاص بك.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <Share2 className="h-4 w-4" />
                <h4 className="text-sm font-bold text-white">2. ملصق رابط الستوري (Link Sticker)</h4>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                شارك نتائجك واستخدامك العملي للمنتج في الستوري ثم ضع الرابط مع زر مخصص باسم جذاب مثل "احصل على خصم 20% هنا". ثم ثبته في الهايلايتس.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <MessageCircle className="h-4 w-4" />
                <h4 className="text-sm font-bold text-white">3. أتمتة الـ DMs عبر ManyChat</h4>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                قل في الريلز: "علق بكلمة [تخفيض] ليرسل لك الرابط فوراً". أداة ManyChat ترسل الرابط مع كود الأفلييت في الخاص خلال 5 ثوانٍ تلقائياً لجميع المعلقين!
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 7: Analytics (تحليلات إنستغرام) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-analytics" 
          ref={(el) => { sectionRefs.current['sec-analytics'] = el; }}
          className="space-y-6 scroll-mt-20"
        >
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <span>القسم 07</span>
              <span>•</span>
              <span>لوحة التحكم المهنية</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              7. تحليلات إنستغرام (Analytics): ماذا تعني كل شاشة وكيف تقرؤها؟
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-3xl leading-relaxed">
              شرح مبسط لكل مقياس داخل Professional Dashboard والاستنتاج العملي الذي يفيدك لتطوير مبيعاتك وأرباحك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {instagramMetricsData.map((m) => (
              <div 
                key={m.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <h3 className="text-sm font-black text-white">
                    {m.nameAr}
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    {m.nameEn}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {m.definition}
                </p>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 space-y-1.5 text-xs">
                  <div className="text-zinc-400">
                    <strong className="text-white">الاستنتاج التطبيقي:</strong> {m.actionableInsight}
                  </div>
                  <div className="text-amber-300/90 text-[11px]">
                    <strong>الهدف المقترح:</strong> {m.idealBenchmark}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 8: الأدوات والقوالب (Tools & Templates) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-tools" 
          ref={(el) => { sectionRefs.current['sec-tools'] = el; }}
          className="space-y-8 scroll-mt-20"
        >
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <span>القسم 08</span>
              <span>•</span>
              <span>أدوات وقوالب تفاعلية</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              8. الأدوات والقوالب الجاهزة للنسخ والتطبيق
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-3xl leading-relaxed">
              حاسبة التفاعل وسعر الرعاية، منشئ البايو الاحترافي، مولد الـ Media Kit، ورسائل التواصل مع البراندات، بالإضافة إلى مكتبة هوكس وسكربتات قابلة للنسخ بنقرة واحدة.
            </p>
          </div>

          {/* Interactive Calculators & Generator Suites */}
          <InstagramCalculators onCopyText={onCopyText} />

          {/* Ready-to-copy Templates Library */}
          <div className="space-y-4 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white">
                  مكتبة قوالب المحتوى والـ Hooks الجاهزة للنسخ
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  اختر التصنيف وانسخ القالب فوراً مع زر النسخ المباشر.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'Reels Hooks', label: 'هوك خطاف' },
                  { id: 'Reel Scripts', label: 'سكربتات ريلز' },
                  { id: 'Bio Templates', label: 'قوالب بايو' },
                  { id: 'Story CTAs', label: 'ستوري للبيع' },
                  { id: 'Reel Ideas', label: 'أفكار ريلز' },
                  { id: 'Content Calendar', label: 'جدول النشر' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedTplCategory(cat.id)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedTplCategory === cat.id
                        ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                        : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between space-y-4 hover:border-amber-500/30 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-[11px] font-bold text-amber-400">
                        {tpl.categoryAr}
                      </span>
                      <button
                        onClick={() => handleCopyTemplate(tpl)}
                        className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-black text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 active:scale-95"
                      >
                        {copiedTplId === tpl.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedTplId === tpl.id ? 'تم النسخ!' : 'نسخ القالب'}</span>
                      </button>
                    </div>

                    <h4 className="text-base font-black text-white">
                      {tpl.title}
                    </h4>

                    <p className="text-xs text-zinc-400">
                      {tpl.description}
                    </p>

                    <pre className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-sans text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-[220px] overflow-y-auto">
                      {tpl.templateText}
                    </pre>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-500 flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold shrink-0">💡 نصيحة تطبيقية:</span>
                    <span>{tpl.tips}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 9: خطة الـ 30 يوماً (30-Day Plan) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-plan" 
          ref={(el) => { sectionRefs.current['sec-plan'] = el; }}
          className="space-y-6 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                <span>القسم 09</span>
                <span>•</span>
                <span>خارطة الطريق</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
                9. خطة 30 يوم العملية: من الصفر إلى أول شراكة ومبيعات
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
              <span>{doneTasksCount} من {allTasks.length} مهمة مكتملة ({planProgress}%)</span>
            </div>
          </div>

          {/* Week Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {instagramThirtyDayPlan.map((w) => {
              const isCurrentWeek = w.weekNumber === activeWeekNumber;
              const weekDone = w.tasks.filter(t => !!completedTasks[t.id]).length;

              return (
                <button
                  key={w.weekNumber}
                  onClick={() => setActiveWeekNumber(w.weekNumber)}
                  className={`text-right rounded-2xl p-4 border transition-all ${
                    isCurrentWeek
                      ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
                  }`}
                >
                  <span className="text-[11px] font-bold text-amber-400 block mb-1">
                    الأسبوع 0{w.weekNumber}
                  </span>
                  <h4 className="text-xs font-bold text-white line-clamp-1">
                    {w.theme}
                  </h4>
                  <div className="mt-2 text-[10px] text-zinc-400 font-mono">
                    {weekDone} / {w.tasks.length} مهام منجزة
                  </div>
                </button>
              );
            })}
          </div>

          {/* Current Week Tasks with Checkboxes */}
          {(() => {
            const currentWeek = instagramThirtyDayPlan.find(w => w.weekNumber === activeWeekNumber);
            if (!currentWeek) return null;

            return (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6">
                <div className="pb-4 border-b border-zinc-800">
                  <span className="text-xs font-bold text-amber-400">مهام الأسبوع {currentWeek.weekNumber}</span>
                  <h3 className="text-xl font-black text-white mt-1">
                    {currentWeek.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                    🎯 الهدف الرئيسي: {currentWeek.objective}
                  </p>
                </div>

                <div className="space-y-3">
                  {currentWeek.tasks.map((task) => {
                    const isDone = !!completedTasks[task.id];

                    return (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`rounded-2xl border p-4 cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                          isDone
                            ? 'border-emerald-500/30 bg-emerald-500/5 opacity-80'
                            : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70'
                        }`}
                      >
                        <div className="pt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                          ) : (
                            <Circle className="h-5 w-5 text-zinc-600 hover:text-amber-400 transition-colors" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <h4 className={`text-sm font-bold ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                            {task.text}
                          </h4>
                          <p className="text-xs text-zinc-400 leading-relaxed">
                            {task.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Week Pro Tip */}
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-start gap-3">
                  <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-200 leading-relaxed">
                    <strong>نصيحة الأسبوع:</strong> {currentWeek.proTip}
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 10: الأخطاء الشائعة (Common Mistakes) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-mistakes" 
          ref={(el) => { sectionRefs.current['sec-mistakes'] = el; }}
          className="space-y-6 scroll-mt-20"
        >
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <span>القسم 10</span>
              <span>•</span>
              <span>فخاخ الحسابات</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              10. الأخطاء الشائعة التي تدمر الحسابات وتمنع الأرباح
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-3xl leading-relaxed">
              احذر هذه الممارسات الست الخطيرة التي يقع فيها 90% من المبتدئين وتتسبب في حظر الحساب أو موت التفاعل.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {instagramMistakesData.map((mst) => (
              <div
                key={mst.id}
                className="rounded-3xl border border-rose-500/20 bg-gradient-to-b from-rose-500/5 via-zinc-950 to-zinc-950 p-6 flex flex-col justify-between space-y-4 hover:border-rose-500/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 text-[11px] font-bold text-rose-400">
                      {mst.category}
                    </span>
                    <AlertTriangle className="h-4 w-4 text-rose-400" />
                  </div>

                  <h3 className="text-base font-black text-white">
                    {mst.title}
                  </h3>

                  <div className="space-y-2 text-xs text-zinc-300">
                    <p>
                      <strong className="text-rose-400">الخطأ:</strong> {mst.mistake}
                    </p>
                    <p className="text-zinc-400">
                      <strong className="text-zinc-300">العواقب:</strong> {mst.consequence}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 text-xs text-emerald-400 font-medium">
                  <strong>✅ البديل الصحيح:</strong> {mst.solution}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
};
