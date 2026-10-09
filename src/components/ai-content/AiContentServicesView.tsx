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
  Filter,
  Film,
  BookOpen,
  Info,
  ChevronLeft,
  ChevronRight,
  Zap,
  Sliders,
  CheckSquare
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  aiContentCurriculum, 
  aiContentModulesList, 
  AiContentLesson 
} from '../../data/aiContentData';
import { AiContentPromptLab } from './AiContentPromptLab';
import { AiContentToolsSection } from './AiContentToolsSection';
import { AiContentMonetizationSection } from './AiContentMonetizationSection';
import { AiContentCapstoneProject } from './AiContentCapstoneProject';

interface AiContentServicesViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const AI_CONTENT_COMPLETED_KEY = 'rikouzone_aicontent_completed_lessons';

export const AiContentServicesView: React.FC<AiContentServicesViewProps> = ({ 
  onNavigate, 
  onCopyText 
}) => {
  const { isRTL } = useLanguage();
  const ArrowBackIcon = isRTL ? ArrowRight : ArrowLeft;
  const ArrowNextIcon = isRTL ? ArrowLeft : ArrowRight;

  // Navigation main tabs
  const [activeTab, setActiveTab] = useState<
    'lessons' | 'prompt-lab' | 'tools' | 'monetization' | 'capstone'
  >('lessons');

  // Filter modules
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active lesson
  const [activeLessonId, setActiveLessonId] = useState<string>(aiContentCurriculum[0].id);

  // Completed lessons state
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(AI_CONTENT_COMPLETED_KEY);
      return stored ? JSON.parse(stored) : [aiContentCurriculum[0].id];
    } catch {
      return [aiContentCurriculum[0].id];
    }
  });

  // Quiz interactive state for active lesson: { [lessonId]: selectedOptionIndex }
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Copied feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(AI_CONTENT_COMPLETED_KEY, JSON.stringify(completedLessons));
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

  // Filtered lessons
  const filteredLessons = aiContentCurriculum.filter((lesson) => {
    const matchesModule = selectedModuleFilter === 'all' || lesson.moduleCategory === selectedModuleFilter;
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.overview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  const activeLessonIndex = aiContentCurriculum.findIndex((l) => l.id === activeLessonId);
  const activeLesson: AiContentLesson = aiContentCurriculum[activeLessonIndex] || aiContentCurriculum[0];

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

  const progressPercentage = Math.round((completedLessons.length / aiContentCurriculum.length) * 100);

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 pb-24">
      {/* Top Breadcrumb & Hero Banner */}
      <div className="relative border-b border-zinc-800/80 bg-gradient-to-b from-purple-950/20 via-zinc-950 to-[#060608] px-4 py-8 sm:px-6 lg:px-8">
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
            <span className="text-purple-400 font-bold">خدمات المحتوى بالذكاء الاصطناعي (AI Content)</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-bold text-purple-300">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                <span>دليل التخصص والاحتراف المالي 2026</span>
              </div>
              <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                خدمات المحتوى المعزز بالذكاء الاصطناعي (AI Content)
              </h1>
              <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed">
                تعلّم كيف تصنع مقالات سيو، سكربتات فيديو، إعلانات، ووصف منتجات بسرعة فائقة بالذكاء الاصطناعي، مع التدقيق البشري الصارم وتحويلها إلى خدمات تجارية مربحة للعملاء والشركات.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-center">
                <span className="text-[11px] font-bold text-zinc-400 block">الدخل المقدر</span>
                <span className="text-lg font-black text-emerald-400">$300 - $3,500/شهر</span>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-center">
                <span className="text-[11px] font-bold text-zinc-400 block">الدروس المكتملة</span>
                <span className="text-lg font-black text-purple-400">
                  {completedLessons.length} / {aiContentCurriculum.length} ({progressPercentage}%)
                </span>
              </div>
            </div>
          </div>

          {/* Main Top Navigation Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-zinc-800/80 pt-4">
            {[
              { id: 'lessons', label: 'الدروس والمنهج (10 أقسام)', icon: BookOpen },
              { id: 'prompt-lab', label: 'مختبر الأوامر (قبل / بعد)', icon: Sparkles },
              { id: 'tools', label: 'دليل الأدوات المجانية', icon: Wrench },
              { id: 'monetization', label: 'كيف تربح من المجال (الخدمات)', icon: DollarSign },
              { id: 'capstone', label: 'المشروع العملي النهائي', icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
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
                    placeholder="ابحث في الدروس..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl bg-zinc-950/80 border border-zinc-800 py-2 pr-9 pl-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Modules filter dropdown/chips */}
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {aiContentModulesList.map((mod) => (
                    <button
                      key={mod.id}
                      onClick={() => setSelectedModuleFilter(mod.id)}
                      className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer text-right ${
                        selectedModuleFilter === mod.id
                          ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
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
                          ? 'border-purple-500/60 bg-gradient-to-r from-purple-950/25 to-zinc-900 shadow-md shadow-purple-500/10'
                          : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-black font-mono text-purple-400">
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
                    <span className="rounded-lg bg-purple-500/10 px-3 py-1 text-xs font-black text-purple-400 border border-purple-500/20">
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

                {/* Lesson Overview Banner */}
                <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
                    <Sparkles className="h-4 w-4" />
                    <span>خلاصة ونطاق الدرس</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
                    {activeLesson.overview}
                  </p>
                </div>

                {/* Key Points Grid */}
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-5 space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="h-4 w-4 text-purple-400" />
                    <span>النقاط الجوهرية التي ستتقنها:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeLesson.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <span className="text-purple-400 font-bold shrink-0 mt-0.5">•</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Content Chapters */}
                <div className="space-y-6">
                  {activeLesson.detailedContent.map((chapter, idx) => (
                    <div key={idx} className="space-y-3 pt-4 border-t border-zinc-800/60 first:border-0 first:pt-0">
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-400" />
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
                            : 'bg-purple-950/20 border-purple-500/30 text-purple-300'
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

                {/* Practical Example Box */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" />
                      <span>مثال عملي تطبيقي حي</span>
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">{activeLesson.practicalExample.title}</span>
                  </div>

                  <div className="rounded-xl bg-zinc-950/70 border border-zinc-800 p-3.5 text-xs text-zinc-300">
                    <span className="font-bold text-zinc-400 block mb-1">السيناريو:</span>
                    {activeLesson.practicalExample.scenario}
                  </div>

                  {activeLesson.practicalExample.inputPrompt && (
                    <div className="rounded-xl bg-purple-950/15 border border-purple-500/20 p-3.5 text-xs text-zinc-200 font-mono">
                      <div className="flex items-center justify-between mb-1 font-sans">
                        <span className="font-bold text-purple-300">البرومبت المقترح:</span>
                        <button
                          onClick={() => handleCopy(activeLesson.practicalExample.inputPrompt || '', 'prompt', 'تم نسخ البرومبت')}
                          className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === 'prompt' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          <span>نسخ</span>
                        </button>
                      </div>
                      <div className="whitespace-pre-line text-zinc-300">
                        {activeLesson.practicalExample.inputPrompt}
                      </div>
                    </div>
                  )}

                  {activeLesson.practicalExample.rawAiOutput && (
                    <div className="rounded-xl bg-red-950/10 border border-red-500/20 p-3.5 text-xs text-zinc-400">
                      <span className="font-bold text-red-400 block mb-1">الناتج الخام للذكاء الاصطناعي (ضعيف):</span>
                      <p className="italic">"{activeLesson.practicalExample.rawAiOutput}"</p>
                      {activeLesson.practicalExample.critique && (
                        <div className="mt-2 text-red-300/90 text-[11px]">
                          <strong>نقد المخرجات:</strong> {activeLesson.practicalExample.critique}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/30 p-4 text-xs text-zinc-200">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-emerald-400">النسخة المحسنة النهائية (بلمسة المحرر البشري):</span>
                      <button
                        onClick={() => handleCopy(activeLesson.practicalExample.humanPolishedOutput, 'polished', 'تم نسخ النص المحسن')}
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-bold"
                      >
                        {copiedId === 'polished' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        <span>نسخ النص</span>
                      </button>
                    </div>
                    <div className="whitespace-pre-line text-zinc-100 leading-relaxed font-normal bg-zinc-950/80 p-3 rounded-lg border border-emerald-500/20">
                      {activeLesson.practicalExample.humanPolishedOutput}
                    </div>
                    <div className="mt-2 text-emerald-300 text-[11px]">
                      <strong>لماذا ينجح هذا النص؟</strong> {activeLesson.practicalExample.whyItWorks}
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Action Roadmap */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <span>خطوات تطبيقية للمبتدئين:</span>
                  </h4>
                  <div className="space-y-2.5">
                    {activeLesson.stepByStepAction.map((step) => (
                      <div key={step.step} className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 flex items-start gap-3.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-xs font-black text-purple-300">
                          {step.step}
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-sm font-bold text-white">{step.title}</h5>
                          <p className="text-xs text-zinc-300 leading-relaxed">{step.action}</p>
                          <div className="text-[11px] text-purple-400 font-medium">
                            💡 نصيحة احترافية: {step.proTip}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Tips & Mistakes to Avoid Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tips */}
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-4 space-y-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>نصائح ذهبية للنجاح:</span>
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {activeLesson.importantTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mistakes */}
                  <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-4 space-y-2">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4" />
                      <span>أخطاء قاتلة تجنبها تماماً:</span>
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {activeLesson.mistakesToAvoid.map((mistake, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-400">✗</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Short Summary */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 flex items-start gap-3">
                  <Info className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-purple-400 block mb-0.5">خلاصة سريعة:</span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                      {activeLesson.summary}
                    </p>
                  </div>
                </div>

                {/* Lesson Quiz Component */}
                {activeLesson.quiz && (
                  <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/20 via-zinc-900 to-purple-950/10 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                        <HelpCircle className="h-4 w-4" />
                        <span>اختبار الفهم السريع</span>
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
                        const isCorrect = optIdx === activeLesson.quiz?.correctIndex;

                        let optionStyle = 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-850';
                        if (isSelected) {
                          optionStyle = 'border-purple-500 bg-purple-500/15 text-white';
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
                            {isSelected && !isSubmitted && <span className="text-purple-400 font-bold">اختيارك</span>}
                            {isSubmitted && isCorrect && <Check className="h-4 w-4 text-emerald-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {!quizSubmitted[activeLesson.id] ? (
                      <button
                        onClick={() => handleSubmitQuiz(activeLesson.id)}
                        disabled={quizAnswers[activeLesson.id] === undefined}
                        className="rounded-xl bg-purple-500 text-white px-5 py-2 text-xs font-bold hover:bg-purple-400 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-md shadow-purple-500/20"
                      >
                        تحقق من الإجابة
                      </button>
                    ) : (
                      <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                        <strong className="text-purple-400 block mb-0.5">التوضيح:</strong>
                        {activeLesson.quiz.explanation}
                      </div>
                    )}
                  </div>
                )}

                {/* Lesson Pagination Bottom */}
                <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                  <button
                    onClick={() => {
                      if (activeLessonIndex > 0) {
                        setActiveLessonId(aiContentCurriculum[activeLessonIndex - 1].id);
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
                    الدرس {activeLessonIndex + 1} من {aiContentCurriculum.length}
                  </span>

                  <button
                    onClick={() => {
                      if (activeLessonIndex < aiContentCurriculum.length - 1) {
                        setActiveLessonId(aiContentCurriculum[activeLessonIndex + 1].id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    disabled={activeLessonIndex === aiContentCurriculum.length - 1}
                    className="rounded-xl bg-purple-500 text-white px-4 py-2.5 text-xs font-bold hover:bg-purple-400 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-purple-500/20"
                  >
                    <span>الدرس التالي</span>
                    <ArrowNextIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROMPT LAB */}
        {activeTab === 'prompt-lab' && (
          <AiContentPromptLab onCopyText={onCopyText} />
        )}

        {/* TAB 3: TOOLS */}
        {activeTab === 'tools' && (
          <AiContentToolsSection onCopyText={onCopyText} />
        )}

        {/* TAB 4: MONETIZATION */}
        {activeTab === 'monetization' && (
          <AiContentMonetizationSection onCopyText={onCopyText} />
        )}

        {/* TAB 5: CAPSTONE PROJECT */}
        {activeTab === 'capstone' && (
          <AiContentCapstoneProject onCopyText={onCopyText} />
        )}
      </div>
    </div>
  );
};
