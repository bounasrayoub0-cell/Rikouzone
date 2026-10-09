import { AiContentLesson } from './aiContentDataTypes';
import { aiContentLessonsPart1 } from './aiContentDataPart1';
import { aiContentLessonsPart2 } from './aiContentDataPart2';
import { aiContentLessonsPart3, promptComparisonsList } from './aiContentDataPart3';
import { 
  aiContentLessonsPart4, 
  aiContentToolsList, 
  aiMonetizationServicesList, 
  capstoneProjectSteps 
} from './aiContentDataPart4';

export * from './aiContentDataTypes';
export { promptComparisonsList } from './aiContentDataPart3';
export { 
  aiContentToolsList, 
  aiMonetizationServicesList, 
  capstoneProjectSteps 
} from './aiContentDataPart4';

export const aiContentCurriculum: AiContentLesson[] = [
  ...aiContentLessonsPart1, // 1: intro, 2: basics, 3: articles
  ...aiContentLessonsPart2, // 4: scripts, 5: marketing
  ...aiContentLessonsPart3, // 6: prompt-engineering, 7: human-editing
  ...aiContentLessonsPart4  // 8: tools, 9: monetization, 10: capstone
];

export const aiContentModulesList = [
  { id: 'all', title: 'جميع الأقسام والدروس', icon: 'Sparkles', count: 10 },
  { id: 'intro', title: '1. مقدمة المجال', icon: 'Sparkles', count: 1 },
  { id: 'basics', title: '2. أساسيات AI Content', icon: 'Layers', count: 1 },
  { id: 'articles', title: '3. كتابة المقالات والسيو', icon: 'FileText', count: 1 },
  { id: 'scripts', title: '4. كتابة سكربتات الفيديو', icon: 'Film', count: 1 },
  { id: 'marketing', title: '5. المحتوى التسويقي والإعلاني', icon: 'Target', count: 1 },
  { id: 'prompt-engineering', title: '6. Prompt Engineering للمحتوى', icon: 'Sparkles', count: 1 },
  { id: 'human-editing', title: '7. التدقيق والتحسين البشري', icon: 'ShieldCheck', count: 1 },
  { id: 'tools', title: '8. الأدوات المفيدة', icon: 'Wrench', count: 1 },
  { id: 'monetization', title: '9. كيف تربح من المجال', icon: 'DollarSign', count: 1 },
  { id: 'capstone', title: '10. المشروع العملي النهائي', icon: 'Award', count: 1 }
];
