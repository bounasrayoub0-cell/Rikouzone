import React, { useState } from 'react';
import { 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  BarChart3, 
  Target, 
  Settings, 
  Video, 
  MessageSquare, 
  TrendingUp, 
  Wrench, 
  Workflow, 
  HelpCircle, 
  Flame, 
  Layers, 
  BookOpen, 
  Search, 
  RotateCcw,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  socialMediaModules, 
  allSmmLessons, 
  realClientProjectsData, 
  freelancingPackages, 
  SmmLesson, 
  RealClientProject,
  DifficultyLevel 
} from '../../data/socialMediaData';
import { ContentCalendarTool } from './ContentCalendarTool';
import { SmmCalculatorsAndTools } from './SmmCalculatorsAndTools';

interface SocialMediaManagementViewProps {
  onNavigate?: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

export const SocialMediaManagementView: React.FC<SocialMediaManagementViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const { isRTL, t } = useLanguage();
  const ArrowBackIcon = isRTL ? ArrowRight : ArrowLeft;
  const ArrowNextIcon = isRTL ? ArrowLeft : ArrowRight;

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<'curriculum' | 'calendar' | 'projects' | 'freelancing' | 'tools'>(
    'curriculum'
  );

  // Curriculum Mode: 'cards' | 'reader'
  const [curriculumMode, setCurriculumMode] = useState<'cards' | 'reader'>('cards');

  // Curriculum Filters
  const [levelFilter, setLevelFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Lesson
  const [activeLessonId, setActiveLessonId] = useState<string>(allSmmLessons[0]?.id || 'smm-role-distinction');

  // Active Project (for Real Projects Tab)
  const [activeProjectId, setActiveProjectId] = useState<string>('proj-restaurant');

  // Completed Lessons Persistence
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('rz_smm_completed_lessons');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Quiz States
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Copied Feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleLocalCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => {
      const updated = { ...prev, [lessonId]: !prev[lessonId] };
      try {
        localStorage.setItem('rz_smm_completed_lessons', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save completion state:', e);
      }
      return updated;
    });
  };

  const resetAllProgress = () => {
    if (window.confirm('هل أنت متأكد من تصفير وإعادة تعيين تقدمك في الكورس؟')) {
      setCompletedLessons({});
      try {
        localStorage.removeItem('rz_smm_completed_lessons');
      } catch (e) {
        console.warn('Failed to reset:', e);
      }
    }
  };

  // Metrics
  const totalLessonsCount = allSmmLessons.length;
  const completedCount = allSmmLessons.filter(l => completedLessons[l.id]).length;
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0;

  // Active Lesson Object
  const currentLesson = allSmmLessons.find(l => l.id === activeLessonId) || allSmmLessons[0];
  const currentLessonIndex = allSmmLessons.findIndex(l => l.id === currentLesson?.id);

