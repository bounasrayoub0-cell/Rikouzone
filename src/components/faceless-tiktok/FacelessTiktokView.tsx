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
  Award,
  CheckSquare,
  Film,
  Calculator,
  Target
} from 'lucide-react';
import {
  facelessTiktokLessons,
  facelessTiktokPhases,
  FacelessTiktokLesson
} from '../../data/facelessTiktokData';
import { FacelessTiktokNicheFinder } from './FacelessTiktokNicheFinder';
import { FacelessTiktokIdeaGenerator } from './FacelessTiktokIdeaGenerator';
import { FacelessTiktokHookScriptBuilder } from './FacelessTiktokHookScriptBuilder';
import { FacelessTiktokScenePlanner } from './FacelessTiktokScenePlanner';
import { FacelessTiktokEditingChecklist } from './FacelessTiktokEditingChecklist';
import { FacelessTiktokThirtyDayCalendar } from './FacelessTiktokThirtyDayCalendar';
import { FacelessTiktokAnalyticsTracker } from './FacelessTiktokAnalyticsTracker';
import { FacelessTiktokAffiliateCalculator } from './FacelessTiktokAffiliateCalculator';
import { getInitialUserState, saveUserState } from '../../utils/challengeStorage';

interface FacelessTiktokViewProps {
  onNavigate?: (tab: string) => void;
  onCopyText?: (text: string, label: string) => void;
}

type MainTab =
  | 'lessons'
  | 'niche-finder'
  | 'idea-generator'
  | 'hook-script'
  | 'scene-planner'
  | 'editing-checklist'
  | 'calendar'
  | 'analytics-tracker'
  | 'affiliate-calc';

