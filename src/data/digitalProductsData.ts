import { DigitalProductLesson } from './digitalProductsDataTypes';
import { digitalProductLessonsPart1 } from './digitalProductsDataPart1';
import { digitalProductLessonsPart2 } from './digitalProductsDataPart2';
import { digitalProductLessonsPart3 } from './digitalProductsDataPart3';
import { 
  digitalProductIdeaValidationsList, 
  digitalProductPlatformsList, 
  digitalProductCapstoneSteps 
} from './digitalProductsDataPart4';

export const digitalProductsCurriculum: DigitalProductLesson[] = [
  ...digitalProductLessonsPart1,
  ...digitalProductLessonsPart2,
  ...digitalProductLessonsPart3
];

export const digitalProductsModulesList = [
  { id: 'all', title: 'جميع أقسام المسار', iconName: 'Layers' },
  { id: 'intro', title: '1. مقدمة المنتجات الرقمية', iconName: 'BookOpen' },
  { id: 'idea-selection', title: '2. اختيار الفكرة والتحقق', iconName: 'Target' },
  { id: 'ebook-creation', title: '3. صناعة كتاب إلكتروني', iconName: 'FileText' },
  { id: 'practical-guides', title: '4. صناعة الأدلة التطبيقية', iconName: 'Zap' },
  { id: 'packaging-design', title: '5. التغليف والتصميم البصري', iconName: 'Wrench' },
  { id: 'pricing-platforms', title: '6. التسعير والمنصات والدفع', iconName: 'DollarSign' },
  { id: 'marketing-funnels', title: '7. التسويق وقمع المبيعات', iconName: 'TrendingUp' },
  { id: 'scaling-retention', title: '8. التطوير وحزم المنتجات', iconName: 'Award' }
];

export {
  digitalProductIdeaValidationsList,
  digitalProductPlatformsList,
  digitalProductCapstoneSteps
};
export type { 
  DigitalProductLesson, 
  DigitalProductIdeaValidation, 
  DigitalProductPlatformComparison, 
  CapstoneProjectStep 
} from './digitalProductsDataTypes';
