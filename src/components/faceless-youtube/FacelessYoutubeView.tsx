import React, { useState, useMemo, useEffect } from 'react';
import {
  Video,
  BookOpen,
  Compass,
  FileText,
  Lightbulb,
  Layers,
  Calendar,
  BarChart3,
  DollarSign,
  Sparkles,
  Search,
  Clock,
  ArrowRight,
  ArrowLeft,
  X,
  Check,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  TrendingUp,
  Award
} from 'lucide-react';
import {
  facelessYoutubeLessons,
  facelessPhases,
  FacelessLesson
} from '../../data/facelessYoutubeData';
import { FacelessNicheFinder } from './FacelessNicheFinder';
import { FacelessScriptPlanner } from './FacelessScriptPlanner';
import { FacelessTitleGenerator } from './FacelessTitleGenerator';
import { FacelessProductionWorkflow } from './FacelessProductionWorkflow';
import { FacelessThirtyDayCalendar } from './FacelessThirtyDayCalendar';
import { FacelessAnalyticsTracker } from './FacelessAnalyticsTracker';
import { FacelessMonetizationChecker } from './FacelessMonetizationChecker';
import { getInitialUserState, saveUserState } from '../../utils/challengeStorage';

interface FacelessYoutubeViewProps {
  onNavigate?: (tab: string) => void;
  onCopyText?: (text: string, label: string) => void;
}

type MainTab =
  | 'lessons'
  | 'niche-finder'
  | 'script-planner'
  | 'title-generator'
  | 'production-workflow'
  | 'calendar'
  | 'analytics-tracker'
  | 'monetization-checker';