export const FacelessTiktokView: React.FC<FacelessTiktokViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const [activeTab, setActiveTab] = useState<MainTab>('lessons');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(facelessTiktokLessons[0].id);
  const [isLessonDrawerOpen, setIsLessonDrawerOpen] = useState<boolean>(false);

  // Completed Lessons and Awarded Quizzes in LocalStorage
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('faceless_tiktok_completed_lessons_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [awardedQuizIds, setAwardedQuizIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('faceless_tiktok_awarded_quizzes_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Quiz state for the opened lesson
  const [quizAnswerIndex, setQuizAnswerIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('faceless_tiktok_completed_lessons_v1', JSON.stringify(completedLessonIds));
    } catch (e) {
      console.warn(e);
    }
  }, [completedLessonIds]);

  useEffect(() => {
    try {
      localStorage.setItem('faceless_tiktok_awarded_quizzes_v1', JSON.stringify(awardedQuizIds));
    } catch (e) {
      console.warn(e);
    }
  }, [awardedQuizIds]);

  const activeLesson = useMemo(() => {
    return facelessTiktokLessons.find((l) => l.id === selectedLessonId) || facelessTiktokLessons[0];
  }, [selectedLessonId]);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return facelessTiktokLessons.filter((lesson) => {
      if (selectedPhase !== 'all' && lesson.phaseId !== selectedPhase) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = lesson.title.toLowerCase().includes(q);
        const matchSub = lesson.subtitle.toLowerCase().includes(q);
        const matchSum = lesson.summary.toLowerCase().includes(q);
        return matchTitle || matchSub || matchSum;
      }
      return true;
    });
  }, [selectedPhase, searchQuery]);

  // Handle open lesson
  const handleOpenLesson = (lesson: FacelessTiktokLesson) => {
    setSelectedLessonId(lesson.id);
    setQuizAnswerIndex(null);
    setQuizSubmitted(false);
    setIsLessonDrawerOpen(true);
  };

  // Handle quiz submission and reward XP once
  const handleQuizSubmit = () => {
    if (quizAnswerIndex === null) return;
    setQuizSubmitted(true);

    if (quizAnswerIndex === activeLesson.quiz.correctIndex) {
      if (!awardedQuizIds.includes(activeLesson.id)) {
        try {
          const userState = getInitialUserState();
          userState.totalXp += activeLesson.xpReward;
          saveUserState(userState);
          setAwardedQuizIds((prev) => [...prev, activeLesson.id]);
        } catch (e) {
          console.warn('Failed to award XP for quiz:', e);
        }
      }
      if (!completedLessonIds.includes(activeLesson.id)) {
        setCompletedLessonIds((prev) => [...prev, activeLesson.id]);
      }
    }
  };

  const handleToggleLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const totalLessonsCount = facelessTiktokLessons.length;
  const completedCount = completedLessonIds.length;
  const totalXpAvailable = facelessTiktokLessons.reduce((acc, curr) => acc + curr.xpReward, 0);
  const earnedXp = facelessTiktokLessons
    .filter((l) => awardedQuizIds.includes(l.id))
    .reduce((acc, curr) => acc + curr.xpReward, 0);

  const overallProgress = Math.round((completedCount / totalLessonsCount) * 100);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased pb-24" dir="rtl">
      {/* Top Breadcrumb Navigation */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <button
              onClick={() => onNavigate && onNavigate('income-paths')}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" />
              <span>كل مسارات الدخل</span>
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-200 font-bold">حسابات تيك توك بدون إظهار الوجه</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{earnedXp} / {totalXpAvailable} XP مكتسبة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black pt-8 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 text-xs font-black text-cyan-400 tracking-wide">
                <Video className="h-3.5 w-3.5" />
                <span>مسار تعليمي متكامل احترافي · 15 درساً · 2,250 XP</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                حسابات تيك توك بدون إظهار الوجه <span className="text-cyan-400 font-bold">(Faceless TikTok)</span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                تعلّم بناء حساب TikTok احترافي بدون الظهور أمام الكاميرا، وصناعة مقاطع قصيرة عمودية تعتمد على الخطافات الذكية، والسرد الصوتي، واللقطات المرخصة، والمونتاج السريع، وتحليل البيانات، وبناء مجتمع مخلص، واستكشاف فرص التسويق بالعمولة بأمان ومصداقية.
              </p>
            </div>

            {/* Overall Progress Card */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 min-w-[260px] space-y-3 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                <span>نسبة التقدم في المسار</span>
                <span className="text-cyan-400 font-black">{overallProgress}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                <span>{completedCount} من أصل {totalLessonsCount} دروس مكتملة</span>
                <span className="text-emerald-400 font-bold">{earnedXp} XP</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs (8 Tools + Lessons) */}
          <div className="pt-4 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-zinc-800/80">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'lessons'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>المنهاج والدروس (15)</span>
            </button>

            <button
              onClick={() => setActiveTab('niche-finder')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'niche-finder'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>مستكشف النيتشات</span>
            </button>

            <button
              onClick={() => setActiveTab('idea-generator')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'idea-generator'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Lightbulb className="h-4 w-4" />
              <span>مولّد الأفكار والخطافات</span>
            </button>

            <button
              onClick={() => setActiveTab('hook-script')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'hook-script'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>منشئ Hook وسكريبت</span>
            </button>

            <button
              onClick={() => setActiveTab('scene-planner')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'scene-planner'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Film className="h-4 w-4" />
              <span>مخطط المشاهد والـ B-Roll</span>
            </button>

            <button
              onClick={() => setActiveTab('editing-checklist')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'editing-checklist'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <CheckSquare className="h-4 w-4" />
              <span>قائمة فحص المونتاج</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>تقويم 30 يوماً</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics-tracker')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'analytics-tracker'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>محلل الأداء اليدوي</span>
            </button>

            <button
              onClick={() => setActiveTab('affiliate-calc')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'affiliate-calc'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span>حاسبة التسويق بالعمولة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        {activeTab === 'lessons' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Phase Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setSelectedPhase('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedPhase === 'all'
                      ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                      : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  جميع المراحل (15)
                </button>
                {facelessTiktokPhases.map((phase) => (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedPhase(phase.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      selectedPhase === phase.id
                        ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                        : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    المرحلة {phase.number} ({phase.lessonIds.length})
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[240px]">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="ابحث في الدروس أو المواضيع..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pr-9 pl-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {/* Active Phase Info Card */}
            {selectedPhase !== 'all' && (
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-zinc-300 space-y-1">
                {(() => {
                  const info = facelessTiktokPhases.find((p) => p.id === selectedPhase);
                  if (!info) return null;
                  return (
                    <>
                      <div className="font-bold text-cyan-400 text-sm">{info.title}</div>
                      <p className="text-zinc-400">{info.description}</p>
                    </>
                  );
                })()}
              </div>
            )}

            {/* Lessons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredLessons.map((lesson) => {
                const isCompleted = completedLessonIds.includes(lesson.id);
                const isAwarded = awardedQuizIds.includes(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleOpenLesson(lesson)}
                    className={`rounded-3xl border transition-all p-5 flex flex-col justify-between space-y-4 cursor-pointer group ${
                      isCompleted
                        ? 'border-emerald-500/30 bg-zinc-900/60 shadow-lg shadow-emerald-500/5'
                        : 'border-zinc-800 bg-zinc-900/40 hover:border-cyan-500/50 hover:bg-zinc-900/80 shadow-md'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-black">
                            {lesson.lessonNumber}
                          </span>
                          <span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{lesson.readTime}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {isCompleted ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-black text-emerald-400">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>مكتمل</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-black text-cyan-400">
                              <Sparkles className="h-3 w-3" />
                              <span>+{lesson.xpReward} XP</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-base font-black text-white group-hover:text-cyan-400 transition-colors leading-snug">
                        {lesson.title}
                      </h3>

                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                        {lesson.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-zinc-500">
                        {isAwarded ? 'تم اجتياز الاختبار ✓' : 'اختبار وتطبيق عملي'}
                      </span>
                      <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-[11px]">
                        <span>فتح الدرس</span>
                        <ArrowLeft className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Interactive Tool Tabs */}
        {activeTab === 'niche-finder' && <FacelessTiktokNicheFinder />}
        {activeTab === 'idea-generator' && <FacelessTiktokIdeaGenerator />}
        {activeTab === 'hook-script' && <FacelessTiktokHookScriptBuilder />}
        {activeTab === 'scene-planner' && <FacelessTiktokScenePlanner />}
        {activeTab === 'editing-checklist' && <FacelessTiktokEditingChecklist />}
        {activeTab === 'calendar' && <FacelessTiktokThirtyDayCalendar />}
        {activeTab === 'analytics-tracker' && <FacelessTiktokAnalyticsTracker />}
        {activeTab === 'affiliate-calc' && <FacelessTiktokAffiliateCalculator />}
      </main>

      {/* Lesson Drawer Modal */}
      {isLessonDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-4xl rounded-3xl border border-zinc-700 bg-zinc-950 p-6 sm:p-8 shadow-2xl my-8 overflow-hidden space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-cyan-400">الدرس {activeLesson.lessonNumber} من 15</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs text-zinc-400">{activeLesson.readTime} قراءة</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-bold text-amber-400">+{activeLesson.xpReward} XP</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">{activeLesson.title}</h2>
                <p className="text-xs sm:text-sm text-zinc-400">{activeLesson.subtitle}</p>
              </div>

              <button
                onClick={() => setIsLessonDrawerOpen(false)}
                className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Key Takeaways Box */}
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
              <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                <span>النقاط الجوهرية للدرس (Key Takeaways):</span>
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300 leading-relaxed">
                {activeLesson.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detailed Body Sections */}
            <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p className="p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-zinc-200 leading-relaxed">
                {activeLesson.detailedContent.introduction}
              </p>

              {activeLesson.detailedContent.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3 pt-2">
                  <h3 className="text-base font-black text-white border-r-2 border-cyan-400 pr-3">
                    {section.heading}
                  </h3>
                  <div className="whitespace-pre-line leading-relaxed text-zinc-300 pr-3">
                    {section.body}
                  </div>

                  {section.bulletPoints && (
                    <div className="pr-3 space-y-1.5">
                      {section.bulletPoints.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                          <span className="text-cyan-400 font-bold shrink-0">✓</span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.warningOrNote && (
                    <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{section.warningOrNote}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Practical Exercise Box */}
            <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-black text-emerald-400">
                <Target className="h-5 w-5" />
                <span>{activeLesson.detailedContent.practicalExercise.title}</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeLesson.detailedContent.practicalExercise.description}
              </p>

              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-zinc-400 block">خطوات التنفيذ التطبيقية:</span>
                {activeLesson.detailedContent.practicalExercise.actionSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-400 flex items-center gap-2">
                <span className="text-emerald-400 font-bold shrink-0">المخرج النهائي المطلوب:</span>
                <span className="text-zinc-200">{activeLesson.detailedContent.practicalExercise.deliverable}</span>
              </div>
            </div>

            {/* Quiz Section with XP Award */}
            <div className="p-5 rounded-3xl bg-zinc-900 border border-cyan-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-black text-cyan-400">
                  <HelpCircle className="h-5 w-5" />
                  <span>اختبار الدرس التقويمي (مكافأة +{activeLesson.xpReward} XP)</span>
                </div>
                {awardedQuizIds.includes(activeLesson.id) && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>تم تحصيل النقاط مسبقاً</span>
                  </span>
                )}
              </div>

              <div className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                {activeLesson.quiz.question}
              </div>

              {/* Quiz Options */}
              <div className="space-y-2">
                {activeLesson.quiz.options.map((opt, oIdx) => {
                  let optStyle = 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-300';
                  if (quizSubmitted) {
                    if (oIdx === activeLesson.quiz.correctIndex) {
                      optStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold';
                    } else if (quizAnswerIndex === oIdx) {
                      optStyle = 'border-rose-500 bg-rose-950/40 text-rose-300';
                    }
                  } else if (quizAnswerIndex === oIdx) {
                    optStyle = 'border-cyan-500 bg-cyan-950/30 text-cyan-300';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={quizSubmitted}
                      onClick={() => setQuizAnswerIndex(oIdx)}
                      className={`w-full text-right p-3.5 rounded-2xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && oIdx === activeLesson.quiz.correctIndex && (
                        <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit Quiz or Show Explanation */}
              {!quizSubmitted ? (
                <button
                  disabled={quizAnswerIndex === null}
                  onClick={handleQuizSubmit}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 disabled:opacity-40 text-black text-xs font-black hover:bg-cyan-400 transition-colors cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  تأكيد الإجابة واحتساب النقاط
                </button>
              ) : (
                <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1.5 text-xs">
                  <div className="font-bold text-cyan-400">تفسير الإجابة الصحيحة:</div>
                  <p className="text-zinc-300 leading-relaxed">{activeLesson.quiz.explanation}</p>
                </div>
              )}
            </div>

            {/* Bottom Lesson Footer Controls */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => handleToggleLessonComplete(activeLesson.id)}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  completedLessonIds.includes(activeLesson.id)
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {completedLessonIds.includes(activeLesson.id)
                    ? 'الدرس مكتمل (انقر للإلغاء)'
                    : 'تعليم الدرس كمكتمل'}
                </span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {/* Prev Lesson Button */}
                {activeLesson.lessonNumber > 1 && (
                  <button
                    onClick={() => {
                      const prev = facelessTiktokLessons[activeLesson.lessonNumber - 2];
                      if (prev) handleOpenLesson(prev);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors cursor-pointer"
                  >
                    الدرس السابق
                  </button>
                )}

                {/* Next Lesson Button */}
                {activeLesson.lessonNumber < facelessTiktokLessons.length && (
                  <button
                    onClick={() => {
                      const next = facelessTiktokLessons[activeLesson.lessonNumber];
                      if (next) handleOpenLesson(next);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-colors cursor-pointer"
                  >
                    الدرس التالي
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
