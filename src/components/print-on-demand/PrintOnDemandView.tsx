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
  FileText,
  Target,
  Layers,
  Wrench,
  Award,
  BookOpen,
  Info,
  Zap,
  Globe,
  Calendar,
  Calculator,
  ShoppingBag,
  Palette,
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  podCurriculum, 
  podModuleCategoriesList, 
  PodLesson 
} from '../../data/printOnDemandData';
import { PodProfitCalculator } from './PodProfitCalculator';
import { PodPlatformsComparisonView } from './PodPlatformsComparisonView';
import { PodChecklistAndQuiz } from './PodChecklistAndQuiz';

interface PrintOnDemandViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const POD_COMPLETED_LESSONS_KEY = 'rikouzone_pod_completed_lessons';

export const PrintOnDemandView: React.FC<PrintOnDemandViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const { isRTL } = useLanguage();
  const ArrowBackIcon = isRTL ? ArrowRight : ArrowLeft;
  const ArrowNextIcon = isRTL ? ArrowLeft : ArrowRight;

  // Tabs: 'lessons' | 'calculator' | 'platforms' | 'checklist'
  const [activeTab, setActiveTab] = useState<'lessons' | 'calculator' | 'platforms' | 'checklist'>('lessons');

  // Filter lessons
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active lesson
  const [activeLessonId, setActiveLessonId] = useState<string>(podCurriculum[0].id);

  // Completed lessons
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(POD_COMPLETED_LESSONS_KEY);
      return stored ? JSON.parse(stored) : [podCurriculum[0].id];
    } catch {
      return [podCurriculum[0].id];
    }
  });

  // Quiz state inside active lesson
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem(POD_COMPLETED_LESSONS_KEY, JSON.stringify(completedLessons));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessons]);

  const toggleLessonCompletion = (id: string) => {
    setCompletedLessons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredLessons = podCurriculum.filter((lesson) => {
    const matchesModule = selectedModuleFilter === 'all' || lesson.moduleCategory === selectedModuleFilter;
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.overview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  const activeLessonIndex = podCurriculum.findIndex((l) => l.id === activeLessonId);
  const activeLesson: PodLesson = podCurriculum[activeLessonIndex] || podCurriculum[0];

  const handleSelectQuizAnswer = (lessonId: string, optIdx: number) => {
    if (quizSubmitted[lessonId]) return;
    setQuizAnswers((prev) => ({ ...prev, [lessonId]: optIdx }));
  };

  const handleSubmitQuiz = (lessonId: string) => {
    if (quizAnswers[lessonId] === undefined) return;
    setQuizSubmitted((prev) => ({ ...prev, [lessonId]: true }));
    if (quizAnswers[lessonId] === activeLesson.quiz?.correctIndex) {
      if (!completedLessons.includes(lessonId)) {
        toggleLessonCompletion(lessonId);
      }
    }
  };

  const progressPercentage = Math.round((completedLessons.length / podCurriculum.length) * 100);

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top Breadcrumb & Hero Banner */}
      <div className="relative border-b border-zinc-800/80 bg-gradient-to-b from-amber-950/20 via-zinc-950 to-[#060608] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
            <button
              onClick={() => onNavigate('income')}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowBackIcon className="h-3.5 w-3.5" />
              <span>مجالات الدخل</span>
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-amber-400 font-bold">الطباعة عند الطلب (Print on Demand - POD)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-bold text-amber-400 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>مسار تعليمي متكامل 2026 · صفر مخزون</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                دليل احتراف الطباعة عند الطلب (POD)
              </h1>

              <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
                منهج تعليمي عملي يأخذك من الصفر: صمم منتجاتك (ملابس، أكواب، ملصقات، ديكورات)، اعرضها في الأسواق العالمية، وعندما يشتري الزبون تتكفل شركات الطباعة بالتصنيع والشحن مباشرة دون أن تشتري أي مخزون مسبق.
              </p>

              {/* Progress Summary */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-xl px-3 py-1.5 font-sans">
                  <span className="text-zinc-400">التقدم في المسار:</span>
                  <span className="font-bold text-amber-400 font-mono">
                    {completedLessons.length} / {podCurriculum.length} دروس ({progressPercentage}%)
                  </span>
                </div>
                <div className="h-2 w-36 overflow-hidden rounded-full bg-zinc-800 border border-zinc-700">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Metrics Badge Card */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-xl shadow-xl space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">رأس المال المسبق للبضاعة:</span>
                  <span className="font-bold text-emerald-400 font-mono">0$ (لا يوجد مخزون)</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">هوامش الربح الشائعة:</span>
                  <span className="font-bold text-amber-400 font-mono">25% - 40% / قطعة</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">الزمن المتوقع لأول مبيعة:</span>
                  <span className="font-bold text-zinc-200">2 - 5 أسابيع</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">طبيعة العمل:</span>
                  <span className="font-bold text-blue-400">رقمي كامل من المنزل</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'lessons', label: 'المقرر والدروس (8 وحدات)', icon: BookOpen },
              { id: 'calculator', label: 'حاسبة الأرباح والتكاليف', icon: Calculator },
              { id: 'platforms', label: 'مقارنة المنصات والموردين', icon: Layers },
              { id: 'checklist', label: 'قائمة الجاهزية والاختبار', icon: ShieldCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black'
                      : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
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

      {/* Main Workspace Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: CURRICULUM & LESSONS */}
        {activeTab === 'lessons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar: Lesson Directory */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-amber-400" />
                    <span>فهرس الدروس والوحدات</span>
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {podCurriculum.length} دروس
                  </span>
                </div>

                {/* Search in lessons */}
                <div className="relative">
                  <Search className="absolute top-2.5 right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث في محتوى الدروس..."
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 py-2 px-9 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute top-2.5 left-3 rtl:left-3 rtl:right-auto ltr:right-3 ltr:left-auto text-[10px] text-zinc-400 hover:text-white"
                    >
                      مسح
                    </button>
                  )}
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-1.5">
                  {podModuleCategoriesList.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedModuleFilter(cat.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        selectedModuleFilter === cat.id
                          ? 'bg-amber-500 text-black'
                          : 'bg-zinc-800/60 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Lesson List */}
                <div className="space-y-2 pt-2 border-t border-zinc-800/80 max-h-[600px] overflow-y-auto pr-1">
                  {filteredLessons.map((lesson, idx) => {
                    const isSelected = lesson.id === activeLessonId;
                    const isCompleted = completedLessons.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setActiveLessonId(lesson.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500/10 shadow-sm'
                            : 'border-zinc-800/70 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-900/60'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLessonCompletion(lesson.id);
                          }}
                          className="mt-0.5 shrink-0 text-zinc-500 hover:text-amber-400"
                          title={isCompleted ? 'تمييز كغير مكتمل' : 'تمييز كمكتمل'}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Circle className="h-4 w-4 text-zinc-600" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                            <span>درس {lesson.moduleNumber}</span>
                          </div>
                          <div className={`mt-0.5 text-xs font-bold leading-snug line-clamp-2 ${
                            isSelected ? 'text-amber-300' : 'text-zinc-200'
                          }`}>
                            {lesson.title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Column: Active Lesson Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl">
                {/* Lesson Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-400">
                        الوحدة {activeLesson.moduleNumber}
                      </span>
                      {completedLessons.includes(activeLesson.id) && (
                        <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>مكتمل</span>
                        </span>
                      )}
                    </div>
                    <h2 className="mt-2 text-xl sm:text-2xl font-black text-white">
                      {activeLesson.title}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                      {activeLesson.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleLessonCompletion(activeLesson.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      completedLessons.includes(activeLesson.id)
                        ? 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                        : 'border border-zinc-700 bg-zinc-800 hover:border-amber-400 text-zinc-200'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>
                      {completedLessons.includes(activeLesson.id) ? 'مكتمل' : 'تحديد كمكتمل'}
                    </span>
                  </button>
                </div>

                {/* Learning Objectives */}
                <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2.5">
                    <Target className="h-4 w-4" />
                    <span>الأهداف التعليمية لهذا الدرس:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300 leading-relaxed">
                    {activeLesson.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lesson Overview */}
                <div className="mt-6 text-xs sm:text-sm text-zinc-200 leading-relaxed space-y-3 bg-zinc-950/60 p-5 rounded-2xl border border-zinc-800/80">
                  <div className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-amber-400" />
                    <span>نظرة عامة وشرح أساسي:</span>
                  </div>
                  <p>{activeLesson.overview}</p>
                </div>

                {/* Key Concepts */}
                {activeLesson.keyConcepts && activeLesson.keyConcepts.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                      <Layers className="h-4 w-4 text-amber-400" />
                      <span>المفاهيم المحورية والشرح المتعمق</span>
                    </h3>

                    <div className="space-y-4">
                      {activeLesson.keyConcepts.map((concept, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 space-y-2 hover:border-zinc-700 transition-all"
                      >
                        <h4 className="text-sm font-bold text-amber-300">
                          {concept.title}
                        </h4>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {concept.explanation}
                        </p>
                        {concept.practicalExample && (
                          <div className="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-200/90 leading-relaxed">
                            <strong className="text-emerald-400 block mb-0.5">مثال عملي توضيحي:</strong>
                            {concept.practicalExample}
                          </div>
                        )}
                      </div>
                    ))}
                    </div>
                  </div>
                )}

                {/* Deep Dive Steps (If lesson 5) */}
                {activeLesson.deepDiveSteps && activeLesson.deepDiveSteps.length > 0 && (
                  <div className="mt-8 space-y-4 pt-6 border-t border-zinc-800/80">
                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-emerald-400" />
                      <span>الخطوات التطبيقية المتسلسلة (خطوة بخطوة)</span>
                    </h3>

                    <div className="space-y-3">
                      {activeLesson.deepDiveSteps.map((step) => (
                        <div
                          key={step.stepNumber}
                          className="rounded-2xl border border-zinc-800/90 bg-zinc-950/80 p-4 space-y-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500 text-black text-[11px] font-black">
                              {step.stepNumber}
                            </span>
                            <span className="text-xs font-bold text-white">
                              {step.title}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed ps-7">
                            {step.detail}
                          </p>
                          {step.proTip && (
                            <div className="ms-7 mt-2 text-[11px] text-amber-300/90 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl">
                              <span className="font-bold">💡 نصيحة محترف: </span>
                              {step.proTip}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Practical Exercise (If available) */}
                {activeLesson.practicalExercise && (
                  <div className="mt-8 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5 space-y-3">
                    <div className="text-xs font-bold text-blue-400 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <span>تمرين عملي تطبيقي: {activeLesson.practicalExercise.task}</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-zinc-300 leading-relaxed ps-1">
                      {activeLesson.practicalExercise.actionSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">{idx + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="text-zinc-400">المخرج المطلوب: </span>
                        <span className="font-bold text-white">{activeLesson.practicalExercise.deliverable}</span>
                      </div>
                      <div className="text-[11px] text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded">
                        سؤال الفحص الذاتي: {activeLesson.practicalExercise.selfCheckQuestion}
                      </div>
                    </div>
                  </div>
                )}

                {/* Mini Quiz */}
                {activeLesson.quiz && (
                  <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-3">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      <span>اختبر فهمك لهذا الدرس:</span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      {activeLesson.quiz.question}
                    </div>

                    <div className="space-y-2 pt-1">
                      {activeLesson.quiz.options.map((opt, optIdx) => {
                        const isChosen = quizAnswers[activeLesson.id] === optIdx;
                        const isSubmitted = quizSubmitted[activeLesson.id];
                        const isCorrect = optIdx === activeLesson.quiz!.correctIndex;

                        let optClass = 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700';
                        if (isSubmitted) {
                          if (isCorrect) {
                            optClass = 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200 font-bold';
                          } else if (isChosen && !isCorrect) {
                            optClass = 'border-rose-500/60 bg-rose-500/15 text-rose-300';
                          }
                        } else if (isChosen) {
                          optClass = 'border-amber-500 bg-amber-500/15 text-amber-300 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isSubmitted}
                            onClick={() => handleSelectQuizAnswer(activeLesson.id, optIdx)}
                            className={`w-full p-2.5 rounded-xl border text-start text-xs transition-all cursor-pointer flex items-center justify-between ${optClass}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && isCorrect && (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 ms-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {!quizSubmitted[activeLesson.id] ? (
                      <button
                        onClick={() => handleSubmitQuiz(activeLesson.id)}
                        disabled={quizAnswers[activeLesson.id] === undefined}
                        className={`mt-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          quizAnswers[activeLesson.id] !== undefined
                            ? 'bg-amber-500 text-black hover:bg-amber-400'
                            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        }`}
                      >
                        تحقق من الإجابة
                      </button>
                    ) : (
                      <div className="mt-2 text-xs text-zinc-400 bg-zinc-900/90 p-3 rounded-xl border border-zinc-800">
                        <strong className="text-emerald-400 block mb-0.5">توضيح: </strong>
                        {activeLesson.quiz.explanation}
                      </div>
                    )}
                  </div>
                )}

                {/* Lesson Takeaway Summary */}
                <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-start gap-3 text-xs text-zinc-300">
                  <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">خلاصة الدرس:</strong>
                    {activeLesson.summary}
                  </div>
                </div>

                {/* Bottom Navigation between lessons */}
                <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between gap-4">
                  {activeLessonIndex > 0 ? (
                    <button
                      onClick={() => setActiveLessonId(podCurriculum[activeLessonIndex - 1].id)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-700 cursor-pointer"
                    >
                      <ArrowBackIcon className="h-4 w-4" />
                      <span>الدرس السابق</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {activeLessonIndex < podCurriculum.length - 1 ? (
                    <button
                      onClick={() => setActiveLessonId(podCurriculum[activeLessonIndex + 1].id)}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-xs font-black text-black cursor-pointer shadow-md shadow-amber-500/20 active:scale-95 transition-all"
                    >
                      <span>الدرس التالي</span>
                      <ArrowNextIcon className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('calculator')}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-xs font-black text-black cursor-pointer shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
                    >
                      <span>الانتقال لحاسبة الأرباح والتكاليف</span>
                      <ArrowNextIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROFIT CALCULATOR */}
        {activeTab === 'calculator' && (
          <PodProfitCalculator />
        )}

        {/* TAB 3: PLATFORMS COMPARISON */}
        {activeTab === 'platforms' && (
          <PodPlatformsComparisonView />
        )}

        {/* TAB 4: CHECKLIST & QUIZ & 7-DAY PLAN */}
        {activeTab === 'checklist' && (
          <PodChecklistAndQuiz />
        )}
      </div>
    </div>
  );
};