  // Navigation handlers
  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setActiveLessonId(allSmmLessons[currentLessonIndex - 1].id);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < allSmmLessons.length - 1) {
      setActiveLessonId(allSmmLessons[currentLessonIndex + 1].id);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  // Filtered Lessons
  const filteredModules = socialMediaModules
    .map(mod => {
      const filtered = mod.lessons.filter(lesson => {
        if (levelFilter !== 'all' && lesson.level !== levelFilter) return false;
        if (selectedModuleId !== 'all' && lesson.moduleId !== selectedModuleId) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = lesson.title.toLowerCase().includes(q);
          const matchSummary = lesson.summary.toLowerCase().includes(q);
          const matchText = lesson.explanation.some(e => e.toLowerCase().includes(q));
          if (!matchTitle && !matchSummary && !matchText) return false;
        }
        return true;
      });
      return { ...mod, lessons: filtered };
    })
    .filter(mod => mod.lessons.length > 0);

  // Active Project Object
  const currentProject = realClientProjectsData.find(p => p.id === activeProjectId) || realClientProjectsData[0];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate ? onNavigate('income') : null}
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
        >
          <ArrowBackIcon className="h-4 w-4" />
          <span>{t.nav.income}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400">
            كورس تطبيقي معتمد 2026
          </span>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-zinc-900/90 to-zinc-950 p-6 sm:p-10 overflow-hidden shadow-2xl">
        <div className="pointer-events-none absolute -top-24 right-0 -z-10 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs font-black text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Social Media Management Masterclass (13 وحدة تدريبية)</span>
            </div>

            <h1 className="mt-3 text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              كورس إدارة حسابات التواصل الاجتماعي الاحترافي
            </h1>

            <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
              دليلك العملي الشامل لتعلم إدارة حسابات العملاء من الصفر حتى الاحتراف: بناء الاستراتيجية، إعداد الحسابات، صناعة الريلز والكاروسيل، تقويم المحتوى، إدارة الأزمات، 5 مشاريع عملاء حقيقية، وتحقيق عقود اشتراك شهرية ($500 - $1,500/عميل).
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold text-zinc-300">
              <div className="flex items-center gap-1.5 rounded-lg bg-zinc-950/70 border border-zinc-800 px-3 py-1.5">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span>13 وحدة تدريبية متسلسلة</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-zinc-950/70 border border-zinc-800 px-3 py-1.5">
                <Briefcase className="h-4 w-4 text-blue-400" />
                <span>5 مشاريع عملاء حقيقية</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-zinc-950/70 border border-zinc-800 px-3 py-1.5">
                <Calendar className="h-4 w-4 text-purple-400" />
                <span>أداة تقويم محتوى تفاعلية</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-zinc-950/70 border border-zinc-800 px-3 py-1.5">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                <span>باقات وتسعير العمل الحر</span>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 shrink-0 w-full lg:w-72 shadow-xl">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-400 mb-2">
              <span>نسبة إنجاز الكورس:</span>
              <span className="text-amber-400">{progressPercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400 font-semibold">
              <span>تم إكمال {completedCount} من أصل {totalLessonsCount} درس</span>
              {completedCount > 0 && (
                <button
                  onClick={resetAllProgress}
                  className="flex items-center gap-1 text-zinc-500 hover:text-rose-400 transition-colors"
                  title="تصفير التقدم"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>تصفير</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800/80">
        {[
          { id: 'curriculum', label: 'مسار الدروس والوحدات (13)', icon: BookOpen },
          { id: 'calendar', label: 'تقويم المحتوى التفاعلي', icon: Calendar },
          { id: 'projects', label: 'مشاريع العملاء الحقيقية (5)', icon: Briefcase },
          { id: 'freelancing', label: 'العمل الحر والباقات والتسعير', icon: DollarSign },
          { id: 'tools', label: 'الحاسبات ومولد التقارير', icon: BarChart3 },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: CURRICULUM & LESSONS */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          {/* Controls Bar: Filters & View Mode */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute top-2.5 right-3.5 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في الدروس والمهام والخطافات..."
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-2 pr-10 pl-3 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Level Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'كل المستويات' },
                { id: 'beginner', label: 'مبتدئ' },
                { id: 'intermediate', label: 'متوسط' },
                { id: 'advanced', label: 'متقدم' }
              ].map(lvl => (
                <button
                  key={lvl.id}
                  onClick={() => setLevelFilter(lvl.id as any)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    levelFilter === lvl.id
                      ? 'bg-zinc-800 text-amber-400 border border-amber-500/30'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setCurriculumMode('cards')}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  curriculumMode === 'cards'
                    ? 'bg-amber-500 text-black'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                شبكة الدروس
              </button>
              <button
                onClick={() => setCurriculumMode('reader')}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  curriculumMode === 'reader'
                    ? 'bg-amber-500 text-black'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                قارئ الدروس المباشر
              </button>
            </div>
          </div>

          {/* READER MODE */}
          {curriculumMode === 'reader' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Lesson Drawer / Sidebar */}
              <div className="lg:col-span-1 rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-4 max-h-[750px] overflow-y-auto scrollbar-thin">
                <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider px-2">
                  فهرس الدروس الـ 13
                </h3>
                <div className="space-y-1">
                  {allSmmLessons.map((lesson, idx) => {
                    const isSelected = lesson.id === activeLessonId;
                    const isDone = completedLessons[lesson.id];
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLessonId(lesson.id)}
                        className={`w-full flex items-start gap-2.5 rounded-xl p-2.5 text-start transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/20 text-white border border-amber-500/40'
                            : 'hover:bg-zinc-800/60 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLessonComplete(lesson.id);
                          }}
                          className={`mt-0.5 shrink-0 rounded-full p-0.5 border transition-all ${
                            isDone 
                              ? 'bg-emerald-500 border-emerald-500 text-black' 
                              : 'border-zinc-600 text-transparent hover:border-amber-400'
                          }`}
                        >
                          <Check className="h-3 w-3" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-bold text-zinc-500">
                            درس {idx + 1} • {lesson.duration}
                          </div>
                          <div className={`text-xs font-bold line-clamp-1 ${isSelected ? 'text-amber-300' : ''}`}>
                            {lesson.title}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lesson Detail Container */}
              <div className="lg:col-span-3 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 space-y-6">
                
                {/* Lesson Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-400">
                        {currentLesson.duration}
                      </span>
                      <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                        currentLesson.level === 'beginner' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : currentLesson.level === 'intermediate'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {currentLesson.level === 'beginner' ? 'مبتدئ' : currentLesson.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                      </span>
                    </div>

                    <h2 className="mt-2 text-xl sm:text-2xl font-black text-white">
                      {currentLesson.title}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                      {currentLesson.summary}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleLessonComplete(currentLesson.id)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      completedLessons[currentLesson.id]
                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                        : 'bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{completedLessons[currentLesson.id] ? 'تم إكمال الدرس ✅' : 'تعليم كمكتمل'}</span>
                  </button>
                </div>

                {/* 1. 📖 الشرح التفصيلي */}
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>📖 الشرح النظري والاستراتيجي (Lesson Breakdown)</span>
                  </h3>
                  <div className="rounded-2xl bg-zinc-950/70 border border-zinc-800/80 p-5 space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {currentLesson.explanation.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* 2. 🧩 مثال عملي من واقع السوق */}
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-blue-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>🧩 مثال عملي من واقع إدارة العملاء (Case Study)</span>
                  </h3>
                  <div className="rounded-2xl bg-blue-950/20 border border-blue-500/30 p-5 space-y-2 text-xs sm:text-sm">
                    <h4 className="font-bold text-white text-sm">{currentLesson.practicalExample.title}</h4>
                    <p className="text-zinc-300"><strong className="text-blue-300">السيناريو:</strong> {currentLesson.practicalExample.scenario}</p>
                    <p className="text-zinc-300"><strong className="text-blue-300">الإجراء المتبع:</strong> {currentLesson.practicalExample.actionTaken}</p>
                    <p className="text-emerald-400 font-bold"><strong className="text-emerald-300">النتيجة:</strong> {currentLesson.practicalExample.result}</p>
                  </div>
                </div>

                {/* 3. 🛠️ خطوات التطبيق المباشر */}
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <Workflow className="h-4 w-4" />
                    <span>🛠️ خطوات التطبيق العملي الفوري (Action Steps)</span>
                  </h3>
                  <div className="rounded-2xl bg-zinc-950/70 border border-zinc-800/80 p-5 space-y-2.5">
                    {currentLesson.implementationSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                        <span className="shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                          {idx + 1}
                        </span>
                        <p className="pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. 🔥 Challenge التحدي العملي */}
                <div className="rounded-2xl border border-orange-500/40 bg-gradient-to-r from-orange-500/10 via-zinc-950 to-zinc-950 p-5 space-y-2">
                  <div className="flex items-center gap-2 text-orange-400 font-black text-xs uppercase tracking-wider">
                    <Flame className="h-4 w-4" />
                    <span>🔥 التحدي العملي لهذا الدرس (Hands-On Challenge)</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{currentLesson.challenge.title}</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">{currentLesson.challenge.task}</p>
                  <div className="text-xs text-amber-300 font-semibold bg-zinc-900/80 rounded-xl p-2.5 border border-zinc-800">
                    🎯 المطلوب تسليمه: {currentLesson.challenge.deliverable}
                  </div>
                </div>

                {/* 5. 📋 القالب الجاهز مع زر Copy */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                      <Copy className="h-4 w-4" />
                      <span>📋 القالب الاحترافي الجاهز (Copyable Template)</span>
                    </h3>
                    <button
                      onClick={() => handleLocalCopy(currentLesson.template.content, currentLesson.id + '-tpl', 'تم نسخ القالب بنجاح!')}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                        copiedId === currentLesson.id + '-tpl'
                          ? 'bg-emerald-500 text-black'
                          : 'bg-amber-500 text-black hover:bg-amber-400'
                      }`}
                    >
                      {copiedId === currentLesson.id + '-tpl' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedId === currentLesson.id + '-tpl' ? 'تم النسخ' : 'نسخ القالب'}</span>
                    </button>
                  </div>

                  <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4">
                    <div className="text-xs font-bold text-zinc-400 mb-2">{currentLesson.template.title}</div>
                    <pre className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed select-all">
                      {currentLesson.template.content}
                    </pre>
                  </div>
                </div>

                {/* 6. 📝 Quiz اختبار الفهم التفاعلي */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black text-purple-400 uppercase tracking-wider">
                    <HelpCircle className="h-4 w-4" />
                    <span>📝 اختبار استيعاب الدرس (Knowledge Check Quiz)</span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-relaxed">
                    {currentLesson.quiz.question}
                  </h4>

                  <div className="space-y-2">
                    {currentLesson.quiz.options.map((opt, oIdx) => {
                      const isSelected = quizAnswers[currentLesson.id] === oIdx;
                      const isSubmitted = quizSubmitted[currentLesson.id];
                      const isCorrect = oIdx === currentLesson.quiz.correctIndex;

                      return (
                        <button
                          key={oIdx}
                          disabled={isSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [currentLesson.id]: oIdx }))}
                          className={`w-full flex items-center justify-between rounded-xl p-3 text-start text-xs font-medium border transition-all cursor-pointer ${
                            isSubmitted
                              ? isCorrect
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                : isSelected
                                ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                              : isSelected
                              ? 'bg-amber-500/10 border-amber-500 text-white'
                              : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          <span>{opt}</span>
                          {isSubmitted && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {!quizSubmitted[currentLesson.id] ? (
                      <button
                        disabled={quizAnswers[currentLesson.id] === undefined}
                        onClick={() => setQuizSubmitted(prev => ({ ...prev, [currentLesson.id]: true }))}
                        className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-500 disabled:opacity-50 transition-all cursor-pointer"
                      >
                        تحقق من إجابتي
                      </button>
                    ) : (
                      <div className="text-xs text-zinc-300 bg-zinc-900 p-3 rounded-xl border border-zinc-800 w-full leading-relaxed">
                        <strong className="text-amber-400 block mb-1">تفسير الإجابة:</strong>
                        {currentLesson.quiz.explanation}
                      </div>
                    )}
                  </div>
                </div>

                {/* Lesson Navigation Buttons */}
                <div className="pt-6 border-t border-zinc-800 flex items-center justify-between gap-4">
                  <button
                    disabled={currentLessonIndex === 0}
                    onClick={handlePrevLesson}
                    className="flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2.5 text-xs font-bold text-zinc-200 hover:bg-zinc-700 disabled:opacity-40 transition-all cursor-pointer"
                  >
                    <ArrowBackIcon className="h-4 w-4" />
                    <span>الدرس السابق</span>
                  </button>

                  <div className="text-xs text-zinc-500 font-semibold">
                    {currentLessonIndex + 1} / {allSmmLessons.length}
                  </div>

                  <button
                    disabled={currentLessonIndex === allSmmLessons.length - 1}
                    onClick={handleNextLesson}
                    className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-black text-black hover:bg-amber-400 disabled:opacity-40 transition-all cursor-pointer"
                  >
                    <span>الدرس التالي</span>
                    <ArrowNextIcon className="h-4 w-4" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* CARDS MODE */}
          {curriculumMode === 'cards' && (
            <div className="space-y-8">
              {filteredModules.map((module) => (
                <div key={module.id} className="space-y-4">
                  {/* Module Header Bar */}
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black">
                        {module.number}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-white">
                          {module.arabicTitle}
                        </h3>
                        <p className="text-xs text-zinc-400">
                          {module.description}
                        </p>
                      </div>
                    </div>

                    <span className="hidden sm:inline-block text-xs font-bold text-zinc-500">
                      {module.lessons.length} درس
                    </span>
                  </div>

                  {/* Lessons Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {module.lessons.map((lesson) => {
                      const isDone = completedLessons[lesson.id];
                      return (
                        <div
                          key={lesson.id}
                          className="flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 hover:border-amber-500/40 transition-all shadow-md group"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-zinc-500">
                                درس {lesson.number} • {lesson.duration}
                              </span>

                              <button
                                onClick={() => toggleLessonComplete(lesson.id)}
                                className={`rounded-lg px-2 py-0.5 text-[10px] font-bold border transition-all ${
                                  isDone
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                    : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                                }`}
                              >
                                {isDone ? 'مكتمل ✅' : 'قيد التعلم'}
                              </button>
                            </div>

                            <h4 className="mt-2 text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                              {lesson.title}
                            </h4>

                            <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                              {lesson.summary}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-amber-400">
                              🔥 تحدي عملي + قالب جاهز
                            </span>

                            <button
                              onClick={() => {
                                setActiveLessonId(lesson.id);
                                setCurriculumMode('reader');
                                window.scrollTo({ top: 350, behavior: 'smooth' });
                              }}
                              className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-200 hover:bg-amber-500 hover:text-black transition-all cursor-pointer"
                            >
                              <span>افتح الدرس</span>
                              <ArrowNextIcon className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INTERACTIVE CONTENT CALENDAR TOOL */}
      {activeTab === 'calendar' && (
        <ContentCalendarTool onCopyText={onCopyText} />
      )}

      {/* TAB 3: REAL CLIENT PROJECTS (5 COMPREHENSIVE CASE STUDIES) */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-zinc-900 to-zinc-950 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              مشاريع تدريبية حقيقية ودراسات حالة (Real Client Simulations)
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              خمسة مشاريع متكاملة تغطي أهم قطاعات السوق: المطاعم، المتاجر الإلكترونية، العلامات الشخصية، الأنشطة المحلية، والشركات الخدمية. كل مشروع يحتوي على المسار الكامل: Brief → Audit → Strategy → Calendar → Content Ideas → Publishing Plan → Analytics → Monthly Report.
            </p>

            {/* Projects Selector Pills */}
            <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {realClientProjectsData.map(proj => (
                <button
                  key={proj.id}
                  onClick={() => setActiveProjectId(proj.id)}
                  className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    activeProjectId === proj.id
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {proj.clientName.split('(')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Project Full Breakdown */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-5">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{currentProject.industry}</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">{currentProject.clientName}</h3>
                <p className="text-xs text-zinc-400">{currentProject.nicheArabic}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-zinc-950 px-3.5 py-2 border border-zinc-800 text-end">
                  <div className="text-[10px] text-zinc-500 font-bold">قيمة العقد:</div>
                  <div className="text-xs font-black text-emerald-400">{currentProject.budget}</div>
                </div>
              </div>
            </div>

            {/* Step 1 & 2: Brief & Audit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-zinc-950 p-5 border border-zinc-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">1. ملخص استمارة العميل (Client Brief)</span>
                <p className="text-xs text-zinc-300 leading-relaxed">{currentProject.clientBrief.overview}</p>
                <div className="pt-2 text-xs text-zinc-400 space-y-1">
                  <strong className="text-zinc-200 block">أهداف العميل الأساسية:</strong>
                  {currentProject.clientBrief.goals.map((g, idx) => (
                    <div key={idx}>• {g}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-zinc-950 p-5 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">2. تدقيق الحساب الحالي (Account Audit)</span>
                  <span className="text-xs font-black text-amber-400 bg-zinc-900 px-2 py-0.5 rounded">تقييم: {currentProject.audit.score}</span>
                </div>
                <div className="text-xs text-zinc-300 space-y-1">
                  <strong className="text-zinc-200 block">المشاكل المرصودة:</strong>
                  {currentProject.audit.issuesFound.map((iss, idx) => (
                    <div key={idx}>⚠️ {iss}</div>
                  ))}
                </div>
                <div className="pt-2 text-xs text-emerald-300 space-y-1">
                  <strong className="text-emerald-400 block">إصلاحات سريعة فورية (Quick Wins):</strong>
                  {currentProject.audit.quickWins.map((qw, idx) => (
                    <div key={idx}>✅ {qw}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Strategy & Content Pillars */}
            <div className="rounded-2xl bg-zinc-950 p-5 border border-zinc-800 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">3. استراتيجية المحتوى وأعمدة النشر (Content Pillars)</span>
              <p className="text-xs text-zinc-300 font-bold">الهدف الاستراتيجي: {currentProject.strategy.coreObjective}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                {currentProject.strategy.contentPillars.map((p, idx) => (
                  <div key={idx} className="rounded-xl bg-zinc-900/80 p-3 border border-zinc-800">
                    <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                      <span>{p.pillar}</span>
                      <span className="text-amber-400">{p.percentage}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-snug">{p.focus}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4 & 5: Calendar Sample & Content Ideas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-zinc-950 p-5 border border-zinc-800 space-y-3">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">4. عينة من خطة تقويم المحتوى (Content Calendar)</span>
                {currentProject.contentCalendarSample.map((cal, idx) => (
                  <div key={idx} className="rounded-xl bg-zinc-900 p-3 border border-zinc-800/80 space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-amber-400">
                      <span>{cal.day} • {cal.platform}</span>
                      <span className="text-zinc-400">{cal.format}</span>
                    </div>
                    <div className="text-white font-semibold">"{cal.hook}"</div>
                    <div className="text-zinc-400 text-[11px]">{cal.caption}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-zinc-950 p-5 border border-zinc-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">5. أفكار وسكربتات قابلة للتنفيذ (Content Ideas)</span>
                {currentProject.contentIdeas.map((idea, idx) => (
                  <div key={idx} className="rounded-xl bg-zinc-900 p-3 border border-zinc-800/80 space-y-1 text-xs">
                    <div className="font-bold text-emerald-400">{idea.format}: {idea.title}</div>
                    <div className="text-zinc-300 font-semibold italic">الخطاف: "{idea.hook}"</div>
                    <div className="text-zinc-400 text-[11px]">{idea.scriptOrOutline}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 6 & 7: Publishing Plan & KPIs Summary */}
            <div className="rounded-2xl bg-zinc-950 p-5 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">6. خطة النشر وتقرير الأداء النهائي (Analytics & Final Report)</span>
                <button
                  onClick={() => handleLocalCopy(currentProject.clientReportSummary, currentProject.id + '-rep', 'تم نسخ ملخص تقرير المشروع!')}
                  className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1 text-xs font-bold text-zinc-300 hover:text-white"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>نسخ ملخص التقرير</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentProject.analyticsTargets.map((kpi, idx) => (
                  <div key={idx} className="rounded-xl bg-zinc-900 p-3 border border-zinc-800 text-xs">
                    <div className="text-zinc-400 font-semibold">{kpi.kpi}</div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-zinc-500">قبل: {kpi.current}</span>
                      <span className="text-emerald-400 font-bold">المحقق: {kpi.target}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/30 p-3.5 text-xs text-zinc-200 leading-relaxed">
                <strong className="text-emerald-300 block mb-1">ملخص نتيجة الشهر الأول للعميل:</strong>
                {currentProject.clientReportSummary}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: FREELANCING, PACKAGES & OUTREACH */}
      {activeTab === 'freelancing' && (
        <div className="space-y-8">
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-zinc-950 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              العمل الحر واستقطاب العملاء وعقود الاشتراكات الشهرية
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              كيف تبني بورتفوليو احترافياً بدون عملاء سابقين، قنوات الوصول لأصحاب المشاريع، رسائل التواصل المباشر (Cold Outreach)، ونماذج تسعير الباقات الشهرية المتكررة (Monthly Retainers).
            </p>
          </div>

          {/* Pricing Packages Grid */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-amber-400" />
              <span>الباقات الشهرية الثلاث الموصى بتقديمها للعملاء (Packages Structure)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {freelancingPackages.map(pkg => (
                <div
                  key={pkg.id}
                  className={`flex flex-col justify-between rounded-3xl p-6 border transition-all ${
                    pkg.highlight
                      ? 'border-amber-500 bg-gradient-to-b from-amber-500/10 via-zinc-900 to-zinc-950 shadow-xl shadow-amber-500/10 relative'
                      : 'border-zinc-800 bg-zinc-900/60'
                  }`}
                >
                  {pkg.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-0.5 text-[10px] font-black text-black uppercase tracking-wider">
                      الأكثر طلباً ومبيعات
                    </span>
                  )}

                  <div>
                    <h4 className="text-lg font-black text-white">{pkg.name}</h4>
                    <div className="mt-2 text-3xl font-black text-amber-400">
                      {pkg.price}
                      <span className="text-xs text-zinc-500 font-normal"> / {pkg.billing}</span>
                    </div>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                      {pkg.suitableFor}
                    </p>

                    <div className="mt-5 space-y-2.5 border-t border-zinc-800/80 pt-4">
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                          <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const text = `📌 تفاصيل ${pkg.name}:
السعر: ${pkg.price} شهرياً
الخدمات المتضمنة:
${pkg.features.map(f => `• ${f}`).join('\n')}`;
                      handleLocalCopy(text, pkg.id, 'تم نسخ تفاصيل الباقة بنجاح!');
                    }}
                    className={`mt-6 w-full rounded-xl py-2.5 text-xs font-black transition-all ${
                      pkg.highlight
                        ? 'bg-amber-500 text-black hover:bg-amber-400'
                        : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                    }`}
                  >
                    نسخ بنود الباقة للعميل
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Ready Outreach Scripts */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  <span>رسائل التواصل المباشر الجاهزة للاستخدام (Outreach Scripts)</span>
                </h3>
                <p className="text-xs text-zinc-400">رسائل مثبتة تعتمد على تقديم قيمة ملموسة مجانية أولاً لجلب مكالمات استشارية.</p>
              </div>

              <button
                onClick={() => {
                  const script = `مرحباً فريق [اسم النشاط]! 👋
أنا أتابع حسابكم المميز منذ فترة وأحييكم على جودة منتجاتكم الأخيرة.
أثناء تصفحي للحساب، لاحظت فرصة سريعة جداً يمكن أن تضاعف عدد الرسائل وحجوزات الزبائن لديكم بدون أي تكلفة إعلانية:
[اذكر نقطة واحدة محددة: مثلاً تحسين البايو بالكلمات المفتاحية والـ CTA في آخر الريلز].

أعددت لكم نموذجاً مصغراً لكيفية صياغة البايو وفكرة ريلز تفاعلية، سيسعدني جداً إرسالها لكم هنا إذا كنتم مهتمين بالاطلاع عليها مجاناً! 🌟`;
                  handleLocalCopy(script, 'outreach-script', 'تم نسخ رسالة التواصل!');
                }}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-all"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>نسخ الرسالة</span>
              </button>
            </div>

            <div className="rounded-2xl bg-zinc-950 p-4 border border-zinc-800">
              <pre className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed select-all">
{`✉️ رسالة التواصل المباشر عبر Instagram DM أو البريد الإلكتروني:

مرحباً فريق [اسم المتجر / المطعم]! 👋
أنا أتابع حسابكم المميز منذ فترة وأحييكم على جودة [أشيد بشيء حقيقي في عملهم].

أثناء تصفحي للحساب، لاحظت فرصة سريعة جداً يمكن أن تضاعف عدد الرسائل وحجوزات الزبائن لديكم بدون أي تكلفة إضافية:
[اذكر نقطة واحدة محددة: مثلاً تحسين الكلمات المفتاحية في البايو أو إضافة CTA لتوجيه الناس للواتساب].

أعددت لكم نموذجاً مصغراً لكيفية صياغة البايو وفكرة ريلز تفاعلية مناسبة لمنتجكم الجديد، سيسعدني جداً إرسالها لكم هنا إذا كنتم مهتمين بالاطلاع عليها مجاناً! 🌟

أتمنى لكم دوام التوفيق والنجاح،
[اسمك] - أخصائي إدارة وتطوير حسابات التواصل الاجتماعي.`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CALCULATORS & MONTHLY REPORT BUILDER */}
      {activeTab === 'tools' && (
        <SmmCalculatorsAndTools onCopyText={onCopyText} />
      )}

    </div>
  );
};