export const FacelessYoutubeView: React.FC<FacelessYoutubeViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const [activeTab, setActiveTab] = useState<MainTab>('lessons');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // Lesson completions in localStorage
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('faceless_completed_lessons_v1');
      return saved ? JSON.parse(saved) : ['fy-lesson-1'];
    } catch {
      return ['fy-lesson-1'];
    }
  });

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [awardedQuizIds, setAwardedQuizIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('faceless_awarded_quizzes_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync completions
  useEffect(() => {
    try {
      localStorage.setItem('faceless_completed_lessons_v1', JSON.stringify(completedLessonIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessonIds]);

  // Sync awarded quizzes
  useEffect(() => {
    try {
      localStorage.setItem('faceless_awarded_quizzes_v1', JSON.stringify(awardedQuizIds));
    } catch (e) {
      console.error(e);
    }
  }, [awardedQuizIds]);

  // Active Lesson
  const activeLesson = useMemo(() => {
    return facelessYoutubeLessons.find((l) => l.id === selectedLessonId) || facelessYoutubeLessons[0];
  }, [selectedLessonId]);

  // Filtered Lessons
  const filteredLessons = useMemo(() => {
    return facelessYoutubeLessons.filter((lesson) => {
      const matchPhase = selectedPhase === 'all' || lesson.phaseId === selectedPhase;
      const matchSearch =
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.overview.toLowerCase().includes(searchQuery.toLowerCase());
      return matchPhase && matchSearch;
    });
  }, [selectedPhase, searchQuery]);

  const toggleLessonCompleted = (id: string) => {
    setCompletedLessonIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectQuizOption = (lesson: FacelessLesson, optionIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [lesson.id]: optionIdx }));
    setQuizSubmitted((prev) => ({ ...prev, [lesson.id]: true }));

    // Award XP
    if (optionIdx === lesson.quiz.correctAnswerIndex && !awardedQuizIds.includes(lesson.id)) {
      try {
        const userState = getInitialUserState();
        userState.totalXp += lesson.xpReward;
        saveUserState(userState);
        setAwardedQuizIds((prev) => [...prev, lesson.id]);
      } catch (e) {
        console.warn('Failed to award XP for faceless quiz:', e);
      }
    }
  };

  const totalLessonsCount = facelessYoutubeLessons.length;
  const completedCount = completedLessonIds.length;
  const totalXpAvailable = facelessYoutubeLessons.reduce((acc, curr) => acc + curr.xpReward, 0);
  const earnedXp = facelessYoutubeLessons
    .filter((l) => completedLessonIds.includes(l.id))
    .reduce((acc, curr) => acc + curr.xpReward, 0);
  const overallProgress = Math.round((completedCount / totalLessonsCount) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <button
          onClick={() => onNavigate && onNavigate('income-paths')}
          className="inline-flex items-center gap-1.5 font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowRight className="h-4 w-4" />
          <span>العودة لجميع مجالات الدخل</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">
            <Video className="h-3.5 w-3.5" />
            <span>صناعة المحتوى والأتمتة الإعلامية</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
            <DollarSign className="h-3.5 w-3.5" />
            <span>متوافق مع سياسات YouTube Partner & AdSense</span>
          </span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-950/60 via-zinc-900 to-zinc-950 p-6 sm:p-8 md:p-10 shadow-2xl shadow-red-950/30">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/15 px-3.5 py-1 text-xs font-black text-red-400 backdrop-blur-md">
            <Video className="h-4 w-4" />
            <span>مسار تعليمي متكامل احترافي · 2,450 XP</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            قنوات يوتيوب بدون إظهار الوجه <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-400 to-yellow-400">(Faceless YouTube Automation)</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
            تعلّم بناء قناة YouTube بدون الظهور أمام الكاميرا، عبر التعليق الصوتي، والكتابة الإبداعية، والمونتاج، والرسوم والصور التعبيرية، وتنظيم الإنتاج، وتحسين الوصول للجمهور، وبناء مشروع محتوى قابل للاستمرار وتحقيق الدخل وفق سياسات YouTube Partner Program وAdSense.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 sm:p-4">
              <div className="text-[11px] font-bold text-zinc-400">إجمالي الدروس</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">16 درساً</div>
              <div className="text-[10px] text-zinc-400">مقسمة على 4 مراحل تخصصية</div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 sm:p-4">
              <div className="text-[11px] font-bold text-zinc-400">التقدم والإنجاز</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5 font-mono">
                {overallProgress}%
              </div>
              <div className="text-[10px] text-zinc-400">{completedCount} من {totalLessonsCount} مكتملة</div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 sm:p-4">
              <div className="text-[11px] font-bold text-zinc-400">نقاط الخبرة XP</div>
              <div className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5 font-mono">
                {earnedXp} <span className="text-xs text-zinc-400">/ {totalXpAvailable}</span>
              </div>
              <div className="text-[10px] text-zinc-400">مكافآت التحديات والاختبارات</div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 sm:p-4">
              <div className="text-[11px] font-bold text-zinc-400">الأدوات التفاعلية</div>
              <div className="text-xl sm:text-2xl font-black text-purple-400 mt-0.5">7 أدوات</div>
              <div className="text-[10px] text-zinc-400">نيتش، سكريبت، إنتاج، فحص والمزيد</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 border-b border-zinc-800 pb-2">
        {[
          { id: 'lessons', label: 'الدروس والشروحات (16)', icon: BookOpen },
          { id: 'niche-finder', label: 'نيتش Finder', icon: Compass },
          { id: 'script-planner', label: 'مخطط السكريبت', icon: FileText },
          { id: 'title-generator', label: 'مولّد العناوين والصور', icon: Lightbulb },
          { id: 'production-workflow', label: 'مخطط الإنتاج والأتمتة', icon: Layers },
          { id: 'calendar', label: 'تقويم محتوى 30 يوماً', icon: Calendar },
          { id: 'analytics-tracker', label: 'محلل الأداء اليدوي', icon: BarChart3 },
          { id: 'monetization-checker', label: 'فاحص شروط تحقيق الدخل', icon: DollarSign }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as MainTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-red-500 text-black font-black shadow-lg shadow-red-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Lessons List */}
      {activeTab === 'lessons' && (
        <div className="space-y-6">
          {/* Phase Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex overflow-x-auto no-scrollbar gap-2">
              <button
                onClick={() => setSelectedPhase('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedPhase === 'all'
                    ? 'bg-zinc-100 text-black font-black'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                جميع المراحل ({totalLessonsCount})
              </button>
              {facelessPhases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhase(phase.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedPhase === phase.id
                      ? 'bg-red-500 text-black font-black'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {phase.title.split(':')[0]}
                </button>
              ))}
            </div>

            <div className="relative min-w-[240px]">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="ابحث في الدروس والمفاهيم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2 pr-9 pl-4 text-xs font-medium text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Phase Overview Banner if filtered */}
          {selectedPhase !== 'all' && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
              {(() => {
                const info = facelessPhases.find((p) => p.id === selectedPhase);
                if (!info) return null;
                return (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-black text-white">{info.title}</h3>
                      <span className="text-[11px] font-mono text-red-400 font-bold">{info.lessonRange}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{info.description}</p>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Lessons Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLessons.map((lesson) => {
              const isDone = completedLessonIds.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  className={`flex flex-col justify-between rounded-2xl border transition-all duration-200 ${
                    isDone
                      ? 'border-emerald-500/40 bg-zinc-900/90'
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
                  } p-5 shadow-lg`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-bold">
                        {lesson.phaseId === 'phase-1'
                          ? 'المرحلة 1: الفهم والنيتش'
                          : lesson.phaseId === 'phase-2'
                          ? 'المرحلة 2: الكتابة والإنتاج'
                          : lesson.phaseId === 'phase-3'
                          ? 'المرحلة 3: السيو والنمو'
                          : 'المرحلة 4: الأتمتة والدخل'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono font-bold text-amber-400 flex items-center gap-1">
                          +{lesson.xpReward} XP
                        </span>
                        {isDone && (
                          <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-black text-white leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-xs font-medium text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                      {lesson.subtitle}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{lesson.durationMinutes} دقيقة</span>
                    </div>

                    <button
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-red-500/15 border border-red-500/30 px-3.5 py-1.5 text-xs font-bold text-red-300 hover:bg-red-500 hover:text-black transition-all cursor-pointer"
                    >
                      <span>فتح الدرس الكامل</span>
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Niche Finder */}
      {activeTab === 'niche-finder' && <FacelessNicheFinder />}

      {/* Tab 3: Script Planner */}
      {activeTab === 'script-planner' && <FacelessScriptPlanner />}

      {/* Tab 4: Title & Thumbnail Generator */}
      {activeTab === 'title-generator' && <FacelessTitleGenerator />}

      {/* Tab 5: Production Workflow */}
      {activeTab === 'production-workflow' && <FacelessProductionWorkflow />}

      {/* Tab 6: 30-Day Content Calendar */}
      {activeTab === 'calendar' && <FacelessThirtyDayCalendar />}

      {/* Tab 7: Analytics Tracker */}
      {activeTab === 'analytics-tracker' && <FacelessAnalyticsTracker />}

      {/* Tab 8: Monetization & AdSense Checklist */}
      {activeTab === 'monetization-checker' && <FacelessMonetizationChecker />}

      {/* Lesson Reader Drawer / Modal */}
      {selectedLessonId && activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-zinc-700 bg-zinc-950 p-6 sm:p-8 text-zinc-100 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-red-500/20 border border-red-500/30 px-2.5 py-0.5 text-xs font-bold text-red-400">
                  <Clock className="h-3 w-3" />
                  <span>{activeLesson.durationMinutes} دقيقة · +{activeLesson.xpReward} XP</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {activeLesson.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  {activeLesson.subtitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedLessonId(null)}
                className="rounded-full bg-zinc-800 p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Overview */}
            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800">
              <h4 className="text-xs font-black text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-red-400" />
                <span>نظرة عامة على الدرس</span>
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {activeLesson.overview}
              </p>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>أهم المكتسبات والقواعد الجوهرية</span>
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {activeLesson.keyTakeaways.map((takeaway, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2.5"
                  >
                    <span className="h-5 w-5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Steps */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-zinc-400 flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-emerald-400" />
                <span>الخطوات التنفيذية العملية بالتفصيل</span>
              </h4>
              <div className="space-y-3">
                {activeLesson.actionSteps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-6 rounded-lg bg-red-500 text-black font-black text-xs flex items-center justify-center">
                        {step.stepNumber}
                      </span>
                      <h5 className="text-xs sm:text-sm font-black text-white">{step.title}</h5>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed pr-8">
                      {step.detail}
                    </p>
                    {step.proTip && (
                      <div className="mr-8 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 leading-relaxed flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <span><span className="font-bold text-amber-300">نصيحة محترف (Pro-Tip):</span> {step.proTip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Exercise */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-950/30 to-zinc-900 border border-indigo-500/30 space-y-2">
              <h4 className="text-xs font-black text-indigo-300 flex items-center gap-1.5">
                <Award className="h-4 w-4 text-indigo-400" />
                <span>التمرين التطبيقي للدرس</span>
              </h4>
              <p className="text-xs text-zinc-200 leading-relaxed">
                {activeLesson.practicalExercise.instruction}
              </p>
              <div className="mt-2 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400">
                <span className="font-bold text-zinc-300">المخرج المطلوب تسليمه:</span> {activeLesson.practicalExercise.deliverable}
              </div>
            </div>

            {/* Pitfall Warning */}
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-200 leading-relaxed flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-red-300 block mb-0.5">خطأ شائع يجب تفاديه:</span>
                <span>{activeLesson.pitfallWarning}</span>
              </div>
            </div>

            {/* Interactive Quiz */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-white flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-amber-400" />
                  <span>اختبار الفهم السريع (+{activeLesson.xpReward} XP)</span>
                </h4>
                {awardedQuizIds.includes(activeLesson.id) && (
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>تم ربح الـ XP!</span>
                  </span>
                )}
              </div>

              <div className="text-xs sm:text-sm font-bold text-white">
                {activeLesson.quiz.question}
              </div>

              <div className="space-y-2 pt-1">
                {activeLesson.quiz.options.map((option, idx) => {
                  const isSubmitted = quizSubmitted[activeLesson.id];
                  const selectedIdx = quizAnswers[activeLesson.id];
                  const isCorrect = idx === activeLesson.quiz.correctAnswerIndex;
                  const isUserSelection = selectedIdx === idx;

                  let btnStyle = 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800';
                  if (isSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold';
                    } else if (isUserSelection) {
                      btnStyle = 'bg-red-500/20 border-red-500/40 text-red-300';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(activeLesson, idx)}
                      className={`w-full p-3 rounded-xl border text-right text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {isSubmitted && isCorrect && <Check className="h-4 w-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted[activeLesson.id] && (
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed mt-2">
                  <span className="font-bold text-amber-400">التفسير العلمي: </span>
                  {activeLesson.quiz.explanation}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800">
              <button
                onClick={() => toggleLessonCompleted(activeLesson.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  completedLessonIds.includes(activeLesson.id)
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {completedLessonIds.includes(activeLesson.id)
                    ? 'تم إكمال هذا الدرس بنجاح'
                    : 'تحديد الدرس كمكتمل'}
                </span>
              </button>

              <button
                onClick={() => setSelectedLessonId(null)}
                className="rounded-xl bg-red-500 px-5 py-2 text-xs font-black text-black hover:bg-red-400 transition-all cursor-pointer"
              >
                إغلاق والعودة للمسار
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
