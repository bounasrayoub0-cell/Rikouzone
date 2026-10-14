import React, { useState, useMemo, useEffect } from 'react';
import { 
  Mail, 
  BookOpen, 
  Calculator, 
  Target, 
  Layers, 
  Send, 
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
  Share2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Compass,
  Building2,
  AlertTriangle
} from 'lucide-react';
import { 
  newsletterLessons, 
  newsletterModuleCategories, 
  NewsletterLesson 
} from '../../data/newsletterData';
import { NewsletterProfitCalculator } from './NewsletterProfitCalculator';
import { NewsletterNicheValidator } from './NewsletterNicheValidator';
import { NewsletterOutlineBuilder } from './NewsletterOutlineBuilder';
import { NewsletterSponsorPitchSimulator } from './NewsletterSponsorPitchSimulator';
import { NewsletterTemplatesView } from './NewsletterTemplatesView';
import { NewsletterChecklistAndPlan } from './NewsletterChecklistAndPlan';

interface NewsletterViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const COMPLETED_NEWSLETTER_LESSONS_KEY = 'rikouzone_newsletter_completed_lessons';

export const NewsletterView: React.FC<NewsletterViewProps> = ({ onNavigate, onCopyText }) => {
  const [activeTab, setActiveTab] = useState<
    'modules' | 'calculator' | 'validator' | 'builder' | 'simulator' | 'templates' | 'checklist'
  >('modules');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(newsletterLessons[0].id);

  // Completed Lessons & Quiz State
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(COMPLETED_NEWSLETTER_LESSONS_KEY);
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
      localStorage.setItem(COMPLETED_NEWSLETTER_LESSONS_KEY, JSON.stringify(completedLessonIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessonIds]);

  // Active Lesson
  const activeLesson = useMemo(() => {
    return newsletterLessons.find((l) => l.id === selectedLessonId) || newsletterLessons[0];
  }, [selectedLessonId]);

  // Filtered Lessons
  const filteredLessons = useMemo(() => {
    return newsletterLessons.filter((lesson) => {
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

  const activeLessonIndex = newsletterLessons.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = activeLessonIndex > 0 ? newsletterLessons[activeLessonIndex - 1] : null;
  const nextLesson = activeLessonIndex < newsletterLessons.length - 1 ? newsletterLessons[activeLessonIndex + 1] : null;

  const progressPercentage = Math.round((completedLessonIds.length / newsletterLessons.length) * 100);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-24">
      {/* Top Header Hero */}
      <div className="relative border-b border-zinc-800 bg-gradient-to-b from-zinc-900/90 via-zinc-900/60 to-zinc-950 pt-8 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          {/* Breadcrumb / Back Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('income')}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 text-xs font-bold transition-all border border-zinc-800 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
              <span>العودة إلى مسارات الدخل (Income Paths)</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                ✨ مسار معتمد ومتكامل (27 درساً + 6 أدوات)
              </span>
            </div>
          </div>

          {/* Hero Banner Content */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/40">
                <Mail className="w-3.5 h-3.5" />
                <span>النشرات البريدية المدفوعة والرعايات الإعلانية (Newsletters)</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                دليل إطلاق وإدارة النشرة البريدية وبناء إمبراطورية إعلامية مصغرة
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                تعلم كيف تبني أصلك الرقمي الأكثر قيمة بملكية 100% للجمهور؛ من اختيار النيتش عالي الـ CPM، وإعداد منصة beehiiv وربط الدومين، إلى صياغة أعداد لا تقاوم وتحقيق آلاف الدولارات من الرعايات المباشرة والاشتراكات.
              </p>
            </div>

            {/* Quick Progress Summary Card */}
            <div className="shrink-0 p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3 min-w-[240px]">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-zinc-400">معدل الإنجاز العام:</span>
                <span className="text-emerald-400 font-mono font-black">{progressPercentage}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>{completedLessonIds.length} من أصل {newsletterLessons.length} دروس</span>
                <span className="text-amber-400 font-bold">+{completedLessonIds.length * 125} XP</span>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-t border-zinc-800/80 pt-4 scrollbar-none">
            {[
              { id: 'modules', label: 'المنهج والدروس (27 درساً)', icon: BookOpen },
              { id: 'calculator', label: 'حاسبة أرباح الرعايات والاشتراكات', icon: Calculator },
              { id: 'validator', label: 'محلل ومقيّم النيتش الربحي', icon: Target },
              { id: 'builder', label: 'محرر وهندسة هيكل العدد', icon: FileText },
              { id: 'simulator', label: 'محاكي إغلاق صفقات الرعاة', icon: Building2 },
              { id: 'templates', label: 'حقيبة القوالب والسكربتات', icon: Layers },
              { id: 'checklist', label: 'خطة الـ 14 يوماً وقائمة الفحص', icon: CalendarCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-black scale-102'
                      : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: CURRICULUM MODULES */}
        {activeTab === 'modules' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Lessons Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Category Filter */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-400">
                  <span>تصفية حسب الوحدات التعليمية:</span>
                  <span className="font-mono text-zinc-500">7 وحدات</span>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="all">جميع الوحدات التعليمية (27 درساً)</option>
                  {newsletterModuleCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.lessonCount} دروس)
                    </option>
                  ))}
                </select>

                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute right-3 top-2.5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="ابحث في عناوين الدروس والمفاهيم..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Lessons List */}
              <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1 scrollbar-thin">
                {filteredLessons.map((lesson) => {
                  const isSelected = lesson.id === activeLesson.id;
                  const isCompleted = completedLessonIds.includes(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`w-full text-right p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-950/20 text-white shadow-md'
                          : 'border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-850 text-zinc-300'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] font-mono ${
                            isSelected ? 'border-emerald-400 text-emerald-400' : 'border-zinc-600 text-zinc-500'
                          }`}>
                            {lesson.id.replace('nl-', '')}
                          </div>
                        )}
                      </div>

                      <div className="space-y-1 min-w-0">
                        <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${
                          isSelected ? 'text-emerald-400' : 'text-zinc-200'
                        }`}>
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.durationMinutes} دقيقة</span>
                          </span>
                          <span>•</span>
                          <span className="text-amber-400 font-bold">+{lesson.xpReward} XP</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Lesson Detail View (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-xl">
                {/* Lesson Header */}
                <div className="border-b border-zinc-800 pb-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black border border-emerald-500/30">
                      الوحدة: {newsletterModuleCategories.find((c) => c.id === activeLesson.moduleCategory)?.title}
                    </span>

                    <button
                      onClick={() => toggleLessonCompleted(activeLesson.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        completedLessonIds.includes(activeLesson.id)
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{completedLessonIds.includes(activeLesson.id) ? 'مكتمل بنجاح ✓' : 'تحديد كمكتمل'}</span>
                    </button>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {activeLesson.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
                    {activeLesson.subtitle}
                  </p>
                </div>

                {/* Overview */}
                <div className="space-y-2">
                  <h3 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>نظرة عامة وشرح المفهوم:</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950 p-4 sm:p-5 rounded-2xl border border-zinc-800">
                    {activeLesson.overview}
                  </p>
                </div>

                {/* Key Takeaways */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>النقاط الجوهرية والدروس المستفادة:</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeLesson.keyTakeaways.map((point, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                        <span className="text-emerald-400 font-black shrink-0">•</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Steps */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>الخطوات التنفيذية العملية:</span>
                  </h3>
                  <div className="space-y-3">
                    {activeLesson.actionSteps.map((step) => (
                      <div key={step.stepNumber} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black flex items-center justify-center font-mono">
                            {step.stepNumber}
                          </span>
                          <h4 className="text-xs font-bold text-white">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed pl-7">
                          {step.detail}
                        </p>
                        {step.proTip && (
                          <div className="text-[11px] text-emerald-300 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20 mt-2">
                            <strong>💡 نصيحة احترافية:</strong> {step.proTip}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Exercise */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                  <div className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>التمرين التطبيقي المطلوب:</span>
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {activeLesson.practicalExercise.instruction}
                  </p>
                  <div className="pt-2 border-t border-amber-500/20 text-[11px] text-amber-300 font-bold">
                    المخرج النهائي المطلوب تسليمه: {activeLesson.practicalExercise.deliverable}
                  </div>
                </div>

                {/* Pitfall Warning */}
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-400 block mb-0.5">⚠️ خطأ شائع ومكلف تجنبه:</strong>
                    {activeLesson.pitfallWarning}
                  </div>
                </div>

                {/* Interactive Quiz */}
                <div className="p-5 sm:p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4" />
                      <span>اختبار استيعاب الدرس:</span>
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">سؤال واحد سريع</span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                    {activeLesson.quiz.question}
                  </p>

                  <div className="space-y-2">
                    {activeLesson.quiz.options.map((option, idx) => {
                      const isSelected = quizAnswers[activeLesson.id] === idx;
                      const isSubmitted = quizSubmitted[activeLesson.id];
                      const isCorrect = idx === activeLesson.quiz.correctAnswerIndex;

                      let btnStyle = 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-850';
                      if (isSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-950/30 text-emerald-300 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'border-red-500 bg-red-950/30 text-red-300';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectQuizOption(activeLesson.id, idx)}
                          className={`w-full text-right p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{option}</span>
                          {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted[activeLesson.id] && (
                    <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                      <strong className="text-emerald-400 block mb-1">تفسير الإجابة الصحيحة:</strong>
                      {activeLesson.quiz.explanation}
                    </div>
                  )}
                </div>

                {/* Lesson Navigation Footer */}
                <div className="flex items-center justify-between border-t border-zinc-800 pt-5">
                  {prevLesson ? (
                    <button
                      onClick={() => setSelectedLessonId(prevLesson.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold transition-all border border-zinc-800 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>الدرس السابق</span>
                    </button>
                  ) : <div />}

                  {nextLesson ? (
                    <button
                      onClick={() => setSelectedLessonId(nextLesson.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-black text-xs font-black hover:bg-emerald-400 transition-all cursor-pointer shadow-md shadow-emerald-500/20 active:scale-95"
                    >
                      <span>الدرس التالي</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  ) : <div />}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CALCULATOR */}
        {activeTab === 'calculator' && <NewsletterProfitCalculator />}

        {/* TAB 3: NICHE VALIDATOR */}
        {activeTab === 'validator' && <NewsletterNicheValidator />}

        {/* TAB 4: OUTLINE BUILDER */}
        {activeTab === 'builder' && <NewsletterOutlineBuilder onCopyText={onCopyText} />}

        {/* TAB 5: SPONSOR PITCH SIMULATOR */}
        {activeTab === 'simulator' && <NewsletterSponsorPitchSimulator onCopyText={onCopyText} />}

        {/* TAB 6: TEMPLATES */}
        {activeTab === 'templates' && <NewsletterTemplatesView onCopyText={onCopyText} />}

        {/* TAB 7: CHECKLIST & PLAN */}
        {activeTab === 'checklist' && <NewsletterChecklistAndPlan />}
      </div>
    </div>
  );
};
