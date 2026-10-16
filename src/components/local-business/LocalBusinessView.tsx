import React, { useState, useMemo, useEffect } from 'react';
import {
  Building2,
  BookOpen,
  MapPin,
  MessageSquare,
  DollarSign,
  FileText,
  Calendar,
  BarChart3,
  TrendingUp,
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
  Award,
  CheckSquare,
  Calculator,
  Target,
  Brain
} from 'lucide-react';
import {
  localBusinessLessons,
  localBusinessPhases,
  LocalBusinessLesson
} from '../../data/localBusinessContentData';
import { LocalBusinessAuditTool } from './LocalBusinessAuditTool';
import { LocalBusinessOutreachGenerator } from './LocalBusinessOutreachGenerator';
import { LocalBusinessPackageBuilder } from './LocalBusinessPackageBuilder';
import { LocalBusinessProposalGenerator } from './LocalBusinessProposalGenerator';
import { LocalBusinessThirtyDayRoadmap } from './LocalBusinessThirtyDayRoadmap';
import { LocalBusinessReportBuilder } from './LocalBusinessReportBuilder';
import { LocalBusinessAdsSimulator } from './LocalBusinessAdsSimulator';
import { LocalBusinessObjectionsSimulator } from './LocalBusinessObjectionsSimulator';
import { getInitialUserState, saveUserState } from '../../utils/challengeStorage';

interface LocalBusinessViewProps {
  onNavigate?: (tab: string) => void;
  onCopyText?: (text: string, label: string) => void;
}

type MainTab =
  | 'lessons'
  | 'audit-tool'
  | 'outreach-gen'
  | 'package-builder'
  | 'proposal-sow'
  | 'roadmap-30d'
  | 'monthly-report'
  | 'ads-simulator'
  | 'objections-sim';

