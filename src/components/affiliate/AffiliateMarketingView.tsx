import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Compass, 
  BookOpen, 
  Award, 
  ExternalLink, 
  Layers, 
  Lightbulb, 
  Copy, 
  Check, 
  ShieldCheck, 
  Flame, 
  TrendingUp, 
  ArrowRight, 
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Globe,
  Share2,
  DollarSign,
  AlertTriangle,
  HelpCircle,
  Hash,
  Home
} from 'lucide-react';
import { 
  module01Lessons, 
  module02Lessons, 
  affiliateProgramsData, 
  offerCriteria, 
  trafficPlatformsData, 
  affiliateLinkGuides, 
  affiliateFaqsData,
  LessonItem,
  AffiliateProgram
} from '../../data/affiliateGuideData';
import { AffiliateCalculators } from './AffiliateCalculators';
import { AffiliateTemplates } from './AffiliateTemplates';
import { AffiliateActionPlan } from './AffiliateActionPlan';
import { InteractiveNicheChecklist, InteractiveOfferChecklist } from './AffiliateOfferChecklist';

interface AffiliateMarketingViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const READ_LESSONS_STORAGE_KEY = 'rikouzone_affiliate_read_lessons';

export const AffiliateMarketingView: React.FC<AffiliateMarketingViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  // Read lessons tracking in localStorage
  const [readLessonIds, setReadLessonIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(READ_LESSONS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Active module & lesson tracking for Module 01 and 02
  const [activeM1LessonIndex, setActiveM1LessonIndex] = useState<number>(0);
  const [activeM2LessonIndex, setActiveM2LessonIndex] = useState<number>(0);

  // Active Program category filter
  const [selectedProgramCategory, setSelectedProgramCategory] = useState<string>('all');

  // FAQ expanded state
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  // Traffic platform modal/expanded
  const [expandedTrafficId, setExpandedTrafficId] = useState<string | null>('traf-tiktok');

  // Modules reference to smooth scroll
  const moduleRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    try {
      localStorage.setItem(READ_LESSONS_STORAGE_KEY, JSON.stringify(readLessonIds));
    } catch (e) {
      console.warn('Failed to save read lessons:', e);
    }
  }, [readLessonIds]);

  const markLessonAsRead = (lessonId: string) => {
    setReadLessonIds((prev) => (prev.includes(lessonId) ? prev : [...prev, lessonId]));
  };

  const totalLessonsCount = module01Lessons.length + module02Lessons.length;
  const completedLessonsCount = (module01Lessons.concat(module02Lessons)).filter(l => readLessonIds.includes(l.id)).length;
  const learningProgressPercent = Math.round((completedLessonsCount / totalLessonsCount) * 100);

  const scrollToModule = (modId: string) => {
    const el = moduleRefs.current[modId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentM1Lesson = module01Lessons[activeM1LessonIndex];
  const currentM2Lesson = module02Lessons[activeM2LessonIndex];

  // Mark current lessons as read on view
  useEffect(() => {
    if (currentM1Lesson) markLessonAsRead(currentM1Lesson.id);
  }, [activeM1LessonIndex]);

  useEffect(() => {
    if (currentM2Lesson) markLessonAsRead(currentM2Lesson.id);
  }, [activeM2LessonIndex]);

  // Filter programs
  const filteredPrograms = selectedProgramCategory === 'all'
    ? affiliateProgramsData
    : affiliateProgramsData.filter(p => p.category === selectedProgramCategory);

  const programCategories = [
    { id: 'all', label: 'جميع البرامج (12)' },
    { id: 'E-commerce', label: 'التجارة الإلكترونية' },
    { id: 'SaaS / Software', label: 'البرمجيات والاستضافة' },
    { id: 'Travel', label: 'السياحة والسفر' },
    { id: 'Education', label: 'التعليم والشهادات' },
    { id: 'Finance', label: 'المالية وتداول العملات' },
    { id: 'Networks', label: 'شبكات الأفيلييت العامة' }
  ];

  const modulesNavList = [
    { id: 'mod-01', num: '01', title: 'الأساسيات' },
    { id: 'mod-02', num: '02', title: 'اختيار النيتش' },
    { id: 'mod-03', num: '03', title: 'برامج العمولة' },
    { id: 'mod-04', num: '04', title: 'اختيار الـ Offer' },
    { id: 'mod-05', num: '05', title: 'صناعة المحتوى' },
    { id: 'mod-06', num: '06', title: 'مصادر الزيارات' },
    { id: 'mod-07', num: '07', title: 'روابط الأفيلييت' },
    { id: 'mod-08', num: '08', title: 'الأدوات التفاعلية' },
    { id: 'mod-09', num: '09', title: 'خطة الـ 7 أيام' },
    { id: 'mod-10', num: '10', title: 'الأسئلة الشائعة' },
  ];

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 pb-24" dir="rtl">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO / INTRODUCTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-zinc-800/80 bg-gradient-to-b from-amber-500/10 via-zinc-950 to-[#060608] pt-8 pb-16">
        
        {/* Glow ambient background */}
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
            <span className="font-bold text-amber-400">التسويق بالعمولة (Affiliate Marketing)</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-8 space-y-4">
              
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-black text-amber-400 shadow-sm shadow-amber-500/10">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>دليل المبتدئين 100% بدون تعقيد</span>
                </span>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                  بدون رأس مال إلزامي (0 درهم)
                </span>
                <span className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400">
                  محدث ومطابق لسنة 2026
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans">
                التسويق بالعمولة
              </h1>

              <h2 className="text-xl sm:text-2xl font-bold text-amber-400">
                تعلم التسويق بالعمولة من الصفر بطريقة عملية
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                مسار تدريبي شامل وتفاعلي مصمم خصيصاً للمبتدئين في المغرب والعالم العربي. لا نظريات فارغة ولا وعود ربح سحرية؛ ستتعلم خطوة بخطوة كيف تختار النيتش، وتسجل في البرامج المعتمدة، وتصنع محتوى مقنعاً بهاتفك، وتطبق خطة الـ 7 أيام لتوليد أول عمولة حقيقية.
              </p>

              {/* Progress and CTA action bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => scrollToModule('mod-01')}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3.5 text-sm font-black text-black shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-orange-400 transition-all active:scale-95"
                >
                  <span>ابدأ من الصفر (الوحدة 01)</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={() => scrollToModule('mod-08')}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 px-5 py-3.5 text-sm font-bold text-zinc-200 hover:border-amber-500/40 hover:text-white transition-all"
                >
                  <DollarSign className="h-4 w-4 text-amber-400" />
                  <span>حاسبة الأرباح والأدوات</span>
                </button>
              </div>

            </div>

            {/* Quick Metrics & Progress Tracker Card */}
            <div className="lg:col-span-4 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                <span className="text-xs font-bold text-zinc-400">مؤشر الإنجاز والتعلم</span>
                <span className="text-xs font-mono font-bold text-amber-400">{learningProgressPercent}% مكتمل</span>
              </div>

              {/* Progress bar */}
              <div className="mt-3 w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800/60">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                  style={{ width: `${learningProgressPercent}%` }}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs text-center">
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3">
                  <span className="text-[10px] text-zinc-500 font-medium block">وحدات المسار</span>
                  <span className="text-lg font-black text-white font-mono mt-0.5 block">10 وحدات</span>
                </div>
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3">
                  <span className="text-[10px] text-zinc-500 font-medium block">دروس الأساسيات</span>
                  <span className="text-lg font-black text-amber-400 font-mono mt-0.5 block">12 درساً</span>
                </div>
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3">
                  <span className="text-[10px] text-zinc-500 font-medium block">برامج معتمدة</span>
                  <span className="text-lg font-black text-emerald-400 font-mono mt-0.5 block">12 برنامجاً</span>
                </div>
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3">
                  <span className="text-[10px] text-zinc-500 font-medium block">قوالب للنسخ</span>
                  <span className="text-lg font-black text-orange-400 font-mono mt-0.5 block">8 قوالب</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>الدروس المكتملة: {completedLessonsCount} من {totalLessonsCount}</span>
                <span className="text-amber-400 font-bold">حفظ تلقائي ✓</span>
              </div>
            </div>

          </div>

          {/* Sticky Quick Jump Roadmap Bar */}
          <div className="mt-10 pt-6 border-t border-zinc-800/80">
            <span className="text-xs font-bold text-zinc-400 block mb-3">
              خريطة الطريق السريعة — اضغط للانتقال لأي وحدة تدريبية:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {modulesNavList.map((m) => (
                <button
                  key={m.id}
                  onClick={() => scrollToModule(m.id)}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-xs font-medium text-zinc-300 hover:border-amber-500/40 hover:text-white hover:bg-zinc-900 transition-all whitespace-nowrap"
                >
                  <span className="font-mono font-bold text-amber-400 text-[10px] bg-amber-500/10 px-1.5 py-0.5 rounded">
                    {m.num}
                  </span>
                  <span>{m.title}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Main Roadmap Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-20">

        {/* ------------------------------------------------------------- */}
        {/* MODULE 01 — الأساسيات */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="mod-01"
          ref={(el) => { moduleRefs.current['mod-01'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          {/* Module Header */}
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>01 — الأساسيات</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                فهم التسويق بالعمولة من الألف إلى الياء
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                7 دروس جوهرية تشرح لك كيف يعمل النظام، من يدفع لك، وكيف تبدأ بهاتفك فقط دون رأس مال.
              </p>
            </div>

            <div className="text-xs text-zinc-400 font-medium">
              الدرس {activeM1LessonIndex + 1} من {module01Lessons.length}
            </div>
          </div>

          {/* Lessons Horizontal Pill Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {module01Lessons.map((lesson, idx) => {
              const isSelected = activeM1LessonIndex === idx;
              const isRead = readLessonIds.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveM1LessonIndex(idx)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap border ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                      : isRead
                      ? 'border-zinc-800 bg-zinc-900/80 text-zinc-200 hover:border-zinc-700'
                      : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{idx + 1}.</span>
                  <span>{lesson.title}</span>
                  {isRead && (
                    <CheckCircle2 className={`h-3.5 w-3.5 ${isSelected ? 'text-black' : 'text-emerald-400'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Lesson Display Card */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-xl space-y-6">
            
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800/80">
              <div>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md">
                  الدرس #{activeM1LessonIndex + 1}
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-black text-white">
                  {currentM1Lesson.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  {currentM1Lesson.shortDesc}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-300 shrink-0 hidden sm:block">
                خلاصة ذهبية
              </div>
            </div>

            {/* Key takeaway callout */}
            <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 text-xs font-semibold text-amber-200 flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-400 block mb-0.5">الفكرة المحورية:</strong>
                <span>{currentM1Lesson.keyTakeaway}</span>
              </div>
            </div>

            {/* Lesson Body Paragraphs */}
            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
              {currentM1Lesson.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="bg-zinc-950/40 p-3.5 rounded-2xl border border-zinc-900">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Practical Example if available */}
            {currentM1Lesson.practicalExample && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-300">
                <span className="font-bold text-emerald-400 block mb-1">💡 مثال واقعي من الميدان:</span>
                <p className="leading-relaxed text-zinc-300">{currentM1Lesson.practicalExample}</p>
              </div>
            )}

            {/* Warning if available */}
            {currentM1Lesson.warning && (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300 flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{currentM1Lesson.warning}</span>
              </div>
            )}

            {/* Next / Previous Lesson Navigation */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <button
                onClick={() => setActiveM1LessonIndex(prev => Math.max(0, prev - 1))}
                disabled={activeM1LessonIndex === 0}
                className="flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ArrowRight className="h-4 w-4" />
                <span>الدرس السابق</span>
              </button>

              <div className="text-xs text-zinc-500 hidden sm:block">
                تم قراءة {readLessonIds.filter(id => module01Lessons.some(l => l.id === id)).length} من 7 دروس
              </div>

              {activeM1LessonIndex < module01Lessons.length - 1 ? (
                <button
                  onClick={() => setActiveM1LessonIndex(prev => Math.min(module01Lessons.length - 1, prev + 1))}
                  className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
                >
                  <span>الدرس التالي</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => scrollToModule('mod-02')}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-black hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                >
                  <span>انتقل للوحدة 02 (اختيار النيتش)</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
            </div>

          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* MODULE 02 — اختيار الـ Niche */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="mod-02"
          ref={(el) => { moduleRefs.current['mod-02'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>02 — اختيار الـ Niche</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                تحديد التخصص المربح والمناسب لك
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                تعلم كيف تختار مجالاً عليه طلب حقيقي، تتفادى المنافسة القاتلة، وتختبر مجالك عبر قائمة تفاعلية.
              </p>
            </div>

            <div className="text-xs text-zinc-400 font-medium">
              الدرس {activeM2LessonIndex + 1} من {module02Lessons.length}
            </div>
          </div>

          {/* Lessons Pill Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {module02Lessons.map((lesson, idx) => {
              const isSelected = activeM2LessonIndex === idx;
              const isRead = readLessonIds.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveM2LessonIndex(idx)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap border ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                      : isRead
                      ? 'border-zinc-800 bg-zinc-900/80 text-zinc-200 hover:border-zinc-700'
                      : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{idx + 1}.</span>
                  <span>{lesson.title}</span>
                  {isRead && (
                    <CheckCircle2 className={`h-3.5 w-3.5 ${isSelected ? 'text-black' : 'text-emerald-400'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Lesson Content Card */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-xl space-y-6">
            
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800/80">
              <div>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md">
                  الدرس #{activeM2LessonIndex + 1}
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-black text-white">
                  {currentM2Lesson.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  {currentM2Lesson.shortDesc}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-300 shrink-0 hidden sm:block">
                خلاصة النيتش
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 text-xs font-semibold text-amber-200 flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-400 block mb-0.5">القاعدة الأساسية:</strong>
                <span>{currentM2Lesson.keyTakeaway}</span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
              {currentM2Lesson.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="bg-zinc-950/40 p-3.5 rounded-2xl border border-zinc-900">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Next / Previous Lesson Navigation */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <button
                onClick={() => setActiveM2LessonIndex(prev => Math.max(0, prev - 1))}
                disabled={activeM2LessonIndex === 0}
                className="flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ArrowRight className="h-4 w-4" />
                <span>الدرس السابق</span>
              </button>

              {activeM2LessonIndex < module02Lessons.length - 1 ? (
                <button
                  onClick={() => setActiveM2LessonIndex(prev => Math.min(module02Lessons.length - 1, prev + 1))}
                  className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
                >
                  <span>الدرس التالي</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => scrollToModule('mod-03')}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-black hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                >
                  <span>انتقل لبرامج العمولة (الوحدة 03)</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
            </div>

          </div>

          {/* Interactive Checklist: "اختار الـ Niche ديالك" */}
          <InteractiveNicheChecklist />

        </section>

        {/* ------------------------------------------------------------- */}
        {/* MODULE 03 — برامج العمولة المعتمدة */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="mod-03"
          ref={(el) => { moduleRefs.current['mod-03'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>03 — برامج العمولة (Affiliate Programs)</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                دليل برامج وشبكات العمولة الرسمية المعتمدة
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                برامج حقيقية وموثوقة مقسمة حسب الفئات مع نوع العمولة، وسائل الدفع، شروط القبول، وروابط المواقع الرسمية.
              </p>
            </div>

            <div className="text-xs text-zinc-400 font-medium">
              عرض {filteredPrograms.length} برنامج معتمد
            </div>
          </div>

          {/* Category filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {programCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedProgramCategory(c.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                  selectedProgramCategory === c.id
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPrograms.map((prog) => (
              <div
                key={prog.id}
                className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-xl hover:border-amber-500/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {prog.categoryAr}
                    </span>
                    {prog.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {prog.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    {prog.name}
                  </h3>

                  {/* Specs Box */}
                  <div className="mt-4 space-y-2 text-xs text-zinc-300 bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800/80">
                    <div>
                      <span className="text-zinc-500 font-medium">نوع العمولة: </span>
                      <span className="text-amber-400 font-bold">{prog.commissionType}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-medium">النسبة / القيمة: </span>
                      <span className="text-zinc-100 font-bold">{prog.commissionRate}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-medium">مدة الكوكيز: </span>
                      <span className="text-zinc-200">{prog.cookieDuration}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-medium">طرق الدفع: </span>
                      <span className="text-zinc-300">{prog.paymentMethod}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-medium">المغرب والدول العربية: </span>
                      <span className="text-emerald-400 font-semibold">{prog.eligibility}</span>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-zinc-400 leading-relaxed">
                    <strong className="text-zinc-300 block mb-0.5">شروط القبول:</strong>
                    <span>{prog.requirements}</span>
                  </div>

                  {/* Pros list */}
                  <div className="mt-3 pt-3 border-t border-zinc-800/80 space-y-1">
                    {prog.pros.map((p, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-zinc-300">
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800">
                  <a
                    href={prog.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-950 hover:bg-amber-500 hover:text-black border border-zinc-800 py-2.5 text-xs font-bold text-zinc-200 transition-all group-hover:border-amber-500/40"
                  >
                    <span>الموقع الرسمي لبرنامج {prog.name}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ------------------------------------------------------------- */}
        {/* MODULE 04 — اختيار الـ Offer */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="mod-04"
          ref={(el) => { moduleRefs.current['mod-04'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>04 — اختيار الـ Offer</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                كيفية فحص وتقييم عروض الأفيلييت قبل الترويج
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                8 معايير ذهبية تفصل بين العرض المربح الذي يحقق مبيعات متتالية، وبين العرض الرديء الذي يضيع وقتك.
              </p>
            </div>
          </div>

          {/* Interactive Offer Checklist & Evaluator */}
          <InteractiveOfferChecklist onCopyText={onCopyText} />

        </section>

        {/* ------------------------------------------------------------- */}
        {/* MODULE 05 — صناعة المحتوى الجاهزة للنسخ */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="mod-05"
          ref={(el) => { moduleRefs.current['mod-05'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>05 — صناعة المحتوى</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                قوالب وسكربتات عملية قابلة للنسخ المباشر
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                سكربتات تيك توك، إنستغرام، يوتيوب، مراجعات المنتجات، مقارنات، هوكات نارية، ونداءات عمل عالية التحويل.
              </p>
            </div>
          </div>

          {/* Templates Grid with Copy Buttons */}
          <AffiliateTemplates onCopyText={onCopyText} />

        </section>

        {/* ------------------------------------------------------------- */}
        {/* MODULE 06 — مصادر الزيارات (Traffic) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="mod-06"
          ref={(el) => { moduleRefs.current['mod-06'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>06 — مصادر الزيارات (Traffic Sources)</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                أين تجد جمهورك وكيف تجلب آلاف الزوار لروابطك؟
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                بطاقات تفصيلية لمنصات الزيارات الـ 7 الرئيسية مع آلية عمل كل منصة، نوع المحتوى، وتجنب الأخطاء الشائعة (بدون وعود أرباح زائفة).
              </p>
            </div>
          </div>

          {/* Traffic Platforms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {trafficPlatformsData.map((plat) => {
              const isExpanded = expandedTrafficId === plat.id;

              return (
                <div
                  key={plat.id}
                  className={`rounded-3xl border transition-all p-6 backdrop-blur-xl flex flex-col justify-between ${
                    isExpanded
                      ? 'border-amber-500/50 bg-zinc-900/80 shadow-xl shadow-amber-500/5'
                      : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <span className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-amber-400">
                          <Globe className="h-4 w-4" />
                        </span>
                        <span className="text-base font-black">{plat.name}</span>
                      </span>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        plat.badge === 'مجاني 100%'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {plat.badge}
                      </span>
                    </div>

                    <h4 className="mt-3 text-sm font-bold text-amber-300">
                      {plat.arabicName}
                    </h4>

                    <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                      {plat.howItWorks}
                    </p>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80">
                      <span className="text-[11px] font-bold text-zinc-400 block mb-1.5">ماذا تنشر على هذه المنصة؟</span>
                      <ul className="space-y-1 text-xs text-zinc-300">
                        {plat.whatToPublish.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-3 text-xs animate-in fade-in duration-200">
                        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-zinc-300">
                          <strong className="text-amber-400 block mb-0.5">نصيحة للمبتدئين:</strong>
                          <span>{plat.beginnerAdvice}</span>
                        </div>

                        <div>
                          <strong className="text-rose-400 block mb-1">أخطاء قاتلة تجنبها:</strong>
                          <ul className="space-y-1 text-zinc-400">
                            {plat.commonMistakes.map((m, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                <span className="text-rose-400">×</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="text-[11px] text-zinc-400 italic bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/10">
                          <strong className="text-amber-300">توقعات واقعية: </strong>
                          {plat.realisticTrafficExpectation}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 font-medium truncate max-w-[170px]">
                      {plat.pricingType}
                    </span>

                    <button
                      onClick={() => setExpandedTrafficId(isExpanded ? null : plat.id)}
                      className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'طي التفاصيل' : 'عرض التفاصيل'}</span>
                      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </section>

        {/* ------------------------------------------------------------- */}
        {/* MODULE 07 — روابط الأفيلييت (Affiliate Links Strategy) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="mod-07"
          ref={(el) => { moduleRefs.current['mod-07'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>07 — استراتيجية روابط الأفيلييت</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                أين تضع الروابط، صفحات الهبوط، والتتبع والإفصاح
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                كيف تتجنب حظر حساباتك في السوشيال ميديا، وتصنع صفحات روابط احترافية مجانية، وتلتزم بالشفافية القانونية.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {affiliateLinkGuides.map((guide, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-xl space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {guide.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-300 font-medium leading-relaxed bg-zinc-950 p-3 rounded-2xl border border-zinc-800/60">
                  {guide.summary}
                </p>

                <ul className="space-y-2 text-xs text-zinc-400">
                  {guide.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-zinc-300 leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </section>

        {/* ------------------------------------------------------------- */}
        {/* MODULE 08 — الأدوات التفاعلية (Interactive Tools) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="mod-08"
          ref={(el) => { moduleRefs.current['mod-08'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>08 — الأدوات والحاسبات التفاعلية</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                حاسبة العمولات والأرباح ومولد أفكار النيتش والسكربتات
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                أدوات رياضية عملية مبرمجة تعمل بالكامل لحساب الأرباح ومحاكاة قمع المبيعات وتوليد أفكار المحتوى.
              </p>
            </div>
          </div>

          {/* Calculators Component */}
          <AffiliateCalculators onCopyText={onCopyText} />

        </section>

        {/* ------------------------------------------------------------- */}
        {/* MODULE 09 — خطة الـ 7 أيام للبدء العملي */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="mod-09"
          ref={(el) => { moduleRefs.current['mod-09'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>09 — خطة الـ 7 أيام (7-Day Action Plan)</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                خريطة التطبيق الفعلي خطوة بخطوة من الصفر
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                اليوم 1: النيتش • اليوم 2: البرامج • اليوم 3: العرض • اليوم 4: الحسابات • اليوم 5: المحتوى • اليوم 6: النشر • اليوم 7: التحليل والتحسين.
              </p>
            </div>
          </div>

          {/* Action Plan Interactive Component */}
          <AffiliateActionPlan />

        </section>

        {/* ------------------------------------------------------------- */}
        {/* MODULE 10 — الأسئلة الشائعة للمبتدئين (FAQ) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="mod-10"
          ref={(el) => { moduleRefs.current['mod-10'] = el; }}
          className="space-y-6 pt-4 scroll-mt-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap border-b border-zinc-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg">
                <span>10 — الأسئلة الشائعة (FAQ)</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                إجابات صريحة ومباشرة عن أهم تساؤلات المبتدئين
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                واش نقدر نبدأ بلا فلوس؟ واش المغرب مقبول؟ واش خاصني Website؟ واش كاين ضمان للربح؟
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {affiliateFaqsData.map((faq) => {
              const isOpen = expandedFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen 
                      ? 'border-amber-500/40 bg-zinc-900/80 shadow-md' 
                      : 'border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-right flex items-center justify-between gap-4 select-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-amber-400 shrink-0" />
                      <span>{faq.question}</span>
                    </span>

                    <span className="p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 shrink-0">
                      {isOpen ? <ChevronUp className="h-4 w-4 text-amber-400" /> : <ChevronDown className="h-4 w-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-zinc-800/50 text-xs sm:text-sm text-zinc-300 leading-relaxed animate-in fade-in duration-200">
                      <p className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 text-zinc-300">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </section>

        {/* ------------------------------------------------------------- */}
        {/* Bottom Conclusion & Ready to Start CTA */}
        {/* ------------------------------------------------------------- */}
        <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-zinc-950 to-orange-500/10 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 h-40 w-96 rounded-full bg-amber-500/20 blur-3xl" />
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400">
              <Award className="h-4 w-4" />
              <span>جاهز للانطلاق العملي؟</span>
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              دخلت Affiliate Marketing ← عرفت منين نبدأ ← طبقت خطة 7 أيام
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              المعرفة النظرية لا تساوي شيئاً بدون التنفيذ. افتح خطة الـ 7 أيام أعلاه، اختر نيتشك اليوم، وابدأ في نشر أول محتوى بهاتفك.
            </p>

            <div className="pt-3 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => scrollToModule('mod-09')}
                className="flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-3 text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition-all active:scale-95"
              >
                <span>ابدأ اليوم الأول من الخطة دابا</span>
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigate('home')}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-xs sm:text-sm font-bold text-zinc-300 hover:text-white transition-all"
              >
                العودة للرئيسية
              </button>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
};
