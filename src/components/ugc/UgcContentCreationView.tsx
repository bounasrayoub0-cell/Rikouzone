import React, { useState, useEffect } from 'react';
import {
  Video,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  FileText,
  DollarSign,
  FolderPlus,
  Send,
  Sliders,
  Scale,
  Calendar,
  HelpCircle,
  Lightbulb,
  Award,
  Zap,
  Target,
  Search,
  RotateCcw,
  Film,
  Camera,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  ugcLessons, 
  sevenDayUgcPlan, 
  UgcLesson,
  UgcQuizQuestion 
} from '../../data/ugcCourseData';

interface UgcContentCreationViewProps {
  onNavigate?: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

export const UgcContentCreationView: React.FC<UgcContentCreationViewProps> = ({
  onNavigate,
  onCopyText
}) => {
  const { isRTL } = useLanguage();
  const ArrowBackIcon = isRTL ? ArrowRight : ArrowLeft;

  // Active module selection
  const [selectedLessonId, setSelectedLessonId] = useState<string>(ugcLessons[0].id);
  const activeLesson: UgcLesson = ugcLessons.find((l) => l.id === selectedLessonId) || ugcLessons[0];

  // Active Main Section: 'lessons' | 'calculator' | 'script-generator' | 'challenge'
  const [activeMainSection, setActiveMainSection] = useState<'lessons' | 'calculator' | 'script-generator' | 'challenge'>('lessons');

  // Search filter for lessons
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  // Persistent Completed Lessons State
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rz_ugc_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent 7-Day Challenge State
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('rz_ugc_challenge_days');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Quiz state for active lesson: { [questionId]: selectedOptionIndex }
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Copied feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rz_ugc_completed_lessons', JSON.stringify(completedLessonIds));
    } catch (e) {
      console.warn('Failed to save UGC progress:', e);
    }
  }, [completedLessonIds]);

  useEffect(() => {
    try {
      localStorage.setItem('rz_ugc_challenge_days', JSON.stringify(completedDays));
    } catch (e) {
      console.warn('Failed to save UGC challenge days:', e);
    }
  }, [completedDays]);

  const handleCopy = (text: string, id: string, label: string) => {
    onCopyText(text, label);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleLessonCompleted = (lessonId: string) => {
    setCompletedLessonIds((prev) => {
      if (prev.includes(lessonId)) {
        return prev.filter((id) => id !== lessonId);
      } else {
        return [...prev, lessonId];
      }
    });
  };

  const toggleChallengeDay = (day: number) => {
    setCompletedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  // Pricing Calculator State
  const [calcPackage, setCalcPackage] = useState<'single' | '3-pack' | '5-pack'>('3-pack');
  const [calcExtraHooks, setCalcExtraHooks] = useState<number>(2);
  const [calcIncludeRaw, setCalcIncludeRaw] = useState<boolean>(true);
  const [calcAdRightsDays, setCalcAdRightsDays] = useState<'none' | '30' | '60' | '90'>('60');

  // Compute pricing
  const basePrice = calcPackage === 'single' ? 120 : calcPackage === '3-pack' ? 320 : 500;
  const extraHooksPrice = calcExtraHooks * 35;
  const rawFootagePrice = calcIncludeRaw ? Math.round(basePrice * 0.4) : 0;
  const adRightsMultiplier = calcAdRightsDays === 'none' ? 0 : calcAdRightsDays === '30' ? 0.25 : calcAdRightsDays === '60' ? 0.45 : 0.65;
  const adRightsPrice = Math.round(basePrice * adRightsMultiplier);
  const totalQuote = basePrice + extraHooksPrice + rawFootagePrice + adRightsPrice;

  // Script Generator State
  const [genProduct, setGenProduct] = useState<string>('كريم مرطب للوجه بحمض الساليسيليك');
  const [genPainPoint, setGenPainPoint] = useState<string>('ظهور حبوب مفاجئة وتهيج البشرة بعد إزالة المكياج');
  const [genKeyBenefit, setGenKeyBenefit] = useState<string>('تهدئة فورية للبشرة في 10 دقائق بدون أي أثر دهني');
  const [genFormat, setGenFormat] = useState<'problem-solution' | 'unboxing' | '3-reasons'>('problem-solution');

  const generatedScript = `[0-3 ثوانٍ - الهوك الافتتاحي]:
${genFormat === 'problem-solution' 
  ? `"إلا كنتي كتعاني من ${genPainPoint}، حبسي التمرير دقيقة حيت هاد الفيديو معمول ليك خصيصاً!"`
  : genFormat === 'unboxing'
  ? `"أخيراً وصلني هاد الطرد لي كاع التيك توك كيهضر عليه: ${genProduct}!"`
  : `"3 أسباب علاش هاد ${genProduct} هو أحسن حاجة شريتها هاد الشهر!"`}

[3-8 ثوانٍ - تجسيد المشكلة / الإحباط]:
"شحال من مرة جربت منتجات غالية وكانت النتيجة إما زيادة فـ ${genPainPoint} أو ضياع فلوس بدون فائدة."

[8-15 ثانية - تقديم المنتج كحل سحري]:
"حتى طحت فهاد ${genProduct}. المكونات ديالو مدروسة طبياً وخفيفة بزاف على البشرة."

[15-22 ثانية - التجربة العملية والمميزات]:
"شوفو معايا القوام كيفاش خفيف وسهل الامتصاص: والسر هنا هو ${genKeyBenefit}. من أول أيام الاستعمال لاحظت فرق ملموس."

[22-28 ثانية - العرض ونداء الشراء الفوري (CTA)]:
"البراند دايرين دابا تخفيض حصري مع توصيل سريع حتى لباب الدار. ضغطو على الرابط أسفل الفيديو واستافدو من العرض قبل ما يسالي الستوك!"`;

  // Filter lessons
  const filteredLessons = ugcLessons.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lesson.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lesson.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || lesson.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const progressPercentage = Math.round((completedLessonIds.length / ugcLessons.length) * 100);

  const currentLevelBadge = 
    progressPercentage >= 80 ? { label: 'خبير UGC معتمد', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' } :
    progressPercentage >= 40 ? { label: 'صانع محتوى متوسط', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' } :
    { label: 'مبتدئ طموح', color: 'text-zinc-400 bg-zinc-800 border-zinc-700' };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      {/* Top Header Back Button */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
        <button
          onClick={() => onNavigate && onNavigate('income')}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-xs sm:text-sm font-bold text-zinc-300 hover:border-amber-500/50 hover:text-white transition-all active:scale-95"
        >
          <ArrowBackIcon className="h-4 w-4 text-amber-400" />
          <span>{isRTL ? 'العودة لمسارات الدخل' : 'Back to Income Paths'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black border ${currentLevelBadge.color}`}>
            <Award className="h-3.5 w-3.5" />
            <span>{currentLevelBadge.label}</span>
          </span>
          <span className="hidden sm:inline-flex items-center rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-mono font-bold text-zinc-400">
            {completedLessonIds.length} / {ugcLessons.length} مكتمل ({progressPercentage}%)
          </span>
        </div>
      </div>

      {/* Course Hero Banner */}
      <div className="relative mt-6 overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 sm:p-10 shadow-2xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-black text-amber-400">
            <Video className="h-3.5 w-3.5" />
            <span>مسار الاحتراف المهني الشامل</span>
          </div>

          <h1 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            دورة صناعة محتوى الـ UGC وتحقيق أول عميل
          </h1>

          <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed font-medium">
            تعلم كيف تصنع إعلانات فيديو عفوية للمنتجات بالهاتف فقط وتتقاضى من 100$ إلى 350$ لكل فيديو من العلامات التجارية والمتاجر الإلكترونية، دون الحاجة لأي متابعين على حساباتك!
          </p>

          {/* Quick Metrics Grid */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-amber-400">12</div>
              <div className="text-[11px] text-zinc-400 font-bold">وحدة تدريبية كاملة</div>
            </div>
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">$0</div>
              <div className="text-[11px] text-zinc-400 font-bold">بدون الحاجة لمتابعين</div>
            </div>
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-orange-400">100$-350$</div>
              <div className="text-[11px] text-zinc-400 font-bold">متوسط سعر الفيديو</div>
            </div>
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-cyan-400">7 أيام</div>
              <div className="text-[11px] text-zinc-400 font-bold">تحدي إطلاق البورتفوليو</div>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-400 mb-1.5">
              <span>تقدمك في الدورة التدريبية</span>
              <span className="text-amber-400 font-mono">{progressPercentage}% مكتمل</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-800/80 p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 shadow-sm shadow-amber-500/50"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Mode Navigation Bar */}
      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveMainSection('lessons')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-black transition-all whitespace-nowrap border ${
            activeMainSection === 'lessons'
              ? 'border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>الوحدات الدراسية (12 وحدة)</span>
        </button>

        <button
          onClick={() => setActiveMainSection('calculator')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-black transition-all whitespace-nowrap border ${
            activeMainSection === 'calculator'
              ? 'border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
          }`}
        >
          <DollarSign className="h-4 w-4" />
          <span>حاسبة تسعير الـ UGC وعروض الأسعار</span>
        </button>

        <button
          onClick={() => setActiveMainSection('script-generator')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-black transition-all whitespace-nowrap border ${
            activeMainSection === 'script-generator'
              ? 'border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>مولد سكربتات الـ UGC السداسي</span>
        </button>

        <button
          onClick={() => setActiveMainSection('challenge')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-black transition-all whitespace-nowrap border ${
            activeMainSection === 'challenge'
              ? 'border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>تحدي الـ 7 أيام للانطلاق</span>
          {completedDays.length > 0 && (
            <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-mono">
              {completedDays.length}/7
            </span>
          )}
        </button>
      </div>

      {/* SECTION 1: LESSONS & CURRICULUM */}
      {activeMainSection === 'lessons' && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left / Sidebar Column: Modules List & Search */}
          <div className="lg:col-span-4 space-y-4">
            {/* Search & Level Filter */}
            <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-4 backdrop-blur-xl">
              <div className="relative">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="ابحث في الدروس والمواضيع..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 py-2.5 pr-10 pl-3 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1">
                {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevelFilter(lvl)}
                    className={`rounded-xl px-2.5 py-1 text-[11px] font-bold transition-all shrink-0 ${
                      levelFilter === lvl
                        ? 'bg-amber-500 text-black'
                        : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {lvl === 'all' ? 'الكل' : lvl === 'beginner' ? 'مبتدئ' : lvl === 'intermediate' ? 'متوسط' : 'متقدم'}
                  </button>
                ))}
              </div>
            </div>

            {/* Modules List */}
            <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
              {filteredLessons.map((lesson) => {
                const isSelected = lesson.id === activeLesson.id;
                const isDone = completedLessonIds.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className={`w-full text-start rounded-2xl p-4 transition-all border flex items-start gap-3 ${
                      isSelected
                        ? 'border-amber-500/80 bg-amber-500/10 text-white shadow-md shadow-amber-500/10 ring-1 ring-amber-500/30'
                        : 'border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/80 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex flex-col items-center shrink-0 pt-0.5">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-black ${
                          isDone
                            ? 'bg-emerald-500 text-black'
                            : isSelected
                            ? 'bg-amber-500 text-black'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {isDone ? '✓' : lesson.moduleNumber}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          الوحدة {lesson.moduleNumber}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {lesson.estimatedMinutes} دقيقة
                        </span>
                      </div>
                      <div className="mt-1 text-xs sm:text-sm font-bold text-white line-clamp-1">
                        {lesson.title}
                      </div>
                      <div className="mt-1 text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                        {lesson.summary}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Lesson Deep Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              
              {/* Top Lesson Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-amber-500/10 px-2.5 py-0.5 text-xs font-black text-amber-400 border border-amber-500/20">
                      الوحدة {activeLesson.moduleNumber}
                    </span>
                    <span className="rounded-lg bg-zinc-800 px-2.5 py-0.5 text-xs font-bold text-zinc-300">
                      {activeLesson.level === 'beginner' ? 'مستوى مبتدئ' : activeLesson.level === 'intermediate' ? 'مستوى متوسط' : 'مستوى متقدم'}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">
                      ⏱ {activeLesson.estimatedMinutes} دقيقة قراءة وتطبيق
                    </span>
                  </div>

                  <h2 className="mt-2 text-xl sm:text-2xl font-black text-white">
                    {activeLesson.title}
                  </h2>
                  <p className="mt-1 text-xs text-zinc-400 font-mono">
                    {activeLesson.titleEn}
                  </p>
                </div>

                {/* Mark Completed Button */}
                <button
                  onClick={() => toggleLessonCompleted(activeLesson.id)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs sm:text-sm font-black transition-all shrink-0 border ${
                    completedLessonIds.includes(activeLesson.id)
                      ? 'border-emerald-500/60 bg-emerald-500/20 text-emerald-300'
                      : 'border-zinc-700 bg-zinc-800 text-zinc-200 hover:border-amber-500 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className={`h-4 w-4 ${completedLessonIds.includes(activeLesson.id) ? 'text-emerald-400 fill-emerald-400/20' : ''}`} />
                  <span>
                    {completedLessonIds.includes(activeLesson.id) ? 'تم إكمال الدرس بنجاح ✓' : 'علم كدرس مكتمل'}
                  </span>
                </button>
              </div>

              {/* Lesson Summary & Key Takeaways */}
              <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                  <Lightbulb className="h-4 w-4" />
                  <span>النقاط الجوهرية للدرس (Key Takeaways):</span>
                </div>
                <ul className="mt-3 space-y-2">
                  {activeLesson.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Breakdown Sections */}
              <div className="mt-8 space-y-6">
                {activeLesson.sections.map((sec, idx) => (
                  <div key={idx} className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5">
                    <h3 className="text-base sm:text-lg font-black text-white">
                      {sec.heading}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal whitespace-pre-line">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Real World Practical Example */}
              <div className="mt-8 rounded-3xl border border-cyan-500/30 bg-cyan-950/20 p-5 sm:p-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-black text-cyan-400 uppercase tracking-wider">
                    <Target className="h-4 w-4" />
                    <span>دراسة حالة عملية حقيقية (Real-World Case Study)</span>
                  </div>
                  <span className="rounded-lg bg-cyan-500/10 px-2 py-0.5 text-[11px] font-bold text-cyan-300 border border-cyan-500/20">
                    {activeLesson.practicalExample.niche}
                  </span>
                </div>

                <div className="mt-3 font-bold text-sm sm:text-base text-white">
                  المنتج المستهدف: <span className="text-cyan-300">{activeLesson.practicalExample.product}</span>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/60">
                  {activeLesson.practicalExample.scenario}
                </p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeLesson.practicalExample.breakdown.map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-cyan-500/20 bg-zinc-950/70 p-2.5 text-[11px] text-zinc-300 font-medium flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">#{idx + 1}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ready-to-use Templates (if available) */}
              {activeLesson.templates && activeLesson.templates.length > 0 && (
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-black text-amber-400">
                    <FileText className="h-4 w-4" />
                    <span>قوالب ونصوص جاهزة للنسخ والاستخدام:</span>
                  </div>

                  {activeLesson.templates.map((tpl) => (
                    <div key={tpl.id} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                      <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-800">
                        <div>
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{tpl.category}</span>
                          <h4 className="text-sm font-black text-white">{tpl.title}</h4>
                        </div>
                        <button
                          onClick={() => handleCopy(tpl.content, tpl.id, 'تم نسخ القالب بنجاح')}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all active:scale-95"
                        >
                          {copiedId === tpl.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copiedId === tpl.id ? 'تم النسخ!' : 'نسخ القالب'}</span>
                        </button>
                      </div>
                      <pre className="mt-3 text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80">
                        {tpl.content}
                      </pre>
                    </div>
                  ))}
                </div>
              )}

              {/* Step by Step Execution Instructions */}
              <div className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5">
                <h4 className="text-xs font-black text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400" />
                  <span>خطوات التنفيذ المباشرة:</span>
                </h4>
                <div className="mt-4 space-y-3">
                  {activeLesson.stepByStep.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-xs font-black text-amber-400">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice Task & Challenge Cards */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Practice Task */}
                <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5">
                  <span className="rounded-lg bg-orange-500/20 px-2 py-0.5 text-[10px] font-black text-orange-400 uppercase">
                    مهمة تطبيقية عملية
                  </span>
                  <h4 className="mt-2 text-sm sm:text-base font-black text-white">
                    {activeLesson.practiceTask.title}
                  </h4>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-zinc-300">
                    {activeLesson.practiceTask.instructions.map((inst, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-orange-400 font-bold">•</span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-orange-500/20 text-[11px] text-zinc-400 font-semibold">
                    المخرج النهائي: <span className="text-orange-300">{activeLesson.practiceTask.deliverable}</span>
                  </div>
                </div>

                {/* Challenge */}
                <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-purple-500/20 px-2 py-0.5 text-[10px] font-black text-purple-400 uppercase">
                        تحدي الدرس
                      </span>
                      <span className="text-xs font-mono font-black text-purple-300">
                        +{activeLesson.challenge.xp} XP
                      </span>
                    </div>
                    <h4 className="mt-2 text-sm sm:text-base font-black text-white">
                      {activeLesson.challenge.title}
                    </h4>
                    <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                      {activeLesson.challenge.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => toggleLessonCompleted(activeLesson.id)}
                      className="w-full rounded-xl bg-purple-500/20 border border-purple-500/40 py-2 text-xs font-black text-purple-300 hover:bg-purple-500 hover:text-black transition-all"
                    >
                      {completedLessonIds.includes(activeLesson.id) ? 'تم إنجاز التحدي والدرس ✓' : 'إنجاز التحدي وإكمال الدرس'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Short Quiz */}
              {activeLesson.quiz && activeLesson.quiz.length > 0 && (
                <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                  <div className="flex items-center gap-2 text-sm font-black text-amber-400">
                    <HelpCircle className="h-4 w-4" />
                    <span>اختبار الفهم السريع للوحدة {activeLesson.moduleNumber}</span>
                  </div>

                  <div className="mt-4 space-y-6">
                    {activeLesson.quiz.map((q) => {
                      const selected = quizAnswers[q.id];
                      const isAnswered = selected !== undefined;
                      const isCorrect = selected === q.correctIndex;

                      return (
                        <div key={q.id} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4">
                          <p className="text-sm font-bold text-white">
                            {q.question}
                          </p>

                          <div className="mt-3 space-y-2">
                            {q.options.map((opt, optIdx) => {
                              const isThisSelected = selected === optIdx;
                              let btnClass = 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700';

                              if (isAnswered) {
                                if (optIdx === q.correctIndex) {
                                  btnClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-bold';
                                } else if (isThisSelected) {
                                  btnClass = 'border-rose-500 bg-rose-500/20 text-rose-200';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  disabled={isAnswered}
                                  onClick={() => {
                                    setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
                                  }}
                                  className={`w-full text-start rounded-xl p-3 text-xs transition-all border flex items-center justify-between ${btnClass}`}
                                >
                                  <span>{opt}</span>
                                  {isAnswered && optIdx === q.correctIndex && (
                                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {isAnswered && (
                            <div className={`mt-3 rounded-xl p-3 text-xs leading-relaxed border ${
                              isCorrect ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                            }`}>
                              <span className="font-bold">{isCorrect ? 'إجابة صحيحة! ' : 'إجابة غير دقيقة: '}</span>
                              <span>{q.explanation}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Next/Prev Module Navigation */}
              <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between gap-4">
                {activeLesson.moduleNumber > 1 ? (
                  <button
                    onClick={() => {
                      const prev = ugcLessons.find((l) => l.moduleNumber === activeLesson.moduleNumber - 1);
                      if (prev) setSelectedLessonId(prev.id);
                    }}
                    className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all"
                  >
                    <span>الوحدة السابقة</span>
                  </button>
                ) : <div />}

                {activeLesson.moduleNumber < ugcLessons.length ? (
                  <button
                    onClick={() => {
                      const next = ugcLessons.find((l) => l.moduleNumber === activeLesson.moduleNumber + 1);
                      if (next) setSelectedLessonId(next.id);
                    }}
                    className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-xs font-black text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
                  >
                    <span>الانتقال للوحدة التالية ({activeLesson.moduleNumber + 1})</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveMainSection('challenge')}
                    className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-2.5 text-xs font-black text-black hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <span>بدء تحدي الـ 7 أيام 🚀</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: UGC PRICING CALCULATOR */}
      {activeMainSection === 'calculator' && (
        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-10 backdrop-blur-xl">
          <div className="max-w-3xl">
            <span className="rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-400 border border-amber-500/20">
              أداة تسعير احترافية
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
              حاسبة تسعير خدمات الـ UGC وتوليد عروض الأسعار
            </h2>
            <p className="mt-2 text-sm text-zinc-300 leading-relaxed font-medium">
              احسب تسعيرك العادل لكل عميل بناءً على حجم الباقة، عدد الهوكات الإضافية لاختبار الإعلانات، المواد الخام، ومدة ترخيص الإعلانات الممولة.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Package Selector */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <label className="text-xs font-black text-zinc-300 block mb-3 uppercase tracking-wider">
                  1. حجم حزمة الفيديوهات المطلوبة
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'single', label: 'فيديو واحد', desc: '1 Video (120$)' },
                    { id: '3-pack', label: 'باقة 3 فيديوهات', desc: '3 Videos (320$)' },
                    { id: '5-pack', label: 'باقة 5 فيديوهات', desc: '5 Videos (500$)' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setCalcPackage(p.id as any)}
                      className={`rounded-2xl p-3 text-center border transition-all ${
                        calcPackage === p.id
                          ? 'border-amber-500 bg-amber-500/15 text-white font-bold ring-1 ring-amber-500/30'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-black">{p.label}</div>
                      <div className="text-[10px] text-zinc-500 mt-1">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Hooks Slider */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-zinc-300 uppercase tracking-wider">
                    2. عدد الافتتاحيات الإضافية (Extra Hooks)
                  </label>
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-mono font-black text-amber-400">
                    +{calcExtraHooks} هوكات (+{extraHooksPrice}$)
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5}
                  value={calcExtraHooks}
                  onChange={(e) => setCalcExtraHooks(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <p className="mt-2 text-[11px] text-zinc-500 leading-tight">
                  تمنح المتجر 3 خيارات مختلفة لبداية الإعلان، مما يضاعف فرص نجاح الحملة دون إعادة تصوير الفيديو كاملاً. (35$ لكل هوك إضافي).
                </p>
              </div>

              {/* Raw Footage Toggle */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-black text-white">
                    3. تسليم المقاطع والمواد الخام (Raw Footage)
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    إعطاء لقطات الـ B-Roll الخام لفريق مونتاج البراند (+40% من قيمة الفيديو).
                  </div>
                </div>
                <button
                  onClick={() => setCalcIncludeRaw(!calcIncludeRaw)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    calcIncludeRaw ? 'bg-amber-500' : 'bg-zinc-800'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      calcIncludeRaw ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Paid Ad Rights Duration */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <label className="text-xs font-black text-zinc-300 block mb-3 uppercase tracking-wider">
                  4. ترخيص حقوق الإعلانات الممولة (Paid Advertising Rights)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'none', label: 'عضوي فقط', desc: '0%' },
                    { id: '30', label: '30 يوماً', desc: '+25%' },
                    { id: '60', label: '60 يوماً', desc: '+45%' },
                    { id: '90', label: '90 يوماً', desc: '+65%' }
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setCalcAdRightsDays(r.id as any)}
                      className={`rounded-xl p-2.5 text-center border transition-all ${
                        calcAdRightsDays === r.id
                          ? 'border-amber-500 bg-amber-500/15 text-white font-bold'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{r.label}</div>
                      <div className="text-[10px] text-zinc-500">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote Output Preview */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 shadow-2xl">
                <div className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>ملخص الفاتورة وعرض السعر المقترح:</span>
                </div>

                <div className="mt-4 pb-4 border-b border-zinc-800 space-y-2.5 text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span>الباقة الأساسية ({calcPackage}):</span>
                    <span className="font-mono font-bold text-white">${basePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>افتتاحيات إضافية ({calcExtraHooks} Hooks):</span>
                    <span className="font-mono font-bold text-white">${extraHooksPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المقاطع الخام (Raw Footage):</span>
                    <span className="font-mono font-bold text-white">${rawFootagePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>حقوق الإعلانات الممولة ({calcAdRightsDays === 'none' ? 'استخدام عضوي' : `${calcAdRightsDays} يوماً`}):</span>
                    <span className="font-mono font-bold text-white">${adRightsPrice}</span>
                  </div>
                </div>

                <div className="mt-4 pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-zinc-400 font-bold block">إجمالي عرض السعر:</span>
                    <span className="text-3xl font-black text-amber-400 font-mono">${totalQuote}</span>
                  </div>
                  <div className="text-end">
                    <span className="text-[10px] text-emerald-400 font-bold block">متوسط الربح التقريبي</span>
                    <span className="text-xs text-zinc-400">لكل ساعة تصوير: ~{Math.round(totalQuote / 3)}$</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => {
                      const quoteText = `مرحباً فريق التسويق،\nيسعدني تقديم عرض السعر المخصص لحملتكم:\n- الباقة: ${calcPackage} (${basePrice}$)\n- افتتاحيات إضافية لاختبار الإعلانات: ${calcExtraHooks} هوكات (${extraHooksPrice}$)\n- لقطات خام كاملة (Raw Footage): ${calcIncludeRaw ? 'نعم' : 'لا'} (${rawFootagePrice}$)\n- ترخيص استخدام الإعلانات الممولة: ${calcAdRightsDays} يوماً (${adRightsPrice}$)\n\nالإجمالي النهائي: ${totalQuote}$\nمدة التسليم: 3-5 أيام عمل بعد وصول المنتج.`;
                      handleCopy(quoteText, 'quote-calc', 'تم نسخ عرض السعر المالي بنجاح!');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 py-3 text-xs sm:text-sm font-black text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 active:scale-95"
                  >
                    <Copy className="h-4 w-4" />
                    <span>نسخ عرض السعر لإرساله للعميل</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: SCRIPT & HOOK GENERATOR */}
      {activeMainSection === 'script-generator' && (
        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-10 backdrop-blur-xl">
          <div className="max-w-3xl">
            <span className="rounded-lg bg-orange-500/10 px-3 py-1 text-xs font-black text-orange-400 border border-orange-500/20">
              أداة إبداعية فورية
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
              مولد سكربتات الـ UGC السداسي الخاطف
            </h2>
            <p className="mt-2 text-sm text-zinc-300 leading-relaxed font-medium">
              اكتب معلومات منتجك والمشكلة التي يعالجها، وسيتكفل المولد بصياغة سكربت احترافي جاهز للتصوير في 30 ثانية بتسلسل: Hook → Problem → Product → Experience → Benefits → CTA.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                  1. اسم المنتج ومجاله:
                </label>
                <input
                  type="text"
                  value={genProduct}
                  onChange={(e) => setGenProduct(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                  placeholder="مثال: شامبو مقوي بالكيراتين وزيت الأرغان"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                  2. المشكلة أو الألم الذي يعاني منه المشتري:
                </label>
                <input
                  type="text"
                  value={genPainPoint}
                  onChange={(e) => setGenPainPoint(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                  placeholder="مثال: تساقط الشعر المفرط وجفافه بعد الاستحمام"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                  3. الميزة أو التحول الأساسي بعد الاستخدام:
                </label>
                <input
                  type="text"
                  value={genKeyBenefit}
                  onChange={(e) => setGenKeyBenefit(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                  placeholder="مثال: كثافة ملحوظة ولمعان طبيعي من أول أسبوع"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                  4. نمط وزاوية السكربت (Format Style):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'problem-solution', label: 'المشكلة والحل' },
                    { id: 'unboxing', label: 'فتح صندوق حماسي' },
                    { id: '3-reasons', label: '3 أسباب مقنعة' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setGenFormat(f.id as any)}
                      className={`rounded-xl p-2.5 text-xs font-bold border transition-all ${
                        genFormat === f.id
                          ? 'border-amber-500 bg-amber-500 text-black'
                          : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                      السكربت المولد (جاهز للتصوير)
                    </span>
                    <button
                      onClick={() => handleCopy(generatedScript, 'gen-script', 'تم نسخ السكربت بنجاح!')}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all active:scale-95"
                    >
                      {copiedId === 'gen-script' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedId === 'gen-script' ? 'تم النسخ!' : 'نسخ السكربت'}</span>
                    </button>
                  </div>

                  <pre className="mt-4 text-xs sm:text-sm text-zinc-200 font-sans whitespace-pre-wrap leading-relaxed">
                    {generatedScript}
                  </pre>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 text-[11px] text-zinc-500">
                  💡 نصيحة: احفظ السكربت في هاتفك واقرأه بصوت طبيعي أمام الكاميرا دون النظر لأسفل الشاشة باستمرار.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: 7-DAY UGC CHALLENGE */}
      {activeMainSection === 'challenge' && (
        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-10 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-800 pb-6">
            <div>
              <span className="rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-400 border border-emerald-500/20">
                برنامج عملي تطبيقي مكثف
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                تحدي الـ 7 أيام: من الصفر إلى أول تواصل مع الشركات
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                خطة عمل يومية محددة تقودك لإطلاق بورتفوليو احترافي ومراسلة 15 علامة تجارية في أسبوع واحد فقط.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center shrink-0">
              <div className="text-xs text-zinc-400 font-bold">أيام مكتملة:</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {completedDays.length} / 7
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {sevenDayUgcPlan.map((dayItem) => {
              const isDone = completedDays.includes(dayItem.day);

              return (
                <div
                  key={dayItem.day}
                  className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                    isDone
                      ? 'border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/20'
                      : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleChallengeDay(dayItem.day)}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-sm font-black transition-all ${
                          isDone
                            ? 'border-emerald-500 bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                            : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500'
                        }`}
                      >
                        {isDone ? '✓' : `D${dayItem.day}`}
                      </button>

                      <div>
                        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                          <span>{dayItem.title}</span>
                          {isDone && (
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              مكتمل
                            </span>
                          )}
                        </h3>
                        <p className="mt-1 text-xs text-amber-400 font-bold">
                          التركيز الأساسي: {dayItem.focus}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleChallengeDay(dayItem.day)}
                      className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                        isDone
                          ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                          : 'border border-zinc-700 bg-zinc-800 text-zinc-200 hover:border-zinc-500 hover:text-white'
                      }`}
                    >
                      {isDone ? 'إلغاء التحديد' : 'تحديد اليوم كمكتمل'}
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-8">
                      <span className="text-[11px] font-bold text-zinc-400 block mb-2">
                        المهام المطلوبة اليوم:
                      </span>
                      <ul className="space-y-1.5">
                        {dayItem.tasks.map((task, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="sm:col-span-4 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3 flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                        مخرج اليوم النهائي (Deliverable):
                      </span>
                      <span className="mt-1 text-xs font-semibold text-white">
                        {dayItem.deliverable}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
