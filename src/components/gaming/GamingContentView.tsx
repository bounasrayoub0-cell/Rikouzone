import React, { useState, useMemo, useEffect } from 'react';
import { 
  Gamepad2, 
  Radio, 
  BookOpen, 
  Calculator, 
  Scale, 
  Sliders, 
  Flame, 
  ShieldCheck, 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Search, 
  Clock, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertTriangle,
  Layers,
  ArrowLeft,
  Trophy,
  Share2
} from 'lucide-react';
import { 
  gamingLessons, 
  gamingModuleCategories, 
  GamingLesson 
} from '../../data/gamingContentData';
import { GamingEarningsCalculator } from './GamingEarningsCalculator';
import { GamingPlatformsMatrix } from './GamingPlatformsMatrix';
import { ObsSettingsCalculator } from './ObsSettingsCalculator';
import { GamingIdeaGenerator } from './GamingIdeaGenerator';
import { PreStreamChecklist } from './PreStreamChecklist';
import { StreamContentTracker } from './StreamContentTracker';
import { GamingFourteenDayPlan } from './GamingFourteenDayPlan';
import { getInitialUserState, saveUserState } from '../../utils/challengeStorage';

interface GamingContentViewProps {
  onNavigate: (tab: string) => void;
  onCopyText?: (text: string, label: string) => void;
}

const COMPLETED_LESSONS_KEY = 'rikouzone_gaming_completed_lessons';
const QUIZ_AWARDED_KEY = 'rikouzone_gaming_awarded_quizzes';

