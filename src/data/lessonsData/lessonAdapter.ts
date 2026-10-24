/**
 * RikouZone Lesson Adapter
 * 
 * Transforms any track's lesson data into the complete 10-pillar
 * UnifiedRikouLesson structure, ensuring all 35 domains have rich,
 * visual, and interactive learning experiences.
 */

import { UnifiedRikouLesson, RikouVisualSpec } from '../../types/lessonTypes';
import { getDomainEnrichment, DOMAIN_ENRICHMENT_REGISTRY } from './domainLessonsRegistry';

export interface RawLessonInput {
  id: string;
  title: string;
  number?: number;
  shortDesc?: string;
  summary?: string;
  keyTakeaway?: string;
  content?: string[];
  explanation?: string[];
  tips?: string[];
  warning?: string;
  practicalExample?: string;
  duration?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    hint?: string;
  };
  visualAid?: RikouVisualSpec;
}

export function adaptToUnifiedLesson(
  rawLesson: RawLessonInput,
  trackId: string,
  trackTitleAr: string,
  index: number = 0
): UnifiedRikouLesson {
  const profile = getDomainEnrichment(trackId, trackTitleAr);

  // Content paragraphs to breakdown steps
  const rawParagraphs = rawLesson.content || rawLesson.explanation || [rawLesson.shortDesc || rawLesson.summary || ''];
  const breakdownSteps = rawParagraphs.map((para, pIdx) => {
    // Generate clean step title if possible
    let stepTitle = `المحور ${pIdx + 1}`;
    if (para.includes(':')) {
      const parts = para.split(':');
      stepTitle = parts[0].trim().replace(/^[0-9.-]+\s*/, '');
    } else if (pIdx === 0) {
      stepTitle = 'المفهوم والتأسيس النظري';
    } else if (pIdx === 1) {
      stepTitle = 'الخطوات والتنفيذ الفعلي';
    } else if (pIdx === 2) {
      stepTitle = 'التطبيق وتجنب الأخطاء';
    } else {
      stepTitle = `نقطة التركيز #${pIdx + 1}`;
    }

    return {
      stepNumber: pIdx + 1,
      title: stepTitle,
      explanation: para,
      actionTip: pIdx === 0 ? 'ركز على فهم الفكرة دون استعجال النتائج' : undefined
    };
  });

  // Key takeaways list
  const keyTakeaways: string[] = [];
  if (rawLesson.keyTakeaway) {
    keyTakeaways.push(rawLesson.keyTakeaway);
  }
  if (rawLesson.tips && rawLesson.tips.length > 0) {
    keyTakeaways.push(...rawLesson.tips);
  }
  if (keyTakeaways.length < 3) {
    keyTakeaways.push(
      'التطبيق اليومي المنهجي هو الأساس الحقيقي لبناء نتائج مستدامة في هذا المسار.',
      'احرص على مراجعة المصطلحات والمهام الميدانية واستخدام أدوات التحليل المقترحة.'
    );
  }

  // Quiz determination
  const quiz = rawLesson.quiz ? {
    question: rawLesson.quiz.question,
    options: rawLesson.quiz.options,
    correctIndex: rawLesson.quiz.correctIndex,
    explanation: rawLesson.quiz.explanation,
    hint: rawLesson.quiz.hint,
    xpReward: 25
  } : profile.quiz;

  // Real world case study
  const realWorldCase = rawLesson.practicalExample ? {
    title: `مثال عملي: تطبيق ${rawLesson.title}`,
    scenario: rawLesson.practicalExample,
    stepByStep: [
      'فحص الاحتياج وسياق العمل المحدد.',
      'تطبيق الأدوات والخطوات المشروحة في الدرس بدقة.',
      'قياس النتيجة وضبط الاستراتيجية بناءً على الأرقام.'
    ],
    outcome: 'تحقيق نتيجة إيجابية ملموسة ورفع كفاءة التنفيذ.',
    numbersHighlight: 'دراسة حالة حقيقية'
  } : profile.realWorldCase;

  return {
    id: rawLesson.id,
    trackId,
    trackTitleAr,
    trackCategory: profile.category,
    number: rawLesson.number || (index + 1),
    title: rawLesson.title,
    objective: rawLesson.shortDesc || profile.defaultObjective,
    whyItMatters: profile.defaultWhyItMatters,
    level: rawLesson.level || 'beginner',
    durationMinutes: rawLesson.duration ? parseInt(rawLesson.duration) || 15 : 15,
    summary: rawLesson.shortDesc || rawLesson.summary || rawLesson.keyTakeaway || '',
    keyTakeaways: keyTakeaways.slice(0, 4),
    breakdownSteps,
    glossary: profile.glossary,
    visualAid: rawLesson.visualAid || profile.visualAid,
    realWorldCase,
    interactiveExercise: profile.interactiveExercise,
    quiz,
    practicalAssignment: profile.practicalAssignment,
    commonMistakeWarning: rawLesson.warning || profile.commonMistakeWarning,
    faq: profile.faq,
    specialFeature: profile.specialFeature
  };
}

