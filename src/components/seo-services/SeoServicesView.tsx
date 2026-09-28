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
  Calendar, 
  RotateCcw, 
  FileText,
  Target,
  Layers,
  Settings,
  Globe,
  Sliders,
  Award,
  Filter,
  ExternalLink,
  Info,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  MessageSquare,
  Wrench,
  CheckSquare
} from 'lucide-react';
import { 
  seoStagesCurriculum, 
  seoServicesComparisonList, 
  seoOutreachTemplates, 
  localSeoPracticalCaseStudy, 
  SeoLesson 
} from '../../data/seoServicesData';
import { SeoAuditGenerator } from './SeoAuditGenerator';
import { SeoPricingCalculator } from './SeoPricingCalculator';
import { SeoBeforeAfterComparator } from './SeoBeforeAfterComparator';
import { SeoServiceSelectorTool } from './SeoServiceSelectorTool';

interface SeoServicesViewProps {
  onNavigate: (tab: string) => void;
  onCopyText: (text: string, label: string) => void;
}

const SEO_COMPLETED_LESSONS_KEY = 'rikouzone_seo_completed_lessons';

export const SeoServicesView: React.FC<SeoServicesViewProps> = ({ onNavigate, onCopyText }) => {
  // 1. Navigation tabs
  const [activeTab, setActiveTab] = useState<
    'stages' | 'selector' | 'audit' | 'pricing' | 'before-after' | 'templates' | 'case-study'
  >('stages');

  // 2. Active lesson
  const [activeLessonId, setActiveLessonId] = useState<string>(seoStagesCurriculum[0].id);

  // 3. Completed lessons state
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SEO_COMPLETED_LESSONS_KEY);
      return stored ? JSON.parse(stored) : [seoStagesCurriculum[0].id];
    } catch {
      return [seoStagesCurriculum[0].id];
    }
  });

  // 4. Certificate state
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateName, setCertificateName] = useState('أيوب بوناصر');

  useEffect(() => {
    try {
      localStorage.setItem(SEO_COMPLETED_LESSONS_KEY, JSON.stringify(completedLessons));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessons]);

  const toggleLessonCompletion = (id: string) => {
    setCompletedLessons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentLessonIndex = seoStagesCurriculum.findIndex((l) => l.id === activeLessonId);
  const currentLesson: SeoLesson = seoStagesCurriculum[currentLessonIndex] || seoStagesCurriculum[0];

  const handleNextLesson = () => {
    if (currentLessonIndex < seoStagesCurriculum.length - 1) {
      setActiveLessonId(seoStagesCurriculum[currentLessonIndex + 1].id);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setActiveLessonId(seoStagesCurriculum[currentLessonIndex - 1].id);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const completionPercentage = Math.round(
    (completedLessons.length / seoStagesCurriculum.length) * 100
  );

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 pb-24">
      {/* Top Breadcrumb & Return to Income */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => onNavigate('income')}
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            <span>العودة لكافة مسارات الدخل</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
            <span className="text-zinc-600">المسار:</span>
            <span className="text-amber-400">خدمات تحسين محركات البحث (SEO Services)</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="relative border-b border-zinc-800/80 bg-gradient-to-b from-amber-500/10 via-zinc-950/60 to-transparent py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>دليل العمل الحر الشامل 2026</span>
            </span>
            <span className="rounded-full bg-zinc-800/80 px-3 py-1 text-xs font-semibold text-zinc-300">
              14 مرحلة تعليمية عملية
            </span>
            <span className="rounded-full bg-zinc-800/80 px-3 py-1 text-xs font-semibold text-zinc-300">
              بدون شركة وبدون فريق
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                دليل تقديم وبيع <span className="text-amber-400">خدمات السيو (SEO Services)</span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                تعلم كيف تقدم وتبيع خدمات تحسين محركات البحث من الصفر: من أول فحص وتدقيق (SEO Audit) لموقع العميل، مروراً ببحث الكلمات والسيو المحلي، وحتى صياغة استراتيجية 90 يوماً وإغلاق عقود شهرية ثابتة بقيمة <span className="text-amber-400 font-bold">$400 - $1,800+ شهرياً</span>.
              </p>
            </div>

            {/* Completion Progress Widget */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-5 min-w-[280px] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-300">نسبة التقدم في المسار:</span>
                <span className="text-amber-400 font-mono text-sm">{completionPercentage}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                <span>{completedLessons.length} من أصل 14 مرحلة مكتملة</span>
                {completionPercentage >= 70 && (
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="text-amber-400 hover:underline font-bold flex items-center gap-1"
                  >
                    <Award className="h-3.5 w-3.5" />
                    <span>عرض الشهادة</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Tab Navigation */}
      <div className="sticky top-16 z-30 border-b border-zinc-800/90 bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
            {[
              { id: 'stages', label: 'المراحل الـ 14 التعليمية', icon: BookOpen },
              { id: 'selector', label: 'اختيار الخدمة ومقارنة الخدمات', icon: Target },
              { id: 'audit', label: 'أداة ومولد تقرير SEO Audit', icon: Search },
              { id: 'pricing', label: 'حاسبة تسعير الخدمات', icon: DollarSign },
              { id: 'before-after', label: 'تحسين On-Page (قبل وبعد)', icon: Layers },
              { id: 'templates', label: 'قوالب وسكربتات العملاء', icon: MessageSquare },
              { id: 'case-study', label: 'مشروع تطبيقي محلي واقعي', icon: Globe }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    window.scrollTo({ top: 320, behavior: 'smooth' });
                  }}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        {/* TAB 1: 14 STAGES CURRICULUM */}
        {activeTab === 'stages' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar list of stages */}
            <div className="lg:col-span-4 space-y-2">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  مراحل الدليل الـ 14:
                </span>
                <span className="text-xs text-amber-400 font-bold font-mono">
                  {completedLessons.length}/14
                </span>
              </div>

              <div className="space-y-1.5 max-h-[720px] overflow-y-auto pr-1">
                {seoStagesCurriculum.map((lesson, idx) => {
                  const isActive = lesson.id === activeLessonId;
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveLessonId(lesson.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className={`w-full text-right p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer select-none ${
                        isActive
                          ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                          : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      <button
                        type="button"
                        aria-label="تبديل حالة الإكمال"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonCompletion(lesson.id);
                        }}
                        className="mt-0.5 shrink-0 text-zinc-500 hover:text-amber-400 transition-colors cursor-pointer"
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-400/20" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 text-[10px] text-zinc-500 font-bold">
                          <span>المرحلة {lesson.stageNumber}</span>
                          <span className="font-mono text-zinc-400">{lesson.duration}</span>
                        </div>
                        <div className="text-xs font-bold line-clamp-1 mt-0.5 text-zinc-200">
                          {lesson.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lesson Reader Area */}
            <div className="lg:col-span-8 space-y-6">
              <article className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl">
                {/* Lesson Header */}
                <div className="space-y-3 border-b border-zinc-800 pb-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-amber-400">
                      {currentLesson.stageTitle}
                    </span>
                    <span className="rounded-full bg-zinc-900 px-2.5 py-0.5 text-[11px] font-bold text-zinc-300 border border-zinc-800">
                      المستوى: {currentLesson.level} • {currentLesson.duration}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                    {currentLesson.title}
                  </h2>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {currentLesson.summary}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => toggleLessonCompletion(currentLesson.id)}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                        completedLessons.includes(currentLesson.id)
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-amber-500/50'
                      }`}
                    >
                      {completedLessons.includes(currentLesson.id) ? (
                        <>
                          <Check className="h-4 w-4 stroke-[3]" />
                          <span>تم إكمال هذه المرحلة بنجاح</span>
                        </>
                      ) : (
                        <>
                          <Circle className="h-4 w-4" />
                          <span>تحديد المرحلة كمكتملة</span>
                        </>
                      )}
                    </button>

                    <div className="text-xs text-zinc-500 font-mono">
                      المرحلة {currentLesson.stageNumber} من 14
                    </div>
                  </div>
                </div>

                {/* What you will learn */}
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                    <Target className="h-4 w-4" />
                    <span>ما ستتقنه في هذه المرحلة:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {currentLesson.whatYouWillLearn.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Main Detailed Content */}
                <div className="prose prose-invert prose-zinc max-w-none text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-4">
                  {currentLesson.detailedContent.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={idx} className="text-lg sm:text-xl font-black text-white pt-4 pb-1 border-b border-zinc-800/80">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('#### ')) {
                      return (
                        <h4 key={idx} className="text-base font-bold text-amber-300 pt-2">
                          {paragraph.replace('#### ', '')}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('* ')) {
                      const items = paragraph.split('\n* ');
                      return (
                        <ul key={idx} className="space-y-1.5 list-disc list-inside text-zinc-300">
                          {items.map((item, i) => (
                            <li key={i} className="leading-relaxed">{item.replace('* ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={idx} className="leading-relaxed text-zinc-300 whitespace-pre-line">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Action Steps Checklist */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-wider">
                    <CheckSquare className="h-4 w-4 text-emerald-400" />
                    <span>خطوات تطبيقية للمبتدئ (Action Steps):</span>
                  </div>
                  <div className="space-y-2">
                    {currentLesson.actionSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[10px] font-bold text-amber-400 font-mono">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro Tip & Mistake Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <Sparkles className="h-4 w-4" />
                      <span>نصيحة محترف (Pro Tip):</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {currentLesson.proTip}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span>تجنب هذا الخطأ الشائع:</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {currentLesson.commonMistake}
                    </p>
                  </div>
                </div>

                {/* Copyable Resource if present */}
                {currentLesson.copyableResource && (
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">
                          {currentLesson.copyableResource.title}
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          {currentLesson.copyableResource.description}
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          onCopyText(
                            currentLesson.copyableResource!.content,
                            currentLesson.copyableResource!.title
                          )
                        }
                        className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-black hover:bg-amber-400 transition-colors"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span>نسخ القالب</span>
                      </button>
                    </div>

                    <pre className="max-h-48 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap dir-ltr text-right">
                      {currentLesson.copyableResource.content}
                    </pre>
                  </div>
                )}

                {/* Bottom Navigation between lessons */}
                <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                  <button
                    onClick={handlePrevLesson}
                    disabled={currentLessonIndex === 0}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      currentLessonIndex === 0
                        ? 'opacity-40 cursor-not-allowed text-zinc-500'
                        : 'border border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
                    }`}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>المرحلة السابقة</span>
                  </button>

                  <button
                    onClick={handleNextLesson}
                    disabled={currentLessonIndex === seoStagesCurriculum.length - 1}
                    className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all ${
                      currentLessonIndex === seoStagesCurriculum.length - 1
                        ? 'opacity-40 cursor-not-allowed text-zinc-500'
                        : 'bg-amber-500 text-black hover:bg-amber-400 shadow-md font-black'
                    }`}
                  >
                    <span>المرحلة التالية</span>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
              </article>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICE SELECTOR & MATRIX */}
        {activeTab === 'selector' && (
          <SeoServiceSelectorTool
            onSelectService={(serviceId) => {
              setActiveTab('stages');
              const found = seoStagesCurriculum.find((l) =>
                l.title.toLowerCase().includes(serviceId) || l.id.includes(serviceId)
              );
              if (found) setActiveLessonId(found.id);
            }}
          />
        )}

        {/* TAB 3: AUDIT GENERATOR */}
        {activeTab === 'audit' && (
          <SeoAuditGenerator onCopyText={onCopyText} />
        )}

        {/* TAB 4: PRICING CALCULATOR */}
        {activeTab === 'pricing' && (
          <SeoPricingCalculator onCopyText={onCopyText} />
        )}

        {/* TAB 5: BEFORE / AFTER ON-PAGE */}
        {activeTab === 'before-after' && (
          <SeoBeforeAfterComparator onCopyText={onCopyText} />
        )}

        {/* TAB 6: TEMPLATES & SCRIPTS */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h3 className="text-2xl font-black text-white">
                قوالب التواصل والسكربتات الجاهزة للنسخ (Outreach & Proposal Scripts)
              </h3>
              <p className="mt-1 text-sm text-zinc-400">
                سكربتات احترافية مجربة للتواصل البارد، مكالمات الاستكشاف، عروض الأسعار، والمتابعة الذكية.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seoOutreachTemplates.map((template) => (
                <div
                  key={template.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">
                        {template.subject}
                      </span>
                      <button
                        onClick={() => onCopyText(template.body, template.title)}
                        className="flex items-center gap-1.5 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span>نسخ</span>
                      </button>
                    </div>

                    <h4 className="text-base font-bold text-white">
                      {template.title}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {template.description}
                    </p>

                    <pre className="mt-3 max-h-56 overflow-y-auto whitespace-pre-wrap rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4 font-mono text-xs text-zinc-300 leading-relaxed dir-ltr text-right">
                      {template.body}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: LOCAL SEO CASE STUDY */}
        {activeTab === 'case-study' && (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-8 backdrop-blur-xl space-y-8">
            <div className="border-b border-zinc-800 pb-5">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                مشروع تطبيقي واقعي كامل
              </span>
              <h3 className="mt-1 text-2xl font-black text-white">
                دراسة حالة: {localSeoPracticalCaseStudy.businessName}
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                {localSeoPracticalCaseStudy.niche} • {localSeoPracticalCaseStudy.location}
              </p>
            </div>

            {/* Problem statement */}
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-2">
              <div className="text-xs font-bold text-rose-400 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span>المشكلة والتحدي الأولي للعميل:</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {localSeoPracticalCaseStudy.problem}
              </p>
            </div>

            {/* 4 Weeks Action Plan */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">
                خطة التنفيذ خطوة بخطوة خلال 4 أسابيع:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localSeoPracticalCaseStudy.actionPlanExecution.map((plan, i) => (
                  <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-1.5">
                    <div className="text-xs font-bold text-amber-400">
                      {plan.week}
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {plan.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Results comparison table */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">
                النتائج الملموسة بعد 45 يوماً فقط:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {localSeoPracticalCaseStudy.resultsAfter45Days.map((res, i) => (
                  <div key={i} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
                    <div className="text-xs text-zinc-400 font-medium">{res.metric}</div>
                    <div className="text-xs text-rose-400 line-through">قبل: {res.before}</div>
                    <div className="text-sm font-black text-emerald-400 font-mono">بعد: {res.after}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Takeaway */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-xs text-zinc-200 leading-relaxed">
              <span className="font-bold text-amber-400">الدرس المستفاد للمبتدئ: </span>
              {localSeoPracticalCaseStudy.keyTakeaway}
            </div>
          </div>
        )}
      </main>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-amber-500/40 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                <span className="text-sm font-black text-white">شهادة إتمام مسار خدمات تحسين محركات البحث</span>
              </div>
              <button
                onClick={() => setShowCertificate(false)}
                className="text-zinc-400 hover:text-white text-xs font-bold"
              >
                ✕ إغلاق
              </button>
            </div>

            {/* Certificate Canvas Mock */}
            <div className="rounded-2xl border-2 border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-zinc-900 to-zinc-950 p-8 text-center space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
                شهادة إنجاز معتمدة • RikouZone Academy
              </div>
              <h3 className="text-2xl font-black text-white">
                أخصائي خدمات تحسين محركات البحث (SEO Specialist)
              </h3>
              <p className="text-xs text-zinc-400">تشهد المنصة بأن:</p>
              
              <div className="inline-block border-b-2 border-amber-400 pb-1 px-6">
                <input
                  type="text"
                  value={certificateName}
                  onChange={(e) => setCertificateName(e.target.value)}
                  className="bg-transparent text-xl font-black text-amber-300 text-center focus:outline-none"
                  placeholder="اسمك هنا"
                />
              </div>

              <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                قد أتم بنجاح دراسة المراحل الـ 14 العملية لإدارة وتدقيق وتطبيق خدمات السيو وبحث الكلمات المفتاحية واستراتيجيات التسعير وإغلاق العقود للعملاء.
              </p>

              <div className="pt-4 flex items-center justify-between text-[11px] text-zinc-500 border-t border-zinc-800">
                <span>تاريخ الإنجاز: {new Date().toLocaleDateString('ar-EG')}</span>
                <span className="font-mono text-amber-400">الكود المعتمد: RZ-SEO-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-bold text-zinc-200 hover:bg-zinc-800"
              >
                طباعة / حفظ كـ PDF
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-black text-black hover:bg-amber-400"
              >
                تم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
