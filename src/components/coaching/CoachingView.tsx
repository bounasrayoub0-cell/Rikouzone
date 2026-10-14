import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Calculator, 
  Target, 
  Layers, 
  PhoneCall, 
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
  Check,
  Compass,
  Briefcase,
  AlertTriangle
} from 'lucide-react';
import { 
  coachingLessons, 
  coachingModuleCategories, 
  CoachingLesson 
} from '../../data/coachingData';
import { CoachingRateCalculator } from './CoachingRateCalculator';
import { CoachingNicheValidator } from './CoachingNicheValidator';
import { CoachingPackageBuilder } from './CoachingPackageBuilder';
import { CoachingDiscoveryCallSimulator } from './CoachingDiscoveryCallSimulator';
import { CoachingTemplatesView } from './CoachingTemplatesView';
import { CoachingChecklistAndPlan } from './CoachingChecklistAndPlan';

interface CoachingViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const COMPLETED_COACHING_LESSONS_KEY = 'rikouzone_coaching_completed_lessons';

export const CoachingView: React.FC<CoachingViewProps> = ({ onNavigate, onCopyText }) => {
  const [activeTab, setActiveTab] = useState<
    'modules' | 'calculator' | 'validator' | 'builder' | 'simulator' | 'templates' | 'checklist'
  >('modules');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(coachingLessons[0].id);

  // Completed Lessons & Quiz State
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(COMPLETED_COACHING_LESSONS_KEY);
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
      localStorage.setItem(COMPLETED_COACHING_LESSONS_KEY, JSON.stringify(completedLessonIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessonIds]);

  // Active Lesson
  const activeLesson = useMemo(() => {
    return coachingLessons.find((l) => l.id === selectedLessonId) || coachingLessons[0];
  }, [selectedLessonId]);

  // Filtered Lessons
  const filteredLessons = useMemo(() => {
    return coachingLessons.filter((lesson) => {
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

  const activeLessonIndex = coachingLessons.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = activeLessonIndex > 0 ? coachingLessons[activeLessonIndex - 1] : null;
  const nextLesson = activeLessonIndex < coachingLessons.length - 1 ? coachingLessons[activeLessonIndex + 1] : null;

  const progressPercentage = Math.round((completedLessonIds.length / coachingLessons.length) * 100);

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
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 text-xs font-bold transition-all border border-zinc-800 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
              <span>العودة لمسارات الدخل</span>
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>مسار النخبة للخدمات عالية القيمة (High-Ticket)</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black">
                1-on-1 Coaching & Consulting
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                تذكرة مرتفعة: 500$ - 3,000$ / باقة
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold">
                تكلفة بدء: 0$ (رأس مال صفري)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              التدريب والاستشارات الفردية <span className="text-amber-400">(1-on-1 Coaching)</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
              المسار التعليمي والتطبيقي المتكامل لتحويل خبرتك أو مهارتك إلى جلسات توجيه واستشارات مدفوعة (عن بُعد عبر زووم أو حضورياً). تعلم هندسة باقات التحول، إتقان مكالمات الاستكشاف، وتفكيك الاعتراضات للوصول إلى 3,000$+ شهرياً بعدد محدود من العملاء الجادين.
            </p>
          </div>

          {/* Quick Metrics & Progress Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
              <div className="text-[11px] text-zinc-400 font-bold">الوحدات والدروس</div>
              <div className="text-xl font-black text-white mt-0.5">
                7 وحدات <span className="text-xs text-zinc-400 font-normal">({coachingLessons.length} درساً)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
              <div className="text-[11px] text-zinc-400 font-bold">الأدوات التفاعلية</div>
              <div className="text-xl font-black text-amber-400 mt-0.5">
                6 أدوات حية
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
              <div className="text-[11px] text-zinc-400 font-bold">خطة العمل</div>
              <div className="text-xl font-black text-emerald-400 mt-0.5">
                14 يوماً + 24 بنداً
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
              <div className="text-[11px] text-zinc-400 font-bold">نسبة إنجازك</div>
              <div className="text-xl font-black text-white mt-0.5">
                {progressPercentage}% <span className="text-xs text-zinc-400 font-normal">({completedLessonIds.length}/{coachingLessons.length})</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation Bar */}
      <div className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'modules', label: 'المنهج والدروس', icon: BookOpen, count: coachingLessons.length },
            { id: 'calculator', label: 'حاسبة التسعير والدخل', icon: Calculator },
            { id: 'validator', label: 'مُقيّم التخصص', icon: Target },
            { id: 'builder', label: 'مُصمم الباقات والروابط', icon: Layers },
            { id: 'simulator', label: 'محاكي الاعتراضات', icon: PhoneCall },
            { id: 'templates', label: 'مكتبة القوالب والعقود', icon: FileText },
            { id: 'checklist', label: 'خطة الـ 14 يوماً والجاهزية', icon: CalendarCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: MODULES & LESSONS */}
        {activeTab === 'modules' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar / Lessons List */}
            <div className="lg:col-span-4 space-y-4">
              {/* Category Filter */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white">تصنيفات الوحدات</span>
                  <span className="text-[11px] text-zinc-400 font-bold">{coachingModuleCategories.length} وحدات</span>
                </div>

                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="بحث في الدروس والمفاهيم..."
                    className="w-full pl-3 pr-8 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1 max-h-60 overflow-y-auto scrollbar-none pt-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-right px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    }`}
                  >
                    جميع الدروس ({coachingLessons.length})
                  </button>

                  {coachingModuleCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-right px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                      }`}
                    >
                      <span className="truncate">{cat.title}</span>
                      <span className="text-[10px] text-zinc-500 shrink-0">({cat.lessonCount})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lessons Selector List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-400 px-1 block">
                  الدروس المتاحة ({filteredLessons.length}):
                </span>

                <div className="space-y-2 max-h-[600px] overflow-y-auto scrollbar-none pr-0.5">
                  {filteredLessons.map((lesson) => {
                    const isSelected = lesson.id === activeLesson.id;
                    const isDone = completedLessonIds.includes(lesson.id);
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setSelectedLessonId(lesson.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-right ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/5'
                            : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800/40 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-amber-400 block">
                              {lesson.id.toUpperCase()} • {lesson.durationMinutes} دقيقة
                            </span>
                            <h4 className={`text-xs font-black leading-snug ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                              {lesson.title}
                            </h4>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLessonCompleted(lesson.id);
                            }}
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                              isDone
                                ? 'bg-emerald-500 border-emerald-400 text-black'
                                : 'bg-zinc-950 border-zinc-700 text-transparent hover:border-amber-400'
                            }`}
                          >
                            <Check className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Lesson Content Reader */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-6 backdrop-blur-sm">
                {/* Lesson Header */}
                <div className="space-y-2 border-b border-zinc-800/80 pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-black border border-amber-500/30">
                        {activeLesson.id.toUpperCase()}
                      </span>
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{activeLesson.durationMinutes} دقيقة قراءة وتطبيق</span>
                      </span>
                      <span className="text-xs text-amber-400 flex items-center gap-1 font-bold">
                        <Award className="h-3 w-3" />
                        <span>+{activeLesson.xpReward} XP</span>
                      </span>
                    </div>

                    <button
                      onClick={() => toggleLessonCompleted(activeLesson.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        completedLessonIds.includes(activeLesson.id)
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>{completedLessonIds.includes(activeLesson.id) ? 'تم إكمال الدرس ✓' : 'تحديد كمكتمل'}</span>
                    </button>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
                    {activeLesson.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-amber-400/90 font-bold leading-relaxed">
                    {activeLesson.subtitle}
                  </p>
                </div>

                {/* Overview */}
                <div className="space-y-2">
                  <h3 className="text-xs font-black text-zinc-400 uppercase tracking-wider">
                    نظرة شاملة وسياق الدرس:
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-4 sm:p-5 rounded-2xl border border-zinc-800/80">
                    {activeLesson.overview}
                  </p>
                </div>

                {/* Key Takeaways */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span>الركائز الجوهرية للدرس (Key Takeaways):</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeLesson.keyTakeaways.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/60 text-xs text-zinc-200">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Steps */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-black text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-amber-400" />
                    <span>خطوات التنفيذ الميداني خطوة بخطوة:</span>
                  </h3>

                  <div className="space-y-3">
                    {activeLesson.actionSteps.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black flex items-center justify-center border border-amber-500/30">
                            {step.stepNumber}
                          </span>
                          <h4 className="text-xs sm:text-sm font-black text-white">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed pr-7">
                          {step.detail}
                        </p>
                        {step.proTip && (
                          <div className="mr-7 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 font-bold leading-relaxed">
                            💡 <span className="font-black">نصيحة الخبير:</span> {step.proTip}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Exercise */}
                <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-2">
                  <span className="text-xs font-black text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Target className="h-4 w-4" />
                    <span>التمرين العملي الفوري لهذا الدرس:</span>
                  </span>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {activeLesson.practicalExercise.instruction}
                  </p>
                  <div className="pt-2 text-[11px] text-zinc-300 border-t border-amber-500/20">
                    <span className="font-bold text-amber-300">المخرج المطلوب منك: </span>
                    {activeLesson.practicalExercise.deliverable}
                  </div>
                </div>

                {/* Pitfall Warning */}
                <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-xs">
                    <span className="font-black text-rose-300 block">فخ شائع يجب الحذر منه:</span>
                    <p className="text-zinc-200 leading-relaxed">
                      {activeLesson.pitfallWarning}
                    </p>
                  </div>
                </div>

                {/* Lesson Quiz */}
                <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="h-3.5 w-3.5" />
                      <span>اختبار استيعاب الدرس السريع:</span>
                    </span>
                    <span className="text-[11px] font-bold text-zinc-400">
                      سؤال واحد لتثبيت الفهم
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-black text-white">
                    {activeLesson.quiz.question}
                  </p>

                  <div className="space-y-2 pt-1">
                    {activeLesson.quiz.options.map((opt, oIdx) => {
                      const isAnswered = quizSubmitted[activeLesson.id];
                      const isSelected = quizAnswers[activeLesson.id] === oIdx;
                      const isCorrect = activeLesson.quiz.correctAnswerIndex === oIdx;

                      let btnStyle = 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700';
                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-amber-500/20 border-amber-500 text-amber-300';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectQuizOption(activeLesson.id, oIdx)}
                          className={`w-full text-right p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isCorrect && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted[activeLesson.id] && (
                    <div className="mt-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                      💡 <span className="font-bold text-white">التوضيح:</span> {activeLesson.quiz.explanation}
                    </div>
                  )}
                </div>

                {/* Lesson Navigation Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-zinc-800/80">
                  {prevLesson ? (
                    <button
                      onClick={() => setSelectedLessonId(prevLesson.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold transition-all border border-zinc-800"
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="hidden sm:inline">الدرس السابق: {prevLesson.title.slice(0, 24)}...</span>
                      <span className="sm:hidden">السابق</span>
                    </button>
                  ) : <div />}

                  {nextLesson ? (
                    <button
                      onClick={() => setSelectedLessonId(nextLesson.id)}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black transition-all shadow-md shadow-amber-500/20"
                    >
                      <span className="hidden sm:inline">الدرس التالي: {nextLesson.title.slice(0, 24)}...</span>
                      <span className="sm:hidden">التالي</span>
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="text-xs font-black text-emerald-400">
                      تهانينا! لقد وصلت لآخر درس في المنهج 🎉
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CALCULATOR */}
        {activeTab === 'calculator' && <CoachingRateCalculator />}

        {/* TAB 3: VALIDATOR */}
        {activeTab === 'validator' && <CoachingNicheValidator />}

        {/* TAB 4: BUILDER */}
        {activeTab === 'builder' && <CoachingPackageBuilder />}

        {/* TAB 5: SIMULATOR */}
        {activeTab === 'simulator' && <CoachingDiscoveryCallSimulator />}

        {/* TAB 6: TEMPLATES */}
        {activeTab === 'templates' && <CoachingTemplatesView />}

        {/* TAB 7: CHECKLIST */}
        {activeTab === 'checklist' && <CoachingChecklistAndPlan />}
      </div>
    </div>
  );
};