/**
 * Generate a complete, enriched UnifiedRikouLesson for any of the 35 platform tracks
 */
export function getTrackUnifiedLesson(
  trackId: string,
  pathObj?: any
): UnifiedRikouLesson {
  const titleAr = pathObj?.arabicTitle || pathObj?.title || 'المسار التعليمي';
  const profile = getDomainEnrichment(trackId, titleAr);

  // If pathObj has stepByStep, transform them into breakdownSteps
  let breakdownSteps = (pathObj?.stepByStep && pathObj.stepByStep.length > 0)
    ? pathObj.stepByStep.map((s: any) => ({
        stepNumber: s.stepNumber,
        title: s.title,
        explanation: s.detail,
        actionTip: s.stepNumber === 1 ? 'ابدأ بفهم المتطلبات والأساسيات قبل استثمار الميزانية' : undefined
      }))
    : profile.realWorldCase.stepByStep.map((step, idx) => ({
        stepNumber: idx + 1,
        title: `المحور ${idx + 1}: خطوة التنفيذ الميدانية`,
        explanation: step,
        actionTip: idx === 0 ? 'ابدأ بفهم المتطلبات والأساسيات قبل استثمار الميزانية' : undefined
      }));

  const keyTakeaways: string[] = [];
  if (pathObj?.pros && pathObj.pros.length > 0) {
    keyTakeaways.push(...pathObj.pros.slice(0, 3));
  }
  if (keyTakeaways.length < 3) {
    keyTakeaways.push(
      'الالتزام بالتطبيق اليومي المنهجي هو الأساس الحقيقي لبناء نتائج مستدامة.',
      'احرص على مراجعة المصطلحات والمهام الميدانية واستخدام أدوات التحليل المقترحة.'
    );
  }

  return {
    id: `lesson_${trackId}_core`,
    trackId,
    trackTitleAr: profile.trackTitleAr || titleAr,
    trackCategory: pathObj?.category || profile.category,
    number: 1,
    title: `الدليل التعليمي التطبيقي الشامل: ${profile.trackTitleAr || titleAr}`,
    objective: profile.defaultObjective,
    whyItMatters: profile.defaultWhyItMatters,
    level: pathObj?.difficulty || 'beginner',
    durationMinutes: 20,
    summary: pathObj?.arabicShortDescription || pathObj?.shortDescription || profile.defaultObjective,
    keyTakeaways,
    breakdownSteps,
    glossary: profile.glossary,
    visualAid: profile.visualAid,
    realWorldCase: profile.realWorldCase,
    interactiveExercise: profile.interactiveExercise,
    quiz: profile.quiz,
    practicalAssignment: profile.practicalAssignment,
    commonMistakeWarning: pathObj?.realisticWarning || profile.commonMistakeWarning,
    faq: profile.faq,
    specialFeature: profile.specialFeature
  };
}
