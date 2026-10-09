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
  FolderCheck,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  aaaCurriculum, 
  aaaModulesList, 
  AaaLesson 
} from '../../data/aiAutomationData';
import { AaaSystemProjectsView } from './AaaSystemProjectsView';
import { AaaPortfolioView } from './AaaPortfolioView';
import { AaaCapstoneView } from './AaaCapstoneView';

interface AiAutomationAgencyViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const AAA_COMPLETED_KEY = 'rikouzone_aaa_completed_lessons';

export const AiAutomationAgencyView: React.FC<AiAutomationAgencyViewProps> = ({ 
  onNavigate, 
  onCopyText 
}) => {
  const { isRTL } = useLanguage();
  const ArrowBackIcon = isRTL ? ArrowRight : ArrowLeft;
  const ArrowNextIcon = isRTL ? ArrowLeft : ArrowRight;

  // Main tabs: 'lessons' | 'projects' | 'portfolio' | 'capstone'
  const [activeTab, setActiveTab] = useState<'lessons' | 'projects' | 'portfolio' | 'capstone'>('lessons');

  // Filter lessons
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active lesson
  const [activeLessonId, setActiveLessonId] = useState<string>(aaaCurriculum[0].id);

  // Completed lessons
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(AAA_COMPLETED_KEY);
      return stored ? JSON.parse(stored) : [aaaCurriculum[0].id];
    } catch {
      return [aaaCurriculum[0].id];
    }
  });

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Copy feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(AAA_COMPLETED_KEY, JSON.stringify(completedLessons));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessons]);

  const handleCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleLessonCompletion = (id: string) => {
    setCompletedLessons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredLessons = aaaCurriculum.filter((lesson) => {
    const matchesModule = selectedModuleFilter === 'all' || lesson.moduleCategory === selectedModuleFilter;
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.overview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  const activeLessonIndex = aaaCurriculum.findIndex((l) => l.id === activeLessonId);
  const activeLesson: AaaLesson = aaaCurriculum[activeLessonIndex] || aaaCurriculum[0];

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

  const progressPercentage = Math.round((completedLessons.length / aaaCurriculum.length) * 100);

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 pb-24">
      {/* Top Breadcrumb & Hero Banner */}
      <div className="relative border-b border-zinc-800/80 bg-gradient-to-b from-cyan-950/20 via-zinc-950 to-[#060608] px-4 py-8 sm:px-6 lg:px-8">
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
            <span className="text-cyan-400 font-bold">أتمتة الأعمال بالذكاء الاصطناعي (AI Automation Agency - AAA)</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-300">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>دليل التخصص الميداني No-Code 2026</span>
              </div>
              <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                أتمتة الأعمال بالذكاء الاصطناعي (AI Automation Agency - AAA)
              </h1>
              <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed">
                تعلّم كيف تصمم أنظمة أتمتة الأعمال بدون كود باستخدام Make وZapier، تربط التطبيقات ببعضها، تدمج قدرات الذكاء الاصطناعي، وتقدم خدمات الأتمتة المربحة للشركات وأصحاب المشاريع.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-center">
                <span className="text-[11px] font-bold text-zinc-400 block">الدخل المقدر</span>
                <span className="text-lg font-black text-emerald-400">$700 - $8,000/شهر</span>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-center">
                <span className="text-[11px] font-bold text-zinc-400 block">الدروس المكتملة</span>
                <span className="text-lg font-black text-cyan-400">
                  {completedLessons.length} / {aaaCurriculum.length} ({progressPercentage}%)
                </span>
              </div>
            </div>
          </div>

          {/* Main Top Navigation Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-zinc-800/80 pt-4">
            {[
              { id: 'lessons', label: 'المنهج والدروس التفصيلية', icon: BookOpen },
              { id: 'projects', label: 'المشاريع التطبيقية الخمسة', icon: Layers },
              { id: 'portfolio', label: 'معرض الأعمال (Portfolio)', icon: FolderCheck },
              { id: 'capstone', label: 'مشروع التخرج العملي', icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-black'
                      : 'bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800/80'
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

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* TAB 1: CURRICULUM & LESSONS */}
        {activeTab === 'lessons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar / List of Lessons */}
            <div className="lg:col-span-4 space-y-4">
              {/* Module Filter & Search */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="ابحث في دروس الأتمتة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl bg-zinc-950/80 border border-zinc-800 py-2 pr-9 pl-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Modules filter list */}
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {aaaModulesList.map((mod) => (
                    <button
                      key={mod.id}
                      onClick={() => setSelectedModuleFilter(mod.id)}
                      className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer text-right ${
                        selectedModuleFilter === mod.id
                          ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                          : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                      }`}
                    >
                      <span className="truncate">{mod.title}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">({mod.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lessons Stack */}
              <div className="space-y-2.5">
                {filteredLessons.map((lesson) => {
                  const isCurrent = lesson.id === activeLessonId;
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`group rounded-2xl border p-4 transition-all cursor-pointer relative ${
                        isCurrent
                          ? 'border-cyan-500/60 bg-gradient-to-r from-cyan-950/25 to-zinc-900 shadow-md shadow-cyan-500/10'
                          : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-black font-mono text-cyan-400">
                            {lesson.readTime}
                          </span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-[11px] font-bold text-zinc-400">
                            {lesson.level === 'beginner' ? 'مبتدئ' : lesson.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLessonCompletion(lesson.id);
                          }}
                          className="text-zinc-500 hover:text-emerald-400 transition-colors p-1"
                          title={isDone ? 'تعليم كغير مكتمل' : 'تعليم كمكتمل'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Circle className="h-4 w-4 text-zinc-600 hover:text-zinc-400" />
                          )}
                        </button>
                      </div>

                      <h4 className={`mt-2 text-sm font-bold leading-snug ${isCurrent ? 'text-white' : 'text-zinc-200 group-hover:text-white'}`}>
                        {lesson.title}
                      </h4>
                      <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {lesson.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Lesson Content Display */}
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-6 sm:p-8 space-y-8">
                {/* Lesson Header */}
                <div className="pb-6 border-b border-zinc-800 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-lg bg-cyan-500/10 px-3 py-1 text-xs font-black text-cyan-400 border border-cyan-500/20">
                      {activeLesson.readTime} للقراءة والتطبيق
                    </span>

                    <button
                      onClick={() => toggleLessonCompletion(activeLesson.id)}
                      className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                        completedLessons.includes(activeLesson.id)
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                      }`}
                    >
                      {completedLessons.includes(activeLesson.id) ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>تم إكمال هذا الدرس</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-zinc-400" />
                          <span>تعليم الدرس كمكتمل</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                    {activeLesson.title}
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-medium">
                    {activeLesson.subtitle}
                  </p>
                </div>

                {/* Learning Objective Box */}
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    <Target className="h-4 w-4" />
                    <span>الهدف التعليمي المحدد لهذا الدرس:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
                    {activeLesson.learningObjective}
                  </p>
                </div>

                {/* Key Points Grid */}
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-5 space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                    <span>النقاط الجوهرية للدرس:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeLesson.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Content Sections */}
                <div className="space-y-6">
                  {activeLesson.detailedContent.map((chapter, idx) => (
                    <div key={idx} className="space-y-3 pt-4 border-t border-zinc-800/60 first:border-0 first:pt-0">
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <FileText className="h-4 w-4 text-cyan-400" />
                        <span>{chapter.heading}</span>
                      </h3>
                      {chapter.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                          {p}
                        </p>
                      ))}

                      {chapter.bulletPoints && chapter.bulletPoints.length > 0 && (
                        <div className="space-y-1.5 rounded-xl bg-zinc-900/50 p-4 border border-zinc-800/60">
                          {chapter.bulletPoints.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {chapter.calloutBox && (
                        <div className={`rounded-xl p-4 border ${
                          chapter.calloutBox.type === 'tip'
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                            : chapter.calloutBox.type === 'warning'
                            ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
                            : 'bg-cyan-950/20 border-cyan-500/30 text-cyan-300'
                        }`}>
                          <span className="text-xs font-bold block mb-1">
                            💡 {chapter.calloutBox.title}
                          </span>
                          <p className="text-xs text-zinc-200 leading-relaxed">
                            {chapter.calloutBox.text}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Real-World Practical Example */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" />
                      <span>دراسة حالة واقعية من سوق الأعمال</span>
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">{activeLesson.realWorldExample.scenarioTitle}</span>
                  </div>

                  <div className="rounded-xl bg-zinc-950/70 border border-zinc-800 p-3.5 text-xs text-zinc-300">
                    <span className="font-bold text-zinc-400 block mb-1">السياق التجاري:</span>
                    {activeLesson.realWorldExample.businessContext}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl bg-red-950/10 border border-red-500/20 p-3.5">
                      <span className="font-bold text-red-400 block mb-1">قبل الأتمتة (الوضع اليدوي):</span>
                      <p className="text-zinc-300 leading-relaxed">{activeLesson.realWorldExample.beforeAutomation}</p>
                    </div>

                    <div className="rounded-xl bg-emerald-950/15 border border-emerald-500/30 p-3.5">
                      <span className="font-bold text-emerald-400 block mb-1">بعد بناء نظام الأتمتة:</span>
                      <p className="text-zinc-200 leading-relaxed font-normal">{activeLesson.realWorldExample.afterAutomation}</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-cyan-950/20 border border-cyan-500/20 p-3 text-xs text-cyan-300 flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <strong>الأدوات المستخدمة:</strong> {activeLesson.realWorldExample.toolsUsed.join(' + ')}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {activeLesson.realWorldExample.workflowSummary}
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Action Tasks */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <span>خطوات تطبيقية للمبتدئين:</span>
                  </h4>
                  <div className="space-y-2.5">
                    {activeLesson.stepByStepAction.map((step) => (
                      <div key={step.stepNumber} className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 flex items-start gap-3.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-xs font-black text-cyan-300">
                          {step.stepNumber}
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-sm font-bold text-white">{step.title}</h5>
                          <p className="text-xs text-zinc-300 leading-relaxed">{step.action}</p>
                          <div className="text-[11px] text-zinc-400 font-mono">
                            🛠️ الأداة / الإعداد: {step.toolsOrConfig}
                          </div>
                          <div className="text-[11px] text-cyan-400 font-medium">
                            💡 نصيحة احترافية: {step.proTip}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Mistakes & Fixes */}
                <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-5 space-y-3">
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    <span>أخطاء شائعة وكيفية إصلاحها برمجياً:</span>
                  </span>
                  <div className="space-y-3 text-xs">
                    {activeLesson.commonMistakesAndFixes.map((m, idx) => (
                      <div key={idx} className="rounded-xl bg-zinc-950/80 p-3.5 border border-zinc-800/80 space-y-1.5">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span className="text-rose-400">✗</span>
                          <span>الخطأ: {m.mistake}</span>
                        </div>
                        <p className="text-zinc-400"><strong>لماذا يحدث:</strong> {m.whyItHappens}</p>
                        <p className="text-emerald-300"><strong>الحل الهندسي:</strong> {m.howToFix}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary Box */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 flex items-start gap-3">
                  <Info className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-cyan-400 block mb-0.5">خلاصة الدرس:</span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                      {activeLesson.summary}
                    </p>
                  </div>
                </div>

                {/* Interactive Quiz */}
                <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/20 via-zinc-900 to-cyan-950/10 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="h-4 w-4" />
                      <span>اختبار الفهم والتطبيق</span>
                    </span>
                    {quizSubmitted[activeLesson.id] && (
                      <span className={`text-xs font-bold ${quizAnswers[activeLesson.id] === activeLesson.quiz.correctIndex ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {quizAnswers[activeLesson.id] === activeLesson.quiz.correctIndex ? 'إجابة صحيحة ممتاز! 🎉' : 'حاول مرة أخرى ⚠️'}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white">
                    {activeLesson.quiz.question}
                  </h4>

                  <div className="space-y-2">
                    {activeLesson.quiz.options.map((option, optIdx) => {
                      const isSelected = quizAnswers[activeLesson.id] === optIdx;
                      const isSubmitted = quizSubmitted[activeLesson.id];
                      const isCorrect = optIdx === activeLesson.quiz.correctIndex;

                      let optionStyle = 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-850';
                      if (isSelected) {
                        optionStyle = 'border-cyan-500 bg-cyan-500/15 text-white';
                      }
                      if (isSubmitted) {
                        if (isCorrect) {
                          optionStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'border-rose-500 bg-rose-500/20 text-rose-300';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuizAnswer(activeLesson.id, optIdx)}
                          disabled={isSubmitted}
                          className={`w-full text-right p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{option}</span>
                          {isSelected && !isSubmitted && <span className="text-cyan-400 font-bold">اختيارك</span>}
                          {isSubmitted && isCorrect && <Check className="h-4 w-4 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {!quizSubmitted[activeLesson.id] ? (
                    <button
                      onClick={() => handleSubmitQuiz(activeLesson.id)}
                      disabled={quizAnswers[activeLesson.id] === undefined}
                      className="rounded-xl bg-cyan-500 text-black px-5 py-2 text-xs font-black hover:bg-cyan-400 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                    >
                      تحقق من الإجابة
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                      <strong className="text-cyan-400 block mb-0.5">التوضيح الهندسي:</strong>
                      {activeLesson.quiz.explanation}
                    </div>
                  )}
                </div>

                {/* Lesson Navigation Bottom */}
                <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                  <button
                    onClick={() => {
                      if (activeLessonIndex > 0) {
                        setActiveLessonId(aaaCurriculum[activeLessonIndex - 1].id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    disabled={activeLessonIndex === 0}
                    className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-xs font-bold text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowBackIcon className="h-4 w-4" />
                    <span>الدرس السابق</span>
                  </button>

                  <span className="text-xs text-zinc-500 font-mono">
                    الدرس {activeLessonIndex + 1} من {aaaCurriculum.length}
                  </span>

                  <button
                    onClick={() => {
                      if (activeLessonIndex < aaaCurriculum.length - 1) {
                        setActiveLessonId(aaaCurriculum[activeLessonIndex + 1].id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    disabled={activeLessonIndex === aaaCurriculum.length - 1}
                    className="rounded-xl bg-cyan-500 text-black px-4 py-2.5 text-xs font-black hover:bg-cyan-400 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
                  >
                    <span>الدرس التالي</span>
                    <ArrowNextIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 5 INTEGRATED PROJECTS */}
        {activeTab === 'projects' && (
          <AaaSystemProjectsView onCopyText={onCopyText} />
        )}

        {/* TAB 3: PORTFOLIO ARCHITECTURE */}
        {activeTab === 'portfolio' && (
          <AaaPortfolioView onCopyText={onCopyText} />
        )}

        {/* TAB 4: CAPSTONE GRADUATION PROJECT */}
        {activeTab === 'capstone' && (
          <AaaCapstoneView onCopyText={onCopyText} />
        )}
      </div>
    </div>
  );
};
