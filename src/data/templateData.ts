import { TemplateLesson } from './templateDataTypes';
import { templateLessonsPart1 } from './templateDataPart1';
import { templateLessonsPart2 } from './templateDataPart2';
import { templateLessonsPart3 } from './templateDataPart3';
import { templateLessonsPart4 } from './templateDataPart4';
import { templateLessonsPart5 } from './templateDataPart5';
import { 
  templateIdeaEvaluationsList, 
  templatePlatformDetailsList 
} from './templateDataPart6';

export const templateSellingCurriculum: TemplateLesson[] = [
  ...templateLessonsPart1,
  ...templateLessonsPart2,
  ...templateLessonsPart3,
  ...templateLessonsPart4,
  ...templateLessonsPart5
];

export const templateModulesList = [
  { id: 'all', title: 'جميع الأقسام (المسار الكامل)', iconName: 'Layers' },
  { id: 'market-understanding', title: '1. فهم سوق القوالب الرقمية', iconName: 'Globe' },
  { id: 'idea-selection', title: '2. اختيار فكرة قالب مطلوب', iconName: 'Target' },
  { id: 'notion-mastery', title: '3. احتراف Notion Templates', iconName: 'FileText' },
  { id: 'canva-mastery', title: '4. احتراف Canva Templates', iconName: 'Wrench' },
  { id: 'ready-products', title: '5. إنشاء منتجات جاهزة للبيع', iconName: 'Award' },
  { id: 'pricing-platforms', title: '6. التسعير ومنصات البيع', iconName: 'DollarSign' },
  { id: 'marketing-sales', title: '7. التسويق وأول عميل', iconName: 'TrendingUp' },
  { id: 'store-expansion', title: '8. تطوير متجر القوالب', iconName: 'Briefcase' },
  { id: 'licensing-rights', title: '9. الحقوق والتراخيص القانونية', iconName: 'ShieldCheck' }
];

export {
  templateIdeaEvaluationsList,
  templatePlatformDetailsList
};
export type { 
  TemplateLesson, 
  TemplateIdeaEvaluation, 
  TemplatePlatformDetails 
} from './templateDataTypes';
