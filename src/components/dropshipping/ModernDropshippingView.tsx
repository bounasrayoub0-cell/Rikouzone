import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Circle, 
  ArrowLeft, 
  ArrowRight, 
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
  RotateCcw,
  Video,
  Scale,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  dropshippingCurriculum, 
  dropshippingModuleCategoriesList, 
  DropshippingLesson 
} from '../../data/dropshippingData';
import { DropshippingProfitCalculator } from './DropshippingProfitCalculator';
import { DropshippingProductScorecard } from './DropshippingProductScorecard';
import { DropshippingTemplatesView } from './DropshippingTemplatesView';
import { DropshippingChecklistAndQuiz } from './DropshippingChecklistAndQuiz';

interface ModernDropshippingViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const DS_COMPLETED_LESSONS_KEY = 'rikouzone_ds_completed_lessons';

export const ModernDropshippingView: React.FC<ModernDropshippingViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const { isRTL } = useLanguage();
  const ArrowBackIcon = isRTL ? ArrowRight : ArrowLeft;
  const ArrowNextIcon = isRTL ? ArrowLeft : ArrowRight;

  // Tabs: 'lessons' | 'calculator' | 'scorecard' | 'templates' | 'checklist'
  const [activeTab, setActiveTab] = useState<'lessons' | 'calculator' | 'scorecard' | 'templates' | 'checklist'>('lessons');

  // Filter lessons
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active lesson
  const [activeLessonId, setActiveLessonId] = useState<string>(dropshippingCurriculum[0].id);

  // Completed lessons
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(DS_COMPLETED_LESSONS_KEY);
      return stored ? JSON.parse(stored) : [dropshippingCurriculum[0].id];
    } catch {
      return [dropshippingCurriculum[0].id];
    }
  });

  // Quiz state inside active lesson
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem(DS_COMPLETED_LESSONS_KEY, JSON.stringify(completedLessons));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessons]);

  const toggleLessonCompletion = (id: string) => {
    setCompletedLessons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredLessons = dropshippingCurriculum.filter((lesson) => {
    const matchesModule = selectedModuleFilter === 'all' || lesson.moduleCategory === selectedModuleFilter;
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.overview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  const activeLessonIndex = dropshippingCurriculum.findIndex((l) => l.id === activeLessonId);
  const activeLesson: DropshippingLesson = dropshippingCurriculum[activeLessonIndex] || dropshippingCurriculum[0];

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

  const progressPercentage = Math.round(
    (completedLessons.length / dropshippingCurriculum.length) * 100
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {/* Top Breadcrumb & Quick Nav */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/60 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <button
              onClick={() => onNavigate('income')}
              className="inline-flex items-center gap-1.5 hover:text-white transition"
            >
              <ArrowBackIcon className="h-4 w-4" />
              <span>مجالات الدخل</span>
            </button>
            <span>/</span>
            <span className="text-emerald-400 font-bold">الدروب شيبينغ الحديث (Modern Dropshipping)</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs text-zinc-400">إنجاز المسار:</span>
              <div className="h-2 w-28 rounded-full bg-zinc-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-xs font-black text-emerald-400">{progressPercentage}%</span>
            </div>

            <button
              onClick={() => onNavigate('challenges')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-300 transition"
            >
              <Zap className="h-3.5 w-3.5 text-emerald-400" />
              <span>كسب XP التحديات</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-zinc-800/80 bg-gradient-to-b from-zinc-900/90 via-zinc-900/40 to-zinc-950 py-12 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-black text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>مسار تعليمي متكامل 2026</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-bold text-blue-400">
              <Globe className="h-3.5 w-3.5" />
              <span>تسويق عالمي وشحن مباشر</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>بدون مخزون أو أوهام الثراء السريع</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              مسار الدروب شيبينغ الحديث <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">(Modern Dropshipping)</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              الدليل العملي الشامل خطوة بخطوة لبناء متجر إلكتروني رابح، اختيار المنتجات عبر مصفوفة تقييم علمية، فحص الموردين وسرعة الشحن، صناعة فيديوهات قصيرة مقنعة بالهاتف، وحساب صافي الأرباح الحقيقي دون مجازفات غير محسوبة.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-3.5">
              <div className="text-[11px] text-zinc-400 font-medium">النموذج التجاري</div>
              <div className="mt-1 text-sm font-black text-white">بيع بدون مخزون مسبق</div>
            </div>
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-3.5">
              <div className="text-[11px] text-zinc-400 font-medium">رأس المال الواقعي للبدء</div>
              <div className="mt-1 text-sm font-black text-emerald-400">$150 - $400</div>
            </div>
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-3.5">
              <div className="text-[11px] text-zinc-400 font-medium">الوقت المتوقع لأول مبيعة</div>
              <div className="mt-1 text-sm font-black text-white">2 - 4 أسابيع</div>
            </div>
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-3.5">
              <div className="text-[11px] text-zinc-400 font-medium">المهارة الأهم</div>
              <div className="mt-1 text-sm font-black text-teal-300">صناعة إعلانات الفيديو بالهاتف</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap ${
                activeTab === 'lessons'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>1. الدروس والمسار التعليمي ({dropshippingCurriculum.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap ${
                activeTab === 'calculator'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span>2. حاسبة الأرباح وهوامش الطلب</span>
            </button>

            <button
              onClick={() => setActiveTab('scorecard')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap ${
                activeTab === 'scorecard'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Scale className="h-4 w-4" />
              <span>3. مصفوفة تقييم المنتجات</span>
            </button>

            <button
              onClick={() => setActiveTab('templates')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap ${
                activeTab === 'templates'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Video className="h-4 w-4" />
              <span>4. قوالب الفيديو ورسائل الموردين</span>
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap ${
                activeTab === 'checklist'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>5. قائمة الفحص وخطة الـ 7 أيام والاختبار</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Tab 1: Curriculum & Lessons */}
        {activeTab === 'lessons' && (
          <div className="space-y-8">
            {/* Filter & Search Bar */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute right-3.5 top-3 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث في محاور الدروس والمفاهيم..."
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 pr-10 pl-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="text-xs text-zinc-400">
                  يتم عرض <strong className="text-white">{filteredLessons.length}</strong> من أصل {dropshippingCurriculum.length} درساً
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/80">
                {dropshippingModuleCategoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedModuleFilter(cat.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      selectedModuleFilter === cat.id
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-zinc-800/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout: Lessons Sidebar (left) + Active Lesson Detail (right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar List (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    فهرس الوحدات والدروس
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">
                    {completedLessons.length}/{dropshippingCurriculum.length} مكتمل
                  </span>
                </div>

                <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
                  {filteredLessons.map((lesson) => {
                    const isSelected = lesson.id === activeLessonId;
                    const isCompleted = completedLessons.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setActiveLessonId(lesson.id)}
                        className={`group relative rounded-xl border p-3.5 cursor-pointer transition text-right ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-950/30 shadow-md'
                            : 'border-zinc-800/80 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                                وحدة {lesson.moduleNumber}
                              </span>
                              {isCompleted && (
                                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                  <span>مكتمل</span>
                                </span>
                              )}
                            </div>
                            <h4 className={`text-xs sm:text-sm font-bold line-clamp-1 ${
                              isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                            }`}>
                              {lesson.title}
                            </h4>
                            <p className="text-[11px] text-zinc-500 line-clamp-1">
                              {lesson.subtitle}
                            </p>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLessonCompletion(lesson.id);
                            }}
                            className="mt-1 text-zinc-500 hover:text-emerald-400 transition"
                            title={isCompleted ? 'إلغاء التحديد' : 'تحديد كمكتمل'}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Circle className="h-4 w-4 text-zinc-600 hover:text-zinc-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Lesson Content (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-8 shadow-xl">
                  {/* Lesson Header */}
                  <div className="border-b border-zinc-800 pb-6 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                        <span>الوحدة {activeLesson.moduleNumber}</span>
                        <span>•</span>
                        <span>{dropshippingModuleCategoriesList.find(c => c.id === activeLesson.moduleCategory)?.label}</span>
                      </div>

                      <button
                        onClick={() => toggleLessonCompletion(activeLesson.id)}
                        className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                          completedLessons.includes(activeLesson.id)
                            ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                            : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                        }`}
                      >
                        {completedLessons.includes(activeLesson.id) ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            <span>مكتمل ✓</span>
                          </>
                        ) : (
                          <>
                            <Circle className="h-3.5 w-3.5 text-zinc-400" />
                            <span>تحديد كمكتمل</span>
                          </>
                        )}
                      </button>
                    </div>

                    <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">
                      {activeLesson.title}
                    </h2>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {activeLesson.subtitle}
                    </p>
                  </div>

                  {/* Overview */}
                  <div className="rounded-xl border border-zinc-800 bg-zinc-850/60 p-4 sm:p-5 space-y-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Info className="h-4 w-4" />
                      <span>نظرة عامة على الدرس:</span>
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {activeLesson.overview}
                    </p>
                  </div>

                  {/* Learning Objectives */}
                  {activeLesson.learningObjectives && activeLesson.learningObjectives.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Target className="h-4 w-4 text-emerald-400" />
                        <span>أهداف التعلم في هذا الدرس:</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeLesson.learningObjectives.map((obj, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 rounded-xl bg-zinc-800/40 border border-zinc-800 p-3 text-xs text-zinc-300">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Concepts with Practical Examples */}
                  {activeLesson.keyConcepts && activeLesson.keyConcepts.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Layers className="h-4 w-4 text-blue-400" />
                        <span>المفاهيم الجوهرية والتحليل العملي:</span>
                      </h3>
                      <div className="space-y-4">
                        {activeLesson.keyConcepts.map((concept, idx) => (
                          <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 space-y-3">
                            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                              <span className="h-5 w-5 rounded-md bg-blue-500/20 text-blue-400 text-xs font-black flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <span>{concept.title}</span>
                            </h4>
                            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                              {concept.explanation}
                            </p>
                            {concept.practicalExample && (
                              <div className="mt-2 rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3 text-xs text-emerald-300 leading-relaxed">
                                <strong className="text-emerald-400 block mb-1">💡 مثال واقعي من الميدان:</strong>
                                {concept.practicalExample}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Deep Dive Steps if present */}
                  {activeLesson.deepDiveSteps && activeLesson.deepDiveSteps.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-amber-400" />
                        <span>خطوات التطبيق التفصيلية (Step-by-Step):</span>
                      </h3>
                      <div className="space-y-3">
                        {activeLesson.deepDiveSteps.map((step) => (
                          <div key={step.stepNumber} className="rounded-xl border border-zinc-800 bg-zinc-850/50 p-4 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="h-6 w-6 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
                                {step.stepNumber}
                              </span>
                              <h5 className="text-xs sm:text-sm font-bold text-white">{step.title}</h5>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed pr-8">
                              {step.detail}
                            </p>
                            {step.proTip && (
                              <div className="mr-8 text-[11px] text-amber-300/90 font-medium">
                                ⭐ نصيحة خبير: {step.proTip}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Practical Exercise if present */}
                  {activeLesson.practicalExercise && (
                    <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-5 space-y-3">
                      <div className="flex items-center gap-2 text-purple-300 font-bold text-xs sm:text-sm">
                        <Award className="h-4 w-4 text-purple-400" />
                        <span>تمرين عملي قابل للتنفيذ اليوم:</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{activeLesson.practicalExercise.task}</h4>
                      <ul className="space-y-1.5 text-xs text-zinc-300 list-disc list-inside">
                        {activeLesson.practicalExercise.actionSteps.map((act, idx) => (
                          <li key={idx}>{act}</li>
                        ))}
                      </ul>
                      <div className="pt-2 border-t border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <span className="text-purple-300">
                          <strong>المخرج المتوقع:</strong> {activeLesson.practicalExercise.deliverable}
                        </span>
                        <span className="text-zinc-400 italic">
                          "{activeLesson.practicalExercise.selfCheckQuestion}"
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  <div className="rounded-xl border border-zinc-800 bg-zinc-850 p-4 text-xs text-zinc-300 leading-relaxed">
                    <strong className="text-white block mb-1">الخلاصة الأساسية لهذا الدرس:</strong>
                    {activeLesson.summary}
                  </div>

                  {/* Mini Quiz at end of lesson */}
                  {activeLesson.quiz && (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        <HelpCircle className="h-4 w-4" />
                        <span>اختبر استيعابك لهذا الدرس:</span>
                      </div>

                      <h4 className="text-sm font-bold text-white">
                        {activeLesson.quiz.question}
                      </h4>

                      <div className="space-y-2">
                        {activeLesson.quiz.options.map((opt, optIdx) => {
                          const isSelected = quizAnswers[activeLesson.id] === optIdx;
                          const isSubmitted = quizSubmitted[activeLesson.id];
                          const isCorrect = optIdx === activeLesson.quiz?.correctIndex;

                          let optionClass = 'border-zinc-800 bg-zinc-800/40 text-zinc-300 hover:bg-zinc-800';

                          if (isSubmitted) {
                            if (isCorrect) {
                              optionClass = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300 font-bold';
                            } else if (isSelected && !isCorrect) {
                              optionClass = 'border-rose-500/60 bg-rose-950/40 text-rose-300 font-bold';
                            } else {
                              optionClass = 'border-zinc-800/40 bg-zinc-900/20 text-zinc-500';
                            }
                          } else if (isSelected) {
                            optionClass = 'border-emerald-500 bg-emerald-500/20 text-white font-bold';
                          }

                          return (
                            <div
                              key={optIdx}
                              onClick={() => handleSelectQuizAnswer(activeLesson.id, optIdx)}
                              className={`rounded-xl border p-3 cursor-pointer text-xs transition ${optionClass}`}
                            >
                              {opt}
                            </div>
                          );
                        })}
                      </div>

                      {!quizSubmitted[activeLesson.id] ? (
                        <button
                          onClick={() => handleSubmitQuiz(activeLesson.id)}
                          disabled={quizAnswers[activeLesson.id] === undefined}
                          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                            quizAnswers[activeLesson.id] !== undefined
                              ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          }`}
                        >
                          تحقق من الإجابة
                        </button>
                      ) : (
                        <div className="rounded-xl border border-zinc-800 bg-zinc-850 p-3 text-xs text-zinc-300 leading-relaxed">
                          <strong className="text-emerald-400 block mb-1">التفسير:</strong>
                          {activeLesson.quiz.explanation}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation to next / previous lesson */}
                  <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                    <button
                      onClick={() => {
                        if (activeLessonIndex > 0) {
                          setActiveLessonId(dropshippingCurriculum[activeLessonIndex - 1].id);
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }
                      }}
                      disabled={activeLessonIndex === 0}
                      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition ${
                        activeLessonIndex > 0
                          ? 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                          : 'border-zinc-800/40 bg-zinc-900/30 text-zinc-600 cursor-not-allowed'
                      }`}
                    >
                      <ArrowBackIcon className="h-4 w-4" />
                      <span>الدرس السابق</span>
                    </button>

                    <button
                      onClick={() => {
                        if (activeLessonIndex < dropshippingCurriculum.length - 1) {
                          setActiveLessonId(dropshippingCurriculum[activeLessonIndex + 1].id);
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }
                      }}
                      disabled={activeLessonIndex === dropshippingCurriculum.length - 1}
                      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition ${
                        activeLessonIndex < dropshippingCurriculum.length - 1
                          ? 'border-emerald-500/40 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300'
                          : 'border-zinc-800/40 bg-zinc-900/30 text-zinc-600 cursor-not-allowed'
                      }`}
                    >
                      <span>الدرس التالي</span>
                      <ArrowNextIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Profit Calculator */}
        {activeTab === 'calculator' && (
          <DropshippingProfitCalculator />
        )}

        {/* Tab 3: Product Scorecard */}
        {activeTab === 'scorecard' && (
          <DropshippingProductScorecard />
        )}

        {/* Tab 4: Templates */}
        {activeTab === 'templates' && (
          <DropshippingTemplatesView onCopyText={onCopyText} />
        )}

        {/* Tab 5: Checklist & Quiz */}
        {activeTab === 'checklist' && (
          <DropshippingChecklistAndQuiz />
        )}
      </div>
    </div>
  );
};
