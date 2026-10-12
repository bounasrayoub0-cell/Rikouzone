import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  BookOpen, 
  Calculator, 
  Scale, 
  Headphones, 
  FileText, 
  CalendarCheck, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Search, 
  ArrowRight,
  Clock, 
  Award, 
  Layers, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
  Check,
  Zap,
  Globe,
  DollarSign,
  HelpCircle
} from 'lucide-react';
import { 
  brandedEcommerceLessons, 
  ecommerceModuleCategories, 
  EcommerceLesson 
} from '../../data/brandedEcommerceData';
import { BrandedEcommerceProfitCalculator } from './BrandedEcommerceProfitCalculator';
import { BrandedEcommerceIdeaComparator } from './BrandedEcommerceIdeaComparator';
import { BrandedEcommerceSupportSimulator } from './BrandedEcommerceSupportSimulator';
import { BrandedEcommerceTemplatesView } from './BrandedEcommerceTemplatesView';
import { BrandedEcommerceChecklistAndPlan } from './BrandedEcommerceChecklistAndPlan';

export interface BrandedEcommerceViewProps {
  onBack?: () => void;
  onNavigate?: (tab: string) => void;
  onCopyText?: (text: string, label: string) => void;
  onSelectIncome?: (incomeId: string) => void;
}

