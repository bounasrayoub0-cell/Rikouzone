import React, { useState } from 'react';
import { 
  Code, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Terminal, 
  UploadCloud, 
  Layers, 
  Briefcase, 
  Award, 
  Flame, 
  Search, 
  RefreshCw,
  Clock,
  HelpCircle,
  Laptop,
  BookOpen,
  LayoutGrid,
  FileText
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  webDevelopmentModules, 
  realProjectsList, 
  freelanceServicesList, 
  clientOutreachEmail
} from '../../data/webDevelopmentData';

interface WebDevelopmentViewProps {
  onNavigate?: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

export const WebDevelopmentView: React.FC<WebDevelopmentViewProps> = ({ onNavigate, onCopyText }) => {
  const { isRTL } = useLanguage();
  const ArrowBackIcon = isRTL ? ArrowRight : ArrowLeft;
  const ArrowNextIcon = isRTL ? ArrowLeft : ArrowRight;

  // Active Main Navigation: 'curriculum' | 'projects' | 'freelancing'
  const [activeMainTab, setActiveMainTab] = useState<'curriculum' | 'projects' | 'freelancing'>('curriculum');

  // Curriculum View Mode: 'cards' (all lesson cards) | 'reader' (active lesson details)
  const [curriculumViewMode, setCurriculumViewMode] = useState<'cards' | 'reader'>('cards');

  // Filter by level in curriculum
  const [levelFilter, setLevelFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Selected Lesson (default to first lesson)
  const allLessons = webDevelopmentModules.flatMap(m => m.lessons);
  const [activeLessonId, setActiveLessonId] = useState<string>(allLessons[0]?.id || 'intro-how-web-works');

  // Interactive Checklist: Completed Lessons (persisted in localStorage)
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('rz_webdev_completed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Interactive Quiz States: user selected option & whether verified
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Active selected real project
  const [activeProjectId, setActiveProjectId] = useState<string>('proj-1');

  // Copied item feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleLocalCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  // Toggle lesson completed
  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessons(prev => {
      const updated = { ...prev, [lessonId]: !prev[lessonId] };
      try {
        localStorage.setItem('rz_webdev_completed', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save completion state:', e);
      }
      return updated;
    });
  };

  // Reset Progress
  const resetProgress = () => {
    setCompletedLessons({});
    try {
      localStorage.removeItem('rz_webdev_completed');
    } catch (e) {
      console.warn('Failed to reset progress:', e);
    }
  };

  // Progress metrics
  const completedCount = allLessons.filter(l => completedLessons[l.id]).length;
  const progressPercentage = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;

  // Current selected lesson object
  const activeLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0];
  const activeLessonIndex = allLessons.findIndex(l => l.id === activeLessonId);
  const prevLesson = activeLessonIndex > 0 ? allLessons[activeLessonIndex - 1] : null;
  const nextLesson = activeLessonIndex < allLessons.length - 1 ? allLessons[activeLessonIndex + 1] : null;

  // Active module helper
  const getModuleForLesson = (moduleId: string) => {
    return webDevelopmentModules.find(m => m.id === moduleId);
  };
  const activeLessonModule = activeLesson ? getModuleForLesson(activeLesson.moduleId) : null;

  // Filtered lessons for cards / sidebar
  const filteredLessons = allLessons.filter(l => {
    const matchLevel = levelFilter === 'all' || l.level === levelFilter;
    const matchModule = selectedModuleFilter === 'all' || l.moduleId === selectedModuleFilter;
    const matchSearch = !searchQuery.trim() || 
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLevel && matchModule && matchSearch;
  });

  // Current selected project
  const activeProject = realProjectsList.find(p => p.id === activeProjectId) || realProjectsList[0];

  // Helper to open a specific lesson in reader mode
  const handleOpenLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurriculumViewMode('reader');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-52 sm:pb-44 lg:pb-36 selection:bg-amber-500 selection:text-black overflow-x-hidden">
      {/* 1. Header & Breadcrumb */}
      <div className="relative border-b border-zinc-800/80 bg-zinc-950/90 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-400">
            <button 
              onClick={() => onNavigate && onNavigate('income')}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowBackIcon className="h-4 w-4" />
              <span>مسارات الدخل</span>
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-amber-400 font-bold">تطوير المواقع وصفحات الهبوط (Web Development)</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
              <span>الإنجاز الإجمالي:</span>
              <span className="font-bold text-amber-400">{progressPercentage}%</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-black text-amber-400">
              <Award className="h-3.5 w-3.5" />
              <span>مسار المطور الشامل 2026</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="relative overflow-hidden border-b border-zinc-800/80 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 pt-8 sm:pt-10 pb-10 sm:pb-12">
        <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-black text-amber-300 mb-4 shadow-sm shadow-amber-500/10">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>مسار تدريبي متدرج: من الصفر وحتى إطلاق مواقع حقيقية للعملاء</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              تطوير المواقع وصفحات الهبوط{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                (Web & Landing Page Development)
              </span>
            </h1>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-2xl">
              تعلّم لغات وتقنيات الويب الحديثة (HTML5, CSS3, JavaScript)، التجاوب مع شاشات الهواتف، بناء صفحات هبوط عالية المبيعات، استخدام Git & GitHub، النشر على Vercel، وتقديم خدماتك لعملاء حقيقيين بمقابل $300 إلى $2,500 للمشروع.
            </p>

            {/* Quick KPI stats */}
            <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 sm:p-3.5 backdrop-blur-sm">
                <div className="text-lg sm:text-2xl font-black text-amber-400">10 وحدات</div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-zinc-400 mt-0.5">منهج تطبيقي متدرج</div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 sm:p-3.5 backdrop-blur-sm">
                <div className="text-lg sm:text-2xl font-black text-orange-400">7 مشاريع</div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-zinc-400 mt-0.5">مشاريع حقيقية للبورتفوليو</div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 sm:p-3.5 backdrop-blur-sm">
                <div className="text-lg sm:text-2xl font-black text-amber-300">100% عملي</div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-zinc-400 mt-0.5">أكواد وتحديات قابلة للنسخ</div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 sm:p-3.5 backdrop-blur-sm">
                <div className="text-lg sm:text-2xl font-black text-emerald-400">$600 - $6,000</div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-zinc-400 mt-0.5">عائد الفريلانس الشهري</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Global Progress Bar & Top Navigation Tabs - Sticky directly below header at top-16 */}
      <div className="sticky top-16 z-30 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-lg shadow-black/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2.5 sm:py-3">
            {/* Main Tabs - Scrollable on mobile without wrapping */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar">
              <button
                onClick={() => setActiveMainTab('curriculum')}
                className={`shrink-0 whitespace-nowrap flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeMainTab === 'curriculum'
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/25 font-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Code className="h-4 w-4" />
                <span>الدروس والمنهج (10 وحدات)</span>
              </button>

              <button
                onClick={() => setActiveMainTab('projects')}
                className={`shrink-0 whitespace-nowrap flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeMainTab === 'projects'
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/25 font-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>المشاريع (7 مشاريع)</span>
              </button>

              <button
                onClick={() => setActiveMainTab('freelancing')}
                className={`shrink-0 whitespace-nowrap flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeMainTab === 'freelancing'
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/25 font-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Briefcase className="h-4 w-4" />
                <span>العمل الحر (Freelancing)</span>
              </button>
            </div>

            {/* Overall Progress Tracker */}
            <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60">
              <span className="text-[11px] text-zinc-400 sm:hidden">نسبة الإنجاز:</span>
              <div className="flex items-center gap-2.5">
                <div className="w-28 sm:w-44 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-amber-400 font-sans min-w-[32px]">
                  {progressPercentage}%
                </span>
                <button
                  onClick={resetProgress}
                  title="إعادة ضبط تقدم الدروس"
                  className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Body Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 sm:pt-8">

        {/* ============================================================== */}
        {/* VIEW 1: CURRICULUM & INTERACTIVE LESSONS */}
        {/* ============================================================== */}
        {activeMainTab === 'curriculum' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* View Mode Toggle & Filter Bar */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-5 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* View Switcher: Cards View vs Lesson Reader */}
                <div className="flex items-center gap-2 bg-zinc-950 p-1 rounded-2xl border border-zinc-800 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setCurriculumViewMode('cards')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      curriculumViewMode === 'cards'
                        ? 'bg-amber-500 text-black shadow font-black'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                    <span>بطاقات الدروس ({filteredLessons.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurriculumViewMode('reader')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      curriculumViewMode === 'reader'
                        ? 'bg-amber-500 text-black shadow font-black'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>قارئ الدرس: {activeLesson?.number}</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search className="absolute right-3 top-2.5 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن درس أو وسم أو مفهوم..."
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-2 pr-9 pl-3 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Filters: Level + Module Selector */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-zinc-800/70">
                {/* Level filter tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none no-scrollbar">
                  <span className="text-zinc-500 text-xs ml-1 shrink-0">المستوى:</span>
                  {[
                    { id: 'all', label: 'الكل' },
                    { id: 'beginner', label: 'مبتدئ' },
                    { id: 'intermediate', label: 'متوسط' },
                    { id: 'advanced', label: 'متقدم' }
                  ].map(lvl => (
                    <button
                      key={lvl.id}
                      onClick={() => setLevelFilter(lvl.id as any)}
                      className={`shrink-0 rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                        levelFilter === lvl.id
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'text-zinc-400 hover:text-white bg-zinc-950/60 border border-zinc-800/60'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>

                {/* Module selector dropdown */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-500 shrink-0">الوحدة:</span>
                  <select
                    value={selectedModuleFilter}
                    onChange={(e) => setSelectedModuleFilter(e.target.value)}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300 focus:border-amber-500 focus:outline-none cursor-pointer"
                  >
                    <option value="all">جميع الوحدات (10 وحدات)</option>
                    {webDevelopmentModules.map(mod => (
                      <option key={mod.id} value={mod.id}>
                        {mod.number}. {mod.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* SUB-VIEW A: ALL LESSON CARDS (Spacious, Independent Cards) */}
            {/* ========================================================= */}
            {curriculumViewMode === 'cards' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                  <span>تم العثور على <strong className="text-amber-400">{filteredLessons.length}</strong> درس</span>
                  <span className="text-emerald-400 font-bold">{completedCount} درس تم إكماله ✓</span>
                </div>

                {/* Lessons Grid: Fully Responsive, No Fixed Heights, Independent Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredLessons.map((lesson) => {
                    const isDone = !!completedLessons[lesson.id];
                    const isActive = lesson.id === activeLessonId;
                    const mod = getModuleForLesson(lesson.moduleId);

                    return (
                      <div
                        key={lesson.id}
                        className={`rounded-2xl border transition-all flex flex-col justify-between p-4 sm:p-5 h-auto min-h-0 relative ${
                          isActive
                            ? 'border-amber-500/80 bg-zinc-900/90 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                            : isDone
                            ? 'border-emerald-500/30 bg-zinc-900/50 hover:border-emerald-500/50'
                            : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900/80'
                        }`}
                      >
                        {/* Top Meta: Badges & Checkbox */}
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2.5">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {mod && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                                  {mod.title.split('—')[0].trim()}
                                </span>
                              )}
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${
                                lesson.level === 'beginner' 
                                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                                  : lesson.level === 'intermediate'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                  : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                              }`}>
                                {lesson.level === 'beginner' ? 'مبتدئ' : lesson.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                              </span>
                            </div>

                            {/* Checkbox Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLessonCompletion(lesson.id);
                              }}
                              className={`shrink-0 h-6 w-6 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                                isDone 
                                  ? 'bg-emerald-500 border-emerald-400 text-black' 
                                  : 'border-zinc-700 hover:border-amber-400 bg-zinc-950 text-zinc-500'
                              }`}
                              title={isDone ? 'تحديد كغير مكتمل' : 'تحديد كمكتمل'}
                            >
                              {isDone ? <Check className="h-4 w-4 stroke-[3]" /> : <span className="text-[10px] text-zinc-600">✓</span>}
                            </button>
                          </div>

                          {/* Lesson Title (Auto-adapting height, No Overlap, No Truncate) */}
                          <h3 className="text-sm sm:text-base font-black text-white leading-relaxed break-words">
                            <span className="text-amber-400 font-mono ml-1.5">{lesson.number}.</span>
                            {lesson.title}
                          </h3>

                          {/* Lesson Summary (Auto-adapting, wraps naturally) */}
                          <p className="mt-2 text-xs text-zinc-300 leading-relaxed break-words font-medium">
                            {lesson.summary}
                          </p>
                        </div>

                        {/* Bottom Actions: Duration & Open Lesson Button */}
                        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-zinc-400 flex items-center gap-1 font-mono">
                            <Clock className="h-3.5 w-3.5 text-zinc-500" />
                            <span>{lesson.duration}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => handleOpenLesson(lesson.id)}
                            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                              isActive
                                ? 'bg-amber-500 text-black font-black hover:bg-amber-400'
                                : 'bg-zinc-800 text-zinc-200 hover:bg-amber-500 hover:text-black'
                            }`}
                          >
                            <span>فتح الدرس</span>
                            <ArrowNextIcon className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredLessons.length === 0 && (
                  <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 text-center space-y-3">
                    <Laptop className="h-8 w-8 text-zinc-600 mx-auto" />
                    <p className="text-sm font-bold text-zinc-300">لا توجد دروس مطابقة لبحثك الحالي.</p>
                    <button
                      onClick={() => {
                        setLevelFilter('all');
                        setSelectedModuleFilter('all');
                        setSearchQuery('');
                      }}
                      className="text-xs text-amber-400 hover:underline font-bold"
                    >
                      إعادة ضبط الفلاتر
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* SUB-VIEW B: DETAILED LESSON READER (Structured, Practical) */}
            {/* ========================================================= */}
            {curriculumViewMode === 'reader' && activeLesson && (
              <div className="space-y-6">
                {/* Back to cards bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/60 p-3 sm:p-4 rounded-2xl border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => {
                      setCurriculumViewMode('cards');
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
                  >
                    <ArrowBackIcon className="h-4 w-4" />
                    <span>العودة لكافة كروت الدروس ({allLessons.length} درس)</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span>الدرس <strong className="text-white">{activeLessonIndex + 1}</strong> من <strong className="text-white">{allLessons.length}</strong></span>
                  </div>
                </div>

                {/* Main Lesson Container */}
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                  {/* Lesson Header */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {activeLessonModule && (
                          <span className="rounded-full bg-zinc-800 border border-zinc-700 px-3 py-1 text-xs font-bold text-zinc-300">
                            {activeLessonModule.title}
                          </span>
                        )}
                        <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-black text-amber-400">
                          الدرس {activeLesson.number}
                        </span>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                          activeLesson.level === 'beginner'
                            ? 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                            : activeLesson.level === 'intermediate'
                            ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                            : 'border-purple-500/30 text-purple-400 bg-purple-500/10'
                        }`}>
                          المستوى: {activeLesson.level === 'beginner' ? 'مبتدئ' : activeLesson.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                          <Clock className="h-3.5 w-3.5 text-zinc-500" />
                          <span>{activeLesson.duration}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleLessonCompletion(activeLesson.id)}
                          className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                            completedLessons[activeLesson.id]
                              ? 'bg-emerald-500 text-black font-black'
                              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>{completedLessons[activeLesson.id] ? 'تم إكمال الدرس ✅' : 'تحديد كمكتمل'}</span>
                        </button>
                      </div>
                    </div>

                    <h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-white leading-snug break-words">
                      {activeLesson.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium break-words">
                      {activeLesson.summary}
                    </p>
                  </div>

                  {/* 1. 📖 شرح الدرس (Explanation) */}
                  <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4 sm:p-6 space-y-3">
                    <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2 text-amber-400">
                      <BookOpen className="h-4 w-4 shrink-0" />
                      <span>📖 شرح الدرس والمفاهيم الأساسية</span>
                    </h3>
                    <div className="space-y-3 pt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed break-words">
                      {activeLesson.explanation.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. 💻 Code Example & 📋 Copy Code */}
                  <div className="space-y-2.5 w-full max-w-full overflow-hidden">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-amber-400 shrink-0" />
                        <span className="text-xs font-black text-zinc-300">
                          كود تطبيقي: <span className="font-mono text-amber-400">{activeLesson.codeExample.filename}</span>
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleLocalCopy(
                          activeLesson.codeExample.code, 
                          activeLesson.id, 
                          `كود ${activeLesson.title}`
                        )}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 hover:bg-amber-500 hover:text-black px-3.5 py-1.5 text-xs font-bold text-zinc-300 transition-all cursor-pointer"
                      >
                        {copiedId === activeLesson.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedId === activeLesson.id ? 'تم نسخ الكود!' : 'نسخ الكود'}</span>
                      </button>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl w-full max-w-full">
                      <div className="bg-zinc-900/80 px-4 py-2 border-b border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
                          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 inline-block" />
                          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 inline-block" />
                          <span className="mr-2 text-zinc-500 truncate max-w-[150px] sm:max-w-none">{activeLesson.codeExample.filename}</span>
                        </div>
                        <span className="uppercase text-amber-400/80 font-bold shrink-0">{activeLesson.codeExample.language}</span>
                      </div>
                      <pre className="p-3.5 sm:p-5 text-xs font-mono text-zinc-200 overflow-x-auto leading-relaxed dir-ltr text-left selection:bg-amber-500 selection:text-black w-full max-w-full">
                        <code>{activeLesson.codeExample.code}</code>
                      </pre>
                    </div>
                  </div>

                  {/* 3. 🧪 Practice (تمرن) */}
                  <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 sm:p-5 flex items-start gap-3">
                    <Laptop className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-black text-blue-300">🧪 تمرن بنفسك (Practice Task):</h4>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed break-words">
                        {activeLesson.practiceTask}
                      </p>
                    </div>
                  </div>

                  {/* 4. 🔥 Challenge & ✅ Solution */}
                  <div className="rounded-2xl border border-amber-500/30 bg-zinc-950/70 p-4 sm:p-6 space-y-3.5 sm:space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                        <Flame className="h-4 w-4 shrink-0" />
                        <span>تحدي عملي: {activeLesson.challenge.title}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setRevealedSolutions(prev => ({ ...prev, [activeLesson.id]: !prev[activeLesson.id] }))}
                        className="text-xs font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer"
                      >
                        {revealedSolutions[activeLesson.id] ? 'إخفاء الحل ✖' : 'كشف الحل النموذجي ✅'}
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed break-words">
                      {activeLesson.challenge.description}
                    </p>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-xs text-zinc-400 break-words">
                      <strong className="text-amber-400">تلميح (Hint): </strong>
                      {activeLesson.challenge.hint}
                    </div>

                    {revealedSolutions[activeLesson.id] && (
                      <div className="mt-3 pt-3 border-t border-zinc-800/80 space-y-2 animate-in fade-in duration-150 w-full max-w-full overflow-hidden">
                        <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                          <span>✅ الحل النموذجي:</span>
                          <button
                            type="button"
                            onClick={() => handleLocalCopy(activeLesson.challenge.solutionCode, `sol-${activeLesson.id}`, 'حل التحدي')}
                            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <Copy className="h-3 w-3" />
                            <span>نسخ الحل</span>
                          </button>
                        </div>
                        <pre className="rounded-xl bg-zinc-900 p-3 text-xs font-mono text-zinc-200 overflow-x-auto dir-ltr text-left w-full max-w-full">
                          <code>{activeLesson.challenge.solutionCode}</code>
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* 5. 📝 Interactive Quiz */}
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6 space-y-3.5 sm:space-y-4">
                    <div className="flex items-center gap-2 text-white font-black text-sm">
                      <HelpCircle className="h-4 w-4 text-amber-400 shrink-0" />
                      <span>اختبر فهمك السريع (Quiz)</span>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-zinc-200 leading-relaxed break-words">
                      {activeLesson.quiz.question}
                    </p>

                    <div className="space-y-2">
                      {activeLesson.quiz.options.map((opt, idx) => {
                        const isSelected = quizAnswers[activeLesson.id] === idx;
                        const isAnswered = quizAnswers[activeLesson.id] !== undefined;
                        const isCorrect = idx === activeLesson.quiz.correctIndex;

                        let style = 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700';
                        if (isAnswered) {
                          if (isCorrect) {
                            style = 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300 font-bold';
                          } else if (isSelected && !isCorrect) {
                            style = 'border-red-500/50 bg-red-950/20 text-red-300';
                          }
                        }

                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              if (!isAnswered) {
                                setQuizAnswers(prev => ({ ...prev, [activeLesson.id]: idx }));
                              }
                            }}
                            className={`rounded-xl border p-3 sm:p-3.5 text-xs sm:text-sm transition-all cursor-pointer flex items-start justify-between gap-3 text-right leading-relaxed ${style}`}
                          >
                            <span className="flex-1 break-words">{opt}</span>
                            {isAnswered && isCorrect && <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />}
                          </div>
                        );
                      })}
                    </div>

                    {quizAnswers[activeLesson.id] !== undefined && (
                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 sm:p-3.5 text-xs text-zinc-300 leading-relaxed break-words animate-in fade-in duration-150">
                        <strong className="text-amber-400">💡 الشرح والتوضيح: </strong>
                        {activeLesson.quiz.explanation}
                      </div>
                    )}
                  </div>

                  {/* 6. Navigation: Previous & Next Lesson (Responsive, Stacking, No Truncation Overlap) */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-5 border-t border-zinc-800">
                    {prevLesson ? (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveLessonId(prevLesson.id);
                          window.scrollTo({ top: 380, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 hover:border-amber-500/50 bg-zinc-950 px-4 py-2.5 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer text-right"
                      >
                        <ArrowBackIcon className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span className="break-words">الدرس السابق: {prevLesson.number}. {prevLesson.title}</span>
                      </button>
                    ) : <div className="hidden sm:block" />}

                    {nextLesson ? (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveLessonId(nextLesson.id);
                          window.scrollTo({ top: 380, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 text-xs font-black text-black transition-all shadow-md shadow-amber-500/20 cursor-pointer text-right"
                      >
                        <span className="break-words">الدرس التالي: {nextLesson.number}. {nextLesson.title}</span>
                        <ArrowNextIcon className="h-3.5 w-3.5 shrink-0" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActiveMainTab('projects')}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-xs font-black text-black transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                      >
                        <span>الانتقال للمشاريع العملية 🚀</span>
                        <ArrowNextIcon className="h-3.5 w-3.5 shrink-0" />
                      </button>
                    )}
                  </div>

                  {/* Bottom Return to Cards */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setCurriculumViewMode('cards');
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                      <span>العودة لاستعراض جميع بطاقات الدروس ({allLessons.length} درس)</span>
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: REAL PROJECTS (7 Progressive Real Projects) */}
        {/* ============================================================== */}
        {activeMainTab === 'projects' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Layers className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">مشاريع البورتفوليو</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                7 مشاريع عملية متدرجة من الصفر وحتى المواقع التجارية
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
                كل مشروع يتبع الدورة الاحترافية المعتمدة في الشركات: (Brief ➔ Planning ➔ Structure ➔ Coding ➔ Testing ➔ Responsive ➔ Deploy).
              </p>
            </div>

            {/* Project Tabs Selector - Responsive Grid with auto height */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {realProjectsList.map((proj) => {
                const isActive = proj.id === activeProjectId;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectId(proj.id)}
                    className={`rounded-2xl border p-3 text-right transition-all cursor-pointer flex flex-col justify-between h-auto min-h-[85px] ${
                      isActive 
                        ? 'border-amber-500 bg-amber-500/15 shadow-md shadow-amber-500/10 ring-1 ring-amber-500/30' 
                        : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-[10px] font-black text-amber-400">مشروع 0{proj.number}</span>
                    <span className="mt-1 text-xs font-black text-white leading-snug break-words">
                      {proj.title.split(':')[1] || proj.title}
                    </span>
                    <span className="mt-2 text-[9px] text-zinc-400 block">{proj.level}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Project Detail Card */}
            {activeProject && (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
                  <div>
                    <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-black text-amber-400">
                      {activeProject.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-2 break-words">
                      {activeProject.title}
                    </h3>
                  </div>

                  <span className="rounded-xl bg-zinc-800 px-3.5 py-1.5 text-xs font-bold text-zinc-300">
                    مستوى الصعوبة: {activeProject.level}
                  </span>
                </div>

                {/* 1. Brief & Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-2">
                    <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">وصف ونطاق المشروع (Project Brief):</h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium break-words">
                      {activeProject.brief}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-2">
                    <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">المزايا المطلوب تنفيذها (Features):</h4>
                    <div className="space-y-1.5">
                      {activeProject.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span className="break-words">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Planning Steps */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-3">
                  <h4 className="text-xs font-black text-zinc-300 uppercase tracking-wider">مراحل التخطيط والتنفيذ (Planning Workflow):</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400">
                    {activeProject.planningSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80">
                        <span className="font-mono text-amber-400 font-bold">0{idx + 1}.</span>
                        <span className="text-zinc-300 break-words">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Code Highlights */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="text-xs font-black text-zinc-300">كود الهيكل والأنماط المقترحة:</h4>
                    <button
                      type="button"
                      onClick={() => handleLocalCopy(
                        `${activeProject.htmlStructure}\n\n${activeProject.cssHighlights}`, 
                        `proj-${activeProject.id}`,
                        activeProject.title
                      )}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>نسخ كود المشروع</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 w-full min-w-0 overflow-hidden">
                      <span className="text-[11px] font-bold text-amber-400 block mb-2 font-mono">HTML Structure:</span>
                      <pre className="text-xs font-mono text-zinc-300 overflow-x-auto dir-ltr text-left w-full max-w-full">
                        <code>{activeProject.htmlStructure}</code>
                      </pre>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 w-full min-w-0 overflow-hidden">
                      <span className="text-[11px] font-bold text-orange-400 block mb-2 font-mono">CSS Highlights:</span>
                      <pre className="text-xs font-mono text-zinc-300 overflow-x-auto dir-ltr text-left w-full max-w-full">
                        <code>{activeProject.cssHighlights}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* 4. Testing & Deployment Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-4 space-y-2">
                    <span className="text-xs font-black text-emerald-400">معايير الاختبار والتجاوب (Testing):</span>
                    {activeProject.testingChecklist.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span className="break-words">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-blue-500/20 bg-blue-950/10 p-4 space-y-2">
                    <span className="text-xs font-black text-blue-400">خطوات النشر الحي (Deploy):</span>
                    {activeProject.deploymentSteps.map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                        <UploadCloud className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                        <span className="break-words">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: WEB DEVELOPMENT FREELANCING */}
        {/* ============================================================== */}
        {activeMainTab === 'freelancing' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Briefcase className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">الانطلاق في العمل الحر</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                دليل العمل الحر: الخدمات، التسعير، وإغلاق صفقات العملاء
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
                المهارات البرمجية وحدها لا تكفي؛ تعلم كيف تحول خبرتك في تطوير الويب إلى دخل حقيقي متكرر من خلال عقود عمل واضحة وخدمات ذات قيمة عالية.
              </p>
            </div>

            {/* Freelance Services & Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {freelanceServicesList.map((service, idx) => (
                <div key={idx} className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6 flex flex-col justify-between h-auto">
                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <span className="text-base sm:text-lg font-black text-white break-words">{service.title}</span>
                    </div>

                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="rounded-xl bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-black text-amber-400">
                        {service.priceRange}
                      </span>
                      <span className="text-xs text-zinc-400">مدة التسليم: {service.deliveryTime}</span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed mb-4 break-words">
                      {service.description}
                    </p>

                    <div className="space-y-2 border-t border-zinc-800/80 pt-3">
                      <span className="text-[11px] font-black text-zinc-400 uppercase">ما يستلمه العميل (Deliverables):</span>
                      {service.deliverables.map((del, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                          <Check className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="break-words">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Practical Advice Grid: Portfolio, Scope, Revisions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-2 h-auto">
                <h4 className="text-sm font-black text-amber-400">1. بناء البورتفوليو بدون عملاء</h4>
                <p className="text-xs text-zinc-400 leading-relaxed break-words">
                  أعد تصميم صفحات هبوط لـ 3 شركات أو مشاريع محلية بمواقع بطيئة، واعرض نموذج المعاينة الحية لإثبات الفارق قبل طلب أي مقابل مادي.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-2 h-auto">
                <h4 className="text-sm font-black text-amber-400">2. تجنب الـ Scope Creep</h4>
                <p className="text-xs text-zinc-400 leading-relaxed break-words">
                  حدد في العقد عدد الصفحات، الأقسام، ونماذج الاتصال بدقة. أي ميزة إضافية (مثل لغة ثانية أو متجر) يتم تسعيرها كملحق إضافي مستقل.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-2 h-auto">
                <h4 className="text-sm font-black text-amber-400">3. سياسة التعديلات والتسليم</h4>
                <p className="text-xs text-zinc-400 leading-relaxed break-words">
                  وفر جولتين مجانيتين من التعديلات (2 Revision Rounds) خلال 7 أيام من التسليم، مع فيديو قصير مدته 5 دقائق يشرح للعميل كيفية تعديل نصوصه.
                </p>
              </div>
            </div>

            {/* Ready-to-Copy Client Outreach Email Template */}
            <div className="rounded-3xl border border-amber-500/40 bg-zinc-900/70 p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-xs font-black text-amber-400">
                    نموذج مراسلة الشركات وأصحاب الأعمال
                  </span>
                  <h3 className="text-lg font-black text-white mt-1 break-words">
                    رسالة التواصل الباردة (Cold Outreach) عالية الردود
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => handleLocalCopy(
                    `الموضوع: ${clientOutreachEmail.subject}\n\n${clientOutreachEmail.body}`,
                    'client-email',
                    'رسالة التواصل مع العملاء'
                  )}
                  className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-black text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  {copiedId === 'client-email' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedId === 'client-email' ? 'تم نسخ الرسالة!' : 'نسخ الرسالة الجاهزة'}</span>
                </button>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
                <div className="text-amber-400 font-bold mb-2 pb-2 border-b border-zinc-800">
                  الموضوع: {clientOutreachEmail.subject}
                </div>
                {clientOutreachEmail.body}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Explicit bottom clearance spacer so bottom nav never covers any content on mobile */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </div>
  );
};
