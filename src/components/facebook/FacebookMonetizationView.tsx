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
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle, 
  Calendar, 
  RotateCcw, 
  Video, 
  Eye, 
  Users, 
  FileText,
  Share2,
  ThumbsUp,
  MessageCircle,
  Award,
  Layers,
  Clock,
  Target
} from 'lucide-react';
import { 
  facebookStagesData, 
  facebookMonetizationPrograms, 
  facebookTemplatesData, 
  facebookMistakesData, 
  facebookThirtyDayPlan, 
  FacebookStage, 
  FacebookReelsTemplate 
} from '../../data/facebookMonetizationData';
import { FacebookCalculators } from './FacebookCalculators';

interface FacebookMonetizationViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const FB_TASKS_KEY = 'rikouzone_fb_action_tasks';
const FB_READ_LESSONS_KEY = 'rikouzone_fb_read_lessons';
const FB_CHALLENGES_KEY = 'rikouzone_fb_challenges';

export const FacebookMonetizationView: React.FC<FacebookMonetizationViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // 1. Stage and Lessons state
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);

  const [readLessons, setReadLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FB_READ_LESSONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [completedChallenges, setCompletedChallenges] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(FB_CHALLENGES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // 2. 30-Day Action Plan state
  const [completedPlanDays, setCompletedPlanDays] = useState<Record<number, boolean>>(() => {
    try {
      const stored = localStorage.getItem(FB_TASKS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [activeWeekNumber, setActiveWeekNumber] = useState<number>(1);

  // 3. Template filter & copied state
  const [selectedTplCategory, setSelectedTplCategory] = useState<string>('all');
  const [copiedTplId, setCopiedTplId] = useState<string | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(FB_READ_LESSONS_KEY, JSON.stringify(readLessons));
    } catch (e) {
      console.warn('Failed to save read lessons:', e);
    }
  }, [readLessons]);

  useEffect(() => {
    try {
      localStorage.setItem(FB_CHALLENGES_KEY, JSON.stringify(completedChallenges));
    } catch (e) {
      console.warn('Failed to save completed challenges:', e);
    }
  }, [completedChallenges]);

  useEffect(() => {
    try {
      localStorage.setItem(FB_TASKS_KEY, JSON.stringify(completedPlanDays));
    } catch (e) {
      console.warn('Failed to save action plan days:', e);
    }
  }, [completedPlanDays]);

  const currentStage = facebookStagesData[activeStageIndex];
  const currentLesson = currentStage?.lessons[activeLessonIndex];

  // Mark lesson as read automatically when opened
  useEffect(() => {
    if (currentLesson && !readLessons.includes(currentLesson.id)) {
      setReadLessons(prev => [...prev, currentLesson.id]);
    }
  }, [currentLesson, readLessons]);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleChallenge = (challengeId: string) => {
    setCompletedChallenges(prev => ({ ...prev, [challengeId]: !prev[challengeId] }));
  };

  const togglePlanDay = (dayNumber: number) => {
    setCompletedPlanDays(prev => ({ ...prev, [dayNumber]: !prev[dayNumber] }));
  };

  const totalLessons = facebookStagesData.flatMap(s => s.lessons);
  const doneLessonsCount = readLessons.length;
  const doneChallengesCount = Object.values(completedChallenges).filter(Boolean).length;

  const totalDays = facebookThirtyDayPlan.length;
  const doneDaysCount = Object.values(completedPlanDays).filter(Boolean).length;
  const planProgress = Math.round((doneDaysCount / totalDays) * 100);

  const filteredTemplates = selectedTplCategory === 'all'
    ? facebookTemplatesData
    : facebookTemplatesData.filter(t => t.category === selectedTplCategory);

  const handleCopyTemplate = (tpl: FacebookReelsTemplate) => {
    onCopyText(tpl.templateText, `تم نسخ "${tpl.title}" بنجاح!`);
    setCopiedTplId(tpl.id);
    setTimeout(() => setCopiedTplId(null), 2500);
  };

  const navJumpList = [
    { id: 'sec-stages', label: 'المراحل الـ 7 العملية' },
    { id: 'sec-monetization', label: 'طرق الربح من فيسبوك' },
    { id: 'sec-tools', label: 'الأدوات والحاسبات' },
    { id: 'sec-templates', label: 'قوالب السكربتات والـ Hooks' },
    { id: 'sec-plan', label: 'خطة الـ 30 يوماً' },
    { id: 'sec-mistakes', label: 'أخطاء تجنبها' },
  ];

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 pb-24" dir="rtl">
      
      {/* ------------------------------------------------------------- */}
      {/* HERO / HEADER SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-zinc-800/80 bg-gradient-to-b from-blue-600/10 via-zinc-950 to-[#060608] pt-8 pb-14">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-blue-500/10 blur-[130px]" />
        
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
            <span className="font-bold text-amber-400">الربح من فيسبوك والريلز (Facebook Pages & Reels)</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-black text-amber-400 shadow-sm shadow-amber-500/10">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span>دليل بناء الأصول الرقمية لعام 2026</span>
                </span>
                <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-bold text-blue-400">
                  صفحات فيسبوك + مقاطع Reels
                </span>
                <span className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400">
                  عملي للمبتدئين بدون وعود أرباح زائفة
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans">
                الربح من فيسبوك والريلز
              </h1>

              <h2 className="text-xl sm:text-2xl font-bold text-amber-400">
                من إنشاء وتجهيز الصفحة إلى صناعة الريلز، فهم خوارزمية المشاركات، وتفعيل برامج الدخل
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                مسار تطبيقي خطوة بخطوة للمبتدئ: كيفية تجهيز صفحة احترافية، اختيار مواضيع مطلوبة بدون سرقة محتوى، هندسة أول 3 ثوانٍ في الريلز، فهم تقارير Insights، شروط برامج Meta الرسمية، وخطة 30 يوماً تفاعلية مع تحديات يومية.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => scrollToSection('sec-stages')}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3.5 text-sm font-black text-black shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-orange-400 transition-all active:scale-95"
                >
                  <span>ابدأ المراحل العملية الـ 7</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={() => scrollToSection('sec-tools')}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 px-5 py-3.5 text-sm font-bold text-zinc-200 hover:border-amber-500/40 hover:text-white transition-all"
                >
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  <span>فاحص أهلية الصفحة ومولد السكربتات</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Progress Card */}
            <div className="lg:col-span-4 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                <span className="text-xs font-bold text-zinc-400">إنجاز خطة الـ 30 يوماً</span>
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
                  <span className="text-[10px] text-zinc-500 font-medium block">المراحل والدروس</span>
                  <span className="text-lg font-black text-white font-mono mt-0.5 block">
                    {doneLessonsCount} / {totalLessons.length}
                  </span>
                </div>
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3">
                  <span className="text-[10px] text-zinc-500 font-medium block">التحديات المنجزة</span>
                  <span className="text-lg font-black text-amber-400 font-mono mt-0.5 block">
                    {doneChallengesCount} / {facebookStagesData.length}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                <span>تخزين التقدم تلقائي محلياً</span>
                <button
                  onClick={() => {
                    setCompletedPlanDays({});
                    setReadLessons([]);
                    setCompletedChallenges({});
                    onCopyText('', 'تمت إعادة ضبط تقدمك في مسار فيسبوك بنجاح');
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
        {/* SECTION 1: 7 PRACTICAL STAGES (المراحل الـ 7 العملية) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-stages" 
          ref={(el) => { sectionRefs.current['sec-stages'] = el; }}
          className="space-y-8 scroll-mt-20"
        >
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <span>خارطة التعلم والتطبيق</span>
              <span>•</span>
              <span>7 مراحل متسلسلة</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              المراحل الـ 7 لبناء وإطلاق وتسييل صفحة فيسبوك
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-3xl leading-relaxed">
              انتقل عبر المراحل من إنشاء الصفحة والهوية إلى إنتاج الريلز، فهم خوارزمية المشاركات، واختبار التحدي العملي (Mini Challenge) في نهاية كل مرحلة.
            </p>
          </div>

          {/* Stage Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {facebookStagesData.map((stage, sIdx) => {
              const isActive = sIdx === activeStageIndex;
              const isChDone = !!completedChallenges[stage.challenge.id];

              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    setActiveStageIndex(sIdx);
                    setActiveLessonIndex(0);
                  }}
                  className={`text-right rounded-2xl p-3 border transition-all ${
                    isActive
                      ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-amber-400">مرحلة 0{stage.stageNumber}</span>
                    {isChDone ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 text-zinc-600" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">
                    {stage.badge}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Current Stage Detailed Display */}
          {currentStage && (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 sm:p-8 backdrop-blur-xl space-y-8">
              
              {/* Stage Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-xs font-bold text-amber-400">
                    المرحلة {currentStage.stageNumber} من 7
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {currentStage.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                    {currentStage.shortDesc}
                  </p>
                </div>

                {/* Sub-lessons selector pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {currentStage.lessons.map((lesson, lIdx) => {
                    const isSelectedLesson = lIdx === activeLessonIndex;
                    const isLessonRead = readLessons.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLessonIndex(lIdx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isSelectedLesson
                            ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                            : 'border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {isLessonRead && <CheckCircle2 className="h-3 w-3" />}
                        <span>الدرس 0{lIdx + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Lesson Content Box */}
              {currentLesson && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-black text-white flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span>{currentLesson.title}</span>
                    </h4>
                    <span className="text-xs text-zinc-500 font-mono">
                      {currentLesson.shortDesc}
                    </span>
                  </div>

                  {/* Golden Takeaway */}
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-5 flex items-start gap-3.5">
                    <Award className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-black text-amber-300 block">الخلاصة العملية للدرس:</span>
                      <p className="mt-1 text-sm font-semibold text-zinc-200 leading-relaxed">
                        {currentLesson.keyTakeaway}
                      </p>
                    </div>
                  </div>

                  {/* Content Paragraphs */}
                  <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
                    {currentLesson.content.map((p, pIdx) => (
                      <p key={pIdx} className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-3.5">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Practical Example */}
                  {currentLesson.practicalExample && (
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <span className="text-xs font-black text-emerald-400 block mb-1">💡 مثال تطبيقي واضح:</span>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {currentLesson.practicalExample}
                      </p>
                    </div>
                  )}

                  {/* Warning if present */}
                  {currentLesson.warning && (
                    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-rose-200 leading-relaxed font-semibold">
                        {currentLesson.warning}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Stage Mini Challenge Box */}
              <div className="pt-6 border-t border-zinc-800/80">
                <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-950 p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-amber-400 shrink-0" />
                      <h5 className="text-sm font-black text-white">
                        {currentStage.challenge.title}
                      </h5>
                    </div>

                    <button
                      onClick={() => toggleChallenge(currentStage.challenge.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                        completedChallenges[currentStage.challenge.id]
                          ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                          : 'bg-zinc-800 text-zinc-200 hover:bg-amber-500 hover:text-black'
                      }`}
                    >
                      {completedChallenges[currentStage.challenge.id] ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>أنجزت التحدي بنجاح ✅</span>
                        </>
                      ) : (
                        <span>تأكيد إنجاز التحدي</span>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    <strong>المهمة المطلوبة:</strong> {currentStage.challenge.task}
                  </p>
                  <p className="text-[11px] text-amber-300/80">
                    💡 النتيجة المتوقعة: {currentStage.challenge.outputHint}
                  </p>
                </div>
              </div>

            </div>
          )}

        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 2: MONETIZATION PROGRAMS (طرق تحقيق الدخل) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-monetization" 
          ref={(el) => { sectionRefs.current['sec-monetization'] = el; }}
          className="space-y-6 scroll-mt-20"
        >
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <span>طرق تحقيق الدخل الرسمية</span>
              <span>•</span>
              <span>برامج Meta الحديثة</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              برامج تحقيق الدخل المتاحة من فيسبوك وشروطها
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-3xl leading-relaxed">
              شرح مفصل لكل برنامج ربحي رسمي مع معايير الأهلية الحالية. تنبيه: تختلف الشروط والبرامج حسب بلد الحساب ونوعه وتخضع للتحديث الدوري من Meta دون أي وعود أرباح مضمونة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {facebookMonetizationPrograms.map((prog) => (
              <div
                key={prog.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all hover:bg-zinc-900/80 space-y-4"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`rounded-xl px-3 py-1 text-xs font-bold border ${prog.badgeColor}`}>
                      {prog.badge}
                    </span>
                    <span className="text-[11px] font-bold text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
                      برنامج رسمي
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white">
                    {prog.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {prog.description}
                  </p>

                  {/* Requirements List */}
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-2">
                    <span className="text-xs font-bold text-zinc-400 block">شروط الأهلية والقبول:</span>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {prog.requirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Availability Note */}
                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/90 p-3 text-[11px] text-zinc-400 leading-relaxed flex items-start gap-2">
                    <HelpCircle className="h-3.5 w-3.5 text-zinc-500 shrink-0 mt-0.5" />
                    <span><strong>حالة التوفر الجغرافي:</strong> {prog.availabilityNotice}</span>
                  </div>

                  {/* How it works steps */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-bold text-zinc-400 block">كيف تبدأ التطبيق؟</span>
                    {prog.howItWorks.map((step, sIdx) => (
                      <div key={sIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="text-amber-400 font-mono font-bold shrink-0">{sIdx + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-medium">نظام العوائد والدفع:</span>
                  <span className="font-bold text-amber-400 font-mono">{prog.payoutDetails}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 3: CALCULATORS & INTERACTIVE SUITE */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-tools" 
          ref={(el) => { sectionRefs.current['sec-tools'] = el; }}
          className="space-y-6 scroll-mt-20"
        >
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <span>الأدوات التفاعلية</span>
              <span>•</span>
              <span>فحص الأهلية وصياغة السكربت</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              أدوات فحص صفحة فيسبوك وهندسة المحتوى
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-3xl leading-relaxed">
              فاحص جاهزية برامج Meta، منشئ هوية وبايو الصفحة، مولد سكربت الريلز المخصص، وحاسبة وزن المشاركات والانتشار الفيروسي.
            </p>
          </div>

          <FacebookCalculators onCopyText={onCopyText} />
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 4: TEMPLATES LIBRARY */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-templates" 
          ref={(el) => { sectionRefs.current['sec-templates'] = el; }}
          className="space-y-6 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                <span>قوالب جاهزة للنسخ</span>
                <span>•</span>
                <span>Copyable Suite</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
                مكتبة قوالب الهوكس والسكربتات ونداءات التفاعل
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'Hooks', label: 'هوك خطاف' },
                { id: 'Scripts', label: 'سكربتات ريلز' },
                { id: 'Bio', label: 'بايو الصفحة' },
                { id: 'Captions', label: 'وصف الريلز' },
                { id: 'CTAs', label: 'نداءات التفاعل' },
                { id: 'Calendar', label: 'جدول النشر' },
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
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 5: 30-DAY PRACTICAL PLAN (خطة 30 يوم) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-plan" 
          ref={(el) => { sectionRefs.current['sec-plan'] = el; }}
          className="space-y-6 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                <span>خطة التنفيذ والانضباط</span>
                <span>•</span>
                <span>30 يوماً خطوة بخطوة</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
                خطة 30 يوم العملية لإطلاق وتطوير صفحة فيسبوك
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
              <span>{doneDaysCount} من {totalDays} يوم منجز ({planProgress}%)</span>
            </div>
          </div>

          {/* Week Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { num: 1, title: 'الأسبوع 1', subtitle: 'التأسيس وأول ريلز' },
              { num: 2, title: 'الأسبوع 2', subtitle: 'الإنتاج والـ Batching' },
              { num: 3, title: 'الأسبوع 3', subtitle: 'مضاعفة الوصول والفيديو الطويل' },
              { num: 4, title: 'الأسبوع 4', subtitle: 'التسييل والأهلية' },
            ].map((w) => {
              const isCurrentWeek = w.num === activeWeekNumber;
              const weekDays = facebookThirtyDayPlan.filter(d => d.weekNumber === w.num);
              const weekDone = weekDays.filter(d => !!completedPlanDays[d.dayNumber]).length;

              return (
                <button
                  key={w.num}
                  onClick={() => setActiveWeekNumber(w.num)}
                  className={`text-right rounded-2xl p-4 border transition-all ${
                    isCurrentWeek
                      ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                      : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-400">{w.title}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{weekDone}/{weekDays.length}</span>
                  </div>
                  <h4 className="text-xs font-black text-white">{w.subtitle}</h4>
                </button>
              );
            })}
          </div>

          {/* Active Week Day Cards */}
          <div className="space-y-3">
            {facebookThirtyDayPlan
              .filter(d => d.weekNumber === activeWeekNumber)
              .map((day) => {
                const isDone = !!completedPlanDays[day.dayNumber];

                return (
                  <div
                    key={day.dayNumber}
                    className={`rounded-2xl border p-4 sm:p-5 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isDone
                        ? 'border-emerald-500/40 bg-emerald-500/5'
                        : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <button
                        onClick={() => togglePlanDay(day.dayNumber)}
                        className={`mt-0.5 h-6 w-6 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                          isDone
                            ? 'border-emerald-500 bg-emerald-500 text-black'
                            : 'border-zinc-700 bg-zinc-950 hover:border-amber-500'
                        }`}
                      >
                        {isDone && <Check className="h-4 w-4 stroke-[3]" />}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-400">اليوم {day.dayNumber}</span>
                          <span className="text-sm font-bold text-white">{day.title}</span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {day.task}
                        </p>
                        <div className="flex items-center gap-3 pt-1 text-[11px] text-zinc-400 flex-wrap">
                          <span>🎯 <strong>المحتوى:</strong> {day.reelsCount}</span>
                          <span>•</span>
                          <span>📊 <strong>المقياس:</strong> {day.metricsToTrack}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 w-full sm:w-auto text-left">
                      <span className="text-[11px] text-zinc-500 block max-w-xs text-right sm:text-left">
                        💡 {day.optimizationTip}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 6: COMMON MISTAKES (أخطاء تجنبها) */}
        {/* ------------------------------------------------------------- */}
        <section 
          id="sec-mistakes" 
          ref={(el) => { sectionRefs.current['sec-mistakes'] = el; }}
          className="space-y-6 scroll-mt-20"
        >
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-black text-rose-400 uppercase tracking-wider">
              <span>الأخطاء والعقوبات</span>
              <span>•</span>
              <span>حماية صفحتك</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              6 أخطاء قاتلة تجنبها لحماية صفحتك من الحظر وتقييد الأرباح
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-3xl leading-relaxed">
              احذر هذه الممارسات التي تؤدي فوراً لوقف الأرباح وفقدان التوصية بالصفحة وحظر حساب العوائد البنكية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {facebookMistakesData.map((m) => (
              <div 
                key={m.id}
                className="rounded-3xl border border-rose-500/20 bg-zinc-900/50 p-6 space-y-3.5 hover:border-rose-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-lg">
                      {m.category}
                    </span>
                    <AlertTriangle className="h-4 w-4 text-rose-400" />
                  </div>

                  <h3 className="text-base font-black text-white">
                    {m.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-zinc-300">
                    <span className="text-zinc-500 block font-semibold">الممارسة الخاطئة:</span>
                    <p className="leading-relaxed">{m.mistake}</p>
                  </div>

                  <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-xs text-rose-300 leading-relaxed">
                    <strong>عقوبة فيسبوك:</strong> {m.consequence}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 text-xs text-emerald-400 leading-relaxed font-semibold">
                  ✅ الحل الصحيح: {m.solution}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
};