export const BrandedEcommerceView: React.FC<BrandedEcommerceViewProps> = ({ 
  onBack,
  onNavigate,
  onCopyText,
  onSelectIncome 
}) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<
    'curriculum' | 'calculator' | 'comparator' | 'simulator' | 'templates' | 'plan-checklist'
  >('curriculum');

  // Fallback copy function if not provided via props
  const handleCopy = (text: string, label: string) => {
    if (onCopyText) {
      onCopyText(text, label);
    } else {
      try {
        navigator.clipboard.writeText(text);
        alert(label);
      } catch {
        // fallback
      }
    }
  };

  // Curriculum state
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLessonId, setActiveLessonId] = useState<string>(brandedEcommerceLessons[0]?.id || '');
  
  // Completed lessons storage
  const COMPLETED_LESSONS_KEY = 'rikouzone_branded_ecommerce_completed_lessons';
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_LESSONS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleLessonCompleted = (lessonId: string) => {
    setCompletedLessonIds(prev => {
      const next = prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId) 
        : [...prev, lessonId];
      try {
        localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return brandedEcommerceLessons.filter(lesson => {
      const matchesCategory = selectedModule === 'all' || lesson.moduleCategory === selectedModule;
      const matchesSearch = !searchQuery.trim() || 
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedModule, searchQuery]);

  // Current active lesson object
  const activeLesson = useMemo(() => {
    return brandedEcommerceLessons.find(l => l.id === activeLessonId) || brandedEcommerceLessons[0];
  }, [activeLessonId]);

  // Active lesson index & navigation
  const currentIndex = brandedEcommerceLessons.findIndex(l => l.id === activeLesson?.id);
  const prevLesson = currentIndex > 0 ? brandedEcommerceLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < brandedEcommerceLessons.length - 1 ? brandedEcommerceLessons[currentIndex + 1] : null;

  const totalLessons = brandedEcommerceLessons.length;
  const completedCount = completedLessonIds.length;
  const overallProgress = Math.round((completedCount / totalLessons) * 100);

  // Lesson Quiz Interactive State
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  // Reset quiz state when switching lesson
  const selectLesson = (id: string) => {
    setActiveLessonId(id);
    setSelectedQuizAnswer(null);
    setIsQuizSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-zinc-100 pb-24 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Breadcrumb & Return Bar */}
      <div className="border-b border-zinc-800/80 bg-[#0c0e15]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onBack ? (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                العودة للمسارات
              </button>
            ) : onNavigate ? (
              <button
                onClick={() => onNavigate('income')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                العودة للمسارات
              </button>
            ) : null}
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
              <span>مسارات الدخل</span>
              <span>/</span>
              <span className="text-amber-400 font-bold">التجارة الإلكترونية بعلامة تجارية (Branded E-commerce)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-400">الإنجاز:</span>
              <span className="font-mono font-bold text-amber-400">{completedCount}/{totalLessons} ({overallProgress}%)</span>
            </div>
            <div className="w-24 bg-zinc-900 rounded-full h-2 overflow-hidden border border-zinc-800 hidden sm:block">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-zinc-800/80 bg-gradient-to-b from-[#111420] via-[#090b10] to-[#07080b]">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                مسار تعليمي احترافي متكامل من الصفر حتى الإطلاق
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                التجارة الإلكترونية بعلامة تجارية
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 mt-1">
                  Branded E-commerce Mastery
                </span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                دليلك العملي لبناء علامة تجارية حقيقية ذات هوية مميزة وتجربة عملاء استثنائية، وليس مجرد بيع منتجات عشوائية. تعلّم اختيار السوق، توريد العينات، بناء المتجر الموثوق، تشغيل الحملات الإعلانية المربحة، وخدمة العملاء باحترافية.
              </p>

              {/* Badges strip */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  11 وحدة دراسية معمّقة
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                  حاسبة هوامش وأرباح دقيقة
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <Scale className="w-3.5 h-3.5 text-purple-400" />
                  مصفوفة مقارنة 3 أفكار تجارية
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <Headphones className="w-3.5 h-3.5 text-blue-400" />
                  محاكي خدمة العملاء
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
                  خطة 14 يوماً وقائمة التحقق
                </span>
              </div>
            </div>

            {/* Quick Stat Card */}
            <div className="w-full lg:w-80 bg-[#0c0e15]/90 border border-zinc-800/90 rounded-3xl p-5 shadow-2xl relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  مسار نشط
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-xs text-zinc-400 block">نموذج العمل الأساسي</span>
                  <span className="text-base font-bold text-white">بناء أصل تجاري مستدام (Brand Asset)</span>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800/80">
                  <div>
                    <span className="text-[11px] text-zinc-500 block">مستوى الصعوبة</span>
                    <span className="text-xs font-bold text-amber-400">متوسط إلى متقدم</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-500 block">الميزانية المقترحة</span>
                    <span className="text-xs font-bold text-emerald-400">$200 - $1,500</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('calculator')}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-bold transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calculator className="w-4 h-4" />
                    احسب أرباح منتجك الآن
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Master View Navigation Tabs */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-zinc-800/80">
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'curriculum'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              المنهج التعليمي (11 وحدة)
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Calculator className="w-4 h-4" />
              حاسبة التكاليف والأرباح
            </button>

            <button
              onClick={() => setActiveTab('comparator')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'comparator'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Scale className="w-4 h-4" />
              مقارنة 3 أفكار منتجات
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Headphones className="w-4 h-4" />
              محاكي خدمة العملاء
            </button>

            <button
              onClick={() => setActiveTab('templates')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'templates'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              نماذج ونصوص جاهزة
            </button>

            <button
              onClick={() => setActiveTab('plan-checklist')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'plan-checklist'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              خطة 14 يوماً وقائمة التحقق
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* TAB 1: CURRICULUM */}
        {activeTab === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar / Lesson Directory (col-4) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Category Filter & Search */}
              <div className="bg-[#0c0e15] border border-zinc-800/90 rounded-2xl p-4 space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute right-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="ابحث في الدروس والمفاهيم..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pr-10 pl-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-2">
                    <Filter className="w-3.5 h-3.5 text-amber-400" />
                    <span>تصفية حسب المحور التعليمي:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto no-scrollbar">
                    <button
                      onClick={() => setSelectedModule('all')}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        selectedModule === 'all'
                          ? 'bg-amber-500 text-black'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                      }`}
                    >
                      الكل ({brandedEcommerceLessons.length})
                    </button>
                    {ecommerceModuleCategories.map(mod => (
                      <button
                        key={mod.id}
                        onClick={() => setSelectedModule(mod.id)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                          selectedModule === mod.id
                            ? 'bg-amber-500 text-black'
                            : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                        }`}
                      >
                        <span>{mod.icon}</span>
                        <span>{mod.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lesson Items List */}
              <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1">
                {filteredLessons.map((lesson) => {
                  const isActive = lesson.id === activeLesson.id;
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => selectLesson(lesson.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-right flex items-start gap-3 select-none ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500/15 via-[#12141f] to-[#0c0e15] border-amber-500/40 shadow-lg shadow-amber-500/5'
                          : 'bg-[#0c0e15] border-zinc-800/80 hover:border-zinc-700'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonCompleted(lesson.id);
                        }}
                        className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-transform active:scale-95 ${
                          isCompleted
                            ? 'bg-emerald-500 text-black shadow-sm shadow-emerald-500/30'
                            : 'bg-zinc-900 border border-zinc-700 text-zinc-500 hover:border-amber-500/40'
                        }`}
                      >
                        {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : (
                          <span className="text-[10px] font-mono font-bold text-zinc-400">
                            {lesson.moduleNumber}
                          </span>
                        )}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold text-amber-400">
                            الوحدة {lesson.moduleNumber}
                          </span>
                        </div>
                        <h4 className={`text-xs sm:text-sm font-bold truncate mt-0.5 ${
                          isActive ? 'text-amber-300' : 'text-white'
                        }`}>
                          {lesson.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                          {lesson.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Lesson Content Reader (col-8) */}
            <div className="lg:col-span-8 space-y-6">
              {activeLesson && (
                <div className="bg-[#0c0e15] border border-zinc-800/90 rounded-3xl p-5 sm:p-8 shadow-2xl relative space-y-6">
                  {/* Lesson Meta Header */}
                  <div className="pb-6 border-b border-zinc-800/80 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          الوحدة التعليمية {activeLesson.moduleNumber} من {totalLessons}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleLessonCompleted(activeLesson.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                          completedLessonIds.includes(activeLesson.id)
                            ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                            : 'bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:border-amber-500/40'
                        }`}
                      >
                        {completedLessonIds.includes(activeLesson.id) ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            تم إكمال هذا الدرس بنجاح
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            وضع علامة: تم الإكمال
                          </>
                        )}
                      </button>
                    </div>

                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {activeLesson.title}
                      </h2>
                      <p className="text-sm sm:text-base text-amber-400/90 font-medium mt-1">
                        {activeLesson.subtitle}
                      </p>
                    </div>

                    {/* Overview Banner */}
                    <div className="p-4 rounded-2xl bg-[#111420] border border-amber-500/20 text-xs sm:text-sm text-zinc-200 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-400 block mb-1">الرؤية والهدف من هذه الوحدة:</strong>
                        <p className="leading-relaxed">{activeLesson.overview}</p>
                      </div>
                    </div>
                  </div>

                  {/* Learning Objectives */}
                  {activeLesson.learningObjectives && activeLesson.learningObjectives.length > 0 && (
                    <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-2">
                      <h4 className="text-xs font-bold text-amber-400 flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" />
                        أهداف التعلم ومخرجات الدرس:
                      </h4>
                      <ul className="space-y-1.5 pr-2">
                        {activeLesson.learningObjectives.map((obj, oIdx) => (
                          <li key={oIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Concepts Deep-dive */}
                  {activeLesson.keyConcepts && activeLesson.keyConcepts.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-amber-400" />
                        المفاهيم الجوهرية والتحليل النظري والعملي:
                      </h3>

                      <div className="grid grid-cols-1 gap-4">
                        {activeLesson.keyConcepts.map((kc, kIdx) => (
                          <div 
                            key={kIdx}
                            className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 space-y-2.5"
                          >
                            <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-amber-400" />
                              {kc.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                              {kc.explanation}
                            </p>
                            {kc.practicalExample && (
                              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                                <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="block mb-0.5 text-amber-400">مثال تطبيقي واقعي:</strong>
                                  <span>{kc.practicalExample}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step-by-Step Practical Steps */}
                  {activeLesson.deepDiveSteps && activeLesson.deepDiveSteps.length > 0 && (
                    <div className="pt-2 space-y-4">
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-amber-400" />
                        الخطوات العملية التنفيذية خطوة بخطوة:
                      </h3>

                      <div className="grid grid-cols-1 gap-3.5">
                        {activeLesson.deepDiveSteps.map((step) => (
                          <div 
                            key={step.stepNumber}
                            className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                                {step.stepNumber}
                              </span>
                              <h4 className="font-bold text-white text-xs sm:text-sm">
                                {step.title}
                              </h4>
                            </div>

                            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pr-10">
                              {step.detail}
                            </p>

                            {step.proTip && (
                              <div className="mr-10 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                                <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                <span><strong>نصيحة محترف:</strong> {step.proTip}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Practical Exercise / Homework */}
                  {activeLesson.practicalExercise && (
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border border-amber-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-sm sm:text-base">
                        <Award className="w-5 h-5" />
                        التمرين العملي لهذه الوحدة: {activeLesson.practicalExercise.task}
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold text-zinc-300 block">خطوات التنفيذ الفعلي:</span>
                        <ul className="space-y-1.5 pr-2">
                          {activeLesson.practicalExercise.actionSteps.map((act, aIdx) => (
                            <li key={aIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div className="text-zinc-200">
                          <strong className="text-emerald-400 ml-1">المُخرج النهائي:</strong>
                          {activeLesson.practicalExercise.deliverable}
                        </div>
                        <div className="text-zinc-300 bg-black/30 px-3 py-1.5 rounded-lg border border-amber-500/20">
                          <strong className="text-amber-400 ml-1">سؤال التقييم الذاتي:</strong>
                          {activeLesson.practicalExercise.selfCheckQuestion}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  {activeLesson.summary && (
                    <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs sm:text-sm text-zinc-300">
                      <strong className="text-amber-400 block mb-1">خلاصة المحور:</strong>
                      <p className="leading-relaxed">{activeLesson.summary}</p>
                    </div>
                  )}

                  {/* Interactive Quick Quiz */}
                  {activeLesson.quiz && (
                    <div className="p-5 rounded-2xl bg-[#0e111a] border border-amber-500/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-amber-400" />
                          اختبر استيعابك السريع للوحدة:
                        </h4>
                        <span className="text-[11px] text-zinc-400 font-mono">سؤال تفاعلي</span>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-zinc-200">
                        {activeLesson.quiz.question}
                      </p>

                      <div className="grid grid-cols-1 gap-2.5">
                        {activeLesson.quiz.options.map((option, optIdx) => {
                          const isSelected = selectedQuizAnswer === optIdx;
                          const isCorrect = optIdx === activeLesson.quiz?.correctIndex;

                          let btnStyle = "bg-zinc-900/70 border-zinc-800 text-zinc-300 hover:border-amber-500/40";
                          if (isSelected && !isQuizSubmitted) {
                            btnStyle = "bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm";
                          } else if (isQuizSubmitted) {
                            if (isCorrect) {
                              btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                            } else if (isSelected && !isCorrect) {
                              btnStyle = "bg-red-500/20 border-red-500 text-red-300";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={isQuizSubmitted}
                              onClick={() => setSelectedQuizAnswer(optIdx)}
                              className={`p-3 rounded-xl border text-right text-xs leading-relaxed transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                            >
                              <span>{option}</span>
                              {isQuizSubmitted && isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        {!isQuizSubmitted ? (
                          <button
                            disabled={selectedQuizAnswer === null}
                            onClick={() => setIsQuizSubmitted(true)}
                            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-black font-bold text-xs transition-all cursor-pointer shadow-md shadow-amber-500/20"
                          >
                            تأكيد الإجابة
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedQuizAnswer(null);
                              setIsQuizSubmitted(false);
                            }}
                            className="text-xs text-amber-400 hover:underline cursor-pointer"
                          >
                            إعادة المحاولة
                          </button>
                        )}

                        {isQuizSubmitted && (
                          <div className="text-xs text-zinc-300">
                            {selectedQuizAnswer === activeLesson.quiz.correctIndex ? (
                              <span className="text-emerald-400 font-bold">إجابة صحيحة وممتازة! 🎉</span>
                            ) : (
                              <span className="text-red-400 font-bold">إجابة غير دقيقة، راجع الشرح أدناه.</span>
                            )}
                          </div>
                        )}
                      </div>

                      {isQuizSubmitted && (
                        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                          <strong className="text-amber-400 block mb-0.5">التوضيح:</strong>
                          {activeLesson.quiz.explanation}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bottom Navigation (Prev / Next) */}
                  <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {prevLesson ? (
                      <button
                        onClick={() => selectLesson(prevLesson.id)}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-300 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                        الدرس السابق: {prevLesson.title}
                      </button>
                    ) : <div />}

                    {nextLesson && (
                      <button
                        onClick={() => selectLesson(nextLesson.id)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                      >
                        الدرس التالي: {nextLesson.title}
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PROFIT CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <BrandedEcommerceProfitCalculator />
          </div>
        )}

        {/* TAB 3: IDEA COMPARATOR */}
        {activeTab === 'comparator' && (
          <div className="space-y-6">
            <BrandedEcommerceIdeaComparator />
          </div>
        )}

        {/* TAB 4: SUPPORT SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <BrandedEcommerceSupportSimulator onCopyText={handleCopy} />
          </div>
        )}

        {/* TAB 5: TEMPLATES */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <BrandedEcommerceTemplatesView onCopyText={handleCopy} />
          </div>
        )}

        {/* TAB 6: PLAN & CHECKLIST */}
        {activeTab === 'plan-checklist' && (
          <div className="space-y-6">
            <BrandedEcommerceChecklistAndPlan />
          </div>
        )}
      </div>
    </div>
  );
};
