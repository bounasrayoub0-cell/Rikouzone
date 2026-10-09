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
  Briefcase
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  templateSellingCurriculum, 
  templateModulesList, 
  TemplateLesson 
} from '../../data/templateData';
import { TemplateIdeaWorkshop } from './TemplateIdeaWorkshop';
import { TemplatePlatformsView } from './TemplatePlatformsView';

interface SellingTemplatesViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const TEMPLATES_COMPLETED_KEY = 'rikouzone_templates_completed_lessons';

export const SellingTemplatesView: React.FC<SellingTemplatesViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const { isRTL } = useLanguage();
  const ArrowBackIcon = isRTL ? ArrowRight : ArrowLeft;
  const ArrowNextIcon = isRTL ? ArrowLeft : ArrowRight;

  // Sub-tabs: 'curriculum' | 'ideas' | 'platforms'
  const [activeTab, setActiveTab] = useState<'curriculum' | 'ideas' | 'platforms'>('curriculum');

  // Filter lessons
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active lesson
  const [activeLessonId, setActiveLessonId] = useState<string>(templateSellingCurriculum[0].id);

  // Completed lessons stored in localStorage
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(TEMPLATES_COMPLETED_KEY);
      return stored ? JSON.parse(stored) : [templateSellingCurriculum[0].id];
    } catch {
      return [templateSellingCurriculum[0].id];
    }
  });

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Copy feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(TEMPLATES_COMPLETED_KEY, JSON.stringify(completedLessons));
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

  const filteredLessons = templateSellingCurriculum.filter((lesson) => {
    const matchesModule = selectedModuleFilter === 'all' || lesson.moduleCategory === selectedModuleFilter;
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.simplifiedExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  const activeLessonIndex = templateSellingCurriculum.findIndex((l) => l.id === activeLessonId);
  const activeLesson: TemplateLesson = templateSellingCurriculum[activeLessonIndex] || templateSellingCurriculum[0];

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

  const progressPercentage = Math.round((completedLessons.length / templateSellingCurriculum.length) * 100);

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 pb-24">
      {/* Top Breadcrumb & Hero Banner */}
      <div className="relative border-b border-zinc-800/80 bg-gradient-to-b from-emerald-950/20 via-zinc-950 to-[#060608] px-4 py-8 sm:px-6 lg:px-8">
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
            <span className="text-emerald-400 font-bold">بيع القوالب الجاهزة (Notion & Canva Templates)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-400 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>مسار احترافي متكامل: من الصفر إلى إطلاق متجرك 2026</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                بيع قوالب Notion وCanva الجاهزة
              </h1>
              <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
                تعلم كيف تكتشف الأفكار المطلوبة، تبني أنظمة Notion متقدمة ولوحات تحكم، تصمم حزم Canva متناسقة الهوية، تجهز ملفات التسليم التفاعلية، وتبيع قوالبك عبر منصات مجانية مثل Payhip مع حلول استقبال الأموال للمغرب والعالم العربي.
              </p>

              {/* Metric Highlights */}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-xl bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 text-zinc-300 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
                  <span>9 أقسام تعليمية شاملة</span>
                </span>
                <span className="rounded-xl bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 text-zinc-300 flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-emerald-400" />
                  <span>مشروعان تطبيقيان كاملان للبيع</span>
                </span>
                <span className="rounded-xl bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 text-zinc-300 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>دليل التراخيص والحماية القانونية</span>
                </span>
              </div>
            </div>

            {/* Progress Card */}
            <div className="lg:col-span-4 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-400 mb-2">
                <span>تقدمك في مسار القوالب:</span>
                <span className="text-emerald-400">{progressPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
                <span>{completedLessons.length} من أصل {templateSellingCurriculum.length} دروس مكتملة</span>
                <span className="text-emerald-400 font-bold">جاهز للتنفيذ</span>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab('curriculum');
                    setSelectedModuleFilter('ready-products');
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  الانتقال للمشاريع التطبيقية الجاهزة
                </button>
              </div>
            </div>
          </div>

          {/* Sub Navigation Bar */}
          <div className="mt-10 flex items-center gap-2 border-b border-zinc-800/80 pb-px overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'curriculum'
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>المسار التعليمي والدروس (9 أقسام)</span>
            </button>

            <button
              onClick={() => setActiveTab('ideas')}
              className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'ideas'
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Target className="h-4 w-4" />
              <span>مختبر الأفكار وحاسبة الجاهزية</span>
            </button>

            <button
              onClick={() => setActiveTab('platforms')}
              className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'platforms'
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Globe className="h-4 w-4" />
              <span>فحص المنصات وحاسبة الأرباح للمغرب</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: CURRICULUM LESSONS */}
        {activeTab === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Modules & Lessons List */}
            <div className="lg:col-span-4 space-y-4">
              {/* Search & Filter */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3">
                <div className="relative">
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="ابحث في دروس Notion وCanva..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 py-2 pr-9 pl-4 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-52 overflow-y-auto pr-1">
                  {templateModulesList.map((mod) => (
                    <button
                      key={mod.id}
                      onClick={() => setSelectedModuleFilter(mod.id)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        selectedModuleFilter === mod.id
                          ? 'bg-emerald-500 text-black font-black'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      {mod.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lesson Cards List */}
              <div className="space-y-2.5">
                {filteredLessons.map((lesson) => {
                  const isActive = lesson.id === activeLessonId;
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`w-full text-right p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'border-emerald-500/80 bg-emerald-950/20 text-white shadow-lg shadow-emerald-950/30'
                          : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          {lesson.badge}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-zinc-500">{lesson.readTime}</span>
                          {isDone ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Circle className="h-4 w-4 text-zinc-600" />
                          )}
                        </div>
                      </div>

                      <h4 className="text-xs sm:text-sm font-black text-white leading-snug line-clamp-2">
                        {lesson.title}
                      </h4>

                      <p className="mt-1 text-[11px] text-zinc-400 line-clamp-1">
                        {lesson.subtitle}
                      </p>
                    </button>
                  );
                })}

                {filteredLessons.length === 0 && (
                  <div className="text-center py-10 rounded-2xl border border-zinc-800 bg-zinc-900/30 text-xs text-zinc-500">
                    لم يتم العثور على دروس مطابقة لبحثك.
                  </div>
                )}
              </div>
            </div>

            {/* Active Lesson Reader View */}
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-10 space-y-8 backdrop-blur-sm">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-zinc-800">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-md bg-emerald-500/15 text-emerald-300 text-[11px] font-bold px-2.5 py-0.5">
                        {activeLesson.badge}
                      </span>
                      <span className="text-xs text-zinc-400">⏱️ {activeLesson.readTime}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      {activeLesson.title}
                    </h2>
                    <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {activeLesson.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleLessonCompletion(activeLesson.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 self-start sm:self-auto ${
                      completedLessons.includes(activeLesson.id)
                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                    }`}
                  >
                    {completedLessons.includes(activeLesson.id) ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>مكتمل ✓</span>
                      </>
                    ) : (
                      <>
                        <Circle className="h-4 w-4" />
                        <span>تعليم كمكتمل</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Learning Objective Box */}
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 text-xs sm:text-sm text-zinc-200">
                  <span className="text-emerald-400 font-bold block mb-1">الهدف التعليمي من هذا الدرس:</span>
                  <p className="leading-relaxed">{activeLesson.learningObjective}</p>
                </div>

                {/* Simplified Detailed Explanation */}
                <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-3">
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <span>الشرح المفصل والتطبيقي:</span>
                  </h3>
                  <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                    {activeLesson.simplifiedExplanation}
                  </div>
                </div>

                {/* Practical Example */}
                {activeLesson.practicalExample && (
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                    <span className="text-xs font-black text-cyan-400 flex items-center gap-1.5">
                      <Target className="h-4 w-4" />
                      <span>مثال عملي من أرض الواقع:</span>
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {activeLesson.practicalExample}
                    </p>
                  </div>
                )}

                {/* Numbered Execution Steps */}
                {activeLesson.numberedExecutionSteps && activeLesson.numberedExecutionSteps.length > 0 && (
                  <div>
                    <h3 className="text-sm font-black text-white flex items-center gap-2 mb-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>خطوات التنفيذ المرقمة:</span>
                    </h3>
                    <div className="space-y-2">
                      {activeLesson.numberedExecutionSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="text-emerald-400 font-black shrink-0">•</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Important Tips & Common Mistakes (2 columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                    <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" />
                      <span>نصائح ذهبية للنجاح:</span>
                    </span>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      {activeLesson.keyTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-red-950/15 border border-red-900/30 space-y-3">
                    <span className="text-xs font-black text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4" />
                      <span>أخطاء شائعة احذر الوقوع فيها:</span>
                    </span>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      {activeLesson.commonMistakes.map((mistake, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-red-400 font-bold">×</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Practical Exercise Box */}
                {activeLesson.practicalExercise && (
                  <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-zinc-950 to-zinc-950 p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-400 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        <span>التمرين التطبيقي: {activeLesson.practicalExercise.title}</span>
                      </span>

                      <button
                        onClick={() => handleCopy(
                          `${activeLesson.practicalExercise.title}\nالتعليمات: ${activeLesson.practicalExercise.instructions}\nالمخرج المطلوب: ${activeLesson.practicalExercise.expectedDeliverable}`,
                          `ex-${activeLesson.id}`,
                          'مهمة التمرين'
                        )}
                        className="text-[11px] font-bold text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === `ex-${activeLesson.id}` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedId === `ex-${activeLesson.id}` ? 'تم النسخ' : 'نسخ التمرين'}</span>
                      </button>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {activeLesson.practicalExercise.instructions}
                    </p>

                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-emerald-300">
                      <span className="font-bold text-zinc-400 block mb-0.5">المخرج المطلوب تسليمه:</span>
                      <span>{activeLesson.practicalExercise.expectedDeliverable}</span>
                    </div>
                  </div>
                )}

                {/* Lesson Summary */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
                  <span className="text-zinc-200 font-bold block mb-1">الخلاصة السريعة:</span>
                  <p>{activeLesson.summary}</p>
                </div>

                {/* Quiz Check */}
                {activeLesson.quiz && (
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-black text-white">
                      <HelpCircle className="h-4 w-4 text-emerald-400" />
                      <span>اختبار استيعاب الدرس (سؤال سريع):</span>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-zinc-200">
                      {activeLesson.quiz.question}
                    </p>

                    <div className="space-y-2">
                      {activeLesson.quiz.options.map((opt, optIdx) => {
                        const isSelected = quizAnswers[activeLesson.id] === optIdx;
                        const isSubmitted = quizSubmitted[activeLesson.id];
                        const isCorrect = optIdx === activeLesson.quiz?.correctIndex;

                        let btnStyle = 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700';
                        if (isSelected && !isSubmitted) {
                          btnStyle = 'border-emerald-500 bg-emerald-950/20 text-white';
                        }
                        if (isSubmitted) {
                          if (isCorrect) {
                            btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'border-red-500 bg-red-950/40 text-red-200';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizAnswer(activeLesson.id, optIdx)}
                            className={`w-full text-right p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && isCorrect && (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {!quizSubmitted[activeLesson.id] ? (
                      <button
                        onClick={() => handleSubmitQuiz(activeLesson.id)}
                        disabled={quizAnswers[activeLesson.id] === undefined}
                        className={`w-full py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                          quizAnswers[activeLesson.id] !== undefined
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20'
                            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        }`}
                      >
                        تحقق من الإجابة
                      </button>
                    ) : (
                      <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                        <span className="font-bold text-emerald-400 block mb-0.5">التفسير والشرح:</span>
                        <span>{activeLesson.quiz.explanation}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Navigation */}
                <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (activeLessonIndex > 0) {
                        setActiveLessonId(templateSellingCurriculum[activeLessonIndex - 1].id);
                      }
                    }}
                    disabled={activeLessonIndex === 0}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeLessonIndex === 0
                        ? 'opacity-30 cursor-not-allowed bg-zinc-900 text-zinc-600'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                    }`}
                  >
                    <ArrowBackIcon className="h-3.5 w-3.5" />
                    <span>الدرس السابق</span>
                  </button>

                  <button
                    onClick={() => {
                      if (activeLessonIndex < templateSellingCurriculum.length - 1) {
                        setActiveLessonId(templateSellingCurriculum[activeLessonIndex + 1].id);
                      }
                    }}
                    disabled={activeLessonIndex === templateSellingCurriculum.length - 1}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeLessonIndex === templateSellingCurriculum.length - 1
                        ? 'opacity-30 cursor-not-allowed bg-zinc-900 text-zinc-600'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-black font-black shadow-md shadow-emerald-500/20'
                    }`}
                  >
                    <span>الدرس التالي</span>
                    <ArrowNextIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IDEAS WORKSHOP */}
        {activeTab === 'ideas' && (
          <TemplateIdeaWorkshop onCopyText={onCopyText} />
        )}

        {/* TAB 3: PLATFORMS VIEW */}
        {activeTab === 'platforms' && (
          <TemplatePlatformsView onCopyText={onCopyText} />
        )}
      </div>
    </div>
  );
};
