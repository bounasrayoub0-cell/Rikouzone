import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Home, 
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
  Calendar, 
  RotateCcw, 
  FileText,
  Search,
  BookOpen,
  Target,
  Layers,
  Settings,
  Globe,
  Sliders,
  Award,
  Filter,
  ExternalLink,
  Info
} from 'lucide-react';
import { 
  bloggingStagesData, 
  bloggingMonetizationChannels, 
  bloggingThirtyArticleBlueprint, 
  bloggingNinetyDayRoadmap, 
  bloggingMistakesData, 
  BloggingStage, 
  ArticlePlanItem 
} from '../../data/bloggingMonetizationData';
import { BloggingCalculators } from './BloggingCalculators';

interface BloggingMonetizationViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const BLOGGING_TASKS_KEY = 'rikouzone_blogging_roadmap_tasks';
const BLOGGING_READ_LESSONS_KEY = 'rikouzone_blogging_read_lessons';
const BLOGGING_CHALLENGES_KEY = 'rikouzone_blogging_challenges';

export const BloggingMonetizationView: React.FC<BloggingMonetizationViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // 1. Stage and Lessons state
  const [activeStageId, setActiveStageId] = useState<string>(bloggingStagesData[0].id);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [readLessons, setReadLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BLOGGING_READ_LESSONS_KEY);
      return saved ? JSON.parse(saved) : [bloggingStagesData[0].lessons[0].id];
    } catch {
      return [bloggingStagesData[0].lessons[0].id];
    }
  });

  // 2. Active Tab in view
  const [activeViewTab, setActiveViewTab] = useState<'stages' | 'tools' | 'blueprint' | 'roadmap' | 'monetization' | 'mistakes'>('stages');

  // 3. Challenge answers state
  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(BLOGGING_CHALLENGES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 4. Roadmap Task completion state
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(BLOGGING_TASKS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 5. Article Blueprint filters
  const [blueprintFilter, setBlueprintFilter] = useState<'all' | 'pillar' | 'supporting'>('all');
  const [blueprintSearch, setBlueprintSearch] = useState<string>('');

  // Save read lessons to local storage
  useEffect(() => {
    try {
      localStorage.setItem(BLOGGING_READ_LESSONS_KEY, JSON.stringify(readLessons));
    } catch {
      // ignore
    }
  }, [readLessons]);

  // Save challenges to local storage
  useEffect(() => {
    try {
      localStorage.setItem(BLOGGING_CHALLENGES_KEY, JSON.stringify(challengeAnswers));
    } catch {
      // ignore
    }
  }, [challengeAnswers]);

  // Save tasks to local storage
  useEffect(() => {
    try {
      localStorage.setItem(BLOGGING_TASKS_KEY, JSON.stringify(completedTasks));
    } catch {
      // ignore
    }
  }, [completedTasks]);

  // Current active stage
  const currentStage = bloggingStagesData.find(s => s.id === activeStageId) || bloggingStagesData[0];
  const currentLesson = currentStage.lessons[activeLessonIndex] || currentStage.lessons[0];

  // Mark lesson as read
  const handleSelectLesson = (lessonId: string, index: number) => {
    setActiveLessonIndex(index);
    if (!readLessons.includes(lessonId)) {
      setReadLessons(prev => [...prev, lessonId]);
    }
  };

  const handleNextLesson = () => {
    if (activeLessonIndex < currentStage.lessons.length - 1) {
      const nextIdx = activeLessonIndex + 1;
      setActiveLessonIndex(nextIdx);
      const nextId = currentStage.lessons[nextIdx].id;
      if (!readLessons.includes(nextId)) {
        setReadLessons(prev => [...prev, nextId]);
      }
    } else {
      // Move to next stage
      const currentStageIndex = bloggingStagesData.findIndex(s => s.id === activeStageId);
      if (currentStageIndex < bloggingStagesData.length - 1) {
        const nextStage = bloggingStagesData[currentStageIndex + 1];
        setActiveStageId(nextStage.id);
        setActiveLessonIndex(0);
        const nextId = nextStage.lessons[0].id;
        if (!readLessons.includes(nextId)) {
          setReadLessons(prev => [...prev, nextId]);
        }
      }
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(activeLessonIndex - 1);
    } else {
      const currentStageIndex = bloggingStagesData.findIndex(s => s.id === activeStageId);
      if (currentStageIndex > 0) {
        const prevStage = bloggingStagesData[currentStageIndex - 1];
        setActiveStageId(prevStage.id);
        setActiveLessonIndex(prevStage.lessons.length - 1);
      }
    }
  };

  // Toggle roadmap task
  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  // Answer challenge
  const handleAnswerChallenge = (stageId: string, optionId: string) => {
    setChallengeAnswers(prev => ({ ...prev, [stageId]: optionId }));
  };

  // Calculate overall progress
  const totalLessons = bloggingStagesData.reduce((acc, stage) => acc + stage.lessons.length, 0);
  const lessonsProgress = Math.round((readLessons.length / totalLessons) * 100);

  const totalTasks = bloggingNinetyDayRoadmap.reduce((acc, phase) => acc + phase.tasks.length, 0);
  const tasksCompletedCount = Object.values(completedTasks).filter(Boolean).length;
  const tasksProgress = Math.round((tasksCompletedCount / totalTasks) * 100);

  // Overall combined score
  const overallProgress = Math.round((lessonsProgress * 0.6) + (tasksProgress * 0.4));

  // Filtered blueprint articles
  const filteredArticles = bloggingThirtyArticleBlueprint.filter(article => {
    const matchesFilter = blueprintFilter === 'all' || article.type === blueprintFilter;
    const matchesSearch = article.title.includes(blueprintSearch) || article.keyword.includes(blueprintSearch) || article.cluster.includes(blueprintSearch);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 font-sans pb-24 selection:bg-amber-500 selection:text-black" dir="rtl">
      
      {/* 1. Header / Breadcrumbs */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
            >
              <Home className="h-3.5 w-3.5" />
              <span>الرئيسية</span>
            </button>
            <span>/</span>
            <button 
              onClick={() => onNavigate('income')} 
              className="hover:text-amber-400 transition-colors"
            >
              طرق الدخل
            </button>
            <span>/</span>
            <span className="text-amber-400 font-bold">إنشاء المدونات المتخصصة (Niche Blogging & SEO)</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-xs">
              <span className="text-zinc-400 font-medium">نسبة الإنجاز:</span>
              <span className="font-black text-amber-400 font-mono">{overallProgress}%</span>
              <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500" 
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (confirm('هل تريد إعادة تعيين تقدم قراءة الدروس والمهام في مسار المدونات؟')) {
                  localStorage.removeItem(BLOGGING_READ_LESSONS_KEY);
                  localStorage.removeItem(BLOGGING_TASKS_KEY);
                  localStorage.removeItem(BLOGGING_CHALLENGES_KEY);
                  setReadLessons([bloggingStagesData[0].lessons[0].id]);
                  setCompletedTasks({});
                  setChallengeAnswers({});
                }
              }}
              className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-amber-400 hover:border-zinc-700 transition-colors"
              title="إعادة تعيين التقدم"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* 2. Hero Banner */}
      <div className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-amber-500/10 via-zinc-950/60 to-zinc-950 py-10 sm:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 mb-4 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>مسار تعليمي وتطبيقي شامل من الصفر للاحتراف</span>
            <span className="rounded-full bg-amber-500 px-1.5 py-0.2 text-[9px] font-black text-black">
              SEO 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            إنشاء المدونات المتخصصة <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">(Niche Blogging & SEO)</span>
          </h1>

          <p className="mt-3 max-w-3xl text-sm sm:text-base text-zinc-300 leading-relaxed">
            المدونة هي أصلك الرقمي المستقل الذي تملكه بنسبة 100%. تعلم كيف تختار نيتشاً رابحاً، تستهدف الكلمات المفتاحية الذكية، تبني العناقيد الموضوعية، وتتصدر نتائج Google لجلب زيارات مستمرة تدر دخلاً سلبياً من الإعلانات والأفلييت والمنتجات.
          </p>

          {/* Quick Metrics Cards */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl text-xs">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3">
              <span className="text-zinc-500 block">الملكية والأمان</span>
              <span className="font-bold text-emerald-400 text-sm mt-0.5 block">أصل مستقل 100%</span>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3">
              <span className="text-zinc-500 block">عائد الترافيك (Organic)</span>
              <span className="font-bold text-amber-400 text-sm mt-0.5 block">زوار دائمون لسنوات</span>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3">
              <span className="text-zinc-500 block">تكلفة البداية</span>
              <span className="font-bold text-blue-400 text-sm mt-0.5 block">منخفضة (دومين واستضافة)</span>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3">
              <span className="text-zinc-500 block">قنوات الدخل المتاحة</span>
              <span className="font-bold text-purple-400 text-sm mt-0.5 block">4 قنوات ربح رئيسية</span>
            </div>
          </div>

          {/* Realistic Disclaimer Box */}
          <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs text-amber-200/90 flex items-start gap-2.5 max-w-3xl">
            <Info className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <p className="leading-relaxed">
              <strong>تنويه واقعي مهم:</strong> السيو وتدوين النيتش ليس طريقاً للثراء السريع في أسبوع. هو استثمار حقيقي يتطلب التزاماً بكتابة محتوى أصيل ذي قيمة إنسانية وفهماً لاحتياج القارئ، وعادة ما تبدأ النتائج الفعلية بالظهور بعد 3 إلى 6 أشهر من النشر المنتظم.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Main Navigation Sub-Bar */}
      <div className="border-b border-zinc-800 bg-zinc-950 sticky top-[108px] z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
            {[
              { id: 'stages', label: 'المراحل التعليمية (10 مراحل)', icon: BookOpen },
              { id: 'tools', label: 'الأدوات والمحاكيات التفاعلية', icon: Sliders, badge: 'جديد' },
              { id: 'blueprint', label: 'خطة الـ 30 مقالاً الأولى', icon: Layers },
              { id: 'roadmap', label: 'خريطة طريق 90 يوماً', icon: Calendar },
              { id: 'monetization', label: 'طرق تحقيق الدخل', icon: DollarSign },
              { id: 'mistakes', label: 'أخطاء تجنبها', icon: AlertTriangle }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeViewTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveViewTab(tab.id as any)}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    isActive 
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-1.5 py-0.2 text-[9px] font-black text-emerald-300">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Tab Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        
        {/* TAB 1: STAGES & LESSONS */}
        {activeViewTab === 'stages' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (Desktop): Stage Selection Accordion */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <h3 className="text-sm font-black text-zinc-200">مراحل المسار (10 محاور)</h3>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  {readLessons.length} / {totalLessons} درس
                </span>
              </div>

              <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1 pl-1 scrollbar-thin">
                {bloggingStagesData.map((stage) => {
                  const isCurrent = stage.id === activeStageId;
                  const completedLessonsInStage = stage.lessons.filter(l => readLessons.includes(l.id)).length;
                  const isStageComplete = completedLessonsInStage === stage.lessons.length;

                  return (
                    <div 
                      key={stage.id}
                      className={`rounded-2xl border transition-all ${
                        isCurrent 
                          ? 'border-amber-500/60 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 shadow-md ring-1 ring-amber-500/30' 
                          : 'border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700'
                      }`}
                    >
                      <button
                        onClick={() => {
                          setActiveStageId(stage.id);
                          setActiveLessonIndex(0);
                        }}
                        className="w-full text-right p-3.5 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                            isStageComplete
                              ? 'bg-emerald-500 text-black'
                              : isCurrent
                              ? 'bg-amber-500 text-black'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            {isStageComplete ? '✓' : stage.stageNumber}
                          </div>
                          <div>
                            <h4 className={`text-xs font-bold ${isCurrent ? 'text-amber-300 font-black' : 'text-zinc-200'}`}>
                              {stage.title}
                            </h4>
                            <span className="text-[10px] text-zinc-500 block mt-0.5">
                              {stage.lessons.length} دروس • {stage.estimatedTime}
                            </span>
                          </div>
                        </div>

                        {isCurrent ? (
                          <ChevronDown className="h-4 w-4 text-amber-400" />
                        ) : (
                          <ChevronLeft className="h-4 w-4 text-zinc-500" />
                        )}
                      </button>

                      {/* Dropdown Lessons list if current stage */}
                      {isCurrent && (
                        <div className="border-t border-zinc-800/80 p-2 space-y-1 bg-zinc-950/50 rounded-b-2xl">
                          {stage.lessons.map((lesson, idx) => {
                            const isLessonActive = idx === activeLessonIndex;
                            const isRead = readLessons.includes(lesson.id);

                            return (
                              <button
                                key={lesson.id}
                                onClick={() => handleSelectLesson(lesson.id, idx)}
                                className={`w-full text-right px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                                  isLessonActive
                                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                                }`}
                              >
                                <span className="line-clamp-1">{idx + 1}. {lesson.title}</span>
                                {isRead && (
                                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mr-1" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active Lesson View & Stage Challenge */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Lesson Card */}
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
                
                {/* Stage Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-800 mb-6">
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 block">
                      المرحلة {currentStage.stageNumber}: {currentStage.title}
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                      {currentLesson.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-zinc-400 bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-full">
                      ⏳ {currentLesson.duration}
                    </span>
                    <button
                      onClick={() => onCopyText(`${currentLesson.title}\n\n${currentLesson.overview}\n\nأهم النقاط:\n${currentLesson.keyPoints.join('\n')}`, 'محتوى الدرس')}
                      className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-amber-400 hover:border-zinc-700 transition-colors"
                      title="نسخ ملخص الدرس"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Overview */}
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-4 mb-6">
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                    {currentLesson.overview}
                  </p>
                </div>

                {/* Key Points */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>النقاط الجوهرية التي يجب فهمها:</span>
                  </h4>
                  <div className="space-y-2">
                    {currentLesson.keyPoints.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/50">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 font-mono text-[11px] font-bold mt-0.5">
                          {pIdx + 1}
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Example Box */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 sm:p-5 mb-6">
                  <h4 className="text-xs font-black text-emerald-400 flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4" />
                    <span>مثال تطبيقي واقعي:</span>
                  </h4>
                  <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                    {currentLesson.practicalExample}
                  </p>
                </div>

                {/* Pro Tip or Warning */}
                {currentLesson.proTip && (
                  <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4 mb-6 text-xs text-blue-200 flex items-start gap-2.5">
                    <Sparkles className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" />
                    <div>
                      <strong className="text-blue-300 block mb-0.5">نصيحة محترف (Pro-Tip):</strong>
                      <span>{currentLesson.proTip}</span>
                    </div>
                  </div>
                )}

                {currentLesson.warning && (
                  <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4 mb-6 text-xs text-rose-200 flex items-start gap-2.5">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                    <div>
                      <strong className="text-rose-300 block mb-0.5">تحذير مهم:</strong>
                      <span>{currentLesson.warning}</span>
                    </div>
                  </div>
                )}

                {/* Action Items */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 mb-8">
                  <h4 className="text-xs font-black text-zinc-300 mb-2 flex items-center gap-2">
                    <Target className="h-3.5 w-3.5 text-amber-400" />
                    <span>مهمة تطبيقية لهذا الدرس:</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-400">
                    {currentLesson.actionItems.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lesson Navigation Bottom Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <button
                    onClick={handlePrevLesson}
                    disabled={activeStageId === bloggingStagesData[0].id && activeLessonIndex === 0}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-xs font-bold text-zinc-300 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                    <span>الدرس السابق</span>
                  </button>

                  <div className="text-xs text-zinc-500">
                    الدرس {activeLessonIndex + 1} من {currentStage.lessons.length}
                  </div>

                  <button
                    onClick={handleNextLesson}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black shadow-md shadow-amber-500/20 transition-all active:scale-95"
                  >
                    <span>الدرس التالي</span>
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>

              {/* Stage Checklist & Mini Challenge */}
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-7 space-y-6">
                
                {/* Stage Checklist */}
                <div>
                  <h4 className="text-xs font-black text-white flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>قائمة التدقيق لمرحلة: {currentStage.title}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentStage.checklist.map((item, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-xs text-zinc-300">
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage Mini Challenge */}
                <div className="pt-5 border-t border-zinc-800">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold">
                      💡
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-white">{currentStage.challenge.title}</h4>
                      <p className="text-[11px] text-zinc-400">{currentStage.challenge.question}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mt-3">
                    {currentStage.challenge.options.map((opt) => {
                      const isSelected = challengeAnswers[currentStage.id] === opt.id;
                      const hasAnswered = !!challengeAnswers[currentStage.id];

                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleAnswerChallenge(currentStage.id, opt.id)}
                          className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all select-none ${
                            isSelected
                              ? opt.isCorrect
                                ? 'bg-emerald-500/10 border-emerald-500 text-white font-bold'
                                : 'bg-rose-500/10 border-rose-500 text-white font-bold'
                              : hasAnswered && opt.isCorrect
                              ? 'bg-emerald-500/5 border-emerald-500/40 text-emerald-300'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span>{opt.text}</span>
                            {isSelected && (
                              <span className={`text-[11px] shrink-0 font-bold px-2 py-0.5 rounded-md ${
                                opt.isCorrect ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'
                              }`}>
                                {opt.isCorrect ? 'إجابة صحيحة ✓' : 'إجابة غير صحيحة ✗'}
                              </span>
                            )}
                          </div>

                          {/* Instant Feedback on selection */}
                          {isSelected && (
                            <p className={`mt-2 pt-2 border-t text-[11px] leading-relaxed ${
                              opt.isCorrect ? 'border-emerald-500/20 text-emerald-200' : 'border-rose-500/20 text-rose-200'
                            }`}>
                              {opt.feedback}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {challengeAnswers[currentStage.id] && (
                    <div className="mt-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed">
                      <strong className="text-amber-400 block mb-0.5">الشرح النموذجي:</strong>
                      {currentStage.challenge.explanation}
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: INTERACTIVE CALCULATORS & TOOLS */}
        {activeViewTab === 'tools' && (
          <BloggingCalculators onCopyText={onCopyText} />
        )}

        {/* TAB 3: 30-ARTICLE BLUEPRINT */}
        {activeViewTab === 'blueprint' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-xl">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <Layers className="h-5 w-5 text-amber-400" />
                    خطة أول 30 مقالاً لمدونة جديدة (Topic Clusters Blueprint)
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400">
                    هندسة محتوى متكاملة مقسمة إلى 3 عناقيد (3 مقالات أعمدة + 27 مقالاً مسانداً) تضمن بناء سلطة موضوعية وتصدر سريع.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const text = bloggingThirtyArticleBlueprint.map(a => `${a.id}. [${a.type === 'pillar' ? 'عمود Pillar' : 'مساند Supporting'}] ${a.title} (الكلمة: ${a.keyword} | النية: ${a.searchIntent} | الحجم: ${a.estimatedLength})`).join('\n\n');
                    onCopyText(text, 'خطة أول 30 مقالاً كاملة');
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
                >
                  <Copy className="h-4 w-4" />
                  <span>نسخ خطة الـ 30 مقالاً بالكامل</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-bold">تصفية حسب النوع:</span>
                  <div className="flex gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                    <button
                      onClick={() => setBlueprintFilter('all')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        blueprintFilter === 'all' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      الكل ({bloggingThirtyArticleBlueprint.length})
                    </button>
                    <button
                      onClick={() => setBlueprintFilter('pillar')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        blueprintFilter === 'pillar' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      صفحات الأعمدة Pillar (3)
                    </button>
                    <button
                      onClick={() => setBlueprintFilter('supporting')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        blueprintFilter === 'supporting' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      مقالات مساندة (27)
                    </button>
                  </div>
                </div>

                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={blueprintSearch}
                    onChange={(e) => setBlueprintSearch(e.target.value)}
                    placeholder="ابحث في الكلمات أو العناوين..."
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-700/80 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none pr-8"
                  />
                  <Search className="h-3.5 w-3.5 text-zinc-500 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {filteredArticles.map((article) => {
                  const isPillar = article.type === 'pillar';

                  return (
                    <div
                      key={article.id}
                      className={`rounded-2xl border p-4.5 flex flex-col justify-between transition-all ${
                        isPillar
                          ? 'border-amber-500/60 bg-gradient-to-b from-amber-500/10 via-zinc-950 to-zinc-950 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                          : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                            isPillar 
                              ? 'bg-amber-500 text-black' 
                              : 'bg-zinc-800 text-zinc-300'
                          }`}>
                            {isPillar ? 'صفحة عمود Pillar 🌟' : 'مقال مساند Cluster'}
                          </span>
                          <span className="text-[11px] font-mono text-zinc-500">#{article.id}</span>
                        </div>

                        <span className="text-[10px] text-zinc-400 block mb-1 font-medium">{article.cluster}</span>
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2">
                          {article.title}
                        </h4>

                        <div className="mt-3 pt-3 border-t border-zinc-800/80 space-y-1 text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-zinc-500">الكلمة المستهدفة:</span>
                            <span className="font-bold text-amber-300">{article.keyword}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-500">نية البحث:</span>
                            <span className="font-medium text-zinc-300">{article.searchIntent}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-500">الطول المقترح:</span>
                            <span className="font-medium text-emerald-400">{article.estimatedLength}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-zinc-400 line-clamp-1">{article.targetGoal}</span>
                        <button
                          onClick={() => onCopyText(`${article.title}\nالكلمة المفتاحية: ${article.keyword}\nالنية: ${article.searchIntent}\nالطول: ${article.estimatedLength}`, `مقال #${article.id}`)}
                          className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-amber-400 transition-colors"
                          title="نسخ بيانات المقال"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: 90-DAY ROADMAP */}
        {activeViewTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-xl">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-400" />
                    خريطة طريق 90 يوماً للمبتدئ (Step-by-Step 90-Day Roadmap)
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400">
                    خطة عملية مقسمة إلى 4 مراحل متسلسلة مع مهام محددة ومقاييس نجاح قابلة للقياس لكل مرحلة.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-zinc-950 px-3.5 py-1.5 rounded-2xl border border-zinc-800">
                  <span className="text-xs text-zinc-400">المهام المنجزة:</span>
                  <span className="text-sm font-black text-amber-400 font-mono">
                    {tasksCompletedCount} / {totalTasks} ({tasksProgress}%)
                  </span>
                </div>
              </div>

              {/* 4 Phases Accordions / Lists */}
              <div className="space-y-6 mt-6">
                {bloggingNinetyDayRoadmap.map((phase, pIdx) => {
                  const phaseTasks = phase.tasks;
                  const completedInPhase = phaseTasks.filter(t => completedTasks[t.id]).length;
                  const isPhaseDone = completedInPhase === phaseTasks.length;

                  return (
                    <div 
                      key={pIdx}
                      className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                        isPhaseDone 
                          ? 'border-emerald-500/40 bg-emerald-500/5' 
                          : 'border-zinc-800 bg-zinc-950/70'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 text-[11px] font-black border border-amber-500/30">
                              {phase.days}
                            </span>
                            <span className="text-xs font-bold text-zinc-400">{phase.phase}</span>
                          </div>
                          <h4 className="text-base font-black text-white mt-1.5">{phase.title}</h4>
                          <p className="text-xs text-zinc-400 mt-0.5">{phase.focus}</p>
                        </div>

                        <div className="shrink-0 px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px]">
                          <span className="text-zinc-500 block">المقياس المستهدف:</span>
                          <span className="font-bold text-emerald-400">{phase.targetMetrics}</span>
                        </div>
                      </div>

                      {/* Tasks Checkboxes */}
                      <div className="space-y-2.5">
                        {phase.tasks.map((task) => {
                          const isChecked = !!completedTasks[task.id];

                          return (
                            <div
                              key={task.id}
                              onClick={() => toggleTask(task.id)}
                              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                                isChecked
                                  ? 'bg-emerald-500/5 border-emerald-500/30 text-zinc-200'
                                  : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                              }`}
                            >
                              <div className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-all ${
                                isChecked
                                  ? 'border-emerald-500 bg-emerald-500 text-black'
                                  : 'border-zinc-700 bg-zinc-950'
                              }`}>
                                {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                              </div>
                              <div className="text-xs leading-relaxed">
                                <span className={`${isChecked ? 'line-through text-zinc-500' : 'text-zinc-200 font-medium'}`}>
                                  {task.text}
                                </span>
                                {task.tip && (
                                  <span className="block text-[11px] text-zinc-500 mt-0.5">
                                    💡 {task.tip}
                                  </span>
                                )}
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
          </div>
        )}

        {/* TAB 5: MONETIZATION CHANNELS */}
        {activeViewTab === 'monetization' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-xl">
              
              <div className="pb-6 border-b border-zinc-800 mb-6">
                <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-amber-400" />
                  طرق تحقيق الدخل والربح من المدونة (واقعية بدون أوهام)
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  شرح تفصيلي وموضوعي لقنوات الدخل الأربعة، مع شروط الأهلية ونماذج الدفع والأرباح التقديرية الحقيقية.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bloggingMonetizationChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 flex flex-col justify-between hover:border-zinc-700 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
                        <h4 className="text-base font-black text-white flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                          {channel.title}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                          {channel.payoutModel}
                        </span>
                      </div>

                      <div className="space-y-2 text-xs mb-4">
                        <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800/60">
                          <span className="text-zinc-500 block text-[11px]">شروط الأهلية والبدء:</span>
                          <span className="text-zinc-200 font-medium">{channel.eligibility}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                          <span className="text-emerald-400 block text-[11px] font-bold">العائد الواقعي المتوقع:</span>
                          <span className="text-zinc-200 font-medium">{channel.realisticEarnings}</span>
                        </div>
                      </div>

                      {/* Pros & Cons */}
                      <div className="grid grid-cols-2 gap-3 text-[11px] mb-4">
                        <div className="space-y-1">
                          <span className="font-bold text-emerald-400 block">المميزات:</span>
                          {channel.pros.map((pro, pIdx) => (
                            <div key={pIdx} className="text-zinc-300 flex items-start gap-1">
                              <span className="text-emerald-400">✓</span>
                              <span>{pro}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-1">
                          <span className="font-bold text-rose-400 block">العيوب:</span>
                          {channel.cons.map((con, cIdx) => (
                            <div key={cIdx} className="text-zinc-400 flex items-start gap-1">
                              <span className="text-rose-400">✗</span>
                              <span>{con}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-800/80">
                      <span className="text-[11px] font-bold text-amber-300 block mb-1">خطوات التنفيذ الموصى بها:</span>
                      <ul className="text-[11px] text-zinc-400 space-y-0.5">
                        {channel.actionSteps.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-1.5">
                            <span className="h-1 w-1 rounded-full bg-zinc-500" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Realistic Income Disclaimer Box */}
              <div className="mt-8 p-4 rounded-2xl border border-zinc-800 bg-zinc-950 text-xs text-zinc-400 leading-relaxed">
                <h5 className="font-bold text-white mb-1">⚖️ ميثاق الشفافية المالية في المنصة:</h5>
                نحن لا نَعِد أي مستخدم بأرباح ثابتة أو مضمونة. نتائج المدونات تعتمد بنسبة 100% على: دقة اختيار النيتش، جودة المقالات المكتوبة وتلبيتها لنية الباحث، جغرافية الزوار (Tier 1 vs Tier 3)، ومعدلات التحويل الفردية. الأرقام المذكورة هي متوسطات معيارية في الصناعة لأصحاب المواقع الملتزمين.
              </div>

            </div>
          </div>
        )}

        {/* TAB 6: MISTAKES TO AVOID */}
        {activeViewTab === 'mistakes' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-xl">
              
              <div className="pb-6 border-b border-zinc-800 mb-6">
                <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  أخطاء شائعة قاتلة تجنبها عند بناء مدونة سيو
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  تجنب هذه الممارسات الخاطئة التي تتسبب في موت 95% من المدونات الجديدة وحرمانها من الظهور في الصفحة الأولى.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {bloggingMistakesData.map((mistake) => (
                  <div
                    key={mistake.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 flex flex-col justify-between hover:border-rose-500/40 transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500" />

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                          mistake.impactScore === 'كارثي'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          أثر الخطأ: {mistake.impactScore}
                        </span>
                        <AlertTriangle className="h-4 w-4 text-rose-400" />
                      </div>

                      <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                        {mistake.mistake}
                      </h4>

                      <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs text-rose-200 mb-3 leading-relaxed">
                        <strong className="block text-[11px] text-rose-400 mb-0.5">لماذا هو خطير؟</strong>
                        {mistake.whyDangerous}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-200 leading-relaxed">
                      <strong className="block text-[11px] text-emerald-400 mb-0.5">التصرف البديل الصحيح:</strong>
                      {mistake.correction}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
