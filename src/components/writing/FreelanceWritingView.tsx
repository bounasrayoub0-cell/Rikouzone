import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
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
  FileText,
  Target,
  Layers,
  Settings,
  Globe,
  Sliders,
  Award,
  Filter,
  ExternalLink,
  Info,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  MessageSquare,
  Wrench,
  CheckSquare,
  Feather
} from 'lucide-react';
import { 
  writingCurriculumStages, 
  writingServicesList, 
  writingNichesList, 
  freelanceWritingTemplates, 
  writingThirtyDayRoadmapData, 
  WritingLesson 
} from '../../data/freelanceWritingData';
import { WritingPricingCalculator } from './WritingPricingCalculator';
import { WritingBeforeAfterComparator } from './WritingBeforeAfterComparator';
import { WritingPortfolioBuilder } from './WritingPortfolioBuilder';
import { WritingFinalQuiz } from './WritingFinalQuiz';
import { useLanguage } from '../../i18n/LanguageContext';

interface FreelanceWritingViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const WRITING_COMPLETED_LESSONS_KEY = 'rikouzone_writing_completed_lessons';
const WRITING_ROADMAP_TASKS_KEY = 'rikouzone_writing_roadmap_tasks';

export const FreelanceWritingView: React.FC<FreelanceWritingViewProps> = ({ onNavigate, onCopyText }) => {
  const { t } = useLanguage();
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<
    'stages' | 'services-niches' | 'pricing' | 'before-after' | 'portfolio-builder' | 'templates' | 'roadmap' | 'quiz'
  >('stages');

  // Active lesson
  const [activeLessonId, setActiveLessonId] = useState<string>(writingCurriculumStages[0].id);

  // Completed lessons state
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WRITING_COMPLETED_LESSONS_KEY);
      return stored ? JSON.parse(stored) : [writingCurriculumStages[0].id];
    } catch {
      return [writingCurriculumStages[0].id];
    }
  });

  // Roadmap tasks state
  const [roadmapTasks, setRoadmapTasks] = useState<Record<number, boolean>>(() => {
    try {
      const stored = localStorage.getItem(WRITING_ROADMAP_TASKS_KEY);
      return stored ? JSON.parse(stored) : { 1: true, 2: true };
    } catch {
      return { 1: true, 2: true };
    }
  });

  // Certificate Modal state
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateName, setCertificateName] = useState('أيوب بوناصر');

  useEffect(() => {
    try {
      localStorage.setItem(WRITING_COMPLETED_LESSONS_KEY, JSON.stringify(completedLessons));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessons]);

  useEffect(() => {
    try {
      localStorage.setItem(WRITING_ROADMAP_TASKS_KEY, JSON.stringify(roadmapTasks));
    } catch (e) {
      console.error(e);
    }
  }, [roadmapTasks]);

  const toggleLessonCompletion = (id: string) => {
    setCompletedLessons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleRoadmapTask = (day: number) => {
    setRoadmapTasks((prev) => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const currentLessonIndex = writingCurriculumStages.findIndex((l) => l.id === activeLessonId);
  const currentLesson: WritingLesson = writingCurriculumStages[currentLessonIndex] || writingCurriculumStages[0];

  const handleNextLesson = () => {
    if (currentLessonIndex < writingCurriculumStages.length - 1) {
      setActiveLessonId(writingCurriculumStages[currentLessonIndex + 1].id);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setActiveLessonId(writingCurriculumStages[currentLessonIndex - 1].id);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const completionPercentage = Math.round(
    (completedLessons.length / writingCurriculumStages.length) * 100
  );

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 pb-24 selection:bg-amber-500 selection:text-black">
      {/* Top Breadcrumb */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => onNavigate('income')}
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            <span>{t.nav.income}</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
            <span className="text-zinc-600">المسار:</span>
            <span className="text-amber-400">كتابة المحتوى المستقل (Freelance Writing)</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="relative border-b border-zinc-800/80 bg-gradient-to-b from-amber-500/10 via-zinc-950/60 to-transparent py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
              <Feather className="h-3.5 w-3.5" />
              <span>دليل كتابة المحتوى المستقل 2026</span>
            </span>
            <span className="rounded-full bg-zinc-800/80 px-3 py-1 text-xs font-semibold text-zinc-300">
              20 مرحلة تطبيقية متكاملة
            </span>
            <span className="rounded-full bg-zinc-800/80 px-3 py-1 text-xs font-semibold text-zinc-300">
              بدون رأس مال وبدون خبرة سابقة
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                دليل احتراف <span className="text-amber-400">كتابة المحتوى المستقل (Freelance Writing)</span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                تعلم كيف تبدأ من الصفر، تطور أسلوبك الكتابي، تختار تخصصك (Niche)، تبني معرض أعمال صادق ومقنع، وتسعر خدماتك بثقة، وتفوز بأول مشروع حقيقي بطرق عملية وأخلاقية.
              </p>
            </div>

            {/* Progress Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-5 min-w-[280px] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-300">التقدم في المسار:</span>
                <span className="text-amber-400 font-mono text-sm">{completionPercentage}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                <span>{completedLessons.length} من أصل 20 مرحلة مكتملة</span>
                {completionPercentage >= 70 && (
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="text-amber-400 hover:underline font-bold flex items-center gap-1"
                  >
                    <Award className="h-3.5 w-3.5" />
                    <span>عرض الشهادة</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Tab Navigation */}
      <div className="sticky top-16 z-30 border-b border-zinc-800/90 bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
            {[
              { id: 'stages', label: 'المراحل الـ 20 التعليمية', icon: BookOpen },
              { id: 'services-niches', label: 'الخدمات والتخصصات (Niches)', icon: Target },
              { id: 'pricing', label: 'حاسبة تسعير المقالات', icon: DollarSign },
              { id: 'before-after', label: 'تحسين الصياغة (قبل وبعد)', icon: Layers },
              { id: 'portfolio-builder', label: 'صانع عينات البورتفوليو', icon: FileText },
              { id: 'templates', label: 'قوالب المقترحات والـ Outreach', icon: MessageSquare },
              { id: 'roadmap', label: 'خطة الـ 30 يوماً التفاعلية', icon: Calendar },
              { id: 'quiz', label: 'الاختبار النهائي والشهادة', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    window.scrollTo({ top: 320, behavior: 'smooth' });
                  }}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        
        {/* TAB 1: 20 STAGES CURRICULUM */}
        {activeTab === 'stages' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar list of 20 stages */}
            <div className="lg:col-span-4 space-y-2">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  مراحل المنهج الـ 20:
                </span>
                <span className="text-xs text-amber-400 font-bold font-mono">
                  {completedLessons.length}/20
                </span>
              </div>

              <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
                {writingCurriculumStages.map((lesson) => {
                  const isActive = lesson.id === activeLessonId;
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveLessonId(lesson.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className={`w-full text-right p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer select-none ${
                        isActive
                          ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                          : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      <button
                        type="button"
                        aria-label="تبديل حالة الإكمال"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonCompletion(lesson.id);
                        }}
                        className="mt-0.5 shrink-0 text-zinc-500 hover:text-amber-400 transition-colors cursor-pointer"
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-400/20" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 text-[10px] text-zinc-500 font-bold">
                          <span>المرحلة {lesson.stageNumber}</span>
                          <span className="font-mono text-zinc-400">{lesson.duration}</span>
                        </div>
                        <div className="text-xs font-bold line-clamp-1 mt-0.5 text-zinc-200">
                          {lesson.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lesson Reader Area */}
            <div className="lg:col-span-8 space-y-6">
              <article className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl">
                {/* Header */}
                <div className="space-y-3 border-b border-zinc-800 pb-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-amber-400">
                      {currentLesson.stageTitle}
                    </span>
                    <span className="rounded-full bg-zinc-900 px-2.5 py-0.5 text-[11px] font-bold text-zinc-300 border border-zinc-800">
                      المستوى: {currentLesson.level} • {currentLesson.duration}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                    {currentLesson.title}
                  </h2>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {currentLesson.summary}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => toggleLessonCompletion(currentLesson.id)}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                        completedLessons.includes(currentLesson.id)
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-amber-500/50'
                      }`}
                    >
                      {completedLessons.includes(currentLesson.id) ? (
                        <>
                          <Check className="h-4 w-4 stroke-[3]" />
                          <span>تم إكمال هذه المرحلة بنجاح</span>
                        </>
                      ) : (
                        <>
                          <Circle className="h-4 w-4" />
                          <span>تحديد المرحلة كمكتملة</span>
                        </>
                      )}
                    </button>

                    <div className="text-xs text-zinc-500 font-mono">
                      المرحلة {currentLesson.stageNumber} من 20
                    </div>
                  </div>
                </div>

                {/* What you will learn */}
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                    <Target className="h-4 w-4" />
                    <span>ما ستتعلمه في هذه المرحلة:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {currentLesson.whatYouWillLearn.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Main Content */}
                <div className="prose prose-invert prose-zinc max-w-none text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-4">
                  {currentLesson.detailedContent.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={idx} className="text-lg sm:text-xl font-black text-white pt-4 pb-1 border-b border-zinc-800/80">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('#### ')) {
                      return (
                        <h4 key={idx} className="text-base font-bold text-amber-300 pt-2">
                          {paragraph.replace('#### ', '')}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('* ')) {
                      const items = paragraph.split('\n* ');
                      return (
                        <ul key={idx} className="space-y-1.5 list-disc list-inside text-zinc-300">
                          {items.map((item, i) => (
                            <li key={i} className="leading-relaxed">{item.replace('* ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={idx} className="leading-relaxed text-zinc-300 whitespace-pre-line">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Action Steps */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-wider">
                    <CheckSquare className="h-4 w-4 text-emerald-400" />
                    <span>خطوات تطبيقية للمبتدئ (Action Steps):</span>
                  </div>
                  <div className="space-y-2">
                    {currentLesson.actionSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[10px] font-bold text-amber-400 font-mono">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro Tip & Mistake Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <Sparkles className="h-4 w-4" />
                      <span>نصيحة محترف (Pro Tip):</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {currentLesson.proTip}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span>تجنب هذا الخطأ:</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {currentLesson.commonMistake}
                    </p>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                  <button
                    onClick={handlePrevLesson}
                    disabled={currentLessonIndex === 0}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      currentLessonIndex === 0
                        ? 'opacity-40 cursor-not-allowed text-zinc-500'
                        : 'border border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
                    }`}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>المرحلة السابقة</span>
                  </button>

                  <button
                    onClick={handleNextLesson}
                    disabled={currentLessonIndex === writingCurriculumStages.length - 1}
                    className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all ${
                      currentLessonIndex === writingCurriculumStages.length - 1
                        ? 'opacity-40 cursor-not-allowed text-zinc-500'
                        : 'bg-amber-500 text-black hover:bg-amber-400 shadow-md font-black'
                    }`}
                  >
                    <span>المرحلة التالية</span>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
              </article>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES & NICHES BREAKDOWN */}
        {activeTab === 'services-niches' && (
          <div className="space-y-12">
            {/* Services Grid */}
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  الخدمات الكتابية العشرة
                </span>
                <h3 className="mt-1 text-2xl font-black text-white">
                  أنواع المحتوى التي يمكنك تقديمها وبيعها لعملائك
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  تشريح كامل لكل خدمة: ما هي، من يحتاجها، مخرجاتها، ومثال عملي مصغر.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {writingServicesList.map((service) => (
                  <div
                    key={service.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 space-y-4 flex flex-col justify-between hover:border-amber-500/40 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                            {service.category}
                          </span>
                          <h4 className="text-base font-bold text-white mt-0.5">
                            {service.title}
                          </h4>
                        </div>
                        <span className="rounded-full bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 text-[10px] font-mono text-zinc-400">
                          {service.typicalWordCount}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {service.whatIsIt}
                      </p>

                      <div className="space-y-2 text-xs pt-1 border-t border-zinc-900">
                        <div>
                          <span className="font-bold text-zinc-400">من يحتاجها: </span>
                          <span className="text-zinc-300">{service.targetClient}</span>
                        </div>
                        <div>
                          <span className="font-bold text-zinc-400">المخرجات: </span>
                          <span className="text-zinc-300">{service.deliverables}</span>
                        </div>
                      </div>

                      {/* Mini Example Box */}
                      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3 space-y-1 text-xs">
                        <span className="text-[11px] font-bold text-amber-400">
                          {service.miniExample.context}
                        </span>
                        <p className="text-zinc-300 italic leading-relaxed text-[11px]">
                          "{service.miniExample.sampleText}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Niches Breakdown */}
            <div className="space-y-6 pt-6 border-t border-zinc-800">
              <div className="border-b border-zinc-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  دليل التخصصات (Niches)
                </span>
                <h3 className="mt-1 text-2xl font-black text-white">
                  أبرز مجالات التخصص في الكتابة ومعايير الاختيار
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  تذكير مهني: لا توجد أي نيتش مضمونة الأرباح، جودة البحث وفهم القارئ هما سر النجاح دائماً.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {writingNichesList.map((niche) => (
                  <div
                    key={niche.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">{niche.title}</h4>
                        <span className="rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 border border-amber-500/20">
                          طلب {niche.demandLevel}
                        </span>
                      </div>

                      <div className="text-xs text-zinc-400">
                        <span className="font-bold text-zinc-300">العملاء: </span>
                        {niche.clientTypes}
                      </div>

                      <div className="text-xs text-zinc-300 space-y-1">
                        <span className="font-bold text-zinc-400 text-[11px] block">أمثلة مواضيع شائعة:</span>
                        <ul className="space-y-1 list-disc list-inside text-[11px] text-zinc-400">
                          {niche.sampleTopics.map((topic, i) => (
                            <li key={i} className="line-clamp-1">{topic}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-900 text-[11px] text-zinc-400">
                      <span className="font-bold text-amber-400">إرشادات: </span>
                      {niche.guidelines}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRICING CALCULATOR */}
        {activeTab === 'pricing' && (
          <WritingPricingCalculator onCopyText={onCopyText} />
        )}

        {/* TAB 4: BEFORE / AFTER COMPARATOR */}
        {activeTab === 'before-after' && (
          <WritingBeforeAfterComparator onCopyText={onCopyText} />
        )}

        {/* TAB 5: PORTFOLIO BUILDER */}
        {activeTab === 'portfolio-builder' && (
          <WritingPortfolioBuilder onCopyText={onCopyText} />
        )}

        {/* TAB 6: TEMPLATES & SCRIPTS */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-2xl font-black text-white">
                قوالب المقترحات والـ Outreach الجاهزة للنسخ والتعديل
              </h3>
              <p className="mt-1 text-sm text-zinc-400">
                سكربتات عملية للتواصل مع الشركات، التقديم على المنصات، واستبيان استلام المشروع من العميل.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freelanceWritingTemplates.map((template) => (
                <div
                  key={template.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">
                        {template.subject}
                      </span>
                      <button
                        onClick={() => onCopyText(template.content, template.title)}
                        className="flex items-center gap-1.5 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span>نسخ</span>
                      </button>
                    </div>

                    <h4 className="text-base font-bold text-white">
                      {template.title}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {template.description}
                    </p>

                    <pre className="mt-3 max-h-56 overflow-y-auto whitespace-pre-wrap rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4 font-mono text-xs text-zinc-300 leading-relaxed dir-ltr text-right">
                      {template.content}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: 30-DAY INTERACTIVE ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-8 backdrop-blur-xl space-y-8">
            <div className="border-b border-zinc-800 pb-5">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                خطة العمل التنفيذية
              </span>
              <h3 className="mt-1 text-2xl font-black text-white">
                خريطة طريق الـ 30 يوماً للانطلاق في كتابة المحتوى المستقل
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                مهام يومية محددة وقابلة للتطبيق (بمعدل 1-2 ساعة يومياً) تأخذك من أول خطوة وحتى أول مشروع مدفوع.
              </p>
            </div>

            {/* Weeks columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((weekNum) => {
                const weekTasks = writingThirtyDayRoadmapData.filter((t) => t.week === weekNum);
                const weekTitle =
                  weekNum === 1
                    ? 'الأسبوع 1: التأسيس واختيار النيتش'
                    : weekNum === 2
                    ? 'الأسبوع 2: كتابة العينات والبورتفوليو'
                    : weekNum === 3
                    ? 'الأسبوع 3: تجهيز الحسابات والأسعار'
                    : 'الأسبوع 4: إرسال العروض وإغلاق أول صفقة';

                return (
                  <div
                    key={weekNum}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-3"
                  >
                    <div className="border-b border-zinc-800 pb-2">
                      <span className="text-[10px] font-bold text-amber-400 uppercase font-mono">
                        WEEK 0{weekNum}
                      </span>
                      <h4 className="text-xs font-bold text-white mt-0.5">{weekTitle}</h4>
                    </div>

                    <div className="space-y-2">
                      {weekTasks.map((task) => {
                        const isDone = !!roadmapTasks[task.day];
                        return (
                          <div
                            key={task.day}
                            onClick={() => toggleRoadmapTask(task.day)}
                            className={`cursor-pointer rounded-xl border p-2.5 transition-all text-xs flex items-start gap-2.5 select-none ${
                              isDone
                                ? 'border-emerald-500/30 bg-emerald-500/5 text-zinc-300'
                                : 'border-zinc-800/80 bg-zinc-950/70 text-zinc-400 hover:border-zinc-700'
                            }`}
                          >
                            <span className="mt-0.5 shrink-0">
                              {isDone ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-400/20" />
                              ) : (
                                <Circle className="h-4 w-4 text-zinc-500" />
                              )}
                            </span>
                            <div>
                              <span className="font-mono text-[10px] text-zinc-500 font-bold ml-1">
                                اليوم {task.day}:
                              </span>
                              <span className={isDone ? 'line-through text-zinc-500' : 'text-zinc-200'}>
                                {task.title}
                              </span>
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

        {/* TAB 8: FINAL QUIZ & CERTIFICATE */}
        {activeTab === 'quiz' && (
          <WritingFinalQuiz onOpenCertificate={() => setShowCertificate(true)} />
        )}
      </main>

      {/* Verified Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-amber-500/40 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                <span className="text-sm font-black text-white">شهادة إتمام مسار كتابة المحتوى المستقل</span>
              </div>
              <button
                onClick={() => setShowCertificate(false)}
                className="text-zinc-400 hover:text-white text-xs font-bold"
              >
                ✕ إغلاق
              </button>
            </div>

            {/* Certificate Canvas Mock */}
            <div className="rounded-2xl border-2 border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-zinc-900 to-zinc-950 p-8 text-center space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
                شهادة إنجاز معتمدة • RikouZone Academy
              </div>
              <h3 className="text-2xl font-black text-white">
                أخصائي كتابة المحتوى المستقل (Certified Freelance Writer)
              </h3>
              <p className="text-xs text-zinc-400">تشهد المنصة بأن المتعلم:</p>
              
              <div className="inline-block border-b-2 border-amber-400 pb-1 px-6">
                <input
                  type="text"
                  value={certificateName}
                  onChange={(e) => setCertificateName(e.target.value)}
                  className="bg-transparent text-xl font-black text-amber-300 text-center focus:outline-none"
                  placeholder="اسمك هنا"
                />
              </div>

              <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                قد أتم بنجاح دراسة المراحل الـ 20 العملية لإتقان كتابة المحتوى، سيو المقالات، بناء نماذج الأعمال، تسعير الخدمات، وتقديم العروض للعملاء باحترافية وأمانة تامة.
              </p>

              <div className="pt-4 flex items-center justify-between text-[11px] text-zinc-500 border-t border-zinc-800">
                <span>تاريخ الإنجاز: {new Date().toLocaleDateString('ar-EG')}</span>
                <span className="font-mono text-amber-400">الكود المعتمد: RZ-WRITE-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-bold text-zinc-200 hover:bg-zinc-800"
              >
                طباعة / حفظ كـ PDF
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-black text-black hover:bg-amber-400"
              >
                تم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
