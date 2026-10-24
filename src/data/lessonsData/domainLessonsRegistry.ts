/**
 * RikouZone 35-Domain Educational Lesson Registry
 * 
 * Provides tailored visual infographic blueprints, technical glossaries,
 * realistic case studies, interactive exercises, quizzes, and assignments
 * for all 35 educational fields on the platform.
 */

import { 
  UnifiedRikouLesson, 
  RikouVisualSpec, 
  RikouGlossaryTerm, 
  RikouInteractiveExercise, 
  RikouLessonQuiz, 
  PracticalAssignment, 
  RealWorldCaseStudy 
} from '../../types/lessonTypes';

import { marketingDomains } from './domains/marketingDomains';
import { contentDomains } from './domains/contentDomains';
import { creativeDomains } from './domains/creativeDomains';
import { techDomains } from './domains/techDomains';
import { commerceDomains } from './domains/commerceDomains';
import { servicesDomains } from './domains/servicesDomains';

export interface DomainEnrichmentProfile {
  trackId: string;
  trackTitleAr: string;
  category: string;
  defaultObjective: string;
  defaultWhyItMatters: string;
  visualAid: RikouVisualSpec;
  glossary: RikouGlossaryTerm[];
  realWorldCase: RealWorldCaseStudy;
  interactiveExercise: RikouInteractiveExercise;
  quiz: RikouLessonQuiz;
  practicalAssignment: PracticalAssignment;
  commonMistakeWarning: string;
  faq?: { question: string; answer: string }[];
  specialFeature?: {
    type: 'code' | 'design_comparison' | 'marketing_funnel' | 'financial_table' | 'workflow';
    title: string;
    content?: string;
    language?: string;
    beforeAfter?: { before: string; after: string; note: string };
    table?: { headers: string[]; rows: string[][] };
  };
}

/**
 * All 35 Educational Domains registered with rich, authentic profiles
 */
export const DOMAIN_ENRICHMENT_REGISTRY: Record<string, DomainEnrichmentProfile> = {
  ...marketingDomains,
  ...contentDomains,
  ...creativeDomains,
  ...techDomains,
  ...commerceDomains,
  ...servicesDomains
};

/**
 * Retrieve enriched domain blueprint, falling back to a structured template
 * if a custom ID is provided.
 */
