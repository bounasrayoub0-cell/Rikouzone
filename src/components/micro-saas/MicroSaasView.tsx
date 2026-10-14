import React, { useState, useMemo, useEffect } from 'react';
import { 
  Code, 
  BookOpen, 
  Calculator, 
  Target, 
  Layers, 
  Rocket, 
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
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Compass,
  Building2,
  AlertTriangle
} from 'lucide-react';
import { 
  microSaasLessons, 
  microSaasModuleCategories, 
  MicroSaasLesson 
} from '../../data/microSaasData';
import { MicroSaasCalculator } from './MicroSaasCalculator';
import { MicroSaasValidator } from './MicroSaasValidator';
import { MicroSaasMVPBuilder } from './MicroSaasMVPBuilder';
import { MicroSaasLaunchSimulator } from './MicroSaasLaunchSimulator';
import { MicroSaasTemplatesView } from './MicroSaasTemplatesView';
import { MicroSaasChecklistAndPlan } from './MicroSaasChecklistAndPlan';

interface MicroSaasViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const COMPLETED_MICROSAAS_LESSONS_KEY = 'rikouzone_microsaas_completed_lessons';

export const MicroSaasView: React.FC<MicroSaasViewProps> = ({ onNavigate, onCopyText }) => {
  const [activeTab, setActiveTab] = useState<
    'modules' | 'calculator' | 'validator' | 'builder' | 'simulator' | 'templates' | 'checklist'
  >('modules');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(microSaasLessons[0].id);

  // Completed Lessons & Quiz State
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(COMPLETED_MICROSAAS_LESSONS_KEY);
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
      localStorage.setItem(COMPLETED_MICROSAAS_LESSONS_KEY, JSON.stringify(completedLessonIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessonIds]);

  // Active Lesson
  const activeLesson = useMemo(() => {
    return microSaasLessons.find((l) => l.id === selectedLessonId) || microSaasLessons[0];
  }, [selectedLessonId]);

  // Filtered Lessons
  const filteredLessons = useMemo(() => {
    return microSaasLessons.filter((lesson) => {
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

  const activeLessonIndex = microSaasLessons.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = activeLessonIndex > 0 ? microSaasLessons[activeLessonIndex - 1] : null;
  const nextLesson = activeLessonIndex < microSaasLessons.length - 1 ? microSaasLessons[activeLessonIndex + 1] : null;

  const progressPercentage = Math.round((completedLessonIds.length / microSaasLessons.length) * 100);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-24">
      {/* Top Header Hero */}
      <div className="relative border-b border-zinc-800 bg-gradient-to-b from-zinc-900/90 via-zinc-900/60 to-zinc-950 pt-8 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          
          {/* Back button & Breadcrumb */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('income')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>العودة لجميع مجالات الدخل</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
              <span className="text-cyan-400 font-bold">RikouZone Track:</span>
              <span>Micro-SaaS & AI Wrappers</span>
            </div>
          </div>

          {/* Main Title Banner */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
                <Code className="h-3.5 w-3.5" />
                <span>المسار التعليمي والعملي المتكامل</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                تطوير البرمجيات الصغيرة كخدمة (Micro-SaaS)
              </h1>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                دليلك العملي والبرمجي لتحويل ألم حقيقي تعاني منه الشركات إلى أداة برمجية رابحة تدار بفرد واحد، وإطلاقها، وتحقيق إيرادات اشتراكات شهرية متكررة (MRR) بدون رأس مال استثماري.
              </p>
            </div>

            {/* Progress Badge Box */}
            <div className="w-full lg:w-72 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4.5 space-y-3 shrink-0">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-400">تقدمك في المسار:</span>
                <span className="text-cyan-400 font-mono font-bold">
                  {completedLessonIds.length} / {microSaasLessons.length} درس ({progressPercentage}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                <span>15 درساً تفاعلياً</span>
                <span className="text-emerald-400 font-mono font-bold">+2,000 XP إجمالي</span>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none border-t border-zinc-800/80">
            <button
              onClick={() => setActiveTab('modules')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'modules'
                  ? 'bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>الدروس التعليمية الـ 15</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span>حاسبة الـ MRR والتخارج</span>
            </button>

            <button
              onClick={() => setActiveTab('validator')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'validator'
                  ? 'bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Target className="h-4 w-4" />
              <span>مصفوفة تقييم الفكرة</span>
            </button>

            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'builder'
                  ? 'bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>مهندس بنية الـ MVP والستاك</span>
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Rocket className="h-4 w-4" />
              <span>محاكي إطلاق Product Hunt</span>
            </button>

            <button
              onClick={() => setActiveTab('templates')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'templates'
                  ? 'bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>مكتبة القوالب والنصوص</span>
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'checklist'
                  ? 'bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <CalendarCheck className="h-4 w-4" />
              <span>خطة الـ 30 يوماً</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Views */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'calculator' && <MicroSaasCalculator />}
        {activeTab === 'validator' && <MicroSaasValidator />}
        {activeTab === 'builder' && <MicroSaasMVPBuilder onCopyText={onCopyText} />}
        {activeTab === 'simulator' && <MicroSaasLaunchSimulator />}
        {activeTab === 'templates' && <MicroSaasTemplatesView onCopyText={onCopyText} />}
        {activeTab === 'checklist' && <MicroSaasChecklistAndPlan />}

        {activeTab === 'modules' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Lessons List (Left / Span 4) */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Category selector pills */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 block px-1">تصنيف الوحدات التعليمية:</label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-zinc-100 text-zinc-950'
                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    الكل (15)
                  </button>
                  {microSaasModuleCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer truncate max-w-[170px] ${
                        selectedCategory === cat.id
                          ? 'bg-cyan-500 text-zinc-950'
                          : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      {cat.title.split(' ')[0]} {cat.title.split(' ')[1]} ({cat.lessonCount})
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="ابحث في الدروس والمفاهيم..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Lessons List Scroll */}
              <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
                {filteredLessons.map((lesson) => {
                  const isSelected = lesson.id === activeLesson.id;
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-right ${
                        isSelected
                          ? 'border-cyan-500/60 bg-cyan-500/10 text-white shadow-md shadow-cyan-500/5'
                          : 'border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonCompleted(lesson.id);
                        }}
                        className="mt-0.5 shrink-0"
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-zinc-600 hover:border-cyan-400" />
                        )}
                      </button>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="text-xs font-bold leading-snug line-clamp-2">
                          {lesson.title}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                          <span className="flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5" />
                            <span>{lesson.durationMinutes} دقيقة</span>
                          </span>
                          <span className="text-emerald-400">+{lesson.xpReward} XP</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lesson Reader & Quiz Area (Right / Span 8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Active Lesson Header Card */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono">
                      {activeLesson.id.toUpperCase()}
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{activeLesson.durationMinutes} دقيقة قراءة وتطبيق</span>
                    </span>
                    <span className="text-xs text-emerald-400 font-bold font-mono">
                      +{activeLesson.xpReward} XP
                    </span>
                  </div>

                  <button
                    onClick={() => toggleLessonCompleted(activeLesson.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      completedLessonIds.includes(activeLesson.id)
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>
                      {completedLessonIds.includes(activeLesson.id) ? 'تم إكمال الدرس!' : 'تحديد كمكتمل'}
                    </span>
                  </button>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                    {activeLesson.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-cyan-400/90 leading-relaxed font-medium">
                    {activeLesson.subtitle}
                  </p>
                </div>

                {/* Lesson Overview */}
                <div className="pt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
                  {activeLesson.overview}
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span>النقاط الجوهرية المستفادة من هذا الدرس</span>
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {activeLesson.keyTakeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed"
                    >
                      <div className="w-5 h-5 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 font-bold font-mono text-[11px] mt-0.5">
                        {idx + 1}
                      </div>
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Steps */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="h-4 w-4 text-emerald-400" />
                  <span>خطة العمل التطبيقية خطوة بخطوة</span>
                </h3>
                <div className="space-y-3.5">
                  {activeLesson.actionSteps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
                          {step.stepNumber}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{step.title}</h4>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed pr-8">
                        {step.detail}
                      </p>
                      {step.proTip && (
                        <div className="mr-8 mt-2 p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-2">
                          <Sparkles className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5" />
                          <span><strong>نصيحة ذهبية:</strong> {step.proTip}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Exercise & Pitfall Warning */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Exercise */}
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-bold">
                    <Code className="h-4 w-4" />
                    <span>تمرين الدرس التطبيقي</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {activeLesson.practicalExercise.instruction}
                  </p>
                  <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                    <strong className="text-zinc-200">المخرج المطلوب:</strong> {activeLesson.practicalExercise.deliverable}
                  </div>
                </div>

                {/* Pitfall */}
                <div className="bg-zinc-900/60 border border-rose-500/20 rounded-2xl p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                    <AlertTriangle className="h-4 w-4" />
                    <span>تحذير وفخ شائع يجب تجنبه</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {activeLesson.pitfallWarning}
                  </p>
                </div>
              </div>

              {/* Interactive Quiz with XP */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                    <HelpCircle className="h-4 w-4" />
                    <span>اختبار التحقق السريع من الدرس</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold">
                    +{activeLesson.xpReward} XP عند الإجابة الصحيحة
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                  {activeLesson.quiz.question}
                </div>

                <div className="space-y-2">
                  {activeLesson.quiz.options.map((opt, oIdx) => {
                    const isSelected = quizAnswers[activeLesson.id] === oIdx;
                    const isSubmitted = quizSubmitted[activeLesson.id];
                    const isCorrect = activeLesson.quiz.correctAnswerIndex === oIdx;

                    let optionStyle = 'border-zinc-800/80 bg-zinc-950/70 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-300';
                    if (isSubmitted) {
                      if (isCorrect) {
                        optionStyle = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-medium';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'border-rose-500/50 bg-rose-500/10 text-rose-300';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-cyan-500 bg-cyan-500/10 text-white';
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuizOption(activeLesson.id, oIdx)}
                        className={`w-full text-right p-3.5 rounded-xl border text-xs transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                      >
                        <div className="w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono">
                          {String.fromCharCode(65 + oIdx)}
                        </div>
                        <span className="flex-1 leading-relaxed">{opt}</span>
                        {isSubmitted && isCorrect && <Check className="h-4 w-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted[activeLesson.id] && (
                  <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 text-xs text-zinc-300 space-y-1.5 animate-fadeIn">
                    <div className="flex items-center gap-2 font-bold text-emerald-400">
                      <Sparkles className="h-4 w-4" />
                      <span>الشرح التوضيحي:</span>
                    </div>
                    <p className="leading-relaxed opacity-90">
                      {activeLesson.quiz.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Next & Previous Navigation Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                {prevLesson ? (
                  <button
                    onClick={() => setSelectedLessonId(prevLesson.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-xs text-zinc-300 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>الدرس السابق</span>
                  </button>
                ) : <div />}

                {nextLesson && (
                  <button
                    onClick={() => setSelectedLessonId(nextLesson.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-cyan-500/15"
                  >
                    <span>الدرس التالي</span>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
