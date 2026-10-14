import React, { useState, useMemo, useEffect } from 'react';
import { 
  Camera, 
  Film, 
  Music, 
  BookOpen, 
  Calculator, 
  Scale, 
  FileText, 
  Tag, 
  ShieldCheck, 
  CheckSquare, 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Search, 
  ArrowRight,
  Clock, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertTriangle,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { 
  stockContentLessons, 
  stockModuleCategories, 
  StockContentLesson 
} from '../../data/stockContentData';
import { StockEarningsCalculator } from './StockEarningsCalculator';
import { StockPlatformsMatrix } from './StockPlatformsMatrix';
import { StockMetadataGenerator } from './StockMetadataGenerator';
import { StockReleaseChecker } from './StockReleaseChecker';
import { StockQualityChecklist } from './StockQualityChecklist';
import { StockSubmissionsTracker } from './StockSubmissionsTracker';
import { StockFourteenDayPlan } from './StockFourteenDayPlan';
import { getInitialUserState, saveUserState } from '../../utils/challengeStorage';

interface StockContentViewProps {
  onNavigate: (tab: string) => void;
  onCopyText?: (text: string, label: string) => void;
}

const COMPLETED_LESSONS_KEY = 'rikouzone_stock_completed_lessons';
const QUIZ_AWARDED_KEY = 'rikouzone_stock_awarded_quizzes';

export const StockContentView: React.FC<StockContentViewProps> = ({ onNavigate, onCopyText }) => {
  const [activeTab, setActiveTab] = useState<
    'modules' | 'calculator' | 'platforms' | 'metadata-gen' | 'release-checker' | 'checklist' | 'tracker' | 'plan'
  >('modules');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(stockContentLessons[0].id);

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
    return stockContentLessons.find((l) => l.id === selectedLessonId) || stockContentLessons[0];
  }, [selectedLessonId]);

  // Filtered Lessons
  const filteredLessons = useMemo(() => {
    return stockContentLessons.filter((lesson) => {
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

  const handleSelectQuizOption = (lesson: StockContentLesson, optionIdx: number) => {
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
        console.warn('Failed to award XP for stock quiz:', e);
      }
    }
  };

  // Lesson Navigation
  const currentLessonIndex = stockContentLessons.findIndex((l) => l.id === selectedLessonId);
  const prevLesson = currentLessonIndex > 0 ? stockContentLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < stockContentLessons.length - 1
      ? stockContentLessons[currentLessonIndex + 1]
      : null;

  const totalXp = stockContentLessons.reduce((acc, l) => acc + l.xpReward, 0);
  const completedPercent = Math.round(
    (completedLessonIds.length / stockContentLessons.length) * 100
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {/* Top Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-amber-500/10 via-zinc-950 to-zinc-950 pt-8 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => onNavigate('income')}
              className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-lg bg-zinc-900/80 px-3 py-1.5 border border-zinc-800"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>العودة إلى كافة مسارات الدخل</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400">
                  <Camera className="h-3.5 w-3.5" />
                  <span>مسار احترافي متكامل · دخل سلبي تراكمي</span>
                </span>
                <span className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300">
                  14 درساً تطبيقياً · 7 أدوات تفاعلية مدمجة
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                بيع الصور والفيديوهات والمقاطع الصوتية (Stock Content)
              </h1>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                دليل تطبيقي شامل لإنتاج وترخيص الأصول الرقمية (صور احترافية، لقطات B-roll سينمائية بدقة 4K، ومؤثرات صوتية) وكسب عوائد حقوق ملكية متكررة لسنوات عبر منصات Adobe Stock وShutterstock وPond5.
              </p>
            </div>

            {/* Quick Stats Box */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-xl lg:min-w-[280px] space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">التقدم في المسار:</span>
                <span className="font-black text-amber-400">
                  {completedLessonIds.length} / {stockContentLessons.length} دروس ({completedPercent}%)
                </span>
              </div>
              <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${completedPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80 text-xs text-center">
                <div className="p-2 rounded-lg bg-zinc-950/60 border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px]">مكافآت الخبرة</span>
                  <span className="font-black text-amber-400">+{totalXp} XP</span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-950/60 border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px]">الأدوات التفاعلية</span>
                  <span className="font-black text-emerald-400">7 أدوات</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="mt-8 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800">
            {[
              { id: 'modules', label: 'المسار التعليمي (14 درساً)', icon: BookOpen },
              { id: 'calculator', label: 'حاسبة العوائد والنمو', icon: Calculator },
              { id: 'platforms', label: 'مقارنة المنصات العالمية', icon: Scale },
              { id: 'metadata-gen', label: 'مولد الكلمات والعناوين', icon: Tag },
              { id: 'release-checker', label: 'فاحص التراخيص القانونية', icon: ShieldCheck },
              { id: 'checklist', label: 'فحص الجودة قبل الرفع', icon: CheckSquare },
              { id: 'tracker', label: 'سجل تتبع المحفظة', icon: BarChart3 },
              { id: 'plan', label: 'خطة الـ 14 يوماً', icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main View Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        {/* TAB 1: MODULES (14 Lessons) */}
        {activeTab === 'modules' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Lessons List */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3 backdrop-blur-sm">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute right-3.5 top-2.5 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="ابحث في الدروس والمفاهيم..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 pr-10 pl-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Categories Pills */}
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-amber-500 text-black'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    الكل ({stockContentLessons.length})
                  </button>
                  {stockModuleCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-amber-500 text-black'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {cat.title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lesson Items */}
              <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
                {filteredLessons.map((lesson) => {
                  const isSelected = lesson.id === activeLesson.id;
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`rounded-2xl border p-3.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5'
                          : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-bold text-amber-400">
                          {lesson.moduleCategory === 'foundations'
                            ? 'الأساسيات والتراخيص'
                            : lesson.moduleCategory === 'production'
                            ? 'المعدات والإنتاج'
                            : lesson.moduleCategory === 'compliance-metadata'
                            ? 'التراخيص والبيانات'
                            : lesson.moduleCategory === 'platforms-monetization'
                            ? 'المنصات والأرباح'
                            : 'خطة العمل'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                          </span>
                          {isCompleted && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          )}
                        </div>
                      </div>

                      <h4 className="text-xs font-black text-white leading-snug">
                        {lesson.title}
                      </h4>
                      <p className="mt-1 text-[11px] text-zinc-400 line-clamp-1 leading-relaxed">
                        {lesson.subtitle}
                      </p>

                      <div className="mt-2.5 flex items-center justify-between text-[10px] text-zinc-500 pt-2 border-t border-zinc-800/60">
                        <span className="font-semibold text-amber-400">+{lesson.xpReward} XP</span>
                        <span className={isCompleted ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>
                          {isCompleted ? 'مكتمل' : 'غير مكتمل'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Lesson Content Reader */}
            <div className="lg:col-span-8 space-y-6">
              <article className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-xl space-y-6">
                {/* Header */}
                <div className="border-b border-zinc-800 pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                      {activeLesson.duration} · +{activeLesson.xpReward} XP
                    </span>

                    <button
                      onClick={() => toggleLessonCompleted(activeLesson.id)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                        completedLessonIds.includes(activeLesson.id)
                          ? 'bg-emerald-500 text-black font-black'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>
                        {completedLessonIds.includes(activeLesson.id)
                          ? 'الدرس مكتمل'
                          : 'تحديد الدرس كمكتمل'}
                      </span>
                    </button>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {activeLesson.title}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base font-semibold text-amber-400/90 leading-relaxed">
                    {activeLesson.subtitle}
                  </p>
                </div>

                {/* Overview */}
                <div className="rounded-2xl bg-zinc-950/70 border border-zinc-800 p-5 space-y-3">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">
                    نظرة عامة على الدرس:
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {activeLesson.overview}
                  </p>
                </div>

                {/* Key Concepts */}
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span>المفاهيم الجوهرية في هذا الدرس:</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeLesson.keyConcepts.map((concept, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-300"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deep Dive Sections */}
                <div className="space-y-6 pt-2">
                  {activeLesson.deepDive.map((section, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-zinc-800/90 bg-zinc-950/40 p-5 sm:p-6 space-y-3"
                    >
                      <h3 className="text-base font-black text-white border-b border-zinc-800 pb-2.5">
                        {section.sectionTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {section.content}
                      </p>
                      {section.bullets && (
                        <ul className="space-y-2 pt-2">
                          {section.bullets.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Real World Scenario */}
                <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-zinc-950 to-zinc-950 p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-400">
                    <Film className="h-4 w-4" />
                    <span>دراسة حالة وسيناريو تطبيقي واقعي</span>
                  </div>
                  <h4 className="text-base font-black text-white">
                    {activeLesson.realWorldExample.title}
                  </h4>
                  <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
                    <p>
                      <strong className="text-zinc-200">السيناريو: </strong>
                      {activeLesson.realWorldExample.scenario}
                    </p>
                    <p>
                      <strong className="text-zinc-200">التحليل والتنفيذ: </strong>
                      {activeLesson.realWorldExample.breakdown}
                    </p>
                    <p className="text-emerald-400 font-bold">
                      <strong>النتيجة والأثر المالي: </strong>
                      {activeLesson.realWorldExample.outcome}
                    </p>
                  </div>
                </div>

                {/* Common Pitfalls */}
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400" />
                    <span>أخطاء قاتلة تجنب الوقوع فيها:</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeLesson.commonPitfalls.map((pitfall, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2 text-xs"
                      >
                        <h4 className="font-black text-rose-300 flex items-center gap-1.5">
                          <span>✕</span>
                          <span>{pitfall.mistake}</span>
                        </h4>
                        <p className="text-zinc-400 leading-relaxed">
                          <strong className="text-zinc-300">لماذا يضر: </strong>
                          {pitfall.whyItHurts}
                        </p>
                        <p className="text-emerald-400 font-semibold leading-relaxed border-t border-rose-500/20 pt-1.5">
                          <strong>الحل الصحيح: </strong>
                          {pitfall.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Exercise */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>تمرين تطبيقي عملي</span>
                  </div>
                  <h4 className="text-base font-black text-white">
                    {activeLesson.practicalExercise.title}
                  </h4>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {activeLesson.practicalExercise.instructions.map((inst, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-emerald-400 shrink-0">
                          {idx + 1}.
                        </span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-xl bg-zinc-950/70 border border-emerald-500/20 p-3 text-xs text-zinc-300">
                    <strong className="text-emerald-400">المخرج المطلوب: </strong>
                    {activeLesson.practicalExercise.deliverable}
                  </div>
                </div>

                {/* Interactive Quiz */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-amber-400" />
                      <h4 className="text-sm font-black text-white">
                        اختبر فهمك للدرس (+{activeLesson.xpReward} XP)
                      </h4>
                    </div>
                    {awardedQuizIds.includes(activeLesson.id) && (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        تمت إضافة XP إلى رصيدك!
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-zinc-200">
                    {activeLesson.quiz.question}
                  </p>

                  <div className="space-y-2 pt-1">
                    {activeLesson.quiz.options.map((option, optIdx) => {
                      const isSelected = quizAnswers[activeLesson.id] === optIdx;
                      const isSubmitted = quizSubmitted[activeLesson.id];
                      const isCorrect = optIdx === activeLesson.quiz.correctAnswerIndex;

                      let btnStyle =
                        'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700 hover:text-white';
                      if (isSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'border-rose-500 bg-rose-500/20 text-rose-300';
                        }
                      } else if (isSelected) {
                        btnStyle = 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuizOption(activeLesson, optIdx)}
                          className={`w-full text-right p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                        >
                          <span>{option}</span>
                          {isSubmitted && isCorrect && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted[activeLesson.id] && (
                    <div className="mt-3 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                      <span className="font-bold text-amber-400 block mb-1">الشرح التفصيلي:</span>
                      {activeLesson.quiz.explanation}
                    </div>
                  )}
                </div>

                {/* Next / Previous Lesson Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                  {prevLesson ? (
                    <button
                      onClick={() => setSelectedLessonId(prevLesson.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                      <span>{prevLesson.title.split(':')[0]}</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {nextLesson ? (
                    <button
                      onClick={() => setSelectedLessonId(nextLesson.id)}
                      className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-black hover:bg-amber-400 transition-all cursor-pointer"
                    >
                      <span>{nextLesson.title.split(':')[0]}</span>
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('calculator')}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-black text-black hover:bg-emerald-400 transition-all cursor-pointer"
                    >
                      <span>الانتقال إلى حاسبة العوائد</span>
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </article>
            </div>
          </div>
        )}

        {/* TAB 2: CALCULATOR */}
        {activeTab === 'calculator' && <StockEarningsCalculator />}

        {/* TAB 3: PLATFORMS */}
        {activeTab === 'platforms' && <StockPlatformsMatrix />}

        {/* TAB 4: METADATA GENERATOR */}
        {activeTab === 'metadata-gen' && <StockMetadataGenerator />}

        {/* TAB 5: RELEASE CHECKER */}
        {activeTab === 'release-checker' && <StockReleaseChecker />}

        {/* TAB 6: QUALITY CHECKLIST */}
        {activeTab === 'checklist' && <StockQualityChecklist />}

        {/* TAB 7: TRACKER */}
        {activeTab === 'tracker' && <StockSubmissionsTracker />}

        {/* TAB 8: 14-DAY PLAN */}
        {activeTab === 'plan' && <StockFourteenDayPlan />}
      </main>
    </div>
  );
};