export const LocalBusinessView: React.FC<LocalBusinessViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const [activeTab, setActiveTab] = useState<MainTab>('lessons');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(localBusinessLessons[0].id);
  const [isLessonDrawerOpen, setIsLessonDrawerOpen] = useState<boolean>(false);

  // Completed Lessons and Awarded Quizzes in LocalStorage
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('local_biz_completed_lessons_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [awardedQuizIds, setAwardedQuizIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('local_biz_awarded_quizzes_v1');
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
      localStorage.setItem('local_biz_completed_lessons_v1', JSON.stringify(completedLessonIds));
    } catch (e) {
      console.warn(e);
    }
  }, [completedLessonIds]);

  useEffect(() => {
    try {
      localStorage.setItem('local_biz_awarded_quizzes_v1', JSON.stringify(awardedQuizIds));
    } catch (e) {
      console.warn(e);
    }
  }, [awardedQuizIds]);

  const activeLesson = useMemo(() => {
    return localBusinessLessons.find((l) => l.id === selectedLessonId) || localBusinessLessons[0];
  }, [selectedLessonId]);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return localBusinessLessons.filter((lesson) => {
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
  const handleOpenLesson = (lesson: LocalBusinessLesson) => {
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

  const totalLessonsCount = localBusinessLessons.length;
  const completedCount = completedLessonIds.length;
  const totalXpAvailable = localBusinessLessons.reduce((acc, curr) => acc + curr.xpReward, 0);
  const earnedXp = localBusinessLessons
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
              onClick={() => onNavigate?.('income')}
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" />
              <span>العودة لمسارات الدخل</span>
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-emerald-400 font-bold">الخدمات الرقمية للمشاريع المحلية</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
              <span className="text-zinc-400">التقدم الكلي:</span>
              <span className="text-emerald-400">{overallProgress}%</span>
              <span className="text-zinc-600">|</span>
              <span className="text-amber-400 font-black">+{earnedXp} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Track Header */}
      <div className="relative border-b border-zinc-800/80 bg-gradient-to-b from-emerald-950/20 via-zinc-950 to-zinc-950 py-10 sm:py-14 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-black text-emerald-400 mb-4">
              <Building2 className="h-4 w-4" />
              <span>المسار التدريبي الشامل والمهني الميداني</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              الخدمات الرقمية للمشاريع المحلية
              <span className="block text-xl sm:text-2xl font-bold text-emerald-400 mt-2 font-mono">
                (Local Business Digital Services)
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
              تعلّم تقديم خدمات رقمية حقيقية للمطاعم والعيادات والصالونات والمتاجر في مدينتك: تحسين خرائط Google، إدارة السوشيال ميديا، جلسات التصوير بالهاتف، إعلانات الاستهداف الجغرافي، وإغلاق عقود اشتراك شهرية مستقرة (Retainers) من 300$ إلى 1,200$ شهرياً لكل عميل.
            </p>

            {/* Quick Metrics Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-bold">
              <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-zinc-300">
                <BookOpen className="h-4 w-4 text-emerald-400" />
                <span>16 درساً تفصيلياً (4 مراحل)</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-zinc-300">
                <Award className="h-4 w-4 text-amber-400" />
                <span>{totalXpAvailable} نقطة XP متاحة</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-zinc-300">
                <Sparkles className="h-4 w-4 text-teal-400" />
                <span>8 أدوات تفاعلية تطبيقية</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>بدون رأس مال (مناسب للمبتدئين)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation Bar */}
      <div className="border-b border-zinc-800/80 bg-zinc-950 sticky top-[49px] z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition cursor-pointer whitespace-nowrap border ${
                activeTab === 'lessons'
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-md shadow-emerald-500/10'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>المنهاج والدروس (16)</span>
            </button>

            <button
              onClick={() => setActiveTab('audit-tool')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition cursor-pointer whitespace-nowrap border ${
                activeTab === 'audit-tool'
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-md shadow-emerald-500/10'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>تدقيق الخرائط (Audit Tool)</span>
            </button>

            <button
              onClick={() => setActiveTab('outreach-gen')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition cursor-pointer whitespace-nowrap border ${
                activeTab === 'outreach-gen'
                  ? 'border-amber-500 bg-amber-500/20 text-amber-300 shadow-md shadow-amber-500/10'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>مولد رسائل التواصل (Outreach)</span>
            </button>

            <button
              onClick={() => setActiveTab('package-builder')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition cursor-pointer whitespace-nowrap border ${
                activeTab === 'package-builder'
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-md shadow-emerald-500/10'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <DollarSign className="h-4 w-4" />
              <span>حاسبة الباقات (Pricing)</span>
            </button>

            <button
              onClick={() => setActiveTab('proposal-sow')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition cursor-pointer whitespace-nowrap border ${
                activeTab === 'proposal-sow'
                  ? 'border-sky-500 bg-sky-500/20 text-sky-300 shadow-md shadow-sky-500/10'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>وثيقة نطاق العمل (SOW)</span>
            </button>

            <button
              onClick={() => setActiveTab('roadmap-30d')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition cursor-pointer whitespace-nowrap border ${
                activeTab === 'roadmap-30d'
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-md shadow-emerald-500/10'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>خطة الـ 30 يوماً (Roadmap)</span>
            </button>

            <button
              onClick={() => setActiveTab('monthly-report')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition cursor-pointer whitespace-nowrap border ${
                activeTab === 'monthly-report'
                  ? 'border-teal-500 bg-teal-500/20 text-teal-300 shadow-md shadow-teal-500/10'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>تقرير الأداء الشهري (Report)</span>
            </button>

            <button
              onClick={() => setActiveTab('ads-simulator')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition cursor-pointer whitespace-nowrap border ${
                activeTab === 'ads-simulator'
                  ? 'border-rose-500 bg-rose-500/20 text-rose-300 shadow-md shadow-rose-500/10'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>محاكي الإعلانات (Local Ads)</span>
            </button>

            <button
              onClick={() => setActiveTab('objections-sim')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition cursor-pointer whitespace-nowrap border ${
                activeTab === 'objections-sim'
                  ? 'border-purple-500 bg-purple-500/20 text-purple-300 shadow-md shadow-purple-500/10'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Brain className="h-4 w-4" />
              <span>محاكي الاعتراضات (Objections)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {activeTab === 'lessons' && (
          <div className="space-y-8">
            {/* Phase Selection and Search Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                <button
                  onClick={() => setSelectedPhase('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer border ${
                    selectedPhase === 'all'
                      ? 'border-emerald-500 bg-emerald-500 text-black'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
                  }`}
                >
                  كافة المراحل (16)
                </button>
                {localBusinessPhases.map((phase) => (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedPhase(phase.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap border ${
                      selectedPhase === phase.id
                        ? 'border-emerald-500 bg-emerald-500 text-black'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {phase.title.split(':')[0]}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="absolute top-2.5 right-3 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="ابحث في عناوين أو مواضيع الدروس..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 pr-9 pl-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 4 Phases Overview Accordion / Cards */}
            <div className="space-y-10">
              {localBusinessPhases.map((phase) => {
                const phaseLessons = filteredLessons.filter((l) => l.phaseId === phase.id);
                if (phaseLessons.length === 0) return null;

                const completedInPhase = phaseLessons.filter((l) => completedLessonIds.includes(l.id)).length;

                return (
                  <div key={phase.id} className="space-y-4">
                    {/* Phase Header */}
                    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            {phase.badge}
                          </span>
                          <span className="text-xs text-zinc-500">
                            {completedInPhase} من أصل {phaseLessons.length} مكتمل
                          </span>
                        </div>
                        <h2 className="mt-1 text-base sm:text-lg font-black text-white">
                          {phase.title}
                        </h2>
                        <p className="mt-1 text-xs text-zinc-400 max-w-2xl">
                          {phase.description}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs font-mono font-bold text-zinc-500">
                          المرحلة {phase.number} من 4
                        </span>
                      </div>
                    </div>

                    {/* Lessons Grid for this phase */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phaseLessons.map((lesson) => {
                        const isCompleted = completedLessonIds.includes(lesson.id);
                        const isQuizPassed = awardedQuizIds.includes(lesson.id);

                        return (
                          <div
                            key={lesson.id}
                            onClick={() => handleOpenLesson(lesson)}
                            className={`group cursor-pointer rounded-2xl border p-5 transition-all duration-200 flex flex-col justify-between hover:scale-[1.01] ${
                              isCompleted
                                ? 'border-emerald-500/40 bg-zinc-950/90 hover:border-emerald-500/70 shadow-lg shadow-emerald-500/5'
                                : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/80'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-800 text-xs font-black text-emerald-400 border border-zinc-700">
                                    {lesson.lessonNumber}
                                  </span>
                                  <span className="text-xs font-bold text-zinc-400 flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {lesson.readTime}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                                    +{lesson.xpReward} XP
                                  </span>
                                  {isCompleted && (
                                    <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                                      <Check className="h-3 w-3 stroke-[3]" />
                                    </span>
                                  )}
                                </div>
                              </div>

                              <h3 className="mt-3 text-sm sm:text-base font-black text-white group-hover:text-emerald-400 transition">
                                {lesson.title}
                              </h3>
                              <p className="mt-1 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                                {lesson.subtitle}
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
                              <span className="group-hover:text-zinc-300 transition">
                                تمرين عملي + اختبار معرفي
                              </span>
                              <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <span>قراءة الدرس</span>
                                <ArrowLeft className="h-3.5 w-3.5" />
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

        {/* Tab 2: Audit Tool */}
        {activeTab === 'audit-tool' && <LocalBusinessAuditTool />}

        {/* Tab 3: Outreach Generator */}
        {activeTab === 'outreach-gen' && <LocalBusinessOutreachGenerator />}

        {/* Tab 4: Pricing & Package Builder */}
        {activeTab === 'package-builder' && <LocalBusinessPackageBuilder />}

        {/* Tab 5: Proposal & SOW */}
        {activeTab === 'proposal-sow' && <LocalBusinessProposalGenerator />}

        {/* Tab 6: 30-Day Roadmap */}
        {activeTab === 'roadmap-30d' && <LocalBusinessThirtyDayRoadmap />}

        {/* Tab 7: Monthly Report */}
        {activeTab === 'monthly-report' && <LocalBusinessReportBuilder />}

        {/* Tab 8: Local Ads Simulator */}
        {activeTab === 'ads-simulator' && <LocalBusinessAdsSimulator />}

        {/* Tab 9: Objections Simulator */}
        {activeTab === 'objections-sim' && <LocalBusinessObjectionsSimulator />}
      </main>

      {/* Slide-over Lesson Drawer / Reader Modal */}
      {isLessonDrawerOpen && activeLesson && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
            <div className="w-screen max-w-3xl bg-zinc-950 border-r border-zinc-800 flex flex-col shadow-2xl">
              {/* Drawer Header */}
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-sm border border-emerald-500/40">
                    {activeLesson.lessonNumber}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-zinc-400">
                      الدرس {activeLesson.lessonNumber} من 16
                    </span>
                    <h2 className="text-sm sm:text-base font-black text-white line-clamp-1">
                      {activeLesson.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleLessonComplete(activeLesson.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      completedLessonIds.includes(activeLesson.id)
                        ? 'bg-emerald-500 text-black font-black'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                    <span>{completedLessonIds.includes(activeLesson.id) ? 'مكتمل' : 'تحديد كمكتمل'}</span>
                  </button>

                  <button
                    onClick={() => setIsLessonDrawerOpen(false)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-zinc-200 leading-relaxed selection:bg-emerald-500 selection:text-black">
                {/* Meta details */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400">وقت القراءة:</span>
                    <span className="text-white font-bold">{activeLesson.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400">مكافأة الاختبار:</span>
                    <span className="text-amber-400 font-black">+{activeLesson.xpReward} XP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400">المرحلة:</span>
                    <span className="text-emerald-400 font-bold">
                      {localBusinessPhases.find((p) => p.id === activeLesson.phaseId)?.badge}
                    </span>
                  </div>
                </div>

                {/* Subtitle & Introduction */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {activeLesson.title}
                  </h3>
                  <p className="mt-1 text-sm text-emerald-400 font-medium">
                    {activeLesson.subtitle}
                  </p>
                  <p className="mt-4 text-sm text-zinc-300 leading-relaxed bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800/80">
                    {activeLesson.detailedContent.introduction}
                  </p>
                </div>

                {/* Key Takeaways */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-2.5">
                  <h4 className="text-xs font-black uppercase text-emerald-400 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>النقاط الجوهرية المستخلصة (Key Takeaways):</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300">
                    {activeLesson.keyTakeaways.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detailed Sections */}
                <div className="space-y-6">
                  {activeLesson.detailedContent.sections.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-3 pt-4 border-t border-zinc-800/60">
                      <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                        <span className="text-emerald-400 font-mono text-sm">#{sIdx + 1}</span>
                        <span>{section.heading}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                        {section.body}
                      </p>

                      {section.bulletPoints && section.bulletPoints.length > 0 && (
                        <div className="space-y-1.5 pr-2">
                          {section.bulletPoints.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.codeOrExample && (
                        <div className="mt-3 p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap">
                          {section.codeOrExample}
                        </div>
                      )}

                      {section.warningOrNote && (
                        <div className="mt-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{section.warningOrNote}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Practical Exercise Box */}
                <div className="rounded-3xl border border-sky-500/40 bg-sky-500/10 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-black uppercase">
                    <Target className="h-4 w-4" />
                    <span>التمرين العملي للدرس</span>
                  </div>
                  <h4 className="text-base font-black text-white">
                    {activeLesson.detailedContent.practicalExercise.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {activeLesson.detailedContent.practicalExercise.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <strong className="text-xs font-bold text-sky-300 block">خطوات التنفيذ الميداني:</strong>
                    {activeLesson.detailedContent.practicalExercise.actionSteps.map((step, stIdx) => (
                      <div key={stIdx} className="flex items-start gap-2 text-xs text-zinc-200">
                        <span className="font-mono text-sky-400 font-bold">{stIdx + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-zinc-950/70 rounded-xl border border-sky-500/30 text-xs text-sky-200">
                    <strong>المخرج المطلوب تسليمه:</strong> {activeLesson.detailedContent.practicalExercise.deliverable}
                  </div>
                </div>

                {/* Quiz Engine */}
                <div className="rounded-3xl border border-amber-500/40 bg-zinc-900/90 p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase">
                      <HelpCircle className="h-4 w-4" />
                      <span>اختبار استيعاب الدرس (+{activeLesson.xpReward} XP)</span>
                    </div>

                    {awardedQuizIds.includes(activeLesson.id) && (
                      <span className="text-[11px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        تم اجتياز الاختبار بنجاح ✓
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm sm:text-base font-black text-white">
                    {activeLesson.quiz.question}
                  </h4>

                  <div className="space-y-2.5">
                    {activeLesson.quiz.options.map((opt, oIdx) => {
                      const isSelected = quizAnswerIndex === oIdx;
                      const isCorrect = oIdx === activeLesson.quiz.correctIndex;
                      let btnStyle = 'border-zinc-800 bg-zinc-950/60 text-zinc-300 hover:border-zinc-700';

                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'border-rose-500 bg-rose-500/20 text-rose-300';
                        }
                      } else if (isSelected) {
                        btnStyle = 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold';
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswerIndex(oIdx)}
                          className={`w-full text-right p-3.5 rounded-2xl border text-xs sm:text-sm transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && <Check className="h-4 w-4 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      onClick={handleQuizSubmit}
                      disabled={quizAnswerIndex === null}
                      className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed font-black text-xs sm:text-sm text-black transition shadow-lg shadow-amber-500/20"
                    >
                      تأكيد الإجابة والحصول على {activeLesson.xpReward} XP
                    </button>
                  ) : (
                    <div className="space-y-3 pt-2">
                      <div
                        className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                          quizAnswerIndex === activeLesson.quiz.correctIndex
                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                            : 'border-rose-500/40 bg-rose-500/10 text-rose-200'
                        }`}
                      >
                        <p className="font-bold mb-1">
                          {quizAnswerIndex === activeLesson.quiz.correctIndex
                            ? 'إجابة صحيحة! أحسنت، تمت إضافة نقاط الـ XP إلى رصيدك.'
                            : 'إجابة غير دقيقة. راجع الشرح التالي لترسيخ الفهم:'}
                        </p>
                        <p className="text-xs text-zinc-300 leading-relaxed mt-1">
                          {activeLesson.quiz.explanation}
                        </p>
                      </div>

                      {quizAnswerIndex !== activeLesson.quiz.correctIndex && (
                        <button
                          onClick={() => {
                            setQuizSubmitted(false);
                            setQuizAnswerIndex(null);
                          }}
                          className="w-full py-2.5 rounded-xl border border-zinc-700 bg-zinc-800 text-xs font-bold text-zinc-200 hover:bg-zinc-700 transition"
                        >
                          إعادة المحاولة
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Lesson Navigation Footer */}
                <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                  {(() => {
                    const currentIndex = localBusinessLessons.findIndex((l) => l.id === activeLesson.id);
                    const prevLesson = currentIndex > 0 ? localBusinessLessons[currentIndex - 1] : null;
                    const nextLesson = currentIndex < localBusinessLessons.length - 1 ? localBusinessLessons[currentIndex + 1] : null;

                    return (
                      <>
                        {prevLesson ? (
                          <button
                            onClick={() => handleOpenLesson(prevLesson)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white transition"
                          >
                            <ArrowRight className="h-4 w-4" />
                            <span>الدرس السابق ({prevLesson.lessonNumber})</span>
                          </button>
                        ) : <div />}

                        {nextLesson ? (
                          <button
                            onClick={() => handleOpenLesson(nextLesson)}
                            className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-400 hover:text-emerald-300 transition"
                          >
                            <span>الدرس التالي ({nextLesson.lessonNumber})</span>
                            <ArrowLeft className="h-4 w-4" />
                          </button>
                        ) : <div />}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
