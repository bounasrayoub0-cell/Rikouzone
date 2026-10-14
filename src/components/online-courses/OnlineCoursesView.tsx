import React, { useState, useMemo, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Calculator, 
  Target, 
  Layers, 
  Server, 
  Headphones, 
  FileText, 
  CalendarCheck, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Search, 
  ArrowRight,
  Clock, 
  Award, 
  HelpCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { 
  onlineCoursesLessons, 
  courseModuleCategories, 
  CourseLesson 
} from '../../data/onlineCoursesData';
import { CourseProfitCalculator } from './CourseProfitCalculator';
import { CourseIdeaValidator } from './CourseIdeaValidator';
import { CourseOutlineBuilder } from './CourseOutlineBuilder';
import { CoursePlatformsComparator } from './CoursePlatformsComparator';
import { CourseSupportSimulator } from './CourseSupportSimulator';
import { CourseTemplatesView } from './CourseTemplatesView';
import { CourseChecklistAndPlan } from './CourseChecklistAndPlan';

interface OnlineCoursesViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const COMPLETED_LESSONS_STORAGE_KEY = 'rikouzone_online_courses_completed_lessons';

export const OnlineCoursesView: React.FC<OnlineCoursesViewProps> = ({ onNavigate, onCopyText }) => {
  const [activeTab, setActiveTab] = useState<
    'modules' | 'calculator' | 'validator' | 'curriculum' | 'platforms' | 'simulator' | 'templates' | 'checklist'
  >('modules');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(onlineCoursesLessons[0].id);

  // Completed Lessons & Quiz State
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(COMPLETED_LESSONS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Sync completed lessons
  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_LESSONS_STORAGE_KEY, JSON.stringify(completedLessonIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessonIds]);

  // Active Lesson
  const activeLesson = useMemo(() => {
    return onlineCoursesLessons.find((l) => l.id === selectedLessonId) || onlineCoursesLessons[0];
  }, [selectedLessonId]);

  // Filtered Lessons
  const filteredLessons = useMemo(() => {
    return onlineCoursesLessons.filter((lesson) => {
      const matchCat = selectedCategory === 'all' || lesson.moduleCategory === selectedCategory;
      const matchSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.overview.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleLessonCompleted = (id: string) => {
    setCompletedLessonIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectQuizOption = (lessonId: string, optionIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [lessonId]: optionIdx }));
    setQuizSubmitted((prev) => ({ ...prev, [lessonId]: true }));
  };

  const activeLessonIndex = onlineCoursesLessons.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = activeLessonIndex > 0 ? onlineCoursesLessons[activeLessonIndex - 1] : null;
  const nextLesson = activeLessonIndex < onlineCoursesLessons.length - 1 ? onlineCoursesLessons[activeLessonIndex + 1] : null;

  const progressPercentage = Math.round((completedLessonIds.length / onlineCoursesLessons.length) * 100);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-24">
      {/* Top Header Hero */}
      <div className="relative border-b border-zinc-800 bg-gradient-to-b from-zinc-900/90 via-zinc-900/60 to-zinc-950 pt-8 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          {/* Breadcrumb / Back button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('income')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
              <span>العودة إلى مسارات الدخل</span>
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>مسار احترافي متكامل 2026</span>
            </div>
          </div>

          {/* Title & Core Pitch */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <GraduationCap className="h-4 w-4" />
              <span>Online Courses & Digital Academies</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              صناعة وبيع الدورات التدريبية الرقمية (Online Courses)
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed">
              حوّل خبرتك أو مهارة تتقنها إلى برنامج تدريبي منظم ومربح يختصر وقت المتعلمين، وانشره وبيعه عبر منصات متطورة بنظام تسويق مستدام وهوامش ربح تقارب 85%.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3.5">
              <div className="text-[11px] text-zinc-400">المنهج الدراسي</div>
              <div className="text-base sm:text-lg font-black text-white mt-0.5">11 وحدة شاملة</div>
            </div>

            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3.5">
              <div className="text-[11px] text-zinc-400">الأدوات التفاعلية</div>
              <div className="text-base sm:text-lg font-black text-amber-400 mt-0.5">6 أدوات وحاسبات</div>
            </div>

            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3.5">
              <div className="text-[11px] text-zinc-400">خطة العمل</div>
              <div className="text-base sm:text-lg font-black text-emerald-400 mt-0.5">14 يوماً للإطلاق</div>
            </div>

            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3.5">
              <div className="text-[11px] text-zinc-400">قائمة التدقيق</div>
              <div className="text-base sm:text-lg font-black text-blue-400 mt-0.5">24 بنداً صارماً</div>
            </div>
          </div>

          {/* Progress Strip */}
          <div className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                {progressPercentage}%
              </div>
              <div>
                <span className="text-xs font-bold text-white block">مستوى إنجاز المسار التدريبي:</span>
                <span className="text-[11px] text-zinc-400">
                  أكملت {completedLessonIds.length} من أصل 11 وحدة دراسية
                </span>
              </div>
            </div>

            <div className="w-full sm:w-64 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-none">
            {[
              { id: 'modules', label: 'المنهج الشامل (11 موديول)', icon: BookOpen },
              { id: 'calculator', label: 'حاسبة الأرباح والتسعير', icon: Calculator },
              { id: 'validator', label: 'مقيّم وصلاحية الفكرة', icon: Target },
              { id: 'curriculum', label: 'باني المنهج الدراسي', icon: Layers },
              { id: 'platforms', label: 'مقارن المنصات (Matrix)', icon: Server },
              { id: 'simulator', label: 'محاكي الدعم والاعتراضات', icon: Headphones },
              { id: 'templates', label: 'القوالب ونصوص البيع', icon: FileText },
              { id: 'checklist', label: 'خطة 14 يوماً وقائمة التحقق', icon: CalendarCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Body Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Tab 1: Modules & Lessons */}
        {activeTab === 'modules' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Filter and Search Bar */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-amber-500 text-black font-black'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  الكل ({onlineCoursesLessons.length})
                </button>
                {courseModuleCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500 text-black font-black'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <Search className="h-3.5 w-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="بحث في الدروس والمفاهيم..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 pr-8 pl-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Split Layout: Module Sidebar List + Detailed Lesson Viewer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar Modules List (4 Cols) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="text-xs font-bold text-zinc-400 px-1 flex items-center justify-between">
                  <span>الوحدات الدراسية ({filteredLessons.length}):</span>
                  <span>انقر لفتح الموديول</span>
                </div>

                <div className="space-y-2.5 max-h-[800px] overflow-y-auto pr-1 scrollbar-thin">
                  {filteredLessons.map((lesson) => {
                    const isSelected = lesson.id === activeLesson.id;
                    const isDone = completedLessonIds.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setSelectedLessonId(lesson.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-right flex items-start gap-3 ${
                          isSelected
                            ? 'border-amber-500 bg-gradient-to-r from-amber-500/15 via-zinc-900 to-zinc-900 shadow-md shadow-amber-500/10'
                            : 'border-zinc-800/80 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-800/50'
                        }`}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLessonCompleted(lesson.id);
                          }}
                          className="mt-0.5 text-zinc-500 hover:text-emerald-400 transition-colors shrink-0"
                          title={isDone ? 'تعليم كغير مكتمل' : 'تعليم كمكتمل'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border border-zinc-600 hover:border-zinc-400" />
                          )}
                        </button>

                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-amber-400 font-bold">
                              الوحدة {lesson.moduleNumber}
                            </span>
                            {isDone && (
                              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                                مكتمل ✓
                              </span>
                            )}
                          </div>
                          <h4 className={`text-xs sm:text-sm font-bold leading-snug ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                            {lesson.title}
                          </h4>
                          <p className="text-[11px] text-zinc-400 line-clamp-1">
                            {lesson.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Lesson Viewer Core (8 Cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8 space-y-6 shadow-2xl">
                  {/* Lesson Header */}
                  <div className="space-y-2 pb-5 border-b border-zinc-800">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        الوحدة {activeLesson.moduleNumber} من 11
                      </span>

                      <button
                        onClick={() => toggleLessonCompleted(activeLesson.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          completedLessonIds.includes(activeLesson.id)
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{completedLessonIds.includes(activeLesson.id) ? 'تمت دراسة الوحدة ✓' : 'تعليم كمكتمل'}</span>
                      </button>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                      {activeLesson.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-amber-400 font-semibold">
                      {activeLesson.subtitle}
                    </p>
                  </div>

                  {/* Overview */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
                    <h5 className="text-xs font-bold text-zinc-300 mb-2 flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-amber-400" />
                      <span>نظرة عامة على الوحدة</span>
                    </h5>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {activeLesson.overview}
                    </p>
                  </div>

                  {/* Learning Objectives */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                      <Target className="h-4 w-4 text-emerald-400" />
                      <span>الأهداف التعليمية والمهارات المكتسبة:</span>
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      {activeLesson.learningObjectives.map((obj, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300"
                        >
                          <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Concepts */}
                  {activeLesson.keyConcepts && activeLesson.keyConcepts.length > 0 && (
                    <div className="space-y-4 pt-2">
                      <h5 className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-amber-400" />
                        <span>المفاهيم الجوهرية والتحليل المعمق:</span>
                      </h5>

                      <div className="space-y-3">
                        {activeLesson.keyConcepts.map((concept, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 space-y-2"
                          >
                            <h6 className="text-sm font-bold text-amber-300">
                              {concept.title}
                            </h6>
                            <p className="text-xs text-zinc-300 leading-relaxed">
                              {concept.explanation}
                            </p>
                            {concept.practicalExample && (
                              <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-[11px] text-zinc-400">
                                💡 <strong className="text-zinc-300">مثال تطبيقي:</strong> {concept.practicalExample}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Deep Dive Action Steps */}
                  {activeLesson.deepDiveSteps && activeLesson.deepDiveSteps.length > 0 && (
                    <div className="space-y-4 pt-2">
                      <h5 className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                        <Layers className="h-4 w-4 text-purple-400" />
                        <span>خطوات التنفيذ الميداني خطوة بخطوة:</span>
                      </h5>

                      <div className="space-y-3">
                        {activeLesson.deepDiveSteps.map((step) => (
                          <div
                            key={step.stepNumber}
                            className="p-4 rounded-2xl border border-zinc-800 bg-zinc-950/40 space-y-2"
                          >
                            <div className="flex items-center gap-2">
                              <span className="h-6 w-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                                {step.stepNumber}
                              </span>
                              <h6 className="text-xs sm:text-sm font-bold text-white">
                                {step.title}
                              </h6>
                            </div>

                            <p className="text-xs text-zinc-300 leading-relaxed pr-8">
                              {step.detail}
                            </p>

                            {step.proTip && (
                              <div className="mr-8 p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-[11px] text-purple-300">
                                ⚡ <strong className="text-purple-200">نصيحة محترف:</strong> {step.proTip}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Practical Exercise Box */}
                  {activeLesson.practicalExercise && (
                    <div className="rounded-2xl border border-amber-500/30 bg-amber-950/10 p-5 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                        <Award className="h-4 w-4" />
                        <span>المهمة التطبيقية المباشرة (التسليم العملي)</span>
                      </div>

                      <h5 className="text-sm font-bold text-white">
                        {activeLesson.practicalExercise.task}
                      </h5>

                      <div className="space-y-1.5 text-xs text-zinc-300">
                        {activeLesson.practicalExercise.actionSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold shrink-0">{idx + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="text-emerald-400 font-semibold">
                          📦 المخرج المطلوب: <span className="text-zinc-200">{activeLesson.practicalExercise.deliverable}</span>
                        </div>
                        <div className="text-zinc-400 text-[11px]">
                          ❓ سؤال التدقيق الذاتي: {activeLesson.practicalExercise.selfCheckQuestion}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quiz Section */}
                  {activeLesson.quiz && (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 space-y-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-zinc-300 flex items-center gap-1.5">
                          <HelpCircle className="h-4 w-4 text-blue-400" />
                          <span>اختبار فهم الوحدة السريع</span>
                        </span>
                        <span className="text-zinc-500 text-[11px]">+20 XP عند الإجابة الصحيحة</span>
                      </div>

                      <h5 className="text-sm font-bold text-white leading-snug">
                        {activeLesson.quiz.question}
                      </h5>

                      <div className="space-y-2">
                        {activeLesson.quiz.options.map((option, idx) => {
                          const isSubmitted = quizSubmitted[activeLesson.id];
                          const isSelected = quizAnswers[activeLesson.id] === idx;
                          const isCorrect = idx === activeLesson.quiz?.correctIndex;

                          let btnStyle = 'border-zinc-800 bg-zinc-900/70 hover:border-zinc-700 text-zinc-300';
                          if (isSubmitted) {
                            if (isCorrect) {
                              btnStyle = 'border-emerald-500 bg-emerald-950/30 text-emerald-200 font-bold';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'border-rose-500 bg-rose-950/30 text-rose-200';
                            }
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => handleSelectQuizOption(activeLesson.id, idx)}
                              className={`w-full text-right p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{option}</span>
                              {isSubmitted && isCorrect && <Check className="h-4 w-4 text-emerald-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted[activeLesson.id] && (
                        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 leading-relaxed animate-fadeIn">
                          💡 <strong className="text-amber-400">الشرح والتوضيح:</strong> {activeLesson.quiz.explanation}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Summary */}
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-400">
                    <strong className="text-zinc-200">الخلاصة الذهبية:</strong> {activeLesson.summary}
                  </div>

                  {/* Bottom Navigation (Prev / Next) */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                    {prevLesson ? (
                      <button
                        onClick={() => setSelectedLessonId(prevLesson.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold cursor-pointer transition-all"
                      >
                        <ChevronRight className="h-4 w-4" />
                        <span>الوحدة السابقة: {prevLesson.title.slice(0, 20)}...</span>
                      </button>
                    ) : <div />}

                    {nextLesson && (
                      <button
                        onClick={() => setSelectedLessonId(nextLesson.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold cursor-pointer transition-all shadow-md shadow-amber-500/20"
                      >
                        <span>الوحدة التالية: {nextLesson.title.slice(0, 20)}...</span>
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Profit & Pricing Calculator */}
        {activeTab === 'calculator' && <CourseProfitCalculator />}

        {/* Tab 3: Idea Validator */}
        {activeTab === 'validator' && <CourseIdeaValidator />}

        {/* Tab 4: Outline Builder */}
        {activeTab === 'curriculum' && <CourseOutlineBuilder onCopyText={onCopyText} />}

        {/* Tab 5: Platforms Matrix */}
        {activeTab === 'platforms' && <CoursePlatformsComparator />}

        {/* Tab 6: Support Simulator */}
        {activeTab === 'simulator' && <CourseSupportSimulator onCopyText={onCopyText} />}

        {/* Tab 7: Templates Swipe Files */}
        {activeTab === 'templates' && <CourseTemplatesView onCopyText={onCopyText} />}

        {/* Tab 8: 14-Day Plan & Checklist */}
        {activeTab === 'checklist' && <CourseChecklistAndPlan />}
      </main>
    </div>
  );
};
