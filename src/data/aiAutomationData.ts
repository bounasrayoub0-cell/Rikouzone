import { AaaLesson } from './aiAutomationDataTypes';
import { aaaLessonsPart1 } from './aiAutomationDataPart1';
import { aaaLessonsPart2 } from './aiAutomationDataPart2';
import { aaaSystemProjectsList } from './aiAutomationDataPart3';
import { 
  aaaLessonsPart4, 
  aaaPortfolioProjectsList, 
  aaaCapstoneMilestonesList 
} from './aiAutomationDataPart4';

export * from './aiAutomationDataTypes';
export { aaaSystemProjectsList } from './aiAutomationDataPart3';
export { aaaPortfolioProjectsList, aaaCapstoneMilestonesList } from './aiAutomationDataPart4';

export const aaaCurriculum: AaaLesson[] = [
  ...aaaLessonsPart1, // 1: intro, 2: make
  ...aaaLessonsPart2, // 3: zapier, 4: ai-integration
  ...aaaLessonsPart4  // 6: troubleshooting, 7: monetization
];

export const aaaModulesList = [
  { id: 'all', title: 'جميع أقسام المنهج', icon: 'Sparkles', count: 6 },
  { id: 'intro', title: '1. مقدمة في AI Automation', icon: 'Sparkles', count: 1 },
  { id: 'make', title: '2. تعلم Make من الصفر', icon: 'Layers', count: 1 },
  { id: 'zapier', title: '3. تعلم Zapier من الصفر', icon: 'Zap', count: 1 },
  { id: 'ai-integration', title: '4. ربط الذكاء الاصطناعي بالأتمتة', icon: 'Sparkles', count: 1 },
  { id: 'troubleshooting', title: '6. حل مشاكل الأتمتة وصيانتها', icon: 'ShieldCheck', count: 1 },
  { id: 'monetization', title: '7. تحويل المهارة إلى خدمة مدفوعة', icon: 'DollarSign', count: 1 }
];