export const GamingContentView: React.FC<GamingContentViewProps> = ({ onNavigate, onCopyText }) => {
  const [activeTab, setActiveTab] = useState<
    'modules' | 'calculator' | 'platforms' | 'obs-calculator' | 'idea-generator' | 'checklist' | 'tracker' | 'plan'
  >('modules');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(gamingLessons[0].id);

  // Completed Lessons State
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(COMPLETED_LESSONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Track which quizzes already awarded XP to prevent duplicate rewards
  const [awardedQuizIds, setAwardedQuizIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(QUIZ_AWARDED_KEY);
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
      localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(completedLessonIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessonIds]);

  // Sync awarded quizzes
  useEffect(() => {
    try {
      localStorage.setItem(QUIZ_AWARDED_KEY, JSON.stringify(awardedQuizIds));
    } catch (e) {
      console.error(e);
    }
  }, [awardedQuizIds]);

  // Active Lesson
  const activeLesson = useMemo(() => {
    return gamingLessons.find((l) => l.id === selectedLessonId) || gamingLessons[0];
  }, [selectedLessonId]);

  // Filtered Lessons
  const filteredLessons = useMemo(() => {
    return gamingLessons.filter((lesson) => {
      const matchCat = selectedCategory === 'all' || lesson.moduleCategory === selectedCategory;
      const matchSearch =
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const handleSelectQuizOption = (lesson: GamingLesson, optionIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [lesson.id]: optionIdx }));
    setQuizSubmitted((prev) => ({ ...prev, [lesson.id]: true }));

    // If correct and never awarded before, grant XP to user state!
    if (optionIdx === lesson.quiz.correctAnswerIndex && !awardedQuizIds.includes(lesson.id)) {
      try {
        const userState = getInitialUserState();
        userState.totalXp += lesson.xpReward;
        saveUserState(userState);
        setAwardedQuizIds((prev) => [...prev, lesson.id]);
      } catch (e) {
        console.warn('Failed to award XP for gaming quiz:', e);
      }
    }
  };

  // Lesson Navigation
  const currentLessonIndex = gamingLessons.findIndex((l) => l.id === selectedLessonId);
  const prevLesson = currentLessonIndex > 0 ? gamingLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < gamingLessons.length - 1
      ? gamingLessons[currentLessonIndex + 1]
      : null;

  const totalXp = gamingLessons.reduce((acc, l) => acc + l.xpReward, 0);
  const earnedXp = gamingLessons
    .filter((l) => awardedQuizIds.includes(l.id))
    .reduce((acc, l) => acc + l.xpReward, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 text-right" dir="rtl">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('income-paths')}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs font-bold text-zinc-300 hover:border-zinc-700 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>العودة إلى مجالات الدخل</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-black text-purple-300">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span>{earnedXp} / {totalXp} XP مكتسب</span>
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/15 via-zinc-900/90 to-zinc-950 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-purple-500/5">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/20 px-3.5 py-1 text-xs font-black text-purple-300">
              <Gamepad2 className="h-4 w-4 text-purple-400" />
              <span>مسار احترافي متكامل · صناعة المحتوى والألعاب</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              صناعة محتوى الألعاب والبث المباشر <span className="text-purple-400">(Gaming Content & Streaming)</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
              تعلّم كيف تبدأ من الصفر في صناعة فيديوهات وبثوث الألعاب، تختار اللعبة الرابحة، تضبط برامج البث OBS بدون لاج، تصنع مقاطع شورتس وتيك توك فيروسية تخطف الملايين، تبني مجتمع ديسكورد وفي، وتحقق دخلاً من الاشتراكات والتبرعات والرعايات.
            </p>

            {/* Quick Stat Highlights */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3.5">
                <div className="text-[11px] font-bold text-zinc-400">المنهج التعليمي</div>
                <div className="text-lg font-black text-white mt-0.5">14 درساً تفصيلياً</div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3.5">
                <div className="text-[11px] font-bold text-zinc-400">الوحدات التخصصية</div>
                <div className="text-lg font-black text-purple-300 mt-0.5">4 وحدات تدريبية</div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3.5">
                <div className="text-[11px] font-bold text-zinc-400">الأدوات التفاعلية</div>
                <div className="text-lg font-black text-emerald-400 mt-0.5">7 أدوات ذكية</div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3.5">
                <div className="text-[11px] font-bold text-zinc-400">مجموع المكافآت</div>
                <div className="text-lg font-black text-amber-300 mt-0.5">2,150 نقطة XP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-zinc-800/80">
          {[
            { id: 'modules', label: 'الدروس والمنهج (14)', icon: BookOpen },
            { id: 'calculator', label: 'حاسبة أرباح البث', icon: Calculator },
            { id: 'platforms', label: 'مقارنة منصات البث', icon: Scale },
            { id: 'obs-calculator', label: 'حاسبة إعدادات OBS', icon: Sliders },
            { id: 'idea-generator', label: 'مولد الأفكار والعناوين', icon: Flame },
            { id: 'checklist', label: 'فحص ما قبل البث', icon: ShieldCheck },
            { id: 'tracker', label: 'تتبع البثوث والمحتوى', icon: BarChart3 },
            { id: 'plan', label: 'خطة الـ 14 يوماً', icon: Calendar }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-500 text-black shadow-lg shadow-purple-500/20'
                    : 'border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: CURRICULUM & LESSONS */}
        {activeTab === 'modules' && (
          <div className="space-y-8">
            {/* Category Filter Pills & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-purple-500 text-black font-black'
                      : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
                  }`}
                >
                  جميع الدروس ({gamingLessons.length})
                </button>
                {gamingModuleCategories.map((cat, i) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-purple-500 text-black font-black'
                        : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    الوحدة {i + 1} ({cat.lessonCount})
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="ابحث في الدروس أو المفاهيم..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 pr-9 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
                />
                <Search className="h-4 w-4 text-zinc-500 absolute right-3 top-2.5" />
              </div>
            </div>

            {/* Split Screen: Lessons List (Left/Right) vs Active Lesson Viewer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Lessons Selector Column (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="text-xs font-bold text-zinc-400 mb-2">
                  قائمة الدروس ({filteredLessons.length}):
                </div>
                {filteredLessons.map((lesson) => {
                  const isSelected = lesson.id === selectedLessonId;
                  const isCompleted = completedLessonIds.includes(lesson.id);
                  const isQuizPassed = awardedQuizIds.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`rounded-2xl border p-4 transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? 'border-purple-500 bg-purple-500/15 shadow-xl shadow-purple-500/10 ring-1 ring-purple-500/50'
                          : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-bold text-purple-400">
                          {lesson.title.split(':')[0]}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {isCompleted && (
                            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-black text-emerald-300">
                              مكتمل ✓
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-amber-400/90">
                            +{lesson.xpReward} XP
                          </span>
                        </div>
                      </div>

                      <h4 className="text-xs sm:text-sm font-black text-white leading-snug">
                        {lesson.title.split(':')[1] || lesson.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                        {lesson.subtitle}
                      </p>

                      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-800/80">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{lesson.durationMinutes} دقيقة قراءة</span>
                        </span>
                        <span className={isQuizPassed ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>
                          {isQuizPassed ? 'الاختبار مجتاز ✓' : 'اختبار متوفر'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Lesson Reader (8 cols) */}
              <div className="lg:col-span-8 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 space-y-8 backdrop-blur-xl">
                {/* Header of Active Lesson */}
                <div className="space-y-3 pb-6 border-b border-zinc-800">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-0.5 text-xs font-black text-purple-300">
                      {activeLesson.title.split(':')[0]}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLessonCompleted(activeLesson.id)}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                          completedLessonIds.includes(activeLesson.id)
                            ? 'bg-emerald-500 text-black font-black'
                            : 'border border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{completedLessonIds.includes(activeLesson.id) ? 'تمت دراسة الدرس ✓' : 'تحديد كمكتمل'}</span>
                      </button>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {activeLesson.title}
                  </h2>
                  <p className="text-sm font-semibold text-purple-300/90 leading-relaxed">
                    {activeLesson.subtitle}
                  </p>
                </div>

                {/* Lesson Overview */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 space-y-2">
                  <div className="text-xs font-bold text-zinc-400">نظرة عامة على الدرس:</div>
                  <p className="text-sm text-zinc-200 leading-relaxed font-normal">
                    {activeLesson.overview}
                  </p>
                </div>

                {/* Key Takeaways */}
                <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 space-y-3">
                  <h3 className="text-sm font-black text-purple-300 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span>أهم النقاط الجوهرية المستفادة:</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {activeLesson.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-purple-400 mt-2 shrink-0" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Steps */}
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <Layers className="h-5 w-5 text-cyan-400" />
                    <span>الخطوات العملية والتطبيقية:</span>
                  </h3>

                  <div className="space-y-3">
                    {activeLesson.actionSteps.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4 sm:p-5 space-y-2 hover:border-zinc-700 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-black border border-cyan-500/30">
                            {step.stepNumber}
                          </span>
                          <h4 className="text-sm font-black text-white">{step.title}</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pr-10 whitespace-pre-line">
                          {step.detail}
                        </p>
                        {step.proTip && (
                          <div className="mr-10 rounded-xl bg-purple-500/10 border border-purple-500/20 p-2.5 text-xs text-purple-300 flex items-start gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-purple-400 shrink-0 mt-0.5" />
                            <span>
                              <strong className="text-purple-200">نصيحة المحترفين:</strong> {step.proTip}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Exercise Box */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-3">
                  <h3 className="text-sm font-black text-emerald-400 flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    <span>التمرين العملي للدرس:</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                    {activeLesson.practicalExercise.instruction}
                  </p>
                  <div className="rounded-xl border border-emerald-500/20 bg-zinc-900/80 p-3 text-xs">
                    <span className="font-bold text-emerald-300 block mb-0.5">المخرج المطلوب تسليمه:</span>
                    <span className="text-zinc-300">{activeLesson.practicalExercise.deliverable}</span>
                  </div>
                </div>

                {/* Pitfall Warning */}
                <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed text-zinc-300">
                    <strong className="text-rose-300 block text-xs font-black mb-1">خطأ قاتل يجب تجنبه:</strong>
                    {activeLesson.pitfallWarning}
                  </div>
                </div>

                {/* Interactive Quiz Box with Real XP Award */}
                <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-zinc-900/90 to-zinc-950 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-amber-400" />
                      <span>اختبار استيعاب الدرس (اربح +{activeLesson.xpReward} XP):</span>
                    </h3>
                    {awardedQuizIds.includes(activeLesson.id) && (
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-0.5 text-xs font-black text-emerald-300">
                        تم كسب الـ XP بنجاح ✓
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-bold text-zinc-200">
                    {activeLesson.quiz.question}
                  </p>

                  <div className="space-y-2.5">
                    {activeLesson.quiz.options.map((opt, oIdx) => {
                      const isAnswered = quizSubmitted[activeLesson.id];
                      const isSelected = quizAnswers[activeLesson.id] === oIdx;
                      const isCorrect = oIdx === activeLesson.quiz.correctAnswerIndex;

                      let btnStyle = 'border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-zinc-700';
                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'border-rose-500 bg-rose-500/20 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectQuizOption(activeLesson, oIdx)}
                          className={`w-full text-right rounded-2xl border p-3.5 text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isCorrect && <Check className="h-4 w-4 text-emerald-400 shrink-0 mr-2" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted[activeLesson.id] && (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-300 space-y-1">
                      <span className="font-bold text-amber-400 block">شرح الإجابة النموذجية:</span>
                      <p className="leading-relaxed">{activeLesson.quiz.explanation}</p>
                    </div>
                  )}
                </div>

                {/* Lesson Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                  {prevLesson ? (
                    <button
                      onClick={() => setSelectedLessonId(prevLesson.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span>الدرس السابق</span>
                    </button>
                  ) : <div />}

                  {nextLesson ? (
                    <button
                      onClick={() => setSelectedLessonId(nextLesson.id)}
                      className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-5 py-2 text-xs font-black text-black hover:bg-purple-400 transition-all cursor-pointer shadow-lg shadow-purple-500/20"
                    >
                      <span>الدرس التالي</span>
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('plan')}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2 text-xs font-black text-black hover:bg-emerald-400 transition-all cursor-pointer"
                    >
                      <span>الانتقال لخطة الـ 14 يوماً 🚀</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CALCULATOR */}
        {activeTab === 'calculator' && <GamingEarningsCalculator />}

        {/* TAB 3: PLATFORMS */}
        {activeTab === 'platforms' && <GamingPlatformsMatrix />}

        {/* TAB 4: OBS SETTINGS */}
        {activeTab === 'obs-calculator' && <ObsSettingsCalculator />}

        {/* TAB 5: VIRAL HOOKS & TITLES GENERATOR */}
        {activeTab === 'idea-generator' && <GamingIdeaGenerator />}

        {/* TAB 6: PRE-STREAM CHECKLIST */}
        {activeTab === 'checklist' && <PreStreamChecklist />}

        {/* TAB 7: STREAM CONTENT TRACKER */}
        {activeTab === 'tracker' && <StreamContentTracker />}

        {/* TAB 8: 14-DAY LAUNCH PLAN */}
        {activeTab === 'plan' && <GamingFourteenDayPlan />}

      </div>
    </div>
  );
};
