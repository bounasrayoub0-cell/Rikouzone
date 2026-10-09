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
  FolderCheck,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  digitalProductsCurriculum, 
  digitalProductsModulesList, 
  DigitalProductLesson 
} from '../../data/digitalProductsData';
import { DigitalProductIdeaValidator } from './DigitalProductIdeaValidator';
import { DigitalProductPlatformsComparisonView } from './DigitalProductPlatformsComparisonView';
import { DigitalProductCapstoneProject } from './DigitalProductCapstoneProject';

interface DigitalProductsViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const DIGITAL_COMPLETED_KEY = 'rikouzone_digital_products_completed_lessons';

export const DigitalProductsView: React.FC<DigitalProductsViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const { isRTL } = useLanguage();
  const ArrowBackIcon = isRTL ? ArrowRight : ArrowLeft;
  const ArrowNextIcon = isRTL ? ArrowLeft : ArrowRight;

  // Sub-tabs: 'lessons' | 'ideas' | 'platforms' | 'capstone'
  const [activeTab, setActiveTab] = useState<'lessons' | 'ideas' | 'platforms' | 'capstone'>('lessons');

  // Filter lessons
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active lesson
  const [activeLessonId, setActiveLessonId] = useState<string>(digitalProductsCurriculum[0].id);

  // Completed lessons
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(DIGITAL_COMPLETED_KEY);
      return stored ? JSON.parse(stored) : [digitalProductsCurriculum[0].id];
    } catch {
      return [digitalProductsCurriculum[0].id];
    }
  });

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Copy feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(DIGITAL_COMPLETED_KEY, JSON.stringify(completedLessons));
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

  const filteredLessons = digitalProductsCurriculum.filter((lesson) => {
    const matchesModule = selectedModuleFilter === 'all' || lesson.moduleCategory === selectedModuleFilter;
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.overview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  const activeLessonIndex = digitalProductsCurriculum.findIndex((l) => l.id === activeLessonId);
  const activeLesson: DigitalProductLesson = digitalProductsCurriculum[activeLessonIndex] || digitalProductsCurriculum[0];

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

  const progressPercentage = Math.round((completedLessons.length / digitalProductsCurriculum.length) * 100);

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
            <span className="text-emerald-400 font-bold">بيع المنتجات الرقمية (Digital Products & E-books)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-400 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>مسار تعليمي تطبيقي للمبتدئين 2026</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                بيع المنتجات الرقمية: من الفكرة إلى أول دولار أرباح
              </h1>
              <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
                تعلم كيف تكتشف مشكلات الناس الحقيقية، تصنع كتاباً إلكترونياً أو دليلاً تطبيقياً مركزاً، تصمم أغلفة ثلاثية الأبعاد جذابة، ترفعه على منصات مجانية مثل Payhip، وتسوّق له مجاناً عبر تيك توك وإنستغرام بأقل التكاليف.
              </p>

              {/* Metric Highlights */}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-xl bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 text-zinc-300 flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                  <span>هامش ربح يقارب 90% - 95%</span>
                </span>
                <span className="rounded-xl bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 text-zinc-300 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>رأس مال مبدئي $0 (أدوات مجانية)</span>
                </span>
                <span className="rounded-xl bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 text-zinc-300 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-emerald-400" />
                  <span>تسليم رقمي آلي وفوري للمشتري</span>
                </span>
              </div>
            </div>

            {/* Progress Card */}
            <div className="lg:col-span-4 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-400 mb-2">
                <span>تقدمك في مسار المنتجات الرقمية:</span>
                <span className="text-emerald-400">{progressPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
                <span>{completedLessons.length} من أصل {digitalProductsCurriculum.length} دروس مكتملة</span>
                <span className="text-emerald-400 font-bold">جاهز للإطلاق</span>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('capstone')}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  المشروع النهائي: أطلق أول منتج
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="mt-10 flex items-center gap-2 border-b border-zinc-800/80 pb-px overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'lessons'
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>الدروس المنهجية (8 وحدات)</span>
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
              <span>مقارنة المنصات وحاسبة الأرباح</span>
            </button>

            <button
              onClick={() => setActiveTab('capstone')}
              className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-black border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'capstone'
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Award className="h-4 w-4" />
              <span>المشروع العملي النهائي (Capstone)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: LESSONS CURRICULUM */}
        {activeTab === 'lessons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Modules & Lessons List */}
            <div className="lg:col-span-4 space-y-4">
              {/* Search & Filter */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3">
                <div className="relative">
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="ابحث في الدروس والمفاهيم..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 py-2 pr-9 pl-4 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {digitalProductsModulesList.map((mod) => (
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
                {/* Header with Title & Action */}
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

                {/* Lesson Overview */}
                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <span className="text-emerald-400 font-black block mb-1">خلاصة المحاضرة:</span>
                  <p>{activeLesson.overview}</p>
                </div>

                {/* Key Concepts (3-card grid) */}
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2 mb-4">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <span>المفاهيم الجوهرية والمصطلحات:</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeLesson.keyConcepts.map((concept, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-xs font-black text-emerald-400 block mb-1.5">
                            {concept.term}
                          </span>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            {concept.explanation}
                          </p>
                        </div>
                        {concept.realExample && (
                          <div className="mt-3 pt-2.5 border-t border-zinc-800/60 text-[11px] text-zinc-400">
                            <span className="font-bold text-zinc-500 block">مثال واقعي:</span>
                            <span>{concept.realExample}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Sections */}
                <div className="space-y-6">
                  {activeLesson.detailedSections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-4"
                    >
                      <h4 className="text-base font-black text-white">{sec.heading}</h4>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                        {sec.content}
                      </p>

                      {sec.bulletPoints && (
                        <ul className="space-y-2 pt-1 text-xs text-zinc-300">
                          {sec.bulletPoints.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                              <span className="text-emerald-400 font-bold mt-0.5">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {sec.proTip && (
                        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300 flex items-start gap-2.5">
                          <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                          <div>
                            <span className="font-bold block mb-0.5">نصيحة ذهبية:</span>
                            <span className="leading-relaxed">{sec.proTip}</span>
                          </div>
                        </div>
                      )}

                      {sec.practicalExercise && (
                        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-xs text-cyan-300 flex items-start gap-2.5">
                          <Target className="h-4 w-4 shrink-0 mt-0.5 text-cyan-400" />
                          <div>
                            <span className="font-bold block mb-0.5">تطبيق سريع:</span>
                            <span className="leading-relaxed">{sec.practicalExercise}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Practical Application Box */}
                <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-zinc-950 to-zinc-950 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-400 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span>المشروع التطبيقي للدرس: {activeLesson.practicalApplication.title}</span>
                    </span>

                    <button
                      onClick={() => handleCopy(
                        `${activeLesson.practicalApplication.title}\nالهدف: ${activeLesson.practicalApplication.objective}\nالخطوات:\n${activeLesson.practicalApplication.steps.join('\n')}\nالمخرج النهائي: ${activeLesson.practicalApplication.deliverable}`,
                        `prac-${activeLesson.id}`,
                        'مهام التطبيق العملي'
                      )}
                      className="text-[11px] font-bold text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === `prac-${activeLesson.id}` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === `prac-${activeLesson.id}` ? 'تم النسخ' : 'نسخ المهمة'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-zinc-300 font-medium">
                    الهدف: {activeLesson.practicalApplication.objective}
                  </p>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-zinc-400 block">خطوات التنفيذ:</span>
                    <div className="space-y-1.5 text-xs text-zinc-300">
                      {activeLesson.practicalApplication.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2">
                          <span className="h-4 w-4 rounded-full bg-zinc-800 text-[10px] font-bold flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-emerald-300">
                    <span className="font-bold text-zinc-400 block mb-0.5">المخرج المطلوب:</span>
                    <span>{activeLesson.practicalApplication.deliverable}</span>
                  </div>
                </div>

                {/* Common Mistakes to Avoid */}
                <div className="p-5 rounded-2xl bg-red-950/15 border border-red-900/30 space-y-2.5">
                  <span className="text-xs font-black text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    <span>أخطاء شائعة يقع فيها المبتدئون وتجنبها:</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {activeLesson.commonMistakesToAvoid.map((mistake, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-red-400">×</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interactive Quiz Check */}
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

                {/* Lesson Navigation Footer */}
                <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (activeLessonIndex > 0) {
                        setActiveLessonId(digitalProductsCurriculum[activeLessonIndex - 1].id);
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
                      if (activeLessonIndex < digitalProductsCurriculum.length - 1) {
                        setActiveLessonId(digitalProductsCurriculum[activeLessonIndex + 1].id);
                      }
                    }}
                    disabled={activeLessonIndex === digitalProductsCurriculum.length - 1}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeLessonIndex === digitalProductsCurriculum.length - 1
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

        {/* TAB 2: IDEAS & VALIDATION LAB */}
        {activeTab === 'ideas' && (
          <DigitalProductIdeaValidator onCopyText={onCopyText} />
        )}

        {/* TAB 3: PLATFORMS & PAYOUTS */}
        {activeTab === 'platforms' && (
          <DigitalProductPlatformsComparisonView onCopyText={onCopyText} />
        )}

        {/* TAB 4: CAPSTONE FINAL PROJECT */}
        {activeTab === 'capstone' && (
          <DigitalProductCapstoneProject onCopyText={onCopyText} />
        )}
      </div>
    </div>
  );
};