export function getDomainEnrichment(trackId: string, trackTitleAr: string = 'المجال التعليمي'): DomainEnrichmentProfile {
  if (DOMAIN_ENRICHMENT_REGISTRY[trackId]) {
    return DOMAIN_ENRICHMENT_REGISTRY[trackId];
  }

  // Robust fallback for any dynamic or future tracks
  return {
    trackId,
    trackTitleAr,
    category: 'Digital Skills',
    defaultObjective: `إتقان الأسس التطبيقية لمنظومة ${trackTitleAr} وبناء أول مشروع حقيقي عملي.`,
    defaultWhyItMatters: `${trackTitleAr} من المهارات الرقمية العالية الطلب التي تتيح لصاحبها تحقيق دخل حر مستقل أو توظيفها في إطلاق مشروعه الخاص.`,
    visualAid: {
      type: 'flowchart',
      title: `مخطط مسار الاحتراف والربح من ${trackTitleAr}`,
      subtitle: 'الخطوات التنفيذية الـ 4 المعتمدة في RikouZone للانتقال من البداية لتحقيق الدخل',
      badgeLabel: 'المسار التعليمي المعتمد',
      nodes: [
        { id: 'f1', title: '1. التأسيس والمفاهيم الجوهرية', desc: 'فهم القواعد الأساسية وتجنب الأخطاء الشائعة للمبتدئين.', accent: 'amber', badge: 'Foundation' },
        { id: 'f2', title: '2. الأدوات والتجهيز الميداني', desc: 'إعداد منظومة العمل والبرامج والمنصات التخصصية المناسبة.', accent: 'blue', badge: 'Tools' },
        { id: 'f3', title: '3. التنفيذ والاختبار العملي', desc: 'تطبيق نماذج أولية ومشاريع تجريبية وقياس الأداء بدقة.', accent: 'purple', badge: 'Execution' },
        { id: 'f4', title: '4. التوسع وتحقيق الإيرادات', desc: 'تحويل المهارة إلى عقود مستمرة ومصادر دخل تراكمية مستدامة.', accent: 'emerald', badge: 'Scaling $' }
      ],
      metrics: [
        { label: 'نسبة النجاح بالتطبيق', value: '85%+', hint: 'عند الالتزام بالمهام العملية' },
        { label: 'الوقت المقدر للإتقان', value: '2 - 4 أسابيع', hint: 'دراسة وتطبيق 30 دقيقة يومياً' },
        { label: 'المستوى المستهدف', value: 'من الصفر للاحتراف', hint: 'مناسب للمبتدئين تماماً' }
      ],
      proTip: 'التعلم النظري دون تطبيق لا يثمر؛ أنجز المهمة العملية المصاحبة لهذا الدرس قبل الانتقال للدرس التالي.'
    },
    glossary: [
      { term: 'Core KPI', arabicName: 'مؤشر الأداء الرئيسي', phonetic: 'كي بي آي', definition: 'الرقم أو المقياس الفعلي الذي يحدد نجاحك أو فشلك في هذا المسار دون تخمين عشوائي.' },
      { term: 'Market Fit', arabicName: 'الملاءمة مع السوق', phonetic: 'ماركت فيت', definition: 'تقديم منتج أو خدمة يطلبها العملاء فعلياً ولديهم استعداد كامل للدفع مقابلها.' },
      { term: 'Workflow Automation', arabicName: 'أتمتة منظومة العمل', phonetic: 'أوتوميشن', definition: 'استخدام أدوات توفر وقتك وتنجز المهام المتكررة بدقة وسرعة متناهية.' }
    ],
    realWorldCase: {
      title: `نموذج واقعي لتطبيق ${trackTitleAr}`,
      scenario: `دراسة خطة عمل حقيقية نُفذت بنجاح وحققت أرباحاً ملموسة عبر خطوات منهجية.`,
      stepByStep: [
        'تحديد الخدمة أو المنتج الأكثر طلباً في السوق المستهدف.',
        'إعداد نموذج عمل أولي متكامل يبرز القيمة الحقيقية للعميل.',
        'التواصل مع أول دفعة من المهتمين وعرض الحل باحترافية وثقة.',
        'إغلاق أول صفقة بنجاح وجمع توصية إيجابية للترويج للمشاريع اللاحقة.'
      ],
      outcome: 'بناء تدفق عملي مستمر وتحقيق عائد استثماري مجزٍ.',
      numbersHighlight: 'نموذج عملي مُثبت النجاح'
    },
    interactiveExercise: {
      type: 'order_steps',
      title: `ترتيب أولويات التنفيذ في ${trackTitleAr}`,
      instruction: 'رتّب الخطوات التالية للبدء باحترافية وتجنب إهدار الوقت والميزانية:',
      data: {
        items: [
          { id: 'x1', correctOrder: 1, text: 'دراسة السوق وتحديد المشكلة الحقيقية التي يرغب العميل في دفع المال لحلها' },
          { id: 'x2', correctOrder: 2, text: 'إعداد الأدوات الأساسية وبناء معرض أعمال أو نموذج أولي بسيط' },
          { id: 'x3', correctOrder: 3, text: 'إطلاق العرض واختبار استجابة المشترين والرد على الاستفسارات بمرونة' },
          { id: 'x4', correctOrder: 4, text: 'تحليل النتائج وتطوير العرض ومضاعفة القنوات الأكثر ربحية' }
        ]
      },
      solutionExplanation: 'البدء بفهم حاجة السوق الحقيقية قبل استثمار الأموال هو الضمان الأول لنجاح أي مسار رقمي.',
      xpReward: 25
    },
    quiz: {
      question: `ما هو العامل الحاسم الذي يضمن لك الاستمرارية وتحقيق النجاح المالي في ${trackTitleAr}؟`,
      options: [
        'الانتظار حتى يصبح كل شيء مثالياً 100% دون خوض أي تجربة عملية.',
        'التطبيق اليومي المنهجي، وتقديم قيمة حقيقية للجمهور، وتطوير المهارات بناءً على النتائج الميدانية.',
        'تغيير المسار أسبوعياً وملاحقة كل صيحة جديدة دون التركيز على مجال واحد.',
        'الاعتماد على الصدفة والحظ دون دراسة أي أرقام أو مقاييس أداء.'
      ],
      correctIndex: 1,
      explanation: 'الاستمرارية والتطبيق الميداني وقياس الأرقام الحقيقية هي سر التفوق في كل المهارات الرقمية.',
      hint: 'فكر في ما يصنع المحترف الحقيقي مقارنة بالهاوي المشتت.',
      xpReward: 25
    },
    practicalAssignment: {
      title: `المهمة التنفيذية الأولى في ${trackTitleAr}`,
      estimatedMinutes: 20,
      instruction: 'قم بتطبيق أول خطوة عملية في هذا الدرس واكتب ملخصاً لما تعلمته.',
      deliverable: 'ملف أو وثيقة تحتوي على خطة العمل المباشرة للأيام السبعة القادمة.',
      checklist: [
        'تحديد الهدف المالي والمهني بوضوح',
        'اختيار الأداة الأساسية التي ستبدأ بتطبيقها اليوم',
        'تحديد 30 دقيقة يومياً في جدولك المخصص للتعلم والممارسة',
        'التحقق من جاهزية أول مخرج عملي'
      ],
      xpReward: 20
    },
    commonMistakeWarning: 'تجنب جمع المعلومات فقط دون تنفيذ؛ الدرس الذي لا يتبعه تطبيق عملي يفقد 90% من قيمته بعد يومين.'
  };
}
