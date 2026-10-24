import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Target, 
  HelpCircle, 
  AlertTriangle, 
  Layers, 
  Bookmark, 
  Share2, 
  Compass, 
  Lightbulb, 
  Check, 
  TrendingUp, 
  ShieldCheck, 
  Zap,
  RotateCcw,
  CheckSquare,
  Code,
  Copy,
  Table,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { UnifiedRikouLesson } from '../../types/lessonTypes';
import { RikouVisualAid } from './RikouVisualAid';
import { RikouInteractiveActivity } from './RikouInteractiveActivity';
import { RikouLessonQuiz } from './RikouLessonQuiz';
import { RikouLessonAssignment } from './RikouLessonAssignment';
import { 
  isLessonCompleted, 
  recordLessonCompletion 
} from '../../utils/lessonProgressStorage';
import { useLanguage } from '../../i18n/LanguageContext';

interface RikouLessonReaderProps {
  lesson: UnifiedRikouLesson;
  onNavigateBack?: () => void;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  hasNextLesson?: boolean;
  hasPrevLesson?: boolean;
  totalLessons?: number;
  currentLessonIndex?: number;
  onCopyText?: (text: string, label: string) => void;
}

export const RikouLessonReader: React.FC<RikouLessonReaderProps> = ({
  lesson,
  onNavigateBack,
  onNextLesson,
  onPrevLesson,
  hasNextLesson = false,
  hasPrevLesson = false,
  totalLessons = 1,
  currentLessonIndex = 0,
  onCopyText
}) => {
  const { isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const PrevArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  const [completed, setCompleted] = useState<boolean>(() => 
    isLessonCompleted(lesson.trackId, lesson.id)
  );
  const [xpCelebration, setXpCelebration] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sync completion state when switching lesson
  useEffect(() => {
    setCompleted(isLessonCompleted(lesson.trackId, lesson.id));
    setXpCelebration(null);
  }, [lesson.id, lesson.trackId]);

  const handleCopyCode = (text: string) => {
    navigator.clipboard?.writeText(text);
    if (onCopyText) {
      onCopyText(text, 'تم نسخ الكود بنجاح');
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCompleteLesson = () => {
    if (!completed) {
      const res = recordLessonCompletion(lesson.trackId, lesson.id, lesson.title, 35);
      if (res.xpAwarded > 0) {
        setXpCelebration(res.xpAwarded);
        setTimeout(() => setXpCelebration(null), 3500);
      }
      setCompleted(true);
    }
  };

  const handleXpFromSubactivity = (amount: number) => {
    setXpCelebration(amount);
    setTimeout(() => setXpCelebration(null), 3500);
  };

  return (
    <article className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-16 min-w-0">
      
      {/* XP Celebration Toast */}
      {xpCelebration && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black text-sm shadow-2xl flex items-center gap-2 border-2 border-white">
            <Sparkles className="w-5 h-5 fill-black" />
            <span>مبروك! كسبت +{xpCelebration} XP نقاط خبرة جديدة 🎉</span>
          </div>
        </div>
      )}

      {/* 1. LESSON HEADER & METADATA BAR */}
      <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/60 p-5 sm:p-7 shadow-sm dark:shadow-none space-y-4">
        
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {onNavigateBack && (
              <button
                onClick={onNavigateBack}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-200 transition-colors font-semibold cursor-pointer"
              >
                <PrevArrowIcon className="w-3.5 h-3.5" />
                <span>العودة لقائمة الدروس</span>
              </button>
            )}
            <span className="text-slate-400 dark:text-zinc-500 font-sans hidden xs:inline">/</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold truncate max-w-[160px] sm:max-w-none">
              {lesson.trackTitleAr}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60 font-sans">
              الدرس {lesson.number || currentLessonIndex + 1} من {totalLessons}
            </span>
            {completed && (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>مكتمل ✅</span>
              </span>
            )}
          </div>
        </div>

        {/* Title, Level, Duration Badges */}
        <div className="pt-2">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              المستوى: {lesson.level === 'beginner' ? 'مبتدئ' : lesson.level === 'intermediate' ? 'متوسط' : 'متقدم'}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 flex items-center gap-1 font-sans">
              <Clock className="w-3 h-3" />
              <span>{lesson.durationMinutes} دقيقة دراسة وتطبيق</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            {lesson.title}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
            {lesson.summary}
          </p>
        </div>

        {/* Learning Objective Box */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <Target className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-amber-700 dark:text-amber-300 block mb-0.5">
              🎯 الهدف التعليمي المحدد لهذا الدرس:
            </strong>
            <span>{lesson.objective}</span>
          </div>
        </div>

      </div>

      {/* 2. WHY THIS SKILL MATTERS (مقدمة قصيرة) */}
      <section className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/60 p-5 sm:p-7 shadow-sm dark:shadow-none space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>لماذا هذه المهارة حاسمة في سوق العمل؟</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-zinc-200 font-medium leading-relaxed">
          {lesson.whyItMatters}
        </p>
      </section>

      {/* 3. OFFICIAL RIKOUZONE VISUAL INFOGRAPHIC / DIAGRAM */}
      <section className="space-y-2">
        <RikouVisualAid
          spec={lesson.visualAid}
          trackTitleAr={lesson.trackTitleAr}
          lessonNumber={lesson.number || currentLessonIndex + 1}
        />
      </section>

      {/* 4. BITE-SIZED BREAKDOWN STEPS (شرح مبسط مقسم) */}
      <section className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/60 p-5 sm:p-7 shadow-sm dark:shadow-none space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-zinc-800/80 pb-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              الشرح المبسط والمفصل (خطوة بخطوة)
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              معلومات مركزة بدون حشو، مصممة للمبتدئ لتطبيقها فوراً:
            </p>
          </div>
        </div>

        <div className="space-y-3.5 pt-1">
          {lesson.breakdownSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-950/60 space-y-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500 text-black font-black text-xs font-sans shrink-0">
                  {step.stepNumber}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed pr-8.5">
                {step.explanation}
              </p>

              {step.actionTip && (
                <div className="mt-2 mr-8.5 p-2.5 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>نصيحة سريعة:</strong> {step.actionTip}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. GLOSSARY / JARGON CLARIFIED (توضيح المصطلحات) */}
      {lesson.glossary && lesson.glossary.length > 0 && (
        <section className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/60 p-5 sm:p-7 shadow-sm dark:shadow-none space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>قاموس المصطلحات التقنية والأجنبية في هذا الدرس</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lesson.glossary.map((term, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/70 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-sans">
                    {term.term}
                  </span>
                  {term.arabicName && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                      {term.arabicName}
                    </span>
                  )}
                </div>

                {term.phonetic && (
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 block font-mono">
                    النطق: [{term.phonetic}]
                  </span>
                )}

                <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                  {term.definition}
                </p>

                {term.example && (
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 italic pt-1 border-t border-slate-200 dark:border-zinc-800">
                    💡 مثال: {term.example}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. REALISTIC STEP-BY-STEP CASE STUDY (مثال واقعي) */}
      <section className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/60 p-5 sm:p-7 shadow-sm dark:shadow-none space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>مثال واقعي خطوة بخطوة من الميدان</span>
            </span>
          </div>

          {lesson.realWorldCase.numbersHighlight && (
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-sans">
              {lesson.realWorldCase.numbersHighlight}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {lesson.realWorldCase.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            {lesson.realWorldCase.scenario}
          </p>

          <div className="space-y-2 pt-1">
            {lesson.realWorldCase.stepByStep.map((stepText, sIdx) => (
              <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-zinc-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold font-sans shrink-0 mt-0.5">
                  {sIdx + 1}
                </span>
                <span className="leading-relaxed">{stepText}</span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-900 dark:text-emerald-200 font-semibold leading-relaxed">
            🏆 <strong>النتيجة النهائية:</strong> {lesson.realWorldCase.outcome}
          </div>
        </div>
      </section>

      {/* 6.5 SPECIALIZED DOMAIN FEATURE (كود تفاعلي / مقارنة تصميم / جدول تسويقي ومالي) */}
      {lesson.specialFeature && (
        <section className="space-y-3">
          {lesson.specialFeature.type === 'code' && (
            <div className="rounded-3xl border border-slate-700/80 bg-zinc-950 overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-5 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <Code className="w-4 h-4 text-emerald-400 mr-1" />
                  <span className="font-bold text-zinc-100">{lesson.specialFeature.title}</span>
                  {lesson.specialFeature.language && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-emerald-300 font-mono font-semibold border border-zinc-700">
                      {lesson.specialFeature.language}
                    </span>
                  )}
                </div>

                {lesson.specialFeature.content && (
                  <button
                    onClick={() => handleCopyCode(lesson.specialFeature!.content!)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white transition-all text-xs font-semibold cursor-pointer border border-zinc-700/60 active:scale-95"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ الكود</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <pre className="p-5 text-xs sm:text-sm text-emerald-300 font-mono overflow-x-auto leading-relaxed dir-ltr text-left selection:bg-emerald-500/30">
                <code>{lesson.specialFeature.content}</code>
              </pre>
            </div>
          )}

          {lesson.specialFeature.type === 'design_comparison' && (
            <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/60 p-5 sm:p-7 shadow-sm dark:shadow-none space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{lesson.specialFeature.title}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-rose-300/50 bg-rose-50/70 dark:bg-rose-950/20 dark:border-rose-900/50 space-y-2">
                  <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/30">
                    ❌ التصميم الخاطئ الشائع (قبل)
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-sans">
                    {lesson.specialFeature.beforeAfter?.before}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-emerald-300/50 bg-emerald-50/70 dark:bg-emerald-950/20 dark:border-emerald-900/50 space-y-2">
                  <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                    ✅ التصميم الاحترافي بمعايير RikouZone (بعد)
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-sans">
                    {lesson.specialFeature.beforeAfter?.after}
                  </p>
                </div>
              </div>

              {lesson.specialFeature.beforeAfter?.note && (
                <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-900 dark:text-purple-200 leading-relaxed">
                  💡 <strong>القاعدة الذهبية:</strong> {lesson.specialFeature.beforeAfter.note}
                </div>
              )}
            </div>
          )}

          {(lesson.specialFeature.type === 'financial_table' || lesson.specialFeature.type === 'marketing_funnel') && (
            <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/60 p-5 sm:p-7 shadow-sm dark:shadow-none space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <Table className="w-4 h-4 text-emerald-500" />
                <span>{lesson.specialFeature.title}</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-zinc-800">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-800/70">
                      {lesson.specialFeature.table?.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                    {lesson.specialFeature.table?.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/30 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className={`p-3 text-slate-700 dark:text-zinc-300 whitespace-nowrap ${cIdx === 0 ? 'font-bold text-slate-900 dark:text-white' : ''}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 7. INTERACTIVE HANDS-ON ACTIVITY (تطبيق تفاعلي) */}
      <section className="space-y-2">
        <RikouInteractiveActivity
          exercise={lesson.interactiveExercise}
          trackId={lesson.trackId}
          lessonId={lesson.id}
          onXpEarned={handleXpFromSubactivity}
        />
      </section>

      {/* 8. KNOWLEDGE QUIZ (اختبار قصير مع تصحيح) */}
      <section className="space-y-2">
        <RikouLessonQuiz
          quiz={lesson.quiz}
          trackId={lesson.trackId}
          lessonId={lesson.id}
          lessonTitle={lesson.title}
          onXpEarned={handleXpFromSubactivity}
        />
      </section>

      {/* 9. GOLDEN KEY TAKEAWAYS (خلاصة الدرس) */}
      <section className="rounded-3xl border border-amber-400/40 dark:border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-5 sm:p-7 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>الخلاصة الذهبية لأهم أفكار الدرس</span>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-zinc-200">
          {lesson.keyTakeaways.map((point, kIdx) => (
            <li key={kIdx} className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 stroke-[3]" />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        {lesson.commonMistakeWarning && (
          <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>فخ شائع يجب تجنبه:</strong> {lesson.commonMistakeWarning}
            </p>
          </div>
        )}
      </section>

      {/* 9.5 FAQ SECTION (الأسئلة الشائعة والأخطاء المحتملة) */}
      {lesson.faq && lesson.faq.length > 0 && (
        <section className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/60 p-5 sm:p-7 shadow-sm dark:shadow-none space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>الأسئلة الأكثر شيوعاً حول هذا الموضوع</span>
          </div>

          <div className="space-y-2.5">
            {lesson.faq.map((item, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-950/60 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    className="w-full p-4 flex items-center justify-between gap-3 text-start cursor-pointer hover:bg-slate-100/60 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold text-xs shrink-0 font-sans">
                        س
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {item.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-200/60 dark:border-zinc-800/60">
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed pr-8">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 10. ACTIONABLE PRACTICAL ASSIGNMENT (المهمة العملية) */}
      <section className="space-y-2">
        <RikouLessonAssignment
          assignment={lesson.practicalAssignment}
          trackId={lesson.trackId}
          lessonId={lesson.id}
          onXpEarned={handleXpFromSubactivity}
        />
      </section>

      {/* 11. LESSON COMPLETION ACTION & PREV / NEXT NAVIGATION */}
      <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/60 p-5 sm:p-6 shadow-sm dark:shadow-none space-y-4">
        
        {/* Completion Confirmation Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-zinc-800">
          <div className="text-center sm:text-start">
            <span className="text-xs font-bold text-slate-900 dark:text-white block">
              {completed ? 'أحسنت! هذا الدرس مسجل كمكتمل' : 'هل انتهيت من دراسة وتطبيق محتوى الدرس؟'}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400">
              {completed ? 'نقاط الخبرة مسجلة في ملفك الشخصي' : 'انقر على الزر لتأكيد الإكمال وتحديث شعلة التعلم والأوسمة'}
            </span>
          </div>

          <button
            onClick={handleCompleteLesson}
            disabled={completed}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
              completed
                ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 cursor-default'
                : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black active:scale-95 shadow-amber-500/20'
            }`}
          >
            {completed ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>الدرس مكتمل بنجاح ✅</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>تأكيد إكمال الدرس (+35 XP)</span>
              </>
            )}
          </button>
        </div>

        {/* Prev / Next Lesson Navigation Bar */}
        <div className="flex items-center justify-between gap-3 pt-1">
          {hasPrevLesson ? (
            <button
              onClick={onPrevLesson}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold text-xs transition-all cursor-pointer"
            >
              <PrevArrowIcon className="w-4 h-4" />
              <span>الدرس السابق</span>
            </button>
          ) : (
            <div />
          )}

          {hasNextLesson ? (
            <button
              onClick={onNextLesson}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition-all cursor-pointer shadow-md shadow-amber-500/20 active:scale-95"
            >
              <span>الدرس التالي</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>أكملت مسار الدروس بنجاح!</span>
            </div>
          )}
        </div>

      </div>

    </article>
  );
};
